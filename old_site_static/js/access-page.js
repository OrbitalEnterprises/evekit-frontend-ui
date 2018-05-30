/* EveKit Access Page Module */
(function(){
  var eveKitAccess = angular.module('eveKitAccess', ['ngResource', 'ngSanitize', 'ngRoute', 'eveKitDialog', 'eveKitAccountWS', 'eveKitModeServices']);

  eveKitAccess.controller('AccessViewCtrl',
      ['$scope', '$location', '$routeParams', 'DialogService', 'AccountWSService', 'ToolModeService',
       function($scope, $location, $routeParams, DialogService, AccountWSService, ToolModeService) {
        ToolModeService.refresh(MODE_EVEKIT);
        $scope.accountID = angular.isDefined($routeParams.acctid) ? parseInt($routeParams.acctid) : -1;
        $scope.isChar = angular.isDefined($routeParams.ischar) ? $routeParams.ischar == 'true' : false;
        $scope.accountName = angular.isDefined($routeParams.name) ? $routeParams.name : '';
        $scope.characterName = angular.isDefined($routeParams.char) ? $routeParams.char : '';
        $scope.corporationName = angular.isDefined($routeParams.corp) ? $routeParams.corp : '';
        $scope.characterID = angular.isDefined($routeParams.charid) ? parseInt($routeParams.charid) : -1;
        $scope.corporationID = angular.isDefined($routeParams.corpid) ? parseInt($routeParams.corpid) : -1;
        if ($scope.accountID === -1) {
          // This should never happen.  Send us back to the view page.
          DialogService.ackDialog('warning', 'Account ID is missing.  If this problem persists, please contact the site admin.', 20, function() {
            $location.url('/account/view');
          })
          return;
        }
        $scope.sectionName = "Data Access Keys : Keys for " + $scope.accountName;
        $scope.keyList = [];
        $scope.loading = false;
        $scope.$location = $location;
        // Reload key list.
        $scope.reloadList = function() {
          $scope.loading = true;
          AccountWSService.getAccessKey(-1, $scope.accountID, -1).then(function(result) {
            $scope.$apply(function() {
              $scope.loading = false;
              $scope.keyList = result;
              // Compute displayable key mast list.
              for (var i=0; i < $scope.keyList.length; i++) {
                var mask_title = "Allows:\n";
                var trans = $scope.isChar ? evekit.CharacterMaskConstants : evekit.CorporationMaskConstants;
                var masks = $scope.keyList[i].maskValueString.split('|');
                for (var j=0; j < masks.length; j++) {
                  var el = masks[j];
                  if (angular.isDefined(trans[el])) {
                    mask_title += trans[el].getDesc() + '\n';
                  }
                }
                // Remove the trailing newline.
                if (mask_title.length > 0) {
                  mask_title = mask_title.substring(0, mask_title.length - 1);
                }
                $scope.keyList[i].displayTitle = mask_title;
              }
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              $scope.loading = false;
              DialogService.connectionErrorMessage('loading data access key list: ' + err.errorMessage, 20);
            });
          });
        };
        // Delete an access key.
        $scope.deleteKey = function(key) {
          DialogService.yesNoDialog('warning', 'Really delete access key?', false, function(answer) {
            if (answer == 1) {
              var info = DialogService.simpleInfoMessage('Deleting access key...');
              AccountWSService.deleteAccessKey(-1, $scope.accountID, key.kid).then(function(result) {
                $scope.$apply(function() {
                  DialogService.removeMessage(info);
                  $scope.reloadList();
                });
              }).catch(function(err) {
                $scope.$apply(function() {
                  DialogService.removeMessage(info);
                  DialogService.connectionErrorMessage('removing access key: ' + err.errorMessage, 20);
                });
              });
            }
          })
        };
        $scope.reloadList();
      }]);

  // Validation functions.
  var isAlphaNumeric = function(str) {
    return !/[^a-zA-Z0-9]/.test(str);
  };

  var isValidDate = function(str) {
    return /[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/.test(str);
  };

  var validateKeyName = function(name) {
    if (!name || name.length == 0)
      return false;
    for (var i = 0; i < name.length; i++) {
      if (isAlphaNumeric(name[i]))
        continue;
      if (name[i] === '_')
        continue;
      return false;
    }
    return true;
  };

  var validateKeyExpiry = function(name) {
    if (!name || name.length == 0)
      return false;
    var trimmed = name.trim();
    if (trimmed == 'Never') return true;
    return isValidDate(trimmed);
  };

  var validateKeyLimit = function(name) {
    if (!name || name.length == 0)
      return false;
    var trimmed = name.trim();
    if (trimmed == 'Unlimited') return true;
    return isValidDate(trimmed);
  };

  var abstractValidator = function(name, popover, validator) {
    return function() {
      return {
        require: '?ngModel',
        restrict: 'A',
        link: function(scope, elm, attrs, ngModel) {
          if (!ngModel) return;
          ngModel.$parsers.unshift(function(viewValue) {
            var isValid = validator(viewValue);
            var status = isValid ? 'hide' : 'show';
            $('#' + popover).popover(status);
            ngModel.$setValidity(name, isValid);
            return viewValue;
          });
        }
      };
    }
  };

  // Validators
  eveKitAccess.directive('validatekeyname', [abstractValidator('validatekeyname', 'key-mod-name', validateKeyName)]);
  eveKitAccess.directive('validatekeyexpiry', [abstractValidator('validatekeyexpiry', 'key-mod-expiry', validateKeyExpiry)]);
  eveKitAccess.directive('validatekeylimit', [abstractValidator('validatekeylimit', 'key-mod-limit', validateKeyLimit)]);

  eveKitAccess.controller('AccessModCtrl',
      ['$scope', '$timeout', '$routeParams', '$location', '$filter', 'DialogService', 'AccountWSService', 'ToolModeService',
       function($scope, $timeout, $routeParams, $location, $filter, DialogService, AccountWSService, ToolModeService) {
        ToolModeService.refresh(MODE_EVEKIT);
        $scope.$location = $location;
        $scope.accountID = angular.isDefined($routeParams.acctid) ? parseInt($routeParams.acctid) : -1;
        $scope.keyID = angular.isDefined($routeParams.keyid) ? parseInt($routeParams.keyid) : -1;
        $scope.isChar = angular.isDefined($routeParams.ischar) ? $routeParams.ischar == 'true' : false;
        $scope.isModify = $scope.keyID >= 0;
        $scope.sectionName = "Data Access Key : " + ($scope.isModify ? "Modify" : "Create");
        $scope.original = {
            modKeyName: '',
            modKeyExpiry: 'Never',
            modKeyLimit: 'Unlimited',
            access_mask: []
        };
        $scope.modKeyName = '';
        $scope.modKeyExpiry = 'Never';
        $scope.modKeyLimit = 'Unlimited';
        $scope.access_mask = [];
        $scope.maskValues = [];
        var srcObject = $scope.isChar ? evekit.CharacterMaskConstants : evekit.CorporationMaskConstants;
        for (var mask_prop in srcObject) {
          $scope.maskValues.push(srcObject[mask_prop]);
        }
        $scope.prohibitedAccess = $scope.maskValues.slice();
        $scope.allowedAccess = [];
        $scope.existingKey = null;
        // Reset state.
        $scope.reset = function() {
          $scope.keyID = -1;
          $scope.isModify = false;
          $scope.modKeyName = '';
          $scope.modKeyExpiry = 'Never';
          $scope.modKeyLimit = 'Unlimited';
          $scope.existingAccount = null;
          $scope.original = {
              modKeyName: '',
              modKeyExpiry: 'Never',
              modKeyLimit: 'Unlimited',
              access_mask: []
          };
        };
        $scope.dirty = false;
        // Fetch existing key.
        $scope.loadExisting = function() {
          var msg = DialogService.createDialog('info', "Loading existing key information...", [], 30);
          AccountWSService.getAccessKey(-1, $scope.accountID, $scope.keyID).then(function(keyList) {
            $scope.$apply(function() {
              DialogService.removeDialog(msg);
              $scope.existing = keyList[0];
              $scope.modKeyName = $scope.existing.keyName;
              $scope.modKeyExpiry = $scope.existing.expiry == -1 ? 'Never' : $filter('date')($scope.existing.expiry, 'yyyy-MM-dd', 'UTC');
              $scope.modKeyLimit = $scope.existing.limit == -1 ? 'Unlimited' : $filter('date')($scope.existing.limit, 'yyyy-MM-dd', 'UTC');
              $scope.access_mask = $scope.existing.maskValueString.split('|');
              $scope.access_mask.sort();
              $scope.prohibitedAccess = [];
              $scope.allowedAccess = [];
              var srcObject = $scope.isChar ? evekit.CharacterMaskConstants : evekit.CorporationMaskConstants;
              for (var mask_prop in srcObject) {
                if ($scope.access_mask.indexOf(mask_prop) == -1) {
                  $scope.prohibitedAccess.push(srcObject[mask_prop]);
                } else {
                  $scope.allowedAccess.push(srcObject[mask_prop]);
                }
              }
              $scope.original.modKeyName = $scope.modKeyName;
              $scope.original.modKeyExpiry = $scope.modKeyExpiry;
              $scope.original.modKeyLimit = $scope.modKeyLimit;
              $scope.original.access_mask = $scope.access_mask.slice();
              $scope.updatePopovers();
              $scope.checkDirty();
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeDialog(msg);
              DialogService.connectionErrorMessage('loading data access key: ' + err.errorMessage, 20);
            });
          });
        };
        // Set dirty based on changes.
        $scope.checkDirty = function() {
          $scope.dirty = ($scope.original.modKeyName != $scope.modKeyName) ||
          ($scope.original.modKeyExpiry != $scope.modKeyExpiry) ||
          ($scope.original.modKeyLimit != $scope.modKeyLimit) ||
          ($scope.original.access_mask.length != $scope.access_mask.length);
          if (!$scope.dirty) {
            $scope.original.access_mask.sort();
            $scope.access_mask.sort();
            for (var i=0; i < $scope.original.access_mask.length; i++) {
              if ($scope.original.access_mask[i] != $scope.access_mask[i]) {
                $scope.dirty = true;
                break;
              }
            }
          }
        }
        // Set all popovers.
        $scope.updatePopovers = function() {
          if (!validateKeyName($scope.modKeyName)) {
            $('#key-mod-name').popover('show');
          } else {
            $('#key-mod-name').popover('hide');
          }
          if (!validateKeyExpiry($scope.modKeyExpiry)) {
            $('#key-mod-expiry').popover('show');
          } else {
            $('#key-mod-expiry').popover('hide');
          }
          if (!validateKeyLimit($scope.modKeyLimit)) {
            $('#key-mod-limit').popover('show');
          } else {
            $('#key-mod-limit').popover('hide');
          }
        };
        // Build view link for navigating after key change.
        $scope.viewLink = function() {
          var accountName = angular.isDefined($routeParams.name) ? $routeParams.name : '';
          var characterName = angular.isDefined($routeParams.char) ? $routeParams.char : '';
          var corporationName = angular.isDefined($routeParams.corp) ? $routeParams.corp : '';
          var characterID = angular.isDefined($routeParams.charid) ? parseInt($routeParams.charid) : -1;
          var corporationID = angular.isDefined($routeParams.corpid) ? parseInt($routeParams.corpid) : -1;
          return '/access/view/' + $scope.accountID + '/' + $scope.isChar + '/' +
                 accountName + '/' + characterName + '/' + corporationName + '/' +
                 characterID + '/' + corporationID;
        };
        // Save new or modified key.
        $scope.save = function() {
          var saveMessage = DialogService.createDialog('info', "Saving changes...", [], 30);
          var expiryValue = -1;
          var limitValue = -1;
          try {
            if ($scope.modKeyExpiry != 'Never') expiryValue = Date.parse($scope.modKeyExpiry);
          } catch(e) {
            expiryValue = -1;
          }
          try {
            if ($scope.modKeyLimit != 'Unlimited') limitValue = Date.parse($scope.modKeyLimit);
          } catch(e) {
            limitValue = -1;
          }
          if ($scope.isModify) {
            AccountWSService.saveAccessKey(-1, $scope.accountID, {
              kid: $scope.keyID,
              keyName: $scope.modKeyName,
              expiry: expiryValue,
              limit: limitValue,
              maskValueString: $scope.access_mask.join('|')
            }).then(function(result) {
              $scope.$apply(function() {
                DialogService.removeDialog(saveMessage);
                $location.url($scope.viewLink());
              });
            }).catch(function(err) {
              $scope.$apply(function() {
                DialogService.removeDialog(saveMessage);
                DialogService.connectionErrorMessage('modifying data access key: ' + err.errorMessage, 10);
              });
            });
          } else {
            AccountWSService.saveAccessKey(-1, $scope.accountID, {
              kid: -1,
              keyName: $scope.modKeyName,
              expiry: expiryValue,
              limit: limitValue,
              maskValueString: $scope.access_mask.join('|')
            }).then(function(result) {
              $scope.$apply(function() {
                DialogService.removeDialog(saveMessage);
                $location.url($scope.viewLink());
              });
            }).catch(function(err) {
              $scope.$apply(function() {
                DialogService.removeDialog(saveMessage);
                DialogService.connectionErrorMessage('saving new data access key: ' + err.errorMessage, 10);
              });
            });
          }
        };
        // Cancel changes but verify if we're dirty.
        $scope.cancel = function() {
          if ($scope.dirty) {
            DialogService.yesNoDialog('warning', 'You have unsaved changes.  Are you sure you want to cancel?', false,
                function (answer) {
              if (answer == 1) $location.url($scope.viewLink());
            });
          } else {
            $location.url($scope.viewLink());
          }
        };
        // Cleanup pop-overs if we change the view.
        $scope.$on('$routeChangeStart', function() {
          $('#key-mod-name').popover('hide');
          $('#key-mod-expiry').popover('hide');
          $('#key-mod-limit').popover('hide');
        });
        // Reset the access mask based on the "allowed" set.
        $scope.setMaskFromAllowed = function() {
          $scope.access_mask = [];
          for (var i=0; i < $scope.allowedAccess.length; i++) {
            $scope.access_mask.push($scope.allowedAccess[i].value_);
          }
        };
        // Move everything over to "allowed".
        $scope.moveAllToAllowed = function() {
          $scope.prohibitedAccess = [];
          $scope.allowedAccess = $scope.maskValues.slice();
          $scope.setMaskFromAllowed();
        };
        // Move everything over to "prohibited".
        $scope.moveAllToProhibited = function() {
          $scope.allowedAccess = [];
          $scope.prohibitedAccess = $scope.maskValues.slice();
          $scope.setMaskFromAllowed();
        };
        // Filters for draggable display.
        $scope.filterProhibited = function(val) {
          return $scope.prohibitedAccess.indexOf(val) != -1;
        };
        $scope.filterAllowed = function(val) {
          return $scope.allowedAccess.indexOf(val) != -1;
        };
        // Handlers for changing access.
        $scope.selectProhibit = function(val) {
          if ($scope.prohibitedAccess.indexOf(val) == -1) {
            $scope.prohibitedAccess.push(val);
          }
          if ($scope.allowedAccess.indexOf(val) != -1) {
            $scope.allowedAccess.splice($scope.allowedAccess.indexOf(val), 1);
          }
          $scope.setMaskFromAllowed();
        };
        $scope.selectAllow = function(val) {
          if ($scope.allowedAccess.indexOf(val) == -1) {
            $scope.allowedAccess.push(val);
          }
          if ($scope.prohibitedAccess.indexOf(val) != -1) {
            $scope.prohibitedAccess.splice($scope.prohibitedAccess.indexOf(val), 1);
          }
          $scope.setMaskFromAllowed();
        }
        // Init
        $scope.$watchGroup(['modKeyName', 'modKeyExpiry', 'modKeyLimit', 'access_mask'], $scope.checkDirty);
        $scope.updatePopovers();
        if ($scope.isModify) $scope.loadExisting();
      }]);

})();
