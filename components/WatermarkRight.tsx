export default function WatermarkRight() {
  return (
    <svg
      viewBox="0 0 500 500"
      width="420"
      height="420"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[-1] pointer-events-none opacity-90"
    >
      <defs>
        <style>{`
          .node {
            fill: #d1752a;
            animation: pulse 4s ease-in-out infinite;
          }

          .node-alt {
            fill: #183153;
            opacity: .5;
            animation: pulse 5s ease-in-out infinite;
          }

          .connection {
            stroke: #000000;
            stroke-width: 1.2;
            stroke-dasharray: 8 6;
            animation: flow 6s linear infinite;
            opacity: .4;
          }

          @keyframes pulse {
            0%,100% { transform: scale(1); opacity:.4 }
            50% { transform: scale(1.4); opacity:.9 }
          }

          @keyframes flow {
            0% { stroke-dashoffset: 100 }
            100% { stroke-dashoffset: 0 }
          }
        `}</style>
      </defs>

      {/* connection lines */}
      <line x1="120" y1="120" x2="250" y2="200" className="connection" />
      <line x1="250" y1="200" x2="380" y2="120" className="connection" />
      <line x1="250" y1="200" x2="150" y2="320" className="connection" />
      <line x1="250" y1="200" x2="380" y2="320" className="connection" />
      <line x1="120" y1="120" x2="150" y2="320" className="connection" />

      {/* nodes */}
      <circle cx="120" cy="120" r="10" className="node" />
      <circle cx="380" cy="120" r="10" className="node-alt" />
      <circle cx="250" cy="200" r="14" className="node" />
      <circle cx="150" cy="320" r="10" className="node-alt" />
      <circle cx="380" cy="320" r="10" className="node" />
    </svg>
  );
}
