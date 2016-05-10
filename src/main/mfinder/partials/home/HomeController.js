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
          'mfinder/services/TMDBAPIService',
          'mfinder/services/AppStateService'],
    function( angular, config, TMDBAPIService, AppStateService ) {
        "use strict";

        var HomeController = function($scope, TMDBAPIService, AppStateService ) {
            
         
            $scope.view   = {
                last: [],
                movies: [],
                tv:[],
                people:[]
            };

            $scope.view.last = AppStateService.getLastVisitedList();

            var api = TMDBAPIService.Discover();
            var api_person = TMDBAPIService.Person();

            
            api.discover.movies().then(function ( response ) {
                $scope.view.movies = response.data;
            });

            api.discover.tv().then(function ( response ) {
                $scope.view.tv = response.data;
            });

            api_person.person.popular().then(function ( response ) {
                $scope.view.people = response.data;
            });
            
        };

        HomeController.$inject = [ '$scope', 'TMDBAPIService', 'AppStateService' ];

        return HomeController;
    }
);