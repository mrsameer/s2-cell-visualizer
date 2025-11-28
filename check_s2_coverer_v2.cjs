const S2 = require('s2js');
const s2 = S2.s2;

try {
    const lat1 = 37.70;
    const lng1 = -122.50;
    const lat2 = 37.80;
    const lng2 = -122.35;

    const p1 = s2.LatLng.fromDegrees(lat1, lng1);
    const p2 = s2.LatLng.fromDegrees(lat2, lng2);

    const r1 = s2.Rect.fromLatLng(p1);
    const r2 = s2.Rect.fromLatLng(p2);
    const rect = r1.union(r2);

    const coverer = new s2.RegionCoverer();
    coverer.minLevel = 13;
    coverer.maxLevel = 13;
    coverer.maxCells = 500;

    console.log("Getting covering...");
    const cellIds = coverer.covering(rect);
    console.log("Covering size:", cellIds.length);

    if (cellIds.length > 0) {
        const firstId = cellIds[0];
        console.log("First cell ID type:", typeof firstId);
        console.log("First cell ID:", firstId.toString());
        // Check if it's a CellID object
        if (firstId.toToken) {
            console.log("First cell Token:", firstId.toToken());
        }
    }

} catch (e) {
    console.error("Error:", e);
}
