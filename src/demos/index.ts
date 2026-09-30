import type { ConsoleProgram } from './console'
import khachHang from './khachHang'
import donHang from './donHang'
import banHang from './banHang'

/** Các chương trình mẫu chạy được trên web, khoá theo trường `demo` của bài tập. */
export const DEMOS: Record<string, { title: string; program: ConsoleProgram }> = {
  'khach-hang': { title: 'Quản lý khách hàng thân thiết — chương trình mẫu', program: khachHang },
  'don-hang': { title: 'Quản lý đơn giao hàng — chương trình mẫu', program: donHang },
  'ban-hang': { title: 'Hệ thống quản lý bán hàng — chương trình mẫu', program: banHang },
}
