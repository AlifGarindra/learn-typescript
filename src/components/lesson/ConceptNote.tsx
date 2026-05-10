export function ConceptNote({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-amber-500/25 bg-amber-500/8 p-4 md:p-5">
      <span className="text-amber-400 text-xl flex-shrink-0 mt-0.5">💡</span>
      <div>
        <p className="text-amber-200 font-semibold text-xs uppercase tracking-wider mb-1">Ingat ini</p>
        <p className="text-gray-200 leading-relaxed text-sm md:text-base">{text}</p>
      </div>
    </div>
  );
}
