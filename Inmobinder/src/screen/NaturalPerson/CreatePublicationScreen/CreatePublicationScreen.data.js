import * as Yup from "yup";

export function initialValues() {
  const baseValues = {
    nameProperty: "",
    state: "",
    metters: 0,
    address: "",
    price: 0,
    description: "",
    location: null,
    gallery: [],
    video: [],
    contact1Name: "",
    contact1Phone: "",
    contact1PhoneFormatted: "",
    contact2Name: "",
    contact2Phone: "",
    contact2PhoneFormatted: "",
    commonExpenses: 0,
    condition: "",
    rooms: 0,
    bathrooms: 0,
    mettersProperty: 0,
  };
  return baseValues;
}

export function validationSchema() {
  const baseSchema = Yup.object().shape({
    nameProperty: Yup.string()
      .min(5, "Debe tener al menos 5 caracteres")
      .required("Campo obligatorio")
      .max(50, "Máximo 50 caracteres"),

    state: Yup.string()
      .oneOf(
        ["Venta", "Arriendo", "Arriendo y Venta"],
        'La disponibilidad debe ser "Venta", "Arriendo" o "Arriendo y Venta"'
      )
      .required("Campo obligatorio"),

    metters: Yup.number()
      .integer("Debe ser un número entero")
      .min(1, "Mínimo 1 metro cuadrado")
      .required("Campo obligatorio")
      .test(
        "is-less-than-mettersProperty",
        "Debe ser menor que metros totales",
        function (value) {
          return value < this.parent.mettersProperty;
        }
      ),

    address: Yup.string()
      .min(5, "La dirección debe tener al menos 6 caracteres")
      .required("Campo obligatorio")
      .max(100, "Máximo 100 caracteres"),

    price: Yup.number().min(0, "Valor inválido").required("Campo obligatorio"),

    description: Yup.string()
      .min(5, "Debe tener al menos 10 caracteres")
      .required("Campo obligatorio")
      .max(200, "Máximo 500 caracteres"),

    gallery: Yup.array()
      .min(1, "Se requiere al menos 1 imágen")
      .required("Campo obligatorio")
      .max(9, "Máximo 9 imágenes"),

    location: Yup.object().required("La ubicación es requerida"),

    contact1Name: Yup.string().required("Campo obligatorio"),

    contact1Phone: Yup.string()
      .matches(/^\d{9}$/, "Debe tener exactamente 9 caracteres numéricos")
      .required("Campo obligatorio"),

    commonExpenses: Yup.number()
      .integer("Los gastos comunes deben ser un número entero")
      .min(0, "Mínimo 0")
      .required("Campo obligatorio"),

    condition: Yup.string()
      .notOneOf(["Condición"], 'No puede ser igual a "Condición"')
      .required("Campo obligatorio"),

    mettersProperty: Yup.number()
      .integer("Debe ser un número entero")
      .min(1, "Mínimo 1 metro cuadrado")
      .required("Campo obligatorio")
      .test(
        "is-greater-than-metters",
        "Debe ser mayor que metros construidos",
        function (value) {
          return value > this.parent.metters;
        }
      ),

    rooms: Yup.number()
      .min(0, "Debe ser positivo")
      .required("Campo obligatorio"),

    bathrooms: Yup.number()
      .min(0, "Debe ser positivo")
      .required("Campo obligatorio"),
  });
  return baseSchema;
}
