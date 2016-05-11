/**
 * AppHeaderController provides controller support for 
 *
 * @module tmdb.partials.person.AppHeaderController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Kevin Nielsen <knielsen@alertlogic.com>
 *
 * @returns instance of the AppHeaderController
 *
 * @copyright Alert Logic, Inc 2016
 *
 */

define( [ 'angular',
          'config/config'],
    function( angular, config ) {
        "use strict";

        var AppHeaderController = function($scope, AppStateService ) {

            $scope.view = {
                authenticated: false,
                session: null
            };

            $scope.$on( "user.authenticated", function( $event, userSession ) {
                $scope.view.authenticated = true;
                $scope.view.session = userSession;
            } );
        };

        AppHeaderController.$inject = [ '$scope', 'AppStateService' ];

        return AppHeaderController;
    }
);
