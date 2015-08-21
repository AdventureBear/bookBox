angular.module('bookBoxAuth', ['ngRoute'])

    .config(function($routeProvider){
      $routeProvider
        .when("/index.html", {templateUrl:"/partials/login.html"});
        //.when("/new", {templateUrl:"/partials/edit.html", controller:"NewCtrl"})
        //.when("/edit/:id", {templateUrl:"/partials/edit.html", controller:"EditCtrl"})
        //.otherwise({redirectTo:'/'});
    })
  
    .controller('AppCtrl', ['$scope', 
        function ($scope) {
            $scope.test =  "Rolling in the Fields";
               
        }
    ]);