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

    {
      id: 'b11-1', level: 'Cơ bản', title: 'Chuyển field sang auto-property',
      requirement: 'Chuyển toàn bộ field public của class SinhVien sang auto-property. Riêng Ma chỉ được gán bên trong class, bên ngoài chỉ đọc được.',
      signature: 'public string Ma { get; private set; }',
      constraints: ['Không đổi tên thuộc tính, nơi đang dùng vẫn phải chạy'],
      examples: [
        { input: 'sv.Ma', output: 'Đọc được' },
        { input: 'sv.Ma = "SV999"', output: 'Lỗi biên dịch', explain: 'set là private nên chỉ constructor và phương thức trong class mới gán được.' },
      ],
    },
    {
      id: 'b11-2', level: 'Cơ bản', title: 'Property có kiểm tra',
      requirement: 'Property Diem của SinhVien chỉ nhận giá trị trong khoảng 0–10, ngoài khoảng thì ném ArgumentException. Viết chương trình bắt lỗi bằng try-catch.',
      signature: 'public double Diem { get; set; }',
      constraints: ['Giá trị cũ phải được giữ nguyên khi phép gán bị từ chối'],
      examples: [
        { input: 'sv.Diem = 8.5', output: '8.5' },
        { input: 'sv.Diem = 11', output: 'ArgumentException: Điểm phải từ 0 đến 10' },
      ],
    },
    {
      id: 'b11-3', level: 'Cơ bản', title: 'Property tính toán',
      requirement: 'Thêm property XepLoai chỉ có get, trả về Giỏi / Khá / Trung bình / Yếu dựa trên Diem. Không được lưu thêm field nào.',
      signature: 'public string XepLoai { get; }',
      constraints: ['Không được thêm field lưu trữ xếp loại'],
      examples: [
        { input: 'Diem = 8.5', output: '"Giỏi"' },
        { input: 'Diem = 4', output: '"Yếu"' },
      ],
      hint: 'public string XepLoai => Diem switch { … };',
    },
    {
      id: 'b11-4', level: 'Trung bình', title: 'Sinh mã tự động bằng static',
      requirement: 'Class SanPham tự sinh mã theo dạng SP001, SP002… bằng một biến đếm static tăng dần trong constructor.',
      signature: 'private static int demSanPham;',
      constraints: ['Biến đếm dùng chung cho cả class, không thuộc về từng đối tượng'],
      examples: [
        { input: 'Tạo lần lượt 3 sản phẩm', output: 'SP001, SP002, SP003' },
      ],
    },
    {
      id: 'b11-5', level: 'Trung bình', title: 'Lớp tiện ích static',
      requirement: 'Viết class MathHelper chỉ chứa phương thức static: LaSoNguyenTo, GiaiThua, DaoChuoi. Gọi trực tiếp qua tên class, không cần tạo đối tượng.',
      signature: 'static class MathHelper { static bool LaSoNguyenTo(int n); … }',
      constraints: ['Không được tạo đối tượng MathHelper'],
      examples: [
        { input: 'MathHelper.LaSoNguyenTo(7)', output: 'true' },
        { input: 'MathHelper.GiaiThua(5)', output: '120' },
      ],
    },
    {
      id: 'b11-6', level: 'Trung bình', title: 'Đếm số đối tượng đã tạo',
      requirement: 'Class TaiKhoan đếm tổng số tài khoản đã được tạo bằng biến static, và cung cấp một phương thức static để đọc con số đó.',
      signature: 'static int DemTaiKhoan()',
      constraints: ['Phải gọi được khi chưa tạo đối tượng nào'],
      examples: [
        { input: 'Chưa tạo đối tượng nào, gọi TaiKhoan.DemTaiKhoan()', output: '0' },
        { input: 'Tạo 2 tài khoản rồi gọi lại', output: '2' },
      ],
    },
    {
      id: 'b11-7', level: 'Nâng cao', title: 'Tài khoản ngân hàng đóng gói đầy đủ',
      requirement: 'Thiết kế class TaiKhoan: số tài khoản sinh tự động bằng static và readonly, tên chủ thẻ get/set, số dư private chỉ đổi qua NapTien và RutTien, mã PIN private hoàn toàn. Rút quá số dư thì từ chối.',
      signature: 'class TaiKhoan { string SoTaiKhoan { get; } void NapTien(decimal); bool RutTien(decimal); }',
      constraints: ['Số tài khoản không được đổi sau khi tạo', 'Mã PIN không được lộ ra ngoài dưới bất kỳ dạng nào'],
      examples: [
        { input: 'NapTien(500000); RutTien(800000)', output: 'false — Số dư không đủ, số dư vẫn là 500.000' },
        { input: 'tk.SoTaiKhoan = "TK999"', output: 'Lỗi biên dịch' },
      ],
    },
    {
      id: 'b11-8', level: 'Nâng cao', title: 'Giỏ hàng với property tính toán',
      requirement: 'Thiết kế class SanPham (mã tự sinh, tên, giá) và class GioHang chứa danh sách sản phẩm. GioHang có property TongTien chỉ có get, tự cộng giá các sản phẩm. Hỗ trợ thêm, xoá theo mã và in hoá đơn.',
      signature: 'class GioHang { decimal TongTien { get; } void Them(SanPham); bool Xoa(string ma); }',
      constraints: ['TongTien phải là property tính toán, không được là field lưu sẵn'],
      examples: [
        { input: 'Thêm 3 sản phẩm giá 100k, 250k, 500k', output: 'TongTien = 850000' },
        { input: 'Xoá sản phẩm 250k rồi đọc TongTien', output: '600000', explain: 'Property tính lại mỗi lần đọc nên luôn đúng.' },
      ],
    },
  ],
}

export default buoi11
