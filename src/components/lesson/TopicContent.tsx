import type { Topik, ContohKode, KodeTipe } from '../../types/lesson';
import { CodeBlock } from './CodeBlock';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
      {children}
    </h3>
  );
}

function Penjelasan({ text }: { text: string }) {
  return <p className="text-gray-300 leading-relaxed text-base">{text}</p>;
}

function KodeList({ list }: { list: ContohKode[] }) {
  return (
    <div className="space-y-4">
      {list.map((item, i) => (
        <CodeBlock key={i} kode={item.kode} tipe={item.tipe} label={item.label} />
      ))}
    </div>
  );
}

export function TopicContent({ topik }: { topik: Topik }) {
  return (
    <div className="space-y-8">

      {/* masalah_di_javascript */}
      {topik.masalah_di_javascript && (
        <section className="space-y-4">
          <SectionTitle>Masalah di JavaScript</SectionTitle>
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <Penjelasan text={topik.masalah_di_javascript.penjelasan} />
          </div>
          <KodeList list={topik.masalah_di_javascript.contoh_kode} />
        </section>
      )}

      {/* solusi_typescript */}
      {topik.solusi_typescript && (
        <section className="space-y-4">
          <SectionTitle>Solusi TypeScript</SectionTitle>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <Penjelasan text={topik.solusi_typescript.penjelasan} />
          </div>
          <KodeList list={topik.solusi_typescript.contoh_kode} />
        </section>
      )}

      {/* perbandingan tabel */}
      {topik.perbandingan && (
        <section className="space-y-4">
          <SectionTitle>JavaScript vs TypeScript</SectionTitle>
          <div className="overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-white/4">
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Aspek</th>
                  <th className="px-4 py-3 text-left text-yellow-400 font-medium">JavaScript</th>
                  <th className="px-4 py-3 text-left text-blue-400 font-medium">TypeScript</th>
                </tr>
              </thead>
              <tbody>
                {topik.perbandingan.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3 text-gray-300 font-medium">{row.aspek}</td>
                    <td className="px-4 py-3 text-gray-400">{row.javascript}</td>
                    <td className="px-4 py-3 text-gray-300">{row.typescript}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* alur_kerja */}
      {topik.alur_kerja && (
        <section className="space-y-4">
          <SectionTitle>Alur Kerja</SectionTitle>
          <div className="space-y-3">
            {topik.alur_kerja.map((step) => (
              <div key={step.langkah} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                  {step.langkah}
                </div>
                <div className="pt-1">
                  <p className="text-white font-medium text-sm">{step.judul}</p>
                  <p className="text-gray-400 text-sm mt-0.5">{step.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* langkah_setup */}
      {topik.langkah_setup && (
        <section className="space-y-4">
          <SectionTitle>Langkah Setup</SectionTitle>
          <div className="space-y-4">
            {topik.langkah_setup.map((step, i) => (
              <div key={i} className="space-y-2">
                <p className="text-white font-medium text-sm">{step.judul}</p>
                <CodeBlock kode={step.kode} tipe={step.tipe as KodeTipe} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* struktur_folder */}
      {topik.struktur_folder && (
        <section className="space-y-3">
          <SectionTitle>Struktur Folder</SectionTitle>
          <Penjelasan text={topik.struktur_folder.penjelasan} />
          <CodeBlock kode={topik.struktur_folder.struktur} tipe="bash" />
        </section>
      )}

      {/* konsep (01-types-dasar string/number/boolean) */}
      {topik.konsep && (
        <section className="space-y-6">
          {topik.konsep.map((k) => (
            <div key={k.nama} className="space-y-3">
              <div className="flex items-center gap-3">
                <code className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-sm font-mono font-semibold">
                  {k.nama}
                </code>
                <span className="text-gray-400 text-sm">{k.deskripsi}</span>
              </div>
              <KodeList list={k.contoh_kode} />
            </div>
          ))}
        </section>
      )}

      {/* contoh_nyata */}
      {topik.contoh_nyata && (
        <section className="space-y-3">
          <SectionTitle>Contoh Nyata</SectionTitle>
          <CodeBlock
            kode={topik.contoh_nyata.kode}
            tipe={topik.contoh_nyata.tipe}
            label={topik.contoh_nyata.label}
          />
        </section>
      )}

      {/* perbedaan (null vs undefined) */}
      {topik.perbedaan && (
        <section className="space-y-4">
          <SectionTitle>Perbedaan</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {topik.perbedaan.map((item) => (
              <div key={item.tipe} className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="bg-white/10 text-white px-2 py-0.5 rounded text-sm font-mono font-semibold">
                    {item.tipe}
                  </code>
                  <span className="text-gray-400 text-xs">{item.arti}</span>
                </div>
                <CodeBlock kode={item.contoh_kode.kode} tipe={item.contoh_kode.tipe as KodeTipe} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* strict_null_checks */}
      {topik.strict_null_checks && (
        <section className="space-y-4">
          <SectionTitle>{topik.strict_null_checks.judul}</SectionTitle>
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
            <Penjelasan text={topik.strict_null_checks.penjelasan} />
          </div>
          <KodeList list={topik.strict_null_checks.contoh_kode} />
        </section>
      )}

      {/* penjelasan standalone */}
      {topik.penjelasan && !topik.masalah_di_javascript && !topik.strict_null_checks && (
        <section>
          <div className="rounded-xl border border-white/8 bg-white/4 p-4">
            <Penjelasan text={topik.penjelasan} />
          </div>
        </section>
      )}

      {/* contoh_kode standalone */}
      {topik.contoh_kode && (
        <section className="space-y-4">
          <KodeList list={topik.contoh_kode} />
        </section>
      )}

      {/* aturan_praktis */}
      {topik.aturan_praktis && (
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">Aturan Praktis</p>
          <Penjelasan text={topik.aturan_praktis} />
        </div>
      )}

      {/* kapan_muncul */}
      {topik.kapan_muncul && (
        <section className="space-y-4">
          <SectionTitle>Kapan Muncul</SectionTitle>
          {topik.kapan_muncul.map((item, i) => (
            <div key={i} className="space-y-2">
              <p className="text-gray-300 font-medium text-sm">{item.situasi}</p>
              <CodeBlock kode={item.kode} tipe={item.tipe as KodeTipe} />
            </div>
          ))}
        </section>
      )}

      {/* perbedaan_dengan_any */}
      {topik.perbedaan_dengan_any && (
        <section className="space-y-4">
          <SectionTitle>Perbedaan dengan any</SectionTitle>
          <div className="rounded-xl border border-white/8 bg-white/4 p-4">
            <Penjelasan text={topik.perbedaan_dengan_any.penjelasan} />
          </div>
          <KodeList list={topik.perbedaan_dengan_any.contoh_kode} />
        </section>
      )}

      {/* sintaks_dasar */}
      {topik.sintaks_dasar && (
        <section className="space-y-3">
          <SectionTitle>Sintaks Dasar</SectionTitle>
          <Penjelasan text={topik.sintaks_dasar.penjelasan} />
          <CodeBlock kode={topik.sintaks_dasar.contoh_kode.kode} tipe={topik.sintaks_dasar.contoh_kode.tipe as KodeTipe} />
        </section>
      )}

      {/* annotation_objek */}
      {topik.annotation_objek && (
        <section className="space-y-3">
          <SectionTitle>Annotation Objek</SectionTitle>
          <Penjelasan text={topik.annotation_objek.penjelasan} />
          <KodeList list={topik.annotation_objek.contoh_kode} />
        </section>
      )}

      {/* dua_cara_deklarasi */}
      {topik.dua_cara_deklarasi && (
        <section className="space-y-3">
          <SectionTitle>Dua Cara Deklarasi</SectionTitle>
          <Penjelasan text={topik.dua_cara_deklarasi.penjelasan} />
          <CodeBlock kode={topik.dua_cara_deklarasi.contoh_kode.kode} tipe={topik.dua_cara_deklarasi.contoh_kode.tipe as KodeTipe} />
        </section>
      )}

      {/* contoh_operasi */}
      {topik.contoh_operasi && (
        <section className="space-y-3">
          <SectionTitle>Contoh Operasi</SectionTitle>
          <CodeBlock kode={topik.contoh_operasi.kode} tipe={topik.contoh_operasi.tipe} label={topik.contoh_operasi.label} />
        </section>
      )}

      {/* array_of_objects */}
      {topik.array_of_objects && (
        <section className="space-y-3">
          <SectionTitle>Array of Objects</SectionTitle>
          <CodeBlock kode={topik.array_of_objects.kode} tipe={topik.array_of_objects.tipe} label={topik.array_of_objects.label} />
        </section>
      )}

      {/* readonly_array */}
      {topik.readonly_array && (
        <section className="space-y-3">
          <SectionTitle>ReadonlyArray</SectionTitle>
          <CodeBlock kode={topik.readonly_array.kode} tipe={topik.readonly_array.tipe} label={topik.readonly_array.label} />
        </section>
      )}

      {/* masalah_tanpa_generics */}
      {topik.masalah_tanpa_generics && (
        <section className="space-y-4">
          <SectionTitle>Masalah Tanpa Generics</SectionTitle>
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <Penjelasan text={topik.masalah_tanpa_generics.penjelasan} />
          </div>
          <KodeList list={topik.masalah_tanpa_generics.contoh_kode} />
        </section>
      )}

      {/* solusi_generics */}
      {topik.solusi_generics && (
        <section className="space-y-4">
          <SectionTitle>Solusi dengan Generics</SectionTitle>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <Penjelasan text={topik.solusi_generics.penjelasan} />
          </div>
          <KodeList list={topik.solusi_generics.contoh_kode} />
        </section>
      )}

      {/* cara_baca_sintaks */}
      {topik.cara_baca_sintaks && (
        <section className="space-y-4">
          <SectionTitle>Cara Baca Sintaks</SectionTitle>
          <Penjelasan text={topik.cara_baca_sintaks.penjelasan} />
          <div className="space-y-2">
            {topik.cara_baca_sintaks.breakdown.map((item, i) => (
              <div key={i} className="flex gap-4 items-start rounded-lg border border-white/8 bg-white/3 p-3">
                <code className="flex-shrink-0 bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-sm font-mono font-semibold">
                  {item.bagian}
                </code>
                <span className="text-gray-300 text-sm">{item.arti}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* optional_vs_nullable */}
      {topik.optional_vs_nullable && (
        <section className="space-y-3">
          <SectionTitle>{topik.optional_vs_nullable.judul}</SectionTitle>
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
            <Penjelasan text={topik.optional_vs_nullable.penjelasan} />
          </div>
          <CodeBlock kode={topik.optional_vs_nullable.contoh_kode.kode} tipe={topik.optional_vs_nullable.contoh_kode.tipe as KodeTipe} />
        </section>
      )}

      {/* perbedaan_dengan_const */}
      {topik.perbedaan_dengan_const && (
        <section className="space-y-3">
          <SectionTitle>{topik.perbedaan_dengan_const.judul}</SectionTitle>
          <div className="rounded-xl border border-white/8 bg-white/4 p-4">
            <Penjelasan text={topik.perbedaan_dengan_const.penjelasan} />
          </div>
          <CodeBlock kode={topik.perbedaan_dengan_const.contoh_kode.kode} tipe={topik.perbedaan_dengan_const.contoh_kode.tipe as KodeTipe} />
        </section>
      )}

      {/* perbandingan_fitur */}
      {topik.perbandingan_fitur && (
        <section className="space-y-4">
          <SectionTitle>Perbandingan Fitur</SectionTitle>
          <div className="overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-white/4">
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Fitur</th>
                  <th className="px-4 py-3 text-left text-blue-400 font-medium">interface</th>
                  <th className="px-4 py-3 text-left text-purple-400 font-medium">type alias</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Catatan</th>
                </tr>
              </thead>
              <tbody>
                {topik.perbandingan_fitur.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3 text-gray-300 font-medium">{row.fitur}</td>
                    <td className="px-4 py-3 text-gray-300">{row.interface}</td>
                    <td className="px-4 py-3 text-gray-300">{row.type_alias}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{row.catatan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* panduan_memilih */}
      {topik.panduan_memilih && (
        <section className="space-y-3">
          <SectionTitle>{topik.panduan_memilih.judul}</SectionTitle>
          <div className="space-y-2">
            {topik.panduan_memilih.rules.map((rule, i) => (
              <div key={i} className="rounded-lg border border-white/8 bg-white/3 p-3 grid gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-gray-300 text-sm">{rule.situasi}</span>
                  <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded font-medium">
                    → {rule.pilihan}
                  </span>
                </div>
                <p className="text-gray-500 text-xs">{rule.alasan}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* jenis_narrowing */}
      {topik.jenis_narrowing && (
        <section className="space-y-5">
          <SectionTitle>Jenis-jenis Narrowing</SectionTitle>
          {topik.jenis_narrowing.map((item, i) => (
            <div key={i} className="space-y-2">
              <div>
                <p className="text-white font-semibold text-sm">{item.nama}</p>
                <p className="text-gray-400 text-sm">{item.deskripsi}</p>
              </div>
              <CodeBlock kode={item.contoh_kode.kode} tipe={item.contoh_kode.tipe as KodeTipe} />
            </div>
          ))}
        </section>
      )}

      {/* contoh_perbedaan */}
      {topik.contoh_perbedaan && (
        <section className="space-y-3">
          <SectionTitle>Contoh Perbedaan</SectionTitle>
          <CodeBlock kode={topik.contoh_perbedaan.kode} tipe={topik.contoh_perbedaan.tipe} label={topik.contoh_perbedaan.label} />
        </section>
      )}

      {/* topik_kecil (utility types sub-topics) */}
      {topik.topik_kecil && (
        <section className="space-y-6">
          <SectionTitle>Utility Types Lainnya</SectionTitle>
          {topik.topik_kecil.map((sub, i) => (
            <div key={i} className="space-y-3">
              <div>
                <code className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-sm font-mono font-semibold">
                  {sub.nama}
                </code>
                <p className="text-gray-300 text-sm mt-1.5">{sub.penjelasan}</p>
              </div>
              <CodeBlock kode={sub.contoh_kode.kode} tipe={sub.contoh_kode.tipe as KodeTipe} />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
