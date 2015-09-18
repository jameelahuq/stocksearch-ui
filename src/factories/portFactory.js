/**
 * Created by HUQ on 9/17/15.
// */
stocksUI.factory('Tracked', function($http) {
  var Tracked = () => {};
  Tracked.get = () => $http.get('https://evening-beyond-5571.herokuapp.com/tracked');
  Tracked.add = (tickerObj) => $http.post('https://evening-beyond-5571.herokuapp.com/tracked', {newTicker: tickerObj});
  Tracked.del = (tickerSym, refresh) => $http.post('https://evening-beyond-5571.herokuapp.com/delete', {tickerSymbol: tickerSym});

  return Tracked;
});