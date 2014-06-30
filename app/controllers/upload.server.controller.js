'use strict';

var fs = require('fs');

var PUBLIC_TMP_PATH    = 'public/tmp/';
var PUBLIC_IMAGE_PATH = 'public/common/images/';
var PUBLIC_AUDIO_PATH = 'public/common/audio/';

exports.uploadfile = function(req, res){
	console.log('uploading files', req.files);
	res.send(200, req.files);
};

exports.saveModelFiles = function(model, res, next)
{	

	//////////////// AUDIO UPLOAD ////////////////			
	if(typeof(model.audio) !== 'undefined')
	{
		var audioFullPath = PUBLIC_AUDIO_PATH + model.type + '/' + model._id;
		
		fs.exists(audioFullPath, function (exists) {
			if(!exists)
			{
				console.log("NO existe");
				fs.mkdir(audioFullPath, function(){ 
					model.audio.forEach(function (audio, index) {						
						var tmpPath = PUBLIC_TMP_PATH + audio;
						var audioFile = audioFullPath + '/' + audio;

						fs.exists(tmpPath, function (exists) {
							if(exists)
							{
								fs.rename( tmpPath, audioFile ,function (err) {
								  if (err) throw err;
								  console.log('moving ', tmpPath, ' to ', audioFile);
								});												
							}});	
					});
				});	
			}
			else
			{
				console.log("existe");
				model.audio.forEach(function (audio, index) {						
					var tmpPath = PUBLIC_TMP_PATH + audio;
					var audioFile = audioFullPath + '/' + audio;

					fs.exists(tmpPath, function (exists) {
						if(exists)
						{
							fs.rename( tmpPath, audioFile ,function (err) {
							  if (err) throw err;
								console.log('moving ', tmpPath, ' to ', audioFile);
							});												
						}});	
				});
			}
			next(res, model);	  
		});
	}
	
	//////////////// IMAGE UPLOAD ////////////////					
	if(typeof(model.pics) !== 'undefined')
	{
		var picFullPath = PUBLIC_IMAGE_PATH + model.type + '/' + model._id;
		
		fs.exists(picFullPath, function (exists) {
			if(!exists)
			{
				fs.mkdir(picFullPath, function(){ 
					model.pics.forEach(function (pic, index) {						
						var tmpPath = PUBLIC_TMP_PATH + pic;
						var imgFile = picFullPath + '/' + pic;

						fs.exists(tmpPath, function (exists) {
							if(exists)
							{
								fs.rename( tmpPath, imgFile ,function (err) {
								  if (err) throw err;
								  console.log('moving ', tmpPath, ' to ', imgFile);
								});												
							}});	
					});
				});	
			}
			else
			{
				model.pics.forEach(function (pic, index) {						
					var tmpPath = PUBLIC_TMP_PATH + pic;
					var imgFile = picFullPath + '/' + pic;

					fs.exists(tmpPath, function (exists) {
						if(exists)
						{
							fs.rename( tmpPath, imgFile ,function (err) {
							  if (err) throw err;
								console.log('moving ', tmpPath, ' to ', imgFile);
							});												
						}});	
				});
			}
			next(res, model);	  
		});
	}
	
};
