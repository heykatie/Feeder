import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLists, deleteList } from '../../redux/lists';
import { useNavigate } from 'react-router-dom';
import OpenModalButton from '../../context/OpenModalButton';
import CreateListModal from '../modals/CreateList';
import ConfirmDelete from '../modals/ConfirmDelete';
import { useModal } from '../../context/Modal/ModalContext';
import './Lists.css';

const Lists = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.session.user);
	const allLists = useSelector((state) => state.lists.allLists);
	const { closeModal } = useModal();

	useEffect(() => {
		if (user) {
			dispatch(fetchAllLists());
		}
	}, [dispatch, user, allLists.length]);

	const shoppingLists = allLists.filter(
		(list) => list.userId === user?.id && list.type === 'shopping'
	);
	const todoLists = allLists.filter(
		(list) => list.userId === user?.id && list.type === 'todo'
	);

	const handleViewList = (listId) => {
		navigate(`/lists/${listId}`);
	};

	const handleDeleteList = async (listId) => {
		await dispatch(deleteList(listId));
		closeModal();
	};

	return (
		<div className='lists-container'>
			<h1>Your Lists</h1>

			<OpenModalButton
				modalComponent={<CreateListModal />}
				buttonText='+ Create List'
				className='create-list-btn'
			/>

			<div className='list-category'>
				<h2>Shopping Lists</h2>
				{shoppingLists.length === 0 ? (
					<p>No shopping lists found. Start by creating one!</p>
				) : (
					<ul className='lists'>
						{shoppingLists.map((list) => {
							const totalItems = list.Ingredients?.length || 0;
							const checkedItems = list.Ingredients?.reduce(
								(count, ing) =>
									ing.checked === true ? count + 1 : count,
								0
							);

							return (
								<li key={list.id} className='list-item'>
									<h3>{list.name}</h3>
									<p>
										{checkedItems}/{totalItems} items checked ✅
									</p>
									<div className='list-actions'>
										<button onClick={() => handleViewList(list.id)}>
											View List
										</button>
										<OpenModalButton
											modalComponent={
												<ConfirmDelete
													itemType='list'
													onConfirm={() =>
														handleDeleteList(list.id)
													}
												/>
											}
											buttonText='Delete'
											className='delete-list-btn'
										/>
									</div>
								</li>
							);
						})}
					</ul>
				)}
			</div>

			<div className='list-category'>
				<h2>To-Do Lists</h2>
				{todoLists.length === 0 ? (
					<p>No to-do lists found. Start by creating one!</p>
				) : (
					<ul className='lists'>
						{todoLists.map((list) => {
							const totalItems = list.Ingredients?.length || 0;
							const checkedItems =
								list.Ingredients?.filter((ing) => ing.checked).length ||
								0;

							return (
								<li key={list.id} className='list-item'>
									<h3>{list.name}</h3>
									<p>
										{checkedItems}/{totalItems} tasks completed ✅
									</p>
									<div className='list-actions'>
										<button onClick={() => handleViewList(list.id)}>
											View List
										</button>
										<OpenModalButton
											modalComponent={
												<ConfirmDelete
													itemType='list'
													onConfirm={() =>
														handleDeleteList(list.id)
													}
												/>
											}
											buttonText='Delete'
											className='delete-list-btn'
										/>
									</div>
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Lists;
