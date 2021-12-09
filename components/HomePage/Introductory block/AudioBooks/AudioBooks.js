import Link from 'next/link';
import ArrowRight from '../../../../public/chevron-right.svg'
import css from './audioBooks.module.css'

import {Navigation} from 'swiper/core';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css/bundle';
import Book from "../../../book";

const AudioBooks = () => {

    const testData = [{id: '1'}, {id: '1'}, {id: '1'}, {id: '1'}, {id: '1'}, {id: '1'}, {id: '1'}, {id: '1'}]

    return (
        <div className={css.container}>
            <div className={css.wrapHeader}>
                <h2 className={css.title}>Некогда читать - слушайте!</h2>
                <Link href="/audioBooks">
                    <a className={css.newLink}>
                        Смотреть все <ArrowRight className={css.arrowRight}/>
                    </a>
                </Link>
            </div>
            <Swiper
                spaceBetween={24}
                slidesPerView={6}
            >
                {testData.map((r,i) => {
                    return (
                            <SwiperSlide key={i}>
                                <Book/>
                            </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}
export default AudioBooks