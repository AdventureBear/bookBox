/**
 * Created by suzanne on 7/29/15.
 */
//server.js

//BASE SETUP
//==============

var express = require('express');
var app = express();
var bodyParser = require ('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookBox');

//configurations
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//connect models
var Book = require('./app/models/book');

//set port
var port = process.env.PORT || 8080;

//ROUTES FOR API
//================
//create an instance of the express Router
var router = express.Router();

//middleware for all requests
//log to console w/ each request
router.use(function(req,res,next){
  console.log('Something is happening.');
  next();
});


//more api routes here
//all routes that end in /books

router.route('/books')
  //create a book
  .post(function(req,res){
    var book = new Book();  //create book...from the scmea
    book.name = req.body.name; //set the naem from the get request

    //save the book & check for errors
    book.save(function(err){
      if (err)
        res.send(err);

      res.json({message: 'Book created!'});
    });  //save
  })

  .get(function(req,res){
    Book.find(function(err,books){
      if (err)
        res.send(err);

      res.json(books);
    }); //  find
  });  //REST methods

//routes ending with /books/:book_id
router.route('/books/:book_id')
  .get (function(req,res) {
    Book.findById(req.params.book_id,function(err,book) {
      if (err)
        res.send(err);

        res.json(book);
      
    });  //findByID
  })


  .put (function(req,res) {
    Book.findById(req.params.book_id,function(err,book) {
      if (err)
        res.send(err);


      book.name = req.body.name;

      //save the book & check for errors
      book.save(function(err){
        if (err)
           res.send(err);

        res.json({message: 'Book updated!'});
      });
    });  //findByID


  })

  .delete(function(req,res) {
    Book.remove({
      _id: req.params.book_id
    }, function (err,book) {
        if (err)
          res.send(err);

        res.json({message: 'Successfully deleted ' + res.name });

        });
    });//REST for this route (/books/:book_id)


//test the route
router.get('/', function (req,res) {
    res.json({message: 'hooray! welcome to the bookBox API!'});
});

//more routes can go here

//REGISTER ROUTES
//all will be prefixed with /api

app.use('/api', router);

//START THE SERVER
// =================
app.listen(port);
console.log('Magic happens on port ' + port);