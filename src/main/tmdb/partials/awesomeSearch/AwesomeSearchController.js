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

<<<<<<< HEAD
        var AwesomeSearchController = function($scope, TMDBAPIService, $timeout ) {
            //Reference variables
=======
        var AwesomeSearchController = function($rootScope, $scope, TMDBAPIService, $timeout, AppStateService ) {
>>>>>>> 67efcbd3f3957263c451886033dc1e9556f1a56a
            var self = this;
            var apiSearch = TMDBAPIService.Search();
            var apiPerson = TMDBAPIService.Person();
            var searchPromise;
            self.timeWatcher = 500;
            var limitName = 24;

            var config  = angular.module("config");
            var defaultImage = "https://simpleicon.com/wp-content/uploads/movie-1.png";

            $scope.searchPhrase = AppStateService.getLastSearch();

            $scope.help = function( thingy, $event ) {
                console.log("Clicked a thingy");
                $event.stopPropagation();
            };

            $scope.$watch('searchPhrase',function(newValue,oldValue){
                //console.log("newValue="+newValue+",oldValue="+oldValue);
            
                $timeout.cancel(searchPromise);

                searchPromise = $timeout(function(){
                    searchPromise = undefined;
<<<<<<< HEAD
                    self.search();
                },self.timeWatcher);
=======
                    if (newValue) {
                        if (newValue.length >= 3) {
                            self.search();
                        }
                    }
                },500);
>>>>>>> 67efcbd3f3957263c451886033dc1e9556f1a56a
            });

            $scope.performSearch = function(event) {
                if (event.which === 13) {
                    self.search();
                }
            };
<<<<<<< HEAD

            /**
            * Return the name depending on the results.
            */
            var formatName = function(data) {

                var newName = data.name || data.title;

                if (newName) {
                    if(newName.length > limitName){ 
                        return newName.substr(0, limitName)+"...";
                    }
                    return newName;
                }

                return "No name";
            };

            /**
            * Return the default image if not have a defined
            * image path.
            */
            self.getImagePath = function( path ) {
                if(path){
                    return config.apiImg + path;   
                }
                return defaultImage;  
            };
=======
>>>>>>> 67efcbd3f3957263c451886033dc1e9556f1a56a

            /**
            * Call the API with the search phrase
            */
<<<<<<< HEAD
            self.search = function(){
                if ($scope.searchPhrase) {
                    if ($scope.searchPhrase.length >= 3) {
       
                        apiSearch.search.multi($scope.searchPhrase).then(function(response){

                            $scope.searchResults = response.data.results;

                            $scope.searchResults.forEach(function(item){
                                if (item.media_type === "person") {
                                    // Get images for persons 
                                    apiPerson.person.person(item.id).then( function(r) {
                                        item.foto = self.getImagePath(r.data.profile_path);
                                    });
                                }
                                else {
                                    item.foto = self.getImagePath(item.poster_path);
                                }
                                item.formatName = formatName(item);
                            });

                        });
                    }
                }
            };
=======
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
>>>>>>> 67efcbd3f3957263c451886033dc1e9556f1a56a

        };

        AwesomeSearchController.$inject = [ '$rootScope', '$scope', 'TMDBAPIService', '$timeout', 'AppStateService' ];

        return AwesomeSearchController;
    }
);
