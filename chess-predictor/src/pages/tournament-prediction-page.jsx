"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ChevronLeft, Trophy, RefreshCw, Zap, Users, Medal, Info } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

export default function TournamentPredictionPage() {
  const [players, setPlayers] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState(null)
  const [activeTab, setActiveTab] = useState("standings")

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setPrediction({
        players: [
          { name: "Magnus Carlsen", rating: 2847, predictedScore: 8.5, winProbability: 0.65, medal: "gold" },
          { name: "Fabiano Caruana", rating: 2805, predictedScore: 7.5, winProbability: 0.25, medal: "silver" },
          { name: "Ding Liren", rating: 2799, predictedScore: 7.0, winProbability: 0.15, medal: "bronze" },
          { name: "Ian Nepomniachtchi", rating: 2789, predictedScore: 6.5, winProbability: 0.1 },
          { name: "Levon Aronian", rating: 2772, predictedScore: 6.0, winProbability: 0.05 },
          { name: "Wesley So", rating: 2770, predictedScore: 5.5, winProbability: 0.03 },
          { name: "Anish Giri", rating: 2764, predictedScore: 5.0, winProbability: 0.02 },
          { name: "Shakhriyar Mamedyarov", rating: 2759, predictedScore: 4.5, winProbability: 0.01 },
        ],
        keyMatchups: [
          { player1: "Magnus Carlsen", player2: "Fabiano Caruana", prediction: "Draw", probability: 0.55 },
          { player1: "Magnus Carlsen", player2: "Ding Liren", prediction: "Win (Carlsen)", probability: 0.6 },
          { player1: "Fabiano Caruana", player2: "Ding Liren", prediction: "Draw", probability: 0.5 },
        ],
        tiebreaks: {
          description:
            "In case of a tie for first place, the following tiebreak criteria will be applied: 1) Direct encounter, 2) Sonneborn-Berger, 3) Number of wins",
          mostLikely: "Magnus Carlsen wins on direct encounter tiebreak",
        },
      })
      setIsLoading(false)
    }, 1500)
  }

  const handleReset = () => {
    setPlayers("")
    setPrediction(null)
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
              <Trophy className="h-8 w-8 text-amber-400" />
              <div>
                <CardTitle className="text-2xl font-bold text-amber-100">Tournament Forecaster</CardTitle>
                <CardDescription className="text-amber-300/80">
                  Predict tournament results and player performances
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="players" className="text-sm">
                      Enter Tournament Players
                    </Label>
                    <div className="mt-1.5">
                      <textarea
                        id="players"
                        value={players}
                        onChange={(e) => setPlayers(e.target.value)}
                        placeholder="e.g. Magnus Carlsen (2847), Fabiano Caruana (2805), Ding Liren (2799)"
                        className="w-full h-32 rounded-md border border-amber-800/30 bg-gray-900/60 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600"
                      />
                    </div>
                    <p className="text-xs text-amber-300/60 mt-1">
                      Enter player names and ratings, one per line. Format: Name (Rating)
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" disabled={isLoading} className="bg-amber-700 hover:bg-amber-600 text-yellow-400">
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Forecasting...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Forecast Tournament
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

                {prediction && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8"
                  >
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid grid-cols-3 mb-6 bg-gray-900/60">
                        <TabsTrigger
                          value="standings"
                          className="data-[state=active]:bg-amber-900/40 data-[state=active]:text-amber-100"
                        >
                          Predicted Standings
                        </TabsTrigger>
                        <TabsTrigger
                          value="matchups"
                          className="data-[state=active]:bg-amber-900/40 data-[state=active]:text-amber-100"
                        >
                          Key Matchups
                        </TabsTrigger>
                        <TabsTrigger
                          value="tiebreaks"
                          className="data-[state=active]:bg-amber-900/40 data-[state=active]:text-amber-100"
                        >
                          Tiebreak Scenarios
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="standings">
                        <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/10 rounded-lg p-6 border border-amber-800/30">
                          <h3 className="text-xl font-bold text-amber-100 mb-4">Predicted Tournament Standings</h3>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-amber-800/30">
                                  <th className="text-left py-2 px-2 text-sm font-medium text-amber-300">Rank</th>
                                  <th className="text-left py-2 px-2 text-sm font-medium text-amber-300">Player</th>
                                  <th className="text-center py-2 px-2 text-sm font-medium text-amber-300">Rating</th>
                                  <th className="text-center py-2 px-2 text-sm font-medium text-amber-300">
                                    Predicted Score
                                  </th>
                                  <th className="text-center py-2 px-2 text-sm font-medium text-amber-300">
                                    Win Probability
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {prediction.players.map((player, index) => (
                                  <tr key={index} className="border-b border-gray-800/50">
                                    <td className="py-3 px-2 text-sm">
                                      {index + 1}
                                      {player.medal && (
                                        <span className="ml-1">
                                          {player.medal === "gold" && "🥇"}
                                          {player.medal === "silver" && "🥈"}
                                          {player.medal === "bronze" && "🥉"}
                                        </span>
                                      )}
                                    </td>
                                    <td className="py-3 px-2 text-sm font-medium">{player.name}</td>
                                    <td className="py-3 px-2 text-sm text-center">{player.rating}</td>
                                    <td className="py-3 px-2 text-sm text-center font-mono">{player.predictedScore}</td>
                                    <td className="py-3 px-2 text-sm text-center">
                                      <div className="flex items-center justify-center gap-2">
                                        <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                                          <div
                                            className="h-full bg-amber-500"
                                            style={{ width: `${player.winProbability * 100}%` }}
                                          ></div>
                                        </div>
                                        <span>{(player.winProbability * 100).toFixed(0)}%</span>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="matchups">
                        <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/10 rounded-lg p-6 border border-amber-800/30">
                          <h3 className="text-xl font-bold text-amber-100 mb-4">Key Matchup Predictions</h3>
                          <div className="space-y-4">
                            {prediction.keyMatchups.map((matchup, index) => (
                              <div key={index} className="bg-gray-800/60 rounded-md p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <Users className="h-5 w-5 text-amber-400" />
                                    <div>
                                      <div className="font-medium">
                                        {matchup.player1} vs. {matchup.player2}
                                      </div>
                                    </div>
                                  </div>
                                  <Badge className="bg-amber-700/60">
                                    {(matchup.probability * 100).toFixed(0)}% confidence
                                  </Badge>
                                </div>
                                <div className="bg-gray-900/60 rounded p-2 text-center">
                                  <span className="font-medium text-amber-100">Prediction: {matchup.prediction}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="tiebreaks">
                        <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/10 rounded-lg p-6 border border-amber-800/30">
                          <h3 className="text-xl font-bold text-amber-100 mb-4">Tiebreak Scenarios</h3>
                          <div className="bg-gray-800/60 rounded-md p-4 mb-4">
                            <h4 className="text-sm font-medium text-amber-300 mb-2">Tiebreak Criteria</h4>
                            <p className="text-sm text-gray-300">{prediction.tiebreaks.description}</p>
                          </div>
                          <div className="bg-gray-800/60 rounded-md p-4">
                            <h4 className="text-sm font-medium text-amber-300 mb-2">Most Likely Tiebreak Scenario</h4>
                            <div className="flex items-center gap-2">
                              <Medal className="h-5 w-5 text-amber-400" />
                              <p className="text-sm text-gray-300">{prediction.tiebreaks.mostLikely}</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </motion.div>
                )}
              </div>

              <div className="space-y-6">
                <Card className="bg-gray-900/60 border-amber-800/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <Trophy className="mr-2 h-5 w-5 text-amber-400" />
                      How It Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-300 space-y-2">
                    <p>Our tournament forecaster uses advanced statistical models to predict:</p>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      <li>Final standings</li>
                      <li>Individual game outcomes</li>
                      <li>Win probabilities</li>
                      <li>Tiebreak scenarios</li>
                    </ul>
                    <p className="mt-2">
                      Predictions are based on player ratings, historical performance, and head-to-head records.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/60 border-amber-800/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <Info className="mr-2 h-5 w-5 text-amber-400" />
                      Input Format Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-300 space-y-2">
                    <p className="font-medium">Player Format:</p>
                    <p className="font-mono text-xs bg-gray-800 p-2 rounded">
                      Magnus Carlsen (2847)
                      <br />
                      Fabiano Caruana (2805)
                      <br />
                      Ding Liren (2799)
                    </p>

                    <p className="mt-2">Enter one player per line with their current rating in parentheses.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t border-amber-800/20 bg-gradient-to-r from-amber-900/40 to-amber-800/20 py-3 text-xs text-amber-300/60">
            <div className="flex items-center justify-between w-full">
              <div>Tournament Forecaster v1.0</div>
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

