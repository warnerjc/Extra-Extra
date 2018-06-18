const mongoose = require('../config/mongoose.js');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	title: {
		type: String,
	},
	link: {
		type: String,
	}
});

const Article  = mongoose.model('Article', ArticleSchema);
module.exports = Article;