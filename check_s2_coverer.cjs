const S2 = require('s2js');
const s2 = S2.s2;

try {
    // Create a rect from lat/lng
    // San Francisco area
    const lat1 = 37.70;
    const lng1 = -122.50;
    const lat2 = 37.80;
    const lng2 = -122.35;

    // Construct LatLngs
    const p1 = s2.LatLng.fromDegrees(lat1, lng1);
    const p2 = s2.LatLng.fromDegrees(lat2, lng2);

    // Create Rect
    // Assuming Rect.fromLatLngs or similar. Let's inspect Rect first.
    console.log("Rect keys:", Object.keys(s2.Rect));

    // Try to create a rect. Usually it's from pairs of intervals.
    // But maybe there is a helper.
    // Let's try fromLatLng
    const r1 = s2.Rect.fromLatLng(p1);
    const r2 = s2.Rect.fromLatLng(p2);
    const rect = r1.union(r2);

    console.log("Rect created:", rect);

    // Create Coverer
    const coverer = new s2.RegionCoverer();
    coverer.setMinLevel(13);
    coverer.setMaxLevel(13);
    coverer.setMaxCells(100);

    const covering = coverer.getCovering(rect);
    console.log("Covering size:", covering.length);
    if (covering.length > 0) {
        console.log("First cell ID:", covering[0].toString());
        console.log("First cell Token:", covering[0].toToken());
    }

} catch (e) {
    console.error("Error:", e);
}
