import React from "react";
import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import {StyleSheet, Text, Image} from "react-native";

import ConfiguracionScreen from '../PropertyBrokerage/MenuDrawerCorredor/ConfiguracionCorredor';
import AgendaScreen from '../PropertyBrokerage/MenuDrawerCorredor/Agenda';
import MisClientesScreen from '../PropertyBrokerage/MenuDrawerCorredor/MisClientes';
import CentroAyudaScreen from '../PropertyBrokerage/MenuDrawerCorredor/AyudaCorredor';
import AgregaPublicacionesScreen from '../PropertyBrokerage/MenuDrawerCorredor/AgregaPublicaciones'
import MisPublicacionesScreen from '../PropertyBrokerage/MenuDrawerCorredor/Publicaciones';
import AgenciaScreen from '../PropertyBrokerage/MenuDrawerCorredor/Agencia';
import CerrarSesionScreen from '../PropertyBrokerage/MenuDrawerCorredor/CerrarSesion';

import PictureGallery from "../PropertyBrokerage/GalleryScreen/PictureGallery";

import HomeScreen from "../PropertyBrokerage/HomeScreen";
import BotonMenu from "../../components/PropertyBrokerage/BotonMenu";
import { View } from "react-native";

const Drawer = createDrawerNavigator()

export function DrawerNavigation(){
    return(
        <Drawer.Navigator drawerContent={ (props) => <MenuItems { ...props}/>}>
            <Drawer.Screen name ="Home" component ={HomeScreen}/>
            <Drawer.Screen name ="MisPublicaciones" component ={MisPublicacionesScreen}/>
            <Drawer.Screen name ="AgregarPublicacion" component ={AgregaPublicacionesScreen}/>
            <Drawer.Screen name ="MisClientes" component ={MisClientesScreen}/>
            <Drawer.Screen name ="Agenda" component ={AgendaScreen}/>
            <Drawer.Screen name ="Configuración" component ={ConfiguracionScreen}/>
            <Drawer.Screen name ="Centro de Ayuda" component ={CentroAyudaScreen}/>
            <Drawer.Screen name ="Agencia" component ={AgenciaScreen}/>
            <Drawer.Screen name ="Cerrar Sesión" component ={CerrarSesionScreen}/>
            <Drawer.Screen name ="PictureGallery" component ={PictureGallery}/>
        </Drawer.Navigator>
    )

}
const MenuItems= ({ navigation}) =>{
    return(
        
        <DrawerContentScrollView style = {styles.container}>
             
             <View style={styles.profileContainer}>
            <Image source={require('../../../assets/favicon.png')} style={styles.profile}/>   
            <Text style = {styles.titulo}>11.111.111-1</Text>
            <Text style = {styles.titulo}>Nombre Nombre Apellido Apellido</Text>
            </View>
            <View style={styles.menu} >
            <BotonMenu text ="Mis Publicaciones" onPress={ () => navigation.navigate('MisPublicaciones') } />
            <BotonMenu text ="Agregar Publicación" onPress={ () => navigation.navigate('AgregarPublicacion') }/>
            <BotonMenu text ="Mis Clientes" onPress={ () => navigation.navigate('MisClientes') }/>
            <BotonMenu text ="Agenda" onPress={ () => navigation.navigate('Agenda') }/>
            <BotonMenu text ="Configuración" onPress={ () => navigation.navigate('Configuración')}/>
            <BotonMenu text ="Centro de Ayuda" onPress={ () => navigation.navigate('Centro de Ayuda') }/>
            <BotonMenu text ="Agencia" onPress={ () => navigation.navigate('Agencia') }/>
            <BotonMenu text ="Cerrar Sesión" onPress={ () => navigation.navigate('Cerrar Sesión') }/>
            
            
            <BotonMenu text ="PictureGallery" onPress={ () => navigation.navigate('PictureGallery') }/>
            </View>
        </DrawerContentScrollView>
    )
}


const styles =StyleSheet.create({
    container: {
    backgroundColor: "#fff",


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
    Width: 320,
    Height: 243,
    
 },
 menu:{
    padding:15,
 },

profile:{
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
    alignSelf: "center",


}


})