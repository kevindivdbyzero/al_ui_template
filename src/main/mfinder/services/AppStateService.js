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
        'config/config',
        'LocalStorageModule'],
    function ( angular, $rootScope ) {

        "use strict";

        var AppStateService = function ($rootScope, $timeout, localStorageService) {
        


        var self = this;
        var userSession = null;

        // need to implement lastSearch state when create an advance search page
        var lastSearch = '';    

        self.getLastSearch = function() {
                    return lastSearch;
                };

        self.setLastSearch = function( search ) {
            lastSearch = search;
        };


            
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


        $rootScope.$on( 'user.authenticated', function( $event, newSession ) {
                    userSession = newSession;
                    console.log("AppStateService - new session", newSession );
                    var encodedSession = JSON.stringify( newSession );
                    localStorageService.set( "_session", encodedSession );
                    } );

                /**
                 * Service Initialization -- Runs only on application startup 
                 */
        $timeout( function() {
            console.log("Firing initialization on first route change" );
            var existingSession = localStorageService.get( "_session" );
            if ( existingSession ) {
                try {
                    var sessionData = JSON.parse( existingSession );
                    $rootScope.$broadcast( "user.authenticated", sessionData );
                } catch( e ) {
                    console.error("Session is corrupt" );
                    localStorageService.remove( "_session" );
                }
            }
        }, 100 );










            

        };

        AppStateService.$inject = ['$rootScope', '$timeout', 'localStorageService'];

        return AppStateService;
    }
);