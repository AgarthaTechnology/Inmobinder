import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const propiedades = [
    { id: 1, titulo: 'Casa 1', precio: 100000, direccion: 'Calle 123, Ciudad ABC', imagen: 'ruta/a/imagen1.jpg' },
    { id: 2, titulo: 'Casa 2', precio: 150000, direccion: 'Avenida XYZ, Ciudad DEF', imagen: 'ruta/a/imagen2.jpg' },
    // Agregar más propiedades según sea necesario
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
