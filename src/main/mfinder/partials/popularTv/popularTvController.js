define(['angular','config/config','ocNgRepeat','mwheel'],
    function ( angular, config, ocNgRepeat){
    "use strict";
    
    var popularTvController = function($scope, TMDBAPIService, $routeParams ) 
    {
        
        
        var config  = angular.module("config");
        $scope.view = {images: config.apiImg};
        
        
        
        $scope.tvcarouselInitializer =  function() {
            
            var tvcar = $(".tv-carousel");
            
            tvcar.owlCarousel({

              slideBy: 'page',
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
            
            // tvcar.on('mousewheel', '.owl-stage', function(e){
            //     if (e.deltaY<0){                     
            //         tvcar.trigger('next.owl.carousel');
            //     }else{
            //         tvcar.trigger('prev.owl.carousel');
            //     }
            //     e.preventDefault();
            // });

            $scope.nextTVS = function () {
                tvcar.trigger('next.owl.carousel');
            };

            $scope.prevTVS = function () {
                tvcar.trigger('prev.owl.carousel');
            };
            
            
        };

        
        
        
    };

    popularTvController.$inject = [ '$scope','$routeParams' ];
    
    return popularTvController;
          
                  
});
    
    