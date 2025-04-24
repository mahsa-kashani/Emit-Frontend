import '../Styles/Profile.css';
import profilePic from '../assets/profile.jpg';
import { useEffect, useState } from 'react';
import { getProfileData } from '../backend-integration';
function Profile() {
	const [copiedText, setCopiedText] = useState('');
	const [error, setError] = useState(null);
	const [profile, setProfile] = useState({
		userId: 'user id',
		rpcUrl: 'RPC url',
		userName: 'Username',
		privateKey: 'private key',
	});
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const data = await getProfileData();
				setProfile(data);
			} catch (err) {
				console.error('Error fetching profile:', err);
				setError('Failed to fetch profile data.');
			}
		};

		fetchProfile();
	}, []);
	// Function to copy text
	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopiedText(text);
			setTimeout(() => setCopiedText(''), 2000);
		});
	};
	if (error) {
		return <div className="profile-container">Error: {error}</div>;
	}
	if (!profile) {
		return <div className="profile-container">Loading profile...</div>;
	}
	return (
		<div className="profile-container">
			<>
				<img
					src={profilePic}
					alt="profile pic"
					className="profile-pic"
				/>
				<div className="profile-info">
					<h1>{profile.userName}</h1>
					<p>
						<strong>private key: </strong>
						<span
							className="toCopy"
							onClick={() =>
								copyToClipboard(
									profile.privateKey
								)
							}
						>
							{profile.privateKey}
						</span>
						{copiedText === profile.privateKey && (
							<span className="copied">
								{' '}
								Copied!
							</span>
						)}
					</p>
					<p>
						<strong>RPC: </strong>
						<span
							className="toCopy"
							onClick={() =>
								copyToClipboard(
									profile.rpcUrl
								)
							}
						>
							{profile.rpcUrl}
						</span>
						{copiedText === profile.rpcUrl && (
							<span className="copied">
								{' '}
								Copied!
							</span>
						)}
					</p>
				</div>
			</>
		</div>
	);
}
export default Profile;
