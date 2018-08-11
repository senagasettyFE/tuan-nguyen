// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiUrl: '',
  mockToken: '',
  // tslint:disable-next-line:max-line-length
  ssoLoginUrl: 'https://sso-test.cbre.com/adfs/oauth2/authorize?response_type=code&response_mode=query&client_id=309AA0AC-3135-4470-AA55-B715DFAC65E8&redirect_uri=https://qa.execdashboard.cbre.com/adfs-callback/&resource=https://qa.execdashboard.cbre.com/adfs-callback/&state=https://qa.execdashboard.cbre.com/',
  ssoCallbackUrl: 'https://qa.execdashboard.cbre.com/adfs-callback/',
  graphqlUrl: ''
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
