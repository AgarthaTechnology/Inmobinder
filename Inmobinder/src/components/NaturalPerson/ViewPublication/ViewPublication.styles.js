// ViewPublication.styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: 'transparent', // Fondo transparente
  },
  detailsContainer: {
    backgroundColor: "#FEFEFE",
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    alignSelf: "center",
    width: 328,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.2,
    elevation: 5,
  },
  gallery: {
    resizeMode: "cover",
    height: 200,
    width: "100%",
    borderRadius: 10,
  },
  image: {
    resizeMode: "cover",
    height: 200,
    width: "100%",
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 10,
  },
  price: {
    fontSize: 20,
    color: "#333",
    marginTop: 5,
  },
  uf: {
    fontSize: 16,
    color: "#555",
  },
  address: {
    fontSize: 16,
    color: "#777",
    marginTop: 5,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 15,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  featuresContainer: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 10,
  },
  agentInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  agentTextContainer: {
    marginLeft: 10,
  },
  agentText: {
    fontSize: 16,
    color: "#555",
  },
  noImageText: {
    alignSelf: "center",
    fontSize: 14,
    color: "#999",
    marginVertical: 100,
  },
});
