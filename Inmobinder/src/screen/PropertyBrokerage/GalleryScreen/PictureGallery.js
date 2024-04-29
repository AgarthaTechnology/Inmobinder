import { StyleSheet, Text, View, Image } from 'react-native';

export default function PictureGallery() {
    return (
        <View  >
            <Text style={styles.title}>Galeria de fotos </Text>
            <View style={styles.container}>
                <View style={styles.line}></View>
                <View style={styles.images1}>
                    <Image source={require('../../../../assets/favicon.png')} />
                    <Image source={require('../../../../assets/favicon.png')} />
                </View>
                <View style={styles.images2}>
                    <Image source={require('../../../../assets/favicon.png')} />
                </View>


            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        backgroundColor: '#d9d9d9',
        top: 100,
        bottom: 15,
        alignSelf: 'center',
        borderRadius: 20,
        Bottom: 15,
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '80%', // Ancho de la línea
        marginBottom: 10, // Espacio entre la línea y las imágenes
    },
    images1: {
        flexDirection: 'row', // Disposición en fila
        height:60,
        
    }
});
