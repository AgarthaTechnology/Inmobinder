import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    imageContainer: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginBottom: 20,
    },
    profileImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    joinDate: {
        marginBottom: 5,
    },
    verified: {
        color: 'blue',
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5, // reducido de 10 a 5 para mayor espacio
        paddingHorizontal: 10,
    },
    inputHalf: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5, // reducido de 10 a 5 para mayor espacio
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5, // reducido de 10 a 5 para mayor espacio
    },
    inputContainer: {
        marginBottom: 10,
    },
    inputRowContainer: { // Estilo para el contenedor de los campos de Rut y Teléfono
        flex: 1,
        flexDirection: 'column',
    },
    label: { // nuevo estilo para los textos debajo de los TextInput
        fontSize: 14,
        color: 'black',
        marginBottom: 5, // añadido para separar los textos de los TextInput
    },
    registeredAs: {
        marginTop: 20,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    agency: {
        fontSize: 20,
        color: 'blue',
        marginBottom: 20,
    },
});
