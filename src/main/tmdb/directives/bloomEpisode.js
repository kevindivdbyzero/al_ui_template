/**
 * Provides a search element
 *
 * @module tmdb.directives.bloomEpisode
 *
 * @requires angular
 * @requires BloomEpisodeController
 *
 * @author Carlos Orozco <carlos.orozco@correounivalle.edu.co>
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

 define( [ 'angular', 
           'tmdb/partials/bloomTelevision/BloomEpisodeController' ], 
    function( angular, BloomEpisodeController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: BloomEpisodeController,
                templateUrl: '/tmdb/partials/bloomTelevision/bloomEpisode.html',
                restrict: 'E',
                scope: {
                    // hasSearchedEpisodes: '=ngModel'
                }
            };
        };
    }
);