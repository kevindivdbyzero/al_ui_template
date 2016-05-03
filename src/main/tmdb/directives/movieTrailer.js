/**
 * Provides a search element
 *
 * @module tmdb.directives.movieTrailer
 *
 * @requires angular
 * @requires MovieTrailerController
 *
 * @author Carlos Orozco <carlos.orozco@correounivalle.edu.co>
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

 define( [ 'angular', 
           'tmdb/partials/movieTrailer/MovieTrailerController' ], 
    function( angular, MovieTrailerController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: MovieTrailerController,
                templateUrl: '/tmdb/partials/movieTrailer/movieTrailer.html',
                restrict: 'E',
                scope: {
                    idMovie: '=ngModel',
                    idType: '=ngTipo'
                }
            };
        };
    }
);