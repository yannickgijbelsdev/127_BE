import React, { useState, useMemo } from 'react';
import cronstrue from 'cronstrue';
import { Field, CodeArea, OutputPanel, ErrorBanner, CopyButton } from '../../components/toolbox/primitives';

export const RegexTester = () => {
  const [pattern, setPattern] = useState('\\b\\w+@\\w+\\.\\w+\\b');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('Contact: alice@example.com and bob@test.org');
  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [], error: '' };
    try {
      const re = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      const res = [...text.matchAll(re)].map((m) => ({ match: m[0], index: m.index, groups: m.slice(1) }));
      return { matches: res, error: '' };
    } catch (e) {
      return { matches: [], error: e.message };
    }
  }, [pattern, flags, text]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <Field label="Pattern">
          <input data-testid="regex-pattern" value={pattern} onChange={(e) => setPattern(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm" />
        </Field>
        <Field label="Flags">
          <input data-testid="regex-flags" value={flags} onChange={(e) => setFlags(e.target.value)} className="w-24 rounded-md border border-border bg-background px-3 py-2 font-mono text-sm" />
        </Field>
      </div>
      <Field label="Test string"><CodeArea value={text} onChange={setText} testId="regex-text" rows={6} mono={false} /></Field>
      <ErrorBanner message={error} />
      <div data-testid="regex-matches" className="rounded-lg border border-border bg-muted/30 p-3">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{matches.length} match(es)</div>
        <div className="space-y-1">
          {matches.map((m, i) => (
            <div key={i} className="flex items-center gap-3 font-mono text-[13px]">
              <span className="rounded bg-primary/15 px-1.5 py-0.5 text-primary">{m.match}</span>
              <span className="text-muted-foreground">@ {m.index}</span>
              {m.groups.filter(Boolean).length > 0 && <span className="text-muted-foreground">groups: {m.groups.join(', ')}</span>}
            </div>
          ))}
          {matches.length === 0 && !error && <span className="text-sm text-muted-foreground">No matches</span>}
        </div>
      </div>
    </div>
  );
};

export const UnixTimestampConverter = () => {
  const [ts, setTs] = useState(String(Math.floor(Date.now() / 1000)));
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 19));
  const fromTs = useMemo(() => {
    const n = Number(ts);
    if (!ts || Number.isNaN(n)) return null;
    const ms = String(ts).length > 10 ? n : n * 1000;
    const d = new Date(ms);
    if (Number.isNaN(d.getTime())) return null;
    return { local: d.toString(), utc: d.toUTCString(), iso: d.toISOString(), relative: relTime(d) };
  }, [ts]);
  const fromDate = useMemo(() => {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return null;
    return { seconds: Math.floor(d.getTime() / 1000), ms: d.getTime() };
  }, [dateStr]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        <Field label="Unix timestamp (s or ms)">
          <input data-testid="ts-input" value={ts} onChange={(e) => setTs(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm" />
        </Field>
        {fromTs && (
          <div className="space-y-2" data-testid="ts-result">
            {[['Local', fromTs.local], ['UTC', fromTs.utc], ['ISO 8601', fromTs.iso], ['Relative', fromTs.relative]].map(([l, v]) => (
              <div key={l} className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2">
                <span className="text-xs text-muted-foreground">{l}</span>
                <div className="flex items-center gap-2"><code className="font-mono text-[13px]">{v}</code><CopyButton value={v} testId={`ts-copy-${l}`} /></div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-3">
        <Field label="Date/time (ISO)">
          <input data-testid="date-input" type="datetime-local" value={dateStr} onChange={(e) => setDateStr(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm" />
        </Field>
        {fromDate && (
          <div className="space-y-2" data-testid="date-result">
            {[['Seconds', fromDate.seconds], ['Milliseconds', fromDate.ms]].map(([l, v]) => (
              <div key={l} className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2">
                <span className="text-xs text-muted-foreground">{l}</span>
                <div className="flex items-center gap-2"><code className="font-mono text-[13px]">{v}</code><CopyButton value={String(v)} testId={`date-copy-${l}`} /></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function relTime(d) {
  const diff = (d.getTime() - Date.now()) / 1000;
  const abs = Math.abs(diff);
  const units = [[31536000, 'year'], [2592000, 'month'], [86400, 'day'], [3600, 'hour'], [60, 'minute'], [1, 'second']];
  for (const [s, name] of units) {
    if (abs >= s) {
      const val = Math.round(diff / s);
      return `${Math.abs(val)} ${name}${Math.abs(val) !== 1 ? 's' : ''} ${val < 0 ? 'ago' : 'from now'}`;
    }
  }
  return 'now';
}

export const CronGenerator = () => {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dom, setDom] = useState('*');
  const [month, setMonth] = useState('*');
  const [dow, setDow] = useState('*');
  const expr = `${minute} ${hour} ${dom} ${month} ${dow}`;
  const human = useMemo(() => {
    try { return cronstrue.toString(expr); } catch (e) { return `Invalid: ${e}`; }
  }, [expr]);
  const presets = [
    ['Every minute', '* * * * *'], ['Every hour', '0 * * * *'], ['Every day at midnight', '0 0 * * *'],
    ['Every Monday 9am', '0 9 * * 1'], ['1st of month', '0 0 1 * *'],
  ];
  const applyPreset = (p) => { const [mi, h, d, mo, w] = p.split(' '); setMinute(mi); setHour(h); setDom(d); setMonth(mo); setDow(w); };
  const fields = [['Minute', minute, setMinute], ['Hour', hour, setHour], ['Day of month', dom, setDom], ['Month', month, setMonth], ['Day of week', dow, setDow]];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {presets.map(([label, p]) => (
          <button key={label} data-testid={`cron-preset-${label.replace(/\s/g, '-')}`} onClick={() => applyPreset(p)} className="rounded-md border border-border bg-background px-2.5 py-1 text-xs hover:bg-muted transition-colors duration-150">{label}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {fields.map(([label, val, set]) => (
          <Field key={label} label={label}>
            <input data-testid={`cron-${label.replace(/\s/g, '-')}`} value={val} onChange={(e) => set(e.target.value || '*')} className="w-full rounded-md border border-border bg-background px-3 py-2 text-center font-mono text-sm" />
          </Field>
        ))}
      </div>
      <OutputPanel title="Cron expression" value={expr} testId="cron-output">
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <code className="font-mono text-lg" data-testid="cron-expr">{expr}</code>
          <p className="mt-2 text-sm text-muted-foreground" data-testid="cron-human">{human}</p>
        </div>
      </OutputPanel>
    </div>
  );
};
