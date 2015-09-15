var scotchApp = angular.module('scotchApp', ['ngRoute']);

scotchApp.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl : 'home.html',
    controller : 'mainController'
  })

  .when('/about', {
    templateUrl : 'about.html',
    controller : 'aboutController'
  })

  .when('/contact', {
    templateUrl : 'contact.html',
    controller : 'contactController'
  });
});

scotchApp.controller('mainController', function($scope){
  $scope.message = 'Everyone come and see how good I look!';
});

scotchApp.controller('aboutController', function($scope){
  $scope.message = 'Look! I am an about page.';
});

scotchApp.controller('contactController', function($scope){
  $scope.message = 'Contact us! JK. This is just a demo.';
});
