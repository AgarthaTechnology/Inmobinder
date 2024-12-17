import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../../utils/screenName";
import Login from "../../screen/Login/Homelogg";
import Register from "../../screen/Login/Register";
import FormNP from "../../screen/Login/Form_np";
import FormInmo from "../../screen/Login/Form_Inmo";
import FormCO from "../../screen/Login/Form_co";
import FormAC from "../../screen/Login/Form_ac";
import SingIn from "../../screen/Login/Singin";

const Stack = createNativeStackNavigator();

export function LoginStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screen.login.login} component={Login}/>
      <Stack.Screen name={screen.login.register} component={Register}/>
      <Stack.Screen name={screen.login.form_np} component={FormNP}/>
      <Stack.Screen name={screen.login.form_Inmo} component={FormInmo}/>
      <Stack.Screen name={screen.login.form_co} component={FormCO}/>
      <Stack.Screen name={screen.login.form_ac} component={FormAC}/>
      <Stack.Screen name={screen.login.singin} component={SingIn}/>
    </Stack.Navigator>
  );
}
