import { useState } from 'react';
import { usePlaygroundStore, type SnippetSimpan } from '../../store/playgroundStore';

interface Props {
  onLoad: (kode: string) => void;
}

export function SavedSnippets({ onLoad }: Props) {
  const { snippetSimpan, hapusSnippet } = usePlaygroundStore();
  const [open, setOpen] = useState(false);

  if (snippetSimpan.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors"
      >
        📁 Tersimpan ({snippetSimpan.length})
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 z-20 w-72 bg-[#1a1b26] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
            <div className="px-4 py-2 border-b border-white/8 bg-white/4">
              <p className="text-xs font-semibold text-gray-400">Snippet Tersimpan</p>
            </div>
            <ul className="max-h-64 overflow-y-auto divide-y divide-white/5">
              {snippetSimpan.map((s: SnippetSimpan) => (
                <li key={s.id} className="flex items-center gap-2 px-3 py-2 hover:bg-white/5">
                  <button
                    onClick={() => { onLoad(s.kode); setOpen(false); }}
                    className="flex-1 text-left"
                  >
                    <p className="text-sm text-gray-200 truncate">{s.judul}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(s.disimpanPada).toLocaleDateString('id-ID')}
                    </p>
                  </button>
                  <button
                    onClick={() => hapusSnippet(s.id)}
                    className="text-gray-600 hover:text-red-400 text-xs flex-shrink-0"
                    title="Hapus"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
