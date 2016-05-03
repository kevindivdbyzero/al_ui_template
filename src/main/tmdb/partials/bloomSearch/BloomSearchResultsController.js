/**
 * SearchController provides controller support for inline searching
 *
 * @module tmdb.partials.bloomSearchResul.BloomSearchController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Carlos Orozco <carlos.orozco@correounivalle.edu.co>
 *
 * @returns instance of the BloomSearchResultsController
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

        var BloomSearchResultsController = function( $scope ) {

            var config  = angular.module("config");
            $scope.view = {images: config.apiImg};

            $scope.showMovieInfo = function(idParametro, idType){   
                   
              $scope.currentId = idParametro;
              $scope.currentType = idType;
              
            };
            
            
        };


        BloomSearchResultsController.$inject = [ '$scope' ];


        return BloomSearchResultsController;
    }
);