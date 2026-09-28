import { useEffect, useRef, useState } from 'react'
import { DEMOS } from '../demos'
import { ConsoleStopped, type ConsoleIO } from '../demos/console'

/**
 * Khung terminal chạy chương trình mẫu ngay trên web: chương trình gọi io.write để in
 * và await io.read để chờ người dùng gõ vào ô nhập ở dòng cuối.
 */
export default function ConsoleDemo({ id }: { id: string }) {
  const demo = DEMOS[id]
  const [lines, setLines] = useState<string[]>([])
  const [prompt, setPrompt] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [ended, setEnded] = useState(false)
  const [runId, setRunId] = useState(0)
  const resolver = useRef<((s: string) => void) | null>(null)
  const rejecter = useRef<((e: Error) => void) | null>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!demo) return
    let alive = true
    setLines([])
    setPrompt(null)
    setEnded(false)
    const io: ConsoleIO = {
      write: (t = '') => {
        if (alive) setLines((ls) => [...ls, t])
      },
      read: (p = '') =>
        new Promise<string>((resolve, reject) => {
          if (!alive) return reject(new ConsoleStopped())
          setPrompt(p)
          resolver.current = resolve
          rejecter.current = reject
        }),
    }
    demo
      .program(io)
      .catch((e) => {
        if (!(e instanceof ConsoleStopped) && alive) setLines((ls) => [...ls, 'Chương trình dừng vì lỗi: ' + String(e)])
      })
      .finally(() => {
        if (alive) {
          setPrompt(null)
          setEnded(true)
        }
      })
    return () => {
      alive = false
      rejecter.current?.(new ConsoleStopped())
      resolver.current = null
      rejecter.current = null
    }
  }, [demo, runId])

  useEffect(() => {
    const el = boxRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, prompt])

  if (!demo) return null

  const submit = () => {
    if (prompt === null || !resolver.current) return
    const value = input
    setLines((ls) => [...ls, prompt + value])
    setInput('')
    setPrompt(null)
    const r = resolver.current
    resolver.current = null
    rejecter.current = null
    r(value)
  }

  return (
    <div className="no-print overflow-hidden rounded-xl border border-ink/12 bg-[#0d1117] text-[13px] text-[#e6edf3]">
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-[12px] text-white/55">{demo.title}</span>
        <button
          onClick={() => setRunId((n) => n + 1)}
          className="ml-auto rounded-md border border-white/15 px-2 py-0.5 text-[11.5px] text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          ↻ Chạy lại
        </button>
      </div>
      <div
        ref={boxRef}
        className="max-h-[380px] min-h-[220px] cursor-text overflow-y-auto px-4 py-3 font-mono leading-[1.65]"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {l || ' '}
          </div>
        ))}
        {prompt !== null && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              submit()
            }}
            className="flex items-center"
          >
            <span className="whitespace-pre text-[#7ee787]">{prompt}</span>
            <input
              ref={inputRef}
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-w-0 flex-1 bg-transparent font-mono text-[#e6edf3] caret-[#7ee787] outline-none"
              aria-label={prompt || 'Nhập'}
            />
          </form>
        )}
        {ended && <div className="mt-1 text-white/40">— chương trình đã kết thúc, bấm Chạy lại để chạy từ đầu —</div>}
      </div>
    </div>
  )
}
