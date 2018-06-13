const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const cheerio = require('cheerio');
const request = require('request');

let PORT = process.env.PORT || 3000;

const app = express();

// Serve static content for the app from the 'public' directory 
app.use(express.static('public'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

// Set handlebars as the express app view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Import routes and give the server access to them.
const routes = require("./controllers/extraExtraControllers.js");

app.use(routes);

// Start express app
app.listen(PORT, function () {
  console.log(`App now listening at localhost: ${PORT}`);
});