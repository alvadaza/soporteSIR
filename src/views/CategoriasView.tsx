// CategoriasView.tsx
import { useState } from "react";
import { categorias } from "../data/categoriasData";
import PlantillasCA from "./PlantillasCA";
import PlantillasCorreo from "./PlantillasCorreo";
import Directorio from "./Directorio";
import PlantillasCaErrores from "./PlantillasCaErrores";
import "../style/CategoriasView.css";


type Vista = "inicio" | "plantillas" | "plantillascorreo"  | "plantillascaerrores" | "directorio";

export default function CategoriasView() {
  const [vista, setVista] = useState<Vista>("inicio");

  const handleClick = (cat: any) => {
    // puedes manejar más vistas aquí según el id
    if (cat.id === "sir") {
      setVista("plantillas");
    }
    if (cat.id === "correo") {
      setVista("plantillascorreo");
    }
    if (cat.id === "caerrores") {
      setVista("plantillascaerrores");
    }
    if (cat.id === "directorio") {
      setVista("directorio");
    }
  };

  return (
    <div className="container">
      
      {/* IZQUIERDA */}
      <div className={`left ${vista !== "inicio" ? "shrink" : ""}`}>
        <h2 className="title">Categorías</h2>

        <div className="cards">
          {categorias.map((cat) => (
            <div
              key={cat.id}
              className="card"
              onClick={() => handleClick(cat)}
              style={{ borderColor: cat.color }}
            >
              <div className="card-header">
                <span
                  className="icon"
                  style={{ background: cat.color }}
                >
                  {cat.nombre[0]}
                </span>

                <div>
                  <h3>{cat.nombre}</h3>
                  <p>{cat.descripcion}</p>
                </div>
              </div>

              <span className="count">
                {cat.count} items
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* DERECHA */}
      <div className="right active">
        {vista === "inicio" && (
          <div className="hero">
            <h1>Soporte SIR</h1>
            <img
              src="https://res.cloudinary.com/dthi7ietr/image/upload/v1777605897/hero_mq4xab.png"
              alt="soporte"
            />
          </div>
        )}

        {vista === "plantillas" && (
          <>
            <button
              className="back"
              onClick={() => setVista("inicio")}
            >
              ← Volver
            </button>

            <PlantillasCA />
          </>
        )}

        {vista === "plantillascorreo" && (
          <>
            <button
              className="back"
              onClick={() => setVista("inicio")}
            >
              ← Volver
            </button>

            <PlantillasCorreo />
          </>
        )}

        {vista === "directorio" && (
          <>
            <button
              className="back"
              onClick={() => setVista("inicio")}
            >
              ← Volver
            </button>

            <Directorio />
          </>
        )}

        {vista === "plantillascaerrores" && (
          <>
            <button
              className="back"
              onClick={() => setVista("inicio")}
            >
              ← Volver
            </button>

            <PlantillasCaErrores />
          </>
        )}
      </div>
    </div>
  );
}