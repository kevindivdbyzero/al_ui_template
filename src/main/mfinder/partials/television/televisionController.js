/**
 * televisionController provides controller support for fetching tv shows from tmdb
 *
 * @module mfinder.partials.television.televisionController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @returns instance of the MovieController
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',
        'ngRoute',
        'config/config',
        'mfinder/services/TMDBAPIService'],
    function( angular, $routeParams, config, TMDBAPIService, $sce ) {
        "use strict";

        var televisionController = function($scope, TMDBAPIService, $routeParams, $sce ) {

            $scope.view   = {
                details: {},
                trailers: []
            };



            var api = TMDBAPIService.Television();
            
            api.tv.tv_show_info($routeParams.tv_id).then( function ( response ) {
                $scope.view.details = response.data;
                
                console.log("tv-data-response", response);

                var trailers = response.data.videos.results;

                for(var i=0; i<trailers.length ;i++ ){
                    $scope.view.trailers[i] = $sce.trustAsResourceUrl("http://www.youtube.com/embed/"+trailers[i].key);
                }

            });

        };

        televisionController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams', '$sce' ];

        return televisionController;
    }
);