/**
 * Abstraction for the tmdb.org API.
 *
 * @module tmdb.services.MyOwnService
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
          'config/config',
          'LocalStorageModule'], 
    function ( angular, config, LocalStorageModule ) {
        "use strict";

        var MyOwnService = function ( $rootScope, $scope, localStorageService ) {

            var self = this;

            var historySearches = [];

            localStorageService.set("history_searches", "Carlos was were" );
            console.log("localStorage===>",localStorageService.get("history_searches"));

            self.getHistorySearches = function(){
                return localStorageService.get("history_searches");
            };

            self.setHistorySearches = function(data){
                historySearches.push(data);
                localStorage.set("history_searches", historySearches );
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

        MyOwnService.$inject = ['$rootScope', '$scope'];

        return MyOwnService;
}
);