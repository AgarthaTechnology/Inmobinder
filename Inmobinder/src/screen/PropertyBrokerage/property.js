import React, { createElement, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image, Picker, ImageBackground, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { FIRESTORE_DB } from '../../utils/firebase';



const image = { src: 'Group.png' };

const CRUD = () => {
    const [regiones, setRegiones] = useState(RegionesYcomunas.regiones.map(region => region.NombreRegion));
    const [comunas, setComunas] = useState([]);
    const navigation = useNavigation();
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState('');
    const [gcomun, setGcomun] = useState('');
    const [tipo, setTipo] = useState('');
    const [metros, setMetro] = useState('');
    const [dorm, setDorm] = useState('');
    const [baños, setBaños] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedComuna, setSelectedComuna] = useState('');
    const [direc, setDirec] = useState('');
    const [descrip, setDescrip] = useState('');

    
    
        // lectura inicial de la base de datos
        useEffect(() => {
            const todoRef = collection(FIRESTORE_DB, 'todos');
            const subscriber = onSnapshot(todoRef, {
                next: (snapshot) => {
                    const todos = [];
                    snapshot.docs.forEach(doc => {
                        console.log(doc);
                        todos.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                    setTodos(todos);
                },
            });
            return () => subscriber();
        }, []);
    
      
        // renderiza cada elemento, crea un interfaz de cada item o usuario.
        const renderUsuarios = ({ item }) => {
            const ref = doc(FIRESTORE_DB, `todos/${item.id}`);
    
            const toggleDone = async () => {
                const docRef = doc(FIRESTORE_DB, 'todos', item.id);
    
                try {
                    await updateDoc(docRef, {
                        done: !item.done
                    });
                } catch (error) {
                    alert('Error al actualizar el documento:');
                }
            };
    

    const handleRegionChange = (region) => {
        setSelectedRegion(region);
        const regionData = RegionesYcomunas.regiones.find(item => item.NombreRegion === region);
        setComunas(regionData.comunas);
    };
    
   

        // Rutina para agregar opciones a un <select>
        function addOptions(domElement, array) {
            var select = document.getElementsByName(domElement)[0];

            for (value in array) {
                var option = document.createElement("option");
                option.text = array[value];
                select.add(option);
            }
        }
        
    
    }
    return (
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/images/Group.png')} resizeMode="cover" style={styles.imageBackground}>
                    <TouchableOpacity style={styles.atras} onPress={() => navigation.goBack()}>
                        <Image source={require('../../../assets/images/volver.png')} />
                    </TouchableOpacity>
    
                    <View style={styles.form}>
                        <ScrollView style={styles.scrollView}>
                            <FlatList
                                data={todos}
                                renderItem={todo => renderUsuarios(todo)}
                                keyExtractor={todo => todo.id.toString()}
                            >
                                {todos.map(todo => (
                                    <Text key={todo.id}>
                                        {todo.nombre}
                                        {todo.apellido}
                                        {todo.rut}
                                    </Text>
                                ))}
                            </FlatList>
                        </ScrollView>
                    </View>
                </ImageBackground>
            </View>
        );
    };
    
    

export default CRUD;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    formContainer: {
        paddingHorizontal: 20,
    },
    inputContainer: {
        marginTop: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        backgroundColor: '#d5dbdb',
        height: 40,
        marginTop: 5,
        borderColor: 'black',
        borderRadius: 5,
    },
    todoText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    atras: {
        paddingHorizontal: 30,
        position: 'absolute',
        top: 10,
        left: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 10,
        borderRadius: 5,
    },
    cameraImage: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        marginTop: 20,
    }
});
