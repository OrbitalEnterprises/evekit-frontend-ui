/* EveKit Tableau Module */
(function(){
var eveKit = angular.module('eveKitTableau', [
  'ngResource', 'eveKitDialog', 'eveKitRemoteServices']);

/**
 * Service for retrieving build and version info.
 */
eveKit.factory('ReleaseService', ['SwaggerService',
  function(SwaggerService) {
    // Frontend swagger spec.  Substituted at build time.
    var rootAPI = "http://localhost:8080/evekit/api/swagger.json";
    return {
      'buildDate' : function() {
        return SwaggerService.getSwagger(rootAPI)
        .then(function (swg) {
          return swg.Release.buildDate({}, {})
          .then(function(result) {
            return result.status == 200 ? result.obj['buildDate'] : "";
          })
          .catch(function(error) {
            console.log(error);
            return "";
          });
        });
      },
      'version' : function() {
        return SwaggerService.getSwagger(rootAPI)
        .then(function (swg) {
          return swg.Release.version({}, {})
          .then(function(result) {
            return result.status == 200 ? result.obj['version'] : "";
          })
          .catch(function(error) {
            console.log(error);
            return "";
          });
        });
      }
    };
 }]);

/* Inband controller for setting the version for the page */
eveKit.controller('EveKitVersionCtrl', ['$scope', 'ReleaseService',
  function($scope, ReleaseService) {
    ReleaseService.buildDate().then(function (val) {
      $scope.$apply(function() {
        $scope.eveKitBuildDate = val;
      });
    });
    ReleaseService.version().then(function (val) {
      $scope.$apply(function() {
        $scope.eveKitVersion = val;
      });
    });
}]);

/* Inband controller for Tableau Web Data Connector. */
eveKit.controller('EveKitTableau',
    ['$scope', '$filter', 'SwaggerService',
     function($scope, $filter, SwaggerService) {
      // Init
      $scope.apiType = 'REFERENCE';
      $scope.apiKey = null;
      $scope.apiHash = null;
      $scope.contid = false;
      $scope.contidValue = -1;
      $scope.reverse = false;
      $scope.resultCount = 'ALL';
      $scope.resultCountValue = -1;
      $scope.apiClient = null;
      // Supported swagger URIs.  Substituted at build time.
      swgModelURI = "http://localhost:8080/evekit-model/api/swagger.json";
      swgRefURI = "http://localhost:8080/evekit-ref-model/api/swagger.json";
      swgSDEURI = "http://localhost:8080/evekit-sde/api/ws/v20171024/swagger.json";
      // Upgrade API groups based on selected api type
      $scope.apiGroups = [];
      $scope.changeAPIType = function(opt_cont) {
        var uri = null;
        switch ($scope.apiType) {
        case 'MODEL':
          uri = swgModelURI;
          break;
        case 'SDE':
          uri = swgSDEURI;
          break;
        case 'REFERENCE':
        default:
          uri = swgRefURI;
          break;
        }
        SwaggerService.getSwagger(uri).then(function (cl) {
          $scope.apiClient = cl;
          var groups = [];
          for (var api in cl.apis) {
            if (cl.apis.hasOwnProperty(api)) {
              if ($scope.apiType == 'MODEL' && (api == 'AccessKey' || api == 'Meta'))
                // TODO: we'll probably always skip AccessKey, but we may want to allow Meta in the future
                continue;
              var endpoints = [];
              for (var ep in cl.apis[api].apis) {
                if (cl.apis[api].apis.hasOwnProperty(ep)) {
                  var parameters = [];
                  for (var i = 0; i < cl.apis[api].apis[ep].parameters.length; i++) {
                    var nextParm = cl.apis[api].apis[ep].parameters[i];
                    // Standard parameters are configured elsewhere
                    if (nextParm.name != "at" &&
                        nextParm.name != "contid" &&
                        nextParm.name != "maxresults" &&
                        nextParm.name != "reverse" &&
                        nextParm.name != "accessKey" &&
                        nextParm.name != "accessCred") {
                      parameters.push({name: nextParm.name});
                    }
                  }
                  // Assemble endpoint schema
                  var sr = cl.apis[api].apis[ep].successResponse['200'];
                  var returnType = sr.definition.items['$ref'];
                  returnType = returnType.substr(returnType.lastIndexOf('/') + 1);
                  var schemaObject = sr.models[returnType].definition.properties;
                  var schema = [];
                  for (var prop in schemaObject) {
                    if (schemaObject.hasOwnProperty(prop)) {
                      var nextID = prop;
                      var nextType;
                      // Initial setting based on type
                      switch (schemaObject[prop].type) {
                      case 'integer':
                        nextType = tableau.dataTypeEnum.int;
                        break;
                      case 'number':
                        nextType = tableau.dataTypeEnum.float;
                        break;
                      case 'boolean':
                        nextType = tableau.dataTypeEnum.bool;
                        break;
                      case 'string':
                      default:
                        nextType = tableau.dataTypeEnum.string;
                      break;
                      }
                      // Capture datetime values by examining format
                      switch (schemaObject[prop].format) {
                      case 'date-time':
                        nextType = tableau.dataTypeEnum.datetime;
                        break;
                      default:
                        break;
                      }
                    }
                    schema.push({id: nextID, dataType: nextType});
                  }
                  // Save endpoint
                  endpoints.push({name: cl.apis[api].apis[ep].nickname, description: cl.apis[api].apis[ep].summary, parameters: parameters, schema: schema});
                }
              }
              // Save API group
              groups.push({ name: cl.apis[api].label, endpoints: endpoints});
            }
          }
          $scope.$apply(function() {
            // Reset group and endpoint selectors
            $scope.apiGroups = groups;
            $scope.selectedGroup = null;
            $scope.selectedEndpoint = null;
            $scope.availableParameters = [];
            $scope.chosenParameters = [];
            if (opt_cont) opt_cont();
          });
        });
      };
      $scope.selectedGroup = null;
      $scope.selectedEndpoint = null;
      $scope.changeAPIKey = function(val) {
        $scope.selectedKey = val;
      };
      $scope.changeAPIGroup = function(val) {
        $scope.selectedGroup = val;
        $scope.selectedEndpoint = null;
        $scope.availableParameters = [];
        $scope.chosenParameters = [];
      };
      $scope.changeAPIEndpoint = function(val) {
        $scope.selectedEndpoint = val;
        $scope.availableParameters = val.parameters.concat([]);
        $scope.chosenParameters = [];
      };
      $scope.toggleContinuation = function() {
        if ($scope.contid) $scope.contidValue = -1;
      };
      $scope.toggleResultCount = function() {
        if ($scope.resultCount == 'LIMITED') $scope.resultCountValue = -1;
      };
      $scope.selectedTimeQuery = 'LATEST';
      $scope.changeTimeQuery = function(val) {
        $scope.selectedTimeQuery = val;
        $scope.tqManual = '{ any: true }';
        now = new Date();
        $scope.tqSelect = $filter('date')(now, "yyyy-MM-dd'T'HH:mm:ss", "UTC");
        $scope.tqRangeFrom = $filter('date')(now, "yyyy-MM-dd'T'HH:mm:ss", "UTC");
        $scope.tqRangeTo = $filter('date')(new Date(now.getTime() + (24 * 60 * 60 * 1000)), "yyyy-MM-dd'T'HH:mm:ss", "UTC");
      };
      selectDateSetter = function(setter) {
        return function(dt) {
          $scope.$apply(function() {
            setter(dt);
          });
        };
      };
      $scope.pickSelectDate = function(val) {
        $('#tq-select-date').datepicker("dialog", new Date(), selectDateSetter(function (dt) { $scope.tqSelect = dt; }), {dateFormat: "yy-mm-dd'T00:00:00'"});
      };
      $scope.pickRangeFromDate = function(val) {
        $('#tq-range-from-date').datepicker("dialog", new Date(), selectDateSetter(function (dt) { $scope.tqRangeFrom = dt; }), {dateFormat: "yy-mm-dd'T00:00:00'"});
      };
      $scope.pickRangeToDate = function(val) {
        $('#tq-range-to-date').datepicker("dialog", new Date(), selectDateSetter(function (dt) { $scope.tqRangeTo = dt; }), {dateFormat: "yy-mm-dd'T00:00:00'"});
      };
      // Select a parameter for the next call
      $scope.addSelectedParam = function(p) {
        var i = $scope.availableParameters.indexOf(p);
        if (i != -1) {
          $scope.availableParameters.splice(i, 1);
          $scope.chosenParameters.push(p);
          p.queryStyle = 'ANY';
          p.rawValueString = '';
          p.startValue = '';
          p.endValue = '';
          p.textValue = '';
          p.manualValue = '{ any: true }';
        }
      };
      $scope.changeQueryStyle = function(p, style) {
        p.queryStyle = style;
      };
      $scope.removeParam = function(p) {
        var i = $scope.chosenParameters.indexOf(p);
        if (i != -1) {
          $scope.chosenParameters.splice(i, 1);
          $scope.availableParameters.push(p);
        }
      };
      // Test and submit buttons
      $scope.submitCall = function() {
        // Prepare connection data and submit
        var connectionObject = {};
        // Prepare schema data
        var cols = [];
        for (var i = 0; i < $scope.selectedEndpoint.schema.length; i++) {
          var next = $scope.selectedEndpoint.schema[i];
          cols.push({ id: next.id, alias: next.id, dataType: next.dataType });
        }
        var tableInfo = {
            id: $scope.selectedEndpoint.name,
            alias: $scope.selectedEndpoint.description,
            columns: cols
        };
        connectionObject.schema = $scope.selectedEndpoint.schema;
        connectionObject.tableInfo = tableInfo;
        // Prepare function name and arguments
        connectionObject.apiType = $scope.apiType;
        connectionObject.groupName = $scope.selectedGroup.name;
        connectionObject.endpointName = $scope.selectedEndpoint.name;
        var args = {};
        // Prepare time, continuation, maxresults, and reverse arguments
        connectionObject.timeQuery = $scope.selectedTimeQuery;
        if ($scope.apiType != 'SDE') {
          switch ($scope.selectedTimeQuery) {
          case 'SELECT':
            var dt = new Date($scope.tqSelect);
            args['at'] = "{values: [" + dt.getTime() + "]}";
            connectionObject.timeSelect = $scope.tqSelect;
            break;
          case 'RANGE':
            var startDt = new Date($scope.tqRangeFrom);
            var endDt = new Date($scope.tqRangeTo);
            args['at'] = "{start: " + startDt.getTime() + ", end: " + endDt.getTime() + "}";
            connectionObject.timeRangeFrom = $scope.tqRangeFrom;
            connectionObject.timeRangeTo = $scope.tqRangeTo;
            break;
          case 'MANUAL':
            args['at'] = "{values: [" + $scope.tqManual + "]}";
            connectionObject.timeManual = $scope.tqManual;
            break;
          case 'LATEST':
          default:
            break;
          }
        }
        connectionObject.cid = -1;
        if ($scope.contid) {
          var val = parseInt($scope.contidValue);
          if (val == NaN) val = -1;
          connectionObject.cid = val;
        }
        connectionObject.count = -1;
        if ($scope.resultCount == 'LIMITED') {
          var count = parseInt($scope.resultCountValue);
          if (count == NaN) count = -1;
          args['maxresults'] = count;
          connectionObject.count = count;
        }
        connectionObject.reverse = $scope.reverse;
        // Add access key arguments for model API
        if ($scope.apiType == 'MODEL') {
          args['accessKey'] = connectionObject.apiKey = $scope.apiKey;
          args['accessCred'] = connectionObject.apiHash = $scope.apiHash;
        }
        // Add any endpoint specific filters
        connectionObject.params = [];
        for (var i = 0; i < $scope.chosenParameters.length; i++) {
          var nextParm = $scope.chosenParameters[i];
          switch (nextParm.queryStyle) {
          case 'VALUES':
            args[nextParm.name] = "{values: [" + nextParm.rawValueString + "]}";
            connectionObject.params.push({name: nextParm.name, selector: 'VALUES', value: nextParm.rawValueString});
            break;
          case 'RANGE':
            args[nextParm.name] = "{start: " + nextParm.startValue + ", end: " + nextParm.endValue + "}";
            connectionObject.params.push({name: nextParm.name, selector: 'RANGE', startValue: nextParm.startValue, endValue: nextParm.endValue});
            break;
          case 'TEXT':
            args[nextParm.name] = "{like: \"" + nextParm.textValue + "\"}";
            connectionObject.params.push({name: nextParm.name, selector: 'TEXT', value: nextParm.textValue});
            break;
          case 'MANUAL':
            args[nextParm.name] = nextParm.manualValue;
            connectionObject.params.push({name: nextParm.name, selector: 'MANUAL', value: nextParm.manualValue});
            break;
          case 'ANY':
            // Don't bother adding to the connection object as this is the default for all calls.
          default:
            // This is the default, no parameter required
            break;
          }
        }
        connectionObject.args = args;
        // Submit data to tableau
        tableau.connectionData = JSON.stringify(connectionObject);
        tableau.connectionName = "EveKit Model Feed";
        tableau.submit();
      };
      // Setup tableau connector
      var myConnector = tableau.makeConnector();

      myConnector.getSchema = function (schemaCallback) {
        var connData = JSON.parse(tableau.connectionData);
        schemaCallback([connData['tableInfo']]);
      };

      myConnector.getData = function (table, doneCallback) {
        var connData = JSON.parse(tableau.connectionData);
        var limit = connData['count'];
        var uri = null;
        switch (connData['apiType']) {
        case 'MODEL':
          uri = swgModelURI;
          break;
        case 'SDE':
          uri = swgSDEURI;
          break;
        case 'REFERENCE':
          uri = swgRefURI;
        default:
          break;
        }
        var schema = connData['schema'];
        var reverse = connData['reverse'];
        var cid = connData['cid'];
        var resultRetriever = function() {
          SwaggerService.getSwagger(uri).then(function (cl) {
            var fn = cl[connData['groupName']][connData['endpointName']];
            var argSet = connData['args'];
            // Set contid as needed
            if (cid >= 0) {
              argSet['contid'] = cid;
            } else {
              delete argSet['contid'];
            }
            // Set limit as needed
            if (limit <= 0) {
              delete argSet['maxresults'];
            } else {
              argSet['maxresults'] = limit;
            }
            // Configure for reversed order as needed
            if (connData['apiType'] != 'SDE' && reverse) {
              argSet['reverse'] = true;
            } else {
              delete argSet['reverse'];
            }
            // Make call and store results into table
            var tableData = [];
            fn(argSet, {}).then(function(result) {
              var resultLength = result.obj.length;
              for (var i = 0; i < resultLength; i++) {
                var nextData = result.obj[i];
                var datum = {};
                for (var j = 0; j < schema.length; j++) {
                  // TODO - better handling of missing data?
                  datum[schema[j].id] = nextData[schema[j].id];
                }
                if (connData['apiType'] != 'SDE') {
                  // Continuation ID fields don't exist in the SDE
                  var nextCid = datum['cid'];
                  cid = reverse ? Math.min(cid, nextCid) : Math.max(cid, nextCid);
                }
                tableData.push(datum);
              }
              if (connData['apiType'] == 'SDE') {
                // In the SDE, result count is used for continuation.  Thus, the continuation counter always
                // advances according to the length of the result set.
                cid = cid + resultLength;
              }
              table.appendRows(tableData);
              if (resultLength < 1000 || limit == 1000) {
                // We're always finished when the result set is empty or we return fewer than the max allowed by EveKit
                doneCallback();
              } else {
                // Otherwise, we need to make at least one more call.
                if (limit > 0) limit -= 1000;
                resultRetriever();
              }
            });
          });
          // TODO - handle get service exception here!
        };
        resultRetriever();
      };
      tableau.registerConnector(myConnector);
      // Pre-initialize if connection data provided
      var safeGetConnectionData = function() {
        if (tableau.connectionData != undefined) {
          try {
            return JSON.parse(tableau.connectionData);
          } catch (e) {
            if (e instanceof SyntaxError)
              // Ignore - expected when connectionData isn't really initialized
              // We'll fall through below and return an empty object.
              ;
            else
              // Otherwise, we expected something parseable but didn't get that
              throw e;
          }
        }
        return {};
      };
      // The first function is called to make sure we set the API type before performing any swagger initialization.
      // The second function is called once we've auto-populated all the endpoint info for the selected API type.
      var presetAPIType = function() {
        var connData = safeGetConnectionData();
        if (connData['apiType']) $scope.apiType = connData['apiType'];
      };
      var postAPIInit = function() {
        var connData = safeGetConnectionData();
        // Pre-set group and endpoint if selected
        if (connData['groupName'] && connData['endpointName']) {
          initGroupAndEndpoint:
          for (var i = 0; i < $scope.apiGroups.length; i++) {
            if ($scope.apiGroups[i].name == connData['groupName']) {
              $scope.changeAPIGroup($scope.apiGroups[i]);
              for (var j = 0; j < $scope.selectedGroup.endpoints.length; j++) {
                if ($scope.selectedGroup.endpoints[j].name == connData['endpointName']) {
                  $scope.changeAPIEndpoint($scope.selectedGroup.endpoints[j]);
                  break initGroupAndEndpoint;
                }
              }
            }
          }
        }
        // Pre-set time selection
        if (connData['timeQuery']) {
          $scope.selectedTimeQuery = connData['timeQuery'];
          if (connData['timeSelect']) $scope.tqSelect = connData['timeSelect'];
          if (connData['timeManual']) $scope.tqManual = connData['timeManual'];
          if (connData['timeRangeFrom']) $scope.tqRangeFrom = connData['timeRangeFrom'];
          if (connData['timeRangeTo']) $scope.tqRangeTo = connData['timeRangeTo'];
        }
        // Pre-set reverse selection
        if (connData['reverse']) $scope.reverse = connData['reverse'] || false;
        // Pre-set maxresults
        if (connData['count']) {
          $scope.resultCountValue = parseInt(connData['count']);
          $scope.resultCount = $scope.resultCountValue > 0 ? 'LIMITED' : 'ALL';
        }
        // Pre-set continuation
        if (connData['cid']) {
          $scope.contidValue = parseInt(connData['cid']);
          $scope.contid = $scope.contidValue >= 0;
        }
        // Model specific init
        if ($scope.apiType == 'MODEL') {
          $scope.apiKey = connData['apiKey'] || null;
          $scope.apiHash = connData['apiHash'] || null;
        }
        // Parameters init
        if (connData['params']) {
          var parmList = connData['params'];
          for (var i = 0; i < parmList.length; i++) {
            findAndAdd:
            for (var j = 0; j < $scope.availableParameters.length; j++) {
              var next = $scope.availableParameters[j];
              if (next.name == parmList[i]['name']) {
                $scope.addSelectedParam(next);
                $scope.changeQueryStyle(next, parmList[i]['selector']);
                switch (parmList[i]['selector']) {
                case 'VALUES':
                  next.rawValueString = parmList[i]['value'];
                  break;
                case 'RANGE':
                  next.startValue = parmList[i]['startValue'];
                  next.endValue = parmList[i]['endValue'];
                  break;
                case 'TEXT':
                  next.textValue = parmList[i]['value'];
                  break;
                case 'MANUAL':
                  next.manualValue = parmList[i]['value'];
                  break;
                default:
                  break;
                }
                break findAndAdd;
              }
            }
          }
        }
      };
      // Initialize UI - set type prior to initialization if already provided
      presetAPIType();
      $scope.changeAPIType(postAPIInit);
    }]);

})();
