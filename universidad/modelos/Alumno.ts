import { Asignatura } from './Asignaturas';

export interface Alumno {
    idAlumno: number;
    nombreAlumno: string;
    emailAlumno: string;
    asignaturas?: Asignatura[]; 
}