"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ChevronLeft, CastleIcon as ChessKnight, RefreshCw, Zap, BookOpen, Info } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Badge } from "../components/ui/badge"
import { identifyOpening } from "../../lib/api"

export default function OpeningPredictionPage() {
  const [moves, setMoves] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await identifyOpening(moves)

      if (result.error) {
        throw new Error(result.error)
      }

      setPrediction(result)
    } catch (err) {
      console.error("Opening identification error:", err)
      setError(err.message || "Failed to identify opening. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setMoves("")
    setPrediction(null)
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
              <ChessKnight className="h-8 w-8 text-amber-400" />
              <div>
                <CardTitle className="text-2xl font-bold text-amber-100">Opening Identifier</CardTitle>
                <CardDescription className="text-amber-300/80">
                  Identify chess openings from move sequences
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="moves" className="text-sm">
                      Enter Chess Moves
                    </Label>
                    <div className="mt-1.5">
                      <textarea
                        id="moves"
                        value={moves}
                        onChange={(e) => setMoves(e.target.value)}
                        placeholder="e.g. 1. e4 e5 2. Nf3 Nc6 3. Bb5"
                        className="w-full h-32 rounded-md border border-amber-800/30 bg-gray-900/60 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600"
                      />
                    </div>
                    <p className="text-xs text-amber-300/60 mt-1">
                      Enter the moves in algebraic notation (e.g., e4, Nf3) or full notation (1. e4 e5)
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" disabled={isLoading} className="bg-amber-700 hover:bg-amber-600 text-white">
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Identifying...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Identify Opening
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      className="border-amber-800/30 text-amber-300 hover:bg-amber-900/30"
                    >
                      Reset
                    </Button>
                  </div>
                </form>

                {error && (
                  <div className="mt-4 bg-red-900/30 border border-red-800/50 rounded-md p-3 text-sm text-white">
                    {error}
                  </div>
                )}

                {prediction && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8"
                  >
                    <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/10 rounded-lg p-6 border border-amber-800/30">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-amber-100">{prediction.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-amber-700/60">ECO: {prediction.eco}</Badge>
                            <Badge className="bg-gray-700/60">Popularity: {prediction.popularity}%</Badge>
                          </div>
                        </div>
                        <div className="bg-amber-900/40 rounded-full p-2">
                          <BookOpen className="h-6 w-6 text-amber-400" />
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-300">{prediction.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-800/60 rounded-md p-3">
                          <h4 className="text-sm font-medium text-amber-300 mb-1">Main Line</h4>
                          <p className="font-mono text-sm">{prediction.mainLine}</p>
                        </div>

                        <div className="bg-gray-800/60 rounded-md p-3">
                          <h4 className="text-sm font-medium text-amber-300 mb-1">Win Rate Statistics</h4>
                          <div className="flex items-center gap-2">
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden flex-grow">
                              <div className="h-full bg-white" style={{ width: `${prediction.winRate.white}%` }}></div>
                              <div
                                className="h-full bg-amber-400"
                                style={{ width: `${prediction.winRate.draw}%`, marginTop: "-8px" }}
                              ></div>
                              <div
                                className="h-full bg-gray-900"
                                style={{ width: `${prediction.winRate.black}%`, marginTop: "-8px" }}
                              ></div>
                            </div>
                            <div className="text-xs">
                              <span className="text-white">W: {prediction.winRate.white}%</span>
                              {" | "}
                              <span className="text-amber-400">D: {prediction.winRate.draw}%</span>
                              {" | "}
                              <span className="text-gray-400">B: {prediction.winRate.black}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-amber-300 mb-2">White Strategy</h4>
                          <p className="text-sm text-gray-300">{prediction.strategy.white}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-amber-300 mb-2">Black Strategy</h4>
                          <p className="text-sm text-gray-300">{prediction.strategy.black}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-amber-300 mb-2">Common Variations</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {prediction.variations.map((variation, index) => (
                            <div key={index} className="bg-gray-800/40 rounded p-2 text-sm">
                              <p className="font-medium text-white">{variation.name}</p>
                              <p className="font-mono text-xs text-gray-400">{variation.moves}</p>
                            </div>
                          ))}
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
                      <Info className="mr-2 h-5 w-5 text-amber-400" />
                      About Chess Openings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-300 space-y-2">
                    <p>Chess openings are the first several moves of a chess game, which establish key themes:</p>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      <li>Control of the center</li>
                      <li>Development of pieces</li>
                      <li>King safety</li>
                      <li>Pawn structure</li>
                    </ul>
                    <p className="mt-2">
                      Openings are classified by ECO codes (Encyclopedia of Chess Openings) from A00 to E99.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/60 border-amber-800/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <BookOpen className="mr-2 h-5 w-5 text-amber-400" />
                      Input Format Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-300 space-y-2">
                    <p className="font-medium">Algebraic Notation:</p>
                    <p className="font-mono text-xs bg-gray-800 p-2 rounded">e4 e5 Nf3 Nc6 Bb5</p>

                    <p className="font-medium mt-2">Full Notation:</p>
                    <p className="font-mono text-xs bg-gray-800 p-2 rounded">1. e4 e5 2. Nf3 Nc6 3. Bb5</p>

                    <p className="mt-2">You can enter 3-15 moves to identify most common openings.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t border-amber-800/20 bg-gradient-to-r from-amber-900/40 to-amber-800/20 py-3 text-xs text-amber-300/60">
            <div className="flex items-center justify-between w-full">
              <div>Opening Identifier v1.0</div>
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

