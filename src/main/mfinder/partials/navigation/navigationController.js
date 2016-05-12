/**
 * navigationController provides controller support for IDK
 *
 * @module mfinder.partials.navigation.navigationController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Andres Artunduaga
 *
 * @returns instance of the navigationController
 *
 * @copyright 
 *
 */

define( [ 'angular',
          'ngRoute',
          'config/config',
          'mfinder/services/TMDBAPIService',],
    function( angular, $routeParams, config, TMDBAPIService, AppStateService ) {
        "use strict";

        var navigationController = function($scope, TMDBAPIService, $routeParams ) {

            

        };

        navigationController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams', 'AppStateService' ];

        return navigationController;
    }
);