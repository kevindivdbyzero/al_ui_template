/**
 * BloomMovieController provides controller support for fetching movies from tmdb
 *
 * @module tmdb.partials.bloomMovie.BloomMovieController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Carlos Orozco <carlos.orozco@correounivalle.edu.co>
 *
 * @returns instance of the BloomMovieController
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

        var BloomMovieController = function($scope, TMDBAPIService, $routeParams) {            
            
//$scope.dato = $routeParams.id;

        };

        BloomMovieController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams'];        

        return BloomMovieController;
    }
);