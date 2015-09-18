//stocksUI.controller('TrackCtrl', ['$scope', 'Tracked', function($scope, Tracked){
stocksUI.controller('TrackCtrl', ['$scope', function($scope){
  $scope.message = 'These are the stocks you are currently tracking...';
  $scope.removeTicker = () => console.log('GOOOOAAAAAALL!!!!!');

  $scope.getTracked = () => {
    console.log("stuff");
    Tracked.get() //attach callback
        .then((data) => {array.push(data.data.tracked)})
        .catch((e) => {console.log(e)});
    console.log(array);
  };

//
}]);