export default function Watermark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      width="500"
      height="500"
      className="fixed left-0 top-1/2 -translate-y-1/2 z-[-1] pointer-events-none opacity-90"
    >
      <defs>
        <style>{`
          .watermark {
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
          }

          .gear-group {
            transform-origin: center;
            animation: continuousRotate 40s linear infinite;
          }

          .inner-element {
            animation: counterRotate 25s linear infinite;
            transform-origin: center;
          }

          .core-beam {
            fill: #ffffff;
            stroke: #00FFD1;
            stroke-width: 2;
            animation: beamPulse 5s ease-in-out infinite;
          }

          .accel-path {
            stroke: #FFD700;
            stroke-width: 2;
            stroke-dasharray: 40 100;
            animation: dashMove 1.5s linear infinite;
          }

          @keyframes continuousRotate {
            100% { transform: rotate(360deg); }
          }

          @keyframes counterRotate {
            100% { transform: rotate(-360deg); }
          }

          @keyframes beamPulse {
            0%, 100% { filter: blur(2px); stroke-opacity: 0.1; }
            50% { filter: blur(0px); stroke-opacity: 1; }
          }

          @keyframes dashMove {
            0% { stroke-dashoffset: 140; }
            100% { stroke-dashoffset: 0; }
          }
        `}</style>
      </defs>

      <g opacity="0.25" className="watermark">
        <path
          d="M250 50 L125 100 M250 50 L375 100 M375 100 L425 225 M125 100 L75 225 M75 225 L125 350 M425 225 L375 350 M375 350 L250 400 M125 350 L250 400"
          stroke="#333333"
          strokeWidth="1.5"
        />

        <g className="gear-group">
          <path
            d="M250 80 Q230 110, 200 120 L160 100 Q130 130, 140 160 L120 200 Q110 230, 140 250 M250 420 Q270 390, 300 380 L340 400 Q370 370, 360 340 L380 300 Q390 270, 360 250"
            stroke="#333333"
            strokeWidth="1"
          />

          <polygon
            points="250 150, 300 200, 250 250, 200 200"
            stroke="#555555"
            strokeWidth="0.5"
          />

          <g className="inner-element">
            <circle
              cx="250"
              cy="200"
              r="50"
              stroke="#555555"
              strokeWidth="0.5"
            />
            <polygon
              points="250 160, 280 200, 250 240, 220 200"
              stroke="#333333"
              strokeWidth="1"
            />
          </g>

          <path
            d="M100 200 C150 220, 200 220, 250 200"
            className="accel-path"
          />

          <path
            d="M400 200 C350 180, 300 180, 250 200"
            className="accel-path"
            style={{ animationDelay: "-0.75s" }}
          />
        </g>

        <g transform="translate(250, 200)">
          <rect
            x="-20"
            y="-20"
            width="40"
            height="40"
            rx="10"
            className="core-beam"
          />

          <circle cx="0" cy="0" r="10" fill="#ffffff" />

          <circle cx="0" cy="0" r="4" fill="#183153" />
        </g>
      </g>
    </svg>
  );
}
