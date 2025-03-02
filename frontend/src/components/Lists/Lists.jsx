import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLists, deleteList } from '../../redux/lists';
import { useNavigate } from 'react-router-dom';
import OpenModalButton from '../../context/OpenModalButton'
import CreateListModal from '../modals/CreateList';
import ConfirmDelete from '../modals/ConfirmDelete';
import {useModal} from '../../context/ModalContext';
import './Lists.css';

const Lists = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.session.user);
  const allLists = useSelector((state) => state.lists.allLists);
	const { closeModal } = useModal();


	useEffect(() => {
		if (user && allLists.length === 0) {
			dispatch(fetchAllLists());
		}
	}, [dispatch, user, allLists.length]);

	const userLists = allLists.filter((list) => list.userId === user?.id);

	const handleViewList = (listId) => {
		navigate(`/lists/${listId}`);
  };


	const handleDeleteList = async (listId) => {
		await dispatch(deleteList(listId));
		closeModal();
	};

	return (
		<div className='lists-container'>
			<h1>Your Grocery Lists</h1>

			{/* ✅ Use OpenModalButton to open CreateListModal */}
			<OpenModalButton
				modalComponent={<CreateListModal />}
				buttonText='+ Create List'
				className='create-list-btn'
			/>

			{userLists.length === 0 ? (
				<p>No lists found. Start by creating one!</p>
			) : (
				<ul className='lists'>
					{userLists.map((list) => (
						<li key={list.id} className='list-item'>
							<h3>{list.name}</h3>
							<p> {list.Ingredients?.length || 0} items</p>
							<div className='list-actions'>
								<button onClick={() => handleViewList(list.id)}>
									View List
								</button>

								<OpenModalButton
									modalComponent={
										<ConfirmDelete
											itemType='list'
											onConfirm={() => handleDeleteList(list.id)}
										/>
									}
									buttonText='Delete'
									className='delete-list-btn'
								/>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Lists;
