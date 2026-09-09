import type { Buoi } from './types'

const buoi09: Buoi = {
  id: 9,
  slug: 'nhap-mon-oop-va-class',
  title: 'Nhập môn OOP & Class',
  subtitle: 'Gom dữ liệu và hành vi về cùng một đối tượng thay vì rải rác thành hàng chục biến',
  duration: '3 giờ',
  keywords: ['class', 'object', 'field', 'method', 'access modifier', 'class diagram'],
  goals: [
    'Giải thích được vì sao lập trình hướng hàm đuối khi dữ liệu phình to',
    'Phân biệt class (khuôn mẫu) và object (thể hiện)',
    'Khai báo class có thuộc tính và phương thức, tạo đối tượng bằng new',
    'Chọn đúng access modifier và đọc được sơ đồ lớp (class diagram)',
  ],

  sections: [
    {
      id: 'vi-sao-oop',
      title: '1. Vì sao cần hướng đối tượng',
      blocks: [
        {
          type: 'text',
          text: 'Tám buổi vừa rồi ta viết theo lối hướng hàm: có việc gì thì tách một hàm để xử lý. Cách này chạy tốt với bài nhỏ, nhưng đuối rất nhanh khi dữ liệu phình to.',
        },
        {
          type: 'text',
          text: 'Hãy tưởng tượng một game có 200 nhân vật, mỗi nhân vật cần tên, máu, giáp, sát thương, tốc độ. Khai báo biến rời rạc thì cần 1.000 biến, và mỗi lần thêm một thuộc tính mới là phải sửa khắp nơi.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Cùng bài toán quản lý nhân vật game',
            columns: [
              {
                title: 'Hướng hàm — biến rời rạc',
                tone: 'bad',
                items: [
                  'tenNhanVat1, mauNhanVat1, giapNhanVat1…',
                  'Thêm 1 thuộc tính = sửa hàng loạt chỗ',
                  'Hàm dùng chung, sửa một chỗ vỡ chỗ khác',
                  'Không biết biến nào thuộc về ai',
                ],
              },
              {
                title: 'Hướng đối tượng — gom về class',
                tone: 'good',
                items: [
                  'Một class NhanVat mô tả đủ mọi nhân vật',
                  'Thêm thuộc tính = sửa đúng một chỗ',
                  'Dữ liệu và hành vi đi liền nhau',
                  'Mỗi đối tượng tự giữ dữ liệu của mình',
                ],
              },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Định nghĩa ngắn gọn',
          text: 'OOP là cách tổ chức chương trình quanh các đối tượng. Mỗi đối tượng gói cả dữ liệu (thuộc tính) lẫn hành vi (phương thức) xử lý dữ liệu đó.',
        },
      ],
    },

    {
      id: 'object-la-gi',
      title: '2. Đối tượng — thuộc tính và hành vi',
      blocks: [
        {
          type: 'text',
          text: 'Trong OOP, đối tượng là bất kỳ thực thể nào có thuộc tính và hành vi. Nhân vật Mario là một đối tượng: thuộc tính gồm tên, số mạng, tốc độ; hành vi gồm nhảy, bắn, chạy.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Mọi đối tượng đều tách được thành hai nửa này',
            columns: [
              { title: 'Thuộc tính (attributes) — nó LÀ gì', tone: 'plain', items: ['name = "Mario"', 'lives = 3', 'speed = 5', 'Trả lời câu hỏi: đối tượng mang dữ liệu gì'] },
              { title: 'Hành vi (behavior) — nó LÀM gì', tone: 'plain', items: ['Jump()', 'Shoot()', 'Run()', 'Trả lời câu hỏi: đối tượng làm được việc gì'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Mẹo tìm class khi phân tích đề bài',
          text: 'Đọc đề và gạch chân các DANH TỪ — chúng thường là class (Nhân viên, Sản phẩm, Đơn hàng). Gạch chân các ĐỘNG TỪ — chúng thường là phương thức (tính lương, thêm vào giỏ, thanh toán).',
        },
      ],
    },

    {
      id: 'class-object',
      title: '3. Class và object — khuôn và sản phẩm',
      blocks: [
        {
          type: 'text',
          text: 'Class là khuôn mẫu, là kiểu dữ liệu do ta tự định nghĩa. Object là thể hiện cụ thể được đúc ra từ khuôn đó. Một class đúc được vô số object, mỗi object giữ bộ dữ liệu riêng.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Từ khuôn mẫu tới các đối tượng cụ thể trong bộ nhớ',
            steps: [
              { kind: 'process', text: 'class NhanVat — khuôn mẫu, chưa chiếm bộ nhớ dữ liệu' },
              { kind: 'process', text: 'new NhanVat(...) — cấp phát bộ nhớ, đúc ra một đối tượng' },
              {
                kind: 'decision',
                text: 'Mỗi lần new là một đối tượng riêng',
                branches: [
                  { label: 'mario', steps: [{ kind: 'note', text: 'name="Mario" · lives=3' }] },
                  { label: 'luigi', steps: [{ kind: 'note', text: 'name="Luigi" · lives=5' }] },
                ],
              },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Khai báo class và tạo đối tượng',
            code: `class NhanVat
{
    // Thuộc tính — dữ liệu của đối tượng
    public string Ten;
    public int Mau;
    public int SatThuong;

    // Phương thức — hành vi của đối tượng
    public void GioiThieu()
    {
        Console.WriteLine($"{Ten} — máu {Mau}, sát thương {SatThuong}");
    }
}

// Tạo đối tượng bằng từ khoá new
NhanVat mario = new NhanVat();
mario.Ten = "Mario";
mario.Mau = 100;
mario.SatThuong = 20;
mario.GioiThieu();          // Mario — máu 100, sát thương 20`,
            note: 'Tên class viết PascalCase. Mỗi đối tượng tạo bằng new có vùng nhớ riêng, sửa mario không ảnh hưởng luigi.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Class là kiểu tham chiếu',
          text: 'Gán b = a với a là đối tượng thì cả hai biến cùng trỏ vào MỘT vùng nhớ, sửa b là a đổi theo. Khác hẳn int hay double — những kiểu giá trị được sao chép hẳn ra.',
        },
        {
          type: 'code',
          sample: {
            title: 'Thấy sự khác biệt tham chiếu và giá trị',
            code: `int x = 5;
int y = x;        // sao chép giá trị
y = 99;
Console.WriteLine(x);        // 5 — x không đổi

NhanVat a = new NhanVat { Ten = "Mario" };
NhanVat b = a;    // sao chép THAM CHIẾU, cùng trỏ một đối tượng
b.Ten = "Luigi";
Console.WriteLine(a.Ten);    // Luigi — a đổi theo!`,
          },
        },
      ],
    },

    {
      id: 'access-modifier',
      title: '4. Access modifier — phạm vi truy cập',
      blocks: [
        {
          type: 'text',
          text: 'Access modifier quyết định ai được phép nhìn thấy và sửa một thành phần của class. Đây là công cụ chính để bảo vệ dữ liệu bên trong đối tượng.',
        },
        {
          type: 'table',
          head: ['Từ khoá', 'Ai truy cập được', 'Dùng khi'],
          rows: [
            ['public', 'Mọi nơi', 'Thứ bên ngoài cần dùng: tên, phương thức nghiệp vụ'],
            ['private', 'Chỉ trong chính class đó', 'Dữ liệu nhạy cảm: mật khẩu, số dư, biến nội bộ'],
            ['protected', 'Trong class đó và các lớp kế thừa', 'Thứ lớp con cần dùng nhưng bên ngoài thì không'],
            ['internal', 'Trong cùng một assembly (project)', 'Thành phần dùng nội bộ dự án'],
            ['protected internal', 'Lớp kế thừa hoặc cùng assembly', 'Ít gặp'],
            ['private protected', 'Lớp kế thừa nằm trong cùng assembly', 'Ít gặp'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Quy tắc mặc định',
          text: 'Bắt đầu bằng private cho mọi thứ, chỉ mở public khi thật sự cần bên ngoài dùng. Mở rộng quyền thì dễ, thu hẹp lại sau này thì phải sửa cả nơi đang gọi.',
        },
        {
          type: 'code',
          sample: {
            title: 'private bảo vệ dữ liệu như thế nào',
            code: `class TaiKhoan
{
    public string TenChuThe;
    private decimal soDu;          // bên ngoài không chạm được
    private string maPin;          // càng không

    public void NapTien(decimal soTien)
    {
        if (soTien <= 0) return;   // kiểm soát trước khi cho đổi
        soDu += soTien;
    }

    public decimal XemSoDu() => soDu;
}

TaiKhoan tk = new TaiKhoan();
tk.NapTien(500000);
// tk.soDu = 1000000;   // LỖI biên dịch — private, không sửa trực tiếp được
Console.WriteLine(tk.XemSoDu());`,
            note: 'Nhờ private, mọi thay đổi số dư buộc phải đi qua NapTien — nơi ta đặt được luật kiểm tra.',
          },
        },
      ],
    },

    {
      id: 'class-diagram',
      title: '5. Sơ đồ lớp (Class Diagram)',
      blocks: [
        {
          type: 'text',
          text: 'Sơ đồ lớp là bản vẽ mô tả cấu trúc class và quan hệ giữa chúng. Nó thuộc chuẩn UML nên giống nhau ở mọi ngôn ngữ — vẽ xong là chuyển sang C#, Java hay TypeScript đều được.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'uml',
            caption: 'Ba ngăn: tên lớp · thuộc tính · phương thức. Dấu + là public, − là private, # là protected',
            children: [
              {
                name: 'TaiKhoan',
                attrs: ['+ TenChuThe : string', '− soDu : decimal', '− maPin : string'],
                methods: ['+ NapTien(soTien) : void', '+ RutTien(soTien) : bool', '+ XemSoDu() : decimal'],
              },
              {
                name: 'NhanVat',
                attrs: ['+ Ten : string', '+ Mau : int', '# satThuong : int'],
                methods: ['+ GioiThieu() : void', '+ TanCong(muc) : void'],
              },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Vẽ sơ đồ lớp trước khi code',
          text: 'Phân tích sơ đồ lớp là việc quan trọng nhất khi mở một dự án. Có thể vẽ nhanh bằng cú pháp Mermaid tại mermaid.live rồi dán vào tài liệu dự án.',
        },
        {
          type: 'code',
          sample: {
            title: 'Cùng sơ đồ trên, viết bằng cú pháp Mermaid',
            lang: 'mermaid',
            code: `classDiagram
    class TaiKhoan {
        +string TenChuThe
        -decimal soDu
        -string maPin
        +NapTien(decimal) void
        +RutTien(decimal) bool
        +XemSoDu() decimal
    }`,
          },
        },
      ],
    },
  ],

  exercises: [
    { id: 'b9-1', level: 'Cơ bản', title: 'Class SinhVien', requirement: 'Tạo class SinhVien có các thuộc tính mã, tên, điểm trung bình và phương thức HienThi() in ra thông tin. Tạo 3 đối tượng và gọi HienThi().', io: { input: '—', output: 'SV001 — Nguyễn Văn A — ĐTB 8.5' } },
    { id: 'b9-2', level: 'Cơ bản', title: 'Class HinhChuNhat', requirement: 'Tạo class HinhChuNhat có thuộc tính dài, rộng và hai phương thức TinhChuVi(), TinhDienTich().', io: { input: 'dài 5, rộng 3', output: 'Chu vi 16, diện tích 15' } },
    { id: 'b9-3', level: 'Cơ bản', title: 'Class NhanVat game', requirement: 'Tạo class NhanVat có tên, máu, sát thương và phương thức TanCong(NhanVat mucTieu) làm giảm máu mục tiêu. Cho hai nhân vật đánh nhau vài lượt.', hint: 'Truyền chính đối tượng khác vào làm tham số.' },
    { id: 'b9-4', level: 'Cơ bản', title: 'Tham chiếu hay giá trị', requirement: 'Viết chương trình chứng minh gán hai biến đối tượng cho nhau thì cả hai cùng trỏ một vùng nhớ, còn gán hai biến int thì không.', hint: 'In giá trị trước và sau khi sửa qua biến thứ hai.' },
    { id: 'b9-5', level: 'Trung bình', title: 'Bảo vệ dữ liệu bằng private', requirement: 'Tạo class TaiKhoan có soDu là private, chỉ cho nạp và rút qua phương thức. Rút quá số dư thì báo lỗi và không trừ tiền.', io: { input: 'Số dư 500.000, rút 800.000', output: 'Số dư không đủ' } },
    { id: 'b9-6', level: 'Trung bình', title: 'Danh sách đối tượng', requirement: 'Dùng List<SinhVien> lưu nhiều sinh viên. Cho phép thêm, in toàn bộ và tìm sinh viên có điểm cao nhất.', hint: 'Kết hợp kiến thức List của buổi 8.' },
    { id: 'b9-7', level: 'Trung bình', title: 'Quản lý danh sách công việc', requirement: 'Tạo class Task gồm tên và trạng thái hoàn thành. Xây dựng menu: 1/ Thêm task, 2/ Hiển thị danh sách, 3/ Đánh dấu hoàn thành, 4/ Thoát.', io: { input: 'Thêm "Task abc"', output: 'Danh sách:\n1/ Task abc — Pending' } },
    { id: 'b9-8', level: 'Trung bình', title: 'Quản lý thực đơn quán ăn', requirement: 'Tạo class MonAn gồm tên và giá. Menu: 1/ Thêm món, 2/ Hiển thị thực đơn, 3/ Xoá món theo số thứ tự, 4/ Thoát.', io: { input: 'Chọn món xoá: 2', output: '1/ cơm chiên — 1000' } },
    { id: 'b9-9', level: 'Nâng cao', title: 'Quản lý thông tin nhân viên', requirement: 'Class NhanVien gồm mã, tên, lương 1 giờ, số giờ làm. Menu: thêm, tìm theo tên (không dấu), đổi tên, xoá, hiển thị danh sách kèm lương tính theo số giờ, thoát. Phân tích class trước khi code.', hint: 'Lương = luong1h × soGioLam. Tìm không dấu thì chuẩn hoá chuỗi trước khi so.' },
    { id: 'b9-10', level: 'Nâng cao', title: 'Vẽ sơ đồ lớp cho bài quản lý nhân viên', requirement: 'Vẽ class diagram cho bài trên bằng Mermaid: ghi rõ thuộc tính, phương thức và ký hiệu phạm vi truy cập (+ − #).', hint: 'mermaid.live để xem trước hình.' },
  ],
}

export default buoi09
