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

        var TMDBAPIService = function ( $rootScope, $http, $timeout, $resource, localStorageService, $location ) {

            var config = angular.module("config");
            var serviceVersion = 3;
            var apiBaseUrl = config.apiUrl + serviceVersion;
            var apiKey = config.apiKey;

            this.ServiceCache = [];


            this.getConfiguration = function(){
               var req = {
                    method: "GET",
                    url: apiBaseUrl + "/configuration",
                    params:{
                        api_key: apiKey
                    }
               };

               return $http(req);     
            };


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

                    /* Extended APIService */
                    /*http://docs.themoviedb.apiary.io/reference/people/personpopular/get*/
                    var getPopular = function ( page ) {
                        if ( page === undefined ) {
                            page = 1;
                        }
                        var uri = serviceBase.url + '/person/popular?page=' + page + '&api_key=' + serviceBase.apiKey;
                        return $http.get( uri );
                    };


                    return {
                        person: {
                            person: getPerson,
                            popular: getPopular
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




            /* Extended APIService */
            /* http://docs.themoviedb.apiary.io/reference/tv */
            this.Television = function () {
                return this.GetCachedService( "tv", function () {
                    var serviceVersion = "3";
                    var serviceBase    = this._normalizeEndpoint( serviceVersion, "tv" );

                    /*http://docs.themoviedb.apiary.io/#reference/tv/tvid/get */
                    var getTv = function ( tv ) {
                        var uri = serviceBase.url + '/tv/' + tv + '?api_key=' + serviceBase.apiKey + '&append_to_response=alternative_titles,credits,videos,similar,images';
                        return $http.get( uri );
                    };


                    var getTVShowSeasons = function( tvShowID ) {
                        return getTv( tvShowID ).then( function( response ) {
                            var seasons = [];
                            angular.forEach( response.data.seasons, function( season ) {
                                seasons.push( season );
                            } );
                            return seasons;
                        } );
                    };

                    var getTVShowSeason = function( tvShowID, seasonIndex ) {
                        var req = {
                            method: 'GET',
                            url: apiBaseUrl + "/tv/" + tvShowID + "/season/" + seasonIndex,
                            params: {
                                api_key: apiKey
                            }
                        };

                        return $http( req );
                    };

                    var getTVEpisodeInfo = function( tvShowID, seasonIndex, episodeNumber ) {
                        var req = {
                            method: 'GET',
                            url: apiBaseUrl + "/tv/" + tvShowID + "/season/" + seasonIndex + "/episode/" + episodeNumber,
                            params: {
                                api_key: apiKey,
                                append_to_response: 'videos,images'
                            }
                        };

                        return $http( req );
                    };


                    return {
                        tv: {
                            tv_show_info: getTv,
                            tv_seasons_list: getTVShowSeasons,
                            tv_season_info: getTVShowSeason,
                            tv_episode_info: getTVEpisodeInfo
                        }
                    };
                });
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

        TMDBAPIService.$inject = [ '$rootScope', '$http', '$timeout', '$resource', 'localStorageService', '$location' ];

        return TMDBAPIService;
}
);