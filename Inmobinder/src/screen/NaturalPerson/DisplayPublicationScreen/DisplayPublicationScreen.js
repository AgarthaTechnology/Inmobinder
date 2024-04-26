import React from 'react';
import { SafeAreaView, FlatList, View, Text } from 'react-native';
import { DisplayPublication } from '../../../components/NaturalPerson/DisplayPublication/DisplayPublication';
import { styles } from './DisplayPublicationScreen.styles';

const DisplayPublicationScreen = () => {
    return (
        <View style={styles.contentContainer}>
            <Text>hola hola viejos</Text>
            <FlatList 
                data={[{ key: 'displayPublication' }]} // data must be an array
                renderItem={() => <DisplayPublication />}
                // keyExtractor must be provided, here we use the 'key' property of the data array
                keyExtractor={item => item.key}
            />
        </View>
    );
};

export default DisplayPublicationScreen;