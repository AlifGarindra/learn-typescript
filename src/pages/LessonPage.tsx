import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { findTopik, getAdjacentTopics } from '../data/courses';
import { AnalogyCard } from '../components/lesson/AnalogyCard';
import { ConceptNote } from '../components/lesson/ConceptNote';
import { LessonNav } from '../components/lesson/LessonNav';
import { TopicContent } from '../components/lesson/TopicContent';
import { Badge } from '../components/ui/Badge';
import { getStarterCodeFromTopik } from '../utils/starterCode';

export function LessonPage() {
  const { topikId } = useParams<{ topikId: string }>();

  if (!topikId) return <Navigate to="/topik/00-01" replace />;

  const result = findTopik(topikId);
  if (!result) return <Navigate to="/topik/00-01" replace />;

  const { kursus, bagian, topik } = result;
  const { prev, next } = getAdjacentTopics(topikId);

  // Cek apakah ada kode TypeScript yang bisa dibuka di playground
  const punya_kode_ts = getStarterCodeFromTopik(topik) !== '';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [topikId]);

  return (
    <article className="max-w-2xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Header */}
      <header className="space-y-3">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          <span className="text-blue-400">{kursus.judulPendek}</span>
          {' · '}Bagian {bagian.bagian} — {bagian.judul}
        </p>
        <div className="flex items-start gap-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight flex-1">
            {topik.judul}
          </h2>
          <Badge level={topik.badge} />
        </div>

        {/* Tombol Playground */}
        {punya_kode_ts && (
          <Link
            to={`/playground/${topikId}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 hover:text-blue-200 transition-colors"
          >
            <span>⚡</span>
            Coba di Playground
          </Link>
        )}
      </header>

      {/* Analogi */}
      <AnalogyCard analogi={topik.analogi} />

      {/* Dynamic content */}
      <TopicContent topik={topik} />

      {/* Key takeaway */}
      <ConceptNote text={topik.poin_penting} />

      {/* Navigation */}
      <LessonNav currentId={topikId} prev={prev} next={next} />
    </article>
  );
}
