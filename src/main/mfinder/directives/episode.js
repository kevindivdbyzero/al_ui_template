/**
 * Provides a episode element
 *
 * @module mfinder.directives.episode
 *
 * @requires angular
 * @requires episodeController
 *
 * @author Andres Artunuduaga
 *
 * @copyright
 *
 */

define( [ 'angular',
        'mfinder/partials/television/episodeController' ],
    function( angular, episodeController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: episodeController,
                templateUrl: '/mfinder/partials/television/episode.html',
                restrict: 'E',
                scope: {
                    episodeInfo: '=ngModel'
                }
            };
        };
    }
);