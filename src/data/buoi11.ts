import type { Buoi } from './types'

const buoi11: Buoi = {
  id: 11,
  slug: 'property-dong-goi-static',
  title: 'Property, đóng gói & thành phần tĩnh',
  subtitle: 'Kiểm soát chặt việc đọc — ghi dữ liệu, và phân biệt cái thuộc đối tượng với cái thuộc class',
  duration: '3 giờ',
  keywords: ['property', 'get', 'set', 'init', 'encapsulation', 'static', 'readonly'],
  goals: [
    'Thay field public bằng property có get / set để chặn giá trị sai',
    'Chọn đúng dạng property: auto, read-only, có kiểm tra hay tính toán',
    'Giải thích tính đóng gói bằng chính code mình viết',
    'Phân biệt thành phần thuộc đối tượng và thành phần static thuộc class',
  ],

  sections: [
    {
          id: 'property',
          title: '1. Property — get và set',
          blocks: [
            {
              type: 'text',
              text: 'Để public field thì ai cũng gán bừa được. Để private field rồi viết hai phương thức lấy và đặt thì lại dài dòng. Property là lối đi giữa: viết như thuộc tính, chạy như phương thức.',
            },
            {
              type: 'code',
              sample: {
                title: 'Từ field trần tới property có kiểm soát',
                code: `class SinhVien
    {
        // Auto-property: C# tự sinh vùng nhớ ẩn phía sau
        public string Ten { get; set; }

        // Chỉ đọc từ bên ngoài, chỉ ghi được từ trong class
        public string Ma { get; private set; }

        // Property có luật kiểm tra
        private double diem;
        public double Diem
        {
            get => diem;
            set
            {
                if (value < 0 || value > 10)
                    throw new ArgumentException("Điểm phải từ 0 đến 10");
                diem = value;
            }
        }

        // Property tính toán — chỉ có get, không lưu trữ gì
        public string XepLoai => Diem >= 8 ? "Giỏi" : Diem >= 5 ? "Đạt" : "Chưa đạt";
    }`,
                note: 'value là từ khoá đại diện cho giá trị đang được gán vào. Property chỉ có get gọi là read-only.',
              },
            },
            {
              type: 'visual',
              visual: {
                kind: 'flow',
                caption: 'Mọi phép gán đều phải đi qua cửa set — đó là chỗ đặt luật',
                steps: [
                  { kind: 'io', text: 'sv.Diem = 11' },
                  { kind: 'process', text: 'Nhảy vào khối set, value = 11' },
                  {
                    kind: 'decision',
                    text: 'value nằm trong 0..10?',
                    branches: [
                      { label: 'Đúng', steps: [{ kind: 'process', text: 'Ghi vào field diem' }] },
                      { label: 'Sai', steps: [{ kind: 'end', text: 'Ném ArgumentException, field giữ nguyên' }] },
                    ],
                  },
                ],
              },
            },
            {
              type: 'table',
              head: ['Dạng property', 'Viết thế nào', 'Dùng khi'],
              rows: [
                ['Auto-property', 'public string Ten { get; set; }', 'Không cần kiểm tra gì'],
                ['Read-only bên ngoài', 'public string Ma { get; private set; }', 'Mã, id — bên ngoài xem được, không sửa được'],
                ['Có kiểm tra', 'get => x; set { … x = value; }', 'Cần chặn giá trị sai'],
                ['Tính toán', 'public string XepLoai => …;', 'Giá trị suy ra từ dữ liệu khác'],
                ['Chỉ khởi tạo', 'public string Ma { get; init; }', 'Chỉ gán lúc tạo đối tượng, sau đó khoá'],
              ],
            },
            {
              type: 'callout',
              tone: 'tip',
              title: 'Đây chính là tính đóng gói (Encapsulation)',
              text: 'Giấu dữ liệu bằng private field, mở cửa có kiểm soát bằng property. Đối tượng tự bảo vệ trạng thái của mình, bên ngoài không thể đẩy nó vào trạng thái vô lý.',
            },
          ],
        },
    {
          id: 'static',
          title: '2. static — thuộc về class, không thuộc về đối tượng',
          blocks: [
            {
              type: 'text',
              text: 'Thành phần thường thì mỗi đối tượng giữ một bản riêng. Thành phần static chỉ có đúng một bản dùng chung cho cả class, tồn tại kể cả khi chưa tạo đối tượng nào.',
            },
            {
              type: 'visual',
              visual: {
                kind: 'boxes',
                caption: 'demSoTaiKhoan là static — mọi đối tượng dùng chung một ô nhớ duy nhất',
                items: [
                  { label: 'tk1.SoTaiKhoan', value: '"TK001"', note: 'riêng của tk1' },
                  { label: 'tk2.SoTaiKhoan', value: '"TK002"', note: 'riêng của tk2' },
                  { label: 'TaiKhoan.demSoTaiKhoan', value: '2', note: 'static — dùng chung' },
                ],
              },
            },
            {
              type: 'code',
              sample: {
                title: 'Đếm số tài khoản đã tạo bằng biến static',
                code: `class TaiKhoan
    {
        private static int demSoTaiKhoan = 0;      // dùng chung cả class

        public string SoTaiKhoan { get; private set; }
        public string TenChuThe { get; set; }
        private decimal soDu;

        public TaiKhoan(string tenChuThe)
        {
            demSoTaiKhoan++;                        // mỗi lần new tăng 1
            SoTaiKhoan = $"TK{demSoTaiKhoan:D3}";   // TK001, TK002, …
            TenChuThe = tenChuThe;
        }

        // Phương thức static — gọi qua tên CLASS, không cần đối tượng
        public static int DemTaiKhoan() => demSoTaiKhoan;
    }

    var tk1 = new TaiKhoan("An");
    var tk2 = new TaiKhoan("Bình");
    Console.WriteLine(tk2.SoTaiKhoan);         // TK002
    Console.WriteLine(TaiKhoan.DemTaiKhoan()); // 2 — gọi qua tên class`,
                note: 'Không viết được tk1.DemTaiKhoan() — thành phần static thuộc về class chứ không thuộc về đối tượng.',
              },
            },
            {
              type: 'callout',
              tone: 'warn',
              title: 'Phương thức static không đụng được vào dữ liệu đối tượng',
              text: 'Trong một phương thức static không có this, nên không truy cập được thuộc tính thường. Điều đó hợp lý: lúc gọi nó có thể chưa tồn tại đối tượng nào cả.',
            },
            {
              type: 'code',
              sample: {
                title: 'Static constructor',
                code: `class CauHinh
    {
        public static string DuongDanLog;

        // Chạy đúng MỘT lần, ngay trước lần đầu class được dùng tới
        static CauHinh()
        {
            DuongDanLog = "logs/app.log";
            Console.WriteLine("Đã nạp cấu hình");
        }
    }`,
                note: 'Không có tham số, không có access modifier. Dùng để chuẩn bị dữ liệu dùng chung.',
              },
            },
            {
              type: 'table',
              head: ['So sánh', 'Thành phần thường', 'Thành phần static'],
              rows: [
                ['Thuộc về', 'Từng đối tượng', 'Cả class'],
                ['Số bản trong bộ nhớ', 'Mỗi đối tượng một bản', 'Đúng một bản'],
                ['Gọi thế nào', 'tenDoiTuong.ThanhPhan', 'TenClass.ThanhPhan'],
                ['Cần new trước không', 'Có', 'Không'],
                ['Ví dụ thực tế', 'Tên, số dư của một tài khoản', 'Bộ đếm, hằng số, Math.PI'],
              ],
            },
          ],
        },
    {
      id: 'readonly-const',
      title: '3. readonly, const và ứng dụng đóng gói',
      blocks: [
        {
          type: 'text',
          text: 'Đóng gói không chỉ là giấu field. Nhiều giá trị sau khi đặt xong thì không được phép đổi nữa — C# có hai từ khoá riêng cho việc đó.',
        },
        {
          type: 'table',
          head: ['Từ khoá', 'Gán được ở đâu', 'Ví dụ'],
          rows: [
            ['const', 'Ngay lúc khai báo, cố định lúc biên dịch', 'const double Pi = 3.14159;'],
            ['static readonly', 'Khai báo hoặc trong static constructor', 'static readonly DateTime NgayChay = DateTime.Now;'],
            ['readonly', 'Khai báo hoặc trong constructor của đối tượng', 'private readonly string ma;'],
            ['{ get; init; }', 'Chỉ lúc tạo đối tượng, sau đó khoá', 'public string Ma { get; init; }'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'Mã tài khoản không ai đổi được sau khi tạo',
            code: `class TaiKhoan
{
    public const decimal SO_DU_TOI_THIEU = 50_000m;   // hằng số của cả class

    private readonly string ma;      // gán một lần trong constructor
    private decimal soDu;

    public TaiKhoan(string ma, decimal soDuBanDau)
    {
        this.ma = ma;                // hợp lệ — đang trong constructor
        soDu = Math.Max(soDuBanDau, SO_DU_TOI_THIEU);
    }

    public void DoiMa(string maMoi)
    {
        // ma = maMoi;               // LỖI biên dịch — readonly, ngoài constructor không gán được
    }
}`,
            note: 'readonly chặn ngay lúc biên dịch, an toàn hơn hẳn việc chỉ dặn nhau "đừng sửa cái này".',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Ba lớp phòng thủ của một đối tượng được đóng gói tốt',
            steps: [
              { kind: 'io', text: 'Bên ngoài muốn đổi dữ liệu' },
              {
                kind: 'decision',
                text: 'Đi vào bằng đường nào?',
                branches: [
                  { label: 'Field private', steps: [{ kind: 'end', text: 'Chặn ngay — lỗi biên dịch' }] },
                  { label: 'Property có set', steps: [{ kind: 'process', text: 'Chạy luật kiểm tra rồi mới ghi' }] },
                  { label: 'Field readonly', steps: [{ kind: 'end', text: 'Chỉ constructor mới được, sau đó khoá' }] },
                ],
              },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Dấu hiệu một class đóng gói kém',
          text: 'Nếu bên ngoài phải gọi ba bốn dòng liên tiếp mới đưa đối tượng về trạng thái đúng, nghĩa là class đang để lộ quá nhiều. Hãy gộp mấy dòng đó thành một phương thức đặt ngay trong class.',
        },
      ],
    },
  ],

  exercises: [
    { id: 'b11-5', level: 'Cơ bản', title: 'Auto-property', requirement: 'Chuyển toàn bộ field public của class SinhVien sang auto-property, riêng Ma dùng get; private set;.', hint: 'Ma chỉ được gán trong constructor.' },
    { id: 'b11-6', level: 'Trung bình', title: 'Property có kiểm tra', requirement: 'Property Diem của SinhVien chỉ nhận giá trị 0–10, ngoài khoảng thì ném ArgumentException. Viết chương trình bắt lỗi bằng try-catch.', io: { input: 'sv.Diem = 11', output: 'Điểm phải từ 0 đến 10' } },
    { id: 'b11-7', level: 'Trung bình', title: 'Property tính toán', requirement: 'Thêm property XepLoai (chỉ có get) trả về Giỏi / Khá / Trung bình / Yếu dựa trên Diem, không lưu thêm field nào.', hint: 'public string XepLoai => Diem switch { … };' },
    { id: 'b11-8', level: 'Trung bình', title: 'Sinh mã tự động bằng static', requirement: 'Class SanPham tự sinh mã SP001, SP002… bằng một biến đếm static tăng dần trong constructor.', io: { input: 'Tạo 3 sản phẩm', output: 'SP001, SP002, SP003' } },
    { id: 'b11-9', level: 'Trung bình', title: 'Lớp tiện ích static', requirement: 'Viết class MathHelper chỉ chứa phương thức static: LaSoNguyenTo, GiaiThua, DaoChuoi. Gọi trực tiếp qua tên class.', hint: 'Bài này chính là bài buổi 7 tổ chức lại theo hướng đối tượng.' },
    { id: 'b11-10', level: 'Trung bình', title: 'Tài khoản ngân hàng đóng gói đầy đủ', requirement: 'Class TaiKhoan: SoTaiKhoan sinh tự động bằng static, TenChuThe get/set, soDu private chỉ đổi qua NapTien/RutTien, maPin private hoàn toàn. Rút quá số dư thì từ chối.', io: { input: 'Nạp 500.000 rồi rút 800.000', output: 'Số dư không đủ. Số dư hiện tại: 500.000' } },
    { id: 'b11-11', level: 'Nâng cao', title: 'Giỏ hàng', requirement: 'Class SanPham (mã tự sinh, tên, giá) và class GioHang chứa List<SanPham>. GioHang có property TongTien chỉ có get, tự cộng giá các sản phẩm. Cho thêm, xoá theo mã và in hoá đơn.', hint: 'TongTien là property tính toán, không phải field.' },
    { id: 'b11-12', level: 'Nâng cao', title: 'Quản lý nhân viên hoàn chỉnh', requirement: 'Nâng cấp bài quản lý nhân viên buổi 9: mã sinh tự động bằng static, mọi thuộc tính dùng property có kiểm tra, thêm property Luong tính từ Luong1h × SoGioLam.', hint: 'Luong là property chỉ có get.' },
  ],
}

export default buoi11
