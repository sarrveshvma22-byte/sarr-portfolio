import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CosmicCanvas({ scrollProgress = 0 }) {
  const containerRef = useRef(null);
  const stateRef = useRef({ progress: scrollProgress });

  useEffect(() => {
    stateRef.current.progress = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Starfield Geometry (20,000 points)
    const starCount = 22000;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = 5 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      starPositions[i3] = radius * Math.cos(theta) * Math.cos(phi);
      starPositions[i3 + 1] = radius * Math.sin(phi);
      starPositions[i3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      // Subtle celestial colors: starlight white, pale amber, soft cyan
      const r = 0.85 + Math.random() * 0.15;
      const g = 0.85 + Math.random() * 0.15;
      const b = 0.9 + Math.random() * 0.1;
      starColors[i3] = r;
      starColors[i3 + 1] = g;
      starColors[i3 + 2] = b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Circular particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,255,255,0.8)');
    grad.addColorStop(0.8, 'rgba(255,255,255,0.1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 32, 32);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const starMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      map: pTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 3. Relativistic Black Hole Group (appears around chapter 04 "The Black Hole")
    const blackHoleGroup = new THREE.Group();

    // Event Horizon (Pitch-black sphere)
    const horizonGeo = new THREE.SphereGeometry(3.0, 48, 48);
    const horizonMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const horizonSphere = new THREE.Mesh(horizonGeo, horizonMat);
    blackHoleGroup.add(horizonSphere);

    // Accretion Dust Disk (Multi-ring glowing particle cloud)
    const diskCount = 12000;
    const diskGeo = new THREE.BufferGeometry();
    const diskPositions = new Float32Array(diskCount * 3);
    const diskColors = new Float32Array(diskCount * 3);

    for (let d = 0; d < diskCount; d++) {
      const d3 = d * 3;
      const innerR = 3.4;
      const outerR = 9.5;
      const radius = innerR + Math.pow(Math.random(), 1.5) * (outerR - innerR);
      const angle = Math.random() * Math.PI * 2;

      diskPositions[d3] = radius * Math.cos(angle);
      diskPositions[d3 + 1] = (Math.random() - 0.5) * 0.3 * (1 - (radius - innerR) / outerR);
      diskPositions[d3 + 2] = radius * Math.sin(angle);

      // Relativistic Doppler beaming: approaching side is hotter blue/white, receding is red/orange
      const isApproaching = Math.sin(angle) > 0;
      if (isApproaching) {
        diskColors[d3] = 0.95 + Math.random() * 0.05; // R
        diskColors[d3 + 1] = 0.85 + Math.random() * 0.15; // G
        diskColors[d3 + 2] = 1.0; // B (cyan/blue shift)
      } else {
        diskColors[d3] = 1.0; // R (redshift)
        diskColors[d3 + 1] = 0.35 + Math.random() * 0.2; // G (fiery amber)
        diskColors[d3 + 2] = 0.1; // B
      }
    }

    diskGeo.setAttribute('position', new THREE.BufferAttribute(diskPositions, 3));
    diskGeo.setAttribute('color', new THREE.BufferAttribute(diskColors, 3));

    const diskMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      map: pTexture,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const accretionDisk = new THREE.Points(diskGeo, diskMat);
    accretionDisk.rotation.x = Math.PI * 0.25;
    blackHoleGroup.add(accretionDisk);

    // Gravitational Lensing Halo (Torus glow)
    const haloGeo = new THREE.TorusGeometry(3.3, 0.18, 24, 100);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = Math.PI * 0.25;
    blackHoleGroup.add(halo);

    blackHoleGroup.position.set(0, 0, -25); // Starts distant
    scene.add(blackHoleGroup);

    // 4. Fluid Water Surface Wave Grid (Appears around chapter 08 "The Surface")
    const waterWidth = 60;
    const waterDepth = 50;
    const waterGeo = new THREE.PlaneGeometry(waterWidth, waterDepth, 90, 80);
    waterGeo.rotateX(-Math.PI * 0.5);

    const waterMat = new THREE.MeshBasicMaterial({
      color: 0x4fa8ff,
      wireframe: true,
      transparent: true,
      opacity: 0.0, // Fades in near water section
      blending: THREE.AdditiveBlending,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.position.set(0, -6, 0);
    scene.add(waterMesh);

    // 5. Mouse Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Handle Window Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // 6. Animation & Render Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const p = stateRef.current.progress; // 0 to ~25

      // Mouse damping
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Base starfield continuous drift
      starField.rotation.y = elapsed * 0.015 + mouseX * 0.1;
      starField.rotation.x = mouseY * 0.08;

      // Black hole rotation and visibility modulation based on scroll
      // Chapter 04 (The Black Hole) is around progress 8.0 - 12.0
      if (p > 5.0 && p < 16.0) {
        const factor = Math.sin(((p - 5.0) / 11.0) * Math.PI);
        blackHoleGroup.position.z = -25 + factor * 22; // Moves closer
        blackHoleGroup.visible = true;
        blackHoleGroup.rotation.y = elapsed * 0.4;
        accretionDisk.rotation.z = elapsed * 0.8;
      } else {
        blackHoleGroup.visible = false;
      }

      // Slingshot / Warp acceleration lines: around progress 12.0 - 14.0
      if (p >= 12.0 && p <= 14.0) {
        starMat.size = 0.45;
        camera.position.z = 20 - (p - 12.0) * 4;
      } else {
        starMat.size = 0.22;
        camera.position.z = 20;
      }

      // Water surface ripples: around progress 20.0 - 25.0
      if (p >= 19.0 && p <= 26.0) {
        const waterOpacity = Math.min(1.0, (p - 19.0) / 2.5);
        waterMat.opacity = waterOpacity * 0.45;
        waterMesh.visible = true;

        // Animate wave displacement
        const pos = waterGeo.attributes.position.array;
        for (let w = 0; w < pos.length; w += 3) {
          const x = pos[w];
          const z = pos[w + 2];
          pos[w + 1] =
            Math.sin(x * 0.25 + elapsed * 1.8) * Math.cos(z * 0.25 + elapsed * 1.4) * 0.8 +
            Math.sin((x + z) * 0.1 + elapsed * 1.0) * 0.5;
        }
        waterGeo.attributes.position.needsUpdate = true;
      } else {
        waterMesh.visible = false;
      }

      // Camera parallax
      camera.position.x = mouseX * 2.5;
      camera.position.y = mouseY * 1.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);

      starGeo.dispose();
      starMat.dispose();
      pTexture.dispose();
      horizonGeo.dispose();
      horizonMat.dispose();
      diskGeo.dispose();
      diskMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      waterGeo.dispose();
      waterMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="gl fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}

