"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx"
import { CastleIcon as ChessKing, DiamondIcon as ChessQueen, Sparkles } from "lucide-react"

export function PredictionResult({ prediction }) {
  // Determine the color and icon based on the prediction
  let color = "bg-amber-600"
  let textColor = "text-white"
  let icon = <Sparkles className="h-5 w-5" />

  if (prediction === "White Win") {
    color = "bg-white"
    textColor = "text-black"
    icon = <ChessKing className="h-5 w-5 text-black" />
  } else if (prediction === "Black Win") {
    color = "bg-gray-900"
    textColor = "text-white"
    icon = <ChessQueen className="h-5 w-5 text-white" />
  }

  return (
    <Card className="bg-gray-900/60 border-amber-800/30 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-amber-400" />
          Prediction Result
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <motion.div
            className={`${color} rounded-lg p-6 text-center ${textColor} shadow-lg`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <motion.div
              className="absolute inset-0 bg-white opacity-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                repeatType: "reverse",
              }}
            />
            <div className="flex items-center justify-center mb-2">{icon}</div>
            <h3 className="text-xl font-bold">{prediction}</h3>
            <p className="text-sm mt-2 opacity-80">
              {prediction === "White Win"
                ? "White has the advantage and is predicted to win"
                : prediction === "Black Win"
                  ? "Black has the advantage and is predicted to win"
                  : "The game is evenly matched and likely to end in a draw"}
            </p>
          </motion.div>

          <div className="mt-4 text-sm text-gray-300">
            <p className="mb-2">Factors influencing this prediction:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Player rating difference</li>
              <li>Opening selection and theory</li>
              <li>Time control settings</li>
              <li>Expected game length</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

