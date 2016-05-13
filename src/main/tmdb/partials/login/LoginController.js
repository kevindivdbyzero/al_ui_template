/**
 * LoginController provides controller support for 
 *
 * @module tmdb.partials.person.LoginController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Kevin Nielsen <knielsen@alertlogic.com>
 *
 * @returns instance of the LoginController
 *
 * @copyright Alert Logic, Inc 2016
 *
 */

define( [ 'angular',
          'config/config'],
    function( angular, config ) {
        "use strict";

        var LoginController = function($rootScope, $scope, AppStateService, TMDBAPIService) {

            var self = this;

            $scope.view = {
                username: "",
                password: ""
            };

            self.onAuthenticated = function( userSession ) {

                $rootScope.$broadcast( 'user.authenticated', userSession );
                /*  What should we do now?  */
                var objectives = [
                    "Emit an 'authenticated' event on $rootScope to let the rest of the application know that we've been authenticated.",
                    "(Optional) Add graceful error handling to indicate when authentication fails.",
                    "(Optional) Catch the 'authenticated' event in AppStateService and cache it so that the user session persists across application loads.",
                    "Catch the 'authenticated' event in appHeader and adjust the partial to exclude the login form.",
                    "(Optional) When the user is authenticated, show their gravatar and username in the right part of the header!",
                    "On the movie details page, IF the user is authenticated, allow them to set a rating for that movie using the POST method."
                ];
                window.alert("We just authenticated " + userSession.fullName + "!  Now we need to do some additional work.\n\n" + objectives.join("\n\n") ); 
            };

            self.onAuthenticationFailure = function( reason ) {
                /*  TODO: handle errors */
                console.error("We have failed to login!  And we should handle the error gracefully." );
            };

            $scope.authenticate = function($event) {
                TMDBAPIService.authenticate( $scope.view.username, $scope.view.password ).then( self.onAuthenticated, self.onAuthenticationFailure );
            };
        };

        LoginController.$inject = [ '$rootScope', '$scope', 'AppStateService', 'TMDBAPIService'];

        return LoginController;
    }
);