const express = require('express');

const router = express.Router();

// Import the model to use its database functions.
const Article = require('../models/Article.js');
const Note = require('../models/Note.js');

router.get("/", function(req, res) {
    
    res.render('index');
  
});

module.exports = router;  