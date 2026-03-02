import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useContextAlumno } from '../provider/ProviderAlumno';
import { useContextAsignatura } from '../provider/providerAsignaturas';

export default function ListaAlumno() {
  const { alumnos, obtenerAlumnos , eliminarAlumno } = useContextAlumno();
  const { asignaturas, obtenerAsignaturasAlumno, asignarAsignaturaAlumno } = useContextAsignatura();

  const [modalVisible, setModalVisible] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState<any>(null);

  const agregarAsignaturaAlumnoHandler = async (asignatura: any) => {
    if (!alumnoSeleccionado) return;

    try {
      const exito = await asignarAsignaturaAlumno(alumnoSeleccionado.idAlumno, asignatura);
      if (!exito) throw new Error("No se pudo asignar la asignatura");

      setAlumnoSeleccionado({
        ...alumnoSeleccionado,
        asignaturas: [...(alumnoSeleccionado.asignaturas || []), asignatura],
      });

      obtenerAlumnos();

      Alert.alert("Éxito", `Se agregó ${asignatura.nombreAsignatura} al alumno`);
      setModalVisible(false);
    } catch (error) {
      console.error("Error al agregar asignatura al alumno", error);
    }
  };

  const abrirModalAgregar = async (alumno: any) => {
    try {
      const asignaturasDelAlumno = await obtenerAsignaturasAlumno(alumno.idAlumno);

      setAlumnoSeleccionado({
        ...alumno,
        asignaturas: Array.isArray(asignaturasDelAlumno) ? asignaturasDelAlumno : []
      });

      setModalVisible(true);
    } catch (error) {
      console.error("Error al cargar asignaturas del alumno", error);
      setAlumnoSeleccionado({ ...alumno, asignaturas: [] });
      setModalVisible(true);
    }
  };

  return (
    <View>
      <FlatList
        data={alumnos}
        keyExtractor={item => item.idAlumno.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nombreAlumno} ({item.emailAlumno})</Text>

            {item.asignaturas && item.asignaturas.length > 0 ? (
              <Text>Asignaturas: {item.asignaturas.map((a: any) => a.nombreAsignatura).join(', ')}</Text>
            ) : (
              <Text>Sin asignaturas</Text>
            )}

            <View style={styles.botones}>
              <TouchableOpacity onPress={() => eliminarAlumno(item.idAlumno)} style={[styles.button, { backgroundColor: 'red' }]}>
                <Text style={{ color: 'white' }}>Borrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => abrirModalAgregar(item)} style={[styles.button, { backgroundColor: 'green' }]}>
                <Text style={{ color: 'white' }}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Selecciona una asignatura</Text>

            <FlatList
              data={asignaturas.filter(a => 
                !(alumnoSeleccionado?.asignaturas || []).some((asig: any) => asig.idAsignatura === a.idAsignatura)
              )}
              keyExtractor={item => item.idAsignatura.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => agregarAsignaturaAlumnoHandler(item)} style={styles.buttonModal}>
                  <Text style={{ color: 'white' }}>{item.nombreAsignatura}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.buttonModal, {backgroundColor:'gray'}]}>
              <Text style={{ color: 'white' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
  },
  botones: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 2,
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  buttonModal: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
});