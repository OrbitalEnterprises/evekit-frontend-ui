/* EveKit API Page Module */
(function(){
  var eveKitAPI = angular.module('eveKitAPI', ['ngRoute', 'eveKitModeServices']);

  eveKitAPI.controller('APIModelCtrl',
      ['$scope', '$routeParams', '$sce', 'ToolModeService',
       function($scope, $routeParams, $sce, ToolModeService) {
        ToolModeService.refresh(MODE_EVEKIT);
        $scope.sectionName = "API : Model";
        var baseUrl = "vendor/swagger-ui-2.1.4/swagger.html?url=http://localhost:8080/evekit-model/api/swagger.json";
        $scope.urlExtra = $sce.trustAsResourceUrl(baseUrl);
        if (angular.isDefined($routeParams.accessKey) &&
            angular.isDefined($routeParams.accessCred) &&
            angular.isDefined($routeParams.keyName) &&
            $routeParams.accessKey != "-1" &&
            $routeParams.accessCred != "-1") {
          $scope.urlExtra = $sce.trustAsResourceUrl(baseUrl + "&accessKey=" + $routeParams.accessKey + "&accessCred=" + $routeParams.accessCred + "&accessKeyName=" + $routeParams.keyName);
        }
      }]);

  eveKitAPI.controller('RefAPIModelCtrl',
      ['$scope', '$routeParams', '$sce', 'ToolModeService',
       function($scope, $routeParams, $sce, ToolModeService) {
        ToolModeService.refresh(MODE_EVEKIT);
        $scope.sectionName = "API : Reference Data Model";
        var baseUrl = "vendor/swagger-ui-2.1.4/swagger-ref.html?url=http://localhost:8080/evekit-ref-model/api/swagger.json";
        $scope.urlExtra = $sce.trustAsResourceUrl(baseUrl);
      }]);

})();
