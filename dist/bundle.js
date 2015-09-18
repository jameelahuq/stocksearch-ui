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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	//import http from 'http';
	
	__webpack_require__(/*! ./ngApp */ 4);
	
	//import "./controllers/NavCtrl.js";
	
	__webpack_require__(/*! ./controllers/MainCtrl.js */ 2);
	
	__webpack_require__(/*! ./controllers/AddCtrl.js */ 5);
	
	__webpack_require__(/*! ./controllers/TrackCtrl.js */ 6);
	
	__webpack_require__(/*! ./factories/portFactory.js */ 7);
	
	//var array = [];
	//
	//
	//
	//

/***/ },
/* 1 */,
/* 2 */
/*!*************************************!*\
  !*** ./src/controllers/MainCtrl.js ***!
  \*************************************/
/***/ function(module, exports) {

	/**
	 * Created by HUQ on 9/17/15.
	 */
	"use strict";
	
	stocksUI.controller("MainCtrl", function ($scope) {
	  return $scope.message = "Here is my main pages message";
	});

/***/ },
/* 3 */,
/* 4 */
/*!**********************!*\
  !*** ./src/ngApp.js ***!
  \**********************/
/***/ function(module, exports) {

	/**
	 * Created by HUQ on 9/17/15.
	 */
	
	'use strict';
	
	window.stocksUI = angular.module('stocks-ui', ['ui.router']);
	
	stocksUI.config(function ($stateProvider, $urlRouterProvider) {
	
	  $urlRouterProvider.otherwise('/');
	
	  $stateProvider.state('main', {
	    url: '/',
	    templateUrl: 'templates/main.html',
	    controller: "MainCtrl"
	  }).state('add', {
	    url: '/add',
	    templateUrl: 'templates/add.html',
	    controller: "AddCtrl"
	  }).state('track', {
	    url: '/track',
	    templateUrl: 'templates/track.html',
	    controller: "TrackCtrl"
	  });
	});
	
	//app.config(function($routeProvider) {
	//  $routeProvider
	//
	//
	//      .when('/add', {
	//        templateUrl : 'add.html',
	//        controller : 'addController'
	//      })
	//
	//      .when('/tracked', {
	//        templateUrl : 'tracked.html',
	//        controller : 'trackedController'
	//      });
	//});

/***/ },
/* 5 */
/*!************************************!*\
  !*** ./src/controllers/AddCtrl.js ***!
  \************************************/
/***/ function(module, exports) {

	/**
	 * Created by HUQ on 9/17/15.
	 */
	"use strict";
	
	stocksUI.controller("AddCtrl", function ($scope, $http, Tracked) {
	  $scope.message = "Add some trackers BBBIIIIIIIIIII";
	
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
	});
	
	//stocksUI.controller("AddCtrl", ['$scope', 'Tracked', '$http', (($scope, Tracked, $http) => {

/***/ },
/* 6 */
/*!**************************************!*\
  !*** ./src/controllers/TrackCtrl.js ***!
  \**************************************/
/***/ function(module, exports) {

	//stocksUI.controller('TrackCtrl', ['$scope', 'Tracked', function($scope, Tracked){
	'use strict';
	
	stocksUI.controller('TrackCtrl', ['$scope', function ($scope) {
	  $scope.message = 'These are the stocks you are currently tracking...';
	  $scope.removeTicker = function () {
	    return console.log('GOOOOAAAAAALL!!!!!');
	  };
	
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
	
	  //
	}]);

/***/ },
/* 7 */
/*!**************************************!*\
  !*** ./src/factories/portFactory.js ***!
  \**************************************/
/***/ function(module, exports) {

	/**
	 * Created by HUQ on 9/17/15.
	// */
	'use strict';
	
	stocksUI.factory('Tracked', function ($http) {
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