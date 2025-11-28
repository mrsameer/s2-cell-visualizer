const S2 = require('s2js');
const s2 = S2.s2;
if (s2 && s2.cellid && s2.LatLng) {
    const latLng = s2.LatLng.fromDegrees(37.7749, -122.4194);
    console.log('LatLng created:', latLng);

    const cellId = s2.cellid.fromLatLng(latLng);
    console.log('CellID from LatLng:', cellId);
    console.log('Type of CellID:', typeof cellId);
    console.log('Is BigInt?', typeof cellId === 'bigint');

    if (typeof cellId === 'object') {
        console.log('CellID keys:', Object.keys(cellId));
        console.log('CellID prototype keys:', Object.keys(Object.getPrototypeOf(cellId)));

        if (cellId.parent) {
            console.log('Has parent method');
            try {
                const parent = cellId.parent(10);
                console.log('Parent(10):', parent);
            } catch (e) {
                console.log('Error calling parent:', e.message);
            }
        } else {
            console.log('No parent method on instance');
        }
    } else {
        // If it's a primitive, maybe we use static method?
        if (s2.cellid.parent) {
            console.log('s2.cellid.parent exists (static)');
            try {
                const parent = s2.cellid.parent(cellId, 10); // Guessing signature
                console.log('Static parent call result:', parent);
            } catch (e) {
                console.log('Error calling static parent:', e.message);
            }
        }
    }
}
