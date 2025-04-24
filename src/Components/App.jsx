import '../Styles/App.css';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Challenges from './Challenges';
import ProfileScoreboard from './ProfileScoreboard';
import Login from './Login';
import { loginEmit, logout } from '../backend-integration';

function App() {
	const [selectedSection, setSelectedSection] = useState('profile');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showMenu, setShowMenu] = useState(true);
	const [showMenuButton, setShowMenuButton] = useState(false);
	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const storedLoginStatus = localStorage.getItem('isLoggedIn');
		if (storedLoginStatus === 'true') {
			setIsLoggedIn(true);
		}
	}, []);

	const handleLogin = async (username, password) => {
		setIsLoading(true);
		try {
			const success = await loginEmit(username, password);
			if (success) {
				setTimeout(() => {
					setIsLoggedIn(true);
				}, 1000);
				localStorage.setItem('isLoggedIn', 'true');
				console.log('logged in');
				setMessage('Login Successful!');
				setMessageType('successful');
				setSelectedSection('profile');
			} else {
				setMessage('Username or password is incorrect!');
				setMessageType('error');
				console.log('not logged in');
			}
		} catch (error) {
			console.error(error);
			setMessage(
				'An unexpected error occurred. Please try again later.'
			);
			setMessageType('error');
		} finally {
			setIsLoading(false);
			setTimeout(() => {
				setMessage('');
			}, 3000);
		}
	};

	const handleLogout = async () => {
		try {
			// const success = true;
			const success = await logout();
			if (success) {
				setIsLoggedIn(false);
				setSelectedSection('');
				localStorage.removeItem('isLoggedIn');
			}
		} catch (error) {
			console.error(error);
			setMessage(
				'An unexpected error occurred. Please try again later.'
			);
			setMessageType('error');
		} finally {
			setTimeout(() => {
				setMessage('');
			}, 3000);
		}
	};
	const handleMenu = () => {
		setShowMenu((prev) => !prev);
	};
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 1470) {
				setShowMenuButton(true);
				setShowMenu(false);
			} else {
				setShowMenu(true);
				setShowMenuButton(false);
			}
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return (
		<div className={`app-container ${showMenu && 'app-menu-open'}`}>
			{message && (
				<div className={`message ${messageType}`}>{message}</div>
			)}
			{isLoggedIn ? (
				<>
					<div className="content">
						{selectedSection === 'profile' && (
							<ProfileScoreboard
								selectedSection={
									selectedSection
								}
							/>
						)}
						{selectedSection === 'challenges' && (
							<Challenges />
						)}
					</div>
					<div className="menu-container">
						{showMenuButton && (
							<button
								className={`menu-button ${
									showMenu &&
									'button-open'
								}`}
								onClick={handleMenu}
							>
								<svg
									width="20px"
									height="20px"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									focusable="false"
								>
									<g id="Sidebar Expand">
										<path
											id="Vector"
											d="M15.8333 17.5H4.16667C3.24619 17.5 2.5 16.7538 2.5 15.8333V4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5H15.8333C16.7538 2.5 17.5 3.24619 17.5 4.16667V15.8333C17.5 16.7538 16.7538 17.5 15.8333 17.5Z"
											stroke="white"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										></path>
										<path
											id="Vector_2"
											d="M12.083 8.33334L13.5413 10L12.083 11.6667"
											stroke="white"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										></path>
										<rect
											id="Rectangle 1"
											x="4.16699"
											y="4.16666"
											width="5"
											height="11.6667"
											rx="1"
											fill="white"
										></rect>
									</g>
								</svg>
							</button>
						)}
						<div className="sidebar-div">
							<Sidebar
								setSelectedSection={
									setSelectedSection
								}
								showMenuButton={
									showMenuButton
								}
								handleLogout={
									handleLogout
								}
								showMenu={showMenu}
								setShowMenu={setShowMenu}
							/>
						</div>
					</div>
				</>
			) : (
				<div className="login-page">
					<Login
						handleLogin={handleLogin}
						isLoading={isLoading}
					/>
				</div>
			)}
		</div>
	);
}

export default App;
