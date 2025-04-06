"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  ChevronLeft,
  Brain,
  RefreshCw,
  Zap,
  CastleIcon as ChessKnight,
  ChurchIcon as ChessBishop,
  RocketIcon as ChessRook,
  DiamondIcon as ChessQueen,
  PianoIcon as ChessPawn,
  CastleIcon as ChessKing,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { predictMoves } from "../../lib/api"; // Ensure this matches the location of api.js

export default function MovesPredictionPage() {
  const [pgn, setPgn] = useState("")
  const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  const [isLoading, setIsLoading] = useState(false)
  const [predictions, setPredictions] = useState(null)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("pgn")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await predictMoves(pgn, fen)

      if (result.error) {
        throw new Error(result.error)
      }

      setPredictions(result)
    } catch (err) {
      console.error("Move prediction error:", err)
      setError(err.message || "Failed to predict moves. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setPgn("")
    setFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    setPredictions(null)
    setError("")
  }

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
        <Card className="border-2 border-amber-800/30 bg-black/60 backdrop-blur-sm text-white shadow-xl">
          <CardHeader className="border-b border-amber-800/20 bg-gradient-to-r from-amber-900/40 to-amber-800/20">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-amber-400" />
              <div>
                <CardTitle className="text-2xl font-bold text-amber-100">Next Move Predictor</CardTitle>
                <CardDescription className="text-amber-300/80">
                  Predict the best next moves based on the current position
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-2 mb-6 bg-gray-900/60">
                    <TabsTrigger
                      value="pgn"
                      className="data-[state=active]:bg-amber-900/40 data-[state=active]:text-amber-100"
                    >
                      PGN Notation
                    </TabsTrigger>
                    <TabsTrigger
                      value="fen"
                      className="data-[state=active]:bg-amber-900/40 data-[state=active]:text-amber-100"
                    >
                      FEN Position
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="pgn">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="pgn" className="text-sm">
                          Enter PGN (Chess Game Notation)
                        </Label>
                        <div className="mt-1.5">
                          <textarea
                            id="pgn"
                            value={pgn}
                            onChange={(e) => setPgn(e.target.value)}
                            placeholder="e.g. 1. e4 e5 2. Nf3 Nc6 3. Bb5"
                            className="w-full h-32 rounded-md border border-amber-800/30 bg-gray-900/60 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600"
                          />
                        </div>
                        <p className="text-xs text-amber-300/60 mt-1">Enter the moves played so far in PGN format</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="fen">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fen" className="text-sm">
                          Enter FEN (Position Notation)
                        </Label>
                        <Input
                          id="fen"
                          value={fen}
                          onChange={(e) => setFen(e.target.value)}
                          className="border-amber-800/30 bg-gray-900/60"
                        />
                        <p className="text-xs text-amber-300/60 mt-1">Enter the current board position in FEN format</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 flex gap-4">
  <Button
    onClick={handleSubmit}
    disabled={isLoading}
    className="bg-amber-700 hover:bg-amber-600 text-yellow-400"
  >
    {isLoading ? (
      <>
        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
        Analyzing...
      </>
    ) : (
      <>
        <Zap className="mr-2 h-4 w-4" />
        Predict Next Moves
      </>
    )}
  </Button>

  <Button
    variant="outline"
    onClick={handleReset}
    className="border-amber-800/30 text-amber-300 hover:bg-amber-900/30"
  >
    Reset
  </Button>
</div>

                {error && (
                  <div className="mt-4 bg-red-900/30 border border-red-800/50 rounded-md p-3 text-sm text-white">
                    {error}
                  </div>
                )}

                {predictions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8"
                  >
                    <h3 className="text-xl font-bold text-amber-100 mb-4">Predicted Next Moves</h3>
                    <div className="space-y-3">
                      {predictions.moves.map((move, index) => (
                        <div
                          key={index}
                          className={`bg-gray-800/60 border border-amber-800/20 rounded-lg p-4 ${index === 0 ? "ring-2 ring-amber-500/50" : ""}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-amber-900/40 rounded-full p-1.5">
                                {index === 0 ? (
                                  <ChessQueen className="h-5 w-5 text-amber-400" />
                                ) : index === 1 ? (
                                  <ChessRook className="h-5 w-5 text-amber-400" />
                                ) : index === 2 ? (
                                  <ChessBishop className="h-5 w-5 text-amber-400" />
                                ) : (
                                  <ChessKnight className="h-5 w-5 text-amber-400" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold text-white">{move.san}</span>
                                  <Badge className="bg-amber-700/60">{(move.probability * 100).toFixed(0)}%</Badge>
                                </div>
                                <p className="text-sm text-gray-300">{move.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div
                                className={`text-lg font-mono ${move.evaluation > 0 ? "text-green-400" : move.evaluation < 0 ? "text-red-400" : "text-gray-300"}`}
                              >
                                {move.evaluation > 0 ? "+" : ""}
                                {move.evaluation.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 bg-gray-800/60 border border-amber-800/20 rounded-lg p-4">
                      <h4 className="text-lg font-bold text-amber-100 mb-2">Position Analysis</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-400">Evaluation</p>
                          <p className="text-lg font-mono">
                            {predictions.position.evaluation > 0 ? "+" : ""}
                            {predictions.position.evaluation.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Material</p>
                          <p className="text-lg">{predictions.position.material}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Best Line</p>
                          <p className="text-lg font-mono">{predictions.position.bestLine}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Position Control</p>
                          <p className="text-lg">{predictions.position.control}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="space-y-6">
                <Card className="bg-gray-900/60 border-amber-800/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <ChessKing className="mr-2 h-5 w-5 text-amber-400" />
                      How It Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-300 space-y-2">
                    <p>Our AI analyzes the current position and calculates the most promising moves based on:</p>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      <li>Material balance</li>
                      <li>Piece activity</li>
                      <li>King safety</li>
                      <li>Pawn structure</li>
                      <li>Tactical opportunities</li>
                    </ul>
                    <p className="mt-2">
                      Each suggested move includes an evaluation score and probability of being the optimal choice.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/60 border-amber-800/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <ChessPawn className="mr-2 h-5 w-5 text-amber-400" />
                      Input Format Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-300 space-y-2">
                    <p className="font-medium">PGN Format Example:</p>
                    <p className="font-mono text-xs bg-gray-800 p-2 rounded">1. e4 e5 2. Nf3 Nc6 3. Bb5</p>

                    <p className="font-medium mt-2">FEN Format Example:</p>
                    <p className="font-mono text-xs bg-gray-800 p-2 rounded break-all">
                      r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t border-amber-800/20 bg-gradient-to-r from-amber-900/40 to-amber-800/20 py-3 text-xs text-amber-300/60">
            <div className="flex items-center justify-between w-full">
              <div>Next Move Predictor v1.0</div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-amber-700/50 text-amber-300/80">
                  AI-Powered
                </Badge>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

