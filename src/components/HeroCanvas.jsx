import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x121111, 0.035);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;
    camera.position.y = 2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Color Palette: Fiery Orange, Chili Red, Dark Orchid, Petal Pink
    const colorOrange = new THREE.Color('#FF7B00');
    const colorRed = new THREE.Color('#FE3303');
    const colorOrchid = new THREE.Color('#C344B5');
    const colorPetal = new THREE.Color('#F5E7DF');

    // 1. Organic Undulating Particle Wave Surface
    const particleCount = 18000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const initialY = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    const width = 60;
    const depth = 50;
    const cols = 150;
    const rows = 120;

    let idx = 0;
    for (let i = 0; i < particleCount; i++) {
      const u = (i % cols) / cols;
      const v = Math.floor(i / cols) / rows;

      const x = (u - 0.5) * width;
      const z = (v - 0.5) * depth;
      const y = Math.sin(u * Math.PI * 4) * Math.cos(v * Math.PI * 4) * 2 - 3;

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;

      initialY[i] = y;
      speeds[i] = 0.5 + Math.random() * 0.8;

      // Color interpolation across terrain: fiery orange -> chili red -> dark orchid
      const lerpFactor = u;
      const mixedColor = new THREE.Color();
      if (lerpFactor < 0.45) {
        mixedColor.copy(colorOrange).lerp(colorRed, lerpFactor / 0.45);
      } else if (lerpFactor < 0.85) {
        mixedColor.copy(colorRed).lerp(colorOrchid, (lerpFactor - 0.45) / 0.4);
      } else {
        mixedColor.copy(colorOrchid).lerp(colorPetal, (lerpFactor - 0.85) / 0.15);
      }

      colors[idx] = mixedColor.r;
      colors[idx + 1] = mixedColor.g;
      colors[idx + 2] = mixedColor.b;

      idx += 3;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture for soft circular glow
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,255,255,0.7)');
    grad.addColorStop(0.8, 'rgba(255,255,255,0.1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 2. Floating Cybernetic Rings / Torus Accents
    const ringGroup = new THREE.Group();
    const ringGeo1 = new THREE.TorusGeometry(8, 0.04, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xFE3303,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI * 0.4;
    ringGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(12, 0.03, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xFF7B00,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI * 0.3;
    ringGroup.add(ring2);

    ringGroup.position.set(0, -1, 5);
    scene.add(ringGroup);

    // Mouse Interaction with Spring Lerping
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Camera responds gently to mouse
      camera.position.x = mouseX * 4;
      camera.position.y = 2 + mouseY * 2.5;
      camera.lookAt(0, 0, 0);

      // Rotate decorative cyber rings
      ringGroup.rotation.z = elapsedTime * 0.05;
      ring1.rotation.x = Math.PI * 0.4 + Math.sin(elapsedTime * 0.3) * 0.15;
      ring2.rotation.y = Math.PI * 0.3 + Math.cos(elapsedTime * 0.2) * 0.15;

      // Animate wave positions
      const posAttr = geometry.attributes.position;
      const posArray = posAttr.array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = posArray[i3];
        const z = posArray[i3 + 2];

        // Complex fluid multi-frequency wave
        const wave1 = Math.sin(x * 0.18 + elapsedTime * 1.2) * 1.5;
        const wave2 = Math.cos(z * 0.2 + elapsedTime * 1.0) * 1.2;
        const wave3 = Math.sin((x + z) * 0.1 + elapsedTime * 0.8) * 0.8;

        // Mouse proximity ripple effect
        const dx = x - mouseX * 20;
        const dz = z - (-mouseY * 20);
        const distSq = dx * dx + dz * dz;
        const ripple = Math.exp(-distSq * 0.015) * 3.5 * Math.sin(Math.sqrt(distSq) * 1.2 - elapsedTime * 4.0);

        posArray[i3 + 1] = initialY[i] + wave1 + wave2 + wave3 + ripple;
      }

      posAttr.needsUpdate = true;

      // Slow continuous drift
      particleSystem.rotation.y = Math.sin(elapsedTime * 0.1) * 0.08;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);

      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90"
    />
  );
}

