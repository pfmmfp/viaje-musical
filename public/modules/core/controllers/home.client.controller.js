/*global angular, ScaleRaphael, Raphael*/
'use strict';

angular.module('core').controller('HomeController', ['$scope', '$rootScope', '$location', 'openModal', 'ImagePreloadFactory', 'fxAudioFactory', '_', 'Regions',
function($scope, $rootScope, $location, openModal, ImagePreloadFactory, fxAudioFactory, _, Regions)
{
  // This provides Authentication context.
  $scope.aterrizar = true;
  $scope.done = false;

  $scope.toggleMusic = function() {
    if($rootScope.music) {
        $rootScope.music.muting = !$rootScope.music.muting;
        if($rootScope.music.muting) {
            $rootScope.music.stop('fxMapa');
            $rootScope.music.stop('music');

        } else {
            $rootScope.music.play('fxMapa', {loop: true, loopStart: 0, loopEnd: 1000});
            $rootScope.music.play('music',  {loop: true, loopStart: 0, loopEnd: 1000});

        }
    }
  };

  if(!$rootScope.music)
  {
    var samples = [
      { key: 'fxMapa', path: 'common/audio/home/fx_mapa.ogg'},
      { key: 'music', path: 'common/audio/home/ambient.ogg'}
    ];
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
            if (!$rootScope.music.muting) {

                $rootScope.music.play('fxMapa', {loop: true, loopStart: 0, loopEnd: 1000});
                $rootScope.music.play('music',  {loop: true, loopStart: 0, loopEnd: 1000});
            } else {
                $rootScope.music.stop('fxMapa');
                $rootScope.music.stop('music');

            }
            $rootScope.loadedFlag = true;
            initMap();
            done();
          },
          function(progress) { /*console.log(progress);*/ }
        );
      });
    });
  }
  else
  {
    if (!$rootScope.music.muting) {
        $rootScope.music.play('fxMapa', {loop: true, loopStart: 0, loopEnd: 1000});
        $rootScope.music.play('music', {loop: true, loopStart: 0, loopEnd: 1000});
    } else {
        $rootScope.music.stop('fxMapa');
        $rootScope.music.stop('music');

    }
    initMap();
    done();
  }

  function done(){
    $scope.done = true;
  }

  function initMap(){
    var MAP_WIDTH  = 601;
    var MAP_HEIGHT = 440;

    if(!window.ScaleRaphael) initRaphael();
    var map = new ScaleRaphael("map", MAP_WIDTH, MAP_HEIGHT);
    var group = map.set();

    var style = {
      "fill": "#ddd",
      "fill-opacity": 0,
      "stroke": "#aaa",
      "stroke-width": 0,
      "stroke-linejoin": "round",
      cursor: "pointer"
    };

    map.changeSize($(window).width(), $(window).height(), false, true);
    function resizeMap()
    {
      /* jshint ignore:start */
      var win = $(this);
      map.changeSize(win.width(), win.height(), false, true);
      /* jshint ignore:end */
    }

    $(window).resize(resizeMap);

    Regions.forEach(function(region){
      group.push(
        map.path(region.path).attr('title', region.code)
      );
    });

    group.attr(style);
    group.click(function(event){
      var slug = this.attr('title');
      var region = Regions.byCode(slug);
      var left = (event.pageX - (78/2)) + "px";
      var top  = (event.pageY - 120)  + "px";

      $(".bienvenido_home").hide();

      $('#globo').animate({
        "left"    : left,
        "height"  : "140px",
        "width"   : "78px",
        "top"     : top
      }, 500, function(){
        if(region.available)
          window.location.href = '#!/regions/'+ slug;
        else
          openModal(function(){}, {}, modalCtrl);//  alert("Ups! esta regi&oacute;n no esa disponible prob&aacute; con el NOA!");
      });
    });
  }

  /*
  * ScaleRaphael 0.8 by Zevan Rosser 2010
  * For use with Raphael library : www.raphaeljs.com
  * Licensed under the MIT license.
  *
  * www.shapevent.com/scaleraphael/
  */
  function initRaphael(){
    window.ScaleRaphael = function(container, width, height){
      var wrapper = document.getElementById(container);
      if (!wrapper.style.position) wrapper.style.position = "absolute";
      wrapper.style.width = width + "px";
      wrapper.style.height = height + "px";
      wrapper.style.overflow = "hidden";

      var nestedWrapper;

      if (Raphael.type === "VML"){
        wrapper.innerHTML = "<rvml:group style='position : absolute; width: 1000px; height: 1000px; top: 0px; left: 0px' coordsize='1000,1000' class='rvml' id='vmlgroup'><\/rvml:group>";
        nestedWrapper = document.getElementById("vmlgroup");
      }else{
        wrapper.innerHTML = "<div id='svggroup'><\/div>";
        nestedWrapper = document.getElementById("svggroup");
      }

      var paper = new Raphael(nestedWrapper, width, height);
      var vmlDiv;

      if (Raphael.type === "SVG"){
        paper.canvas.setAttribute("viewBox", "0 0 "+width+" "+height);
      }else{
        vmlDiv = wrapper.getElementsByTagName("div")[0];
      }

      paper.changeSize = function(w, h, center, clipping){
        clipping = !clipping;

        var ratioW = w / width;
        var ratioH = h / height;
        var scale = ratioW < ratioH ? ratioW : ratioH;

        var newHeight = parseInt(height * scale);
        var newWidth = parseInt(width * scale);

        if (Raphael.type === "VML"){
          // scale the textpaths
          var txt = document.getElementsByTagName("textpath");
          for (var i in txt){
            var curr = txt[i];
            if (curr.style){
              if(!curr._fontSize){
                var mod = curr.style.font.split("px");
                curr._fontSize = parseInt(mod[0]);
                curr._font = mod[1];
              }
              curr.style.font = curr._fontSize * scale + "px" + curr._font;
            }
          }
          var newSize;
          if (newWidth < newHeight){
            newSize = newWidth * 1000 / width;
          }else{
            newSize = newHeight * 1000 / height;
          }
          newSize = parseInt(newSize);
          nestedWrapper.style.width = newSize + "px";
          nestedWrapper.style.height = newSize + "px";
          if (clipping){
            nestedWrapper.style.right = parseInt((w - newWidth) / 2) + "px";
            nestedWrapper.style.top = parseInt((h - newHeight) / 2) + "px";
          }
          else
          {
            nestedWrapper.style.right = "0px";
            nestedWrapper.style.top = "0px";
          }

          vmlDiv.style.overflow = "visible";
        }

        if (clipping){
          newWidth = w;
          newHeight = h;
        }

        wrapper.style.width = newWidth + "px";
        wrapper.style.height = newHeight + "px";
        paper.setSize(newWidth, newHeight);

        if (center){
          wrapper.style.position = "absolute";
          wrapper.style.right = parseInt((w - newWidth) / 2) + "px";
          wrapper.style.top = parseInt((h - newHeight) / 2) + "px";
        }
        else
        {
          wrapper.style.right = "0"; //"-10%";
          wrapper.style.top = "0px";
        }

      };

      paper.scaleAll = function(amount){
        paper.changeSize(width * amount, height * amount);
      };

      paper.changeSize(width, height);

      paper.w = width;
      paper.h = height;

      return paper;
    };
  }

  //////////////// Modal ////////////////
  var modalCtrl = function ($scope, $modalInstance, items)
  {
    $scope.close = function()
    {
      $modalInstance.close();
    };
  };

  $scope.openModal = function(marker){
    openModal(function(){}, {}, modalCtrl);
  };
}
]);
