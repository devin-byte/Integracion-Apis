//agregar tareras
//listyar tarreas 
// objeto alumno

import { createContext } from "react";
import { Alumno } from "../modelos/Alumno";

export interface ContextAlumnoProps {
  alumnos: Alumno[];
  setAlumnos: React.Dispatch<React.SetStateAction<Alumno[]>>;
  agregarAlumno: (alumno: Alumno) => Promise<void>;
  obtenerAlumnos: () => Promise<void>;
  eliminarAlumno: (id: number) => Promise<void>;
}

export const contextAlumno = createContext<ContextAlumnoProps>({
  alumnos: [],
  setAlumnos: () => {},
  agregarAlumno: async () => {},
  obtenerAlumnos: async () => {},
  eliminarAlumno: async () => {},
});