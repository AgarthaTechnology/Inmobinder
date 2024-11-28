// EditPublication.js

import React, { useState, useRef } from "react";
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
import { styles } from "./EditPublication.styles";
import { MapForm } from "../CreatePublication/MapForm";
import PhoneInput from "react-native-phone-number-input";

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

  const phoneInput1 = useRef(null);
  const phoneInput2 = useRef(null);

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
      // Campos de contacto
      contact1Name: publication.contact1Name || "",
      contact1Phone: publication.contact1Phone || "",
      contact1PhoneFormatted: publication.contact1PhoneFormatted || "",
      contact2Name: publication.contact2Name || "",
      contact2Phone: publication.contact2Phone || "",
      contact2PhoneFormatted: publication.contact2PhoneFormatted || "",
    },
    onSubmit: (values) => {
      onSave({
        ...values,
        condition: selectedCondition,
        state: selectedState,
      });
    },
  });

  // Función para limitar el número de dígitos del teléfono
  const handlePhoneChange = (text, field) => {
    const numericText = text.replace(/\D/g, "");
    const limitedText = numericText.slice(0, 9);
    formik.setFieldValue(field, limitedText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {/* NOMBRE DE LA PROPIEDAD */}
          <Text style={styles.sectionTitle}>Nombre de la propiedad</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa nombre de la propiedad"
            value={formik.values.nameProperty}
            onChangeText={formik.handleChange("nameProperty")}
          />

          {/* CONDICIÓN DE LA PROPIEDAD */}
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

          {/* ESTADO DE LA PROPIEDAD */}
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
            onPress={() => setShowMap(true)}
            style={styles.mapButton}
          />

          {/* Componente MapForm */}
          <MapForm show={showMap} close={() => setShowMap(false)} formik={formik} />

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
              formik.setFieldValue("commonExpenses", formattedValue.replace(/\./g, ""));
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

          {/* DATOS DE CONTACTO */}
          <Text style={styles.sectionTitle}>Datos de Contacto 1</Text>
          <View style={styles.contactContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Nombre y Apellido"
              value={formik.values.contact1Name}
              onChangeText={formik.handleChange("contact1Name")}
            />

            {/* Campo de Número de Celular con Selector de País */}
            <PhoneInput
              ref={phoneInput1}
              value={formik.values.contact1Phone}
              defaultCode="CL"
              layout="first"
              onChangeText={(text) => handlePhoneChange(text, "contact1Phone")}
              onChangeFormattedText={(text) => {
                formik.setFieldValue("contact1PhoneFormatted", text);
              }}
              textInputProps={{
                maxLength: 9,
                keyboardType: "numeric",
              }}
              containerStyle={styles.phoneContainer}
              textContainerStyle={styles.phoneTextContainer}
              countryPickerProps={{ withAlphaFilter: true }}
              withShadow={false}
              disableArrowIcon={false}
              countryPickerButtonStyle={styles.countryPickerButton}
            />
          </View>

          {/* DATOS DE CONTACTO 2 (OPCIONAL) */}
          <Text style={styles.sectionTitle}>Datos de Contacto 2 (Opcional)</Text>
          <View style={styles.contactContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Nombre y Apellido"
              value={formik.values.contact2Name}
              onChangeText={formik.handleChange("contact2Name")}
            />

            {/* Campo de Número de Celular con Selector de País */}
            <PhoneInput
              ref={phoneInput2}
              value={formik.values.contact2Phone}
              defaultCode="CL"
              layout="first"
              onChangeText={(text) => handlePhoneChange(text, "contact2Phone")}
              onChangeFormattedText={(text) => {
                formik.setFieldValue("contact2PhoneFormatted", text);
              }}
              textInputProps={{
                maxLength: 9,
                keyboardType: "numeric",
              }}
              containerStyle={styles.phoneContainer}
              textContainerStyle={styles.phoneTextContainer}
              countryPickerProps={{ withAlphaFilter: true }}
              withShadow={false}
              disableArrowIcon={false}
              countryPickerButtonStyle={styles.countryPickerButton}
            />
          </View>

          {/* Botón para guardar cambios */}
          <Button title="Guardar Cambios" onPress={formik.handleSubmit} />
        </ScrollView>
      </View>
    </View>
  );
}
