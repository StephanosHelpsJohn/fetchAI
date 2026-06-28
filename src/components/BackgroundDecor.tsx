export function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {/* Deep space base */}
      <div className="absolute inset-0 bg-[#050510]" />

      {/* Aurora gradients */}
      <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[120px] animate-float-slow" />
      <div className="absolute -right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-violet-600/12 blur-[100px] animate-float-medium" />
      <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-amber-500/8 blur-[80px] animate-float-slow" style={{ animationDelay: "3s" }} />

      {/* Perspective grid floor */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, transparent 30%, black 70%)",
        }}
      />

      {/* Dot matrix */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #22d3ee 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Scan line */}
      <div className="absolute inset-0 animate-scan-line bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent" />

      {/* Horizon glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
    </div>
  );
}
