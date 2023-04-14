import React from 'react';

import SettingsProfile from '../components/SettingsProfile';

const Settings = () => {
  return <SettingsProfile />;
};

export default Settings;

export async function getServerSideProps({ req }) {
  const { cookies } = req;
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/',
        parameter: false,
      },
    };
  }

  return {
    props: {},
  };
}
