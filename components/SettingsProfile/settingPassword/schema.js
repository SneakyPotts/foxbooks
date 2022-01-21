import * as yup from "yup";

const rule = yup.string().max(32)
	.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
		'Используйте латинские буквы A-z верхнего или нижнего регистра, а так же числа от 1 до 0.')
	.required('Это поле не может быть пустым.')

const schema = yup.object().shape({
	old_password: rule,
	password: rule,
	password_confirmation: rule,
});

export default schema