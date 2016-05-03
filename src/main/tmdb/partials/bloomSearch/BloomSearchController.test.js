/**
*/
define([ 'angular',          
         'config/config',          
         'tmdb/partials/bloomSearch/BloomSearchController'], 
    function( angular, config, BloomSearchController) {
        "use strict";
        describe("Test for BloomSearchController", function () {
            var bloomSearchController, scope, mockService, q;
            

            beforeEach(function () {
                /**
                * Load the required modules
                */
                module("config");
                module("ngRoute");

                
                /**
                * Injection
                */
                
                inject(["$rootScope", "$controller", "$q",function ($rootScope, $controller, $q) {
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
                        },
                        Search: function () {
                            return {
                                search: {
                                    multi: function () {
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
                }]);
            });

            /*
            * Test default initialization variables
            */
            
            xit("should always set searchPhrase starts empty", function(){
                expect(scope.searchPhrase).toBe("");
            });

            it("should search after hits enter key", function(){
                var mockEvent = {
                    which: 13
                };
                scope.performSearch(mockEvent);
                expect(scope.searchResults).toBe(undefined);
            });

            /*
            * Test base functionality
            */

        });
    }
);