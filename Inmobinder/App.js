import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import perfil from './src/screen/PropertyBrokerage/profile';
import editarperfil from './src/screen/PropertyBrokerage/editprofile';
import cambiarcontra from './src/screen/PropertyBrokerage/changepass';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Perfil">
        <Stack.Screen name="Perfil" component={perfil} />
        <Stack.Screen name="Editar Perfil" component={editarperfil} />
        <Stack.Screen name="Cambiar Contraseña" component={cambiarcontra} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}