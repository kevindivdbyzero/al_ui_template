/**
 * SearchController provides controller support for inline searching
 *
 * @module tmdb.partials.bloomSearch.BloomSearchController
 *
 * @requires angular
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Carlos Orozco <carlos.orozco@correounivalle.edu.co>
 *
 * @returns instance of the BloomSearchController
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',          
          'config/config',
          'tmdb/services/TMDBAPIService'],
    function( angular, config, TMDBAPIService ) {
        "use strict";

        var BloomSearchController = function($scope, TMDBAPIService, $timeout ) {

            var api = TMDBAPIService.Search();

            $scope.searchPhrase = "";            


            var search = function(){    
                api.search.multi($scope.searchPhrase).then(function(response){
                        $scope.searchResults = response.data.results;
                        console.log(response.data);
                    });
            };            

            var searchPromise;

            $scope.$watch('searchPhrase', function(newValue, oldValue){

                $timeout.cancel(searchPromise);

                searchPromise = $timeout(function() {
                    searchPromise = undefined;
                    console.log(newValue);
                    if(newValue){
                        if(newValue.length>2){
                            console.log("Se puede buscar");
                            search();
                        }
                    }
                }, 300);


            });

            

            $scope.performSearch = function(event) {
                if (event.which === 13) {
                    search();
                }
            };

            $scope.searchButton = function() {
                search();
            };

        };

        BloomSearchController.$inject = [ '$scope', 'TMDBAPIService', '$timeout' ];

        return BloomSearchController;
    }
);