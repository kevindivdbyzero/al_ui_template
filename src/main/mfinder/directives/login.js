/**
 * Provides a login widget for the header
 *
 * @module mfinder.directives.login
 *
 * @requires angular
 * @requires LoginController
 *
 * @param {object} angular - An instance of AngularJS
 * @param {object} RemoteImageLoader - An instance of RemoteImageLoader 
 *
 * @author Ginger Git <knielsen@alertlogic.com>
 *
 * @copyright Alert Logic, Inc 2016
 *
 */

define( [ 'angular',
          'mfinder/partials/login/loginController' ], 
    function( angular, loginController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: loginController,
                templateUrl: '/mfinder/partials/login/login.html',
                restrict: 'E',
                scope: true
            };
        };
    }
);