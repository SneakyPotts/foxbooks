import React, {useEffect, useState} from 'react';
import css from "./index.module.scss";
import classnames from "classnames";
import Input from "../../shared/common/Input/Input";
import Button from "../../shared/common/Button/Button";
import Yandex from "../../shared/icons/yandex";
import Google from "../../shared/icons/google";
import VK from "../../shared/icons/VK";
import OK from "../../shared/icons/OK";
import ModalWindow from "../../shared/common/modalWindow/ModalWindow";

import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch} from "react-redux";
import SocialNetwork from "../../shared/common/SocialNetwork/SocialNetwork";
import {setAuth, signIn, signUp} from "../../../store/authSlice";

const GroupForms = ({modal,setModal}) => {
	const [flagLogin, setFlagLogin] = useState(true)
	const [flagRegistration, setFlagRegistration] = useState(false)
	const [flagSendEmail, setFlagSendEmail] = useState(false)
	const [flagForgetPassword, setFlagForgetPassword] = useState(false)
	const [flagResetPassMessage, setFlagResetPassMessage] = useState(false)

	const dispatch = useDispatch()

	const schema = yup.object().shape({
		email: yup.string().email('Неправильно введена электронная почта').required('Это поле не может быть пустым.'),
		password: (flagRegistration || flagLogin) && yup.string().max(32)
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
				'Используйте латинские буквы A-z верхнего или нижнего регистра, а так же числа от 1 до 0.')
			.required('Это поле не может быть пустым.'),
	});

	const {register, handleSubmit, unregister,  formState: {errors}, reset} = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmitLogin = data =>{
		dispatch(signIn(data)).then(res => {
			if (res.meta.requestStatus === "fulfilled") {
				dispatch(setAuth(true))
				setModal(!modal)
			}
		})
		console.log(data, 'Форма входа');
	}

	const onSubmitRegistration = data => {
		dispatch(signUp(data)).then(res => {
			if (res.meta.requestStatus === "fulfilled") {
				setFlagRegistration(false)
				setFlagSendEmail(true)
			}
		})
		console.log(data, 'Форма регистрации');
	}

	const onSubmitForgetPassword = data => {
		setFlagForgetPassword(false)
		setFlagResetPassMessage(true)
		console.log(data, 'Форма забыл пороль');
	}

	useEffect(()=>{
		setFlagSendEmail(false)
		setFlagForgetPassword(false)
		setFlagRegistration(false)
		setFlagResetPassMessage(false)
		reset()
		setFlagLogin(true)
	},[modal])

	return (
		<ModalWindow modal={modal} setModal={e => setModal(e)}>
			<div className={css.login}>
				{flagLogin && <h1>Вход на FoxBooks</h1>}
				{(flagRegistration || flagSendEmail) &&
                <h1 className={classnames({[css.loginMin]: flagSendEmail})}>Регистрация</h1>}
				{flagResetPassMessage && <h1 className={css.loginMin}>Восстановить пароль</h1>}
				{flagForgetPassword && <h1 className={css.loginMin}>Забыли пароль?</h1>}

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
							type='button'><a>Не помню пароль</a></button>
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

				{(flagSendEmail || flagResetPassMessage) &&
					<div>
						{flagSendEmail ?
							<p className={css.message}>
											Письмо с подтверждением регистрации выслано на вашу электронную почту.
							</p>
							:
							<p className={css.message}>
											Письмо со ссылкой для восстановления пароля выслано на вашу почту.
							</p>
						}

						<Button
							click={()=>setModal(!modal)}
							typeButton='button'
							text='Закрыть'
						/>
					</div>}

				{flagForgetPassword &&
					<div>
						<p className={css.message}>
									Укажите электронную почту, указаную при регистрации
						</p>
						<form onSubmit={handleSubmit(onSubmitForgetPassword)}>
							<Input
								err={errors.email?.message}
								textLabel='Электронная почта'
								name='email'
								register={register}
							/>
							<Button
								text='Отправить'
							/>
						</form>
					</div>
				}

			</div>
		</ModalWindow>
	);
};

export default GroupForms;