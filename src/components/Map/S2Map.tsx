import React from 'react';
import { MapContainer, TileLayer, Polygon, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getCellFromPoint, type S2CellInfo } from '../../utils/s2Utils';
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

const MapEvents: React.FC<S2MapProps> = ({ level, setHoveredCell, setMousePos }) => {
    useMapEvents({
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

const CellRenderer: React.FC<{ hoveredCell: S2CellInfo | null }> = ({ hoveredCell }) => {
    if (!hoveredCell) return null;

    return (
        <Polygon
            positions={hoveredCell.polygon}
            pathOptions={{
                color: '#00ff00',        // Bright green border
                fillColor: '#00ff00',    // Bright green fill
                fillOpacity: 0.3,        // More visible fill
                weight: 3                // Thicker border
            }}
        />
    );
};

const S2Map: React.FC<S2MapProps> = (props) => {
    return (
        <div className="absolute inset-0 w-full h-full">
            <MapContainer
                center={[37.7749, -122.4194]} // San Francisco default
                zoom={13}
                style={{ height: '100%', width: '100%', background: '#1a1a1a' }}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <MapEvents {...props} />
                <CellRenderer hoveredCell={props.hoveredCell} />
            </MapContainer>
        </div>
    );
};

export default S2Map;
