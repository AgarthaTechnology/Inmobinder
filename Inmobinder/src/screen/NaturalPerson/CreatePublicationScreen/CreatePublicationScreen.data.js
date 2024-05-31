import * as Yup from "yup";

export function initialValues(propertyType) {
  const baseValues = {
    nameProperty: "",
    state: "",
    metters: "",
    mettersProperty: "",
    address: "",
    city: "",
    region: "",
    price: "",
    rooms: "",
    bathrooms: "",
    description: "",
    location: null,
    gallery: [],
    video: [],
  };

  if (propertyType === "Casa") {
    return {
      ...baseValues,
      commonExpenses: "",
    };
  }

  if (propertyType === "Departamento") {
    return {
      ...baseValues,
    };
  }

  if (propertyType === "Terreno") {
    return {
      ...baseValues,
      commonExpenses,
    };
  }

  return baseValues;
}

export function validationSchema(propertyType) {
  let baseSchema = {
    nameProperty: Yup.string()
      .min(2, "El nombre de la propiedad debe tener al menos 2 caracteres")
      .required("Campo obligatorio"),

    state: Yup.string()
      .oneOf(
        ["Disponible", "No disponible"],
        'La disponibilidad debe ser "Disponible" o "No disponible"'
      )
      .required("Campo obligatorio"),

    metters: Yup.number()
      .integer("Los metros cuadrados totales deben ser un número entero")
      .min(140, "Debe tener al menos 140 metros cuadrados")
      .positive("No se permiten valores menores a 0")
      .required("Campo obligatorio"),

    mettersProperty: Yup.number()
      .integer("Los metros cuadrados deben ser un número entero")
      .min(0, "No se permiten valores menores a 0")
      .positive("No se permiten valores menores a 0")
      .required("Campo obligatorio"),

    address: Yup.string()
      .min(5, "La dirección debe tener al menos 5 caracteres")
      .required("Campo obligatorio"),

    city: Yup.string().required("Campo obligatorio"),

    region: Yup.string().required("Campo obligatorio"),

    price: Yup.number()
      .min(1, "El precio debe ser mayor a 0")
      .positive("No se permiten valores menores a 0")
      .required("Campo obligatorio"),

    rooms: Yup.number()
      .min(1, "Debe tener al menos 1 habitación")
      .positive("No se permiten valores menores a 0")
      .required("Campo obligatorio"),

    bathrooms: Yup.number()
      .min(1, "Debe tener al menos 1 baño")
      .positive("No se permiten valores menores a 0")
      .required("Campo obligatorio"),

    description: Yup.string()
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .required("Campo obligatorio"),

    gallery: Yup.array().min(2, "Debe subir al menos una imagen"),

    video: Yup.array().max(1, "Solo puede subir un video"),

    location: Yup.object().required("La ubicación es requerida"),
  };

  if (propertyType === "Casa") {
    return {
      ...baseSchema,
      commonExpenses: Yup.number()
        .integer("Los gastos comunes deben ser un número entero")
        .min(0, "No se permiten valores menores a 0")
        .positive("No se permiten valores menores a 0")
        .required("Campo obligatorio"),
    };
  }

  if (propertyType === "Departamento") {
    return Yup.object(baseSchema);
  }

  if (propertyType === "Terreno") {
    return {
      ...baseSchema,
      commonExpenses: Yup.number()
        .integer("Los gastos comunes deben ser un número entero")
        .min(0, "No se permiten valores menores a 0")
        .positive("No se permiten valores menores a 0")
        .required("Campo obligatorio"),
    };
  }

  return Yup.object(baseSchema);
}
