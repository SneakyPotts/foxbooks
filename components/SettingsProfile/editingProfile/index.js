import React, {useEffect, useState} from 'react';
import styles from './index.module.scss';
import Input from '../../shared/common/Input/Input';
import SocialNetwork from '../../shared/common/SocialNetwork/SocialNetwork';
import { useForm } from 'react-hook-form';
import ButtonGroup from '../buttonGroup';
import ModalWindow from '../../shared/common/modalWindow/ModalWindow';
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, updateProfile} from "../../../store/profileSlice";
import AvatarUploader from "../../shared/common/AvatarUploader";
import {generateFormData} from "../../../utils";
import {yupResolver} from "@hookform/resolvers/yup";
import schema from "./schema";

const EditingProfile = () => {
	const dispatch = useDispatch()
	const [modal, setModal] = useState(false);

	const { profile } = useSelector(state => state.profile)

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = data => {
		let {email, ...rest} = data
		const newDate = email !== profile?.email ? data : rest

		dispatch(updateProfile(generateFormData(newDate)))
	};

	useEffect(() => {
		setValue('name', profile?.name)
		setValue('email', profile?.email)
	}, [profile])

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.formProfile}
			>
				<AvatarUploader name='avatar' setValue={setValue} />
				<Input
					classNames={styles.inputNik}
					err={errors.name?.message}
					textLabel="Ник"
					name="name"
					register={register}
				/>
				<Input
					err={errors.email?.message}
					textLabel="Электронная почта"
					name="email"
					register={register}
				/>
				<div className={styles.social}>
					<span>Социальные сети</span>
					<p>Подключите социальные сети, чтобы входить через них в FoxBooks</p>
					<SocialNetwork
						ClassNames={styles.socialProfile}
						connect={true}
						title={false}
					/>
				</div>
				<ButtonGroup />
				<div onClick={() => setModal(true)} className={styles.delProfile}>
					<span>Вы можете удалить свой профиль</span>
				</div>
			</form>
			<ModalWindow modal={modal} setModal={setModal}>
				<div className={styles.wrapDel}>
					<h2>Удалить профиль</h2>
					<p>Вы действительно хотите удалить профиль?</p>
					<ButtonGroup
						cancelClick={() => setModal(false)}
						click={() => dispatch(deleteUser()).then(() => setModal(false))}
						text="Удалить"
						ClassName={styles.Button}
					/>
				</div>
			</ModalWindow>
		</>
	);
};

export default EditingProfile;
