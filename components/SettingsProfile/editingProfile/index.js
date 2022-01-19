import React, {useEffect, useRef, useState} from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import Pencil from '../../shared/icons/pencil';
import Input from '../../shared/common/Input/Input';
import SocialNetwork from '../../shared/common/SocialNetwork/SocialNetwork';
import { useForm } from 'react-hook-form';
import ButtonGroup from '../buttonGroup';
import ModalWindow from '../../shared/common/modalWindow/ModalWindow';
import {useDispatch, useSelector} from "react-redux";
import {deleteUser} from "../../../store/profileSlice";

const EditingProfile = () => {
	const dispatch = useDispatch()
	const inputFile = useRef();
	const [file64, setFile64] = useState(null);
	const [modal, setModal] = useState(false);

	const { profile } = useSelector(state => state.profile)

	const {
		register,
		handleSubmit,
		unregister,
		setValue,
		formState: { errors },
		reset,
	} = useForm();

	const HandleClick = () => {
		inputFile.current.click();
	};

	const onChange = e => {
		let reader = new FileReader();
		const files = e.target.files;
		reader.readAsDataURL(files[0]);
		reader.onload = () => {
			setFile64(reader.result);
		};
	};

	const onSubmit = data => {
		console.log(data);
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
				<div onClick={HandleClick} className={styles.formProfileWrap}>
					<div className={styles.image}>
						<Image
							src={file64 === null ? '/horizontalBookCovers/book.png' : file64}
							alt=""
							width="102"
							height="102"
							placeholder="blur"
							blurDataURL="/images/blur.jpg"
							layout="responsive"
						/>
					</div>
					<div className={styles.file}>
						<Pencil w="20" h="20" c="#FFFFFF" />
						<input onChange={onChange} ref={inputFile} type="file" hidden />
					</div>
				</div>
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
