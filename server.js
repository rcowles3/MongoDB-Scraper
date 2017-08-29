/* Showing Mongoose's "Populated" Method
 * =============================================== */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Requiring our comment and Article models
// var Comment = require("./models/comment.js");
var Article = require("./models/Article.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/ESPN", {
  useMongoClient: true
});
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
  console.log("Mongoose connection successful.");
});


// Routes
// ======

// A GET request to scrape the echojs website
app.get("/scrape", function (req, res) {
  // First, we grab the body of the html with request, ESPN.com/NBA
  request("http://www.espn.com/nba", function (error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    // Now, we grab every h2 within an article tag, and do the following:
    $(".contentItem__padding").each(function (i, element) {

      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children("div").children("h1").text();
      result.description = $(this).children("div").children("p").text();
      result.link = $(this).attr("href");
      result.img = $(this).children("figure").children("picture").children("img").attr("data-default-src");
      result.sport = "NBA";

      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      var newArticle = new Article(result);

      // Now, save that entry to the db
      newArticle.save(function (err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log(doc);
        }
      });

      console.log("NATIONAL BASKETBALL ASSOTIATION\n\n", result);
    });

  });

  // ==================================================
  // Multisport Scrape
  // ==================================================
  // First, we grab the body of the html with request, ESPN.com/NBA
  // request("http://www.espn.com/mlb", function (error, response, html) {
  //   // Then, we load that into cheerio and save it to $ for a shorthand selector
  //   var $ = cheerio.load(html);
  //   // Now, we grab every h2 within an article tag, and do the following:
  //   $(".contentItem__padding").each(function (i, element) {

  //     // Save an empty result object
  //     var result = {};

  //     // Add the text and href of every link, and save them as properties of the result object
  //     result.title = $(this).children("div").children("h1").text();
  //     result.description = $(this).children("div").children("p").text();
  //     result.link = $(this).attr("href");
  //     result.img = $(this).children("figure").children("picture").children("img").attr("data-default-src");
  //     result.sport = "MLB";

  //     // Using our Article model, create a new entry
  //     // This effectively passes the result object to the entry (and the title and link)
  //     var newArticle = new Article(result);

  //     // Now, save that entry to the db
  //     newArticle.save(function (err, doc) {
  //       // Log any errors
  //       if (err) {
  //         console.log(err);
  //       }
  //       // Or log the doc
  //       else {
  //         console.log(doc);
  //       }
  //     });

  //     console.log("MAJOR LEAGUE BASEBALL\n\n", result);
  //   });

  // });

  // // First, we grab the body of the html with request, ESPN.com/NBA
  // request("http://www.espn.com/nfl", function (error, response, html) {
  //   // Then, we load that into cheerio and save it to $ for a shorthand selector
  //   var $ = cheerio.load(html);
  //   // Now, we grab every h2 within an article tag, and do the following:
  //   $(".contentItem__padding").each(function (i, element) {

  //     // Save an empty result object
  //     var result = {};

  //     // Add the text and href of every link, and save them as properties of the result object
  //     result.title = $(this).children("div").children("h1").text();
  //     result.description = $(this).children("div").children("p").text();
  //     result.link = $(this).attr("href");
  //     result.img = $(this).children("figure").children("picture").children("img").attr("data-default-src");
  //     result.sport = "NFL";

  //     // Using our Article model, create a new entry
  //     // This effectively passes the result object to the entry (and the title and link)
  //     var newArticle = new Article(result);

  //     // Now, save that entry to the db
  //     newArticle.save(function (err, doc) {
  //       // Log any errors
  //       if (err) {
  //         console.log(err);
  //       }
  //       // Or log the doc
  //       else {
  //         console.log(doc);
  //       }
  //     });

  //     console.log("NATIONAL FOOTBALL LEAGUE\n\n", result);
  //   });

  // });
  // ==================================================
  // ==================================================
  // Tell the browser that we finished scraping the text
  res.redirect("Scrape Complete");
});

// This will get the articles we scraped from the mongoDB
app.get("/articles", function (req, res) {
  // Grab every doc in the Articles array
  Article.find({}, function (error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

app.get("/:sport", function (req, res) {

  Article.find({ "sport": req.params.sport })
    // .populate("comment")
    // now, execute our query
    .exec(function (error, doc) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Otherwise, send the doc to the browser as a json object
      else {
        res.json(doc);
      }
    });
})

// Grab an article by it's ObjectId
app.get("/articles/:id", function (req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Article.findOne({ "_id": req.params.id })
    // ..and populate all of the comments associated with it
    // .populate("comment")
    // now, execute our query
    .exec(function (error, doc) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Otherwise, send the doc to the browser as a json object
      else {
        res.json(doc);
      }
    });
});

// Route to grab articles that have been saved
app.get("/articles/saved", function (req, res) {
  Article.find({ "saved": true })
    .exec(function (error, doc) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Otherwise, send the doc to the browser as a json object
      else {
        res.json(doc);
      }
    });
})

// Create a new comment or replace an existing comment
app.post("/articles/:id", function (req, res) {
  // Create a new comment and pass the req.body to the entry
  // var newComment = new Comment(req.body);

  // // And save the new comment the db
  // newComment.save(function (error, doc) {
  //   // Log any errors
  //   if (error) {
  //     console.log(error);
  //   }
  //   // Otherwise
  //   else {
  // Use the article id to find and update it's comment
  Article.findOneAndUpdate({ "_id": req.params.id }, { "saved": true })
    // Execute the above query
    .exec(function (err, doc) {
      // Log any errors
      if (err) {
        console.log(err);
      }
      else {
        // Or send the document to the browser
        res.send(doc);
      }
    });
  // }
});
// });


// Listen on port 3000
app.listen(3000, function () {
  console.log("App running on port 3000!");
});
