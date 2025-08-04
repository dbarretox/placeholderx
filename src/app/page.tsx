"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";

export default function Home() {
  const [width, setWidth] = useState("600");
  const [height, setHeight] = useState("400");

  const size = `${width}x${height}`;
  const imageUrl = `/${size}`;
  const fullUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/${size}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-start py-16 px-4">
      <h1 className="text-5xl font-bold mb-2">Placeholder X</h1>
      <p className="text-gray-300 text-sm mb-8">A simple, fast and free image placeholder service.</p>

      <div className="w-full max-w-md space-y-4 text-left">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="inline-flex gap-2"><Label htmlFor="width">Width</Label><p className="opacity-50 text-sm">max: 4000</p></div>
            <Input
              className="selection:bg-slate-300 selection:text-black"
              id="width"
              type="text"
              value={width}
              onChange={(e) => setWidth(e.target.value.replace(/\D/g, ""))}
              placeholder="600"
            />
            
          </div>
          <div>
            <div className="inline-flex gap-2"><Label htmlFor="height">Height</Label><p className="opacity-50 text-sm">max: 4000</p></div>
            <Input
              className="selection:bg-slate-300 selection:text-black"
              id="height"
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value.replace(/|D/g, ""))}
              placeholder="400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <code className="text-sm text-slate-300 bg-slate-800 px-2 py-1 rounded w-full overflow-x-auto">
            {fullUrl}
          </code>
          <Button size="icon" variant="secondary" onClick={handleCopy}>
            <Copy size={16} />
          </Button>
        </div>
      </div>

      <img
        src={imageUrl}
        alt={`Placeholder ${size}`}
        className="bg-white rounded-md border shadow mt-6 max-w-full"
      />

    </main>
  );
}
