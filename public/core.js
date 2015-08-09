//public/core.js
//created by Suzanne on 7/30/15

var bookBox = angular.module('bookBox', []);

function mainController($scope, $http){
  $scope.formData = {};

  //when landing on page, get all the books in the library
  $http.get('/api/books')
    .success(function(data){
     $scope.books = data;
      console.log(data);
        // data.forEach(function(book){
        //   //console.log(book.owner)
        //   //var userID = data.owner;
        //   $http.get('/api/users/' + book.owner )
        //           .success(function(book_owner){
        //                   console.log(book_owner.local.email);  // data from owner
        //                   book.owneremail = book_owner.local.email;
        //             }) 
        //   })
    })
    .error(function(data){
      console.log('Error: ' + data);
    });

  //when submitting the add form, send the text to the node API
  $scope.createBook = function() {
    $http.post('/api/books', $scope.formData)
      .success(function(data) {
        $scope.formData= {}; //clear the form so the user can enter data
        $scope.books = data;
        console.log(data);
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };

  //deleted a book after checking it
  $scope.deleteBook = function(id){
    $http.delete('/api/books/' + id)
      .success (function(data) {
        $scope.books = data;
        console.log(data);

    })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };


}