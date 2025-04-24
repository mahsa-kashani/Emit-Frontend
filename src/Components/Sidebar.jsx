import '../Styles/Sidebar.css';
import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function Sidebar({
	setSelectedSection,
	handleLogout,
	showMenuButton,
	setShowMenu,
	showMenu,
}) {
	const confirmLogout = () => {
		const isConfirmed = window.confirm('Are you sure you want to log out?');
		if (isConfirmed) {
			handleLogout();
		}
	};
	const sidebarRef = useRef(null);
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				showMenu &&
				showMenuButton &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target)
			) {
				setShowMenu(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showMenu, showMenuButton]);

	return (
		<div
			className={`sidebar ${
				showMenu ? 'sidebar-open' : 'sidebar-closed'
			}`}
			ref={sidebarRef}
		>
			<h2 className="sidebar-title">Menu</h2>
			<nav className="sidebar-nav">
				<button
					onClick={() => setSelectedSection('profile')}
					className="sidebar-btn"
				>
					Profile / Scoreboard
				</button>
				<button
					onClick={() => setSelectedSection('challenges')}
					className="sidebar-btn"
				>
					Challenges
				</button>
				<button className="sidebar-btn" onClick={confirmLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
}
Sidebar.propTypes = {
	setSelectedSection: PropTypes.func.isRequired,
	selectedSection: PropTypes.string,
	handleLogout: PropTypes.func.isRequired,
	showMenuButton: PropTypes.bool.isRequired,
	setShowMenu: PropTypes.func.isRequired,
	showMenu: PropTypes.bool.isRequired,
};

export default Sidebar;
