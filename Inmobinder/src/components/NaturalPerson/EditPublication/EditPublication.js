import React from "react";
import { View, Button, ImageBackground, ScrollView } from "react-native";
import { useFormik } from "formik";
import { InfoForm } from "../CreatePublication/InfoForm";
import { styles } from "./EditPublication.styles";

export function EditPublication({ publication, onSave }) {
  const formik = useFormik({
    initialValues: {
      nameProperty: publication.nameProperty || '',
      state: publication.state || '',
      condition: publication.condition || '',
      address: publication.address || '',
      description: publication.description || '',
      price: publication.price || '',
      rooms: publication.rooms || 0,
      bathrooms: publication.bathrooms || 0,
      commonExpenses: publication.commonExpenses || '',
      metters: publication.metters || '',
      mettersProperty: publication.mettersProperty || '',
      location: publication.location || { latitude: 0, longitude: 0 },
      gallery: publication.gallery || [],
      region: publication.region || '',
      city: publication.city || '',
    },
    onSubmit: (values) => {
      onSave(values);
    },
  });

  return (
    <ImageBackground
      source={require("../../../../assets/img/fondo.png")}
      style={styles.background}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
      <InfoForm formik={formik} images={formik.values.images} propertyType="Casa"/>
      <Button title="Guardar Cambios" onPress={formik.handleSubmit} />
    </View>
    </ScrollView>
    </ImageBackground>
  );
};