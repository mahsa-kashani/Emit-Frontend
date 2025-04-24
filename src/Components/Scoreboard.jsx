import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../Styles/Scoreboard.css';
import { getScoreboard } from '../backend-integration';

function Scoreboard({ selectedSection }) {
	const [data, setData] = useState({
		userRank: 2,
		scoreboard: [],
	});

	useEffect(() => {
		let timeoutId;

		async function fetchScoreboard() {
			try {
				const response = await getScoreboard();
				setData(response);
			} catch (error) {
				console.error('Failed to fetch scoreboard:', error);
			}
		}

		// Initial fetch
		fetchScoreboard();

		// Set up polling only if selectedSection is 'profile'
		if (selectedSection === 'profile') {
			timeoutId = setInterval(fetchScoreboard, 10000); // Use setInterval for continuous polling
			console.log('Polling started for profile');
		}

		// Cleanup function: clear the interval when effect re-runs or component unmounts
		return () => {
			if (timeoutId) {
				clearInterval(timeoutId); // Clear interval instead of timeout
				console.log('Polling stopped');
			}
		};
	}, [selectedSection]); // Depend on selectedSection so effect re-runs when it changes

	return (
		<div className="scoreboard-container">
			<h2 className="scoreboard-title">Scoreboard</h2>
			<table className="scoreboard-table">
				<thead>
					<tr>
						<th>Score</th>
						{[...Array(10)].map((_, i) => (
							<th key={i}>Problem {10 - i}</th>
						))}
						<th>Username</th>
						<th>Rank</th>
					</tr>
				</thead>
				<tbody>
					{data.scoreboard.length > 0 ? (
						data.scoreboard.map((row, index) => (
							<tr
								key={index}
								className={
									index + 1 ===
									data.userRank
										? 'user-rank-row'
										: ''
								}
								onClick={
									index + 1 ===
									data.userRank
										? () =>
												window.scrollTo(
													{
														top: 0,
														behavior: 'smooth',
													}
												)
										: null
								}
							>
								<td>{row.balance}</td>
								{[...Array(10)].map(
									(_, i) => (
										<td
											key={
												i
											}
										>
											<div
												className={
													row
														.solvedChallenges[
														9 -
															i
													] ===
													100
														? 'success'
														: row
																.solvedChallenges[
																9 -
																	i
														  ] ===
														  0
														? 'fail'
														: ''
												}
											>
												{
													row
														.solvedChallenges[
														9 -
															i
													]
												}
											</div>
										</td>
									)
								)}
								<td>{row.userName}</td>
								<td>{index + 1}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="13">
								Loading scoreboard...
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

Scoreboard.propTypes = {
	selectedSection: PropTypes.string.isRequired,
};

export default Scoreboard;
