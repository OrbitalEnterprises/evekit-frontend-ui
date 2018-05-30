/* Useful functions */
function convertLongToTime(obj) {
  var timeArg = obj || -1;
  return timeArg == -1 ? null : new Date(timeArg);
}

/** Standard error response */
var EveKitServiceError = function(opt_json) {
  opt_json = opt_json || {};
  this.errorCode = opt_json['errorCode'] || 0;
  this.errorMessage = opt_json['errorMessage'] || '';
};

function handleRemoteResponse(response) {
  if (angular.isDefined(response.obj) &&
      response.obj != null)
    throw new EveKitServiceError(response.obj);
  throw new EveKitServiceError({errorCode: 0, errorMessage: "internal service error"});
}

/** Utilities to handle server interactions. */
(function(){
var eveKitRemoteServices = angular.module('eveKitRemoteServices', []);

/**
 * Service for retrieving swagger endpoints for EveKit.  Returns a promise
 * that resolves to the client when it's ready.
 */
eveKitRemoteServices.factory('SwaggerService', [
  function() {
    // Construct the URL from the window location
    var getUrlFromWindow = function() {
      var url = window.location.href;
      // removing any trailing garbage
      var h = url.indexOf('#');
      if (h != -1) {
        url = url.substring(0, h);
      }
      h = url.indexOf('?');
      if (h != -1) {
        url = url.substring(0, h);
      }
      // construct and retrieve the swagger client spec
      url = url + 'api/swagger.json';
      return url;
    };
    // Cache clients by URL
    var clients = {};
    // Main service code
    return {
      'getSwagger' : function(url) {
        url = url || getUrlFromWindow();
        if (clients[url]) return clients[url];
        var swagger = new SwaggerClient({
          url: url,
          usePromise: true
        }).then(function(obj) {
          console.log('swagger ready for: ' + url);
          return obj;
        }).catch(function(error) {
          console.error('Swagger promise rejected for: ' + url, error);
          return null;
        });
        clients[url] = swagger;
        return swagger;
      }
    };
 }]);

})();
