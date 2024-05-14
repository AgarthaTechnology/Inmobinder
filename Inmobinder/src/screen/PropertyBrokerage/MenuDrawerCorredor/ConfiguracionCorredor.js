import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';



// Componentes

const ConfiguracionScreen = ({ navigation}) =>{
    return(
        <View style = {styles.opcion}>
            <TouchableOpacity onPress={() => navigation.navigate('Inicio Sesion')}>
                <Text style = {styles.opcion} >Inicio de sesión y seguridad</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Pagos y cobros')}>
                <Text style = {styles.opcion} >Pagos y cobros</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Accesibilidad')}>
                <Text style = {styles.opcion} >Accesibilidad</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate('Notificaciones')}>
                <Text style = {styles.opcion} >Notificaciones</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Terminos de servicio')}>
                <Text style = {styles.opcion} >Terminos de servicio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Politica de privacidad')}>
                <Text style = {styles.opcion}>Política de privacidad</Text>
            </TouchableOpacity>

        </View>
    )
    
}



const styles =StyleSheet.create({
    opcion: {
        width: 300,
        height: 37,
        //font: "cairo",
        fontWeight: "bold",
        marginBottom:15,
        fontSize:15,
        top:15,
        left:15,
        
 
},
})
export default ConfiguracionScreen;