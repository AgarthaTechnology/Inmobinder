import * as Yup from "yup";

export function initialValues(propertyType) {
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
  };

  if (propertyType === "Casa") {
    return {
      ...baseValues,
      commonExpenses: 0,
      condition: "",
      rooms: 0,
      bathrooms: 0,
      mettersProperty: 0,
    };
  }

  if (propertyType === "Departamento") {
    return {
      ...baseValues,
      commonExpenses: 0,
      condition: "",
      rooms: 0,
      bathrooms: 0,
    };
  }

  if (propertyType === "Terreno") {
    return baseValues;
  }

  return baseValues;
}

export function validationSchema(propertyType) {
  const baseSchema = Yup.object().shape({
    nameProperty: Yup.string()
      .min(5, "Debe tener al menos 5 caracteres")
      .required("Campo obligatorio"),

    state: Yup.string()
      .oneOf(
        ["Venta", "Arriendo", "Arriendo y Venta"],
        'La disponibilidad debe ser "Venta", "Arriendo" o "Arriendo y Venta"'
      )
      .required("Campo obligatorio"),

    metters: Yup.number()
      .integer("Debe ser un número entero")
      .min(1, "Mínimo 1 metro cuadrado")
      .required("Campo obligatorio"),

    address: Yup.string()
      .min(6, "La dirección debe tener al menos 6 caracteres")
      .required("Campo obligatorio"),

    price: Yup.number().min(1, "Valor inválido").required("Campo obligatorio"),

    gallery: Yup.array()
      .min(1, "Se requiere al menos 1 imágen")
      .required("Campo obligatorio"),

    video: Yup.array().max(1, "Solo puede subir un video"),

    location: Yup.object().required("La ubicación es requerida"),

    contact1Name: Yup.string().required("Campo obligatorio"),

    contact1Phone: Yup.string()
      .matches(/^\d{9}$/, "Debe tener exactamente 9 caracteres numéricos")
      .required("Campo obligatorio"),
  });

  const HomeSchema = Yup.object().shape({
    commonExpenses: Yup.number()
      .integer("Los gastos comunes deben ser un número entero")
      .min(0, "Mínimo 0")
      .required("Campo obligatorio"),

    condition: Yup.string()
      .notOneOf(["Condición"], 'No puede ser igual a "Condición"')
      .required("Campo obligatorio"),

    mettersProperty: Yup.number()
      .integer("Debe ser un número entero")
      .min(0, "Mínimo 1 metro cuadrado")
      .required("Campo obligatorio"),

    rooms: Yup.number()
      .notOneOf(["Habitaciones"], 'No puede ser igual a "Habitaciones"')
      .min(1, "Debe tener al menos 2 habitaciones")
      .required("Campo obligatorio"),

    bathrooms: Yup.number()
      .notOneOf(["Baños"], 'No puede ser igual a "Baños"')
      .min(1, "Debe tener al menos 1 baño")
      .required("Campo obligatorio"),
  });

  const DepSchema = Yup.object().shape({
    commonExpenses: Yup.number()
      .integer("Los gastos comunes deben ser un número entero")
      .min(0, "Mínimo 0")
      .required("Campo obligatorio"),

    condition: Yup.string()
      .notOneOf(["Condición"], 'No puede ser igual a "Condición"')
      .required("Campo obligatorio"),

    rooms: Yup.number()
      .notOneOf(["Habitaciones"], 'No puede ser igual a "Habitaciones"')
      .min(2, "Debe tener al menos 2 habitaciones")
      .required("Campo obligatorio"),

    bathrooms: Yup.number()
      .notOneOf(["Baños"], 'No puede ser igual a "Baños"')
      .min(1, "Debe tener al menos 1 baño")
      .required("Campo obligatorio"),

    allowmetters: Yup.number()
      .integer("Debe ser un número entero")
      .min(1, "Mínimo 1 metro cuadrado")
      .required("Campo obligatorio"),
  });

  if (propertyType === "Casa") {
    return baseSchema.concat(HomeSchema);
  }

  if (propertyType === "Departamento") {
    return baseSchema.concat(DepSchema);
  }

  if (propertyType === "Terreno") {
    return baseSchema;
  }

  return baseSchema;
}
