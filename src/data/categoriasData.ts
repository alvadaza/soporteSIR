// src/data/plantillasData.ts

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;           // nombre del icono (usaremos lucide)
  color: string;
  count: number;
}

export const categorias: Categoria[] = [
  {
    id: 'sir',
    nombre: 'Plantillas SIR',
    descripcion: 'Soporte Sistema Misional',
    icono: 'FileText',
    color: '#6366f1',
    count: 11,
  },
  {
    id: 'caerrores',
    nombre: 'Plantillas de Errores',
    descripcion: 'Plantillas para responder errores comunes',
    icono: 'AlertTriangle',
    color: '#ef4444',
    count: 0,
  },
    {
    id: 'correo',
    nombre: 'Plantillas de Correo',
    descripcion: 'Plantillas para responder emails',
    icono: 'Mail',
    color: '#f59e0b',
    count: 0,
  },
  {
    id: 'directorio',
    nombre: 'Directorio',
    descripcion: 'directorio de usuarios SNR',
    icono: 'Users',
    color: '#10b981',
    count: 0,
  },
  
];