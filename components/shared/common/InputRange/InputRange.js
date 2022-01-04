import React from 'react';
import styles from "./index.module.scss";

const InputRange = ({value, setValue, max = '28', min = '16'}) => {

    console.log((max / 100 ) * value)
    return (
        <div className={styles.middle}>
            <div className={styles.sliderContainer}>
                <span className={styles.bar}>
                    <span style={{width: `${max * (value / 100)}%`}} className={styles.fill}/>
                </span>
                <input
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