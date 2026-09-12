import type { CodeSample } from '../data/types'
import { highlight } from './csharp-highlight'

export default function CodeBlock({ sample, dense = false }: { sample: CodeSample; dense?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-white/10 bg-[#0c0c17]">
      <figcaption className="flex items-center gap-2 border-b border-white/8 bg-white/4 px-4 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-mint-400/60" />
        </span>
        <span className="ml-1 font-mono text-xs text-white/45">{sample.title ?? `${sample.lang ?? 'csharp'}`}</span>
      </figcaption>
      <pre className={`overflow-x-auto px-4 font-mono leading-relaxed text-white/85 ${dense ? 'py-3 text-[0.8em]' : 'py-4 text-[0.9em]'}`}>
        <code>{highlight(sample.code)}</code>
      </pre>
      {sample.note && (
        <div className="border-t border-white/8 bg-brand-500/8 px-4 py-2 text-[0.8em] text-brand-300">{sample.note}</div>
      )}
    </figure>
  )
}
