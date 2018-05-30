/* EveKit SDE Page Module */
(function(){
  var eveKitSDE = angular.module('eveKitSDE', ['ngRoute', 'eveKitModeServices', 'eveKitAdminWS', 'eveKitDialog']);

  /**
   * Service to retrieve current SDE releases.
   */
  eveKitSDE.factory('SDEReleases',
      [ 'AdminWSService', 'DialogService',
        function(AdminWSService) {
        var getReleaseData = function(name) {
          return AdminWSService.getConfigProp('sde.release.' + name)
          .then(function(result) {
            return JSON.parse(result['propertyValue']);
          });
        };

        return {
          'getReleases' : function() {
            return AdminWSService.getConfigProp('sdeReleases')
            .then(function(result) {
              var releaseList = JSON.parse(result['propertyValue']);
              var retrievers = [];
              for (var i = 0; i < releaseList.length; i++) {
                retrievers.push(getReleaseData(releaseList[i]));
              }
              return Promise.all(retrievers).
              then(function(releaseData) {
                var releaseResult = {};
                for (var i = 0; i < releaseList.length; i++) {
                  releaseResult[releaseList[i]] = releaseData[i];
                }
                return releaseResult;
              });
            });
          },
          'getLatestRelease' : function() {
            return AdminWSService.getConfigProp('sdeReleases')
              .then(function(result) {
                var releaseList = JSON.parse(result['propertyValue']);
                return getReleaseData(releaseList[releaseList.length - 1]);
              });
          }
        };
      }]);

  eveKitSDE.controller('SDEIntroCtrl',
      ['$scope', '$routeParams', '$sce', 'ToolModeService', 'SDEReleases', 'DialogService',
       function($scope, $routeParams, $sce, ToolModeService, SDEReleases, DialogService) {
        ToolModeService.refresh(MODE_SDE);
        $scope.releases = [];
        SDEReleases.getReleases()
        .then(function(result) {
          $scope.$apply(function() {
            $scope.releases = result;
          });
        }).catch(function(err) {
          DialogService.connectionErrorMessage('loading SDE release list: ' + err.errorMessage, 10);
        });
        $scope.sectionName = "SDE : Intro";
      }]);

  eveKitSDE.controller('SDEUICtrl',
      ['$scope', '$routeParams', '$sce', 'ToolModeService', 'SDEReleases', 'DialogService',
       function($scope, $routeParams, $sce, ToolModeService, SDEReleases, DialogService) {
        ToolModeService.refresh(MODE_SDE);
        $scope.release = null;
        $scope.releases = [];
        SDEReleases.getReleases()
        .then(function(result) {
          $scope.$apply(function() {
            var last = null;
            angular.forEach(result, function(v, k) {
              last = k;
            });
            $scope.releases = result;
            $scope.release = last;
            $scope.updateSDE();
          });
        }).catch(function(err) {
          $scope.$apply(function() {
            DialogService.connectionErrorMessage('loading SDE release list: ' + err.errorMessage, 10);
          });
        });
        $scope.sectionName = "SDE : Swagger UI";
        var baseUrl = "vendor/swagger-ui-2.1.4/swagger-sde.html?url=";
        // Function to change URL on model change
        $scope.updateSDE = function() {
          if ($scope.release != null) {
            $scope.urlExtra = $sce.trustAsResourceUrl(baseUrl + $scope.releases[$scope.release].model);
          }
        };
        // Setup
        $scope.updateSDE();
      }]);

})();
