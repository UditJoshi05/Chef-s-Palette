import { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { getRandomColor } from '../lib/utils';

const FavoritesPage = () => {
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		// Load favorites from localStorage
		const savedFavorites = localStorage.getItem('favorites');
		if (savedFavorites) {
			setFavorites(JSON.parse(savedFavorites));
		}
	}, []);

	if (favorites.length === 0) {
		return (
			<div className='w-full p-6 md:p-10'>
				<div className='max-w-screen-lg mx-auto'>
					<h2 className='font-bold text-3xl md:text-5xl mt-4'>My Favorites</h2>
					<p className='text-slate-500 font-semibold ml-1 my-4 text-lg'>
						No favorite recipes yet. Start adding some!
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='w-full p-6 md:p-10'>
			<div className='max-w-screen-lg mx-auto'>
				<h2 className='font-bold text-3xl md:text-5xl mt-4'>My Favorites</h2>
				<p className='text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight'>
					Your favorite recipes
				</p>

				<div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
					{favorites.map((recipe, index) => (
						<RecipeCard 
							key={index} 
							recipe={recipe} 
							{...getRandomColor()} 
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default FavoritesPage;
