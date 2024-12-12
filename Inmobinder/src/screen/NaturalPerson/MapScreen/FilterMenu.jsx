import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";

const FilterMenu = ({ applyFilters }) => {
  const [visible, setMenuVisible] = useState(true);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [rooms, setRooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [condition, setCondition] = useState(null);
  const [metters, setMetters] = useState(null);

  const navigation = useNavigation();

  const handleClear = () => {
    setRooms(null);
    setCondition(null);
    setPriceRange([0, Infinity]);
    setBathrooms(null);
    setMetters(null);
  };

  const handleApplyFilters = () => {
    const filters = {
      priceRange: [
        priceMin ? parseFloat(priceMin) : 0,
        priceMax ? parseFloat(priceMax) : Infinity,
      ],
      rooms: rooms ? parseInt(rooms) : null,
      bathrooms: bathrooms ? parseInt(bathrooms) : null,
      condition,
      metters: metters ? parseInt(metters) : null,
    };

    navigation.navigate(screen.publication.stack, {
      screen: screen.publication.publications,
      params: { filters },
    });

    toggleMenu();
  };

  const toggleMenu = () => {
    setMenuVisible(!visible);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={toggleMenu}
      >
        {/* Detect touch outside */}
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.modalOverlay}>
            {/* Prevent close on touch inside */}
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                {/* Estado */}
                <Text style={styles.label}>Estado</Text>
                <View style={styles.segmentedControl}>
                  <TouchableOpacity onPress={() => setCondition("Nuevo")}>
                    <Text
                      style={
                        condition === "Nuevo"
                          ? styles.activeSegment
                          : styles.segment
                      }
                    >
                      Nuevo
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setCondition("Usado")}>
                    <Text
                      style={
                        condition === "Usado"
                          ? styles.activeSegment
                          : styles.segment
                      }
                    >
                      Usado
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Rango de precio */}
                <Text style={styles.label}>Rango de precios</Text>
                <View style={styles.rangeInputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Minimo"
                    keyboardType="numeric"
                    value={priceMin}
                    onChangeText={(text) =>
                      setPriceMin(text.replace(/\D/g, ""))
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Maximo"
                    keyboardType="numeric"
                    value={priceMax}
                    onChangeText={(text) =>
                      setPriceMax(text.replace(/\D/g, ""))
                    }
                  />
                </View>

                {/* Tamaño */}
                <Text style={styles.label}>Metros Cuadrados Totales</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingrese un valor"
                  keyboardType="numeric"
                  value={metters}
                  onChangeText={(text) => setMetters(text)}
                />

                {/* Habitaciones */}
                <Text style={styles.label}>Habitaciones</Text>
                <View style={styles.segmentedControl}>
                  {[1, 2, 3, 4, 5].map((room) => (
                    <TouchableOpacity key={room} onPress={() => setRooms(room)}>
                      <Text
                        style={
                          rooms === room ? styles.activeSegment : styles.segment
                        }
                      >
                        {room >= 5 ? "5+" : room}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Baños */}
                <Text style={styles.label}>Baños</Text>
                <View style={styles.segmentedControl}>
                  {[1, 2, 3, 4, 5].map((bath) => (
                    <TouchableOpacity
                      key={bath}
                      onPress={() => setBathrooms(bath)}
                    >
                      <Text
                        style={
                          bathrooms === bath
                            ? styles.activeSegment
                            : styles.segment
                        }
                      >
                        {bath === 5 ? "5+" : bath}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.buttons}>
                  {/* Apply button */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleApplyFilters}
                  >
                    <Text style={styles.buttonText}>Aplicar Filtros</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  segmentedControl: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-around",
  },
  segment: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
  },
  activeSegment: {
    padding: 10,
    backgroundColor: "green",
    color: "white",
    borderRadius: 5,
    textAlign: "center",
  },
});

export default FilterMenu;
