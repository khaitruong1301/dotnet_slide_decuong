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
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10">
      <header className="mb-12">
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

        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="card px-4 py-3.5">
              <dd className="text-2xl font-bold text-ink">{s.value}</dd>
              <dt className="mt-0.5 text-xs text-ink/40">{s.label}</dt>
            </div>
          ))}
        </dl>
      </header>

      <section>
        <h2 className="mb-5 text-lg font-bold text-ink/80">Lộ trình 8 buổi</h2>
        <div className="grid gap-3.5 sm:grid-cols-2">
          {BUOI_LIST.map((b) => (
            <Link
              key={b.id}
              to={`/buoi/${b.slug}`}
              className="card group flex flex-col p-5 transition hover:border-brand-400/40 hover:bg-ink/[0.07]"
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

      <section className="mt-12">
        <h2 className="mb-4 text-lg font-bold text-ink/80">Cách dùng trang này</h2>
        <ul className="card space-y-2.5 p-5 text-[14px] leading-relaxed text-ink/60">
          <li>· Menu bên trái là đề cương 8 buổi. Bấm vào một buổi để mở nội dung bài học đầy đủ.</li>
          <li>· Mỗi buổi gồm phần lý thuyết có sơ đồ minh hoạ, ví dụ code chạy được, và bài tập về nhà ở cuối trang.</li>
          <li>· Cột <span className="font-semibold text-brand-300">Trên trang này</span> bên phải giúp nhảy nhanh tới từng mục.</li>
          <li>· Ở phần bài tập, bấm vào số thứ tự để đánh dấu bài đã làm xong.</li>
        </ul>
      </section>
    </div>
  )
}
