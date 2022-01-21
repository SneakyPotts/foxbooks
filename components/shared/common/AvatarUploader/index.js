import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {isFileImage} from "../../../../utils";
import Image from "next/image";
import Pencil from "../../icons/pencil";
import AvatarWithLetter from "../AvatarWithLetter";
import Compressor from 'compressorjs';
import styles from './styles.module.scss'

const AvatarUploader = ({ name, setValue }) => {
	const { profile } = useSelector(state => state.profile)
	const [imgSrc, setImgSrc] = useState('')
	const [error, setError] = useState('')

	const handleChange = ev => {
		const file = ev.target.files[0];

		if (isFileImage(file.name)) {
			setError('')
			new Compressor(file, {
				quality: 1,
				resize: 'cover',
				width: 102,
				height: 102,
				convertSize: 1,
				success(result) {
					let reader = new FileReader()
					reader.readAsDataURL(result)
					reader.onloadend = function () {
						setImgSrc(reader.result)
						setValue(name, result)
					}
				}
			})
		} else {
			setError('Неверный формат файла')
		}
	};

	return (
		<div className={styles.wrapper}>
			<label className={styles.label}>
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
					<AvatarWithLetter
						letter={profile?.nickname?.slice(0, 1) || profile?.name?.slice(0, 1) || 'П'}
						width={102}
						id={profile?.id}
					/>
				}
				<span className={styles.icon}>
					<Pencil w="20" h="20" c="#FFFFFF" />
				</span>
			</label>
			<span className={styles.error}>{error}</span>
		</div>
	);
};

export default AvatarUploader;
