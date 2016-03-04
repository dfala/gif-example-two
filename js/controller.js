angular.module('gifChat')

.controller('MyController', function ($scope, myService) {
  // Need to initiate firebase
  var myFirebaseRef = new Firebase("https://gif-chat-pants.firebaseio.com/images");
  $scope.images = [];

  // This is getting all the data when the controller loads
  // We use once to get a one time call -- to use real time use: .on
  myFirebaseRef.once('value', function (dataSnapshot) {
    // .val() is grabbed from the docs to get the object with my data
    var myData = dataSnapshot.val();

    // Need to loop trough object to convert it to array
    for (key in myData) {
      $scope.images.unshift(myData[key]);
    }

    // Changes on $scope.images happened outside of angular world
    // $digest() triggers a digest cycle to tell Angular that there were changes made
    $scope.$digest();

  }, function (err) {
    // Firebase gives me a callback error function if anything goes wrong
    console.error(err);
  });

  $scope.addGif = function (query) {
    // Alertify error is just for the user to be aware of the error
    if (!query) return alertify.error('Bro... for reals?');

    myService.searchGif(query)
    .then(function (result) {
      // Math.floor is looking for a random number so that it doesn't always give me the first result
      var myImage = result.data.data[Math.floor((Math.random() * (result.data.data.length - 1)))].images.original.url;
      // This stores it on firebase
      myFirebaseRef.push(myImage);

      // This is to make changes to the UI real time (unshift puts it at the top)
      $scope.images.unshift(myImage);
    })
    .catch(function (err) {
      // Catch is an error handling method
      alertify.error('There was an error :(');
      console.error(err);
    });
  };
})
