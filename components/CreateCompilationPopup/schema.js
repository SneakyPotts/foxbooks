import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string()
    .required('Это обязательное поле')
    .min(8, 'Минимальное количество символов 8')
    .max(100, 'Превышено максимальное количество символов'),
  description: yup.string()
    .required('Это обязательное поле'),
  image: yup.mixed()
    .required('Загрузите изображение'),
});

export default schema