import type { ConsoleIO } from './console'

/* Lời giải mẫu bài "Quản lý đơn giao hàng" theo đúng cấu trúc trên lớp:
   DonHang ← DonHangGiaoNhanh, AppQuanLyDonHang với menu 10 mục. "File" data.json là
   localStorage của trình duyệt. Đơn vị tiền: nghìn đồng. */

const FILE_KEY = 'demo-data.json'

class DonHang {
  static MaDonTuDong = 1
  maDonHang = ''
  tenKhach = ''
  diaChi = ''
  tienHang = 0
  soKM = 0
  loaiDon = 1

  async nhapThongTinDonHang(io: ConsoleIO) {
    this.maDonHang = 'DH' + DonHang.MaDonTuDong
    DonHang.MaDonTuDong++
    this.tenKhach = (await io.read('Tên khách hàng: ')).trim()
    this.diaChi = (await io.read('Địa chỉ giao: ')).trim()
    this.tienHang = docSo(await io.read('Tiền hàng (nghìn đồng): '))
    this.soKM = docSo(await io.read('Số km giao: '))
  }
  tinhPhiGiaoHang() {
    let phiGiao = 30
    if (this.soKM > 20) phiGiao += 20
    else if (this.soKM > 10) phiGiao += 5
    return phiGiao
  }
  tongThanhToanDonHang() {
    return this.tinhPhiGiaoHang() + this.tienHang
  }
  protected tieuDe() {
    return '------ Đơn hàng thường ------'
  }
  moTaDonHang(io: ConsoleIO) {
    io.write(this.tieuDe())
    io.write(`  Mã đơn: ${this.maDonHang}`)
    io.write(`  Tên khách: ${this.tenKhach}`)
    io.write(`  Địa chỉ: ${this.diaChi}`)
    io.write(`  Tiền hàng: ${this.tienHang}`)
    io.write(`  Phí giao hàng: ${this.tinhPhiGiaoHang()}`)
    io.write(`  Tổng tiền: ${this.tongThanhToanDonHang()}`)
  }
}

class DonHangGiaoNhanh extends DonHang {
  constructor() {
    super()
    this.loaiDon = 2
  }
  override tinhPhiGiaoHang() {
    return super.tinhPhiGiaoHang() + 60
  }
  protected override tieuDe() {
    return '----- Đơn giao nhanh -----'
  }
}

function docSo(s: string) {
  const n = Number(s.trim().replace(/[.\s]/g, ''))
  if (s.trim() === '' || Number.isNaN(n)) throw new Error(`"${s.trim()}" không phải là số`)
  return n
}

class AppQuanLyDonHang {
  lstDonHang: DonHang[] = []

  async themDonHang(io: ConsoleIO) {
    io.write('1. Thêm đơn hàng thường   2. Thêm đơn giao nhanh')
    const loai = docSo(await io.read('Chọn loại: '))
    const dh = loai === 2 ? new DonHangGiaoNhanh() : new DonHang()
    await dh.nhapThongTinDonHang(io)
    this.lstDonHang.push(dh)
    io.write(`Đã thêm đơn ${dh.maDonHang}`)
  }
  async xoaDonHang(io: ConsoleIO) {
    const ma = (await io.read('Nhập mã đơn cần xoá: ')).trim()
    const dh = this.lstDonHang.find((d) => d.maDonHang.toLowerCase() === ma.toLowerCase())
    if (dh) {
      this.lstDonHang.splice(this.lstDonHang.indexOf(dh), 1)
      io.write(`Xoá đơn hàng ${dh.maDonHang} thành công`)
    } else io.write('Không tìm thấy đơn hàng')
  }
  async suaDiaChi(io: ConsoleIO) {
    const ma = (await io.read('Nhập mã đơn: ')).trim()
    const dh = this.lstDonHang.find((d) => d.maDonHang.toLowerCase() === ma.toLowerCase())
    if (!dh) {
      io.write('Không tìm thấy đơn hàng')
      return
    }
    dh.diaChi = (await io.read('Địa chỉ mới: ')).trim()
    io.write('Đã sửa địa chỉ')
  }
  async timDonHangTheoKhachHang(io: ConsoleIO) {
    const ten = (await io.read('Nhập tên khách hàng: ')).trim()
    const kq = this.lstDonHang.filter((d) => d.tenKhach === ten)
    if (kq.length > 0) {
      io.write(`Tìm thấy ${kq.length} đơn hàng`)
      kq.forEach((d) => d.moTaDonHang(io))
    } else io.write(`Không tìm thấy đơn hàng của khách hàng ${ten}`)
  }
  hienThiTatCaDonHang(io: ConsoleIO) {
    io.write('-------------- Danh sách đơn hàng --------------')
    if (this.lstDonHang.length === 0) io.write('(chưa có đơn nào)')
    this.lstDonHang.forEach((d) => d.moTaDonHang(io))
  }
  tinhTongTienTatCaDDH(io: ConsoleIO) {
    const tong = this.lstDonHang.reduce((t, d) => t + d.tienHang, 0)
    io.write(`Tổng tiền hàng của ${this.lstDonHang.length} đơn hàng: ${tong}`)
  }
  tinhTongPhiGiaoHang(io: ConsoleIO) {
    const tong = this.lstDonHang.reduce((t, d) => t + d.tinhPhiGiaoHang(), 0)
    io.write(`Tổng phí giao hàng của ${this.lstDonHang.length} đơn hàng: ${tong}`)
  }
  luuDonHang(io: ConsoleIO) {
    const json = JSON.stringify(
      this.lstDonHang.map((d) => ({ maDonHang: d.maDonHang, tenKhach: d.tenKhach, diaChi: d.diaChi, tienHang: d.tienHang, soKM: d.soKM, loaiDon: d.loaiDon })),
      null,
      2,
    )
    try {
      localStorage.setItem(FILE_KEY, json)
    } catch {
      /* trình duyệt chặn storage thì chỉ in ra */
    }
    io.write('Đã lưu bin/data.json:')
    json.split('\n').forEach((l) => io.write('  ' + l))
  }
  loadDonHang(io: ConsoleIO) {
    let json: string | null = null
    try {
      json = localStorage.getItem(FILE_KEY)
    } catch {
      json = null
    }
    if (!json) {
      io.write('Chưa có file data.json')
      return
    }
    const lstDonChuaXuLy = JSON.parse(json) as DonHang[]
    this.lstDonHang = []
    let maxSo = 0
    for (const donHang of lstDonChuaXuLy) {
      const d = donHang.loaiDon === 2 ? new DonHangGiaoNhanh() : new DonHang()
      d.maDonHang = donHang.maDonHang
      d.tenKhach = donHang.tenKhach
      d.diaChi = donHang.diaChi
      d.tienHang = donHang.tienHang
      d.soKM = donHang.soKM
      d.loaiDon = donHang.loaiDon
      this.lstDonHang.push(d)
      maxSo = Math.max(maxSo, Number(donHang.maDonHang.replace(/\D/g, '')) || 0)
    }
    DonHang.MaDonTuDong = Math.max(DonHang.MaDonTuDong, maxSo + 1)
    io.write(`Đã load ${this.lstDonHang.length} đơn từ data.json`)
  }
}

export default async function run(io: ConsoleIO) {
  DonHang.MaDonTuDong = 1
  const app = new AppQuanLyDonHang()
  io.write('Gõ số rồi Enter. Gõ 11 để nạp hai đơn mẫu.')

  while (true) {
    io.write()
    io.write('------------------ Chương trình quản lý đơn hàng -------------------------')
    io.write('1. Thêm đơn hàng            2. Xoá đơn hàng             3. Sửa địa chỉ')
    io.write('4. Tìm đơn theo tên khách   5. Hiển thị tất cả đơn      6. Tổng tiền tất cả đơn')
    io.write('7. Tổng phí giao hàng       8. Lưu đơn hàng json        9. Load đơn hàng json')
    io.write('10. Thoát                   11. Dữ liệu mẫu')
    const chon = (await io.read('Mời bạn chọn chức năng: ')).trim()
    if (chon === '10') {
      io.write('Tạm biệt!')
      return
    }
    try {
      switch (chon) {
        case '1':
          await app.themDonHang(io)
          break
        case '2':
          await app.xoaDonHang(io)
          break
        case '3':
          await app.suaDiaChi(io)
          break
        case '4':
          await app.timDonHangTheoKhachHang(io)
          break
        case '5':
          app.hienThiTatCaDonHang(io)
          break
        case '6':
          app.tinhTongTienTatCaDDH(io)
          break
        case '7':
          app.tinhTongPhiGiaoHang(io)
          break
        case '8':
          app.luuDonHang(io)
          break
        case '9':
          app.loadDonHang(io)
          break
        case '11': {
          const a = new DonHang()
          a.maDonHang = 'DH' + DonHang.MaDonTuDong++
          Object.assign(a, { tenKhach: 'Nguyễn Văn An', diaChi: '12 Lê Lợi', tienHang: 1500, soKM: 8 })
          const b = new DonHangGiaoNhanh()
          b.maDonHang = 'DH' + DonHang.MaDonTuDong++
          Object.assign(b, { tenKhach: 'Trần Thị Bích', diaChi: '5 Trần Phú', tienHang: 2000, soKM: 15 })
          app.lstDonHang.push(a, b)
          io.write(`Đã nạp ${a.maDonHang} (thường, 8 km) và ${b.maDonHang} (giao nhanh, 15 km)`)
          break
        }
        default:
          io.write('Chọn từ 1 đến 11')
      }
    } catch (e) {
      if (e instanceof Error && e.message === 'stopped') throw e
      io.write('Lỗi: ' + (e instanceof Error ? e.message : String(e)))
    }
  }
}
