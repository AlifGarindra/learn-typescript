import { useEffect, useState } from 'react';
import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import type { KodeTipe } from '../../types/lesson';

// Lazy singleton highlighter
let highlighterPromise: ReturnType<typeof createHighlighterCore> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [import('shiki/themes/tokyo-night.mjs')],
      langs: [
        import('shiki/langs/typescript.mjs'),
        import('shiki/langs/javascript.mjs'),
        import('shiki/langs/bash.mjs'),
        import('shiki/langs/json.mjs'),
      ],
      engine: createOnigurumaEngine(import('shiki/wasm')),
    });
  }
  return highlighterPromise;
}

const shikiLang: Record<KodeTipe, string> = {
  typescript: 'typescript',
  javascript: 'javascript',
  bash: 'bash',
  json: 'json',
  error: 'typescript',
};

const labelStyles: Record<KodeTipe, string> = {
  typescript: 'bg-blue-500/20 text-blue-300',
  javascript: 'bg-yellow-500/20 text-yellow-300',
  bash: 'bg-green-500/20 text-green-300',
  json: 'bg-orange-500/20 text-orange-300',
  error: 'bg-red-500/20 text-red-300',
};

const labelText: Record<KodeTipe, string> = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  bash: 'Terminal',
  json: 'JSON',
  error: 'TypeScript',
};

interface Props {
  kode: string;
  tipe: KodeTipe;
  label?: string;
}

export function CodeBlock({ kode, tipe, label }: Props) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    let active = true;
    getHighlighter().then((hl) => {
      if (!active) return;
      const result = hl.codeToHtml(kode, {
        lang: shikiLang[tipe],
        theme: 'tokyo-night',
      });
      setHtml(result);
    });
    return () => { active = false; };
  }, [kode, tipe]);

  return (
    <div className="rounded-xl overflow-hidden border border-white/8 bg-[#1a1b26]">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/8 bg-white/4">
        <span className={`text-xs px-2 py-0.5 rounded font-mono font-medium ${labelStyles[tipe]}`}>
          {labelText[tipe]}
        </span>
        {label && (
          <span className="text-xs text-gray-400 truncate">{label}</span>
        )}
      </div>
      {html ? (
        <div
          className="[&_.shiki]:!bg-transparent [&_.shiki]:m-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="p-4 text-sm text-gray-400 font-mono overflow-x-auto leading-relaxed">
          <code>{kode}</code>
        </pre>
      )}
    </div>
  );
}
