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

            var BloomTelevisionController = function($rootScope, $scope, $timeout, TMDBAPIService, $routeParams, $document ) {

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
             

             $rootScope.$on('moveDivTVInfo.event',function(){
              // var divInfoTv = angular.element(document.getElementById('divInfoTv'));
              // console.log("divInfoTv?======> ", divInfoTv);
              // $document.scrollTo(divInfoTv, 30, 1000);              
              //$document.scrollToElementAnimated(divInfoTv);
              console.log("Llego a on moveDivTVInfo.event");

              $timeout(function(){
                $('html,body').animate({scrollTop: $("#divInfoTv").offset().top}, 2000);
              }, 100);

            });

           };

           BloomTelevisionController.$inject = ['$rootScope', '$scope', '$timeout', 'TMDBAPIService', '$routeParams'];

           return BloomTelevisionController;
    }
);   