import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string()
    .min(8, 'Минимальное количество символов 8')
    .max(100, 'Превышено максимальное количество символов')
    .required('Это обязательное поле'),
});

export default schema