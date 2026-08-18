import type { LessonBagian, Topik } from '../types/lesson';
import { typescriptLessons } from './lessons';
import { reactNativeLessons } from './lessons-rn';

export interface Kursus {
  id: string;
  judul: string;
  judulPendek: string;
  deskripsi: string;
  ikon: string;
  topikPertama: string;
  bagian: LessonBagian[];
}

export const daftarKursus: Kursus[] = [
  {
    id: 'typescript',
    judul: 'Belajar TypeScript',
    judulPendek: 'TypeScript',
    deskripsi: 'Dari JS ke TS yang benar',
    ikon: 'TS',
    topikPertama: '00-01',
    bagian: typescriptLessons,
  },
  {
    id: 'react-native',
    judul: 'React Native + TypeScript',
    judulPendek: 'React Native',
    deskripsi: 'Bangun aplikasi mobile yang aman',
    ikon: 'RN',
    topikPertama: 'rn-00-01',
    bagian: reactNativeLessons,
  },
];

export const kursusUtama = daftarKursus[0];

/** Semua topik sebuah kursus, sudah rata dan urut. */
export function topikKursus(kursus: Kursus): Topik[] {
  return kursus.bagian.flatMap((b) => b.topik);
}

export function totalTopikKursus(kursus: Kursus): number {
  return kursus.bagian.reduce((jumlah, b) => jumlah + b.topik.length, 0);
}

export function findKursus(kursusId: string): Kursus | null {
  return daftarKursus.find((k) => k.id === kursusId) ?? null;
}

/** Cari satu topik di seluruh kursus — id topik unik lintas kursus. */
export function findTopik(topikId: string) {
  for (const kursus of daftarKursus) {
    for (const bagian of kursus.bagian) {
      const topik = bagian.topik.find((t) => t.id === topikId);
      if (topik) return { kursus, bagian, topik };
    }
  }
  return null;
}

/** Kursus yang sedang dibuka, ditebak dari URL. */
export function kursusDariPathname(pathname: string): Kursus {
  const cocok = pathname.match(/^\/(?:topik|playground)\/(.+)$/);
  if (!cocok) return kursusUtama;
  return findTopik(cocok[1])?.kursus ?? kursusUtama;
}

/** Prev/next tidak pernah melompat ke kursus lain. */
export function getAdjacentTopics(topikId: string) {
  const hasil = findTopik(topikId);
  if (!hasil) return { prev: null, next: null };

  const flat = topikKursus(hasil.kursus);
  const idx = flat.findIndex((t) => t.id === topikId);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}

export const totalSemuaTopik = daftarKursus.reduce(
  (jumlah, k) => jumlah + totalTopikKursus(k),
  0
);
