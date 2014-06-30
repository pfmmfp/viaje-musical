'use strict';

(function() {
	// Genres Controller Spec
	describe('GenresController', function() {
		// Initialize global variables
		var GenresController,
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

			// Initialize the Genres controller.
			GenresController = $controller('GenresController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one genre object fetched from XHR', inject(function(Genres) {
			// Create sample genre using the Genres service
			var sampleGenre = new Genres({
				title: 'An Genre about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample genres array that includes the new genre
			var sampleGenres = [sampleGenre];

			// Set GET response
			$httpBackend.expectGET('genres').respond(sampleGenres);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.genres).toEqualData(sampleGenres);
		}));

		it('$scope.findOne() should create an array with one genre object fetched from XHR using a genreId URL parameter', inject(function(Genres) {
			// Define a sample genre object
			var sampleGenre = new Genres({
				title: 'An Genre about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.genreId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/genres\/([0-9a-fA-F]{24})$/).respond(sampleGenre);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.genre).toEqualData(sampleGenre);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Genres) {
			// Create a sample genre object
			var sampleGenrePostData = new Genres({
				title: 'An Genre about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample genre response
			var sampleGenreResponse = new Genres({
				_id: '525cf20451979dea2c000001',
				title: 'An Genre about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Genre about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('genres', sampleGenrePostData).respond(sampleGenreResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the genre was created
			expect($location.path()).toBe('/genres/' + sampleGenreResponse._id);
		}));

		it('$scope.update() should update a valid genre', inject(function(Genres) {
			// Define a sample genre put data
			var sampleGenrePutData = new Genres({
				_id: '525cf20451979dea2c000001',
				title: 'An Genre about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock genre in scope
			scope.genre = sampleGenrePutData;

			// Set PUT response
			$httpBackend.expectPUT(/genres\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/genres/' + sampleGenrePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid genreId and remove the genre from the scope', inject(function(Genres) {
			// Create new genre object
			var sampleGenre = new Genres({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new genres array and include the genre
			scope.genres = [sampleGenre];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/genres\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGenre);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.genres.length).toBe(0);
		}));
	});
}());
