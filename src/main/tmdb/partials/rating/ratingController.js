

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
		    	$scope.view.currentRate = value;
			    $scope.view.percent = 100 * (value / $scope.view.max_rate);
		    };

		    $scope.rateOnClick = function(){
		        $scope.view.actualRate = $scope.view.currentRate;
		        apiMovie.setRating($scope.movie_id, $scope.view.actualRate);
		    };

        };

        RatingController.$inject = [ '$scope', 'TMDBAPIService'];

        return RatingController;
    }
);