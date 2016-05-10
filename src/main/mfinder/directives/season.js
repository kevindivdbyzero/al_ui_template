/**
 * Provides a season element
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
        'mfinder/partials/television/seasonController' ],
    function( angular, seasonController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: seasonController,
                templateUrl: '/mfinder/partials/television/season.html',
                restrict: 'E',
                scope: {
                    seasonId: '=ngModel'
                }
            };
        };
    }
);
