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
    function ( angular) {
        "use strict";

        var MyOwnService = function ( $rootScope, localStorage ) {

            var self = this;            

            if(!localStorage.get("history_searches")){
                localStorage.set("history_searches", []);                
            }

            self.getHistorySearches = function(){
                return localStorage.get("history_searches");
            };

            self.setHistorySearches = function(data){
                var historySearches = localStorage.get("history_searches");
                historySearches.push(data);
                localStorage.set("history_searches", historySearches );
            };

            var thereAreDuplicates = function (data){

                var historySearches = localStorage.get("history_searches");

                for (var i = 0; i < historySearches.length; i++) {                    
                    if(data.id === historySearches[i].id){                        
                        return true;
                    }
                }
                return false;
            };

            self.handleSaverEvent = function( $event, data ) {
                var historySearches = localStorage.get("history_searches");

                if(!thereAreDuplicates(data)||(historySearches.length===0)){                    
                    self.setHistorySearches(data);                    
                }                
            };

            $rootScope.$on('saver.event', self.handleSaverEvent );
            
        };

        MyOwnService.$inject = ['$rootScope', 'localStorageService'];

        return MyOwnService;
}
);