// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  platformServiceApiBasePath: 'http://localhost:8888/api',
  sdeServiceApiBasePath: 'http://localhost:8080/evekit-sde/api/ws/v20190529',
  modelServiceApiBasePath: 'http://localhost:8080/evekit-model/api',
  modelViewURL: 'http://localhost:8080/evekit-model/api/swagger.json',
  marketViewURL: 'https://evekit-market.orbital.enterprises/swagger',
  refViewURL: 'http://localhost:8080/evekit-ref-model/api/swagger.json',
  externalDocsURL: 'https://evekit-documentation.readthedocs.io/en/latest/index.html'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
