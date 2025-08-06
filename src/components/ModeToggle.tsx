"use client"

import * as React from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <ToggleGroup 
      type="single" 
      value={theme} 
      onValueChange={(value) => value && setTheme(value)}
      className="inline-flex h-10 items-center gap-1 rounded-lg bg-muted/30 p-1 text-muted-foreground"
    >
      <ToggleGroupItem 
        value="dark" 
        aria-label="Toggle dark mode"
        className="h-8 w-8 rounded-lg p-0"
      >
        <Moon className="h-4 w-4" />
      </ToggleGroupItem>
      
      <ToggleGroupItem 
        value="system" 
        aria-label="Toggle system mode"
        className="h-8 w-8 rounded-lg p-0"
      >
        <Monitor className="h-4 w-4" />
      </ToggleGroupItem>

      <ToggleGroupItem 
        value="light" 
        aria-label="Toggle light mode"
        className="h-8 w-8 rounded-lg p-0"
      >
        <Sun className="h-4 w-4" />
      </ToggleGroupItem>
      
    </ToggleGroup>
  )
}