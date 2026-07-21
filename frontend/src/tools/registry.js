import {
  FileJson, FileCode2, Table2, KeyRound, Hash, Lock, ShieldCheck, Fingerprint,
  CaseSensitive, ListX, ArrowDownAZ, Type, Database, Code2, Braces, FileTerminal,
  Regex, Clock, CalendarClock, Globe, FileType2, MonitorSmartphone, Network, ScanSearch,
  Palette, Blend, BoxSelect, Scan, Calculator, Waypoints, Plug,
} from 'lucide-react';

import { JsonYaml, JsonXml, CsvJson } from './json/JsonTools';
import { JwtGenerator, HashGenerator, PasswordGenerator, PasswordStrengthChecker, UuidGenerator } from './security/SecurityTools';
import { CaseConverter, RemoveDuplicateLines, SortLines, WordCounter } from './text/TextTools';
import { SqlFormatter, HtmlFormatter, CssFormatter, JsFormatter } from './formatter/FormatterTools';
import { RegexTester, UnixTimestampConverter, CronGenerator } from './developer/DeveloperTools';
import { HttpStatusLookup, MimeTypeLookup, UserAgentParser, DnsLookup, WhoisLookup } from './web/WebTools';
import { ColorPaletteGenerator, CssGradientGenerator, BoxShadowGenerator, BorderRadiusGenerator } from './design/DesignTools';
import { IpCalculator, SubnetCalculator, PortLookup } from './network/NetworkTools';

export const CATEGORIES = [
  { id: 'json', name: 'JSON', icon: FileJson },
  { id: 'security', name: 'Security & Encoding', icon: ShieldCheck },
  { id: 'text', name: 'Text', icon: Type },
  { id: 'formatter', name: 'Formatter', icon: Code2 },
  { id: 'developer', name: 'Developer', icon: FileTerminal },
  { id: 'web', name: 'Web', icon: Globe },
  { id: 'design', name: 'Design', icon: Palette },
  { id: 'network', name: 'Network', icon: Network },
];

export const TOOLS = [
  // JSON
  { id: 'json-yaml', name: 'JSON ↔ YAML Converter', category: 'json', icon: FileJson, component: JsonYaml, description: 'Convert between JSON and YAML instantly, in your browser.', keywords: ['json', 'yaml', 'convert', 'yml'] },
  { id: 'json-xml', name: 'JSON ↔ XML Converter', category: 'json', icon: FileCode2, component: JsonXml, description: 'Convert JSON to XML and back.', keywords: ['json', 'xml', 'convert'] },
  { id: 'csv-json', name: 'CSV ↔ JSON Converter', category: 'json', icon: Table2, component: CsvJson, description: 'Convert CSV data to JSON and back.', keywords: ['csv', 'json', 'convert', 'spreadsheet'] },
  // Security & Encoding
  { id: 'jwt-generator', name: 'JWT Generator', category: 'security', icon: KeyRound, component: JwtGenerator, description: 'Create signed JSON Web Tokens (HS256/384/512).', keywords: ['jwt', 'token', 'sign', 'auth'] },
  { id: 'hash-generator', name: 'Hash Generator', category: 'security', icon: Hash, component: HashGenerator, description: 'Generate MD5, SHA-1, SHA-256 and SHA-512 hashes.', keywords: ['hash', 'md5', 'sha', 'checksum'] },
  { id: 'password-generator', name: 'Password Generator', category: 'security', icon: Lock, component: PasswordGenerator, description: 'Generate strong random passwords.', keywords: ['password', 'random', 'secure', 'generator'] },
  { id: 'password-strength', name: 'Password Strength Checker', category: 'security', icon: ShieldCheck, component: PasswordStrengthChecker, description: 'Estimate password entropy and strength.', keywords: ['password', 'strength', 'entropy', 'security'] },
  { id: 'uuid-generator', name: 'UUID Generator', category: 'security', icon: Fingerprint, component: UuidGenerator, description: 'Generate RFC 4122 v4 UUIDs.', keywords: ['uuid', 'guid', 'id', 'random'] },
  // Text
  { id: 'case-converter', name: 'Case Converter', category: 'text', icon: CaseSensitive, component: CaseConverter, description: 'Convert text between camelCase, snake_case, and more.', keywords: ['case', 'camel', 'snake', 'kebab', 'text'] },
  { id: 'remove-duplicate-lines', name: 'Remove Duplicate Lines', category: 'text', icon: ListX, component: RemoveDuplicateLines, description: 'Remove duplicate lines from text.', keywords: ['duplicate', 'lines', 'unique', 'dedupe'] },
  { id: 'sort-lines', name: 'Sort Lines', category: 'text', icon: ArrowDownAZ, component: SortLines, description: 'Sort lines alphabetically or numerically.', keywords: ['sort', 'lines', 'order', 'alphabetical'] },
  { id: 'word-counter', name: 'Word & Character Counter', category: 'text', icon: Type, component: WordCounter, description: 'Count words, characters, lines and reading time.', keywords: ['word', 'character', 'count', 'counter'] },
  // Formatter
  { id: 'sql-formatter', name: 'SQL Formatter', category: 'formatter', icon: Database, component: SqlFormatter, description: 'Beautify and format SQL queries.', keywords: ['sql', 'format', 'beautify', 'query'] },
  { id: 'html-formatter', name: 'HTML Formatter', category: 'formatter', icon: Code2, component: HtmlFormatter, description: 'Format and indent HTML markup.', keywords: ['html', 'format', 'beautify'] },
  { id: 'css-formatter', name: 'CSS Formatter', category: 'formatter', icon: Braces, component: CssFormatter, description: 'Format and beautify CSS.', keywords: ['css', 'format', 'beautify', 'style'] },
  { id: 'js-formatter', name: 'JavaScript Formatter', category: 'formatter', icon: FileCode2, component: JsFormatter, description: 'Format and beautify JavaScript code.', keywords: ['javascript', 'js', 'format', 'beautify'] },
  // Developer
  { id: 'regex-tester', name: 'Regex Tester', category: 'developer', icon: Regex, component: RegexTester, description: 'Test regular expressions with live matches.', keywords: ['regex', 'regexp', 'pattern', 'match'] },
  { id: 'unix-timestamp', name: 'Unix Timestamp Converter', category: 'developer', icon: Clock, component: UnixTimestampConverter, description: 'Convert between Unix timestamps and dates.', keywords: ['unix', 'timestamp', 'epoch', 'date', 'time'] },
  { id: 'cron-generator', name: 'Cron Expression Generator', category: 'developer', icon: CalendarClock, component: CronGenerator, description: 'Build and explain cron expressions.', keywords: ['cron', 'schedule', 'crontab', 'job'] },
  // Web
  { id: 'http-status', name: 'HTTP Status Code Lookup', category: 'web', icon: Globe, component: HttpStatusLookup, description: 'Look up HTTP status codes and meanings.', keywords: ['http', 'status', 'code', '404', '500'] },
  { id: 'mime-type', name: 'MIME Type Lookup', category: 'web', icon: FileType2, component: MimeTypeLookup, description: 'Find MIME types for file extensions.', keywords: ['mime', 'content-type', 'extension', 'file'] },
  { id: 'user-agent', name: 'User-Agent Parser', category: 'web', icon: MonitorSmartphone, component: UserAgentParser, description: 'Parse a User-Agent into browser, OS and device.', keywords: ['user-agent', 'ua', 'browser', 'parser'] },
  { id: 'dns-lookup', name: 'DNS Lookup', category: 'web', icon: ScanSearch, component: DnsLookup, description: 'Resolve DNS records via DNS-over-HTTPS.', keywords: ['dns', 'lookup', 'record', 'resolve', 'mx'] },
  { id: 'whois-lookup', name: 'WHOIS Lookup', category: 'web', icon: Network, component: WhoisLookup, description: 'Look up domain registration via RDAP.', keywords: ['whois', 'domain', 'rdap', 'registrar'] },
  // Design
  { id: 'color-palette', name: 'Color Palette Generator', category: 'design', icon: Palette, component: ColorPaletteGenerator, description: 'Generate color palettes and shades.', keywords: ['color', 'palette', 'shades', 'design'] },
  { id: 'css-gradient', name: 'CSS Gradient Generator', category: 'design', icon: Blend, component: CssGradientGenerator, description: 'Create linear and radial CSS gradients.', keywords: ['css', 'gradient', 'linear', 'radial'] },
  { id: 'box-shadow', name: 'CSS Box Shadow Generator', category: 'design', icon: BoxSelect, component: BoxShadowGenerator, description: 'Design CSS box shadows visually.', keywords: ['css', 'box-shadow', 'shadow', 'design'] },
  { id: 'border-radius', name: 'CSS Border Radius Generator', category: 'design', icon: Scan, component: BorderRadiusGenerator, description: 'Craft CSS border-radius values visually.', keywords: ['css', 'border-radius', 'rounded', 'corners'] },
  // Network
  { id: 'ip-calculator', name: 'IP Calculator', category: 'network', icon: Calculator, component: IpCalculator, description: 'Calculate network, broadcast and host ranges.', keywords: ['ip', 'calculator', 'network', 'ipv4'] },
  { id: 'subnet-calculator', name: 'CIDR / Subnet Calculator', category: 'network', icon: Waypoints, component: SubnetCalculator, description: 'Calculate subnets from CIDR notation.', keywords: ['subnet', 'cidr', 'network', 'mask'] },
  { id: 'port-lookup', name: 'Port Lookup', category: 'network', icon: Plug, component: PortLookup, description: 'Look up common TCP/UDP ports and services.', keywords: ['port', 'tcp', 'udp', 'service'] },
];

export const getTool = (id) => TOOLS.find((t) => t.id === id);
export const getToolsByCategory = (catId) => TOOLS.filter((t) => t.category === catId);
