/**
 * Provides a search element
 *
 * @module tmdb.directives.thumbnailCarousel
 *
 * @requires angular
 * @requires SearchController
 *
 * @author Brayan Rodriguez
 * @author David Zuluaga
 *
 * @copyright Alert Logic, Inc 2016
 *
 */

 define( [ 'angular', 
           'tmdb/partials/thumbnailCarousel/ThumbnailCarouselController' ], 
    function( angular, ThumbnailCarouselController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: ThumbnailCarouselController,
                templateUrl: '/tmdb/partials/thumbnailCarousel/thumbnailCarousel.html',
                restrict: 'E',
                scope: { //lo que esta aqui dentro se pasa como parametro cuando se llama la directiva
                    movieList: '=ngModel' //es la misma refrencia que la variable que se le pasa
                }
            };
        };
    }
);