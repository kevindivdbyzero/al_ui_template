define(['angular','config/config','ocNgRepeat','mfinder/services/TMDBAPIService','mwheel', 'LocalStorageModule'],
    function ( angular, config, ocNgRepeat,TMDBAPIService){
    "use strict";
    
    var popularMoviesController = function($scope, $rootScope ,TMDBAPIService, $routeParams, localStorage ) 
    {
        
        
        var config  = angular.module("config");

        $scope.view = {images: config.apiImg};

        $scope.currentMovie = 0;
        
        $scope.setCurrentMovie = function(id){
            $scope.currentMovie = id;
        };




        $rootScope.configFlag = false;
        

        $rootScope.$on('$routeChangeSuccess', function(){




            console.log("Route Changed; looking for configuration data");

            if(!$rootScope.configFlag){

                var storedConfig = TMDBAPIService.getConfiguration().then(

                    function(configResponse){
                        console.log("Got response", configResponse);

                        console.log("Getting and storing configuration data from tmdb api.....");
                        localStorage.set("img-base", configResponse.data.images.base_url);
                        console.log("Done!");
                        $rootScope.configFlag = true;

                    },function(reason){
                        console.log("Fail when trying to get configuration data from API: ", reason);
                    }
                );
                
                console.log("storedConfig",storedConfig);

            }else{

                console.log("Getting configuration data from localStorage.....");

                console.log("Done!");

            }


            //var configuration = localStorage.get("config");
            //console.log("configuration: ", configuration);
            //localStorage.set("config","Andres was here");
            console.log("---- configuration data ----");
            console.log("img-base-url: ", localStorage.get("img-base"));
            
                        

        });


        // Testing localstorage
        //console.log("img-base-url: ", localStorage.get("img-base"));
        
        
        $scope.carouselInitializer =  function() {
            
            var car = $(".movie-carousel");
            
            car.owlCarousel({
              slideBy: 'page',
              responsive:{
                0:{                    
                    items:1,
                    margin: 10
                },                  
                640:{
                    items:3,
                    margin: 10
                },            
                900:{
                    items:4,
                    margin: 10
                },
                1200:{
                    items:5,
                    margin: 10
                },
                1600:{
                    items:6,
                    margin: 10
                }  
                  
            }    
            });

            
            
            $scope.nextMovie = function () {
                car.trigger('next.owl.carousel');
            };
            
            $scope.prevMovie = function () {
                car.trigger('prev.owl.carousel');
            };
            
        };

        
        
        
    };

    popularMoviesController.$inject = [ '$scope','$rootScope', 'TMDBAPIService' ,'$routeParams', 'localStorageService' ];
    
    return popularMoviesController;
          
                  
});
    
    