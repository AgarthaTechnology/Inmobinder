import React from 'react';
import { View, StyleSheet, Text, Image,TouchableOpacity } from 'react-native';

export default function ProfileProperty() {

    return (
        <View style={styles.layout}>
            <Image source={require('../../../../assets/Pantalla-de-fondo.png')}
                style={styles.backgroundImage} />

            {/* Contenido de la galería */}
            <View style={styles.container}>{/*fondo blanco*/}
                <View style={styles.headContainer}>
                    <View style={styles.elemento1}>
                        <Image source={require('../../../../assets/favicon.png')} style={styles.favicon} />
                    </View>
                    <View style={styles.elemento2}>
                        <Text style={styles.textoHead}>Propiedad 1</Text>
                    </View>
                </View>

                <View style={styles.dataContainer}>
                    <View >
                        <Text style={styles.dataClient}>Nobre Nombre Apellido Apellido</Text>
                        <Text style={styles.dataClient}>+56 9 123456778</Text>
                        <Text style={styles.dataClient}>nombre@agarthatechnology@gmail.com</Text>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.sendMessage}>
                            <Text>Enviar mensaje a "Nombre"</Text>
                        </TouchableOpacity>
                    </View>
                </View>



                <View style={styles.documentContainer}>
                    <View style={styles.documentationTitle}>
                        <Text style={styles.textoTit}>Documentación</Text>
                    </View>
                    <View>
                    <View style={styles.line}></View>
                    <View style={styles.document}>
                    <Text>Documento 1</Text>
                        <TouchableOpacity style={styles.DownloadDoc}>
                            <Text style={styles.textDoc}>Descargar archivo</Text>
                            <Image source={require('../../../../assets/Vector.png')} style={styles.vector} />
                        </TouchableOpacity>
                    </View>
                    </View>

                    <View style={styles.document}>
                    <Text>Documento 2</Text>
                        <TouchableOpacity style={styles.DownloadDoc}>
                            <Text style={styles.textDoc}>Descargar archivo</Text>
                            <Image source={require('../../../../assets/Vector.png')} style={styles.vector} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.document}>
                    <Text>Documento 3</Text>
                        <TouchableOpacity style={styles.DownloadDoc}>
                            <Text style={styles.textDoc}>Descargar archivo</Text>
                            <Image source={require('../../../../assets/Vector.png')} style={styles.vector} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 345,
        height: 530,
        marginTop: 50,
        bottom: 15,
        alignSelf: 'center',
        borderRadius: 20,
        Bottom: 15,
    },

    headContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: 304,
        flexDirection: 'row', // Disposición en fila

    },
    elemento1: {
        flex: 1, // Hace que el primer elemento ocupe la mitad del ancho del contenedor
        alignItems: 'center', // Centra horizontalmente dentro del elemento
    },
    elemento2: {
        flex: 1, // Hace que el segundo elemento ocupe la mitad del ancho del contenedor

    },
    textoHead: {
        fontSize: 24,

    },
    favicon: {
        width: 90,
        height: 90,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#fff",
        marginBottom: 10,
        alignSelf: "center",


    },

    dataContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 185,
        width: 309,
        backgroundColor: '#d9d9d9',
        borderRadius: 26,
        marginBottom:3,
    },

    dataClient:{
        paddingBottom:8,
        fontSize:15,
    },

    sendMessage:{
        width: 239,
        height: 50,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        marginTop: 15,
    },

    documentContainer: {

        justifyContent: 'center',
        height: 338,
        width: 327,
        borderRadius: 26,
        paddingLeft:25,
    },

    documentationTitle:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        height: 84,
        width:261,

    },

    textoTit:{
        fontWeight: 'bold',
        fontSize:20,
    },
    containerTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        marginTop: 20,
        marginBottom: 15,
    },
    line: {
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent:'center',

    },
    document:{
        width:290,
        height: 87,
        justifyContent:'center',
    },
    DownloadDoc:{
        flexDirection: 'row',
        height: 35,
        width:150,
        backgroundColor:'#d9d9d9',
        borderColor:'#989898',
        borderWidth: 1,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 5,

    },
    textDoc:{
        fontSize: 14,
        marginRight:7,
    },
    vector:{
        width:17,
        height:17,
    },

});
