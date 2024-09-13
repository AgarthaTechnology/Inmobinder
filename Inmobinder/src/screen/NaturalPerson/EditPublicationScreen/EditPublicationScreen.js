import React from 'react';
import { View, Alert } from 'react-native';
import EditPublication from '../../../components/NaturalPerson/EditPublication';
import { styles } from './EditPublicationScreen.styles';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from "../../../utils/firebase";

export function EditPublicationScreen({ navigation, route }) {
  const { publication } = route.params;

  const handleSave = async (updatedData) => {
    try {
      const publicationRef = doc(db, 'publications', publication.id);
      await updateDoc(publicationRef, updatedData);
      Alert.alert('Éxito', 'La publicación ha sido actualizada correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar la publicación:', error);
      Alert.alert('Error', 'Hubo un problema al actualizar la publicación.');
    }
  };

  return (
    <View style={styles.container}>
      <EditPublication publication={publication} onSave={handleSave} />
    </View>
  );
}
