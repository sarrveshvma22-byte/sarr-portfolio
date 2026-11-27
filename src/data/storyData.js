// Complete narrative and project data inspired by jehaduddin.vercel.app
// Tailored with Sarrvesh M's authentic engineering trajectory

export const personalInfo = {
  name: "Sarrvesh M",
  role: "Creative Technologist & Embedded Hardware Engineer",
  location: "Puducherry, India",
  coordinates: "11.9416° N, 79.8083° E",
  email: "sarrveshvma22@gmail.com",
  phone: "+91 9790431812",
  whatsapp: "https://wa.me/919790431812",
  linkedin: "https://linkedin.com/in/sarrvesh-m",
  github: "https://github.com/sarrveshvma22-byte",
  available: "Open to engineering & creative technology roles",
  replies: "Replies within 24 hours",
  education: "B.Tech in Electronics and Instrumentation (CGPA 8.26)",
  university: "Puducherry Technological University",
  currentRole: "Graduate Engineering Trainee at Schopiq Automation",
};

export const chapters = [
  {
    id: "ground",
    number: "01",
    title: "Ground",
    label: "Dream",
    from: 0,
    to: 2.5,
    tagline: "Before logic gates, there was voltage.",
    lines: [
      "A long time ago, my curiosity was physical.",
      "I wanted to understand how invisible electrons bring machines to life.",
      "At Puducherry Technological University, it began with bare copper, op-amps, and breadboards."
    ],
    feel: { k: 3, gain: 0.5 },
  },
  {
    id: "adrift",
    number: "02",
    title: "Adrift",
    label: "Dig",
    from: 2.5,
    to: 5.0,
    tagline: "Theory is clean. The physical world is noisy.",
    lines: [
      "In textbooks, signals are ideal square waves.",
      "In reality, wires have inductance, sensors drift with temperature, and noise is everywhere.",
      "I learned to embrace the imperfections of the physical plane."
    ],
    feel: { k: 3.2, gain: 0.55 },
  },
  {
    id: "push",
    number: "03",
    title: "The push",
    label: "Decode",
    from: 5.0,
    to: 8.0,
    tagline: "Stepping onto factory floors.",
    lines: [
      "At Emox Manufacturing and GT Electronic, I stood amidst active industrial production lines.",
      "Wiring 24V control panels, calibrating 4-20mA pressure transmitters, and troubleshooting PLC relays.",
      "Engineering wasn't an academic exercise anymore. It was about zero failure tolerances."
    ],
    feel: { k: 2.6, gain: 0.7 },
  },
  {
    id: "hole",
    number: "04",
    title: "The black hole",
    label: "Direct",
    from: 8.0,
    to: 12.0,
    tagline: "Everything is connected. They are not separate disciplines.",
    lines: [
      "The deeper I go, the more the boundaries dissolve.",
      "Silicon registers shape communication packets. Radio waves feed database queries.",
      "And raw telemetry transforms into cinematic 3D digital realities."
    ],
    feel: { k: 2.4, gain: 0.4 },
    orbit: [
      "Hardware Design.",
      "Embedded C.",
      "PLC Automation.",
      "IoT Mesh.",
      "Three.js & WebGL.",
      "VLSI & Circuits.",
      "Digital Twins."
    ]
  },
  {
    id: "sling",
    number: "05",
    title: "Slingshot",
    label: "Propel",
    from: 12.0,
    to: 14.0,
    tagline: "Kinetic acceleration.",
    lines: [
      "Accelerating from prototype to deployment.",
      "Harmonizing speed, stability, and elegance."
    ],
    feel: { k: 1.3, gain: 1.0 },
  },
  {
    id: "pieces",
    number: "06",
    title: "Pieces of a world",
    label: "Draft",
    from: 14.0,
    to: 19.0,
    tagline: "Things built with intention, tested under real-world constraints.",
    lines: [
      "I don't collect technologies just to list them on a resume.",
      "I build systems that solve real human and industrial problems."
    ],
    feel: { k: 4.5, gain: 0.5 },
  },
  {
    id: "dark",
    number: "07",
    title: "The dark",
    label: "Reflect",
    from: 19.0,
    to: 21.0,
    tagline: "Late nights in the hardware laboratory.",
    lines: [
      "You don't need all the answers before you begin soldering.",
      "You just need the discipline to test one trace at a time, measure with the oscilloscope, and keep building."
    ],
    feel: { k: 14, gain: 0.24 },
  },
  {
    id: "surface",
    number: "08",
    title: "The surface",
    label: "Drop",
    from: 21.0,
    to: 23.5,
    tagline: "Touching still water at dawn.",
    lines: [
      "Purpose isn't stumbled upon. It is engineered with daily dedication.",
      "At Schopiq Automation, I push hardware R&D, multi-layer PCBs, and embedded systems to their limits."
    ],
    feel: { k: 6, gain: 0.5 },
  },
  {
    id: "home",
    number: "09",
    title: "Home",
    label: "Arrive",
    from: 23.5,
    to: 27.0,
    tagline: "This is Sarrvesh M.",
    lines: [
      "I design the hardware and I write the code. Nothing gets lost in handoff.",
      "From silicon schematics to high-performance 3D visual computing."
    ],
    feel: { k: 5, gain: 0.6 },
  }
];

export const works = [
  {
    id: "harbour-aura",
    tag: "IoT Vessel Tracking & Proximity Mesh",
    name: "Harbour Aura",
    made: "ESP32 Wi-Fi RSSI matrix, Kalman filtering, MQTT, Node-RED & MariaDB",
    line: "An automated vessel tracking system across a 200m maritime corridor in real time.",
    overview:
      "Manual vessel logging at harbour checkpoints is notoriously prone to human error, missed night-time passages, and delayed port manifests. Harbour Aura solves this using an array of weatherized ESP32 transceivers that utilize Kalman-filtered RSSI proximity metrics to automatically timestamp, track, and classify boat movements across a 200-metre maritime passage with sub-2-second latency and 100% database logging reliability.",
    stats: [
      { label: "Corridor Span", value: "200m" },
      { label: "Detection Latency", value: "< 2.0s" },
      { label: "Database Reliability", value: "100%" },
      { label: "Manual Log Replacement", value: "100%" }
    ],
    architecture:
      "ESP32 Entry/Exit Sensor Array -> RSSI Wireless Packet Filter -> MQTT Pub/Sub Broker -> Node-RED Direction Classifier -> MariaDB Time-Series DB -> Live Supervisory HMI.",
    aspect: 1600 / 1000,
    year: "2026",
    badge: "B.Tech Final Year Capstone",
    url: "https://github.com/sarrvesh-m/harbour-vessel-tracking",
    liveUrl: "#"
  },
  {
    id: "hex-drive",
    tag: "Robotics & Motor Control",
    name: "Hex-Drive Platform",
    made: "Arduino UNO, L293D dual H-bridge, PWM timer registers, differential steering",
    line: "A precision three-wheeled robotic vehicle driven by dual DC motors with bidirectional H-bridge control.",
    overview:
      "Hex-Drive was engineered to explore low-level motor actuation, back-EMF suppression, and real-time remote telemetry. Built with an ATmega328P microcontroller coupled with an L293D dual H-bridge driver, the platform executes high-torque differential steering, software PWM ramping routines to eliminate motor stall currents, and flyback diode back-EMF protection circuitry safeguarding sensitive logic electronics.",
    stats: [
      { label: "Control Latency", value: "< 15ms" },
      { label: "Motor Driver", value: "L293D H-Bridge" },
      { label: "Steering Mode", value: "Differential" },
      { label: "Drive Configuration", value: "3-Wheel Platform" }
    ],
    architecture:
      "RF Remote / Serial Stream -> ATmega328P Microcontroller -> PWM Timers & Direction Logic -> L293D Dual H-Bridge Driver -> High-Torque Dual DC Motors.",
    aspect: 1600 / 1000,
    year: "2025",
    badge: "Hardware & Mechatronics",
    url: "https://github.com/sarrvesh-m/hex-drive-robotics",
    liveUrl: "#"
  },
  {
    id: "schopiq-core",
    tag: "Industrial Automation & Hardware R&D",
    name: "Schopiq Intellicore",
    made: "Circuit schematic capture, multi-layer PCB layout, BOM optimization, PLC ladder logic",
    line: "Next-generation hardware R&D and industrial PLC automation systems built for zero-failure reliability.",
    overview:
      "At Schopiq Automation, industrial automation demands uncompromising hardware reliability under harsh factory environments. Intellicore represents full-lifecycle R&D engineering encompassing circuit schematic design, multi-layer PCB layout, component selection, BOM rationalization, and deterministic Embedded C firmware interfacing directly with industrial PLC controllers and DIN-rail safety interlocks.",
    stats: [
      { label: "Operating Standard", value: "24V Industrial" },
      { label: "Interlock Level", value: "Fail-Safe" },
      { label: "Response Latency", value: "< 5ms" },
      { label: "Design Scope", value: "Multi-layer R&D" }
    ],
    architecture:
      "Field Sensors & Limit Switches -> Optoisolated Signal Conditioning -> Custom R&D PCB / Microcontroller -> Industrial PLC Interface -> Actuator Drivers & Solenoids.",
    aspect: 1600 / 1000,
    year: "2026",
    badge: "Schopiq Automation R&D",
    url: "#",
    liveUrl: "#"
  },
  {
    id: "nexus-twin",
    tag: "Creative Tech & WebGL Digital Twin",
    name: "Nexus Cyber-Twin",
    made: "Three.js, WebGL2, hand-written GLSL shaders, WebSockets, real-time telemetry",
    line: "A cinematic 3D digital twin platform rendering live sensor feeds into an interactive spatial environment.",
    overview:
      "Bridging the physical factory floor with modern creative front-end technology, Nexus Cyber-Twin ingests live telemetry (temperature, pressure, vibration, motor RPM) and maps them directly onto an interactive 3D model in real time. Built with Three.js and custom GLSL fragment shaders for thermal heatmaps, chromatic aberration, and glowing signal traces operating at fluid 60 FPS.",
    stats: [
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Telemetry Delay", value: "< 50ms" },
      { label: "3D Graphics Engine", value: "Three.js / WebGL" },
      { label: "Shader Physics", value: "Custom GLSL" }
    ],
    architecture:
      "Physical Sensor Nodes -> MQTT / WebSocket Gateway -> Three.js WebGL Pipeline -> Dynamic Heatmap & Displacement Shaders -> Interactive Spatial HUD.",
    aspect: 1600 / 1000,
    year: "2026",
    badge: "Interactive 3D Engineering",
    url: "https://github.com/sarrvesh-m/nexus-3d-digital-twin",
    liveUrl: "#"
  }
];

export const services = {
  lead: "I bridge physical hardware, embedded firmware, and immersive 3D digital experiences.",
  items: [
    {
      what: "Hardware Design & Multi-layer PCBs",
      how: "Schematic capture, component selection, BOM optimization, and high-density PCB layout."
    },
    {
      what: "Embedded Systems & Firmware",
      how: "Deterministic Embedded C/C++, FreeRTOS multitasking, ESP32 Wi-Fi/BLE, and low-level drivers."
    },
    {
      what: "Industrial Automation & PLC Interfacing",
      how: "Ladder logic, DIN-rail control panel wiring, 4-20mA sensor calibration, and fail-safe interlocks."
    },
    {
      what: "Real-time 3D & Digital Twins",
      how: "Three.js, WebGL, hand-written GLSL shaders: rendering live physical telemetry into spatial web experiences."
    }
  ]
};

