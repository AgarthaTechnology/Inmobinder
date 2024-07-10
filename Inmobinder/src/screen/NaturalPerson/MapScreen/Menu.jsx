import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Modal, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BotonMenu from '../../../components/NaturalPerson/BotonMenu';
import { screenName } from '../../../utils/screenName';

const MenuButton = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleMenu} style={styles.button} >
          <Image source={require('../../../../assets/images/perfil.png')} style={styles.profileIcon} />
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
              <Image source={require('../../../../assets/images/perfil.png')} style={styles.profile}/>   
              <Text style={styles.titulo}>11.111.111-1</Text>
              <Text style={styles.titulo}>Nombre Nombre Apellido Apellido</Text>
            </View>
            <View style={styles.menuItem}>
              <BotonMenu text="Mi Perfil" onPress={() => navigation.navigate(screenName.profile.profile)}/>
              <BotonMenu text="Mis Publicaciones" onPress={() => navigation.navigate(screenName.publication.publications)}/>
              <BotonMenu text="Añadir Propiedad"  onPress={() => navigation.navigate(screenName.publication.form)}/>
              <BotonMenu text="Agenda" />
              <BotonMenu text="Configuración" />
              <BotonMenu text="Centro de Ayuda" />
              <BotonMenu text="Agencia" />
              <BotonMenu text="Mis Clientes" />
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
    position: 'absolute',
    top: 40,
    right: 63,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 3,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 38,
    height: 38,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginBottom: 80,
  },
  profileContainer: {
    alignItems: 'center',
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
    position: 'absolute',
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
