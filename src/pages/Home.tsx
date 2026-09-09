import { Link } from 'react-router-dom'
import { BUOI_LIST, COURSE, TOTAL_EXERCISES, TOTAL_SECTIONS } from '../data'

const STATS = [
  { label: 'Buổi học', value: '8' },
  { label: 'Phần lý thuyết', value: String(TOTAL_SECTIONS) },
  { label: 'Bài tập', value: String(TOTAL_EXERCISES) },
  { label: 'Thời lượng', value: '24 giờ' },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <header className="mb-9">
        <div className="mb-4 inline-flex rounded-full border border-brand-400/30 bg-brand-500/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-300">
          Đề cương khoá học
        </div>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-ink sm:text-5xl">{COURSE.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/55">{COURSE.subtitle}</p>

        <div className="mt-6 flex items-center gap-3">
          <img
            src="/avatar-512.png"
            alt={COURSE.author}
            className="h-12 w-12 rounded-full border-2 border-brand-400/40 object-cover"
          />
          <div>
            <div className="text-[14px] font-semibold text-ink/85">{COURSE.author}</div>
            <div className="text-[12px] text-ink/40">Biên soạn &amp; giảng dạy</div>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="no-print mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:brightness-110"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <path d="M6 14h12v8H6z" />
          </svg>
          Tải PDF đề cương
        </button>

        <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="card px-4 py-3.5">
              <dd className="text-2xl font-bold text-ink">{s.value}</dd>
              <dt className="mt-0.5 text-xs text-ink/40">{s.label}</dt>
            </div>
          ))}
        </dl>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-bold text-ink/80">Lộ trình 8 buổi</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {BUOI_LIST.map((b) => (
            <Link
              key={b.id}
              to={`/buoi/${b.slug}`}
              className="card group flex flex-col p-4 transition hover:border-brand-400/40 hover:bg-ink/[0.07]"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/20 text-xs font-bold text-brand-300">
                  {b.id}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-ink/30">{b.duration}</span>
              </div>

              <h3 className="text-[15px] font-bold leading-snug text-ink transition group-hover:text-brand-300">{b.title}</h3>
              <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-ink/45">{b.subtitle}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {b.keywords.slice(0, 4).map((k) => (
                  <span key={k} className="rounded-md bg-ink/6 px-2 py-0.5 font-mono text-[10.5px] text-ink/45">
                    {k}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="no-print mt-10">
        <h2 className="mb-4 text-lg font-bold text-ink/80">Cách dùng trang này</h2>
        <ul className="card space-y-2.5 p-4 text-[14px] leading-relaxed text-ink/60">
          <li>· Menu bên trái là đề cương 8 buổi. Bấm vào một buổi để mở nội dung bài học đầy đủ.</li>
          <li>· Mỗi buổi gồm phần lý thuyết có sơ đồ minh hoạ, ví dụ code chạy được, và bài tập về nhà ở cuối trang.</li>
          <li>· Cột <span className="font-semibold text-brand-300">Trên trang này</span> bên phải giúp nhảy nhanh tới từng mục.</li>
          <li>· Ở phần bài tập, bấm vào số thứ tự để đánh dấu bài đã làm xong.</li>
        </ul>
      </section>
    </div>
  )
}
