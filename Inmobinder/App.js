import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import perfil from './src/screen/AppNavigation/profile';
import editarperfil from './src/screen/AppNavigation/editprofile';
import cambiarcontra from './src/screen/AppNavigation/changepass';
import agencia from './src/screen/AppNavigation/agency';
import agenciasdisponibles from './src/screen/AppNavigation/availableAgencies';
import agenciaInformacion from './src/screen/AppNavigation/agencyInfo';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Agencia">
        <Stack.Screen name="Agencia" component={agencia} />
        <Stack.Screen name="AgenciasDisponibles" component={agenciasdisponibles} />
        <Stack.Screen name="AgenciaInformacion" component={agenciaInformacion} />
        <Stack.Screen name="Perfil" component={perfil} />
        <Stack.Screen name="Editar Perfil" component={editarperfil} />
        <Stack.Screen name="Cambiar Contraseña" component={cambiarcontra} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}