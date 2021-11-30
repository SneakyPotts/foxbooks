import React, { Component } from 'react';
import Link from 'next/link';
import ArrowAll from '../../../public/arrow-all.svg';
import css from './popular.module.css';

class Popular extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: !this.state.showMenu });
    console.log('showMenu', this.state);
  }

  render() {
    return (
      <>
        <div className={css.dropdown}>
          <button className={css.dropBtn} onClick={this.showMenu}>
            Популярные{' '}
            {!this.state.showMenu ? (
              <ArrowAll className={css.arrowAll} />
            ) : (
              <ArrowAll className={css.arrowAllReverse} />
            )}
          </button>
          {this.state.showMenu ? (
            <div className={css.dropContent}>
              <Link href="#">
                <a className={css.dropLink}>Популярные</a>
              </Link>
              <Link href="#">
                <a className={css.dropLink}>Высокий рейтинг</a>
              </Link>
              <Link href="#">
                <a className={css.dropLink}>Много отзывов</a>
              </Link>
              <Link href="#">
                <a className={css.dropLink}>Сейчас читают</a>
              </Link>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}
export default Popular;
