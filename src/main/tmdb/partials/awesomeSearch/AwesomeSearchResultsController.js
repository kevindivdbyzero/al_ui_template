/**
 * AwesomeSearchResultsController provides controller support  displaying results
 *
 * @module tmdb.partials.search.AwesomeSearchResultsController
 *
 * @requires angular
 * @requires config
 * @requires TMDBAPIService
 *
 * @author John Gomez <jgomez@alertlogic.com>
 *
 * @returns instance of the AwesomeSearchResultsController
 *
 * @copyright Alert Logic, Inc 2016
 *
 */

define( [ 'angular',
          'config/config',
          'tmdb/services/TMDBAPIService'],
    function( angular, config, TMDBAPIService ) {
        "use strict";

        var AwesomeSearchResultsController = function($rootScope,$scope, TMDBAPIService ) {


            var config  = angular.module("config");
            $scope.view = {
            	images: config.apiImg
            };

            $scope.help = function( thing ) {
                $rootScope.$emit('selected.media', thing );
            };
            
        };

        AwesomeSearchResultsController.$inject = [ '$rootScope', '$scope', 'TMDBAPIService' ];

        return AwesomeSearchResultsController;
    }
);