"use client"

import React, { useState, useRef, useEffect } from "react"
import { cn } from "../../../lib/utils"

const Slider = React.forwardRef(
  ({ className, min = 0, max = 100, step = 1, value = [0], onValueChange, ...props }, ref) => {
    const [localValue, setLocalValue] = useState(value)
    const trackRef = useRef(null)
    const thumbRef = useRef(null)
    const isDragging = useRef(false)

    useEffect(() => {
      setLocalValue(value)
    }, [value])

    const getPercentage = (value) => {
      return ((value - min) / (max - min)) * 100
    }

    const handleTrackClick = (e) => {
      if (!trackRef.current) return

      const rect = trackRef.current.getBoundingClientRect()
      const percentage = (e.clientX - rect.left) / rect.width
      const newValue = Math.round((percentage * (max - min) + min) / step) * step
      const clampedValue = Math.max(min, Math.min(max, newValue))

      const newValues = [clampedValue]
      setLocalValue(newValues)
      if (onValueChange) onValueChange(newValues)
    }

    const handleThumbMouseDown = () => {
      isDragging.current = true

      const handleMouseMove = (e) => {
        if (!isDragging.current || !trackRef.current) return

        const rect = trackRef.current.getBoundingClientRect()
        const percentage = (e.clientX - rect.left) / rect.width
        const newValue = Math.round((percentage * (max - min) + min) / step) * step
        const clampedValue = Math.max(min, Math.min(max, newValue))

        const newValues = [clampedValue]
        setLocalValue(newValues)
        if (onValueChange) onValueChange(newValues)
      }

      const handleMouseUp = () => {
        isDragging.current = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return (
      <div ref={ref} className={cn("relative flex w-full touch-none select-none items-center", className)} {...props}>
        <div
          ref={trackRef}
          className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
          onClick={handleTrackClick}
        >
          <div className="absolute h-full bg-primary" style={{ width: `${getPercentage(localValue[0])}%` }} />
        </div>
        <div
          ref={thumbRef}
          className="absolute left-0 h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          style={{ left: `calc(${getPercentage(localValue[0])}% - 0.5rem)` }}
          onMouseDown={handleThumbMouseDown}
        />
      </div>
    )
  },
)
Slider.displayName = "Slider"

export { Slider }

