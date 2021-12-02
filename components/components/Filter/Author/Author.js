import React, { Component } from 'react';
import ArrowAll from '../../../public/chevron-down.svg';
import categories from '../../Categories/categories.json';
import css from '../Popular/popular.module.css';


class Author extends Component {
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
            <span className={css.dropBtnText}>Автор</span>{' '}
              <ArrowAll className={`${this.state.showMenu&&css.up}`} />
          </button>
          {this.state.showMenu ? (
                    <ul className={css.dropContent}>
                        {categories.map(({ id, name }) => (
                            <li key={id} className={css.dropLink}>
                                <input type='radio' className={css.radio} />
                  {name}
                </li>))}
               
            </ul>
          ) : null}
        </div>
      </>
    );
  }
}

export default Author;