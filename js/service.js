angular.module('gifChat')

.factory('myService', function ($http, $q) {
  var service = {};

  service.searchGif = function (query) {
    // I need to update the url to pass the input query to giphy to search for those results
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=dc6zaTOxFJmzC';
    // Need to pass the promise back to the controller
    return $http.get(url);
  };

  return service;
});
