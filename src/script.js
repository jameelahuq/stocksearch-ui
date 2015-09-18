"use strict";
//import http from 'http';

var app = angular.module('app', ['ngRoute']);
//let track = require('../src/track-express.js');

//app.constant('flavor', 'chocolate');
//first is key, second is flavor
//then your controller must have it as an arg


app.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl : 'home.html',
    controller : 'mainCtrl'
  })

  .when('/add', {
    templateUrl : 'add.html',
    controller : 'addController'
  })

  .when('/tracked', {
    templateUrl : 'tracked.html',
    controller : 'trackedController'
  });
});

app.controller('mainController', function($scope) {
  $scope.message = "HEH?";
});

app.controller('addController', ['$scope', 'Tracked', '$http', function($scope, Tracked, $http){


  $scope.message = 'Imma add your trackas~~~.';
  $scope.addTickerToTracked = (ticker) => {
    console.log(ticker);
    Tracked.add(ticker).then((data)=>console.log('data', data));
  };

  $scope.tickerFinder = "";

  $scope.isAddingTicker = () => {
    //$scope.displayedTicker
    return $scope.displayedTicker !== undefined && ($scope.tickerFinder ===  "");
  };


  $scope.tickerDisplay = (tickerData) => {
    $scope.displayedTicker = tickerData;
    $scope.tickerFinder = "";
  };

  $scope.tickerData = {Symbol: ""};


  $scope.searchTicker = () => {
    var ticker = $scope.tickerFinder;
    ticker = ticker.toUpperCase();
    var url = "http://dev.markitondemand.com/Api/v2/Lookup/jsonp?input=" + ticker + "&callback=JSON_CALLBACK";
    $http.jsonp(url).success((data) => {
      console.log("searchies!!!");
      console.log(data);
      $scope.tickerData = data;
    });
  };
}]);

var array = [];

app.controller('trackedController', ['$scope', 'Tracked', function($scope, Tracked){
  $scope.message = 'These are the stocks you are currently tracking...';
  $scope.getTracked = () => {
    console.log("stuff");
    Tracked.get() //attach callback
        .then((data) => {array.push(data.data.tracked)})
        .catch((e) => {console.log(e)});
    console.log(array);
  };


}]);


app.factory('Tracked', function($http) {
  var Tracked = () => {};
  Tracked.get = () => $http.get('http://localhost:3000/tracked');
  Tracked.add = (tickerObj) => $http.post('http://localhost:3000/tracked', {newTicker: tickerObj});

  return Tracked;
});



