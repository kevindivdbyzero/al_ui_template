/**
 * Provides a movie-cast element
 *
 * @module tmdb.directives.movieCast
 *
 * @requires angular
 * @requires RemoteImageLoader
 *
 * @param {object} angular - An instance of AngularJS
 * @param {object} RemoteImageLoader - An instance of RemoteImageLoader 
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',
          'tmdb/partials/remoteImageLoader/RemoteImageLoader' ], 
    function( angular, RemoteImageLoader ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: RemoteImageLoader,
                templateUrl: '/tmdb/partials/movie/cast.html',
                restrict: 'E',
                scope: {
                    castList: '=ngModel'
                }
            };
        };
    }
);