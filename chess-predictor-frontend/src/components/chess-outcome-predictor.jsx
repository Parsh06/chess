"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Info,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  CastleIcon as ChessKnight,
  Clock,
  Award,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { Alert, AlertDescription } from "./ui/alert"
import { Badge } from "./ui/badge"
import { GameSettingsForm } from "./game-settings-form"
import { PlayerRatingsForm } from "./player-ratings-form"
import { OpeningDetailsForm } from "./opening-details-form"
import { PredictionResult } from "./prediction-result"
import { predictOutcome, convertECOToNumeric } from "../../lib/api"

const initialFormData = {
  rated: "1",
  turns: "40",
  opening_eco: "C00",
  opening_ply: "10",
  white_rating: "1500",
  black_rating: "1500",
  base_time: "10",
  increment: "5",
}

export function ChessOutcomePredictor() {
  const [formData, setFormData] = useState(initialFormData)
  const [prediction, setPrediction] = useState(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { id: 1, name: 'Game Settings' },
    { id: 2, name: 'Player Ratings' },
    { id: 3, name: 'Opening Details' },
  ]

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleReset = () => {
    setFormData(initialFormData)
    setPrediction(null)
    setError("")
    setCurrentStep(1)
  }

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length))
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")

    try {
      const payload = {
        rated: parseInt(formData.rated),
        turns: parseInt(formData.turns),
        opening_eco: convertECOToNumeric(formData.opening_eco),
        opening_ply: parseInt(formData.opening_ply),
        white_rating: parseInt(formData.white_rating),
        black_rating: parseInt(formData.black_rating),
        base_time: parseInt(formData.base_time),
        increment: parseInt(formData.increment)
      }

      const result = await predictOutcome(payload)
      
      if (result.error) throw new Error(result.error)
      if (!result.prediction) throw new Error("No prediction received from server")

      setPrediction(result.prediction)
      setCurrentStep(4)
    } catch (err) {
      console.error("Prediction error:", err)
      setError(err.message || "Failed to get prediction. Please try again.")
      setCurrentStep(4)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-2 border-amber-800/30 bg-black/60 backdrop-blur-sm text-white shadow-xl">
      <CardHeader className="border-b border-amber-800/20 bg-gradient-to-r from-amber-900/40 to-amber-800/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChessKnight className="h-8 w-8 text-amber-400" />
            <div>
              <CardTitle className="text-2xl font-bold text-amber-100">Chess Outcome Predictor</CardTitle>
              <CardDescription className="text-amber-300/80">
                Predict the outcome of a chess game in 3 simple steps
              </CardDescription>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReset}
                  className="border-amber-700/50 bg-black/30 hover:bg-amber-900/30 hover:text-amber-300"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset form</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-4">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-2">
              <div className={`h-2 w-8 rounded-full ${
                currentStep >= step.id ? 'bg-amber-400' : 'bg-amber-800/50'
              }`} />
              <span className={`text-sm ${
                currentStep === step.id ? 'text-amber-300' : 'text-amber-300/50'
              }`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: currentStep > 4 ? 0 : currentStep % 2 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: currentStep % 2 ? -50 : 50 }}
                transition={{ duration: 0.2 }}
              >
                {currentStep === 1 && (
                  <GameSettingsForm formData={formData} handleChange={handleChange} />
                )}
                {currentStep === 2 && (
                  <PlayerRatingsForm formData={formData} handleChange={handleChange} />
                )}
                {currentStep === 3 && (
                  <OpeningDetailsForm formData={formData} handleChange={handleChange} />
                )}
                {currentStep === 4 && <PredictionResult prediction={prediction} />}
              </motion.div>
            </AnimatePresence>

            {/* Error display in main content area when on step 4 */}
            {error && currentStep === 4 && (
              <Alert variant="destructive" className="mt-4 bg-red-900/30 border-red-800">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {currentStep <= 3 && (
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="gap-1 bg-amber-900/30 hover:bg-amber-800/40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                
                {currentStep < 3 ? (
                  <Button
                    onClick={handleNext}
                    className="gap-1 bg-amber-700 hover:bg-amber-600"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="gap-1 bg-amber-700 hover:bg-amber-600"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Predicting...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        Predict Outcome
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {currentStep !== 4 && (
              <>
                <Card className="bg-gray-900/60 border-amber-800/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <Info className="mr-2 h-5 w-5 text-amber-400" />
                      Step Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-300 space-y-2">
                    {currentStep === 1 && (
                      <p>Configure time controls and game type settings. These parameters affect how players approach the game.</p>
                    )}
                    {currentStep === 2 && (
                      <p>Set player ratings. The rating difference significantly impacts predicted outcomes.</p>
                    )}
                    {currentStep === 3 && (
                      <p>Select opening details. Different openings lead to different types of middle-game positions.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Error display in sidebar for steps 1-3 */}
                {error && (
                  <Alert variant="destructive" className="bg-red-900/30 border-red-800">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-amber-800/20 bg-gradient-to-r from-amber-900/40 to-amber-800/20 py-3 text-xs text-amber-300/60">
        <div className="flex items-center justify-between w-full">
          <div>Chess Outcome Predictor v2.0</div>
          <div className="flex items-center gap-2">
           
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
