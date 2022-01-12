import React from 'react';
import styles from "./index.module.scss";
import Input from "../../shared/common/Input/Input";
import {useForm} from "react-hook-form";
import ButtonGroup from "../buttonGroup";

const SettingPassword = () => {

	const {register, handleSubmit, unregister,  formState: {errors}, reset} = useForm();


	const HandleSubmit = data => {
		reset()
		console.log(data)
	}

	return (
		<form
			className={styles.settingPassword}
			onSubmit={handleSubmit(HandleSubmit)}>
			<Input
				classNames={styles.inputCurrent}
				err={errors.current?.message}
				textLabel='Текущий пароль'
				name='current'
				register={register}
			/>
			<Input
				classNames={styles.inputNew}
				err={errors.new?.message}
				textLabel='Новый пароль'
				name='new'
				register={register}
			/>
			<Input
				classNames={styles.inputLast}
				err={errors.repeat?.message}
				textLabel='Повторите новый пароль'
				name='repeat'
				register={register}
			/>
			<ButtonGroup/>
		</form>
	);
};

export default SettingPassword;