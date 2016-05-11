## Event Passing

Angular's event model allows different, loosely connected $scopes to communicate with each other without knowing the details of the $scopes they are communicating with.

### Listening for Events

To receive an event, simply register the listener on the $scope you wish to receive the events for using the $on method.  For instance, inside of a given controller:

```
self.handleCustomEvent = function( $event, eventParameter ) {
	console.log("Received a custom.event message with parameters " + eventParameter );
	$scope.lastCustomEventParameter = eventParameter;
} );

$scope.$on( 'custom.event', self.handleCustomEvent );
```

Event listeners are typically used within the context of a controller.  When this is true, they have the same lifespan as the controller, and are removed when the $scope they are attached to is destroyed.  However, it is also possible to listen for events from elsewhere by attaching the event handler to $rootScope.  This allows for event passing between services as well as controllers, and makes it easy for unrelated services to effect each others' state information.

```
$rootScope.$on( 'custom.event', function( $event, data ) {
	console.log("Received a custom.event on $rootScope!", data );
} );
```

_IMPORTANT NOTE_: event handlers attached to $rootScope.

### Raising Events

Reference material [here](https://docs.angularjs.org/api/ng/type/$rootScope.Scope).

There are two ways to send events from a given $scope, with very different use cases depending on the scope tree you are using.  

Imagine a scope tree with this structure (but imagine that it is sparkly and not built from ASCII characters):

```
$rootScope
|...A
.   |...B
.   |...C
.   .   |...D
.   .   |...E
.   .   .   |...X
.   .   .   |...Y
.   .   .   |...Z
.   |...F
.   .   |...G
.   .   |...H
.   |...I
|...J
|...K
```

Now consider two different situations.  In one, a child scope -- for instance, a search result -- needs to inform a parent scope that something has happened.  In this case, use the $emit method.  This passes the message UP the hierarchy, terminating at $rootScope.

Example:

```
$scope.$emit( 'custom.event', 'Test');
```

If the $scope associated with Z $emits the event, the message will be applied to the $scopes E, C, A, and $rootScope.

If the $scope associated with I $emits the event, it will be applied to the $scopes J and $rootScope.

In the other situation, a parent $scope needs to broadcast an event to a child $scope.  In this case, use `$scope.$broadcast`.  This sends the given event downward into the $scope hierarchy.

Example:

```
$scope.$broadcast( 'custom.event', 'Test');
```

For instance, if the $scope C broadcasts the event via `$scope.$broadcast( 'custom.event', "Test" )`, the event will be applied to scopes D, E, X, Y, and Z.  

_IMPORTANT NOTE_: the higher in the scope hierarchy an event is broadcast from, the more expensive the operation is.





