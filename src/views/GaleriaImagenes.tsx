import { useState, useMemo } from "react";
import "../style/GaleriaImagenes.css";

const imagenes = [
  "Imagen1.png",
  "Imagen2.png",
  "Imagen3.png",
  "Imagen4.png",
  "Imagen5.png",
  "Imagen6.png",
  "Imagen7.png",
];

export default function GaleriaImagenes() {
  const [busqueda, setBusqueda] = useState("");
  const [seleccionada, setSeleccionada] = useState<string | null>(null);

  const filtradas = useMemo(() => {
    return imagenes.filter((img) =>
      img.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [busqueda]);

 const copiarImagen = async (img: string) => {
  try {
    const response = await fetch(`/imagenes/${img}`);
    const blob = await response.blob();

    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);

    alert("Imagen copiada ✅ (puedes pegar con Ctrl+V)");
  } catch (error) {
    console.error(error);
    alert("Error al copiar imagen ❌");
  }
};

  return (
    <div className="galeria-container">

      <h1>Galería de Imágenes</h1>

      {/* 🔍 BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar imagen..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="buscador"
      />

      {/* GRID */}
      <div className="grid">
        {filtradas.map((img) => (
          <div
            key={img}
            className={`card ${seleccionada === img ? "active" : ""}`}
            onClick={() => setSeleccionada(img)}
          >
            <img src={`/imagenes/${img}`} alt={img} />
            <p>{img}</p>

            <button onClick={() => copiarImagen(img)}>
              Copiar Imagen
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}