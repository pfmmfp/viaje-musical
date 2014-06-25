'use strict';

var fs = require("fs");

exports.uploadfile = function(req, res){
	console.log('uploading files', req.files);
	res.send(200, req.files);
};

exports.saveModelFiles = function(model, res, next)
{

	var PUBLIC_IMAGE_PATH = 'public/common/images/regions/';
	var PUBLIC_TMP_PATH    = 'public/tmp/';

	fs.exists(PUBLIC_IMAGE_PATH + model._id, function (exists) {
		if(!exists)
		{
			fs.mkdir(PUBLIC_IMAGE_PATH + model._id, function(){ 
				model.pics.forEach(function (pic, index) {						
					var tmpPath = PUBLIC_TMP_PATH + pic;
					var imgPath = PUBLIC_IMAGE_PATH + model._id + "/" + pic;

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
				var imgPath = PUBLIC_IMAGE_PATH + model._id + "/" + pic;

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

};
