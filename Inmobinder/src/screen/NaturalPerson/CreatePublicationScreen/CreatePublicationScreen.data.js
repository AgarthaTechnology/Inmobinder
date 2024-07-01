import * as Yup from "yup";

export function initialValues(propertyType) {
  const baseValues = {
    nameProperty: "",
    state: "",
    metters: "",
    mettersProperty: "",
    address: "",
    region: "",
    city: "",
    price: "",
    description: "",
    location: null,
    gallery: [],
    video: [],
  };

  if (propertyType === "Casa" || propertyType === "Departamento") {
    return {
      ...baseValues,
      commonExpenses: "",
      condition: "",
      rooms: "",
      bathrooms: "",
    };
  }

  if (propertyType === "Departamento") {
    return {
      allowmetters: "",
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
      .min(10, "Debe tener al menos 10 caracteres")
      .required("Campo obligatorio"),

    state: Yup.string()
      .oneOf(
        ["Disponible", "No disponible"],
        'La disponibilidad debe ser "Disponible" o "No disponible"'
      )
      .required("Campo obligatorio"),

    metters: Yup.number()
      .integer("Debe ser un número entero")
      .min(500, "Mínimo 500 metros cuadrados")
      .required("Campo obligatorio"),

    mettersProperty: Yup.number()
      .integer("Debe ser un número entero")
      .min(140, "Minimo 140 metros cuadrados")
      .required("Campo obligatorio"),

    address: Yup.string()
      .min(6, "La dirección debe tener al menos 6 caracteres")
      .required("Campo obligatorio"),

    city: Yup.string().required("Campo obligatorio"),

    region: Yup.string().required("Campo obligatorio"),

    price: Yup.number().min(1, "Valor Invalido").required("Campo obligatorio"),

    description: Yup.string().min(5, "Debe tener al menos 5 caracteres"),

    gallery: Yup.array().required("Se requiere al menos 2 imagenes"),

    video: Yup.array().max(1, "Solo puede subir un video"),

    location: Yup.object().required("La ubicación es requerida"),
  });

  const extendedSchema = {
    commonExpenses: Yup.number()
      .integer("Los gastos comunes deben ser un número entero")
      .min(50000, "Minimo 50000")
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
  };

  if (propertyType === "Casa" || propertyType === "Departamento") {
    return baseSchema.concat(Yup.object().shape(extendedSchema));
  }

  return baseSchema;
}
