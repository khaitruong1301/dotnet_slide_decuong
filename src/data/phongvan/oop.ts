import type { InterviewSet } from '../types'

const oop: InterviewSet = {
  slug: 'huong-doi-tuong',
  title: 'Phỏng vấn: Hướng đối tượng',
  subtitle: 'Class, constructor, đóng gói, kế thừa, đa hình, interface, abstract, generic, SOLID',
  from: 9,
  to: 16,
  questions: [
    // ───────────────────────────── Cơ bản ─────────────────────────────
    {
      id: 'pv-oop-01',
      level: 'Cơ bản',
      question: 'Class và object khác nhau thế nào?',
      short:
        'Class là bản thiết kế: mô tả một loại đối tượng có những thuộc tính và hành vi gì. Object là một thực thể cụ thể tạo ra từ class bằng new, có dữ liệu riêng của nó. Một class tạo được bao nhiêu object cũng được.',
      answer: [
        {
          type: 'text',
          text: 'Class SanPham chỉ nói "sản phẩm có mã, tên, giá và biết tự hiển thị". Phải tới khi viết new SanPham(...) mới thật sự có một chiếc tivi cụ thể trong bộ nhớ. Class là kiểu dữ liệu do mình tự định nghĩa; object là một giá trị của kiểu đó.',
        },
        {
          type: 'code',
          sample: {
            title: 'Một class, hai object với dữ liệu riêng',
            code: `class SanPham                                   // class: bản thiết kế
{
    public string Ma { get; set; } = "";
    public string Ten { get; set; } = "";
    public decimal Gia { get; set; }

    public void HienThi() => Console.WriteLine($"{Ma} - {Ten}: {Gia:N0} đ");
}

SanPham tivi = new SanPham { Ma = "TV01", Ten = "Tivi Sony", Gia = 12_000_000m };
SanPham tuLanh = new SanPham { Ma = "TL01", Ten = "Tủ lạnh LG", Gia = 8_500_000m };

tivi.HienThi();      // TV01 - Tivi Sony: 12.000.000 đ
tuLanh.HienThi();    // TL01 - Tủ lạnh LG: 8.500.000 đ`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Khuôn và sản phẩm đúc ra từ khuôn',
            columns: [
              { title: 'Class — bản thiết kế', tone: 'plain', items: ['Khai báo một lần bằng từ khoá class', 'Mô tả thuộc tính và phương thức', 'Bản thân nó chưa chứa dữ liệu của sản phẩm nào', 'Ví dụ: SanPham, KhachHang, DonHang'] },
              { title: 'Object — thực thể', tone: 'good', items: ['Tạo bằng new, tạo bao nhiêu cũng được', 'Mỗi object giữ dữ liệu riêng trên heap', 'Biến chỉ giữ tham chiếu (địa chỉ) tới object', 'Ví dụ: tivi, tuLanh'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Thêm một ý để ăn điểm',
          text: 'Nói luôn "class là kiểu tham chiếu": gán b = a thì hai biến cùng trỏ một object, sửa qua b thì a thấy ngay. Người phỏng vấn gần như chắc chắn sẽ hỏi tiếp ý này.',
        },
      ],
      followUps: [
        'Gán SanPham b = a rồi sửa b.Gia thì a.Gia có đổi không? Vì sao?',
        'Đọc một đề bài, làm sao tìm ra cần những class nào?',
      ],
      buoi: [9],
    },
    {
      id: 'pv-oop-02',
      level: 'Cơ bản',
      question: 'Kể các access modifier trong C#. Không ghi gì thì mặc định là gì?',
      short:
        'Có public, private, protected, internal và hai tổ hợp protected internal, private protected. Thành viên trong class không ghi gì là private; class khai báo thẳng trong namespace không ghi gì là internal.',
      answer: [
        {
          type: 'table',
          head: ['Modifier', 'Truy cập được từ', 'Hay dùng cho'],
          rows: [
            ['public', 'Mọi nơi', 'Property, phương thức là "mặt tiền" của class'],
            ['private', 'Chỉ bên trong class đó', 'Field dữ liệu, hàm phụ trợ nội bộ'],
            ['protected', 'Trong class và các lớp con', 'Phần lớp con cần dùng lại khi kế thừa'],
            ['internal', 'Mọi nơi trong cùng project (assembly)', 'Class chỉ dùng nội bộ một project'],
            ['protected internal', 'Cùng project HOẶC lớp con ở project khác', 'Ít gặp'],
            ['private protected', 'Lớp con nằm trong cùng project', 'Ít gặp'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'Mặc định và lỗi khi truy cập sai',
            code: `class KhachHang                      // không ghi gì → internal
{
    string matKhau = "";             // không ghi gì → private
    protected int diemThuong;        // lớp con KhachHangVip dùng được
    public string Ten { get; set; } = "";

    public bool DangNhap(string mk) => mk == matKhau;
}

var kh = new KhachHang();
kh.Ten = "An";                       // được
// kh.matKhau = "123";               // LỖI CS0122 — không truy cập được do mức bảo vệ
// kh.diemThuong = 10;               // LỖI — protected chỉ mở cho lớp con`,
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Nguyên tắc nên nói ra',
          text: 'Mặc định để private, chỉ mở rộng khi thật sự cần. Field gần như luôn private; bên ngoài đi qua property hoặc phương thức — đó chính là tính đóng gói.',
        },
      ],
      followUps: [
        'protected khác private ở điểm nào khi có kế thừa?',
        'Vì sao không nên để field public?',
      ],
      buoi: [9, 12],
    },
    {
      id: 'pv-oop-03',
      level: 'Cơ bản',
      question: 'Constructor là gì? Từ khoá this dùng để làm gì?',
      short:
        'Constructor là phương thức đặc biệt trùng tên class, không có kiểu trả về, tự chạy khi new để đối tượng ra đời đã ở trạng thái hợp lệ. this là chính đối tượng hiện tại: dùng để phân biệt field với tham số trùng tên, hoặc viết : this(...) để gọi một constructor khác của cùng class.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Constructor có kiểm tra, nạp chồng và this(...)',
            code: `class SanPham
{
    private string ma;
    private string ten;
    private decimal gia;

    public SanPham(string ma, string ten, decimal gia)
    {
        if (gia < 0) throw new ArgumentException("Giá không được âm");
        this.ma = ma;          // this.ma là field, ma là tham số
        this.ten = ten;
        this.gia = gia;
    }

    // Nạp chồng: chưa có giá thì chuyển sang constructor đầy đủ
    public SanPham(string ma, string ten) : this(ma, ten, 0) { }
}

var tivi = new SanPham("TV01", "Tivi Sony", 12_000_000m);
var hangMau = new SanPham("TL01", "Tủ lạnh LG");
// var rong = new SanPham();   // LỖI biên dịch — không còn constructor rỗng`,
            note: 'Luật kiểm tra chỉ viết một chỗ. Constructor hai tham số không chép lại code mà chuyển tiếp bằng this(...).',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Chuyện gì xảy ra khi gặp new',
            steps: [
              { kind: 'start', text: 'Gặp new SanPham(...)' },
              { kind: 'process', text: 'Cấp phát vùng nhớ cho đối tượng trên heap' },
              { kind: 'process', text: 'Mọi field nhận giá trị mặc định (0, null, false)' },
              { kind: 'process', text: 'Chạy constructor: kiểm tra và gán dữ liệu thật' },
              { kind: 'end', text: 'Trả về tham chiếu tới đối tượng đã sẵn sàng' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Viết constructor có tham số là mất constructor rỗng',
          text: 'C# chỉ tự sinh constructor không tham số khi class chưa có constructor nào. Vừa thêm SanPham(string ma, ...) là new SanPham() báo lỗi biên dịch — muốn giữ thì phải tự viết thêm.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Biết thêm C# 12',
          text: 'C# 12 có primary constructor: class SanPham(string ma, string ten) { ... } — tham số dùng được trong toàn bộ class. Nhắc tới là điểm cộng, nhưng vẫn phải giải thích được constructor kiểu truyền thống.',
        },
      ],
      followUps: [
        'Constructor để private được không? Dùng vào việc gì?',
        'Lớp con gọi constructor của lớp cha bằng cách nào?',
        'Static constructor chạy khi nào và chạy mấy lần?',
      ],
      buoi: [10],
    },
    {
      id: 'pv-oop-04',
      level: 'Cơ bản',
      question: 'Field khác property thế nào? Vì sao nên dùng property thay vì để field public?',
      short:
        'Field là biến chứa dữ liệu của đối tượng. Property là cặp get/set bọc quanh dữ liệu: bên ngoài dùng như một biến, nhưng bên trong chạy được code kiểm tra, chỉ cho đọc, hoặc tính toán. Giấu field private và mở cửa bằng property chính là tính đóng gói.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Các kiểu property hay gặp',
            code: `class SanPham
{
    private decimal gia;                          // field: chỗ chứa dữ liệu, để private

    public decimal Gia                            // property: cửa ra vào có kiểm soát
    {
        get => gia;
        set
        {
            if (value < 0) throw new ArgumentException("Giá không được âm");
            gia = value;
        }
    }

    public string Ma { get; }                     // chỉ đọc, gán trong constructor
    public string Ten { get; set; } = "";         // auto-property
    public int SoLuong { get; private set; }      // ngoài đọc được, chỉ class tự đổi
    public DateTime NgayNhap { get; init; }       // gán lúc tạo đối tượng rồi khoá
    public decimal ThanhTien => Gia * SoLuong;    // property tính toán, không lưu

    public SanPham(string ma) => Ma = ma;
    public void NhapKho(int sl) => SoLuong += sl;
}`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'sp.Gia = -5 đi qua property',
            steps: [
              { kind: 'io', text: 'sp.Gia = -5' },
              { kind: 'process', text: 'Nhảy vào khối set, value = -5' },
              {
                kind: 'decision',
                text: 'value >= 0 ?',
                branches: [
                  { label: 'Đúng', steps: [{ kind: 'process', text: 'Ghi vào field gia' }] },
                  { label: 'Sai', steps: [{ kind: 'end', text: 'Ném ArgumentException, field giữ nguyên' }] },
                ],
              },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Lý do thực tế, không chỉ lý thuyết',
          text: 'System.Text.Json, data binding của Blazor và EF Core đều làm việc với property chứ không phải field. Ngoài ra đổi field public thành property về sau làm vỡ tương thích nhị phân với code đã biên dịch — nên dùng property ngay từ đầu.',
        },
      ],
      followUps: [
        'init khác private set ở điểm nào?',
        'Auto-property { get; set; } không có kiểm tra gì thì có còn là đóng gói không?',
      ],
      buoi: [11],
    },
    {
      id: 'pv-oop-05',
      level: 'Cơ bản',
      question: 'static là gì? Khi nào nên dùng static class?',
      short:
        'Thành viên static thuộc về class chứ không thuộc từng đối tượng: chỉ có một bản dùng chung, gọi qua tên class, tồn tại kể cả khi chưa new đối tượng nào. static class chỉ chứa thành viên static và không new được — dùng cho hàm tiện ích không cần trạng thái riêng (Math, File) hoặc để chứa extension method.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'boxes',
            caption: 'Mỗi đơn hàng giữ mã riêng, bộ đếm static chỉ có một bản',
            items: [
              { label: 'don1.Ma', value: '"DH001"', note: 'của riêng don1' },
              { label: 'don2.Ma', value: '"DH002"', note: 'của riêng don2' },
              { label: 'DonHang.dem', value: '2', note: 'static — cả class dùng chung' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Biến đếm static và một static class tiện ích',
            code: `class DonHang
{
    private static int dem = 0;               // một bản cho cả class
    public string Ma { get; }

    public DonHang()
    {
        dem++;
        Ma = $"DH{dem:D3}";                   // DH001, DH002...
    }

    public static int SoDonDaTao() => dem;    // gọi qua tên class
}

static class TienTe                           // không new được, chỉ chứa static
{
    public static string Vnd(decimal so) => $"{so:N0} đ";
}

var don1 = new DonHang();
var don2 = new DonHang();
Console.WriteLine(DonHang.SoDonDaTao());      // 2
Console.WriteLine(TienTe.Vnd(1_500_000m));    // 1.500.000 đ`,
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Hai giới hạn cần nói ra',
          text: 'Trong phương thức static không có this nên không đọc được field thường. Và static là trạng thái chung toàn ứng dụng: lạm dụng biến static làm code khó test, dễ lỗi khi nhiều luồng cùng ghi — trong ASP.NET Core thường thay bằng service đăng ký Singleton qua DI.',
        },
      ],
      followUps: [
        'Static constructor chạy khi nào, mấy lần?',
        'Vì sao extension method phải nằm trong static class?',
        'static class có kế thừa hay được kế thừa không?',
      ],
      buoi: [11],
    },
    {
      id: 'pv-oop-06',
      level: 'Cơ bản',
      question: 'const khác readonly thế nào?',
      short:
        'const là hằng số lúc biên dịch: gán ngay khi khai báo, ngầm định static, chỉ dùng cho số, bool, char, string, enum. readonly là field chỉ gán được khi khai báo hoặc trong constructor; giá trị có thể tính lúc chạy và mỗi đối tượng có thể khác nhau.',
      answer: [
        {
          type: 'table',
          head: ['Tiêu chí', 'const', 'readonly'],
          rows: [
            ['Gán giá trị', 'Ngay khi khai báo', 'Khi khai báo hoặc trong constructor'],
            ['Có giá trị lúc', 'Biên dịch', 'Chạy'],
            ['Thuộc về', 'Class (ngầm định static)', 'Từng đối tượng (hoặc class nếu static readonly)'],
            ['Kiểu dùng được', 'Số, bool, char, string, enum', 'Mọi kiểu'],
            ['Ví dụ', 'const decimal VAT = 0.1m;', 'readonly string ma;  static readonly DateTime NgayChay = DateTime.Now;'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'readonly khoá biến, không khoá đối tượng bên trong',
            code: `class DonHang
{
    public const decimal PHI_SHIP_TOI_THIEU = 15_000m;   // biết trước lúc biên dịch
    private readonly string ma;                          // mỗi đơn một mã, gán xong khoá
    private readonly List<string> ghiChu = new();

    public DonHang(string ma) => this.ma = ma;           // hợp lệ: đang trong constructor

    public void Sua()
    {
        // ma = "DH999";                     // LỖI — readonly chỉ gán trong constructor
        ghiChu.Add("Giao giờ hành chính");   // VẪN ĐƯỢC — nội dung list không bị khoá
        // ghiChu = new();                   // LỖI — không trỏ sang list khác được
    }
}`,
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Bẫy: readonly List vẫn Add được',
          text: 'readonly với kiểu tham chiếu chỉ cấm gán lại biến, không cấm sửa đối tượng nó trỏ tới. Muốn bên ngoài không sửa được nội dung thì trả ra IReadOnlyList<T> hoặc dùng ImmutableList<T>.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Ý ăn điểm',
          text: 'Giá trị const được chép thẳng vào chỗ dùng lúc biên dịch. Đổi const trong một thư viện mà project dùng nó không build lại thì project đó vẫn giữ giá trị cũ. Giá trị có thể đổi theo thời gian (thuế suất, phí ship) nên dùng static readonly.',
        },
      ],
      followUps: [
        'Vì sao viết const DateTime Hom = DateTime.Now; lại lỗi?',
        'static readonly khác const ở đâu?',
      ],
      buoi: [11],
    },

    // ─────────────────────────── Trung bình ───────────────────────────
    {
      id: 'pv-oop-07',
      level: 'Trung bình',
      question: 'struct khác class thế nào? Khi nào nên dùng struct?',
      short:
        'class là kiểu tham chiếu: đối tượng nằm trên heap, gán biến là chép địa chỉ, hỗ trợ kế thừa và null. struct là kiểu giá trị: dữ liệu nằm ngay trong biến, gán là chép toàn bộ, không kế thừa được (chỉ cài interface). Dùng struct cho giá trị nhỏ, bất biến, mang nghĩa "một giá trị" như toạ độ, kích thước, tiền tệ.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Gán struct chép giá trị, gán class chép địa chỉ',
            code: `struct KichThuoc { public int Rong; }        // kiểu giá trị
class SanPham { public int SoLuong; }        // kiểu tham chiếu

KichThuoc k1 = new KichThuoc { Rong = 50 };
KichThuoc k2 = k1;          // chép nguyên giá trị sang ô nhớ mới
k2.Rong = 65;

SanPham p1 = new SanPham { SoLuong = 3 };
SanPham p2 = p1;            // chép địa chỉ — cùng trỏ một đối tượng
p2.SoLuong = 10;

Console.WriteLine($"{k1.Rong} {p1.SoLuong}");   // 50 10`,
            trace: [
              { line: 4, vars: { k1: '{ Rong: 50 }' }, note: 'Dữ liệu struct nằm ngay trong biến k1, không có địa chỉ nào cả.' },
              { line: 5, vars: { k1: '{ Rong: 50 }', k2: '{ Rong: 50 }' }, note: 'Gán struct là chép toàn bộ dữ liệu: k2 là một bản độc lập.' },
              { line: 6, vars: { k1: '{ Rong: 50 }', k2: '{ Rong: 65 }' }, note: 'Sửa k2 không ảnh hưởng gì tới k1.' },
              { line: 8, vars: { k1: '{ Rong: 50 }', k2: '{ Rong: 65 }', p1: '→ 0x400' }, heap: { '0x400': 'SanPham { SoLuong: 3 }' }, refs: { p1: '0x400' }, note: 'Đối tượng class nằm trên heap, biến p1 chỉ giữ địa chỉ.' },
              { line: 9, vars: { k1: '{ Rong: 50 }', k2: '{ Rong: 65 }', p1: '→ 0x400', p2: '→ 0x400' }, heap: { '0x400': 'SanPham { SoLuong: 3 }' }, refs: { p1: '0x400', p2: '0x400' }, note: 'Gán class là chép ĐỊA CHỈ: hai biến, một đối tượng.' },
              { line: 10, vars: { k1: '{ Rong: 50 }', k2: '{ Rong: 65 }', p1: '→ 0x400', p2: '→ 0x400' }, heap: { '0x400': 'SanPham { SoLuong: 10 }' }, refs: { p1: '0x400', p2: '0x400' }, note: 'Sửa qua p2 thì p1 thấy ngay, vì chỉ có một đối tượng.' },
              { line: 12, vars: { k1: '{ Rong: 50 }', k2: '{ Rong: 65 }', p1: '→ 0x400', p2: '→ 0x400' }, heap: { '0x400': 'SanPham { SoLuong: 10 }' }, refs: { p1: '0x400', p2: '0x400' }, output: ['50 10'], note: 'k1 giữ nguyên 50, còn p1 đã thành 10.' },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Hai họ kiểu dữ liệu trong C#',
            columns: [
              { title: 'class — kiểu tham chiếu', tone: 'plain', items: ['Đối tượng trên heap, biến giữ địa chỉ', 'Gán / truyền tham số: chép địa chỉ', 'Kế thừa được, có virtual / override', 'Mang giá trị null được', 'Ví dụ: SanPham, KhachHang, List<T>'] },
              { title: 'struct — kiểu giá trị', tone: 'plain', items: ['Dữ liệu nằm ngay trong biến', 'Gán / truyền tham số: chép toàn bộ', 'Không kế thừa, chỉ cài interface', 'Không null (trừ khi viết KichThuoc?)', 'Ví dụ: int, decimal, DateTime, Guid'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Khi nào chọn struct',
          text: 'Nhỏ (vài field), bất biến (nên khai báo readonly struct), sống ngắn và mang nghĩa một giá trị. Struct lớn mà bị chép liên tục còn chậm hơn class. Ép struct về object hoặc interface sẽ bị boxing — tạo một bản sao trên heap.',
        },
      ],
      followUps: [
        'Boxing và unboxing là gì? Vì sao ảnh hưởng hiệu năng?',
        'record class và record struct khác gì class và struct thường?',
      ],
      buoi: [9],
    },
    {
      id: 'pv-oop-08',
      level: 'Trung bình',
      question: 'Nạp chồng (overloading) khác ghi đè (overriding) thế nào? Đa hình lúc biên dịch và lúc chạy là gì?',
      short:
        'Overloading: nhiều phương thức cùng tên nhưng khác danh sách tham số; trình biên dịch chọn bản nào ngay lúc build — đa hình lúc biên dịch. Overriding: lớp con viết lại phương thức virtual/abstract của lớp cha với cùng chữ ký; bản nào chạy được quyết định lúc chạy theo kiểu thật của đối tượng — đa hình lúc chạy.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Cùng là "một tên nhiều cách làm" nhưng quyết định ở hai thời điểm khác nhau',
            columns: [
              { title: 'Overloading — lúc biên dịch', tone: 'plain', items: ['Cùng tên, khác danh sách tham số', 'Thường nằm trong cùng một class', 'Trình biên dịch chọn bản theo đối số truyền vào', 'GiamGia(gia) và GiamGia(gia, phanTram)'] },
              { title: 'Overriding — lúc chạy', tone: 'good', items: ['Cùng chữ ký, khác cài đặt', 'Lớp cha virtual / abstract, lớp con override', 'Chọn theo kiểu THẬT của đối tượng', 'Đây mới là đa hình theo nghĩa OOP'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Hai cơ chế trong cùng một ví dụ',
            code: `class KhuyenMai
{
    // Nạp chồng — trình biên dịch nhìn đối số để chọn bản
    public decimal GiamGia(decimal gia) => gia * 0.95m;
    public decimal GiamGia(decimal gia, decimal phanTram) => gia * (1 - phanTram / 100);
}

class SanPham
{
    public decimal GiaNhap { get; init; }
    public virtual decimal TinhGiaBan() => GiaNhap * 1.1m;
}
class DienTu : SanPham
{
    // Ghi đè — chọn lúc chạy theo kiểu thật
    public override decimal TinhGiaBan() => GiaNhap * 1.2m;
}

var km = new KhuyenMai();
km.GiamGia(1_000_000m);          // bản 1 tham số, chốt từ lúc biên dịch
km.GiamGia(1_000_000m, 10);      // bản 2 tham số

SanPham sp = new DienTu { GiaNhap = 1_000_000m };
Console.WriteLine($"{sp.TinhGiaBan():N0}");   // 1.200.000 — bản của DienTu dù biến kiểu SanPham`,
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Khác kiểu trả về không phải là nạp chồng',
          text: 'decimal Tinh(int a) và int Tinh(int a) trong cùng class là lỗi biên dịch. Nạp chồng chỉ dựa vào danh sách tham số: số lượng, kiểu và thứ tự.',
        },
      ],
      followUps: [
        'Lớp cha không đánh dấu virtual thì lớp con có override được không?',
        'Lớp con thêm một bản GiamGia khác tham số thì đó là nạp chồng hay ghi đè?',
      ],
      buoi: [10, 12, 13],
    },
    {
      id: 'pv-oop-09',
      level: 'Trung bình',
      question: 'Khi new một lớp con, constructor nào chạy trước? Đoạn code sau in ra gì, và base dùng để làm gì?',
      short:
        'Constructor chạy từ lớp cha trên cùng xuống lớp con: : base(...) được gọi trước thân constructor lớp con, vì phần của lớp cha phải sẵn sàng trước. Đoạn code in SanPham, DienTu, Tivi rồi "Mã: TV01" và "Màn hình: 55 inch". base(...) gọi constructor lớp cha; base.HienThi() gọi lại bản gốc của lớp cha bên trong bản override.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Đoạn code này in ra gì?',
            code: `class SanPham
{
    protected string ma;
    public SanPham(string ma)
    {
        this.ma = ma;
        Console.WriteLine("SanPham");
    }
    public virtual void HienThi() => Console.WriteLine($"Mã: {ma}");
}

class DienTu : SanPham
{
    public DienTu(string ma) : base(ma) => Console.WriteLine("DienTu");
}

class Tivi : DienTu
{
    private int inch;
    public Tivi(string ma, int inch) : base(ma)
    {
        this.inch = inch;
        Console.WriteLine("Tivi");
    }
    public override void HienThi()
    {
        base.HienThi();                              // giữ phần của lớp cha
        Console.WriteLine($"Màn hình: {inch} inch");
    }
}

new Tivi("TV01", 55).HienThi();`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Thứ tự chạy — chỉ có MỘT đối tượng Tivi trên heap, ba tầng cùng ghi vào nó',
            items: [
              { label: 'SanPham(ma)', text: 'Tầng trên cùng chạy trước: gán ma, in "SanPham"' },
              { label: 'DienTu(ma)', text: 'Quay xuống thân DienTu: in "DienTu"' },
              { label: 'Tivi(ma, inch)', text: 'Cuối cùng mới tới thân lớp con: gán inch, in "Tivi"' },
              { label: 'HienThi()', text: 'Bản override của Tivi chạy; base.HienThi() in "Mã: TV01" rồi in "Màn hình: 55 inch"' },
            ],
          },
        },
        {
          type: 'table',
          head: ['Từ khoá', 'Ý nghĩa'],
          rows: [
            [': LopCha', 'Khai báo kế thừa — C# chỉ cho kế thừa MỘT class'],
            ['base(...)', 'Gọi constructor của lớp cha, chạy trước thân constructor lớp con'],
            ['base.TenHam()', 'Gọi bản gốc ở lớp cha, thường dùng trong bản override'],
            ['protected', 'Lớp con dùng được, bên ngoài thì không'],
            ['sealed', 'Đặt trên class: cấm kế thừa tiếp. Đặt trên override: cấm lớp cháu override tiếp'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Lớp cha không có constructor rỗng',
          text: 'SanPham chỉ có SanPham(string ma) thì lớp con BẮT BUỘC viết : base(ma). Bỏ đi là lỗi biên dịch, vì C# ngầm gọi base() mà lớp cha lại không có constructor đó.',
        },
      ],
      followUps: [
        'new Tivi(...) tạo ra mấy đối tượng trên heap?',
        'C# không cho đa kế thừa class, vậy muốn một class có thêm nhiều nhóm hành vi thì làm sao?',
      ],
      buoi: [12],
    },
    {
      id: 'pv-oop-10',
      level: 'Trung bình',
      question: 'override khác new (che giấu phương thức) thế nào? Đoạn code sau in ra gì?',
      short:
        'override thay hẳn bản của lớp cha: gọi qua biến kiểu nào thì vẫn chạy bản theo kiểu THẬT của đối tượng. new chỉ che bản của lớp cha: bản nào chạy phụ thuộc kiểu KHAI BÁO của biến. Đoạn code in: Tivi, Hàng chính hãng, Tivi, Tivi 4K.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Bốn dòng in ra gì?',
            code: `class SanPham
{
    public virtual string Loai() => "Sản phẩm";
    public string MoTa() => "Hàng chính hãng";
}

class Tivi : SanPham
{
    public override string Loai() => "Tivi";
    public new string MoTa() => "Tivi 4K";
}

SanPham a = new Tivi();
Tivi b = new Tivi();

Console.WriteLine(a.Loai());
Console.WriteLine(a.MoTa());
Console.WriteLine(b.Loai());
Console.WriteLine(b.MoTa());`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'uml',
            caption: 'Loai() được ghi đè, MoTa() chỉ bị che',
            relation: 'inherit',
            parent: { name: 'SanPham', methods: ['+ Loai() : string  (virtual)', '+ MoTa() : string'] },
            children: [{ name: 'Tivi', methods: ['+ Loai() : string  (override)', '+ MoTa() : string  (new)'] }],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'boxes',
            caption: 'Kết quả từng dòng',
            items: [
              { label: 'a.Loai()', value: '"Tivi"', note: 'override → theo kiểu thật Tivi' },
              { label: 'a.MoTa()', value: '"Hàng chính hãng"', note: 'new → theo kiểu khai báo SanPham' },
              { label: 'b.Loai()', value: '"Tivi"', note: 'override' },
              { label: 'b.MoTa()', value: '"Tivi 4K"', note: 'kiểu khai báo là Tivi' },
            ],
          },
        },
        {
          type: 'table',
          head: ['Tiêu chí', 'override', 'new'],
          rows: [
            ['Lớp cha cần', 'virtual, abstract hoặc override', 'Không cần gì'],
            ['Quyết định theo', 'Kiểu thật của đối tượng (lúc chạy)', 'Kiểu khai báo của biến (lúc biên dịch)'],
            ['Đa hình', 'Có', 'Không — phá đa hình'],
            ['Khi nào dùng', 'Gần như mọi trường hợp', 'Hiếm: lớp cha của thư viện thêm một hàm trùng tên với hàm có sẵn của mình'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Quên cả override lẫn new',
          text: 'Lớp con viết trùng chữ ký mà không ghi gì thì C# xử lý như new và chỉ cảnh báo (CS0108, hoặc CS0114 nếu bản cha là virtual). Code vẫn chạy nhưng đa hình mất mà không ai hay — đừng bỏ qua cảnh báo này.',
        },
      ],
      followUps: [
        'sealed override dùng để làm gì?',
        'Muốn bản override vẫn chạy phần code của lớp cha thì viết thế nào?',
      ],
      buoi: [12, 13],
    },
    {
      id: 'pv-oop-11',
      level: 'Trung bình',
      question: 'is, as và ép kiểu trực tiếp khác nhau thế nào? Pattern matching giúp gì?',
      short:
        'Ép kiểu (DienTu)sp ném InvalidCastException nếu sai kiểu. as trả về null thay vì ném lỗi, chỉ dùng cho kiểu tham chiếu hoặc nullable. is trả về bool; viết sp is DienTu dt vừa kiểm tra vừa có sẵn biến đúng kiểu — cách nên dùng, kết hợp switch expression khi có nhiều nhánh.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Ba cách lấy ra DienTu từ một biến kiểu SanPham',
            columns: [
              { title: '(DienTu)sp', tone: 'bad', items: ['Sai kiểu → InvalidCastException', 'Chỉ dùng khi chắc chắn 100%'] },
              { title: 'sp as DienTu', tone: 'plain', items: ['Sai kiểu → null', 'Phải kiểm tra null ngay sau đó', 'Không dùng được với int hay struct thường'] },
              { title: 'sp is DienTu dt', tone: 'good', items: ['Trả về bool, không ném lỗi', 'Có sẵn biến dt đã đúng kiểu', 'Gọn và an toàn — nên dùng'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Từ ép kiểu tới switch expression',
            code: `SanPham? sp = cuaHang.Tim("TV01");

// 1. Ép kiểu trực tiếp
DienTu dt1 = (DienTu)sp;                  // sp là GiaDung → InvalidCastException

// 2. as
DienTu? dt2 = sp as DienTu;               // sai kiểu → null
if (dt2 != null) Console.WriteLine(dt2.KichCoInch);

// 3. is + khai báo biến
if (sp is DienTu dt3 && dt3.KichCoInch >= 65)
    Console.WriteLine("Tivi màn hình lớn");

// 4. switch expression theo kiểu và theo property
string nhan = sp switch
{
    DienTu { KichCoInch: >= 65 } => "Điện tử cỡ lớn",
    DienTu                       => "Điện tử",
    DienLanh dl                  => $"Điện lạnh {dl.CongSuatW} W",
    null                         => "Không tìm thấy",
    _                            => "Hàng khác",
};`,
            note: 'Các nhánh switch xét từ trên xuống: nhánh cụ thể (DienTu cỡ lớn) phải đứng trước nhánh tổng quát (DienTu).',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Kiểm tra kiểu nhiều là mùi thiết kế',
          text: 'Viết if (sp is DienTu) … else if (sp is DienLanh) … để tính giá nghĩa là hành vi đó nên là phương thức virtual trong từng lớp — chỉ cần gọi sp.TinhGiaBan(). Thêm nhóm hàng mới lại phải sửa chuỗi if: vi phạm Open/Closed. Pattern matching hợp lý ở chỗ ranh giới như ghi file JSON hay hiển thị.',
        },
      ],
      followUps: [
        'sp.GetType() == typeof(DienTu) khác sp is DienTu ở đâu?',
        'Vì sao as không dùng được với int?',
      ],
      buoi: [13, 16],
    },
    {
      id: 'pv-oop-12',
      level: 'Trung bình',
      question: 'Abstract class khác interface thế nào? Khi nào dùng cái nào?',
      short:
        'Cả hai đều không new trực tiếp được và đều đặt ra hợp đồng cho lớp con. Abstract class là lớp cha dở dang: có field, constructor, code dùng chung kèm phương thức abstract bắt lớp con viết — mỗi class chỉ kế thừa một. Interface là hợp đồng về khả năng "làm được gì", không có trạng thái, một class cài được nhiều interface.',
      answer: [
        {
          type: 'table',
          head: ['Tiêu chí', 'Abstract class', 'Interface'],
          rows: [
            ['new trực tiếp', 'Không', 'Không'],
            ['Field, constructor', 'Có', 'Không có field của đối tượng, không có constructor'],
            ['Phương thức có thân', 'Có, cộng thêm phương thức abstract', 'Chủ yếu chỉ khai báo; từ C# 8 cho phép thân mặc định'],
            ['Số lượng', 'Mỗi class kế thừa đúng một', 'Một class cài bao nhiêu cũng được'],
            ['Access modifier thành viên', 'Tuỳ ý (protected, private…)', 'Mặc định public'],
            ['Quan hệ', '"Là một" — cùng họ', '"Làm được" — khác họ vẫn dùng chung'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'Dùng cả hai cùng lúc',
            code: `abstract class SanPham
{
    public string Ma { get; }
    public decimal GiaNhap { get; }

    protected SanPham(string ma, decimal giaNhap)    // có constructor, có trạng thái
    {
        Ma = ma;
        GiaNhap = giaNhap;
    }

    public abstract decimal TinhGiaBan();                    // bắt lớp con viết
    public string MoTa() => $"{Ma}: {TinhGiaBan():N0} đ";    // code dùng chung
}

interface ILapDat                                            // một khả năng, không dữ liệu
{
    decimal PhiLapDat();
}

class MayLanh : SanPham, ILapDat     // một lớp cha + bao nhiêu interface cũng được
{
    public MayLanh(string ma, decimal gia) : base(ma, gia) { }
    public override decimal TinhGiaBan() => GiaNhap * 1.15m;
    public decimal PhiLapDat() => 300_000m;
}`,
            note: 'Thứ tự khai báo: lớp cha đứng đầu, sau đó mới tới các interface.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Chọn abstract class hay interface',
            steps: [
              { kind: 'io', text: 'Có một nhóm lớp cần chung một hợp đồng' },
              {
                kind: 'decision',
                text: 'Các lớp có chung dữ liệu (field) và code không?',
                branches: [
                  {
                    label: 'Có',
                    steps: [
                      {
                        kind: 'decision',
                        text: 'Lớp cha có phần bắt buộc lớp con tự viết không?',
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
        {
          type: 'callout',
          tone: 'tip',
          title: 'Câu chốt khi trả lời',
          text: 'Abstract class cho quan hệ "là một" và chia sẻ code (MayLanh là một SanPham). Interface cho quan hệ "làm được" (máy lạnh, tivi treo tường đều lắp đặt được). Phân vân thì chọn interface vì ít ràng buộc hơn — và DI trong ASP.NET Core đăng ký service theo interface.',
        },
      ],
      followUps: [
        'Từ C# 8 interface có thân mặc định rồi, vậy abstract class còn cần không?',
        'Abstract class có constructor để làm gì khi không new được?',
      ],
      buoi: [13, 14],
    },
    {
      id: 'pv-oop-13',
      level: 'Trung bình',
      question: 'Generic là gì, vì sao List<T> tốt hơn ArrayList? Ràng buộc where dùng để làm gì?',
      short:
        'Generic cho phép viết class hoặc phương thức một lần với kiểu dữ liệu là tham số T, lúc dùng mới chỉ định T cụ thể. So với lưu object, generic an toàn kiểu ngay lúc biên dịch, không phải ép kiểu, không boxing với kiểu giá trị. where giới hạn T được phép là gì, nhờ đó bên trong gọi được thành viên của kiểu đó.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Vì sao List<T> thay thế ArrayList',
            columns: [
              { title: 'ArrayList — lưu object', tone: 'bad', items: ['Thêm được mọi thứ: tivi, chuỗi, số', 'Lấy ra phải ép kiểu (SanPham)ds[0]', 'Sai kiểu → lỗi lúc CHẠY', 'int bị boxing thành object'] },
              { title: 'List<T> — generic', tone: 'good', items: ['Chỉ nhận đúng kiểu T', 'Lấy ra dùng ngay, không ép kiểu', 'Sai kiểu → lỗi lúc BIÊN DỊCH', 'List<int> lưu int trực tiếp'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Kho<T> chỉ nhận sản phẩm',
            code: `class Kho<T> where T : SanPham                 // T phải là SanPham hoặc lớp con
{
    private readonly List<T> ds = new();

    public void Them(T sp) => ds.Add(sp);
    public T? Tim(string ma) => ds.FirstOrDefault(x => x.Ma == ma);   // gọi được .Ma nhờ where
    public decimal TongGiaTri() => ds.Sum(x => x.GiaNhap * x.SoLuong);
}

var khoTivi = new Kho<DienTu>();
khoTivi.Them(new DienTu("TV01", "Tivi Sony", 12_000_000m, 5, 55));
DienTu? tv = khoTivi.Tim("TV01");             // không cần ép kiểu
// khoTivi.Them(new GiaDung(...));            // LỖI biên dịch — sai kiểu
// var k = new Kho<string>();                 // LỖI — string không phải SanPham

static T TaoMau<T>() where T : new() => new T();   // new() cho phép viết new T()`,
          },
        },
        {
          type: 'table',
          head: ['Ràng buộc', 'T phải là'],
          rows: [
            ['where T : class', 'Kiểu tham chiếu'],
            ['where T : struct', 'Kiểu giá trị không nullable'],
            ['where T : new()', 'Có constructor public không tham số (phải đứng cuối danh sách ràng buộc)'],
            ['where T : SanPham', 'SanPham hoặc lớp con của nó'],
            ['where T : IComparable<T>', 'Kiểu có cài interface đó'],
          ],
        },
      ],
      followUps: [
        'Viết T TimMax<T>(List<T> ds) thì cần ràng buộc gì để so sánh được hai phần tử?',
        'default(T) trả về gì khi T là int, khi T là SanPham?',
      ],
      buoi: [14],
    },
    {
      id: 'pv-oop-14',
      level: 'Trung bình',
      question: 'Nêu bốn tính chất của OOP, mỗi tính chất một ví dụ. Đóng gói khác trừu tượng chỗ nào?',
      short:
        'Đóng gói: giấu dữ liệu, chỉ mở qua property hoặc phương thức có kiểm soát. Kế thừa: lớp con dùng lại phần chung của lớp cha. Đa hình: cùng một lời gọi, mỗi đối tượng làm theo cách riêng. Trừu tượng: chỉ lộ ra "làm được gì", giấu "làm thế nào". Đóng gói giấu DỮ LIỆU, trừu tượng giấu CÁCH LÀM.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'boxes',
            caption: 'Bốn tính chất trong bài cửa hàng điện máy',
            items: [
              { label: 'Đóng gói', value: 'private giaNhap + property có kiểm tra', note: 'Không ai gán được giá âm' },
              { label: 'Kế thừa', value: 'class Tivi : SanPham', note: 'Mã, tên, giá viết một lần ở lớp cha' },
              { label: 'Đa hình', value: 'foreach (var sp in ds) sp.TinhGiaBan()', note: 'Mỗi nhóm hàng một công thức' },
              { label: 'Trừu tượng', value: 'abstract decimal TinhGiaBan();', note: 'Gọi được mà không cần biết công thức' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Cả bốn tính chất trong vài chục dòng',
            code: `abstract class SanPham                         // TRỪU TƯỢNG: chỉ hứa "có giá bán"
{
    private decimal giaNhap;                   // ĐÓNG GÓI: giấu dữ liệu
    public decimal GiaNhap
    {
        get => giaNhap;
        set => giaNhap = value >= 0 ? value : throw new ArgumentException("Giá âm");
    }
    public abstract decimal TinhGiaBan();
}

class Tivi : SanPham                           // KẾ THỪA: có sẵn GiaNhap
{
    public override decimal TinhGiaBan() => GiaNhap * 1.2m;
}
class TuLanh : SanPham
{
    public override decimal TinhGiaBan() => GiaNhap * 1.15m + 300_000m;
}

List<SanPham> ds = [new Tivi { GiaNhap = 10_000_000m }, new TuLanh { GiaNhap = 8_000_000m }];
foreach (var sp in ds)
    Console.WriteLine(sp.TinhGiaBan());       // ĐA HÌNH: mỗi đối tượng một công thức`,
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Đừng đọc định nghĩa suông',
          text: 'Người phỏng vấn chấm điểm ở chỗ bạn chỉ ra được dòng code nào trong project của mình thể hiện từng tính chất. Chuẩn bị sẵn bốn ví dụ từ bài cửa hàng điện máy là đủ.',
        },
      ],
      followUps: [
        'Kế thừa có nhược điểm gì? "Ưu tiên composition hơn inheritance" nghĩa là sao?',
        'Đa hình có bắt buộc phải có kế thừa class không, hay interface là đủ?',
      ],
      buoi: [11, 12, 13, 15],
    },
    {
      id: 'pv-oop-15',
      level: 'Trung bình',
      question: 'Giải thích SOLID, mỗi nguyên tắc một ví dụ.',
      short:
        'Năm nguyên tắc giúp code dễ sửa, dễ mở rộng. S: mỗi class một lý do để thay đổi. O: thêm tính năng bằng cách thêm code mới, không sửa code cũ. L: lớp con thay được lớp cha mà chương trình vẫn đúng. I: interface nhỏ, đừng bắt class cài thứ nó không dùng. D: phụ thuộc vào abstraction và nhận phụ thuộc từ bên ngoài.',
      answer: [
        {
          type: 'table',
          head: ['Nguyên tắc', 'Ý chính', 'Ví dụ cửa hàng điện máy'],
          rows: [
            ['S — Single Responsibility', 'Một class, một lý do để thay đổi', 'DonHang giữ dữ liệu; DonHangRepository lưu file; HoaDonPrinter in hoá đơn'],
            ['O — Open/Closed', 'Mở để mở rộng, đóng để sửa đổi', 'Thêm nhóm MayTinh bằng lớp mới override TinhGiaBan(), không sửa switch cũ'],
            ['L — Liskov Substitution', 'Lớp con thay lớp cha không gây bất ngờ', 'Lớp con của SanPham không được ném lỗi trong TinhGiaBan()'],
            ['I — Interface Segregation', 'Nhiều interface nhỏ tốt hơn một interface to', 'Tách ILapDat, IGiaoHang thay vì ISanPham ôm hết'],
            ['D — Dependency Inversion', 'Phụ thuộc abstraction, không phụ thuộc lớp cụ thể', 'DonHangService nhận IThanhToan qua constructor'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'S — một class ôm hết so với tách theo trách nhiệm',
            columns: [
              { title: 'DonHangService ôm hết', tone: 'bad', items: ['Tính tổng tiền', 'Ghi file JSON', 'Gửi email xác nhận', 'In hoá đơn', 'Bốn lý do để phải mở class ra sửa'] },
              { title: 'Tách theo trách nhiệm', tone: 'good', items: ['DonHang.TongTien()', 'DonHangRepository.Luu()', 'IThongBao.Gui()', 'HoaDonPrinter.In()', 'Đổi cách in không đụng tới cách lưu'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'O — thêm nhóm hàng mà không sửa code cũ',
            code: `// Vi phạm OCP: thêm nhóm hàng là phải mở hàm này ra sửa
decimal TinhGiaBan(SanPham sp, string loai) => loai switch
{
    "DienTu"   => sp.GiaNhap * 1.2m,
    "DienLanh" => sp.GiaNhap * 1.15m + 300_000m,
    _          => sp.GiaNhap,
};

// Tuân thủ OCP: mỗi nhóm hàng tự biết cách tính
abstract class SanPham
{
    public decimal GiaNhap { get; init; }
    public abstract decimal TinhGiaBan();
}
class MayTinh : SanPham                        // nhóm mới: chỉ THÊM một class
{
    public override decimal TinhGiaBan() => GiaNhap * 1.1m;
}`,
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Cách trả lời ăn điểm',
          text: 'Mỗi nguyên tắc nói một câu và một ví dụ từ project của bạn, kèm nó giải quyết vấn đề gì: S giảm sửa lan, O tránh đụng code đang chạy, L giữ đa hình an toàn, I tránh hàm rỗng, D giúp đổi cài đặt và viết test dễ.',
        },
      ],
      followUps: [
        'SRP có nghĩa là mỗi class chỉ có một phương thức không?',
        'Áp dụng SOLID quá tay thì gây hại gì?',
      ],
      buoi: [15],
    },

    // ──────────────────────────── Nâng cao ────────────────────────────
    {
      id: 'pv-oop-16',
      level: 'Nâng cao',
      question: 'Kế thừa ba tầng có override, new và gọi virtual trong constructor — đoạn code sau in ra gì?',
      short:
        'In ba dòng: "Tạo: DienTu()", "DienTu(Điện tử)", "Tivi Sony". Constructor SanPham gọi Loai() theo kiểu thật, nhưng Tivi chỉ new nên bản chạy là override của DienTu — lúc đó thân constructor DienTu chưa chạy nên nhom còn null. a.Loai() qua biến SanPham cũng ra bản của DienTu; chỉ khi ép về Tivi mới gọi bản new.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Bấm chạy từng bước để xem thứ tự',
            code: `class SanPham
{
    public SanPham() => Console.WriteLine($"Tạo: {Loai()}");
    public virtual string Loai() => "SanPham";
}
class DienTu : SanPham
{
    private string nhom;
    public DienTu() { nhom = "Điện tử"; }
    public override string Loai() => $"DienTu({nhom})";
}
class Tivi : DienTu
{
    private string hang = "Sony";
    public new string Loai() => $"Tivi {hang}";
}

SanPham a = new Tivi();
Console.WriteLine(a.Loai());
Console.WriteLine(((Tivi)a).Loai());`,
            trace: [
              { line: 18, heap: { '0x300': 'Tivi { hang: null, nhom: null }' }, note: 'new Tivi(): cấp phát MỘT đối tượng, mọi field nhận giá trị mặc định.' },
              { line: 14, heap: { '0x300': 'Tivi { hang: "Sony", nhom: null }' }, note: 'Field initializer của Tivi chạy TRƯỚC khi gọi lên constructor lớp cha.' },
              { line: 3, heap: { '0x300': 'Tivi { hang: "Sony", nhom: null }' }, note: 'Constructor DienTu ngầm gọi base() → constructor SanPham chạy trước mọi thân constructor khác. Nó gọi Loai() — một phương thức virtual.' },
              { line: 10, heap: { '0x300': 'Tivi { hang: "Sony", nhom: null }' }, note: 'Kiểu thật là Tivi, nhưng Tivi chỉ new chứ không override → bản override gần nhất là của DienTu. Thân constructor DienTu chưa chạy nên nhom vẫn null.' },
              { line: 3, heap: { '0x300': 'Tivi { hang: "Sony", nhom: null }' }, output: ['Tạo: DienTu()'], note: 'null trong chuỗi nội suy in ra rỗng.' },
              { line: 9, heap: { '0x300': 'Tivi { hang: "Sony", nhom: "Điện tử" }' }, output: ['Tạo: DienTu()'], note: 'Giờ mới tới thân constructor DienTu — đã quá muộn cho dòng in ở trên.' },
              { line: 19, vars: { a: '→ 0x300' }, refs: { a: '0x300' }, heap: { '0x300': 'Tivi { hang: "Sony", nhom: "Điện tử" }' }, output: ['Tạo: DienTu()', 'DienTu(Điện tử)'], note: 'Biến kiểu SanPham, Loai() là virtual → tra theo kiểu thật Tivi, leo lên bản override của DienTu. Bản new của Tivi bị bỏ qua.' },
              { line: 20, vars: { a: '→ 0x300' }, refs: { a: '0x300' }, heap: { '0x300': 'Tivi { hang: "Sony", nhom: "Điện tử" }' }, output: ['Tạo: DienTu()', 'DienTu(Điện tử)', 'Tivi Sony'], note: 'Ép về Tivi: trình biên dịch thấy bản new khai báo ở Tivi và gọi thẳng nó, không qua cơ chế virtual.' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Đừng gọi phương thức virtual trong constructor',
          text: 'Lớp cha gọi virtual trong constructor thì bản override của lớp con chạy khi lớp con chưa khởi tạo xong — field gán trong thân constructor lớp con vẫn là null hoặc 0. Lỗi kiểu này không hề có cảnh báo lúc biên dịch.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Quy tắc nhớ nhanh',
          text: 'Phương thức virtual: nhìn kiểu THẬT rồi leo lên tìm override gần nhất, bỏ qua các bản new. Phương thức thường hoặc new: nhìn kiểu KHAI BÁO của biến. Field initializer (hang = "Sony") chạy trước cả constructor lớp cha; lệnh gán trong thân constructor chạy sau.',
        },
      ],
      followUps: [
        'Nếu Tivi đổi new thành override thì dòng đầu tiên in gì?',
        'Đánh dấu sealed override ở DienTu thì Tivi còn viết được gì?',
      ],
      buoi: [10, 12],
    },
    {
      id: 'pv-oop-17',
      level: 'Nâng cao',
      question: 'Nguyên tắc Liskov (LSP) bị vi phạm khi nào? Giải thích qua ví dụ Hình vuông kế thừa Hình chữ nhật.',
      short:
        'LSP: mọi chỗ dùng lớp cha phải thay bằng lớp con được mà chương trình vẫn đúng. Theo toán học hình vuông "là một" hình chữ nhật, nhưng nếu HinhVuong kế thừa HinhChuNhat và tự đổi cả hai cạnh khi gán một cạnh, thì code viết cho HinhChuNhat (gán Rong = 5, Cao = 4, chờ diện tích 20) nhận về 16 — lớp con đã phá cam kết của lớp cha.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'uml',
            caption: 'Thiết kế sai: "là một" theo toán học không có nghĩa là thay thế được trong code',
            relation: 'inherit',
            parent: { name: 'HinhChuNhat', attrs: ['+ Rong : int  (virtual)', '+ Cao : int  (virtual)'], methods: ['+ DienTich() : int'] },
            children: [{ name: 'HinhVuong', attrs: ['+ Rong : set đổi luôn Cao', '+ Cao : set đổi luôn Rong'] }],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Hàm viết đúng cho HinhChuNhat vẫn ra sai',
            code: `class HinhChuNhat
{
    public virtual int Rong { get; set; }
    public virtual int Cao { get; set; }
    public int DienTich() => Rong * Cao;
}

class HinhVuong : HinhChuNhat
{
    // Hình vuông phải giữ Rong == Cao nên gán cạnh này là đổi luôn cạnh kia
    public override int Rong
    {
        get => base.Rong;
        set { base.Rong = value; base.Cao = value; }
    }
    public override int Cao
    {
        get => base.Cao;
        set { base.Rong = value; base.Cao = value; }
    }
}

void KiemTra(HinhChuNhat h)
{
    h.Rong = 5;
    h.Cao = 4;
    Console.WriteLine(h.DienTich());   // người viết hàm chờ đợi 20
}

KiemTra(new HinhChuNhat());   // 20
KiemTra(new HinhVuong());     // 16 — gán Cao = 4 kéo luôn Rong về 4`,
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Cách sửa: hai lớp ngang hàng, cùng cài một interface',
            code: `interface IHinh { int DienTich(); }

class HinhChuNhat(int rong, int cao) : IHinh      // primary constructor C# 12
{
    public int Rong { get; } = rong;
    public int Cao { get; } = cao;
    public int DienTich() => Rong * Cao;
}

class HinhVuong(int canh) : IHinh
{
    public int Canh { get; } = canh;
    public int DienTich() => Canh * Canh;
}`,
            note: 'Không còn setter nào để lớp này phá cam kết của lớp kia. Code nhận IHinh chỉ tin vào DienTich() — điều mà cả hai đều làm đúng.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'uml',
            caption: 'Thiết kế đúng: không kế thừa nhau, cùng ký hợp đồng IHinh',
            relation: 'implement',
            parent: { name: 'IHinh', stereotype: 'interface', methods: ['+ DienTich() : int'] },
            children: [
              { name: 'HinhChuNhat', attrs: ['+ Rong : int  { get; }', '+ Cao : int  { get; }'], methods: ['+ DienTich() : int'] },
              { name: 'HinhVuong', attrs: ['+ Canh : int  { get; }'], methods: ['+ DienTich() : int'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Dấu hiệu nhận ra vi phạm LSP',
          text: 'Lớp con override rồi ném NotSupportedException (chim cánh cụt với Bay()), override để trống không làm gì, đòi điều kiện đầu vào chặt hơn lớp cha, hoặc nơi dùng phải viết if (x is LopCon) để né. Gặp các dấu hiệu này thì quan hệ kế thừa đang sai.',
        },
      ],
      followUps: [
        'Chim cánh cụt kế thừa Chim có Bay() vi phạm LSP thế nào, sửa ra sao?',
        'Nếu HinhChuNhat bất biến (chỉ có get) thì HinhVuong kế thừa nó còn vi phạm LSP không?',
      ],
      buoi: [15],
    },
    {
      id: 'pv-oop-18',
      level: 'Nâng cao',
      question: 'Dependency Injection là gì? Vì sao nên tiêm phụ thuộc qua constructor thay vì tự new bên trong class?',
      short:
        'DI là kỹ thuật đưa các đối tượng mà class cần (phụ thuộc) từ bên ngoài vào thay vì class tự new — cách hiện thực nguyên tắc D của SOLID. Tiêm qua constructor làm phụ thuộc hiện rõ trong chữ ký, đối tượng luôn đủ phụ thuộc ngay khi tạo, field để readonly được, dễ thay bằng bản giả khi test, và DI container của .NET tự lắp ráp.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Ba cách để DonHangService có được đối tượng gửi thông báo',
            columns: [
              { title: 'Tự new bên trong', tone: 'bad', items: ['tb = new ThongBaoEmail();', 'Đổi sang SMS phải sửa DonHangService', 'Chạy test là gửi email thật', 'Nhìn chữ ký không biết class cần gì'] },
              { title: 'Tiêm qua property', tone: 'plain', items: ['public IThongBao? ThongBao { get; set; }', 'Quên gán → NullReferenceException lúc chạy', 'Có thể bị đổi giữa chừng', 'Chỉ hợp với phụ thuộc tuỳ chọn'] },
              { title: 'Tiêm qua constructor', tone: 'good', items: ['DonHangService(IThongBao thongBao)', 'Thiếu phụ thuộc → không tạo được đối tượng', 'Field readonly, không ai đổi được', 'Test: new DonHangService(new ThongBaoGia())'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Constructor injection với DI container của .NET',
            code: `public interface IThongBao
{
    void Gui(string email, string noiDung);
}

public class ThongBaoEmail : IThongBao
{
    public void Gui(string email, string noiDung)
        => Console.WriteLine($"Email tới {email}: {noiDung}");
}

public class DonHangService
{
    private readonly IThongBao thongBao;

    public DonHangService(IThongBao thongBao) => this.thongBao = thongBao;

    public void DatHang(DonHang don)
    {
        // ... kiểm tra tồn kho, lưu đơn ...
        thongBao.Gui(don.KhachHang.Email, $"Đơn {don.Ma} đã được xác nhận");
    }
}

// Program.cs — nơi duy nhất biết dùng bản cài đặt nào
var services = new ServiceCollection();
services.AddSingleton<IThongBao, ThongBaoEmail>();
services.AddTransient<DonHangService>();
var provider = services.BuildServiceProvider();

var donHangService = provider.GetRequiredService<DonHangService>();`,
            note: 'Đổi sang gửi SMS: viết ThongBaoSms rồi sửa đúng một dòng đăng ký. DonHangService không đổi một chữ.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Container tự lắp ráp khi được xin DonHangService',
            actors: ['Program', 'DI container', 'DonHangService'],
            steps: [
              { from: 0, to: 1, text: 'Đăng ký IThongBao → ThongBaoEmail' },
              { from: 0, to: 1, text: 'GetRequiredService<DonHangService>()' },
              { from: 1, to: 1, text: 'Soi constructor: cần một IThongBao' },
              { from: 1, to: 1, text: 'Tra bảng đăng ký, tạo ThongBaoEmail' },
              { from: 1, to: 2, text: 'new DonHangService(thongBaoEmail)' },
              { from: 1, to: 0, text: 'Trả về đối tượng đủ phụ thuộc', dashed: true },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Phân biệt ba khái niệm hay bị trộn',
          text: 'DIP là nguyên tắc thiết kế (phụ thuộc vào interface). DI là kỹ thuật thực hiện (tiêm từ bên ngoài vào). IoC container là công cụ tự động hoá việc tiêm. Nói rõ được ba tầng này là ghi điểm. C# 12 viết gọn bằng primary constructor: class DonHangService(IThongBao thongBao).',
        },
      ],
      followUps: [
        'Constructor nhận tới 7–8 phụ thuộc thì nói lên điều gì?',
        'Gọi provider.GetService<T>() ngay bên trong class (Service Locator) có vấn đề gì?',
        'Viết unit test cho DonHangService mà không gửi email thật thế nào?',
      ],
      buoi: [15],
    },
    {
      id: 'pv-oop-19',
      level: 'Nâng cao',
      question: 'Ba vòng đời Singleton, Scoped, Transient khác nhau thế nào? Tiêm một service Scoped vào Singleton thì sao?',
      short:
        'Transient: mỗi lần xin là một đối tượng mới. Scoped: một đối tượng cho mỗi scope — trong ASP.NET Core là mỗi HTTP request. Singleton: một đối tượng duy nhất suốt đời ứng dụng. Singleton giữ một service Scoped thì giữ nó mãi (captive dependency): mọi request dùng chung, sai dữ liệu và lỗi đa luồng; ở môi trường Development ASP.NET Core sẽ ném InvalidOperationException để chặn.',
      answer: [
        {
          type: 'table',
          head: ['Vòng đời', 'Tạo đối tượng mới khi', 'Hợp với'],
          rows: [
            ['AddTransient', 'Mỗi lần được xin (mỗi constructor cần nó)', 'Service nhẹ, không giữ trạng thái: TinhPhiGiao'],
            ['AddScoped', 'Mỗi scope — mỗi HTTP request một bản', 'DbContext, repository, service nghiệp vụ dùng DbContext'],
            ['AddSingleton', 'Một lần duy nhất cho cả ứng dụng', 'Cấu hình, cache trong bộ nhớ — bắt buộc an toàn đa luồng'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Hai request chạy cùng lúc nhận những đối tượng nào',
            root: {
              label: 'Ứng dụng (root provider)',
              children: [
                { label: 'CauHinhCuaHang', note: 'Singleton — một bản cho mọi request', highlight: true },
                {
                  label: 'Request của khách A (scope A)',
                  children: [
                    { label: 'DonHangRepository #1', note: 'Scoped' },
                    { label: 'TinhPhiGiao #1, #2', note: 'Transient — mỗi lần xin một bản' },
                  ],
                },
                {
                  label: 'Request của khách B (scope B)',
                  children: [
                    { label: 'DonHangRepository #2', note: 'Scoped — khác bản của A' },
                    { label: 'TinhPhiGiao #3', note: 'Transient' },
                  ],
                },
              ],
            },
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Tự kiểm chứng trong console app',
            code: `var services = new ServiceCollection();
services.AddSingleton<CauHinhCuaHang>();
services.AddScoped<DonHangRepository>();
services.AddTransient<TinhPhiGiao>();
using var provider = services.BuildServiceProvider();

using var scopeA = provider.CreateScope();     // giống một request
using var scopeB = provider.CreateScope();
var a = scopeA.ServiceProvider;
var b = scopeB.ServiceProvider;

Console.WriteLine(a.GetRequiredService<CauHinhCuaHang>() == b.GetRequiredService<CauHinhCuaHang>());     // True
Console.WriteLine(a.GetRequiredService<DonHangRepository>() == a.GetRequiredService<DonHangRepository>()); // True
Console.WriteLine(a.GetRequiredService<DonHangRepository>() == b.GetRequiredService<DonHangRepository>()); // False
Console.WriteLine(a.GetRequiredService<TinhPhiGiao>() == a.GetRequiredService<TinhPhiGiao>());             // False`,
            note: 'So sánh == giữa hai biến kiểu class là so địa chỉ: True nghĩa là cùng một đối tượng.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Captive dependency',
          text: 'Singleton nhận DonHangRepository (Scoped) qua constructor thì repository bị "giam" sống cùng singleton suốt đời ứng dụng — mọi request dùng chung một DbContext, dữ liệu cũ, lỗi khi hai request chạy song song. Quy tắc: service chỉ phụ thuộc vào service sống lâu bằng hoặc lâu hơn nó. Singleton thật sự cần Scoped thì tiêm IServiceScopeFactory rồi tự CreateScope().',
        },
      ],
      followUps: [
        'Vì sao DbContext được đăng ký Scoped mà không phải Singleton?',
        'Trong cùng một request, hai service cùng cần một service Scoped thì nhận chung hay riêng?',
        'Service Transient có IDisposable thì ai gọi Dispose?',
      ],
      buoi: [15],
    },
    {
      id: 'pv-oop-20',
      level: 'Nâng cao',
      question: 'Lưu List<SanPham> gồm DienTu, DienLanh, GiaDung ra JSON rồi đọc lại thì có vấn đề gì? Xử lý thế nào?',
      short:
        'JSON chỉ là chữ, không mang thông tin lớp. System.Text.Json serialize theo kiểu khai báo SanPham nên mất thuộc tính riêng của lớp con; deserialize về List<SanPham> thì lỗi vì SanPham là abstract — còn nếu không abstract thì mọi phần tử thành SanPham thường, mất đa hình. Cách xử lý: ghi kèm trường phân biệt Loai — tự làm bằng DTO + switch, hoặc dùng [JsonPolymorphic] và [JsonDerivedType] từ .NET 7.',
      answer: [
        {
          type: 'text',
          text: 'Đa hình nằm ở kiểu THẬT của đối tượng trên heap. Ghi ra file thì chỉ còn lại chữ; lúc đọc lên thư viện phải new một đối tượng nhưng không biết new lớp nào. Phải có một trường nói "bản ghi này là DienLanh" — gọi là type discriminator.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Ba cách ghi danh sách đa hình ra JSON',
            columns: [
              { title: 'Serialize thẳng, không cấu hình', tone: 'bad', items: ['Chỉ ghi property của SanPham', 'Mất KichCoInch, CongSuatW…', 'Đọc lại: NotSupportedException vì SanPham abstract', 'SanPham không abstract: đọc ra toàn SanPham thường'] },
              { title: 'Cách 1 — DTO + trường Loai', tone: 'good', items: ['SanPhamDto có Loai = sp.GetType().Name', 'Đọc lên: switch (dto.Loai) → new đúng lớp con', 'Tự kiểm soát hoàn toàn'] },
              { title: 'Cách 2 — [JsonPolymorphic]', tone: 'good', items: ['Khai báo từng lớp con bằng [JsonDerivedType]', 'Thư viện tự ghi "Loai" và tự new đúng lớp', '.NET 7 trở lên, code ngắn nhất'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Cách 2 — để System.Text.Json tự lo',
            code: `using System.Text.Json;
using System.Text.Json.Serialization;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "Loai")]
[JsonDerivedType(typeof(DienTu), "DienTu")]
[JsonDerivedType(typeof(DienLanh), "DienLanh")]
[JsonDerivedType(typeof(GiaDung), "GiaDung")]
public abstract class SanPham
{
    public string Ma { get; set; } = "";
    public decimal GiaNhap { get; set; }
    public abstract decimal TinhGiaBan();
}

string json = JsonSerializer.Serialize(danhSach);
// mỗi bản ghi mở đầu bằng "Loai": "DienLanh" rồi tới đủ property của lớp con

List<SanPham> docLai = JsonSerializer.Deserialize<List<SanPham>>(json) ?? [];
Console.WriteLine(docLai[0].TinhGiaBan());   // chạy đúng bản của lớp con`,
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Hai lỗi hay gặp khi đọc',
          text: 'Một: lớp con không có constructor rỗng, mà tên tham số constructor lại không khớp tên property (ma ↔ Ma) — Deserialize báo lỗi. Hai: tới .NET 8, trường "Loai" phải đứng đầu bản ghi; sửa tay file JSON đẩy nó xuống dưới là JsonException.',
        },
      ],
      followUps: [
        'Thêm nhóm hàng MayTinh thì phải sửa những chỗ nào trong cách 1 và cách 2?',
        'Vì sao không nên lưu tên lớp đầy đủ (GetType().FullName) làm giá trị Loai?',
      ],
      buoi: [16],
    },
  ],
}

export default oop
