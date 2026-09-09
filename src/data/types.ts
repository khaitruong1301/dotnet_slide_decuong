/** Mô hình nội dung dùng chung cho cả trang đề cương và chế độ trình chiếu. */

export type FlowKind = 'start' | 'end' | 'io' | 'process' | 'decision' | 'note'

export interface FlowStep {
  kind: FlowKind
  text: string
  /** Nhánh rẽ — chỉ dùng cho kind = 'decision'. */
  branches?: { label: string; steps: FlowStep[] }[]
}

/** Các sơ đồ trực quan dựng sẵn, mô tả bằng dữ liệu để tái sử dụng trong slide lẫn bài học. */
export type Visual =
  | { kind: 'flow'; caption?: string; steps: FlowStep[] }
  | { kind: 'ipo'; caption?: string; input: string[]; process: string[]; output: string[] }
  | { kind: 'boxes'; caption?: string; items: { label: string; value: string; note?: string }[] }
  | { kind: 'strip'; caption?: string; name: string; items: string[]; highlight?: number[] }
  | { kind: 'map'; caption?: string; name: string; pairs: { key: string; value: string }[] }
  | { kind: 'loop'; caption?: string; init: string; cond: string; body: string; step: string }
  | { kind: 'func'; caption?: string; name: string; params: string[]; body: string; returns: string }
  | { kind: 'timeline'; caption?: string; items: { label: string; text: string }[] }
  | { kind: 'compare'; caption?: string; columns: { title: string; tone?: 'good' | 'bad' | 'plain'; items: string[] }[] }

export interface CodeSample {
  lang?: string
  title?: string
  code: string
  note?: string
}

/** Một khối nội dung trong phần lý thuyết của bài học. */
export type Block =
  | { type: 'text'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'code'; sample: CodeSample }
  | { type: 'visual'; visual: Visual }
  | { type: 'callout'; tone: 'info' | 'warn' | 'tip'; title?: string; text: string }
  | { type: 'table'; head: string[]; rows: string[][] }

export interface Section {
  id: string
  title: string
  blocks: Block[]
}

export interface Exercise {
  id: string
  title: string
  level: 'Cơ bản' | 'Trung bình' | 'Nâng cao'
  requirement: string
  io?: { input: string; output: string }
  hint?: string
  /**
   * Hình minh hoạ cho slide bài tập. Bỏ trống thì slide tự dựng sơ đồ IPO
   * từ trường io, nên chỉ cần khai báo khi muốn vẽ luồng xử lý cụ thể.
   */
  visual?: Visual
}

export interface Buoi {
  id: number
  slug: string
  title: string
  subtitle: string
  duration: string
  goals: string[]
  keywords: string[]
  sections: Section[]
  exercises: Exercise[]
}
