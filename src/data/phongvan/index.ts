import type { InterviewSet } from '../types'
import nentang from './nentang'
import oop from './oop'
import htmlcss from './htmlcss'
import blazor from './blazor'
import backend from './backend'

/** Các bộ câu hỏi phỏng vấn — nhóm menu cuối "Câu hỏi phỏng vấn", mỗi phần khoá học một bộ. */
export const INTERVIEW_SETS: InterviewSet[] = [nentang, oop, htmlcss, blazor, backend]

export function findInterviewSet(slug?: string) {
  return INTERVIEW_SETS.find((s) => s.slug === slug)
}

export const TOTAL_INTERVIEW = INTERVIEW_SETS.reduce((n, s) => n + s.questions.length, 0)
