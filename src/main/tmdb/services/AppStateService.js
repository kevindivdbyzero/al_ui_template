define( [   'angular',                /* I need angular */
            'LocalStorageModule' ],  /* And another one */
        function( angular, LocalStorageModule ) 
        {
            "use strict";
            var AppStateService = function( $rootScope, $timeout, localStorageService ) {

                var lastSearch  = '';
                var self        = this;
                var userSession = null;

                self.getLastSearch = function() {
                    return lastSearch;
                };

                 self.getUserSession= function (){
                      console.log(userSession['sessionID']);
                      return userSession['sessionID'];
                 };
                self.setLastSearch = function( search ) {
                    lastSearch = search;
                };

                $rootScope.$on( 'selected.media', function( $event, media ) {
                    console.log("Received seleted.media event: ", media );
                } );

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
            
           

            AppStateService.$inject = [ '$rootScope', '$timeout', 'localStorageService' ];

            return AppStateService;

        } );
