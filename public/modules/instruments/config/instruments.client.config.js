'use strict';

// Configuring the Instruments module
angular.module('instruments').run(['Menus',
	function(Menus) {
		// Set top bar menu items
			Menus.addMenuItem('topbar', 'Instruments', 'instruments', 'dropdown', '/admin/instruments(/create)?', 'false');
			Menus.addSubMenuItem('topbar', 'instruments', 'List Instruments', 'admin/instruments', '/admin/instruments','false');
			Menus.addSubMenuItem('topbar', 'instruments', 'New Instrument', 'admin/instruments/create', 'admin/instruments/create','false');		
	}
]);
