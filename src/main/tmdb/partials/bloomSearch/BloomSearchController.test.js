/**
*/
define([ 'angular',          
         'config/config',          
         'tmdb/partials/bloomSearch/BloomSearchController'], 
    function( angular, config, BloomSearchController) {
        "use strict";
        describe("Test for BloomSearchController", function () {
            var bloomSearchController, scope, mockService, q;
            console.log("Antes del before");

            beforeEach(function () {
                /**
                * Load the required modules
                */
                module("config");
                module("ngRoute");

                console.log("despues del before");

                /**
                * Injection
                */
                
                inject(["$rootScope", "$controller", "$q",function ($rootScope, $controller, $q) {
                    console.log("antes de...");
                    //instantiate the controller with a newly created scope
                    scope       = $rootScope.$new();

                    //var mockData = readJSON('src/main/mocks/data/movie/search-multi.json');
//gislersoft@hotmail.com
                    mockService = {
                        Movie: function () {
                            return {
                                movie: {
                                    movie: function () {
                                        return {
                                            then: function () {
                                                return {};
                                                // return $q.when({data:mockData});
                                            }
                                        };
                                    }
                                }
                            };
                        }
                    };
                    bloomSearchController = $controller(BloomSearchController, {$scope: scope, 
                                                                  TMDBAPIService: mockService});
                    console.log("Instancia controlador====");
                    console.log(bloomSearchController);
                }]);
            });

            /*
            * Test default initialization variables
            */
            
            xit("should always set searchPhrase starts empty", function(){
                //expect(scope.searchPhrase).toBe("");
            });

            // it("should search after hits enter key", function(){
            //     // var mockEvent = {
            //     //     which: 13
            //     // };
            //     // scope.performSearch(mockEvent);
            //     // expect(scope.searchResults).toBeDefined();
            // });

            /*
            * Test base functionality
            */

        });
    }
);