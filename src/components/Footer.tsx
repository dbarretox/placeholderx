"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles } from "lucide-react"
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
      setIsCollapsed(false)
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
      {/* Botón flotante cuando está colapsado */}
      {isCollapsed && (
        <button
          onClick={toggleCollapse}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 px-3 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-gray-200 dark:border-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          aria-label="Show footer"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <Sparkles className="h-3 w-3 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-300 whitespace-nowrap">
            Credits
          </span>
        </button>
      )}

      {/* Panel principal */}
      <div className={`
        fixed bottom-0 left-0 right-0 z-40
        transform transition-all duration-500 ease-out
        ${isCollapsed ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}
      `}>
        {/* Gradiente de fondo sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-slate-950/50 to-transparent pointer-events-none" />
        
        {/* Contenedor del footer */}
        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-gray-200/50 dark:border-slate-800/50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Lado izquierdo - Credits */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400">Crafted with</span>
                <span className="text-red-500 animate-pulse">♥</span>
                <span className="text-gray-500 dark:text-gray-400">by</span>
                <a 
                  href="https://dbarreto.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                >
                  DBarreto Studio
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* Lado derecho - Controles */}
              <div className="flex items-center gap-3">
                <ModeToggle />
                
                {/* Botón de minimizar */}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleCollapse}
                  className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Hide footer"
                >
                  <ChevronRight className="h-4 w-4 rotate-90" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}