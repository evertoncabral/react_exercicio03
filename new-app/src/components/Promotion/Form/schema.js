import * as yup from "yup";

export default yup.object().shape({
  title: yup.string().required("Campo Obrigatório"),
  url: yup.string().url().required("Campo Obrigatório"),
  imageUrl: yup.string().url().required("Campo Obrigatório"),
  price: yup.string().required("Campo Obrigatório"),
});
