import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  daftarKursus,
  kursusDariPathname,
  topikKursus,
  totalTopikKursus,
  type Kursus,
} from '../../data/courses';
import { useProgressStore } from '../../store/progressStore';
import { Badge } from '../ui/Badge';

interface Props {
  onClose?: () => void;
}

function useKursusAktif(): Kursus {
  const { pathname } = useLocation();
  return useMemo(() => kursusDariPathname(pathname), [pathname]);
}

export function Sidebar({ onClose }: Props) {
  const { isCompleted } = useProgressStore();
  const kursus = useKursusAktif();

  const total = totalTopikKursus(kursus);
  const selesai = topikKursus(kursus).filter((t) => isCompleted(t.id)).length;
  const persen = total === 0 ? 0 : Math.round((selesai / total) * 100);

  return (
    <aside className="flex flex-col h-full bg-[#13141a] border-r border-white/8">
      {/* Header */}
      <div className="p-5 border-b border-white/8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-white font-bold text-base leading-tight">{kursus.judul}</h1>
            <p className="text-gray-500 text-xs mt-0.5">{kursus.deskripsi}</p>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-gray-500 hover:text-white text-xl p-1">
              ✕
            </button>
          )}
        </div>
        {/* Progress bar — per kursus */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{selesai}/{total} topik</span>
            <span>{persen}%</span>
          </div>
          <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${persen}%` }}
            />
          </div>
        </div>
      </div>

      {/* Pemilih kursus */}
      <div className="flex gap-2 p-3 border-b border-white/8">
        {daftarKursus.map((k) => {
          const aktif = k.id === kursus.id;
          return (
            <NavLink
              key={k.id}
              to={`/topik/${k.topikPertama}`}
              onClick={onClose}
              className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                aktif
                  ? 'bg-blue-600/20 text-blue-200 border border-blue-500/30'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/4 border border-transparent'
              }`}
            >
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-md text-[10px] font-bold flex items-center justify-center ${
                  aktif ? 'bg-blue-500 text-white' : 'bg-white/8 text-gray-400'
                }`}
              >
                {k.ikon}
              </span>
              <span className="truncate">{k.judulPendek}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Playground link */}
      <NavLink
        to="/playground"
        onClick={onClose}
        className={({ isActive }) =>
          `flex items-center gap-2.5 px-5 py-2.5 text-sm border-b border-white/8 transition-colors ${
            isActive
              ? 'bg-blue-600/15 text-blue-300'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/4'
          }`
        }
      >
        <span className="text-base">⚡</span>
        <span className="font-medium">Playground</span>
        <span className="ml-auto text-xs text-gray-600">Coba langsung</span>
      </NavLink>

      {/* Navigasi topik kursus aktif */}
      <nav className="flex-1 overflow-y-auto py-3">
        {kursus.bagian.map((bagian) => (
          <div key={`${kursus.id}-${bagian.bagian}`} className="mb-2">
            <div className="px-4 py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Bagian {bagian.bagian} — {bagian.judul}
              </p>
            </div>
            <ul>
              {bagian.topik.map((topik) => {
                const done = isCompleted(topik.id);
                return (
                  <li key={topik.id}>
                    <NavLink
                      to={`/topik/${topik.id}`}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                          isActive
                            ? 'bg-blue-600/20 text-white border-r-2 border-blue-500'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-white/4'
                        }`
                      }
                    >
                      <span className={`flex-shrink-0 w-4 h-4 rounded-full border text-xs flex items-center justify-center ${
                        done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-600'
                      }`}>
                        {done ? '✓' : ''}
                      </span>
                      <span className="flex-1 leading-snug">{topik.judul}</span>
                      <Badge level={topik.badge} />
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
