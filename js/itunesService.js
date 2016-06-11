angular.module('itunes').service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here

    this.getDataFromServer = function(){
      var deferred = $q.defer();
      $http.jsonp('https://itunes.apple.com/search?term=jack+johnson&callback=JSON_CALLBACK')
      .then(function(response){
        var getDataFromServer = response.data.results;//result is from itunes object
        console.log(getDataFromServer);
        getDataFromServer = getDataFromServer.map(function(item,index,arr){
          //return an object mentioned in controller.

          return {
            Artist: item.artistName,
            Collection: item.collectionCensoredName ,
            AlbumArt: item.artworkUrl30,
            Type:item.primaryGenreName,
            CollectionPrice:item.collectionPrice ,
            Play:item.previewUrl,
          }
        })
        deferred.resolve(getDataFromServer);
         //to see the data.
      });//response
      return deferred.promise;
    }; //getDataFromServer function

});

//https://itunes.apple.com/search?term=jack+johnson
//http://swapi.co/api/starships/
