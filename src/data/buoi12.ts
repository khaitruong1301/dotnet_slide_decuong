import type { Buoi } from './types'

const buoi12: Buoi = {
  id: 12,
  slug: 'ke-thua-va-ghi-de',
  title: 'Kế thừa & ghi đè phương thức',
  subtitle: 'Gom phần chung lên lớp cha, để lớp con viết lại đúng phần khác biệt của mình',
  duration: '3 giờ',
  keywords: ['inheritance', 'base', 'protected', 'virtual', 'override', 'sealed'],
  goals: [
    'Dùng kế thừa để xoá code trùng lặp giữa các lớp giống nhau',
    'Gọi constructor lớp cha bằng base(...) và phương thức gốc bằng base.Ten()',
    'Ghi đè phương thức bằng cặp virtual / override',
    'Biết khi nào nên khoá lớp lại bằng sealed',
  ],

  sections: [
    {
          id: 'ke-thua',
          title: '1. Kế thừa (Inheritance)',
          blocks: [
            {
              type: 'text',
              text: 'Công ty có ba loại nhân viên: văn phòng, sản xuất, kinh doanh. Cả ba đều có mã, tên, ngày vào làm — chỉ khác nhau ở cách tính lương. Viết ba class riêng thì phần chung bị chép ba lần, sửa một chỗ phải nhớ sửa cả ba.',
            },
            {
              type: 'visual',
              visual: {
                kind: 'uml',
                caption: 'Phần chung gom lên lớp cha, mỗi lớp con chỉ giữ phần riêng của mình',
                relation: 'inherit',
                parent: {
                  name: 'NhanVien',
                  attrs: ['# ma : string', '# ten : string'],
                  methods: ['+ TinhLuong() : decimal', '+ HienThi() : void'],
                },
                children: [
                  { name: 'NhanVienVanPhong', attrs: ['− luongThang : decimal'], methods: ['+ TinhLuong()'] },
                  { name: 'NhanVienSanXuat', attrs: ['− soSanPham : int'], methods: ['+ TinhLuong()'] },
                  { name: 'NhanVienKinhDoanh', attrs: ['− doanhSo : decimal'], methods: ['+ TinhLuong()'] },
                ],
              },
            },
            {
              type: 'code',
              sample: {
                title: 'Cú pháp kế thừa và gọi constructor lớp cha',
                code: `class NhanVien                       // lớp cha (base class)
    {
        protected string ma;             // protected: lớp con dùng được
        protected string ten;

        public NhanVien(string ma, string ten)
        {
            this.ma = ma;
            this.ten = ten;
        }

        public void HienThi() => Console.WriteLine($"{ma} — {ten}");
    }

    class NhanVienVanPhong : NhanVien    // dấu : để kế thừa
    {
        private decimal luongThang;

        // base(...) gọi constructor của lớp cha
        public NhanVienVanPhong(string ma, string ten, decimal luongThang)
            : base(ma, ten)
        {
            this.luongThang = luongThang;
        }
    }`,
                note: 'Lớp con phải gọi được một constructor của lớp cha. Lớp cha không có constructor rỗng thì bắt buộc phải dùng : base(...).',
              },
            },
            {
              type: 'table',
              head: ['Từ khoá', 'Ý nghĩa'],
              rows: [
                [': LopCha', 'Khai báo kế thừa'],
                ['base(...)', 'Gọi constructor của lớp cha'],
                ['base.TenHam()', 'Gọi lại phương thức bản gốc ở lớp cha'],
                ['protected', 'Lớp con dùng được, bên ngoài thì không'],
                ['sealed', 'Chặn không cho kế thừa tiếp'],
              ],
            },
            {
              type: 'callout',
              tone: 'warn',
              title: 'C# chỉ cho kế thừa từ MỘT lớp cha',
              text: 'Khác C++, C# không có đa kế thừa class. Cần gom nhiều nhóm hành vi vào một lớp thì dùng interface — một class cài đặt được bao nhiêu interface cũng được.',
            },
            {
              type: 'code',
              sample: {
                title: 'sealed — chặn kế thừa',
                code: `sealed class MaHoaBaoMat
    {
        public string MaHoa(string s) => Convert.ToBase64String(Encoding.UTF8.GetBytes(s));
    }

    // class Ke : MaHoaBaoMat { }   // LỖI — không kế thừa được lớp sealed`,
                note: 'Dùng khi muốn khoá hành vi lại, không cho ai đó ghi đè làm sai lệch — hay gặp ở lớp bảo mật, lớp tiện ích.',
              },
            },
          ],
        },
    {
          id: 'override',
          title: '2. Ghi đè phương thức — virtual & override',
          blocks: [
            {
              type: 'text',
              text: 'Kế thừa mới chỉ giúp dùng lại code. Muốn mỗi lớp con làm khác đi thì phải ghi đè: lớp cha đánh dấu virtual cho phép, lớp con dùng override để viết lại.',
            },
            {
              type: 'code',
              sample: {
                title: 'Mỗi loại nhân viên tính lương một kiểu',
                code: `class NhanVien
    {
        protected string ten;
        public NhanVien(string ten) => this.ten = ten;

        // virtual: cho phép lớp con ghi đè
        public virtual decimal TinhLuong() => 0;

        public virtual void HienThi()
            => Console.WriteLine($"{ten}: {TinhLuong():N0} đ");
    }

    class NhanVienSanXuat : NhanVien
    {
        private int soSanPham;
        public NhanVienSanXuat(string ten, int soSanPham) : base(ten)
            => this.soSanPham = soSanPham;

        // override: viết lại hoàn toàn
        public override decimal TinhLuong() => soSanPham * 15000m;
    }

    class NhanVienKinhDoanh : NhanVien
    {
        private decimal doanhSo;
        public NhanVienKinhDoanh(string ten, decimal doanhSo) : base(ten)
            => this.doanhSo = doanhSo;

        public override decimal TinhLuong() => 5_000_000m + doanhSo * 0.05m;

        // Tái sử dụng bản của lớp cha rồi bổ sung thêm
        public override void HienThi()
        {
            base.HienThi();
            Console.WriteLine($"   Doanh số: {doanhSo:N0} đ");
        }
    }`,
                note: 'base.HienThi() gọi lại bản gốc ở lớp cha — dùng khi muốn giữ phần cũ và thêm phần mới, thay vì viết lại từ đầu.',
              },
            },
            {
              type: 'visual',
              visual: {
                kind: 'flow',
                caption: 'Gọi nv.TinhLuong() thì C# tìm bản cài đặt ở đâu',
                steps: [
                  { kind: 'io', text: 'nv.TinhLuong()' },
                  {
                    kind: 'decision',
                    text: 'Kiểu thật của đối tượng có override không?',
                    branches: [
                      { label: 'Có', steps: [{ kind: 'process', text: 'Chạy bản của lớp con' }] },
                      { label: 'Không', steps: [{ kind: 'process', text: 'Leo lên lớp cha, chạy bản virtual' }] },
                    ],
                  },
                  { kind: 'end', text: 'Trả về kết quả' },
                ],
              },
            },
            {
              type: 'callout',
              tone: 'info',
              title: 'Quyết định theo kiểu THẬT, không theo kiểu khai báo',
              text: 'Viết NhanVien nv = new NhanVienSanXuat(...) thì nv.TinhLuong() vẫn chạy bản của NhanVienSanXuat. Đây chính là cơ chế làm nên tính đa hình.',
            },
          ],
        },
    {
      id: 'cay-ke-thua',
      title: '3. Cây kế thừa và những giới hạn cần biết',
      blocks: [
        {
          type: 'text',
          text: 'Kế thừa lồng nhiều tầng được, nhưng càng sâu càng khó đọc. Phần này nói về cách C# tra cứu phương thức trong cây kế thừa và những chỗ dễ vấp.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'uml',
            caption: 'Cây ba tầng: mỗi tầng chỉ thêm phần riêng, phần chung nằm ở tầng trên',
            relation: 'inherit',
            parent: { name: 'Nguoi', attrs: ['# ten : string', '# tuoi : int'], methods: ['+ HienThi() : void'] },
            children: [
              { name: 'NhanVien', attrs: ['# ma : string'], methods: ['+ HienThi()', '+ TinhLuong()'] },
              { name: 'KhachHang', attrs: ['# diemThuong : int'], methods: ['+ HienThi()'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Chuỗi base nối từ dưới lên trên',
            code: `class Nguoi
{
    protected string ten;
    public Nguoi(string ten) => this.ten = ten;
    public virtual void HienThi() => Console.WriteLine($"Người: {ten}");
}

class NhanVien : Nguoi
{
    protected string ma;
    public NhanVien(string ten, string ma) : base(ten) => this.ma = ma;
    public override void HienThi()
    {
        base.HienThi();                          // chạy phần của Nguoi
        Console.WriteLine($"  Mã NV: {ma}");     // rồi bổ sung phần riêng
    }
}

class QuanLy : NhanVien
{
    private int soNhanVienQuanLy;
    public QuanLy(string ten, string ma, int so) : base(ten, ma)
        => soNhanVienQuanLy = so;
    public override void HienThi()
    {
        base.HienThi();                          // chạy cả Nguoi lẫn NhanVien
        Console.WriteLine($"  Quản lý {soNhanVienQuanLy} người");
    }
}`,
            note: 'Mỗi tầng chỉ cần lo phần của mình rồi gọi base — không tầng nào phải chép lại code của tầng trên.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'C# tìm phương thức từ dưới lên trên, gặp bản đầu tiên là dừng',
            steps: [
              { kind: 'io', text: 'Gọi doiTuong.HienThi()' },
              {
                kind: 'decision',
                text: 'Lớp con nhất có override không?',
                branches: [
                  { label: 'Có', steps: [{ kind: 'process', text: 'Chạy bản đó' }, { kind: 'note', text: 'Trong đó có base.HienThi()? Leo lên chạy tiếp' }] },
                  { label: 'Không', steps: [{ kind: 'process', text: 'Leo lên tầng cha, hỏi lại câu tương tự' }] },
                ],
              },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'override khác new — đây là chỗ dễ sai nhất',
          text: 'override thay hẳn bản của lớp cha, quyết định theo kiểu THẬT của đối tượng. Từ khoá new chỉ che bản cũ đi, quyết định theo kiểu KHAI BÁO của biến. Gán vào biến kiểu lớp cha rồi gọi thì hai cách cho kết quả khác nhau.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Kế thừa sâu quá ba tầng là dấu hiệu xấu',
          text: 'Cây càng sâu càng khó lần ra phương thức nào đang chạy. Nguyên tắc thực chiến: ưu tiên gộp bằng cách chứa đối tượng khác làm thuộc tính (composition) thay vì kéo dài chuỗi kế thừa.',
        },
      ],
    },
  ],

  exercises: [

    {
      id: 'b12-1', level: 'Cơ bản', title: 'Kế thừa cơ bản',
      requirement: 'Thiết kế class Nguoi gồm tên và tuổi, và class SinhVien kế thừa Nguoi, bổ sung mã số và tên trường. Constructor của SinhVien phải gọi constructor lớp cha.',
      signature: 'class SinhVien : Nguoi { SinhVien(string ten, int tuoi, string ma, string truong) : base(ten, tuoi) }',
      constraints: ['Không được chép lại tên và tuổi xuống lớp con'],
      examples: [
        { input: 'new SinhVien("Nguyễn Văn A", 20, "SV001", "CNTT")', output: '"Nguyễn Văn A — 20 tuổi — SV001 — CNTT"' },
      ],
    },
    {
      id: 'b12-2', level: 'Cơ bản', title: 'protected khác private chỗ nào',
      requirement: 'Trong lớp cha khai báo một field private và một field protected. Từ lớp con thử truy cập cả hai, ghi lại kết quả biên dịch của từng trường hợp.',
      signature: 'class Cha { private int a; protected int b; }',
      constraints: ['Phải giải thích được vì sao một cái được và một cái không'],
      examples: [
        { input: 'Lớp con đọc b', output: 'Biên dịch được' },
        { input: 'Lớp con đọc a', output: 'Lỗi CS0122: a không truy cập được vì mức bảo vệ' },
      ],
    },
    {
      id: 'b12-3', level: 'Cơ bản', title: 'Ghi đè phương thức',
      requirement: 'Class DongVat có phương thức virtual KeuNhuThe(). Ba lớp con Cho, Meo, Bo ghi đè lại. Cho cả ba vào List<DongVat> rồi duyệt, trả về mảng tiếng kêu.',
      signature: 'virtual string KeuNhuThe()',
      constraints: ['Lớp cha phải đánh dấu virtual, lớp con phải dùng override'],
      examples: [
        { input: 'ds = [Cho, Meo, Bo]', output: '["Gâu gâu", "Meo meo", "Ò ó o"]' },
      ],
    },
    {
      id: 'b12-4', level: 'Cơ bản', title: 'Gọi lại lớp cha bằng base',
      requirement: 'Lớp con ghi đè HienThi() nhưng vẫn gọi base.HienThi() trước rồi mới in thêm thông tin riêng của mình.',
      signature: 'override void HienThi() { base.HienThi(); … }',
      constraints: ['Không được chép lại nội dung của lớp cha vào lớp con'],
      examples: [
        { input: 'NhanVienKinhDoanh("Cường", doanhSo=80tr).HienThi()', output: '"Cường: 9.000.000 đ"\\n"   Doanh số: 80.000.000 đ"' },
      ],
    },
    {
      id: 'b12-5', level: 'Trung bình', title: 'Ba loại nhân viên',
      requirement: 'Lớp cha NhanVien có TinhLuong() là virtual. Ba lớp con: văn phòng (lương tháng cố định), sản xuất (số sản phẩm × 15.000), kinh doanh (5.000.000 cộng 5% doanh số). Trả về tổng quỹ lương của cả danh sách bằng một vòng lặp duy nhất.',
      signature: 'decimal TongQuyLuong(List<NhanVien> ds)',
      constraints: ['Chỉ được dùng một vòng lặp, không if theo loại nhân viên'],
      examples: [
        { input: 'ds = [VanPhong(12tr), SanXuat(300sp), KinhDoanh(80tr)]', output: '25500000', explain: '12.000.000 + 4.500.000 + 9.000.000.' },
      ],
    },
    {
      id: 'b12-6', level: 'Trung bình', title: 'Chặn kế thừa bằng sealed',
      requirement: 'Đánh dấu một lớp con là sealed rồi thử kế thừa tiếp từ nó. Ghi lại thông báo lỗi và giải thích khi nào nên dùng sealed.',
      signature: 'sealed class A : B { }',
      constraints: ['Phải nêu được một tình huống thực tế nên khoá lớp lại'],
      examples: [
        { input: 'class C : A { }', output: 'Lỗi CS0509: không kế thừa được từ lớp sealed' },
      ],
    },
    {
      id: 'b12-7', level: 'Trung bình', title: 'Cây kế thừa ba tầng',
      requirement: 'Xây chuỗi kế thừa Nguoi → NhanVien → QuanLy. Mỗi tầng thêm thuộc tính riêng và ghi đè HienThi(), tầng dưới gọi base.HienThi() của tầng trên.',
      signature: 'class QuanLy : NhanVien : Nguoi',
      constraints: ['Chuỗi base(...) phải nối đủ từ tầng dưới lên tầng trên cùng'],
      examples: [
        { input: 'new QuanLy("An", "NV01", 5).HienThi()', output: '"Người: An"\\n"  Mã NV: NV01"\\n"  Quản lý 5 người"' },
      ],
    },
    {
      id: 'b12-8', level: 'Trung bình', title: 'Ghi đè property',
      requirement: 'Lớp cha có property virtual MoTa. Lớp con ghi đè lại để trả về chuỗi khác. Chứng minh property cũng ghi đè được như phương thức.',
      signature: 'public virtual string MoTa { get; }',
      constraints: ['Không được chuyển property thành phương thức'],
      examples: [
        { input: 'Cha.MoTa', output: '"Một phương tiện"' },
        { input: 'XeMay.MoTa', output: '"Xe hai bánh chạy xăng"' },
      ],
    },
    {
      id: 'b12-9', level: 'Nâng cao', title: 'override khác new thế nào',
      requirement: 'Viết hai lớp con: một dùng override, một dùng từ khoá new để che phương thức lớp cha. Gán cả hai vào biến kiểu lớp cha rồi gọi phương thức, trả về hai kết quả và giải thích chênh lệch.',
      signature: 'override void Chao() / new void Chao()',
      constraints: ['Cả hai đều gán vào biến khai báo kiểu lớp cha'],
      examples: [
        { input: 'Cha x = new ConOverride(); x.Chao()', output: '"Con"', explain: 'override quyết định theo kiểu THẬT của đối tượng.' },
        { input: 'Cha y = new ConNew(); y.Chao()', output: '"Cha"', explain: 'new chỉ che đi, quyết định theo kiểu KHAI BÁO của biến.' },
      ],
    },
    {
      id: 'b12-10', level: 'Nâng cao', title: 'Hệ thống phương tiện',
      requirement: 'Lớp cha PhuongTien gồm tên và tốc độ, có phương thức virtual DiChuyen(). Ba lớp con XeMay, OTo, MayBay ghi đè lại. Trả về mảng mô tả cách di chuyển của từng loại trong danh sách.',
      signature: 'string[] MoTaDiChuyen(List<PhuongTien> ds)',
      constraints: ['Thêm loại phương tiện mới không được sửa hàm MoTaDiChuyen'],
      examples: [
        { input: 'ds = [XeMay, OTo, MayBay]', output: '["Chạy trên đường bằng hai bánh", "Chạy trên đường bằng bốn bánh", "Bay trên không"]' },
      ],
    },
  ],
}

export default buoi12
