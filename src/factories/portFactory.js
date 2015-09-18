/**
 * Created by HUQ on 9/17/15.
// */
stocksUI.factory('Tracked', function($http) {
  var Tracked = () => {};
  Tracked.get = () => $http.get('http://localhost:3000/tracked');
  Tracked.add = (tickerObj) => $http.post('http://localhost:3000/tracked', {newTicker: tickerObj});
  Tracked.del = (tickerSym, refresh) => $http.post('http://localhost:3000/delete', {tickerSymbol: tickerSym});

  return Tracked;
});