import { useState } from 'react';
import './IngredientInfo.css';

const IngredientInfo = ({ ingredient }) => {
	const [showDetails, setShowDetails] = useState(false);
	
	if (!ingredient) return null;

	const {
		name,
		calories,
		carbohydrates,
		protein,
		fats,
		fiber,
		sodium,
		sugar,
		calcium,
		iron,
		moisture,
		servingSize,
		image,
	} = ingredient;


	return (
		<div className='ingredient-info'>
			<div className='ingredient-header'>
				<h2>{name}</h2>
			</div>

			<img
				src={
					image ||
					'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXZ3aXBjZTc4bm5xemVwbHB6dzFmZXQ0OTBjOWpxaGZ4Z2tzY29hcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/dAQ0kcdNpnalaoZFgQ/giphy.gif'
				}
				alt={name}
				className='ingredient-image'
			/>

			<p className='serving-size'>Serving Size: {servingSize || 'N/A'}</p>

			<button
				className='toggle-details'
				onClick={() => setShowDetails(!showDetails)}>
				{showDetails ? 'Hide Nutrition Facts' : 'Show Nutrition Facts'}
			</button>

			{showDetails && (
				<table className='nutrition-table'>
					<tbody>
						<tr>
							<td>Calories</td>
							<td>{calories || 'N/A'}</td>
						</tr>
						<tr>
							<td>Carbs</td>
							<td>{carbohydrates || 'N/A'} g</td>
						</tr>
						<tr>
							<td>Protein</td>
							<td>{protein || 'N/A'} g</td>
						</tr>
						<tr>
							<td>Fats</td>
							<td>{fats || 'N/A'} g</td>
						</tr>
						<tr>
							<td>Fiber</td>
							<td>{fiber || 'N/A'} g</td>
						</tr>
						<tr>
							<td>Sodium</td>
							<td>{sodium || 'N/A'} mg</td>
						</tr>
						<tr>
							<td>Sugar</td>
							<td>{sugar || 'N/A'} g</td>
						</tr>
						<tr>
							<td>Calcium</td>
							<td>{calcium || 'N/A'} mg</td>
						</tr>
						<tr>
							<td>Iron</td>
							<td>{iron || 'N/A'} mg</td>
						</tr>
						<tr>
							<td>Moisture</td>
							<td>{moisture || 'N/A'}%</td>
						</tr>
					</tbody>
				</table>
			)}
		</div>
	);
};

export default IngredientInfo;
