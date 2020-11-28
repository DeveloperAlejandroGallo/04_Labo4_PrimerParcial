// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlPaises: 'https://restcountries.eu/rest/v2/region/americas',
  firebase: {
    apiKey: "AIzaSyAskg6gscscFwNwn2aMB1oA9nhITjFQ_bE",
    authDomain: "labo4-primer-parcial.firebaseapp.com",
    databaseURL: "https://labo4-primer-parcial.firebaseio.com",
    projectId: "labo4-primer-parcial",
    storageBucket: "labo4-primer-parcial.appspot.com",
    messagingSenderId: "431228817673",
    appId: "1:431228817673:web:ea605e5751fc107afa83d8"
  },
 // urlVerify:"http://localhost:4200/"
  urlVerify:"https://labo4-primer-parcial.web.app/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
