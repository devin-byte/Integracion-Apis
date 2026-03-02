import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../page/Home';
import ListadoAlumno from '../page/ListadoAlumno';
import ListaAsignaturas from '../page/ListaAsignaturas';

export default function NavBar() {

  const tab = createBottomTabNavigator();


  return (
   
    <NavigationContainer>
        <tab.Navigator>
            <tab.Screen name="Home" component={Home} />
            <tab.Screen name="ListaAsignaturas" component={ListaAsignaturas} />
            <tab.Screen name="ListadoAlumno" component={ListadoAlumno} />
          
        </tab.Navigator>
    </NavigationContainer>
  )
}