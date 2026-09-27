import type { Buoi } from './types'

/**
 * Buổi ôn tập OOP. Toàn bộ bài tập xoay quanh MỘT bài toán duy nhất — bãi giữ xe —
 * được chia thành các bước nhỏ, mỗi bước ôn đúng một khái niệm, bước cuối ghép lại
 * thành chương trình hoàn chỉnh. Phần gợi ý của mỗi bài liệt kê rõ class, thuộc tính,
 * phương thức để người học biết chính xác phải viết cái gì.
 */
const buoi16: Buoi = {
  id: 16,
  slug: 'on-tap-oop-bai-giu-xe',
  title: 'Ôn tập OOP — Bãi giữ xe',
  subtitle: 'Một bài toán duy nhất, đi từ class đầu tiên đến đa hình và lưu file, để ôn trọn 7 buổi hướng đối tượng',
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
                methods: ['+ Them(Xe xe)', '+ Tim(string bienSo) : Xe?', '+ Xoa(string bienSo) : bool', '+ TongDoanhThu() : decimal', '+ HienThi()', '+ LuuFile(string duongDan)', '+ DocFile(string duongDan)'],
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
          type: 'callout',
          tone: 'tip',
          title: 'Thứ tự làm bài',
          text: 'Làm đúng thứ tự các bài bên dưới: class Xe → constructor và property → ba lớp con → BaiXe → đa hình → JSON. Mỗi bài chạy được rồi mới sang bài kế, không viết một mạch cả chương trình.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b16-c001', level: 'Cơ bản', title: 'Bước 1 — Class Xe đầu tiên',
      requirement: 'Cho mô tả: một chiếc xe gửi trong bãi có biển số, tên chủ xe và số giờ gửi. Thiết kế class Xe chứa đủ ba thông tin đó và một phương thức MoTa() trả về chuỗi "biển số — chủ xe — N giờ". Tạo hai đối tượng Xe trong Main và in mô tả của từng chiếc.',
      signature: 'class Xe { string BienSo; string TenChu; int SoGio; string MoTa(); }',
      constraints: ['Chưa cần constructor, gán từng thuộc tính sau khi new', 'Ba thuộc tính đều public ở bước này'],
      examples: [
        { input: 'BienSo = "59A1-123.45", TenChu = "Lan", SoGio = 3', output: '59A1-123.45 — Lan — 3 giờ' },
        { input: 'BienSo = "51H-678.90", TenChu = "Minh", SoGio = 0', output: '51H-678.90 — Minh — 0 giờ', explain: 'Số giờ 0 vẫn hợp lệ: xe vừa vào bãi.' },
      ],
      hint: 'Class Xe cần đúng 3 thuộc tính: BienSo (string), TenChu (string), SoGio (int) và 1 phương thức: MoTa() trả về string. Trong Main: Xe xe1 = new Xe(); xe1.BienSo = "…"; rồi Console.WriteLine(xe1.MoTa()).',
      visual: {
        kind: 'uml',
        caption: 'Một class, ba thuộc tính, một phương thức',
        children: [{ name: 'Xe', attrs: ['+ BienSo : string', '+ TenChu : string', '+ SoGio : int'], methods: ['+ MoTa() : string'] }],
      },
    },
    {
      id: 'b16-c002', level: 'Cơ bản', title: 'Bước 2 — Constructor và property có kiểm tra',
      requirement: 'Sửa class Xe ở bước 1: thêm constructor nhận đủ ba giá trị, và đổi SoGio thành property có kiểm tra — gán số âm thì ném ArgumentException "Số giờ không được âm". Hai thuộc tính còn lại giữ dạng auto-property.',
      signature: 'public Xe(string bienSo, string tenChu, int soGio)\npublic int SoGio { get; set; }  // set kiểm tra >= 0',
      constraints: ['Constructor phải gán qua property SoGio để tận dụng kiểm tra', 'Không cho phép tạo Xe mà thiếu dữ liệu'],
      examples: [
        { input: 'new Xe("59A1-123.45", "Lan", 3)', output: 'Tạo thành công, MoTa() = "59A1-123.45 — Lan — 3 giờ"' },
        { input: 'new Xe("59A1-123.45", "Lan", -2)', output: 'ArgumentException: Số giờ không được âm', explain: 'Kiểm tra nằm trong set nên cả constructor lẫn gán sau này đều bị chặn.' },
        { input: 'xe.SoGio = 5 rồi xe.SoGio = -1', output: 'Lần gán thứ hai ném ArgumentException, SoGio vẫn là 5' },
      ],
      hint: 'Thuộc tính: BienSo và TenChu là auto-property; SoGio là property đầy đủ với một field private soGio phía sau. Phương thức: constructor 3 tham số gán this.BienSo, this.TenChu, this.SoGio; MoTa() giữ nguyên.',
      visual: {
        kind: 'flow',
        caption: 'Luồng chạy của set trong property SoGio',
        steps: [
          { kind: 'start', text: 'xe.SoGio = value' },
          { kind: 'decision', text: 'value < 0 ?', branches: [
            { label: 'Đúng', steps: [{ kind: 'io', text: 'throw ArgumentException("Số giờ không được âm")' }] },
            { label: 'Sai', steps: [{ kind: 'process', text: 'soGio = value' }] },
          ] },
        ],
      },
    },
    {
      id: 'b16-m001', level: 'Trung bình', title: 'Bước 3 — Ba lớp con kế thừa Xe',
      requirement: 'Bảng giá: xe đạp 2.000 đ/giờ; xe máy 5.000 đ/giờ, trên 12 giờ cộng 10.000 đ; xe hơi 20.000 đ/giờ cho 4 giờ đầu, từ giờ thứ 5 còn 15.000 đ/giờ. Chuyển Xe thành abstract class có TinhPhi() abstract, viết ba lớp con XeDap, XeMay, XeHoi cài TinhPhi() theo bảng giá.',
      signature: 'abstract class Xe { abstract decimal TinhPhi(); }\nclass XeDap : Xe / class XeMay : Xe / class XeHoi : Xe',
      constraints: ['Lớp con không khai báo lại thuộc tính', 'Constructor lớp con gọi base(...)', 'SoGio = 0 → phí 0'],
      examples: [
        { input: 'new XeDap("XD-01", "An", 3).TinhPhi()', output: '6000' },
        { input: 'new XeMay("59A1-123.45", "Lan", 14).TinhPhi()', output: '80000', explain: '14 × 5.000 = 70.000, gửi trên 12 giờ nên cộng 10.000.' },
        { input: 'new XeHoi("51H-678.90", "Minh", 6).TinhPhi()', output: '110000', explain: '4 × 20.000 + 2 × 15.000. Gửi đúng 4 giờ thì chưa sang giá giảm.' },
      ],
      hint: 'Class Xe thêm abstract và public abstract decimal TinhPhi(). Mỗi lớp con chỉ có constructor gọi base(...) và public override decimal TinhPhi(). XeHoi dùng Math.Min(SoGio, 4) cho phần giá cao, Math.Max(SoGio - 4, 0) cho phần giá giảm.',
      visual: {
        kind: 'uml',
        caption: 'Phần chung nằm ở Xe, mỗi lớp con chỉ có TinhPhi() của riêng nó',
        relation: 'inherit',
        parent: { name: 'Xe', stereotype: 'abstract', attrs: ['+ BienSo, TenChu, SoGio'], methods: ['+ TinhPhi() : decimal  (abstract)'] },
        children: [
          { name: 'XeDap', methods: ['+ TinhPhi() override'] },
          { name: 'XeMay', methods: ['+ TinhPhi() override'] },
          { name: 'XeHoi', methods: ['+ TinhPhi() override'] },
        ],
      },
    },
    {
      id: 'b16-m002', level: 'Trung bình', title: 'Bước 4 — Class BaiXe quản lý danh sách',
      requirement: 'Thiết kế class BaiXe giữ một List<Xe> private. Cài các phương thức: Them(Xe xe) từ chối nếu biển số đã tồn tại và trả về bool; Tim(string bienSo) trả về Xe hoặc null; Xoa(string bienSo) trả về true nếu xoá được; HienThi() in từng xe theo dạng "STT. biển số — chủ xe — N giờ — phí đ".',
      signature: 'class BaiXe { bool Them(Xe xe); Xe? Tim(string bienSo); bool Xoa(string bienSo); void HienThi(); }',
      constraints: ['So sánh biển số không phân biệt hoa thường', 'Danh sách trống thì HienThi() in "Bãi xe trống"', 'Bên ngoài không được truy cập trực tiếp vào List'],
      examples: [
        { input: 'Them(XeDap "XD-01"), Them(XeMay "59A1-123.45"), HienThi()', output: '1. XD-01 — An — 3 giờ — 6.000 đ\n2. 59A1-123.45 — Lan — 14 giờ — 80.000 đ' },
        { input: 'Them(XeDap "xd-01") lần thứ hai', output: 'false', explain: 'Trùng biển số dù khác hoa thường nên bị từ chối.' },
        { input: 'Xoa("51H-999.99") khi biển số không có; bãi trống rồi HienThi()', output: 'false\nBãi xe trống' },
      ],
      hint: 'Thuộc tính: một field private List<Xe> danhSach = new(). Phương thức Tim dùng danhSach.FirstOrDefault(x => x.BienSo.Equals(bienSo, StringComparison.OrdinalIgnoreCase)). Them và Xoa đều gọi Tim trước rồi mới quyết định. HienThi dùng vòng for để có số thứ tự.',
      visual: {
        kind: 'uml',
        caption: 'BaiXe giữ danh sách private, bên ngoài chỉ đi qua các phương thức public',
        children: [{ name: 'BaiXe', attrs: ['− danhSach : List<Xe>'], methods: ['+ Them(Xe xe) : bool', '+ Tim(string bienSo) : Xe?', '+ Xoa(string bienSo) : bool', '+ HienThi() : void'] }],
      },
    },
    {
      id: 'b16-m003', level: 'Trung bình', title: 'Bước 5 — Đa hình khi tính doanh thu',
      requirement: 'Thêm vào BaiXe phương thức TongDoanhThu() cộng phí của mọi xe đang gửi, và DemTheoLoai() trả về Dictionary<string, int> đếm số xe theo tên lớp. Cả hai phương thức không được dùng if hay switch theo loại xe.',
      signature: 'decimal TongDoanhThu()\nDictionary<string, int> DemTheoLoai()',
      constraints: ['Chỉ gọi xe.TinhPhi() qua biến kiểu Xe', 'Tên loại lấy từ xe.GetType().Name', 'Bãi trống trả về 0 và Dictionary rỗng'],
      examples: [
        { input: 'Bãi có XeDap 3 giờ, XeMay 14 giờ, XeHoi 6 giờ', output: 'TongDoanhThu() = 196000', explain: '6.000 + 80.000 + 110.000.' },
        { input: 'Bãi có 2 XeDap, 1 XeHoi', output: '{ "XeDap": 2, "XeHoi": 1 }' },
        { input: 'Bãi trống', output: 'TongDoanhThu() = 0, DemTheoLoai() = {}' },
      ],
      hint: 'TongDoanhThu chỉ là một vòng foreach (Xe xe in danhSach) tong += xe.TinhPhi(); — biến xe khai báo kiểu Xe nhưng C# gọi đúng bản override của XeDap / XeMay / XeHoi. Đó chính là đa hình. DemTheoLoai dùng Dictionary, kiểm tra ContainsKey trước khi tăng.',
      visual: {
        kind: 'strip',
        caption: 'danhSach : List<Xe> — mỗi ô một đối tượng thật khác loại, cùng gọi TinhPhi()',
        name: 'danhSach',
        items: ['XeDap → 6.000', 'XeMay → 80.000', 'XeHoi → 110.000'],
      },
    },
    {
      id: 'b16-h001', level: 'Nâng cao', title: 'Bước 6 — Lưu và đọc file JSON',
      requirement: 'Thêm vào BaiXe hai phương thức LuuFile(duongDan) và DocFile(duongDan) dùng System.Text.Json. Vì JSON không tự biết một phần tử là XeDap hay XeHoi, khi lưu phải ghi kèm trường "Loai" và khi đọc phải dựa vào trường đó để tạo đúng lớp con.',
      signature: 'void LuuFile(string duongDan)\nvoid DocFile(string duongDan)',
      constraints: ['File không tồn tại thì DocFile() để danh sách trống, không ném lỗi', 'Đọc xong rồi gọi TongDoanhThu() phải ra đúng số như trước khi lưu', 'Không dùng thư viện ngoài'],
      examples: [
        { input: 'Bãi có XeDap "XD-01" 3 giờ, XeHoi "51H-678.90" 6 giờ, LuuFile("bai-xe.json")', output: '[{"Loai":"XeDap","BienSo":"XD-01",…}, {"Loai":"XeHoi","BienSo":"51H-678.90",…}]' },
        { input: 'Chương trình mới, DocFile("bai-xe.json"), TongDoanhThu()', output: '116000', explain: 'XeHoi được tạo lại đúng lớp nên tính 110.000, cộng 6.000 của xe đạp.' },
        { input: 'DocFile("khong-co.json")', output: 'Danh sách trống, không lỗi' },
      ],
      hint: 'Tạo thêm một class trung gian XeDto { string Loai; string BienSo; string TenChu; int SoGio; } chỉ để lưu. LuuFile: chuyển mỗi Xe sang XeDto với Loai = xe.GetType().Name rồi JsonSerializer.Serialize. DocFile: Deserialize ra List<XeDto>, rồi switch theo Loai để new XeDap / XeMay / XeHoi và Them vào danh sách.',
      visual: {
        kind: 'compare',
        caption: 'Đường đi của dữ liệu — trường Loai là chìa khoá để dựng lại đúng lớp con',
        columns: [
          { title: 'LuuFile()', tone: 'plain', items: ['List<Xe> → List<XeDto>, gắn Loai = xe.GetType().Name', 'JsonSerializer.Serialize(dtos)', 'File.WriteAllText(duongDan, json)'] },
          { title: 'DocFile()', tone: 'plain', items: ['File.ReadAllText → Deserialize<List<XeDto>>', 'switch (dto.Loai): new XeDap / XeMay / XeHoi', 'Them(xe) vào danh sách'] },
        ],
      },
    },
    {
      id: 'b16-h002', level: 'Nâng cao', title: 'Bước 7 — Ghép thành chương trình menu hoàn chỉnh',
      requirement: 'Ghép các bước trên thành chương trình console có menu: 1 thêm xe (chọn loại, nhập biển số, chủ xe, số giờ), 2 lấy xe theo biển số (in phí rồi xoá), 3 hiển thị danh sách, 4 doanh thu và số xe theo loại, 5 lưu file, 6 đọc file, 0 thoát. Lỗi nhập liệu phải được bắt và báo, chương trình không được dừng đột ngột.',
      signature: 'static void Main() — vòng lặp menu gọi vào BaiXe',
      constraints: ['Main chỉ nhập xuất, không chứa công thức phí', 'Số giờ sai thì báo lỗi và hỏi lại', 'Thoát thì tự lưu file'],
      examples: [
        { input: 'Chọn 1 → loại 2 (xe máy) → "59A1-123.45", "Lan", 14', output: 'Đã thêm xe máy 59A1-123.45' },
        { input: 'Chọn 2 → "59a1-123.45"', output: 'Lan — 59A1-123.45 — phí 80.000 đ. Đã lấy xe.' },
        { input: 'Chọn 2 → "00X-000.00"; chọn 1 → số giờ "abc"', output: 'Không tìm thấy xe\nSố giờ phải là số nguyên không âm, nhập lại' },
      ],
      hint: 'Main chỉ có một đối tượng BaiXe và một vòng while (true). Mỗi mục menu là một hàm static nhỏ: ThemXe(baiXe), LayXe(baiXe)… Việc tạo đúng lớp con gom vào hàm TaoXe(loai, …) dùng switch — chỗ duy nhất được phép hỏi "loại xe là gì".',
      visual: {
        kind: 'flow',
        caption: 'Vòng lặp menu chính — trước vòng lặp gọi baiXe.DocFile("bai-xe.json")',
        steps: [
          { kind: 'io', text: 'In menu, đọc lựa chọn' },
          { kind: 'decision', text: 'lựa chọn == 0 ?', branches: [
            { label: 'Đúng', steps: [{ kind: 'end', text: 'baiXe.LuuFile(...) rồi thoát' }] },
            { label: 'Sai', steps: [{ kind: 'process', text: 'Gọi hàm 1–6 tương ứng trong try/catch, rồi quay lại menu' }] },
          ] },
        ],
      },
    },
  ],
}

export default buoi16
