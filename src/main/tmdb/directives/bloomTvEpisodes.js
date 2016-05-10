/**
 * Provides a search element
 *
 * @module tmdb.directives.bloomTvEpisodes
 *
 * @requires angular
 * @requires BloomTelevisionEpisodeController
 *
 * @author Carlos Orozco <carlos.orozco@correounivalle.edu.co>
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

 define( [ 'angular', 
           'tmdb/partials/bloomTelevision/BloomTelevisionEpisodeController' ], 
    function( angular, BloomTelevisionEpisodeController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: BloomTelevisionEpisodeController,
                templateUrl: '/tmdb/partials/bloomTelevision/bloomTvEpisodes.html',
                restrict: 'E',
                scope: {
                    hasSearchedEpisodes: '=ngModel'
                }
            };
        };
    }
);