import React, { Component } from 'react';
// import Link from 'next/link';
import ArrowAll from '../../../public/chevron-down.svg';
import css from './popular.module.css';

class Popular extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    console.log(this.state.showMenu);
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: !this.state.showMenu });
    console.log('showMenu',this.state.showMenu)

  }

  render() {
    return (
      <>
        <div className={css.dropdown}>
          <button className={`${css.dropBtn} ${this.state.showMenu?css.open:css.close}`} onClick={this.showMenu}>
            <span className={css.dropBtnText}>Популярные</span>{' '}
              <ArrowAll className={`${this.state.showMenu&&css.up}`} />
          </button>
          {this.state.showMenu ? (
            <ul className={css.dropContent}>
                <li className={css.dropLink}><input type='radio' className={css.radio}/>
                  Популярные
                </li>
                <li className={css.dropLink}><input type='radio' className={css.radio} />Высокий рейтинг</li>
            
                <li className={css.dropLink}><input type='radio' className={css.radio}/>
                  Много отзывов</li>
                <li className={css.dropLink}><input type='radio' className={css.radio}/>
                  <span className={css.text}>Сейчас читают</span></li>
            </ul>
          ) : null}
        </div>
      </>
    );
  }
}
export default Popular;
