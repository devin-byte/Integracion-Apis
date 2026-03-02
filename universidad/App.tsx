import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProviderAlumno from './provider/ProviderAlumno';
import ProviderAsignatura from './provider/providerAsignaturas';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <ProviderAlumno>
      <ProviderAsignatura>
        <NavBar />
      </ProviderAsignatura>
    </ProviderAlumno>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
