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
		 		$scope.idShow = $routeParams.tvshow_id;

		 		TMDBAPIService.getTVShowDetails($routeParams.tvshow_id).then( function( detail ) {
		 			// console.log("getTVShowDetails: ", detail.data );
		 			$scope.tvName = detail.data.original_name;
		 			$scope.tvInfo = detail.data.overview;
		 			$scope.tvPath = $scope.images+detail.data.poster_path;
		 		});

		 		$scope.listSeasons = undefined;
		 		TMDBAPIService.getTVShowSeasons($routeParams.tvshow_id).then(function(data){
		 			console.log("Season information listSeasons: ");
		 			console.log(data);
		 			$scope.listSeasons = data;
		 		});

		 		$scope.hasSearchedEpisodes = undefined;
		 		
		 		$scope.searchEpisodes = function(){
		 			if($scope.hasSearchedEpisodes){
		 				$scope.hasSearchedEpisodes = false;
		 			}else{
		 				$scope.hasSearchedEpisodes = true;
		 			}		 			
		 		};

		 		

		 	};

		 	BloomTelevisionSeasonController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams' ];

		 	return BloomTelevisionSeasonController;
		 }
 );