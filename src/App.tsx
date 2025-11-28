import { useState } from 'react';
import S2Map from './components/Map/S2Map';
import ControlPanel from './components/UI/ControlPanel';
import type { S2CellInfo } from './utils/s2Utils';

function App() {
  const [level, setLevel] = useState<number>(13);
  const [hoveredCell, setHoveredCell] = useState<S2CellInfo | null>(null);
  const [mousePos, setMousePos] = useState<{ lat: number; lng: number } | null>(null);

  console.log('App rendering, level:', level);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <S2Map
        level={level}
        hoveredCell={hoveredCell}
        setHoveredCell={setHoveredCell}
        setMousePos={setMousePos}
      />
      <ControlPanel
        level={level}
        setLevel={setLevel}
        hoveredCell={hoveredCell}
        mousePos={mousePos}
      />
    </div>
  );
}

export default App;
