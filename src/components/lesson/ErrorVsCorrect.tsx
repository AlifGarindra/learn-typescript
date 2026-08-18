import type { SalahVsBenar } from '../../types/lesson';
import { CodeBlock } from './CodeBlock';

interface Props {
  items: SalahVsBenar[];
}

export function ErrorVsCorrect({ items }: Props) {
  return (
    <section className="space-y-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
        Salah vs Benar
      </h3>

      {items.map((item, i) => (
        <div key={i} className="space-y-3">
          <div>
            <p className="text-white font-semibold text-sm">{item.judul}</p>
            {item.penjelasan && (
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">{item.penjelasan}</p>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                ❌ Salah
              </p>
              <div className="rounded-xl ring-1 ring-red-500/30 overflow-hidden">
                <CodeBlock kode={item.salah.kode} tipe={item.salah.tipe} />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                ✅ Benar
              </p>
              <div className="rounded-xl ring-1 ring-emerald-500/30 overflow-hidden">
                <CodeBlock kode={item.benar.kode} tipe={item.benar.tipe} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
