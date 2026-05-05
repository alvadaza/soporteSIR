import { useEffect, useState } from "react";
import data from "../data/directorio.json";
import type { DirectorioItem } from "../types/directorio";
import "../style/Directorio.css";

export default function Directorio() {
  const [registros, setRegistros] = useState<DirectorioItem[]>([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    setRegistros(data);
  }, []);

  const ciudades = [...new Set(registros.map(i => i.CIUDAD))].sort();

  const filtrados = registros.filter(item => {
    const cumpleCiudad = ciudadSeleccionada
      ? item.CIUDAD === ciudadSeleccionada
      : true;

    const texto = `${item.FUNCIONARIO} ${item.CARGO} ${item.TELEFONO} ${item.CIUDAD}`.toLowerCase();

    const cumpleBusqueda = texto.includes(busqueda.toLowerCase());

    return cumpleCiudad && cumpleBusqueda;
  });

  return (
    <div className="directorio-container">
      <h1 className="title">Directorio</h1>

      {/* 🔥 FILTROS */}
      <div className="filtros-container">
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

        {/* 🔥 BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar funcionario, cargo, teléfono..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* 🔥 TABLA */}
      <div className="tabla-container">
        <table className="tabla">
          <thead>
            <tr>
              <th>Funcionario</th>
              <th>Ciudad</th>
              <th>Cargo</th>
              <th>Teléfono</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map((item, index) => (
              <tr key={index}>
                <td>{item.FUNCIONARIO}</td>
                <td>{item.CIUDAD}</td>
                <td>
                  {item.CARGO && item.CARGO !== "N/A"
                    ? item.CARGO
                    : "Sin cargo"}
                </td>
                <td>{item.TELEFONO}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtrados.length === 0 && (
          <p className="sin-resultados">No hay resultados</p>
        )}
      </div>
    </div>
  );
}