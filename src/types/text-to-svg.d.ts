declare module "text-to-svg" {
  interface Options {
    x?: number
    y?: number
    fontSize?: number
    anchor?: "top" | "top-left" | "top-right" | "left" | "center" | "right" | "bottom" | "bottom-left" | "bottom-right"
    attributes?: { [key: string]: string }
  }

  class TextToSVG {
    static loadSync(fontPath: string): TextToSVG

    getSVG(text: string, options?: Options): string
    getD(text: string, options?: Options): string
    getMetrics(text: string, options?: Options): {
      x: number
      y: number
      baseline: number
      width: number
      height: number
      ascender: number
      descender: number
    }
  }

  export = TextToSVG
}
