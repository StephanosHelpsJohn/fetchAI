"use client";

import {
  PUPPY_PIXELS,
  PUPPY_TAIL,
  COLORS,
  type PixelKey,
} from "@/lib/retriever-art";
import {
  TENNIS_BALL,
  RUNNING_DOG,
  FIELD_GRASS,
  SCENE_W,
  SCENE_H,
} from "@/lib/fetch-art";

const PIXEL = 4;

function Pixels({
  data,
  ox = 0,
  oy = 0,
  className,
}: {
  data: Array<[number, number, PixelKey]>;
  ox?: number;
  oy?: number;
  className?: string;
}) {
  return (
    <g className={className}>
      {data.map(([x, y, key], i) => (
        <rect
          key={i}
          x={ox + x * PIXEL}
          y={oy + y * PIXEL}
          width={PIXEL}
          height={PIXEL}
          fill={COLORS[key]}
        />
      ))}
    </g>
  );
}

export function FetchLoadingScene({ durationSec = 7 }: { durationSec?: number }) {
  const w = SCENE_W * PIXEL;
  const h = SCENE_H * PIXEL;

  return (
    <div
      className="relative w-full"
      style={{ "--fetch-duration": `${durationSec}s` } as React.CSSProperties}
      aria-hidden
    >
      <svg
        width="100%"
        viewBox={`0 0 ${w} ${h}`}
        className="overflow-visible"
        shapeRendering="crispEdges"
        role="img"
        aria-label="Golden retriever puppy playing fetch"
      >
        <rect x={0} y={0} width={w} height={h - PIXEL * 4} fill="#080c1c" />

        {/* Neon horizon */}
        <line
          x1={0}
          y1={h - PIXEL * 4}
          x2={w}
          y2={h - PIXEL * 4}
          stroke="rgba(34,211,238,0.3)"
          strokeWidth="1"
        />

        <Pixels data={FIELD_GRASS} oy={0} />

        <g className="fetch-speed-lines" stroke="#22d3ee" opacity="0.5">
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              x1={PIXEL * 8}
              y1={PIXEL * 18 + i * 8}
              x2={PIXEL * 22}
              y2={PIXEL * 18 + i * 8}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ))}
        </g>

        <g className="fetch-ball">
          <Pixels data={TENNIS_BALL} />
        </g>

        <g className="fetch-ball-caught">
          <Pixels data={TENNIS_BALL} />
        </g>

        <g className="fetch-dog-sitting">
          <g className="fetch-tail-sit">
            <Pixels data={PUPPY_TAIL} ox={PIXEL * 2} oy={PIXEL * 2} />
          </g>
          <Pixels data={PUPPY_PIXELS} ox={PIXEL * 2} oy={0} />
        </g>

        <g className="fetch-dog-running">
          <Pixels data={RUNNING_DOG} ox={0} oy={PIXEL * 2} />
        </g>

        <g className="fetch-dust">
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={PIXEL * 58 + i * 6}
              cy={PIXEL * 24}
              r={3 - i * 0.5}
              fill="#22d3ee"
              opacity={0.4}
            />
          ))}
        </g>
      </svg>

      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-cyan-400/60">
        Fetch.exe running
      </p>
    </div>
  );
}
