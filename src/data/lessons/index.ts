import type { LessonBagian } from '../../types/lesson';

import fondasi from './00-fondasi.json';
import typesDasar from './01-types-dasar.json';
import strukturData from './02-struktur-data.json';
import interfaceType from './03-interface-type.json';
import unionNarrowing from './04-union-narrowing.json';
import functions from './05-functions.json';
import generics from './06-generics.json';
import utilityTypes from './07-utility-types.json';

export const typescriptLessons: LessonBagian[] = [
  fondasi,
  typesDasar,
  strukturData,
  interfaceType,
  unionNarrowing,
  functions,
  generics,
  utilityTypes,
] as LessonBagian[];
