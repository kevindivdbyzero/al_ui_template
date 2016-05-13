

define( [ 'angular',
          'ngRoute',
          'config/config',
          'ngAnimate', 
          'ui.bootstrap',
          'tmdb/services/TMDBAPIService'],
    function( angular) {
        "use strict";

        var RatingController = function($scope, TMDBAPIService) {
            var apiMovie = TMDBAPIService.Movie();
            $scope.view = {
                currentRate: 7,
                percent: 0,
                max_rate : 10,
            };
            $scope.hoveringOver = function(value){
                console.log("hovering");
		    	$scope.view.currentRate = value;
			    $scope.view.percent = 100 * (value / $scope.view.max_rate);
		    };

		    $scope.rateOnClick = function(){
		        console.log("clicking" + $scope.movieId);
		        $scope.view.actualRate = $scope.view.currentRate;
		        console.log("actual rate: " + $scope.view.actualRate);
		        apiMovie.movie.setRating($scope.movieId, $scope.view.actualRate);
		    };

        };

        RatingController.$inject = [ '$scope', 'TMDBAPIService'];

        return RatingController;
    }
);