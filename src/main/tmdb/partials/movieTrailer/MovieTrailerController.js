/**
 * MovieTrailerController provides controller support for show info and trailer about movie
 *
 * @module tmdb.partials.movie.MovieTrailerController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @returns instance of the MovieTrailerController
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',
          'ngRoute',
          'config/config',
          'tmdb/services/TMDBAPIService'],
    function( angular, $routeParams, config, TMDBAPIService, $sce ) {
      "use strict";

      var MovieTrailerController = function($scope, TMDBAPIService, $routeParams, $sce ) {

            var api = TMDBAPIService.Movie();

            var buscarInfoMovie = function(){
              api.movie.movie($scope.idMovie).then( function ( response ) {
                $scope.name = response.data.original_title;
                if(response.data.videos.results[0]){
                  $scope.urlVideo = $sce.trustAsResourceUrl("http://www.youtube.com/embed/"+response.data.videos.results[0].key+"?autoplay=1");  
                }else{
                  $scope.urlVideo = undefined;
                  $("#frameVideo").attr('src', '');
                }                
                $scope.info = response.data.overview;

              });
            };

            var buscarInfoPerson = function(){
              var api = TMDBAPIService.Person();
              api.person.person($scope.idMovie).then( function ( response ) {                  
                  $scope.name = response.data.name;
                  $scope.urlVideo = undefined;
                  $("#frameVideo").attr('src', '');
                  $scope.info = response.data.biography;
              });              
            };

            $("#myModal").on('hide.bs.modal', function(){
              $("#frameVideo").attr('src', '');              
            });

            $("#myModal").on('show.bs.modal', function(){              
              $("#frameVideo").attr('src', $scope.urlVideo);
            });

            $scope.$watch('idMovie', function(newValue, oldValue){              

                if($scope.idType==="movie"){
                  buscarInfoMovie();                  
                  console.log("Se esta buscando una movie");
                }

                if($scope.idType==="person"){
                  buscarInfoPerson();                  
                  console.log("Se esta buscando una persona");
                } 

                            
            });

      };

      MovieTrailerController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams', '$sce' ];

      return MovieTrailerController;
    }
);