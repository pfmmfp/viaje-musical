'use strict';

// Configuring the Regions module
angular.module('regions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
			Menus.addMenuItem('topbar', 'Regions', 'regions', 'dropdown', '/admin/regions(/create)?', 'false');
			Menus.addSubMenuItem('topbar', 'regions', 'List Regions', 'admin/regions', '/admin/regions','false');
			Menus.addSubMenuItem('topbar', 'regions', 'New Region', 'admin/regions/create', 'admin/regions/create','false');		
	}
	
	
]).constant('CONFIG',{
    'PUBLIC_IMAGE_PATH': 'common/images/region/'
  });
