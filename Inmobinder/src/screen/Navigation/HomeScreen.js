import React from "react";
import { View, Text } from "react-native";

const HomeScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center' }}>¡Bienvenido a la pantalla de inicio!</Text>
        </View>
    );
}

export default HomeScreen;