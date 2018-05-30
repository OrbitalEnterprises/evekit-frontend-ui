/* Account Services */
(function () {
    var accountWS = angular.module('eveKitAccountWS', ['eveKitRemoteServices']);

    /**
     * Service for sharing authentication state among all controllers.
     */
    accountWS.factory('AccountWSService', ['SwaggerService',
        function (SwaggerService) {
            return {
                'getSyncAccount': function (uid, aid) {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.getSyncAccount({uid: uid, aid: aid}, {})
                                .then(function (result) {
                                    return result.obj;
                                }).catch(handleRemoteResponse);
                        });
                },
                'saveSyncAccount': function (uid, aid, name, charType, autoSync) {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.saveSyncAccount({
                                uid: uid,
                                aid: aid,
                                name: name,
                                charType: charType,
                                autoSync: autoSync
                            }, {})
                                .then(function (result) {
                                    return result.obj;
                                }).catch(handleRemoteResponse);
                        });
                },
                'deleteSyncAccount': function (uid, aid) {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.deleteSyncAccount({uid: uid, aid: aid}, {})
                                .then(function () {
                                    return true;
                                }).catch(handleRemoteResponse);
                        });
                },
                'restoreSyncAccount': function (uid, aid) {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.restoreSyncAccount({uid: uid, aid: aid}, {})
                                .then(function () {
                                    return true;
                                }).catch(handleRemoteResponse);
                        });
                },
                'getAccessKey': function (uid, aid, kid) {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.getAccessKey({uid: uid, aid: aid, kid: kid}, {})
                                .then(function (result) {
                                    return result.obj;
                                }).catch(handleRemoteResponse);
                        });
                },
                'saveAccessKey': function (uid, aid, key) {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.saveAccessKey({uid: uid, aid: aid, kid: key.kid, key: key}, {})
                                .then(function (result) {
                                    return result.obj;
                                }).catch(handleRemoteResponse);
                        });
                },
                'deleteAccessKey': function (uid, aid, kid) {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.deleteAccessKey({uid: uid, aid: aid, kid: kid}, {})
                                .then(function () {
                                    return true;
                                }).catch(handleRemoteResponse);
                        });
                },
                'getUserLastSource': function (uid) {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.getUserLastSource({uid: uid || -1}, {})
                                .then(function (result) {
                                    return result.obj;
                                }).catch(handleRemoteResponse);
                        });
                },
                'getUserSources': function () {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.getUserSources({uid: -1}, {})
                                .then(function (result) {
                                    return result.obj;
                                }).catch(handleRemoteResponse);
                        });
                },
                'getUser': function () {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.getUser({}, {})
                                .then(function (result) {
                                    return result.obj;
                                }).catch(handleRemoteResponse);
                        });
                },
                'listUsers': function () {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.listUsers({}, {})
                                .then(function (result) {
                                    return result.obj;
                                }).catch(handleRemoteResponse);
                        });
                },
                'toggleAccountDisabled': function (uid, aid, dis) {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.toggleAccountDisabled({uid: uid, aid: aid, disabled: dis}, {})
                                .then(function () {
                                    return true;
                                }).catch(handleRemoteResponse);
                        });
                },
                'checkDisabled': function (uid, aid) {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.isAccountDisabled({uid: uid, aid: aid}, {})
                                .then(function (result) {
                                    return result.obj.isDisabled;
                                }).catch(handleRemoteResponse);
                        });
                },
                'toggleActive': function (uid, active) {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.toggleActive({uid: uid, active: active}, {})
                                .then(function () {
                                    return true;
                                }).catch(handleRemoteResponse);
                        });
                },
                'checkAdmin': function () {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.checkAdmin({}, {})
                                .then(function (result) {
                                    return result.obj.isAdmin;
                                }).catch(handleRemoteResponse);
                        });
                },
                'becomeUser': function (uid) {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Authentication.becomeUser({uid: uid}, {})
                                .then(function () {
                                    return true;
                                }).catch(handleRemoteResponse);
                        });
                },
                'getCharEndpoints': function () {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.charEndpoints({}, {})
                                .then(function (result) {
                                    return result.obj;
                                }).catch(handleRemoteResponse);
                        });
                },
                'getCorpEndpoints': function () {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Account.corpEndpoints({}, {})
                                .then(function (result) {
                                    return result.obj;
                                }).catch(handleRemoteResponse);
                        });
                }
            };
        }]);

    /**
     * Service for managing sync credentials.
     */
    accountWS.factory('CredentialWSService', ['SwaggerService',
        function (SwaggerService) {
            return {
                'setESICredential': function (aid, scopes) {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Credential.setESICredential({aid: aid, scopes: scopes}, {})
                                .then(function (result) {
                                    return result.obj;
                                }).catch(handleRemoteResponse);
                        });
                },
                'clearESICredential': function (aid) {
                    return SwaggerService.getSwagger()
                        .then(function (swg) {
                            return swg.Credential.clearESICredential({aid: aid}, {})
                                .then(function (result) {
                                    return result.obj;
                                }).catch(handleRemoteResponse);
                        });
                }
            };
        }]);

    /**
     * Service to collect and periodically update user credentials.  Changes in credentials are broadcast as an event.
     */
    accountWS.factory('UserCredentialsService', ['$rootScope', '$timeout', 'AccountWSService',
        function ($rootScope, $timeout, AccountWSService) {
            var userInfo = null;
            var userSource = null;
            var update = function (user, source) {
                $rootScope.$apply(function () {
                    if (user) $rootScope.$broadcast('UserInfoChange', userInfo);
                    if (source) $rootScope.$broadcast('UserSourceChange', userSource);
                });
            };
            var updateUserCredentials = function () {
                AccountWSService.getUser().then(function (val) {
                    if (val != null) {
                        userInfo = val;
                        update(true, false);
                    }
                }).catch(function () {
                    // Reset user on any error
                    userInfo = null;
                    update(true, false);
                });
                AccountWSService.getUserLastSource().then(function (val) {
                    if (val != null) {
                        userSource = val;
                        update(false, true);
                    }
                }).catch(function () {
                    // Reset source on any error
                    userSource = null;
                    update(false, true);
                });
                $timeout(updateUserCredentials, 1000 * 60 * 3);
            };
            updateUserCredentials();
            return {
                'getUser': function () {
                    return userInfo;
                },
                'getUserSource': function () {
                    return userSource;
                }
            };
        }]);

})();
