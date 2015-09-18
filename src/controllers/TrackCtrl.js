//stocksUI.controller('TrackCtrl', ['$scope', 'Tracked', function($scope, Tracked){
stocksUI.controller('TrackCtrl', ['$scope', 'Tracked', function($scope, Tracked){
  $scope.message = 'These are the stocks you are currently tracking...';


  $scope.displayTrackedTickers = (objArray) => {
    $scope.arrayOfTrackedTickers = objArray;
    console.log(objArray);
  };

  $scope.getTracked = () => {
    console.log("Me so slooooow");
    Tracked.get()
        .then((data) => $scope.displayTrackedTickers(data.data.tracked))
        .catch((e) => {console.log(e)});
  };

  $scope.removeTicker = (ticker) => {
    console.log("trackCtr: " + ticker.Symbol);
    Tracked.del(ticker.Symbol, $scope.getTracked());
  };


}]);