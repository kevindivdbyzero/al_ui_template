/**
 * AwesomeSearchController provides controller support for inline searching
 *
 * @module tmdb.partials.search.AwesomeSearchController
 *
 * @requires angular
 * @requires config
 * @requires TMDBAPIService
 *
 * @author John Gomez <jgomez@alertlogic.com>
 *
 * @returns instance of the AwesomeSearchController
 *
 * @copyright Alert Logic, Inc 2016
 *
 */

define( [ 'angular',
          'config/config',
          'tmdb/services/TMDBAPIService',
          'tmdb/services/AppStateService'],
    function( angular, config, TMDBAPIService, AppStateService ) {
        "use strict";

        var AwesomeSearchController = function($rootScope, $scope, TMDBAPIService, $timeout, AppStateService ) {
            var self = this;

            var apiSearch = TMDBAPIService.Search();
            var apiPerson = TMDBAPIService.Person();

            var searchPromise;

            $scope.searchPhrase = AppStateService.getLastSearch();

            $scope.help = function( thingy, $event ) {
                console.log("Clicked a thingy");
                $event.stopPropagation();
            };

            $scope.$watch('searchPhrase',function(newValue,oldValue){
                
                $timeout.cancel(searchPromise);

                searchPromise = $timeout(function(){
                    searchPromise = undefined;
                    if (newValue) {
                        if (newValue.length >= 3) {
                            self.search();
                        }
                    }
                },500);
            });

            $scope.performSearch = function(event) {
                if (event.which === 13) {
                    self.search();
                }
            };

            /**
            * Call the API with the search phrase
            */
            self.search = function() {

                apiSearch.search.multi($scope.searchPhrase).then(function(response){
                    $scope.searchResults = response.data.results;

                    $scope.searchResults.forEach(function(item){
                        if (item.media_type === "person") {
                            // Get images for persons 
                            apiPerson.person.person(item.id).then( function(r) {
                                item.foto = r.data.profile_path;
                            });
                        }
                        else {
                            if ( item.poster_path ) {
                                item.foto = item.poster_path;
                            } else {
                                item.foto = null;
                            }
                        }
                    });

                });
            };

            $rootScope.$on( '$routeChangeStart', function( $event ) {
                AppStateService.setLastSearch( $scope.searchPhrase );
                console.log("Saved search phrase: %s", $scope.searchPhrase );
            } );

        };

        AwesomeSearchController.$inject = [ '$rootScope', '$scope', 'TMDBAPIService', '$timeout', 'AppStateService' ];

        return AwesomeSearchController;
    }
);
