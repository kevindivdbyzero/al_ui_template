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

        var BloomTelevisionEpisodeController = function($scope, TMDBAPIService, $routeParams ) {

          $scope.tvEpisodesList = undefined;
          $scope.idShow = undefined;
          $scope.season_number = undefined;


          $scope.$watch('hasSearchedEpisodes', function(newValue, oldValue){
            console.log("Cambio algo, por tanto presionaron >>>", newValue);

            if($scope.hasSearchedEpisodes!==undefined){
              $scope.idShow = $routeParams.tvshow_id;
              $scope.season_number = $routeParams.season_number;
             TMDBAPIService.getTVShowSeason( $routeParams.tvshow_id, $routeParams.season_number ).then( function( season ) {
              console.log("Season information: BloomTelevisionEpisodeController 1==>", season.data.episodes );            
              $scope.tvEpisodesList = season.data.episodes;
            }); 
           }
           
         });  

        };

        BloomTelevisionEpisodeController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams' ];

        return BloomTelevisionEpisodeController;
    }
);   