/**
 * Provides a popular-tv element
 *
 * @module tmdb.directives.popularTv
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
          'mfinder/partials/popularTv/popularTvController' ], 
    function( angular, popularTvController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: popularTvController,
                templateUrl: '/mfinder/partials/popularTv/popularTv.html',
                restrict: 'E',
                scope: {
                    tvList: '=ngModel'
                }
                };            
            };
        });
    