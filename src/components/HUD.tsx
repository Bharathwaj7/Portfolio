'use client';

import { useMemo } from 'react';

export default function HUD({ scrollY }: { scrollY: number }) {
  const speed = useMemo(() => {
    if (typeof window === 'undefined') return 0;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    return maxScroll > 0 ? Math.min(Math.round((scrollY / maxScroll) * 300), 300) : 0;
  }, [scrollY]);

  const lapProgress = useMemo(() => {
    if (typeof window === 'undefined') return 0;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    return maxScroll > 0 ? Math.min(Math.round((scrollY / maxScroll) * 100), 100) : 0;
  }, [scrollY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20">

      {/* Telemetry Data — top right */}
      <div className="absolute top-20 right-6 glass rounded-lg p-3 font-mono text-xs">
        <div className="text-gray-500 text-[10px] tracking-widest mb-1">TELEMETRY</div>
        <div className="text-gray-300">RPM: <span className="text-white">{(speed * 50).toLocaleString()}</span></div>
        <div className="text-gray-300">GEAR: <span className="text-white">{speed > 200 ? '7' : speed > 170 ? '6' : speed > 140 ? '5' : speed > 110 ? '4' : speed > 80 ? '3' : speed > 50 ? '2' : '1'}</span></div>
        <div className="text-gray-300">TEMP: <span className="text-white">{85 + Math.floor(speed / 10)}°C</span></div>
      </div>

      {/* Speedometer — bottom right */}
      <div className="absolute bottom-8 right-8 w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.06)" strokeWidth="4" fill="none" />
          <circle
            cx="50" cy="50" r="42"
            stroke="#E10600"
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - speed / 300)}`}
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 4px rgba(225,6,0,0.5))' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-white text-xl font-bold">{speed}</div>
          <div className="text-gray-500 text-[9px] uppercase tracking-wider">km/h</div>
        </div>
      </div>

      {/* Lap progress — bottom left */}
      <div className="absolute bottom-8 left-6">
        <div className="w-48 h-2 bg-gray-800/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300 rounded-full"
            style={{ width: `${lapProgress}%` }}
          />
        </div>
        <div className="text-gray-500 text-[10px] font-mono mt-1">
          LAP {Math.floor(lapProgress / 25) + 1} — {lapProgress}%
        </div>
      </div>

      {/* DRS */}
      <div className="absolute bottom-20 left-6 flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${speed > 100 ? 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]' : 'bg-gray-600'}`} />
        <span className={`text-[10px] font-mono tracking-wider transition-colors duration-300 ${speed > 100 ? 'text-green-400' : 'text-gray-500'}`}>
          DRS: {speed > 100 ? 'ACTIVE' : 'INACTIVE'}
        </span>
      </div>
    </div>
  );
}