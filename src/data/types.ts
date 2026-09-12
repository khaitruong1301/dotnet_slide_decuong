/** Mô hình nội dung dùng chung cho cả trang đề cương và chế độ trình chiếu. */

export type FlowKind = 'start' | 'end' | 'io' | 'process' | 'decision' | 'note'

export interface FlowStep {
  kind: FlowKind
  text: string
  /** Nhánh rẽ — chỉ dùng cho kind = 'decision'. */
  branches?: { label: string; steps: FlowStep[] }[]
}

/** Một lớp trong sơ đồ lớp UML. */
export interface UmlClass {
  name: string
  /** Nhãn phía trên tên lớp: «interface», «abstract», … */
  stereotype?: string
  attrs?: string[]
  methods?: string[]
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
  | {
      kind: 'uml'
      caption?: string
      /** Lớp cha hoặc interface đặt phía trên, các lớp con xếp thành hàng bên dưới. */
      parent?: UmlClass
      children?: UmlClass[]
      relation?: 'inherit' | 'implement'
    }

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

/** Một test case mẫu của đề bài, viết theo lối LeetCode. */
export interface TestCase {
  input: string
  output: string
  /** Giải thích vì sao ra kết quả đó — phần "Giải thích" quen thuộc của LeetCode. */
  explain?: string
}

export interface Exercise {
  id: string
  title: string
  level: 'Cơ bản' | 'Trung bình' | 'Nâng cao'
  /** Đề bài: mô tả bài toán, không phải câu mệnh lệnh "hãy viết chương trình…". */
  requirement: string
  /** Chữ ký hàm cần cài đặt, ví dụ: int[] TwoSum(int[] nums, int target) */
  signature?: string
  /** Ràng buộc đầu vào — giới hạn kích thước, miền giá trị, điều kiện đảm bảo. */
  constraints?: string[]
  /** Các test case mẫu. Ít nhất 2 cái cho bài từ Trung bình trở lên. */
  examples?: TestCase[]
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
