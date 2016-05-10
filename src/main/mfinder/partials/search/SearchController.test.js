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
		
            var searchcontroller, scope, mockService, q;

            beforeEach(function () {
                /**
                * Load the required modules
                */
                module("config");
                module("ngRoute");

                /**
                * Injection
                */
                inject(["$rootScope", "$controller", "$q", function ($rootScope, $controller, $q) {
                    //instantiate the controller with a newly created scope
                    scope       = $rootScope.$new();


                    mockService = {
                        Person: function () {
                            return {
                                person: {
                                    person: function () {
                                        return $q.when({data:readJSON('src/main/mocks/data/person/person-aniston.json')});
                                    }
                                }
                            };
                        },
                        Search: function () {
                            return {
                                search: {
                                    multi: function (data) {
                                        if (data === "aniston"){
                                            return $q.when({
                                                data:{
                                                    results:readJSON('src/main/mocks/data/movies/search-multi-person.json')
                                                }
                                            });
                                        } else {
                                            return $q.when({
                                                data:{
                                                    results:readJSON('src/main/mocks/data/movies/search-multi.json')
                                                }
                                            });
                                        }
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
            // it("should have initial values", function () {
            //
            //     var values = {
            //         isDisabled: false,
            //         getData: jasmine.any(Function),                    
            //         searchText: "",
            //         images: config.apiImg,
            //         listResults: [],
            //     };
            //
            //     expect(scope.view).toEqual(values);
            //
            //     console.log("Cool! initial values are ok :D");
            //    
            //
            // });

            // Testing getData function
            it('should retrieve values from getData function',function (){
                scope.view.listResults = [1,2,3];
                var data = scope.view.getData();
                expect(data).toEqual([1,2,3]);
                console.log("Great! the function getData works! :D");
            });
            
            
            
            // Testing watch over searchText
            it('should give a result list when the length of the search text are more than 2',function (){

                
                scope.$apply();
                scope.view.searchText = "a";
                scope.$apply();
                scope.view.searchText = "av";
                scope.$apply();
                scope.view.searchText = "avatar";
                scope.$apply();


                scope.performSearch();

                scope.$apply();

                expect(scope.view.listResults).not.toEqual([]);

                console.log(" Awesome! listResults are not empty when the length of the search text are more than 2 ");
                
                
            });



            // Testing watch over searchText
            it('should show error when the length of the search text are less than 2',function (){

                
                scope.$apply();
                scope.view.searchText = "a";
                scope.$apply();
                scope.view.searchText = "av";
                scope.$apply();


                scope.performSearch();

                scope.$apply();

                expect(scope.view.listResults).toEqual([]);

                console.log(" Yay! listResults are empty when the length of the search text are less than 2 ");


            });
            
            
            
            
            

            // Testing search function
            it('should bring information about Jennifer Aniston',function () {


                scope.$apply();
                scope.view.searchText = "aniston";
                scope.$apply();


                scope.performSearch();

                scope.$apply();

                expect(scope.view.listResults[0].name).toBe('Jennifer Aniston');
                expect(scope.view.listResults[0].popularity).toBe(10.830772);
                expect(scope.view.listResults[0].media_type).toBe('person');
                expect(scope.view.listResults[0].foto).toBe('/4d4wvNyDuvN86DoneawbLOpr8gH.jpg');


                console.log("perform search on aniston works :D");

            });


                /*
                * Test base functionality
                */

        
			
            

        });
    }
);
