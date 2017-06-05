/*global angular*/
'use strict';

angular.module('composer').factory('player', [ 'click',
function(click) {
  /**
  * Audio Track
  */
  var AudioTrack = function(trackName) {
    this.name = trackName;
    var url = '/modules/composer/audio/clavelito/' + trackName + '.mp3';
    this.$el = new Audio(url);
  };

  AudioTrack.prototype.toggleMute = function() {
    this.$el.muted = !this.$el.muted;
  };

  AudioTrack.prototype.play = function() {
    this.updateTime();
    this.$el.play();
  };

  AudioTrack.prototype.stop = function() {
    this.$el.pause();
  };

  AudioTrack.prototype.togglePlay = function() {
    if (this.$el.paused) {
      this.play();
    } else {
      this.stop();
    }
  };

  AudioTrack.prototype.updateTime = function() {
    this.$el.currentTime = click.currentTime();
  };

  /**
  * Audio Player
  */
  var AudioPlayer = function(){
    this.tracks = [];
    this.playing = false;
  };

  AudioPlayer.prototype.currentTime = function() {
    return click.currentTime();
  };

  AudioPlayer.prototype.duration = function() {
    return this.tracks[0].$el.duration;
  };

  AudioPlayer.prototype.updateTracks = function() {
    angular.forEach(this.tracks, function(track) { track.updateTime(); });
  };

  AudioPlayer.prototype.toggleMute = function(track) {
    this.tracks[track].toggleMute();
  };

  AudioPlayer.prototype.stop = function() {
    if (this.playing) {
      this.playing = false;
      click.toggle();
      angular.forEach(this.tracks, function(track) { track.stop(); });
    }
  };

  AudioPlayer.prototype.toggle = function() {
    this.playing = !this.playing;
    click.toggle();
    angular.forEach(this.tracks, function(track) { track.togglePlay(); });
  };

  AudioPlayer.prototype.play = function() {
    this.playing = true;
    click.start();
    angular.forEach(this.tracks, function(track) { track.$el.play(); });
  };

  AudioPlayer.prototype.overTime = function() {
    return this.currentTime() >= this.duration();
  };

  AudioPlayer.prototype.progress = function() {
    return Math.round(this.currentTime() / this.duration() * 1000) / 10;
  };

  AudioPlayer.prototype.createTrack = function(name) {
    var track = new AudioTrack(name);
    this.tracks.push(track);
    return track;
  };

  // Public API
  return new AudioPlayer();
}
]);
