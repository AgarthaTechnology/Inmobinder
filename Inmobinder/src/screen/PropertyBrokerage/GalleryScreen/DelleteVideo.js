import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
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
        marginBottom: 20,
    },
    galeria1: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
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
        marginBottom: 20,
        height: 138,
        width: 251,
        backgroundColor: '#d9d9d9',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
