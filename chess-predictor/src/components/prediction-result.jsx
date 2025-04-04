"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx"
import { CastleIcon as ChessKing, DiamondIcon as ChessQueen, Sparkles } from "lucide-react"

export function PredictionResult({ prediction }) {
  // Determine the color and icon based on the prediction
  let color = "bg-amber-600"
  let textColor = "text-white"
  let icon = <Sparkles className="h-6 w-6" />

  if (prediction === "White Win" || prediction === "White Wins") {
    color = "bg-white"
    textColor = "text-black"
    icon = <ChessKing className="h-6 w-6 text-black" />
  } else if (prediction === "Black Win" || prediction === "Black Wins") {
    color = "bg-gray-900"
    textColor = "text-white"
    icon = <ChessQueen className="h-6 w-6 text-white" />
  }

  // Normalize prediction text for display
  let displayPrediction = prediction
  if (prediction === "White Wins") displayPrediction = "White Win"
  if (prediction === "Black Wins") displayPrediction = "Black Win"

  return (
    <Card className="bg-gray-900/60 border-amber-800/30 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Prediction Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
          className={`${color} ${textColor} rounded-lg p-4 flex items-center justify-center flex-col text-center`}
        >
          <div className="bg-black/20 p-3 rounded-full mb-2">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-1">
            {displayPrediction}
          </h3>
          <p className="text-sm opacity-90">
            {displayPrediction === "White Win" 
              ? "White has the advantage and is predicted to win"
              : displayPrediction === "Black Win" 
                ? "Black has the advantage and is predicted to win"
                : "The game is evenly matched and likely to end in a draw"}
          </p>
        </motion.div>

        <div className="bg-gray-800/60 p-3 rounded-md">
          <p className="text-xs text-amber-300/80 font-medium mb-2">
            Factors influencing this prediction:
          </p>
          <ul className="text-xs text-gray-300 space-y-1 pl-4">
            <li>Time control settings</li>
            <li>Player rating difference</li>
            <li>Opening selection and theory</li>
            <li>Expected game length</li>
            <li>Competitive vs. casual play</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default PredictionResult