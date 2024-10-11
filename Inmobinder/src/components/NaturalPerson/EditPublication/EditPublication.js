// EditPublication.js

import React, { useState } from "react";
import {
  View,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useFormik } from "formik";
import { styles } from "./EditPublication.styles"; // Importar los estilos
import { MapForm } from "../CreatePublication/MapForm"; // Ajusta la ruta según tu estructura

// Definir la función formatPrice
const formatPrice = (value) => {
  const numericValue = value.toString().replace(/\D/g, "");
  if (!numericValue) return "";
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export function EditPublication({ publication, onSave }) {
  // Estados locales
  const [selectedCondition, setSelectedCondition] = useState(
    publication.condition || "Nuevo"
  );
  const [selectedState, setSelectedState] = useState(
    publication.state || "Arriendo"
  );
  const [showMap, setShowMap] = useState(false);

  const formik = useFormik({
    initialValues: {
      nameProperty: publication.nameProperty || "",
      address: publication.address || "",
      description: publication.description || "",
      price: publication.price || "",
      rooms: publication.rooms || 0,
      bathrooms: publication.bathrooms || 0,
      commonExpenses: publication.commonExpenses || "",
      metters: publication.metters || "",
      mettersProperty: publication.mettersProperty || "",
      location: publication.location || { latitude: 0, longitude: 0 },
      gallery: publication.gallery || [],
    },
    onSubmit: (values) => {
      onSave({
        ...values,
        condition: selectedCondition,
        state: selectedState,
      });
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text style={styles.sectionTitle}>Nombre de la propiedad</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa nombre de la propiedad"
            value={formik.values.nameProperty}
            onChangeText={formik.handleChange("nameProperty")}
          />

          <Text style={styles.sectionTitle}>Condición de la propiedad</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedCondition === "Nuevo" && styles.selectedButton,
              ]}
              onPress={() => setSelectedCondition("Nuevo")}
            >
              <Text style={styles.toggleButtonText}>Nuevo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedCondition === "Usado" && styles.selectedButton,
              ]}
              onPress={() => setSelectedCondition("Usado")}
            >
              <Text style={styles.toggleButtonText}>Usado</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Estado de la propiedad</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedState === "Arriendo" && styles.selectedButton,
              ]}
              onPress={() => setSelectedState("Arriendo")}
            >
              <Text style={styles.toggleButtonText}>Arriendo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedState === "Venta" && styles.selectedButton,
              ]}
              onPress={() => setSelectedState("Venta")}
            >
              <Text style={styles.toggleButtonText}>Venta</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Dirección</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa dirección"
            value={formik.values.address}
            onChangeText={formik.handleChange("address")}
          />

          <Button
            title="Seleccionar ubicación en el mapa"
            onPress={() => setShowMap(true)}
            style={styles.mapButton}
          />

          {/* Componente MapForm */}
          <MapForm show={showMap} close={() => setShowMap(false)} formik={formik} />

          <Text style={styles.sectionTitle}>Descripción</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa descripción"
            value={formik.values.description}
            onChangeText={formik.handleChange("description")}
          />

          <Text style={styles.sectionTitle}>Precio</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa precio"
            value={formatPrice(formik.values.price)}
            onChangeText={(text) => {
              const formattedValue = formatPrice(text);
              formik.setFieldValue("price", formattedValue.replace(/\./g, ""));
            }}
            keyboardType="numeric"
          />

          <Text style={styles.sectionTitle}>Dormitorios</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa número de dormitorios"
            value={formatPrice(formik.values.rooms)}
            onChangeText={(text) => {
              const formattedValue = formatPrice(text);
              formik.setFieldValue("rooms", formattedValue.replace(/\./g, ""));
            }}
            keyboardType="numeric"
          />

          <Text style={styles.sectionTitle}>Baños</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa número de baños"
            value={formatPrice(formik.values.bathrooms)}
            onChangeText={(text) => {
              const formattedValue = formatPrice(text);
              formik.setFieldValue("bathrooms", formattedValue.replace(/\./g, ""));
            }}
            keyboardType="numeric"
          />

          <Text style={styles.sectionTitle}>Gastos comunes</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa gastos comunes"
            value={formatPrice(formik.values.commonExpenses)}
            onChangeText={(text) => {
              const formattedValue = formatPrice(text);
              formik.setFieldValue(
                "commonExpenses",
                formattedValue.replace(/\./g, "")
              );
            }}
            keyboardType="numeric"
          />

          <Text style={styles.sectionTitle}>Metros construidos</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa metros construidos"
            value={formatPrice(formik.values.metters)}
            onChangeText={(text) => {
              const formattedValue = formatPrice(text);
              formik.setFieldValue("metters", formattedValue.replace(/\./g, ""));
            }}
            keyboardType="numeric"
          />

          <Text style={styles.sectionTitle}>Metros totales</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa metros totales"
            value={formatPrice(formik.values.mettersProperty)}
            onChangeText={(text) => {
              const formattedValue = formatPrice(text);
              formik.setFieldValue("mettersProperty", formattedValue.replace(/\./g, ""));
            }}
            keyboardType="numeric"
          />

          <Button title="Guardar Cambios" onPress={formik.handleSubmit} />
        </ScrollView>
      </View>
    </View>
  );
}