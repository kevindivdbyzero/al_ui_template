/**
 * Abstraction for the tmdb.org API.
 *
 * @module tmdb.services.ApplicationStateService
 *
 * @requires angular
 * @requires ngRoute
 * @requires ngResource
 * @requires LocalStorageModule
 * @requires config/config
 *
 * @author Kevin Nielsen <bskidmore@alertlogic.com>
 *
 * @returns Wrapper for several TMDB API's
 *
 */

define( [ 'angular', 
          'ngRoute',
          'ngResource',
          'LocalStorageModule',
          'config/config' ], 
    function ( angular ) {
        "use strict";

        var ApplicationStateService = function ( $rootScope, localStorageService ) {

            var self = this;
            
            self.lastSeleted = { 
                type:   'none', 
                media:  {} 
            };

            /**
             * Interprets media.select event when a specific media entity is clicked on in search results or popular items
             * Accepts two parameters: the media type and the definition itself.
             **/
            $rootScope.$on( 'media.select', function( $event, mediaType, mediaDefinition ) {
            } );
        };

        ApplicationStateService.$inject = [ '$rootScope', 'localStorageService' ];

        return ApplicationStateService;
}
);
