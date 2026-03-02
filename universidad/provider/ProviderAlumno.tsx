import React, { useState, useContext } from 'react';
import { Plantilla } from '../modelos/Plantilla';
import { Alumno } from '../modelos/Alumno';
import { contextAlumno } from '../context/ContextAlumno';

export default function ProviderAlumno({ children }: Plantilla) {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  async function obtenerAlumnos() {
    const response = await fetch('http://192.168.0.7:5000/api/alumnos');
    const data = await response.json();

    const alumnosConAsignaturas = data.map((a: any) => ({
      ...a,
      asignaturas: a.asignaturas || [],
    }));

    setAlumnos(alumnosConAsignaturas);
  }

  async function agregarAlumno(alumno: Alumno) {
    const response = await fetch('http://192.168.0.7:5000/api/alumnos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alumno),
    });

    const nuevoAlumno = await response.json();

    setAlumnos(prev => [...prev, { ...nuevoAlumno, asignaturas: [] }]);

    alert('Alumno agregado correctamente');
  }

  async function eliminarAlumno(id: number) {
    await fetch(`http://192.168.0.7:5000/api/alumnos/${id}`, {
      method: 'DELETE',
    });

    setAlumnos(prev => prev.filter(a => a.idAlumno !== id));

    alert('Alumno eliminado correctamente');
  }

  return (
    <contextAlumno.Provider
      value={{ alumnos, setAlumnos, agregarAlumno, obtenerAlumnos, eliminarAlumno }}>
      {children}
    </contextAlumno.Provider>
  );
}

export const useContextAlumno = () => {
  return useContext(contextAlumno);
};