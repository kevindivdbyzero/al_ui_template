/**
 * Abstraction for the tmdb.org API.
 *
 * @module tmdb.services.TMDBAPIService
 *
 * @requires angular
 * @requires ngRoute
 * @requires ngResource
 * @requires LocalStorageModule
 * @requires config/config
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @returns Wrapper for several TMDB API's
 *
 */

define( [ 'angular', 
          'ngRoute',
          'ngResource',
          'LocalStorageModule',
          'config/config' ], 
    function ( angular ) {
        "use strict";

        var TMDBAPIService = function ( $rootScope, $http, $timeout, $resource, localStorageService, $location, $q ) {

            var self            = this;
            var config          = angular.module("config");
            var serviceVersion  = 3;
            var apiBaseUrl      = config.apiUrl + serviceVersion;
            var apiKey          = config.apiKey;
            this.ServiceCache = [];

            this.getConfiguration = function() {
                var req = {
                    method: "GET",
                    url: apiBaseUrl + "/configuration",
                    params: {
                        api_key: apiKey
                    }
                };

                return $http( req );
            };

            this.getChanges = function() {
                var url = config.apiUrl + serviceVersion + "/movie/changes?api_key=" + apiKey;
                return $http.get( url );
            };

            this.getJobList = function() {
                var req = {
                    method: "GET",
                    url: apiBaseUrl + "/job/list",
                    params: {
                        api_key: apiKey
                    }
                };

                return $http( req );
            };

            this.getTVShowDetails = function( tvShowID ) {
                var req = {
                    method: 'GET',
                    url: apiBaseUrl + "/tv/" + tvShowID,
                    params: {
                        api_key: apiKey
                    }
                };

                return $http( req );
            };

            this.getTVShowSeasons = function( tvShowID ) {
                return this.getTVShowDetails( tvShowID ).then( function( response ) {
                    var seasons = [];
                    angular.forEach( response.data.seasons, function( season ) {
                        seasons.push( season );
                    } );
                    return seasons;
                } );
            };

            this.getTVShowSeason = function( tvShowID, seasonIndex ) {
                var req = {
                    method: 'GET',
                    url: apiBaseUrl + "/tv/" + tvShowID + "/season/" + seasonIndex,
                    params: {
                        api_key: apiKey
                    }
                };

                return $http( req );

            };

             this.getAuthenticationToken = function() {
                var req = {
                    method: 'GET',
                    url: apiBaseUrl + "/authentication/token/new",
                    params: {
                        api_key: apiKey
                    }
                };

                return $http( req );
            };

            this.authorizeAuthToken = function( token, username, password ) {
                var req = {
                    method: 'GET',
                    url: apiBaseUrl + "/authentication/token/validate_with_login",
                    params: {
                        api_key: apiKey,
                        request_token: token,
                        username: username,
                        password: password
                    }
                };

                return $http( req );
            };

            this.createSession = function( requestToken ) {
                var req = {
                    method: 'GET',
                    url: apiBaseUrl + "/authentication/session/new",
                    params: {
                        api_key: apiKey,
                        request_token: requestToken
                    }
                };

                return $http( req );
            };

            this.getAccountDetails = function( sessionID ) {
                var req = {
                    method: 'GET',
                    url: apiBaseUrl + "/account",
                    params: {
                        api_key: apiKey,
                        session_id: sessionID
                    }
                };
                return $http( req );
            };

            this.authenticate = function( username, password ) {
                return self.getAuthenticationToken().then( function( tokenResponse ) {
                    if ( ! tokenResponse.data.success || ! tokenResponse.data.request_token ) {
                        return $q.reject( "Failed to get a token from /authentication/token/new" );
                    }

                    var requestToken = tokenResponse.data.request_token;

                    return self.authorizeAuthToken( requestToken, username, password ).then( function( authResponse ) {
                        if ( ! authResponse.data.success ) {
                            return $q.reject("Failed to authorize a token with /authentication/token/validate_with_login endpoint" );
                        }

                        return self.createSession( requestToken ).then( function( sessionResponse ) {
                            if ( ! sessionResponse.data.success || ! sessionResponse.data.session_id ) {
                                return $q.reject( "Failed to create a session with the authentication/session/new endpoint" );
                            }

                            var sessionID = sessionResponse.data.session_id;

                            return self.getAccountDetails( sessionID ).then( function( accountResponse ) {
                                console.log( "Account information: ", accountResponse );

                                var authenticationResult = {
                                    sessionID: sessionID,
                                    userID: accountResponse.data.id,
                                    fullName: accountResponse.data.name,
                                    userName: accountResponse.data.username,
                                    profileImageURL: "http://www.gravatar.com/avatar/" + accountResponse.data.avatar.gravatar.hash
                                };

                                console.log("Resolving promise with", authenticationResult );
                                return authenticationResult;
                            } );

                        } );
                    } );

                } );
            };

            this.sendRating = function( idMovie, rate ) {
 
                 var existingSession = localStorageService.get( "_session" );
                 var sessionID = "";
 
                 if ( existingSession ) {
                         try {
                             var sessionData = JSON.parse( existingSession );
                             sessionID = sessionData.sessionID;
                             console.log("recuperando sessionID sendRating", sessionID);
                         } catch( e ) {
                             console.error("Session is corrupt" );                            
                         }
                 }
 
 
                 var req = {
                     method: 'POST',
                     url: apiBaseUrl + "/movie/"+idMovie+"/rating",
                     params: {
                         api_key: apiKey,
                         session_id: sessionID
                     },
                     data: {value: rate}
                 };
                 return $http( req );
             };
 
             $rootScope.$on('movie.rating',function($event, rate, idMovie){
                 console.log("Received rating "+ rate);
                 self.sendRating(idMovie, rate).then(function(response){
                     console.log("State send of your rating ===> ", response);
                     if(response.data.status_message==="The item/record was updated successfully."){
                         window.alert("Your rating has been send :D !");
                     }
                 }, function(errorCallBack){
                     window.alert("Your rating has not been send, please try later :( ");
                 });
             });

            /* http://docs.themoviedb.apiary.io/reference/discover */
            /*
             * We support very little of this API, it has many many options.
             */
            this.Discover = function () {
                return this.GetCachedService( "discover", function () {
                    var serviceVersion = "3";
                    var serviceBase    = this._normalizeEndpoint( serviceVersion, "discover" );

                    /* http://docs.themoviedb.apiary.io/reference/discover/discovermovie */
                    var movieList = function ( sortBy, page, includeAdult ) {
                        if ( sortBy === undefined ) {
                            sortBy = 'popularity.desc';
                        }
                        if ( page === undefined ) {
                            page = 1;
                        }
                        if ( includeAdult === undefined ) {
                            includeAdult = 'false';
                        }
                        var uri = serviceBase.url + '/discover/movie?page=' + page + '&include_adult=' + includeAdult + '&sort_by=' + sortBy + '&api_key=' + serviceBase.apiKey;
                        return $http.get( uri );
                    };

                    /* http://docs.themoviedb.apiary.io/reference/discover/discovertv */
                    var televisionList = function ( sortBy, page ) {
                        if ( sortBy === undefined ) {
                            sortBy = 'popularity.desc';
                        }
                        if ( page === undefined ) {
                            page = 1;
                        }
                        var uri = serviceBase.url + '/discover/tv?page=' + page + '&sort_by=' + sortBy + '&api_key=' + serviceBase.apiKey;
                        return $http.get( uri );
                    };

                    return {
                        discover: {
                            movies: movieList,
                            tv: televisionList
                        }
                    };
                });
            };

            /* http://docs.themoviedb.apiary.io/reference/movies */
            this.Movie = function () {
                return this.GetCachedService( "movie", function () {
                    var serviceVersion = "3";
                    var serviceBase    = this._normalizeEndpoint( serviceVersion, "movie" );

                    /* http://docs.themoviedb.apiary.io/reference/movies/movieid */
                    var getMovie = function ( movie ) {
                        var uri = serviceBase.url + '/movie/' + movie + '?api_key=' + serviceBase.apiKey + '&append_to_response=alternative_titles,credits,releases,videos,similar,reviews,images';
                        return $http.get( uri );
                    };

                    return {
                        movie: {
                            movie: getMovie
                        }
                    };
                });
            };

            /* http://docs.themoviedb.apiary.io/reference/people */
            this.Person = function () {
                return this.GetCachedService( "person", function () {
                    var serviceVersion = "3";
                    var serviceBase    = this._normalizeEndpoint( serviceVersion, "person" );

                    /* http://docs.themoviedb.apiary.io/reference/people/personid */
                    var getPerson = function ( person ) {
                        var uri = serviceBase.url + '/person/' + person + '?api_key=' + serviceBase.apiKey + '&append_to_response=movie_credits,tv_credits,images';
                        return $http.get( uri );
                    };

                    return {
                        person: {
                            person: getPerson
                        }
                    };
                });
            };

            /* http://docs.themoviedb.apiary.io/reference/search */
            this.Search = function() {
                return this.GetCachedService( "search", function () {
                    var serviceVersion = "3";
                    var serviceBase    = this._normalizeEndpoint( serviceVersion, "search" );

                    /* http://docs.themoviedb.apiary.io/reference/search/searchcompany */
                    var byCompany = function ( company, page ) {
                        if ( page === undefined ) {
                            page = 1;
                        }
                        var uri = serviceBase.url + '/search/company?page=' + page + '&api_key=' + serviceBase.apiKey + '&query=' + company;
                        return $http.get( uri );
                    };

                    /* http://docs.themoviedb.apiary.io/reference/search/searchmovie */
                    var byMovie = function ( movie, page ) {
                        if ( page === undefined ) {
                            page = 1;
                        }
                        var uri = serviceBase.url + '/search/movie?page=' + page + '&api_key=' + serviceBase.apiKey + '&query=' + movie;
                        return $http.get( uri );
                    };

                    /* http://docs.themoviedb.apiary.io/reference/search/searchmulti */
                    var byMulti = function ( multi, page ) {
                        if ( page === undefined ) {
                            page = 1;
                        }
                        var uri = serviceBase.url + '/search/multi?page=' + page + '&api_key=' + serviceBase.apiKey + '&query=' + multi;
                        return $http.get( uri );
                    };

                    /* http://docs.themoviedb.apiary.io/reference/search/searchperson */
                    var byPerson = function ( person, page ) {
                        if ( page === undefined ) {
                            page = 1;
                        }
                        var uri = serviceBase.url + '/search/person?page=' + page + '&api_key=' + serviceBase.apiKey + '&query=' + person;
                        return $http.get( uri );
                    };

                    /* http://docs.themoviedb.apiary.io/reference/search/searchtv */
                    var byTv = function ( tv, page ) {
                        if ( page === undefined ) {
                            page = 1;
                        }
                        var uri = serviceBase.url + '/search/tv?page=' + page + '&api_key=' + serviceBase.apiKey + '&query=' + tv;
                        return $http.get( uri );
                    };

                    return {
                        search: {
                            company: byCompany,
                            movie: byMovie,
                            multi: byMulti,
                            person: byPerson,
                            tv: byTv
                        }
                    };
                });
            };

            this.GetCachedService = function( serviceName, instantiateFunction ) {

                if ( this.ServiceCache[serviceName] !== undefined ) {
                    return this.ServiceCache[serviceName];
                }

                if ( instantiateFunction ) {
                    var serviceInstance = instantiateFunction.call( this );
                    if ( serviceInstance !== undefined ) {
                        this.ServiceCache[serviceName] = serviceInstance;
                        return serviceInstance;
                    }
                }

                return undefined;
            };

            this._normalizeEndpoint = function( version ) {
                var config = angular.module("config");

                return {'url': config.apiUrl + version,
                        'apiKey': config.apiKey};
            };
        };

        TMDBAPIService.$inject = [ '$rootScope', '$http', '$timeout', '$resource', 'localStorageService', '$location', '$q' ];

        return TMDBAPIService;
}
);