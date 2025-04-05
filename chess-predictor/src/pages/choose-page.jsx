"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { CastleIcon, Brain, CastleIcon as ChessKnight, Trophy, Sparkles, ArrowRight, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { useState } from "react"

export default function OptionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Chess Prediction Tools</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Select a prediction tool to get started with your chess analysis
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {predictionTools.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full bg-gray-800/50 border-amber-800/30 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-600/20 rounded-bl-full"></div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-amber-900/40 rounded-full p-2">{tool.icon}</div>
                  <div>
                    <CardTitle className="text-xl text-amber-100">{tool.title}</CardTitle>
                    <CardDescription className="text-amber-300/80">{tool.shortDesc}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{tool.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {tool.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-amber-700 hover:bg-amber-600 text-white">
                  <Link to={tool.link}>
                    Select <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const predictionTools = [
  {
    title: "Game Outcome Predictor",
    shortDesc: "Predict match results",
    description:
      "Predict the likely outcome of a chess game based on player ratings, opening choice, and time controls.",
    icon: <CastleIcon className="h-6 w-6 text-amber-400" />,
    features: ["Win/Loss/Draw prediction", "Rating impact analysis", "Time control factors", "Opening advantage"],
    link: "/predict/game",
  },
  {
    title: "Next Move Predictor",
    shortDesc: "Analyze best moves",
    description: "Get AI-powered suggestions for the best next moves based on the current board position.",
    icon: <Brain className="h-6 w-6 text-amber-400" />,
    features: ["Multiple move suggestions", "Win probability", "Tactical opportunities", "Mistake prevention"],
    link: "/predict/moves",
  },
  {
    title: "Opening Identifier",
    shortDesc: "Recognize openings",
    description:
      "Identify chess openings from move sequences and learn their strategic principles and common variations.",
    icon: <ChessKnight className="h-6 w-6 text-amber-400" />,
    features: ["ECO code identification", "Opening statistics", "Common variations", "Strategic principles"],
    link: "/predict/opening",
  },
  {
    title: "Position Analyzer",
    shortDesc: "Evaluate positions",
    description: "Analyze board positions to determine advantages, weaknesses, and potential winning strategies.",
    icon: <Sparkles className="h-6 w-6 text-amber-400" />,
    features: ["Material evaluation", "Positional assessment", "Tactical opportunities", "Endgame analysis"],
    link: "/predict/position",
  },
  {
    title: "Tournament Forecaster",
    shortDesc: "Predict tournament results",
    description: "Predict performance in tournaments based on historical data, player statistics, and matchups.",
    icon: <Trophy className="h-6 w-6 text-amber-400" />,
    features: ["Tournament standings", "Match predictions", "Performance rating", "Tiebreak scenarios"],
    link: "/predict/tournament",
  },
  {
    title: "Coming Soon",
    shortDesc: "More tools in development",
    description: "We're constantly developing new chess prediction tools. Check back soon for more features.",
    icon: <Clock className="h-6 w-6 text-amber-400" />,
    features: ["Blunder detection", "Playing style analysis", "Opponent preparation", "Training recommendations"],
    link: "/",
  },
]

