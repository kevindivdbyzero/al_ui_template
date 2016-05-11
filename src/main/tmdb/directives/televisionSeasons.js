/**
 *
 */

define( [ 'angular', 'tmdb/partials/television/TelevisionSeasonController'], 
    function(angular, TelevisionSeasonController) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: TelevisionSeasonController,
                templateUrl: '/tmdb/partials/television/tvShowSeasons.html',
                restrict: 'E',
                scope: {
                  
                }
            };
        };
    }
);