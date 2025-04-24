import { useState, useEffect } from 'react';
import Challenge from './Challenge';
import '../Styles/Challenges.css';
import { getChallenges } from '../backend-integration';
function Challenges() {
	const [data, setData] = useState([]);
	useEffect(() => {
		async function fetchChallenges() {
			try {
				const response = await getChallenges();
				setData(response);
			} catch (error) {
				console.error('Failed to fetch challenges:', error);
			}
		}
		fetchChallenges();
	}, []);
	return (
		<>
			<h1 className="challenges-title">Challenges</h1>
			<div className="sol-container">
				{data.length > 0 ? (
					data.map((item, index) => (
						<Challenge
							key={index}
							sol={item.fileId}
							address={item.contractAddress}
							url={item.fileUrl}
						/>
					))
				) : (
					<p>Loading challenges...</p>
				)}
			</div>
		</>
	);
}
export default Challenges;
