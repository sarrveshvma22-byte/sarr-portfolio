import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Sparkles, Sliders, Play, RotateCcw, Zap, Terminal, Maximize2 } from 'lucide-react';
import { playgroundExperiments } from '../data/portfolioData';
import { sound } from '../utils/AudioEngine';

export default function CreativePlayground() {
  const [activeExp, setActiveExp] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const [wireframe, setWireframe] = useState(false);
  const [colorTheme, setColorTheme] = useState('sunset'); // 'sunset', 'neon', 'orchid'
  const [fps, setFps] = useState(60);
  const [pulseTrigger, setPulseTrigger] = useState(0);

  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const animFrameRef = useRef(null);

  const currentExperiment = playgroundExperiments[activeExp];

  useEffect(() => {
    const canvasContainer = canvasRef.current;
    if (!canvasContainer) return;

    // Create Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x121111, 0.025);

    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight || 550;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.innerHTML = '';
    canvasContainer.appendChild(renderer.domElement);

    // Color definitions based on theme
    const themeColors = {
      sunset: { c1: new THREE.Color('#FF7B00'), c2: new THREE.Color('#FE3303'), c3: new THREE.Color('#C344B5') },
      neon: { c1: new THREE.Color('#00F0FF'), c2: new THREE.Color('#7000FF'), c3: new THREE.Color('#FF007A') },
      orchid: { c1: new THREE.Color('#C344B5'), c2: new THREE.Color('#F5E7DF'), c3: new THREE.Color('#FE3303') },
    }[colorTheme];

    // Objects Group
    const group = new THREE.Group();
    scene.add(group);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      sound.playClick();
    };

    const onMouseMove = (e) => {
      const rect = canvasContainer.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      targetMouseY = -((e.clientY - rect.top) / height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        group.rotation.y += deltaX * 0.01;
        group.rotation.x += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvasContainer.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // -------------------------------------------------------------
    // BUILD EXPERIMENT GEOMETRIES
    // -------------------------------------------------------------

    // Experiment 0: Cyber PCB Silicon Core
    let pcbRings = [];
    let pcbTraces = null;
    let pcbCore = null;

    if (activeExp === 0) {
      // Microchip processor center
      const chipGeo = new THREE.BoxGeometry(4.5, 4.5, 0.6);
      const chipMat = new THREE.MeshStandardMaterial({
        color: 0x1E1D1D,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: wireframe,
      });
      pcbCore = new THREE.Mesh(chipGeo, chipMat);
      group.add(pcbCore);

      // Chip Die Gold Accent
      const dieGeo = new THREE.BoxGeometry(2.4, 2.4, 0.7);
      const dieMat = new THREE.MeshBasicMaterial({
        color: themeColors.c1,
        wireframe: wireframe,
      });
      const die = new THREE.Mesh(dieGeo, dieMat);
      group.add(die);

      // Pins on all 4 sides
      const pinMat = new THREE.MeshStandardMaterial({
        color: 0xF5E7DF,
        metalness: 0.9,
        roughness: 0.1,
      });
      for (let side = 0; side < 4; side++) {
        for (let p = -4; p <= 4; p++) {
          const pinGeo = new THREE.BoxGeometry(0.2, 0.7, 0.15);
          const pin = new THREE.Mesh(pinGeo, pinMat);
          const angle = (side * Math.PI) / 2;
          pin.position.set(p * 0.42, 2.5, 0);
          pin.rotation.z = angle;
          pin.position.applyAxisAngle(new THREE.Vector3(0, 0, 1), angle);
          group.add(pin);
        }
      }

      // Rotating Holographic Rings
      for (let r = 0; r < 3; r++) {
        const ringGeo = new THREE.TorusGeometry(5.8 + r * 1.8, 0.04, 16, 80);
        const ringMat = new THREE.MeshBasicMaterial({
          color: r === 0 ? themeColors.c1 : r === 1 ? themeColors.c2 : themeColors.c3,
          wireframe: true,
          transparent: true,
          opacity: 0.75,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = (r + 1) * 0.4;
        ring.rotation.y = (r + 1) * 0.3;
        pcbRings.push(ring);
        group.add(ring);
      }

      // Ambient & Directional Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(themeColors.c1, 4, 30);
      pointLight.position.set(5, 5, 10);
      scene.add(pointLight);
    }

    // Experiment 1: Quantum Particle Vortex (50,000 points)
    let particlePoints = null;
    let particlePositions = null;
    let particleVelocities = null;
    const count = 35000;

    if (activeExp === 1) {
      const pGeo = new THREE.BufferGeometry();
      particlePositions = new Float32Array(count * 3);
      particleVelocities = new Float32Array(count * 3);
      const pColors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const radius = 2 + Math.random() * 12;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI;

        particlePositions[i3] = radius * Math.cos(theta) * Math.cos(phi);
        particlePositions[i3 + 1] = radius * Math.sin(phi) * 1.5;
        particlePositions[i3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

        particleVelocities[i3] = (Math.random() - 0.5) * 0.02;
        particleVelocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
        particleVelocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

        const mixed = new THREE.Color().copy(themeColors.c1).lerp(themeColors.c2, Math.random());
        pColors[i3] = mixed.r;
        pColors[i3 + 1] = mixed.g;
        pColors[i3 + 2] = mixed.b;
      }

      pGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

      const pMat = new THREE.PointsMaterial({
        size: 0.18,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      particlePoints = new THREE.Points(pGeo, pMat);
      group.add(particlePoints);
    }

    // Experiment 2: Fluid Raymarched Liquid Metaballs
    let metaballMesh = null;
    let metaballMat = null;

    if (activeExp === 2) {
      // Multi-ball cluster with custom shader-like Fresnel sheen
      const metaGroup = new THREE.Group();
      for (let b = 0; b < 12; b++) {
        const bGeo = new THREE.SphereGeometry(1.2 + Math.random() * 0.8, 32, 32);
        const bMat = new THREE.MeshPhysicalMaterial({
          color: b % 2 === 0 ? themeColors.c1 : themeColors.c2,
          emissive: themeColors.c3,
          emissiveIntensity: 0.2,
          roughness: 0.1,
          metalness: 0.9,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          wireframe: wireframe,
        });
        const ball = new THREE.Mesh(bGeo, bMat);
        ball.userData = {
          seedX: Math.random() * 10,
          seedY: Math.random() * 10,
          seedZ: Math.random() * 10,
          speed: 0.5 + Math.random() * 0.8,
        };
        metaGroup.add(ball);
      }
      group.add(metaGroup);

      const light1 = new THREE.PointLight(themeColors.c1, 3, 20);
      light1.position.set(6, 6, 8);
      scene.add(light1);
      const light2 = new THREE.PointLight(themeColors.c3, 3, 20);
      light2.position.set(-6, -6, 8);
      scene.add(light2);
    }

    // Experiment 3: Kinetic Audio-Reactive Waveform Grid
    let wavePlane = null;
    let wavePlanePositions = null;
    let initialWaveY = null;

    if (activeExp === 3) {
      const planeGeo = new THREE.PlaneGeometry(24, 24, 60, 60);
      planeGeo.rotateX(-Math.PI * 0.4);
      wavePlanePositions = planeGeo.attributes.position.array;
      initialWaveY = new Float32Array(wavePlanePositions.length);
      for (let w = 0; w < wavePlanePositions.length; w++) {
        initialWaveY[w] = wavePlanePositions[w];
      }

      const planeMat = new THREE.MeshStandardMaterial({
        color: themeColors.c2,
        roughness: 0.3,
        metalness: 0.8,
        wireframe: true,
      });

      wavePlane = new THREE.Mesh(planeGeo, planeMat);
      group.add(wavePlane);

      const light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(0, 10, 10);
      scene.add(light);
    }

    // Animation Loop
    let clock = new THREE.Clock();
    let frameCounter = 0;
    let lastFpsTime = performance.now();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime() * speed;

      // Mouse damping
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // FPS Calculation
      frameCounter++;
      const now = performance.now();
      if (now - lastFpsTime >= 1000) {
        setFps(Math.round((frameCounter * 1000) / (now - lastFpsTime)));
        frameCounter = 0;
        lastFpsTime = now;
      }

      // Experiment 0 animation
      if (activeExp === 0 && pcbRings.length > 0) {
        pcbRings.forEach((ring, idx) => {
          ring.rotation.z = elapsedTime * (0.3 + idx * 0.2);
          ring.rotation.x = Math.sin(elapsedTime * 0.4 + idx) * 0.3;
        });
        if (pcbCore) {
          pcbCore.rotation.z = Math.sin(elapsedTime * 0.2) * 0.05;
        }
        if (!isDragging) {
          group.rotation.y = mouseX * 0.6 + Math.sin(elapsedTime * 0.2) * 0.15;
          group.rotation.x = -mouseY * 0.4 + 0.2;
        }
      }

      // Experiment 1 animation (Vortex)
      if (activeExp === 1 && particlePoints) {
        const pos = particlePoints.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          const x = pos[i3];
          const z = pos[i3 + 2];
          const angle = 0.015 * speed;

          // Orbit around Y
          pos[i3] = x * Math.cos(angle) - z * Math.sin(angle);
          pos[i3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);

          // Subtle harmonic vertical wave
          pos[i3 + 1] += Math.sin(elapsedTime * 2.0 + x * 0.5) * 0.02 * speed;
        }
        particlePoints.geometry.attributes.position.needsUpdate = true;
        if (!isDragging) {
          group.rotation.x = -mouseY * 0.4;
          group.rotation.y = mouseX * 0.4;
        }
      }

      // Experiment 2 animation (Metaballs)
      if (activeExp === 2) {
        const metaGroup = group.children[0];
        if (metaGroup && metaGroup.children) {
          metaGroup.children.forEach((ball, bIdx) => {
            const seed = ball.userData;
            const t = elapsedTime * seed.speed;
            ball.position.x = Math.sin(t + seed.seedX) * 4.5 + mouseX * 2.5;
            ball.position.y = Math.cos(t * 0.8 + seed.seedY) * 3.5 + mouseY * 2.5;
            ball.position.z = Math.sin(t * 1.2 + seed.seedZ) * 3.5;
            ball.rotation.x = t;
            ball.rotation.y = t * 0.5;
          });
        }
        if (!isDragging) {
          group.rotation.y = elapsedTime * 0.1;
        }
      }

      // Experiment 3 animation (Audio Reactive Plane)
      if (activeExp === 3 && wavePlane) {
        const pos = wavePlane.geometry.attributes.position.array;
        for (let w = 0; w < pos.length; w += 3) {
          const x = pos[w];
          const z = pos[w + 2];
          pos[w + 1] = Math.sin(x * 0.4 + elapsedTime * 2.0) * Math.cos(z * 0.4 + elapsedTime * 1.5) * (2.2 * speed);
        }
        wavePlane.geometry.attributes.position.needsUpdate = true;
        if (!isDragging) {
          group.rotation.y = mouseX * 0.5;
          group.rotation.z = Math.sin(elapsedTime * 0.2) * 0.05;
        }
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Window Resize
    const handleResize = () => {
      const newWidth = canvasContainer.clientWidth;
      const newHeight = canvasContainer.clientHeight || 550;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      canvasContainer.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      if (canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement);
      }
    };
  }, [activeExp, speed, wireframe, colorTheme]);

  const handleExpChange = (idx) => {
    sound.playClick();
    setActiveExp(idx);
  };

  const handlePulse = () => {
    sound.playGlitch();
    setPulseTrigger((prev) => prev + 1);
  };

  return (
    <section
      id="playground"
      className="relative min-h-screen w-full bg-[#121111] py-24 px-6 md:px-12 border-t border-[#F5E7DF]/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1D1D] border border-[#F5E7DF]/10 mb-3">
              <Sparkles size={13} className="text-[#C344B5]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#F5E7DF]/80">
                04 // CREATIVE CODING LABORATORY
              </span>
            </div>
            <h2 className="font-['Cabinet_Grotesk'] text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#F5E7DF]">
              3D PLAYGROUND
            </h2>
          </div>

          <p className="max-w-md font-['Satoshi'] text-sm sm:text-base text-[#F5E7DF]/70">
            Interactive real-time experiments showcasing Three.js, GPU particle dynamics, procedural geometry, and custom GLSL shader choreography.
          </p>
        </div>

        {/* Experiment Switcher Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {playgroundExperiments.map((exp, idx) => {
            const isActive = activeExp === idx;
            return (
              <button
                key={exp.id}
                onClick={() => handleExpChange(idx)}
                onMouseEnter={() => sound.playHover()}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between focus:outline-none ${
                  isActive
                    ? 'bg-[#1E1D1D] border-[#FE3303] shadow-[0_0_25px_rgba(254,51,3,0.25)]'
                    : 'bg-[#1E1D1D]/50 border-[#F5E7DF]/10 hover:border-[#F5E7DF]/30'
                }`}
                data-cursor="SELECT"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? 'text-[#FE3303]' : 'text-[#F5E7DF]/50'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#FE3303] animate-ping" />}
                </div>
                <div className="font-['Cabinet_Grotesk'] text-sm sm:text-base font-bold text-[#F5E7DF] uppercase">
                  {exp.name}
                </div>
                <div className="font-mono text-[10px] text-[#F5E7DF]/50 mt-1 uppercase truncate">
                  {exp.category}
                </div>
              </button>
            );
          })}
        </div>

        {/* 3D Canvas Viewport Container */}
        <div className="relative rounded-3xl bg-[#171616] border border-[#F5E7DF]/15 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.7)] flex flex-col lg:flex-row">
          {/* Main WebGL Interactive Canvas */}
          <div
            ref={canvasRef}
            className="relative w-full lg:w-3/4 h-[450px] sm:h-[550px] cursor-grab active:cursor-grabbing bg-[#121111]"
            data-cursor="ORBIT"
          />

          {/* Interactive HUD Controls Sidebar */}
          <div className="w-full lg:w-1/4 bg-[#1E1D1D]/90 border-t lg:border-t-0 lg:border-l border-[#F5E7DF]/10 p-6 flex flex-col justify-between backdrop-blur-xl">
            <div className="space-y-6">
              {/* Telemetry HUD Top */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F5E7DF]/10">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-[#FF7B00]" />
                  <span className="font-mono text-xs text-[#F5E7DF]/80 font-bold uppercase">
                    HUD CONTROLS
                  </span>
                </div>
                <div className="font-mono text-xs text-[#FF7B00] tabular-nums">
                  {fps} FPS
                </div>
              </div>

              {/* Experiment Metadata */}
              <div>
                <h4 className="font-['Cabinet_Grotesk'] text-lg font-bold text-[#F5E7DF] uppercase">
                  {currentExperiment.name}
                </h4>
                <p className="font-['Satoshi'] text-xs text-[#F5E7DF]/70 mt-1 leading-relaxed">
                  {currentExperiment.description}
                </p>
              </div>

              {/* Slider: Velocity / Speed */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs text-[#F5E7DF]/70">
                  <span>VELOCITY RATE</span>
                  <span className="text-[#FF7B00] tabular-nums">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => {
                    setSpeed(parseFloat(e.target.value));
                    sound.playHover();
                  }}
                  className="w-full h-1 bg-[#121111] rounded-lg appearance-none cursor-pointer accent-[#FF7B00]"
                />
              </div>

              {/* Theme Dropdown */}
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#F5E7DF]/70 block">
                  CHROMATIC PALETTE
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'sunset', label: 'Sunset' },
                    { id: 'neon', label: 'Cyan' },
                    { id: 'orchid', label: 'Orchid' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        sound.playClick();
                        setColorTheme(t.id);
                      }}
                      className={`py-1.5 rounded-lg font-mono text-[11px] uppercase transition-colors ${
                        colorTheme === t.id
                          ? 'bg-[#FE3303] text-[#121111] font-bold'
                          : 'bg-[#121111] text-[#F5E7DF]/60 hover:text-[#F5E7DF]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wireframe Toggle */}
              <div className="flex items-center justify-between pt-2">
                <span className="font-mono text-xs text-[#F5E7DF]/70">WIREFRAME MESH</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setWireframe(!wireframe);
                  }}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 ${
                    wireframe ? 'bg-[#FF7B00]' : 'bg-[#121111]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      wireframe ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Pulse / Shockwave Action */}
              <button
                onClick={handlePulse}
                onMouseEnter={() => sound.playHover()}
                className="w-full py-2.5 rounded-xl bg-[#121111] border border-[#FE3303]/40 text-[#FE3303] hover:bg-[#FE3303] hover:text-[#121111] transition-all font-mono text-xs uppercase font-bold flex items-center justify-center gap-2"
                data-cursor="PULSE"
              >
                <Zap size={14} />
                <span>Fire Telemetry Pulse</span>
              </button>
            </div>

            {/* Instruction Footer */}
            <div className="pt-6 border-t border-[#F5E7DF]/10 font-mono text-[11px] text-[#F5E7DF]/40 space-y-1">
              <div>• DRAG CANVAS TO ROTATE 360°</div>
              <div>• HOVER TO ACCELERATE PARTICLES</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

