/**
 * PersonController provides controller support for fetching people from tmdb
 *
 * @module tmdb.partials.person.PersonController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @returns instance of the PersonController
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',
          'ngRoute',
          'config/config',
          'tmdb/services/TMDBAPIService',
          'tmdb/services/AppStateService'],
    function( angular, $routeParams, config, TMDBAPIService ) {
        "use strict";

        var PersonController = function($scope, TMDBAPIService, $routeParams, AppStateService ) {

            $scope.view   = {
                details: {}
            };

            var api = TMDBAPIService.Person();
            api.person.person($routeParams.id).then( function ( response ) {
                $scope.view.details = response.data;
                $scope.$emit('selected_item', $scope.view.details);
            });

        };

        PersonController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams', 'AppStateService' ];

        return PersonController;
    }
);