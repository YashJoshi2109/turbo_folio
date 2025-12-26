'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import { FiArrowDown, FiMessageCircle, FiX, FiPlay, FiPause, FiSkipBack, FiSkipForward } from 'react-icons/fi';
import { useMemo, useState, useEffect, useRef } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import dynamic from 'next/dynamic';

const F1TrackMap = dynamic(() => import('./F1TrackMap'), { ssr: false });

type HeroMode = 'portfolio' | 'f1';

function SimpleCar() {
  const wheelPositions = useMemo(
    () => [
      [-0.9, -0.35, 0.55],
      [0.9, -0.35, 0.55],
      [-0.9, -0.35, -0.55],
      [0.9, -0.35, -0.55],
    ],
    [],
  );

  return (
    <group>
      {/* Body */}
      <mesh castShadow receiveShadow position={[0, -0.05, 0]}>
        <boxGeometry args={[2.4, 0.45, 1.4]} />
        <meshStandardMaterial color="#ff1e00" metalness={0.4} roughness={0.3} />
      </mesh>
      {/* Cockpit */}
      <mesh castShadow receiveShadow position={[0.2, 0.25, 0]}>
        <boxGeometry args={[0.9, 0.35, 0.9]} />
        <meshStandardMaterial color="#222831" metalness={0.2} roughness={0.6} />
      </mesh>
      {/* Front wing */}
      <mesh castShadow receiveShadow position={[1.4, -0.15, 0]}>
        <boxGeometry args={[0.5, 0.15, 1.6]} />
        <meshStandardMaterial color="#ff5c5c" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Rear wing */}
      <mesh castShadow receiveShadow position={[-1.2, 0.2, 0]}>
        <boxGeometry args={[0.35, 0.6, 1.2]} />
        <meshStandardMaterial color="#ff5c5c" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Wheels */}
      {wheelPositions.map((pos, i) => (
        <mesh key={i} castShadow receiveShadow position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.32, 0.32, 0.4, 20]} />
          <meshStandardMaterial color="#0f0f0f" metalness={0.2} roughness={0.6} />
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.32, 0.08, 12, 24]} />
            <meshStandardMaterial color="#222" />
          </mesh>
        </mesh>
      ))}
      {/* Halo */}
      <mesh castShadow receiveShadow position={[0.1, 0.4, 0]}>
        <torusGeometry args={[0.4, 0.05, 12, 32]} />
        <meshStandardMaterial color="#ff9f1c" metalness={0.6} roughness={0.2} />
      </mesh>
    </group>
  );
}

function FerrariModel() {
  const { scene } = useGLTF('/models/ferrari.glb');
  return <primitive object={scene} scale={0.5} position={[0, -0.25, 0]} />;
}

useGLTF.preload('/models/ferrari.glb');

function CameraLights({ mode }: { mode: HeroMode }) {
  return (
    <>
      <ambientLight intensity={0.65} />
      <hemisphereLight
        intensity={0.5}
        color={mode === 'portfolio' ? '#bfe4ff' : '#ffd6d6'}
        groundColor="#0a0a0a"
      />
      <directionalLight
        position={[7, 8, 7]}
        intensity={1.4}
        color={mode === 'portfolio' ? '#7dd3fc' : '#ff6b6b'}
        castShadow
      />
      <directionalLight position={[-8, 6, -6]} intensity={0.9} color="#a78bfa" />
      <pointLight position={[0, 4, 7]} intensity={0.9} color="#22d3ee" />
    </>
  );
}

export default function Hero() {
  const [mode, setMode] = useState<HeroMode>('portfolio');
  const [chatOpen, setChatOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [f1Loading, setF1Loading] = useState(false);
  const [f1Output, setF1Output] = useState<string>('Pick a quick action to load data.');
  const [viewMode, setViewMode] = useState<'data' | 'track'>('data');
  const [trackData, setTrackData] = useState<any>(null);
  const [positions, setPositions] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedRound, setSelectedRound] = useState(1);
  const [selectedSession, setSelectedSession] = useState('R');
  const apiBase = process.env.NEXT_PUBLIC_F1_API_BASE || 'http://localhost:8000' || 'https://portfolio-amber-phi.vercel.app/';   

  const handleViewResume = () => {
    setResumeOpen(true);
  };

  const handleCloseResume = () => {
    setResumeOpen(false);
    // Trigger download when modal is closed
    const link = document.createElement('a');
    link.href = '/YashJoshiResume.pdf';
    link.download = 'YashJoshiResume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchF1 = async (path: string, label: string) => {
    setF1Loading(true);
    setF1Output(
      `Loading ${label}...\n` +
        `On the first request, this can take up to 60 seconds while the F1 data cache warms up.\n` +
        `If it fails with a 503 error, please wait ~30 seconds and try again.`
    );
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout
      
      const res = await fetch(`${apiBase}/${path}`, {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        const text = await res.text();
        // Surface friendlier message for Render timeouts / cold starts
        if (res.status === 502 || res.status === 503) {
          throw new Error(
            `Backend is warming up or temporarily unavailable (HTTP ${res.status}). ` +
              `This often happens on the first heavy F1 data request. Please wait 30–60 seconds and try again.`
          );
        }
        throw new Error(text || `Request failed: ${res.status}`);
      }
      const json = await res.json();
      setF1Output(`${label}:\n${JSON.stringify(json, null, 2)}`);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setF1Output(
          `Error loading ${label}: Request timed out. The server may be loading F1 data ` +
            `(first request can take 1–2 minutes). Please try again.`
        );
      } else if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        setF1Output(
          `Error loading ${label}: Cannot reach the F1 API service.\n\n` +
            `If you're on localhost, make sure the backend is running.\n` +
            `If you're on the deployed site, this is usually a temporary network or cold-start issue—` +
            `wait a bit and try again.`
        );
      } else {
        setF1Output(`Error loading ${label}: ${err.message || err.toString()}`);
      }
    } finally {
      setF1Loading(false);
    }
  };

  const loadTrackVisualization = async (year?: number, round?: number, session?: string) => {
    const y = year || selectedYear;
    const r = round || selectedRound;
    const s = session || selectedSession;
    setF1Loading(true);
    setViewMode('track');
    try {
      // Load track layout
      const trackRes = await fetch(`${apiBase}/sessions/${y}/${r}/${s}/track`);
      if (trackRes.ok) {
        const trackJson = await trackRes.json();
        setTrackData(trackJson);
      }

      // Load initial positions
      const posRes = await fetch(`${apiBase}/sessions/${y}/${r}/${s}/positions`);
      if (posRes.ok) {
        const posJson = await posRes.json();
        setPositions(posJson.positions || []);
      }
    } catch (err: any) {
      setF1Output(`Error loading track: ${err.message || err.toString()}`);
    } finally {
      setF1Loading(false);
    }
  };

  useEffect(() => {
    if (isPlaying && playbackIntervalRef.current === null) {
      playbackIntervalRef.current = setInterval(() => {
        setCurrentTime((prev) => prev + 0.1 * playbackSpeed);
        // Fetch updated positions
        // This would ideally use WebSocket or polling for real-time updates
      }, 100);
    } else if (!isPlaying && playbackIntervalRef.current) {
      clearInterval(playbackIntervalRef.current);
      playbackIntervalRef.current = null;
    }

    return () => {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
      }
    };
  }, [isPlaying, playbackSpeed]);

  const headings = {
    portfolio: {
      title: 'YASH JOSHI',
      subtitle: 'Data Scientist | ML Engineer | Researcher',
      copy: 'Transforming complex data into intelligent, scalable, and impactful solutions.',
      ctaPrimary: { label: 'View Projects', href: '#projects' },
      ctaSecondary: { label: 'Get In Touch', href: '#contact' },
    },
    f1: {
      title: 'F1 RACE INTELLIGENCE',
      subtitle: 'Live telemetry • Weather • Tyre strategy',
      copy: 'Interactive Ferrari on track with live race insights, gaps, weather, and tyre strategy overlays.',
      ctaPrimary: { label: 'Open F1 View', href: '#projects' },
      ctaSecondary: { label: 'See Data APIs', href: '#about' },
    },
  } as const;

  const cameraTargets =
    mode === 'portfolio'
      ? { position: [5.5, 3.2, 7.5] as [number, number, number], target: [0, 0.2, 0] as [number, number, number] }
      : { position: [-4.8, 3.4, 6.8] as [number, number, number], target: [0.1, 0.1, 0] as [number, number, number] };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-cyber-black" />}>
          <Canvas shadows camera={{ position: cameraTargets.position, fov: 45 }}>
            <CameraLights mode={mode} />
            <Stars radius={120} depth={60} count={4000} factor={4} saturation={0} fade speed={1} />
            <Float speed={0.9} rotationIntensity={0.25} floatIntensity={0.2}>
              <FerrariModel />
            </Float>
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={mode === 'portfolio' ? 0.3 : 0.65}
              target={cameraTargets.target}
              minPolarAngle={Math.PI * 0.2}
              maxPolarAngle={Math.PI * 0.8}
              minDistance={4}
              maxDistance={10}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Center overlay with hero copy and CTAs */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-cyber-purple via-cyber-blue to-cyber-green bg-clip-text text-transparent">
              YASH JOSHI
            </span>
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-4xl text-gray-200 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Data Scientist | ML Engineer | Researcher
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-200/90 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Transforming complex data into intelligent, scalable, and impactful solutions.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <button
              onClick={handleViewResume}
              className="px-8 py-3 bg-gradient-to-r from-cyber-purple to-cyber-blue rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyber-blue/50 transition-all cyber-border"
            >
              View Resume
            </button>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-cyber-blue rounded-full text-cyber-blue font-semibold hover:bg-cyber-blue hover:text-white transition-all"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Chatbot-style launcher */}
      <div className="fixed bottom-6 right-6 z-20 flex flex-col items-end gap-3">
        <button
          onClick={() => setChatOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyber-purple to-cyber-blue px-4 py-3 text-white shadow-lg shadow-cyber-blue/40 hover:shadow-xl transition-all"
        >
          <FiMessageCircle className="text-xl" />
          <span className="text-sm font-semibold">{chatOpen ? 'Close' : 'F1 Hub'}</span>
        </button>

        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-[420px] max-w-[92vw] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl shadow-black/50 p-4 absolute bottom-full right-0 mb-3"
            style={{ transformOrigin: 'bottom right' }}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm uppercase tracking-[0.25em] text-gray-300">F1 Hub </div>
              <button
                onClick={() => setChatOpen(false)}
                className="rounded-full p-2 text-gray-200 hover:bg-white/10 transition-colors"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-2">
                <div className="text-xs uppercase tracking-[0.2em] text-gray-400">Quick Actions</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => fetchF1('standings/drivers?year=2024', 'Driver Standings')}
                    className="rounded-lg bg-white/10 text-white text-xs font-semibold py-2 hover:bg-white/15 transition disabled:opacity-60"
                    disabled={f1Loading}
                  >
                    Driver Standings
                  </button>
                  <button
                    onClick={() => fetchF1('standings/constructors?year=2024', 'Constructor Standings')}
                    className="rounded-lg bg-white/10 text-white text-xs font-semibold py-2 hover:bg-white/15 transition disabled:opacity-60"
                    disabled={f1Loading}
                  >
                    Constructor Standings
                  </button>
                  <button
                    onClick={() => fetchF1('races?year=2024', 'Race Schedule')}
                    className="rounded-lg bg-white/10 text-white text-xs font-semibold py-2 hover:bg-white/15 transition disabled:opacity-60"
                    disabled={f1Loading}
                  >
                    Race Schedule
                  </button>
                  <button
                    onClick={() => fetchF1('sessions/2024/1/FP1', 'Session Summary (2024 Round 1 FP1)')}
                    className="rounded-lg bg-white/10 text-white text-xs font-semibold py-2 hover:bg-white/15 transition disabled:opacity-60"
                    disabled={f1Loading}
                  >
                    Session Summary
                  </button>
                  <button
                    onClick={() => fetchF1('sessions/2024/1/FP1/laps?driver=VER', 'Laps (VER FP1 R1)')}
                    className="rounded-lg bg-white/10 text-white text-xs font-semibold py-2 hover:bg-white/15 transition disabled:opacity-60"
                    disabled={f1Loading}
                  >
                    Laps (VER)
                  </button>
                  <button
                    onClick={() => fetchF1('sessions/2024/1/FP1/tyres', 'Tyres/Stints (FP1 R1)')}
                    className="rounded-lg bg-white/10 text-white text-xs font-semibold py-2 hover:bg-white/15 transition disabled:opacity-60"
                    disabled={f1Loading}
                  >
                    Tyres / Stints
                  </button>
                  <button
                    onClick={() => fetchF1('sessions/2024/1/FP1/weather', 'Weather (FP1 R1)')}
                    className="rounded-lg bg-white/10 text-white text-xs font-semibold py-2 hover:bg-white/15 transition disabled:opacity-60"
                    disabled={f1Loading}
                  >
                    Weather
                  </button>
                  <button
                    onClick={() => fetchF1('sessions/2024/1/FP1/metadata', 'Session Metadata')}
                    className="rounded-lg bg-white/10 text-white text-xs font-semibold py-2 hover:bg-white/15 transition disabled:opacity-60"
                    disabled={f1Loading}
                  >
                    Metadata
                  </button>
                  <button
                    onClick={() => {
                      setViewMode('track');
                      loadTrackVisualization();
                    }}
                    className="rounded-lg bg-gradient-to-r from-cyber-purple to-cyber-blue text-white text-xs font-semibold py-2 hover:opacity-90 transition disabled:opacity-60 col-span-2"
                    disabled={f1Loading}
                  >
                    🏎️ Track Visualization
                  </button>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('data')}
                  className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
                    viewMode === 'data'
                      ? 'bg-cyber-blue text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  Data
                </button>
                <button
                  onClick={() => setViewMode('track')}
                  className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
                    viewMode === 'track'
                      ? 'bg-cyber-blue text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  Track Map
                </button>
              </div>

              {/* Data View */}
              {viewMode === 'data' && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-2 max-h-64 overflow-auto">
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                    <span>Data</span>
                    {f1Loading && <span className="text-[10px] text-cyber-blue">Loading...</span>}
                  </div>
                  <pre className="text-xs text-gray-100 whitespace-pre-wrap break-words">
{f1Output}
                  </pre>
                </div>
              )}

              {/* Track Visualization View */}
              {viewMode === 'track' && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                    <span>Track Replay</span>
                    {f1Loading && <span className="text-[10px] text-cyber-blue">Loading...</span>}
                  </div>

                  {/* Race/Session Selector */}
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                      className="rounded-lg bg-white/10 text-white text-xs px-2 py-1 border border-white/20"
                      placeholder="Year"
                      min={2020}
                      max={2025}
                    />
                    <input
                      type="number"
                      value={selectedRound}
                      onChange={(e) => setSelectedRound(Number(e.target.value))}
                      className="rounded-lg bg-white/10 text-white text-xs px-2 py-1 border border-white/20"
                      placeholder="Round"
                      min={1}
                      max={24}
                    />
                    <select
                      value={selectedSession}
                      onChange={(e) => setSelectedSession(e.target.value)}
                      className="rounded-lg bg-white/10 text-white text-xs px-2 py-1 border border-white/20"
                    >
                      <option value="FP1">FP1</option>
                      <option value="FP2">FP2</option>
                      <option value="FP3">FP3</option>
                      <option value="Q">Q</option>
                      <option value="R">Race</option>
                      <option value="S">Sprint</option>
                    </select>
                  </div>
                  <button
                    onClick={() => loadTrackVisualization()}
                    className="w-full rounded-lg bg-gradient-to-r from-cyber-purple to-cyber-blue text-white text-xs font-semibold py-2 hover:opacity-90 transition disabled:opacity-60"
                    disabled={f1Loading}
                  >
                    Load Track
                  </button>

                  {/* Track Map */}
                  {trackData && (
                    <F1TrackMap
                      year={selectedYear}
                      round={selectedRound}
                      session={selectedSession}
                      positions={positions}
                      trackCoords={trackData.track || []}
                      isPlaying={isPlaying}
                      playbackSpeed={playbackSpeed}
                    />
                  )}

                  {!trackData && (
                    <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
                      Select race/session and click "Load Track" to visualize
                    </div>
                  )}

                  {/* Playback Controls */}
                  {trackData && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="rounded-lg bg-white/10 text-white p-2 hover:bg-white/15 transition"
                      >
                        {isPlaying ? <FiPause className="text-sm" /> : <FiPlay className="text-sm" />}
                      </button>
                      <button
                        onClick={() => setCurrentTime((t) => Math.max(0, t - 1))}
                        className="rounded-lg bg-white/10 text-white p-2 hover:bg-white/15 transition"
                      >
                        <FiSkipBack className="text-sm" />
                      </button>
                      <button
                        onClick={() => setCurrentTime((t) => t + 1)}
                        className="rounded-lg bg-white/10 text-white p-2 hover:bg-white/15 transition"
                      >
                        <FiSkipForward className="text-sm" />
                      </button>
                      <select
                        value={playbackSpeed}
                        onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                        className="ml-auto rounded-lg bg-white/10 text-white text-xs px-2 py-1 border border-white/20"
                      >
                        <option value={0.5}>0.5x</option>
                        <option value={1}>1x</option>
                        <option value={2}>2x</option>
                        <option value={4}>4x</option>
                      </select>
                      <div className="text-xs text-gray-400 min-w-[60px] text-right">
                        {currentTime.toFixed(1)}s
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Resume Modal */}
      {resumeOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={handleCloseResume}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full h-full max-w-6xl max-h-[90vh] m-4 bg-cyber-black rounded-lg shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-4 bg-cyber-black/80 border-b border-cyber-blue/20">
              <h3 className="text-white font-semibold">Resume</h3>
              <button
                onClick={handleCloseResume}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-cyber-blue/20 hover:bg-cyber-blue/40 text-white transition-all backdrop-blur-sm border border-cyber-blue/30"
                aria-label="Close resume"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src="/YashJoshiResume.pdf"
                className="w-full h-full border-0"
                title="Resume Viewer"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}