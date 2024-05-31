import { createStackNavigator } from "@react-navigation/stack";
import { FormSelectionScreen } from "../NaturalPerson/CreatePublicationScreen/FormSelectionScreen";
import { CreatePublicationScreen } from "../NaturalPerson/CreatePublicationScreen";

const Stack = createStackNavigator();

export function PublicationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Stack.Screen
        name="¿Qué tipo de Propiedad?"
        component={FormSelectionScreen}
      />
      <Stack.Screen
        name="CreatePublicationScreen"
        component={CreatePublicationScreen}
        options={{ title: "Añadir Propiedad", headerLeft: null }}
      />
    </Stack.Navigator>
  );
}
