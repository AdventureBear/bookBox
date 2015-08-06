/**
 * Created by suzanne on 8/1/15.
 */
// /app/routes/routes.static.js

// from easy authentication tutorial:
//https://scotch.io/tutorials/easy-node-authentication-setup-and-local

var path = require('path');

module.exports = function(app,passport){



    //HOME PAGE (with login links)
  app.get('/', function(req,res){
    console.log("isAuth? ",req.isAuthenticated());
    if (req.isAuthenticated()){
      //res.sendfile('../books/index.html');
      // you'll want to use res.render for routes
      //res.sendFile(path.resolve('temp/index.html'))
     // res.sendfile(path.resolve('../../views/books/index.html')), 
        res.render('../views/books/index.ejs', {
        books: []
      })
    }else{
      res.render('../views/index.ejs');

    }
  });
  
  
  
  
  // LOGIN ===============================
  // show the login form
  app.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    //successRedirect : __dirname + '../../../views/books/index.html', // redirect to the secure profile section
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));


  // SIGNUP ==============================
  // show the signup form
  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
   app.post('/signup', passport.authenticate('local-signup',{
     successRedirect : '/profile', //redirect to profile
     failureRedirect : '/signup', //redirect tos ign up page if there is a problem
     failureFlash : true //allow flash messages
   }));


  // PROFILE SECTION =====================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template
    });
  });

  // LOGOUT 
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}



