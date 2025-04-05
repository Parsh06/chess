import { Link } from "react-router-dom"
import { CastleIcon, Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-amber-800/20 bg-black/80 backdrop-blur-sm py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <CastleIcon className="h-6 w-6 text-amber-400" />
              <span className="text-xl font-bold text-white">
                Chess<span className="text-amber-400">Predictor</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Advanced AI-powered chess analytics and prediction tools to enhance your game.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-amber-400">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-medium text-white mb-4">Prediction Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/predict/game" className="text-sm text-gray-400 hover:text-amber-400">
                  Game Outcome Predictor
                </Link>
              </li>
              <li>
                <Link to="/predict/moves" className="text-sm text-gray-400 hover:text-amber-400">
                  Next Move Predictor
                </Link>
              </li>
              <li>
                <Link to="/predict/opening" className="text-sm text-gray-400 hover:text-amber-400">
                  Opening Identifier
                </Link>
              </li>
              <li>
                <Link to="/predict/position" className="text-sm text-gray-400 hover:text-amber-400">
                  Position Analyzer
                </Link>
              </li>
              <li>
                <Link to="/predict/tournament" className="text-sm text-gray-400 hover:text-amber-400">
                  Tournament Forecaster
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-medium text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-amber-400">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-amber-400">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-amber-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-amber-400">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-amber-400">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-medium text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-amber-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-amber-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-amber-400">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-amber-400">
                  Licenses
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-800/20 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} ChessPredictor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

