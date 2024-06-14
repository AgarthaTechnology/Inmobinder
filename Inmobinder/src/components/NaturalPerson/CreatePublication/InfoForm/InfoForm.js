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
  <View style={styles.pickerContainer}>
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
  </View>
);

const ErrorMessage = ({ error }) =>
  error ? <Text style={styles.error}>{error}</Text> : null;

const handleFieldChange = (formik, field) => (text) => {
  formik.setFieldValue(field, text);
};

export function InfoForm({ formik, images, propertyType }) {
  //estado para mostrar el mapa
  const [showMap, setShowMap] = useState(false);

  const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

  //Obtener el color del icono del mapa
  const getColorIconMap = (formik) => {
    if (formik.errors.location) return "#FF0000";

    if (formik.values.location) return "#00a680";

    return "#c2c2c2";
  };

  return (
    <View>
      <TextInput
        placeholder="Nombre de la propiedad"
        style={styles.input}
        onChangeText={handleFieldChange(formik, "nameProperty")}
      />
      <ErrorMessage error={formik.errors.nameProperty} />

      <View style={styles.container}>
        <UploadImage formik={formik} images={images} />
      </View>

      {/* ESTADO DE LA PROPIEDAD */}
      <View style={styles.container}>
        <Picker
          selectedValue={formik.values.state}
          onValueChange={(value) => formik.setFieldValue("state", value)}
          style={styles.picker}
          mode="dropdown"
        >
          <Picker.Item label="Estado" value="" />
          <Picker.Item label="Venta" value="Venta" />
          <Picker.Item label="Arriendo y Venta" value="Arriendo y Venta" />
          <Picker.Item label="Arriendo" value="Arriendo" />
        </Picker>
        <ErrorMessage error={formik.errors.state} />
      </View>

      {(propertyType === "Casa" || propertyType === "Departamento") && (
        <ConditionPicker
          selectedValue={formik.values.condition}
          onValueChange={(value) => formik.setFieldValue("condition", value)}
          error={formik.errors.condition}
        />
      )}

      <View style={styles.container}>
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
          errorMessage={formik.errors.address}
        />
        <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
      </View>

      <View style={styles.container}>
        <Text>Descripción:</Text>
        <TextInput
          style={styles.descriptionInput}
          multiline={true}
          onChangeText={handleFieldChange(formik, "description")}
        />
        <ErrorMessage error={formik.errors.description} />
      </View>

      <View style={styles.container}>
        <Text>Precio:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={handleFieldChange(formik, "price")}
        />
        <ErrorMessage error={formik.errors.price} />
      </View>

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

      <InputNumber
        value={formik.values.commonExpenses}
        onChangeText={handleFieldChange(formik, "commonExpenses")}
        error={formik.errors.commonExpenses}
      />

      <View style={styles.row}>
        <Text style={styles.label}>Metros Totales:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={handleFieldChange(formik, "metters")}
        />
        <ErrorMessage error={formik.errors.metters} />
      </View>

      {(propertyType === "Casa" || propertyType === "Departamento") && (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.label}>Metros Construidos:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleFieldChange(formik, "mettersProperty")}
            />
            <ErrorMessage error={formik.errors.mettersProperty} />
          </View>
        </View>
      )}

      {propertyType === "Departamento" && (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.label}>Metros Permitidos:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleFieldChange(formik, "allowmetters")}
            />
            <ErrorMessage error={formik.errors.allowmetters} />
          </View>
        </View>
      )}

      <RegyCom formik={formik} ErrorMessage={ErrorMessage} />
    </View>
  );
}
