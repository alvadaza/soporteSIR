// src/views/PlantillasCA.tsx
import { useState } from "react";
import data from "../data/Plantillas_ca.json";
import "../style/PlantillasCA.css";
import * as XLSX from "xlsx";

interface Plantilla {
  TIPO: string;
  CONTENIDO: string;
}

export default function PlantillasCA() {
  const [tipo, setTipo] = useState<string>("");
  const [contenido, setContenido] = useState<string>("");
  const [validaciones, setValidaciones] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [ticket, setTicket] = useState<string>("");

  const tiposUnicos: string[] = [
    ...new Set((data as Plantilla[]).map((d) => d.TIPO)),
  ];

  const handleTipoChange = (tipoSeleccionado: string) => {
    setTipo(tipoSeleccionado);

    const plantilla = (data as Plantilla[]).find(
      (d) => d.TIPO === tipoSeleccionado
    );

    setContenido(plantilla ? plantilla.CONTENIDO : "");
  };

  const copiar = () => {
    navigator.clipboard.writeText(
      `${contenido}\n\nVALIDACIONES:\n${validaciones}`
    );
  };

  const exportarExcel = () => {
    const datos = [
      {
        Nombre: nombre,
        Ticket: ticket,
        Tipo: tipo,
        Contenido: contenido,
        Validaciones: validaciones,
      },
    ];

    const ws = XLSX.utils.json_to_sheet(datos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");

    XLSX.writeFile(wb, "soporte.xlsx");
  };

  // 🔥 GUARDAR EN GOOGLE SHEETS
  const guardarEnLinea = async () => {
  if (!nombre || !ticket) {
    alert("Debe ingresar nombre y ticket");
    return;
  }

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbyA7fO-rtGBBQcPRG7sjIvhxHOkGzBFtJqsrfQNN9ewM1OCtWG4FR-_Ii0unjd0GmW3ng/exec",
      {
        method: "POST",
        mode: "no-cors", // 🔥 CLAVE
        body: JSON.stringify({
          nombre,
          ticket,
        }),
      }
    );

    alert("Guardado en Google Sheets ✅");

    setNombre("");
    setTicket("");
  } catch (error) {
    console.error(error);
    alert("Error al guardar ❌");
  }
};

  return (
    <div className="ca-container">
      
      <div className="top-bar">
        <select onChange={(e) => handleTipoChange(e.target.value)}>
          <option value="">Selecciona tipo de falla</option>
          {tiposUnicos.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="editor">

        <h2>Contenido</h2>

        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
        />

        <button onClick={copiar}>Copiar</button>

        <h2>Validaciones</h2>

        <textarea
          placeholder="Escribe aquí las validaciones..."
          value={validaciones}
          onChange={(e) => setValidaciones(e.target.value)}
        />

        <div className="form">
          <input
            type="text"
            placeholder="Nombre funcionario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="text"
            placeholder="Número de ticket"
            value={ticket}
            onChange={(e) => setTicket(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button className="excel" onClick={exportarExcel}>
            Descargar Excel
          </button>

          <button onClick={guardarEnLinea}>
            Guardar en la nube
          </button>
        </div>

      </div>
    </div>
  );
}