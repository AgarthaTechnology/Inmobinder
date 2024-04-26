import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './DisplayPublication.styles';
import { db } from '../../../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const DisplayPublication = () => {
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        const fetchPublications = async () => {
            const querySnapshot = await getDocs(collection(db, 'publications'));
            const loadedPublications = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPublications(loadedPublications);
        };

        fetchPublications();
    }, []);

    return (
        <View style={styles.container}>

        <Text>HOLA VIEJOOOOS</Text>
            <FlatList
                data={publications}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text>{item.description}</Text>
                    </View>
                )}
            />
        </View>
    );
};
