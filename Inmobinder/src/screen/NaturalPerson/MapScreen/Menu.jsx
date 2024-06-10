// MenuButton.js
import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Modal, Dimensions, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BotonMenu from '../../../components/NaturalPerson/BotonMenu';
const MenuButton = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleMenu} style={styles.button}>
        <View style={styles.iconContainer}>
          <Ionicons name="menu" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={toggleMenu}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.overlay} onPress={toggleMenu} />
          <View style={styles.menu}>
            {/* Aquí puedes agregar el contenido de tu menú */}
            {/* perfil */}
              
            <View style={styles.profileContainer}>
            <Image source={require('../../../../assets/favicon.png')} style={styles.profile}/>   
            <Text style = {styles.titulo}>11.111.111-1</Text>
            <Text style = {styles.titulo}>Nombre Nombre Apellido Apellido</Text>
            </View>
            {/* opciones */}
            <TouchableOpacity onPress={toggleMenu}>
              <Ionicons name="close-outline" size={24} color="white" />
            </TouchableOpacity>
            {/* Botones */}
            <View style={styles.menuItem}>
            <BotonMenu text="Publicaciones"  />
            <BotonMenu text="Favoritos"  />
            <BotonMenu text="Perfil"  />
            <BotonMenu text="Cerrar Sesión" />
            </View>

             
             
            
          </View>
        </View>
      </Modal>
    </>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 40,
    left: 10,
    padding: 10,
    backgroundColor: '#D7DBDD',
    borderRadius: 50,
    elevation: 3, // Para Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    flexDirection: '',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  menu: {
    width: (3 * width) / 4,
    height: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    padding: 20,
  },
  titulo: {
    fontSize:15,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
    color: "#fff",
},
profileContainer: {
    backgroundColor: "#2E2323", // color gris oscuro
    padding: 0,
    width: (3 * width) / 4,
    Height: '100%',
    position: 'absolute',
    top: 0,
    padding: 20, 
 },
 profile:{
  width: 70,
  height: 70,
  borderRadius: 40,
  borderWidth: 3,
  borderColor: "#fff",
  marginBottom: 10,
  alignSelf: "center",
},
menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    top: 160,

    
},
});

export default MenuButton;
