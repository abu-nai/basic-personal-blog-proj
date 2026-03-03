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
let blogposts = [
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
app.get('/blog', (req, res) => {
    res.render('blog/index', { blogposts })
})

// new route
app.get('/blog/new', (req, res) => {
    res.render('blog/new')
})

// create route
app.post('/blog', (req, res) => {
    const { username, comment, date } = req.body;
    blogposts.push({ username, date, comment, id: uuid() });
    res.redirect('/blog');
})

// show route
app.get('/blog/:id', (req, res) => {
    const { id } = req.params;
    const blogpost = blogposts.find(p => p.id === id);
    res.render('blog/show', { blogpost });
})

// edit route
app.get('/blog/:id/edit', (req, res) => {
    const { id } = req.params;
    const blogpost = blogposts.find(p => p.id === id);
    res.render('blog/edit', { blogpost });
})

// update route
app.patch('/blog/:id', (req, res) => {
    const { id } = req.params;
    const newBlogText = req.body.comment;
    const foundBlog = blogposts.find(p => p.id === id);
    foundBlog.comment = newBlogText;
    res.redirect('/blog');
})

// delete route
app.delete('/blog/:id', (req, res) => {
    const { id } = req.params;
    blogposts = blogposts.filter(p => p.id !== id);
    res.redirect('/blog');
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