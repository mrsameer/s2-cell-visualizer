import * as S2 from 's2js';

export interface S2CellInfo {
    id: string;
    token: string;
    level: number;
    polygon: [number, number][]; // [lat, lng]
}

// Helper to convert radians to degrees
const toDegrees = (rad: number) => rad * (180 / Math.PI);

export const getCellFromPoint = (lat: number, lng: number, level: number): S2CellInfo => {
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
        // s2js returns radians, convert to degrees
        vertices.push([toDegrees(vLatLng.lat), toDegrees(vLatLng.lng)]);
    }

    return {
        id: id,
        token: token,
        level: level,
        polygon: vertices
    };
};

export const getCellsInBounds = (bounds: any, level: number): S2CellInfo[] => {
    try {
        const s2 = S2.s2;

        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();

        const p1 = s2.LatLng.fromDegrees(sw.lat, sw.lng);
        const p2 = s2.LatLng.fromDegrees(ne.lat, ne.lng);

        const r1 = s2.Rect.fromLatLng(p1);
        const r2 = s2.Rect.fromLatLng(p2);
        const rect = r1.union(r2);

        const coverer = new s2.RegionCoverer();
        coverer.minLevel = level;
        coverer.maxLevel = level;
        coverer.maxCells = 500; // Limit to prevent performance issues

        const cellIds = coverer.covering(rect);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return cellIds.map((cellId: any) => {
            const id = cellId.toString();
            const token = s2.cellid.toToken(cellId);
            const cell = s2.Cell.fromCellID(cellId);

            const vertices: [number, number][] = [];
            for (let i = 0; i < 4; i++) {
                const v = cell.vertex(i);
                const vLatLng = s2.LatLng.fromPoint(v);
                vertices.push([toDegrees(vLatLng.lat), toDegrees(vLatLng.lng)]);
            }

            return {
                id,
                token,
                level,
                polygon: vertices
            };
        });

    } catch (e) {
        console.error("Error getting cells in bounds", e);
        return [];
    }
};

export const decodeCell = (token: string): S2CellInfo | null => {
    try {
        const s2 = S2.s2;
        const cellId = s2.cellid.fromToken(token);
        const id = cellId.toString();
        const level = s2.cellid.level(cellId);

        const cell = s2.Cell.fromCellID(cellId);

        const vertices: [number, number][] = [];
        for (let i = 0; i < 4; i++) {
            const v = cell.vertex(i);
            const vLatLng = s2.LatLng.fromPoint(v);
            vertices.push([toDegrees(vLatLng.lat), toDegrees(vLatLng.lng)]);
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
