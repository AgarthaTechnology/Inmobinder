import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
//    borderRadius: 20, // Aumentar para hacer los bordes más curvos
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 5,
    margin: 0,
    marginHorizontal: 0, // Añadir margen lateral
    marginVertical: 0,  // Añadir margen vertical
    overflow: 'hidden', // Asegura que los bordes curvos no se vean cortados
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20, // Hacer que la imagen también tenga bordes curvos
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#333',
    marginBottom: 8,
  },
  uf: {
    fontSize: 16,
    color: '#666',
  },
  address: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  featuresContainer: {
    flexDirection: 'column', // Cambiado a columna para listado vertical
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  agentInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  agentTextContainer: {
    marginLeft: 8,
  },
  agentText: {
    fontSize: 16,
    color: '#333',
  },
});
