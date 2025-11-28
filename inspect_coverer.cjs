const S2 = require('s2js');
const s2 = S2.s2;

const coverer = new s2.RegionCoverer();
console.log("Coverer keys:", Object.keys(coverer));
console.log("Coverer prototype keys:", Object.getOwnPropertyNames(Object.getPrototypeOf(coverer)));
