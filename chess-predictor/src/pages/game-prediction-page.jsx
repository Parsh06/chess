"use client"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { Button } from "../components/ui/button"
import { ChessOutcomePredictor } from "../components/chess-outcome-predictor"

export default function GamePredictionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="outline" className="gap-1 border-amber-800/30 text-amber-300 hover:bg-amber-900/30">
          <Link to="/options">
            <ChevronLeft className="h-4 w-4" />
            Back to Options
          </Link>
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <ChessOutcomePredictor />
      </motion.div>
    </div>
  )
}

