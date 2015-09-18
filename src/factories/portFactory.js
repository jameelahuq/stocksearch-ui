/**
 * Created by HUQ on 9/17/15.
// */
stocksUI.factory('Tracked', function($http) {
  var Tracked = () => {};
  Tracked.get = () => $http.get('https://git.heroku.com/thawing-plains-4288.git/tracked');
  Tracked.add = (tickerObj) => $http.post('https://git.heroku.com/thawing-plains-4288.git/tracked', {newTicker: tickerObj});
  Tracked.del = (tickerSym, refresh) => $http.post('https://git.heroku.com/thawing-plains-4288.git/delete', {tickerSymbol: tickerSym});

  return Tracked;
});