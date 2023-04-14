import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Это обязательное поле').min(2, 'Минимальное количество символов 2').max(64000, 'Максимальное количество символов 64000'),
  text: yup.string().required('Это обязательное поле').min(2, 'Минимальное количество символов 2').max(64000, 'Максимальное количество символов 64000'),
  review_type: yup.number().required('Это обязательное поле'),
});

export default schema;
