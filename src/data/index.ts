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
import buoi16 from './buoi16'
import buoi17 from './buoi17'
import buoi18 from './buoi18'
import buoi19 from './buoi19'
import buoi20 from './buoi20'
import buoi21 from './buoi21'
import buoi22 from './buoi22'
import buoi23 from './buoi23'
import buoi24 from './buoi24'
import buoi25 from './buoi25'
import buoi26 from './buoi26'
import buoi27 from './buoi27'
import buoi28 from './buoi28'
import buoi29 from './buoi29'
import buoi30 from './buoi30'
import buoi31 from './buoi31'
import buoi32 from './buoi32'
import buoi33 from './buoi33'
import buoi34 from './buoi34'
import buoi35 from './buoi35'
import buoi36 from './buoi36'
import buoi37 from './buoi37'
import buoi38 from './buoi38'
import buoi39 from './buoi39'
import buoi40 from './buoi40'
import buoi41 from './buoi41'
import buoi42 from './buoi42'

export const COURSE = {
  title: 'C# / ASP.NET Core',
  subtitle: 'Đề cương 42 buổi: C# nền tảng, hướng đối tượng, HTML/CSS, Blazor, SQL Server, Entity Framework Core và .NET Core Web API',
  author: 'Trương Tấn Khải',
}

/** Các phần của khoá học — menu trái và trang chủ nhóm buổi theo đây. */
export const MODULES: { title: string; from: number; to: number }[] = [
  { title: 'Nền tảng C#', from: 1, to: 8 },
  { title: 'Hướng đối tượng', from: 9, to: 16 },
  { title: 'HTML & CSS', from: 17, to: 19 },
  { title: 'Blazor', from: 20, to: 31 },
  { title: 'SQL Server, EF Core & Web API', from: 32, to: 42 },
]

export const BUOI_LIST: Buoi[] = [
  buoi01, buoi02, buoi03, buoi04, buoi05, buoi06,
  buoi07, buoi08, buoi09, buoi10, buoi11, buoi12,
  buoi13, buoi14, buoi15, buoi16, buoi17, buoi18,
  buoi19, buoi20, buoi21, buoi22, buoi23, buoi24,
  buoi25, buoi26, buoi27, buoi28, buoi29, buoi30,
  buoi31, buoi32, buoi33, buoi34, buoi35, buoi36,
  buoi37, buoi38, buoi39, buoi40, buoi41, buoi42,
]

export function findBuoi(slug?: string): Buoi | undefined {
  return BUOI_LIST.find((b) => b.slug === slug)
}

export const TOTAL_SECTIONS = BUOI_LIST.reduce((n, b) => n + b.sections.length, 0)
export const TOTAL_EXERCISES = BUOI_LIST.reduce((n, b) => n + b.exercises.length, 0)
