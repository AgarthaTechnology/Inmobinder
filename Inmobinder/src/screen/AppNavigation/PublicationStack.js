import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreatePublicationScreen } from "../../screen/NaturalPerson/CreatePublicationScreen";
import { FormSelectionScreen } from "../NaturalPerson/CreatePublicationScreen/FormSelectionScreen";

const Stack = createNativeStackNavigator();

export function PublicationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FormSelectionScreen"
        component={FormSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreatePublicationScreen"
        component={CreatePublicationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
