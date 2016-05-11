/**
 * HomeController provides controller support for loading the main page with Search and Popular Movies
 *
 * @module tmdb.partials.home.HomeController
 *
 * @requires angular
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @returns instance of the HomeController
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',
          'config/config',
          'tmdb/services/TMDBAPIService',
          'tmdb/services/AppStateService'],
    function( angular, config, TMDBAPIService, AppStateService ) {
        "use strict";

        var HomeController = function($scope, TMDBAPIService, AppStateService ) {

            $scope.view   = {
                movies: [],
            };

            var config  = angular.module("config");
            $scope.view = {urlImg: config.apiImg};

            var api = TMDBAPIService.Discover();
            api.discover.movies().then(function ( response ) {
                $scope.view.movies = response.data;
            });
            
            $scope.view.userHistory = AppStateService.getHistory();
        };

        HomeController.$inject = [ '$scope', 'TMDBAPIService', 'AppStateService' ];

        return HomeController;
    }
);