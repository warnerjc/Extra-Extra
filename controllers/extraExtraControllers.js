const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const db = require('../models');

const router = express.Router();

// Import the model to use its database functions.
const Article = require('../models/Article.js');
const Note = require('../models/Note.js');

router.get('/', function(req, res) {

    // Make a request for the news section of 'ycombinator'
    request('https://news.ycombinator.com', function(error, response, body) {

        // Load the html body from request into cheerio
        const $ = cheerio.load(body);

        // For each element with a 'title' class
        $('.title').each( function(i, element) {
            // Save the text and href of each link enclosed in the current element
            let title = $(element).children('a').text();
            let link = $(element).children('a').attr('href');

            console.log(link);

            let article = {
                title: title,
                link: link
            };

            // If this found element had both a title and a link
            if (title && link) {
                // Insert the data in the Articles db
                db.Article.create( article )
                .then( dbArticle => console.log('Successful') )
                .catch( err => res.json(err));
            }
        });       

    });

    db.Article.find( {} )
    .then( function(dbArticles) {
        // console.log(dbArticles);
        res.render('index', { dbArticles } );
    })
    .catch( function(err) {
        res.json(err);
    });
  
});

router.get('/saved', function(req, res) {

    res.render('saved');

})

module.exports = router;  