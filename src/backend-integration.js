import axios from 'axios';

const backendBaseUrl = 'https://backend-contest-emit.liara.run';

const axiosInstance = axios.create({ baseURL: backendBaseUrl });

axiosInstance.interceptors.request.use(
	async (config) => {
		const access_token = localStorage.getItem('accesstoken');
		config.headers.setAuthorization(`Bearer ${access_token}`, false);
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

/**
 *
 * @param {string} userName
 * @param {string} password
 * @returns {Promise<boolean>}
 */
async function loginEmit(userName, password) {
	try {
		const body = {
			username: userName,
			password,
		};
		const loginRequest = await axiosInstance.post('/auth/login', body);
		if (loginRequest.status === 201 || loginRequest.status === 200) {
			localStorage.setItem(
				'accesstoken',
				loginRequest.data.access_token
			);
			return true;
		}
		return false;
	} catch (error) {
		if (error.status && error.status === 401) {
			return false;
		}
		console.error(error);
		throw error;
	}
}

/**
 *
 * @returns {Promise<boolean>}
 */
async function logout() {
	try {
		localStorage.removeItem('accesstoken');
		return true;
	} catch (error) {
		console.error(error);
		console.log(`Something went wrong during logout: ${error}`);
		throw error;
	}
}

/**
 *
 * @returns {Promise<{ userId: string, userName: string, privateKey: string, rpcUrl: string}>}
 */
async function getProfileData() {
	try {
		const response = (await axiosInstance.get('/profile')).data;
		return {
			userId: response._id,
			rpcUrl: response.rpcUrl,
			userName: response.username,
			privateKey: response.privateKey,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
}

/**
 *
 * @returns {Promise<{userRank: number; scoreboard: { userName: string; balance: string; solvedChallenges: number[]; }[];}>}
 */
async function getScoreboard() {
	try {
		const response = (await axiosInstance.get('/scoreboard')).data;
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

/**
 *
 * @returns {Promise<{fileId: string;fileUrl: string;contractAddress: string;}[]>}
 */
async function getChallenges() {
	const challengeNames = (await axiosInstance.get('/files')).data.files;
	const contractAddress = (await axiosInstance.get('/challenges/addresses')).data
		.addresses;
	if (challengeNames.length !== contractAddress.length) {
		throw new Error(
			`Challenge names and contract addresses do not match: ${challengeNames.length} !== ${contractAddress.length}`
		);
	}
	const challenges = [];
	for (let i = 0; i < challengeNames.length; i++) {
		const challenge = {
			fileId: challengeNames[i],
			fileUrl: `${backendBaseUrl}files/${challengeNames[i]}`,
			contractAddress: contractAddress[i],
		};
		challenges.push(challenge);
	}
	return challenges;
}

export { axiosInstance, getProfileData, getScoreboard, loginEmit, logout, getChallenges };
