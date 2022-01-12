import React from 'react';
import styles from './index.module.scss'
import classnames from "classnames";

const Input = ({register, name, textLabel, err, classNames, typeInput = 'text'}) => {
	return (
		<div className={classnames(styles.wrapper, classNames, {[styles.wrapperErr]: err})}>
			{textLabel && <label>{textLabel}</label>}
			<input {...register(name)} type={typeInput}/>
			<p className={styles.wrapperError}>{err && err}</p>
		</div>
	);
};

export default Input;