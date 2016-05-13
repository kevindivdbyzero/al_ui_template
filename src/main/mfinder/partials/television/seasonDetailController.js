/**
 * seasonDetailController provides controller support for getting season information from tmdb
 *
 * @module mfinder.partials.television.seasonDetailController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Andres Artunduaga < @alertlogic.com>
 *
 * @returns instance of the seasonDetailController
 *
 */

define( [ 'angular',
        'ngRoute',
        'config/config',
        'mfinder/services/TMDBAPIService'],
    function( angular, $routeParams, config, TMDBAPIService, $sce ) {
        "use strict";

        var seasonDetailController = function($scope, $routeParams, TMDBAPIService, $sce ) {

            $scope.view   = {
                images:config.apiImg,
                details: {},
                trailers: []
            };



        };

        seasonDetailController.$inject = [ '$scope', '$routeParams', 'TMDBAPIService', '$sce' ];

        return seasonDetailController;
    }
);