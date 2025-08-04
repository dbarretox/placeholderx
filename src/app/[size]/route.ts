import { NextRequest } from "next/server"
import TextToSVG from "text-to-svg"
import path from "path"

const fontPath = path.resolve(process.cwd(), "public/fonts/Roboto-Regular.ttf");
const textToSVG = TextToSVG.loadSync(fontPath);

type Params = {
  params: Promise<{
    size: string
  }>
}

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  const { size } = await params; // Note: params is now a Promise
  const [width, height] = size.split("x").map(Number);

  if (!width || !height || width > 4000 || height > 4000 || width < 10 || height < 10) {
    return new Response("Invalid size", { status: 400 });
  }

  const text = `${width} × ${height}`;
  const fontSize = Math.floor(width / 10);

  const metrics = textToSVG.getMetrics(text, {
    fontSize,
    anchor: "center",
  });

  const svgPath = textToSVG.getD(text, {
    x: 0,
    y: 0,
    fontSize,
    anchor: "center",
  });

  const translateY = -metrics.y - metrics.height / 2;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="#d9d9d9"/>
      <g transform="translate(${width / 2}, ${height / 2 + translateY})">
        <path d="${svgPath}" fill="#888888" />
      </g>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}