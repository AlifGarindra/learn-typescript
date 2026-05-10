interface Props {
  jsOutput: string;
  errors: string[];
  belumDicompile: boolean;
}

export function OutputPanel({ jsOutput, errors, belumDicompile }: Props) {
  const adaError = errors.length > 0;

  if (belumDicompile) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-center px-6">
        <div className="text-4xl mb-3 opacity-30">⟳</div>
        <p className="text-gray-500 text-sm">
          Klik tombol <span className="text-blue-400 font-semibold">▶ Compile</span> untuk melihat hasil
        </p>
        <p className="text-gray-600 text-xs mt-1">
          TypeScript akan dikompilasi ke JavaScript murni
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Error panel */}
      {adaError && (
        <div className="flex-shrink-0 border-b border-red-500/20 bg-red-500/8 p-3 max-h-48 overflow-y-auto">
          <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-2">
            {errors.length} Error TypeScript
          </p>
          <ul className="space-y-1">
            {errors.map((err, i) => (
              <li key={i} className="flex items-start gap-2 text-xs font-mono">
                <span className="text-red-400 flex-shrink-0">✕</span>
                <span className="text-red-300">{err}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Output header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/8 bg-white/3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${adaError ? 'bg-amber-400' : 'bg-emerald-400'}`} />
          <span className="text-xs text-gray-400 font-mono">output.js</span>
          {!adaError && (
            <span className="text-xs text-emerald-400">✓ kompilasi berhasil</span>
          )}
          {adaError && (
            <span className="text-xs text-amber-400">⚠ ada error (output tetap dihasilkan)</span>
          )}
        </div>
      </div>

      {/* JavaScript output */}
      <div className="flex-1 overflow-auto p-4">
        {jsOutput ? (
          <pre className="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">
            {jsOutput}
          </pre>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 text-sm">Tidak ada output yang dihasilkan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
