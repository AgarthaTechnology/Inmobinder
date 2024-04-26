import * as Yup from "yup";

export function initialVales() {
  return {
    nameProperty: "",
    metters: "",
    address: "",
    disponibility: "",
    rooms: "",
    bathrooms: "",
    description: "",
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("Campo obligatorio"),
    metters: Yup.number().required("Campo obligatorio"),
    address: Yup.string().required("Campo obligatorio"),
    disponibility: Yup.string().required("Campo obligatorio"),
    rooms: Yup.number().required("Campo obligatorio"),
    bathrooms: Yup.number().required("Campo obligatorio"),
    description: Yup.string().required("Campo obligatorio"),
  });
}