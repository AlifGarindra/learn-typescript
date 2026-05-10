import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PlaygroundEditor } from '../components/playground/PlaygroundEditor';
import { OutputPanel } from '../components/playground/OutputPanel';
import { SavedSnippets } from '../components/playground/SavedSnippets';
import { usePlaygroundStore } from '../store/playgroundStore';
import { findTopik } from '../data/lessons';
import {
  daftarTemplate,
  getTemplate,
  getStarterCodeFromTopik,
  TEMPLATE_KOSONG,
} from '../utils/starterCode';

export function PlaygroundPage() {
  const { topikId } = useParams<{ topikId?: string }>();
  const { kode, setKode, simpanSnippet } = usePlaygroundStore();

  const [jsOutput, setJsOutput] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [belumDicompile, setBelumDicompile] = useState(true);
  const [judulSimpan, setJudulSimpan] = useState('');
  const [simpanOpen, setSimpanOpen] = useState(false);
  const [pesanSimpan, setPesanSimpan] = useState('');

  useEffect(() => {
    if (topikId) {
      const result = findTopik(topikId);
      if (result) {
        setKode(getStarterCodeFromTopik(result.topik));
        setBelumDicompile(true);
        return;
      }
    }
    if (!kode) setKode(TEMPLATE_KOSONG);
  }, [topikId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCompile = useCallback((js: string, errs: string[]) => {
    setJsOutput(js);
    setErrors(errs);
    setBelumDicompile(false);
  }, []);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setKode(getTemplate(e.target.value));
    setBelumDicompile(true);
  };

  const handleSimpan = () => {
    if (!judulSimpan.trim()) return;
    simpanSnippet(judulSimpan.trim(), kode);
    setPesanSimpan('Tersimpan!');
    setJudulSimpan('');
    setSimpanOpen(false);
    setTimeout(() => setPesanSimpan(''), 2000);
  };

  const topikInfo = topikId ? findTopik(topikId) : null;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-[#13141a]">
        <Link
          to={topikInfo ? `/topik/${topikId}` : '/topik/00-01'}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors flex-shrink-0"
        >
          ← {topikInfo ? topikInfo.topik.judul : 'Pelajaran'}
        </Link>

        <div className="w-px h-4 bg-white/10 flex-shrink-0" />
        <span className="text-white font-semibold text-sm flex-shrink-0">Playground TypeScript</span>

        <div className="flex-1" />

        {/* Template */}
        <select
          onChange={handleTemplateChange}
          defaultValue=""
          className="text-xs bg-white/8 border border-white/10 text-gray-300 rounded-lg px-2 py-1.5 hover:border-white/20 transition-colors cursor-pointer hidden sm:block"
        >
          <option value="" disabled>Template...</option>
          {daftarTemplate.map((t) => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>

        {/* Simpan */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setSimpanOpen((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg transition-colors"
          >
            {pesanSimpan || '💾 Simpan'}
          </button>
          {simpanOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setSimpanOpen(false)} />
              <div className="absolute right-0 top-10 z-20 bg-[#1a1b26] border border-white/10 rounded-xl p-3 shadow-2xl w-64">
                <p className="text-xs text-gray-400 mb-2">Nama snippet:</p>
                <input
                  autoFocus
                  value={judulSimpan}
                  onChange={(e) => setJudulSimpan(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSimpan()}
                  placeholder="Contoh: Belajar Generics"
                  className="w-full bg-white/8 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSimpan}
                  disabled={!judulSimpan.trim()}
                  className="mt-2 w-full py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Simpan
                </button>
              </div>
            </>
          )}
        </div>

        <SavedSnippets onLoad={(k) => { setKode(k); setBelumDicompile(true); }} />
      </header>

      {/* Split pane */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Editor */}
        <div className="flex-1 md:border-r border-b md:border-b-0 border-white/8 overflow-hidden min-h-0">
          <PlaygroundEditor
            kode={kode}
            onChange={(k) => { setKode(k); setBelumDicompile(true); }}
            onCompile={handleCompile}
          />
        </div>

        {/* Output */}
        <div className="flex-1 overflow-hidden min-h-0 bg-[#0f1117] flex flex-col">
          <div className="flex items-center px-4 py-2 border-b border-white/8 bg-white/3 flex-shrink-0">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">JavaScript Output</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <OutputPanel
              jsOutput={jsOutput}
              errors={errors}
              belumDicompile={belumDicompile}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
