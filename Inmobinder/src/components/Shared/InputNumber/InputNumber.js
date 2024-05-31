// CommonExpensesInput.js
import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const InputNumber = ({ value, onChangeText, error }) => {
  return (
    <View style={styles.container}>
      <Text>Gastos Comunes:</Text>
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
  expensesInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
});

export default InputNumber;
