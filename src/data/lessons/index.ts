import type { LessonBagian } from '../../types/lesson';

import fondasi from './00-fondasi.json';
import typesDasar from './01-types-dasar.json';
import strukturData from './02-struktur-data.json';
import interfaceType from './03-interface-type.json';
import unionNarrowing from './04-union-narrowing.json';
import functions from './05-functions.json';
import generics from './06-generics.json';
import utilityTypes from './07-utility-types.json';

export const allLessons: LessonBagian[] = [
  fondasi,
  typesDasar,
  strukturData,
  interfaceType,
  unionNarrowing,
  functions,
  generics,
  utilityTypes,
] as LessonBagian[];

export const totalTopics = allLessons.reduce((sum, b) => sum + b.topik.length, 0);

export function findTopik(topikId: string) {
  for (const bagian of allLessons) {
    const topik = bagian.topik.find((t) => t.id === topikId);
    if (topik) return { bagian, topik };
  }
  return null;
}

export function getAdjacentTopics(topikId: string) {
  const flat = allLessons.flatMap((b) => b.topik);
  const idx = flat.findIndex((t) => t.id === topikId);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}
