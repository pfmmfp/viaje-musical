'use strict';

(function() {
	// Regions Controller Spec
	describe('RegionsController', function() {
		// Initialize global variables
		var RegionsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Regions controller.
			RegionsController = $controller('RegionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one region object fetched from XHR', inject(function(Regions) {
			// Create sample region using the Regions service
			var sampleRegion = new Regions({
				title: 'An Region about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample regions array that includes the new region
			var sampleRegions = [sampleRegion];

			// Set GET response
			$httpBackend.expectGET('regions').respond(sampleRegions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.regions).toEqualData(sampleRegions);
		}));

		it('$scope.findOne() should create an array with one region object fetched from XHR using a regionId URL parameter', inject(function(Regions) {
			// Define a sample region object
			var sampleRegion = new Regions({
				title: 'An Region about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.regionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/regions\/([0-9a-fA-F]{24})$/).respond(sampleRegion);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.region).toEqualData(sampleRegion);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Regions) {
			// Create a sample region object
			var sampleRegionPostData = new Regions({
				title: 'An Region about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample region response
			var sampleRegionResponse = new Regions({
				_id: '525cf20451979dea2c000001',
				title: 'An Region about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Region about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('regions', sampleRegionPostData).respond(sampleRegionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the region was created
			expect($location.path()).toBe('/regions/' + sampleRegionResponse._id);
		}));

		it('$scope.update() should update a valid region', inject(function(Regions) {
			// Define a sample region put data
			var sampleRegionPutData = new Regions({
				_id: '525cf20451979dea2c000001',
				title: 'An Region about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock region in scope
			scope.region = sampleRegionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/regions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/regions/' + sampleRegionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid regionId and remove the region from the scope', inject(function(Regions) {
			// Create new region object
			var sampleRegion = new Regions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new regions array and include the region
			scope.regions = [sampleRegion];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/regions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleRegion);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.regions.length).toBe(0);
		}));
	});
}());
