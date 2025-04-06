"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ChevronLeft, Sparkles, RefreshCw, Zap, BarChart3, Info, Upload } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { analyzePosition } from "../../lib/api"

export default function PositionAnalysisPage() {
  const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("fen")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await analyzePosition(fen)

      if (result.error) {
        throw new Error(result.error)
      }

      setAnalysis(result)
    } catch (err) {
      console.error("Position analysis error:", err)
      setError(err.message || "Failed to analyze position. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    setAnalysis(null)
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
              <Sparkles className="h-8 w-8 text-amber-400" />
              <div>
                <CardTitle className="text-2xl font-bold text-amber-100">Position Analyzer</CardTitle>
                <CardDescription className="text-amber-300/80">
                  Analyze chess positions for advantages and opportunities
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
                      value="fen"
                      className="data-[state=active]:bg-amber-900/40 data-[state=active]:text-amber-100"
                    >
                      FEN Position
                    </TabsTrigger>
                    <TabsTrigger
                      value="upload"
                      className="data-[state=active]:bg-amber-900/40 data-[state=active]:text-amber-100"
                    >
                      Upload Image
                    </TabsTrigger>
                  </TabsList>

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

                  <TabsContent value="upload">
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-amber-800/30 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-300 mb-4">Upload an image of a chess board to analyze</p>
                        <Button className="bg-amber-700 hover:bg-amber-600 text-yellow-400">Select Image</Button>
                        <p className="text-xs text-amber-300/60 mt-4">Supported formats: PNG, JPG, JPEG (Max 5MB)</p>
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
                        Analyze Position
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

                {analysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8"
                  >
                    <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/10 rounded-lg p-6 border border-amber-800/30">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-amber-100">Position Analysis</h3>
                        <div
                          className={`text-lg font-mono font-bold ${analysis.evaluation > 0.5 ? "text-green-400" : analysis.evaluation < -0.5 ? "text-red-400" : "text-amber-400"}`}
                        >
                          {analysis.evaluation > 0 ? "+" : ""}
                          {analysis.evaluation.toFixed(2)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="text-sm font-medium text-amber-300 mb-3">Material Balance</h4>
                          <div className="bg-gray-800/60 rounded-md p-3">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm">White</span>
                              <span className="text-sm font-medium">{analysis.material.white}</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                              <div
                                className="h-full bg-white"
                                style={{
                                  width: `${(analysis.material.white / (analysis.material.white + analysis.material.black)) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Black</span>
                              <span className="text-sm font-medium">{analysis.material.black}</span>
                            </div>
                            <div className="mt-2 text-center">
                              <Badge className="bg-amber-700/60">{analysis.material.advantage}</Badge>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-amber-300 mb-3">Position Assessment</h4>
                          <div className="bg-gray-800/60 rounded-md p-3 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Center Control</span>
                              <span className="text-sm font-medium">{analysis.position.center}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Piece Activity</span>
                              <span className="text-sm font-medium">{analysis.position.activity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Space Control</span>
                              <span className="text-sm font-medium">{analysis.position.space}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">King Safety (White)</span>
                              <span className="text-sm font-medium">{analysis.position.kingsSafety.white}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">King Safety (Black)</span>
                              <span className="text-sm font-medium">{analysis.position.kingsSafety.black}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-amber-300 mb-3">Best Moves</h4>
                        <div className="space-y-2">
                          {analysis.bestMoves.map((move, index) => (
                            <div
                              key={index}
                              className="bg-gray-800/60 rounded-md p-3 flex justify-between items-center"
                            >
                              <div>
                                <span className="font-mono text-lg font-bold text-white">{move.move}</span>
                                <p className="text-sm text-gray-300 mt-1">{move.description}</p>
                              </div>
                              <div
                                className={`text-sm font-mono ${move.evaluation > 0 ? "text-green-400" : move.evaluation < 0 ? "text-red-400" : "text-gray-300"}`}
                              >
                                {move.evaluation > 0 ? "+" : ""}
                                {move.evaluation.toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {analysis.threats.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-amber-300 mb-3">Threats & Tactics</h4>
                          <div className="bg-gray-800/60 rounded-md p-3">
                            <ul className="space-y-2">
                              {analysis.threats.map((threat, index) => (
                                <li key={index} className="text-sm">
                                  <span className="text-red-400">•</span> {threat}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {analysis.weaknesses.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-amber-300 mb-3">Weaknesses</h4>
                          <div className="bg-gray-800/60 rounded-md p-3">
                            <ul className="space-y-2">
                              {analysis.weaknesses.map((weakness, index) => (
                                <li key={index} className="text-sm">
                                  <span className="text-amber-400">•</span> {weakness}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="space-y-6">
                <Card className="bg-gray-900/60 border-amber-800/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5 text-amber-400" />
                      Evaluation Scale
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-300 space-y-3">
                    <div className="flex justify-between items-center">
                      <span>+3.0 and above</span>
                      <Badge className="bg-green-600">Winning for White</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>+1.5 to +3.0</span>
                      <Badge className="bg-green-500/80">Clear Advantage</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>+0.5 to +1.5</span>
                      <Badge className="bg-green-400/80">Slight Advantage</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>-0.5 to +0.5</span>
                      <Badge className="bg-amber-500">Equal Position</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>-1.5 to -0.5</span>
                      <Badge className="bg-red-400/80">Slight Advantage</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>-3.0 to -1.5</span>
                      <Badge className="bg-red-500/80">Clear Advantage</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>-3.0 and below</span>
                      <Badge className="bg-red-600">Winning for Black</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/60 border-amber-800/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <Info className="mr-2 h-5 w-5 text-amber-400" />
                      FEN Format Example
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-300">
                    <p className="font-mono text-xs bg-gray-800 p-2 rounded break-all mb-2">
                      rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
                    </p>
                    <p>
                      This is the starting position. FEN notation describes the board position, active color, castling
                      availability, en passant target, halfmove clock, and fullmove number.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t border-amber-800/20 bg-gradient-to-r from-amber-900/40 to-amber-800/20 py-3 text-xs text-amber-300/60">
            <div className="flex items-center justify-between w-full">
              <div>Position Analyzer v1.0</div>
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

