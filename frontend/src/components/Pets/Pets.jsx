import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPets, createPet, deletePet } from '../../redux/pets';
import PetForm from './PetForm';
import './Pets.css';

const Pets = () => {
	const dispatch = useDispatch();
  const { pets, status, error } = useSelector((state) => state.pets);
  const user = useSelector((state) => state.session.user)

	useEffect(() => {
		dispatch(getPets());
	}, [dispatch]);

	const handleAddPet = async (petData) => {
		await dispatch(createPet(petData));
		dispatch(getPets()); // Refresh pets list
	};

	const handleDeletePet = async (petId) => {
		await dispatch(deletePet(petId));
		dispatch(getPets());
	};

	return (
		<div className='pets-container'>
			<h2>My Pets</h2>

			{/* Add Pet Form */}
			<PetForm onSubmit={handleAddPet} />

			{/* Display Pets */}
			{status === 'loading' ? (
				<p>Loading pets...</p>
			) : error ? (
				<p className='error'>{error}</p>
			) : pets.length === 0 ? (
				<p>No pets added yet.</p>
			) : (
				<ul className='pet-list'>
					{pets.map((pet) => (
						<li key={pet.id} className='pet-card'>
							<img
								src={pet.image || '/default-pet.png'}
								alt={pet.name}
							/>
							<h3>{pet.name}</h3>
							<p>
								{pet.species} - {pet.breed}
							</p>
							<p>
								Age: {pet.age} | Weight: {pet.weight} lbs
							</p>
							<p>Allergies: {pet.allergies || 'None'}</p>
							<p>Notes: {pet.notes || 'No notes'}</p>
							<button
								onClick={() => handleDeletePet(pet.id)}
								className='delete-btn'>
								Delete
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Pets;
