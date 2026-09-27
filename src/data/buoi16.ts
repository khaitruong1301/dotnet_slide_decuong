import type { Buoi } from './types'

/**
 * Buổi ôn tập OOP. Một bài tập lớn duy nhất — viết trọn chương trình console quản lý
 * sản phẩm cho cửa hàng điện máy. Phần lý thuyết phân rã đề bài, vẽ sơ đồ lớp và lộ
 * trình 6 bước; phần gợi ý của bài liệt kê rõ class, thuộc tính, phương thức để người
 * học biết chính xác phải viết cái gì.
 */
const buoi16: Buoi = {
  id: 16,
  slug: 'on-tap-oop-cua-hang-dien-may',
  title: 'Ôn tập OOP — Cửa hàng điện máy',
  subtitle: 'Một bài lớn viết trọn chương trình console: class, kế thừa, đa hình, List và lưu file JSON',
  duration: '3 giờ',
  keywords: ['class', 'property', 'constructor', 'inheritance', 'override', 'polymorphism', 'List<T>', 'JSON'],
  goals: [
    'Đọc một đề bài nghiệp vụ thật và tự chỉ ra được class, thuộc tính, phương thức cần có',
    'Viết class có constructor và property kiểm tra dữ liệu',
    'Dùng kế thừa và override để mỗi nhóm hàng tính giá bán theo cách riêng',
    'Quản lý danh sách đối tượng bằng List<T>, gọi phương thức qua lớp cha (đa hình)',
    'Lưu và đọc lại danh sách đối tượng từ file JSON',
  ],

  sections: [
    {
      id: 'de-bai-chung',
      title: '1. Bài toán ôn tập: quản lý sản phẩm cửa hàng điện máy',
      blocks: [
        {
          type: 'text',
          text: 'Một cửa hàng điện máy bán ba nhóm hàng: điện tử (tivi, laptop), điện lạnh (tủ lạnh, máy lạnh) và gia dụng (nồi cơm, máy xay). Mỗi sản phẩm có mã, tên, giá nhập và số lượng tồn. Giá bán không nhập tay mà tính từ giá nhập theo quy tắc riêng của từng nhóm. Nhân viên cần thêm hàng mới, tìm hàng theo tên, cập nhật giá nhập và số lượng, bán hàng (trừ tồn kho, in tiền), xoá hàng ngừng kinh doanh, xem tổng giá trị tồn kho, và lưu dữ liệu để hôm sau mở lên dùng tiếp.',
        },
        {
          type: 'text',
          text: 'So với bài quản lý nhân viên, đề này vẫn đủ quy mô một chương trình thật nhưng cấu trúc lớp rõ hơn: phần chung là bốn thuộc tính, mỗi nhóm hàng chỉ thêm đúng một thông số kỹ thuật và một công thức giá bán.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'ipo',
            caption: 'Phân rã đề bài thành ba khối',
            input: ['Mã, tên sản phẩm', 'Giá nhập, số lượng tồn', 'Nhóm hàng + một thông số riêng', 'Mã và số lượng khi bán'],
            process: ['Tạo đối tượng đúng nhóm', 'Thêm vào danh sách', 'Tính giá bán theo nhóm (đa hình)', 'Trừ tồn kho khi bán, cộng tồn kho'],
            output: ['Danh sách hàng kèm giá bán', 'Tiền mỗi lần bán', 'Tổng giá trị tồn kho', 'File dien-may.json'],
          },
        },
        {
          type: 'table',
          head: ['Nhóm hàng (class)', 'Thông số riêng', 'Giá bán', 'Bảo hành'],
          rows: [
            ['DienTu', 'KichCoInch : int', 'GiaNhap × 1,2', '12 tháng'],
            ['DienLanh', 'CongSuatW : int', 'GiaNhap × 1,15 + 300.000 đ phí lắp đặt', '24 tháng'],
            ['GiaDung', 'ThangBaoHanh : int', 'GiaNhap × 1,3', 'Theo thông số riêng'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Cách đọc đề để tìm class',
          text: 'Danh từ trong đề bài thường là class hoặc thuộc tính: sản phẩm, mã, tên, giá nhập, số lượng, cửa hàng. Động từ là phương thức: tính giá bán, thêm, tìm, cập nhật, bán, xoá, hiển thị, lưu. Danh từ nào "là một loại của" danh từ khác thì là lớp con: tủ lạnh là một sản phẩm thuộc nhóm điện lạnh.',
        },
      ],
    },
    {
      id: 'so-do-lop',
      title: '2. Sơ đồ lớp mục tiêu',
      blocks: [
        {
          type: 'visual',
          visual: {
            kind: 'uml',
            caption: 'Ba nhóm hàng kế thừa SanPham, mỗi nhóm thêm một thông số và ghi đè TinhGiaBan()',
            relation: 'inherit',
            parent: {
              name: 'SanPham',
              stereotype: 'abstract',
              attrs: ['+ Ma : string', '+ Ten : string', '+ GiaNhap : decimal', '+ SoLuong : int'],
              methods: ['+ TinhGiaBan() : decimal  (abstract)', '+ ThangBaoHanh() : int  (virtual, 12)', '+ MoTa() : string'],
            },
            children: [
              { name: 'DienTu', attrs: ['+ KichCoInch : int'], methods: ['+ TinhGiaBan() : GiaNhap × 1,2'] },
              { name: 'DienLanh', attrs: ['+ CongSuatW : int'], methods: ['+ TinhGiaBan() : GiaNhap × 1,15 + 300.000', '+ ThangBaoHanh() : 24'] },
              { name: 'GiaDung', attrs: ['+ ThangBaoHanh : int'], methods: ['+ TinhGiaBan() : GiaNhap × 1,3', '+ ThangBaoHanh() : thông số riêng'] },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'uml',
            caption: 'CuaHang là lớp quản lý, giữ danh sách private và cung cấp các thao tác nghiệp vụ',
            children: [
              {
                name: 'CuaHang',
                attrs: ['− danhSach : List<SanPham>'],
                methods: ['+ Them(SanPham sp) : bool', '+ Tim(string ma) : SanPham?', '+ TimTheoTen(string tuKhoa) : List<SanPham>', '+ CapNhat(string ma, decimal giaNhap, int soLuong) : bool', '+ Ban(string ma, int soLuong) : decimal?', '+ Xoa(string ma) : bool', '+ HienThi()', '+ TongTonKho() : decimal', '+ LuuFile() / DocFile()'],
              },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Luồng bán hàng — chỗ đa hình phát huy tác dụng',
            steps: [
              { kind: 'start', text: 'Nhập mã và số lượng cần bán' },
              { kind: 'process', text: 'sp = cuaHang.Tim(ma)' },
              { kind: 'decision', text: 'sp == null ?', branches: [
                { label: 'Đúng', steps: [{ kind: 'io', text: 'In "Không tìm thấy sản phẩm"' }] },
                { label: 'Sai', steps: [
                  { kind: 'decision', text: 'sp.SoLuong < số lượng bán ?', branches: [
                    { label: 'Đúng', steps: [{ kind: 'io', text: 'In "Không đủ hàng, còn N"' }] },
                    { label: 'Sai', steps: [
                      { kind: 'process', text: 'tien = soLuongBan × sp.TinhGiaBan()  — C# tự chọn đúng công thức theo nhóm hàng' },
                      { kind: 'process', text: 'sp.SoLuong -= soLuongBan' },
                      { kind: 'io', text: 'In tên hàng, số lượng, tiền' },
                    ] },
                  ] },
                ] },
              ] },
              { kind: 'end', text: 'Về menu' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Bẫy hay gặp',
          text: 'Nếu trong CuaHang viết if (sp is DienLanh) … else if (sp is GiaDung) … để tính giá thì đã bỏ mất đa hình. Chỉ cần gọi sp.TinhGiaBan() — phiên bản nào chạy do đối tượng thật quyết định, không phải do kiểu của biến. Bẫy thứ hai: giá bán là kết quả tính toán, không được lưu thành thuộc tính, vì đổi giá nhập là giá bán phải đổi theo.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Lộ trình viết bài lớn — mỗi bước chạy được rồi mới sang bước kế',
            items: [
              { label: 'Class gốc', text: 'Class SanPham: 4 property (GiaNhap, SoLuong kiểm tra ≥ 0), constructor, MoTa(). Tạo 2 đối tượng in thử.' },
              { label: 'Kế thừa', text: 'SanPham thành abstract với TinhGiaBan(); viết DienTu, DienLanh, GiaDung override theo bảng giá.' },
              { label: 'Quản lý', text: 'CuaHang với List<SanPham>: Them, Tim, TimTheoTen, CapNhat, Ban, Xoa, HienThi.' },
              { label: 'Đa hình', text: 'TongTonKho() chỉ foreach cộng sp.SoLuong × sp.TinhGiaBan() — kiểm tra đa hình chạy đúng.' },
              { label: 'JSON', text: 'SanPhamDto + LuuFile / DocFile bằng System.Text.Json, dựng lại đúng lớp con theo Loai.' },
              { label: 'Menu', text: 'Main: vòng lặp menu, mỗi mục một hàm static, try/catch quanh phần nhập liệu.' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Bí quyết không bị rối',
          text: 'Cả chương trình chỉ có hai chỗ được hỏi "nhóm hàng là gì": hàm TaoSanPham(loai, …) trong Main và switch theo Loai trong DocFile. Mọi nơi khác chỉ làm việc với kiểu SanPham.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b16-h001', level: 'Nâng cao', title: 'Chương trình quản lý sản phẩm cửa hàng điện máy', dense: true,
      requirement: 'Xây dựng chương trình console quản lý sản phẩm cửa hàng điện máy với các chức năng: (1) thêm sản phẩm thuộc ba nhóm điện tử, điện lạnh, gia dụng, mỗi nhóm có một thông số riêng; (2) tính giá bán từ giá nhập theo quy tắc riêng của nhóm bằng đa hình; (3) tìm theo mã hoặc từ khoá trong tên, không phân biệt hoa thường; (4) cập nhật giá nhập và số lượng theo mã; (5) bán hàng: kiểm tra tồn, trừ kho, in tiền; (6) xoá theo mã; (7) hiển thị danh sách kèm giá bán, bảo hành và tổng giá trị tồn kho; (8) lưu ra file JSON và tự đọc lại khi khởi động.',
      signature: 'abstract class SanPham { Ma, Ten, GiaNhap, SoLuong; abstract decimal TinhGiaBan(); virtual int ThangBaoHanh(); }\nclass DienTu : SanPham { KichCoInch }   class DienLanh : SanPham { CongSuatW }   class GiaDung : SanPham { ThangBaoHanh }\nclass CuaHang { Them, Tim, TimTheoTen, CapNhat, Ban, Xoa, HienThi, TongTonKho, LuuFile, DocFile }',
      constraints: [
        'Điện tử: giá nhập × 1,2 · Điện lạnh: × 1,15 + 300.000 đ lắp đặt, BH 24 tháng · Gia dụng: × 1,3, BH theo thông số riêng',
        'Mã không trùng; GiaNhap, SoLuong âm bị từ chối trong property · Không if / switch theo nhóm khi tính giá, tồn kho',
        'Bán quá tồn thì từ chối · Main chỉ nhập xuất, gọi CuaHang; lỗi nhập liệu phải được bắt, chương trình không dừng',
      ],
      examples: [
        { input: 'Thêm TV01 Tivi Samsung (điện tử 55 inch, nhập 10tr, tồn 5), TL01 Tủ lạnh LG (điện lạnh 150 W, nhập 8tr, tồn 3), NC01 Nồi cơm Sharp (gia dụng BH 6 tháng, nhập 500k, tồn 20); hiển thị', output: 'TV01 · Tivi Samsung · Điện tử · tồn 5 · 12.000.000 đ · BH 12t\nTL01 · Tủ lạnh LG · Điện lạnh · tồn 3 · 9.500.000 đ · BH 24t\nNC01 · Nồi cơm Sharp · Gia dụng · tồn 20 · 650.000 đ · BH 6t\nTổng tồn kho: 101.500.000 đ', explain: 'Tủ lạnh: 8tr × 1,15 + 300k. Tồn kho = 5 × 12tr + 3 × 9,5tr + 20 × 650k.' },
        { input: 'Tìm theo tên "tủ"; bán TL01 số lượng 2; bán TL01 số lượng 2 lần nữa', output: 'TL01 · Tủ lạnh LG · Điện lạnh · tồn 3\nBán 2 × 9.500.000 = 19.000.000 đ. Còn 1.\nKhông đủ hàng, còn 1', explain: 'Tìm khớp một phần tên, không phân biệt hoa thường. Lần bán thứ hai bị từ chối vì tồn còn 1.' },
        { input: 'Cập nhật NC01 giá nhập 600k, tồn 10; thoát rồi mở lại; hiển thị NC01', output: 'NC01 · Nồi cơm Sharp · Gia dụng · tồn 10 · 780.000 đ · BH 6t', explain: 'Giá bán tính lại: 600k × 1,3. JSON dựng lại đúng lớp GiaDung nên BH vẫn 6 tháng.' },
      ],
      hint: 'Cần đúng 6 class. SanPham (abstract): 4 property Ma, Ten, GiaNhap, SoLuong (set kiểm tra ≥ 0), constructor 4 tham số, abstract TinhGiaBan(), virtual ThangBaoHanh() trả 12, MoTa(). DienTu thêm KichCoInch; DienLanh thêm CongSuatW, override ThangBaoHanh() = 24; GiaDung thêm ThangBaoHanh và override trả về nó. Mỗi lớp con: constructor gọi base(...) + override TinhGiaBan(). CuaHang: field private List<SanPham>; Them(sp) → bool, Tim(ma) → SanPham?, TimTheoTen(tuKhoa) → List<SanPham>, CapNhat(ma, giaNhap, soLuong) → bool, Ban(ma, soLuong) → decimal?, Xoa(ma) → bool, HienThi(), TongTonKho() → decimal (foreach cộng SoLuong × TinhGiaBan()), LuuFile(), DocFile(). SanPhamDto: Loai, Ma, Ten, GiaNhap, SoLuong, ThongSo — chỉ để ghi JSON; đọc lên switch theo Loai để new đúng lớp con.',
      visual: {
        kind: 'uml',
        caption: 'Mỗi nhóm thêm một thông số và ghi đè TinhGiaBan(); CuaHang giữ List<SanPham>',
        relation: 'inherit',
        parent: { name: 'SanPham', stereotype: 'abstract', attrs: ['+ Ma, Ten, GiaNhap, SoLuong'], methods: ['+ TinhGiaBan() : decimal  (abstract)', '+ ThangBaoHanh() : int  (virtual)'] },
        children: [
          { name: 'DienTu', attrs: ['+ KichCoInch'], methods: ['+ TinhGiaBan()'] },
          { name: 'DienLanh', attrs: ['+ CongSuatW'], methods: ['+ TinhGiaBan()', '+ ThangBaoHanh()'] },
          { name: 'GiaDung', attrs: ['+ ThangBaoHanh'], methods: ['+ TinhGiaBan()', '+ ThangBaoHanh()'] },
        ],
      },
    },
  ],
}

export default buoi16
