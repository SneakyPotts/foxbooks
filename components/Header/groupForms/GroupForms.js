import React, {useEffect, useState} from 'react';
import css from "./index.module.scss";
import classnames from "classnames";
import Input from "../../shared/common/Input/Input";
import Button from "../../shared/common/Button/Button";
import ModalWindow from "../../shared/common/modalWindow/ModalWindow";

import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector} from "react-redux";
import SocialNetwork from "../../shared/common/SocialNetwork/SocialNetwork";
import {forgotPassword, setAuth, signIn, signUp} from "../../../store/authSlice";
import {getProfile} from "../../../store/profileSlice";
import {ref} from "yup";
import {useRouter} from "next/router";

const GroupForms = ({modal,setModal}) => {
	const dispatch = useDispatch()
	const router = useRouter()

	const [flagLogin, setFlagLogin] = useState(true)
	const [flagRegistration, setFlagRegistration] = useState(false)
	const [flagSendEmail, setFlagSendEmail] = useState(false)
	const [flagForgetPassword, setFlagForgetPassword] = useState(false)
	const [flagResetPassMessage, setFlagResetPassMessage] = useState(false)
	const [flagNewPass, setFlagNewPass] = useState(false)
	const [flagNewPassMessage, setFlagNewPassMessage] = useState(false)

	const { innerWidthWindow } = useSelector(state => state.common)
	const { isError } = useSelector(state => state.auth)

	const schema = yup.object().shape({
		email: !flagNewPass && yup.string().required('Это обязательное поле').email('Неправильно введена электронная почта'),
		password: (flagRegistration || flagLogin || flagNewPass) && yup.string().max(32, 'Максимальная длина 32 символа')
			.required('Это обязательное поле')
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
				'Используйте латинские буквы A-z верхнего или нижнего регистра, а так же числа от 1 до 0.'),
		password_confirm: flagNewPass && yup.string().max(32, 'Максимальная длина 32 символа')
			.required('Это обязательное поле')
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
				'Используйте латинские буквы A-z верхнего или нижнего регистра, а так же числа от 1 до 0.')
		  .oneOf([ref('password'), null], 'Пароли должны совпадать')
	});

	const {register, handleSubmit, unregister,  formState: {errors}, reset} = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmitLogin = data =>{
		dispatch(signIn(data)).then(res => {
			if (res.meta.requestStatus === "fulfilled") {
				dispatch(getProfile()).then(() => {
					dispatch(setAuth(true))
					setModal(!modal)
				})
			}
		})
	}

	const onSubmitRegistration = data => {
		dispatch(signUp(data)).then(res => {
			if (res.meta.requestStatus === "fulfilled") {
				setFlagRegistration(false)
				setFlagSendEmail(true)
			}
		})
	}

	const onSubmitForgetPassword = data => {
		dispatch(forgotPassword(data)).then(res => {
			if (res.meta.requestStatus === "fulfilled") {
				setFlagForgetPassword(false)
				setFlagResetPassMessage(true)
			}
		})
	}

	const onSubmitNewPassword = data => {
		// dispatch(forgotPassword(data)).then(res => {
		// 	if (res.meta.requestStatus === "fulfilled") {
				setFlagNewPass(false)
				setFlagNewPassMessage(true)
			// }
		// })
	}

	useEffect(() => {
		const {newPass} = router.query

		setFlagSendEmail(false)
		setFlagForgetPassword(false)
		setFlagRegistration(false)
		setFlagResetPassMessage(false)
		setFlagNewPass(!!newPass)
		setFlagNewPassMessage(false)
		reset()
		setFlagLogin(!newPass)
	},[modal])

	return modal && (
		<ModalWindow
			onClose={() => setModal(false)}
			isFullScreen={innerWidthWindow <= 480}
		>
			<div className={css.login}>
				{flagLogin &&
					<h2>Вход на FoxBooks</h2>
				}
				{(flagRegistration || flagSendEmail) &&
					<h2 className={classnames({[css.loginMin]: flagSendEmail})}>Регистрация</h2>
				}
				{flagResetPassMessage &&
					<h2 className={css.loginMin}>Восстановить пароль</h2>
				}
				{flagForgetPassword &&
					<h2 className={css.loginMin}>Забыли пароль?</h2>
				}
				{(flagNewPass || flagNewPassMessage) &&
					<h2 className={css.loginMin}>Сброс пароля</h2>
				}

				{flagLogin && <form onSubmit={handleSubmit(onSubmitLogin)}>
					<Input
						err={errors.email?.message}
						textLabel='Электронная почта'
						name='email'
						register={register}
					/>
					<Input
						err={errors.password?.message}
						textLabel='Пароль'
						name='password'
						typeInput='password'
						register={register}
					/>
					{isError && <p className={css.error}>Неверная почта или пароль</p>}
					<Button
						typeButton='submit'
						text='Вход'
						classNames={css.loginButton}
					/>
					<div className={css.loginButtons}>
						<button
							onClick={() => {
								unregister("password")
								setFlagLogin(false)
								setFlagForgetPassword(true)
								reset()
							}}
							type='button'>Не помню пароль</button>
						<button
							onClick={() => {
								setFlagLogin(false)
								setFlagRegistration(true)
								reset()
							}}
							type='button'>Зарегистрироваться
						</button>
					</div>
					<SocialNetwork/>
				</form>}

				{flagRegistration && <form onSubmit={handleSubmit(onSubmitRegistration)}>
					<Input
						err={errors.email?.message}
						textLabel='Электронная почта'
						name='email'
						register={register}
					/>
					<Input
						err={errors.password?.message}
						textLabel='Пароль'
						name='password'
						typeInput='password'
						register={register}
					/>
					<Button
						typeButton='submit'
						text='Зарегистрироваться'
						classNames={css.loginButton}
					/>
				</form>}

				{(flagSendEmail || flagResetPassMessage || flagNewPassMessage ) &&
					<div>
						{flagSendEmail &&
							<p className={css.message}>
								Письмо с подтверждением регистрации выслано на вашу электронную почту.
							</p>
						}
						{flagResetPassMessage &&
							<p className={css.message}>
								Письмо со ссылкой для восстановления пароля выслано на вашу почту.
							</p>
						}
						{flagNewPassMessage &&
							<p className={css.message}>
								Ваш новый пароль вступил в силу.
							</p>
						}

						<Button
							click={()=>setModal(!modal)}
							typeButton='button'
							text='Закрыть'
							classNames={css.loginButton}
						/>
					</div>
				}

				{flagForgetPassword &&
					<div>
						<p className={css.message}>Укажите электронную почту, указаную при регистрации</p>
						<form onSubmit={handleSubmit(onSubmitForgetPassword)}>
							<Input
								err={errors.email?.message}
								textLabel='Электронная почта'
								name='email'
								register={register}
							/>
							<Button
								text='Отправить'
								classNames={css.loginButton}
							/>
						</form>
					</div>
				}

				{flagNewPass &&
					<div>
						<p className={css.message}>Укажите новый пароль</p>
						<form onSubmit={handleSubmit(onSubmitNewPassword)}>
							<Input
								typeInput={'password'}
								err={errors.password?.message}
								textLabel='Новый пароль'
								name='password'
								register={register}
							/>
							<Input
								typeInput={'password'}
								err={errors.password_confirm?.message}
								textLabel='Повтор пароля'
								name='password_confirm'
								register={register}
							/>
							<p className={css.message}>Используйте латинские буквы A-z верхнего или нижнего регистра, а так же числа от 1 до 0.</p>
							<Button
								text='Изменить пароль'
								classNames={css.loginButton}
							/>
						</form>
					</div>
				}

			</div>
		</ModalWindow>
	);
};

export default GroupForms;