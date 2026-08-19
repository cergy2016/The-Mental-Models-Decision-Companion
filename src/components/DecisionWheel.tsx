import React, { useRef, useState, useEffect, useCallback } from 'react';
import { MentalModel } from '../types';
import { playTickSound, playChimeSound } from '../utils/sound';
import { Disc3, RotateCw } from 'lucide-react';

interface DecisionWheelProps {
  models: MentalModel[];
  onSelectModel: (model: MentalModel) => void;
  isSpinning: boolean;
  setIsSpinning: (val: boolean) => void;
  soundEnabled: boolean;
  selectedModel: MentalModel | null;
}

const WEDGE_COLORS = [
  '#C16657', // terracotta
  '#718894', // slate
  '#8C7A6B', // warm umber
  '#5B7B68', // sage
  '#A86F42', // amber ochre
  '#4A6070', // deep slate
  '#997D4B', // soft antique gold
  '#A25B6A', // muted rose
  '#566A7A', // steel slate
  '#4B6B58', // forest sage
  '#8B5544', // clay terracotta
  '#B06B56', // light terracotta
];

export const DecisionWheel: React.FC<DecisionWheelProps> = ({
  models,
  onSelectModel,
  isSpinning,
  setIsSpinning,
  soundEnabled,
  selectedModel,
}) => {
  const [rotation, setRotation] = useState(0);
  const currentRotationRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastTickSegmentRef = useRef(-1);

  const numSlices = models.length;
  const sliceAngle = 360 / numSlices;
  const radius = 180;
  const center = 200;

  // Spin handler
  const triggerSpin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Pick random target model
    const targetIndex = Math.floor(Math.random() * models.length);
    // Pointer is at the top (270 degrees in standard cartesian or 0deg in our top-pointer orientation)
    // To land on targetIndex slice:
    const targetSliceCenter = targetIndex * sliceAngle + sliceAngle / 2;
    // We want the wheel rotation + targetSliceCenter to align with top indicator (270 deg)
    const baseRotations = 360 * (5 + Math.floor(Math.random() * 3)); // 5-7 full spins
    const targetAngle = baseRotations + (360 - targetSliceCenter + 270) % 360;

    const startRotation = currentRotationRef.current % 360;
    const finalRotation = currentRotationRef.current + (targetAngle - (currentRotationRef.current % 360)) + 360 * 5;
    const duration = 3800; // 3.8s smooth spin
    const startTime = performance.now();

    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const currentAngle = startRotation + (finalRotation - startRotation) * easedProgress;
      currentRotationRef.current = currentAngle;
      setRotation(currentAngle);

      // Sound ticks when crossing wedges
      const currentSegment = Math.floor((currentAngle % 360) / sliceAngle);
      if (currentSegment !== lastTickSegmentRef.current) {
        lastTickSegmentRef.current = currentSegment;
        if (soundEnabled && progress < 0.95) {
          playTickSound();
        }
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        if (soundEnabled) {
          playChimeSound();
        }
        onSelectModel(models[targetIndex]);
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isSpinning, setIsSpinning, models, sliceAngle, soundEnabled, onSelectModel]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-3">
      {/* Rotary Wheel Container */}
      <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-square flex items-center justify-center select-none">
        
        {/* Top Pointer Indicator Arrow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none drop-shadow-md">
          <div className="w-5 h-7 bg-[#2D2C2A] text-white flex items-center justify-center rounded-b-md shadow-lg border-x-2 border-b-2 border-[#EAE7E0]">
            <div className="w-2 h-2 rounded-full bg-[#C16657] animate-pulse"></div>
          </div>
          <div className="w-0 h-0 border-x-[8px] border-x-transparent border-t-[12px] border-t-[#2D2C2A] -mt-0.5"></div>
        </div>

        {/* Outer Shadow Ring */}
        <div className="absolute inset-2 sm:inset-3 rounded-full border-4 border-[#EAE7E0] shadow-[0_10px_35px_rgba(45,44,42,0.06)] bg-[#FAF8F2] pointer-events-none"></div>

        {/* The SVG Wheel */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full cursor-pointer transform transition-transform filter drop-shadow-sm"
          style={{ transform: `rotate(${rotation}deg)` }}
          onClick={triggerSpin}
          aria-label="Mental models interactive decision wheel"
        >
          <g transform={`translate(${center}, ${center})`}>
            {models.map((model, i) => {
              const startAngle = (i * sliceAngle * Math.PI) / 180;
              const endAngle = (((i + 1) * sliceAngle) * Math.PI) / 180;
              const midAngle = ((i + 0.5) * sliceAngle * Math.PI) / 180;

              const x1 = radius * Math.cos(startAngle);
              const y1 = radius * Math.sin(startAngle);
              const x2 = radius * Math.cos(endAngle);
              const y2 = radius * Math.sin(endAngle);

              const color = WEDGE_COLORS[i % WEDGE_COLORS.length];
              const pathData = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

              // Text position along wedge center
              const textRadius = radius * 0.68;
              const textDeg = (midAngle * 180) / Math.PI;

              return (
                <g key={model.id}>
                  {/* Slice Wedge */}
                  <path
                    d={pathData}
                    fill={color}
                    stroke="#FDFCF0"
                    strokeWidth="1.5"
                    opacity={selectedModel?.id === model.id && !isSpinning ? '1' : '0.94'}
                    className="transition-opacity hover:opacity-100"
                  />

                  {/* Slice Model Title Text */}
                  <g transform={`rotate(${textDeg}) translate(${textRadius}, 0)`}>
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="10.5"
                      fontWeight="600"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      letterSpacing="0.02em"
                      className="drop-shadow-xs"
                      transform="rotate(90)"
                    >
                      {model.name.length > 16 ? model.name.slice(0, 14) + '…' : model.name}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Inner Brass Center Hub */}
            <circle r="38" fill="#FFFFFF" stroke="#EAE7E0" strokeWidth="2.5" />
            <circle r="32" fill="#2D2C2A" />
            <circle r="30" fill="#FDFCF0" />
            
            {/* Center Hub Icon / Text */}
            <text
              x="0"
              y="-4"
              textAnchor="middle"
              fill="#2D2C2A"
              fontSize="9"
              fontWeight="700"
              fontFamily="Georgia, serif"
              letterSpacing="0.06em"
            >
              SPIN
            </text>
            <text
              x="0"
              y="8"
              textAnchor="middle"
              fill="#C16657"
              fontSize="7.5"
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
            >
              CHUNG
            </text>
          </g>
        </svg>

        {/* Subtle center button overlay for accessibility */}
        <button
          type="button"
          onClick={triggerSpin}
          disabled={isSpinning}
          aria-label="Spin the wheel"
          className="absolute z-20 w-16 h-16 rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-[#C16657]"
        />
      </div>

      {/* Wheel Control Button */}
      <div className="mt-5 flex flex-col items-center gap-2">
        <button
          id="spin-wheel-btn"
          type="button"
          onClick={triggerSpin}
          disabled={isSpinning}
          className="btn-primary px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] sans shadow-lg flex items-center gap-2.5 cursor-pointer disabled:opacity-60"
        >
          {isSpinning ? (
            <>
              <RotateCw className="w-4 h-4 animate-spin text-white" />
              <span>Spinning Wheel...</span>
            </>
          ) : (
            <>
              <Disc3 className="w-4 h-4 text-white" />
              <span>Spin The Wheel</span>
            </>
          )}
        </button>
        <span className="sans text-[10px] uppercase tracking-widest text-[#718894] font-semibold">
          Tap wheel or click above to rotate
        </span>
      </div>
    </div>
  );
};
