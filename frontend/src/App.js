import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<Router>
			<Routes>
				{/* Public routes */}
				<Route path="/" element={<Home />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />

				{/* Simple protected route */}
				<Route
					path="/dashboard"
					element={
						localStorage.getItem("token") ? (
							<Dashboard />
						) : (
							<Navigate to="/signin" />
						)
					}
				/>

				{/* Fallback route */}
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Router>
	);
}

export default App;
