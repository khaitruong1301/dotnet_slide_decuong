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
          
            trace: [

              { line: 16, vars: { mario: '→ 0x200' }, refs: { mario: '0x200' },
                heap: { '0x200': 'NhanVat { Ten: null, Mau: 0, SatThuong: 0 }' },
                note: 'new cấp phát một vùng nhớ trên heap. Mọi thuộc tính nhận giá trị mặc định: string là null, int là 0.' },
              { line: 17, vars: { mario: '→ 0x200' }, refs: { mario: '0x200' },
                heap: { '0x200': 'NhanVat { Ten: "Mario", Mau: 0, SatThuong: 0 }' },
                note: 'Biến mario trên stack không đổi — nó vẫn giữ đúng địa chỉ 0x200. Thứ thay đổi là nội dung trên heap.' },
              { line: 18, vars: { mario: '→ 0x200' }, refs: { mario: '0x200' },
                heap: { '0x200': 'NhanVat { Ten: "Mario", Mau: 100, SatThuong: 0 }' } },
              { line: 19, vars: { mario: '→ 0x200' }, refs: { mario: '0x200' },
                heap: { '0x200': 'NhanVat { Ten: "Mario", Mau: 100, SatThuong: 20 }' } },
              { line: 11, vars: { mario: '→ 0x200' }, refs: { mario: '0x200' },
                heap: { '0x200': 'NhanVat { Ten: "Mario", Mau: 100, SatThuong: 20 }' },
                output: ['Mario — máu 100, sát thương 20'],
                note: 'Bên trong phương thức, viết Ten là đang đọc thuộc tính của chính đối tượng đang gọi.' },
            ],},
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
          
            trace: [

              { line: 1, vars: { x: '5' }, note: 'int là kiểu GIÁ TRỊ — nằm thẳng trên stack, không có địa chỉ heap nào.' },
              { line: 2, vars: { x: '5', y: '5' }, note: 'Gán y = x tạo ra một BẢN SAO. Hai ô nhớ hoàn toàn riêng biệt.' },
              { line: 3, vars: { x: '5', y: '99' }, note: 'Sửa y không đụng gì tới x.' },
              { line: 4, vars: { x: '5', y: '99' }, output: ['5'], note: 'x vẫn là 5 — đúng như trực giác.' },
              { line: 6, vars: { x: '5', y: '99', a: '→ 0x300' }, refs: { a: '0x300' },
                heap: { '0x300': 'NhanVat { Ten: "Mario" }' },
                output: ['5'], note: 'Class là kiểu THAM CHIẾU — biến a chỉ giữ địa chỉ, dữ liệu nằm trên heap.' },
              { line: 7, vars: { x: '5', y: '99', a: '→ 0x300', b: '→ 0x300' }, refs: { a: '0x300', b: '0x300' },
                heap: { '0x300': 'NhanVat { Ten: "Mario" }' },
                output: ['5'], note: 'Gán b = a chỉ sao chép ĐỊA CHỈ chứ không sao chép đối tượng. Giờ hai biến cùng trỏ về một chỗ — để ý nhãn đỏ trên ô nhớ.' },
              { line: 8, vars: { x: '5', y: '99', a: '→ 0x300', b: '→ 0x300' }, refs: { a: '0x300', b: '0x300' },
                heap: { '0x300': 'NhanVat { Ten: "Luigi" }' },
                output: ['5'], note: 'Sửa qua b là sửa thẳng vào ô nhớ 0x300 — cũng chính là ô mà a đang trỏ tới.' },
              { line: 9, vars: { x: '5', y: '99', a: '→ 0x300', b: '→ 0x300' }, refs: { a: '0x300', b: '0x300' },
                heap: { '0x300': 'NhanVat { Ten: "Luigi" }' },
                output: ['5', 'Luigi'], note: 'a.Ten cũng thành Luigi dù ta không hề chạm vào a. Đây là khác biệt cốt lõi giữa tham trị và tham chiếu.' },
            ],},
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
          
            trace: [

              { line: 16, vars: { tk: '→ 0x400' }, refs: { tk: '0x400' },
                heap: { '0x400': 'TaiKhoan { TenChuThe: null, soDu: 0, maPin: null }' },
                note: 'Đối tượng vừa tạo, số dư bằng 0.' },
              { line: 17, vars: { tk: '→ 0x400' }, refs: { tk: '0x400' },
                heap: { '0x400': 'TaiKhoan { TenChuThe: null, soDu: 0, maPin: null }' },
                note: 'Gọi NapTien(500000) — bên ngoài buộc phải đi qua cửa này.' },
              { line: 9, vars: { soTien: '500000' },
                heap: { '0x400': 'TaiKhoan { soDu: 0 }' },
                note: '500000 > 0 nên vượt qua chốt kiểm tra. Nếu truyền số âm thì hàm return luôn, số dư không đổi.' },
              { line: 10, vars: { soTien: '500000' },
                heap: { '0x400': 'TaiKhoan { soDu: 500000 }' },
                note: 'Số dư chỉ đổi ở đúng một chỗ duy nhất trong toàn bộ chương trình.' },
              { line: 18, vars: { tk: '→ 0x400' }, refs: { tk: '0x400' },
                heap: { '0x400': 'TaiKhoan { soDu: 500000 }' },
                note: 'Dòng tk.soDu = 1000000 nếu viết ra sẽ lỗi biên dịch — private chặn từ lúc build chứ không đợi tới lúc chạy.' },
              { line: 19, vars: { tk: '→ 0x400' }, refs: { tk: '0x400' },
                heap: { '0x400': 'TaiKhoan { soDu: 500000 }' },
                output: ['500000'], note: 'Muốn đọc thì phải qua phương thức công khai XemSoDu().' },
            ],},
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

    {
      id: 'b9-1', level: 'Cơ bản', title: 'Thiết kế class SinhVien',
      requirement: 'Thiết kế class SinhVien gồm mã, tên, điểm trung bình và phương thức HienThi() trả về chuỗi mô tả sinh viên theo dạng "mã — tên — ĐTB điểm".',
      signature: 'class SinhVien { string Ma; string Ten; double Dtb; string HienThi(); }',
      constraints: ['0 <= Dtb <= 10'],
      examples: [
        { input: 'Ma = "SV001", Ten = "Nguyễn Văn A", Dtb = 8.5', output: '"SV001 — Nguyễn Văn A — ĐTB 8.5"' },
      ],
    },
    {
      id: 'b9-2', level: 'Cơ bản', title: 'Class HinhChuNhat',
      requirement: 'Thiết kế class HinhChuNhat gồm chiều dài, chiều rộng và hai phương thức tính chu vi, diện tích.',
      signature: 'class HinhChuNhat { double TinhChuVi(); double TinhDienTich(); }',
      constraints: ['0 < dai, rong <= 10000'],
      examples: [
        { input: 'dai = 5, rong = 3', output: 'ChuVi = 16, DienTich = 15' },
        { input: 'dai = 2, rong = 2', output: 'ChuVi = 8, DienTich = 4' },
      ],
    },
    {
      id: 'b9-3', level: 'Cơ bản', title: 'Nhân vật game tấn công nhau',
      requirement: 'Thiết kế class NhanVat gồm tên, máu, sát thương và phương thức TanCong nhận vào một nhân vật khác, trừ máu mục tiêu đúng bằng sát thương của mình. Máu không được xuống dưới 0.',
      signature: 'class NhanVat { void TanCong(NhanVat mucTieu); }',
      constraints: ['0 <= Mau <= 10000', '0 <= SatThuong <= 1000'],
      examples: [
        { input: 'a(Mau=100, SatThuong=30) tấn công b(Mau=50)', output: 'b.Mau = 20' },
        { input: 'a(SatThuong=80) tấn công b(Mau=50)', output: 'b.Mau = 0', explain: 'Máu bị chặn ở 0, không cho âm.' },
      ],
      hint: 'Truyền chính đối tượng khác vào làm tham số của phương thức.',
    },
    {
      id: 'b9-4', level: 'Cơ bản', title: 'Kiểu tham chiếu và kiểu giá trị',
      requirement: 'Cho một class NhanVat có thuộc tính Ten. Gán b = a rồi đổi b.Ten. Trả về giá trị của a.Ten sau khi đổi, và giải thích vì sao khác với trường hợp gán hai biến int.',
      signature: 'string KetQuaSauKhiGan()',
      constraints: ['NhanVat là class, không phải struct'],
      examples: [
        { input: 'a.Ten = "Mario"; b = a; b.Ten = "Luigi"', output: '"Luigi"', explain: 'Class là kiểu tham chiếu nên a và b cùng trỏ một vùng nhớ.' },
        { input: 'int x = 5; int y = x; y = 99', output: 'x vẫn là 5', explain: 'int là kiểu giá trị nên được sao chép hẳn ra.' },
      ],
    },
    {
      id: 'b9-5', level: 'Trung bình', title: 'Bảo vệ số dư bằng private',
      requirement: 'Thiết kế class TaiKhoan có số dư là private, chỉ thay đổi được qua NapTien và RutTien. Nạp số âm thì bỏ qua. Rút quá số dư thì trả về false và giữ nguyên số dư.',
      signature: 'class TaiKhoan { void NapTien(decimal s); bool RutTien(decimal s); decimal XemSoDu(); }',
      constraints: ['Không được để lộ field số dư ra ngoài dưới dạng public'],
      examples: [
        { input: 'NapTien(500000); RutTien(800000)', output: 'false, XemSoDu() = 500000' },
        { input: 'NapTien(500000); RutTien(200000)', output: 'true, XemSoDu() = 300000' },
      ],
    },
    {
      id: 'b9-6', level: 'Trung bình', title: 'Tìm sinh viên điểm cao nhất',
      requirement: 'Cho một List<SinhVien>. Trả về sinh viên có điểm trung bình cao nhất. Danh sách rỗng thì trả về null.',
      signature: 'SinhVien? DiemCaoNhat(List<SinhVien> ds)',
      constraints: ['0 <= ds.Count <= 100000'],
      examples: [
        { input: 'ds = [("A", 7.5), ("B", 9.0), ("C", 8.0)]', output: 'Sinh viên B' },
        { input: 'ds = []', output: 'null' },
      ],
    },
    {
      id: 'b9-7', level: 'Trung bình', title: 'Quản lý danh sách công việc',
      requirement: 'Thiết kế class Task gồm tên và trạng thái hoàn thành, kèm chương trình console có menu: 1/ Thêm task, 2/ Hiển thị danh sách, 3/ Đánh dấu hoàn thành theo số thứ tự, 4/ Thoát.',
      signature: 'class Task { string Ten; bool DaXong; }',
      constraints: ['Số thứ tự nhập sai phải báo lỗi, không được văng exception'],
      examples: [
        { input: 'Thêm "Task abc", rồi chọn 2', output: '1/ Task abc — Pending' },
        { input: 'Đánh dấu 1 hoàn thành, rồi chọn 2', output: '1/ Task abc — Done' },
      ],
    },
    {
      id: 'b9-8', level: 'Trung bình', title: 'Quản lý thực đơn quán ăn',
      requirement: 'Thiết kế class MonAn gồm tên và giá, kèm menu console: 1/ Thêm món, 2/ Hiển thị thực đơn, 3/ Xoá món theo số thứ tự, 4/ Thoát.',
      signature: 'class MonAn { string Ten; decimal Gia; }',
      constraints: ['Giá phải là số dương, nhập sai thì từ chối'],
      examples: [
        { input: 'Thực đơn [cơm chiên 1000, cá chiên 2000], chọn xoá 2', output: '1/ cơm chiên — 1000' },
      ],
    },
    {
      id: 'b9-9', level: 'Nâng cao', title: 'Quản lý thông tin nhân viên',
      requirement: 'Thiết kế class NhanVien gồm mã, tên, lương một giờ và số giờ làm. Xây menu console: thêm, tìm theo tên không dấu, đổi tên theo mã, xoá, hiển thị danh sách kèm lương, thoát. Lương = lương một giờ × số giờ làm.',
      signature: 'class NhanVien { string Ma, Ten; decimal Luong1h; int SoGioLam; decimal TinhLuong(); }',
      constraints: ['Tìm kiếm không phân biệt hoa thường và không phân biệt dấu tiếng Việt'],
      examples: [
        { input: 'Nhân viên ("NV01", "Trần Bình", 50000, 160), tìm "tran binh"', output: 'NV01 — Trần Bình — 8.000.000 đ' },
      ],
      hint: 'Chuẩn hoá chuỗi về không dấu chữ thường trước khi so sánh.',
    },
    {
      id: 'b9-10', level: 'Nâng cao', title: 'Vẽ sơ đồ lớp bằng Mermaid',
      requirement: 'Viết mã Mermaid mô tả sơ đồ lớp cho bài quản lý nhân viên: đủ thuộc tính, phương thức và ký hiệu phạm vi truy cập (+ public, − private, # protected).',
      signature: 'classDiagram …',
      constraints: ['Xem trước tại mermaid.live trước khi nộp'],
      examples: [
        { input: 'Class NhanVien với Ma public, luong1h private', output: 'classDiagram\\n  class NhanVien {\\n    +string Ma\\n    -decimal luong1h\\n  }' },
      ],
    },
  ],
}

export default buoi09
