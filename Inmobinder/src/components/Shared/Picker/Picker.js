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
    flex: 1,
  },
  picker: {
    height: 50,
    width: 150,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
});
