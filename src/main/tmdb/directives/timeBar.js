//
// Time bar directiva - debe contener al timeBar.html y al timeBarController.js
//
define( [ 'angular',
          'tmdb/partials/timeBar/timeBarController' ], 
    function( angular, timeBarController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: timeBarController,
                templateUrl: '/tmdb/partials/timeBar/timeBar.html',
                restrict: 'E',
                scope: {
                    time_bar: '=ngModel'
                }
            };
        };
    }
);