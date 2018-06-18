const mongoose = require('../config/mongoose.js');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	mediumID: {
		type: String,
	},
	title: {
		type: String,
	},
	link: {
		type: String,
	},
	body: {
		type: String,
	},
	articleDate: {
		type: String,
	}
});

const Article  = mongoose.model('Article', ArticleSchema);
module.exports = Article;