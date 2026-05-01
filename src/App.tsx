// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoriasView from "./views/CategoriasView";
import PlantillasCA from "./views/PlantillasCA";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategoriasView />} />
        <Route path="/plantillas" element={<PlantillasCA />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;