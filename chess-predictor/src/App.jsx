"use client"
import { motion } from "framer-motion"
import { ChessOutcomePredictor } from "./components/chess-outcome-predictor"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <ChessOutcomePredictor />
      </motion.div>
    </div>
  )
}

export default App

