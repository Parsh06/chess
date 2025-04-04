"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { cn } from "../../../lib/utils"

const TabsContext = createContext({})

const Tabs = ({ value, onValueChange, children, className, ...props }) => {
  const [activeTab, setActiveTab] = useState(value)

  useEffect(() => {
    setActiveTab(value)
  }, [value])

  const handleTabChange = (newValue) => {
    setActiveTab(newValue)
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  return (
    <TabsContext.Provider value={{ activeTab, handleTabChange }}>
      <div className={cn("", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef(({ className, value, ...props }, ref) => {
  const { activeTab, handleTabChange } = useContext(TabsContext)
  const isActive = activeTab === value

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive ? "bg-background text-foreground shadow-sm" : "hover:bg-muted hover:text-foreground",
        className,
      )}
      onClick={() => handleTabChange(value)}
      data-state={isActive ? "active" : "inactive"}
      {...props}
    />
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef(({ className, value, ...props }, ref) => {
  const { activeTab } = useContext(TabsContext)
  const isActive = activeTab === value

  if (!isActive) return null

  return (
    <div
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      data-state={isActive ? "active" : "inactive"}
      {...props}
    />
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }

