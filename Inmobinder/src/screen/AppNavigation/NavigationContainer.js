import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigation } from './DashboardCorredor';

import InicioSesion from '../PropertyBrokerage/MenuConfiguracion/InicioSesion';
import PagosYcobros from '../PropertyBrokerage/MenuConfiguracion/PagosYcobros';
import Accesibilidad from '../PropertyBrokerage/MenuConfiguracion/Accesibilidad';
import Notificaciones from '../PropertyBrokerage/MenuConfiguracion/Notificaciones';
import TerminosDeServicio from '../PropertyBrokerage/MenuConfiguracion/TerminosDeServicio';
import PoliticaDePrivacidad from '../PropertyBrokerage/MenuConfiguracion/PoliticaDePrivacidad';

import AyudaProblemasSeguridad from '../PropertyBrokerage/MenuAyuda/AyudaProblemasSeguridad';
import ContactarSoporte from '../PropertyBrokerage/MenuAyuda/ContactarSoporte';
import EnviarComentarios from '../PropertyBrokerage/MenuAyuda/EnviarComentarios';
import ProblemaDePago from '../PropertyBrokerage/MenuAyuda/ProblemaDePago';
import ReportarFraude from '../PropertyBrokerage/MenuAyuda/ReportarFraude';
import RepProblemaFuncionamiento from '../PropertyBrokerage/MenuAyuda/RepProblemaFuncionamiento';

import VideoGallery from '../PropertyBrokerage/GalleryScreen/VideoGallery';
import PictureGallery from '../PropertyBrokerage/GalleryScreen/PictureGallery';



const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{headerShown:false}} />
      <Stack.Screen name="Inicio Sesion" component={InicioSesion} />
        <Stack.Screen name="Pagos y cobros" component={PagosYcobros} />
        <Stack.Screen name="Accesibilidad" component={Accesibilidad} />
        <Stack.Screen name="Notificaciones" component={Notificaciones} />
        <Stack.Screen name="Terminos de servicio" component={TerminosDeServicio} />
        <Stack.Screen name="Politica de privacidad" component={PoliticaDePrivacidad} />
        
        <Stack.Screen name="Ayuda" component={AyudaProblemasSeguridad} />
        <Stack.Screen name="Reportar fraude" component={ReportarFraude} />
        <Stack.Screen name="Reportar problema de funcionamiento" component={RepProblemaFuncionamiento} />
        <Stack.Screen name="Contactar soporte" component={ContactarSoporte} />
        <Stack.Screen name="Problema de pago" component={ProblemaDePago} />
        <Stack.Screen name="Enviar comentarios" component={EnviarComentarios} />
        <Stack.Screen name="Galeria de Fotos" component={PictureGallery} />
        <Stack.Screen name="Galeria de videos" component={VideoGallery} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}