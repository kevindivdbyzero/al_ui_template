/**
 * Creates the application root for an angular application at uri (/)
 *
 * @module app
 * 
 * @requires config/config
 * @requires ngRoute
 * @requires ngResource
 * @requires LocalStorageModule
 *
 * @param angular RequireJS inclusion of AngularJS library
 * @param config RequireJS inclusion of config/config
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @returns instance of the app
 *
 * @copyright Alert Logic, Inc 2014
 */

define([ 'angular',
         'config/config',
         'ngRoute', 'ngResource', 'LocalStorageModule', 'ngMaterial', 'ocNgRepeat',
         'mfinder/services/TMDBAPIService',
         'mfinder/partials/navigation/navigationController',
         'mfinder/partials/search/SearchController',
         'mfinder/partials/home/HomeController',
         'mfinder/partials/movie/MovieController',
         'mfinder/partials/person/PersonController',
         'mfinder/partials/remoteImageLoader/RemoteImageLoader',
         'mfinder/partials/popularMovies/popularMoviesController',
         'mfinder/partials/popularTv/popularTvController',
         'mfinder/partials/popularPeople/popularPeopleController',
         'mfinder/directives/navigation',
         'mfinder/directives/search',
         'mfinder/directives/popularMovies',
         'mfinder/directives/popularTv',
         'mfinder/directives/popularPeople',
         'mfinder/directives/personDetail',
         'mfinder/directives/personCrew',
         'mfinder/directives/personCast',
         'mfinder/directives/movieDetail',
         'mfinder/directives/similarMovies',
         'mfinder/directives/movieCast',
         'mfinder/directives/movieCrew' ], 

    function( angular, config, $resource, $location, LocalStorageModule, ngMaterial, ocNgRepeat,

              TMDBAPIService, navigationController, SearchController, HomeController, MovieController, PersonController, 
              RemoteImageLoader, popularMoviesController, popularTvController, popularPeopleController, navigationDirective, searchDirective, popularMoviesDirective,
              popularTvDirective, popularPeopleDirective,
              personDetailDirective, personCrewDirective, personCastDirective,
              movieDetailDirective, similarMoviesDirective, movieCastDirective, movieCrewDirective ) {
    	"use strict";

        /** @constructs app */

        var angularModules = config.standardAngularModules.concat( 'LocalStorageModule', 'ngMaterial','ocNgRepeat');


        /** @constructs app */
        var app = angular.module("app", angularModules );

        //  Configure $locationProvider and $routeProvider to allow top-level navigation within this route
    	app.config(['$locationProvider', function($locationProvider) {
                            
            $locationProvider.html5Mode(false);
            
    	}]);

        app.service( "TMDBAPIService", TMDBAPIService);

        app.controller( "navigationController", navigationController);
        app.directive( "navigation", navigationDirective );
    
        app.controller( "SearchController", SearchController);
        app.directive( "search", searchDirective );

        app.controller( "popularMoviesController", popularMoviesController);
        app.directive( "popularMovies", popularMoviesDirective );

        app.controller( "popularTvController", popularTvController);
        app.directive( "popularTv", popularTvDirective );

        app.controller( "popularPeopleController", popularPeopleController);
        app.directive( "popularPeople", popularPeopleDirective );



        app.controller( "HomeController", HomeController );
        app.controller( "MovieController", MovieController );
        app.controller( "PersonController", PersonController);
        app.controller( "RemoteImageLoader", RemoteImageLoader );



        app.directive( "personDetail", personDetailDirective );
        app.directive( "personCrew", personCrewDirective );
        app.directive( "personCast", personCastDirective );
        app.directive( "movieDetail", movieDetailDirective );
        app.directive( "similarMovies", similarMoviesDirective );
        app.directive( "movieCast", movieCastDirective );
        app.directive( "movieCrew", movieCrewDirective );

        app.config(['$routeProvider', function($routeProvider) {
            $routeProvider.when( '/', { templateUrl: '/mfinder/partials/home/home.html', controller: 'HomeController' } );
            $routeProvider.when( '/movie/:id', { templateUrl: '/mfinder/partials/movie/movie.html', controller: 'MovieController' } );
            $routeProvider.when( '/person/:id', { templateUrl: '/mfinder/partials/person/person.html', controller: 'PersonController' } );
            $routeProvider.otherwise( {
                template: function() {
                    throw 'An internal error occurred because the given path does not resolve to a known route.';
                }
            });
        }]);

    	return app;
    }
);