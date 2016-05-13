/**
 * BloomEpisodeController provides controller support for fetching movies from tmdb
 *
 * @module tmdb.partials.bloomTelevision.BloomEpisodeController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Carlos Orozco <carlos.orozco@correounvialle.edu.co>
 *
 * @returns instance of the BloomEpisodeController
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

            var BloomEpisodeController = function($rootScope, $scope, $timeout, TMDBAPIService, $routeParams, $document ) {

              $scope.showInfoEpisode = false;

              $scope.episode_number = "";              
              $scope.name = "";
              $scope.overview = "";
              $scope.season_number = "";

              $rootScope.$on('showInfoEpisode.event', function($event, episode){
                console.log("llego el evento showInfoEpisode", episode);
                $scope.showInfoEpisode = true;
                $scope.episode_number = episode.episode_number;              
                $scope.name = episode.name;
                $scope.overview = episode.overview;
                $scope.season_number = episode.season_number;

              });

             $scope.backEpisodes = function(){
              $scope.showInfoEpisode = false;
              $rootScope.$emit('backEpisodes.event');
             };

           };

           BloomEpisodeController.$inject = ['$rootScope', '$scope', '$timeout', 'TMDBAPIService', '$routeParams'];

           return BloomEpisodeController;
    }
);   