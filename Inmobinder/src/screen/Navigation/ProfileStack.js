import ProfileScreen from "../NaturalPerson/Profile/profile"; 
import { createStackNavigator } from "@react-navigation/stack";
import EditProfileScreen from "../../screen/NaturalPerson/Profile/editProfile";
import ChangePasswordScreen from "../../screen/NaturalPerson/Profile/changePassword";

const Stack = createStackNavigator();

export function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Editar Perfil" component={EditProfileScreen} />
      <Stack.Screen name="Cambiar Contraseña" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}
