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
          'tmdb/services/TMDBAPIService'],
    function( angular, $routeParams, config, TMDBAPIService ) {
        "use strict";

        var MovieController = function($rootScope, $scope, TMDBAPIService, $routeParams ) {

            $scope.view   = {
                details: {},
            };
            
            var api = TMDBAPIService.Movie();
            api.movie.movie($routeParams.id).then( function ( response ) {
                $scope.view.details = response.data;
                //  send an event here that includes response.data                
            });

            $scope.rating = 1;
            $scope.sendRating = function(rating){
                $rootScope.$emit('movie.rating',rating, $routeParams.id);
                console.log("Sending rating==>"+ rating+ " Idmovie: "+ $routeParams.id);                
                $scope.rating = 1;
            };

        };

        MovieController.$inject = [ '$rootScope','$scope', 'TMDBAPIService', '$routeParams' ];

        return MovieController;
    }
);
