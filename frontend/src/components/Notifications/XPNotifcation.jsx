import React, { useState, useEffect } from 'react';
import './XPNotification.css';

const XPNotification = ({ xp }) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (xp > 0) {
			setVisible(true);
			setTimeout(() => setVisible(false), 2000); // Hide after 2 seconds
		}
	}, [xp]);

	return (
		<div className={`xp-notification ${visible ? 'show' : ''}`}>
			+{xp} XP!
		</div>
	);
};

export default XPNotification;
