import React, { useState } from "react";
import { View, TextInput, Text, Image } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Input } from "react-native-elements";
import { MapForm } from "../MapForm";
import { styles } from "./InfoForm.styles";
import { ImagePublication } from "../ImagePublication";

export function InfoForm(props) {
    const { formik } = props;
    const [showMap, setShowMap] = useState(false);

    const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

    const getColorIconMap = (formik) => {
        if (formik.errors.location) {
            return '#FF0000';
        }

        if (formik.values.location) {
            return '#00a680';
        }

        return '#c2c2c2';
    }

    return (
        <>
            <View>
                <View>
                    <TextInput
                        placeholder="Nombre de la propiedad"
                        style={styles.input}
                        onChangeText={(text) => formik.setFieldValue("nameProperty", text)}
                    />
                    {formik.errors.nameProperty && <Text style={styles.error}>{formik.errors.nameProperty}</Text>}

                </View>
                    <ImagePublication formik={formik}/>

                <View style={styles.Expenses}>
                    <Text>Gastos Comunes:</Text>
                    <TextInput
                        style={styles.expensesInput}
                        placeholder="$000.000"
                        keyboardType="numeric"
                        onChangeText={(text) => formik.setFieldValue("commonExpenses", text)}
                    />
                </View>
                {formik.errors.commonExpenses && <Text style={[styles.error, { marginLeft: 40 }]}>{formik.errors.commonExpenses}</Text>}


                <View style={styles.container}>
                    <Picker
                        selectedValue={formik.values.state}
                        onValueChange={(itemValue) => formik.setFieldValue("state", itemValue)}
                        style={styles.picker}
                        mode="dropdown"
                    >
                        <Picker.Item label="Estado" value="" />
                        <Picker.Item label="Arriendo" value="Arriendo" />
                        <Picker.Item label="Venta" value="Venta" />
                    </Picker>
                </View>
                    {formik.errors.state && <Text style={styles.error}>{formik.errors.state}</Text>}

                <View style={[styles.container, styles.row]}>
                    <Text style={styles.label}>Metros Cuadrados:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={(text) => formik.setFieldValue("metters", text)}
                    />
                    {formik.errors.metters && <Text style={styles.error}>{formik.errors.metters}</Text>}
                </View>

                <View style={styles.container} >
                    <Text style={styles.label}>Dirección:</Text>
                    <Input
                        inputContainerStyle={styles.inputContainer}
                        rightIcon={{
                            type: 'material-community',
                            name: 'map-marker-radius',
                            color: getColorIconMap(formik),
                            onPress: onOpenCloseMap
                        }}
                        onChangeText={(text) => formik.setFieldValue("address", text)}
                        errorMessage={formik.errors.address}
                    />
                </View>

                <View style={styles.row}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={formik.values.city}
                            onValueChange={(itemValue) => formik.setFieldValue("city", itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Comuna" value="" />
                            <Picker.Item label="Nose" value="Nose" />
                        </Picker>
                        {formik.errors.city && <Text style={styles.error}>{formik.errors.city}</Text>}
                    </View>

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={formik.values.region}
                            onValueChange={(itemValue) => formik.setFieldValue("region", itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Region" value="" />
                            <Picker.Item label="Nose" value="Nose" />
                        </Picker>
                        {formik.errors.region && <Text style={styles.error}>{formik.errors.region}</Text>}
                    </View>
                </View>

                <View style={styles.container}>
                    <Text>Disponible por:</Text>
                    <TextInput
                        style={styles.input}
                    />
                </View>

                <View style={styles.row}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={formik.values.rooms}
                            onValueChange={(itemValue) => formik.setFieldValue("rooms", itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Habitaciones" value="" />
                            {[...Array(10)].map((_, i) =>
                                <Picker.Item key={i} label={String(i + 1)} value={i + 1} />
                            )}
                        </Picker>
                        {formik.errors.rooms && <Text style={styles.error}>{formik.errors.rooms}</Text>}
                    </View>

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={formik.values.bathrooms}
                            onValueChange={(itemValue) => formik.setFieldValue("bathrooms", itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Baños" value="" />
                            {[...Array(10)].map((_, i) =>
                                <Picker.Item key={i} label={String(i + 1)} value={i + 1} />
                            )}
                        </Picker>
                        {formik.errors.bathrooms && <Text style={styles.error}>{formik.errors.bathrooms}</Text>}
                    </View>
                </View>

                <View style={styles.container}>
                    <Text>Descripción:</Text>
                    <TextInput
                        style={styles.descriptionInput}
                        multiline={true}
                        onChangeText={(text) => formik.setFieldValue("description", text)}
                    />
                    {formik.errors.description && <Text style={styles.error}>{formik.errors.description}</Text>}
                </View>
            </View>
            <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
        </>
    );
}
