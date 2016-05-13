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

		 	var BloomTelevisionSeasonController = function($rootScope, $scope, $timeout, TMDBAPIService, $routeParams ) {

		 		$scope.view   = {
		 			details: {},
		 		};

		 		$scope.idShow = $routeParams.tvshow_id;
		 		$scope.images = angular.module("config").apiImg;

		 		$scope.listSeasons = undefined;
		 		TMDBAPIService.getTVShowSeasons($routeParams.tvshow_id).then(function(data){
		 			console.log("Season information listSeasons: ");
		 			console.log(data);
		 			$scope.listSeasons = data;
		 		});


		 		var moveToDiv = function(){
		 			$timeout(function(){
		 				$('html,body').animate({
		 					scrollTop: $("#divEpisodes").offset().top
		 				}, 2000);
		 			}, 100);                
		 		};

		 		$scope.mostrarSeasons = true;
		 		
		 		$scope.searchEpisodes = function(numSeason){		 			
		 			moveToDiv();
		 			$scope.mostrarSeasons = false;
		 			$rootScope.$emit('showEpisodes.event', numSeason);
		 		};

		 		$rootScope.$on('backSeasons.event', function($event){
		 			$scope.mostrarSeasons = true;
		 		});		 		
		 		

		 	};

		 	BloomTelevisionSeasonController.$inject = [ '$rootScope', '$scope', '$timeout', 'TMDBAPIService', '$routeParams' ];

		 	return BloomTelevisionSeasonController;
		 }
 );