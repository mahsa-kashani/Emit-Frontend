import Profile from './Profile';
import Scoreboard from './Scoreboard';
import PropTypes from 'prop-types';
function ProfileScoreboard({ showMenu, showMenuButton, setShowMenu, selectedSection }) {
	return (
		<>
			<Profile
				showMenu={showMenu}
				showMenuButton={showMenuButton}
				setShowMenu={setShowMenu}
			/>
			<Scoreboard selectedSection={selectedSection} />
		</>
	);
}
ProfileScoreboard.propTypes = {
	showMenu: PropTypes.bool.isRequired,
	showMenuButton: PropTypes.bool.isRequired,
	setShowMenu: PropTypes.func.isRequired,
	selectedSection: PropTypes.string.isRequired,
};

export default ProfileScoreboard;
