/**
 * Abstraction for the tmdb.org API.
 *
 * @module tmdb.services.exampleService
 *
 * @requires angular
 * @requires ngRoute
 * @requires ngResource
 * @requires LocalStorageModule
 * @requires config/config
 *
 *
 */

define( [ 'angular', 
          'ngRoute',
          'ngResource',
          'LocalStorageModule',
          'config/config' ], 
    function ( angular ) {
        "use strict";

        var exampleService = function ( $rootScope, localStorageService, $location ) {

            var self = this;

            var historySearches = [];

            self.getHistorySearches = function(){
                return historySearches;
            };

            self.setHistorySearches = function(data){
                historySearches.push(data);
            };

            var thereAreDuplicates = function (data){

                for (var i = 0; i < historySearches.length; i++) {                    
                    if(data.id === historySearches[i].id){                        
                        return true;
                    }
                }
                return false;
            };

            self.handleSaverEvent = function( $event, data ) {                
                if(!thereAreDuplicates(data)||(historySearches.length===0)){                    
                    self.setHistorySearches(data);                    
                }                
            };

            $rootScope.$on('saver.event', self.handleSaverEvent );
            
        };

        exampleService.$inject = [ '$rootScope', 'localStorageService', '$location' ];

        return exampleService;
}
);