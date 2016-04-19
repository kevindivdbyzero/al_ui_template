/**
* the controller needs to be loaded explicitly with requireJS as the normal application only registers the
* controllers inside the route definitions, which are not evaluated during testing, so they are not known to angularJS
*/
define([ 'angular',
         'config/config',
         'mfinder/partials/search/SearchController' ], 
    function( angular, config, SearchController, $q ) {
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

                        
            // Testing the initial visible values
            it("should have initial values", function () {

                var values = {
                    isDisabled: false,
                    getData: jasmine.any(Function),                    
                    searchText: "",
                    images: config.apiImg,
                    listResults: [],
                };

                expect(scope.view).toEqual(values);

                console.log("Cool! initial values are ok :D");
                

            });

            // Testing getData function
            it('should retrieve values from getData function',function (){
                scope.view.listResults = [1,2,3];
                var data = scope.view.getData();
                expect(data).toEqual([1,2,3]);
                console.log("Great! the function getData works! :D");
            });
            
            
            
            // Testing watch over searchText
            it('should show the changes on searchText',function (){



                
            });

            // Testing search function
            it('should retrieve values from TMDBService when search is called',function (){




            });


            /*
            * Test base functionality
            */

        
			
            

        });
    }
);
