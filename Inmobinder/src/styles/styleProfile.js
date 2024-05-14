import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Color blanco semi-transparente
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
        marginBottom: 5,
        paddingHorizontal: 10,
    },
    inputHalf: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
    },
    inputContainer: {
        marginBottom: 10,
    },
    inputRowContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    label: {
        fontSize: 14,
        color: 'black',
        marginBottom: 5,
    },
    registeredAs: {
        marginTop: 20,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    corredor: {
        fontSize: 20,
        color: 'grey',
        marginBottom: 20,
    },
    profileImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
    editButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 20,
    },
});