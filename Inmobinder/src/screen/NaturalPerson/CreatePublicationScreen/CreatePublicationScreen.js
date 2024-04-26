import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { InfoForm } from "../../../components/NaturalPerson/CreatePublication/InfoForm";
import { db } from "../../../utils/firebase";
import { initialVales, validationSchema } from "./CreatePublicationScreen.data";
import { styles } from "./CreatePublication.styles";
import { v4 as uuid } from "uuid";

export function CreatePublicationScreen() {
    const navigation = useNavigation();
    const formik = useFormik({
        initialValues: initialVales(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const newData = formValue;
                newData.id = uuid();
                newData.createdAt = new Date();

                await setDoc(doc(db, "publication", newData.id), newData);
                console.log("Publication created successfully");
                navigation.goBack();
            } catch (error) {
                console.error("Error creating publication:", error);
            }
        },
    });

    return (
        <ScrollView style={styles.container}>
            <InfoForm formik={formik} />
            <Button
            title="Crear Publicacion"
            buttonStyle={styles.addRestaurant}
            onPress={formik.handleSubmit}
            loading={formik.isSubmitting}
            />
        </ScrollView>
    );
}