import React from 'react';

import { API_URL } from '../../../../http';
import OK from '../../icons/OK';
import VK from '../../icons/VK';
import Google from '../../icons/google';
import Yandex from '../../icons/yandex';
import classnames from 'classnames';

import styles from './index.module.scss';

const SocialNetwork = ({ title = true, connect = false, ClassNames }) => {
  return (
    <div className={classnames(styles.Social, ClassNames)}>
      {title && <h4>Войти через аккаунт социальной сети</h4>}
      <div className={styles.SocialButtons}>
        {/*<div>
					<a href={`${API_URL}/auth/yandex`} target="_blank" rel="noreferrer"><Yandex/></a>
					{connect && <p>Подключить</p>}
				</div>*/}
        <div>
          <a
            href={`${API_URL}/auth/google`}
            target="_blank"
            rel="noreferrer"
          >
            <Google />
          </a>
          {connect && <p>Подключить</p>}
        </div>
        {/*<div>
					<a href={`${API_URL}/auth/vkontakte`} target="_blank" rel="noreferrer"><VK/></a>
					{connect && <p>Подключить</p>}
				</div>*/}
        {/*<div>
					<a href={`${API_URL}/auth/odnoklassniki`} target="_blank" rel="noreferrer"><OK/></a>
					{connect && <p>Подключить</p>}
				</div>*/}
      </div>
    </div>
  );
};

export default SocialNetwork;
