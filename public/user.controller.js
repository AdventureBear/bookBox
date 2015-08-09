//public/core.js
//created by Suzanne on 7/30/15

var usersBookBox = angular.module('usersBookBox', []);

function userController($scope, $http){
  //$scope.formData = {};

  //when landing on page, get all the books in the library
  $http.get('/api/users')
    .success(function(data){
      $scope.users = data;
      console.log(data);
      
        
      
    })
    .error(function(data){
      console.log('Error: ' + data);
    });

  // //when submitting the add form, send the text to the node API
  // $scope.createU = function() {
  //   $http.post('/api/books', $scope.formData)
  //     .success(function(data) {
  //       $scope.formData= {}; //clear the form so the user can enter data
  //       $scope.books = data;
  //       console.log(data);
  //     })
  //     .error(function(data){
  //       console.log('Error: ' + data);
  //     });
  // };

  //deleted a book after checking it
  $scope.deleteUser = function(id){
    $http.delete('/api/users/' + id)
      .success (function(data) {
        $scope.users = data;
        console.log(data);

    })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };


}