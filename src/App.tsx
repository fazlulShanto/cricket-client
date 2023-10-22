import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import TossPage from './pages/toss/toss';
import PlayPage from './pages/play/play';
import MatchesPage from './pages/matches/matches';
import MatchDetailsPage from './pages/match details/MatchDetails';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
				<Route
					path="/toss"
					element={<TossPage />}
				/>
				<Route
					path="/play/:matchId"
					element={<PlayPage />}
				/>
				<Route
					path="/matches"
					element={<MatchesPage />}
				/>
				<Route
					path="/matches/:matchId"
					element={<MatchDetailsPage />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
