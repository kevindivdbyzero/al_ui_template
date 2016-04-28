define(['angular','config/config','ocNgRepeat','mwheel'],
    function ( angular, config, ocNgRepeat){
    "use strict";
    
    var popularMoviesController = function($scope, TMDBAPIService, $routeParams ) 
    {
        
        
        var config  = angular.module("config");
        $scope.view = {images: config.apiImg};

        $scope.currentMovie = 0;
        
        $scope.setCurrentMovie = function(id){
            $scope.currentMovie = id;
        }
        
        
        
        $scope.carouselInitializer =  function() {
            
            var car = $(".movie-carousel");
            
            car.owlCarousel({                            
                            
              //nav: true,                              
              //navText: ["<a class='btn btn-primary'> < </a>", "<a class='btn btn-primary'> > </a>"],
              responsive:{
                0:{                    
                    items:1,
                    margin: 0,
                },                  
                640:{
                    items:3,
                    margin: 10,
                },            
                900:{
                    items:4,
                    margin: 10,
                },
                1200:{
                    items:5,
                    margin: 10,
                },
                1600:{
                    items:6,
                    margin: 10,
                }  
                  
            }    
            });
            
            car.on('mousewheel', '.owl-stage', function(e){
                if (e.deltaY<0){                     
                    car.trigger('next.owl.carousel');
                }else{
                    car.trigger('prev.owl.carousel');
                }
                e.preventDefault();
            });
            
        };

        
        
        
    };

    popularMoviesController.$inject = [ '$scope','$routeParams' ];
    
    return popularMoviesController;
          
                  
});
    
    