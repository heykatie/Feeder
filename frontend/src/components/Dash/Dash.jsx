import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import ProgressBar from '../ui/ProgressBar';
import { FaCrown, FaList, FaBell, FaBookOpen, FaPen } from 'react-icons/fa';
import './Dash.css';

export default function Dash() {
	const user = useSelector((state) => state.session.user);
	const sousChef = useSelector((state) => state.sousChefs.sousChef);

	const [greeting, setGreeting] = useState('');

	useEffect(() => {
		const hours = new Date().getHours();
		if (hours < 12) setGreeting(`Good morning, ${user?.firstName || user?.username}☀️`);
		else if (hours < 18) setGreeting('Ready to cook something delicious? 🍳');
		else setGreeting("Let's level up your meals! 🚀");
	}, [user]);

	return (
		<div className='dash-container'>
			<div className='dash-header'>
				<h1>{greeting}</h1>
				<NavLink to='/notifications'>
					<FaBell className='notification-icon' />
				</NavLink>
			</div>

			<div className='dash-grid'>
				<div className='profile-card'>
					<div className='profile-details'>
						<motion.img
							src={user?.avatarUrl || '/images/icons/avatar.png'}
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

					<div className='xp-progress-container'>
						<p className='xp-progress-label'>XP Progress</p>
						<ProgressBar
							value={(sousChef?.xp / 100) * 100}
							className='xp-progress-bar'
						/>
					</div>

					<motion.div
						className='souschef-widget'
						animate={{ scale: [1, 1.02, 1] }}
						transition={{ repeat: Infinity, duration: 5 }}>
						<img
							src={'/images/assets/mascot.png' || sousChef?.imageUrl}
							alt='SousChef'
						/>
						<p className='souschef-evo-text'>
							Current Evolution: {sousChef?.evoStage}
						</p>
					</motion.div>
				</div>

				<div className='challenge-card'>
					<h2 className='challenge-title'>🎯 Daily Challenge</h2>
					<p className='challenge-text'>
						Cook a high-protein meal today! 🍗
					</p>

					<div className='quick-actions'>
						<NavLink to='/recipes' className='quick-action'>
							<FaBookOpen /> Browse Recipes
						</NavLink>
						<NavLink
							to='/recipes/new'
							className='quick-action post-action'>
							<FaPen />
							Post a Recipe
						</NavLink>
						<NavLink
							to='/lists'
							className='quick-action shopping-list-action'>
							<FaList /> View Shopping Lists
						</NavLink>
					</div>
				</div>

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

					<h2 className='notifications-title'>🔔 Recent Activity</h2>
					<p className='notification-text'>
						🎉 You earned a new achievement: &quot;Iron Chef&quot;! 🔥
					</p>
				</div>
			</div>
		</div>
	);
}
