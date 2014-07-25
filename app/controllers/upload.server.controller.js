'use strict';

var fs = require('fs');

var PUBLIC_TMP_PATH   = 'public/tmp/';
var PUBLIC_IMAGE_PATH = 'public/common/images/';
var PUBLIC_AUDIO_PATH = 'public/common/audio/';

exports.uploadfile = function(req, res){
	console.log('uploading files', req.files);
	res.send(200, req.files);
};

exports.saveModelFiles = function(model, res, next)
{		

	fs.exists('public/common', function (exists) {
		if(!exists)
		{
			fs.mkdir('public/common', function(){
				
			}); 
		}
	});

	fs.exists('public/common/audio', function (exists) {
		if(!exists)
		{
			fs.mkdir('public/common/audio', function(){
				
			}); 
		}
	});

	fs.exists('public/common/images', function (exists) {
		if(!exists)
		{
			fs.mkdir('public/common/images', function(){
				
			}); 
		}
	});

	fs.exists('public/common/images/'+folderName, function (exists) {
		if(!exists)
		{
			fs.mkdir('public/common/images/'+folderName, function(){
				
			}); 
		}
	});

	fs.exists('public/common/audio/'+folderName, function (exists) {
		if(!exists)
		{
			fs.mkdir('public/common/audio/'+folderName, function(){
				
			}); 
		}
	});
		
	var audioFullPath;
	var picFullPath;
	
	//////////////// MULTIPLE AUDIO UPLOAD ////////////////			
	if(typeof(model.audio) !== 'undefined')
	{
		audioFullPath = PUBLIC_AUDIO_PATH + model.type + '/' + model._id;
		
		fs.exists(audioFullPath, function (exists) {
			if(!exists)
			{
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
	
	//////////////// MULTIPLE IMAGE UPLOAD ////////////////					
	if(typeof(model.pics) !== 'undefined')
	{
		picFullPath = PUBLIC_IMAGE_PATH + model.type + '/' + model._id;
		
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
	
	//////////////// SINGLE IMAGE UPLOAD ////////////////					
	if(typeof(model.pic) !== 'undefined')
	{
		picFullPath = PUBLIC_IMAGE_PATH + model.type + '/' + model._id;
		
		fs.exists(picFullPath, function (exists) {
			if(!exists)
			{
				fs.mkdir(picFullPath, function(){ 
					var pic = model.pic;
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
			else
			{
				var pic = model.pic;
				var tmpPath = PUBLIC_TMP_PATH + pic;
				var imgFile = picFullPath + '/' + pic;

				fs.exists(tmpPath, function (exists) {
					if(exists)
					{
						console.log('moving ', tmpPath, ' to ', imgFile);
						fs.rename( tmpPath, imgFile ,function (err) {
						  if (err) throw err;
							console.log('moving ', tmpPath, ' to ', imgFile);
						});												
					}});	
			}
			next(res, model);	  
		});
	}
	
};

