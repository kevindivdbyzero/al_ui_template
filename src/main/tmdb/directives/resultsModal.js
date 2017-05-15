define( [ 'angular',
        'tmdb/partials/resultsModal/ResultsModalController' ],
    function( angular, ResultsModalController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: ResultsModalController,
                templateUrl: '/tmdb/partials/resultsModal/resultsModal.html',
                restrict: 'E',
                scope: {                    
                    object: '=',
                    media_type: '='
                }
            };
        };
    });
    