"use client";

import {
  PUPPY_PIXELS,
  PUPPY_TAIL,
  HOLO_PLATFORM,
  COLORS,
  GRID_W,
  GRID_H,
} from "@/lib/retriever-art";

type PixelRetrieverProps = {
  variant?: "idle" | "sniffing" | "happy";
  size?: "sm" | "md" | "lg";
  className?: string;
  showPlatform?: boolean;
};

const SIZE_MAP = { sm: 3, md: 5, lg: 7 } as const;

function renderPixels(
  pixels: Array<[number, number, keyof typeof COLORS]>,
  pixelSize: number,
  offsetX: number,
  offsetY: number,
  className?: string,
) {
  return (
    <g className={className}>
      {pixels.map(([x, y, key], i) => (
        <rect
          key={`${className ?? "p"}-${i}`}
          x={offsetX + x * pixelSize}
          y={offsetY + y * pixelSize}
          width={pixelSize}
          height={pixelSize}
          fill={COLORS[key]}
        />
      ))}
    </g>
  );
}

export function PixelRetriever({
  variant = "idle",
  size = "lg",
  className = "",
  showPlatform = false,
}: PixelRetrieverProps) {
  const pixelSize = SIZE_MAP[size];
  const width = GRID_W * pixelSize;
  const height = GRID_H * pixelSize;
  const isSniffing = variant === "sniffing";
  const isHappy = variant === "happy" || variant === "idle";
  const bounce = isSniffing ? 3 : 0;
  const offsetX = 4;

  return (
    <div className={`relative inline-block ${className}`}>
      {showPlatform && (
        <>
          <div
            className="absolute bottom-0 left-1/2 h-8 w-[90%] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-xl"
            aria-hidden
          />
          <div
            className="absolute bottom-2 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
            aria-hidden
          />
        </>
      )}

      <svg
        width={width + 24}
        height={height + (showPlatform ? 16 : 8)}
        viewBox={`0 0 ${width + 24} ${height + (showPlatform ? 16 : 8)}`}
        className="overflow-visible drop-shadow-[0_0_12px_rgba(34,211,238,0.25)]"
        shapeRendering="crispEdges"
        aria-label="Happy golden retriever puppy mascot"
        role="img"
      >
        <defs>
          <filter id="puppy-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {showPlatform &&
          renderPixels(
            HOLO_PLATFORM,
            pixelSize,
            offsetX,
            height - pixelSize * 3,
          )}

        {isSniffing && (
          <g opacity="0.8">
            {[0, 1, 2, 3].map((i) => (
              <circle
                key={i}
                cx={offsetX + (32 + i * 8) * (pixelSize / 7)}
                cy={offsetX + (8 + i * 2) * (pixelSize / 7)}
                r={2}
                fill="#22d3ee"
                className="animate-sniff-trail"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </g>
        )}

        <g
          className={isSniffing ? "animate-tail-wag-fast" : "animate-tail-wag"}
          style={{
            transformOrigin: `${offsetX + 8 * pixelSize}px ${offsetX + 16 * pixelSize}px`,
          }}
        >
          {renderPixels(PUPPY_TAIL, pixelSize, offsetX, 2 + bounce)}
        </g>

        <g
          filter="url(#puppy-glow)"
          className={
            isSniffing
              ? "animate-sniff-bob"
              : isHappy
                ? "animate-puppy-bounce"
                : ""
          }
          style={{
            transformOrigin: `${offsetX + 19 * pixelSize}px ${offsetX + 14 * pixelSize}px`,
          }}
        >
          {renderPixels(PUPPY_PIXELS, pixelSize, offsetX, bounce)}
        </g>

        {isHappy && !isSniffing && (
          <>
            <text
              x={offsetX + 32 * pixelSize}
              y={2 * pixelSize}
              fontSize={pixelSize * 1.8}
              fill="#22d3ee"
              className="animate-sparkle"
            >
              ✦
            </text>
            <text
              x={offsetX}
              y={10 * pixelSize}
              fontSize={pixelSize * 1.2}
              fill="#a78bfa"
              className="animate-sparkle"
              style={{ animationDelay: "0.7s" }}
            >
              ♥
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
