// Mode Constants
var MODE_EVEKIT = 'evekit';
var MODE_SDE = 'sde';
var MODE_MKDATA = 'marketdata';

/** Mode services. */
(function(){
var eveKitModeServices = angular.module('eveKitModeServices', []);

eveKitModeServices.factory('ToolModeService', ['$rootScope', '$location',
  function($rootScope, $location) {
    var mode = MODE_EVEKIT;
    var modeURL = {};
    modeURL[MODE_EVEKIT] = '/evekit/main';
    modeURL[MODE_SDE] = '/sde/main';
    modeURL[MODE_MKDATA] = '/md/main';
    return {
      'change' : function(m) {
        // Only process if new mode is different
        if (mode != m) {
          // Preserve current page on previous mode
          modeURL[mode] = $location.path();
          $location.path(modeURL[m]);
          mode = m;
          $rootScope.$broadcast('ToolModeChange', mode);
        }
      },
      'get' : function() {
        return mode;
      },
      'refresh' : function(m) {
        mode = m;
        $rootScope.$broadcast('ToolModeChange', mode);
      }
    };
 }]);

})();
