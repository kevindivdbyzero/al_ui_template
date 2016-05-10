define(['angular','config/config','ocNgRepeat','mwheel'],
    function ( angular, config, ocNgRepeat){
        "use strict";

        var popularPeopleController = function($scope, TMDBAPIService, $routeParams )
        {


            var config  = angular.module("config");
            $scope.view = {images: config.apiImg};



            $scope.peopleCarouselInitializer =  function() {

                var pcar = $(".people-carousel");

                pcar.owlCarousel({

                    //nav: true,
                    //navText: ["<a class='btn btn-primary'> < </a>", "<a class='btn btn-primary'> > </a>"],
                    responsive:{
                        0:{
                            items:1,
                            margin: 0,
                        },
                        640:{
                            items:3,
                            margin: 5,
                        },
                        900:{
                            items:4,
                            margin: 5,
                        },
                        1200:{
                            items:5,
                            margin: 5,
                        },
                        1600:{
                            items:6,
                            margin: 5,
                        }

                    }
                });

            };




        };

        popularPeopleController.$inject = [ '$scope','$routeParams' ];

        return popularPeopleController;


    });
