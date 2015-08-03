/**
 * Created by suzanne on 8/1/15.
 */
// app/routes/routes.js

//connect models
var Book = require('../models/book');


//expose the routes

module.exports = function (app, router) {

  //HOME PAGE (with login links)
  app.get('/', function(req,res){
    res.render('./public/views/index.ejs');
  });


//ROUTES FOR API
//================
//create an instance of the express Router
//var router = express.Router();

//middleware for all requests
//log to console w/ each request
  router.use(function (req, res, next) {
    console.log('Something is happening.');
    next();
  });


//more api routes here
//all routes that end in /books
//test change


  router.route('/books')
    //create a book
    .post(function (req, res) {
      var book = new Book();  //create book...from the schmea
      book.name = req.body.name; //set the name from the get request

      //save the book & check for errors, return all books
      book.save(function (err) {
        if (err)
          res.send(err);

        Book.find(function (err, books) {
          if (err)
            res.send(err);

          res.json(books);
        });
        //res.json({message: 'Book created!'});
      });  //save
    })

    .get(function (req, res) {
      Book.find(function (err, books) {
        if (err)
          res.send(err);

        res.json(books);
      }); //  find
    });  //REST methods

//routes ending with /books/:book_id
  router.route('/books/:book_id')
    .get(function (req, res) {
      Book.findById(req.params.book_id, function (err, book) {
        if (err)
          res.send(err);

        res.json(book);

      });  //findByID
    })


    .put(function (req, res) {
      Book.findById(req.params.book_id, function (err, book) {
        if (err)
          res.send(err);


        book.name = req.body.name;

        //save the book & check for errors
        book.save(function (err) {
          if (err)
            res.send(err);

          res.json({message: 'Book updated!'});
        });
      });  //findByID


    })

    .delete(function (req, res) {
      Book.remove({
        _id: req.params.book_id
      }, function (err, book) {
        if (err)
          res.send(err);


        //get and return all the todos after deleting
        Book.find(function (err, books) {
          if (err)
            res.send(err);

          res.json(books);
        });
        //res.json({message: 'Successfully deleted ' + res.name });

      });
    });//REST for this route (/books/:book_id)


  //test the route
  router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to the bookBox API!'});
  });

  //REGISTER ROUTES
  //all will be prefixed with /api

  app.use('/api', router);



  /*app.get('*', function (req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });


  app.use(function(req, res, next) {
    res.status(404).send('Sorry cannot find that!');
  });
*/



};

