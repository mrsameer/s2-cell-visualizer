import * as S2 from 's2js';

export interface S2CellInfo {
    id: string;
    token: string;
    level: number;
    polygon: [number, number][]; // [lat, lng]
}

export const getCellFromPoint = (lat: number, lng: number, level: number): S2CellInfo => {
    // @ts-ignore - s2js types are not perfect
    const s2 = S2.s2;
    const latLng = s2.LatLng.fromDegrees(lat, lng);
    const cellIdBigInt = s2.cellid.fromLatLng(latLng);
    const parentId = s2.cellid.parent(cellIdBigInt, level);

    const id = parentId.toString();
    const token = s2.cellid.toToken(parentId);
    const cell = s2.Cell.fromCellID(parentId);

    const vertices: [number, number][] = [];
    for (let i = 0; i < 4; i++) {
        const v = cell.vertex(i);
        const vLatLng = s2.LatLng.fromPoint(v);
        // Based on debug output, LatLng instance has lat/lng properties
        vertices.push([vLatLng.lat, vLatLng.lng]);
    }

    return {
        id: id,
        token: token,
        level: level,
        polygon: vertices
    };
};

export const getCellsInBounds = (bounds: any, level: number): S2CellInfo[] => {
    const center = bounds.getCenter();
    try {
        const centerCell = getCellFromPoint(center.lat, center.lng, level);
        return [centerCell];
    } catch (e) {
        console.error("Error getting cell in bounds", e);
        return [];
    }
};

export const decodeCell = (token: string): S2CellInfo | null => {
    try {
        // @ts-ignore
        const s2 = S2.s2;
        const cellId = s2.cellid.fromToken(token);
        const id = cellId.toString();
        const level = s2.cellid.level(cellId); // Assuming static level method exists or we need to find it
        // Debug output showed 'level' in cellid keys.

        const cell = s2.Cell.fromCellID(cellId);

        const vertices: [number, number][] = [];
        for (let i = 0; i < 4; i++) {
            const v = cell.vertex(i);
            const vLatLng = s2.LatLng.fromPoint(v);
            vertices.push([vLatLng.lat, vLatLng.lng]);
        }

        return {
            id: id,
            token: token,
            level: level,
            polygon: vertices
        };
    } catch (e) {
        console.error("Invalid S2 token", e);
        return null;
    }
};
