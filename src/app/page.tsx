"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Sparkles, Zap, Image as ImageIcon, Download } from "lucide-react"
import { ModeToggle } from "@/components/ModeToggle"

export default function Home() {
  const [width, setWidth] = useState("600")
  const [height, setHeight] = useState("400")
  const [origin, setOrigin] = useState("")
  const [copied, setCopied] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const size = `${width}x${height}`
  const imageUrl = `/${size}`
  const fullUrl = origin ? `${origin}/${size}` : `/${size}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  };

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `placeholder-${size}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 2000)
  };

  const presets = [
    { label: "Square", width: "500", height: "500" },
    { label: "HD", width: "1920", height: "1080" },
    { label: "4K", width: "3840", height: "2160" },
    { label: "Mobile", width: "390", height: "844" },
    { label: "Tablet", width: "768", height: "1024" },
    { label: "Banner", width: "1200", height: "300" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-violet-100 to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-gray-900 dark:text-white transition-colors">
      {/* Mode Toggle positioned absolutely */}
      <div className="absolute top-4 right-4 z-20">
        <ModeToggle />
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239CA3AF%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative z-10 flex flex-col items-center px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl shadow-purple-500/20">
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Placeholder X
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-md mx-auto">
            Generate perfect placeholder images instantly. No signup, no limits, just simplicity.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Lightning Fast</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Free Forever</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="w-5 h-5 text-purple-500" />
            <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Any Size</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          {/* Controls */}
          <div className="order-last lg:order-first space-y-6">
            {/* Size Inputs */}
            <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-slate-700/50 shadow-xl">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>Custom Size</span>
                <span className="text-xs text-gray-500 dark:text-gray-500 font-normal">(10-4000px)</span>
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width" className="text-sm text-gray-700 dark:text-gray-300">Width</Label>
                  <Input
                    className="bg-gray-50 dark:bg-slate-900/50 border-gray-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500 transition-colors selection:bg-blue-500 selection:text-white"
                    id="width"
                    type="text"
                    value={width}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (parseInt(val) <= 4000 || val === "") {
                        setWidth(val);
                      }
                    }}
                    placeholder="600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-sm text-gray-700 dark:text-gray-300">Height</Label>
                  <Input
                    className="bg-gray-50 dark:bg-slate-900/50 border-gray-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-500 transition-colors selection:bg-blue-500 selection:text-white"
                    id="height"
                    type="text"
                    value={height}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (parseInt(val) <= 4000 || val === "") {
                        setHeight(val);
                      }
                    }}
                    placeholder="400"
                  />
                </div>
              </div>
            </div>

            {/* Presets */}
            <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-slate-700/50 shadow-xl">
              <h2 className="text-lg font-semibold mb-4">Quick Presets</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setWidth(preset.width);
                      setHeight(preset.height);
                    }}
                    className="bg-gray-50 dark:bg-slate-900/50 border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700/50 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200"
                  >
                    <span className="text-xs">{preset.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* URL Output */}
            <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-slate-700/50 shadow-xl">
              <h2 className="text-lg font-semibold mb-4">Your URL</h2>
              <div className="flex items-center gap-2">
                <code className="text-sm text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-slate-900/70 px-4 py-3 rounded-lg w-full overflow-x-auto font-mono border border-gray-200 dark:border-slate-700">
                  {fullUrl}
                </code>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  onClick={handleCopy}
                  className="shrink-0 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 border-gray-300 dark:border-slate-600"
                >
                  {copied ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </Button>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  onClick={handleDownload}
                  className="shrink-0 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 border-gray-300 dark:border-slate-600"
                  title="Download image"
                >
                  {downloaded ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Download size={16} />
                  )}
                </Button>
              </div>
              {copied && (
                <p className="text-xs text-green-500 mt-2 animate-in fade-in slide-in-from-top-1">
                  Copied to clipboard!
                </p>
              )}
              {downloaded && (
                <p className="text-xs text-green-500 mt-2 animate-in fade-in slide-in-from-top-1">
                  File Downloaded!
                </p>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="order-first lg:order-last flex items-center justify-center">
            <div className="relative w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-20"></div>
              <div className="relative bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-200 dark:border-slate-700/50 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Preview</h2>
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">{size}</span>
                </div>
                <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-slate-700/50">
                  <Image
                    src={imageUrl}
                    alt={`Placeholder ${size}`}
                    width={parseInt(width) || 600}
                    height={parseInt(height) || 400}
                    className="w-full h-auto max-h-[400px] object-contain"
                    unoptimized
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="w-full max-w-5xl mt-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <div className="bg-white/60 dark:bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-slate-700/50">
            <h2 className="text-2xl font-semibold mb-6 text-center">How to Use</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-500 font-bold">1</span>
                </div>
                <h3 className="font-medium">Set Dimensions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Choose custom size or use presets</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-500 font-bold">2</span>
                </div>
                <h3 className="font-medium">Copy URL ~ Download File</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Click to copy your link or Download file</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-500 font-bold">3</span>
                </div>
                <h3 className="font-medium">Use Anywhere</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Paste in HTML, Markdown, or designs</p>
              </div>
            </div>
            
            {/* Code Example */}
            <div className="mt-8 p-4 bg-gray-100 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700/50">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Example usage:</p>
              <code className="text-sm text-blue-600 dark:text-blue-400 font-mono">
                {`<img src="${origin || 'https://placeholderx.vercel.app'}/1200x600" alt="Placeholder" />`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}