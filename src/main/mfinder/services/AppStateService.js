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


            
        var lastVisited = [];


         var searchVisited = function (entity) {

             var visited = false;

             var val = entity.title;

             for(var i = 0; i<lastVisited.length; i++){
                 var item = lastVisited[i].title;
                 if(item === val){
                     visited = true;
                     break;
                 }
             }

             return visited;             
         };   

            

        self.setLastVisited = function(entity){

            if( searchVisited(entity) ) {
                console.log("The movie is already in the list ========================================================");
            }else{
                console.log("Storing movie the movie :", entity.title);
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