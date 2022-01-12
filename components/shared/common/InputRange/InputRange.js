import React from 'react';
import styles from "./index.module.scss";
import classNames from "classnames";

const InputRange = ({value, setValue, max = '100', min = '0', textLabel, step = '1',
	brightness, dot = false}) => {

	const dataDot = [
		{x: 2, y: -1},
		{x: 55, y: -1},
		{x: 109, y: -1},
		{x: 163, y: -1},
		{x: 217, y: -1}
	]

	return (
		<div
			className={classNames(styles.middle,
				{[styles.middleDefault] : Number(brightness) === 5},
				{[styles.middleFifth] : Number(brightness) === 4},
				{[styles.middleFourth] : Number(brightness) === 3},
				{[styles.middleThird] : Number(brightness) === 2},
				{[styles.middleSecond] : Number(brightness) === 1},
				{[styles.middleFirst] : Number(brightness) === 0},
			) }>
			{textLabel &&
            <span className={styles.labelInput}>
            	{textLabel}
            </span>
			}
			<div className={styles.sliderContainer}>
				<span className={styles.bar}>
					<span style={{width: `${(value / max) * 100}%`}} className={styles.fill}/>
				</span>
				{dot && dataDot.map(({x, y}, i) => (
					<span
						style={{transform: `translate(${x}px, ${y}px)`}}
						className={classNames(styles.dot, {[styles.dotActive]: value >= i})}/>))}
				<input
					step={step}
					onChange={(e) => setValue(e.target.value)}
					value={value}
					className={styles.slider}
					type="range"
					min={min}
					max={max}/>
			</div>
		</div>
	);
};

export default InputRange;