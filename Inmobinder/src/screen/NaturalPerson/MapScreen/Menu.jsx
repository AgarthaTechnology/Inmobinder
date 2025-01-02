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
  ActivityIndicator,
} from "react-native";
import { auth } from "../../../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import BotonMenu from "../../../components/NaturalPerson/BotonMenu";
import { screen } from "../../../utils/screenName";
import { useUserProfile } from "../../../components/NaturalPerson/Profile/useUserProfile";

const MenuButton = () => {
  // Traemos la info del perfil desde Firestore
  const { data, isLoading, error } = useUserProfile();

  // Control de la visibilidad del modal
  const [isMenuVisible, setMenuVisible] = useState(false);

  // Para la navegación
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
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
    toggleMenu();
    navigation.navigate(stackName, {
      screen: screenName,
    });
  };

  const user = data && data.length > 0 ? data[0] : null;

  return (
    <>
      <TouchableOpacity onPress={toggleMenu} style={styles.button}>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color="#0000ff"
            style={styles.loader}
          />
        ) : (
          <Image
            source={
              user && user.image && user.image.trim() !== ""
                ? { uri: user.image }
                : require("../../../../assets/images/perfil.png")
            }
            style={styles.profileIcon}
            onError={() => console.log("Error al cargar la imagen de perfil")}
          />
        )}
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
                  {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                  ) : user ? (
                    <>
                      <Image
                        source={
                          user.image && user.image.trim() !== ""
                            ? { uri: user.image }
                            : require("../../../../assets/images/perfil.png")
                        }
                        style={styles.profile}
                        onError={() =>
                          console.log("Error al cargar la imagen de perfil")
                        }
                      />
                      <View style={styles.profileDetails}>
                        <Text style={styles.titulo}>{user.nombre}</Text>
                        <Text style={styles.titulo}> {user.apellido}</Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <Image
                        source={require("../../../../assets/images/perfil.png")}
                        style={styles.profile}
                      />
                      <Text style={styles.titulo}>Usuario Desconocido</Text>
                    </>
                  )}
                </View>

                <View style={styles.menuItemsContainer}>
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
  loader: {
    margin: 8,
  },
  profileIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
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
    marginBottom: 180,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileDetails: {
    flexDirection: "row",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
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
  menuItemsContainer: {
    marginTop: 10,
  },
});

export default MenuButton;
