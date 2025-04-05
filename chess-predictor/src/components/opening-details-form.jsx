"use client"
import { Label } from "../components/ui/label.jsx"
import { Slider } from "../components/ui/slider.jsx"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip.jsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.jsx"
import { Info, PianoIcon as ChessPawn } from "lucide-react"

// Common chess openings with their ECO codes
const commonOpenings = [
  { code: "A00", name: "Irregular Openings" },
  { code: "A04", name: "Reti Opening" },
  { code: "A10", name: "English Opening" },
  { code: "B00", name: "Uncommon King's Pawn Opening" },
  { code: "B20", name: "Sicilian Defense" },
  { code: "C00", name: "French Defense" },
  { code: "C10", name: "Caro-Kann Defense" },
  { code: "C40", name: "King's Knight Opening" },
  { code: "C50", name: "Italian Game" },
  { code: "C60", name: "Ruy Lopez (Spanish Opening)" },
  { code: "D00", name: "Queen's Pawn Game" },
  { code: "D30", name: "Queen's Gambit Declined" },
  { code: "E00", name: "Queen's Pawn Opening" },
  { code: "E60", name: "King's Indian Defense" },
]

export function OpeningDetailsForm({ formData, handleChange }) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-900/40 p-4 rounded-lg border border-amber-800/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ChessPawn className="h-5 w-5 text-amber-400" />
            <h3 className="text-lg font-medium">Opening Information</h3>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-amber-300/60 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>
                  Chess openings are classified by ECO codes (Encyclopedia of Chess Openings). The opening ply count
                  indicates how many half-moves were played in the opening phase.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="opening_eco" className="text-sm">
              Opening ECO Code
            </Label>
            <Select value={formData.opening_eco} onValueChange={(value) => handleChange("opening_eco", value)}>
              <SelectTrigger className="bg-gray-800 border-amber-800/30">
                <SelectValue placeholder="Select opening" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-amber-800/30">
                {commonOpenings.map((opening) => (
                  <SelectItem key={opening.code} value={opening.code}>
                    {opening.code} - {opening.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-amber-300/60 mt-1">ECO codes categorize chess openings (A00-E99)</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="opening_ply" className="text-sm">
                Opening Ply Count: {formData.opening_ply}
              </Label>
            </div>
            <Slider
              id="opening_ply"
              min={2}
              max={30}
              step={1}
              value={[Number.parseInt(formData.opening_ply)]}
              onValueChange={(value) => handleChange("opening_ply", value[0].toString())}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-amber-300/60">
              <span>Brief (2-5)</span>
              <span>Standard (10-15)</span>
              <span>Extended (20+)</span>
            </div>
            <p className="text-xs text-amber-300/60 mt-1">Number of half-moves played in the opening phase</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/40 p-4 rounded-lg border border-amber-800/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Opening Strategy</h3>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-300">{getOpeningDescription(formData.opening_eco)}</p>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-gray-800/60 p-2 rounded-md">
              <p className="text-xs text-amber-300/80 font-medium">White Strategy</p>
              <p className="text-xs text-gray-300 mt-1">{getWhiteStrategy(formData.opening_eco)}</p>
            </div>
            <div className="bg-gray-800/60 p-2 rounded-md">
              <p className="text-xs text-amber-300/80 font-medium">Black Strategy</p>
              <p className="text-xs text-gray-300 mt-1">{getBlackStrategy(formData.opening_eco)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getOpeningDescription(eco) {
  const prefix = eco.charAt(0)

  switch (prefix) {
    case "A":
      return "Flank openings like the English or Réti, where White develops without immediately occupying the center with pawns."
    case "B":
      return "Semi-open games, typically responses to 1.e4 other than 1...e5, such as the Sicilian or Caro-Kann Defense."
    case "C":
      return "Open games starting with 1.e4 e5, including the Italian Game, Ruy Lopez, and King's Gambit."
    case "D":
      return "Closed games and semi-closed games, typically starting with 1.d4 d5, including the Queen's Gambit."
    case "E":
      return "Indian defenses and other responses to 1.d4 where Black doesn't play 1...d5, such as the King's Indian."
    default:
      return "A standard chess opening that establishes control of the center and develops pieces."
  }
}

function getWhiteStrategy(eco) {
  const prefix = eco.charAt(0)

  switch (prefix) {
    case "A":
      return "Control the center indirectly and develop flexibly, often fianchettoing bishops."
    case "B":
      return "Establish a strong pawn center and develop pieces to control key squares."
    case "C":
      return "Rapid development, kingside castling, and direct attacks on the opponent's king."
    case "D":
      return "Build a strong pawn center and seek positional advantages through piece activity."
    case "E":
      return "Create a strong pawn center and develop pieces to control space and restrict opponent's options."
    default:
      return "Develop pieces harmoniously and control the center."
  }
}

function getBlackStrategy(eco) {
  const prefix = eco.charAt(0)

  switch (prefix) {
    case "A":
      return "Counter White's flank strategy with central control and active piece play."
    case "B":
      return "Create imbalances and counterattack White's center, often with asymmetrical pawn structures."
    case "C":
      return "Develop pieces actively and establish a solid position before launching counterplay."
    case "D":
      return "Maintain a solid pawn structure and seek piece activity for counterplay."
    case "E":
      return "Allow White to establish a pawn center, then attack it with pieces and pawn breaks."
    default:
      return "Develop pieces efficiently and contest central control."
  }
}

