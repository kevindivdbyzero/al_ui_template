/* @author Carlos Orozco <carlos.orozco@correounvialle.edu.co>
	*
	* @returns instance of the BloomTelevisionSeasonController
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
 
				 var BloomTelevisionSeasonController = function($scope, TMDBAPIService, $routeParams ) {
 
						 $scope.view   = {
								 details: {},
						 };
						 
						 $scope.images = angular.module("config").apiImg;

						 
						 $scope.tvName = "";
						 $scope.tvInfo = "";
						 $scope.tvPath = "";

						 TMDBAPIService.getTVShowDetails($routeParams.tvshow_id).then( function( detail ) {
                    console.log("getTVShowDetails: ", detail.data );
                    $scope.tvName = detail.data.original_name;
                    $scope.tvInfo = detail.data.overview;
                    $scope.tvPath = $scope.images+detail.data.poster_path;
             });

						 $scope.listSeasons = {};
             TMDBAPIService.getTVShowSeasons($routeParams.tvshow_id).then(function(data){
							console.log("Season information listSeasons: ");
							console.log(data);
             		$scope.listSeasons = data;
             });

						 console.log("Route params: ", $routeParams );
						 /* ROUTE definition: '/television/:tvshow_id/season/:season_number' */
						 TMDBAPIService.getTVShowSeason( $routeParams.tvshow_id, $routeParams.season_number ).then( function( season ) {
							console.log("Season information: ", season );
						} );
	
				 };
 
				 BloomTelevisionSeasonController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams' ];
 
				 return BloomTelevisionSeasonController;
		 }
 );