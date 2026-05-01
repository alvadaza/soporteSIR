import { useEffect, useState } from "react";
import data from "../data/directorio.json";
import type { DirectorioItem } from "../types/directorio";
import "../style/Directorio.css";

export default function Directorio() {
  const [registros, setRegistros] = useState<DirectorioItem[]>([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<string>("");

  useEffect(() => {
    const jsonData: DirectorioItem[] = data;
    setRegistros(jsonData);
  }, []);

  const ciudades = [...new Set(registros.map(item => item.CIUDAD))].sort();

  const filtrados = ciudadSeleccionada
    ? registros.filter(item => item.CIUDAD === ciudadSeleccionada)
    : registros;

  return (
    <div className="directorio-container">
      <h1 className="title">Directorio</h1>

      <div className="filtro">
        <select
          value={ciudadSeleccionada}
          onChange={(e) => setCiudadSeleccionada(e.target.value)}
        >
          <option value="">Todas las ciudades</option>
          {ciudades.map((ciudad, index) => (
            <option key={ciudad + index} value={ciudad}>
              {ciudad}
            </option>
          ))}
        </select>
      </div>

      <div className="lista">
        {filtrados.map((item, index) => (
          <div key={`${item.CIUDAD}-${item.FUNCIONARIO}-${index}`} className="card">
            <h3>{item.FUNCIONARIO}</h3>
            <p><strong>Ciudad:</strong> {item.CIUDAD}</p>
            <p>
              <strong>Cargo:</strong>{" "}
              {item.CARGO && item.CARGO !== "N/A" ? item.CARGO : "Sin cargo"}
            </p>
            <p><strong>Tel:</strong> {item.TELEFONO}</p>
          </div>
        ))}
      </div>
    </div>
  );
}