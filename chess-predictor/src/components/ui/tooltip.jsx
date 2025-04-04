"use client"

import React, { createContext, useState, useContext } from "react"
import { cn } from "../../../lib/utils"

const TooltipContext = createContext({})

const TooltipProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  return (
    <TooltipContext.Provider value={{ open, setOpen, content, setContent, position, setPosition }}>
      {children}
    </TooltipContext.Provider>
  )
}

const Tooltip = ({ children }) => {
  return <>{children}</>
}

const TooltipTrigger = React.forwardRef(({ asChild = false, children, ...props }, ref) => {
  const { setOpen, setPosition } = useContext(TooltipContext)

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + window.scrollY,
    })
    setOpen(true)
  }

  const handleMouseLeave = () => {
    setOpen(false)
  }

  const Comp = asChild ? (
    React.cloneElement(children, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      ref,
      ...props,
    })
  ) : (
    <span ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
      {children}
    </span>
  )

  return Comp
})
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef(({ className, ...props }, ref) => {
  const { open, position } = useContext(TooltipContext)

  if (!open) return null

  return (
    <div
      ref={ref}
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y + 10}px`,
        transform: "translateX(-50%)",
      }}
      {...props}
    />
  )
})
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

