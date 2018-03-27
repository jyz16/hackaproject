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

var newsObjects = [];
app.set('view engine', 'jade');

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
         sortBy: 'publishedAt',
         pageSize: 100,
         // country: 'us'
       }).then(response => {
         res.setHeader('Content-Type', 'application/json');
         for (var source in response.articles) {
           res.write(JSON.stringify(response.articles[source],null,3));
         }
        res.end();
         // var i = 0;
         // for (var source in response.articles) {
         //   // res.write("hiiiiiiiiiiiii");
         //   var obj = {
         //     title: JSON.stringify(response.articles[source].title),
         //     publishedAt: JSON.stringify(response.articles[source].publishedAt),
         //     author: JSON.stringify(response.articles[source].author),
         //     description: JSON.stringify(response.articles[source].description),
         //     source: JSON.stringify(response.articles[source].source.name), //??
         //     url: JSON.stringify(response.articles[source].url)
         //   };
         //   newsObjects[i] = obj;
         //   // res.write(source + JSON.stringify(response.articles[source].title)+"\n");
         //   // res.write(JSON.stringify(response.articles[source].publishedAt)+"\n"+"\n");
         //   res.write(source + obj.title + "\n");
         //   res.write(obj.publishedAt + "\n\n");
         //   i++;
         // }
         // res.write("Recorded everything in list. First item is : " + newsObjects[0].title + "\n");
         // // res.write("response is:"+JSON.stringify(response.articles));
         // res.end();
         // // res.render('result',{title: 'ben\'s cookies', resultData: newsObjects[0]});
         // //return response;
       }).catch(err => console.log(err));
       //res.json(responseJson);

     } else {
       res.send("Please provide us a keyword.");
     }
 });

 //start the server at localhost 8080
 app.listen(8080);
 console.log("News search at http://localhost:8080");
