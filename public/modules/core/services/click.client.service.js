/*global angular*/
'use strict';

angular.module('composer').factory('click', [
  function() {

    var Click = function() {
      this.time = 0;
      this.skipTime = 1000;
      this.offset = null;
      this.clickRef = null;
      this.timePaused = null;
    };

    Click.prototype.isTicking = function() {
      return this.clickRef !== null;
    };

    Click.prototype.toggle = function() {
      if (this.clickRef) {
        clearInterval(this.clickRef);
        this.clickRef = null;
        this.timePaused = this.milis();
      }
      else {
        this.offset += (this.milis() - this.timePaused);
        this.startTick();
      }
    };

    Click.prototype.restart = function() {
      if (this.isTicking()) {
        this.offset = this.milis();
        this.tick(); // Force tick since tracks might want to update before the scheduled tick
      } else {
        this.time = 0;
        this.timePaused = 0;
        this.offset = null;
        // $("body").trigger("update-progress"); FIXME EVENT
      }
    };

    Click.prototype.start = function() {
      this.offset = this.milis();
      this.startTick();
    };

    Click.prototype.startTick = function() {
      this.clickRef = setInterval(this.tick.bind(this), 1);
    };

    Click.prototype.tick =  function() {
      this.time = this.milis() - this.offset;
      // $("body").trigger("update-progress"); FIXME EVENT
    };

    Click.prototype.currentTime = function() {
      return this.time / 1000;
    };

    Click.prototype.milis = function() {
      return (new Date()).getTime();
    };

    return new Click();
  }
]);
