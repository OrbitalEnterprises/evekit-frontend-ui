/* EveKit MarketData Page Module */
(function(){
  var eveKitMD = angular.module('eveKitMarketData', ['ngRoute', 'eveKitModeServices', 'eveKitDialog', 'eveKitRemoteServices', 'eveKitAdminWS', 'eveKitSDE']);

  eveKitMD.controller('MDIntroCtrl',
      ['$scope', '$routeParams', '$sce', 'ToolModeService',
       function($scope, $routeParams, $sce, ToolModeService) {
        ToolModeService.refresh(MODE_MKDATA);
        $scope.sectionName = "MarketData : Intro";
      }]);

  eveKitMD.controller('MDUICtrl',
      ['$scope', '$routeParams', '$sce', 'ToolModeService',
       function($scope, $routeParams, $sce, ToolModeService) {
        ToolModeService.refresh(MODE_MKDATA);
        $scope.sectionName = "MarketData : Swagger UI";
        var baseUrl = "vendor/swagger-ui-2.1.4/swagger-marketdata.html?url=https://evekit-market.orbital.enterprises//swagger";
        $scope.urlExtra = $sce.trustAsResourceUrl(baseUrl);
      }]);

  // Market Data Viewer Demo

  // Extract search params.  "$location" requires html5 mode which we
  // can't switch to quite yet.  Doesn't handle multi-valued keys.
  function ekGetSearchParams() {
    var result = {};
    var searchParams = window.location.href.split('?');
    if (searchParams && searchParams.length > 1) {
      var vals = searchParams[1].split('&');
      for (var i = 0; i < vals.length; i++) {
        var next = vals[i].split('=');
        var key = next[0];
        var val = decodeURIComponent(next[1].replace(/\+/g,' '));
        result[key] = val;
      }
    }
    return result;
  }
  // Fixed element selectors
  var select_region_input, select_type_input, select_date_input, select_time_input, market_history_graph;
  // Initial d3 margin settings.  These get reset based on the available size of the container
  var d3margin = {top: 20, right: 40, bottom: 80, left: 100},
    d3width = 960 - d3margin.left - d3margin.right,
    d3height = 500 - d3margin.top - d3margin.bottom,
    d3height_volume = d3height/3;
  // market data history values for plotting
  var d3data = [];
  // EVE type autocompleter
  function typeRequester(client, term, cb) {
    // Query term uses SQL wildcards
    var queryTerm = '%' + term + '%';
    // Limit to 100 results for speed
    client.then(function(swg) {
      swg.Inventory.getTypes({maxresults: 100, typeName: '{like: "' + queryTerm + '"}', marketGroupID: '{start: 1, end: 1000000}'})
        .then(function(result) {
          cb(null, result.obj);
        }).catch(function(error) {
        cb(error);
      });
    });
  }
  // EVE region autocompleter
  function regionRequester(client, term, cb) {
    // Query term uses SQL wildcards
    var queryTerm = '%' + term + '%';
    // Limit to 100 results for speed
    client.then(function(swg) {
      swg.Map.getRegions({maxresults: 500, regionName: '{like: "' + queryTerm + '"}'})
        .then(function (result) {
          cb(null, result.obj);
        }).catch(function (error) {
        cb(error);
      });
    });
  }
  // Return a region object by name, possibly looking up from the SDE
  function regionLookup(client, regionName, cache, cb) {
    if (cache[regionName]) cb(null, cache[regionName]);
    else regionRequester(client, regionName, function(err, result) {
      if (err) cb(err);
      else {
        for(var i = 0; i < result.length; i++) {
          if (result[i].regionName == regionName) {
            cache[regionName] = result[i];
            cb(null, result[i]);
            return;
          }
        }
        cb(new Error(("Region not found: " + regionName)));
      }
    });
  }
  // Return a type object by name, possibly looking up from the SDE
  function typeLookup(client, typeName, cache, cb) {
    if (cache[typeName]) cb(null, cache[typeName]);
    else typeRequester(client, typeName, function(err, result) {
      if (err) cb(err);
      else {
        for(var i = 0; i < result.length; i++) {
          if (result[i].typeName == typeName) {
            cache[typeName] = result[i];
            cb(null, result[i]);
            return;
          }
        }
        cb(new Error(("Market type not found: " + typeName)));
      }
    });
  }
  // Render market history
  function redrawMarketHistory() {
    d3.select("#market-price-graph").remove();
    var cWidth = market_history_graph.width();
    var cHeight = market_history_graph.height();
    d3width = cWidth - d3margin.left - d3margin.right;
    d3height = cHeight - d3margin.top - d3margin.bottom;
    d3height_volume = d3height/3;
    d3.select("#market-history-graph")
      .append("svg")
      .attr('id', 'market-price-graph')
      .style('padding-left', '80px')
      .style('padding-top', '10px')
      .attr("width", d3width + d3margin.left + d3margin.right)
      .attr("height", d3height + d3margin.top + d3margin.bottom)
      .append("g")
      .attr("transform", "translate(" + d3margin.left + "," + d3margin.top + ")");
    // Short circuit if no data to render
    if (d3data.length == 0) return;
    // Render market history
    var svg = d3.select('#market-price-graph');
    var x = d3.scaleTime()
      .range([0, d3width]);
    var y = d3.scaleLinear()
      .range([d3height, 0]);
    var y_v = d3.scaleLinear()
      .range([d3height_volume, 0]);
    var line = d3.line()
      .x(function(d) { return x(new Date(d.date)); })
      .y(function(d) { return y(d.avgPrice); });
    var area = d3.area()
      .x(function(d) { return x(new Date(d.date)); })
      .y0(function(d) { return y(d.highPrice); })
      .y1(function(d) { return y(d.lowPrice); });
    // X dimension set my min/max date.  Y dimension set by lowest price and highest price.
    x.domain(d3.extent(d3data, function(d) { return new Date(d.date); }));
    y.domain([d3.min(d3data, function(d) { return d.lowPrice; }) * 0.8,
              d3.max(d3data, function(d) { return d.highPrice; }) * 1.2]);
    y_v.domain([0, d3.max(d3data, function(d) { return d.volume; })]);
    // X axis is rendered day.  Y axes are price and volume
    var x_axis = d3.axisBottom(x).ticks(d3.timeHour.every(24)).tickFormat(d3.timeFormat("%Y-%m-%d"));
    var y_axis = d3.axisLeft(y).tickFormat(d3.format('.3s'));
    var y_axis_v = d3.axisRight(y_v).tickFormat(d3.format('.3s'));
    // Draw axes
    svg.append("g")
      .attr("class", "ekmd_axis ekmd_axis--y")
      .attr("transform", "translate(-6, 0)")
      .call(y_axis)
      .append("text")
      .attr("class", "ekmd_axis-title")
      .attr("y", d3height)
      .attr("dy", "2em")
      .style("text-anchor", "end")
      .text("Price (ISK)");
    svg.append("g")
      .attr("class", "ekmd_axis ekmd_axis--x")
      .attr("transform", "translate(0," + d3height + ")")
      .call(x_axis)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");
    svg.append("g")
      .attr("class", "ekmd_axis ekmd_axis--y")
      .attr("transform", "translate(" + (d3width + 9) + ", " + (d3height - d3height_volume) + ")")
      .call(y_axis_v)
      .append("text")
      .attr("class", "ekmd_axis-title")
      .attr("y", d3height_volume)
      .attr("dy", "2em")
      .style("text-anchor", "start")
      .text("Volume");
    // Display area first
    svg.append("path")
      .datum(d3data)
      .attr("transform", "translate(4, 0)")
      .attr("class", "ekmd_area")
      .attr("d", area)
      .attr("fill-opacity", 0.5);
    // Then average price line
    svg.append("path")
      .datum(d3data)
      .attr("transform", "translate(4, 0)")
      .attr("class", "ekmd_line")
      .attr("d", line);
    // Then point markers for everything
    svg.selectAll(".point")
      .data(d3data)
      .enter()
      .append("circle")
      .attr("stroke", "white")
      .attr("fill", function() { return "white" })
      .attr("cx", function(d) { return x(new Date(d.date)) + 4; })
      .attr("cy", function(d) { return y(d.avgPrice); })
      .attr("r", function() { return 2 });
    svg.selectAll(".point")
      .data(d3data)
      .enter()
      .append("circle")
      .attr("stroke", "white")
      .attr("fill", function() { return "white" })
      .attr("cx", function(d) { return x(new Date(d.date)) + 4; })
      .attr("cy", function(d) { return y(d.lowPrice); })
      .attr("r", function() { return 2 });
    svg.selectAll(".point")
      .data(d3data)
      .enter()
      .append("circle")
      .attr("stroke", "white")
      .attr("fill", function() { return "white" })
      .attr("cx", function(d) { return x(new Date(d.date)) + 4; })
      .attr("cy", function(d) { return y(d.highPrice); })
      .attr("r", function() { return 2 });
    // Add volume bars below
    svg.selectAll(".ekmd_bar")
      .data(d3data)
      .enter()
      .append("rect")
      .attr("class", "ekmd_bar")
      .attr("fill-opacity", 0.5)
      .attr("x", function(d) { return x(new Date(d.date)); })
      .attr("width", 8)
      .attr("y", function(d) { return (d3height - d3height_volume) + y_v(d.volume); })
      .attr("height", function(d) { return d3height_volume - y_v(d.volume); });
  }
  // Swagger config for market data service
  var marketUrl = 'https://evekit-market.orbital.enterprises/swagger';
  // Main controller for market display
  eveKitMD.controller('MDBookCtrl',
    ['$scope', '$sce', '$timeout', '$q', 'SwaggerService', 'AdminWSService', 'SDEReleases', 'DialogService', 'ToolModeService',
      function($scope, $sce, $timeout, $q, SwaggerService, AdminWSService, SDEReleases, DialogService, ToolModeService) {
        // Orientation
        ToolModeService.refresh(MODE_MKDATA);
        $scope.sectionName = "MarketData : Market Viewer";
        // Swagger clients
        $scope.sdeClient = null;
        $scope.marketClient = null;
        $scope.regionCache = {};
        $scope.typeCache = {};
        $scope.bidOrders = [];
        $scope.askOrders = [];
        $scope.bookTime = 0;
        $scope.showGraph = true;
        $scope.printTime = function(dt) { return (new Date(dt)).toISOString(); };
        // Region auto-completer
        function regionCompleter(request, response) {
          regionRequester($scope.sdeClient, request.term, function (err, resultList) {
            if (err) {
              console.error("Failed to complete region: " + err);
              response([]);
            } else {
              var choices = [];
              for (var i = 0; i < resultList.length; i++) {
                $scope.regionCache[resultList[i].regionName] = resultList[i];
                choices.push(resultList[i].regionName);
              }
              response(choices);
            }
          });
        }
        // Type auto-completer
        function typeCompleter(request, response) {
          typeRequester($scope.sdeClient, request.term, function (err, resultList) {
            if (err) {
              console.error("Failed to complete type: " + err);
              response([]);
            } else {
              var choices = [];
              for (var i = 0; i < resultList.length; i++) {
                $scope.typeCache[resultList[i].typeName] = resultList[i];
                choices.push(resultList[i].typeName);
              }
              response(choices);
            }
          });
        }
        // Called after appropriate swagger clients are available
        function setup() {
          // Cache jquery selectors
          select_region_input = $( "#select-region-input" );
          select_type_input = $( "#select-type-input" );
          select_date_input = $('#select-date-input');
          select_time_input = $('#select-time-input');
          market_history_graph = $("#market-history-graph");
          // Prepare auto complete
          select_region_input.autocomplete({ source: regionCompleter });
          select_type_input.autocomplete({ source: typeCompleter });
          // Prepare date and time pickers
          select_date_input.datepicker({dateFormat: 'yy-mm-dd', minDate: '2015-04-01'});
          select_time_input.timepicker({show2400: true, timeFormat: 'H:i', step: 5, useSelect: true, className: 'form-control'});
          // Prepare market history graph area
          redrawMarketHistory();
          // Redraw on resizes
          $( window ).resize(function() {
            redrawMarketHistory();
          });
          // Set defaults for selectors unless these are set in the url:
          // region = forge
          // type = tritanium
          // date = today (UTC)
          // time = now (UTC)
          var search = ekGetSearchParams();
          var sample = new Date();
          var now = new Date(search['time'] || Date.now() + sample.getTimezoneOffset() * 60 * 1000);
          select_date_input.datepicker('setDate', now);
          select_time_input.timepicker('setTime', now);
          select_region_input.val(search['region'] || 'The Forge');
          select_type_input.val(search['type'] || 'Tritanium');
          $scope.loadData();
        }
        // Map a station ID to a promise which will resolve to the station name
        var stationCache = {};
        function mapStation(stationID) {
          return $q(function(resolve, reject) {
              $scope.sdeClient.then(function (swg) {
                swg.Station.getStations({stationID: '{values: [' + stationID + ']}'})
                  .then(function (result) {
                    resolve(result.obj[0].stationName);
                  })
                  .catch(function () {
                    reject("NOT FOUND");
                  });
              });
          });
        }
        // Update all given locationIDs with the appropriate location names
        function subLocations(orderSet, stationID, stationName) {
          for (var i = 0; i < orderSet.length; i++) {
            if (orderSet[i].locationID == stationID) {
              orderSet[i].locationName = stationName;
            }
          }
        }
        // Resolve locationIDs in the given set
        function updateLocations(resolveSet) {
          angular.forEach(resolveSet, function(value, key) {
            if (stationCache[key]) {
              subLocations($scope.bidOrders, key, stationCache[key]);
              subLocations($scope.askOrders, key, stationCache[key]);
            } else {
              mapStation(key).then(function(val) {
                stationCache[key] = val;
                subLocations($scope.bidOrders, key, val);
                subLocations($scope.askOrders, key, val);
              });
            }
          });
        }
        // Load and display book
        function displayBookData(regionID, typeID, timestamp, cb) {
          $scope.marketClient.then(function(client) {
            client.MarketData.book({typeID: typeID, regionID: regionID, date: timestamp})
              .then(function(bookData) {
                bookData = bookData.obj;
                $scope.bidOrders = [];
                $scope.askOrders = [];
                $scope.bookTime = bookData.bookTime;
                $scope.$apply(function() {
                  var resolveSet = {};
                  for (var i = 0; i < bookData.orders.length; i++) {
                    bookData.orders[i].locationName = 'RESOLVING';
                    resolveSet[bookData.orders[i].locationID] = true;
                    if (bookData.orders[i].buy)
                      $scope.bidOrders.push(bookData.orders[i]);
                    else
                      $scope.askOrders.push(bookData.orders[i]);
                  }
                  updateLocations(resolveSet);
                  if (cb) cb(null);
                });
              })
              .catch(function(err) {
                DialogService.simpleErrorMessage("No book data found for the given type, region and date.", 30);
                if (cb) cb(err);
              });
          });
        }
        // Load and display market history
        function displayMarketHistory(regionID, typeID, timestamp, cb) {
          // Retrieve last 90 days of market history from selected timestamp
          var mkdataP = [];
          for (var i = 0; i < 90; i++) {
            var nextPromise = (function(nextTime) {
              return $q(function (resolve) {
                $scope.marketClient.then(function (client) {
                  client.MarketData.history({typeID: typeID, regionID: regionID, date: nextTime})
                    .then(function (historyData) {
                      resolve(historyData.obj);
                    })
                    .catch(function () {
                      // 404 ends up here, treat as missing data
                      resolve(null);
                    });
                });
              });
            })(timestamp - (i * 24 * 60 * 60 * 1000));
            mkdataP.push(nextPromise);
          }
          // Proceed with update when all market history requests have completed
          $q.all(mkdataP)
            .then(function(resultArray) {
              d3data = [];
              for (var i = 0; i < resultArray.length; i++) {
                if (resultArray[i] != null) {
                  d3data.push(resultArray[i]);
                }
              }
              redrawMarketHistory();
              if (cb) cb(null);
            });
        }
        // Load data and refresh display
        $scope.loadData = function() {
          // Retrieve settings
          var regionName = select_region_input.val();
          var typeName = select_type_input.val();
          var regionID, typeID, fetchTime;
          fetchTime = select_time_input.timepicker('getTime', select_date_input.datepicker('getDate'));
          fetchTime = new Date(fetchTime.getTime() - fetchTime.getTimezoneOffset() * 60 * 1000);
          var loadingMsg = DialogService.simpleInfoMessage("Loading data...", 30);
            // Resolve region
          regionLookup($scope.sdeClient, regionName, $scope.regionCache,
            function(err, regionInfo) {
              if (err) {
                DialogService.simpleErrorMessage("Error resolving region '" + regionName + "'.  Please re-enter and try again.",
                  30);
              } else {
                regionID = regionInfo;
                // Resolve type
                typeLookup($scope.sdeClient, typeName, $scope.typeCache,
                  function(err, typeInfo) {
                    if (err) {
                      DialogService.simpleErrorMessage("Error resolving type '" + typeName + "'.  Please re-enter and try again.",
                        30);
                    } else {
                      typeID = typeInfo;
                      // Load and display book and history
                      displayBookData(regionID['regionID'], typeID['typeID'], fetchTime.getTime(), function(err) {
                        if (err) {
                          DialogService.removeMessage(loadingMsg);
                          DialogService.simpleErrorMessage("Failed to load book data with error: " + err, 30);
                        } else {
                          displayMarketHistory(regionID['regionID'], typeID['typeID'], fetchTime.getTime(), function(err) {
                            DialogService.removeMessage(loadingMsg);
                            if (err) {
                              DialogService.simpleErrorMessage("Failed to load market history with error: " + err, 30);
                            }
                          });
                        }
                      });
                    }
                  });
              }
            });
        };
        // Create swagger clients and call the setup function
        SDEReleases.getLatestRelease()
          .then(function(result) {
            $scope.sdeClient = SwaggerService.getSwagger(result.model);
            $scope.marketClient = SwaggerService.getSwagger(marketUrl);
            $scope.$apply(function () {
              setup();
            });
          }).catch(function(error) {
          log.error("Failed to retrieve latest release: " + error);
        });
      }]);

})();
