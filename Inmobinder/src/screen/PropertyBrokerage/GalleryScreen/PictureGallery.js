import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

export default function PictureGallery() {
    return (
        <View style={styles.layout}>
            {/* Imagen de fondo */}
            <Image
                source={require('../../../../assets/Pantalla-de-fondo.png')}
                style={styles.backgroundImage}
            />
            
            {/* Contenido de la galería */}
            <View style={styles.container}>

                <View style={styles.containerTitle}>
                <Text style={styles.title}>Galería de fotos </Text>
                </View>
                <View style={styles.line}></View>   
                <Text style={styles.subtitle}>Fotos </Text>
                <View style={styles.galeria1}>
                <View style={styles.images1}>
                    <Image source={require('../../../../assets/favicon.png')} />
                </View>
                <View style={styles.images1}>
                    <Image source={require('../../../../assets/favicon.png')} />
                </View>
                </View>
                <View style={styles.images2}>
                    <Image source={require('../../../../assets/favicon.png')} />
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
        height:530,
        marginTop:60,
        bottom: 15,
        alignSelf: 'center',
        borderRadius: 20,
        Bottom: 15,
        
    },
    containerTitle: {
        alignItems: 'center',
        justifyContent: 'center', // Centra verticalmente
        marginTop:30,
        marginBottom: 15,
    },
    
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle:{
        marginTop:20,
        marginBottom: 15,
        fontWeight: 'bold',

    },
    line: {
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    galeria1:{
        flexDirection: 'row',
        justifyContent:'center',
        marginBottom: 20,
    },
    images1: {
        marginBottom: 20,
        height:123,
        width:130,
        backgroundColor: '#d9d9d9',
        margin:5,
        justifyContent:'center', //centrar vertical
        alignItems: 'center',
    },
    images2: {
        marginBottom: 20,
        height:138,
        width:251,
        backgroundColor: '#d9d9d9',
        margin:5,
        justifyContent:'center', //centrar vertical
        alignItems: 'center',
    },
});
