/**
 * seasonController provides controller support for getting season information from tmdb
 *
 * @module mfinder.partials.television.seasonController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Andres Artunduaga < @alertlogic.com>
 *
 * @returns instance of the seasonController
 *
 */

define( [ 'angular',
        'ngRoute',
        'config/config',
        'mfinder/services/TMDBAPIService'],
    function( angular, $routeParams, config, TMDBAPIService, $sce ) {
        "use strict";

        var seasonController = function($scope, $routeParams, TMDBAPIService, $sce ) {

            $scope.view   = {
                images:config.apiImg,
                details: {},
                trailers: []
            };



            var api = TMDBAPIService.Television();

            api.tv.tv_season_info($routeParams.tv_id, $scope.seasonId).then( function ( response ) {
                $scope.view.details = response.data;
                
                $scope.view.details.tv_id = $routeParams.tv_id; 
                // console.log("tv-season-data-response", response);
                // console.log("tv-season-data-response-name", response.data.name);
                // console.log("tv-season-data-response-over", response.data.overview);

                var trailers = response.data.videos.results;

                for(var i=0; i<trailers.length ;i++ ){
                    $scope.view.trailers[i] = $sce.trustAsResourceUrl("http://www.youtube.com/embed/"+trailers[i].key);
                }

            });

        };

        seasonController.$inject = [ '$scope', '$routeParams',  'TMDBAPIService', '$sce' ];

        return seasonController;
    }
);