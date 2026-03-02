import { View } from 'react-native'
import React, { useEffect } from 'react'
import { useContextAlumno } from '../provider/ProviderAlumno'
import { useContextAsignatura } from '../provider/providerAsignaturas'
import ListaAlumno from '../components/ListaAlumno';

export default function ListadoAlumno() {

  const { obtenerAlumnos } = useContextAlumno();
  const { obtenerAsignaturas } = useContextAsignatura();

  useEffect(() => {
    obtenerAlumnos();
    obtenerAsignaturas();
  }, []);

  return (
    <View>
      <ListaAlumno />
    </View>
  )
}