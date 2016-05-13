/**
 * SearchController provides controller support for inline searching
 *
 * @module tmdb.partials.bloomSearch.BloomHomeController
 *
 * @requires angular
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Carlos Orozco <carlos.orozco@correounivalle.edu.co>
 *
 * @returns instance of the BloomHomeController
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',          
          'config/config',
          'tmdb/services/TMDBAPIService',
          'tmdb/services/MyOwnService'],
    function( angular, config, TMDBAPIService, MyOwnService ) {
        "use strict";

        var BloomHomeController = function($rootScope, $scope, TMDBAPIService, MyOwnService, $timeout ) {

            $scope.recentSearch = MyOwnService.getHistorySearches();

            console.log("$scope.recentSearch ===> ", $scope.recentSearch);

            $scope.showMovieInfo = function(idParametro, idType){   
              
              console.log("idParametro ===> idMovie ==> ", idParametro);
              console.log("idParametro ===> idType ==> ", idType);             

              $rootScope.$emit('showModalForRecentSearch.event', idParametro, idType);
              
            };

            $rootScope.$on('updateSearches.event', function($event){
              $scope.recentSearch = MyOwnService.getHistorySearches();
            });


        };

        BloomHomeController.$inject = ['$rootScope', '$scope', 'TMDBAPIService', 'MyOwnService', '$timeout' ];

        return BloomHomeController;
    }
);