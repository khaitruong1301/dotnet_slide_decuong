import type { Buoi } from './types'

const buoi15: Buoi = {
  id: 15,
  slug: 'bon-tinh-chat-oop-va-solid',
  title: '4 tính chất OOP & nguyên tắc SOLID',
  subtitle: 'Tổng kết nền tảng và năm nguyên tắc giữ cho dự án lớn không rối',
  duration: '3 giờ',
  keywords: ['encapsulation', 'inheritance', 'polymorphism', 'abstraction', 'SOLID', 'DI'],
  goals: [
    'Gọi tên và nhận ra 4 tính chất OOP trong code đã viết',
    'Áp dụng SRP, OCP, LSP, ISP, DIP vào một bài toán thật',
    'Hiểu Dependency Injection và vì sao nên tiêm phụ thuộc qua constructor',
    'Dùng DI container có sẵn của .NET thay vì tự new thủ công',
  ],

  sections: [
    {
      id: 'bon-tinh-chat',
      title: '1. Bốn tính chất của lập trình hướng đối tượng',
      blocks: [
        {
          type: 'text',
          text: 'Ba buổi vừa rồi ta đã dùng đủ cả bốn tính chất mà chưa gọi tên chúng. Đây là lúc hệ thống lại — đây cũng là bốn câu hỏi phỏng vấn hay gặp nhất về OOP.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Bốn tính chất, và ta đã gặp chúng ở đâu',
            items: [
              { label: 'Đóng gói (Encapsulation)', text: 'Gói dữ liệu và hành vi vào một đối tượng, chỉ mở ra qua property và phương thức public — buổi 10, class TaiKhoan giấu soDu' },
              { label: 'Kế thừa (Inheritance)', text: 'Lớp con nhận lại thuộc tính và phương thức của lớp cha để tái sử dụng — buổi 11, NhanVienSanXuat kế thừa NhanVien' },
              { label: 'Đa hình (Polymorphism)', text: 'Cùng một lời gọi cho ra nhiều hành vi tuỳ đối tượng thật — buổi 11, một vòng lặp tính lương cho ba loại nhân viên' },
              { label: 'Trừu tượng (Abstraction)', text: 'Chỉ phơi ra cái cần dùng, giấu chi tiết bên trong — interface IHinhHoc, abstract class DongVat' },
            ],
          },
        },
        {
          type: 'table',
          head: ['Tính chất', 'Giải quyết vấn đề gì', 'Công cụ trong C#'],
          rows: [
            ['Đóng gói', 'Dữ liệu bị sửa bừa từ bên ngoài', 'private, property get/set'],
            ['Kế thừa', 'Code trùng lặp giữa các lớp giống nhau', ': LopCha, base'],
            ['Đa hình', 'Phải viết if/else cho từng loại đối tượng', 'virtual, override, interface'],
            ['Trừu tượng', 'Người dùng phải biết quá nhiều chi tiết', 'interface, abstract class'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Phân biệt Trừu tượng và Đóng gói',
          text: 'Đóng gói là GIẤU DỮ LIỆU — không cho sửa trực tiếp field. Trừu tượng là GIẤU CÁCH LÀM — người dùng biết gọi TinhLuong() là ra tiền, không cần biết công thức bên trong.',
        },
      ],
    },

    {
      id: 'solid-tong-quan',
      title: '2. SOLID — năm nguyên tắc thiết kế',
      blocks: [
        {
          type: 'text',
          text: 'SOLID là năm nguyên tắc giúp code dễ bảo trì và mở rộng. Chúng không phải luật bắt buộc mà là kinh nghiệm đúc kết: cứ vi phạm là dự án lớn dần sẽ đau.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Năm chữ cái của SOLID',
            items: [
              { label: 'S — Single Responsibility', text: 'Một class chỉ có một lý do để thay đổi' },
              { label: 'O — Open/Closed', text: 'Mở cho mở rộng, đóng với sửa đổi' },
              { label: 'L — Liskov Substitution', text: 'Lớp con phải thay được lớp cha mà chương trình vẫn đúng' },
              { label: 'I — Interface Segregation', text: 'Nhiều interface nhỏ tốt hơn một interface to' },
              { label: 'D — Dependency Inversion', text: 'Phụ thuộc vào abstraction, đừng phụ thuộc vào class cụ thể' },
            ],
          },
        },
      ],
    },

    {
      id: 'srp',
      title: '3. S — Single Responsibility Principle',
      blocks: [
        {
          type: 'text',
          text: 'Một class chỉ nên có một lý do để thay đổi. Nếu một class vừa giữ dữ liệu, vừa tính toán, vừa ghi file, vừa gửi mail thì bốn nhóm lý do khác nhau đều buộc phải mở nó ra sửa.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Class NhanVien ôm đồm mọi việc so với tách trách nhiệm',
            columns: [
              {
                title: 'Vi phạm SRP',
                tone: 'bad',
                items: [
                  'NhanVien giữ dữ liệu',
                  'NhanVien tính lương',
                  'NhanVien lưu database',
                  'NhanVien gửi email',
                  '→ Đổi cách gửi mail phải sửa class NhanVien',
                ],
              },
              {
                title: 'Tuân thủ SRP',
                tone: 'good',
                items: [
                  'NhanVien — chỉ giữ dữ liệu',
                  'LuongService — chỉ tính lương',
                  'NhanVienRepository — chỉ lưu và đọc',
                  'EmailService — chỉ gửi mail',
                  '→ Mỗi thay đổi chỉ chạm đúng một class',
                ],
              },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Tách theo trách nhiệm',
            code: `// Chỉ giữ dữ liệu
class NhanVien
{
    public string Ma { get; set; }
    public string Ten { get; set; }
    public decimal Luong1h { get; set; }
    public int SoGioLam { get; set; }
}

// Chỉ lo tính toán
class LuongService
{
    public decimal Tinh(NhanVien nv) => nv.Luong1h * nv.SoGioLam;
}

// Chỉ lo lưu trữ
class NhanVienRepository
{
    public void Luu(List<NhanVien> ds) { /* ghi file JSON */ }
    public List<NhanVien> Doc() { /* đọc file JSON */ return new(); }
}`,
          
            trace: [

              { line: 8, vars: { nv: 'NhanVien { Ma: "NV01", Luong1h: 50000, SoGioLam: 160 }' }, note: 'NhanVien giờ chỉ CHỞ dữ liệu, không biết tính toán cũng không biết lưu trữ.' },
              { line: 13, vars: { nv: 'NhanVien { Luong1h: 50000, SoGioLam: 160 }', 'trả về': '8000000' }, note: 'Muốn đổi công thức lương? Chỉ mở đúng LuongService. NhanVien và Repository không hề bị đụng tới.' },
              { line: 19, vars: { ds: '[NhanVien × 1]' }, note: 'Muốn đổi từ file JSON sang database? Chỉ mở đúng Repository.' },
              { line: 20, vars: { ds: '[NhanVien × 1]' }, note: 'Ba class, ba lý do thay đổi khác nhau. Gộp cả ba vào một class thì mỗi lần sửa bất cứ thứ gì cũng phải mở đúng file đó ra — rủi ro làm hỏng hai phần còn lại.' },
            ],},
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Tách nhiều quá thì project phình to',
          text: 'Áp dụng SRP triệt để sẽ sinh ra rất nhiều service nhỏ, gọi chúng lằng nhằng. Lúc đó dùng Facade Pattern: tạo một lớp bao bọc gom các service liên quan lại, bên ngoài chỉ cần gọi một cửa.',
        },
        {
          type: 'code',
          sample: {
            title: 'Facade gom các service lại một cửa',
            code: `class NhanVienFacade
{
    private readonly LuongService luong = new();
    private readonly EmailService email = new();
    private readonly NhanVienRepository repo = new();

    public void ChotLuongThang(List<NhanVien> ds)
    {
        foreach (var nv in ds)
            email.Gui(nv.Ten, $"Lương tháng: {luong.Tinh(nv):N0} đ");
        repo.Luu(ds);
    }
}

// Bên ngoài chỉ cần biết một dòng này
new NhanVienFacade().ChotLuongThang(danhSach);`,
          
            trace: [

              { line: 16, vars: { danhSach: '[An, Bình]' }, note: 'Bên ngoài chỉ gọi một dòng, không cần biết bên trong có bao nhiêu service.' },
              { line: 9, vars: { ds: '[An, Bình]', nv: 'An' }, note: 'Facade điều phối: lần lượt gọi từng service nhỏ.' },
              { line: 10, vars: { nv: 'An', 'luong.Tinh(nv)': '8000000' }, output: ['Gửi mail tới An: Lương tháng: 8.000.000 đ'], note: 'Gọi LuongService để tính, rồi chuyển kết quả sang EmailService.' },
              { line: 10, vars: { nv: 'Bình', 'luong.Tinh(nv)': '9600000' }, output: ['Gửi mail tới An: Lương tháng: 8.000.000 đ', 'Gửi mail tới Bình: Lương tháng: 9.600.000 đ'] },
              { line: 11, vars: { ds: '[An, Bình]' }, output: ['…', 'Đã lưu danh sách ra file'], note: 'Cuối cùng gọi Repository. Facade giải quyết đúng cái giá phải trả của SRP: tách nhỏ thì nhiều service, nhưng chỉ cần một cửa để gọi.' },
            ],},
        },
      ],
    },

    {
      id: 'ocp',
      title: '4. O — Open/Closed Principle',
      blocks: [
        {
          type: 'text',
          text: 'Mở cho việc mở rộng, đóng với việc sửa đổi. Thêm tính năng mới thì nên viết thêm code mới, không nên mở class cũ đang chạy ổn định ra sửa — vì mỗi lần sửa là một lần có nguy cơ làm hỏng thứ đang đúng.',
        },
        {
          type: 'code',
          sample: {
            title: 'Vi phạm OCP — cứ thêm loại là phải sửa',
            code: `class LuongService
{
    public decimal Tinh(NhanVien nv)
    {
        if (nv.Loai == "VanPhong")   return nv.LuongThang;
        if (nv.Loai == "SanXuat")    return nv.SoSanPham * 15000;
        if (nv.Loai == "KinhDoanh")  return 5000000 + nv.DoanhSo * 0.05m;
        // Thêm loại thứ tư -> lại mở đúng file này ra sửa
        return 0;
    }
}`,
            note: 'Chuỗi if/else theo loại đối tượng là dấu hiệu kinh điển của việc vi phạm OCP.',
          
            trace: [

              { line: 5, vars: { 'nv.Loai': '"SanXuat"' }, note: 'Kiểm tra loại thứ nhất — không khớp.' },
              { line: 6, vars: { 'nv.Loai': '"SanXuat"', 'trả về': '4500000' }, note: 'Khớp loại thứ hai, trả kết quả.' },
              { line: 8, vars: { 'nv.Loai': '"ThoiVu"' }, note: 'Giờ công ty thêm nhân viên thời vụ. Chuỗi if này không có nhánh nào khớp.' },
              { line: 9, vars: { 'nv.Loai': '"ThoiVu"', 'trả về': '0' }, note: 'Trả về 0 — SAI. Muốn đúng thì phải MỞ FILE NÀY RA SỬA, thêm một dòng if nữa. Mỗi lần sửa là một lần có nguy cơ làm hỏng ba nhánh đang chạy tốt. Đó là vi phạm nguyên tắc Đóng — Mở.' },
            ],},
        },
        {
          type: 'code',
          sample: {
            title: 'Tuân thủ OCP — dùng đa hình',
            code: `interface ITinhLuong
{
    decimal Tinh(NhanVien nv);
}

class LuongVanPhong : ITinhLuong
{
    public decimal Tinh(NhanVien nv) => nv.LuongThang;
}

class LuongSanXuat : ITinhLuong
{
    public decimal Tinh(NhanVien nv) => nv.SoSanPham * 15000m;
}

// Thêm loại mới: viết thêm một class, KHÔNG sửa class nào đang có
class LuongThoiVu : ITinhLuong
{
    public decimal Tinh(NhanVien nv) => nv.SoGioLam * 30000m;
}`,
            note: 'Đây là lý do đa hình quan trọng: nó biến việc "sửa code cũ" thành việc "thêm code mới".',
          
            trace: [

              { line: 3, vars: {}, note: 'Interface đóng vai trò bản hợp đồng: mọi cách tính lương đều có một phương thức Tinh.' },
              { line: 8, vars: { 'nv.LuongThang': '12000000', 'trả về': '12000000' }, note: 'Mỗi cách tính nằm gọn trong class riêng của nó.' },
              { line: 13, vars: { 'nv.SoSanPham': '300', 'trả về': '4500000' }, note: 'Sửa công thức sản xuất thì chỉ đụng đúng class này, hai class kia không hề hấn gì.' },
              { line: 17, vars: {}, note: 'Công ty thêm nhân viên thời vụ. Lần này ta THÊM MỘT FILE MỚI.' },
              { line: 19, vars: { 'nv.SoGioLam': '100', 'trả về': '3000000' }, note: 'Không dòng code cũ nào bị chạm vào — không có cơ hội làm hỏng thứ đang chạy tốt. Đó chính là "mở cho mở rộng, đóng với sửa đổi".' },
            ],},
        },
        {
          type: 'visual',
          visual: {
            kind: 'uml',
            caption: 'Thêm cách tính lương mới chỉ là thêm một hộp bên dưới',
            relation: 'implement',
            parent: { name: 'ITinhLuong', stereotype: 'interface', methods: ['+ Tinh(nv) : decimal'] },
            children: [
              { name: 'LuongVanPhong' },
              { name: 'LuongSanXuat' },
              { name: 'LuongThoiVu', stereotype: 'mới thêm' },
            ],
          },
        },
      ],
    },

    {
      id: 'lsp-isp',
      title: '5. L và I — Liskov Substitution & Interface Segregation',
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: 'LSP — Nguyên tắc thay thế Liskov',
          text: 'Lớp con phải thay thế được lớp cha ở mọi nơi mà chương trình vẫn chạy đúng. Nếu B kế thừa A thì bất cứ chỗ nào dùng A đều phải dùng B được, không sinh lỗi lạ.',
        },
        {
          type: 'code',
          sample: {
            title: 'Vi phạm LSP — lớp con phá vỡ cam kết của lớp cha',
            code: `class Chim
{
    public virtual void Bay() => Console.WriteLine("Đang bay");
}

class ChimCanh : Chim { }

class ChimCanhCut : Chim
{
    // Vi phạm: lớp cha hứa Bay() chạy được, lớp con lại ném lỗi
    public override void Bay() => throw new NotSupportedException("Cánh cụt không bay");
}

void ChoBayHet(List<Chim> ds)
{
    foreach (var c in ds) c.Bay();   // gặp cánh cụt là văng lỗi
}`,
            note: 'Cách sửa: tách IBayDuoc thành interface riêng, chỉ loài nào bay được mới cài đặt. Đây cũng chính là tinh thần của ISP.',
          
            trace: [

              { line: 3, vars: {}, note: 'Lớp cha HỨA: mọi con Chim đều gọi Bay() được.' },
              { line: 14, vars: { ds: '[ChimCanh, ChimCanhCut]' }, note: 'Hàm này chỉ biết kiểu Chim, nó tin vào lời hứa ở trên.' },
              { line: 16, vars: { ds: '[ChimCanh, ChimCanhCut]', 'c (kiểu thật)': 'ChimCanh' }, output: ['Đang bay'], focus: { ds: [0] }, note: 'Con đầu chạy ngon.' },
              { line: 16, vars: { ds: '[ChimCanh, ChimCanhCut]', 'c (kiểu thật)': 'ChimCanhCut' }, output: ['Đang bay'], focus: { ds: [1] }, note: 'Tới cánh cụt…' },
              { line: 11, vars: { 'c (kiểu thật)': 'ChimCanhCut' }, output: ['Đang bay', '💥 NotSupportedException: Cánh cụt không bay'], note: 'Nổ. Lớp con đã PHÁ VỠ cam kết của lớp cha — đó là vi phạm LSP. Hàm ChoBayHet viết hoàn toàn đúng mà vẫn chết.' },
              { line: 14, vars: {}, output: ['Đang bay', '💥 NotSupportedException'], note: 'Cách sửa: tách IBayDuoc thành interface riêng, loài nào bay được mới cài đặt. Lúc đó List<IBayDuoc> không bao giờ lọt cánh cụt vào.' },
            ],},
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'ISP — Nguyên tắc phân tách giao diện',
          text: 'Đừng bắt một class phải cài đặt những phương thức mà nó không dùng đến. Interface to nên tách thành nhiều interface nhỏ và cụ thể hơn.',
        },
        {
          type: 'code',
          sample: {
            title: 'Tách interface to thành các interface nhỏ',
            code: `// Vi phạm ISP: máy in thường buộc phải cài cả Scan và Fax
interface IMayVanPhong
{
    void In(string s);
    void Scan(string s);
    void Fax(string s);
}

// Tuân thủ ISP: tách theo từng khả năng
interface IMayIn   { void In(string s); }
interface IMayScan { void Scan(string s); }

class MayInThuong : IMayIn
{
    public void In(string s) => Console.WriteLine($"In: {s}");
}

class MayDaNang : IMayIn, IMayScan
{
    public void In(string s) => Console.WriteLine($"In: {s}");
    public void Scan(string s) => Console.WriteLine($"Scan: {s}");
}`,
          
            trace: [

              { line: 2, vars: {}, note: 'Interface gộp ba khả năng vào một.' },
              { line: 5, vars: {}, note: 'Máy in thường không scan được, nhưng vẫn BỊ BUỘC phải cài đặt Scan.' },
              { line: 6, vars: {}, note: 'Và cả Fax nữa. Thường thì lập trình viên sẽ để thân hàm rỗng hoặc ném NotImplementedException — cả hai đều là mùi code xấu.' },
              { line: 10, vars: {}, note: 'Tách nhỏ: mỗi interface đúng một khả năng.' },
              { line: 13, vars: {}, note: 'Máy in thường chỉ ký hợp đồng IMayIn.' },
              { line: 15, vars: { s: '"bao cao.pdf"' }, output: ['In: bao cao.pdf'], note: 'Chỉ cài một phương thức, không còn hàm rỗng nào.' },
              { line: 18, vars: {}, note: 'Máy đa năng ký hai hợp đồng cùng lúc — C# cho cài bao nhiêu interface cũng được.' },
              { line: 21, vars: { s: '"anh.jpg"' }, output: ['In: bao cao.pdf', 'Scan: anh.jpg'], note: 'Mỗi class chỉ cài đúng thứ nó làm được. Lưu ý: đừng tách quá tay — chỉ tách khi thật sự có class phải cài hàm rỗng.' },
            ],},
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Đừng tách quá tay',
          text: 'Không phải interface nào cũng cần băm nhỏ. Cách kiểm tra: đếm xem có bao nhiêu phương thức thực sự không được các lớp cài đặt dùng tới. Chỉ vài phương thức thì chưa cần áp dụng ISP.',
        },
      ],
    },

    {
      id: 'dip',
      title: '6. D — Dependency Inversion & Dependency Injection',
      blocks: [
        {
          type: 'text',
          text: 'Nguyên tắc cuối: đừng để class cấp cao phụ thuộc trực tiếp vào class cấp thấp, cả hai nên phụ thuộc vào abstraction. Trong thực hành, nó dẫn tới kỹ thuật Dependency Injection — tiêm phụ thuộc từ bên ngoài vào thay vì tự new bên trong.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Cùng một lớp xử lý đơn hàng',
            columns: [
              {
                title: 'Tự new bên trong',
                tone: 'bad',
                items: [
                  'new ThanhToanTienMat() ngay trong OrderService',
                  'Đổi sang thẻ tín dụng phải sửa OrderService',
                  'Không viết test được vì luôn gọi thật',
                  'Class dính chặt vào class cụ thể',
                ],
              },
              {
                title: 'Tiêm qua constructor',
                tone: 'good',
                items: [
                  'OrderService nhận IPaymentService từ ngoài',
                  'Đổi phương thức thanh toán không sửa OrderService',
                  'Test được bằng cách tiêm bản giả',
                  'Chỉ phụ thuộc vào interface',
                ],
              },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Dependency Injection qua constructor',
            code: `interface IPaymentService
{
    void ThanhToan(decimal soTien);
}

class ThanhToanTienMat : IPaymentService
{
    public void ThanhToan(decimal soTien)
        => Console.WriteLine($"Nhận tiền mặt: {soTien:N0} đ");
}

class ThanhToanTheTinDung : IPaymentService
{
    public void ThanhToan(decimal soTien)
        => Console.WriteLine($"Quẹt thẻ: {soTien:N0} đ");
}

class OrderService
{
    private readonly IPaymentService payment;

    // Phụ thuộc được TIÊM vào, không tự new bên trong
    public OrderService(IPaymentService payment) => this.payment = payment;

    public void Checkout(decimal tongTien) => payment.ThanhToan(tongTien);
}

// Nơi lắp ráp quyết định dùng bản nào
var order = new OrderService(new ThanhToanTheTinDung());
order.Checkout(250_000m);`,
            note: 'readonly nghĩa là gán một lần trong constructor rồi khoá lại — không ai đổi được phụ thuộc giữa chừng.',
          
            trace: [

              { line: 29, vars: {}, note: 'Nơi lắp ráp: tạo bản thanh toán thẻ TRƯỚC rồi mới đưa vào OrderService.' },
              { line: 23, vars: { payment: '→ ThanhToanTheTinDung' }, refs: { order: '0x1100' }, heap: { '0x1100': 'OrderService { payment: ThanhToanTheTinDung }' }, note: 'Phụ thuộc được TIÊM qua constructor. OrderService không hề có dòng new nào cho phương thức thanh toán.' },
              { line: 30, vars: { order: '→ 0x1100', tongTien: '250000' }, refs: { order: '0x1100' }, heap: { '0x1100': 'OrderService { payment: ThanhToanTheTinDung }' } },
              { line: 25, vars: { tongTien: '250000' }, note: 'OrderService chỉ biết gọi payment.ThanhToan — nó không biết và không cần biết đó là tiền mặt hay thẻ.' },
              { line: 14, vars: { soTien: '250000' }, output: ['Quẹt thẻ: 250.000 đ'], note: 'Bản cài đặt thật mới chạy.' },
              { line: 29, vars: { payment: '→ ThanhToanTienMat' }, refs: { order: '0x1110' }, heap: { '0x1110': 'OrderService { payment: ThanhToanTienMat }' }, output: ['Quẹt thẻ: 250.000 đ'], note: 'Đổi sang tiền mặt: chỉ sửa đúng dòng lắp ráp này.' },
              { line: 9, vars: { soTien: '250000' }, output: ['Quẹt thẻ: 250.000 đ', 'Nhận tiền mặt: 250.000 đ'], note: 'OrderService không sửa một chữ. Đây cũng là lý do DI làm code dễ kiểm thử: lúc test thì tiêm một bản giả vào.' },
            ],},
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Luồng lắp ráp phụ thuộc khi chương trình khởi động',
            steps: [
              { kind: 'start', text: 'Program khởi động' },
              { kind: 'process', text: 'Đăng ký: IPaymentService → ThanhToanTheTinDung' },
              { kind: 'process', text: 'Yêu cầu container tạo OrderService' },
              { kind: 'process', text: 'Container thấy constructor cần IPaymentService' },
              { kind: 'process', text: 'Container tạo ThanhToanTheTinDung rồi tiêm vào' },
              { kind: 'end', text: 'Trả về OrderService đã sẵn sàng dùng' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Dùng DI container có sẵn của .NET',
            lang: 'bash',
            code: `dotnet add package Microsoft.Extensions.DependencyInjection`,
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Program.cs',
            code: `using Microsoft.Extensions.DependencyInjection;

var services = new ServiceCollection();

// Đăng ký: gặp IPaymentService thì cấp ThanhToanTheTinDung
services.AddSingleton<IPaymentService, ThanhToanTheTinDung>();
services.AddTransient<OrderService>();

var provider = services.BuildServiceProvider();

// Không cần new thủ công, container tự lắp ráp
var order = provider.GetRequiredService<OrderService>();
order.Checkout(250_000m);`,
            note: 'AddSingleton dùng chung một đối tượng suốt vòng đời ứng dụng; AddTransient tạo mới mỗi lần yêu cầu; AddScoped tạo mới mỗi request (dùng nhiều trong ASP.NET Core).',
          
            trace: [

              { line: 3, vars: { services: '{}' }, note: 'ServiceCollection là cuốn sổ đăng ký, chưa tạo đối tượng nào.' },
              { line: 6, vars: { services: '{IPaymentService: ThanhToanTheTinDung}' }, note: 'Ghi vào sổ: ai hỏi IPaymentService thì cấp ThanhToanTheTinDung. Singleton nghĩa là dùng chung một đối tượng suốt vòng đời ứng dụng.' },
              { line: 7, vars: { services: '{IPaymentService: ThanhToanTheTinDung, OrderService: OrderService}' }, note: 'Transient thì mỗi lần hỏi lại tạo một đối tượng mới.' },
              { line: 9, vars: { provider: '→ 0x1200' }, refs: { provider: '0x1200' }, heap: { '0x1200': 'ServiceProvider { đã khoá sổ đăng ký }' }, note: 'Chốt sổ, từ đây container sẵn sàng cấp phát.' },
              { line: 12, vars: { provider: '→ 0x1200' }, refs: { provider: '0x1200' }, heap: { '0x1200': 'ServiceProvider' }, note: 'Xin một OrderService. Container soi constructor của nó, thấy cần một IPaymentService.' },
              { line: 12, vars: { provider: '→ 0x1200', order: '→ 0x1210' }, refs: { provider: '0x1200', order: '0x1210' }, heap: { '0x1200': 'ServiceProvider', '0x1220': 'ThanhToanTheTinDung { }', '0x1210': 'OrderService { payment: → 0x1220 }' }, note: 'Container tự tra sổ, tự tạo ThanhToanTheTinDung rồi tự tiêm vào — ta không gõ dòng new nào cả. Phụ thuộc lồng nhiều tầng nó cũng tự giải đệ quy.' },
              { line: 13, vars: { order: '→ 0x1210' }, refs: { order: '0x1210' }, heap: { '0x1220': 'ThanhToanTheTinDung { }', '0x1210': 'OrderService { payment: → 0x1220 }' }, output: ['Quẹt thẻ: 250.000 đ'], note: 'Toàn bộ ASP.NET Core hoạt động theo đúng cơ chế này: controller nhận service qua constructor, service nhận DbContext qua constructor.' },
            ],},
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Vì sao học DI ngay từ bây giờ',
          text: 'Toàn bộ ASP.NET Core được xây trên DI. Controller nhận service qua constructor, service nhận DbContext qua constructor. Nắm chắc phần này thì sang phần web sẽ nhẹ hẳn.',
        },
      ],
    },
  ],

  exercises: [

    {
      id: 'b15-1', level: 'Cơ bản', title: 'Nhận diện 4 tính chất OOP',
      requirement: 'Lấy bài quản lý nhân viên đã viết ở buổi 13. Chỉ ra chính xác dòng code nào thể hiện đóng gói, kế thừa, đa hình và trừu tượng, mỗi tính chất một ví dụ.',
      signature: '// Đóng gói: … / Kế thừa: … / Đa hình: … / Trừu tượng: …',
      constraints: ['Phải trích đúng dòng code trong bài của mình, không viết lý thuyết chung'],
      examples: [
        { input: 'private decimal soDu;', output: 'Đóng gói' },
        { input: 'foreach (NhanVien nv in ds) nv.TinhLuong();', output: 'Đa hình' },
      ],
    },
    {
      id: 'b15-2', level: 'Cơ bản', title: 'Sửa class để đóng gói đúng',
      requirement: 'Cho một class có toàn bộ field là public. Sửa thành private kèm property có kiểm tra, không được làm hỏng nơi đang sử dụng.',
      signature: 'public double Diem { get; set; }',
      constraints: ['Giữ nguyên tên thuộc tính viết hoa chữ đầu'],
      examples: [
        { input: 'sv.Diem = 11', output: 'Bị từ chối, giá trị cũ giữ nguyên' },
        { input: 'sv.Diem = 8', output: '8' },
      ],
    },
    {
      id: 'b15-3', level: 'Cơ bản', title: 'Trừu tượng khác đóng gói',
      requirement: 'Viết một ví dụ ngắn thể hiện rõ: đóng gói là giấu dữ liệu, còn trừu tượng là giấu cách làm.',
      signature: '// Encapsulation vs Abstraction',
      constraints: ['Ví dụ phải nằm trong cùng một class để thấy rõ hai khái niệm khác nhau'],
      examples: [
        { input: 'private decimal soDu;', output: 'Đóng gói — bên ngoài không đọc thẳng được dữ liệu' },
        { input: 'interface ITinhLuong { decimal Tinh(); }', output: 'Trừu tượng — bên ngoài không cần biết công thức bên trong' },
      ],
    },
    {
      id: 'b15-4', level: 'Trung bình', title: 'Áp dụng SRP',
      requirement: 'Cho class QuanLySinhVien đang vừa lưu danh sách, vừa tính điểm trung bình, vừa ghi file. Tách thành ba class theo đúng nguyên tắc trách nhiệm đơn lẻ.',
      signature: 'class SinhVien / class DiemService / class SinhVienRepository',
      constraints: ['Mỗi class chỉ được có đúng một lý do để thay đổi'],
      examples: [
        { input: 'Đổi định dạng file lưu trữ', output: 'Chỉ sửa SinhVienRepository' },
        { input: 'Đổi công thức tính điểm', output: 'Chỉ sửa DiemService' },
      ],
    },
    {
      id: 'b15-5', level: 'Trung bình', title: 'Facade Pattern',
      requirement: 'Sau khi tách theo SRP, viết một lớp Facade gom các service lại để bên ngoài chỉ cần gọi một cửa duy nhất.',
      signature: 'class SinhVienFacade { void ChotHocKy(List<SinhVien> ds); }',
      constraints: ['Bên ngoài không được gọi trực tiếp vào từng service nhỏ'],
      examples: [
        { input: 'new SinhVienFacade().ChotHocKy(ds)', output: 'Tính điểm, ghi file và gửi thông báo trong một lệnh' },
      ],
    },
    {
      id: 'b15-6', level: 'Trung bình', title: 'Khử chuỗi if bằng OCP',
      requirement: 'Cho hàm tính phí ship dùng chuỗi if/else theo loại vận chuyển (thường, nhanh, hoả tốc). Chuyển sang interface IPhiShip sao cho thêm loại mới không phải sửa code cũ.',
      signature: 'interface IPhiShip { decimal Tinh(double kg); }',
      constraints: ['Không còn chuỗi if/else theo loại vận chuyển'],
      examples: [
        { input: 'Thêm loại "quốc tế"', output: 'Chỉ viết thêm một class, không sửa file nào đang có' },
        { input: 'PhiNhanh().Tinh(2)', output: '60000' },
      ],
    },
    {
      id: 'b15-7', level: 'Trung bình', title: 'Tìm lỗi vi phạm LSP',
      requirement: 'Cho class HinhChuNhat và HinhVuong kế thừa nó, trong đó đặt chiều dài thì chiều rộng đổi theo. Chỉ ra hàm nào bị sai khi thay hình chữ nhật bằng hình vuông và đề xuất cách sửa.',
      signature: 'class HinhVuong : HinhChuNhat',
      constraints: ['Phải viết được một hàm chạy đúng với lớp cha nhưng sai với lớp con'],
      examples: [
        { input: 'h.Dai = 5; h.Rong = 4; h.TinhDienTich()', output: '20 với HinhChuNhat, 16 với HinhVuong', explain: 'Lớp con phá vỡ giả định của lớp cha nên vi phạm LSP.' },
      ],
    },
    {
      id: 'b15-8', level: 'Trung bình', title: 'Tách interface theo ISP',
      requirement: 'Cho interface IMayVanPhong gồm In, Scan, Fax. Tách nhỏ để máy in thường không phải cài đặt Scan và Fax.',
      signature: 'interface IMayIn / IMayScan / IMayFax',
      constraints: ['Không class nào phải cài đặt phương thức mình không dùng'],
      examples: [
        { input: 'class MayInThuong', output: 'Chỉ cài IMayIn' },
        { input: 'class MayDaNang', output: 'Cài IMayIn, IMayScan' },
      ],
    },
    {
      id: 'b15-9', level: 'Nâng cao', title: 'Dependency Injection thủ công',
      requirement: 'Viết OrderService nhận IPaymentService qua constructor. Cài ba bản: tiền mặt, thẻ tín dụng, ví điện tử. Cho người dùng chọn phương thức lúc chạy.',
      signature: 'class OrderService { OrderService(IPaymentService payment); void Checkout(decimal tien); }',
      constraints: ['OrderService không được chứa từ khoá new cho bất kỳ phương thức thanh toán nào'],
      examples: [
        { input: 'new OrderService(new ThanhToanTheTinDung()).Checkout(250000)', output: '"Quẹt thẻ: 250.000 đ"' },
        { input: 'new OrderService(new ThanhToanTienMat()).Checkout(250000)', output: '"Nhận tiền mặt: 250.000 đ"' },
      ],
    },
    {
      id: 'b15-10', level: 'Nâng cao', title: 'Tự xây DI container mini',
      requirement: 'Viết class DIContainer có Register<TInterface, TImplement>() lưu vào Dictionary và Resolve<T>() dùng Activator để tạo đối tượng, xử lý được cả trường hợp constructor của implement lại cần tiêm tiếp phụ thuộc khác.',
      signature: 'class DIContainer { void Register<TI, TImp>(); T Resolve<T>(); }',
      constraints: ['Phải tự giải đệ quy các phụ thuộc lồng nhau'],
      examples: [
        { input: 'Register<IPayment, TheTinDung>(); Resolve<OrderService>()', output: 'OrderService đã được tiêm sẵn TheTinDung' },
      ],
      hint: 'Type.GetConstructors() để đọc danh sách tham số rồi Resolve từng cái.',
    },
    {
      id: 'b15-11', level: 'Nâng cao', title: 'Vòng đời service trong DI container .NET',
      requirement: 'Cài Microsoft.Extensions.DependencyInjection, đăng ký cùng một service theo ba vòng đời rồi lấy ra hai lần mỗi loại. So sánh HashCode để chỉ ra khác biệt.',
      signature: 'services.AddSingleton / AddTransient / AddScoped',
      constraints: ['Phải in HashCode của đối tượng để chứng minh'],
      examples: [
        { input: 'AddSingleton, lấy 2 lần', output: 'Hai lần cùng HashCode' },
        { input: 'AddTransient, lấy 2 lần', output: 'Hai lần khác HashCode' },
      ],
    },
    {
      id: 'b15-12', level: 'Nâng cao', title: 'Hệ thống thanh toán đơn hàng — bài tổng hợp',
      requirement: 'Xây hệ thống quản lý thanh toán đơn hàng áp dụng đủ 5 nguyên tắc SOLID: thêm sản phẩm vào đơn, tính tổng giá trị, chọn phương thức thanh toán (tiền mặt, thẻ, ví điện tử) và thực hiện thanh toán. Thêm phương thức thanh toán mới không được sửa mã nguồn cũ.',
      signature: 'class Order / interface IPaymentMethod / class PaymentProcessor',
      constraints: ['Order chỉ quản lý sản phẩm', 'PaymentProcessor chỉ phụ thuộc vào interface', 'Thêm phương thức mới chỉ được thêm file mới'],
      examples: [
        { input: '3 sản phẩm tổng 850.000, chọn ví điện tử', output: '"Tổng đơn: 850.000 đ"\\n"Thanh toán qua ví điện tử: 850.000 đ"' },
        { input: 'Thêm phương thức "trả góp"', output: 'Chỉ viết thêm một class cài IPaymentMethod' },
      ],
    },
  ],
}

export default buoi15
