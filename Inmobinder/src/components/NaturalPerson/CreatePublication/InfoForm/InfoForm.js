import React from "react";
import { View, TextInput, Text, Image } from "react-native";
import { styles } from "./InfoForm.styles";
import { Picker } from '@react-native-picker/picker';

export function InfoForm(props) {
    const { formik } = props;

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    placeholder="Nombre de la propiedad"
                    style={{ alignSelf: "center" }}
                    onChangeText={(text) => formik.setFieldValue("nameProperty", text)}
                />
                {formik.errors.nameProperty && <Text style={styles.error}>{formik.errors.nameProperty}</Text>}

                <Image
                    style={{ width: 100, height: 110, alignSelf: "center", borderWidth: 1}}
                    source={{ uri: 'https://cdn.icon-icons.com/icons2/495/PNG/512/camera-1_icon-icons.com_48673.png' }}
                />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{marginLeft: 85}}>Gastos Comunes:</Text>
                <TextInput
                    style={{ width: 90, marginLeft: 10, borderColor: '#000', borderWidth: 1}}
                    placeholder="$000.000"
                    keyboardType="numeric"
                    onChangeText={(text) => formik.setFieldValue("commonExpenses", text)}
                />
                {formik.errors.commonExpenses && <Text style={styles.error}>{formik.errors.commonExpenses}</Text>}
            </View>

            <Picker
                selectedValue={formik.values.disponibility}
                onValueChange={(itemValue) => formik.setFieldValue("disponibility", itemValue)}
                style={{ width: 200, marginLeft: 85, borderColor: '#000', borderWidth: 1, backgroundColor: '#fff', marginTop: 10}}
                mode="dropdown"
            >
                <Picker.Item label="Estado" value="" />
                <Picker.Item label="Disponible" value="Disponible" />
                <Picker.Item label="No Disponible" value="No Disponible" />
            </Picker>
            {formik.errors.disponibility && <Text style={styles.error}>{formik.errors.disponibility}</Text>}            

            <View style={{alignItems: 'center'}}>
                <Text>Metros Cuadrados:</Text>
                <TextInput
                    style={{ width: 140, borderColor: '#000', borderWidth: 1, marginTop: 10}}
                    onChangeText={(text) => formik.setFieldValue("metters", text)}
                />
                {formik.errors.metters && <Text style={styles.error}>{formik.errors.metters}</Text>}            
            </View>

            <View style={{ alignItems: 'center'}} >
                <Text>Dirección:</Text>
                <TextInput
                    style={{ width: 300, borderColor: '#000', borderWidth: 1, marginTop: 10}}
                    onChangeText={(text) => formik.setFieldValue("address", text)}
                />
                {formik.errors.address && <Text style={styles.error}>{formik.errors.address}</Text>}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                <Text style={{ margin: 5 }}>Comuna</Text>
                <Text style={{ margin: 5 }}>Region</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                <Text>Disponible por:</Text>
                <TextInput
                    style={{ width: 150, borderColor: '#000', borderWidth: 1, marginTop: 10}}
                />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10 }}>
                <TextInput
                    placeholder="Habitaciones"
                    style={{ margin: 5, width: 150, borderColor: '#000', borderWidth: 1, marginTop: 10}}
                    keyboardType="numeric"
                    onChangeText={(text) => formik.setFieldValue("rooms", text)}
                />
                {formik.errors.rooms && <Text style={styles.error}>{formik.errors.rooms}</Text>}

                <TextInput
                    placeholder="Baños"
                    style={{ margin: 5, width: 150, borderColor: '#000', borderWidth: 1, marginTop: 10}}
                    keyboardType="numeric"
                    onChangeText={(text) => formik.setFieldValue("bathrooms", text)}
                />
                {formik.errors.bathrooms && <Text style={styles.error}>{formik.errors.bathrooms}</Text>}
            </View>

            <View style={{alignItems: 'center'}}>
                <Text>Descripción:</Text>
                <TextInput
                    style={{ width: 300, borderColor: '#000', borderWidth: 1, marginTop: 10}}
                    multiline={true}
                    onChangeText={(text) => formik.setFieldValue("description", text)}
                />
                {formik.errors.description && <Text style={styles.error}>{formik.errors.description}</Text>}
            </View>
        </View>
    );
}
