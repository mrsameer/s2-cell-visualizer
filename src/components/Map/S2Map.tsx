import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getCellFromPoint, getCellsInBounds, type S2CellInfo } from '../../utils/s2Utils';
import L from 'leaflet';

// Fix Leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface S2MapProps {
    level: number;
    hoveredCell: S2CellInfo | null;
    setHoveredCell: (cell: S2CellInfo | null) => void;
    setMousePos: (pos: { lat: number; lng: number }) => void;
}

const MapEvents: React.FC<S2MapProps & { setVisibleCells: (cells: S2CellInfo[]) => void }> = ({ level, setHoveredCell, setMousePos, setVisibleCells }) => {
    const map = useMap();

    const updateCells = () => {
        const bounds = map.getBounds();
        const cells = getCellsInBounds(bounds, level);
        setVisibleCells(cells);
    };

    useEffect(() => {
        updateCells();
    }, [level, map]);

    useMapEvents({
        moveend: updateCells,
        zoomend: updateCells,
        mousemove(e) {
            setMousePos(e.latlng);
            // Calculate cell under mouse
            try {
                const cell = getCellFromPoint(e.latlng.lat, e.latlng.lng, level);
                setHoveredCell(cell);
            } catch (err) {
                console.error("Error getting cell", err);
                setHoveredCell(null);
            }
        },
        mouseout() {
            setHoveredCell(null);
        }
    });
    return null;
};

const CellRenderer: React.FC<{ cells: S2CellInfo[]; hoveredCell: S2CellInfo | null }> = ({ cells, hoveredCell }) => {
    return (
        <>
            {cells.map((cell) => {
                const isHovered = hoveredCell?.id === cell.id;
                return (
                    <Polygon
                        key={cell.id}
                        positions={cell.polygon}
                        pathOptions={{
                            color: isHovered ? '#60a5fa' : '#3b82f6', // Blue-400 : Blue-500
                            fillColor: isHovered ? '#60a5fa' : 'transparent',
                            fillOpacity: isHovered ? 0.2 : 0,
                            weight: isHovered ? 2 : 1,
                            opacity: 0.6
                        }}
                    />
                );
            })}
        </>
    );
};

const S2Map: React.FC<S2MapProps> = (props) => {
    const [visibleCells, setVisibleCells] = useState<S2CellInfo[]>([]);

    return (
        <div className="absolute inset-0 w-full h-full">
            <MapContainer
                center={[37.7749, -122.4194]} // San Francisco default
                zoom={13}
                style={{ height: '100%', width: '100%', background: '#0f172a' }} // Slate-900
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <MapEvents {...props} setVisibleCells={setVisibleCells} />
                <CellRenderer cells={visibleCells} hoveredCell={props.hoveredCell} />
            </MapContainer>
        </div>
    );
};

export default S2Map;
