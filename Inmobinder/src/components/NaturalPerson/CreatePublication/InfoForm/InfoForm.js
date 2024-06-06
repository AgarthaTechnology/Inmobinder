import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Input } from "react-native-elements";
import { MapForm } from "../MapForm";
import { styles } from "./InfoForm.styles";
import { UploadImage } from "../ImagePublication/UploadImage";
import { RoomsPicker, BathroomsPicker } from "../../../Shared/Picker/Picker";
import InputNumber from "../../../Shared/InputNumber/InputNumber";

const regionesYComunas = {
  "Arica y Parinacota": [
    "Parinacota",
    "Arica",
    "Camarones",
    "Putre",
    "General Lagos",
  ],
  Tarapacá: [
    "Iquique",
    "Alto Hospicio",
    "Pozo Almonte",
    "Camiña",
    "Colchane",
    "Huara",
    "Pica",
  ],
  Antofagasta: [
    "Antofagasta",
    "Mejillones",
    "Sierra Gorda",
    "Taltal",
    "Calama",
    "Ollagüe",
    "San Pedro de Atacama",
    "Tocopilla",
    "María Elena",
  ],
  Atacama: [
    "Copiapó",
    "Caldera",
    "Tierra Amarilla",
    "Chañaral",
    "Diego de Almagro",
    "Vallenar",
    "Alto del Carmen",
    "Freirina",
    "Huasco",
  ],
  Coquimbo: [
    "La Serena",
    "Coquimbo",
    "Andacollo",
    "La Higuera",
    "Paiguano",
    "Vicuña",
    "Illapel",
    "Canela",
    "Los Vilos",
    "Salamanca",
    "Ovalle",
    "Combarbalá",
    "Monte Patria",
    "Punitaqui",
    "Río Hurtado",
  ],
  Valparaíso: [
    "Valparaíso",
    "Casablanca",
    "Concón",
    "Juan Fernández",
    "Puchuncaví",
    "Quintero",
    "Viña del Mar",
    "Isla de Pascua",
    "Los Andes",
    "Calle Larga",
    "Rinconada",
    "San Esteban",
    "La Ligua",
    "Cabildo",
    "Papudo",
    "Petorca",
    "Zapallar",
    "Quillota",
    "Calera",
    "Hijuelas",
    "La Cruz",
    "Nogales",
    "San Antonio",
    "Algarrobo",
    "Cartagena",
    "El Quisco",
    "El Tabo",
    "Santo Domingo",
    "San Felipe",
    "Catemu",
    "Llaillay",
    "Panquehue",
    "Putaendo",
    "Santa María",
    "Quilpué",
    "Limache",
    "Olmué",
    "Villa Alemana",
  ],
  "Libertador General Bernardo O'Higgins": [
    "Rancagua",
    "Codegua",
    "Coinco",
    "Coltauco",
    "Doñihue",
    "Graneros",
    "Las Cabras",
    "Machalí",
    "Malloa",
    "Mostazal",
    "Olivar",
    "Peumo",
    "Pichidegua",
    "Quinta de Tilcoco",
    "Rengo",
    "Requínoa",
    "San Vicente",
    "Pichilemu",
    "La Estrella",
    "Litueche",
    "Marchihue",
    "Navidad",
    "Paredones",
    "San Fernando",
    "Chépica",
    "Chimbarongo",
    "Lolol",
    "Nancagua",
    "Palmilla",
    "Peralillo",
    "Placilla",
    "Pumanque",
    "Santa Cruz",
  ],
  Maule: [
    "Talca",
    "Constitución",
    "Curepto",
    "Empedrado",
    "Maule",
    "Pelarco",
    "Pencahue",
    "Río Claro",
    "San Clemente",
    "San Rafael",
    "Cauquenes",
    "Chanco",
    "Pelluhue",
    "Curicó",
    "Hualañé",
    "Licantén",
    "Molina",
    "Rauco",
    "Romeral",
    "Sagrada Familia",
    "Teno",
    "Vichuquén",
    "Linares",
    "Colbún",
    "Longaví",
    "Parral",
    "Retiro",
    "San Javier",
    "Villa Alegre",
    "Yerbas Buenas",
  ],
  Ñuble: [
    "Chillán",
    "Bulnes",
    "Cobquecura",
    "Coelemu",
    "Coihueco",
    "Chillán Viejo",
    "El Carmen",
    "Ninhue",
    "Ñiquén",
    "Pemuco",
    "Pinto",
    "Portezuelo",
    "Quillón",
    "Quirihue",
    "Ránquil",
    "San Carlos",
    "San Fabián",
    "San Ignacio",
    "San Nicolás",
    "Treguaco",
    "Yungay",
  ],
  Biobío: [
    "Concepción",
    "Coronel",
    "Chiguayante",
    "Florida",
    "Hualqui",
    "Lota",
    "Penco",
    "San Pedro de la Paz",
    "Santa Juana",
    "Talcahuano",
    "Tomé",
    "Hualpén",
    "Lebu",
    "Arauco",
    "Cañete",
    "Contulmo",
    "Curanilahue",
    "Los Álamos",
    "Tirúa",
    "Los Ángeles",
    "Antuco",
    "Cabrero",
    "Laja",
    "Mulchén",
    "Nacimiento",
    "Negrete",
    "Quilaco",
    "Quilleco",
    "San Rosendo",
    "Santa Bárbara",
    "Tucapel",
    "Yumbel",
    "Alto Biobío",
  ],
  Araucanía: [
    "Temuco",
    "Carahue",
    "Cunco",
    "Curarrehue",
    "Freire",
    "Galvarino",
    "Gorbea",
    "Lautaro",
    "Loncoche",
    "Melipeuco",
    "Nueva Imperial",
    "Padre las Casas",
    "Perquenco",
    "Pitrufquén",
    "Pucón",
    "Saavedra",
    "Teodoro Schmidt",
    "Toltén",
    "Vilcún",
    "Villarrica",
    "Cholchol",
    "Angol",
    "Collipulli",
    "Curacautín",
    "Ercilla",
    "Lonquimay",
    "Los Sauces",
    "Lumaco",
    "Purén",
    "Renaico",
    "Traiguén",
    "Victoria",
  ],
  Ríos: [
    "Valdivia",
    "Corral",
    "Lanco",
    "Los Lagos",
    "Máfil",
    "Mariquina",
    "Paillaco",
    "Panguipulli",
    "La Unión",
    "Futrono",
    "Lago Ranco",
    "Río Bueno",
  ],
  "Los Lagos": [
    "Puerto Montt",
    "Calbuco",
    "Cochamó",
    "Fresia",
    "Frutillar",
    "Los Muermos",
    "Llanquihue",
    "Maullín",
    "Puerto Varas",
    "Castro",
    "Ancud",
    "Chonchi",
    "Curaco de Vélez",
    "Dalcahue",
    "Puqueldón",
    "Queilén",
    "Quellón",
    "Quemchi",
    "Quinchao",
    "Osorno",
    "Puerto Octay",
    "Purranque",
    "Puyehue",
    "Río Negro",
    "San Juan de la Costa",
    "San Pablo",
    "Chaitén",
    "Futaleufú",
    "Hualaihué",
    "Palena",
  ],
  "Aysén del General Carlos Ibáñez del Campo": [
    "Coihaique",
    "Lago Verde",
    "Aisén",
    "Cisnes",
    "Guaitecas",
    "Cochrane",
    "O'Higgins",
    "Tortel",
    "Chile Chico",
    "Río Ibáñez",
  ],
  "Magallanes y de la Antártica Chilena": [
    "Punta Arenas",
    "Laguna Blanca",
    "Río Verde",
    "San Gregorio",
    "Cabo de Hornos (Ex Navarino)",
    "Antártica",
    "Porvenir",
    "Primavera",
    "Timaukel",
    "Natales",
    "Torres del Paine",
  ],
  "Metropolitana de Santiago": [
    "Santiago",
    "Cerrillos",
    "Cerro Navia",
    "Conchalí",
    "El Bosque",
    "Estación Central",
    "Huechuraba",
    "Independencia",
    "La Cisterna",
    "La Florida",
    "La Granja",
    "La Pintana",
    "La Reina",
    "Las Condes",
    "Lo Barnechea",
    "Lo Espejo",
    "Lo Prado",
    "Macul",
    "Maipú",
    "Ñuñoa",
    "Pedro Aguirre Cerda",
    "Peñalolén",
    "Providencia",
    "Pudahuel",
    "Quilicura",
    "Quinta Normal",
    "Recoleta",
    "Renca",
    "San Joaquín",
    "San Miguel",
    "San Ramón",
    "Vitacura",
    "Puente Alto",
    "Pirque",
    "San José de Maipo",
    "Colina",
    "Lampa",
    "Tiltil",
    "San Bernardo",
    "Buin",
    "Calera de Tango",
    "Paine",
    "Melipilla",
    "Alhué",
    "Curacaví",
    "María Pinto",
    "San Pedro",
    "Talagante",
    "El Monte",
    "Isla de Maipo",
    "Padre Hurtado",
    "Peñaflor",
  ],
};

export function InfoForm({ formik, images, propertyType }) {
  //estado para mostrar el mapa
  const [showMap, setShowMap] = useState(false);
  //estado para guardar la region y comunas seleccionadas
  const [selectedRegion, setSelectedRegion] = useState("");
  const [comunas, setComunas] = useState([]);

  const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

  //Funcino para cambiar la region y cargar las comunas correspondientes
  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    const comunasRegion = regionesYComunas[region] || [];
    setComunas(comunasRegion);
    formik.setFieldValue("region", region);
    formik.setFieldValue("city", comunasRegion[0] || "");
  };

  const handleCityChange = (city) => {
    formik.setFieldValue("city", city);
  };

  //Obtener el color del icono del mapa
  const getColorIconMap = (formik) => {
    if (formik.errors.location) return "#FF0000";

    if (formik.values.location) return "#00a680";

    return "#c2c2c2";
  };

  return (
    <>
      <View>
        <View>
          <TextInput
            placeholder="Nombre de la propiedad"
            style={styles.input}
            onChangeText={(text) => formik.setFieldValue("nameProperty", text)}
          />
          {formik.errors.nameProperty && (
            <Text style={styles.error}>{formik.errors.nameProperty}</Text>
          )}
        </View>

        <View style={styles.container}>
          <UploadImage formik={formik} images={images} />
        </View>

        {/* ESTADO DE LA PROPIEDAD */}
        <View style={styles.container}>
          <Picker
            selectedValue={formik.values.state}
            onValueChange={(itemValue) =>
              formik.setFieldValue("state", itemValue)
            }
            style={styles.picker}
            mode="dropdown"
          >
            <Picker.Item label="Estado" value="" />
            <Picker.Item label="Venta" value="Venta" />
            <Picker.Item label="Arriendo" value="Venta" />
          </Picker>
        </View>
        {formik.errors.state && (
          <Text style={styles.error}>{formik.errors.state}</Text>
        )}

        {/* ELEMENTOS QUE SE MUESTRAN DEPENDIENDO DEL TIPO DE PROPIEDAD */}
        {propertyType === "Casa" && (
          <>
            <View style={styles.container}>
              <View style={styles.Expenses}>
                <InputNumber
                  value={formik.values.commonExpenses}
                  onChangeText={(text) =>
                    formik.setFieldValue("commonExpenses", text)
                  }
                  error={formik.errors.commonExpenses}
                />
              </View>

              <View style={[styles.container, styles.row]}>
                <Text style={styles.label}>Metros Cuadrados Totales:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={(text) => formik.setFieldValue("metters", text)}
                />
                {formik.errors.metters && (
                  <Text style={styles.error}>{formik.errors.metters}</Text>
                )}
              </View>

              <View style={[styles.container, styles.row]}>
                <Text style={styles.label}>Metros Cuadrados Propiedad:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    formik.setFieldValue("mettersProperty", text)
                  }
                />
                {formik.errors.mettersProperty && (
                  <Text style={styles.error}>
                    {formik.errors.mettersProperty}
                  </Text>
                )}
              </View>

              <View style={styles.row}>
                <View style={styles.pickerContainer}>
                  <RoomsPicker
                    selectedValue={formik.values.rooms}
                    onValueChange={(itemValue) =>
                      formik.setFieldValue("rooms", itemValue)
                    }
                    error={formik.errors.rooms}
                  />
                </View>

                <View style={styles.pickerContainer}>
                  <BathroomsPicker
                    selectedValue={formik.values.bathrooms}
                    onValueChange={(itemValue) =>
                      formik.setFieldValue("bathrooms", itemValue)
                    }
                    error={formik.errors.bathrooms}
                  />
                </View>
              </View>
            </View>
          </>
        )}
        {propertyType === "Departamento" && (
          <>
            <View style={styles.container}>
              <View style={styles.Expenses}>
                <InputNumber
                  value={formik.values.commonExpenses}
                  onChangeText={(text) =>
                    formik.setFieldValue("commonExpenses", text)
                  }
                  error={formik.errors.commonExpenses}
                />
              </View>

              <View style={styles.row}>
                <View style={styles.pickerContainer}>
                  <RoomsPicker
                    selectedValue={formik.values.rooms}
                    onValueChange={(itemValue) =>
                      formik.setFieldValue("rooms", itemValue)
                    }
                    error={formik.errors.rooms}
                  />
                </View>

                <View style={styles.pickerContainer}>
                  <BathroomsPicker
                    selectedValue={formik.values.bathrooms}
                    onValueChange={(itemValue) =>
                      formik.setFieldValue("bathrooms", itemValue)
                    }
                    error={formik.errors.bathrooms}
                  />
                </View>
              </View>
            </View>
          </>
        )}
        {propertyType === "Terreno" && (
          <>
            <View style={styles.container}>
              <View style={[styles.container, styles.row]}>
                <Text style={styles.label}>Metros Cuadrados Totales:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={(text) => formik.setFieldValue("metters", text)}
                />
                {formik.errors.metters && (
                  <Text style={styles.error}>{formik.errors.metters}</Text>
                )}
              </View>
            </View>
          </>
        )}

        <View style={styles.container}>
          <Text style={styles.label}>Dirección:</Text>
          <Input
            inputContainerStyle={styles.inputContainer}
            rightIcon={{
              type: "material-community",
              name: "map-marker-radius",
              color: getColorIconMap(formik),
              onPress: onOpenCloseMap,
            }}
            onChangeText={(text) => formik.setFieldValue("address", text)}
            errorMessage={formik.errors.address}
          />
          <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
        </View>

        {/* SELECCIONAR REGION Y COMUNA */}
        <View style={styles.row}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedRegion}
              onValueChange={(itemValue) => handleRegionChange(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Región" value="" />
              {Object.keys(regionesYComunas).map((region) => (
                <Picker.Item key={region} label={region} value={region} />
              ))}
            </Picker>
            {formik.errors.region && (
              <Text style={styles.error}>{formik.errors.region}</Text>
            )}
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formik.values.city}
              onValueChange={(itemValue) => handleCityChange(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Comuna" value="" />
              {comunas.map((comuna) => (
                <Picker.Item key={comuna} label={comuna} value={comuna} />
              ))}
            </Picker>
            {formik.errors.city && (
              <Text style={styles.error}>{formik.errors.city}</Text>
            )}
          </View>
        </View>

        <View style={styles.container}>
          <Text>Precio:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => formik.setFieldValue("price", text)}
          />
        </View>

        <View style={styles.container}>
          <Text>Descripción:</Text>
          <TextInput
            style={styles.descriptionInput}
            multiline={true}
            onChangeText={(text) => formik.setFieldValue("description", text)}
          />
          {formik.errors.description && (
            <Text style={styles.error}>{formik.errors.description}</Text>
          )}
        </View>
      </View>
    </>
  );
}
