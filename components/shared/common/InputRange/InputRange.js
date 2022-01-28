import React from 'react';
import styles from "./index.module.scss";
import classNames from "classnames";

const InputRange = ({
	value,
	setValue,
	min = '0',
	max = '100',
	step = '1',
	barColor,
	fillColor = '#FF781D',
	textLabel,
	labelOne,
	labelSecond,
	brightness,
	dot = false,
	externalClass
}) => {

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
				{[styles.middleFirst] : Number(brightness) === 0}
			)}
		>
			{textLabel &&
				<span className={styles.labelInput}>
					{textLabel}
				</span>
			}
			<div className={styles.sliderContainer}>
				<span className={styles.bar} style={{background: barColor}}>
					<span
						className={styles.fill}
						style={{width: `${(value / max) * 100}%`, background: fillColor}}
					/>
				</span>
				{dot && dataDot.map(({x, y}, i) => (
					<span
						key={x}
						style={{transform: `translate(${x}px, ${y}px)`}}
						className={classNames(styles.dot, {[styles.dotActive]: value >= i})}
					/>
				))}
				<input
					step={step}
					onChange={(e) => setValue(e.target.value)}
					value={value}
					className={classNames(styles.slider, externalClass)}
					type="range"
					min={min}
					max={max}
				/>
				{dot &&
				<div className={styles.underTextInput}>
					<span>{labelOne}</span>
					<span>{labelSecond}</span>
				</div> }
			</div>
		</div>
	);
};

export default InputRange;