/**
 * Get the configuration from TMDBAPI
 *
 * @module tmdb.services.TMDBConfigurationService
 *
 * @requires angular
 * @requires LocalStorageModule
 * @requires config/config
 *
 * @author Andres Artunduaga < @alertlogic.com>
 *
 * @returns Configuration Service
 *
 */
define( ['angular',        
        'LocalStorageModule',
        'config/config',],
    function ( angular ) {
        "use strict";

        var TMDBConfigurationService = function ($http, localStorage) {

            var config = angular.module("config");
            var serviceVersion = 3;
            var apiBaseUrl = config.apiUrl + serviceVersion;
            var apiKey = config.apiKey;
            
            
            var configuration = null;
            var configUpdated = false;
            
            
            

            this.getConfiguration = function(){
                
                if(!configUpdated){
                    
                    // Retrieving data from API

                    var req = {
                        method: "GET",
                        url: apiBaseUrl + "/configuration",
                        params:{
                            api_key: apiKey
                        }
                    };

                    $http(req).then(

                        function(configResponse){
                            console.log("Got response", configResponse);
                            console.log("Getting and storing configuration data from tmdb api.....");
                            localStorage.set("tmdb-configuration", configResponse.data);
                            console.log("Done!");
                            configUpdated = true;                            
                            configuration = localStorage.get("tmdb-api-configuration");
                            return configuration;

                        },function(reason){
                            console.log("Fail when trying to get configuration data from API: ", reason);                            
                        }
                    );
                    
                }else{                    
                    configuration = localStorage.get("tmdb-api-configuration");                    
                    return configuration;                    
                }                
                
            };
            
            

        };

        TMDBConfigurationService.$inject = ['$http','localStorageService'];

        return TMDBConfigurationService;
    }
);