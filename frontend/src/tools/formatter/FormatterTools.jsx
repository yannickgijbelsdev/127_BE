import React, { useState, useMemo } from 'react';
import { format as formatSql } from 'sql-formatter';
import { html as beautifyHtml, css as beautifyCss, js as beautifyJs } from 'js-beautify';
import { Field, CodeArea, OutputPanel, ErrorBanner } from '../../components/toolbox/primitives';

const FormatterBase = ({ id, defaultValue, formatFn, filename }) => {
  const [input, setInput] = useState(defaultValue);
  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: '' };
    try { return { output: formatFn(input), error: '' }; }
    catch (e) { return { output: '', error: e.message }; }
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Input"><CodeArea value={input} onChange={setInput} testId={`${id}-input`} rows={18} /></Field>
        <OutputPanel title="Formatted" value={output} filename={filename} testId={`${id}-output`} />
      </div>
      <ErrorBanner message={error} />
    </div>
  );
};

export const SqlFormatter = () => (
  <FormatterBase id="sql-formatter" filename="formatted.sql"
    defaultValue={'select id,name from users where active=1 order by name'}
    formatFn={(s) => formatSql(s, { language: 'sql' })} />
);

export const HtmlFormatter = () => (
  <FormatterBase id="html-formatter" filename="formatted.html"
    defaultValue={'<div><h1>Hi</h1><p>Tool127</p></div>'}
    formatFn={(s) => beautifyHtml(s, { indent_size: 2, wrap_line_length: 0 })} />
);

export const CssFormatter = () => (
  <FormatterBase id="css-formatter" filename="formatted.css"
    defaultValue={'body{margin:0;padding:0}a{color:blue;text-decoration:none}'}
    formatFn={(s) => beautifyCss(s, { indent_size: 2 })} />
);

export const JsFormatter = () => (
  <FormatterBase id="js-formatter" filename="formatted.js"
    defaultValue={'function hi(name){return "hello "+name}const x=[1,2,3].map(n=>n*2)'}
    formatFn={(s) => beautifyJs(s, { indent_size: 2 })} />
);
