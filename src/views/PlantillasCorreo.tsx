import { useState } from "react";
import data from "../data/plantillas_correo.json";

interface Imagen {
  placeholder: string;
  nombre: string;
}

interface Plantilla {
  TIPO: string;
  CONTENIDO: string;
  IMAGENES?: Imagen[];
}

export default function PlantillasCorreo() {
  const [tipo, setTipo] = useState<string>("");
  const [contenido, setContenido] = useState<string>("");
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [copiando, setCopiando] = useState(false);

  const tiposUnicos: string[] = [
    ...new Set((data as Plantilla[]).map((d) => d.TIPO)),
  ];

  const handleTipoChange = (tipoSeleccionado: string) => {
    setTipo(tipoSeleccionado);

    const plantilla = (data as Plantilla[]).find(d => d.TIPO === tipoSeleccionado);
    if (plantilla) {
      setContenido(plantilla.CONTENIDO);
      setImagenes(plantilla.IMAGENES || []);
    } else {
      setContenido("");
      setImagenes([]);
    }
  };

  // Función para convertir imagen a Base64
  const imageToBase64 = async (nombre: string): Promise<string> => {
    try {
      const response = await fetch(`/imagenes/${nombre}`);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error(`Error cargando ${nombre}`, error);
      return "";
    }
  };

  const copiarComoHTML = async () => {
    if (!contenido) return;

    setCopiando(true);

    try {
      // Convertir todas las imágenes a base64
      const imagenesBase64: { [key: string]: string } = {};
      for (const img of imagenes) {
        const base64 = await imageToBase64(img.nombre);
        if (base64) imagenesBase64[img.placeholder] = base64;
      }

      // Crear el HTML
      let html = contenido;

      Object.keys(imagenesBase64).forEach(placeholder => {
        const base64 = imagenesBase64[placeholder];
        const imgTag = `<br><img src="${base64}" style="max-width: 100%; height: auto; margin: 15px 0; border: 1px solid #ddd; border-radius: 5px;" /><br>`;
        html = html.replaceAll(placeholder, imgTag);
      });

      // HTML completo con formato
      const htmlCompleto = `
        <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">
          ${html.replace(/\n/g, '<br>')}
        </div>
      `;

      // Copiar al portapapeles como HTML
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([htmlCompleto], { type: "text/html" }),
          "text/plain": new Blob([contenido], { type: "text/plain" }),
        })
      ]);

      alert("✅ Copiado correctamente como HTML con imágenes!\n\nPuedes pegarlo directamente en Outlook o Gmail.");

    } catch (error) {
      console.error(error);
      alert("Error al copiar. Intenta de nuevo.");
    } finally {
      setCopiando(false);
    }
  };

  return (
    <div className="ca-container">
      <div className="top-bar">
        <select value={tipo} onChange={(e) => handleTipoChange(e.target.value)}>
          <option value="">Selecciona tipo de correo</option>
          {tiposUnicos.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="editor">
        <h2>Previsualización del Correo</h2>

        <div className="rich-preview">
          {contenido ? (
            contenido.split('\n').map((linea, i) => {
              const imgMatch = imagenes.find(img => linea.includes(img.placeholder));
              if (imgMatch) {
                return (
                  <div key={i}>
                    <p>{linea.replace(imgMatch.placeholder, '')}</p>
                    <img 
                      src={`/imagenes/${imgMatch.nombre}`} 
                      alt={imgMatch.nombre}
                      className="inline-image"
                    />
                  </div>
                );
              }
              return <p key={i} style={{ whiteSpace: "pre-wrap" }}>{linea}</p>;
            })
          ) : (
            <p>Selecciona una plantilla...</p>
          )}
        </div>

        <button 
          onClick={copiarComoHTML} 
          disabled={copiando}
          className="copiar-btn"
        >
          {copiando ? "Procesando imágenes..." : "Copiar Contenido"}
        </button>
      </div>
    </div>
  );
}