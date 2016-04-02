/**
 * Provides a navigation element
 *
 * @module mfinder.directives.navigation
 *
 * @requires angular
 * @requires navigationController
 *
 * @author Andres Artunuduaga
 *
 * @copyright 
 *
 */

 define( [ 'angular', 
           'mfinder/partials/navigation/navigationController' ], 
    function( angular, navigationController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: navigationController,
                templateUrl: '/mfinder/partials/navigation/navigation.html',
                restrict: 'E',
                scope: {
                    movieList: '=ngModel'
                }
            };
        };
    }
);