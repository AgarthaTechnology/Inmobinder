// MenuButton.jsx
import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { auth } from "../../../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import BotonMenu from "../../../components/NaturalPerson/BotonMenu";
import { screen } from "../../../utils/screenName";

const MenuButton = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Navega a la pantalla de login después de cerrar sesión
      navigation.navigate(screen.login.stack, {
        screen: screen.login.login,
      });
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleNavigation = (stackName, screenName) => {
    toggleMenu(); // Cierra el menú
    navigation.navigate(stackName, {
      screen: screenName,
    });
  };

  return (
    <>
      <TouchableOpacity onPress={toggleMenu} style={styles.button}>
        <Image
          source={require("../../../../assets/images/perfil.png")}
          style={styles.profileIcon}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={toggleMenu}
      >
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.menu}>
                <View style={styles.profileContainer}>
                  <Image
                    source={require("../../../../assets/images/perfil.png")}
                    style={styles.profile}
                  />
                  <Text style={styles.titulo}>11.111.111-1</Text>
                  <Text style={styles.titulo}>
                    Nombre Nombre Apellido Apellido
                  </Text>
                </View>
                <View style={styles.menuItem}>
                  <BotonMenu
                    text="Mi Perfil"
                    onPress={() =>
                      handleNavigation(
                        screen.profile.stack,
                        screen.profile.profile
                      )
                    }
                  />
                  <BotonMenu
                    text="Mis Publicaciones"
                    onPress={() =>
                      handleNavigation(
                        screen.publication.stack,
                        screen.publication.publications
                      )
                    }
                  />
                  <BotonMenu
                    text="Añadir Propiedad"
                    onPress={() =>
                      handleNavigation(
                        screen.publication.stack,
                        screen.publication.create
                      )
                    }
                  />
                  <BotonMenu text="Agenda" />
                  <BotonMenu text="Configuración" />
                  <BotonMenu text="Centro de Ayuda" />
                  <BotonMenu text="Agencia" />
                  <BotonMenu text="Mis Clientes" />
                  <BotonMenu
                    text="Cerrar Sesión"
                    onPress={() => handleSignOut()}
                  />
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
  button: {
    position: "absolute",
    top: 40,
    right: 63,
    backgroundColor: "#fff",
    borderRadius: 50,
    elevation: 3,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  profileIcon: {
    width: 38,
    height: 38,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menu: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 80,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  profile: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default MenuButton;
