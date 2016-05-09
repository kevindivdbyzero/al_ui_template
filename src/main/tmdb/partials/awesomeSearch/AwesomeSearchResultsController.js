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
          'config/config',
          'tmdb/services/TMDBAPIService'],
    function( angular, config, TMDBAPIService ) {
        "use strict";

        var AwesomeSearchResultsController = function($scope, TMDBAPIService ) {
        	$scope.currentMovie = 0;
        	$scope.setCurrentMovie = function(id) {
                 $scope.currentMovie = id;
                 var promise = TMDBAPIService.getMovieInfo(id);  
                 var success = function(response){
                  console.log(response.data);
                 };
                 var error = function(){
                  console.log(arguments);
                 }
                 promise.then(success, error);
          };
        };

        AwesomeSearchResultsController.$inject = [ '$scope', 'TMDBAPIService' ];

        return AwesomeSearchResultsController;
    }
);