// ViewPublicationScreen.styles.js

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  outerContainer: {
    flex: 1,
    margin: 20,
    padding: 20,
    borderRadius: 20,
    // Propiedades de sombra
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.2,
    elevation: 5,
  },
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
