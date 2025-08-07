"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, ExternalLink, Heart, Sparkles } from "lucide-react"
import { ModeToggle } from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"

export function Footer() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Recuperar el estado guardado
    const saved = localStorage.getItem('footer-collapsed')
    if (saved === 'true') {
      setIsCollapsed(true)
    }
  }, [])

  const toggleCollapse = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem('footer-collapsed', newState.toString())
  }

  // No renderizar hasta que esté montado para evitar hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Botón flotante cuando está colapsado - Mejorado para desktop y mobile */}
      {isCollapsed && (
        <button
          onClick={toggleCollapse}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 backdrop-blur-sm border border-purple-200 dark:border-purple-900/50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          aria-label="Show credits"
        >
          <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Credits
          </span>
          <ChevronUp className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400 ml-1" />
        </button>
      )}

      {/* Panel principal - Mejorado para ser más compacto en mobile */}
      <div className={`
        fixed bottom-0 left-0 right-0 z-40
        transform transition-all duration-500 ease-out
        ${isCollapsed ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}
      `}>
        {/* Gradiente de fondo sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 dark:from-slate-950/30 to-transparent pointer-events-none" />
        
        {/* Contenedor del footer */}
        <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-slate-800/50">
          <div className="container mx-auto px-4 py-2 md:py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
              
              {/* Controles - Mejor disposición en mobile */}
              <div className="flex items-center gap-2 sm:gap-3">
                <ModeToggle />
                
              </div>

              {/* Credits - Optimizado para mobile */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <span className="text-gray-500 dark:text-gray-400 hidden sm:inline">Crafted with</span>
                <Heart className="h-3.5 w-3.5 text-red-500 animate-pulse" />
                <span className="text-gray-500 dark:text-gray-400">by</span>
                <a 
                  href="https://dbarreto.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                >
                  DBarreto Studio
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5" />
                </a>
                {/* Botón de minimizar - Más visible */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleCollapse}
                  className="h-8 px-2 sm:px-3 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200 group"
                  aria-label="Hide footer"
                >
                  <ChevronDown className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" />
                  <span className="ml-1 text-xs hidden sm:inline text-gray-500 dark:text-gray-400">Hide</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}