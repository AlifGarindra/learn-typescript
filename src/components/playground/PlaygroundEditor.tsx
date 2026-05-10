import Editor, { type OnMount, type Monaco } from '@monaco-editor/react';
import { useCallback, useRef, useState } from 'react';

interface Props {
  kode: string;
  onChange: (kode: string) => void;
  onCompile: (js: string, errors: string[]) => void;
}

export function PlaygroundEditor({ kode, onChange, onCompile }: Props) {
  const monacoRef = useRef<Monaco | null>(null);
  const [compiling, setCompiling] = useState(false);

  const handleMount: OnMount = useCallback((_editor, monaco) => {
    monacoRef.current = monaco;

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      strict: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      noEmit: false,
    });

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
  }, []);

  const handleCompile = useCallback(async () => {
    const monaco = monacoRef.current;
    if (!monaco || compiling) return;

    setCompiling(true);
    try {
      const uri = monaco.Uri.parse('inmemory://playground.ts');
      let model = monaco.editor.getModel(uri);
      if (!model) {
        model = monaco.editor.createModel(kode, 'typescript', uri);
      } else {
        model.setValue(kode);
      }

      const getWorker = await monaco.languages.typescript.getTypeScriptWorker();
      const worker = await getWorker(uri);

      const [semantic, syntax, emitOutput] = await Promise.all([
        worker.getSemanticDiagnostics(uri.toString()),
        worker.getSyntacticDiagnostics(uri.toString()),
        worker.getEmitOutput(uri.toString()),
      ]);

      const errors = [...syntax, ...semantic].map((d) => {
        const msg = typeof d.messageText === 'string'
          ? d.messageText
          : (d.messageText as { messageText: string }).messageText;
        const pos = d.start !== undefined
          ? `baris ${model!.getPositionAt(d.start).lineNumber}: `
          : '';
        return `${pos}${msg}`;
      });

      const jsFile = (emitOutput.outputFiles as Array<{ name: string; text: string }>)
        .find((f) => f.name.endsWith('.js'));

      onCompile(jsFile?.text ?? '', errors);
    } finally {
      setCompiling(false);
    }
  }, [kode, compiling, onCompile]);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/8 bg-white/3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="text-xs text-gray-400 font-mono">playground.ts</span>
        </div>
        <button
          onClick={handleCompile}
          disabled={compiling}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-colors"
        >
          {compiling ? (
            <><span className="animate-spin inline-block">⟳</span> Compiling...</>
          ) : (
            <>▶ Compile</>
          )}
        </button>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          defaultLanguage="typescript"
          value={kode}
          theme="vs-dark"
          onChange={(val) => onChange(val ?? '')}
          onMount={handleMount}
          options={{
            fontSize: 14,
            fontFamily: "ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace",
            lineHeight: 1.6,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
            tabSize: 2,
            renderLineHighlight: 'gutter',
            smoothScrolling: true,
            cursorBlinking: 'smooth',
          }}
        />
      </div>
    </div>
  );
}
