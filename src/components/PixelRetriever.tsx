"use client";

type PixelRetrieverProps = {
  variant?: "idle" | "sniffing";
  size?: "sm" | "lg";
  className?: string;
};

const C = {
  gold: "#E8B84A",
  goldDark: "#C8942E",
  goldLight: "#F5D078",
  cream: "#FFF3D4",
  nose: "#3D2314",
  eye: "#1A0F0A",
  tongue: "#E87070",
  hat: "#4A6741",
  hatBand: "#8B6914",
  lanyard: "#E85D3A",
  lanyardBadge: "#5BA4CF",
  white: "#FFFFFF",
  shadow: "#A07830",
  trail: "#7EC8E3",
  transparent: "transparent",
} as const;

type Color = (typeof C)[keyof typeof C];

const PALETTE: Record<string, Color> = {
  ".": C.transparent,
  G: C.gold,
  g: C.goldDark,
  L: C.goldLight,
  C: C.cream,
  N: C.nose,
  E: C.eye,
  T: C.tongue,
  H: C.hat,
  B: C.hatBand,
  R: C.lanyard,
  W: C.white,
  S: C.shadow,
  D: C.lanyardBadge,
};

const DOG_ART = `
................................
........HHHHHHHHHH..............
.......HHHHHHHHHHHH.............
......HHHHHHHHHHHHHH............
.....HHHHHHHHHHHHHHHH...........
....GGGGGGGGGGGGGGGGGG..........
...GGGGLGGGGGGGGLGGGGG..........
..GGGGGGGGGGGGGGGGGGGGG.........
.GGGGGGGEEEGGGEEEGGGGGGG........
GGGGGGGGNNNNNNNGGGGGGGGGG.......
GGGGGGGGTTTTTTTGGGGGGGGGGG......
GGGGGGGGGGGGGGGGGGGGGGGGGG......
GGGGGGGGCCCCCCCGGGGGGGGGGG......
GGGGGGGGGGGGGGGGGGGGGGGGGG......
.GGGGGGGGGGGGGGGGGGGGGGGG.......
..GGGGGGGGGGGGGGGGGGGGGG........
...GGGGGGGGGGGGGGGGGGGG.........
....GGGGSSSSSSSSGGGGGGG.........
.....GGGGGGGGGGGGGGGGG..........
......GGGGGGGGGGGGGGG...........
.......gGGGGGGGGGGGg............
........gGGGGGGGGGg.............
.........gGGGGGGg...............
..........gGGGg.................
...........ggg..................
.............RRR................
............RDDDR...............
.............RRR................
................................
................................
................................
................................
`.trim().split("\n");

const TAIL_ART = `
..
GG
GG
gG
`.trim().split("\n");

function renderGrid(
  grid: string[],
  pixelSize: number,
  offsetX = 0,
  offsetY = 0,
  className?: string,
) {
  return (
    <g className={className} transform={`translate(${offsetX}, ${offsetY})`}>
      {grid.map((row, y) =>
        row.split("").map((char, x) => {
          const fill = PALETTE[char];
          if (!fill || fill === C.transparent) return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x * pixelSize}
              y={y * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill={fill}
            />
          );
        }),
      )}
    </g>
  );
}

export function PixelRetriever({
  variant = "idle",
  size = "lg",
  className = "",
}: PixelRetrieverProps) {
  const pixelSize = size === "lg" ? 6 : 4;
  const width = 32 * pixelSize;
  const height = 32 * pixelSize;
  const isSniffing = variant === "sniffing";

  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        width={width + 40}
        height={height + 20}
        viewBox={`0 0 ${width + 40} ${height + 20}`}
        className="overflow-visible"
        aria-label="SNES pixel art Golden Retriever mascot with detective hat and event lanyard"
        role="img"
      >
        {isSniffing && (
          <g className="animate-pulse">
            {[0, 1, 2, 3, 4].map((i) => (
              <circle
                key={i}
                cx={width + 10 - i * 14}
                cy={height / 2 + Math.sin(i) * 8}
                r={3 + (i % 2)}
                fill={C.trail}
                opacity={0.7 - i * 0.12}
                className="animate-sniff-trail"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
            <path
              d={`M ${width + 5} ${height / 2} Q ${width - 20} ${height / 2 - 15} ${width - 50} ${height / 2 + 5}`}
              fill="none"
              stroke={C.trail}
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.5"
              className="animate-dash"
            />
          </g>
        )}

        <g
          className={isSniffing ? "animate-tail-wag-fast" : "animate-tail-wag"}
          style={{ transformOrigin: `${8 * pixelSize}px ${22 * pixelSize}px` }}
        >
          {renderGrid(TAIL_ART, pixelSize, 2 * pixelSize, 20 * pixelSize)}
        </g>

        <g
          className={isSniffing ? "animate-sniff-bob" : ""}
          style={{ transformOrigin: `${16 * pixelSize}px ${16 * pixelSize}px` }}
        >
          {renderGrid(DOG_ART, pixelSize, 10, isSniffing ? 8 : 4)}
        </g>

        {!isSniffing && (
          <>
            <text
              x={width + 5}
              y={12}
              fontSize="14"
              className="animate-sparkle"
              style={{ animationDelay: "0s" }}
            >
              ✨
            </text>
            <text
              x={5}
              y={20}
              fontSize="10"
              className="animate-sparkle"
              style={{ animationDelay: "0.8s" }}
            >
              ✨
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
