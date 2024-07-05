// CommonExpensesInput.js
import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const InputNumber = ({ value, onChangeText, error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gastos Comunes:</Text>
      <TextInput
        style={styles.expensesInput}
        placeholder="$000.000"
        keyboardType="numeric"
        onChangeText={onChangeText}
        value={value}
      />
      {error && <Text style={[styles.error, { marginLeft: 40 }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  expensesInput: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    marginHorizontal: 10,
    backgroundColor: "#fff",
  },
  error: {
    color: "#FF0000",
    fontSize: 12,
    textAlign: "center",
  },
});

export default InputNumber;
