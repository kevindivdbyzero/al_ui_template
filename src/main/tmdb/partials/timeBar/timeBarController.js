/*
* Controlador para la directiva time-bar
*
*/
define( [ 'angular',
          'config/config' ],
    function( angular, config ) {
        "use strict";

        var timeBarController = function( $scope ) {
            
         console.log($scope.time_bar);  
            var config  = angular.module("config");
            var style = {"width":($scope.time_bar*100)/200+"%"};
            $scope.view = {images: config.apiImg,time:style};
          

            
         console.log("resultado scope2 "+JSON.stringify($scope.view.time));
            
        };

        timeBarController.$inject = [ '$scope' ];

        return timeBarController;
    }
);