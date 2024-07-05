import React from "react";
import { Picker } from "@react-native-picker/picker";
import { View, Text, StyleSheet } from "react-native";

export const RoomsPicker = ({ selectedValue, onValueChange, error }) => (
  <View style={styles.pickerContainer}>
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.picker}
    >
      <Picker.Item label="Habitaciones" value="" />
      {[...Array(10)].map((_, i) => (
        <Picker.Item key={i} label={String(i + 1)} value={i + 1} />
      ))}
    </Picker>
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

export const BathroomsPicker = ({ selectedValue, onValueChange, error }) => (
  <View style={styles.pickerContainer}>
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.picker}
    >
      <Picker.Item label="Baños" value="" />
      {[...Array(10)].map((_, i) => (
        <Picker.Item key={i} label={String(i + 1)} value={i + 1} />
      ))}
    </Picker>
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  pickerContainer: {
    width: "45%",
    marginHorizontal: 10,
  },
  picker: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
  },
  error: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: 5,
    marginHorizontal: 10,
  },
});
