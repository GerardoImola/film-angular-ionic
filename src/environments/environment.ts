// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { FirebaseConfig } from "src/app/interfaces/firebase.interface";



export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCnqeYa6VD17ypSBBRDpVN_ZwhtP1v2vf0",
    authDomain: "film-ionic-angular.firebaseapp.com",
    projectId: "film-ionic-angular",
    storageBucket: "film-ionic-angular.appspot.com",
    messagingSenderId: "530326566193",
    appId: "1:530326566193:web:8efa8cd34831ecde76ec10",
    measurementId: "G-M819161WGD"
  } as FirebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
