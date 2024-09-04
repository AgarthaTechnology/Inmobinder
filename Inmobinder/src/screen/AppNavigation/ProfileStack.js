// ProfileStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screen/NaturalPerson/Profile/profile";
import EditProfileScreen from "../../screen/NaturalPerson/Profile/editProfile";
import ChangePasswordScreen from "../../screen/NaturalPerson/Profile/changePassword";
import { screen } from "../../utils/screenName";

const Stack = createNativeStackNavigator();

export function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screen.profile.profile}
        component={ProfileScreen}
      />
      <Stack.Screen
        name={screen.profile.editProfile}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name={screen.profile.changePass}
        component={ChangePasswordScreen}
      />
    </Stack.Navigator>
  );
}
