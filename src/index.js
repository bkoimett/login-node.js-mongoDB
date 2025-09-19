// imports
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();

// use EJS as view engine
app.use('view engine', 'ejs')

// route handlers - define route
app.get('/', (req,res) => {
    res.render('login')
})

app.get('/signup', (req,res) => {
    res.render('signup')
})


// Start the server 
const port = 5000
app.listen(port, () => {
    console.log('Server is running on http://localhost:3000')
})