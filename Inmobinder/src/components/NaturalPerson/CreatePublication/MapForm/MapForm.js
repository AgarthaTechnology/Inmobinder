import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import * as Location from 'expo-location';
import { styles } from './MapForm.styles';
import { Modal } from '../../../Shared/Modal';
import Toast from 'react-native-toast-message';
import MapView, { Marker } from 'react-native-maps';

export function MapForm(props) {
    const { show, close, formik } = props;
    const [location, setLocation] = useState({
        latitude: 0.0,
        longitude: 0.0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                Toast.show({
                    type: 'info',
                    position: 'bottom',
                    text1: 'Tienes que dar permisos de ubicación para continuar',
                });
                return;
            }

            const locationTemp = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: locationTemp.coords.latitude,
                longitude: locationTemp.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        })();
    }, []);

    const saveLocation = () => {
        formik.setFieldValue('location', location);
        close();
    };

    return (
        <Modal show={show} close={close}>
            <MapView initialRegion={location} showsUserLocation={true} style={styles.mapStyle} onRegionChange={(locationTemp) => setLocation(locationTemp)}>
                <Marker draggable coordinate={location} />
            </MapView>
            <View style={styles.mapActions}>
                <Button
                    title="Guardar"
                    containerStyle={styles.btnMapContainerSave}
                    buttonStyle={styles.btnMapSave}
                    onPress={saveLocation}
                />
                <Button
                    title="Cerrar"
                    containerStyle={styles.btnMapContainerCancel}
                    buttonStyle={styles.btnMapCancel}
                    onPress={close}
                />
            </View>
        </Modal>
    );
}
