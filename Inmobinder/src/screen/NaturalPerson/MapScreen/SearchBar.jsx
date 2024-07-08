import React, { useState } from "react";
import { View, TouchableOpacity, Linking, Alert } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from "../MapScreen/MapStyles.js";

const SearchBar = ({ apiKey, onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSelectPlace = (data, details) => {
    if (!details) {
      Alert.alert('Error', 'No se pudo obtener los detalles del lugar seleccionado.');
      return;
    }

    console.log("Detalles del lugar seleccionado:", details);
    const { formatted_address, geometry: { location } } = details;
    const zoom = 15;
    const mapUrl = `https://www.google.com/maps/@${location.lat},${location.lng},${zoom}z?q=${formatted_address}`;

    Linking.canOpenURL(mapUrl)
      .then(supported => {
        if (supported) {
          Linking.openURL(mapUrl);
        } else {
          Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${formatted_address}`);
        }
      })
      .catch(err => console.error('Error al abrir Google Maps:', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buscar}>
        <GooglePlacesAutocomplete
          placeholder='Buscar'
          onPress={(data, details) => handleSelectPlace(data, details)}
          query={{
            key: apiKey,
            language: 'es',
          }}
          styles={{
            textInput: {
              height: 30,
              color: '#5d5d5d',
              fontSize: 16,
              backgroundColor: '#fff',
              borderRadius: 15,
              paddingLeft: 10,
              flex: 1,
            },
            textInputContainer: {
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 15,
              paddingRight: 10,
            },
            listView: {
              zIndex: 1,
            },
          }}
          fetchDetails={true}
          textInputProps={{
            value: searchInput,
            onChangeText: (text) => setSearchInput(text),
          }}
        />
        <TouchableOpacity onPress={() => {
          console.log(searchInput);
          onSearch(searchInput);
        }}>
          <FontAwesome
            name="search"
            size={17}
            color="#969696"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SearchBar;
