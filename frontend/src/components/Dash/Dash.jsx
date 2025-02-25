import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProgressBar from '../ui/ProgressBar';
import { FaCrown, FaList, FaBell, FaShoppingCart } from 'react-icons/fa';
import './Dash.css';

export default function Dash() {
	const user = useSelector((state) => state.users.user);
	const sousChef = useSelector((state) => state.sousChefs.sousChef);

	const [greeting, setGreeting] = useState('');

	useEffect(() => {
		const hours = new Date().getHours();
		if (hours < 12) setGreeting('Good morning, Chef! ☀️');
		else if (hours < 18) setGreeting('Ready to cook something delicious? 🍳');
		else setGreeting("Let's level up your meals! 🚀");
	}, []);

	return (
		<div className='dash-container'>
			{/* Header */}
			<div className='dash-header'>
				<h1>{greeting}</h1>
				<Link to='/notifications'>
					<FaBell className='notification-icon' />
				</Link>
			</div>

			{/* Main Dashboard Grid */}
			<div className='dash-grid'>
				{/* Left Column: User Profile & SousChef */}
				<div className='profile-card'>
					<div className='profile-details'>
						<motion.img
							src={user?.avatarUrl || '/images/avatar.png'}
							alt='User Avatar'
							className='profile-avatar'
							animate={{ scale: [1, 1.05, 1] }}
							transition={{ repeat: Infinity, duration: 3 }}
						/>
						<div className='profile-info'>
							<h2>{user?.username || 'Chef'}</h2>
							<p>Level {sousChef?.level || 1}</p>
						</div>
					</div>

					{/* XP ProgressBar */}
					<div className='xp-progress-container'>
						<p className='xp-progress-label'>XP Progress</p>
						<ProgressBar
							value={(sousChef?.xp / 100) * 100}
							className='xp-progress-bar'
						/>
					</div>

					{/* SousChef Widget */}
					<motion.div
						className='souschef-widget'
						animate={{ scale: [1, 1.02, 1] }}
						transition={{ repeat: Infinity, duration: 5 }}>
						<img
							src={sousChef?.imageUrl || '/images/mascot.png'}
							alt='SousChef'
						/>
						<p className='souschef-evo-text'>
							Current Evolution: {sousChef?.evoStage}
						</p>
					</motion.div>
				</div>

				{/* Middle Column: Daily Challenge & Quick Actions */}
				<div className='challenge-card'>
					<h2 className='challenge-title'>🎯 Daily Challenge</h2>
					<p className='challenge-text'>
						Cook a high-protein meal today! 🍗
					</p>

					<div className='quick-actions'>
						<Link to='/recipes' className='quick-action'>
							<FaList /> Browse Recipes
						</Link>
						<Link
							to='/lists'
							className='quick-action shopping-list-action'>
							<FaShoppingCart /> View Shopping Lists
						</Link>
					</div>
				</div>

				{/* Right Column: Leaderboard & Notifications */}
				<div className='leaderboard-card'>
					<h2 className='leaderboard-title'>🏆 Leaderboard</h2>
					<div className='leaderboard-list'>
						<div className='leaderboard-entry'>
							<FaCrown className='rank-icon rank-gold' />
							<p>1. @TopChef - 5000 XP</p>
						</div>
						<div className='leaderboard-entry'>
							<FaCrown className='rank-icon rank-silver' />
							<p>2. @SousMaster - 4300 XP</p>
						</div>
						<div className='leaderboard-entry'>
							<FaCrown className='rank-icon rank-bronze' />
							<p>3. @FlavorKing - 4100 XP</p>
						</div>
					</div>

					{/* Notifications */}
					<h2 className='notifications-title'>🔔 Recent Activity</h2>
					<p className='notification-text'>
						🎉 You earned a new achievement: "Iron Chef"! 🔥
					</p>
				</div>
			</div>
		</div>
	);
}
