import React from 'react';

export default function Marquee({
  items = [
    'HARDWARE R&D',
    'EMBEDDED C',
    'SCHOPIQ AUTOMATION',
    'PLC AUTOMATION',
    'IOT MESH & MQTT',
    'THREE.JS & WEBGL',
    'DIGITAL TWIN',
    'PUDUCHERRY TECH UNIVERSITY',
    'CIRCUIT DESIGN & PCB',
    'SENSOR CALIBRATION',
  ],
  direction = 'left',
  speed = 'normal',
}) {
  const displayItems = [...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden py-4 border-y border-[#F5E7DF]/10 bg-[#161515] select-none">
      <div className="animate-marquee flex items-center gap-8">
        {displayItems.map((item, index) => (
          <div key={index} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-['Cabinet_Grotesk'] text-lg sm:text-2xl font-black uppercase tracking-wider text-[#F5E7DF]/80 hover:text-[#FF7B00] transition-colors">
              {item}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#FF7B00] to-[#FE3303]" />
          </div>
        ))}
      </div>
    </div>
  );
}

