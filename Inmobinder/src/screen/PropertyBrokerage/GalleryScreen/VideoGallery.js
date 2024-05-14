import React from 'react';
import { View, StyleSheet, Text, Image,TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function VideoGallery() {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
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
                    <Text style={styles.title}>Galería de videos </Text>
                </View>
                <View style={styles.line}></View>
                <Text style={styles.subtitle}>Propiedad 1 </Text>
                <View style={styles.galeria1}>
                    <Video
                        ref={video}
                        style={styles.videoContainer}
                        source={{
                            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                        }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                    <Video
                        ref={video}
                        style={styles.videoContainer}
                        source={{
                            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                        }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                </View>
                <Video
                    ref={video}
                    style={styles.videoContainer2}
                    source={{
                        uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />

                    <View style={styles.document}>
                    <TouchableOpacity style={styles.DownloadDoc}>
                        <Image source={require('../../../../assets/+.png')} style={styles.vector} />
                        <Text style={styles.textDoc}>Añadir Video</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.DownloadDoc} onPress={() => navigation.navigate('DelletePicture')}>
                        <Image source={require('../../../../assets/Trash.png')} style={styles.vector} />
                        <Text style={styles.textDoc}>Eliminar Video</Text>
                    </TouchableOpacity>
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
        marginTop: 60,
        bottom: 15,
        alignSelf: 'center',
        borderRadius: 20,
        Bottom: 15,
    },
    containerTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        marginTop: 20,
        marginBottom: 40,
        fontWeight: 'bold',
    },
    line: {
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    galeria1: {
        flexDirection: 'row',
        justifyContent: 'center',

    },
    videoContainer: {
        marginBottom: 20,
        height: 178,
        width: 128,
        backgroundColor: '#d9d9d9',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoContainer2: {
        height: 138,
        width: 251,
        backgroundColor: '#d9d9d9',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    document: {
        alignItems: 'flex-end',
        width: 251,
        height: 141,
        justifyContent: 'flex-end',

    },

    DownloadDoc: {
        flexDirection: 'row',
        height: 28,
        width: 128,
        backgroundColor: '#d9d9d9',
        borderColor: '#989898',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,

    },
    textDoc: {
        fontSize: 12,
        marginLeft: 7,
    },
    vector: {
        width: 15,
        height: 15,
    },

});
