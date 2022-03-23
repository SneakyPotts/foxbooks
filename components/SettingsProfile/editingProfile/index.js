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
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = data => {
		// let {email, ...rest} = data
		// const newDate = email !== profile?.email ? data : rest
		dispatch(updateProfile(generateFormData(data)))
	};

	const setDefaultValues = () => {
		setValue('name', profile?.name)
		setValue('surname', profile?.surname)
		setValue('nickname', profile?.nickname)
		setValue('email', profile?.email)
	}

	useEffect(() => {
		setDefaultValues()
	}, [profile])

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.formProfile}
			>
				<AvatarUploader name='avatar' setValue={setValue} />
				<div className={styles.formFlex}>
					{profile?.name ?
						<>
							<Input
								textLabel="Имя"
								name="name"
								register={register}
							/>
							<Input
								textLabel="Фамилия"
								name="surname"
								register={register}
							/>
						</> :
						<Input
							classNames={styles.inputNik}
							textLabel="Ник"
							name="nickname"
							register={register}
						/>
					}
				</div>
				<Input
					err={errors?.email?.message}
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
				<ButtonGroup cancelClick={setDefaultValues} />
				<div onClick={() => setModal(true)} className={styles.delProfile}>
					<span>Вы можете удалить свой профиль</span>
				</div>
			</form>

			{modal &&
				<ModalWindow onClose={() => setModal(false)}>
					<div className={styles.wrapDel}>
						<h3 className={'title'}>Удалить профиль</h3>
						<p>Вы действительно хотите удалить профиль?</p>
						<ButtonGroup
							cancelClick={() => setModal(false)}
							click={() => dispatch(deleteUser()).then(() => setModal(false))}
							text="Удалить"
							ClassName={styles.Button}
						/>
					</div>
				</ModalWindow>
			}
		</>
	);
};

export default EditingProfile;
