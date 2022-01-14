import React from 'react';
import styles from "./index.module.scss";
import Input from "../../shared/common/Input/Input";
import {useForm} from "react-hook-form";
import ButtonGroup from "../buttonGroup";
import {useDispatch} from "react-redux";
import {resetPassword} from "../../../store/profileSlice";

const SettingPassword = () => {
	const dispatch = useDispatch()
	const {register, handleSubmit, unregister,  formState: {errors}, reset} = useForm();

	const onSubmit = data => {
		dispatch(resetPassword(data))
		reset()
	}

	return (
		<form
			className={styles.settingPassword}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input
				classNames={styles.inputCurrent}
				err={errors.current?.message}
				textLabel='Текущий пароль'
				name='old_password'
				typeInput="password"
				register={register}
			/>
			<Input
				classNames={styles.inputNew}
				err={errors.new?.message}
				textLabel='Новый пароль'
				name='password'
				typeInput="password"
				register={register}
			/>
			<Input
				classNames={styles.inputLast}
				err={errors.repeat?.message}
				textLabel='Повторите новый пароль'
				name='password_confirm'
				typeInput="password"
				register={register}
			/>
			<ButtonGroup/>
		</form>
	);
};

export default SettingPassword;