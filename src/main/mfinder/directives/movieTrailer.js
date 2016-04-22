define( [ 'angular',
        'mfinder/partials/movieTrailer/movieTrailerController' ],
    function( angular, movieTrailerController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: movieTrailerController,
                templateUrl: '/mfinder/partials/movieTrailer/movieTrailer.html',
                restrict: 'E',
                scope: {                    
                    mov: '=ngModel'
                }
            };
        };
    });
    