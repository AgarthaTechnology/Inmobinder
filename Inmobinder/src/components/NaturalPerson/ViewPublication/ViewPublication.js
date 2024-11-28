// ViewPublication.js

import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { styles } from './ViewPublication.styles';

const formatPrice = (value) => {
  const numericValue = value.toString().replace(/\D/g, '');
  if (!numericValue) return '';
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const ViewPublication = ({ publication }) => {
  const { width } = Dimensions.get('window');

  // Función para realizar una llamada telefónica
  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {/* Contenedor principal con sombra */}
      <View style={styles.container}>
        {/* Slider de imágenes */}
        {publication.gallery && publication.gallery.length > 0 ? (
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.imageSlider}
          >
            {publication.gallery.map((imageUri, index) => (
              <Image
                key={index}
                source={{ uri: imageUri }}
                style={[styles.image, { width: width }]}
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noImageText}>No hay imágenes disponibles.</Text>
        )}

        <Text style={styles.title}>{publication.nameProperty}</Text>
        <Text style={styles.price}>
          $ {publication.price ? formatPrice(publication.price) : 'Precio no disponible'}
        </Text>
        {publication.uf && (
          <Text style={styles.uf}>UF {formatPrice(publication.uf)}</Text>
        )}
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
            <FontAwesome5 name="bed" size={15} color="black" />
            <Text style={styles.featureText}>
              {formatPrice(publication.rooms)} dormitorios
            </Text>
          </View>
          <View style={styles.featureItem}>
            <FontAwesome5 name="bath" size={18} color="black" />
            <Text style={styles.featureText}>
              {formatPrice(publication.bathrooms)} baños
            </Text>
          </View>
          {/* Puedes agregar más características si es necesario */}
          <View style={styles.featureItem}>
            <MaterialIcons name="fullscreen" size={18} color="black" />
            <Text style={styles.featureText}>
              {formatPrice(publication.metters)} m² construidos
            </Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="fullscreen" size={18} color="black" />
            <Text style={styles.featureText}>
              {formatPrice(publication.mettersProperty)} m² totales
            </Text>
          </View>
        </View>

        {/* Información del anunciante */}
        <Text style={styles.sectionTitle}>Información del anunciante</Text>

        {/* Contacto 1 */}
        {publication.contact1Name && (
          <View style={styles.contactContainer}>
            <FontAwesome5 name="user" size={18} color="black" />
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactName}>{publication.contact1Name}</Text>
              {publication.contact1PhoneFormatted && (
                <TouchableOpacity
                  onPress={() => handleCall(publication.contact1PhoneFormatted)}
                >
                  <Text style={styles.contactPhone}>
                    {publication.contact1PhoneFormatted}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Contacto 2 */}
        {publication.contact2Name && (
          <View style={styles.contactContainer}>
            <FontAwesome5 name="user" size={18} color="black" />
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactName}>{publication.contact2Name}</Text>
              {publication.contact2PhoneFormatted && (
                <TouchableOpacity
                  onPress={() => handleCall(publication.contact2PhoneFormatted)}
                >
                  <Text style={styles.contactPhone}>
                    {publication.contact2PhoneFormatted}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ViewPublication;
