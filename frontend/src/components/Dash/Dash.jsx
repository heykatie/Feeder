import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { addXP, updateXP } from '../../redux/xp';
import { NavLink, useNavigate } from 'react-router-dom';
import ProgressBar from '../ui/ProgressBar';
import { FaCrown, FaList, FaBell, FaBookOpen, FaPen } from 'react-icons/fa';
import XPNotification from '../Notifications/XP';
import './Dash.css';

export default function Dash() {
	const user = useSelector((state) => state.session.user);
	const navigate = useNavigate();
	const [XP, setXP] = useState(0);
	const sousChef = useSelector((state) => state.sousChefs.sousChef);
	const { xp, level, xpToNextLevel } = useSelector((state) => state.xp);
	const dispatch = useDispatch();

	const [greeting, setGreeting] = useState('');

	const handleClick = async (xp, url) => {
		setXP(xp);
		dispatch(addXP(xp));
		await dispatch(
			updateXP({
				sousChefId: user.SousChef.id,
				xp: xp,
			})
		);
		setTimeout(() => {
			navigate(url);
		}, 600);
	};

	useEffect(() => {
		const hours = new Date().getHours();
		if (hours < 12)
			setGreeting(`Good morning, ${user?.firstName || user?.username}☀️`);
		else if (hours < 18) setGreeting('Ready to cook something delicious? 🍳');
		else setGreeting("Let's level up your meals! 🚀");
	}, [user]);

	return (
		<div className='dash-container'>
			<XPNotification xp={XP} />
			<div className='dash-header'>
				<h1>{greeting}</h1>
				<NavLink to='/notifications'>
					<FaBell className='notification-icon future-feature ' />
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
							<p>Level {level}</p>
						</div>
					</div>

					<div className='xp-progress-container'>
						<p className='xp-progress-label'>XP Progress</p>
						<ProgressBar
							value={(xp / xpToNextLevel) * 100}
							className='xp-progress-bar'
						/>
					</div>

					<motion.div
						className='souschef-widget'
						animate={{ scale: [1, 1.02, 1] }}
						transition={{ repeat: Infinity, duration: 5 }}>
						<img
							src={'/assets/mascot.png' || sousChef?.imageUrl}
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
						<NavLink
							onClick={(e) => {
								e.preventDefault();
								e.preventDefault();
								handleClick(10, '/recipes');
							}}
							className='quick-action'>
							<FaBookOpen /> Browse Recipes{' '}
							<span className='xp-gain'>+10 XP</span>
						</NavLink>
						<NavLink
							onClick={(e) => {
								e.preventDefault();
								handleClick(50, '/recipes/new');
							}}
							className='quick-action post-action'>
							<FaPen /> Post a Recipe{' '}
							<span className='xp-gain'>+50 XP</span>
						</NavLink>
						<NavLink
							onClick={(e) => {
								e.preventDefault();
								handleClick(20, '/lists');
							}}
							className='quick-action shopping-list-action'>
							<FaList /> View Shopping Lists{' '}
							<span className='xp-gain'>+20 XP</span>
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
