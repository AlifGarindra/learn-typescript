import type { LessonBagian } from '../../types/lesson';

import fondasi from './rn-00-fondasi.json';
import komponenProps from './rn-01-komponen-props.json';
import stateHooks from './rn-02-state-hooks.json';
import interaksiForm from './rn-03-interaksi-form.json';
import daftarData from './rn-04-daftar-data.json';
import navigasi from './rn-05-navigasi.json';
import dataAsync from './rn-06-data-async.json';

export const reactNativeLessons: LessonBagian[] = [
  fondasi,
  komponenProps,
  stateHooks,
  interaksiForm,
  daftarData,
  navigasi,
  dataAsync,
] as LessonBagian[];
