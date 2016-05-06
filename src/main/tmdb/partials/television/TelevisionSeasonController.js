/**
 * TelevisionSeasonController provides controller support for fetching movies from tmdb
 *
 * @module tmdb.partials.movie.TelevisionSeasonController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Someone Else <bskidmore@alertlogic.com>
 *
 * @returns instance of the TelevisionSeasonController
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

        var TelevisionSeasonController = function($scope, TMDBAPIService, $routeParams ) {

            $scope.view   = {
                details: {},
            };
            

            console.log("Route params: ", $routeParams );
            /* ROUTE definition: '/television/:tvshow_id/season/:season_number' */
            TMDBAPIService.getTVShowSeason( $routeParams.tvshow_id, $routeParams.season_number ).then( function( season ) {
                console.log("Season information: ", season );
            } );

        };

        TelevisionSeasonController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams' ];

        return TelevisionSeasonController;
    }
);
