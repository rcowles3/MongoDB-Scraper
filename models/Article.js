// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true
  },
  // description is a required string
  description: {
      type: String, 
      required: true
  },
  // link is a required string
  link: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  sport: {
    type:String,
    required:true
  },
  // saved article as a boolean
  saved: {
    type: Boolean,
    default: false
  },
  // This only saves one comment's ObjectId, ref refers to the Comment model
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
