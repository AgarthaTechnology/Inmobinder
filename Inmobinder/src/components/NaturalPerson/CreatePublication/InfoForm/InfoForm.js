import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Input } from "react-native-elements";
import { MapForm } from "../MapForm";
import { styles } from "./InfoForm.styles";
import { UploadImage } from "../ImagePublication/UploadImage";
import { RoomsPicker, BathroomsPicker } from "../../../Shared/Picker/Picker";
import InputNumber from "../../../Shared/InputNumber/InputNumber";
import { RegyCom } from "./RegyCom";

const ConditionPicker = ({ selectedValue, onValueChange, error }) => (
  <>
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.picker}
    >
      <Picker.Item label="Condición" value="" />
      <Picker.Item label="Nuevo" value="Nuevo" />
      <Picker.Item label="Usado" value="Usado" />
    </Picker>
    {error && <Text style={styles.error}>{error}</Text>}
  </>
);

const ErrorMessage = ({ error }) =>
  error ? <Text style={styles.error}>{error}</Text> : null;

const handleFieldChange = (formik, field) => (text) => {
  formik.setFieldValue(field, text);
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
      <Text style={styles.title}>Crear {propertyType} </Text>
      <TextInput
        placeholder="Nombre de la propiedad"
        style={styles.input}
        onChangeText={handleFieldChange(formik, "nameProperty")}
        value={formik.values.nameProperty}
      />
      <ErrorMessage error={formik.errors.nameProperty} />

      <UploadImage formik={formik} images={images} />

      {/* ESTADO DE LA PROPIEDAD */}
      <Picker
        selectedValue={formik.values.state}
        onValueChange={(value) => formik.setFieldValue("state", value)}
        style={styles.picker}
        mode="dropdown"
      >
        <Picker.Item label="Estado" value="" />
        <Picker.Item label="Venta" value="Venta" />
        <Picker.Item label="Arriendo" value="Arriendo" />
      </Picker>
      <ErrorMessage error={formik.errors.state} />

      {(propertyType === "Casa" || propertyType === "Departamento") && (
        <ConditionPicker
          selectedValue={formik.values.condition}
          onValueChange={(value) => formik.setFieldValue("condition", value)}
          error={formik.errors.condition}
        />
      )}

      <Text style={styles.label}>Dirección:</Text>
      <Input
        inputContainerStyle={styles.inputContainer}
        rightIcon={{
          type: "material-community",
          name: "map-marker-radius",
          color: getColorIconMap(formik),
          onPress: onOpenCloseMap,
        }}
        onChangeText={handleFieldChange(formik, "address")}
        value={formik.values.address}
        errorMessage={formik.errors.address}
      />
      <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.descriptionInput}
        multiline={true}
        onChangeText={handleFieldChange(formik, "description")}
        value={formik.values.description}
      />
      <ErrorMessage error={formik.errors.description} />

      <Text style={styles.label}>Precio:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={handleFieldChange(formik, "price")}
        value={formik.values.price}
      />
      <ErrorMessage error={formik.errors.price} />

      {(propertyType === "Casa" || propertyType === "Departamento") && (
        <View style={styles.row}>
          <RoomsPicker
            selectedValue={formik.values.rooms}
            onValueChange={(value) => formik.setFieldValue("rooms", value)}
            error={formik.errors.rooms}
          />
          <BathroomsPicker
            selectedValue={formik.values.bathrooms}
            onValueChange={(value) => formik.setFieldValue("bathrooms", value)}
            error={formik.errors.bathrooms}
          />
        </View>
      )}

      {(propertyType === "Casa" || propertyType === "Departamento") && (
        <InputNumber
          value={formik.values.commonExpenses}
          onChangeText={handleFieldChange(formik, "commonExpenses")}
          error={formik.errors.commonExpenses}
        />
      )}

      <Text style={styles.label}>Metros Totales:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={handleFieldChange(formik, "metters")}
        value={formik.values.metters}
      />
      <ErrorMessage error={formik.errors.metters} />

      {propertyType === "Casa" && (
        <>
          <Text style={styles.label}>Metros Construidos:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={handleFieldChange(formik, "mettersProperty")}
            value={formik.values.mettersProperty}
          />
          <ErrorMessage error={formik.errors.mettersProperty} />
        </>
      )}

      {propertyType === "Departamento" && (
        <View>
          <Text style={styles.label}>Metros Permitidos:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={handleFieldChange(formik, "allowmetters")}
            value={formik.values.allowmetters}
          />
          <ErrorMessage error={formik.errors.allowmetters} />
        </View>
      )}

      <RegyCom formik={formik} ErrorMessage={ErrorMessage} />
    </View>
  );
}
