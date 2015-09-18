/**
 * Created by HUQ on 9/17/15.
 */

window.stocksUI = angular.module('stocks-ui', ['ui.router']);

stocksUI.config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
          .state('main', {
            url: '/',
            templateUrl: 'templates/main.html',
            controller: "MainCtrl"
          })
          .state('add', {
            url: '/add',
            templateUrl: 'templates/add.html',
            controller: "AddCtrl"
          })
          .state('track', {
            url: '/track',
            templateUrl: 'templates/track.html',
            controller: "TrackCtrl"
          })

    });