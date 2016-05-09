/**
 * TelevisionController provides controller support for fetching movies from tmdb
 *
 * @module tmdb.partials.movie.TelevisionController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Someone Else <bskidmore@alertlogic.com>
 *
 * @returns instance of the TelevisionController
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

        var TelevisionController = function($scope, TMDBAPIService, $routeParams ) {

            $scope.view   = {
                details: {},
                id: $routeParams.tvshow_id,
            };
            
            TMDBAPIService.getTVShowDetails( $routeParams.tvshow_id ).then( function( response ) {
                console.log("Television!", response.data );
                $scope.view.details=response;
            } );

            TMDBAPIService.getTVShowSeasons( $routeParams.tvshow_id ).then( function( response ) {
                console.log ("Seasons", response);
                $scope.view.seasons=response;
            });

        };

        TelevisionController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams' ];

        return TelevisionController;
    }
);
