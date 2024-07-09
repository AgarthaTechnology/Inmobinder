import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'black',
        alignItems: 'center', 
    },
    itemContainer: {
        padding: 20,
        marginVertical: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    publication:{
        backgroundColor:"#FEFEFE",
        marginTop:20,
        borderRadius: 10,
        padding: 10,
        alignSelf: 'center',
        width: 'auto',
        shadowColor: "#000", // Añade esto para establecer el color de la sombra
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.40, // Añade esto para establecer la opacidad de la sombra
        shadowRadius: 4.20, // Añade esto para establecer el radio de la sombra
        elevation: 5, // Añade esto para establecer la elevación (sombra en Android)
    }
});