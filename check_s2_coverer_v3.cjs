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

    const cellIds = coverer.covering(rect);

    if (cellIds.length > 0) {
        const id = cellIds[0]; // bigint
        console.log("ID:", id);

        // Convert to token
        const token = s2.cellid.toToken(id);
        console.log("Token:", token);

        // Get Cell
        const cell = s2.Cell.fromCellID(id);
        console.log("Cell:", cell);

        // Get vertices
        for (let i = 0; i < 4; i++) {
            const v = cell.vertex(i);
            const vLatLng = s2.LatLng.fromPoint(v);
            console.log(`Vertex ${i}:`, vLatLng.lat, vLatLng.lng);
        }
    }

} catch (e) {
    console.error("Error:", e);
}
