import React, { useState, useMemo } from 'react';
import { Field, CopyButton } from '../../components/toolbox/primitives';

const ipToInt = (ip) => ip.split('.').reduce((acc, o) => (acc << 8) + (Number(o) & 255), 0) >>> 0;
const intToIp = (int) => [24, 16, 8, 0].map((s) => (int >>> s) & 255).join('.');
const validIp = (ip) => /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(ip) && ip.split('.').every((o) => Number(o) <= 255);

const calc = (ip, prefix) => {
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const ipInt = ipToInt(ip);
  const network = (ipInt & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const total = prefix >= 31 ? (prefix === 32 ? 1 : 2) : 2 ** (32 - prefix);
  const usable = prefix >= 31 ? total : total - 2;
  const firstHost = prefix >= 31 ? network : (network + 1) >>> 0;
  const lastHost = prefix >= 31 ? broadcast : (broadcast - 1) >>> 0;
  return {
    netmask: intToIp(mask),
    wildcard: intToIp(~mask >>> 0),
    network: intToIp(network),
    broadcast: intToIp(broadcast),
    firstHost: intToIp(firstHost),
    lastHost: intToIp(lastHost),
    totalHosts: total,
    usableHosts: usable,
    cidr: `${intToIp(network)}/${prefix}`,
  };
};

const ResultRows = ({ data, testId }) => (
  <div className="grid gap-2 sm:grid-cols-2" data-testid={testId}>
    {Object.entries({
      'Network address': data.network, 'Broadcast address': data.broadcast, 'Netmask': data.netmask,
      'Wildcard mask': data.wildcard, 'First host': data.firstHost, 'Last host': data.lastHost,
      'Usable hosts': data.usableHosts.toLocaleString(), 'Total addresses': data.totalHosts.toLocaleString(),
      'CIDR': data.cidr,
    }).map(([label, val]) => (
      <div key={label} className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">{label}</span>
        <div className="flex items-center gap-2"><code className="font-mono text-[13px]">{val}</code><CopyButton value={String(val)} testId={`${testId}-copy-${label.replace(/\s/g, '')}`} label="" /></div>
      </div>
    ))}
  </div>
);

export const IpCalculator = () => {
  const [ip, setIp] = useState('192.168.1.100');
  const [prefix, setPrefix] = useState(24);
  const { data, error } = useMemo(() => {
    if (!validIp(ip)) return { data: null, error: 'Enter a valid IPv4 address' };
    return { data: calc(ip, prefix), error: '' };
  }, [ip, prefix]);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-4">
        <Field label="IPv4 address"><input data-testid="ip-address" value={ip} onChange={(e) => setIp(e.target.value)} className="w-48 rounded-md border border-border bg-background px-3 py-2 font-mono text-sm" /></Field>
        <Field label={`Prefix: /${prefix}`}><input type="range" min="0" max="32" value={prefix} onChange={(e) => setPrefix(Number(e.target.value))} data-testid="ip-prefix" className="w-56 accent-primary" /></Field>
      </div>
      {error ? <p className="text-sm text-destructive" data-testid="ip-error">{error}</p> : <ResultRows data={data} testId="ip-result" />}
    </div>
  );
};

export const SubnetCalculator = () => {
  const [cidr, setCidr] = useState('10.0.0.0/24');
  const { data, subnets, error } = useMemo(() => {
    const [ip, p] = cidr.split('/');
    const prefix = Number(p);
    if (!validIp(ip || '') || Number.isNaN(prefix) || prefix < 0 || prefix > 32) return { data: null, subnets: [], error: 'Enter valid CIDR, e.g. 10.0.0.0/24' };
    const d = calc(ip, prefix);
    // show next-level /prefix+1 and /prefix+2 subnet splits
    const splits = [];
    if (prefix < 32) {
      const newPrefix = Math.min(prefix + 2, 32);
      const count = 2 ** (newPrefix - prefix);
      const size = 2 ** (32 - newPrefix);
      const netInt = ipToInt(d.network);
      for (let i = 0; i < Math.min(count, 8); i++) {
        splits.push(`${intToIp((netInt + i * size) >>> 0)}/${newPrefix}`);
      }
    }
    return { data: d, subnets: splits, error: '' };
  }, [cidr]);
  return (
    <div className="space-y-4">
      <Field label="CIDR block"><input data-testid="subnet-cidr" value={cidr} onChange={(e) => setCidr(e.target.value)} className="w-56 rounded-md border border-border bg-background px-3 py-2 font-mono text-sm" /></Field>
      {error ? <p className="text-sm text-destructive" data-testid="subnet-error">{error}</p> : (
        <>
          <ResultRows data={data} testId="subnet-result" />
          {subnets.length > 0 && (
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Example /{cidr.split('/')[1] * 1 + 2} subnets</div>
              <div className="grid gap-2 sm:grid-cols-2" data-testid="subnet-splits">
                {subnets.map((s) => <code key={s} className="rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-[13px]">{s}</code>)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const PORTS = {
  20: 'FTP (data)', 21: 'FTP (control)', 22: 'SSH', 23: 'Telnet', 25: 'SMTP', 53: 'DNS', 67: 'DHCP server', 68: 'DHCP client',
  80: 'HTTP', 110: 'POP3', 123: 'NTP', 143: 'IMAP', 161: 'SNMP', 194: 'IRC', 443: 'HTTPS', 445: 'SMB', 465: 'SMTPS',
  514: 'Syslog', 587: 'SMTP (submission)', 631: 'IPP (printing)', 993: 'IMAPS', 995: 'POP3S', 1080: 'SOCKS proxy',
  1433: 'MS SQL Server', 1521: 'Oracle DB', 2049: 'NFS', 3000: 'Node dev server', 3306: 'MySQL/MariaDB', 3389: 'RDP',
  5432: 'PostgreSQL', 5672: 'AMQP (RabbitMQ)', 5900: 'VNC', 6379: 'Redis', 8080: 'HTTP alt', 8443: 'HTTPS alt',
  9000: 'PHP-FPM / SonarQube', 9200: 'Elasticsearch', 27017: 'MongoDB',
};

export const PortLookup = () => {
  const [q, setQ] = useState('');
  const list = useMemo(() => Object.entries(PORTS).filter(([p, s]) => !q || p.includes(q) || s.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <div className="space-y-4">
      <Field label="Search port or service">
        <input data-testid="port-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="443, mysql, ssh…" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
      </Field>
      <div className="grid gap-2 sm:grid-cols-2" data-testid="port-list">
        {list.map(([port, service]) => (
          <div key={port} className="flex items-center gap-3 rounded-md border border-border bg-muted/30 px-3 py-2">
            <span className="w-16 font-mono text-sm font-semibold">{port}</span>
            <span className="text-sm">{service}</span>
          </div>
        ))}
        {list.length === 0 && <span className="text-sm text-muted-foreground">No matching ports</span>}
      </div>
    </div>
  );
};
