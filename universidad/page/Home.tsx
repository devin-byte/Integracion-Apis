import { View, Text ,TextInput,StyleSheet,Button, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import ListaAlumno from '../components/ListaAlumno'
import { useContextAlumno } from '../provider/ProviderAlumno';
import { Alumno } from '../modelos/Alumno';

export default function Home() {

  const [nombreAlumno, setNombreAlumno] = useState('');
  const [emailAlumno, setEmailAlumno] = useState('');
  
  const {agregarAlumno,obtenerAlumnos} = useContextAlumno();

  async function agregarUsuarioLocal() { 


    let alumno: Alumno = {
      idAlumno: 0,
      nombreAlumno: nombreAlumno,
      emailAlumno: emailAlumno,
    }

    await agregarAlumno(alumno);
    obtenerAlumnos();
  }



  useEffect(() => {
    obtenerAlumnos();
  }, []);


  return (
    <View>

      <TextInput
      placeholder='Nombre del alumno'
      value={nombreAlumno}
      onChangeText={setNombreAlumno}
      style={styles.input}
      />

      <TextInput 
      placeholder='Email del alumno'
      value={emailAlumno}
      onChangeText={setEmailAlumno}
      style={styles.input}
      />

      <TouchableOpacity
      onPress={() => agregarUsuarioLocal()}
      >
        <Text style={styles.button}>Agregar alumno</Text>
      </TouchableOpacity>
     
      <ListaAlumno/>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
});