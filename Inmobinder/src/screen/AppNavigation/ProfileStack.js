import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screen/NaturalPerson/Profile/profile";
import EditProfileScreen from "../../screen/NaturalPerson/Profile/editProfile";
import ChangePasswordScreen from "../../screen/NaturalPerson/Profile/changePassword";
import { screenName } from "../../utils/screenName";

const Stack = createNativeStackNavigator();

export function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screenName.profile.profile}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screenName.profile.editProfile}
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screenName.profile.changePass}
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
