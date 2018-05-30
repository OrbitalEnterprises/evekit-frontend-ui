/* Admin Services */
(function() {
var adminWS = angular.module('eveKitAdminWS', ['eveKitRemoteServices']);

/**
 * EveKit Admin Services
 */
adminWS.factory('AdminWSService', ['SwaggerService',
  function(SwaggerService) {
    return {
      'getConfigProp' : function(key) {
        return SwaggerService.getSwagger()
        .then(function (swg) {
          return swg.Admin.getConfigProperty({key: key}, {})
          .then(function(result) {
            return result.obj;
          }).catch(handleRemoteResponse);
        });
      },
      'getSysProps' : function() {
        return SwaggerService.getSwagger()
        .then(function (swg) {
          return swg.Admin.getSysProps({}, {})
          .then(function(result) {
            return result.obj;
          }).catch(handleRemoteResponse);
        });
      },
      'setSysProp' : function(key, value) {
        return SwaggerService.getSwagger()
        .then(function (swg) {
          return swg.Admin.setSysProp({key: key, value: value}, {})
          .then(function(result) {
            return true;
          }).catch(handleRemoteResponse);
        });
      },
      'deleteSysProp' : function(key) {
        return SwaggerService.getSwagger()
        .then(function (swg) {
          return swg.Admin.deleteSysProp({key: key}, {})
          .then(function(result) {
            return true;
          }).catch(handleRemoteResponse);
        });
      },
      'getUserProps' : function(uid) {
        return SwaggerService.getSwagger()
        .then(function (swg) {
          return swg.Admin.getUserProps({uid: uid}, {})
          .then(function(result) {
            return result.obj;
          }).catch(handleRemoteResponse);
        });
      },
        'getUserProp' : function(uid, key) {
            return SwaggerService.getSwagger()
                .then(function (swg) {
                    return swg.Admin.getUserProp({uid: uid, key: key}, {})
                        .then(function(result) {
                            return result.obj;
                        }).catch(handleRemoteResponse);
                });
        },
      'setUserProp' : function(uid, key, value) {
        return SwaggerService.getSwagger()
        .then(function (swg) {
          return swg.Admin.setUserProp({uid: uid, key: key, value: value}, {})
          .then(function(result) {
            return true;
          }).catch(handleRemoteResponse);
        });
      },
      'deleteUserProp' : function(uid, key) {
        return SwaggerService.getSwagger()
        .then(function (swg) {
          return swg.Admin.deleteUserProp({uid: uid, key: key}, {})
          .then(function(result) {
            return true;
          }).catch(handleRemoteResponse);
        });
      }
    };
 }]);


})();
