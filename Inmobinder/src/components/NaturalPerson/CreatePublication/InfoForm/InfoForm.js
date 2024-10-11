// InfoForm.js

import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { useFormik } from "formik";
import { MapForm } from "../MapForm";
import { styles } from "./InfoForm.styles";
import { UploadImage } from "../ImagePublication/UploadImage";

// Definir la función formatPrice
const formatPrice = (value) => {
  const numericValue = value.toString().replace(/\D/g, "");
  if (!numericValue) return "";
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export function InfoForm({ formik, images, propertyType }) {
  // Estado para mostrar el mapa
  const [showMap, setShowMap] = useState(false);

  const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

  // Obtener el color del icono del mapa
  const getColorIconMap = (formik) => {
    if (formik.errors.location) return "#FF0000";
    if (formik.values.location) return "#00a680";
    return "#c2c2c2";
  };

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

          {/* Subida de imágenes */}
          <UploadImage formik={formik} images={images} />

          {/* ESTADO DE LA PROPIEDAD */}
          <Text style={styles.sectionTitle}>Estado de la propiedad</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                formik.values.state === "Venta" && styles.selectedButton,
              ]}
              onPress={() => formik.setFieldValue("state", "Venta")}
            >
              <Text style={styles.toggleButtonText}>Venta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                formik.values.state === "Arriendo" && styles.selectedButton,
              ]}
              onPress={() => formik.setFieldValue("state", "Arriendo")}
            >
              <Text style={styles.toggleButtonText}>Arriendo</Text>
            </TouchableOpacity>
          </View>

          {/* CONDICIÓN DE LA PROPIEDAD */}
          <Text style={styles.sectionTitle}>Condición de la propiedad</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                formik.values.condition === "Nuevo" && styles.selectedButton,
              ]}
              onPress={() => formik.setFieldValue("condition", "Nuevo")}
            >
              <Text style={styles.toggleButtonText}>Nuevo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                formik.values.condition === "Usado" && styles.selectedButton,
              ]}
              onPress={() => formik.setFieldValue("condition", "Usado")}
            >
              <Text style={styles.toggleButtonText}>Usado</Text>
            </TouchableOpacity>
          </View>

          {/* DIRECCIÓN */}
          <Text style={styles.sectionTitle}>Dirección</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa dirección"
            value={formik.values.address}
            onChangeText={formik.handleChange("address")}
          />
          <Button
            title="Seleccionar ubicación en el mapa"
            onPress={onOpenCloseMap}
            style={styles.mapButton}
          />

          {/* Componente MapForm */}
          <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />

          {/* DESCRIPCIÓN */}
          <Text style={styles.sectionTitle}>Descripción</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa descripción"
            value={formik.values.description}
            onChangeText={formik.handleChange("description")}
            multiline={true}
          />

          {/* PRECIO */}
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

          {/* DORMITORIOS */}
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

          {/* BAÑOS */}
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

          {/* GASTOS COMUNES */}
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

          {/* METROS CONSTRUIDOS */}
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

          {/* METROS TOTALES */}
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

          {/* Eliminar el botón "Crear Publicación" de aquí */}
          {/* <Button title="Crear Publicación" onPress={formik.handleSubmit} /> */}
        </ScrollView>
      </View>
    </View>
  );
}
