// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const BASE_URL = 'http://localhost:3000/api';

export const environment = {
  production: false,
  API: {
    auth: `${BASE_URL}/auth`,
    movie: `${BASE_URL}/movies`,
    movieBanner: `${BASE_URL}/movie-banners`,
    news: `${BASE_URL}/news`,
    session: `${BASE_URL}/sessions`,
    ticket: `${BASE_URL}/tickets`,
    hall: `${BASE_URL}/halls`,
    image: `${BASE_URL}/images`,
    users: `${BASE_URL}/users`,
    bonuses: `${BASE_URL}/bonuses`,
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
