// src/views/PlantillasaErrores.tsx
import { useState, useMemo, useRef, useEffect } from "react";
import data from "../data/PlantillasErroreComunes.json";
import "../style/PlantillasCaErrores.css";

interface Plantilla {
  TIPO: string;
  CONTENIDO: string;
}

export default function PlantillasaErrores() {
  const [plantillas] = useState<Plantilla[]>(data);
  const [seleccionada, setSeleccionada] = useState<Plantilla | null>(null);
  const [contenido, setContenido] = useState<string>("");
  const [busqueda, setBusqueda] = useState<string>("");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // 🔥 FILTRO + BUSCADOR
  const filtradas = useMemo(() => {
    return plantillas.filter((p) => {
      const texto = busqueda.toLowerCase();
      return (
        p.TIPO.toLowerCase().includes(texto) ||
        p.CONTENIDO.toLowerCase().includes(texto)
      );
    });
  }, [plantillas, busqueda]);

  // auto resize
  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  // seleccionar
  const handleSelect = (item: Plantilla) => {
    setSeleccionada(item);
    setContenido(item.CONTENIDO);
  };

  // editar
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContenido(e.target.value);
  };

  useEffect(() => {
    autoResize();
  }, [contenido]);

  return (
    <div className="correo-container">

      {/* 🔹 SIDEBAR */}
      <div className="sidebar">
        <h3>Plantillas</h3>

        {/* 🔍 BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar error..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador"
        />

        {/* LISTA */}
       {busqueda.trim() !== "" && (
  <>
    {filtradas.map((item, index) => (
      <div
        key={index}
        className={`item ${
          seleccionada?.TIPO === item.TIPO ? "active" : ""
        }`}
        onClick={() => handleSelect(item)}
      >
        {item.TIPO}
      </div>
    ))}

    {filtradas.length === 0 && (
      <p className="sin-resultados">No se encontraron resultados</p>
    )}
  </>
)}
      </div>

      {/* 🔹 CONTENIDO */}
      <div className="contenido">
        <h2>{seleccionada?.TIPO || "Selecciona una plantilla"}</h2>

        <textarea
          ref={textareaRef}
          value={contenido}
          onChange={handleChange}
          placeholder="Aquí aparecerá el contenido..."
        />

        <button onClick={() => navigator.clipboard.writeText(contenido)}>
          Copiar contenido
        </button>
      </div>

    </div>
  );
}