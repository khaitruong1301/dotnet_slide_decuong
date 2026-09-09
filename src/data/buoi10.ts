import type { Buoi } from './types'

const buoi10: Buoi = {
  id: 10,
  slug: 'constructor-va-nap-chong',
  title: 'Constructor & nạp chồng',
  subtitle: 'Đối tượng phải đủ dữ liệu ngay khi vừa ra đời, và một cái tên phục vụ được nhiều tình huống',
  duration: '3 giờ',
  keywords: ['constructor', 'this', 'overloading', 'object initializer'],
  goals: [
    'Viết constructor để đối tượng luôn hợp lệ ngay lúc tạo',
    'Kể được thứ tự các bước chạy khi gõ từ khoá new',
    'Nạp chồng constructor và dùng : this(...) dồn luật kiểm tra về một chỗ',
    'Nạp chồng phương thức đúng cách và biết khi nào KHÔNG nạp chồng được',
  ],

  sections: [
    {
          id: 'constructor',
          title: '1. Constructor — hàm khởi tạo',
          blocks: [
            {
              type: 'text',
              text: 'Ở buổi trước, tạo xong đối tượng ta phải gán từng thuộc tính một. Cách đó dài dòng và nguy hiểm: quên gán một dòng là đối tượng ra đời trong trạng thái thiếu dữ liệu. Constructor giải quyết đúng chuyện này.',
            },
            {
              type: 'visual',
              visual: {
                kind: 'compare',
                caption: 'Cùng tạo một đối tượng nhân viên',
                columns: [
                  { title: 'Không constructor', tone: 'bad', items: ['new rồi gán từng dòng', 'Quên một dòng là dữ liệu thiếu', 'Không chỗ nào kiểm tra hợp lệ', 'Lặp lại ở mọi nơi tạo đối tượng'] },
                  { title: 'Có constructor', tone: 'good', items: ['Truyền đủ dữ liệu ngay lúc new', 'Thiếu tham số là lỗi biên dịch', 'Đặt được luật kiểm tra một chỗ', 'Gọn một dòng'] },
                ],
              },
            },
            {
              type: 'table',
              head: ['Đặc điểm của constructor', 'Nghĩa là'],
              rows: [
                ['Trùng tên với class', 'class NhanVien thì constructor tên NhanVien'],
                ['Không có kiểu trả về', 'Không viết void, không viết gì cả'],
                ['Tự động chạy khi new', 'Không gọi tay được như phương thức thường'],
                ['Chỉ chạy đúng một lần', 'Chạy lúc đối tượng ra đời, không lặp lại'],
              ],
            },
            {
              type: 'code',
              sample: {
                title: 'Constructor có tham số',
                code: `class NhanVien
    {
        public string Ma;
        public string Ten;
        public decimal Luong1h;

        // Constructor — trùng tên class, không kiểu trả về
        public NhanVien(string ma, string ten, decimal luong1h)
        {
            Ma = ma;
            Ten = ten;
            Luong1h = luong1h > 0 ? luong1h : 0;   // đặt luật ngay tại đây
        }
    }

    // Tạo đối tượng: truyền đủ dữ liệu ngay lúc new
    NhanVien nv = new NhanVien("NV01", "Trần Văn B", 50000);`,
                note: 'this.Ten = ten dùng khi tên tham số trùng tên thuộc tính — this trỏ tới chính đối tượng đang được tạo.',
              },
            },
            {
              type: 'visual',
              visual: {
                kind: 'flow',
                caption: 'Chuyện gì xảy ra khi gõ new NhanVien(...)',
                steps: [
                  { kind: 'start', text: 'Gặp từ khoá new' },
                  { kind: 'process', text: 'Cấp phát vùng nhớ cho đối tượng' },
                  { kind: 'process', text: 'Gán giá trị mặc định (0, null, false)' },
                  { kind: 'process', text: 'Chạy constructor — gán dữ liệu thật, kiểm tra hợp lệ' },
                  { kind: 'end', text: 'Trả về tham chiếu tới đối tượng đã sẵn sàng' },
                ],
              },
            },
            {
              type: 'callout',
              tone: 'warn',
              title: 'Viết constructor có tham số là mất constructor rỗng',
              text: 'Class không khai báo constructor nào thì C# tự cấp một constructor rỗng. Nhưng vừa viết một constructor có tham số là constructor rỗng đó biến mất — new NhanVien() sẽ lỗi biên dịch. Cần cả hai thì phải khai báo cả hai.',
            },
          ],
        },
    {
          id: 'overloading',
          title: '2. Nạp chồng (Overloading)',
          blocks: [
            {
              type: 'text',
              text: 'C# cho phép nhiều phương thức trùng tên trong cùng một class, miễn là khác nhau về số lượng hoặc kiểu tham số. Trình biên dịch nhìn vào lời gọi để chọn đúng bản. Constructor cũng nạp chồng được như vậy.',
            },
            {
              type: 'code',
              sample: {
                title: 'Ba constructor cho ba tình huống',
                code: `class NhanVien
    {
        public string Ma, Ten;
        public decimal Luong1h;

        // 1. Không tham số — dữ liệu mặc định
        public NhanVien() : this("NV000", "Chưa đặt tên", 0) { }

        // 2. Chỉ có tên
        public NhanVien(string ten) : this("NV000", ten, 0) { }

        // 3. Đầy đủ — mọi constructor khác đều dồn về đây
        public NhanVien(string ma, string ten, decimal luong1h)
        {
            Ma = ma;
            Ten = ten;
            Luong1h = luong1h;
        }
    }`,
                note: ': this(...) gọi lại constructor khác trong cùng class — viết luật kiểm tra một lần ở constructor đầy đủ, các bản còn lại dùng chung.',
              },
            },
            {
              type: 'callout',
              tone: 'warn',
              title: 'Khác kiểu trả về thì KHÔNG tính là nạp chồng',
              text: 'int Tinh(int a) và double Tinh(int a) sẽ báo lỗi biên dịch. C# chỉ phân biệt được qua danh sách tham số, không phân biệt qua kiểu trả về.',
            },
            {
              type: 'code',
              sample: {
                title: 'Nạp chồng phương thức thường',
                code: `int Cong(int a, int b) => a + b;
    double Cong(double a, double b) => a + b;          // khác KIỂU tham số — hợp lệ
    int Cong(int a, int b, int c) => a + b + c;        // khác SỐ tham số — hợp lệ

    Console.WriteLine(Cong(1, 2));        // gọi bản int
    Console.WriteLine(Cong(1.5, 2.5));    // gọi bản double`,
              },
            },
          ],
        },
    {
      id: 'khoi-tao-khac',
      title: '3. Các cách khởi tạo khác và bẫy thường gặp',
      blocks: [
        {
          type: 'text',
          text: 'Ngoài constructor, C# còn vài cách tạo đối tượng gọn hơn. Biết đủ các cách giúp đọc được code người khác viết và chọn đúng cách cho từng tình huống.',
        },
        {
          type: 'code',
          sample: {
            title: 'Object initializer — gán thẳng trong cặp ngoặc nhọn',
            code: `class SinhVien
{
    public string Ma { get; set; }
    public string Ten { get; set; }
    public double Diem { get; set; }
}

// Không cần constructor, gán thẳng tên thuộc tính
var sv = new SinhVien { Ma = "SV01", Ten = "An", Diem = 8.5 };

// Kết hợp cả hai: constructor lo phần bắt buộc, initializer lo phần tuỳ chọn
var nv = new NhanVien("NV01", "Bình") { SoGioLam = 160 };`,
            note: 'Cách này cần một constructor không tham số. Nó chạy SAU constructor, nên luật kiểm tra trong constructor không chặn được giá trị gán ở đây.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Thứ tự thực thi khi viết new NhanVien("NV01", "Bình") { SoGioLam = 160 }',
            items: [
              { label: 'Cấp phát bộ nhớ', text: 'Mọi field nhận giá trị mặc định: 0, null, false' },
              { label: 'Chạy constructor', text: 'Gán Ma và Ten, chạy các luật kiểm tra bên trong' },
              { label: 'Chạy object initializer', text: 'Gán SoGioLam = 160 — đi qua property setter' },
              { label: 'Trả về tham chiếu', text: 'Biến nv trỏ tới đối tượng đã hoàn chỉnh' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Ba cái bẫy hay gặp với constructor',
          text: 'Một, viết constructor có tham số là mất constructor rỗng mặc định. Hai, quên : base(...) khi lớp cha không có constructor rỗng. Ba, gọi phương thức virtual bên trong constructor — lúc đó lớp con chưa khởi tạo xong, dễ gặp giá trị null.',
        },
        {
          type: 'table',
          head: ['Cách tạo đối tượng', 'Khi nào dùng'],
          rows: [
            ['new Class(tham số)', 'Dữ liệu bắt buộc, cần kiểm tra hợp lệ'],
            ['new Class { A = 1 }', 'Dữ liệu tuỳ chọn, nhiều thuộc tính, muốn code dễ đọc'],
            ['new() { ... }', 'Từ C# 9, khi kiểu đã rõ ở vế trái'],
            ['record', 'Đối tượng chỉ để chở dữ liệu, không đổi sau khi tạo'],
          ],
        },
      ],
    },
  ],

  exercises: [
    { id: 'b10-1', level: 'Cơ bản', title: 'Constructor cho SinhVien', requirement: 'Thêm constructor nhận mã, tên, điểm cho class SinhVien. Tạo 3 đối tượng chỉ bằng một dòng mỗi đối tượng.', io: { input: '—', output: 'SV001 — Nguyễn Văn A — 8.5' } },
    { id: 'b10-2', level: 'Cơ bản', title: 'Constructor có kiểm tra', requirement: 'Trong constructor của SinhVien, nếu điểm nằm ngoài 0–10 thì gán về 0 và in cảnh báo.', io: { input: 'điểm = 15', output: 'Điểm không hợp lệ, đặt về 0' } },
    { id: 'b10-3', level: 'Cơ bản', title: 'Nạp chồng constructor', requirement: 'Viết ba constructor cho class HinhChuNhat: không tham số (1×1), một tham số (hình vuông), hai tham số (dài × rộng).', hint: 'Dùng : this(...) để dồn về constructor đầy đủ.' },
    { id: 'b10-4', level: 'Cơ bản', title: 'Nạp chồng phương thức', requirement: 'Viết ba phiên bản của phương thức TinhTong: hai số nguyên, ba số nguyên, và hai số thực.', io: { input: 'TinhTong(1,2) / TinhTong(1,2,3) / TinhTong(1.5,2.5)', output: '3 / 6 / 4' } },
    { id: 'b10-5', level: 'Trung bình', title: 'Object initializer', requirement: 'Ngoài constructor, C# còn cho khởi tạo bằng cú pháp new SinhVien { Ten = "A", Diem = 8 }. Viết thử và giải thích khi nào nên dùng cách này thay cho constructor.', hint: 'Cú pháp này cần một constructor không tham số.' },
    { id: 'b10-6', level: 'Trung bình', title: 'Constructor gọi constructor', requirement: 'Class TaiKhoan có ba constructor: rỗng, chỉ tên chủ thẻ, và đầy đủ. Hai bản đầu phải dồn về bản đầy đủ bằng : this(...), luật kiểm tra chỉ viết một lần.', hint: 'Constructor đầy đủ là nơi duy nhất gán dữ liệu.' },
    { id: 'b10-7', level: 'Trung bình', title: 'Mất constructor rỗng', requirement: 'Viết một class chỉ có constructor có tham số, rồi thử gọi new TenClass(). Đọc lỗi biên dịch và giải thích vì sao xảy ra, sau đó sửa lại cho chạy được.' },
    { id: 'b10-8', level: 'Nâng cao', title: 'Nạp chồng không hợp lệ', requirement: 'Thử viết int Tinh(int a) và double Tinh(int a) trong cùng một class. Đọc lỗi biên dịch và giải thích vì sao C# không phân biệt được hai hàm này.' },
    { id: 'b10-9', level: 'Nâng cao', title: 'Class HocSinh hoàn chỉnh', requirement: 'Viết class HocSinh với ba constructor (rỗng, tên, đầy đủ), phương thức Nhap() nạp chồng ba kiểu (từ bàn phím, từ tham số, từ một HocSinh khác) và HienThi().', hint: 'Bản Nhap(HocSinh khac) là kỹ thuật sao chép đối tượng.' },
  ],
}

export default buoi10
