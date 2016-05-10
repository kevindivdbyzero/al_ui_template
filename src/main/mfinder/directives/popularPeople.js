/**
 * Provides a popular-people element
 *
 * @module tmdb.directives.popularMovies
 *
 * @requires angular
 * @requires RemoteImageLoader
 *
 * @param {object} angular - An instance of AngularJS
 * @param {object} RemoteImageLoader - An instance of RemoteImageLoader
 *
 * @author Andres Artunduaga < @alertlogic.com>
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',
        'mfinder/partials/popularPeople/popularPeopleController' ],
    function( angular, popularPeopleController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: popularPeopleController,
                templateUrl: '/mfinder/partials/popularPeople/popularPeople.html',
                restrict: 'E',
                scope: {
                    peopleList: '=ngModel'
                }
            };
        };
    });
