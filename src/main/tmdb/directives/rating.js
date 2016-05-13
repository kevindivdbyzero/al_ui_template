

define( [ 'angular',
          'tmdb/partials/rating/RatingController' ], 
    function( angular, RatingController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: RatingController,
                templateUrl: '/tmdb/partials/rating/rating.html',
                restrict: 'E',
                scope: {
                    movieId: '='
                }
            };
        };
    }
);