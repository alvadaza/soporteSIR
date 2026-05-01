// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoriasView from "./views/CategoriasView";
import PlantillasCA from "./views/PlantillasCA";
import PlantillasCorreo from "./views/PlantillasCorreo";
import Directorio from "./views/Directorio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategoriasView />} />
        <Route path="/plantillas" element={<PlantillasCA />} />
        <Route path="/plantillascorreo" element={<PlantillasCorreo />} />
        <Route path="/directorio" element={<Directorio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;