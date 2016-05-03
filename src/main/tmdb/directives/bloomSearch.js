/**
 * Provides a search element
 *
 * @module tmdb.directives.bloomSearch
 *
 * @requires angular
 * @requires BloomSearchController
 *
 * @author Carlos Orozco <carlos.orozco@correounivalle.edu.co>
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

 define( [ 'angular', 
           'tmdb/partials/bloomSearch/BloomSearchController' ], 
    function( angular, BloomSearchController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: BloomSearchController,
                templateUrl: '/tmdb/partials/bloomSearch/bloomSearch.html',
                restrict: 'E',
                scope: {
                    movieList: '=ngModel'
                }
            };
        };
    }
);