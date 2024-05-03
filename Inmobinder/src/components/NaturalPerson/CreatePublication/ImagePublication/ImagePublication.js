import React from 'react'
import { Image } from 'react-native-elements';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './ImagePublication.styles';

export function ImagePublication(props) {
    const { formik } = props;

    const primaryImage = formik.values && formik.values.primaryImage ? formik.values.primaryImage[0] : null;

    return (
        <View style={styles.content}>
            <Image
                source={primaryImage ? { uri: primaryImage } : null}
                style={styles.image}
                PlaceholderContent={<Icon name="image" size={30} color="#7f8c8d" />}
            />
        </View>
    )
}