import { useState } from 'react'

export default function QuestionBlockLogo({ size = 120 }) {
  const [hovered, setHovered] = useState(false)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role="img"
      aria-label="Game Apps logo"
      style={{
        transition: 'transform 0.15s ease, filter 0.15s ease',
        transform: hovered ? 'translateY(-6px) scale(1.05)' : 'translateY(0) scale(1)',
        filter: hovered
          ? 'drop-shadow(4px 8px 6px rgba(74,40,0,0.5))'
          : 'drop-shadow(3px 5px 4px rgba(74,40,0,0.35))',
        cursor: 'pointer',
        display: 'block',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <defs>
        <linearGradient id="qb-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F9C340" />
          <stop offset="100%" stopColor="#E89500" />
        </linearGradient>
        <linearGradient id="qb-top" gradientUnits="userSpaceOnUse" x1="10" y1="15" x2="90" y2="35">
          <stop offset="0%" stopColor="#FFE566" />
          <stop offset="100%" stopColor="#FFC830" />
        </linearGradient>
        <linearGradient id="qb-side" gradientUnits="userSpaceOnUse" x1="90" y1="15" x2="110" y2="85">
          <stop offset="0%" stopColor="#C47800" />
          <stop offset="100%" stopColor="#7A4A00" />
        </linearGradient>
      </defs>

      {/* Right/shadow face */}
      <polygon points="90,35 110,15 110,85 90,105" fill="url(#qb-side)" />

      {/* Top face */}
      <polygon points="10,35 90,35 110,15 30,15" fill="url(#qb-top)" />

      {/* Front face */}
      <rect x="10" y="35" width="80" height="70" fill="url(#qb-front)" />

      {/* Inner border frame */}
      <rect x="13" y="38" width="74" height="64" fill="none" stroke="#4A2800" strokeWidth="2" />

      {/* Corner patches */}
      <rect x="12" y="37" width="10" height="10" fill="#4A2800" />
      <rect x="78" y="37" width="10" height="10" fill="#4A2800" />
      <rect x="12" y="93" width="10" height="10" fill="#4A2800" />
      <rect x="78" y="93" width="10" height="10" fill="#4A2800" />

      {/* Outline strokes */}
      <rect x="10" y="35" width="80" height="70" fill="none" stroke="#4A2800" strokeWidth="2.5" />
      <polygon points="10,35 90,35 110,15 30,15" fill="none" stroke="#4A2800" strokeWidth="2.5" />
      <polygon points="90,35 110,15 110,85 90,105" fill="none" stroke="#4A2800" strokeWidth="2.5" />

      {/* Question mark */}
      <text
        x="50"
        y="72"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Arial Black', Impact, Arial, sans-serif"
        fontWeight="900"
        fontSize="38"
        fill="white"
        stroke="#4A2800"
        strokeWidth="3.5"
        paintOrder="stroke"
      >?</text>
    </svg>
  )
}
