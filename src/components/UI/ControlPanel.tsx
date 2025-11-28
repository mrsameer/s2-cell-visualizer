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
        <div className="absolute top-4 left-4 z-[1000] w-80 flex flex-col gap-4 pointer-events-auto font-sans">
            {/* Main Controls */}
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-5 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Layers className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg tracking-tight">S2 Visualizer</h2>
                        <p className="text-xs text-slate-400">Google S2 Geometry</p>
                    </div>
                </div>

                <div className="space-y-5">
                    <div>
                        <div className="flex justify-between items-end mb-3">
                            <span className="text-sm font-medium text-slate-300">Cell Level</span>
                            <span className="font-mono text-xl font-bold text-blue-400">{level}</span>
                        </div>
                        <div className="relative h-6 flex items-center">
                            <input
                                type="range"
                                min="0"
                                max="30"
                                value={level}
                                onChange={(e) => setLevel(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                            />
                        </div>
                        <div className="flex justify-between text-[10px] uppercase tracking-wider text-slate-500 mt-2 font-medium">
                            <span>Global (0)</span>
                            <span>Micro (30)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Panel */}
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-5 text-white shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-300 border-b border-white/10 pb-2">
                    <Info className="w-4 h-4 text-blue-400" />
                    <span>Cell Details</span>
                </div>

                {hoveredCell ? (
                    <div className="space-y-3">
                        <div className="group">
                            <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Token</span>
                            <div className="font-mono text-green-400 text-base mt-0.5 select-all cursor-pointer hover:text-green-300 transition-colors">
                                {hoveredCell.token}
                            </div>
                        </div>
                        <div className="group">
                            <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Cell ID</span>
                            <div className="font-mono text-slate-300 text-xs mt-0.5 break-all select-all opacity-80 group-hover:opacity-100 transition-opacity" title={hoveredCell.id}>
                                {hoveredCell.id}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Level</span>
                                <div className="font-mono text-slate-200 mt-0.5">{hoveredCell.level}</div>
                            </div>
                            <div>
                                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Faces</span>
                                <div className="font-mono text-slate-200 mt-0.5">6</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-slate-500 italic text-center py-4 bg-slate-800/30 rounded-lg border border-dashed border-slate-700">
                        Hover over the map to inspect cells
                    </div>
                )}
            </div>

            {/* Mouse Position */}
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-3 text-white flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-medium text-slate-400">Cursor</span>
                </div>
                <div className="text-xs font-mono text-slate-300">
                    {mousePos ? (
                        <span className="tracking-tight">
                            {mousePos.lat.toFixed(5)}, {mousePos.lng.toFixed(5)}
                        </span>
                    ) : (
                        <span className="opacity-50">--.----, --.----</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
