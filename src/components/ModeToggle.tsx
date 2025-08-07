"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    // Auto-detectar tema del sistema
    if (!theme || theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setTheme(systemTheme)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="h-10 w-20 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse" />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-10 w-20 items-center rounded-full bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 dark:from-slate-800 dark:via-blue-950 dark:to-slate-900 p-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent hover:shadow-xl group border border-amber-200/50 dark:border-blue-800/30"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Efecto de brillo sutil */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/20 to-white/10 dark:via-white/5 dark:to-transparent" />
      
      {/* Slider mejorado */}
      <span
        className={`
          relative z-10 inline-block h-8 w-8 transform rounded-full
          bg-white dark:bg-gray-900
          shadow-lg transition-all duration-300 ease-out
          ring-1 ring-amber-100 dark:ring-blue-900
          ${isDark ? 'translate-x-10' : 'translate-x-0'}
          group-hover:scale-105
        `}
      >
        {/* Ícono dentro del slider */}
        <span className="absolute inset-0 flex items-center justify-center">
          {isDark ? (
            <Moon className="h-5 w-5 text-blue-500" />
          ) : (
            <Sun className="h-5 w-5 text-amber-500" />
          )}
        </span>
      </span>
      
      {/* Íconos de fondo mejorados */}
      <span className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
        <Sun className={`h-4 w-4 transition-all duration-300 ${
          isDark ? 'text-gray-500 opacity-30' : 'text-amber-400 opacity-0'
        }`} />
        <Moon className={`h-4 w-4 transition-all duration-300 ${
          isDark ? 'text-blue-400 opacity-0' : 'text-gray-500 opacity-30'
        }`} />
      </span>
    </button>
  )
}