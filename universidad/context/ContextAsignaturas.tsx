import { createContext } from "react";
import { Asignatura } from "../modelos/Asignaturas";

export interface ContextAsignaturaProps {
  asignaturas: Asignatura[];
  agregarAsignatura: (asignatura: Asignatura) => Promise<void>;
  obtenerAsignaturas: () => Promise<void>;
  eliminarAsignatura: (id: number) => Promise<void>;
  obtenerAsignaturasAlumno: (idAlumno: number) => Promise<Asignatura[]>;
  asignarAsignaturaAlumno: (idAlumno: number, asignatura: Asignatura) => Promise<boolean>;
}

export const contextAsignatura = createContext<ContextAsignaturaProps>({
  asignaturas: [],
  agregarAsignatura: async () => {},
  obtenerAsignaturas: async () => {},
  eliminarAsignatura: async () => {},
  obtenerAsignaturasAlumno: async () => [],
  asignarAsignaturaAlumno: async () => false,
});