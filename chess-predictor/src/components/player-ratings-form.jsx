"use client"

import { Slider } from "../components/ui/slider.jsx"
import { Label } from "../components/ui/label.jsx"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip.jsx"
import { Info, Award, CastleIcon as ChessKing, DiamondIcon as ChessQueen } from "lucide-react"

export function PlayerRatingsForm({ formData, handleChange }) {
  // Calculate rating difference
  const whiteRating = Number.parseInt(formData.white_rating)
  const blackRating = Number.parseInt(formData.black_rating)
  const ratingDiff = whiteRating - blackRating

  // Determine advantage text
  let advantageText = "Even match"
  let advantageColor = "text-amber-300"

  if (ratingDiff > 200) {
    advantageText = "White advantage"
    advantageColor = "text-white"
  } else if (ratingDiff < -200) {
    advantageText = "Black advantage"
    advantageColor = "text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/40 p-4 rounded-lg border border-amber-800/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-400" />
            <h3 className="text-lg font-medium">Player Ratings</h3>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-amber-300/60 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>
                  Chess ratings represent a player's skill level. The average club player is around 1500, beginners are
                  below 1000, and masters are above 2200.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ChessKing className="h-4 w-4 text-white" />
              <Label htmlFor="white_rating" className="text-sm">
                White Rating: {formData.white_rating}
              </Label>
            </div>
            <Slider
              id="white_rating"
              min={500}
              max={3000}
              step={50}
              value={[Number.parseInt(formData.white_rating)]}
              onValueChange={(value) => handleChange("white_rating", value[0].toString())}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-amber-300/60">
              <span>Beginner (500)</span>
              <span>Average (1500)</span>
              <span>Expert (2000)</span>
              <span>Master (2500+)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ChessQueen className="h-4 w-4 text-gray-800" />
              <Label htmlFor="black_rating" className="text-sm">
                Black Rating: {formData.black_rating}
              </Label>
            </div>
            <Slider
              id="black_rating"
              min={500}
              max={3000}
              step={50}
              value={[Number.parseInt(formData.black_rating)]}
              onValueChange={(value) => handleChange("black_rating", value[0].toString())}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-amber-300/60">
              <span>Beginner (500)</span>
              <span>Average (1500)</span>
              <span>Expert (2000)</span>
              <span>Master (2500+)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/40 p-4 rounded-lg border border-amber-800/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Rating Comparison</h3>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Rating Difference:</span>
            <span
              className={`font-medium ${ratingDiff > 0 ? "text-white" : ratingDiff < 0 ? "text-gray-800" : "text-amber-300"}`}
            >
              {ratingDiff > 0 ? "+" : ""}
              {ratingDiff}
            </span>
          </div>

          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${ratingDiff > 0 ? "bg-white" : "bg-gray-800"}`}
              style={{
                width: `${Math.min(Math.abs(ratingDiff) / 10, 100)}%`,
                marginLeft: ratingDiff >= 0 ? "50%" : `${50 - Math.min(Math.abs(ratingDiff) / 10, 50)}%`,
              }}
            />
          </div>

          <div className="flex justify-between text-xs">
            <span>Black Advantage</span>
            <span>Even</span>
            <span>White Advantage</span>
          </div>

          <div className="mt-4 text-center">
            <span className={`text-sm font-medium ${advantageColor}`}>{advantageText}</span>
          </div>
        </div>
      </div>
    </div>
  )
}