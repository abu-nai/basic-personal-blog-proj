const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');
uuid();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// our fake database
let comments = [
    {
        id: uuid() ,
        username: 'Metalsmith',
        date: 'January 3rd',
        comment: 'Today I cast the molds for my most recent commission.'
    },
    {
        id: uuid() ,
        username: 'Metalsmith',
        date: 'January 16th',
        comment: 'I heated and poured my silver into my ring mold. Removed, polished, and set in a small onyx gem.'
    },
    {
        id: uuid() ,
        username: 'Metalsmith',
        date: 'January 18th',
        comment: 'Finally mailed my commission to client. Safe travels, little ring.'
    },
    {
        id: uuid() ,
        username: 'Metalsmith',
        date: 'February 14th',
        comment: 'Client received my handmade ring today and she said that it is perfect.'
    }
]

// index route
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

// new route
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

// create route
app.post('/comments', (req, res) => {
    const { username, comment, date } = req.body;
    comments.push({ username, date, comment, id: uuid() });
    res.redirect('/comments');
})

// show route
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

// edit route
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

// update route
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

// delete route
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/rings', (req, res) => {
    res.send('GET /rings response');
})

app.post('/rings', (req, res) => {
    console.log(req.body);
    const { metal, qty } = req.body;
    res.send(`User submitted an inquiry for ${qty} hand-crafted ${metal} rings.`);
})

app.listen(3000, () => {
    console.log("ON PORT 3000!!");
})