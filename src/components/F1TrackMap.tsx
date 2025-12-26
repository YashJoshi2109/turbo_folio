'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Position {
  Driver: string;
  X: number;
  Y: number;
  Speed: number;
  LapNumber: number;
}

interface TrackMapProps {
  year: number;
  round: number;
  session: string;
  positions?: Position[];
  trackCoords?: { X: number; Y: number }[];
  isPlaying?: boolean;
  playbackSpeed?: number;
  onTimeUpdate?: (time: number) => void;
}

const DRIVER_COLORS: Record<string, string> = {
  VER: '#1E41FF', // Red Bull Blue
  PER: '#1E41FF',
  HAM: '#00D2BE', // Mercedes Teal
  RUS: '#00D2BE',
  LEC: '#DC143C', // Ferrari Red
  SAI: '#DC143C',
  NOR: '#FF8700', // McLaren Orange
  PIA: '#FF8700',
  ALO: '#00665E', // Aston Martin Green
  STR: '#00665E',
  OCO: '#0090FF', // Alpine Blue
  GAS: '#0090FF',
  BOT: '#900000', // Sauber Red
  ZHO: '#900000',
  ALB: '#005AFF', // Williams Blue
  SAR: '#005AFF',
  TSU: '#2B4562', // RB Blue
  RIC: '#2B4562',
  HUL: '#E6002D', // Haas Red
  MAG: '#E6002D',
};

export default function F1TrackMap({
  year,
  round,
  session,
  positions = [],
  trackCoords = [],
  isPlaying = false,
  playbackSpeed = 1,
  onTimeUpdate,
}: TrackMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;

    // Normalize coordinates to fit canvas
    const normalizeCoords = (coords: { X: number; Y: number }[]) => {
      if (coords.length === 0) return { minX: 0, maxX: 0, minY: 0, maxY: 0, scale: 1, offsetX: 0, offsetY: 0 };

      const xs = coords.map((c) => c.X);
      const ys = coords.map((c) => c.Y);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      const width = maxX - minX;
      const height = maxY - minY;
      const scale = Math.min(canvas.width / width, canvas.height / height) * 0.8;
      const offsetX = (canvas.width - width * scale) / 2 - minX * scale;
      const offsetY = (canvas.height - height * scale) / 2 - minY * scale;

      return { minX, maxX, minY, maxY, scale, offsetX, offsetY };
    };

    const norm = normalizeCoords(trackCoords.length > 0 ? trackCoords : positions.map((p) => ({ X: p.X, Y: p.Y })));

    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw track
    if (trackCoords.length > 0) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      trackCoords.forEach((coord, idx) => {
        const x = coord.X * norm.scale + norm.offsetX;
        const y = coord.Y * norm.scale + norm.offsetY;
        if (idx === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    }

    // Draw driver positions
    positions.forEach((pos) => {
      const x = pos.X * norm.scale + norm.offsetX;
      const y = pos.Y * norm.scale + norm.offsetY;
      const color = DRIVER_COLORS[pos.Driver] || '#ffffff';

      // Draw driver dot
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();

      // Draw driver label
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(pos.Driver, x, y - 10);
    });
  }, [positions, trackCoords]);

  return (
    <div className="relative w-full">
      <canvas ref={canvasRef} className="w-full rounded-lg border border-white/10" />
      {positions.length > 0 && (
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded px-2 py-1 text-xs text-white">
          {positions.length} drivers
        </div>
      )}
    </div>
  );
}

