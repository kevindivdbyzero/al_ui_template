/**
 * BloomTelevisionController provides controller support for fetching movies from tmdb
 *
 * @module tmdb.partials.bloomTelevision.BloomTelevisionController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Carlos Orozco <carlos.orozco@correounvialle.edu.co>
 *
 * @returns instance of the BloomTelevisionController
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

            var BloomTelevisionController = function($scope, TMDBAPIService, $routeParams ) {

             $scope.images = angular.module("config").apiImg;


             $scope.tvName = "";
             $scope.tvInfo = "";
             $scope.tvPath = "";
             

             TMDBAPIService.getTVShowDetails($routeParams.tvshow_id).then( function( detail ) {
                // console.log("getTVShowDetails: ", detail.data );
                $scope.tvName = detail.data.original_name;
                $scope.tvInfo = detail.data.overview;
                $scope.tvPath = $scope.images+detail.data.poster_path;
              });
             
           };

           BloomTelevisionController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams' ];

           return BloomTelevisionController;
    }
);   