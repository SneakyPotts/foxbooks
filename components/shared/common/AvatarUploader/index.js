import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {isFileImage} from "../../../../utils";
import Image from "next/image";
import Pencil from "../../icons/pencil";
import AvatarWithWord from "../AvatarWithWord";
import styles from './styles.module.scss'

const AvatarUploader = ({ name, setValue }) => {
	const { profile } = useSelector(state => state.profile)
	const [imgSrc, setImgSrc] = useState('')
	const [error, setError] = useState('')

	const handleChange = ev => {
		const file = ev.target.files[0];

		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = function () {
			if (isFileImage(file.name)) {
				setError('')
				setImgSrc(reader.result)
				setValue(name, file)
			} else {
				setError('Неверный формат файла')
			}
		};
	};

	return (
		<>
			<label className={styles.wrapper}>
				<input type="file" className="visually-hidden" onChange={handleChange} />
				{imgSrc || profile?.avatar ?
					<Image
						src={imgSrc || profile?.avatar}
						alt="Avatar"
						width="102"
						height="102"
						placeholder="blur"
						blurDataURL="/images/blur.jpg"
						layout="responsive"
					/> :
					<AvatarWithWord
						word={profile?.nickname?.slice(0, 1) || profile?.name?.slice(0, 1) || 'П'}
						width={102}
					/>
				}
				<span className={styles.icon}>
					<Pencil w="20" h="20" c="#FFFFFF" />
				</span>
			</label>
			<span className={styles.error}>{error}</span>
		</>
	);
};

export default AvatarUploader;
