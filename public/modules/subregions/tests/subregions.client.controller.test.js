'use strict';

(function() {
	// Subregions Controller Spec
	describe('SubregionsController', function() {
		// Initialize global variables
		var SubregionsController,
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

			// Initialize the Subregions controller.
			SubregionsController = $controller('SubregionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one subregion object fetched from XHR', inject(function(Subregions) {
			// Create sample subregion using the Subregions service
			var sampleSubregion = new Subregions({
				title: 'An Subregion about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample subregions array that includes the new subregion
			var sampleSubregions = [sampleSubregion];

			// Set GET response
			$httpBackend.expectGET('subregions').respond(sampleSubregions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.subregions).toEqualData(sampleSubregions);
		}));

		it('$scope.findOne() should create an array with one subregion object fetched from XHR using a subregionId URL parameter', inject(function(Subregions) {
			// Define a sample subregion object
			var sampleSubregion = new Subregions({
				title: 'An Subregion about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.subregionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/subregions\/([0-9a-fA-F]{24})$/).respond(sampleSubregion);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.subregion).toEqualData(sampleSubregion);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Subregions) {
			// Create a sample subregion object
			var sampleSubregionPostData = new Subregions({
				title: 'An Subregion about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample subregion response
			var sampleSubregionResponse = new Subregions({
				_id: '525cf20451979dea2c000001',
				title: 'An Subregion about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Subregion about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('subregions', sampleSubregionPostData).respond(sampleSubregionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the subregion was created
			expect($location.path()).toBe('/subregions/' + sampleSubregionResponse._id);
		}));

		it('$scope.update() should update a valid subregion', inject(function(Subregions) {
			// Define a sample subregion put data
			var sampleSubregionPutData = new Subregions({
				_id: '525cf20451979dea2c000001',
				title: 'An Subregion about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock subregion in scope
			scope.subregion = sampleSubregionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/subregions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/subregions/' + sampleSubregionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid subregionId and remove the subregion from the scope', inject(function(Subregions) {
			// Create new subregion object
			var sampleSubregion = new Subregions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new subregions array and include the subregion
			scope.subregions = [sampleSubregion];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/subregions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSubregion);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.subregions.length).toBe(0);
		}));
	});
}());
