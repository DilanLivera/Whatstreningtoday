const express = require("express"),
      app     = express();
      Twitter = require('twitter');

const port    = 3000      ;

//config twitter
var client = new Twitter({
    consumer_key: 'qZBfNlWAjxJNJhYTpnR6L5pAX',
    consumer_secret: 'mORK2zeMbAfZoMqbefAIZ8mP2zqA90IANGCQI0FTJJ56eGSKCj',
    access_token_key: '1088328190651559936-Xaqn1V1E9xVoydFQF1tBXGJkbFEnOu',
    access_token_secret: 'SJMEdhy0JozDOZC0NdvJK17xRHB9LuK580ITeXtG1iQec'
  });

//config app
app.set("view engine", "ejs");

//get all the trending tweets
app.get("/", (req, res) => {
    //search tweets which includes trending in it
    client.get('search/tweets', {q: 'trending'}, function(error, tweets, twitterResponse) {
        if(error) {
          console.log("Oops, something went wrong!!!")  ;
          console.log(error);      
        } else {
            //res.send(tweets);
            res.render("tweets/index", { tweets: tweets });
        }
      });
});

app.listen(port, () => {
    console.log(`Now Serving - What's Trending Today on ${port}`);
});