import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    button: {
      position: 'absolute',
      top: 540,
      right: 20,
      backgroundColor: '#D7DBDD',
      padding: 10,
      borderRadius: 8,
    },
    map: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    filterButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: '#D7DBDD',
      padding: 10,
      borderRadius: 8,
    },
    filterMenu: {
      position: 'absolute',
      top: 60,
      right: 20,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 8,
      elevation: 5,
    },
    filterMenuItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    filterMenuText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    legend: {
      position: 'absolute',
      bottom: 15,
      right: 10,
      flexDirection: 'row',
      backgroundColor: '#D7DBDD',
      padding: 10,
      borderRadius: 20,
      elevation: 5,
      alignItems: 'center',
      width: 190,
      height: 45,
    },
    legendText: {
      marginLeft: 10,
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 10,
    },
    image: {
      width: 100, 
      height: 100, 
      left: 150, 
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 10,
    }
  
  });