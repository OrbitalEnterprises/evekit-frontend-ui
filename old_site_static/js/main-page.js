/* EveKit Main Page Module */
(function(){
  var eveKitMain = angular.module('eveKitMain', ['ngResource', 'ngSanitize', 'eveKitAccountWS', 'eveKitDialog', 'angular.vertilize', 'eveKitModeServices']);

  var NewsEntryBuilder = function(opt_json) {
    opt_json = opt_json || {};
    var created = opt_json['created'] || 0;
    this.raw_created_ = created;
    this.created_ = created <= 0 ? null : new Date();
    if (this.created_ != null)
      this.created_.setTime(created);
    var updated = opt_json['updated'] || 0;
    this.raw_updated_ = updated;
    this.updated_ = updated <= 0 ? null : new Date();
    if (this.updated_ != null)
      this.updated_.setTime(updated);
    this.category_ = opt_json['category'] || '';
    this.title_ = opt_json['title'] || '';
    this.detail_ = opt_json['detail'] || '';
    this.linkTitle_ = opt_json['linkTitle'] || null;
    this.linkRef_ = opt_json['linkRef'] || null;
  };

  var NewsListPopulator = function(json_response) {
    // This is a JSONP call, so we already have JSON format as the argument to this method
    var result = [];
    if (angular.isDefined(json_response['items'])) {
      var entries = json_response['items'];
      if (entries.length > 10) {
        entries = entries.slice(0, 10);
      }
      for (var i = 0; i < entries.length; i++) {
        var nextEntry = entries[i];
        var input = {};
        if (angular.isDefined(nextEntry.published)) input.created = (new Date(nextEntry.published)).getTime();
        if (angular.isDefined(nextEntry.updated)) input.updated = (new Date(nextEntry.updated)).getTime();
        if (angular.isDefined(nextEntry.title)) input.title = nextEntry.title;
        if (angular.isDefined(nextEntry.content)) {
          input.detail = nextEntry.content;
          if (input.detail.length > 200) {
            input.detail = input.detail.substr(0, 200) + "...";
          }
        }
        if (angular.isDefined(nextEntry.url)) {
          input.linkTitle = input.title;
          input.linkRef = nextEntry.url;
        }
        result.push(new NewsEntryBuilder(input));
      }
    }
    return result;
  };

  eveKitMain.factory('NewsEntry', ['$resource',
                                   function($resource) {
    var bloggerAPIKey = "AIzaSyCoQFXxawtc-x-1aF7DVbvilnnCONqXPPw";
    return $resource('', {},
        {
      list : {
        url: 'https://www.googleapis.com/blogger/v3/blogs/1703723675504697677/posts',
        method: 'JSONP',
        params: {
          fetchBodies: true,
          fetchImages: false,
          labels: "evekit",
          maxResults: 10,
          orderBy: "updated",
          status: "live",
          view: "READER",
          key: bloggerAPIKey,
          callback: "JSON_CALLBACK"
        },
        isArray: true,
        transformResponse: angular.bind(this, NewsListPopulator)
      }
        })}]);

  eveKitMain.controller('MainNewsCtrl',
      ['$scope', '$sce', '$timeout', 'NewsEntry', 'ToolModeService',
       function($scope, $sce, $timeout, NewsEntry, ToolModeService) {
    $scope.sectionName = "Main : News";
    $scope.getNewsDate = function(ne) {
      return Math.max(ne.updated_ == null ? 0 : ne.updated_.getTime(), ne.created_ == null ? 0 : ne.created_.getTime());
    };
    $scope.maxResults = 15;
    $scope.newsList = [];
    // Initialize display
    var initDisplay = function() {
      $scope.newsList = [];
      refreshDisplay();
      $timeout(initDisplay, 1000 * 60 * 5);
    };
    // Refresh the news display. We refresh from the current continuation marker.
    var refreshDisplay = function(opt_cb) {
      var nextBatch = NewsEntry.list({}, function() {
        angular.forEach(nextBatch, function(val) {
          val.renderDetail_ = $sce.trustAsHtml(val.detail_);
        });
        $scope.newsList = nextBatch;
      }, angular.noop);
    };
    // Init
    initDisplay();
  }]);

  eveKitMain.controller('MainAccountCtrl', ['$scope', 'UserCredentialsService', 'AccountWSService', 'DialogService', 'AdminWSService',
                                            function($scope, UserCredentialsService, AccountWSService, DialogService, AdminWSService) {
    $scope.sectionName = "Main : Account Information";
    $scope.lastlogin = null;
    $scope.lastloginmethod = null;
    $scope.createdate = null;
    $scope.signonMethods = [{name: 'twitter', display: 'Twitter'}, {name: 'google', display: 'Google'}, {name: 'eve', display: 'EVE'}];
    $scope.signon = {};
    $scope.tokenContactAddress = "";
    $scope.expiredTokenContact = "";
    $scope.uid = -1;
    $scope.loading = true;
    // Fetch user info directly in case this is a reload
    var userData = AccountWSService.getUser().then(function(userInfo) {
      if (userInfo != null) {
        return AccountWSService.getUserLastSource().then(function(sourceInfo) {
          if (sourceInfo != null) {
            return AccountWSService.getUserSources().then(function(sources) {
              if (sources != null) {
                var result = {
                    user: userInfo,
                    source: sourceInfo,
                    signon: {}
                };
                for(var i=0; i < $scope.signonMethods.length; i++) {
                  var nextMethod = $scope.signonMethods[i];
                  for(var j=0; j < sources.length; j++) {
                    var nextSource = sources[j];
                    if (nextSource.source === nextMethod.name) {
                      result.signon[nextMethod.name] = {screenname : nextSource.screenName };
                    }
                  }
                }
                return result;
              } else throw "All user sources fetch failed";
            });
          } else throw "User source fetch failed";
        });
      } else throw "User fetch failed";
    });
    // Fetch expired contact info
    $scope.fetchExpireContact = function(uid) {
      AdminWSService.getUserProp(uid, "esiExpireContactAddress").then(function(result) {
        $scope.$apply(function() {
          $scope.expiredTokenContact = result.propertyValue === null ? '' : result.propertyValue;
          $scope.tokenContactAddress = $scope.expiredTokenContact;
        });
      }).catch(function(msg) {
        console.log(msg);
          $scope.$apply(function() {
              DialogService.simpleWarnMessage('Unable to retrieve expired ESI token contact address.  Reload to try again.', 10);
          });
      });
    };
    // Set or change expire contact
    $scope.setExpireContact = function() {
      AdminWSService.setUserProp($scope.uid, "esiExpireContactAddress", $scope.tokenContactAddress)
          .catch(function() {
            $scope.$apply(function() {
                DialogService.simpleWarnMessage('Failed to set expired ESI token contact address.', 10);
            });
          })
          .finally(function() {
            $scope.fetchExpireContact($scope.uid);
          });
    };
    // Populate data for display
    userData.then(function(result) {
      $scope.fetchExpireContact(result.user.uid);
      $scope.$apply(function() {
        $scope.uid = result.user.uid;
        $scope.loading = false;
        $scope.lastlogin = result.user.last;
        $scope.lastloginmethod = result.source.source.substr(0, 1).toUpperCase() + result.source.source.substr(1);
        $scope.createdate = result.user.created;
        $scope.signon = result.signon;
      });
    }).catch(function() {
      $scope.$apply(function() {
        $scope.loading = false;
        DialogService.simpleWarnMessage('Unable to retrieve account information.  Reload to try again.', 10);
      });
    });
    // Remove auth source handler
    $scope.removeAuthSource = function(type) {
      DialogService.yesNoDialog('warning', 'Are you sure you want to remove the authentication source: ' + type + '?', false,
          function(choice) {
        if (choice === 1) window.location = 'api/ws/v1/auth/remove/' + type + '?redirect=' + encodeURI(window.location);
      });
    };
    // Add auth source handler
    $scope.addAuthSource = function(type) {
      window.location = 'api/ws/v1/auth/login/' + type + '?redirect=' + encodeURI(window.location);
    };
  }]);

})();
