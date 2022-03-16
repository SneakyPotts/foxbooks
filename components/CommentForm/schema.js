import * as yup from "yup";

const schema = yup.object().shape({
  text: yup.string()
    .min(2, 'Минимальное количество символов 2')
    .max(64000, 'Максимальное количество символов 64000')
    .required('Это обязательное поле'),
});

export default schema