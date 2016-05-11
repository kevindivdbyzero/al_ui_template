/**
 * Provides a person-detail element
 *
 * @module tmdb.directives.personDetails
 *
 * @requires angular
 * @requires AppHeaderController
 *
 * @param {object} angular - An instance of AngularJS
 * @param {object} AppHeaderController - An instance of RemoteImageLoader 
 *
 * @author Kevin Nielsen <knielsen@alertlogic.com>
 *
 * @copyright Alert Logic, Inc 2016
 *
 */

define( [ 'angular',
          'tmdb/partials/appHeader/AppHeaderController' ], 
    function( angular, RemoteImageLoader ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: RemoteImageLoader,
                templateUrl: '/tmdb/partials/appHeader/appHeader.html',
                restrict: 'E',
                scope: true
            };
        };
    }
);
