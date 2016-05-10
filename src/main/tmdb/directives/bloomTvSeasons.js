/**
 * Provides a search element
 *
 * @module tmdb.directives.bloomTvSeasons
 *
 * @requires angular
 * @requires BloomTelevisionSeasonController
 *
 * @author Carlos Orozco <carlos.orozco@correounivalle.edu.co>
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

 define( [ 'angular', 
           'tmdb/partials/bloomTelevision/BloomTelevisionSeasonController' ], 
    function( angular, BloomTelevisionSeasonController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: BloomTelevisionSeasonController,
                templateUrl: '/tmdb/partials/bloomTelevision/bloomTvSeasons.html',
                restrict: 'E',
                scope: {
                    // tvSeasonsList: '=ngModel'
                }
            };
        };
    }
);