"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, CastleIcon, Trophy, Brain, Sparkles, CastleIcon as ChessKnight } from "lucide-react"
import { Button } from "../components/ui/button"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Chess <span className="text-amber-400">Predictor</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Advanced AI-powered chess analytics and prediction tools to enhance your game
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-500 text-white">
                <Link to="/options">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-amber-600 text-amber-400 hover:bg-amber-900/20"
              >
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-amber-500 rounded-lg blur-xl opacity-20 transform -rotate-6"></div>
            <div className="relative bg-gray-800/80 border border-amber-800/30 rounded-lg p-6 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/80 rounded-md p-4 flex flex-col items-center justify-center">
                  <CastleIcon className="h-10 w-10 text-amber-400 mb-2" />
                  <span className="text-sm text-gray-300">Game Outcome</span>
                  <span className="text-lg font-bold text-white">Prediction</span>
                </div>
                <div className="bg-gray-900/80 rounded-md p-4 flex flex-col items-center justify-center">
                  <Brain className="h-10 w-10 text-amber-400 mb-2" />
                  <span className="text-sm text-gray-300">Next Move</span>
                  <span className="text-lg font-bold text-white">Analysis</span>
                </div>
                <div className="bg-gray-900/80 rounded-md p-4 flex flex-col items-center justify-center">
                  <ChessKnight className="h-10 w-10 text-amber-400 mb-2" />
                  <span className="text-sm text-gray-300">Opening</span>
                  <span className="text-lg font-bold text-white">Recognition</span>
                </div>
                <div className="bg-gray-900/80 rounded-md p-4 flex flex-col items-center justify-center">
                  <Trophy className="h-10 w-10 text-amber-400 mb-2" />
                  <span className="text-sm text-gray-300">Tournament</span>
                  <span className="text-lg font-bold text-white">Forecasting</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-4"
          >
            Powerful Chess Prediction Tools
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Leverage the power of AI to analyze games, predict outcomes, and improve your chess strategy
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 border border-amber-800/20 rounded-lg p-6 backdrop-blur-sm hover:bg-gray-800/80 transition-colors"
            >
              <div className="bg-amber-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Our AI-powered chess prediction system uses advanced algorithms to analyze games and provide insights
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gray-800/50 border border-amber-800/20 rounded-lg p-6 backdrop-blur-sm">
                <div className="absolute -top-4 -left-4 bg-amber-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 mt-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2">
                  <ArrowRight className="h-6 w-6 text-amber-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-900/40 to-amber-800/20 border border-amber-800/30 rounded-lg p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Enhance Your Chess Game?</h2>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Explore our suite of chess prediction tools and take your game to the next level
          </p>
          <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-500 text-white">
            <Link to="/options">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </div>
  )
}

const features = [
  {
    title: "Game Outcome Prediction",
    description: "Predict the likely outcome of a chess game based on player ratings, opening, and time controls.",
    icon: <CastleIcon className="h-6 w-6 text-amber-400" />,
  },
  {
    title: "Next Move Analysis",
    description: "Get AI-powered suggestions for the best next moves based on the current board position.",
    icon: <Brain className="h-6 w-6 text-amber-400" />,
  },
  {
    title: "Opening Recognition",
    description: "Identify chess openings from move sequences and learn their strategic principles.",
    icon: <ChessKnight className="h-6 w-6 text-amber-400" />,
  },
  {
    title: "Position Evaluation",
    description: "Analyze board positions to determine advantages and potential winning strategies.",
    icon: <Sparkles className="h-6 w-6 text-amber-400" />,
  },
  {
    title: "Tournament Performance",
    description: "Predict performance in tournaments based on historical data and player statistics.",
    icon: <Trophy className="h-6 w-6 text-amber-400" />,
  },
  {
    title: "Personalized Insights",
    description: "Receive tailored recommendations to improve your chess strategy and gameplay.",
    icon: <Brain className="h-6 w-6 text-amber-400" />,
  },
]

const steps = [
  {
    title: "Input Game Parameters",
    description: "Enter details about the game, such as player ratings, time controls, and opening moves.",
  },
  {
    title: "AI Analysis",
    description: "Our advanced algorithms analyze the data and compare it with millions of historical games.",
  },
  {
    title: "Get Predictions",
    description: "Receive detailed predictions and insights to help you make better strategic decisions.",
  },
]

