import React, { useState, useMemo } from 'react';
import { load as yamlLoad, dump as yamlDump } from 'js-yaml';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import Papa from 'papaparse';
import { ArrowLeftRight } from 'lucide-react';
import { Field, CodeArea, OutputPanel, ErrorBanner } from '../../components/toolbox/primitives';

const DirToggle = ({ left, right, dir, setDir }) => (
  <button
    type="button"
    data-testid="direction-toggle"
    onClick={() => setDir((d) => (d === 'ltr' ? 'rtl' : 'ltr'))}
    className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors duration-150"
  >
    <span>{dir === 'ltr' ? left : right}</span>
    <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
    <span>{dir === 'ltr' ? right : left}</span>
  </button>
);

export const JsonYaml = () => {
  const [input, setInput] = useState('{\n  "name": "Tool127",\n  "features": ["fast", "private"]\n}');
  const [dir, setDir] = useState('ltr'); // ltr: json->yaml
  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: '' };
    try {
      if (dir === 'ltr') return { output: yamlDump(JSON.parse(input)), error: '' };
      return { output: JSON.stringify(yamlLoad(input), null, 2), error: '' };
    } catch (e) {
      return { output: '', error: e.message };
    }
  }, [input, dir]);

  return (
    <div className="space-y-4">
      <DirToggle left="JSON" right="YAML" dir={dir} setDir={setDir} />
      <div className="grid gap-4 lg:grid-cols-2">
        <Field label={dir === 'ltr' ? 'JSON input' : 'YAML input'}>
          <CodeArea value={input} onChange={setInput} testId="json-yaml-input" rows={16} />
        </Field>
        <OutputPanel title={dir === 'ltr' ? 'YAML output' : 'JSON output'} value={output} filename={dir === 'ltr' ? 'output.yaml' : 'output.json'} testId="json-yaml-output" />
      </div>
      <ErrorBanner message={error} />
    </div>
  );
};

export const JsonXml = () => {
  const [input, setInput] = useState('{\n  "note": {\n    "to": "Dev",\n    "body": "Hello XML"\n  }\n}');
  const [dir, setDir] = useState('ltr'); // json->xml
  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: '' };
    try {
      if (dir === 'ltr') {
        const builder = new XMLBuilder({ format: true, indentBy: '  ', ignoreAttributes: false });
        return { output: builder.build(JSON.parse(input)), error: '' };
      }
      const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
      return { output: JSON.stringify(parser.parse(input), null, 2), error: '' };
    } catch (e) {
      return { output: '', error: e.message };
    }
  }, [input, dir]);

  return (
    <div className="space-y-4">
      <DirToggle left="JSON" right="XML" dir={dir} setDir={setDir} />
      <div className="grid gap-4 lg:grid-cols-2">
        <Field label={dir === 'ltr' ? 'JSON input' : 'XML input'}>
          <CodeArea value={input} onChange={setInput} testId="json-xml-input" rows={16} />
        </Field>
        <OutputPanel title={dir === 'ltr' ? 'XML output' : 'JSON output'} value={output} filename={dir === 'ltr' ? 'output.xml' : 'output.json'} testId="json-xml-output" />
      </div>
      <ErrorBanner message={error} />
    </div>
  );
};

export const CsvJson = () => {
  const [input, setInput] = useState('name,role\nAlice,dev\nBob,designer');
  const [dir, setDir] = useState('ltr'); // csv->json
  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: '' };
    try {
      if (dir === 'ltr') {
        const res = Papa.parse(input.trim(), { header: true, skipEmptyLines: true });
        if (res.errors.length) throw new Error(res.errors[0].message);
        return { output: JSON.stringify(res.data, null, 2), error: '' };
      }
      const arr = JSON.parse(input);
      if (!Array.isArray(arr)) throw new Error('JSON must be an array of objects');
      return { output: Papa.unparse(arr), error: '' };
    } catch (e) {
      return { output: '', error: e.message };
    }
  }, [input, dir]);

  return (
    <div className="space-y-4">
      <DirToggle left="CSV" right="JSON" dir={dir} setDir={setDir} />
      <div className="grid gap-4 lg:grid-cols-2">
        <Field label={dir === 'ltr' ? 'CSV input' : 'JSON input'}>
          <CodeArea value={input} onChange={setInput} testId="csv-json-input" rows={16} />
        </Field>
        <OutputPanel title={dir === 'ltr' ? 'JSON output' : 'CSV output'} value={output} filename={dir === 'ltr' ? 'output.json' : 'output.csv'} testId="csv-json-output" />
      </div>
      <ErrorBanner message={error} />
    </div>
  );
};
