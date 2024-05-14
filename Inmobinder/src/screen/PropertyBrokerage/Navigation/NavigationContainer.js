import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigation } from './DashboardCorredor';

import InicioSesion from '../MenuConfiguracion/InicioSesion';
import PagosYcobros from '../MenuConfiguracion/PagosYcobros';
import Accesibilidad from '../MenuConfiguracion/Accesibilidad';
import Notificaciones from '../MenuConfiguracion/Notificaciones';
import TerminosDeServicio from '../MenuConfiguracion/TerminosDeServicio';
import PoliticaDePrivacidad from '../MenuConfiguracion/PoliticaDePrivacidad';

import AyudaProblemasSeguridad from '../MenuAyuda/AyudaProblemasSeguridad';
import ContactarSoporte from '../MenuAyuda/ContactarSoporte';
import EnviarComentarios from '../MenuAyuda/EnviarComentarios';
import ProblemaDePago from '../MenuAyuda/ProblemaDePago';
import ReportarFraude from '../MenuAyuda/ReportarFraude';
import RepProblemaFuncionamiento from '../MenuAyuda/RepProblemaFuncionamiento';

import VideoGallery from '../GalleryScreen/VideoGallery';
import PictureGallery from '../GalleryScreen/PictureGallery';
import ProfileProperty from '../PerfilPropiedad/ProfileProperty';
import PictureGalleryBroker from '../GalleryScreen/PictureGalleryBroker';
import AddProperty from "../GalleryScreen/AddProperty";

import HomeScreen from '../HomeScreen';
import CRUD from '../property';
import DeleteP from '../deleteP';
import UpdateProp from '../updateProp';

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
        <Stack.Screen name="ProfileProperty" component={ProfileProperty} />
        <Stack.Screen name="PictureCalleryBroker" component={PictureGalleryBroker}/>  
        <Stack.Screen name="Agregar Propiedad" component={AddProperty} /> 
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

// export function Maps(){

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="CRUD" component={CRUD} />
//         <Stack.Screen name="DeleteP" component={DeleteP} />
//         <Stack.Screen name="UpdateProp" component={UpdateProp} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
