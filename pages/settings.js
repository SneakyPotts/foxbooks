import React from 'react';
import SettingsProfile from "../components/SettingsProfile";

const Settings = () => {
	return (
		<>
			<SettingsProfile/>
		</>
	);
};

export default Settings;

export async function getServerSideProps ({ req, res }) {
	const { cookies } = req
	const token = cookies.token

	if(!token) {
		res.writeHead(302, { Location: '/' });
		res.end();
	}

	return {
		props: {}
	}
}