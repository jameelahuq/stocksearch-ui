/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ function(module, exports) {

	"use strict";
	//import http from 'http';
	
	var app = angular.module('app', ['ngRoute']);
	//let track = require('../src/track-express.js');
	
	//app.constant('flavor', 'chocolate');
	//first is key, second is flavor
	//then your controller must have it as an arg
	
	app.config(function ($routeProvider) {
	  $routeProvider.when('/', {
	    templateUrl: 'home.html',
	    controller: 'mainController'
	  }).when('/add', {
	    templateUrl: 'add.html',
	    controller: 'addController'
	  }).when('/tracked', {
	    templateUrl: 'tracked.html',
	    controller: 'trackedController'
	  });
	});
	
	app.controller('mainController', function ($scope) {
	  $scope.message = "HEH?";
	});
	
	app.controller('addController', ['$scope', 'Tracked', '$http', function ($scope, Tracked, $http) {
	
	  $scope.message = 'Imma add your trackas~~~.';
	  $scope.addTickerToTracked = function (ticker) {
	    console.log(ticker);
	    Tracked.add(ticker).then(function (data) {
	      return console.log('data', data);
	    });
	  };
	
	  $scope.tickerFinder = "";
	
	  $scope.isAddingTicker = function () {
	    //$scope.displayedTicker
	    return $scope.displayedTicker !== undefined && $scope.tickerFinder === "";
	  };
	
	  $scope.tickerDisplay = function (tickerData) {
	    $scope.displayedTicker = tickerData;
	    $scope.tickerFinder = "";
	  };
	
	  $scope.tickerData = { Symbol: "" };
	
	  $scope.searchTicker = function () {
	    var ticker = $scope.tickerFinder;
	    ticker = ticker.toUpperCase();
	    var url = "http://dev.markitondemand.com/Api/v2/Lookup/jsonp?input=" + ticker + "&callback=JSON_CALLBACK";
	    $http.jsonp(url).success(function (data) {
	      console.log("searchies!!!");
	      console.log(data);
	      $scope.tickerData = data;
	    });
	  };
	}]);
	
	var array = [];
	
	app.controller('trackedController', ['$scope', 'Tracked', function ($scope, Tracked) {
	  $scope.message = 'These are the stocks you are currently tracking...';
	  $scope.getTracked = function () {
	    console.log("stuff");
	    Tracked.get() //attach callback
	    .then(function (data) {
	      array.push(data.data.tracked);
	    })['catch'](function (e) {
	      console.log(e);
	    });
	    console.log(array);
	  };
	}]);
	
	app.factory('Tracked', function ($http) {
	  var Tracked = function Tracked() {};
	  Tracked.get = function () {
	    return $http.get('http://localhost:3000/tracked');
	  };
	  Tracked.add = function (tickerObj) {
	    return $http.post('http://localhost:3000/tracked', { newTicker: tickerObj });
	  };
	
	  return Tracked;
	});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map