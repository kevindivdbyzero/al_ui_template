/**
 * AwesomeSearchResultsController provides controller support  displaying results
 *
 * @module tmdb.partials.search.AwesomeSearchResultsController
 *
 * @requires angular
 * @requires config
 * @requires TMDBAPIService
 *
 * @author John Gomez <jgomez@alertlogic.com>
 *
 * @returns instance of the AwesomeSearchResultsController
 *
 * @copyright Alert Logic, Inc 2016
 *
 */

define( [ 'angular',
          'ngRoute',
          'config/config',
          'tmdb/services/TMDBAPIService'],
    function( angular, config, TMDBAPIService, $routeParams, $sce ) {
        "use strict";

        var ResultsModalController = function($scope, TMDBAPIService ) {
            $scope.details = {};
            $scope.ysrc = undefined;

            var movieApi = TMDBAPIService.Movie();
            var personApi = TMDBAPIService.Person();

            var getDataTrailer = function() {
                movieApi.movie.movie($scope.object).then(function(response) {
                    $scope.details = response.data;
                    $scope.ysrc = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + response.data.videos.results[0].key + "/?rel=0&autoplay=1");
                });
            };
            
            var getDataBio = function(){
                    personApi.person.person($scope.object).then(function(response){
                    $scope.details = response.data; 
                });
            };
     
            $scope.$watch('current_object', function(newValue, oldValue) {
                console.log("media type 2 --" + $scope.media_type);
                console.log("object 2 --" + $scope.current_object);
                if($scope.media_type === 'movie'){
                     getDataTrailer();
                 }else{
                     if($scope.media_type === 'person'){
                        getDataBio();    
                     }
                     
                 }
               
            });
           
        };

        ResultsModalController.$inject = [ '$scope', 'TMDBAPIService' ];

        return ResultsModalController;
    }
);