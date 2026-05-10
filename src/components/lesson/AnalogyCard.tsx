import type { Analogi } from '../../types/lesson';

export function AnalogyCard({ analogi }: { analogi: Analogi }) {
  return (
    <div className="relative rounded-xl border border-purple-500/25 bg-purple-500/8 p-5 md:p-6">
      <div className="absolute -top-3 left-5">
        <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Analogi
        </span>
      </div>
      <p className="text-purple-200 font-semibold text-base mb-2 mt-1">{analogi.judul}</p>
      <p className="text-gray-300 leading-relaxed text-sm md:text-base">{analogi.cerita}</p>
    </div>
  );
}
