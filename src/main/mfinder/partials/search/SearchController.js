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




            
            // Visible data
            $scope.view = {
                isDisabled: false,
                getData: getData,
                selectedItemChange: selectedItemChange,
                searchTextChange: searchTextChange,
                selectedItem: selectedItem,
                searchText: "",
                images: config.apiImg,
            };


            var self = this;

            var apiSearch = TMDBAPIService.Search();
            var apiPerson = TMDBAPIService.Person();
            var searchPromise;


            self.listResults = [];

            // Watch over searchText
            $scope.$watch('view.searchText',function(newValue,oldValue){

                $timeout.cancel(searchPromise);

                searchPromise = $timeout(function(){
                    searchPromise = undefined;
                    console.log("newValue="+newValue+",oldValue="+oldValue);
                    if (newValue) {
                        if (newValue.length >= 3) {
                            console.log("Realizando busqueda");
                            self.listResults = self.search($scope.view.searchText);
                        }
                    }
                },500);
            });
            
            
            function getData() {                
                return self.listResults;
            };


            self.search = function(query){

                var deferred = $q.defer();
                apiSearch.search.multi(query).then(function(response){

                    self.listResults = response.data.results;
                    self.listResults.forEach(function(item){
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

                    deferred.resolve(self.listResults);

                });
                return deferred.promise;
            };


            // self.search = function(q){
            //     var searchResults;
            //     if(q == ""){
            //         searchResults= [];
            //     }
            //     var deferred = $q.defer();
            //     apiSearch.search.multi(q).then(function(response){
            //
            //         searchResults = response.data.results;
            //         searchResults.forEach(function(item){
            //             if (item.media_type === "person") {
            //                 // Get images for persons
            //                 apiPerson.person.person(item.id).then( function(r) {
            //                     item.foto = r.data.profile_path;
            //                     console.log(r.data.profile_path);
            //                 });
            //             }
            //             else {
            //                 item.foto = item.poster_path;
            //             }
            //         });
            //
            //         deferred.resolve(searchResults);
            //
            //     });
            //     return deferred.promise;
            // };

            
            
            function searchTextChange(text) {
                console.log('Text changed to ' + text);
            }
            function selectedItemChange(item) {
                console.log('Item changed to ' + JSON.stringify(item));
            }
            function selectedItem(item) {
                console.log('Selected item is -> ' + JSON.stringify(item));
            }









        };

        SearchController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams', '$timeout', '$q' ];

        return SearchController;
    }
);