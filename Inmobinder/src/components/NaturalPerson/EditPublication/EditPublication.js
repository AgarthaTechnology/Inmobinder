import React from "react";
import { View, Button } from "react-native";
import { useFormik } from "formik";
import { InfoForm } from "../CreatePublication/InfoForm";

const EditPublication = ({ publication, onSave }) => {
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
      images: publication.gallery || [],
      region: publication.region || '',
      city: publication.city || '',
    },
    onSubmit: (values) => {
      onSave(values);
    },
  });

  return (
    <View>
      <InfoForm formik={formik} images={formik.values.images} propertyType="Casa" />
      <Button title="Guardar Cambios" onPress={formik.handleSubmit} />
    </View>
  );
};

export default EditPublication;
