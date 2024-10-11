// EditPublicationScreen.styles.js

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 0,
    borderRadius: 0,
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
    borderRadius: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});
