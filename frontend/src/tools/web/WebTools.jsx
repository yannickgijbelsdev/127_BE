import React, { useState, useMemo } from 'react';
import { UAParser } from 'ua-parser-js';
import { Search, Loader2 } from 'lucide-react';
import { Field, CodeArea, OutputPanel, ErrorBanner, CopyButton } from '../../components/toolbox/primitives';

const HTTP_STATUS = {
  100: 'Continue', 101: 'Switching Protocols', 103: 'Early Hints',
  200: 'OK', 201: 'Created', 202: 'Accepted', 204: 'No Content', 206: 'Partial Content',
  301: 'Moved Permanently', 302: 'Found', 303: 'See Other', 304: 'Not Modified', 307: 'Temporary Redirect', 308: 'Permanent Redirect',
  400: 'Bad Request', 401: 'Unauthorized', 402: 'Payment Required', 403: 'Forbidden', 404: 'Not Found', 405: 'Method Not Allowed',
  406: 'Not Acceptable', 408: 'Request Timeout', 409: 'Conflict', 410: 'Gone', 418: "I'm a teapot", 422: 'Unprocessable Entity', 429: 'Too Many Requests',
  500: 'Internal Server Error', 501: 'Not Implemented', 502: 'Bad Gateway', 503: 'Service Unavailable', 504: 'Gateway Timeout',
};
const classInfo = (code) => (code < 200 ? 'Informational' : code < 300 ? 'Success' : code < 400 ? 'Redirect' : code < 500 ? 'Client Error' : 'Server Error');

export const HttpStatusLookup = () => {
  const [q, setQ] = useState('');
  const list = useMemo(() => Object.entries(HTTP_STATUS).filter(([c, t]) =>
    !q || c.includes(q) || t.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <div className="space-y-4">
      <Field label="Search status code or name">
        <input data-testid="http-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="404, teapot, gateway…" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
      </Field>
      <div className="grid gap-2 sm:grid-cols-2" data-testid="http-list">
        {list.map(([code, text]) => (
          <div key={code} className="flex items-center gap-3 rounded-md border border-border bg-muted/30 px-3 py-2">
            <span className="font-mono text-lg font-semibold">{code}</span>
            <div className="min-w-0">
              <div className="truncate text-sm">{text}</div>
              <div className="text-xs text-muted-foreground">{classInfo(Number(code))}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MIME_TYPES = {
  '.json': 'application/json', '.js': 'text/javascript', '.mjs': 'text/javascript', '.html': 'text/html', '.css': 'text/css',
  '.xml': 'application/xml', '.csv': 'text/csv', '.txt': 'text/plain', '.pdf': 'application/pdf', '.zip': 'application/zip',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.mp4': 'video/mp4', '.webm': 'video/webm', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.doc': 'application/msword', '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls': 'application/vnd.ms-excel', '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.yaml': 'application/yaml', '.md': 'text/markdown', '.wasm': 'application/wasm',
};

export const MimeTypeLookup = () => {
  const [q, setQ] = useState('');
  const list = useMemo(() => Object.entries(MIME_TYPES).filter(([ext, mime]) =>
    !q || ext.includes(q.toLowerCase()) || mime.includes(q.toLowerCase())), [q]);
  return (
    <div className="space-y-4">
      <Field label="Search extension or MIME type">
        <input data-testid="mime-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder=".png, json, video…" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
      </Field>
      <div className="grid gap-2 sm:grid-cols-2" data-testid="mime-list">
        {list.map(([ext, mime]) => (
          <div key={ext} className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2">
            <span className="font-mono text-sm font-semibold">{ext}</span>
            <div className="flex items-center gap-2"><code className="font-mono text-[13px] text-muted-foreground">{mime}</code><CopyButton value={mime} testId={`mime-copy-${ext}`} label="" /></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const UserAgentParser = () => {
  const [ua, setUa] = useState(navigator.userAgent);
  const parsed = useMemo(() => {
    const p = new UAParser(ua).getResult();
    return [
      ['Browser', `${p.browser.name || '—'} ${p.browser.version || ''}`],
      ['Engine', `${p.engine.name || '—'} ${p.engine.version || ''}`],
      ['OS', `${p.os.name || '—'} ${p.os.version || ''}`],
      ['Device', `${p.device.vendor || ''} ${p.device.model || ''} ${p.device.type || 'desktop'}`.trim()],
      ['CPU', p.cpu.architecture || '—'],
    ];
  }, [ua]);
  return (
    <div className="space-y-4">
      <Field label="User-Agent string">
        <CodeArea value={ua} onChange={setUa} testId="ua-input" rows={3} />
      </Field>
      <div className="space-y-2" data-testid="ua-result">
        {parsed.map(([l, v]) => (
          <div key={l} className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{l}</span>
            <span className="font-mono text-[13px]">{v || '—'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DnsLookup = () => {
  const [domain, setDomain] = useState('google.com');
  const [type, setType] = useState('A');
  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookup = async () => {
    setLoading(true); setError(''); setRecords(null);
    try {
      const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`);
      const data = await res.json();
      setRecords(data.Answer || []);
      if (!data.Answer) setError('No records found');
    } catch (e) {
      setError('Lookup failed. Check the domain and your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <Field label="Domain">
          <input data-testid="dns-domain" value={domain} onChange={(e) => setDomain(e.target.value)} className="w-64 rounded-md border border-border bg-background px-3 py-2 font-mono text-sm" />
        </Field>
        <Field label="Type">
          <select data-testid="dns-type" value={type} onChange={(e) => setType(e.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm">
            {['A', 'AAAA', 'MX', 'TXT', 'NS', 'CNAME', 'SOA'].map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <button data-testid="dns-lookup-btn" onClick={lookup} disabled={loading} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity duration-150 disabled:opacity-50">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}Lookup
        </button>
      </div>
      <ErrorBanner message={error} />
      {records && records.length > 0 && (
        <div className="space-y-2" data-testid="dns-results">
          {records.map((r, i) => (
            <div key={i} className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2">
              <code className="font-mono text-[13px] break-all">{r.data}</code>
              <span className="ml-3 text-xs text-muted-foreground">TTL {r.TTL}</span>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-muted-foreground">Uses Google DNS-over-HTTPS. Query runs from your browser — no Tool127 server involved.</p>
    </div>
  );
};

export const WhoisLookup = () => {
  const [domain, setDomain] = useState('example.com');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookup = async () => {
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain.trim())}`);
      if (!res.ok) throw new Error('not found');
      const data = await res.json();
      const events = {};
      (data.events || []).forEach((e) => { events[e.eventAction] = e.eventDate; });
      const registrar = (data.entities || []).find((e) => (e.roles || []).includes('registrar'));
      setResult({
        name: data.ldhName || domain,
        status: (data.status || []).join(', ') || '—',
        registrar: registrar?.vcardArray?.[1]?.find((f) => f[0] === 'fn')?.[3] || '—',
        registered: events.registration || '—',
        expires: events.expiration || '—',
        updated: events.lastChanged || events['last update of RDAP database'] || '—',
        nameservers: (data.nameservers || []).map((n) => n.ldhName),
      });
    } catch (e) {
      setError('No WHOIS/RDAP record found for this domain.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-3">
        <Field label="Domain">
          <input data-testid="whois-domain" value={domain} onChange={(e) => setDomain(e.target.value)} className="w-64 rounded-md border border-border bg-background px-3 py-2 font-mono text-sm" />
        </Field>
        <button data-testid="whois-lookup-btn" onClick={lookup} disabled={loading} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity duration-150 disabled:opacity-50">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}Lookup
        </button>
      </div>
      <ErrorBanner message={error} />
      {result && (
        <div className="space-y-2" data-testid="whois-result">
          {[['Domain', result.name], ['Status', result.status], ['Registrar', result.registrar], ['Registered', result.registered], ['Expires', result.expires], ['Updated', result.updated]].map(([l, v]) => (
            <div key={l} className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{l}</span>
              <span className="font-mono text-[13px] break-all text-right">{v}</span>
            </div>
          ))}
          {result.nameservers.length > 0 && (
            <div className="rounded-md border border-border bg-muted/30 px-3 py-2">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Nameservers</span>
              <div className="mt-1 space-y-0.5">{result.nameservers.map((n) => <code key={n} className="block font-mono text-[13px]">{n}</code>)}</div>
            </div>
          )}
        </div>
      )}
      <p className="text-xs text-muted-foreground">Uses the public RDAP protocol from your browser — no Tool127 server involved.</p>
    </div>
  );
};
