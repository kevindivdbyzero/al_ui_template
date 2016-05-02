define( [ 'angular', 
           'tmdb/partials/actorModal/ActorModalController' ], 
    function( angular, ActorModalController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: ActorModalController,
                templateUrl: '/tmdb/partials/actorModal/actorModal.html',
                restrict: 'E',
                scope: {
                    personId: '=ngModel'
                }
            };
        };
    }
);