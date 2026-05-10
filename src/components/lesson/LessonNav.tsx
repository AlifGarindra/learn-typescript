import { Link } from 'react-router-dom';
import type { Topik } from '../../types/lesson';
import { useProgressStore } from '../../store/progressStore';

interface Props {
  currentId: string;
  prev: Topik | null;
  next: Topik | null;
}

export function LessonNav({ currentId, prev, next }: Props) {
  const markCompleted = useProgressStore((s) => s.markCompleted);

  const handleNext = () => {
    markCompleted(currentId);
  };

  return (
    <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/8">
      {prev ? (
        <Link
          to={`/topik/${prev.id}`}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
          <span className="hidden sm:block truncate max-w-[160px]">{prev.judul}</span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          to={`/topik/${next.id}`}
          onClick={handleNext}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors group"
        >
          <span className="hidden sm:block truncate max-w-[160px]">Lanjut: {next.judul}</span>
          <span className="sm:hidden">Lanjut</span>
          <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      ) : (
        <button
          onClick={() => markCompleted(currentId)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors"
        >
          Selesai ✓
        </button>
      )}
    </div>
  );
}
