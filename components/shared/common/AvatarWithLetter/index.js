import React from 'react';
import styles from './styles.module.scss';

const colors = [
	'#512DA7', '#5C6BC0', '#7E57C2', '#AA47BC',
	'#C2175B', '#EC407A', '#00579C', '#0288D0',
	'#58B3E3', '#465A65', '#78909C', '#004C3F',
	'#33691E', '#689F39', '#00887A', '#BF360C',
	'#D55600', '#FF781D', '#5D4038', '#8C6E62',
	'#945D47'
]

const AvatarWithLetter = ({letter, width, id = 0}) => {
	const count = (() => {
		let num = id
		while (num > +colors?.length) {
			num -= +colors?.length
		}
		return num
	})()

	return (
		<span className={styles.wrapper} style={{background: colors[count], width, height: width}}>
			{letter}
		</span>
	);
};

export default AvatarWithLetter;
