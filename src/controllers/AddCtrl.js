/**
 * Created by HUQ on 9/17/15.
 */
stocksUI.controller("AddCtrl", (($scope, $http, Tracked) => {
  $scope.message = "Add some trackers BBBIIIIIIIIIII";

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

}));

//stocksUI.controller("AddCtrl", ['$scope', 'Tracked', '$http', (($scope, Tracked, $http) => {
