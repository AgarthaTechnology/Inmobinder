import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { useFormik } from "formik";
import { MapForm } from "../MapForm";
import { styles } from "./InfoForm.styles";
import PhoneInput from "react-native-phone-number-input";

// Definir la función formatPrice
const formatPrice = (value) => {
  const numericValue = value.toString().replace(/\D/g, "");
  if (!numericValue) return "";
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export function InfoForm({ formik, images }) {
  // Estado para mostrar el mapa
  const [showMap, setShowMap] = useState(false);
  const phoneInput1 = useRef(null);
  const phoneInput2 = useRef(null);

  const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

  // Obtener el color del icono del mapa
  const getColorIconMap = () => {
    if (formik.errors.location) return "#FF0000";
    if (formik.values.location) return "#00a680";
    return "#c2c2c2";
  };

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
          <Text style={styles.sectionTitle}>Nombre de la propiedad</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa nombre de la propiedad"
            value={formik.values.nameProperty}
            onChangeText={formik.handleChange("nameProperty")}
          />
          {formik.touched.nameProperty && formik.errors.nameProperty && (
            <Text style={styles.errorText}>{formik.errors.nameProperty}</Text>
          )}

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
          {formik.touched.state && formik.errors.state && (
            <Text style={styles.errorText}>{formik.errors.state}</Text>
          )}

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
          {formik.touched.condition && formik.errors.condition && (
            <Text style={styles.errorText}>{formik.errors.condition}</Text>
          )}

          {/* DIRECCIÓN */}
          <Text style={styles.sectionTitle}>Dirección</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa dirección"
            value={formik.values.address}
            onChangeText={formik.handleChange("address")}
          />
          {formik.touched.address && formik.errors.address && (
            <Text style={styles.errorText}>{formik.errors.address}</Text>
          )}
          <Button
            title="Seleccionar ubicación en el mapa"
            onPress={onOpenCloseMap}
            style={styles.mapButton}
          />
          {formik.touched.location && formik.errors.location && (
            <Text style={styles.errorText}>{formik.errors.location}</Text>
          )}

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
          {formik.touched.price && formik.errors.price && (
            <Text style={styles.errorText}>{formik.errors.price}</Text>
          )}

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
          {formik.touched.rooms && formik.errors.rooms && (
            <Text style={styles.errorText}>{formik.errors.rooms}</Text>
          )}

          {/* BAÑOS */}
          <Text style={styles.sectionTitle}>Baños</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa número de baños"
            value={formatPrice(formik.values.bathrooms)}
            onChangeText={(text) => {
              const formattedValue = formatPrice(text);
              formik.setFieldValue(
                "bathrooms",
                formattedValue.replace(/\./g, "")
              );
            }}
            keyboardType="numeric"
          />
          {formik.touched.bathrooms && formik.errors.bathrooms && (
            <Text style={styles.errorText}>{formik.errors.bathrooms}</Text>
          )}

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
          {formik.touched.commonExpenses && formik.errors.commonExpenses && (
            <Text style={styles.errorText}>
              {formik.errors.commonExpenses}
            </Text>
          )}

          {/* METROS CONSTRUIDOS */}
          <Text style={styles.sectionTitle}>Metros construidos</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa metros construidos"
            value={formatPrice(formik.values.metters)}
            onChangeText={(text) => {
              const formattedValue = formatPrice(text);
              formik.setFieldValue(
                "metters",
                formattedValue.replace(/\./g, "")
              );
            }}
            keyboardType="numeric"
          />
          {formik.touched.metters && formik.errors.metters && (
            <Text style={styles.errorText}>
              {formik.errors.metters}
            </Text>
          )}

          {/* METROS TOTALES */}
          <Text style={styles.sectionTitle}>Metros totales</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ingresa metros totales"
            value={formatPrice(formik.values.mettersProperty)}
            onChangeText={(text) => {
              const formattedValue = formatPrice(text);
              formik.setFieldValue(
                "mettersProperty",
                formattedValue.replace(/\./g, "")
              );
            }}
            keyboardType="numeric"
          />
          {formik.touched.mettersProperty && formik.errors.mettersProperty && (
            <Text style={styles.errorText}>
              {formik.errors.mettersProperty}
            </Text>
          )}

          {/* DATOS DE CONTACTO */}
          <Text style={styles.sectionTitle}>Datos de Contacto 1</Text>
          <View style={styles.contactContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Nombre y Apellido"
              value={formik.values.contact1Name}
              onChangeText={formik.handleChange("contact1Name")}
            />
            {formik.touched.contact1Name && formik.errors.contact1Name && (
            <Text style={styles.errorText}>{formik.errors.contact1Name}</Text>
          )}

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
          <Text style={styles.sectionTitle}>
            Datos de Contacto 2 (Opcional)
          </Text>
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
        </ScrollView>
      </View>
    </View>
  );
}