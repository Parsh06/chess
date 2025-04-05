import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import HomePage from "./pages/home-page"
import OptionsPage from "./pages/choose-page"
import GamePredictionPage from "./pages/game-prediction-page"
import MovesPredictionPage from "./pages/moves-prediction-page"
import OpeningPredictionPage from "./pages/opening-prediction-page"
import PositionAnalysisPage from "./pages/position-analysis-page"
import TournamentPredictionPage from "./pages/tournament-prediction-page"
import Navbar from "./components/navbar"
import Footer from "./components/footer"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="chess-predictor-theme">
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/options" element={<OptionsPage />} />
              <Route path="/predict/game" element={<GamePredictionPage />} />
              <Route path="/predict/moves" element={<MovesPredictionPage />} />
              <Route path="/predict/opening" element={<OpeningPredictionPage />} />
              <Route path="/predict/position" element={<PositionAnalysisPage />} />
              <Route path="/predict/tournament" element={<TournamentPredictionPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

