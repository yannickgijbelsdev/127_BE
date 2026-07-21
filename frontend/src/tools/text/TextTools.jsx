import React, { useState, useMemo } from 'react';
import { Field, CodeArea, OutputPanel } from '../../components/toolbox/primitives';

const toTitle = (s) => s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
const toSentence = (s) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
const words = (s) => s.trim().split(/[\s_-]+/).filter(Boolean);
const toCamel = (s) => words(s).map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join('');
const toPascal = (s) => words(s).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
const toSnake = (s) => words(s).map((w) => w.toLowerCase()).join('_');
const toKebab = (s) => words(s).map((w) => w.toLowerCase()).join('-');
const toConstant = (s) => words(s).map((w) => w.toUpperCase()).join('_');

export const CaseConverter = () => {
  const [input, setInput] = useState('Tool127 developer toolbox');
  const cases = useMemo(() => ({
    'UPPERCASE': input.toUpperCase(),
    'lowercase': input.toLowerCase(),
    'Title Case': toTitle(input),
    'Sentence case': toSentence(input),
    'camelCase': toCamel(input),
    'PascalCase': toPascal(input),
    'snake_case': toSnake(input),
    'kebab-case': toKebab(input),
    'CONSTANT_CASE': toConstant(input),
  }), [input]);

  return (
    <div className="space-y-4">
      <Field label="Input">
        <CodeArea value={input} onChange={setInput} testId="case-input" rows={4} mono={false} />
      </Field>
      <div className="grid gap-3 md:grid-cols-2">
        {Object.entries(cases).map(([name, val]) => (
          <OutputPanel key={name} title={name} value={val} testId={`case-${name.replace(/[^a-zA-Z]/g, '')}`}>
            <div className="rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-[13px] break-all">{val || '—'}</div>
          </OutputPanel>
        ))}
      </div>
    </div>
  );
};

export const RemoveDuplicateLines = () => {
  const [input, setInput] = useState('apple\nbanana\napple\ncherry\nbanana');
  const [ci, setCi] = useState(false);
  const [trim, setTrim] = useState(true);
  const output = useMemo(() => {
    const seen = new Set();
    const res = [];
    input.split('\n').forEach((line) => {
      let key = trim ? line.trim() : line;
      key = ci ? key.toLowerCase() : key;
      if (!seen.has(key)) { seen.add(key); res.push(trim ? line.trim() : line); }
    });
    return res.join('\n');
  }, [input, ci, trim]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={ci} onChange={(e) => setCi(e.target.checked)} data-testid="dedup-ci" className="accent-primary" />Case-insensitive</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} data-testid="dedup-trim" className="accent-primary" />Trim whitespace</label>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Input"><CodeArea value={input} onChange={setInput} testId="dedup-input" rows={14} /></Field>
        <OutputPanel title={`Output (${output.split('\n').filter(Boolean).length} lines)`} value={output} testId="dedup-output" />
      </div>
    </div>
  );
};

export const SortLines = () => {
  const [input, setInput] = useState('banana\napple\nCherry\napple');
  const [desc, setDesc] = useState(false);
  const [ci, setCi] = useState(true);
  const [numeric, setNumeric] = useState(false);
  const [unique, setUnique] = useState(false);
  const output = useMemo(() => {
    let lines = input.split('\n');
    if (unique) lines = [...new Set(lines)];
    lines.sort((a, b) => (numeric
      ? parseFloat(a) - parseFloat(b)
      : (ci ? a.toLowerCase() : a).localeCompare(ci ? b.toLowerCase() : b)));
    if (desc) lines.reverse();
    return lines.join('\n');
  }, [input, desc, ci, numeric, unique]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={desc} onChange={(e) => setDesc(e.target.checked)} data-testid="sort-desc" className="accent-primary" />Descending</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={ci} onChange={(e) => setCi(e.target.checked)} data-testid="sort-ci" className="accent-primary" />Case-insensitive</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={numeric} onChange={(e) => setNumeric(e.target.checked)} data-testid="sort-numeric" className="accent-primary" />Numeric</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} data-testid="sort-unique" className="accent-primary" />Unique</label>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Input"><CodeArea value={input} onChange={setInput} testId="sort-input" rows={14} /></Field>
        <OutputPanel title="Sorted output" value={output} testId="sort-output" />
      </div>
    </div>
  );
};

export const WordCounter = () => {
  const [input, setInput] = useState('Tool127 is a fast, privacy-first developer toolbox.\nEverything runs in your browser.');
  const stats = useMemo(() => {
    const chars = input.length;
    const charsNoSpace = input.replace(/\s/g, '').length;
    const wordCount = (input.match(/\S+/g) || []).length;
    const lines = input === '' ? 0 : input.split('\n').length;
    const sentences = (input.match(/[^.!?]+[.!?]+/g) || []).length;
    const paragraphs = input.split(/\n\s*\n/).filter((p) => p.trim()).length;
    const reading = Math.max(1, Math.round(wordCount / 200));
    return { chars, charsNoSpace, wordCount, lines, sentences, paragraphs, reading };
  }, [input]);

  const items = [
    ['Words', stats.wordCount], ['Characters', stats.chars], ['Characters (no spaces)', stats.charsNoSpace],
    ['Lines', stats.lines], ['Sentences', stats.sentences], ['Paragraphs', stats.paragraphs],
    ['Reading time', `${stats.reading} min`],
  ];

  return (
    <div className="space-y-4">
      <Field label="Text"><CodeArea value={input} onChange={setInput} testId="counter-input" rows={10} mono={false} /></Field>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" data-testid="counter-stats">
        {items.map(([label, val]) => (
          <div key={label} className="rounded-lg border border-border bg-muted/30 p-3">
            <div className="text-2xl font-semibold tabular-nums">{val}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
