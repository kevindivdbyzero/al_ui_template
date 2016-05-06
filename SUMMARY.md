# Recap

## Encapsulating angular components inside of requireJS AMDs

An AMD is just a container that declares its own requirements.  The `define` method declares the module using two parameters.

```
define( requirements, definition );
```

The first parameter `requirements` is an array of other modules this module needs to work, and the second parameter is a function that accepts those required modules after they've been initialized, instantiates the module, and returns it.

```
define( [ 'angular',				/* I need angular */
          'LocalStorageModule',  	/* I also want to use local storage */
          'SomeModule',				/* I want another module */
          'lib/SomeOtherModule' ],	/* And another one */
          function( angular, LocalStorageModule, SomeModule, SomeOtherModule ) {
          
          	var angularModule = /* do work here */;
			return angularModule;
				
          } );
```

To create the angular component inside the AMD, you simply declare the constructor for that component as a function:

```
var MyAngularModule = function( $rootScope, $http, $timeout, localStorageService ) {
	/* define the angular component here */
};
```

Then we tell angular which other angular components this component needs to use using the explicit direct injection property, `$inject`:

```
MyAngularModule.$inject = [ '$rootScope', '$http', '$timeout', 'localStorageService' ];
```

These angular components will be directly injected into your component's constructor.  _IMPORTANT_: you must make sure that the list of components in `$inject` match the parameters of your component constructor exactly!

### Putting It Together

An empty component declaration is just a RequireJS define block that contains an AngularJS module declaration and returns it, and looks just like this:

```
define( [ 'angular',				/* I need angular */
          'LocalStorageModule',  	/* I also want to use local storage */
          'SomeModule',				/* I want another module */
          'lib/SomeOtherModule' ],	/* And another one */
          function( angular, LocalStorageModule, SomeModule, SomeOtherModule ) {
          
          	var MyComponent = function( $rootScope, $http, $location, $timeout ) {
          	    
          	    /* here is where the good stuff goes */
          	};
          	
          	MyComponent.$inject = [ '$rootScope', '$http', '$location', '$timeout' ];
          	
			return MyComponent;
				
          } );
```

This pattern works for angular services, controllers, filters, and directives.

## Services are Simple

Services (also [providers and factories](http://stackoverflow.com/questions/15666048/angularjs-service-vs-provider-vs-factory)) are singletons that maintain their state across the entire lifespan of the application.

Our most common use for services is to act as an API client.  Services could also be used to provide utility functions, manage application state across controllers, or many many many other things.

When using an angular service as an API client, the logic can be extremely straightforward, like this:

```
var MyService = function( $http ) {

	this.getSomeData = function( whichData ) {
		return $http.get( "https://api.wherever.com/data/" + whichData );
	};
	
	this.postSomeData = function( whichData, dataValue ) {
		return $http.post( "https://api.wherever.com/data/" + whichData, dataValue );
	};
};

MyService.$inject = ['$http'];
```

_Interesting Topic_: many people prefer to use Angular's ngResource module (`$resource`) to interact with APIs.  You can find out more about ngResource [here](https://docs.angularjs.org/api/ngResource/service/$resource).

### More Sophisticated API clients

Most API interaction is more complicated than the example above.  It is often desirable to use `$http` directly (documentation [here](https://docs.angularjs.org/api/ng/service/$http)).

```
var MyBetterService = function( $http ) {
	var config = angular.module("config");
	
	/* Get a TV show by its ID.  Resolves with the raw $http response. */
	this.getTVShow = function( tvID ) {
		return $http( {
			method: "GET",
			url: config.apiUrl + "/tv/" + tvID,
			params: {
				api_key: config.apiKey	
			}
		} );
	};
	
	/* Get details about a specific season of a TV show by its tv ID and the season ID.  Resolves with the raw $http response. */
	this.getTVShowSeason = function( tvShowID, tvShowSeasonID ) {
		return $http( {
			method: "GET",
			url: config.apiUrl + "/tv/" + tvShowID + "/season/" + tvShowSeasonID,
			params: {
				api_key: config.apiKey,
				language: "es"
			}
		} );
	};	
};

MyService.$inject = ['$http'];
```

### Transforming API Response Data using promise chaining

Sometimes you will want to extract specific data from an API call, or preprocess that data in some way.  You could always do this sort of work in a controller, but this tends to produce code that is tangled and difficult to maintain.  In general it is best to process the data the comes back from an API endpoint *before* you return it to the caller.

For example, imagine that you want to retrieve only the list of seasons from TMDBAPI's [tv endpoint](http://docs.themoviedb.apiary.io/#reference/tv/tvid/get). 

```
	this.getTVShowSeasonList = function( tvID ) {
		var requestPromise = $http( {
			method: "GET",
			url: config.apiUrl + "/tv/" + tvID,
			params: {
				api_key: config.apiKey	
			}
		} );
		
		return requestPromise.then( function( response ) {
				//	Our television show information is in response.data
				
                    var seasons = [];
                    angular.forEach( response.data.seasons, function( season ) {
                        seasons.push( season );
                    } );
                    return seasons;
			} );
	};
```