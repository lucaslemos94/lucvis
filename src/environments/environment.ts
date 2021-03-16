// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
   //HOST_PORT : 'bolt://192.168.0.46:7687',
   // HOST_PORT : 'bolt://162.214.89.195:7687',
   production: false,
   HOST_PORT : 'bolt://162.214.89.195:7687',
   USER : 'neo4j',
   PASSWORD : 'scisynergy',
   year:{
      from:1973,
      to: 2021
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
