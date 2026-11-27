export const personalInfo = {
  name: "SARRVESH M",
  role: "Graduate Engineer & Creative Technologist",
  tagline: "Bridging Embedded Silicon, Industrial Automation & Immersive 3D Digital Experiences",
  location: "Puducherry, India",
  coordinates: "11.9416° N, 79.8083° E",
  email: "sarrveshvma22@gmail.com",
  phone: "+91 9790431812",
  linkedin: "https://linkedin.com/in/sarrvesh-m",
  github: "https://github.com/sarrveshvma22-byte",
  status: "Available for Engineering & Creative Tech Roles",
  currentRole: "Graduate Engineering Trainee at Schopiq Automation",
  education: "B.Tech in Electronics and Instrumentation (CGPA 8.26)",
  university: "Puducherry Technological University",
};

export const journeyStages = [
  {
    step: "01",
    tag: "THE SPARK & ANALOG ROOTS",
    title: "Where I Started",
    subtitle: "Understanding the Physical Physics of Electronics & Silicon",
    period: "2020 — 2023",
    description:
      "My journey ignited with a relentless curiosity about how physical energy transforms into intelligent logic. At Puducherry Technological University, immersed in Electronics and Instrumentation Engineering, I spent countless nights breadboarding circuits, debugging op-amps, and programming my first 8-bit microcontrollers.",
    details: [
      "Built deep intuition for voltage thresholds, signal conditioning, and transducer physics.",
      "Engineered early robotics prototypes, including an autonomous H-Bridge DC motorized vehicle.",
      "Graduated with top academic standing (CGPA: 8.26), grounding future software mastery in real physical constraints."
    ],
    stats: [
      { label: "CGPA", value: "8.26" },
      { label: "Foundations", value: "Analog & VLSI" },
      { label: "Core Discipline", value: "Instrumentation" }
    ],
    accent: "#FF7B00"
  },
  {
    step: "02",
    tag: "FIELD RIGOR & EMBEDDED MASTERY",
    title: "What I Learned & Developed",
    subtitle: "From Factory Floors to Real-time IoT Mesh Pipelines",
    period: "2024 — 2025",
    description:
      "Theory transformed into battlefield reliability across industrial manufacturing plants. At Emox Manufacturing, I wired high-voltage industrial panels and calibrated precision sensors. At GT Electronic India, I diagnosed PLC automation lines and validated high-speed signal integrity. Concurrently, for my capstone, I architected an end-to-end IoT Harbour Vessel Tracking system across a 200m maritime corridor.",
    details: [
      "Wired, tested, and diagnosed industrial PLC control panels and factory instrumentation.",
      "Built automated boat tracking with ESP32 Wi-Fi RSSI proximity, sub-2s latency, MQTT, and MariaDB.",
      "Bridged embedded C firmware directly with Node-RED real-time HMI supervisory dashboards."
    ],
    stats: [
      { label: "Detection Latency", value: "< 2.0s" },
      { label: "Database Reliability", value: "100%" },
      { label: "Corridor Range", value: "200m" }
    ],
    accent: "#FE3303"
  },
  {
    step: "03",
    tag: "FRONTIER ENGINEERING & DIGITAL TWINS",
    title: "What I Create Today",
    subtitle: "End-to-End Hardware R&D and 3D Interactive Cyber-Physical Systems",
    period: "2026 — PRESENT",
    description:
      "Now as a Graduate Engineering Trainee at Schopiq Automation, I lead hardware design and R&D for next-generation automation solutions. I engineer custom PCBs, optimize Bills of Materials (BOM), write deterministic Embedded C firmware, and build immersive WebGL digital twins that render live industrial telemetry into cinematic 3D digital realities.",
    details: [
      "Full lifecycle hardware R&D: schematic capture, PCB layout, prototype assembly, and validation.",
      "Industrial PLC and embedded system programming for mission-critical automation solutions.",
      "Crafting high-performance WebGL & Three.js 3D visualizations that give physical hardware a stunning digital voice."
    ],
    stats: [
      { label: "R&D Domain", value: "Hardware & PCB" },
      { label: "Architecture", value: "Cyber-Physical" },
      { label: "Status", value: "Schopiq Automation" }
    ],
    accent: "#C344B5"
  }
];

export const skillCategories = [
  {
    id: "hardware",
    name: "Hardware & PCB Design",
    badge: "Silicon & Board Architecture",
    description: "Designing reliable, noise-immune, high-frequency circuits and production-ready PCBs.",
    skills: [
      { name: "Hardware Design & R&D", level: 95, icon: "Cpu", tags: ["Schematic", "Prototyping", "Validation"] },
      { name: "PCB Design & Layout", level: 90, icon: "Layers", tags: ["Multilayer", "Routing", "Gerber"] },
      { name: "BOM Management", level: 92, icon: "ClipboardList", tags: ["Component Sourcing", "Cost Optimization"] },
      { name: "VLSI Design & Logic", level: 85, icon: "Binary", tags: ["Digital Circuits", "CMOS", "HDL"] },
      { name: "Sensor Calibration", level: 94, icon: "Sliders", tags: ["4-20mA", "Transducers", "Signal Conditioning"] },
      { name: "Circuit Assembly & SMT", level: 92, icon: "Hammer", tags: ["Soldering", "Rework", "Testing"] }
    ]
  },
  {
    id: "embedded",
    name: "Embedded Systems & Firmware",
    badge: "Low-Level Silicon Control",
    description: "Writing deterministic, low-latency firmware close to the bare metal.",
    skills: [
      { name: "Embedded C / C++", level: 94, icon: "Code2", tags: ["Registers", "Interrupts", "Memory Opt"] },
      { name: "ESP32 (Wi-Fi / BLE)", level: 96, icon: "Wifi", tags: ["FreeRTOS", "Mesh", "RSSI Telemetry"] },
      { name: "Arduino & AVR / PIC", level: 92, icon: "Microchip", tags: ["Timers", "PWM", "H-Bridge Control"] },
      { name: "Communication Protocols", level: 90, icon: "Network", tags: ["I2C", "SPI", "UART", "RS-485"] },
      { name: "RTOS & Task Scheduling", level: 86, icon: "Timer", tags: ["Semaphores", "Queues", "Deterministic"] },
      { name: "Firmware Debugging", level: 90, icon: "Bug", tags: ["Logic Analyzers", "JTAG", "Serial Telemetry"] }
    ]
  },
  {
    id: "automation",
    name: "Industrial Automation & PLC",
    badge: "Industrial Process Control",
    description: "Building fail-safe factory automation, PLC interlocks, and supervisory control systems.",
    skills: [
      { name: "PLC Programming & Interfacing", level: 92, icon: "Workflow", tags: ["Ladder Logic", "FBD", "I/O Modules"] },
      { name: "Industrial Instrumentation", level: 95, icon: "Gauge", tags: ["Transmitters", "Pressure", "Flow Sensors"] },
      { name: "Control Panel Engineering", level: 90, icon: "Boxes", tags: ["Wiring Inspection", "Safety Relays", "DIN-rail"] },
      { name: "Process Automation", level: 88, icon: "Cog", tags: ["Closed Loop", "PID Tuning", "Interlocks"] },
      { name: "Signal Testing & Diagnosis", level: 92, icon: "Activity", tags: ["Noise Filtering", "Ground Loops", "Fault Finding"] },
      { name: "HMI & SCADA Systems", level: 88, icon: "MonitorPlay", tags: ["Operator Screens", "Alarming", "Telemetry"] }
    ]
  },
  {
    id: "iot",
    name: "IoT & Cloud Pipelines",
    badge: "Connected Telemetry",
    description: "Streaming sensor data reliably across wireless networks into persistent databases.",
    skills: [
      { name: "MQTT Broker Architecture", level: 95, icon: "Radio", tags: ["Pub/Sub", "QoS Levels", "Mosquitto"] },
      { name: "Node-RED Flow Automation", level: 94, icon: "GitFork", tags: ["Dashboard UI", "Event Processing", "APIs"] },
      { name: "MariaDB & SQL Databases", level: 88, icon: "Database", tags: ["Persistent Logging", "Indexes", "Time-series"] },
      { name: "Wi-Fi Proximity & RSSI", level: 92, icon: "Radar", tags: ["Trilateration", "Filtering", "Vessel Tracking"] },
      { name: "WebSockets & REST APIs", level: 86, icon: "Globe", tags: ["Real-time Sync", "JSON Payloads", "Webhooks"] },
      { name: "Edge Computing", level: 88, icon: "Server", tags: ["Local Caching", "Edge Filtering", "ESP-NOW"] }
    ]
  },
  {
    id: "creative",
    name: "Creative Tech & WebGL 3D",
    badge: "Immersive Digital Craft",
    description: "Translating engineering data into cinematic 3D digital experiences and fluid interactions.",
    skills: [
      { name: "Three.js & WebGL 3D", level: 90, icon: "Box", tags: ["Custom Shaders", "Particle Physics", "GLTF"] },
      { name: "GSAP & ScrollTrigger", level: 92, icon: "Sparkles", tags: ["Kinetic Motion", "Timeline Choreography", "Parallax"] },
      { name: "Interactive Front-End (React)", level: 90, icon: "Terminal", tags: ["Tailwind CSS", "Modern ES6+", "State Arch"] },
      { name: "Digital Twin Visualization", level: 88, icon: "ScanLine", tags: ["3D Telemetry", "Live Sensors", "Industrial UI"] },
      { name: "Web Audio Synthesizer", level: 84, icon: "Volume2", tags: ["Procedural FX", "Oscillators", "Soundscapes"] },
      { name: "Creative Shader Experiments", level: 86, icon: "Flame", tags: ["GLSL", "Raymarching", "Fluid Dynamics"] }
    ]
  },
  {
    id: "tools",
    name: "Engineering & Lab Arsenal",
    badge: "Hardware Workbench & Tooling",
    description: "Precision lab instruments and software tools utilized daily on the testing bench.",
    skills: [
      { name: "Digital Storage Oscilloscope", level: 94, icon: "AudioWaveform", tags: ["Waveform Analysis", "Triggering", "Decoding"] },
      { name: "Logic Analyzers & Bus Sniffers", level: 90, icon: "SearchCheck", tags: ["Protocol Decoding", "Timing Jitter"] },
      { name: "Precision Multimeters & Calibrators", level: 96, icon: "Crosshair", tags: ["Current Probes", "4-20mA Source", "Resistance"] },
      { name: "Git & Version Control", level: 92, icon: "GitBranch", tags: ["Git CLI", "GitHub", "Firmware Releases"] },
      { name: "CAD & Electronic Schematics", level: 88, icon: "PenTool", tags: ["KiCad", "Altium", "Circuit Simulation"] },
      { name: "PLC Programming Suites", level: 90, icon: "Cpu", tags: ["GX Works", "TIA Portal", "Delta WPL"] }
    ]
  }
];

export const selectedProjects = [
  {
    id: "harbour-boats-tracker",
    number: "01",
    title: "HARBOUR AURA",
    subtitle: "IoT Harbour Marine Vessel Tracking & Proximity Mesh",
    category: "IoT, Embedded Systems & Telemetry",
    year: "2026",
    badge: "B.Tech Final Year Capstone Project",
    summary:
      "An automated vessel tracking system that detects and classifies boat entries and exits across a 200-metre harbour passage in real time, completely replacing prone manual logbooks.",
    accent: "#FE3303",
    metrics: [
      { label: "Corridor Span", value: "200m" },
      { label: "Detection Latency", value: "< 2.0s" },
      { label: "Database Reliability", value: "100%" },
      { label: "Logging Automation", value: "100%" }
    ],
    tags: ["ESP32", "Wi-Fi RSSI", "MQTT", "Node-RED", "MariaDB", "HMI Dashboard"],
    overview:
      "Manual vessel logging at harbour checkpoints is notoriously prone to human error, missed night-time passages, and delayed port authority manifests. HARBOUR AURA solves this via an array of weatherized ESP32 Wi-Fi transceivers utilizing Kalman-filtered RSSI proximity metrics to automatically timestamp, track, and classify boat movements across a 200-metre wide maritime corridor.",
    architecture:
      "ESP32 Nodes at Harbour Entry/Exit Gates -> Wireless RSSI Packet Capture & Filter -> MQTT Broker Pub/Sub -> Node-RED Event Engine & Direction Classifier -> MariaDB Persistent Time-Series Storage -> Real-Time Operator HMI Dashboard.",
    keyFeatures: [
      "Sub-2-second detection latency with direction classification (Inbound vs Outbound).",
      "Robust RSSI noise filtering algorithms to eliminate false positives from maritime wave reflections.",
      "Complete data pipeline integrating MQTT telemetry directly into MariaDB with 100% database write reliability.",
      "Live operator HMI dashboard built in Node-RED with interactive vessel status, automated alerts, and daily audit export.",
      "Replaced traditional paper clipboards and manual human logging with fully autonomous digital oversight."
    ],
    technicalHighlights: [
      "Hardware: ESP32-WROOM-32 with high-gain directional antennas.",
      "Firmware: Embedded C with FreeRTOS multitasking to guarantee concurrent radio scanning and MQTT telemetry transmission.",
      "Network: Low-overhead MQTT protocol with QoS level 1 for zero message drop.",
      "Storage: Optimized MariaDB schema indexing vessel IDs, timestamps, RSSI vectors, and passage durations."
    ],
    results:
      "Successfully deployed and benchmarked at the harbour passage. The system achieved sub-2-second detection latency with zero missed vessel movements during operational trials, earning top honors as the B.Tech Capstone Project at Puducherry Technological University.",
    githubLink: "https://github.com/sarrvesh-m/harbour-vessel-tracking",
    liveDemo: "#"
  },
  {
    id: "remote-controlled-car",
    number: "02",
    title: "HEX-DRIVE ROBOTIC PLATFORM",
    subtitle: "Precision Three-Wheeled Robotic Vehicle & Dual H-Bridge Actuation",
    category: "Robotics & Hardware Design",
    year: "2025",
    badge: "Hardware & Mechatronics Project",
    summary:
      "A high-torque, three-wheeled robotic vehicle driven by dual DC motors with bidirectional H-Bridge PWM speed and steering control.",
    accent: "#FF7B00",
    metrics: [
      { label: "Motor Driver", value: "L293D H-Bridge" },
      { label: "Steering Mode", value: "Differential" },
      { label: "Control Latency", value: "< 15ms" },
      { label: "Drive Configuration", value: "3-Wheel Platform" }
    ],
    tags: ["Arduino UNO", "L293D H-Bridge", "Embedded C", "DC Motor PWM", "Hardware Prototyping"],
    overview:
      "HEX-DRIVE was engineered to explore precision low-level motor actuation, back-EMF suppression, and real-time remote telemetry. Built on a custom lightweight chassis, the vehicle utilizes an Arduino UNO coupled with an L293D dual H-bridge motor driver to execute high-torque differential steering, smooth acceleration ramping, and agile omnidirectional maneuvers.",
    architecture:
      "RF Remote / Serial Interface -> Arduino UNO Microcontroller -> PWM Timers & Direction Logic -> L293D Dual H-Bridge -> Dual High-Torque DC Motors with Ball Caster Wheel.",
    keyFeatures: [
      "Dual DC motor control with full forward, reverse, pivot, and zero-radius spin capabilities.",
      "Software PWM ramping routines to eliminate motor stall currents and mechanical gear shock.",
      "Flyback diode back-EMF protection circuitry safeguarding logic electronics from inductive voltage spikes.",
      "Modular sensor expansion header for future ultrasonic rangefinding and autonomous line-tracking integration.",
      "Lightweight custom acrylic chassis designed for balanced weight distribution and center of mass."
    ],
    technicalHighlights: [
      "Microcontroller: ATmega328P (Arduino UNO) programmed via optimized low-level register timers.",
      "Power Stage: L293D dual full-bridge driver handling up to 1.2A peak current per channel.",
      "Power Isolation: Dual-rail power supply separating noisy motor inductive loads from 5V microcontroller logic."
    ],
    results:
      "Demonstrated outstanding mechanical agility, sub-15ms response latency to remote commands, and smooth variable-speed control without motor overheating or voltage drops on the MCU rail.",
    githubLink: "https://github.com/sarrvesh-m/hex-drive-robotics",
    liveDemo: "#"
  },
  {
    id: "schopiq-automation-matrix",
    number: "03",
    title: "SCHOPIQ INTELLICORE",
    subtitle: "Industrial Automation & PLC Control Matrix with Hardware R&D",
    category: "Industrial Automation & Embedded R&D",
    year: "2026",
    badge: "Schopiq Automation Engineering",
    summary:
      "Next-generation hardware R&D, multi-layer circuit design, and industrial PLC control integration for mission-critical automation systems.",
    accent: "#C344B5",
    metrics: [
      { label: "Supply Standard", value: "24V Industrial" },
      { label: "Safety Level", value: "Fail-Safe Interlock" },
      { label: "PCB Layers", value: "Multi-layer R&D" },
      { label: "Response Time", value: "< 5ms" }
    ],
    tags: ["Hardware R&D", "PCB Design", "BOM Optimization", "PLC Interfacing", "Embedded C"],
    overview:
      "At Schopiq Automation, industrial automation requires uncompromising hardware reliability. INTELLICORE represents R&D engineering encompassing circuit schematic design, multi-layer PCB layout, component selection, BOM rationalization, and embedded firmware interfacing with industrial PLC logic controllers to streamline factory operations.",
    architecture:
      "Field Sensors & Safety Switches -> Optoisolated Signal Conditioning -> Custom R&D PCB / Microcontroller -> Industrial PLC Interface -> Actuator Drivers & Pneumatics.",
    keyFeatures: [
      "End-to-end hardware development: from functional schematic capture to physical prototype testing.",
      "Industrial-grade signal conditioning isolating sensitive digital logic from harsh 24V factory electrical noise.",
      "Optimized Bill of Materials (BOM) reducing component lead times and assembly overhead.",
      "Deterministic Embedded C firmware interfacing with PLC ladder logic for fail-safe machinery interlocking.",
      "Comprehensive prototype testing, thermal validation, and electromagnetic interference (EMI) troubleshooting."
    ],
    technicalHighlights: [
      "Optoisolation: High-speed optocouplers preventing ground loops and industrial high-voltage transients.",
      "Firmware: Embedded C routines with watchdog timers and hardware error recovery routines.",
      "Standard Compliance: Designed according to industrial electrical panel wiring and safety standards."
    ],
    results:
      "Delivered robust hardware prototypes for Schopiq Automation, passing rigorous testing and validation under continuous operational thermal cycles.",
    githubLink: "#",
    liveDemo: "#"
  },
  {
    id: "nexus-3d-hmi",
    number: "04",
    title: "NEXUS CYBER-TWIN",
    subtitle: "Real-time 3D Telemetry & WebGL Interactive Digital Twin",
    category: "Creative Technology & Digital Twins",
    year: "2026",
    badge: "Interactive 3D Engineering Platform",
    summary:
      "A cinematic 3D digital twin platform rendering live hardware sensor telemetry into an interactive WebGL spatial environment at 60 FPS.",
    accent: "#FF7B00",
    metrics: [
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Telemetry Delay", value: "< 50ms" },
      { label: "Shader Physics", value: "GLSL Raymarch" },
      { label: "3D Engine", value: "Three.js / WebGL" }
    ],
    tags: ["Three.js", "WebGL", "GSAP", "WebSockets", "Digital Twin", "Telemetry UI"],
    overview:
      "Bridging the physical factory floor with modern creative front-end technology, NEXUS CYBER-TWIN ingests live sensor feeds (temperature, pressure, vibration, motor RPM) and maps them directly onto an interactive 3D model in real time. Built with Three.js, custom GLSL shaders, and GSAP.",
    architecture:
      "Physical Sensor Nodes -> MQTT / WebSocket Gateway -> Three.js WebGL Rendering Pipeline -> Dynamic Vertex Displacement & Heatmap Shader -> Interactive Operator HUD.",
    keyFeatures: [
      "Cinematic 3D circuit board and robotic arm visualization with real-time mouse orbit and zoom.",
      "Interactive heatmap shaders highlighting hot components and stress points based on incoming telemetry.",
      "Ultra-fluid 60 FPS performance optimized with instanced meshes and lightweight geometry buffers.",
      "Interactive HUD controls allowing operators to isolate individual subsystems and view historical logs."
    ],
    technicalHighlights: [
      "WebGL Shaders: Custom GLSL fragment shaders for glowing signal traces and thermal dissipation effects.",
      "Choreography: GSAP timelines synchronizing camera transitions during alert states.",
      "State Management: Zero-garbage-collection telemetry buffer for stutter-free 60 FPS rendering."
    ],
    results:
      "Offers an award-winning user experience inspired by leading digital studios, proving how industrial engineering data can be transformed into awe-inspiring creative art.",
    githubLink: "https://github.com/sarrvesh-m/nexus-3d-digital-twin",
    liveDemo: "#"
  }
];

export const experienceTimeline = [
  {
    role: "Graduate Engineering Trainee",
    company: "Schopiq Automation",
    location: "Puducherry, India",
    period: "Jul 2026 — Present",
    type: "Full-time • On-site",
    color: "#FE3303",
    description:
      "Leading hardware design and R&D for automation solutions. Working across circuit design, PCB layout, component selection, and embedded systems development.",
    achievements: [
      "Handle end-to-end hardware assembly, prototype debugging, validation, and system troubleshooting.",
      "Manage comprehensive Bill of Materials (BOM) to optimize hardware cost, lead times, and reliability.",
      "Apply Embedded C and industrial PLC expertise to architect high-reliability automation machinery."
    ]
  },
  {
    role: "Automation & PLC Engineering Intern",
    company: "GT Electronic India Pvt Ltd",
    location: "Puducherry, India",
    period: "30 Jun 2025 — 12 Jul 2025",
    type: "Industrial Internship",
    color: "#FF7B00",
    description:
      "Engaged directly on high-speed manufacturing lines with electronic components and industrial automation systems.",
    achievements: [
      "Gained practical experience with PLC interfacing, control panel inspection, and high-frequency signal testing.",
      "Supported maintenance and diagnostic fault-finding on precision instrumentation devices deployed in active production lines.",
      "Analyzed signal waveforms on test benches to identify noise anomalies in automation telemetry."
    ]
  },
  {
    role: "Instrumentation & Panel Engineering Intern",
    company: "Emox Manufacturing Private Limited",
    location: "Puducherry, India",
    period: "21 May 2024 — 3 Jun 2024",
    type: "Industrial Internship",
    color: "#C344B5",
    description:
      "Hands-on exposure to heavy industrial instrumentation, sensor calibration protocols, and industrial electrical panel wiring.",
    achievements: [
      "Assisted in testing and troubleshooting control circuits and field instruments under manufacturing floor conditions.",
      "Calibrated industrial process sensors (temperature, pressure, flow) to meet strict operational tolerances.",
      "Mastered industrial safety wiring protocols, DIN-rail terminal layouts, and protective relay configurations."
    ]
  }
];

export const educationHistory = [
  {
    degree: "B.Tech in Electronics and Instrumentation Engineering",
    institution: "Puducherry Technological University",
    location: "Puducherry, India",
    period: "Nov 2022 — May 2026",
    grade: "CGPA: 8.26",
    highlight: "First Class with Distinction • Capstone: Automated Harbour Vessel Tracking System"
  },
  {
    degree: "Higher Secondary Certificate (HSC - 12th)",
    institution: "St. Patrick Matric Higher Secondary School",
    location: "Puducherry, India",
    period: "May 2022",
    grade: "84.0%",
    highlight: "Strong focus on Physics, Mathematics, and Computer Science"
  },
  {
    degree: "Secondary School Leaving Certificate (SSLC - 10th)",
    institution: "St. Patrick Matric Higher Secondary School",
    location: "Puducherry, India",
    period: "March 2020",
    grade: "75.4%",
    highlight: "Science and Mathematics Foundation"
  }
];

export const playgroundExperiments = [
  {
    id: "pcb-core",
    name: "CYBER PCB SILICON CORE",
    subtitle: "3D Interactive Microcontroller & Glowing Copper Traces",
    category: "Three.js 3D & Procedural Geometry",
    description:
      "An interactive 3D circuit board and microchip processor featuring glowing animated traces, rotating quantum rings, pulsing status diodes, and 360° mouse orbit drag.",
    controls: ["Mouse Drag to Orbit", "Scroll to Zoom", "Click Chip to Pulse Current", "Toggle Trace Glow"]
  },
  {
    id: "particle-vortex",
    name: "QUANTUM PARTICLE VORTEX",
    subtitle: "50,000 Points with Dynamic Gravity & Inertia Physics",
    category: "High-Performance GPU Particle System",
    description:
      "A storm of 50,000 particle vertices moving according to curl noise, mouse gravity attraction, vortex spinning velocity, and dynamic chromatic color gradients.",
    controls: ["Move Mouse to Attract", "Click to Disperse", "Adjust Particle Density", "Switch Hue Presets"]
  },
  {
    id: "metaball-shader",
    name: "FLUID RAYMARCHED METABALLS",
    subtitle: "GLSL Fragment Shader & Chromatic Aberration",
    category: "Custom GLSL Shader & Raymarching",
    description:
      "Real-time raymarched organic liquid metaballs blending organically with optical chromatic aberration in Guillaume Zhu's palette (#FF7B00, #FE3303, #C344B5).",
    controls: ["Cursor Repulsion", "Viscosity Slider", "Internal Glow", "Color Shift"]
  },
  {
    id: "wave-terrain",
    name: "KINETIC FREQUENCY WAVEFORM",
    subtitle: "Audio-Reactive Vertex Displacement Mesh",
    category: "Procedural Mesh Deformation",
    description:
      "A dynamic 3D surface mesh undulating with procedural Perlin noise and reactive frequency oscillations that respond to mouse velocity and synthesized harmonics.",
    controls: ["Mouse Speed Drives Amplitude", "Wireframe / Solid Toggle", "Harmonic Resonance", "Camera Tilt"]
  }
];

