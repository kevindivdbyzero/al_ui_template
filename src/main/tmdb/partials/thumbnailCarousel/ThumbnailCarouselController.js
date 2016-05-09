/**
 * ThumbnailCarouselController provides support for getting a remote image URL base path to the directives
 *
 * @module tmdb.partials.remoteImageLoader.ThumbnailCarouselController
 *
 * @requires angular
 * @requires config
 *
 * @author
 *
 * @returns instance of the ThumbnailCarouselController
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',
          'config/config' ],
    function( angular, config ) {
        "use strict";

        var ThumbnailCarouselController = function( $scope ) {

            var config  = angular.module("config");
            $scope.view = {images: config.apiImg};
            console.log($scope.movieList);
            //hacer variable auto para que sea automatico y el intervalo
        };

        ThumbnailCarouselController.$inject = [ '$scope' ];

        return ThumbnailCarouselController;
    }
);