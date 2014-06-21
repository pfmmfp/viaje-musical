'use strict';

exports.uploadfile = function(req, res){
	console.log('fileupload');
	res.send(200, req.files);
};
