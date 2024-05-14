import React from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity, TextInput} from 'react-native';


const image = { src: 'Group.png' };
const RegionesYcomunas = {
    "regiones": [{
        "NombreRegion": "Arica y Parinacota",
        "comunas": ["Arica", "Camarones", "Putre", "General Lagos"]
    },
    {
        "NombreRegion": "Tarapacá",
        "comunas": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
    },
    {
        "NombreRegion": "Coquimbo",
        "comunas": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]
    },
    {
        "NombreRegion": "Valparaíso",
        "comunas": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]
    },
    {
        "NombreRegion": "Región del Libertador Gral. Bernardo O’Higgins",
        "comunas": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
    },
    {
        "NombreRegion": "Región del Maule",
        "comunas": ["Talca", "ConsVtución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "ReVro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
    },
    {
        "NombreRegion": "Región del Biobío",
        "comunas": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]
    },
    {
        "NombreRegion": "Región de la Araucanía",
        "comunas": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria",]
    },
    {
        "NombreRegion": "Región de Los Ríos",
        "comunas": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]
    },
    {
        "NombreRegion": "Región de Los Lagos",
        "comunas": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "FruVllar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]
    },
    {
        "NombreRegion": "Región Aisén del Gral. Carlos Ibáñez del Campo",
        "comunas": ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]
    },
    {
        "NombreRegion": "Región de Magallanes y de la AntárVca Chilena",
        "comunas": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "AntárVca", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
    },
    {
        "NombreRegion": "Región Metropolitana de Santiago",
        "comunas": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "TilVl", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
    }]
};


const Casa = () => {
    const navigation = useNavigation();
    const [regiones, setRegiones] = useState(RegionesYcomunas.regiones.map(region => region.NombreRegion));
    const [comunas, setComunas] = useState([]);
    const [propiedades, setPropiedades] = useState([]);
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState('');
    const [gcomun, setGcomun] = useState('');
    const [tipo, setTipo] = useState('');
    const [metros, setMetro] = useState('');
    const [dorm, setDorm] = useState('');
    const [baños, setBaños] = useState('');
    const [estacionamiento, setEstacionamiento] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedComuna, setSelectedComuna] = useState('');
    const [precio, setprecio] = useState('');
    const [direc, setDirec] = useState('');
    const [descrip, setDescrip] = useState('');

    const handlePress = () => {
        navigation.navigate('updateProp', { itemId: tuItemId, navigation: navigation });
        navigation.navigate('DeleteP', { itemId: tuItemId, navigation: navigation });

    };


    const addProperty = async () => {
        try {
            const db = getFirestore();
            const docRef = await addDoc(collection(db, 'propiedades'), {
                nombre,
                imagen,
                gcomun,
                tipo,
                metros,
                dorm,
                baños,
                estacionamiento,
                region: selectedRegion,
                comuna: selectedComuna,
                precio,
                direc,
                descrip
            });
            console.log('Document written with ID: ', docRef.id);

            // Limpia los campos después de guardar
            setNombre('');
            setImagen('');
            setGcomun('');
            setTipo('');
            setMetro('');
            setDorm('');
            setBaños('');
            setEstacionamiento('');
            setSelectedRegion('');
            setSelectedComuna('');
            setprecio('');
            setDirec('');
            setDescrip('');
            alert('Datos guardados correctamente.');
        } catch (error) {
            console.error('Error al guardar los datos:', error);
            alert('No se pudo guardar los datos. Por favor, inténtelo de nuevo.');
        }
    };

    const handleRegionChange = (region) => {
        setSelectedRegion(region);
        const regionData = RegionesYcomunas.regiones.find(item => item.NombreRegion === region);
        if (regionData) {
            setComunas(regionData.comunas);
        } else {
            console.error('No se encontró ninguna información para la región ${region}');
            // Aquí podrías manejar el caso en el que no se encuentra la región
        }
    };



    const handleComunaChange = (comuna) => {
        setSelectedComuna(comuna);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            value = { imagen }
            setImagen(result.assets[0].uri); // Aquí actualizas el estado con la URI de la imagen
        }
    };
    const play = () => {
        const [countryData, setCountryData] = useState([]);
        const [stateData, setStateData] = useState([]);
        const [cityData, setCityData] = useState([]);
        const [value, setValue] = useState(null);
        const [isFocus, setIsFocus] = useState(false);
        function myOnLoad() {
            cargar_provincias()
        }

        // funcion para Cargar Provincias al campo <select>
        function cargar_provincias() {
            var array = NombreRegion;

            //carga el arreglo
            array.sort();

            addOptions("provincia", array);
        }

        // Rutina para agregar opciones a un <select>
        function addOptions(domElement, array) {
            var select = document.getElementsByName(domElement)[0];

            for (value in array) {
                var option = document.createElement("option");
                option.text = array[value];
                select.add(option);
            }
        }

    }
}
export default function AddProperty({ navigation }) {

    return (

        <View style={styles.layout}>
            {/* Imagen de fondo */}
            <Image
                source={require('../../../../assets/Pantalla-de-fondo.png')}
                style={styles.backgroundImage}
            />
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <ScrollView contentContainerStyle={styles.ScrollView} vertical={true}>
                        <View style={styles.containerTitle}>
                            <Text style={styles.title}>Agregar Propiedades </Text>
                        </View>
                        <View style={styles.line}></View>

                        <View style={styles.Group363}>
                            <Text style={styles.subtitle}> Titulo </Text>
                            <View style={styles.images1}>
                                <Image source={require('../../../../assets/camera.png')} />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.inputCont1}>
                            <Text>Incluye gastos comunes por</Text>
                            <TextInput style={styles.input1} placeholder='monto'
                                //onChangeText={(gcomun) => setGcomun(gcomun)}
                                //value={gcomun}
                            />
                            </View>


                        </View>





                    </ScrollView>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 345,
        height: 707,
        marginTop: 60,
        bottom: 15,
        alignSelf: 'center',
        borderRadius: 20,
        Bottom: 15,
        justifyContent: 'center',

    },

    subContainer: {
        width: 308,
        height: 650,
        alignItems: 'center',

    },

    ScrollView: {
        width: 308,
        height: 650,
        alignItems: 'center',
        flexGrow: 1, // Asegura que el contenido pueda crecer dentro del ScrollView
        paddingTop: 10, // Espacio superior para evitar superposición con el título
    },

    containerTitle: {
        alignItems: 'center',
        justifyContent: 'center', // Centra verticalmente
        marginTop: 30,
        marginBottom: 15,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',

    },

    line: {
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 15,
        alignItems: 'center',
    },

    Group363: {
        Width: 158,
        Height: 157,
        alignItems: 'center',


    },
    subtitle: {
        marginTop: 20,
        marginBottom: 20,
        fontWeight: 'bold',

    },

    images1: {
        marginBottom: 20,
        height: 123,
        width: 130,
        backgroundColor: '#d9d9d9',
        justifyContent: 'center', //centrar vertical
        alignItems: 'center',
    },
    inputContainer: {
        marginTop: 10,
    },
    input1: {
        width: '40%',
        padding: 10,
        backgroundColor: '#d5dbdb',
        height: 40,
        marginTop: 5,
        borderColor: 'black',
        borderRadius: 5,
        top: -35,
        left: '58%',
    },

});
