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
        // 	$scope.currentMovie = 0;
        // 	$scope.setCurrentMovie = function(id) {
        //          $scope.currentMovie = id;   
        //     };
            $scope.current_object = undefined;
            $scope.media_type = undefined;
            $scope.setModalAction = function(media_type, id){
                $scope.current_object = id;
                $scope.media_type = media_type;
                console.log("media_type 1--"+ $scope.media_type);
                console.log("object 1--"+ $scope.current_object);
            };
        };

        AwesomeSearchResultsController.$inject = [ '$scope', 'TMDBAPIService' ];

        return AwesomeSearchResultsController;
    }
);