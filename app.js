const express    = require("express"),
      app        = express();
      Twitter    = require('twitter'),
      bodyParser = require("body-parser");

const port    = 3000      ;

//config twitter
var client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
  });

//config app
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public"))

//home route
app.get("/", (req, res) => {
    res.render("landingpage");
});

//tweet route
app.get("/tweet", (req, res) => {
    res.redirect("/results");
});

//search
app.get("/results", (req, res) => {
    //search tweets using user searched term
    const searchterm = (req.query.search) ? req.query.search : "trending";
    client.get('search/tweets', {q: searchterm}, function(error, tweets, twitterResponse) {
        if(error) {
          console.log("Oops, something went wrong!!!")  ;
          console.log(error);      
        } else {
            //res.send(tweets);
            res.render("tweets/index", { tweets: tweets, searchterm: searchterm });
        }
      });
});

app.listen(port, () => {
    console.log(`Now Serving - What's Trending Today on ${port}`);
});