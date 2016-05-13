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

        var navigationController = function($scope, $rootScope, TMDBAPIService, $routeParams ) {

            $scope.view = {
                authenticated: false,
                session: null
            };

            $scope.$on( "user.authenticated", function( $event, userSession ) {
                $scope.view.authenticated = true;
                $scope.view.session = userSession;
            } );

            $scope.$on( 'user.logout', function( $event ) {
                $scope.view.authenticated = false;
                $scope.view.session = null;                
            } );
            
            
            $scope.logout = function ($event) {
                $rootScope.$broadcast('user.logout', $event);
            }
                        

        };

        navigationController.$inject = [ '$scope', '$rootScope' , 'TMDBAPIService', '$routeParams', 'AppStateService' ];

        return navigationController;
    }
);