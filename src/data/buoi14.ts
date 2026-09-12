import type { Buoi } from './types'

const buoi14: Buoi = {
  id: 14,
  slug: 'abstract-class-va-generic',
  title: 'Abstract class & Generic',
  subtitle: 'Khuôn mẫu nửa hoàn thiện, và một class viết một lần dùng cho mọi kiểu dữ liệu',
  duration: '3 giờ',
  keywords: ['abstract', 'sealed override', 'generic', 'constraint', 'Activator'],
  goals: [
    'Viết abstract class vừa cho sẵn code chung vừa bắt lớp con cài đặt phần riêng',
    'Chọn đúng giữa interface, abstract class và class thường',
    'Viết class và phương thức generic có ràng buộc where',
    'Biết Activator dùng để tạo đối tượng khi kiểu chỉ xác định lúc chạy',
  ],

  sections: [
    {
          id: 'abstract',
          title: '1. Abstract class — nửa khuôn mẫu, nửa hợp đồng',
          blocks: [
            {
              type: 'text',
              text: 'Abstract class nằm giữa lớp thường và interface: nó vừa chứa được code dùng chung như lớp cha, vừa bắt lớp con phải cài đặt những phần bỏ trống như interface. Điểm chung: không tạo đối tượng trực tiếp từ nó được.',
            },
            {
              type: 'code',
              sample: {
                title: 'Vừa cho sẵn, vừa bắt buộc',
                code: `abstract class DongVat
    {
        protected string ten;
        public DongVat(string ten) => this.ten = ten;

        // Đã cài đặt sẵn — mọi lớp con dùng chung
        public void GioiThieu() => Console.WriteLine($"Tôi là {ten}");

        // Trừu tượng — không có thân, lớp con BẮT BUỘC override
        public abstract string KeuNhuThe();
    }

    class Cho : DongVat
    {
        public Cho(string ten) : base(ten) { }
        public override string KeuNhuThe() => "Gâu gâu";
    }

    class Meo : DongVat
    {
        public Meo(string ten) : base(ten) { }
        public override string KeuNhuThe() => "Meo meo";
    }

    // DongVat dv = new DongVat("X");   // LỖI — không tạo đối tượng từ abstract class
    DongVat dv = new Cho("Mực");        // nhưng gán đối tượng lớp con thì được
    dv.GioiThieu();
    Console.WriteLine(dv.KeuNhuThe());  // Gâu gâu`,
                note: 'Phương thức abstract không cần virtual — nó đã ngầm hiểu là phải override.',
              
            trace: [

              { line: 25, vars: {}, note: 'Dòng này nếu bỏ comment sẽ LỖI BIÊN DỊCH: abstract class chỉ là khuôn mẫu chưa hoàn thiện, không tạo đối tượng trực tiếp được.' },
              { line: 26, vars: {}, note: 'Nhưng khai báo biến kiểu DongVat rồi gán đối tượng lớp con thì hoàn toàn hợp lệ.' },
              { line: 15, vars: { ten: '"Mực"' }, heap: { '0xE00': 'Cho { ten: null }' }, note: 'Constructor của Cho gọi base(ten) lên lớp cha.' },
              { line: 4, vars: { ten: '"Mực"' }, heap: { '0xE00': 'Cho { ten: "Mực" }' }, note: 'Abstract class vẫn CÓ constructor, dù không tạo đối tượng trực tiếp từ nó được.' },
              { line: 27, vars: { 'dv (kiểu thật)': 'Cho' }, refs: { dv: '0xE00' }, heap: { '0xE00': 'Cho { ten: "Mực" }' }, note: 'Gọi GioiThieu().' },
              { line: 7, vars: { 'dv (kiểu thật)': 'Cho' }, heap: { '0xE00': 'Cho { ten: "Mực" }' }, output: ['Tôi là Mực'], note: 'Phương thức này lớp cha đã cài đặt sẵn — lớp Cho không viết lại dòng nào mà vẫn dùng được.' },
              { line: 28, vars: { 'dv (kiểu thật)': 'Cho' }, output: ['Tôi là Mực'], note: 'Gọi KeuNhuThe() — thứ mà lớp cha chỉ khai báo chứ không cài đặt.' },
              { line: 16, vars: { 'dv (kiểu thật)': 'Cho', 'trả về': '"Gâu gâu"' }, output: ['Tôi là Mực'], note: 'Chạy bản override của Cho. Lớp con nào quên override thì lỗi biên dịch ngay — abstract class vừa CHO sẵn vừa BẮT BUỘC, khác interface ở chỗ đó.' },
              { line: 28, vars: {}, output: ['Tôi là Mực', 'Gâu gâu'] },
            ],},
            },
            {
              type: 'table',
              head: ['Tiêu chí', 'Interface', 'Abstract class'],
              rows: [
                ['Chứa code cài đặt sẵn', 'Rất hạn chế', 'Có, thoải mái'],
                ['Chứa field dữ liệu', 'Không', 'Có'],
                ['Có constructor', 'Không', 'Có'],
                ['Một class dùng được bao nhiêu', 'Nhiều', 'Chỉ một'],
                ['Ý nghĩa', '"CÓ THỂ LÀM được việc gì"', '"LÀ một loại gì"'],
                ['Ví dụ', 'IBayDuoc, ISoSanh', 'DongVat, NhanVien'],
              ],
            },
            {
              type: 'callout',
              tone: 'tip',
              title: 'Chọn cái nào',
              text: 'Các lớp có chung dữ liệu và một phần hành vi → abstract class. Các lớp không liên quan gì nhau nhưng cùng làm được một việc → interface. Phân vân thì chọn interface, vì nó ít ràng buộc hơn.',
            },
            {
              type: 'visual',
              visual: {
                kind: 'flow',
                caption: 'Quy trình chọn giữa ba lựa chọn',
                steps: [
                  {
                    kind: 'decision',
                    text: 'Các lớp có chung dữ liệu (field) không?',
                    branches: [
                      {
                        label: 'Có',
                        steps: [
                          {
                            kind: 'decision',
                            text: 'Lớp cha có bắt buộc lớp con viết lại gì không?',
                            branches: [
                              { label: 'Có', steps: [{ kind: 'process', text: 'Abstract class' }] },
                              { label: 'Không', steps: [{ kind: 'process', text: 'Class thường + virtual' }] },
                            ],
                          },
                        ],
                      },
                      { label: 'Không', steps: [{ kind: 'process', text: 'Interface' }] },
                    ],
                  },
                ],
              },
            },
          ],
        },
    {
          id: 'generic',
          title: '2. Generic — một khuôn dùng cho mọi kiểu',
          blocks: [
            {
              type: 'text',
              text: 'List<int>, List<string>, Dictionary<string, int> mà ta dùng ở buổi 8 chính là generic. Chữ trong ngoặc nhọn là kiểu dữ liệu được truyền vào như một tham số — nhờ đó một class viết một lần dùng được cho mọi kiểu mà vẫn an toàn kiểu.',
            },
            {
              type: 'code',
              sample: {
                title: 'Class và phương thức generic',
                code: `// T là kiểu do người dùng quyết định lúc gọi
    class Kho<T>
    {
        private List<T> danhSach = new List<T>();

        public void Them(T item) => danhSach.Add(item);
        public T Lay(int viTri) => danhSach[viTri];
        public int SoLuong => danhSach.Count;
    }

    var khoSach = new Kho<string>();
    khoSach.Them("Clean Code");

    var khoSo = new Kho<int>();
    khoSo.Them(42);
    // khoSo.Them("abc");   // LỖI ngay lúc biên dịch — đúng cái ta muốn

    // Phương thức generic
    T LayLonNhat<T>(T a, T b) where T : IComparable<T>
        => a.CompareTo(b) >= 0 ? a : b;

    Console.WriteLine(LayLonNhat(3, 7));         // 7
    Console.WriteLine(LayLonNhat("an", "binh")); // binh`,
                note: 'where T : ... là ràng buộc. where T : class buộc T là kiểu tham chiếu; where T : new() buộc T phải có constructor rỗng.',
              
            trace: [

              { line: 2, vars: {}, note: 'T là chỗ trống, người dùng điền kiểu vào lúc gọi.' },
              { line: 4, vars: { 'T': 'string' }, refs: { khoSach: '0xF00' }, heap: { '0xF00': 'Kho<string> { danhSach: [] }' }, note: 'Tạo Kho<string> — mọi chữ T trong class giờ được thay bằng string.' },
              { line: 6, vars: { 'T': 'string', item: '"Clean Code"' }, heap: { '0xF00': 'Kho<string> { danhSach: [Clean Code] }' }, note: 'Them nhận đúng kiểu string. Truyền số vào đây là lỗi biên dịch chứ không phải lỗi lúc chạy.' },
              { line: 4, vars: { 'T': 'int' }, refs: { khoSach: '0xF00', khoSo: '0xF10' }, heap: { '0xF00': 'Kho<string> { danhSach: [Clean Code] }', '0xF10': 'Kho<int> { danhSach: [] }' }, note: 'Cùng một class, lần này T là int. Hai kho hoàn toàn độc lập, mỗi cái khoá chặt một kiểu.' },
              { line: 6, vars: { 'T': 'int', item: '42' }, heap: { '0xF00': 'Kho<string> { danhSach: [Clean Code] }', '0xF10': 'Kho<int> { danhSach: [42] }' }, note: 'Viết một lần, dùng cho mọi kiểu, mà vẫn giữ nguyên an toàn kiểu — đây là lý do List<T> thay thế ArrayList.' },
            ],},
            },
            {
              type: 'callout',
              tone: 'info',
              title: 'Vì sao generic hơn hẳn object',
              text: 'Dùng object thì lưu được mọi thứ nhưng lấy ra phải ép kiểu, ép sai là lỗi lúc chạy. Generic giữ đúng kiểu từ đầu, sai là báo ngay lúc biên dịch — đây chính là lý do List<T> thay thế ArrayList.',
            },
          ],
        },
    {
      id: 'activator',
      title: '3. Activator — tạo đối tượng lúc chạy',
      blocks: [
        {
          type: 'text',
          text: 'Bình thường ta gõ new TenClass() — kiểu được quyết định ngay lúc viết code. Nhưng có lúc kiểu chỉ biết được khi chương trình chạy, ví dụ đọc tên class từ file cấu hình. Activator sinh ra để lo việc đó.',
        },
        {
          type: 'code',
          sample: {
            title: 'Tạo đối tượng khi chỉ biết Type',
            code: `using System;

// Biết sẵn kiểu — cách thường dùng
var a = new HinhTron(5);

// Chỉ biết Type lúc chạy
Type t = typeof(HinhTron);
var b = Activator.CreateInstance(t, 5) as HinhTron;

// Dạng generic, gọn hơn nhưng cần constructor không tham số
var c = Activator.CreateInstance<HinhChuNhat>();`,
            note: 'CreateInstance(type, args) truyền tham số vào constructor. Sai số lượng hoặc sai kiểu tham số sẽ lỗi lúc chạy chứ không lỗi lúc biên dịch.',
          
            trace: [

              { line: 4, vars: { a: '→ 0x1000' }, refs: { a: '0x1000' }, heap: { '0x1000': 'HinhTron { banKinh: 5 }' }, note: 'Cách thường: gõ thẳng tên class, kiểu được chốt ngay lúc biên dịch.' },
              { line: 7, vars: { a: '→ 0x1000', t: 'typeof(HinhTron)' }, refs: { a: '0x1000' }, heap: { '0x1000': 'HinhTron { banKinh: 5 }' }, note: 'Type là mô tả về một kiểu, bản thân nó chưa phải đối tượng. Trong thực tế t thường lấy từ chuỗi đọc trong file cấu hình.' },
              { line: 8, vars: { a: '→ 0x1000', t: 'typeof(HinhTron)', b: '→ 0x1010' }, refs: { a: '0x1000', b: '0x1010' }, heap: { '0x1000': 'HinhTron { banKinh: 5 }', '0x1010': 'HinhTron { banKinh: 5 }' }, note: 'Activator dựng đối tượng từ Type và truyền 5 vào constructor. Sai số lượng hoặc sai kiểu tham số thì lỗi LÚC CHẠY chứ không phải lúc biên dịch — đó là cái giá phải trả cho sự linh hoạt.' },
              { line: 11, vars: { b: '→ 0x1010', c: '→ 0x1020' }, refs: { b: '0x1010', c: '0x1020' }, heap: { '0x1010': 'HinhTron { banKinh: 5 }', '0x1020': 'HinhChuNhat { dai: 0, rong: 0 }' }, note: 'Dạng generic gọn hơn nhưng không truyền được tham số nên class bắt buộc phải có constructor rỗng. Đây chính là cơ chế phía sau một DI container.' },
            ],},
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Đánh đổi khi dùng Activator',
          text: 'Mất hoàn toàn kiểm tra kiểu lúc biên dịch và chạy chậm hơn new. Chỉ dùng khi thật sự cần linh hoạt — điển hình là khi tự xây DI container ở buổi 15.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Đây chính là cơ chế phía sau một DI container',
            steps: [
              { kind: 'io', text: 'Nhận yêu cầu: cần một IHinhHoc' },
              { kind: 'process', text: 'Tra bảng đăng ký để biết class cài đặt tương ứng' },
              { kind: 'process', text: 'Activator.CreateInstance(type) tạo đối tượng' },
              { kind: 'end', text: 'Trả về đối tượng đã sẵn sàng' },
            ],
          },
        },
      ],
    },
  ],

  exercises: [

    {
      id: 'b14-1', level: 'Cơ bản', title: 'Abstract class DongVat',
      requirement: 'Chuyển DongVat thành abstract class: GioiThieu() cài đặt sẵn dùng chung, KeuNhuThe() để abstract buộc lớp con cài đặt. Thử tạo đối tượng trực tiếp từ lớp abstract và ghi lại lỗi.',
      signature: 'abstract class DongVat { void GioiThieu(); abstract string KeuNhuThe(); }',
      constraints: ['Phương thức abstract không có thân hàm'],
      examples: [
        { input: 'new Cho("Mực").KeuNhuThe()', output: '"Gâu gâu"' },
        { input: 'new DongVat("X")', output: 'Lỗi CS0144: không tạo được đối tượng từ lớp abstract' },
      ],
    },
    {
      id: 'b14-2', level: 'Cơ bản', title: 'Abstract class HinhHoc',
      requirement: 'Chuyển IHinhHoc thành abstract class HinhHoc: TinhChuVi và TinhDienTich để abstract, MoTa() cài đặt sẵn dùng chung cho mọi lớp con.',
      signature: 'abstract class HinhHoc { abstract double TinhChuVi(); string MoTa(); }',
      constraints: ['MoTa() chỉ được viết một lần ở lớp cha'],
      examples: [
        { input: 'new HinhTron(5).MoTa()', output: '"Hình HinhTron: chu vi 31.42, diện tích 78.54"' },
      ],
    },
    {
      id: 'b14-3', level: 'Trung bình', title: 'Abstract class có constructor',
      requirement: 'Abstract class NhanVien có constructor nhận mã và tên. Các lớp con gọi base(...). Chứng minh abstract class vẫn có constructor dù không tạo đối tượng trực tiếp được.',
      signature: 'abstract class NhanVien { protected NhanVien(string ma, string ten) }',
      constraints: ['Lớp con bắt buộc phải gọi base(...)'],
      examples: [
        { input: 'new NhanVienVanPhong("NV01", "An", 12tr).HienThi()', output: '"NV01 — An — 12.000.000 đ"' },
      ],
    },
    {
      id: 'b14-4', level: 'Trung bình', title: 'So sánh interface và abstract class',
      requirement: 'Giải cùng một bài toán hai lần: một lần bằng interface, một lần bằng abstract class. Liệt kê ưu nhược điểm của từng cách trong chính bài đó.',
      signature: 'interface IHinhHoc / abstract class HinhHoc',
      constraints: ['Phải chỉ ra ít nhất hai điểm khác biệt cụ thể trong code'],
      examples: [
        { input: 'Cần chia sẻ field dùng chung', output: 'Abstract class thắng — interface không chứa được field' },
        { input: 'Một lớp cần thuộc nhiều nhóm hành vi', output: 'Interface thắng — chỉ kế thừa được một class' },
      ],
    },
    {
      id: 'b14-5', level: 'Trung bình', title: 'Class generic Kho<T>',
      requirement: 'Viết class Kho<T> có Them, Xoa, Lay theo vị trí và SoLuong. Dùng thử với Kho<string> và Kho<SanPham>.',
      signature: 'class Kho<T> { void Them(T item); T Lay(int viTri); int SoLuong { get; } }',
      constraints: ['Không được dùng object rồi ép kiểu'],
      examples: [
        { input: 'var k = new Kho<string>(); k.Them("Clean Code"); k.Lay(0)', output: '"Clean Code"' },
        { input: 'var k = new Kho<int>(); k.Them("abc")', output: 'Lỗi biên dịch', explain: 'Generic giữ đúng kiểu nên sai kiểu là báo ngay lúc biên dịch.' },
      ],
    },
    {
      id: 'b14-6', level: 'Trung bình', title: 'Generic Stack<T>',
      requirement: 'Tự viết class NganXep<T> với Push, Pop, Peek, IsEmpty theo nguyên tắc vào sau ra trước. Pop trên ngăn xếp rỗng thì ném InvalidOperationException.',
      signature: 'class NganXep<T> { void Push(T); T Pop(); T Peek(); bool IsEmpty { get; } }',
      constraints: ['Bên trong dùng List<T>, thao tác ở cuối danh sách'],
      examples: [
        { input: 'Push(1); Push(2); Pop()', output: '2' },
        { input: 'NganXep rỗng, gọi Pop()', output: 'InvalidOperationException' },
      ],
    },
    {
      id: 'b14-7', level: 'Nâng cao', title: 'Phương thức generic có ràng buộc',
      requirement: 'Viết phương thức LayLonNhat<T> trả về giá trị lớn hơn trong hai tham số, với ràng buộc T phải so sánh được. Thử với int, string và một class tự viết.',
      signature: 'T LayLonNhat<T>(T a, T b) where T : IComparable<T>',
      constraints: ['Không được viết ba phiên bản riêng cho ba kiểu'],
      examples: [
        { input: 'LayLonNhat(3, 7)', output: '7' },
        { input: 'LayLonNhat("an", "binh")', output: '"binh"' },
      ],
    },
    {
      id: 'b14-8', level: 'Nâng cao', title: 'Generic có nhiều ràng buộc',
      requirement: 'Viết class Repository<T> where T : class, new() với Them, Xoa, TimTheoDieuKien. Giải thích ý nghĩa của từng ràng buộc trong khai báo.',
      signature: 'class Repository<T> where T : class, new()',
      constraints: ['Phải giải thích được vì sao cần new() khi muốn tự tạo đối tượng T'],
      examples: [
        { input: 'repo.TimTheoDieuKien(x => x.Gia > 100000)', output: 'Danh sách sản phẩm thoả điều kiện' },
        { input: 'Repository<int>', output: 'Lỗi biên dịch', explain: 'int là kiểu giá trị, vi phạm ràng buộc where T : class.' },
      ],
    },
    {
      id: 'b14-9', level: 'Nâng cao', title: 'Tạo đối tượng bằng Activator',
      requirement: 'Đọc tên class từ chuỗi người dùng nhập, dùng Type.GetType và Activator.CreateInstance để tạo đối tượng tương ứng rồi gọi TinhDienTich(). Tên không hợp lệ thì báo lỗi thân thiện thay vì để văng exception.',
      signature: 'double TaoVaTinh(string tenClass, params object[] thamSo)',
      constraints: ['Phải kèm namespace khi gọi Type.GetType', 'Không được để chương trình văng exception'],
      examples: [
        { input: 'tenClass = "HinhTron", thamSo = [5]', output: '78.54' },
        { input: 'tenClass = "HinhAo"', output: '-1', explain: 'Không tìm thấy kiểu thì trả về -1 thay vì ném lỗi.' },
      ],
      hint: 'Đây chính là cơ chế phía sau một DI container.',
    },
  ],
}

export default buoi14
