"use client"

import { Slider } from "../components/ui/slider.jsx"
import { Label } from "../components/ui/label.jsx"
import { Switch } from "../components/ui/switch.jsx"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip.jsx"
import { Info, Clock } from "lucide-react"

export function GameSettingsForm({ formData, handleChange }) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-900/40 p-4 rounded-lg border border-amber-800/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-400" />
            <h3 className="text-lg font-medium">Time Controls</h3>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-amber-300/60 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>
                  Time controls determine how much time each player has to make their moves. Base time is the initial
                  time (in minutes) and increment is the additional time (in seconds) added after each move.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="base_time" className="text-sm">
                Base Time (minutes): {formData.base_time}
              </Label>
            </div>
            <Slider
              id="base_time"
              min={1}
              max={60}
              step={1}
              value={[Number.parseInt(formData.base_time)]}
              onValueChange={(value) => handleChange("base_time", value[0].toString())}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-amber-300/60">
              <span>Bullet (1)</span>
              <span>Blitz (5)</span>
              <span>Rapid (15)</span>
              <span>Classical (30+)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="increment" className="text-sm">
                Increment (seconds): {formData.increment}
              </Label>
            </div>
            <Slider
              id="increment"
              min={0}
              max={30}
              step={1}
              value={[Number.parseInt(formData.increment)]}
              onValueChange={(value) => handleChange("increment", value[0].toString())}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-amber-300/60">
              <span>None (0)</span>
              <span>Low (5)</span>
              <span>Medium (15)</span>
              <span>High (30)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/40 p-4 rounded-lg border border-amber-800/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Game Type</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-amber-300/60 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>
                  Rated games affect players' ratings, while casual games do not. Rated games are typically played more
                  seriously.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="rated"
            checked={formData.rated === "1"}
            onCheckedChange={(checked) => handleChange("rated", checked ? "1" : "0")}
          />
          <Label htmlFor="rated" className="text-sm">
            Rated Game
          </Label>
        </div>
      </div>

      <div className="bg-gray-900/40 p-4 rounded-lg border border-amber-800/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Game Length</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-amber-300/60 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>
                  The expected number of turns (half-moves) in the game. A typical chess game lasts around 40 turns,
                  with each player making about 20 moves.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="turns" className="text-sm">
              Expected Turns: {formData.turns}
            </Label>
          </div>
          <Slider
            id="turns"
            min={10}
            max={100}
            step={5}
            value={[Number.parseInt(formData.turns)]}
            onValueChange={(value) => handleChange("turns", value[0].toString())}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-amber-300/60">
            <span>Short (10)</span>
            <span>Average (40)</span>
            <span>Long (70)</span>
            <span>Marathon (100+)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

