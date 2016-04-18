/**
* the controller needs to be loaded explicitly with requireJS as the normal application only registers the
* controllers inside the route definitions, which are not evaluated during testing, so they are not known to angularJS
*/
define([ 'angular',
         'config/config',
         'tmdb/partials/search/SearchController' ], 
    function( angular, config, SearchController ) {
        "use strict";
        describe("The SearchController", function () {
            // var searchcontroller, scope, mockService;

            beforeEach(function () {
                /**
                * Load the required modules
                */
                module("config");
                module("ngRoute");

                // /**
                // * Injection
                // */
                // inject(["$rootScope", "$controller", function ($rootScope, $controller) {
                //     //instantiate the controller with a newly created scope
                //     scope       = $rootScope.$new();
                //     mockService = {
                //         Search: function () {
                //             return {
                //                 search: {
                //                     multi: function () {
                //                         return {
                //                             then: function () {
                //                                 return {'a':1};
                //                             }
                //                         };
                //                     }
                //                 }
                //             };
                //         }
                //     };
                //     searchcontroller = $controller(SearchController, {$scope: scope,
                //                                                   TMDBAPIService: mockService}
                //                      );
                // }]);
            });

            var $controller;

            beforeEach(inject(function(_$controller_){
                // The injector unwraps the underscores (_) from around the parameter names when matching
                $controller = _$controller_;
            }));




            describe('$scope.view.getData', function (){

                var $scope, $controller;

                beforeEach(function (){
                    var mockService = {
                        Search: function () {
                            return {
                                search: {
                                    multi: function () {
                                        return {
                                            then: function () {
                                                return {'a':1};
                                            }
                                        };
                                    }
                                }
                            };
                        }
                    };
                    $scope = {};
                    $controller = $controller('SearchController', { $scope: $scope, TMDBAPIService: mockService });
                });


                it('return data from the TMDBAPIService',function (){
                    
                    $scope.view.resultList = {'a':1};
                    
                    var results = $scope.view.getData();
                    expect(results).toBe({'a':1});
                });


            });





            /*
            * Test default initialization variables
            */


            
            it("should have matching defaults", function () {

                scope.view = {
                    isDisabled: false,
                    getData: scope.getData,
                    searchText: "",
                    images: config.apiImg,
                    listResults: {},
                };
                
                searchcontroller.getData();
                
                expect(scope.view.searchText).toBe("");
                expect(scope.view.isDisabled).toEqual(false);
                expect(scope.view.listResults).toEqual({'a':1});
            });

            /*
            * Test base functionality
            */

            it('has to do something', function () {                
                expect(true).toBe(true);
            });


        });
    }
);