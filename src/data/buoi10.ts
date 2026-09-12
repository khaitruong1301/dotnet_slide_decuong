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
              
            trace: [

              { line: 17, vars: {}, note: 'Gặp new — bắt đầu quy trình tạo đối tượng.' },
              { line: 8, vars: { ma: '"NV01"', ten: '"Trần Văn B"', luong1h: '50000' }, refs: { nv: '0x600' }, heap: { '0x600': 'NhanVien { Ma: null, Ten: null, Luong1h: 0 }' }, note: 'Bộ nhớ đã cấp phát, mọi thuộc tính đang là giá trị mặc định. Constructor bắt đầu chạy.' },
              { line: 10, vars: { ma: '"NV01"', ten: '"Trần Văn B"', luong1h: '50000' }, refs: { nv: '0x600' }, heap: { '0x600': 'NhanVien { Ma: "NV01", Ten: null, Luong1h: 0 }' } },
              { line: 11, vars: { ma: '"NV01"', ten: '"Trần Văn B"', luong1h: '50000' }, refs: { nv: '0x600' }, heap: { '0x600': 'NhanVien { Ma: "NV01", Ten: "Trần Văn B", Luong1h: 0 }' } },
              { line: 12, vars: { ma: '"NV01"', ten: '"Trần Văn B"', luong1h: '50000' }, refs: { nv: '0x600' }, heap: { '0x600': 'NhanVien { Ma: "NV01", Ten: "Trần Văn B", Luong1h: 50000 }' }, note: '50000 > 0 nên nhận. Truyền số âm thì luật ở đây chặn lại, gán về 0 — đối tượng không bao giờ ra đời ở trạng thái vô lý.' },
              { line: 17, vars: { nv: '→ 0x600' }, refs: { nv: '0x600' }, heap: { '0x600': 'NhanVien { Ma: "NV01", Ten: "Trần Văn B", Luong1h: 50000 }' }, note: 'Constructor xong, địa chỉ được trả về và gán vào biến nv.' },
            ],},
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
              
            trace: [

              { line: 7, vars: {}, note: 'Giả sử gọi new NhanVien() — bản không tham số.' },
              { line: 13, vars: { ma: '"NV000"', ten: '"Chưa đặt tên"', luong1h: '0' }, note: ': this(...) chuyển ngay sang bản đầy đủ, mang theo ba giá trị mặc định. Thân của constructor rỗng chưa chạy dòng nào.' },
              { line: 15, vars: { ma: '"NV000"', ten: '"Chưa đặt tên"', luong1h: '0' }, heap: { '0x700': 'NhanVien { Ma: "NV000" }' } },
              { line: 17, vars: { ma: '"NV000"', ten: '"Chưa đặt tên"', luong1h: '0' }, heap: { '0x700': 'NhanVien { Ma: "NV000", Ten: "Chưa đặt tên", Luong1h: 0 }' } },
              { line: 7, vars: {}, heap: { '0x700': 'NhanVien { Ma: "NV000", Ten: "Chưa đặt tên", Luong1h: 0 }' }, note: 'Quay lại thân constructor rỗng — ở đây trống nên xong luôn. Nhờ : this(...) mà luật kiểm tra chỉ cần viết ở đúng một chỗ.' },
            ],},
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
              
            trace: [

              { line: 5, vars: {}, note: 'Gọi Cong(1, 2) — hai đối số đều là int.' },
              { line: 1, vars: { a: '1', b: '2' }, output: ['3'], note: 'Trình biên dịch nhìn số lượng và KIỂU đối số rồi chọn đúng bản int. Việc chọn diễn ra lúc biên dịch chứ không phải lúc chạy.' },
              { line: 6, vars: {}, output: ['3'], note: 'Gọi Cong(1.5, 2.5) — hai đối số là double.' },
              { line: 2, vars: { a: '1.5', b: '2.5' }, output: ['3', '4'], note: 'Lần này bản double được chọn. Cùng một cái tên nhưng người viết không phải nhớ ba tên hàm khác nhau.' },
            ],},
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
          
            trace: [

              { line: 9, vars: { sv: '→ 0x800' }, refs: { sv: '0x800' }, heap: { '0x800': 'SinhVien { Ma: null, Ten: null, Diem: 0 }' }, note: 'Trước tiên chạy constructor rỗng — đó là lý do class phải có constructor không tham số mới dùng được cú pháp này.' },
              { line: 9, vars: { sv: '→ 0x800' }, refs: { sv: '0x800' }, heap: { '0x800': 'SinhVien { Ma: "SV01", Ten: "An", Diem: 8.5 }' }, note: 'Sau đó initializer mới lần lượt gán từng thuộc tính, mỗi phép gán đi qua setter của property.' },
              { line: 12, vars: { sv: '→ 0x800', nv: '→ 0x810' }, refs: { sv: '0x800', nv: '0x810' }, heap: { '0x800': 'SinhVien { Ma: "SV01", Ten: "An", Diem: 8.5 }', '0x810': 'NhanVien { Ma: "NV01", Ten: "Bình", SoGioLam: 0 }' }, note: 'Constructor chạy trước, lo phần bắt buộc.' },
              { line: 12, vars: { sv: '→ 0x800', nv: '→ 0x810' }, refs: { sv: '0x800', nv: '0x810' }, heap: { '0x800': 'SinhVien { Ma: "SV01", Ten: "An", Diem: 8.5 }', '0x810': 'NhanVien { Ma: "NV01", Ten: "Bình", SoGioLam: 160 }' }, note: 'Rồi initializer chạy sau. Thứ tự này quan trọng: initializer ghi đè được cả giá trị mà constructor vừa gán.' },
            ],},
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

    {
      id: 'b10-1', level: 'Cơ bản', title: 'Constructor cho SinhVien',
      requirement: 'Bổ sung constructor nhận mã, tên và điểm cho class SinhVien, sao cho tạo một sinh viên chỉ cần đúng một dòng lệnh.',
      signature: 'SinhVien(string ma, string ten, double diem)',
      constraints: ['Không được để lại cách gán từng thuộc tính sau khi new'],
      examples: [
        { input: 'new SinhVien("SV001", "Nguyễn Văn A", 8.5)', output: '"SV001 — Nguyễn Văn A — 8.5"' },
      ],
    },
    {
      id: 'b10-2', level: 'Cơ bản', title: 'Constructor có kiểm tra',
      requirement: 'Trong constructor của SinhVien, nếu điểm nằm ngoài khoảng 0–10 thì gán về 0. Trả về điểm thực tế được lưu.',
      signature: 'SinhVien(string ma, string ten, double diem)',
      constraints: ['Điểm truyền vào có thể là số thực bất kỳ'],
      examples: [
        { input: 'diem = 15', output: '0', explain: 'Ngoài khoảng hợp lệ nên bị đưa về 0.' },
        { input: 'diem = 8.5', output: '8.5' },
        { input: 'diem = -2', output: '0' },
      ],
    },
    {
      id: 'b10-3', level: 'Cơ bản', title: 'Nạp chồng constructor',
      requirement: 'Viết ba constructor cho class HinhChuNhat: không tham số tạo hình 1×1, một tham số tạo hình vuông, hai tham số tạo hình chữ nhật. Trả về diện tích để kiểm chứng.',
      signature: 'HinhChuNhat() / HinhChuNhat(double canh) / HinhChuNhat(double dai, double rong)',
      constraints: ['Hai constructor đầu phải dồn về constructor đầy đủ bằng : this(...)'],
      examples: [
        { input: 'new HinhChuNhat()', output: '1' },
        { input: 'new HinhChuNhat(4)', output: '16' },
        { input: 'new HinhChuNhat(4, 6)', output: '24' },
      ],
    },
    {
      id: 'b10-4', level: 'Cơ bản', title: 'Nạp chồng phương thức',
      requirement: 'Viết ba phiên bản của phương thức TinhTong: hai số nguyên, ba số nguyên, và hai số thực.',
      signature: 'int TinhTong(int a, int b) / int TinhTong(int a, int b, int c) / double TinhTong(double a, double b)',
      constraints: ['Không được đặt tên khác nhau cho ba phiên bản'],
      examples: [
        { input: 'TinhTong(1, 2)', output: '3' },
        { input: 'TinhTong(1, 2, 3)', output: '6' },
        { input: 'TinhTong(1.5, 2.5)', output: '4' },
      ],
    },
    {
      id: 'b10-5', level: 'Trung bình', title: 'Object initializer',
      requirement: 'Tạo đối tượng SinhVien bằng cú pháp object initializer thay vì constructor. Chỉ ra thứ tự thực thi giữa constructor và initializer.',
      signature: 'new SinhVien { Ten = "A", Diem = 8 }',
      constraints: ['Class phải có constructor không tham số'],
      examples: [
        { input: 'new SinhVien { Ten = "A", Diem = 8 }', output: 'Ten = "A", Diem = 8' },
        { input: 'new SinhVien("SV01", "B", 0) { Diem = 9 }', output: 'Diem = 9', explain: 'Initializer chạy sau constructor nên ghi đè giá trị constructor đã gán.' },
      ],
    },
    {
      id: 'b10-6', level: 'Trung bình', title: 'Constructor gọi constructor',
      requirement: 'Class TaiKhoan có ba constructor: rỗng, chỉ tên chủ thẻ, và đầy đủ. Hai bản đầu phải dồn về bản đầy đủ bằng : this(...), luật kiểm tra chỉ được viết đúng một lần.',
      signature: 'TaiKhoan() / TaiKhoan(string ten) / TaiKhoan(string ma, string ten, decimal soDu)',
      constraints: ['Luật kiểm tra chỉ xuất hiện ở đúng một constructor'],
      examples: [
        { input: 'new TaiKhoan()', output: 'Ma = "TK000", Ten = "Chưa đặt tên", SoDu = 0' },
        { input: 'new TaiKhoan("An")', output: 'Ma = "TK000", Ten = "An", SoDu = 0' },
      ],
    },
    {
      id: 'b10-7', level: 'Trung bình', title: 'Mất constructor rỗng',
      requirement: 'Viết một class chỉ có constructor có tham số rồi thử gọi new TenClass(). Ghi lại thông báo lỗi biên dịch nhận được và sửa để cả hai cách tạo đều chạy.',
      signature: 'class A { public A(int x) { } }',
      constraints: ['Phải giải thích được vì sao lỗi xảy ra'],
      examples: [
        { input: 'new A()', output: 'Lỗi CS7036: thiếu tham số bắt buộc x', explain: 'Vừa khai báo một constructor là constructor rỗng mặc định biến mất.' },
      ],
    },
    {
      id: 'b10-8', level: 'Nâng cao', title: 'Nạp chồng không hợp lệ',
      requirement: 'Thử viết int Tinh(int a) và double Tinh(int a) trong cùng một class. Ghi lại lỗi biên dịch và giải thích vì sao C# không phân biệt được hai hàm này.',
      signature: 'int Tinh(int a) / double Tinh(int a)',
      constraints: ['Chỉ khác kiểu trả về, danh sách tham số giống hệt'],
      examples: [
        { input: 'Khai báo cả hai hàm', output: 'Lỗi CS0111: đã có thành viên cùng tên và cùng danh sách tham số', explain: 'C# chỉ phân biệt qua tham số, không phân biệt qua kiểu trả về.' },
      ],
    },
    {
      id: 'b10-9', level: 'Nâng cao', title: 'Class HocSinh với constructor sao chép',
      requirement: 'Viết class HocSinh có ba constructor (rỗng, tên, đầy đủ) và một constructor sao chép nhận vào một HocSinh khác để tạo bản sao độc lập.',
      signature: 'HocSinh(HocSinh khac)',
      constraints: ['Bản sao phải độc lập: sửa bản sao không làm đổi bản gốc'],
      examples: [
        { input: 'var b = new HocSinh(a); b.Ten = "X"', output: 'a.Ten giữ nguyên', explain: 'Constructor sao chép chép từng giá trị chứ không chép tham chiếu.' },
      ],
    },
  ],
}

export default buoi10
