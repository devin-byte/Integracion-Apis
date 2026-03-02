import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useContextAsignatura } from '../provider/providerAsignaturas';

export default function ListaAsignatura() {
  const { asignaturas, eliminarAsignatura, obtenerAsignaturas } = useContextAsignatura();

  useEffect(() => {
    obtenerAsignaturas();
  }, []);

  return (
    <FlatList
      data={asignaturas}
      renderItem={({ item }) => 
        <View style={styles.item}>
          <Text>{item.idAsignatura} - {item.nombreAsignatura} - {item.profesorAsignatura}</Text>
          <TouchableOpacity onPress={() => eliminarAsignatura(item.idAsignatura)} style={styles.button}>
            <Text style={{ color: 'white' }}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      }
      keyExtractor={item => item.idAsignatura.toString()}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    marginTop: 5,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
});