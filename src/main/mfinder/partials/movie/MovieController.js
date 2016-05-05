/**
 * MovieController provides controller support for fetching movies from tmdb
 *
 * @module tmdb.partials.movie.MovieController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @returns instance of the MovieController
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',
          'ngRoute',
          'config/config',
          'mfinder/services/TMDBAPIService'],
    function( angular, $routeParams, config, TMDBAPIService, $sce ) {
        "use strict";

        var MovieController = function($scope, TMDBAPIService, $routeParams, $sce ) {

            $scope.view   = {
                details: {},
                trailers: []
            };
            
                        
            
            var api = TMDBAPIService.Movie();
            api.movie.movie($routeParams.id).then( function ( response ) {
                $scope.view.details = response.data;
                
                var trailers = response.data.videos.results;
                
                for(var i=0; i<trailers.length ;i++ ){
                    $scope.view.trailers[i] = $sce.trustAsResourceUrl("http://www.youtube.com/embed/"+trailers[i].key);
                }
                
            });

        };

        MovieController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams', '$sce' ];

        return MovieController;
    }
);