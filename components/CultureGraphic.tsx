"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function CultureGraphic({ index }: { index: number }) {
  const ease = [0.22, 1, 0.36, 1] as const;
  const labelFont = "ui-sans-serif, system-ui, sans-serif";
  const colors = {
    white: "#ffffff",
    ice: "#f8fbff",
    sky: "#dbeafe",
    cyan: "#cffafe",
    mint: "#d1fae5",
    peach: "#fed7aa",
    amber: "#fde68a",
    lilac: "#e9d5ff",
    rose: "#fbcfe8",
  } as const;

  const graphics = [
    <svg key={0} width="60%" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="ownershipGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.white} stopOpacity="0.96" />
          <stop offset="38%" stopColor={colors.sky} stopOpacity="0.4" />
          <stop offset="100%" stopColor={colors.cyan} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ownershipStroke" x1="40" y1="40" x2="360" y2="360">
          <stop offset="0%" stopColor={colors.sky} stopOpacity="0.95" />
          <stop offset="52%" stopColor={colors.cyan} stopOpacity="0.82" />
          <stop offset="100%" stopColor={colors.peach} stopOpacity="0.92" />
        </linearGradient>
      </defs>

      <motion.circle
        cx="200"
        cy="200"
        r="152"
        fill="url(#ownershipGlow)"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.42, 0.78, 0.42] }}
        transition={{
          duration: 7.5,
          repeat: Infinity,
          type: "tween",
          ease: "easeInOut",
        }}
      />

      {[160, 120, 80, 40].map((r, i) => (
        <motion.circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          fill="none"
          stroke="url(#ownershipStroke)"
          strokeOpacity={0.3 + i * 0.08}
          strokeWidth="1"
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: [1, 1.018, 1], opacity: [0.55, 1, 0.68] }}
          transition={{
            delay: i * 0.12,
            duration: 4.8,
            repeat: Infinity,
            repeatType: "mirror",
            type: "tween",
            ease: "easeInOut",
          }}
        />
      ))}

      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.line
          key={`spoke-${angle}`}
          x1="200"
          y1="200"
          x2={200 + 170 * Math.cos((angle * Math.PI) / 180)}
          y2={200 + 170 * Math.sin((angle * Math.PI) / 180)}
          stroke={colors.white}
          strokeOpacity={0.16}
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.28, 0.1] }}
          transition={{
            delay: 0.28 + i * 0.05,
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {[
        { cx: 200, cy: 40, fill: colors.sky },
        { cx: 338, cy: 120, fill: colors.cyan },
        { cx: 330, cy: 285, fill: colors.peach },
        { cx: 70, cy: 285, fill: colors.mint },
        { cx: 62, cy: 120, fill: colors.lilac },
      ].map((dot, i) => (
        <motion.circle
          key={`orbit-${i}`}
          cx={dot.cx}
          cy={dot.cy}
          r="5"
          fill={dot.fill}
          fillOpacity="0.95"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0.82, 1.18, 0.82], opacity: [0.35, 0.95, 0.35] }}
          transition={{
            delay: 0.45 + i * 0.12,
            duration: 2.8 + i * 0.2,
            repeat: Infinity,
            type: "tween",
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.circle
        cx="200"
        cy="200"
        r="36"
        fill={colors.white}
        fillOpacity="0.18"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.9, 1.08, 0.9], opacity: [0.35, 0.6, 0.35] }}
        transition={{
          delay: 0.25,
          duration: 3.2,
          repeat: Infinity,
          type: "tween",
          ease: "easeInOut",
        }}
      />

      <motion.circle
        cx="200"
        cy="200"
        r="18"
        fill={colors.ice}
        fillOpacity="0.98"
        initial={{ scale: 0 }}
        animate={{ scale: [0.9, 1.08, 1] }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          type: "tween",
          ease,
        }}
      />

      <motion.text
        x="200"
        y="340"
        textAnchor="middle"
        fill={colors.sky}
        fillOpacity="1"
        fontSize="18"
        letterSpacing="4"
        fontFamily={labelFont}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        INTEGRITY
      </motion.text>
    </svg>,

    <svg key={1} width="60%" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="trustCenterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.white} stopOpacity="0.95" />
          <stop offset="42%" stopColor={colors.cyan} stopOpacity="0.32" />
          <stop offset="100%" stopColor={colors.cyan} stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.circle
        cx="200"
        cy="200"
        r="76"
        fill="url(#trustCenterGlow)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.95, 1.06, 0.95], opacity: [0.35, 0.8, 0.35] }}
        transition={{
          duration: 5.4,
          repeat: Infinity,
          type: "tween",
          ease: "easeInOut",
        }}
      />

      <motion.circle
        cx="155"
        cy="200"
        r="110"
        fill="rgba(219,234,254,0.16)"
        stroke={colors.sky}
        strokeOpacity="0.95"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.02, 1], opacity: [0.65, 1, 0.75] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          type: "tween",
          ease: "easeInOut",
        }}
      />

      <motion.circle
        cx="245"
        cy="200"
        r="110"
        fill="rgba(254,215,170,0.15)"
        stroke={colors.peach}
        strokeOpacity="0.95"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.02, 1], opacity: [0.65, 1, 0.75] }}
        transition={{
          delay: 0.2,
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          type: "tween",
          ease: "easeInOut",
        }}
      />

      <motion.circle
        cx="200"
        cy="200"
        r="54"
        fill={colors.white}
        fillOpacity="0.22"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0.9, 1.08, 0.9], opacity: [0.3, 0.72, 0.3] }}
        transition={{
          delay: 0.35,
          duration: 4.4,
          repeat: Infinity,
          type: "tween",
          ease: "easeInOut",
        }}
      />

      {[
        { cx: 110, cy: 112, fill: colors.cyan },
        { cx: 290, cy: 112, fill: colors.rose },
        { cx: 110, cy: 288, fill: colors.mint },
        { cx: 290, cy: 288, fill: colors.amber },
      ].map((dot, i) => (
        <motion.circle
          key={`trust-dot-${i}`}
          cx={dot.cx}
          cy={dot.cy}
          r="5"
          fill={dot.fill}
          fillOpacity="0.95"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0.8, 1.14, 0.8], opacity: [0.28, 0.9, 0.28] }}
          transition={{
            delay: 0.45 + i * 0.12,
            duration: 2.6 + i * 0.2,
            repeat: Infinity,
            type: "tween",
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.text
        x="120"
        y="205"
        textAnchor="middle"
        fill={colors.sky}
        fillOpacity="0.95"
        fontSize="12"
        fontFamily={labelFont}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Team
      </motion.text>

      <motion.text
        x="280"
        y="205"
        textAnchor="middle"
        fill={colors.peach}
        fillOpacity="0.95"
        fontSize="12"
        fontFamily={labelFont}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Client
      </motion.text>

      <motion.text
        x="200"
        y="200"
        textAnchor="middle"
        fill={colors.white}
        fontSize="13"
        fontWeight="500"
        fontFamily={labelFont}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
      >
        Trust
      </motion.text>

      <motion.text
        x="200"
        y="360"
        textAnchor="middle"
        fill={colors.sky}
        fillOpacity="0.9"
        fontSize="11"
        letterSpacing="4"
        fontFamily={labelFont}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        {/* INNOVATION */}
        OWNERSHIP
      </motion.text>
    </svg>,

    <svg key={2} width="60%" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="clarityLeft" x1="20" y1="60" x2="230" y2="200">
          <stop offset="0%" stopColor={colors.sky} stopOpacity="0.95" />
          <stop offset="100%" stopColor={colors.white} stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="clarityRight" x1="380" y1="60" x2="170" y2="200">
          <stop offset="0%" stopColor={colors.peach} stopOpacity="0.95" />
          <stop offset="100%" stopColor={colors.white} stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="clarityCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.white} stopOpacity="0.95" />
          <stop offset="45%" stopColor={colors.cyan} stopOpacity="0.28" />
          <stop offset="100%" stopColor={colors.cyan} stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.circle
        cx="200"
        cy="200"
        r="104"
        fill="url(#clarityCore)"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: [0.96, 1.06, 0.96], opacity: [0.35, 0.72, 0.35] }}
        transition={{
          duration: 6.6,
          repeat: Infinity,
          type: "tween",
          ease: "easeInOut",
        }}
      />

      {[
        { x1: 20, y1: 60, x2: 200, y2: 200 },
        { x1: 20, y1: 130, x2: 200, y2: 200 },
        { x1: 20, y1: 200, x2: 200, y2: 200 },
        { x1: 20, y1: 270, x2: 200, y2: 200 },
        { x1: 20, y1: 340, x2: 200, y2: 200 },
      ].map((line, i) => (
        <motion.path
          key={`left-${i}`}
          d={`M ${line.x1} ${line.y1} Q ${(line.x1 + line.x2) / 2 + 30} ${(line.y1 + line.y2) / 2} ${line.x2} ${line.y2}`}
          fill="none"
          stroke="url(#clarityLeft)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.45, 1, 0.8] }}
          transition={{
            delay: i * 0.1,
            duration: 2.8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}

      {[
        { x1: 380, y1: 60, x2: 200, y2: 200 },
        { x1: 380, y1: 130, x2: 200, y2: 200 },
        { x1: 380, y1: 200, x2: 200, y2: 200 },
        { x1: 380, y1: 270, x2: 200, y2: 200 },
        { x1: 380, y1: 340, x2: 200, y2: 200 },
      ].map((line, i) => (
        <motion.path
          key={`right-${i}`}
          d={`M ${line.x1} ${line.y1} Q ${(line.x1 + line.x2) / 2 - 30} ${(line.y1 + line.y2) / 2} ${line.x2} ${line.y2}`}
          fill="none"
          stroke="url(#clarityRight)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.45, 1, 0.8] }}
          transition={{
            delay: 0.5 + i * 0.1,
            duration: 2.8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}

      {[
        { cx: 20, cy: 60, fill: colors.sky },
        { cx: 20, cy: 200, fill: colors.cyan },
        { cx: 20, cy: 340, fill: colors.lilac },
        { cx: 380, cy: 60, fill: colors.peach },
        { cx: 380, cy: 200, fill: colors.rose },
        { cx: 380, cy: 340, fill: colors.amber },
      ].map((dot, i) => (
        <motion.circle
          key={`clarity-dot-${i}`}
          cx={dot.cx}
          cy={dot.cy}
          r="4.5"
          fill={dot.fill}
          fillOpacity="0.96"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.3, 0.95, 0.3] }}
          transition={{
            delay: 0.2 + i * 0.08,
            duration: 2.4,
            repeat: Infinity,
            type: "tween",
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.rect
        x="176"
        y="176"
        width="48"
        height="48"
        rx="14"
        fill={colors.white}
        fillOpacity="0.18"
        stroke={colors.sky}
        strokeOpacity="0.35"
        strokeWidth="1"
        transform="rotate(45 200 200)"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: [0.92, 1.06, 0.92], opacity: [0.35, 0.7, 0.35] }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          type: "tween",
          ease: "easeInOut",
        }}
      />

      <motion.circle
        cx="200"
        cy="200"
        r="11"
        fill={colors.ice}
        fillOpacity="1"
        initial={{ scale: 0 }}
        animate={{ scale: [0.92, 1.26, 1] }}
        transition={{ delay: 1, duration: 0.7, type: "tween", ease }}
      />

      <motion.text
        x="200"
        y="360"
        textAnchor="middle"
        fill={colors.sky}
        fillOpacity="0.92"
        fontSize="11"
        letterSpacing="4"
        fontFamily={labelFont}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        {/* OWNERSHIP */}
        INNOVATION
      </motion.text>
    </svg>,

    <svg key={3} width="60%" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="collaborationGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.white} stopOpacity="0.94" />
          <stop offset="38%" stopColor={colors.mint} stopOpacity="0.28" />
          <stop offset="100%" stopColor={colors.mint} stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="collaborationLink"
          x1="70"
          y1="70"
          x2="330"
          y2="330"
        >
          <stop offset="0%" stopColor={colors.sky} stopOpacity="0.92" />
          <stop offset="48%" stopColor={colors.cyan} stopOpacity="0.85" />
          <stop offset="100%" stopColor={colors.mint} stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="collaborationNode" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors.white} stopOpacity="0.94" />
          <stop offset="100%" stopColor={colors.sky} stopOpacity="0.82" />
        </linearGradient>
      </defs>

      <motion.circle
        cx="200"
        cy="200"
        r="120"
        fill="url(#collaborationGlow)"
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: [0.95, 1.06, 0.95], opacity: [0.28, 0.72, 0.28] }}
        transition={{
          duration: 6.8,
          repeat: Infinity,
          type: "tween",
          ease: "easeInOut",
        }}
      />

      {[
        { x1: 200, y1: 200, x2: 120, y2: 96 },
        { x1: 200, y1: 200, x2: 280, y2: 96 },
        { x1: 200, y1: 200, x2: 92, y2: 214 },
        { x1: 200, y1: 200, x2: 308, y2: 214 },
        { x1: 200, y1: 200, x2: 144, y2: 304 },
        { x1: 200, y1: 200, x2: 256, y2: 304 },
        { x1: 120, y1: 96, x2: 280, y2: 96 },
        { x1: 92, y1: 214, x2: 308, y2: 214 },
      ].map((line, i) => (
        <motion.line
          key={`collab-line-${i}`}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="url(#collaborationLink)"
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.24, 0.9, 0.24] }}
          transition={{
            delay: i * 0.08,
            duration: 2.8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}

      {[
        {
          x: 34,
          y: 66,
          w: 122,
          h: 56,
          lines: ["Project Management", "and BD"],
        },
        {
          x: 244,
          y: 66,
          w: 122,
          h: 56,
          lines: ["Quality", "Assurance"],
        },
        {
          x: 12,
          y: 184,
          w: 126,
          h: 56,
          lines: ["Testing and", "Validation"],
        },
        {
          x: 262,
          y: 184,
          w: 126,
          h: 56,
          lines: ["Product", "Development"],
        },
        {
          x: 74,
          y: 280,
          w: 124,
          h: 56,
          lines: ["Information", "Technology"],
        },
        {
          x: 228,
          y: 286,
          w: 84,
          h: 40,
          lines: ["SITE"],
        },
      ].map((node, i) => {
        const lineHeight = 10;
        const centerX = node.x + node.w / 2;
        const textStartY =
          node.y + node.h / 2 - ((node.lines.length - 1) * lineHeight) / 2 + 1;

        return (
          <motion.g
            key={`collab-node-${i}`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: 1,
              scale: [0.96, 1.03, 0.96],
              y: [0, i % 2 === 0 ? -4 : 4, 0],
            }}
            transition={{
              delay: 0.3 + i * 0.08,
              duration: 4.4 + i * 0.18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={node.h}
              rx="14"
              fill="rgba(255,255,255,0.08)"
              stroke="url(#collaborationNode)"
              strokeOpacity="0.7"
            />
            <text
              x={centerX}
              y={textStartY}
              textAnchor="middle"
              fill={colors.white}
              fontSize="7.4"
              fontWeight="600"
              letterSpacing="0.45"
              fontFamily={labelFont}
            >
              {node.lines.map((line, lineIndex) => (
                <tspan
                  key={`${line}-${lineIndex}`}
                  x={centerX}
                  dy={lineIndex === 0 ? 0 : lineHeight}
                >
                  {line}
                </tspan>
              ))}
            </text>
          </motion.g>
        );
      })}

      <motion.rect
        x="154"
        y="154"
        width="92"
        height="92"
        rx="26"
        fill="rgba(255,255,255,0.12)"
        stroke={colors.white}
        strokeOpacity="0.36"
        strokeWidth="1.4"
        initial={{ scale: 0.82, opacity: 0 }}
        animate={{ scale: [0.96, 1.03, 0.96], opacity: [0.45, 0.88, 0.45] }}
        transition={{
          delay: 0.45,
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.circle
        cx="200"
        cy="200"
        r="18"
        fill={colors.white}
        fillOpacity="0.98"
        initial={{ scale: 0 }}
        animate={{ scale: [0.92, 1.14, 1] }}
        transition={{ delay: 0.8, duration: 0.8, type: "tween", ease }}
      />

      <motion.text
        x="200"
        y="205"
        textAnchor="middle"
        fill="#09111f"
        fontSize="11"
        fontWeight="700"
        letterSpacing="2"
        fontFamily={labelFont}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        HUB
      </motion.text>

      <motion.text
        x="200"
        y="356"
        textAnchor="middle"
        fill={colors.mint}
        fillOpacity="0.95"
        fontSize="11"
        letterSpacing="4"
        fontFamily={labelFont}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        COLLABORATION
      </motion.text>
    </svg>,

    <svg key={4} width="60%" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="impactCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.white} stopOpacity="0.96" />
          <stop offset="34%" stopColor={colors.peach} stopOpacity="0.34" />
          <stop offset="100%" stopColor={colors.peach} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="impactBeam" x1="80" y1="320" x2="320" y2="80">
          <stop offset="0%" stopColor={colors.sky} stopOpacity="0.9" />
          <stop offset="52%" stopColor={colors.peach} stopOpacity="0.88" />
          <stop offset="100%" stopColor={colors.amber} stopOpacity="0.94" />
        </linearGradient>
      </defs>

      <motion.circle
        cx="200"
        cy="200"
        r="128"
        fill="url(#impactCenter)"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.22, 0.68, 0.22] }}
        transition={{
          duration: 7.2,
          repeat: Infinity,
          type: "tween",
          ease: "easeInOut",
        }}
      />

      {[72, 108, 144].map((r, i) => (
        <motion.circle
          key={`impact-ring-${r}`}
          cx="200"
          cy="200"
          r={r}
          fill="none"
          stroke="url(#impactBeam)"
          strokeWidth="1.2"
          strokeOpacity={0.2 + i * 0.1}
          initial={{ scale: 0.78, opacity: 0 }}
          animate={{ scale: [0.96, 1.04, 0.96], opacity: [0.16, 0.72, 0.16] }}
          transition={{
            delay: i * 0.12,
            duration: 4.6 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {[
        { x: 96, y: 252, h: 54 },
        { x: 140, y: 224, h: 82 },
        { x: 184, y: 186, h: 120 },
        { x: 228, y: 152, h: 154 },
        { x: 272, y: 118, h: 188 },
      ].map((bar, i) => (
        <motion.rect
          key={`impact-bar-${i}`}
          x={bar.x}
          y={bar.y}
          width="24"
          height={bar.h}
          rx="10"
          fill="rgba(255,255,255,0.08)"
          stroke="url(#impactBeam)"
          strokeOpacity="0.78"
          strokeWidth="1.2"
          initial={{ opacity: 0, y: 18, scaleY: 0.6 }}
          animate={{
            opacity: 1,
            y: [0, -3, 0],
            scaleY: [0.96, 1.04, 0.96],
          }}
          transition={{
            delay: 0.18 + i * 0.08,
            duration: 3.8 + i * 0.18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.path
        d="M 104 280 C 146 246, 176 230, 196 214 S 254 162, 284 138"
        fill="none"
        stroke={colors.white}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0.2, 0.95, 0.2] }}
        transition={{
          delay: 0.55,
          duration: 3.2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {[104, 160, 216, 284].map((x, i) => (
        <motion.circle
          key={`impact-point-${i}`}
          cx={x}
          cy={i === 0 ? 280 : i === 1 ? 236 : i === 2 ? 186 : 138}
          r="5"
          fill={i < 2 ? colors.sky : i === 2 ? colors.peach : colors.amber}
          fillOpacity="0.96"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0.8, 1.24, 0.8], opacity: [0.3, 1, 0.3] }}
          transition={{
            delay: 0.3 + i * 0.1,
            duration: 2.4 + i * 0.18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.text
        x="200"
        y="82"
        textAnchor="middle"
        fill={colors.white}
        fillOpacity="0.84"
        fontSize="10"
        letterSpacing="3.5"
        fontFamily={labelFont}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
      >
        BETTER OUTCOMES
      </motion.text>

      <motion.text
        x="200"
        y="356"
        textAnchor="middle"
        fill={colors.peach}
        fillOpacity="0.95"
        fontSize="11"
        letterSpacing="4"
        fontFamily={labelFont}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95 }}
      >
        IMPACT
      </motion.text>
    </svg>,
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.05, y: -20 }}
        transition={{ duration: 0.6, ease }}
        className="flex h-full w-full items-center justify-center"
      >
        {graphics[index] ?? graphics[0]}
      </motion.div>
    </AnimatePresence>
  );
}
