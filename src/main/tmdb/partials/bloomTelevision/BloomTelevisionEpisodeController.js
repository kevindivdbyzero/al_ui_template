/**
 * BloomTelevisionEpisodeController provides controller support for fetching movies from tmdb
 *
 * @module tmdb.partials.bloomTelevision.BloomTelevisionEpisodeController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Carlos Orozco <carlos.orozco@correounvialle.edu.co>
 *
 * @returns instance of the BloomTelevisionEpisodeController
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

        var BloomTelevisionEpisodeController = function($scope, TMDBAPIService, $routeParams ) {

            $scope.view   = {
                details: {},
            };
            
            console.log("TODO: retrieve episode information here" );

        };

        BloomTelevisionEpisodeController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams' ];

        return BloomTelevisionEpisodeController;
    }
);   