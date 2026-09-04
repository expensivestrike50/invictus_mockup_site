import { useCallback, useRef, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

// Color conversion utilities
function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  
  let r = 0, g = 0, b = 0;
  
  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : null;
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  
  if (max !== min) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
    }
  }
  
  return [h, s, v];
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [hsv, setHsv] = useState<[number, number, number]>(() => {
    const rgb = hexToRgb(color);
    return rgb ? rgbToHsv(...rgb) : [0, 1, 1];
  });
  const [hexInput, setHexInput] = useState(color);
  
  const satBrightRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const isDraggingSatBright = useRef(false);
  const isDraggingHue = useRef(false);

  // Update hex input when color changes externally
  useEffect(() => {
    const rgb = hexToRgb(color);
    if (rgb) {
      const newHsv = rgbToHsv(...rgb);
      setHsv(newHsv);
      setHexInput(color);
    }
  }, [color]);

  const updateFromHsv = useCallback((h: number, s: number, v: number) => {
    const rgb = hsvToRgb(h, s, v);
    const hex = rgbToHex(...rgb);
    setHsv([h, s, v]);
    setHexInput(hex);
    onChange(hex);
  }, [onChange]);

  const handleSatBrightMove = useCallback((clientX: number, clientY: number) => {
    if (!satBrightRef.current) return;
    const rect = satBrightRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    updateFromHsv(hsv[0], x, 1 - y);
  }, [hsv, updateFromHsv]);

  const handleHueMove = useCallback((clientX: number) => {
    if (!hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    updateFromHsv(x * 360, hsv[1], hsv[2]);
  }, [hsv, updateFromHsv]);

  const handleMouseDown = (type: 'satBright' | 'hue') => (e: React.MouseEvent) => {
    e.preventDefault();
    if (type === 'satBright') {
      isDraggingSatBright.current = true;
      handleSatBrightMove(e.clientX, e.clientY);
    } else {
      isDraggingHue.current = true;
      handleHueMove(e.clientX);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSatBright.current) {
        handleSatBrightMove(e.clientX, e.clientY);
      } else if (isDraggingHue.current) {
        handleHueMove(e.clientX);
      }
    };

    const handleMouseUp = () => {
      isDraggingSatBright.current = false;
      isDraggingHue.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleHexChange = (value: string) => {
    setHexInput(value);
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      const rgb = hexToRgb(value);
      if (rgb) {
        const newHsv = rgbToHsv(...rgb);
        setHsv(newHsv);
        onChange(value);
      }
    }
  };

  const hueColor = rgbToHex(...hsvToRgb(hsv[0], 1, 1));

  return (
    <div className="space-y-3 p-1">
      {/* Saturation/Brightness area */}
      <div
        ref={satBrightRef}
        className="relative w-48 h-36 rounded-lg cursor-crosshair overflow-hidden"
        style={{
          background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})`
        }}
        onMouseDown={handleMouseDown('satBright')}
      >
        {/* Picker indicator */}
        <div
          className="absolute w-4 h-4 border-2 border-white rounded-full shadow-md pointer-events-none"
          style={{
            left: `${hsv[1] * 100}%`,
            top: `${(1 - hsv[2]) * 100}%`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)'
          }}
        />
      </div>

      {/* Hue slider */}
      <div
        ref={hueRef}
        className="relative w-48 h-3 rounded-full cursor-pointer"
        style={{
          background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)'
        }}
        onMouseDown={handleMouseDown('hue')}
      >
        <div
          className="absolute w-4 h-4 border-2 border-white rounded-full shadow-md pointer-events-none"
          style={{
            left: `${(hsv[0] / 360) * 100}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: hueColor,
            boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)'
          }}
        />
      </div>

      {/* Hex input and preview */}
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-md border border-border"
          style={{ backgroundColor: color }}
        />
        <Input
          value={hexInput}
          onChange={(e) => handleHexChange(e.target.value)}
          className="flex-1 h-8 text-xs font-mono uppercase"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}
