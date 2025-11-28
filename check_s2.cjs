const S2 = require('s2js');
console.log(Object.keys(S2));
console.log(Object.keys(S2.s2));
if (S2.s2.RegionCoverer) {
    console.log("RegionCoverer found");
} else {
    console.log("RegionCoverer NOT found");
}
