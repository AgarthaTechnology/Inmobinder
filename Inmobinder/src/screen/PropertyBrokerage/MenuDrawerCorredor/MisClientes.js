import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const MisClientesScreen = ({ navigation }) => {
    return (
        <View >
            <View style={Styles.buttonContainer}>
                <Image source={require('../../../../assets/favicon.png')} style={Styles.profile} />
                <View style={Styles.buttonContainer2}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileProperty')}>
                        <Text style={Styles.text}>Nombre Nombre Apellido Apellido</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={Styles.buttonContainer}>
                <Image source={require('../../../../assets/favicon.png')} style={Styles.profile} />
                <View style={Styles.buttonContainer2}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileProperty')}>
                        <Text style={Styles.text}>Nombre Nombre Apellido Apellido</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={Styles.buttonContainer}>
                <Image source={require('../../../../assets/favicon.png')} style={Styles.profile} />
                <View style={Styles.buttonContainer2}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileProperty')}>
                        <Text style={Styles.text}>Nombre Nombre Apellido Apellido</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={Styles.buttonContainer}>
                <Image source={require('../../../../assets/favicon.png')} style={Styles.profile} />
                <View style={Styles.buttonContainer2}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileProperty')}>
                        <Text style={Styles.text}>Nombre Nombre Apellido Apellido</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({

    buttonContainer: {
        flexDirection: 'row', // Disposición en fila
        backgroundColor: '#fff',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 15,
        height: 89,
        width: 394,
        padding: 15,
        margin: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,


        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
    },
    buttonContainer2: {
        width: 250.74,
        height: 35,
        borderRadius: 30,
        backgroundColor: '#d9d9d9',
        flex: 1,
        top: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
    },
    profile: {
        width: 65,
        height: 65,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#fff",
        marginBottom: 10,
        alignSelf: "center",


    },


})

export default MisClientesScreen;