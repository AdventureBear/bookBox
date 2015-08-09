/**
 * Created by suzanne on 8/1/15.
 */
// app/routes/routes.js

//connect models
var Book = require('../models/book');
var User = require('../models/user');


//expose the routes

module.exports = function (app, router, passport) {

//ROUTES FOR API
//================
//create an instance of the express Router
//var router = express.Router();

//middleware for all requests
//log to console w/ each request
 // router.use(function (req, res, next) {
  //  console.log('Something is happening.');
  //  next();
  //});

//all routes that end in /api/books

  router.route('/books')
    //create a book
    .post(function (req, res) {
      var book = new Book();  //create book...from the schmea
      book.name = req.body.name; //set the name from the get request
      book.owner = req.user._id; //set the owner from the logged in user's id
      //console.log(req.user._id);
      var user = req.user; 
      //update owner's books array
    
      
      //save the book & check for errors, return all books
      book.save(function (err, book) {
        if (err)
          res.send(err);

        user.books.push(book._id);
        //add new book id to users collection
        user.save(function(err) {
          if (err)
            res.send(err);
        })
       // 
        
        console.log("Books of user " + req.user.books, "New Book ID: " + book._id);
        
         Book.find() //  find
        .populate("owner")
        .exec(function(err, books){
            if (err) return res.send(err);
        

          res.json(books);
        
        
        // Book.find(function (err, books) {
        //   if (err)
        //     res.send(err);

        //   res.json(books);
        });
        //res.json({message: 'Book created!'});
      });  //save
    })

    .get(function (req, res) {
       Book.find() //  find
      .populate("owner")
      .exec(function(err, books){
          if (err) return res.send(err);
      // Book.find
        
      // (function (err, books) {
      //   if (err)
      //     res.send(err);

        // populate books with owners email (or username) for display
          
        /// now i have a books object (array of books) 
     
        
         
           // only return the Persons email
          
        //console.log(books.owner.local.email);

        res.json(books);
      }); //  find
    });  //REST methods

//routes ending with /api/books/:book_id
  router.route('/books/:book_id')
    .get(function (req, res) {
      Book.findById(req.params.book_id, function (err, book) {
        if (err)
          res.send(err);
          
        console.log(res.json(book));

      });  //findByID
    })


    .put(function (req, res) {
      Book.findById(req.params.book_id, function (err, book) {
        if (err)
          res.send(err);


        book.name = req.body.name;
        book.owner = req.user._id; 

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
          return res.send(err);


        //get and return all the todos after deleting
      Book.find() //  find
        .populate("owner")
        .exec(function(err, books){
            if (err) return res.send(err);
        

          res.json(books);
        });
        //res.json({message: 'Successfully deleted ' + res.name });

      });
    });//REST for this route (/api/books/:book_id)

//routes ending with /api/users
    router.route('/users')
     .get(function (req, res) {
        User.find(function (err, users) {
        if (err)
          res.send(err);

        res.json(users);
      }); //  find
    });  //REST methods, function())


//routes ending with /api/users/:user_id
  router.route('/users/:user_id')
    .get(function (req, res) {
      User.findById(req.params.user_id, function (err, user) {
        if (err)
          res.send(err);
          
        console.log(res.json(user));
        console.log(req.user);

      });  //findByID
    });


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

