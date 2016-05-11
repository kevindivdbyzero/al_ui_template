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
          'tmdb/services/TMDBAPIService',
          'tmdb/services/exampleService'],
    function( angular, $routeParams, config, TMDBAPIService, exampleService ) {
        "use strict";

        var MovieController = function($rootScope, $scope, TMDBAPIService, exampleService, $routeParams ) {

            $scope.view   = {
                details: {},
            };
            
            var api = TMDBAPIService.Movie();
            api.movie.movie($routeParams.id).then( function ( response ) {
                $scope.view.details = response.data;
                var data = {id:"",name:"",};
                data.id = response.data.id;
                data.name = response.data.original_title;                
                $rootScope.$emit('saver.event', data);
            });

        };

        MovieController.$inject = [ '$rootScope', '$scope', 'TMDBAPIService','exampleService', '$routeParams' ];

        return MovieController;
    }
);