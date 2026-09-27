import type { Buoi } from './types'

/**
 * Buổi ôn tập OOP. Một bài tập lớn duy nhất — viết trọn chương trình console quản lý
 * bãi giữ xe. Phần lý thuyết phân rã đề bài, vẽ sơ đồ lớp và lộ trình 6 bước; phần
 * gợi ý của bài liệt kê rõ class, thuộc tính, phương thức để người học biết chính xác
 * phải viết cái gì.
 */
const buoi16: Buoi = {
  id: 16,
  slug: 'on-tap-oop-bai-giu-xe',
  title: 'Ôn tập OOP — Bãi giữ xe',
  subtitle: 'Một bài lớn viết trọn chương trình console: class, kế thừa, đa hình, List và lưu file JSON',
  duration: '3 giờ',
  keywords: ['class', 'property', 'constructor', 'inheritance', 'override', 'polymorphism', 'List<T>', 'JSON'],
  goals: [
    'Đọc một đề bài đời thường và tự chỉ ra được class, thuộc tính, phương thức cần có',
    'Viết class có constructor và property kiểm tra dữ liệu',
    'Dùng kế thừa và override để mỗi loại xe tính phí theo cách riêng',
    'Quản lý danh sách đối tượng bằng List<T>, gọi phương thức qua lớp cha (đa hình)',
    'Lưu và đọc lại danh sách đối tượng từ file JSON',
  ],

  sections: [
    {
      id: 'de-bai-chung',
      title: '1. Bài toán ôn tập: bãi giữ xe',
      blocks: [
        {
          type: 'text',
          text: 'Một bãi giữ xe nhận ba loại xe: xe đạp, xe máy và xe hơi. Mỗi xe khi vào bãi được ghi biển số, tên chủ xe và số giờ gửi. Khi lấy xe, nhân viên tính phí theo loại xe. Cuối ngày chủ bãi muốn xem danh sách xe đang gửi, tổng doanh thu, và lưu lại danh sách để hôm sau mở lên dùng tiếp.',
        },
        {
          type: 'text',
          text: 'Đề bài này cố tình đơn giản hơn bài quản lý nhân viên: chỉ có ba thuộc tính chung, một phương thức cần đa hình, và công thức tính phí là phép nhân. Trọng tâm là nhìn ra được cấu trúc lớp, không phải xử lý nghiệp vụ.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'ipo',
            caption: 'Phân rã đề bài thành ba khối',
            input: ['Biển số', 'Tên chủ xe', 'Số giờ gửi', 'Loại xe: đạp / máy / hơi'],
            process: ['Tạo đối tượng đúng loại', 'Thêm vào danh sách', 'Tính phí theo loại (đa hình)', 'Cộng dồn doanh thu'],
            output: ['Danh sách xe kèm phí', 'Tổng doanh thu', 'File bai-xe.json'],
          },
        },
        {
          type: 'table',
          head: ['Loại xe', 'Phí một giờ', 'Quy tắc riêng'],
          rows: [
            ['XeDap', '2.000 đ', 'Không có'],
            ['XeMay', '5.000 đ', 'Gửi qua đêm (trên 12 giờ) cộng thêm 10.000 đ'],
            ['XeHoi', '20.000 đ', 'Từ giờ thứ 5 trở đi mỗi giờ chỉ tính 15.000 đ'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Cách đọc đề để tìm class',
          text: 'Danh từ trong đề bài thường là class hoặc thuộc tính: xe, biển số, chủ xe, số giờ, bãi xe. Động từ là phương thức: tính phí, thêm, tìm, xoá, hiển thị, lưu. Danh từ nào "là một loại của" danh từ khác thì là lớp con: xe máy là một loại xe.',
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
            caption: 'Ba loại xe kế thừa từ Xe, mỗi loại ghi đè TinhPhi() theo bảng giá riêng',
            relation: 'inherit',
            parent: {
              name: 'Xe',
              stereotype: 'abstract',
              attrs: ['+ BienSo : string', '+ TenChu : string', '+ SoGio : int'],
              methods: ['+ TinhPhi() : decimal', '+ MoTa() : string'],
            },
            children: [
              { name: 'XeDap', methods: ['+ TinhPhi() : 2.000 × giờ'] },
              { name: 'XeMay', methods: ['+ TinhPhi() : 5.000 × giờ (+10.000 nếu > 12 giờ)'] },
              { name: 'XeHoi', methods: ['+ TinhPhi() : 20.000 × 4 giờ đầu, 15.000 × giờ sau'] },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'uml',
            caption: 'BaiXe là lớp quản lý, giữ danh sách và cung cấp các thao tác',
            children: [
              {
                name: 'BaiXe',
                attrs: ['− danhSach : List<Xe>'],
                methods: ['+ Them(Xe xe) : bool', '+ Tim(string bienSo) : Xe?', '+ TimTheoChu(string ten) : List<Xe>', '+ DoiSoGio(string bienSo, int gio) : bool', '+ LayXe(string bienSo) : decimal?', '+ HienThi()', '+ TongDoanhThu() : decimal', '+ LuuFile() / DocFile()'],
              },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Luồng tính phí khi lấy xe — chỗ đa hình phát huy tác dụng',
            steps: [
              { kind: 'start', text: 'Nhập biển số cần lấy' },
              { kind: 'process', text: 'xe = baiXe.Tim(bienSo)' },
              { kind: 'decision', text: 'xe == null ?', branches: [
                { label: 'Đúng', steps: [{ kind: 'io', text: 'In "Không tìm thấy xe"' }] },
                { label: 'Sai', steps: [
                  { kind: 'process', text: 'phi = xe.TinhPhi()  — C# tự chọn đúng phiên bản theo loại xe' },
                  { kind: 'io', text: 'In biển số, chủ xe, phí' },
                  { kind: 'process', text: 'baiXe.Xoa(bienSo)' },
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
          text: 'Nếu trong BaiXe viết if (xe is XeMay) … else if (xe is XeHoi) … để tính phí thì đã bỏ mất đa hình. Chỉ cần gọi xe.TinhPhi() — phiên bản nào chạy do đối tượng thật quyết định, không phải do kiểu của biến.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Lộ trình viết bài lớn — mỗi bước chạy được rồi mới sang bước kế',
            items: [
              { label: '1', text: 'Class Xe: 3 property, constructor, MoTa(). Tạo 2 đối tượng in thử.' },
              { label: '2', text: 'Xe thành abstract với TinhPhi(); viết XeDap, XeMay, XeHoi override theo bảng giá.' },
              { label: '3', text: 'BaiXe với List<Xe>: Them, Tim, TimTheoChu, DoiSoGio, LayXe, HienThi.' },
              { label: '4', text: 'TongDoanhThu() chỉ foreach cộng xe.TinhPhi() — kiểm tra đa hình chạy đúng.' },
              { label: '5', text: 'XeDto + LuuFile / DocFile bằng System.Text.Json, dựng lại đúng lớp con theo Loai.' },
              { label: '6', text: 'Main: vòng lặp menu, mỗi mục một hàm static, try/catch quanh phần nhập liệu.' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Bí quyết không bị rối',
          text: 'Cả chương trình chỉ có một chỗ được hỏi "loại xe là gì": hàm TaoXe(loai, bienSo, tenChu, soGio) trong Main và switch theo Loai trong DocFile. Mọi nơi khác chỉ làm việc với kiểu Xe.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b16-h001', level: 'Nâng cao', title: 'Chương trình quản lý bãi giữ xe', dense: true,
      requirement: 'Xây dựng chương trình console quản lý bãi giữ xe với các chức năng: (1) thêm xe vào bãi, có ba loại xe đạp, xe máy, xe hơi; (2) tính phí gửi cho từng loại theo bảng giá riêng bằng đa hình; (3) tìm xe theo biển số hoặc tên chủ xe, không phân biệt hoa thường; (4) đổi số giờ gửi theo biển số; (5) lấy xe: in phí rồi xoá khỏi bãi; (6) hiển thị danh sách gồm biển số, chủ xe, loại, số giờ, phí; (7) tổng doanh thu; (8) lưu danh sách ra file JSON và tự đọc lại khi khởi động.',
      signature: 'abstract class Xe { BienSo, TenChu, SoGio; abstract decimal TinhPhi(); }\nclass XeDap : Xe   class XeMay : Xe   class XeHoi : Xe\nclass BaiXe { Them, Tim, TimTheoChu, DoiSoGio, LayXe, HienThi, TongDoanhThu, LuuFile, DocFile }',
      constraints: [
        'Xe đạp 2.000 đ/giờ · xe máy 5.000 đ/giờ, trên 12 giờ cộng 10.000 đ · xe hơi 20.000 đ/giờ cho 4 giờ đầu, từ giờ thứ 5 còn 15.000 đ/giờ',
        'Biển số không trùng; SoGio âm bị từ chối trong property · Không if / switch theo loại xe khi tính phí, doanh thu',
        'Main chỉ nhập xuất và gọi BaiXe; lỗi nhập liệu phải được bắt, chương trình không dừng',
      ],
      examples: [
        { input: 'Thêm xe máy 59A1-123.45 (Lan, 14 giờ), xe hơi 51H-678.90 (Minh, 6 giờ); hiển thị', output: '59A1-123.45 — Lan — Xe máy — 14 giờ — 80.000 đ\n51H-678.90 — Minh — Xe hơi — 6 giờ — 110.000 đ\nTổng doanh thu: 190.000 đ', explain: 'Xe máy: 14 × 5.000 + 10.000 vì trên 12 giờ. Xe hơi: 4 × 20.000 + 2 × 15.000.' },
        { input: 'Tìm chủ xe "lan"; đổi số giờ "59a1-123.45" thành 3; lấy xe 59A1-123.45', output: '59A1-123.45 — Lan — Xe máy — 14 giờ\nĐã đổi số giờ\nPhí 15.000 đ. Đã lấy xe.', explain: 'Không phân biệt hoa thường. Còn 3 giờ nên phí = 3 × 5.000.' },
        { input: 'Thoát rồi mở lại; hiển thị', output: '51H-678.90 — Minh — Xe hơi — 6 giờ — 110.000 đ', explain: 'Thoát đã lưu bai-xe.json; khởi động đọc lại và dựng đúng lớp XeHoi nên phí vẫn 110.000.' },
      ],
      hint: 'Cần đúng 5 class. Xe (abstract): 3 property BienSo, TenChu, SoGio (set kiểm tra ≥ 0), constructor 3 tham số, abstract TinhPhi(), MoTa(). XeDap, XeMay, XeHoi: chỉ constructor gọi base(...) và override TinhPhi(). BaiXe: 1 field private List<Xe>; các phương thức Them(xe) → bool, Tim(bienSo) → Xe?, TimTheoChu(ten) → List<Xe>, DoiSoGio(bienSo, gio) → bool, LayXe(bienSo) → decimal?, HienThi(), TongDoanhThu() → decimal (chỉ foreach cộng xe.TinhPhi()), LuuFile(), DocFile(). XeDto: Loai, BienSo, TenChu, SoGio — chỉ để ghi JSON; khi đọc, switch theo Loai để new đúng lớp con.',
      visual: {
        kind: 'uml',
        caption: 'Xe giữ phần chung, ba lớp con chỉ ghi đè TinhPhi(); BaiXe (xem sơ đồ ở phần lý thuyết) giữ List<Xe>',
        relation: 'inherit',
        parent: { name: 'Xe', stereotype: 'abstract', attrs: ['+ BienSo, TenChu, SoGio'], methods: ['+ TinhPhi() : decimal  (abstract)', '+ MoTa() : string'] },
        children: [
          { name: 'XeDap', methods: ['+ TinhPhi() override'] },
          { name: 'XeMay', methods: ['+ TinhPhi() override'] },
          { name: 'XeHoi', methods: ['+ TinhPhi() override'] },
        ],
      },
    },
  ],
}

export default buoi16
