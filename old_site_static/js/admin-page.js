/* EveKit Admin Page Module */
(function(){
  var eveKitAdmin = angular.module('eveKitAdmin', ['ngResource', 'ngSanitize', 'ngRoute', 'eveKitDialog', 'eveKitAccountWS', 'eveKitAdminWS', 'eveKitTrackerWS', 'eveKitModeServices']);

  eveKitAdmin.controller('AdminSyspropEditCtrl',
      ['$scope', 'DialogService', 'AdminWSService', 'ToolModeService',
       function($scope, DialogService, AdminWSService, ToolModeService) {
        $scope.sectionName = "Admin : System Property Editor";
        $scope.prop_list = [];
        $scope.newprop = {
            name : '',
            value : ''
        };

        // Refresh property list
        $scope.refreshProperties = function() {
          var info = DialogService.simpleInfoMessage('Refreshing property list...');
          AdminWSService.getSysProps().then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              $scope.prop_list = result;
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('refreshing property list: ' + err.errorMessage, 10);
            });
          });
        };

        // Save a new property and refresh the property list.
        $scope.saveNewProperty = function() {
          var info = DialogService.simpleInfoMessage('Saving new property...');
          AdminWSService.setSysProp($scope.newprop.name, $scope.newprop.value)
          .then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              $scope.newprop.name = '';
              $scope.newprop.value = '';
              $scope.refreshProperties();
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('saving new property: ' + err.errorMessage, 10);
            });
          });
        };

        // Save property change.
        $scope.savePropChange = function(prop) {
          var info = DialogService.simpleInfoMessage('Saving property change...');
          AdminWSService.setSysProp(prop.propertyName, prop.propertyValue)
          .then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              $scope.refreshProperties();
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('saving new property: ' + err.errorMessage, 10);
            });
          });
        };

        // Remove a property.
        $scope.deleteProperty = function(prop) {
          var info = DialogService.simpleInfoMessage('Removing property...');
          AdminWSService.deleteSysProp(prop.propertyName)
          .then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              $scope.refreshProperties();
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('removing property: ' + err.errorMessage, 10);
            });
          });
        };

        // Initialize
        $scope.refreshProperties();
      }]);

  eveKitAdmin.controller('AdminUserpropEditCtrl',
      ['$scope', 'DialogService', 'AdminWSService', 'AccountWSService', 'ToolModeService',
       function($scope, DialogService, AdminWSService, AccountWSService, ToolModeService) {
        $scope.sectionName = "Admin : User Account Property Editor";
        $scope.uid_list = [];
        $scope.prop_list = [];
        $scope.newprop = {
            name : '',
            value : ''
        };
        $scope.uid = null;

        // Refresh uid list
        $scope.refreshUids = function() {
          $scope.uid = null;
          $scope.prop_list = [];
          var info = DialogService.simpleInfoMessage('Refreshing uid list...');
          AccountWSService.listUsers()
          .then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              $scope.uid_list = result;
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('refreshing uid list: ' + err.errorMessage, 10);
            });
          });
        };

        // Change uid
        $scope.selectUid = function(new_uid) {
          $scope.uid = new_uid;
          $scope.prop_list = [];
          $scope.refreshProperties();
        };

        // Refresh property list
        $scope.refreshProperties = function() {
          var info = DialogService.simpleInfoMessage('Refreshing property list...');
          AdminWSService.getUserProps($scope.uid.uid)
          .then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              $scope.prop_list = result;
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('refreshing property list: ' + err.errorMessage, 10);
            });
          });
        };

        // Save a new property and refresh the property list.
        $scope.saveNewProperty = function() {
          // Only honor if a uid has been selected.
          if ($scope.uid == null) return;
          var info = DialogService.simpleInfoMessage('Saving new property...');
          AdminWSService.setUserProp($scope.uid.uid, $scope.newprop.name, $scope.newprop.value)
          .then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              $scope.newprop.name = '';
              $scope.newprop.value = '';
              $scope.refreshProperties();
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('saving new property: ' + err.errorMessage, 10);
            });
          });
        };

        // Save property change.
        $scope.savePropChange = function(prop) {
          var info = DialogService.simpleInfoMessage('Saving property change...');
          AdminWSService.setUserProp($scope.uid.uid, prop.propertyName, prop.propertyValue)
          .then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              $scope.refreshProperties();
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('saving new property: ' + err.errorMessage, 10);
            });
          });
        };

        // Remove a property.
        $scope.deleteProperty = function(prop) {
          var info = DialogService.simpleInfoMessage('Removing property...');
          AdminWSService.deleteUserProp($scope.uid.uid, prop.propertyName)
          .then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              $scope.refreshProperties();
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('removing property: ' + err.errorMessage, 10);
            });
          });
        };

        // Initialize
        $scope.refreshUids();
      }]);

  eveKitAdmin.controller('AdminInflightCtrl',
      ['$scope', 'DialogService', 'TrackerWSService', 'ToolModeService',
       function($scope, DialogService, TrackerWSService, ToolModeService) {
        $scope.sectionName = "Admin : Inflight Syncs";
        $scope.accountSyncHistory = [];
        $scope.refSyncHistory = [];
        $scope.accountEndpointList = AccountSyncTrackerEndpoints;
        $scope.refEndpointList = RefSyncTrackerEndpoints;

        // Refresh account sync list
        var refreshAccountSyncList = function() {
          var info = DialogService.simpleInfoMessage('Refreshing Account Syncs...');
          TrackerWSService.getAccountStartedSync()
          .then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              $scope.accountSyncHistory = result;
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('refreshing account syncs: ' + err.errorMessage, 10);
            });
          });
        };

        // Refresh ref sync list
        var refreshRefSyncList = function() {
          var info = DialogService.simpleInfoMessage('Refreshing Ref Data Syncs...');
          TrackerWSService.getRefStartedSync()
          .then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              $scope.refSyncHistory = result;
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('refreshing ref data syncs: ' + err.errorMessage, 10);
            });
          });
        };

        // Refresh both sync lists
        $scope.refreshSyncLists = function() {
          refreshAccountSyncList();
          refreshRefSyncList();
        };

        // Display sync details
        $scope.displayDetail = function(uid, accountID, trackerID) {
          DialogService.ackDialog('info', 'uid=' + uid + '<br>aid=' + accountID + '<br>tid=' + trackerID, -1, angular.noop);
        };
        $scope.displayRefDetail = function(trackerID) {
          DialogService.ackDialog('info', 'tid=' + trackerID, -1, angular.noop);
        };

        // Finish synchronization
        $scope.finishSync = function(uid, accountID, trackerID) {
          var info = DialogService.simpleInfoMessage('Finishing sync...');
          TrackerWSService.finishTracker(uid, accountID, trackerID)
          .then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              $scope.refreshSyncLists();
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('finishing sync: ' + err.errorMessage, 10);
            });
          });
        };
        $scope.finishRefSync = function(trackerID) {
          var info = DialogService.simpleInfoMessage('Finishing ref sync...');
          TrackerWSService.finishRefTracker(trackerID)
          .then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              $scope.refreshSyncLists();
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('finishing ref sync: ' + err.errorMessage, 10);
            });
          });
        };

           // Determine the CSS class for an endpoint in the given history
           $scope.determineHistoryClass = function (historyEntry, endpoint) {
               if (endpoint !== historyEntry['endpoint']) {
                   // Not requesting status for this entry
                   return 'sync-history-nop';
               }
               var status = historyEntry['status'];
               switch (status) {
                   case 'FINISHED':
                       return 'sync-history-ok';

                   case 'ERROR':
                       return 'sync-history-fail';

                   case 'WARNING':
                       return 'sync-history-warn';

                   case 'NOT_PROCESSED':
                       return 'sync-history-na';

                   default:
                       console.log('Received unexpected status "' + status + '" in sync history');
                       return 'sync-history-nop';
               }
           };

           // Determine HTML title for an endpoint in the given history
           $scope.determineHistoryTitle = function (historyEntry, endpoint) {
               if (endpoint !== historyEntry['endpoint']) {
                   // Not requesting status for this entry
                   return "N/A";
               }
               return historyEntry['detail'];
           };

        // Get history element start time.
        $scope.getStartTime = function (el) {
          return el['syncStart'];
        };

        // Initialize
        $scope.refreshSyncLists();
      }]);

  eveKitAdmin.controller('AdminUsersCtrl',
      ['$scope', 'DialogService', 'AccountWSService', 'ToolModeService',
       function($scope, DialogService, AccountWSService, ToolModeService) {
        $scope.sectionName = "Admin : User List";
        $scope.user_list = [];
        $scope.user_account_list = {};

        // Extract last sign on time for ordering
        $scope.getLastSignOnTime = function(u) {
          return u.last;
        };

        // Refresh user list
        $scope.refresh = function() {
          $scope.user_list = [];
          $scope.user_account_list = {};
          var info = DialogService.simpleInfoMessage('Refreshing user list...');
          var getSources = function(user_list) {
            // Retrieve last source for each user
            var cb = function(tgt, success) {
              return function(source) {
                $scope.$apply(function() {
                  tgt.screenName = success ? source.screenName : 'ERROR!';
                  tgt.source = success ? source.source : 'ERROR!';
                  $scope.user_list.push(tgt);
                });
              };
            };
            for(var i = 0; i < user_list.length; i++) {
              var pass = cb(user_list[i], true);
              var fail = cb(user_list[i], false);
              AccountWSService.getUserLastSource(user_list[i].uid)
              .then(pass)
              .catch(fail);
            }
          };
          AccountWSService.listUsers()
          .then(function(result) {
            DialogService.removeMessage(info);
            getSources(result);
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('refreshing user list: ' + err.errorMessage, 10);
            });
          });
        };

        // Disable/Enable user
        $scope.toggleEnabled = function(user_info) {
          var info = DialogService.simpleInfoMessage('Toggling user state...');
          AccountWSService.toggleActive(user_info.uid, user_info.active ? false : true)
          .then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              $scope.refresh();
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('toggling user state: ' + err.errorMessage, 10);
            });
          });
        };

        // Show/Hide user acounts
        $scope.toggleAccountView = function(uid) {
          var def = angular.isDefined($scope.user_account_list[uid]);
          delete $scope.user_account_list[uid];
          if (def) {
            return;
          }
          var info = DialogService.simpleInfoMessage('Retrieving sync accounts...');
          AccountWSService.getSyncAccount(uid, -1)
          .then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              $scope.user_account_list[uid] = result;
              // Retrieve whether each account is disabled
              for (var i = 0; i < result.length; i++) {
                var nextAccount = result[i];
                nextAccount.disabled = false;
                AccountWSService.checkDisabled(uid, nextAccount.aid).then(function(disabled) {
                  $scope.$apply(function() {
                    nextAccount.disabled = disabled;
                  });
                });
              }
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('retrieving sync accounts: ' + err.errorMessage, 10);
            });
          });
        };

        // Disable/Enable user
        $scope.toggleAccountDisabled = function(uid, acctid, state) {
          var info = DialogService.simpleInfoMessage('Toggling disabled...');
          AccountWSService.toggleAccountDisabled(uid, acctid, state)
          .then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              delete $scope.user_account_list[uid];
              $scope.toggleAccountView(uid);
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('toggling auto sync: ' + err.errorMessage, 10);
            });
          });
        };

        // Become user
        $scope.becomeUser = function(uid) {
          var info = DialogService.simpleInfoMessage('Becoming selected user...');
          AccountWSService.becomeUser(uid)
          .then(function(result) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              // Reload page to refresh login cookies
              location.reload(true);
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              DialogService.removeMessage(info);
              DialogService.connectionErrorMessage('becoming user: ' + err.errorMessage, 10);
            });
          });
        };

        // Initialize
        $scope.refresh();
      }]);

  eveKitAdmin.controller('AdminHistoryCtrl',
      ['$scope', 'DialogService', 'AccountWSService', 'TrackerWSService',
       function($scope, DialogService, AccountWSService, TrackerWSService) {
        $scope.sectionName = "Admin : Ref Sync History";
        $scope.syncHistory = [];
        $scope.endpointList = RefSyncTrackerEndpoints;
        $scope.determineRefHistoryClass = function (historyEntry, endpoint) {
            if (endpoint !== historyEntry['endpoint']) {
                // Not requesting status for this entry
                return 'sync-history-nop';
            }
            var status = historyEntry['status'];
            switch (status) {
                case 'FINISHED':
                    return 'sync-history-ok';
                    break;

                case 'ERROR':
                    return 'sync-history-fail';
                    break;

                case 'WARNING':
                    return 'sync-history-warn';
                    break;

                case 'NOT_PROCESSED':
                    return 'sync-history-nop';
                    break;

                default:
                    console.log('Received unexpected status "' + status + '" in sync history');
                    break;
            }
        };
        $scope.determineRefHistoryTitle = function (historyEntry, endpoint) {
            if (endpoint !== historyEntry['endpoint']) {
                // Not requesting status for this entry
                return "N/A";
            }
            return historyEntry['detail'];
        };
        // Get history element start time.
        $scope.getStartTime = function (el) {
          return el['syncStart'];
        };
        // Get history element end time.
        $scope.getEndTime = function (el) {
          return el['syncEnd'];
        };
        // Load next history batch.
        var maxresults = 100;
        $scope.refreshHistory = function(opt_cb) {
          $scope.loading = true;
          var continuation = $scope.syncHistory.length == 0 ? -1 : $scope.syncHistory[$scope.syncHistory.length - 1].syncStart;
          var resource = TrackerWSService.getRefHistory;
          resource(continuation, maxresults).then(function(result) {
            $scope.$apply(function() {
              $scope.loading = false;
              var toadd = [];
              angular.forEach(result, function(el) {
                var found = false;
                for(var i = 0; i < $scope.syncHistory.length && !found; i++) {
                  if ($scope.syncHistory[i].tid == el.tid) {
                    found = true;
                    break;
                  }
                }
                if (!found) toadd.push(el);
              });
              $scope.syncHistory = $scope.syncHistory.concat(toadd);
              $scope.syncHistory.sort(function(a, b) {
                return b.syncStart - a.syncStart;
              });
              if (angular.isDefined(opt_cb)) opt_cb();
            });
          }).catch(function(err) {
            $scope.$apply(function() {
              $scope.loading = false;
              DialogService.connectionErrorMessage('loading ref sync history: ' + err.errorMessage + '.  Please reload to try again', 20);
              if (angular.isDefined(opt_cb)) opt_cb();
            });
          });
        };
        // Load more history when we scroll to the bottom of the current view.
        $scope.handleScroll = function() {
          if ($('#refHistoryScroll').scrollTop() > $scope.syncHistory.length * 22 / 2) {
            $('#refHistoryScroll').unbind('scroll');
            $scope.loadMoreHistory();
          }
        };
        $scope.loadMoreHistory = function () {
          $scope.refreshHistory(function() {
            fixHeight();
            $('#refHistoryScroll').scroll($scope.handleScroll);
          });
        };
        // Fix viewport size so scrolling works correctly.
        var fixHeight = function() {
          $('#refHistoryScroll').height($('#bottom-nav').offset().top - $('#refHistoryScroll').offset().top - 60);
        };
        // Init
        $('#refHistoryScroll').scroll($scope.handleScroll);
        $(window).resize(fixHeight);
        $scope.loadMoreHistory();
      }]);

})();
