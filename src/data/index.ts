import type { Buoi } from './types'
import buoi01 from './buoi01'
import buoi02 from './buoi02'
import buoi03 from './buoi03'
import buoi04 from './buoi04'
import buoi05 from './buoi05'
import buoi06 from './buoi06'
import buoi07 from './buoi07'
import buoi08 from './buoi08'
import buoi09 from './buoi09'
import buoi10 from './buoi10'
import buoi11 from './buoi11'
import buoi12 from './buoi12'
import buoi13 from './buoi13'
import buoi14 from './buoi14'
import buoi15 from './buoi15'

export const COURSE = {
  title: 'C# / ASP.NET Core — Nền tảng',
  subtitle: 'Đề cương 15 buổi: từ cú pháp cơ bản đến hướng đối tượng và nguyên tắc SOLID',
  author: 'Trương Tấn Khải',
}

export const BUOI_LIST: Buoi[] = [
  buoi01, buoi02, buoi03, buoi04, buoi05, buoi06,
  buoi07, buoi08, buoi09, buoi10, buoi11, buoi12,
  buoi13, buoi14, buoi15,
]

export function findBuoi(slug?: string): Buoi | undefined {
  return BUOI_LIST.find((b) => b.slug === slug)
}

export const TOTAL_SECTIONS = BUOI_LIST.reduce((n, b) => n + b.sections.length, 0)
export const TOTAL_EXERCISES = BUOI_LIST.reduce((n, b) => n + b.exercises.length, 0)
