import type { CodeSample } from '../data/types'

const KEYWORDS = new Set([
  'abstract','as','base','bool','break','byte','case','catch','char','checked','class','const','continue','decimal','default',
  'delegate','do','double','else','enum','event','explicit','extern','false','finally','fixed','float','for','foreach','goto',
  'if','implicit','in','int','interface','internal','is','lock','long','namespace','new','null','object','operator','out',
  'override','params','private','protected','public','readonly','ref','return','sbyte','sealed','short','sizeof','static',
  'string','struct','switch','this','throw','true','try','typeof','uint','ulong','unchecked','ushort','using','var','virtual',
  'void','while','yield','async','await','record','when','get','set','dynamic','global',
])

const TYPES = new Set([
  'Console','Convert','String','Math','List','Dictionary','HashSet','Array','ArrayList','Func','Action','Predicate',
  'DateTime','Exception','Regex','StringBuilder','LinkedList','SortedList','KeyValuePair','Enumerable','Nullable','Program',
])

/** Tokenizer C# gọn nhẹ — đủ cho slide, không kéo thêm thư viện highlight vào bundle. */
const TOKEN = new RegExp(
  [
    '(\\/\\/[^\\n]*)',                       // 1 comment dòng
    '(\\/\\*[\\s\\S]*?\\*\\/)',              // 2 comment khối
    '(\\$?@?"(?:[^"\\\\\\n]|\\\\.|"")*")',   // 3 chuỗi
    "('(?:[^'\\\\]|\\\\.)')",                // 4 ký tự
    '\\b(\\d+(?:\\.\\d+)?[fmdLu]?)\\b',      // 5 số
    '([A-Za-z_][A-Za-z0-9_]*)',              // 6 định danh
  ].join('|'),
  'g',
)

function highlight(code: string) {
  const out: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  TOKEN.lastIndex = 0
  let k = 0
  while ((m = TOKEN.exec(code)) !== null) {
    if (m.index > last) out.push(code.slice(last, m.index))
    const [full, lineC, blockC, str, ch, num, ident] = m
    let cls = ''
    if (lineC || blockC) cls = 'text-white/32 italic'
    else if (str) cls = 'text-mint-400'
    else if (ch) cls = 'text-mint-400'
    else if (num) cls = 'text-amber-300'
    else if (ident) {
      if (KEYWORDS.has(ident)) cls = 'text-brand-400 font-medium'
      else if (TYPES.has(ident)) cls = 'text-accent-400'
      else if (code[m.index + full.length] === '(') cls = 'text-sky-200'
    }
    out.push(cls ? <span key={k++} className={cls}>{full}</span> : full)
    last = m.index + full.length
  }
  if (last < code.length) out.push(code.slice(last))
  return out
}

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
