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

    description: Yup.string()
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .required("Campo obligatorio"),

    gallery: Yup.array().min(2, "Debe subir al menos una imagen"),

    video: Yup.array().max(1, "Solo puede subir un video"),

    location: Yup.object().required("La ubicación es requerida"),
  });

  const extendedSchema = {
    commonExpenses: Yup.number()
      .integer("Los gastos comunes deben ser un número entero")
      .min(0, "No se permiten valores menores a 0")
      .positive("No se permiten valores menores a 0")
      .required("Campo obligatorio"),

    condition: Yup.string()
      .oneOf(["nuevo", "usado"], 'La condición debe ser "nuevo" o "usado"')
      .required("Campo obligatorio"),

    rooms: Yup.number()
      .min(1, "Debe tener al menos 1 habitación")
      .positive("No se permiten valores menores a 0")
      .required("Campo obligatorio"),

    bathrooms: Yup.number()
      .min(1, "Debe tener al menos 1 baño")
      .positive("No se permiten valores menores a 0")
      .required("Campo obligatorio"),
  };

  if (propertyType === "Casa" || propertyType === "Departamento") {
    return baseSchema.concat(Yup.object().shape(extendedSchema));
  }

  return baseSchema;
}
