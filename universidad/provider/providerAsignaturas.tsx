import React, { useContext, useState } from 'react';
import { Plantilla } from '../modelos/Plantilla';
import { Asignatura } from '../modelos/Asignaturas';
import { contextAsignatura } from '../context/ContextAsignaturas';

export default function ProviderAsignatura({ children }: Plantilla) {

  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);

  async function obtenerAsignaturas() {
    try {
      const response = await fetch('http://192.168.0.7:5000/api/asignaturas');
      const data = await response.json();
      setAsignaturas(data);
    } catch (error) {
      console.error('Error al obtener asignaturas', error);
    }
  }

  async function agregarAsignatura(asignatura: Asignatura) {
    try {
      const response = await fetch('http://192.168.0.7:5000/api/asignaturas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(asignatura),
      });
      const data = await response.json();
      alert('Asignatura agregada correctamente');
      obtenerAsignaturas();
    } catch (error) {
      console.error('Error al agregar asignatura', error);
    }
  }

  async function asignarAsignaturaAlumno(idAlumno: number, asignatura: Asignatura) {
    try {
      const response = await fetch(`http://192.168.0.7:5000/api/alumnos/${idAlumno}/asignaturas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idAsignatura: asignatura.idAsignatura }),
      });
      if (!response.ok) throw new Error('Error al asignar asignatura al alumno');
      alert(`Se asignó ${asignatura.nombreAsignatura} al alumno correctamente`);
      return true;
    } catch (error) {
      console.error('Error al asignar asignatura al alumno', error);
      return false;
    }
  }

  async function obtenerAsignaturasAlumno(idAlumno: number) {
    try {
      const response = await fetch(`http://192.168.0.7:5000/api/alumnos/${idAlumno}/asignaturas`);
      if (!response.ok) throw new Error('Error al obtener asignaturas del alumno');
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error al obtener asignaturas del alumno', error);
      return [];
    }
  }

  async function eliminarAsignatura(id: number) {
    try {
      const response = await fetch(`http://192.168.0.7:5000/api/asignaturas/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      alert('Asignatura eliminada correctamente');
      obtenerAsignaturas();
    } catch (error) {
      console.error('Error al eliminar asignatura', error);
    }
  }

  return (
    <contextAsignatura.Provider value={{ asignaturas, agregarAsignatura, obtenerAsignaturas, eliminarAsignatura, obtenerAsignaturasAlumno, asignarAsignaturaAlumno }}>
      {children}
    </contextAsignatura.Provider>
  );
}


export const useContextAsignatura = () => {
  return useContext(contextAsignatura);
}