// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: '',
  mockToken: '',
  // tslint:disable-next-line:max-line-length
  ssoLoginUrl: 'https://sso-test.cbre.com/adfs/oauth2/authorize?response_type=code&response_mode=query&client_id=9CF1EE58-744E-44C3-9F00-88774F1E39DD&redirect_uri=https://local.execdashboard.cbre.com/adfs-callback/&resource=https://local.execdashboard.cbre.com/adfs-callback/&state=https://local.execdashboard.cbre.com/',
  ssoCallbackUrl: 'https://local.execdashboard.cbre.com/adfs-callback/',
  graphqlUrl: 'https://localhost:10443'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
