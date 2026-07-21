import React, { useState, useMemo } from 'react';
import { RefreshCw, Plus, Trash2 } from 'lucide-react';
import { Field, OutputPanel, CopyButton } from '../../components/toolbox/primitives';

const hexToRgb = (hex) => {
  const m = hex.replace('#', '');
  const n = m.length === 3 ? m.split('').map((c) => c + c).join('') : m;
  const int = parseInt(n, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
};
const rgbToHex = (r, g, b) => '#' + [r, g, b].map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('');
const adjust = (hex, amt) => { const { r, g, b } = hexToRgb(hex); return rgbToHex(r + amt, g + amt, b + amt); };

export const ColorPaletteGenerator = () => {
  const [base, setBase] = useState('#3291FF');
  const [mode, setMode] = useState('shades');
  const palette = useMemo(() => {
    if (mode === 'shades') return [-80, -50, -25, 0, 25, 50, 80].map((a) => adjust(base, a));
    const { r, g, b } = hexToRgb(base);
    // complementary + analogous style using simple channel rotation
    return [base, rgbToHex(b, r, g), rgbToHex(g, b, r), rgbToHex(255 - r, 255 - g, 255 - b), adjust(base, 40), adjust(base, -40)];
  }, [base, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-4">
        <Field label="Base color">
          <div className="flex items-center gap-2">
            <input type="color" value={base} onChange={(e) => setBase(e.target.value)} data-testid="palette-color" className="h-10 w-14 cursor-pointer rounded border border-border bg-background" />
            <input value={base} onChange={(e) => setBase(e.target.value)} data-testid="palette-hex" className="w-28 rounded-md border border-border bg-background px-3 py-2 font-mono text-sm" />
          </div>
        </Field>
        <Field label="Mode">
          <select value={mode} onChange={(e) => setMode(e.target.value)} data-testid="palette-mode" className="rounded-md border border-border bg-background px-3 py-2 text-sm">
            <option value="shades">Shades</option><option value="harmony">Harmony</option>
          </select>
        </Field>
        <button data-testid="palette-random" onClick={() => setBase(rgbToHex(...[0, 0, 0].map(() => Math.floor(Math.random() * 256))))} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-muted transition-colors duration-150"><RefreshCw className="h-4 w-4" />Random</button>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7" data-testid="palette-swatches">
        {palette.map((c, i) => (
          <button key={i} onClick={() => navigator.clipboard.writeText(c)} data-testid={`palette-swatch-${i}`} className="group overflow-hidden rounded-lg border border-border transition-transform duration-150 hover:-translate-y-0.5">
            <div className="h-20 w-full" style={{ background: c }} />
            <div className="bg-background px-2 py-1.5 text-center font-mono text-xs">{c}</div>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">Click a swatch to copy its hex value.</p>
    </div>
  );
};

export const CssGradientGenerator = () => {
  const [type, setType] = useState('linear');
  const [angle, setAngle] = useState(90);
  const [stops, setStops] = useState([{ color: '#3291FF', pos: 0 }, { color: '#7928CA', pos: 100 }]);
  const css = useMemo(() => {
    const s = stops.map((st) => `${st.color} ${st.pos}%`).join(', ');
    return type === 'linear' ? `linear-gradient(${angle}deg, ${s})` : `radial-gradient(circle, ${s})`;
  }, [type, angle, stops]);

  const update = (i, key, val) => setStops((prev) => prev.map((s, idx) => (idx === i ? { ...s, [key]: val } : s)));

  return (
    <div className="space-y-4">
      <div className="h-40 w-full rounded-lg border border-border" style={{ background: css }} data-testid="gradient-preview" />
      <div className="flex flex-wrap items-end gap-4">
        <Field label="Type">
          <select value={type} onChange={(e) => setType(e.target.value)} data-testid="gradient-type" className="rounded-md border border-border bg-background px-3 py-2 text-sm">
            <option value="linear">Linear</option><option value="radial">Radial</option>
          </select>
        </Field>
        {type === 'linear' && (
          <Field label={`Angle: ${angle}°`}>
            <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} data-testid="gradient-angle" className="w-48 accent-primary" />
          </Field>
        )}
        <button data-testid="gradient-add-stop" onClick={() => setStops([...stops, { color: '#ffffff', pos: 50 }])} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-muted transition-colors duration-150"><Plus className="h-4 w-4" />Add stop</button>
      </div>
      <div className="space-y-2">
        {stops.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <input type="color" value={s.color} onChange={(e) => update(i, 'color', e.target.value)} data-testid={`gradient-stop-color-${i}`} className="h-9 w-12 cursor-pointer rounded border border-border" />
            <input value={s.color} onChange={(e) => update(i, 'color', e.target.value)} className="w-28 rounded-md border border-border bg-background px-2 py-1.5 font-mono text-xs" />
            <input type="range" min="0" max="100" value={s.pos} onChange={(e) => update(i, 'pos', Number(e.target.value))} data-testid={`gradient-stop-pos-${i}`} className="flex-1 accent-primary" />
            <span className="w-10 text-right font-mono text-xs">{s.pos}%</span>
            {stops.length > 2 && <button onClick={() => setStops(stops.filter((_, idx) => idx !== i))} data-testid={`gradient-remove-${i}`} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>}
          </div>
        ))}
      </div>
      <OutputPanel title="CSS" value={`background: ${css};`} testId="gradient-output">
        <div className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2">
          <code className="font-mono text-[13px] break-all">background: {css};</code>
        </div>
      </OutputPanel>
    </div>
  );
};

export const BoxShadowGenerator = () => {
  const [s, setS] = useState({ x: 0, y: 10, blur: 20, spread: 0, color: '#000000', opacity: 25, inset: false });
  const rgba = useMemo(() => { const { r, g, b } = hexToRgb(s.color); return `rgba(${r}, ${g}, ${b}, ${(s.opacity / 100).toFixed(2)})`; }, [s.color, s.opacity]);
  const css = `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${rgba}`;
  const set = (k, v) => setS({ ...s, [k]: v });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center rounded-lg border border-border bg-muted/20 py-16">
        <div className="h-28 w-40 rounded-xl bg-background" style={{ boxShadow: css }} data-testid="shadow-preview" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[['x', 'X offset', -100, 100], ['y', 'Y offset', -100, 100], ['blur', 'Blur', 0, 100], ['spread', 'Spread', -50, 50]].map(([k, label, min, max]) => (
          <Field key={k} label={`${label}: ${s[k]}px`}>
            <input type="range" min={min} max={max} value={s[k]} onChange={(e) => set(k, Number(e.target.value))} data-testid={`shadow-${k}`} className="w-full accent-primary" />
          </Field>
        ))}
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <Field label="Color"><input type="color" value={s.color} onChange={(e) => set('color', e.target.value)} data-testid="shadow-color" className="h-10 w-14 cursor-pointer rounded border border-border" /></Field>
        <Field label={`Opacity: ${s.opacity}%`}><input type="range" min="0" max="100" value={s.opacity} onChange={(e) => set('opacity', Number(e.target.value))} data-testid="shadow-opacity" className="w-40 accent-primary" /></Field>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={s.inset} onChange={(e) => set('inset', e.target.checked)} data-testid="shadow-inset" className="accent-primary" />Inset</label>
      </div>
      <OutputPanel title="CSS" value={`box-shadow: ${css};`} testId="shadow-output">
        <div className="rounded-md border border-border bg-muted/30 px-3 py-2"><code className="font-mono text-[13px] break-all">box-shadow: {css};</code></div>
      </OutputPanel>
    </div>
  );
};

export const BorderRadiusGenerator = () => {
  const [r, setR] = useState({ tl: 12, tr: 12, br: 12, bl: 12 });
  const css = `${r.tl}px ${r.tr}px ${r.br}px ${r.bl}px`;
  const set = (k, v) => setR({ ...r, [k]: v });
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center rounded-lg border border-border bg-muted/20 py-16">
        <div className="h-32 w-48 border-2 border-primary bg-primary/10" style={{ borderRadius: css }} data-testid="radius-preview" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[['tl', 'Top-left'], ['tr', 'Top-right'], ['br', 'Bottom-right'], ['bl', 'Bottom-left']].map(([k, label]) => (
          <Field key={k} label={`${label}: ${r[k]}px`}>
            <input type="range" min="0" max="100" value={r[k]} onChange={(e) => set(k, Number(e.target.value))} data-testid={`radius-${k}`} className="w-full accent-primary" />
          </Field>
        ))}
      </div>
      <OutputPanel title="CSS" value={`border-radius: ${css};`} testId="radius-output">
        <div className="rounded-md border border-border bg-muted/30 px-3 py-2"><code className="font-mono text-[13px]">border-radius: {css};</code></div>
      </OutputPanel>
    </div>
  );
};
