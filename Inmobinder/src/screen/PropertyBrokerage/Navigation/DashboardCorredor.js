import React from "react";
import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import {StyleSheet, Text, Image} from "react-native";

import ConfiguracionScreen from '../MenuDrawerCorredor/ConfiguracionCorredor';
import AgendaScreen from '../MenuDrawerCorredor/Agenda';
import MisClientesScreen from '../MenuDrawerCorredor/MisClientes';
import CentroAyudaScreen from '../MenuDrawerCorredor/AyudaCorredor';
import AgregaPublicacionesScreen from '../MenuDrawerCorredor/AgregaPublicaciones'
import MisPublicacionesScreen from '../MenuDrawerCorredor/Publicaciones';
import AgenciaScreen from '../MenuDrawerCorredor/Agencia';
import CerrarSesionScreen from '../MenuDrawerCorredor/CerrarSesion';

import HomeScreen from "../HomeScreen";
import BotonMenu from "../../../components/PropertyBrokerage/BotonMenu";
import { View } from "react-native";
import PictureGallery from "../GalleryScreen/PictureGallery";
import VideoGallery from "../GalleryScreen/VideoGallery";
import PictureGalleryBroker from "../GalleryScreen/PictureGalleryBroker";
import AddProperty from "../GalleryScreen/AddProperty";

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
            <Drawer.Screen name ="PictureGalleryBroker" component ={PictureGalleryBroker}/>
            <Drawer.Screen name ="PictureGallery" component ={PictureGallery}/>
            <Drawer.Screen name ="VideoGallery" component ={VideoGallery}/>
            <Drawer.Screen name ="AddProperty" component ={AddProperty}/>
        </Drawer.Navigator>
    )

}
const MenuItems= ({ navigation}) =>{
    return(
        
        <DrawerContentScrollView style = {styles.container}>
             
             <View style={styles.profileContainer}>
            {/* <Image source={require('../../../assets/favicon.png')} style={styles.profile}/>    */}
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
            <BotonMenu text ="Picture Gallery Broker" onPress={ () => navigation.navigate('PictureGalleryBroker') }/>
            <BotonMenu text ="Picture Gallery" onPress={ () => navigation.navigate('PictureGallery') }/>
            <BotonMenu text ="Video Gallery" onPress={ () => navigation.navigate('VideoGallery') }/>
            <BotonMenu text ="Agregar Propiedad" onPress={ () => navigation.navigate('AddProperty') }/>
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