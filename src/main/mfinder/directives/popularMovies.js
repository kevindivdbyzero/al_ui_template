/**
 * Provides a popular-movies element
 *
 * @module tmdb.directives.popularMovies
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
          'mfinder/partials/remoteImageLoader/RemoteImageLoader' ], 
    function( angular, RemoteImageLoader ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: RemoteImageLoader,
                templateUrl: '/mfinder/partials/popularMovies/popularMovies.html',
                restrict: 'E',
                scope: {
                    movieList: '=ngModel'
                },
                link: function(){            
                    $('.crsl-items').carousel({ visible: 10, itemMinWidth: 200, itemMargin: 10 });
                   } // fin link
                };            
            };
        });
    