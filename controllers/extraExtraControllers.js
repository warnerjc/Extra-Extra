const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const db = require('../models');

const router = express.Router();

// Import the model to use its database functions.
const Article = require('../models/Article.js');
const Note = require('../models/Note.js');

router.get('/', function (req, res) {

    db.Article.find({})
        .then(function (dbArticles) {
            // console.log(dbArticles);
            res.render('index', { dbArticles });
        })
        .catch(function (err) {
            res.json(err);
        });

});

router.get('/scrape', function (req, res) {
    // Make a request for the news section of 'ycombinator'
    request('https://medium.com/topic/digital-design', function (error, response, body) {

        // Load the html body from request into cheerio
        const $ = cheerio.load(body);

        // For each element with a 'title' class
        $('.u-borderBox').each(function (i, element) {
            // Save the text and href of each link enclosed in the current element

            let mediumID = $(element)
                .children('.u-flex1')
                .children('.u-flexColumnTop')
                .children('.u-flex0')
                .children('a')
                .attr('data-post-id');

            let title = $(element)
                .children('.u-flex1')
                .children('.u-flexColumnTop')
                .children('.u-flex0')
                .children('a')
                .children('h3')
                .text();

            let link = $(element)
                .children('.u-flex1')
                .children('.u-flexColumnTop')
                .children('.u-flex0')
                .children('a')
                .attr('href');

            let body = $(element)
                .children('.u-flex1')
                .children('.u-flexColumnTop')
                .children('a')
                .children('.ui-summary')
                .text();

            let articleDate = $(element)
                .children('.u-flexCenter')
                .children('.u-flexTop')
                .children('.u-noWrapWithEllipsis')
                .children('.ui-caption')
                .children('time')
                .text();

            let article = {
                mediumID: mediumID,
                title: title,
                link: link,
                body: body,
                articleDate: articleDate
            };

            // If this found element had both a title and a link
            if (title && link) {
                // Insert the data in the Articles db
                db.Article.create(article)
                    .then(dbArticle => console.log('Successful'))
                    .catch(err => res.json(err));
            }
        });

        res.send('Articles successfully scraped.');

    });   

});

router.get('/saved', function (req, res) {

    res.render('saved');

});

module.exports = router;  