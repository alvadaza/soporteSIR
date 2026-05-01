// CategoriasView.tsx
import { useState } from "react";
import { categorias } from "../data/categoriasData";
import PlantillasCA from "./PlantillasCA";
import "../style/CategoriasView.css";


type Vista = "inicio" | "plantillas";

export default function CategoriasView() {
  const [vista, setVista] = useState<Vista>("inicio");

  const handleClick = (cat: any) => {
    // puedes manejar más vistas aquí según el id
    if (cat.id === "sir") {
      setVista("plantillas");
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
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
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
      </div>
    </div>
  );
}