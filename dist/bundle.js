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
	
	__webpack_require__(/*! ./ngApp */ 1);
	
	//import "./controllers/NavCtrl.js";
	
	__webpack_require__(/*! ./controllers/MainCtrl.js */ 2);
	
	__webpack_require__(/*! ./controllers/AddCtrl.js */ 3);
	
	__webpack_require__(/*! ./controllers/TrackCtrl.js */ 4);
	
	__webpack_require__(/*! ./factories/portFactory.js */ 5);
	
	//var array = [];
	//
	//
	//
	//

/***/ },
/* 1 */
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

/***/ },
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
/* 3 */
/*!************************************!*\
  !*** ./src/controllers/AddCtrl.js ***!
  \************************************/
/***/ function(module, exports) {

	/**
	 * Created by HUQ on 9/17/15.
	 */
	"use strict";
	
	stocksUI.controller("AddCtrl", function ($scope, $http, Tracked) {
	  $scope.message = "Add some tickers to track";
	
	  $scope.addTickerToTracked = function (ticker) {
	    console.log(ticker);
	    Tracked.add(ticker); //.then((data)=>console.log('data', data));
	  };
	
	  $scope.tickerFinder = "";
	
	  $scope.isAddingTicker = function () {
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
	      $scope.tickerData = data;
	    });
	  };
	});
	
	//stocksUI.controller("AddCtrl", ['$scope', 'Tracked', '$http', (($scope, Tracked, $http) => {

/***/ },
/* 4 */
/*!**************************************!*\
  !*** ./src/controllers/TrackCtrl.js ***!
  \**************************************/
/***/ function(module, exports) {

	//stocksUI.controller('TrackCtrl', ['$scope', 'Tracked', function($scope, Tracked){
	'use strict';
	
	stocksUI.controller('TrackCtrl', ['$scope', 'Tracked', function ($scope, Tracked) {
	  $scope.message = 'These are the stocks you are currently tracking...';
	
	  $scope.displayTrackedTickers = function (objArray) {
	    $scope.arrayOfTrackedTickers = objArray;
	    console.log(objArray);
	  };
	
	  $scope.getTracked = function () {
	    console.log("Me so slooooow");
	    Tracked.get().then(function (data) {
	      return $scope.displayTrackedTickers(data.data.tracked);
	    })['catch'](function (e) {
	      console.log(e);
	    });
	  };
	
	  $scope.removeTicker = function (ticker) {
	    console.log("trackCtr: " + ticker.Symbol);
	    Tracked.del(ticker.Symbol, $scope.getTracked());
	  };
	}]);

/***/ },
/* 5 */
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
	    return $http.get('https://thawing-plains-4288.herokuapp.com/tracked');
	  };
	  Tracked.add = function (tickerObj) {
	    return $http.post('https://thawing-plains-4288.herokuapp.com/tracked', { newTicker: tickerObj });
	  };
	  Tracked.del = function (tickerSym, refresh) {
	    return $http.post('https://thawing-plains-4288.herokuapp.com/delete', { tickerSymbol: tickerSym });
	  };
	
	  return Tracked;
	});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map