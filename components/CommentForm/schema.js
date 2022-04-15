import * as yup from "yup";

const schema = yup.object().shape({
  text: yup.string()
    .required('Это обязательное поле')
    .min(2, 'Минимальное количество символов 2')
    .max(64000, 'Максимальное количество символов 64000')
});

export default schema