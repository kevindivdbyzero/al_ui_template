
define( [ 'angular', 
          'ngRoute',
          'ngResource',
          'config/config'], 
    function ( angular ) {
        "use strict";

        var AppStateService = function ( $rootScope ) {
            
            
            var historyArray = [];
            var self = this;
                      
            $rootScope.$on('selected_item', function(event, item){
                if(historyArray.length <= 10){
                    historyArray.push(item);
                    console.log("New item added to history ");
                }else{
                    historyArray.splice(historyArray.length - 1, 1);
                    console.log("List full, deleting oldest item from history");
                    historyArray.push(item);
                }
            });
            
            self.getHistory = function(){
              return historyArray;  
            };
            
            
        };
        AppStateService.$inject = ['$rootScope'];
        return AppStateService;
        
    }
    );

