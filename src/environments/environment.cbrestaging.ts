// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiUrl: '',
  mockToken: '',
  // tslint:disable-next-line:max-line-length
  ssoLoginUrl: 'https://sso-test.cbre.com/adfs/oauth2/authorize?response_type=code&response_mode=query&client_id=30D4C30F-CFC1-449A-8881-79EE30290C6F&redirect_uri=https://staging.execdashboard.cbre.com/adfs-callback/&resource=https://staging.execdashboard.cbre.com/adfs-callback/&state=https://staging.execdashboard.cbre.com/',
  ssoCallbackUrl: 'https://staging.execdashboard.cbre.com/adfs-callback/',
  graphqlUrl: ''
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
