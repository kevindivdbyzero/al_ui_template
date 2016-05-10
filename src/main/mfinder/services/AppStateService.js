/**
 * Get the configuration from TMDBAPI
 *
 * @module tmdb.services.TMDBConfigurationService
 *
 * @requires angular
 * @requires LocalStorageModule
 * @requires config/config
 *
 * @author Andres Artunduaga < @alertlogic.com>
 *
 * @returns Configuration Service
 *
 */
define( ['angular',                
        'config/config',],
    function ( angular, $rootScope ) {

        "use strict";

        var AppStateService = function ($rootScope) {
        


        var self = this;    


            
        var lastVisited = [10];



        self.setLastVisited = function(entity){

            if(listOf(entity)){
                lastVisited.push(entity);    
            }
            
        };

        self.getLastVisitedList = function(){
            return lastVisited;
        };

           
            
        $rootScope.$on('inside-movie', function($event, entity){
            self.setLastVisited(entity);
        });

            

        };

        AppStateService.$inject = ['$rootScope'];

        return AppStateService;
    }
);