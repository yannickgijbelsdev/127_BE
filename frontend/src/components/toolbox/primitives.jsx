import React, { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { copyText, downloadFile } from '../../tools/toolUtils';
import { cn } from '../../lib/utils';

export const CopyButton = ({ value, className, testId = 'copy-btn', label = 'Copy' }) => {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    const ok = await copyText(value);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };
  return (
    <button
      type="button"
      onClick={handle}
      data-testid={testId}
      disabled={!value}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors duration-150 hover:bg-muted disabled:opacity-40',
        className
      )}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copied' : label}
    </button>
  );
};

export const DownloadButton = ({ filename, content, mime, testId = 'download-btn', className }) => (
  <button
    type="button"
    onClick={() => downloadFile(filename, content, mime)}
    data-testid={testId}
    disabled={!content}
    className={cn(
      'inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors duration-150 hover:bg-muted disabled:opacity-40',
      className
    )}
  >
    <Download className="h-3.5 w-3.5" />
    Download
  </button>
);

export const Field = ({ label, children, hint, htmlFor }) => (
  <div className="space-y-1.5">
    {label && (
      <label htmlFor={htmlFor} className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </label>
    )}
    {children}
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

export const CodeArea = ({ value, onChange, placeholder, readOnly, testId, rows = 12, mono = true, invalid = false }) => (
  <textarea
    value={value}
    onChange={onChange ? (e) => onChange(e.target.value) : undefined}
    placeholder={placeholder}
    readOnly={readOnly}
    data-testid={testId}
    rows={rows}
    spellCheck={false}
    className={cn(
      'w-full resize-y rounded-lg border bg-muted/40 p-3 text-[13px] leading-relaxed text-foreground outline-none transition-colors duration-150 placeholder:text-muted-foreground/60 focus:border-ring focus:ring-1 focus:ring-ring',
      mono && 'font-mono',
      invalid ? 'border-destructive' : 'border-border',
      readOnly && 'bg-muted/30'
    )}
  />
);

export const ErrorBanner = ({ message, testId = 'error-banner' }) => {
  if (!message) return null;
  return (
    <div data-testid={testId} className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
      {message}
    </div>
  );
};

export const OutputPanel = ({ title = 'Output', value, filename, mime, children, actions, testId = 'output-panel' }) => (
  <div className="space-y-2" data-testid={testId}>
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{title}</span>
      <div className="flex items-center gap-2">
        {actions}
        {value !== undefined && <CopyButton value={value} testId={`${testId}-copy`} />}
        {value !== undefined && filename && <DownloadButton filename={filename} content={value} mime={mime} testId={`${testId}-download`} />}
      </div>
    </div>
    {children ?? <CodeArea value={value} readOnly testId={`${testId}-value`} />}
  </div>
);
