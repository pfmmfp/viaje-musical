'use strict';

var PUBLIC_TMP_PATH    = 'tmp/';
var UPLOAD_ROUTE	   = '/upload';

angular.module('core').factory('fileupload', [ '$upload', 
	function(upload)
	{ 
		var factory = {

			upload: function(file){
				return upload.upload({ url: UPLOAD_ROUTE, method: 'POST', file: file });
			},
			
			progress: function(upl, scope){ 
				upl.progress(function(evt){
					scope.set( parseInt(100.0 * evt.loaded / evt.total) );				
				});
			},
			
			success: function(upl, scope){
				return upl.success(function(data, status, headers, config){
					var fileFullData = {'path': PUBLIC_TMP_PATH, 'name': data.file.name};
					scope.push( fileFullData );
				});
			},
		};
		return factory;
	}
]);

