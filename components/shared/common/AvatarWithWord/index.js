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

const randomColor = colors[Math.floor(Math.random()*colors.length)]

const AvatarWithWord = ({word, width}) => {
	return (
		<span className={styles.wrapper} style={{background: randomColor, width, height: width}}>
			{word}
		</span>
	);
};

export default AvatarWithWord;
