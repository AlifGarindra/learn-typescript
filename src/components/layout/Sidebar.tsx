import { NavLink } from 'react-router-dom';
import { allLessons, totalTopics } from '../../data/lessons';
import { useProgressStore } from '../../store/progressStore';
import { Badge } from '../ui/Badge';

interface Props {
  onClose?: () => void;
}

export function Sidebar({ onClose }: Props) {
  const { isCompleted, totalCompleted } = useProgressStore();
  const done = totalCompleted();

  return (
    <aside className="flex flex-col h-full bg-[#13141a] border-r border-white/8">
      {/* Header */}
      <div className="p-5 border-b border-white/8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-white font-bold text-base leading-tight">Belajar TypeScript</h1>
            <p className="text-gray-500 text-xs mt-0.5">Dari JS ke TS yang benar</p>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-gray-500 hover:text-white text-xl p-1">
              ✕
            </button>
          )}
        </div>
        {/* Progress bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{done}/{totalTopics} topik</span>
            <span>{Math.round((done / totalTopics) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${(done / totalTopics) * 100}%` }}
            />
          </div>
        </div>
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

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3">
        {allLessons.map((bagian) => (
          <div key={bagian.bagian} className="mb-2">
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
