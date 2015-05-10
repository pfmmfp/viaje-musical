/**
 * @author      Christiaan Scheermeijer <christiaan@videodock.com>
 */

/**
 * ImagePreloadFactory
 *
 * Preload image(s)
 */
angular.module('core').factory('ImagePreloadFactory', ['$q', '$rootScope', function ($q, $rootScope) {

    /**
     * @constructor
     */
    var ImagePreloader = function () {
        var self = this;
        var images = [];

        /**
         * Add single image in the preload queue
         *
         * @param {string} image
         */
        self.addImage = function (image) {
            images.push(image);
        };

        /**
         * Add image array collection to the preload queue
         *
         * @param {Array} image
         */
        self.addImages = function (image) {
            images = images.concat(image);
        };

        /**
         * Start preloading image queue
         *
         * @param completeCallback
         * @param progressCallback
         *
         * @returns {$q.defer.promise}
         */
        self.start = function (completeCallback, progressCallback) {
            return preload(images, completeCallback, progressCallback);
        };

        /**
         * Actual preload function
         *
         * @param images
         * @param completeCallback
         * @param progressCallback
         *
         * @returns {$q.defer.promise}
         */
        function preload(images, completeCallback, progressCallback) {
            var loader = new PxLoader(),
                defer = $q.defer();

            loader.addProgressListener(function (evt) {
                if (progressCallback) progressCallback(evt.completedCount/evt.totalCount);
                if (evt.completedCount === evt.totalCount) {
                    if (completeCallback) completeCallback();
                    defer.resolve();
                    $rootScope.$apply();
                }
            });

            for (var i = 0; i < images.length; i++) {
                loader.addImage(images[i]);
            }

            loader.start();

            return defer.promise;
        }
    };

    return {
        /**
         * Return a new ImagePreloader instance
         *
         * @returns {ImagePreloader}
         */
        createInstance: function () {
            return new ImagePreloader();
        }
    };
}]);
