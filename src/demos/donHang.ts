import { vnd, type ConsoleIO } from './console'

/* Lời giải mẫu bài "Quản lý đơn giao hàng" chuyển sang TypeScript. "File" JSON là
   localStorage của trình duyệt — nội dung in ra màn hình để thấy trường Loai. */

const FILE_KEY = 'demo-don-hang.json'

class DonHang {
  private _tienHang = 0
  constructor(public maDon: string, public tenKhach: string, public diaChi: string, tienHang: number) {
    this.tienHang = tienHang
  }
  get tienHang() {
    return this._tienHang
  }
  set tienHang(v: number) {
    if (Number.isNaN(v) || v < 0) throw new Error('Tiền hàng không được âm')
    this._tienHang = v
  }
  phiGiao() {
    return 30_000
  }
  tongThanhToan() {
    return this.tienHang + this.phiGiao()
  }
  moTa() {
    return `${this.maDon} · ${this.tenKhach} · ${this.diaChi} · hàng ${vnd(this.tienHang)} + phí ${vnd(this.phiGiao())} = ${vnd(this.tongThanhToan())}`
  }
}

class DonGiaoNhanh extends DonHang {
  override phiGiao() {
    return 60_000
  }
  override moTa() {
    return super.moTa() + ' · GIAO NHANH'
  }
}

class QuanLyDon {
  private danhSach: DonHang[] = []

  tim(ma: string) {
    return this.danhSach.find((d) => d.maDon.toLowerCase() === ma.toLowerCase()) ?? null
  }
  them(d: DonHang) {
    if (this.tim(d.maDon)) return false
    this.danhSach.push(d)
    return true
  }
  xoa(ma: string) {
    const d = this.tim(ma)
    if (!d) return false
    this.danhSach.splice(this.danhSach.indexOf(d), 1)
    return true
  }
  suaDiaChi(ma: string, diaChiMoi: string) {
    if (!diaChiMoi.trim()) throw new Error('Địa chỉ không được rỗng')
    const d = this.tim(ma)
    if (!d) return false
    d.diaChi = diaChiMoi.trim()
    return true
  }
  timTheoKhach(tuKhoa: string) {
    return this.danhSach.filter((d) => d.tenKhach.toLowerCase().includes(tuKhoa.toLowerCase()))
  }
  tongPhiGiao() {
    return this.danhSach.reduce((t, d) => t + d.phiGiao(), 0)
  }
  hienThi(io: ConsoleIO) {
    if (this.danhSach.length === 0) {
      io.write('Chưa có đơn')
      return
    }
    for (const d of this.danhSach) io.write(d.moTa())
    io.write(`Tổng phí giao: ${vnd(this.tongPhiGiao())}`)
  }
  luuFile() {
    // Trường Loai đứng đầu mỗi bản ghi — đúng như [JsonPolymorphic] của .NET ghi ra
    const json = JSON.stringify(
      this.danhSach.map((d) => ({
        Loai: d instanceof DonGiaoNhanh ? 'Nhanh' : 'Thuong',
        MaDon: d.maDon,
        TenKhach: d.tenKhach,
        DiaChi: d.diaChi,
        TienHang: d.tienHang,
      })),
      null,
      2,
    )
    try {
      localStorage.setItem(FILE_KEY, json)
    } catch {
      /* trình duyệt chặn storage thì chỉ in ra */
    }
    return json
  }
  docFile() {
    let json: string | null = null
    try {
      json = localStorage.getItem(FILE_KEY)
    } catch {
      json = null
    }
    if (!json) return false
    const arr = JSON.parse(json) as { Loai: string; MaDon: string; TenKhach: string; DiaChi: string; TienHang: number }[]
    this.danhSach = arr.map((r) =>
      r.Loai === 'Nhanh' ? new DonGiaoNhanh(r.MaDon, r.TenKhach, r.DiaChi, r.TienHang) : new DonHang(r.MaDon, r.TenKhach, r.DiaChi, r.TienHang),
    )
    return true
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
  const ql = new QuanLyDon()
  io.write('=== QUẢN LÝ ĐƠN GIAO HÀNG ===')
  io.write(ql.docFile() ? 'Đã đọc don-hang.json từ lần trước.' : 'Chưa có file don-hang.json, bắt đầu với danh sách trống.')
  io.write('Gõ 9 để nạp hai đơn mẫu. Gõ 0 để thoát — chương trình tự lưu file.')

  while (true) {
    io.write()
    io.write('1 Thêm đơn   2 Xoá đơn   3 Sửa địa chỉ   4 Tìm theo khách')
    io.write('5 Hiển thị   6 Lưu file  7 Đọc file      9 Dữ liệu mẫu   0 Thoát')
    const chon = await doc(io, 'Chọn: ')
    if (chon === '0') {
      ql.luuFile()
      io.write('Đã lưu don-hang.json. Tạm biệt!')
      return
    }
    try {
      switch (chon) {
        case '1': {
          const nhanh = (await doc(io, 'Giao nhanh? (c/k): ')).toLowerCase() === 'c'
          const ma = await doc(io, 'Mã đơn: ')
          const ten = await doc(io, 'Tên khách: ')
          const diaChi = await doc(io, 'Địa chỉ: ')
          const tien = await docSo(io, 'Tiền hàng: ')
          const d = nhanh ? new DonGiaoNhanh(ma, ten, diaChi, tien) : new DonHang(ma, ten, diaChi, tien)
          io.write(ql.them(d) ? `Đã thêm ${d.maDon}` : 'Mã đơn đã tồn tại')
          break
        }
        case '2': {
          const ma = await doc(io, 'Mã đơn cần xoá: ')
          io.write(ql.xoa(ma) ? `Đã xoá ${ma.toUpperCase()}` : 'Không tìm thấy đơn')
          break
        }
        case '3': {
          const ma = await doc(io, 'Mã đơn: ')
          const dc = await doc(io, 'Địa chỉ mới: ')
          io.write(ql.suaDiaChi(ma, dc) ? 'Đã sửa địa chỉ' : 'Không tìm thấy đơn')
          break
        }
        case '4': {
          const kq = ql.timTheoKhach(await doc(io, 'Tên khách: '))
          if (kq.length === 0) io.write('Không có đơn nào')
          else kq.forEach((d) => io.write(d.moTa()))
          break
        }
        case '5':
          ql.hienThi(io)
          break
        case '6': {
          const json = ql.luuFile()
          io.write('Đã ghi don-hang.json:')
          json.split('\n').forEach((l) => io.write('  ' + l))
          break
        }
        case '7':
          io.write(ql.docFile() ? 'Đã đọc lại danh sách từ don-hang.json' : 'Chưa có file để đọc')
          break
        case '9': {
          const a = ql.them(new DonHang('DH01', 'Nguyễn Văn An', '12 Lê Lợi', 1_500_000))
          const b = ql.them(new DonGiaoNhanh('DH02', 'Trần Thị Bích', '5 Trần Phú', 2_000_000))
          io.write(a || b ? 'Đã nạp DH01 (thường) và DH02 (giao nhanh)' : 'Dữ liệu mẫu đã có sẵn')
          break
        }
        default:
          io.write('Chọn 0–7 hoặc 9')
      }
    } catch (e) {
      if (e instanceof Error && e.message === 'stopped') throw e
      io.write('Lỗi: ' + (e instanceof Error ? e.message : String(e)))
    }
  }
}
