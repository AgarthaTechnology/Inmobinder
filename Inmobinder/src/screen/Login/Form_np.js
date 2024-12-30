import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { screen } from "../../utils/screenName";
import PhoneInput from "react-native-phone-number-input";

export default function Form_np() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  // Aquí guardamos SIEMPRE el RUT sin formatear en tiempo real
  const [rut, setRut] = useState("");

  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const phoneInput = useRef(null);
  const navigation = useNavigation();

  const validarCorreo = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const calcularDV = (cuerpo) => {
    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const dvEsperado = 11 - (suma % 11);
    if (dvEsperado === 11) return "0";
    if (dvEsperado === 10) return "K";
    return dvEsperado.toString();
  };

  // Valida RUT en su formato actual (sin puntos)
  const validarRut = (rutString) => {
    const rutLimpio = rutString.replace(/[^0-9kK]/g, "").toUpperCase();
    console.log("RUT Limpio:", rutLimpio);

    if (rutLimpio.length < 2) {
      console.log("RUT demasiado corto para ser válido.");
      return false;
    }

    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1);
    console.log("Cuerpo del RUT:", cuerpo);
    console.log("DV del RUT:", dv);

    if (!/^\d+$/.test(cuerpo)) {
      console.log("El cuerpo del RUT contiene caracteres no numéricos.");
      return false;
    }

    const dvCalculado = calcularDV(cuerpo);
    console.log("DV Calculado:", dvCalculado);

    const esValido = dvCalculado === dv;
    console.log("¿RUT Válido?:", esValido);

    return esValido;
  };

  const formatRutForSave = (rut) => {
    // Limpiar el RUT: eliminar puntos y guiones si existen
    let limpio = rut.replace(/[^0-9kK]/g, "").toUpperCase();

    console.log("RUT Limpio:", limpio); // Log del RUT limpio

    if (limpio.length < 2) {
      console.log("RUT demasiado corto para formatear.");
      return limpio;
    }

    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);

    let formateado = "";

    if (cuerpo.length === 7) {
      // Formato para 7 dígitos: 1.234.567
      formateado =
        cuerpo.slice(0, 1) +
        "." +
        cuerpo.slice(1, 4) +
        "." +
        cuerpo.slice(4, 7);
    } else if (cuerpo.length === 8) {
      // Formato para 8 dígitos: 12.345.678
      formateado =
        cuerpo.slice(0, 2) +
        "." +
        cuerpo.slice(2, 5) +
        "." +
        cuerpo.slice(5, 8);
    } else {
      // Para otros casos, aunque no son comunes en RUTs chilenos
      formateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const rutFormateado = formateado + "-" + dv;
    console.log("RUT Formateado para Guardar:", rutFormateado); // Log del RUT formateado

    return rutFormateado;
  };

  useEffect(() => {
    if (rut.length > 0) {
      const rutFormateado = formatRutForSave(rut);
      console.log("RUT Ingresado:", rut);
      console.log("RUT Formateado:", rutFormateado);
    }
  }, [rut]);

  const handleTelefonoChange = (text) => {
    const cleanText = text.replace(/[^0-9]/g, "");
    setTelefono(cleanText.slice(0, 9));
  };

  const handleInputNombres = (text) => {
    setNombre(text.replace(/[^a-zA-Z\s]/g, ""));
  };

  const handleInputApellidos = (text) => {
    setApellido(text.replace(/[^a-zA-Z\s]/g, ""));
  };

  const handleRegister = async () => {
    const auth = getAuth();
  
    const checkValid = phoneInput.current?.isValidNumber(telefono);
    if (!checkValid) {
      Alert.alert("Número de teléfono inválido");
      return;
    }
  
    if (!nombre || !apellido || !rut || !correo || !telefono || !contraseña) {
      Alert.alert("Todos los campos son obligatorios");
      return;
    }
  
    // Validación de la longitud de la contraseña
    if (contraseña.length < 6) {
      Alert.alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
  
    if (!validarCorreo(correo)) {
      Alert.alert("Por favor, ingrese un correo electrónico válido.");
      return;
    }
  
    // Validar el RUT sin formatear
    if (!validarRut(rut)) {
      Alert.alert("Por favor, ingrese un RUT válido.");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        correo,
        contraseña
      );
      const user = userCredential.user;
  
      await sendEmailVerification(user);
      Alert.alert(
        "Correo de verificación enviado. Revisa tu bandeja de entrada."
      );
  
      // Formatear el RUT para guardar con puntos y guion
      const rutFormateadoParaGuardar = formatRutForSave(rut);
      console.log("RUT Formateado para Guardar:", rutFormateadoParaGuardar);
  
      await addDoc(collection(db, "users"), {
        nombre,
        apellido,
        rut: rutFormateadoParaGuardar, // Guardar el RUT con puntos y guion
        correo,
        telefono:
          phoneInput.current?.getNumberAfterPossiblyEliminatingZero()
            .formattedNumber || "+56" + telefono,
        uid: user.uid,
      });
  
      navigation.navigate(screen.login.stack, {
        screen: screen.login.login,
      });
    } catch (error) {
      console.error("Error al registrar: ", error);
  
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert("El correo electrónico ya está en uso.");
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert("El correo electrónico es inválido.");
      } else if (error.code === 'auth/weak-password') {
        Alert.alert("La contraseña es demasiado débil.");
      } else {
        Alert.alert("Error al registrar", error.message);
      }
    }
  };
  

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../images/fondo.png")}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.formContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Registro</Text>

            {/* Nombres */}
            <Text style={styles.label}>Nombres</Text>
            <TextInput
              style={styles.inputtext}
              placeholder="Ingrese sus nombres"
              value={nombre}
              onChangeText={handleInputNombres}
            />

            {/* Apellidos */}
            <Text style={styles.label}>Apellidos</Text>
            <TextInput
              style={styles.inputtext}
              placeholder="Ingrese sus apellidos"
              value={apellido}
              onChangeText={handleInputApellidos}
            />

            {/* RUT sin formateo con puntos */}
            <Text style={styles.label}>RUT</Text>
            <TextInput
              style={styles.inputtext}
              placeholder="Ingrese su RUT (ej: 12345678K)"
              value={rut}
              onChangeText={(text) => {
                const cleanText = text.replace(/[^0-9kK]/g, "").toUpperCase();
                setRut(cleanText.slice(0, 9));
              }}
              autoCapitalize="characters"
              maxLength={9} 
              keyboardType="default"
            />

            {/* Correo */}
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.inputtext}
              placeholder="Ingrese su correo electrónico"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Teléfono */}
            <Text style={styles.label}>Teléfono</Text>
            <PhoneInput
              ref={phoneInput}
              defaultValue={telefono}
              defaultCode="CL"
              layout="first"
              onChangeText={handleTelefonoChange}
              onChangeFormattedText={() => {}}
              textInputProps={{
                maxLength: 9,
                keyboardType: "numeric",
                style: { paddingLeft: 10 },
              }}
              containerStyle={styles.phoneContainer}
              textContainerStyle={styles.phoneTextContainer}
              countryPickerProps={{ withAlphaFilter: true }}
              withShadow={false}
              disableArrowIcon={false}
              countryPickerButtonStyle={styles.countryPickerButton}
              withDarkTheme={false}
              withLightTheme={true}
            />

            {/* Contraseña */}
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Ingrese su contraseña"
                value={contraseña}
                onChangeText={setContraseña}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                accessible
                accessibilityLabel={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                <Icon
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="#000000"
                />
              </TouchableOpacity>
            </View>

            {/* Botón */}
            <TouchableOpacity style={styles.buton} onPress={handleRegister}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    marginHorizontal: 30,
    marginVertical: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#25272B",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: "#25272B",
  },
  inputtext: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#FFFFFF",
    width: "90%",
    alignSelf: "center",
    marginTop: 5,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  phoneContainer: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 5,
    borderColor: "#ccc",
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  phoneTextContainer: {
    paddingVertical: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
  },
  countryPickerButton: {
    width: 70,
    height: 33,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    width: "90%",
    alignSelf: "center",
    marginTop: 5,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  eyeButton: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buton: {
    borderRadius: 50,
    backgroundColor: "#009245",
    width: 126,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
