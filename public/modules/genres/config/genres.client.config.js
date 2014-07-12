'use strict';

// Configuring the Genres module
angular.module('genres').run(['Menus',
	function(Menus) {
		// Set top bar menu items
			Menus.addMenuItem('topbar', 'Genres', 'genres', 'dropdown', '/admin/genres(/create)?', 'false');
			Menus.addSubMenuItem('topbar', 'genres', 'List Genres', 'admin/genres', '/admin/genres','false');
			Menus.addSubMenuItem('topbar', 'genres', 'New Genre', 'admin/genres/create', 'admin/genres/create','false');		
	}
]).constant('genresConfig',{
    'PUBLIC_IMAGE_PATH': 'common/images/genre/',
	'PUBLIC_AUDIO_PATH' : 'common/audio/genre/',
});
