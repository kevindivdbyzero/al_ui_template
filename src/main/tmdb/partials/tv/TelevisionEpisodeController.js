/**
 * TelevisionEpisodeController provides controller support for fetching movies from tmdb
 *
 * @module tmdb.partials.movie.TelevisionEpisodeController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Someone Else <bskidmore@alertlogic.com>
 *
 * @returns instance of the TelevisionEpisodeController
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

        var TelevisionEpisodeController = function($scope, TMDBAPIService, $routeParams ) {

            $scope.view   = {
                details: {},
            };
            
            console.log("TODO: retrieve episode information here" );

        };

        TelevisionEpisodeController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams' ];

        return TelevisionEpisodeController;
    }
);
