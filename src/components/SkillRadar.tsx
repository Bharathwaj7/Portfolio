'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function SkillRadar({ skills }: { skills: { name: string; level: number }[] }) {
  const radarData = useMemo(() => {
    const centerX = 150;
    const centerY = 150;
    const levels = 5;
    const maxRadius = 110;

    const points = skills.map((skill, index) => {
      const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
      const radius = (skill.level / 100) * maxRadius;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { x, y, name: skill.name, level: skill.level };
    });

    if (points.length > 0) {
      points.push(points[0]);
    }

    return { points, centerX, centerY, maxRadius, levels };
  }, [skills]);

  const polygonPoints = radarData.points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex justify-center">
      <svg width="300" height="300" viewBox="0 0 300 300">
        {/* Defs for glow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Concentric circles */}
        {[...Array(radarData.levels)].map((_, i) => {
          const radius = ((i + 1) * radarData.maxRadius) / radarData.levels;
          return (
            <circle
              key={i}
              cx={radarData.centerX}
              cy={radarData.centerY}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Axes */}
        {radarData.points.slice(0, -1).map((_, i) => {
          const angle = (i * 2 * Math.PI) / skills.length - Math.PI / 2;
          const endX = radarData.centerX + radarData.maxRadius * Math.cos(angle);
          const endY = radarData.centerY + radarData.maxRadius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={radarData.centerX}
              y1={radarData.centerY}
              x2={endX}
              y2={endY}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Animated radar polygon with glow */}
        <motion.polygon
          points={polygonPoints}
          fill="rgba(225, 6, 0, 0.15)"
          stroke="#E10600"
          strokeWidth="1.5"
          filter="url(#glow)"
          initial={{ opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ transformOrigin: `${radarData.centerX}px ${radarData.centerY}px` }}
        />

        {/* Skill labels */}
        {radarData.points.slice(0, -1).map((point, i) => {
          const angle = (i * 2 * Math.PI) / skills.length - Math.PI / 2;
          const labelX = radarData.centerX + (radarData.maxRadius + 22) * Math.cos(angle);
          const labelY = radarData.centerY + (radarData.maxRadius + 22) * Math.sin(angle);

          const textAlign = Math.cos(angle) > 0.3 ? 'start' : Math.cos(angle) < -0.3 ? 'end' : 'middle';

          return (
            <g key={i}>
              {/* Dot at the data point */}
              <circle cx={point.x} cy={point.y} r="2.5" fill="#E10600" />
              <text
                x={labelX}
                y={labelY}
                fill="#9CA3AF"
                fontSize="9"
                textAnchor={textAlign}
                dominantBaseline="middle"
              >
                {point.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}