import '../Styles/Challenge.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
function Challenge({ sol, address, url }) {
	const [copiedText, setCopiedText] = useState('');
	// Function to copy text
	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopiedText(text);
			setTimeout(() => setCopiedText(''), 2000);
		});
	};
	const downloadFile = (fileUrl, filename) => {
		const link = document.createElement('a');
		link.href = fileUrl;
		link.setAttribute('download', filename);
		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
	};
	return (
		<>
			<div className="sol-box">
				<h3
					className="sol"
					onClick={() => downloadFile(url, sol)}
				>
					{sol}
				</h3>
				<p>
					<strong>Contract Address:</strong>{' '}
					<span
						className="toCopy"
						onClick={() => copyToClipboard(address)}
					>
						{address}
					</span>
					{copiedText === address && (
						<span className="copied"> Copied!</span>
					)}
				</p>
			</div>
		</>
	);
}
Challenge.propTypes = {
	sol: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};
export default Challenge;
