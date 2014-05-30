'use strict';

(function() {
	// Instruments Controller Spec
	describe('InstrumentsController', function() {
		// Initialize global variables
		var InstrumentsController,
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

			// Initialize the Instruments controller.
			InstrumentsController = $controller('InstrumentsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one instrument object fetched from XHR', inject(function(Instruments) {
			// Create sample instrument using the Instruments service
			var sampleInstrument = new Instruments({
				title: 'An Instrument about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample instruments array that includes the new instrument
			var sampleInstruments = [sampleInstrument];

			// Set GET response
			$httpBackend.expectGET('instruments').respond(sampleInstruments);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.instruments).toEqualData(sampleInstruments);
		}));

		it('$scope.findOne() should create an array with one instrument object fetched from XHR using a instrumentId URL parameter', inject(function(Instruments) {
			// Define a sample instrument object
			var sampleInstrument = new Instruments({
				title: 'An Instrument about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.instrumentId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/instruments\/([0-9a-fA-F]{24})$/).respond(sampleInstrument);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.instrument).toEqualData(sampleInstrument);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Instruments) {
			// Create a sample instrument object
			var sampleInstrumentPostData = new Instruments({
				title: 'An Instrument about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample instrument response
			var sampleInstrumentResponse = new Instruments({
				_id: '525cf20451979dea2c000001',
				title: 'An Instrument about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Instrument about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('instruments', sampleInstrumentPostData).respond(sampleInstrumentResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the instrument was created
			expect($location.path()).toBe('/instruments/' + sampleInstrumentResponse._id);
		}));

		it('$scope.update() should update a valid instrument', inject(function(Instruments) {
			// Define a sample instrument put data
			var sampleInstrumentPutData = new Instruments({
				_id: '525cf20451979dea2c000001',
				title: 'An Instrument about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock instrument in scope
			scope.instrument = sampleInstrumentPutData;

			// Set PUT response
			$httpBackend.expectPUT(/instruments\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/instruments/' + sampleInstrumentPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid instrumentId and remove the instrument from the scope', inject(function(Instruments) {
			// Create new instrument object
			var sampleInstrument = new Instruments({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new instruments array and include the instrument
			scope.instruments = [sampleInstrument];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/instruments\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleInstrument);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.instruments.length).toBe(0);
		}));
	});
}());
