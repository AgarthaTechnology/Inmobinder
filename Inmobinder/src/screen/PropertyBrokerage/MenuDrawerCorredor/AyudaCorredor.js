import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';



// Componentes

const CentroAyudaScreen = ({ navigation}) =>{
    return(
        <View style = {styles.opcion}>
            <TouchableOpacity onPress={() => navigation.navigate('Ayuda')}>
                <Text style = {styles.opcion} >Ayuda con problemas de  seguridad</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Reportar fraude')}>
                <Text style = {styles.opcion} >Reportar fraude</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Reportar problema de funcionamiento')}>
                <Text style = {styles.opcion} >Reportar problema de funcionamiento</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate('Contactar a soporte')}>
                <Text style = {styles.opcion} >Contactar a soporte</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Problema de pago')}>
                <Text style = {styles.opcion} >Problema de pagoo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Enviar comentarios')}>
                <Text style = {styles.opcion}>Enviar comentariosd</Text>
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
export default CentroAyudaScreen;