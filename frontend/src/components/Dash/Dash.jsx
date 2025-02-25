import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProgressBar from '../ui/ProgressBar';
import { FaCrown, FaList, FaBell, FaShoppingCart } from 'react-icons/fa';

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
		<div className='min-h-screen bg-[#121212] text-white p-6'>
			{/* Header */}
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold'>{greeting}</h1>
				<Link to='/notifications'>
					<FaBell className='text-2xl text-[#FFD166] hover:text-[#FFB84C] transition' />
				</Link>
			</div>

			{/* Main Dashboard Grid */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				{/* Left Column: User Profile & SousChef */}
				<div className='md:col-span-1 bg-[#1A1A2E] p-5 rounded-lg shadow-lg'>
					<div className='flex items-center gap-4'>
						<motion.img
							src={user?.avatarUrl || '/avatar.png'}
							alt='User Avatar'
							className='w-16 h-16 rounded-full border-2 border-[#A379FF]'
							animate={{ scale: [1, 1.05, 1] }}
							transition={{ repeat: Infinity, duration: 3 }}
						/>
						<div>
							<h2 className='text-xl font-semibold'>
								{user?.username || 'Chef'}
							</h2>
							<p className='text-sm text-gray-400'>
								Level {sousChef?.level || 1}
							</p>
						</div>
					</div>

					{/* XP ProgressBar */}
					<div className='mt-4'>
						<p className='text-sm text-gray-400'>XP Progress</p>
						<ProgressBar
							value={(sousChef?.xp / 100) * 100}
							className='h-2 bg-gray-700'
						/>
					</div>

					{/* SousChef Widget */}
					<motion.div
						className='mt-6 p-4 bg-[#232946] rounded-lg flex flex-col items-center'
						animate={{ scale: [1, 1.02, 1] }}
						transition={{ repeat: Infinity, duration: 5 }}>
						<img
							src={sousChef?.imageUrl || '/mascot.png'}
							alt='SousChef'
							className='w-24 h-24'
						/>
						<p className='mt-2 text-sm text-gray-400'>
							Current Evolution: {sousChef?.evoStage}
						</p>
					</motion.div>
				</div>

				{/* Middle Column: Daily Challenge & Quick Actions */}
				<div className='md:col-span-1 bg-[#231E2E] p-5 rounded-lg shadow-lg'>
					<h2 className='text-lg font-semibold mb-4'>
						🎯 Daily Challenge
					</h2>
					<p className='text-gray-300'>
						Cook a high-protein meal today! 🍗
					</p>

					<div className='mt-6 space-y-3'>
						<Link
							to='/recipes'
							className='flex items-center gap-3 bg-[#00C6CF] text-black px-4 py-2 rounded-lg hover:bg-[#64CCC5] transition'>
							<FaList /> Browse Recipes
						</Link>
						<Link
							to='/lists'
							className='flex items-center gap-3 bg-[#FFB84C] text-black px-4 py-2 rounded-lg hover:bg-[#FFD166] transition'>
							<FaShoppingCart /> View Shopping Lists
						</Link>
					</div>
				</div>

				{/* Right Column: Leaderboard & Notifications */}
				<div className='md:col-span-1 bg-[#462B55] p-5 rounded-lg shadow-lg'>
					<h2 className='text-lg font-semibold mb-4'>🏆 Leaderboard</h2>
					<div className='space-y-2'>
						<div className='flex items-center gap-2'>
							<FaCrown className='text-[#FFD166]' />
							<p>1. @TopChef - 5000 XP</p>
						</div>
						<div className='flex items-center gap-2'>
							<FaCrown className='text-gray-400' />
							<p>2. @SousMaster - 4300 XP</p>
						</div>
						<div className='flex items-center gap-2'>
							<FaCrown className='text-gray-600' />
							<p>3. @FlavorKing - 4100 XP</p>
						</div>
					</div>

					{/* Notifications */}
					<h2 className='text-lg font-semibold mt-6 mb-3'>
						🔔 Recent Activity
					</h2>
					<p className='text-gray-300 text-sm'>
						🎉 You earned a new achievement: "Iron Chef"! 🔥
					</p>
				</div>
			</div>
		</div>
	);
}
