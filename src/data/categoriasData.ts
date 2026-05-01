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
    descripcion: 'Soporte Sistema Registral',
    icono: 'FileText',
    color: '#6366f1',
    count: 11,
  },
  {
    id: 'directorio',
    nombre: 'Directorio',
    descripcion: 'Usuarios y traslados',
    icono: 'Users',
    color: '#10b981',
    count: 0,
  },
  {
    id: 'correo',
    nombre: 'Correo',
    descripcion: 'Plantillas para emails',
    icono: 'Mail',
    color: '#f59e0b',
    count: 0,
  },
];