define( [   'angular',                /* I need angular */
            'LocalStorageModule' ],  /* And another one */
        function( angular, LocalStorageModule ) 
        {
            var AppStateService = function( $rootScope, $timeout ) {
                console.log("AppStateService instantiated" );

                var lastSearch = '';
                var self = this;

                self.getLastSearch = function() {
                    return lastSearch;
                };

                self.setLastSearch = function( search ) {
                    lastSearch = search;
                };

                $rootScope.$on( 'selected.media', function( $event, media ) {
                    console.log("Received seleted.media event: ", media );
                } );
            };

            AppStateService.$inject = [ '$rootScope', '$timeout' ];

            return AppStateService;

        } );
