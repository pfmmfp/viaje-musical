'use strict';

// Configuring the Subregions module
angular.module('subregions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
			Menus.addMenuItem('topbar', 'Subregions', 'subregions', 'dropdown', '/admin/subregions(/create)?', 'false');
			Menus.addSubMenuItem('topbar', 'subregions', 'List Subregions', 'admin/subregions', '/admin/subregions','false');
			Menus.addSubMenuItem('topbar', 'subregions', 'New Subregion', 'admin/subregions/create', 'admin/subregions/create','false');		
	}
]).constant('subregionsConfig',{
    'PUBLIC_IMAGE_PATH': 'common/images/subregion/',
	'PUBLIC_AUDIO_PATH' : 'common/audio/subregion/',
});
