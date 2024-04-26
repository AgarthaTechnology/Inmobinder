import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreatePublicationScreen } from "../NaturalPerson/CreatePublicationScreen/CreatePublication/CreatePublicationScreen";

const Stack = createNativeStackNavigator();

export function PublicationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="añadir-propiedad"
        component={CreatePublicationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
