/**
* the controller needs to be loaded explicitly with requireJS as the normal application only registers the
* controllers inside the route definitions, which are not evaluated during testing, so they are not known to angularJS
*/
define([ 'angular',
         'config/config',
         'mfinder/partials/search/SearchController' ], 
    function( angular, config, SearchController ) {
        "use strict";
        describe("The SearchController", function () {
		
            var searchcontroller, scope, mockService;

            beforeEach(function () {
                /**
                * Load the required modules
                */
                module("config");
                module("ngRoute");

                /**
                * Injection
                */
                inject(["$rootScope", "$controller", function ($rootScope, $controller) {
                    //instantiate the controller with a newly created scope
                    scope       = $rootScope.$new();
                    mockService = {
						Search: function () {
                            return {
                                search: {
                                    multi: function () {
                                        return {
                                            then: function () {
                                                return {};
                                            }
                                        };
                                    }
                                }
                            };
                        },                        
                        Person: function () {
                            return {
                                person: {
                                    person: function () {
                                        return {
                                            then: function () {
                                                return {};
                                            }
                                        };
                                    }
                                }
                            };
                        }
                    };
                    searchcontroller = $controller(SearchController, {$scope: scope, 
                                                                  TMDBAPIService: mockService}
                                     );
                }]);
            });

            /*s
            * Test default initialization variables
            */
            it("should have matching defaults", function () {
                expect(scope.view.searchText).toEqual("");
            });

            /*
            * Test base functionality
            */

        
			
            

        });
    }
);
