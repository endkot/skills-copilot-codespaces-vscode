// create a web server
// npm install express
// npm install body-parser

// load express module
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// load body-parser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// load comments module
var comments = require('./comments.js');

// load comments data
var commentsData = comments.loadComments();

// 1. GET /comments
app.get('/comments', function(req, res) {
  res.status(200).send(commentsData);
});

// 2. POST /comments
app.post('/comments', function(req, res) {
  var newComment = {
    id: commentsData.length + 1,