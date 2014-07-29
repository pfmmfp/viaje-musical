'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.aterrizar = true;
	}
]);

angular.module('core').animation('.aterrizar', ['$location', '$window', function ($location, $window) {
    return {
        removeClass: function (element, className, done) {
            if (className === 'volar') {
                console.log(element);
                element
                    .css({
					"width"  : "381px", 
					"height" : "683px",
					"top" 	 : "-30px",
					"left"	 : "-30px",										
                })
                    .animate({
                    "left"    : "65%",
					"height"  : "140px",
					"width"   : "78px",
					"top" 	  : "18%",
                }, 1000, function(){  $window.location.href = '#!/regions/53d3dbe1abdf107b141803db';  } ); //Hardcoded shit!
            } else {
                done();
            }
        },
        addClass: function (element, className, done) {
            if (className === 'volar') {
                element
                    .css({
                    "left"    : "65%",
					"height"  : "140px",
					"width"   : "78px",
					"top" 	  : "18%",
                })
                    .animate({
					"width"  : "381px", 
					"height" : "683px",
					"top" 	 : "-30px",
					"left"	 : "-30px",										
                }, 500, function(){  console.log("empezo"); } );
            } else {
                done();
            }
        }
    };
}]);
