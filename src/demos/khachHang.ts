import { vnd, type ConsoleIO } from './console'

/* Lời giải mẫu của bài "Quản lý khách hàng thân thiết", chuyển từ C# sang TypeScript
   với cùng cấu trúc lớp: Nguoi ← KhachHang (ITichDiem) ← KhachHangVip, DanhSachKhach. */

const NAM_NAY = new Date().getFullYear()

interface ITichDiem {
  tyLeGiamGia(): number
  congDiem(tienMua: number): void
}

class Nguoi {
  private _namSinh = 0
  constructor(public hoTen: string, public soDienThoai: string, namSinh: number) {
    this.namSinh = namSinh
  }
  get namSinh() {
    return this._namSinh
  }
  set namSinh(v: number) {
    if (!Number.isInteger(v) || v > NAM_NAY || v < 1900) throw new Error('Năm sinh không hợp lệ')
    this._namSinh = v
  }
  tuoi() {
    return NAM_NAY - this._namSinh
  }
  moTa() {
    return `${this.hoTen} · ${this.tuoi()} tuổi · ${this.soDienThoai}`
  }
}

class KhachHang extends Nguoi implements ITichDiem {
  private _diem = 0
  constructor(public maKH: string, hoTen: string, sdt: string, namSinh: number, diem: number) {
    super(hoTen, sdt, namSinh)
    this.diemTichLuy = diem
  }
  get diemTichLuy() {
    return this._diem
  }
  set diemTichLuy(v: number) {
    if (!Number.isInteger(v) || v < 0) throw new Error('Điểm không được âm')
    this._diem = v
  }
  tyLeGiamGia() {
    return 0.05
  }
  congDiem(tienMua: number) {
    this.diemTichLuy += Math.floor(tienMua / 10_000)
  }
  override moTa() {
    return `${this.maKH} · ${super.moTa()} · ${this.diemTichLuy} điểm`
  }
}

class KhachHangVip extends KhachHang {
  constructor(maKH: string, hoTen: string, sdt: string, namSinh: number, diem: number, public hangThe: string) {
    super(maKH, hoTen, sdt, namSinh, diem)
  }
  override tyLeGiamGia() {
    return 0.1
  }
  override congDiem(tienMua: number) {
    this.diemTichLuy += Math.floor(tienMua / 10_000) * 2
  }
  override moTa() {
    return `${super.moTa()} · VIP ${this.hangThe}`
  }
}

class DanhSachKhach {
  private danhSach: KhachHang[] = []

  them(kh: KhachHang) {
    if (this.tim(kh.maKH)) return false
    if (this.timTheoSdt(kh.soDienThoai)) return false
    this.danhSach.push(kh)
    return true
  }
  xoa(maKH: string) {
    const truoc = this.danhSach.length
    this.danhSach = this.danhSach.filter((k) => k.maKH.toLowerCase() !== maKH.toLowerCase())
    return this.danhSach.length < truoc
  }
  tim(maKH: string) {
    return this.danhSach.find((k) => k.maKH.toLowerCase() === maKH.toLowerCase()) ?? null
  }
  timTheoSdt(sdt: string) {
    return this.danhSach.find((k) => k.soDienThoai === sdt.trim()) ?? null
  }
  timTheoTen(tuKhoa: string) {
    return this.danhSach.filter((k) => k.hoTen.toLowerCase().includes(tuKhoa.toLowerCase()))
  }
  muaHang(maKH: string, tienMua: number): number | null {
    if (!(tienMua > 0)) throw new Error('Số tiền phải dương')
    const kh = this.tim(maKH)
    if (!kh) return null
    const td: ITichDiem = kh // nhìn khách qua interface
    const phaiTra = tienMua * (1 - td.tyLeGiamGia())
    td.congDiem(tienMua)
    return phaiTra
  }
  hienThi(io: ConsoleIO) {
    if (this.danhSach.length === 0) {
      io.write('Chưa có khách')
      return
    }
    for (const kh of this.danhSach) io.write(kh.moTa())
  }
}

const doc = async (io: ConsoleIO, prompt: string) => (await io.read(prompt)).trim()
const docSo = async (io: ConsoleIO, prompt: string) => {
  const s = await doc(io, prompt)
  const n = Number(s.replace(/[.\s]/g, ''))
  if (s === '' || Number.isNaN(n)) throw new Error(`"${s}" không phải là số`)
  return n
}

export default async function run(io: ConsoleIO) {
  const ds = new DanhSachKhach()
  io.write('=== QUẢN LÝ KHÁCH HÀNG THÂN THIẾT ===')
  io.write('Gõ số rồi Enter. Gõ 9 để nạp sẵn hai khách mẫu.')

  while (true) {
    io.write()
    io.write('1 Thêm khách   2 Xoá theo mã   3 Tìm theo SĐT   4 Tìm theo tên')
    io.write('5 Mua hàng     6 Hiển thị      9 Dữ liệu mẫu    0 Thoát')
    const chon = await doc(io, 'Chọn: ')
    if (chon === '0') {
      io.write('Tạm biệt!')
      return
    }
    try {
      switch (chon) {
        case '1': {
          const vip = (await doc(io, 'Khách VIP? (c/k): ')).toLowerCase() === 'c'
          const ma = await doc(io, 'Mã khách: ')
          const ten = await doc(io, 'Họ tên: ')
          const sdt = await doc(io, 'Số điện thoại: ')
          const namSinh = await docSo(io, 'Năm sinh: ')
          const diem = await docSo(io, 'Điểm ban đầu: ')
          const kh = vip
            ? new KhachHangVip(ma, ten, sdt, namSinh, diem, await doc(io, 'Hạng thẻ (Vàng / Bạch kim): '))
            : new KhachHang(ma, ten, sdt, namSinh, diem)
          io.write(ds.them(kh) ? `Đã thêm ${kh.hoTen}` : 'Từ chối: trùng mã hoặc trùng số điện thoại')
          break
        }
        case '2': {
          const ma = await doc(io, 'Mã cần xoá: ')
          io.write(ds.xoa(ma) ? `Đã xoá ${ma.toUpperCase()}` : 'Không tìm thấy khách')
          break
        }
        case '3': {
          const kh = ds.timTheoSdt(await doc(io, 'Số điện thoại: '))
          io.write(kh ? kh.moTa() : 'Không tìm thấy khách')
          break
        }
        case '4': {
          const kq = ds.timTheoTen(await doc(io, 'Từ khoá tên: '))
          if (kq.length === 0) io.write('Không tìm thấy khách')
          else kq.forEach((k) => io.write(k.moTa()))
          break
        }
        case '5': {
          const ma = await doc(io, 'Mã khách: ')
          const tien = await docSo(io, 'Số tiền mua: ')
          const truoc = ds.tim(ma)?.diemTichLuy
          const phaiTra = ds.muaHang(ma, tien)
          if (phaiTra === null) io.write('Không tìm thấy khách')
          else {
            const kh = ds.tim(ma)!
            io.write(`${kh.maKH} trả ${vnd(phaiTra)}, +${kh.diemTichLuy - (truoc ?? 0)} điểm (giảm ${kh.tyLeGiamGia() * 100}%)`)
          }
          break
        }
        case '6':
          ds.hienThi(io)
          break
        case '9': {
          const a = ds.them(new KhachHang('KH01', 'Nguyễn Văn An', '0901234567', 1990, 120))
          const b = ds.them(new KhachHangVip('KH02', 'Trần Thị Bích', '0912345678', 2001, 0, 'Vàng'))
          io.write(a || b ? 'Đã nạp KH01 (thường) và KH02 (VIP Vàng)' : 'Dữ liệu mẫu đã có sẵn')
          break
        }
        default:
          io.write('Chọn 0–6 hoặc 9')
      }
    } catch (e) {
      if (e instanceof Error && e.message === 'stopped') throw e
      io.write('Lỗi: ' + (e instanceof Error ? e.message : String(e)))
    }
  }
}
