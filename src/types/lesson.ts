export type BadgeLevel = 'Fondasi' | 'Dasar' | 'Menengah' | 'Lanjutan';
export type KodeTipe = 'typescript' | 'tsx' | 'javascript' | 'bash' | 'json' | 'error';

export interface ContohKode {
  label: string;
  kode: string;
  tipe: KodeTipe;
}

export interface Analogi {
  judul: string;
  cerita: string;
}

// Blocks that appear across topics (polymorphic)
export interface BlokKontenKode {
  penjelasan?: string;
  contoh_kode: ContohKode[];
}

export interface ItemPerbandingan {
  aspek: string;
  javascript: string;
  typescript: string;
}

export interface LangkahAlur {
  langkah: number;
  judul: string;
  deskripsi: string;
}

export interface LangkahSetup {
  judul: string;
  kode: string;
  tipe: KodeTipe;
}

export interface StrukturFolder {
  penjelasan: string;
  struktur: string;
}

export interface ItemKonsep {
  nama: string;
  deskripsi: string;
  contoh_kode: ContohKode[];
}

export interface ItemPerbedaan {
  tipe: string;
  arti: string;
  contoh_kode: { kode: string; tipe: KodeTipe };
}

export interface StrictNullChecks {
  judul: string;
  penjelasan: string;
  contoh_kode: ContohKode[];
}

export interface ItemKapanMuncul {
  situasi: string;
  kode: string;
  tipe: KodeTipe;
}

export interface PerbedaanDenganAny {
  penjelasan: string;
  contoh_kode: ContohKode[];
}

export interface DuaCaraDeklarasi {
  penjelasan: string;
  contoh_kode: { kode: string; tipe: KodeTipe };
}

export interface CaraBacaSintaks {
  penjelasan: string;
  breakdown: Array<{ bagian: string; arti: string }>;
}

export interface MasalahTanpaGenerics {
  penjelasan: string;
  contoh_kode: ContohKode[];
}

export interface SolusiGenerics {
  penjelasan: string;
  contoh_kode: ContohKode[];
}

export interface SintaksDasar {
  penjelasan: string;
  contoh_kode: { kode: string; tipe: KodeTipe };
}

export interface AnnotationObjek {
  penjelasan: string;
  contoh_kode: ContohKode[];
}

// Full Topik — polymorphic content fields are optional
export interface Topik {
  id: string;
  judul: string;
  badge: BadgeLevel;
  analogi: Analogi;
  poin_penting: string;

  // Variable content fields
  penjelasan?: string;
  aturan_praktis?: string;

  // 00-fondasi
  masalah_di_javascript?: { penjelasan: string; contoh_kode: ContohKode[] };
  solusi_typescript?: { penjelasan: string; contoh_kode: ContohKode[] };
  perbandingan?: ItemPerbandingan[];
  alur_kerja?: LangkahAlur[];
  langkah_setup?: LangkahSetup[];
  struktur_folder?: StrukturFolder;

  // 01-types-dasar
  konsep?: ItemKonsep[];
  contoh_nyata?: ContohKode;
  contoh_kode?: ContohKode[];
  perbedaan?: ItemPerbedaan[];
  strict_null_checks?: StrictNullChecks;
  kapan_muncul?: ItemKapanMuncul[];
  perbedaan_dengan_any?: PerbedaanDenganAny;
  sintaks_dasar?: SintaksDasar;
  annotation_objek?: AnnotationObjek;

  // 02-struktur-data
  dua_cara_deklarasi?: DuaCaraDeklarasi;
  contoh_operasi?: ContohKode;
  array_of_objects?: ContohKode;
  readonly_array?: ContohKode;

  // 03-interface-type
  // (uses contoh_kode, penjelasan)

  // 04-union-narrowing
  // (uses contoh_kode, penjelasan)

  // 06-generics
  masalah_tanpa_generics?: MasalahTanpaGenerics;
  solusi_generics?: SolusiGenerics;
  cara_baca_sintaks?: CaraBacaSintaks;

  // 02-struktur-data extra
  optional_vs_nullable?: { judul: string; penjelasan: string; contoh_kode: { kode: string; tipe: KodeTipe } };
  perbedaan_dengan_const?: { judul: string; penjelasan: string; contoh_kode: { kode: string; tipe: KodeTipe } };

  // 03-interface-type
  perbandingan_fitur?: Array<{ fitur: string; interface: string; type_alias: string; catatan: string }>;
  panduan_memilih?: { judul: string; rules: Array<{ situasi: string; pilihan: string; alasan: string }> };

  // 04-union-narrowing
  jenis_narrowing?: Array<{ nama: string; deskripsi: string; contoh_kode: { kode: string; tipe: KodeTipe } }>;

  // 05-functions
  contoh_perbedaan?: ContohKode;

  // 07-utility-types
  topik_kecil?: Array<{ nama: string; penjelasan: string; contoh_kode: { kode: string; tipe: KodeTipe } }>;

  // react-native
  perbedaan_web_mobile?: ItemPerbedaanWebMobile[];
  salah_vs_benar?: SalahVsBenar[];
}

// React Native course blocks
export interface ItemPerbedaanWebMobile {
  aspek: string;
  react_web: string;
  react_native: string;
}

export interface SalahVsBenar {
  judul: string;
  penjelasan?: string;
  salah: { kode: string; tipe: KodeTipe };
  benar: { kode: string; tipe: KodeTipe };
}

export interface LessonBagian {
  bagian: number;
  judul: string;
  deskripsi: string;
  topik: Topik[];
}
