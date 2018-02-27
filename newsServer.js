// var http = require('http');
// var url = require('url');
//
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   var q = url.parse(req.url, true).query;
//   var txt = q.year + " " + q.month;
//   res.end(txt);
// }).listen(8080);

// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.post('/post', function (req, res) {
//     console.log(req.body)
// });
//
// app.get('/', (req, res) => res.send('Hello World!'))
//
// app.listen(3000, () => console.log('Example app listening on port 3000!'))

var express = require("express");

 //use the application off of express.
 var app = express();

 // function getJSON(res) {
 //  const NewsAPI = require('newsapi');
 //  const newsapi = new NewsAPI('39447df757f0434f9b01b2f2d39dac0e');
 //  res.send("JSON>>>>>>>>>>>>>>>>>>>>");
 //  newsapi.v2.topHeadlines({
 //    sources: 'bbc-news,the-verge',
 //    q: 'bit',
 //    category: 'business',
 //    language: 'en',
 //    country: 'us'
 //  }).then(res => {
 //    console.log(res);
 //  });
 // }

 app.use(express.static('public'));
 //define the route for "/"
 app.get("/", function (req, res){
     res.sendFile(__dirname+"/index.html");
 });

 app.get("/getkeyword", function (req, res){
     var keyWord = req.query.keyWord;
       console.log("got keyword.");
     if (keyWord != "") {
       console.log("keyword not null.");
       // res.send("The keyword you entered is... " + keyWord + ".");
       const NewsAPI = require('newsapi');
       const newsapi = new NewsAPI('39447df757f0434f9b01b2f2d39dac0e');
       // res.send("JSON>>>>>>>>>>>>>>>>>>>>");
       newsapi.v2.topHeadlines({
         // sources: 'bbc-news,the-verge',
         q: keyWord,
         // category: 'business',
         language: 'en',
         // country: 'us'
       }).then(response => {
         // console.log(response);
         // for (var source in response.articles) {
         //   res.write("source: " + response.articles.source);
         // }
         res.write("response is:"+JSON.stringify(response.articles));
         res.end();
         //return response;
       }).catch(err => console.log(err));
       //res.json(responseJson);

     } else {
       res.send("Please provide us a keyword.");
     }
 });

 //start the server
 app.listen(8080);

 console.log("News search at http://localhost:8080");
