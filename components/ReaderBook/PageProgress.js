import React, {useEffect, useState} from 'react';
import styles from "./styles.module.scss";
import InputRange from "../shared/common/InputRange/InputRange";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

const PageProgress = () => {
    const router = useRouter()

    const { book, bookChapters } = useSelector(state => state.reader)
    const [currentPage, setCurrentPage] = useState(router.query?.page)

    const index = bookChapters.findIndex(i => i?.page?.page_number > Number(currentPage))

    useEffect(() => {
        setCurrentPage(router.query?.page)
    }, [router.query?.page])

    return (
        <div
            className={styles.progress}
            onMouseUp={() => router.push({ query: { ...router.query, page: currentPage } })}
            onTouchEnd={() => router.push({query: {...router.query, page: currentPage}})}
        >
            <div className={styles.progressWrapper}>
                <span>{index === -1 ? bookChapters[bookChapters.length - 1]?.title : bookChapters[index - 1]?.title}</span>
                <span>{Math.round(100 * currentPage / book?.pages_count)}%</span>
            </div>
            <InputRange
                min={1}
                max={book?.pages_count}
                value={currentPage}
                setValue={value => setCurrentPage(value)}
                barColor={'var(--controls-color)'}
                externalClass={styles.progressInput}
            />
        </div>
    );
};

export default PageProgress;