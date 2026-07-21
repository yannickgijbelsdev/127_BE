import React, { useState, useMemo, useEffect, useCallback } from 'react';
import CryptoJS from 'crypto-js';
import { RefreshCw } from 'lucide-react';
import { Field, CodeArea, OutputPanel, ErrorBanner, CopyButton } from '../../components/toolbox/primitives';

const b64url = (wordArrayOrStr, isWordArray = false) => {
  const b64 = isWordArray
    ? CryptoJS.enc.Base64.stringify(wordArrayOrStr)
    : CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(wordArrayOrStr));
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const JwtGenerator = () => {
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "Tool127",\n  "iat": 1516239022\n}');
  const [secret, setSecret] = useState('your-256-bit-secret');
  const [alg, setAlg] = useState('HS256');
  const { token, error } = useMemo(() => {
    try {
      const header = { alg, typ: 'JWT' };
      const parsedPayload = JSON.parse(payload);
      const encHeader = b64url(JSON.stringify(header));
      const encPayload = b64url(JSON.stringify(parsedPayload));
      const data = `${encHeader}.${encPayload}`;
      const hasher = { HS256: CryptoJS.HmacSHA256, HS384: CryptoJS.HmacSHA384, HS512: CryptoJS.HmacSHA512 }[alg];
      const sig = b64url(hasher(data, secret), true);
      return { token: `${data}.${sig}`, error: '' };
    } catch (e) {
      return { token: '', error: e.message };
    }
  }, [payload, secret, alg]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Payload (JSON)">
          <CodeArea value={payload} onChange={setPayload} testId="jwt-payload" rows={10} />
        </Field>
        <div className="space-y-4">
          <Field label="Algorithm">
            <select data-testid="jwt-alg" value={alg} onChange={(e) => setAlg(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
              <option>HS256</option><option>HS384</option><option>HS512</option>
            </select>
          </Field>
          <Field label="Secret">
            <input data-testid="jwt-secret" value={secret} onChange={(e) => setSecret(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm" />
          </Field>
        </div>
      </div>
      <OutputPanel title="Signed JWT" value={token} testId="jwt-output" />
      <ErrorBanner message={error} />
    </div>
  );
};

export const HashGenerator = () => {
  const [input, setInput] = useState('Tool127');
  const hashes = useMemo(() => ({
    MD5: CryptoJS.MD5(input).toString(),
    'SHA-1': CryptoJS.SHA1(input).toString(),
    'SHA-256': CryptoJS.SHA256(input).toString(),
    'SHA-512': CryptoJS.SHA512(input).toString(),
  }), [input]);

  return (
    <div className="space-y-4">
      <Field label="Input text">
        <CodeArea value={input} onChange={setInput} testId="hash-input" rows={5} mono={false} />
      </Field>
      <div className="space-y-3">
        {Object.entries(hashes).map(([name, val]) => (
          <div key={name} className="rounded-lg border border-border bg-muted/30 p-3" data-testid={`hash-${name}`}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{name}</span>
              <CopyButton value={val} testId={`hash-${name}-copy`} />
            </div>
            <code className="block break-all font-mono text-[13px]">{val}</code>
          </div>
        ))}
      </div>
    </div>
  );
};

const randInt = (max) => {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
};

export const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, digits: true, symbols: true });
  const [password, setPassword] = useState('');

  const generate = useCallback(() => {
    const sets = {
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lower: 'abcdefghijklmnopqrstuvwxyz',
      digits: '0123456789',
      symbols: '!@#$%^&*()-_=+[]{};:,.<>?',
    };
    const pool = Object.keys(opts).filter((k) => opts[k]).map((k) => sets[k]).join('');
    if (!pool) { setPassword(''); return; }
    let out = '';
    for (let i = 0; i < length; i++) out += pool[randInt(pool.length)];
    setPassword(out);
  }, [length, opts]);

  useEffect(() => { generate(); }, [generate]);

  return (
    <div className="space-y-4">
      <OutputPanel title="Generated password" value={password} testId="password-output"
        actions={<button data-testid="password-regenerate" onClick={generate} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium hover:bg-muted transition-colors duration-150"><RefreshCw className="h-3.5 w-3.5" />Regenerate</button>}>
        <div className="rounded-lg border border-border bg-muted/30 p-4 font-mono text-lg break-all" data-testid="password-value">{password || '—'}</div>
      </OutputPanel>
      <Field label={`Length: ${length}`}>
        <input type="range" min="4" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} data-testid="password-length" className="w-full accent-primary" />
      </Field>
      <div className="flex flex-wrap gap-4">
        {Object.keys(opts).map((k) => (
          <label key={k} className="flex items-center gap-2 text-sm capitalize">
            <input type="checkbox" checked={opts[k]} onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })} data-testid={`password-opt-${k}`} className="accent-primary" />
            {k}
          </label>
        ))}
      </div>
    </div>
  );
};

export const PasswordStrengthChecker = () => {
  const [pw, setPw] = useState('');
  const result = useMemo(() => {
    if (!pw) return null;
    let charset = 0;
    if (/[a-z]/.test(pw)) charset += 26;
    if (/[A-Z]/.test(pw)) charset += 26;
    if (/[0-9]/.test(pw)) charset += 10;
    if (/[^a-zA-Z0-9]/.test(pw)) charset += 33;
    const entropy = Math.round(pw.length * Math.log2(charset || 1));
    let label = 'Very weak', color = 'text-red-500', pct = 15;
    if (entropy >= 100) { label = 'Excellent'; color = 'text-green-500'; pct = 100; }
    else if (entropy >= 70) { label = 'Strong'; color = 'text-green-500'; pct = 80; }
    else if (entropy >= 50) { label = 'Good'; color = 'text-yellow-500'; pct = 60; }
    else if (entropy >= 30) { label = 'Weak'; color = 'text-orange-500'; pct = 35; }
    const tips = [];
    if (pw.length < 12) tips.push('Use at least 12 characters');
    if (!/[A-Z]/.test(pw)) tips.push('Add uppercase letters');
    if (!/[0-9]/.test(pw)) tips.push('Add digits');
    if (!/[^a-zA-Z0-9]/.test(pw)) tips.push('Add symbols');
    return { entropy, label, color, pct, tips };
  }, [pw]);

  return (
    <div className="space-y-4">
      <Field label="Password">
        <input data-testid="strength-input" value={pw} onChange={(e) => setPw(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm" placeholder="Type a password…" />
      </Field>
      {result && (
        <div className="space-y-3" data-testid="strength-result">
          <div className="flex items-center justify-between">
            <span className={`text-lg font-semibold ${result.color}`}>{result.label}</span>
            <span className="font-mono text-sm text-muted-foreground">{result.entropy} bits entropy</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className={`h-full rounded-full transition-all duration-150 ${result.pct >= 60 ? 'bg-green-500' : result.pct >= 35 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${result.pct}%` }} />
          </div>
          {result.tips.length > 0 && (
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {result.tips.map((t) => <li key={t}>{t}</li>)}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export const UuidGenerator = () => {
  const [count, setCount] = useState(5);
  const [ids, setIds] = useState([]);
  const generate = useCallback(() => {
    setIds(Array.from({ length: count }, () => crypto.randomUUID()));
  }, [count]);
  useEffect(() => { generate(); }, [generate]);

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-3">
        <Field label={`Count: ${count}`}>
          <input type="range" min="1" max="50" value={count} onChange={(e) => setCount(Number(e.target.value))} data-testid="uuid-count" className="w-48 accent-primary" />
        </Field>
        <button data-testid="uuid-generate" onClick={generate} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted transition-colors duration-150"><RefreshCw className="h-4 w-4" />Generate</button>
      </div>
      <OutputPanel title="UUID v4" value={ids.join('\n')} filename="uuids.txt" testId="uuid-output">
        <div className="space-y-2" data-testid="uuid-list">
          {ids.map((id, i) => (
            <div key={i} className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2">
              <code className="font-mono text-[13px]">{id}</code>
              <CopyButton value={id} testId={`uuid-copy-${i}`} />
            </div>
          ))}
        </div>
      </OutputPanel>
    </div>
  );
};
