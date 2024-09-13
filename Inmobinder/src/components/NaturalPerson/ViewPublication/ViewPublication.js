import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const ViewPublication = ({ publication }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{publication.nameProperty}</Text>
      <Text style={styles.text}>Estado: {publication.state}</Text>
      <Text style={styles.text}>Condición: {publication.condition}</Text>
      <Text style={styles.text}>Dirección: {publication.address}</Text>
      <Text style={styles.text}>Ciudad: {publication.city}</Text>
      <Text style={styles.text}>Región: {publication.region}</Text>
      <Text style={styles.text}>Descripción: {publication.description}</Text>
      <Text style={styles.text}>Precio: {publication.price}</Text>
      <Text style={styles.text}>Habitaciones: {publication.rooms}</Text>
      <Text style={styles.text}>Baños: {publication.bathrooms}</Text>
      <Text style={styles.text}>Gastos Comunes: {publication.commonExpenses}</Text>
      <Text style={styles.text}>Metros Totales: {publication.metters}</Text>
      <Text style={styles.text}>Metros Construidos: {publication.mettersProperty}</Text>
      
      {/* Mostrar galería de imágenes */}
      {publication.gallery?.map((url, index) => (
        <Image key={index} source={{ uri: url }} style={styles.image} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 5 },
  image: { width: '100%', height: 200, marginBottom: 10, borderRadius: 10 },
});

export default ViewPublication;
