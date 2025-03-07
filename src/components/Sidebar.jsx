import { Heart, Home, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		// Clear all auth-related data
		localStorage.clear();
		// Force storage event to update app state
		window.dispatchEvent(new Event('storage'));
		// Redirect to login page
		navigate('/login');
	};

	return (
		<>
			<DesktopSidebar onLogout={handleLogout} />
			<MobileSidebar onLogout={handleLogout} />
		</>
	);
};

const DesktopSidebar = ({ onLogout }) => {
	return (
		<div className='p-3 md:p-10 border-r min-h-screen w-24 md:w-64 hidden sm:block'>
			<div className='flex flex-col gap-20 sticky top-10 left-0'>
				<div className='w-full'>
					<img 
						src='/Chef Davis.png' 
						alt='Chef Davis' 
						className='hidden md:block w-40 h-40 object-cover rounded-full mx-auto'
					/>
					<img 
						src='/Chef Davis.png' 
						alt='Chef Davis' 
						className='block md:hidden w-16 h-16 object-cover rounded-full mx-auto'
					/>
				</div>
				<ul className='flex flex-col items-center md:items-start gap-8'>
					<Link to={"/"} className='flex gap-1'>
						<Home size={"24"} />
						<span className='font-bold hidden md:block'>Home</span>
					</Link>
					<Link to={"/favorites"} className='flex gap-1'>
						<Heart size={"24"} />
						<span className='font-bold hidden md:block'>Favorites</span>
					</Link>
					<button onClick={onLogout} className='flex gap-1 text-red-600 hover:text-red-700'>
						<LogOut size={"24"} />
						<span className='font-bold hidden md:block'>Logout</span>
					</button>
				</ul>
			</div>
		</div>
	);
};

const MobileSidebar = ({ onLogout }) => {
	return (
		<div className='flex justify-center gap-10 border-t fixed w-full bottom-0 left-0 bg-white z-10 p-2 sm:hidden'>
			<Link to={"/"}>
				<Home size={"24"} className='cursor-pointer' />
			</Link>
			<Link to={"/favorites"}>
				<Heart size={"24"} className='cursor-pointer' />
			</Link>
			<button onClick={onLogout}>
				<LogOut size={"24"} className='cursor-pointer text-red-600' />
			</button>
		</div>
	);
};

export default Sidebar;
