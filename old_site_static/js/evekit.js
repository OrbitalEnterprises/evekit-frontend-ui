/* EveKit Module */
(function () {
    var eveKit = angular.module('eveKit', [
        'ngRoute', 'ngResource', 'eveKitModeServices', 'eveKitDialog', 'eveKitRemoteServices', 'eveKitAccountWS',
        'eveKitMain', 'eveKitAccount', 'eveKitAccess', 'eveKitAdmin', 'eveKitAPI', 'eveKitMarketData', 'eveKitSDE']);

// Capture any authorization errors before we process the rest of the window location
    var searchParams = window.location.search;
    var auth_error = null;
    if (searchParams && searchParams.length > 1) {
        var vals = searchParams.substr(1).split('&');
        for (var i = 0; i < vals.length; i++) {
            var next = vals[i].split('=');
            if (next[0] == 'auth_error') {
                auth_error = decodeURIComponent(next[1].replace(/\+/g, ' '));
                break;
            }
        }
    }

    /**
     * Service for retrieving build and version info.
     */
    eveKit.factory('ReleaseService', ['SwaggerService',
        function (SwaggerService) {
            return {
                'buildDate': function () {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Release.buildDate({}, {})
                                .then(function (result) {
                                    return result.status == 200 ? result.obj['buildDate'] : "";
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    return "";
                                });
                        });
                },
                'version': function () {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Release.version({}, {})
                                .then(function (result) {
                                    return result.status == 200 ? result.obj['version'] : "";
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    return "";
                                });
                        });
                }
            };
        }]);

    eveKit.config(['$routeProvider',
        function ($routeProvider) {
            // Set up routes
            $routeProvider.when('/main/news', {
                templateUrl: 'partials/main-news.html',
                controller: 'MainNewsCtrl'
            }).when('/main/account', {
                templateUrl: 'partials/main-userinfo.html',
                controller: 'MainAccountCtrl'
            }).when('/md/main', {
                templateUrl: 'partials/md-main.html',
                controller: 'MDIntroCtrl'
            }).when('/md/ui', {
                templateUrl: 'partials/md-ui.html',
                controller: 'MDUICtrl'
            }).when('/md/book', {
                templateUrl: 'partials/md-book.html',
                controller: 'MDBookCtrl'
            }).when('/sde/main', {
                templateUrl: 'partials/sde-main.html',
                controller: 'SDEIntroCtrl'
            }).when('/sde/ui', {
                templateUrl: 'partials/sde-ui.html',
                controller: 'SDEUICtrl'
            }).when('/account/main', {
                templateUrl: 'partials/account-main.html',
                controller: 'AccountMainCtrl'
            }).when('/account/view', {
                templateUrl: 'partials/account-view.html',
                controller: 'AccountViewCtrl'
            }).when('/account/history/:acctid/:ischar/:name', {
                templateUrl: 'partials/account-history.html',
                controller: 'AccountHistoryCtrl'
            }).when('/access/mod/:acctid/:keyid/:ischar/:name/:char/:corp/:charid/:corpid', {
                templateUrl: 'partials/access-mod.html',
                controller: 'AccessModCtrl'
            }).when('/access/view/:acctid/:ischar/:name/:char/:corp/:charid/:corpid', {
                templateUrl: 'partials/access-view.html',
                controller: 'AccessViewCtrl'
            }).when('/api/model/:accessKey/:accessCred/:keyName', {
                templateUrl: 'partials/api-model.html',
                controller: 'APIModelCtrl'
            }).when('/api/refmodel', {
                templateUrl: 'partials/api-model.html',
                controller: 'RefAPIModelCtrl'
            }).when('/admin/syspropedit', {
                templateUrl: 'partials/admin-sysprop.html',
                controller: 'AdminSyspropEditCtrl'
            }).when('/admin/userpropedit', {
                templateUrl: 'partials/admin-userprop.html',
                controller: 'AdminUserpropEditCtrl'
            }).when('/admin/inflight', {
                templateUrl: 'partials/admin-inflight.html',
                controller: 'AdminInflightCtrl'
            }).when('/admin/users', {
                templateUrl: 'partials/admin-users.html',
                controller: 'AdminUsersCtrl'
            }).when('/admin/refhistory', {
                templateUrl: 'partials/admin-ref-history.html',
                controller: 'AdminHistoryCtrl'
            }).otherwise({
                redirectTo: '/main/news'
            });
        }]);

    /* Add scrolling directive to handle hash scrolling. */
    /* nicked from here: http://stackoverflow.com/questions/14712223/how-to-handle-anchor-hash-linking-in-angularjs */
    eveKit.directive('scrollTo', function ($location, $anchorScroll) {
        return function (scope, element, attrs) {

            element.bind('click', function (event) {
                event.stopPropagation();
                var off = scope.$on('$locationChangeStart', function (ev) {
                    off();
                    ev.preventDefault();
                });
                var location = attrs.scrollTo;
                $location.hash(location);
                $anchorScroll();
            });
        }
    });

    /* Inband controller for setting the version for the page */
    eveKit.controller('EveKitVersionCtrl', ['$scope', 'ReleaseService',
        function ($scope, ReleaseService) {
            ReleaseService.buildDate().then(function (val) {
                $scope.$apply(function () {
                    $scope.eveKitBuildDate = val;
                });
            });
            ReleaseService.version().then(function (val) {
                $scope.$apply(function () {
                    $scope.eveKitVersion = val;
                });
            });
        }]);

    /* Inband controller for setting authentication status and other container menu settings. */
    eveKit.controller('EveKitAuthCtrl', ['$scope', '$route', '$timeout', 'UserCredentialsService', 'AccountWSService', 'DialogService', 'ToolModeService',
        function ($scope, $route, $timeout, UserCredentialsService, AccountWSService, DialogService, ToolModeService) {
            $scope.$route = $route;
            $scope.toolMode = ToolModeService.get();
            // Control whether this is the beta site
            $scope.isBeta = function() {
                return "false" == "true";
            };
            // Get mode to display in toolbar
            $scope.getToolModeClasses = function (tp) {
                if (tp == $scope.toolMode) {
                    return "btn btn-primary navbar-btn";
                } else {
                    return "btn btn-default navbar-btn";
                }
            };
            // Change tool mode
            $scope.setToolMode = function (newMode) {
                ToolModeService.change(newMode);
            };
            // Apply menu filter when specified
            $scope.menufilter = function (value, index) {
                return angular.isDefined(value.filter) ? value.filter() : true;
            };
            // Define menus
            $scope.evekitmenus = [
                {
                    menuID: 1,
                    title: 'Main Page',
                    display: 'Main',
                    urlPrefix: '/main/',
                    menulist: [{
                        title: 'News',
                        display: 'News',
                        link: '#/main/news'
                    }, {
                        title: 'User Info',
                        display: 'Your User Info',
                        link: '#/main/account',
                        filter: function () {
                            return $scope.userSource != null;
                        }
                    }, {
                        title: 'Guides',
                        display: 'Guides, Videos and Tutorials (external)',
                        link: 'http://blog.orbital.enterprises/p/evekit-guides-videos-and-tutorials.html',
                        pop: true
                    }, {
                        title: 'General FAQ',
                        display: 'General FAQ (external)',
                        link: 'https://groups.google.com/d/msg/orbital-enterprises/ZOfz0QFXniI/l-U6VszBAAAJ',
                        pop: true
                    }, {
                        title: 'Help & Feedback',
                        display: 'Help & Feedback (external)',
                        link: 'https://groups.google.com/forum/#!forum/orbital-enterprises',
                        pop: true
                    }]
                },
                {
                    menuID: 3,
                    title: 'Accounts Sync',
                    display: 'Account Sync',
                    urlPrefix: '/account/',
                    filter: function () {
                        return $scope.toolMode == MODE_EVEKIT;
                    },
                    menulist: [{
                        title: 'Intro',
                        display: 'Intro',
                        link: '#/account/main',
                        filter: function () {
                            return $scope.toolMode == MODE_EVEKIT;
                        }
                    }, {
                        title: 'Account List',
                        display: 'Account List',
                        link: '#/account/view',
                        filter: function () {
                            return $scope.userSource != null && $scope.toolMode == MODE_EVEKIT;
                        }
                    }, {
                        title: 'Sync Account FAQ',
                        display: 'Sync Account FAQ (external)',
                        link: 'https://groups.google.com/d/msg/orbital-enterprises/SZ_0uG117Ws/P95KQORAAQAJ',
                        pop: true
                    }]
                },
                {
                    menuID: 4,
                    title: 'Data Access Keys',
                    display: 'Data Access Keys',
                    urlPrefix: '/access/',
                    filter: function () {
                        return $scope.userSource != null && $scope.toolMode == MODE_EVEKIT;
                    },
                    menulist: [{
                        title: 'Access Key FAQ',
                        display: 'Access Key FAQ (external)',
                        link: 'https://groups.google.com/forum/#!topic/orbital-enterprises/3TNV-MvSLkE',
                        pop: true,
                        filter: function () {
                            return $scope.toolMode == MODE_EVEKIT;
                        }
                    }]
                },
                {
                    menuID: 5,
                    title: 'API',
                    display: 'API',
                    urlPrefix: '/api/',
                    filter: function () {
                        return $scope.toolMode == MODE_EVEKIT;
                    },
                    menulist: [{
                        title: 'Model API',
                        display: 'Model API',
                        link: '#/api/model/-1/-1/-1'
                    },
                        {
                            title: 'Reference Data API',
                            display: 'Reference Data API',
                            link: '#/api/refmodel'
                        },
                        {
                            title: 'API FAQ',
                            display: 'API FAQ (external)',
                            link: 'https://groups.google.com/forum/#!topic/orbital-enterprises/5sogZQ_C8xM',
                            pop: true
                        }]
                },
                {
                    menuID: 6,
                    title: 'SDE',
                    display: 'SDE',
                    urlPrefix: '/sde/',
                    filter: function () {
                        return $scope.toolMode == MODE_SDE;
                    },
                    menulist: [{
                        title: 'Intro',
                        display: 'Intro',
                        link: '#/sde/main',
                        filter: function () {
                            return $scope.toolMode == MODE_SDE;
                        }
                    }, {
                        title: 'SDE UI',
                        display: 'SDE UI',
                        link: '#/sde/ui',
                        filter: function () {
                            return $scope.toolMode == MODE_SDE;
                        }
                    }]
                },
                {
                    menuID: 7,
                    title: 'Market Data',
                    display: 'Market Data',
                    urlPrefix: '/md/',
                    filter: function () {
                        return $scope.toolMode == MODE_MKDATA;
                    },
                    menulist: [{
                        title: 'Intro',
                        display: 'Intro',
                        link: '#/md/main',
                        filter: function () {
                            return $scope.toolMode == MODE_MKDATA;
                        }
                    }, {
                        title: 'Market Data UI',
                        display: 'Market Data UI',
                        link: '#/md/ui',
                        filter: function () {
                            return $scope.toolMode == MODE_MKDATA;
                        }
                    }, {
                        title: 'Market Viewer',
                        display: 'Market Viewer',
                        link: '#/md/book',
                        filter: function () {
                            return $scope.toolMode == MODE_MKDATA;
                        }
                    }]
                },
                {
                    menuID: 8,
                    title: 'Admin',
                    display: 'Admin',
                    urlPrefix: '/admin/',
                    filter: function () {
                        return $scope.userInfo != null && $scope.userInfo.admin;
                    },
                    menulist: [{
                        title: 'Sysprop Editor',
                        display: 'Sysprop Editor',
                        link: '#/admin/syspropedit'
                    }, {
                        title: 'Userprop Editor',
                        display: 'Userprop Editor',
                        link: '#/admin/userpropedit'
                    }, {
                        title: 'Inflight Syncs',
                        display: 'Inflight Syncs',
                        link: '#/admin/inflight'
                    }, {
                        title: 'User List',
                        display: 'User List',
                        link: '#/admin/users'
                    }, {
                        title: 'Ref Sync History',
                        display: 'Ref Sync History',
                        link: '#/admin/refhistory'
                    }]
                }
            ];
            // Set up user credential management
            $scope.userInfo = UserCredentialsService.getUser();
            $scope.userSource = UserCredentialsService.getUserSource();
            $scope.$on('UserInfoChange', function (event, ui) {
                $scope.userInfo = ui;
            });
            $scope.$on('UserSourceChange', function (event, us) {
                $scope.userSource = us;
            });
            $scope.$on('ToolModeChange', function (event, mode) {
                $scope.toolMode = mode;
            });
            // Set up access key list management
            $scope.updateAccessKeys = function () {
                AccountWSService.getSyncAccount(-1, -1).then(
                    function (acctList) {
                        $scope.$apply(function () {
                            // Acct list valid, create access key menu entries.
                            var menuList = [{
                                title: 'Access Key FAQ',
                                display: 'Access Key FAQ (external)',
                                link: 'https://groups.google.com/forum/#!topic/orbital-enterprises/3TNV-MvSLkE',
                                pop: true
                            }];
                            for (var i = 0; i < acctList.length; i++) {
                                menuList.push({
                                    title: 'Data Access Keys for ' + acctList[i].name,
                                    display: 'Data Access Keys for ' + acctList[i].name,
                                    link: '#/access/view/' + acctList[i].aid + '/' + acctList[i].characterType + '/' + acctList[i].name + '/' + acctList[i].eveCharacterName + '/' + acctList[i].eveCorporationName + '/' + acctList[i].eveCharacterID + '/' + acctList[i].eveCorporationID
                                });
                            }
                            // Replace existing data access menu item (if exists)
                            for (var i = 0; i < $scope.evekitmenus.length; i++) {
                                if ($scope.evekitmenus[i].menuID === 4) {
                                    $scope.evekitmenus[i].menulist = menuList;
                                    break;
                                }
                            }
                        });
                    });
                $timeout($scope.updateAccessKeys, 1000 * 60 * 3);
            };
            $scope.updateAccessKeys();
            $scope.$on('KeysChangeEvent', $scope.updateAccessKeys);
            // Check for authentication error and post an appropriate dialog
            if (auth_error !== null) {
                $timeout(function () {
                    DialogService.simpleErrorMessage(auth_error, 20)
                }, 1);
            }
        }]);

})();
