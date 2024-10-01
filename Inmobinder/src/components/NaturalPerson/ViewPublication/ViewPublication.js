import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { styles } from './ViewPublication.styles';

const ViewPublication = ({ publication }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {/* Detalles principales */}
      <View style={styles.detailsContainer}>
        {/* Imagen de la propiedad */}
        <Image source={{ uri: publication.gallery[0] }} style={styles.image} />

        <Text style={styles.title}>{publication.nameProperty}</Text>
        <Text style={styles.price}>
          $ {publication.price} CLP
          <Text style={styles.uf}> UF {publication.uf}</Text>
        </Text>
        <Text style={styles.address}>{publication.address}</Text>

        {/* Descripción */}
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>
          {publication.description || 'No hay descripción disponible.'}
        </Text>

        {/* Características */}
        <Text style={styles.sectionTitle}>Características</Text>
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <FontAwesome5 name="bed" size={18} color="black" />
            <Text style={styles.featureText}>{publication.rooms} dormitorios</Text>
          </View>
          <View style={styles.featureItem}>
            <FontAwesome5 name="bath" size={18} color="black" />
            <Text style={styles.featureText}>{publication.bathrooms} baños</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="directions-car" size={18} color="black" />
            <Text style={styles.featureText}>Estacionamiento</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="fullscreen" size={18} color="black" />
            <Text style={styles.featureText}>{publication.metters} m² construidos</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="fullscreen" size={18} color="black" />
            <Text style={styles.featureText}>{publication.mettersProperty} m² totales</Text>
          </View>
        </View>

        {/* Información del anunciante */}
        <Text style={styles.sectionTitle}>Información del anunciante</Text>
        <View style={styles.agentInfoContainer}>
          <FontAwesome5 name="user" size={18} color="black" />
          <View style={styles.agentTextContainer}>
            <Text style={styles.agentText}>felipinho henriquez</Text>
            <Text style={styles.agentText}>felipe@gmail.com</Text>
            <Text style={styles.agentText}>+56 9 1111 1111</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewPublication;