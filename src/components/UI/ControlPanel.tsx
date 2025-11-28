import React from 'react';
import { Layers, MapPin, Info } from 'lucide-react';
import type { S2CellInfo } from '../../utils/s2Utils';

interface ControlPanelProps {
    level: number;
    setLevel: (level: number) => void;
    hoveredCell: S2CellInfo | null;
    mousePos: { lat: number; lng: number } | null;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ level, setLevel, hoveredCell, mousePos }) => {
    return (
        <div className="absolute top-4 left-4 z-[1000] w-80 flex flex-col gap-4 pointer-events-auto">
            {/* Main Controls */}
            <div className="glass-panel rounded-xl p-4 text-white">
                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                    <Layers className="w-5 h-5 text-blue-400" />
                    <h2 className="font-semibold text-lg">S2 Visualizer</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-300">Level</span>
                            <span className="font-mono text-blue-300">{level}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="30"
                            value={level}
                            onChange={(e) => setLevel(parseInt(e.target.value))}
                            className="w-full cursor-pointer custom-range-slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0 (Global)</span>
                            <span>30 (cm)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Panel */}
            <div className="glass-panel rounded-xl p-4 text-white space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-300 border-b border-white/10 pb-2">
                    <Info className="w-4 h-4" />
                    <span>Cell Information</span>
                </div>

                {hoveredCell ? (
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Token</span>
                            <span className="font-mono text-green-300">{hoveredCell.token}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">ID</span>
                            <span className="font-mono text-xs text-gray-300 truncate max-w-[150px]" title={hoveredCell.id}>
                                {hoveredCell.id}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Level</span>
                            <span className="font-mono">{hoveredCell.level}</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-gray-500 italic text-center py-2">
                        Hover over the map to see cell details
                    </div>
                )}
            </div>

            {/* Mouse Position */}
            <div className="glass-panel rounded-xl p-3 text-white flex items-center gap-3">
                <MapPin className="w-4 h-4 text-red-400" />
                <div className="text-xs font-mono text-gray-300">
                    {mousePos ? (
                        <>
                            <div>{mousePos.lat.toFixed(6)}, {mousePos.lng.toFixed(6)}</div>
                        </>
                    ) : (
                        <span>--.----, --.----</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
