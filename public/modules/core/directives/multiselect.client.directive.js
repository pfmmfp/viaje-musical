'use strict';

angular.module('core').directive('multiselect', [ function() {
    return function(scope, element, attrs) {        

		var multiselectElements = [];
		var multiselectSelectedElements = [];
		
        var selectedItems = attrs.ngSelection;
        var ItemsList	  = attrs.ngData;

        element.multiselect({ enableFiltering: true });
		
		scope.$watch( function(){ 
			return scope[ItemsList].length > 0 ?  true : false; 
			}, function(val) {
			if(val){
				scope[ItemsList].forEach(function( resource, index ) {
					var item = {'label': resource.name, 'value': resource._id};
					multiselectElements.push(item);
				});
				element.multiselect('dataprovider', multiselectElements);
			}	
		});
		
		scope.$watch( function(){ 
			return scope[selectedItems].length > 0 ?  true : false; 
			}, function(val) {
			if(val){
				scope[selectedItems].forEach(function( resource, index ) {
					element.multiselect('select', resource._id);
				});
			}	
		});
    };
}]);
