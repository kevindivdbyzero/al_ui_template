/**
 * SearchController provides controller support for inline searching
 *
 * @module tmdb.partials.search.SearchController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @returns instance of the SearchController
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',
          'ngRoute',
          'config/config',
          'mfinder/services/TMDBAPIService'],
    function( angular, $routeParams, config, TMDBAPIService ) {
        "use strict";

        var SearchController = function($scope, TMDBAPIService, $routeParams, $timeout, $q ) {


            var self = this;

            var apiSearch = TMDBAPIService.Search();
            var apiPerson = TMDBAPIService.Person();
            var searchPromise;


            


            function getData() {
                return $scope.view.listResults;
            }

            function searchTextChange(text) {
                console.log('Text changed to ' + text);                
            }



            this.getData = getData;

            
            // Visible data
            $scope.view = {
                isDisabled: false,
                getData: getData,                
                searchTextChange: searchTextChange,                
                searchText: "",
                images: config.apiImg,
                listResults: [],
            };




            // Watch over searchText
            $scope.$watch('view.searchText',function(newValue,oldValue){

                $timeout.cancel(searchPromise);

                searchPromise = $timeout(function(){
                    searchPromise = undefined;
                    console.log("newValue="+newValue+",oldValue="+oldValue);
                    if (newValue) {
                        if (newValue.length >= 3) {
                            console.log("Realizando busqueda");
                            $scope.view.listResults = self.search($scope.view.searchText);
                        }
                    }
                },500);
            });
            
            



            self.search = function(query){

                var deferred = $q.defer();
                apiSearch.search.multi(query).then(function(response){

                    $scope.view.listResults = response.data.results;
                    $scope.view.listResults.forEach(function(item){
                        if (item.media_type === "person") {
                            // Get images for persons
                            apiPerson.person.person(item.id).then( function(r) {
                                item.foto = r.data.profile_path;
                                console.log(r.data.profile_path);
                            });
                        }
                        else {
                            item.foto = item.poster_path;
                        }
                    });

                    deferred.resolve($scope.view.listResults);

                });
                return deferred.promise;
            };



        };

        SearchController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams', '$timeout', '$q' ];

        return SearchController;
    }
);