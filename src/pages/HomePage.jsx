import { Search } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { getRandomColor } from "../lib/utils";

const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;

const HomePage = () => {
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [dietFilter, setDietFilter] = useState('veg'); // Changed default to 'veg'

	const fetchRecipes = async (searchQuery) => {
		setLoading(true);
		setRecipes([]);
		try {
			console.log('Testing API with credentials:', {
				app_id: APP_ID,
				app_key: APP_KEY.substring(0, 8) + '...' // Only show first 8 chars for security
			});
			
			let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`;
			
			// For veg, add vegetarian parameter to API
			if (dietFilter === 'veg') {
				url += '&health=vegetarian';
			} else {
				// For non-veg, exclude vegetarian recipes
				url += '&excluded=vegetarian';
			}
			
			console.log('Request URL:', url);
			
			const res = await fetch(url, {
				headers: {
					'Edamam-Account-User': APP_ID // Using APP_ID as the user identifier
				}
			});
			console.log('Response status:', res.status);
			console.log('Response headers:', Object.fromEntries([...res.headers]));
			
			if (!res.ok) {
				const errorText = await res.text();
				console.log('Error response body:', errorText);
				throw new Error(`API request failed with status ${res.status}`);
			}
			
			const data = await res.json();
			console.log('Response data:', data);
			
			if (!data || !data.hits) {
				throw new Error('Invalid data format received from API');
			}

			setRecipes(data.hits);
		} catch (error) {
			console.error('Error fetching recipes:', error.message);
			setRecipes([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRecipes("pasta"); // Changed from "chicken" to "pasta" for vegetarian-friendly default
	}, []);

	const handleSearchRecipe = (e) => {
		e.preventDefault();
		fetchRecipes(e.target[0].value);
	};

	const handleDietFilter = (filter) => {
		setDietFilter(filter);
		// Set default search term based on diet filter
		const defaultTerm = filter === 'veg' ? 'pasta' : 'chicken';
		const searchInput = document.querySelector('input[type="text"]');
		// Clear the search input and use the default term
		if (searchInput) {
			searchInput.value = defaultTerm;
		}
		fetchRecipes(defaultTerm);
	};

	return (
		<div className='w-full p-6 md:p-10'>
			<div className='max-w-screen-lg mx-auto'>
				<form onSubmit={handleSearchRecipe} className="mb-4">
					<label className='input shadow-md flex items-center gap-2 bg-white rounded-lg p-3'>
						<Search size={"24"} />
						<input
							type='text'
							className='text-sm md:text-md grow outline-none'
							placeholder='What do you want to cook today?'
						/>
					</label>
				</form>

				{/* Diet Toggle Switch */}
				<div className="flex items-center gap-3 mb-6">
					<span className="text-gray-700">Veg Only</span>
					<label className="relative inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							className="sr-only peer"
							checked={dietFilter === 'veg'}
							onChange={(e) => handleDietFilter(e.target.checked ? 'veg' : 'non-veg')}
						/>
						<div className="w-11 h-6 bg-red-500 rounded-full peer peer-focus:outline-none peer-focus:ring-4 
							peer-focus:ring-red-200 peer-checked:bg-green-500 peer-checked:peer-focus:ring-green-200
							after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
							after:bg-white after:border-gray-300 after:border after:rounded-full 
							after:h-5 after:w-5 after:transition-all 
							peer-checked:after:translate-x-full peer-checked:after:border-white">
						</div>
					</label>
					<span className="text-gray-700">Non-Veg</span>
				</div>

				<h2 className='font-bold text-3xl md:text-5xl mt-4'>Recommended Recipes</h2>
				<p className='text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight'>Popular choices</p>

				<div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
					{!loading &&
						recipes.map(({ recipe }, index) => (
							<RecipeCard key={index} recipe={recipe} {...getRandomColor()} />
						))}

					{loading &&
						[...Array(9)].map((_, index) => (
							<div key={index} className='flex flex-col gap-4 w-full'>
								<div className='skeleton h-32 w-full'></div>
								<div className='flex justify-between'>
									<div className='skeleton h-4 w-28'></div>
									<div className='skeleton h-4 w-24'></div>
								</div>
								<div className='skeleton h-4 w-1/2'></div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};
export default HomePage;
