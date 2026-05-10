import type { BadgeLevel } from '../../types/lesson';

const styles: Record<BadgeLevel, string> = {
  Fondasi: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
  Dasar: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  Menengah: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
  Lanjutan: 'bg-red-500/15 text-red-300 border border-red-500/30',
};

export function Badge({ level }: { level: BadgeLevel }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[level]}`}>
      {level}
    </span>
  );
}
