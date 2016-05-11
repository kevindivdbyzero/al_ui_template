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
          'tmdb/services/exampleService'],
    function( angular, config, TMDBAPIService, exampleService ) {
        "use strict";

        var HomeController = function($scope, TMDBAPIService, exampleService ) {

            $scope.view   = {
                movies: [],
            };


            $scope.recentSearch = exampleService.getHistorySearches();

            var config  = angular.module("config");
            $scope.view = {urlImg: config.apiImg};

            var api = TMDBAPIService.Discover();
            api.discover.movies().then(function ( response ) {
                $scope.view.movies = response.data;                
            });

            
        };

        HomeController.$inject = [ '$scope', 'TMDBAPIService', 'exampleService' ];

        return HomeController;
    }
);