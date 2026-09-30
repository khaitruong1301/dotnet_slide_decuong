import type { ConsoleIO } from './console'

/* Lời giải mẫu bài "Hệ thống quản lý bán hàng với menu và đa hình" chuyển sang TypeScript:
   SanPham (abstract) ← DienTu · ThoiTrang · ThucPham, menu 5 mục. */

abstract class SanPham {
  constructor(public maSanPham: string, public tenSanPham: string, public giaGoc: number) {}
  abstract tinhGiaBan(): number
  hienThiThongTin(io: ConsoleIO) {
    io.write(`Mã: ${this.maSanPham}, Tên: ${this.tenSanPham}, Giá bán: ${this.tinhGiaBan()} VND`)
  }
}
class DienTu extends SanPham {
  constructor(ma: string, ten: string, giaGoc: number, public thueBaoHanh: number) {
    super(ma, ten, giaGoc)
  }
  tinhGiaBan() {
    return this.giaGoc + (this.giaGoc * this.thueBaoHanh) / 100
  }
}
class ThoiTrang extends SanPham {
  constructor(ma: string, ten: string, giaGoc: number, public giamGia: number) {
    super(ma, ten, giaGoc)
  }
  tinhGiaBan() {
    return this.giaGoc - (this.giaGoc * this.giamGia) / 100
  }
}
class ThucPham extends SanPham {
  constructor(ma: string, ten: string, giaGoc: number, public phiVanChuyen: number) {
    super(ma, ten, giaGoc)
  }
  tinhGiaBan() {
    return this.giaGoc + this.phiVanChuyen
  }
}

const doc = async (io: ConsoleIO, p: string) => (await io.read(p)).trim()
const docSo = async (io: ConsoleIO, p: string) => {
  const s = await doc(io, p)
  const n = Number(s.replace(/[.\s]/g, ''))
  if (s === '' || Number.isNaN(n)) throw new Error(`"${s}" không phải là số`)
  return n
}

export default async function run(io: ConsoleIO) {
  const danhSach: SanPham[] = []
  io.write('Gõ số rồi Enter. Gõ 9 để nạp ba sản phẩm mẫu.')

  while (true) {
    io.write()
    io.write('--- Hệ thống quản lý bán hàng ---')
    io.write('1. Thêm sản phẩm')
    io.write('2. Hiển thị danh sách sản phẩm')
    io.write('3. Tính tổng doanh thu')
    io.write('4. Xóa sản phẩm')
    io.write('5. Thoát          9. Dữ liệu mẫu')
    const chon = await doc(io, 'Vui lòng chọn chức năng: ')
    if (chon === '5') {
      io.write('Tạm biệt!')
      return
    }
    try {
      switch (chon) {
        case '1': {
          io.write('Chọn loại sản phẩm:')
          io.write('1. Điện tử')
          io.write('2. Thời trang')
          io.write('3. Thực phẩm')
          const loai = await docSo(io, 'Lựa chọn: ')
          if (loai < 1 || loai > 3) throw new Error('Loại phải là 1, 2 hoặc 3')
          const ma = await doc(io, 'Nhập mã sản phẩm: ')
          if (danhSach.some((x) => x.maSanPham === ma)) throw new Error(`Mã ${ma} đã tồn tại`)
          const ten = await doc(io, 'Nhập tên sản phẩm: ')
          const giaGoc = await docSo(io, 'Nhập giá gốc: ')
          let sp: SanPham
          if (loai === 1) sp = new DienTu(ma, ten, giaGoc, await docSo(io, 'Nhập thuế bảo hành (%): '))
          else if (loai === 2) sp = new ThoiTrang(ma, ten, giaGoc, await docSo(io, 'Nhập giảm giá (%): '))
          else sp = new ThucPham(ma, ten, giaGoc, await docSo(io, 'Nhập phí vận chuyển: '))
          danhSach.push(sp)
          break
        }
        case '2':
          io.write('Danh sách sản phẩm:')
          if (danhSach.length === 0) io.write('(trống)')
          danhSach.forEach((sp) => sp.hienThiThongTin(io))
          break
        case '3':
          io.write(`Tổng doanh thu dự kiến: ${danhSach.reduce((t, sp) => t + sp.tinhGiaBan(), 0)} VND`)
          break
        case '4': {
          const ma = await doc(io, 'Nhập mã sản phẩm cần xóa: ')
          const i = danhSach.findIndex((x) => x.maSanPham === ma)
          if (i < 0) io.write('Không tìm thấy sản phẩm')
          else {
            danhSach.splice(i, 1)
            io.write(`Đã xóa sản phẩm ${ma}`)
          }
          break
        }
        case '9':
          danhSach.push(new DienTu('1', 'Laptop asus', 1000, 8), new ThoiTrang('2', 'áo thun trắng', 200, 3), new ThucPham('3', 'gạo trắng', 300, 10))
          io.write('Đã nạp Laptop asus (điện tử), áo thun trắng (thời trang), gạo trắng (thực phẩm)')
          break
        default:
          io.write('Chọn 1–5 hoặc 9')
      }
    } catch (e) {
      if (e instanceof Error && e.message === 'stopped') throw e
      io.write('Lỗi: ' + (e instanceof Error ? e.message : String(e)))
    }
  }
}
