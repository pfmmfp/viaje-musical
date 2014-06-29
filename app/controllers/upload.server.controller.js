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
	if(model.audio !== 'undefined')
	{
		var fullPath = PUBLIC_AUDIO_PATH + '/' + model.type + '/' + model._id;
		
		fs.exists(fullPath, function (exists) {
			if(!exists)
			{
				fs.mkdir(fullPath, function(){ 
					model.audio.forEach(function (audio, index) {						
						var tmpPath = PUBLIC_TMP_PATH + audio;
						var audioPath = fullPath + '/' + audio;

						fs.exists(tmpPath, function (exists) {
							if(exists)
							{
								fs.rename( tmpPath, audioPath ,function (err) {
								  if (err) throw err;
								  console.log('moving ', tmpPath, ' to ', audioPath);
								});												
							}});	
					});
				});	
			}
			else
			{
				model.audio.forEach(function (audio, index) {						
					var tmpPath = PUBLIC_TMP_PATH + audio;
					var audioPath = fullPath + '/' + audio;

					fs.exists(tmpPath, function (exists) {
						if(exists)
						{
							fs.rename( tmpPath, audioPath ,function (err) {
							  if (err) throw err;
								console.log('moving ', tmpPath, ' to ', audioPath);
							});												
						}});	
				});
			}
			next(res, model);	  
		});
	}
	
	//////////////// IMAGE UPLOAD ////////////////				
	if(model.pics !== 'undefined')
	{
		var fullPath = PUBLIC_IMAGE_PATH + '/' + model.type + '/' + model._id;
		
		fs.exists(fullPath, function (exists) {
			if(!exists)
			{
				fs.mkdir(fullPath, function(){ 
					model.pics.forEach(function (pic, index) {						
						var tmpPath = PUBLIC_TMP_PATH + pic;
						var imgPath = fullPath + '/' + pic;

						fs.exists(tmpPath, function (exists) {
							if(exists)
							{
								fs.rename( tmpPath, imgPath ,function (err) {
								  if (err) throw err;
								  console.log('moving ', tmpPath, ' to ', imgPath);
								});												
							}});	
					});
				});	
			}
			else
			{
				model.pics.forEach(function (pic, index) {						
					var tmpPath = PUBLIC_TMP_PATH + pic;
					var imgPath = fullPath + '/' + pic;

					fs.exists(tmpPath, function (exists) {
						if(exists)
						{
							fs.rename( tmpPath, imgPath ,function (err) {
							  if (err) throw err;
								console.log('moving ', tmpPath, ' to ', imgPath);
							});												
						}});	
				});
			}
			next(res, model);	  
		});
	}
	
};
