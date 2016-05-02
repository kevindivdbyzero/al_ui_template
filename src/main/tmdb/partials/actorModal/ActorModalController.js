define( [ 'angular',
        'ngRoute',
        'config/config',
        'tmdb/services/TMDBAPIService'],
    function( angular, $routeParams, config, TMDBAPIService ) {
        "use strict";

        var ActorModalController = function($scope, TMDBAPIService, $routeParams ) {

            $scope.view   = {
                details: {},
                images: config.apiImg
            };

            var api = TMDBAPIService.Person();

            var getData = function(){
                api.person.person($scope.personId).then( function ( response ) {
                    $scope.view.details = response.data;
                    console.log(response.data);
                });
            };    
              
            $scope.$watch('personId',function(newValue,oldValue){                
                    getData();
            });         
            
        };

        ActorModalController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams' ];

        return ActorModalController;
    }
);