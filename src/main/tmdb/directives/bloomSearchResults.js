/**
 * Provides a search element
 *
 * @module tmdb.directives.bloomSearchResults
 *
 * @requires angular
 * @requires BloomSearchResultsController
 *
 * @author Carlos Orozco <carlos.orozco@correounivalle.edu.co>
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

 define( [ 'angular', 
           'tmdb/partials/bloomSearch/BloomSearchResultsController' ], 
    function( angular, BloomSearchResultsController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: BloomSearchResultsController,
                templateUrl: '/tmdb/partials/bloomSearch/bloomSearchResults.html',
                restrict: 'E',
                scope: {
                    resultsList: '=ngModel'
                }
            };
        };
    }
);