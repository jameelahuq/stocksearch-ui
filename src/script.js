"use strict";
//import http from 'http';

var app = angular.module('app', ['ngRoute']);



//app.constant('flavor', 'chocolate');
//first is key, second is flavor
//then your controller must have it as an arg


app.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl : 'home.html',
    controller : 'mainController'
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

app.controller('addController', function($scope, $http){
  $scope.message = 'Imma add your trackas~~~.';
  $scope.addTickerToTracked = () => {
  };

  $scope.tickerFinder = "";

  $scope.addingTicker = () => {
    //$scope.displayedTicker
    return $scope.displayedTicker !== undefined && ($scope.tickerFinder ===  "");
  }

  $scope.tickerDisplay = (tickerData) => {
    //$('#tickerSelect').addClass('hide');
    $scope.displayedTicker = tickerData;
    $scope.tickerFinder = "";
    //console.log($scope.displayedTicker + "hello");
  };

  $scope.tickerData = {Symbol: ""};

  $scope.addTicker = () => {
    console.log("FJEFJEFOMGFMF");
  };

  $scope.searchTicker = () => {
    var ticker = $scope.tickerFinder;
    ticker = ticker.toUpperCase();
    var url = "http://dev.markitondemand.com/Api/v2/Lookup/jsonp?input=" + ticker + "&callback=JSON_CALLBACK";
    $http.jsonp(url).success((data) => {
      console.log("searchies for more!!!");
      console.log(data);
      $scope.tickerData = data;
      //$('#tickerSelect').removeClass("hide");
    });
  };
  //$scope.searchTicker("http://dev.markitondemand.com/Api/v2/Lookup/jsonp?input=" + ticker + "&callback=JSON_CALLBACK")
});

app.controller('trackedController', function($scope){
  $scope.message = 'Contact us! JK. This is just a demo.';
});





//
//app.controller("planet-drop-down", ($scope, $http) => {
//
//  $scope.planetArray = [];
//  $scope.getPlanetsOnPage = (url) => {
//    $http.get(url).success((data) => {
//      console.log(data.results);
//      $scope.planetArray.push.apply($scope.planetArray, data.results);
//      if(data.next !== null) {
//        //console.log(data.next);
//        $scope.getPlanetsOnPage(data.next);
//      }
//    });
//    //console.log($scope.planetArray[0].name);
//  };
//  $scope.getPlanetsOnPage("http://swapi.co/api/planets/");
//  console.log($scope.planetArray);



//let addTickerToTracked = () => {
//  console.log("if this works, I'll be amazed");
//};



