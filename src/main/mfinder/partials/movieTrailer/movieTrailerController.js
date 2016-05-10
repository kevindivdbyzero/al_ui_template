define( [ 'angular',
        'ngRoute',
        'config/config',
        'mfinder/services/TMDBAPIService'],
    function( angular, $routeParams, config, TMDBAPIService, $sce ) {
        "use strict";

        var movieTrailerController = function($scope, TMDBAPIService, $routeParams, $sce ) {

            // movie details
            $scope.details = {};

            // youtube source key
            $scope.ysrc = undefined;

            
            var api = TMDBAPIService.Movie();
            
            var getData = function(){
                api.movie.movie($scope.mov).then( function ( response ) {
                    $scope.details = response.data;
                    $scope.ysrc = $sce.trustAsResourceUrl("http://www.youtube.com/embed/"+response.data.videos.results[0].key+"/?rel=0&autoplay=1");
                }, function ( fail ) {
                    console.log("Fail in movieTrailerController :", fail );
                    $scope.ysrc = ""; 
                });
            };


            $scope.$watch('mov',function(newValue,oldValue){
                getData();
            });




            $("#movieTrailerModal").on('hide.bs.modal', function(){
                $("#videoframe").attr('src', '');
            });

            $("#movieTrailerModal").on('show.bs.modal', function(){
                $("#videoframe").attr('src', $scope.ysrc);
            });








        };

        movieTrailerController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams', '$sce' ];

        return movieTrailerController;
    }
);