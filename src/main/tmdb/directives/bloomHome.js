/**
 * Provides a search element
 *
 * @module tmdb.directives.bloomHome
 *
 * @requires angular
 * @requires BloomHomeController
 *
 * @author Carlos Orozco <carlos.orozco@correounivalle.edu.co>
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

 define( [ 'angular', 
           'tmdb/partials/bloomHome/BloomHomeController' ], 
    function( angular, BloomHomeController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: BloomHomeController,
                templateUrl: '/tmdb/partials/bloomHome/bloomHome.html',
                restrict: 'E',
                // scope: {
                //     // tvSeasonsList: '=ngModel'
                // }
            };
        };
    }
);