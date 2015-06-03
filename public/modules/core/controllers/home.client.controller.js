'use strict';

angular.module('core').controller('HomeController', ['$scope', '$rootScope', 'Authentication', 'ImagePreloadFactory', 'composer', 'fxAudioFactory', '_', 
	function($scope, $rootScope, Authentication, ImagePreloadFactory, composer, fxAudioFactory, _)
    {
        // This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.aterrizar = true;

        var _init = function()
        {
            if(!$rootScope.music)
            {
                var samples = [{ key: 'fxMapa', path: 'common/audio/home/fx_mapa.mp3'}];
                fxAudioFactory.loadSamples(samples, function(err, samplesBuffer)
                {
                    if(err)
                        console.log("error loading samples");

                    $rootScope.music = fxAudioFactory;
                    
                    $.getJSON("/dist/imageList.json", function(data)
                    {
                        
                        var preloader = ImagePreloadFactory.createInstance();

                        _.each(data.images, function(image){
                            preloader.addImage(image);
                        });        

                        preloader.start( 
                            function()
                            {
                                console.log("Preloading complete"); 
                                angular.element('.home').removeClass('loading').addClass('loaded');
                                angular.element('.loading-screen').css('display', 'none');                         
                                $rootScope.music.play('fxMapa', {loop: true, loopStart: 0, loopEnd: 1000});
                                $rootScope.loadedFlag = true;
                            },
                            function(progress) { /*console.log(progress);*/ }
                        );                             
                    });           
                });
            }
            else
            {
                $rootScope.music.stopAll();
                angular.element('.home').removeClass('loading').addClass('loaded');
                angular.element('.loading-screen').css('display', 'none');                         
                $rootScope.music.play('fxMapa', {loop: true, loopStart: 0, loopEnd: 1000});
            }
        };

        _init();            
	}
]);

angular.module('core').animation('.aterrizar', ['$location', '$window', function ($location, $window) {
    return {
        removeClass: function (element, className, done) {
            if (className === 'volar') {
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
                }, 1000, function(){  $window.location.href = '#!/regions/NOA';  } );
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
