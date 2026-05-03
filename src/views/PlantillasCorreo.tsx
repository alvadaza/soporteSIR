// src/views/PlantillasCorreo.tsx
import { useState, useRef, useEffect } from "react";
import data from "../data/plantillas_correo.json";
import "../style/PlantillasCA.css";

interface Plantilla {
  TIPO: string;
  CONTENIDO: string;
}

export default function PlantillasCorreo() {
  const [tipo, setTipo] = useState<string>("");
  const [contenido, setContenido] = useState<string>("");
  
const textareaRef = useRef<HTMLTextAreaElement>(null);
  const tiposUnicos: string[] = [
    ...new Set((data as Plantilla[]).map((d) => d.TIPO)),
  ];
useEffect(() => {
  const el = textareaRef.current;
  if (el) {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }
}, [contenido]);
  // 🔥 igual que en CA
  const handleTipoChange = (tipoSeleccionado: string) => {
    setTipo(tipoSeleccionado);

    const plantilla = (data as Plantilla[]).find(
      (d) => d.TIPO === tipoSeleccionado
    );

    setContenido(plantilla ? plantilla.CONTENIDO : "");
  };

  const copiar = () => {
    navigator.clipboard.writeText(contenido);
  };

  

  return (
    <div className="ca-container">
      
      {/* 🔹 SOLO FILTRO */}
      <div className="top-bar">
        <select
          value={tipo}
          onChange={(e) => handleTipoChange(e.target.value)}
        >
          <option value="">Selecciona tipo de correo</option>

          {tiposUnicos.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 CONTENIDO */}
      <div className="editor">

        <h2>Contenido</h2>

        <textarea
        value={contenido}
        readOnly
        rows={3}
        ref={textareaRef}
    />

        <button onClick={copiar}>
          Copiar contenido
        </button>

      </div>
    </div>
  );
}