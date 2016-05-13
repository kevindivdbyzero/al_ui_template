/**
 * BloomTelevisionEpisodeController provides controller support for fetching movies from tmdb
 *
 * @module tmdb.partials.bloomTelevision.BloomTelevisionEpisodeController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Carlos Orozco <carlos.orozco@correounvialle.edu.co>
 *
 * @returns instance of the BloomTelevisionEpisodeController
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',
          'ngRoute',
          'config/config',
          'tmdb/services/TMDBAPIService'],
    function( angular, $routeParams, config, TMDBAPIService ) {
        "use strict";

        var BloomTelevisionEpisodeController = function($rootScope, $scope, $timeout, TMDBAPIService, $routeParams ) {

          $scope.tvEpisodesList = undefined;
          $scope.idShow = undefined;
          $scope.showEpisodes = false;


          $rootScope.$on('showEpisodes.event',function($event, numSeason){
            // $scope.idShow = $routeParams.tvshow_id;
            // $scope.season_number = $routeParams.season_number;
            TMDBAPIService.getTVShowSeason( $routeParams.tvshow_id, numSeason ).then( function( season ) {
              console.log("Season information: BloomTelevisionEpisodeController==>", season.data.episodes );            
              $scope.tvEpisodesList = season.data.episodes;
              $scope.showEpisodes = true;
            }); 

            
          });

          $scope.backSeasons = function(){            
            $scope.showEpisodes = false;
            $rootScope.$emit('backSeasons.event');
          };

          $scope.showInfoEpisode = function(episode){
            $scope.showEpisodes = false;
            $rootScope.$emit('showInfoEpisode.event', episode);

            
            $timeout(function(){
              $('html,body').animate({
                scrollTop: $("#divInfoEpisode").offset().top
              }, 2000);
            }, 100);                

          };

          $rootScope.$on('backEpisodes.event', function($event){
            $scope.showEpisodes = true;
          });


        };

        BloomTelevisionEpisodeController.$inject = [ '$rootScope','$scope','$timeout', 'TMDBAPIService', '$routeParams' ];

        return BloomTelevisionEpisodeController;
    }
);   