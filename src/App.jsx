import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FavoritesPage from "./pages/FavoritesPage";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
	const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
	return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

	useEffect(() => {
		const checkAuth = () => {
			const newLoginState = localStorage.getItem('isLoggedIn') === 'true';
			setIsLoggedIn(newLoginState);
		};

		window.addEventListener('storage', checkAuth);
		return () => window.removeEventListener('storage', checkAuth);
	}, []);

	return (
		<div className="min-h-screen bg-[#faf9fb]">
			<div className="flex min-h-screen">
				{isLoggedIn && <Sidebar />}
				<div className="flex-1">
					<Routes>
						<Route
							path="/"
							element={
								<PrivateRoute>
									<HomePage />
								</PrivateRoute>
							}
						/>
						<Route 
							path="/login" 
							element={
								isLoggedIn ? <Navigate to="/" /> : <LoginPage />
							}
						/>
						<Route 
							path="/signup" 
							element={
								isLoggedIn ? <Navigate to="/" /> : <SignupPage />
							}
						/>
						<Route
							path="/favorites"
							element={
								isLoggedIn ? <FavoritesPage /> : <Navigate to="/login" />
							}
						/>
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default App;
