import type { ConsoleProgram } from './console'
import khachHang from './khachHang'

/** Các chương trình mẫu chạy được trên web, khoá theo trường `demo` của bài tập. */
export const DEMOS: Record<string, { title: string; program: ConsoleProgram }> = {
  'khach-hang': { title: 'Quản lý khách hàng thân thiết — chương trình mẫu', program: khachHang },
}
