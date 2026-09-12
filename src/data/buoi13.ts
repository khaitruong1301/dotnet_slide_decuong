import type { Buoi } from './types'

const buoi13: Buoi = {
  id: 13,
  slug: 'da-hinh-va-interface',
  title: 'Đa hình & Interface',
  subtitle: 'Một lời gọi, nhiều hành vi — và bản hợp đồng cho những lớp chẳng họ hàng gì nhau',
  duration: '3 giờ',
  keywords: ['polymorphism', 'interface', 'is', 'as', 'implement'],
  goals: [
    'Xử lý một danh sách gồm nhiều loại đối tượng bằng đúng một vòng lặp',
    'Phân biệt đa hình lúc biên dịch (overloading) và lúc chạy (overriding)',
    'Khai báo interface và cài đặt cho nhiều lớp không cùng dòng họ',
    'Dùng toán tử is và as để kiểm tra rồi ép kiểu an toàn',
  ],

  sections: [
    {
          id: 'da-hinh',
          title: '1. Đa hình (Polymorphism)',
          blocks: [
            {
              type: 'text',
              text: 'Đa hình là khả năng cùng một lời gọi cho ra nhiều hành vi khác nhau, tuỳ vào đối tượng thật đứng phía sau. Nhờ nó ta xử lý cả danh sách hỗn hợp bằng một vòng lặp duy nhất.',
            },
            {
              type: 'code',
              sample: {
                title: 'Một vòng lặp, ba cách tính lương',
                code: `List<NhanVien> danhSach = new List<NhanVien>
    {
        new NhanVienVanPhong("An", 12_000_000m),
        new NhanVienSanXuat("Bình", 300),
        new NhanVienKinhDoanh("Cường", 80_000_000m),
    };

    decimal tongQuyLuong = 0;
    foreach (NhanVien nv in danhSach)
    {
        nv.HienThi();                    // mỗi đối tượng hiển thị theo kiểu của nó
        tongQuyLuong += nv.TinhLuong();  // mỗi đối tượng tính lương theo cách riêng
    }
    Console.WriteLine($"Tổng quỹ lương: {tongQuyLuong:N0} đ");`,
                note: 'Thêm loại nhân viên thứ tư sau này? Chỉ cần viết class mới, vòng lặp trên không phải sửa một chữ nào.',
              },
            },
            {
              type: 'visual',
              visual: {
                kind: 'compare',
                caption: 'Hai kiểu đa hình trong C#',
                columns: [
                  { title: 'Overloading — lúc biên dịch', tone: 'plain', items: ['Cùng tên, khác tham số', 'Trình biên dịch chọn sẵn', 'Cong(int,int) và Cong(double,double)'] },
                  { title: 'Overriding — lúc chạy', tone: 'good', items: ['Cùng chữ ký, khác cài đặt', 'Chọn theo kiểu thật của đối tượng', 'Đây mới là đa hình theo nghĩa OOP'] },
                ],
              },
            },
          ],
        },
    {
          id: 'interface',
          title: '2. Interface — bản hợp đồng',
          blocks: [
            {
              type: 'text',
              text: 'Hình tròn, hình chữ nhật, tam giác đều tính được chu vi và diện tích. Nhưng chúng không chia sẻ dữ liệu chung nào: hình tròn có bán kính, chữ nhật có hai cạnh, tam giác có ba cạnh. Gom vào một lớp cha là gượng ép — đây là lúc dùng interface.',
            },
            {
              type: 'callout',
              tone: 'info',
              title: 'Interface là gì',
              text: 'Interface chỉ KHAI BÁO các thành phần mà không định nghĩa nội dung. Nó là bản hợp đồng: class nào ký vào thì bắt buộc phải cài đặt đủ mọi điều khoản.',
            },
            {
              type: 'visual',
              visual: {
                kind: 'uml',
                caption: 'Ba hình không có dữ liệu chung, nhưng cùng ký một hợp đồng',
                relation: 'implement',
                parent: {
                  name: 'IHinhHoc',
                  stereotype: 'interface',
                  methods: ['+ TinhChuVi() : double', '+ TinhDienTich() : double', '+ MoTa() : string'],
                },
                children: [
                  { name: 'HinhTron', attrs: ['− banKinh : double'] },
                  { name: 'HinhChuNhat', attrs: ['− dai, rong : double'] },
                  { name: 'TamGiac', attrs: ['− a, b, c : double'] },
                ],
              },
            },
            {
              type: 'code',
              sample: {
                title: 'Khai báo và cài đặt interface',
                code: `interface IHinhHoc
    {
        double TinhChuVi();          // chỉ khai báo, không có thân hàm
        double TinhDienTich();
        string MoTa();
    }

    class HinhTron : IHinhHoc
    {
        private double banKinh;
        public HinhTron(double banKinh) => this.banKinh = banKinh;

        // Bắt buộc cài đặt ĐỦ mọi thành phần của interface
        public double TinhChuVi() => 2 * Math.PI * banKinh;
        public double TinhDienTich() => Math.PI * banKinh * banKinh;
        public string MoTa() => $"Hình tròn bán kính {banKinh}";
    }

    class HinhChuNhat : IHinhHoc
    {
        private double dai, rong;
        public HinhChuNhat(double dai, double rong) { this.dai = dai; this.rong = rong; }

        public double TinhChuVi() => 2 * (dai + rong);
        public double TinhDienTich() => dai * rong;
        public string MoTa() => $"Hình chữ nhật {dai} x {rong}";
    }`,
                note: 'Tên interface theo quy ước bắt đầu bằng chữ I hoa. Thiếu một phương thức là lỗi biên dịch ngay.',
              },
            },
            {
              type: 'code',
              sample: {
                title: 'Đa hình qua interface',
                code: `List<IHinhHoc> danhSachHinh = new List<IHinhHoc>
    {
        new HinhTron(5),
        new HinhChuNhat(4, 6),
    };

    foreach (IHinhHoc h in danhSachHinh)
    {
        Console.WriteLine($"{h.MoTa()}: chu vi {h.TinhChuVi():F2}, diện tích {h.TinhDienTich():F2}");

        // Toán tử is kiểm tra kiểu thật rồi ép kiểu an toàn
        if (h is HinhTron ht)
            Console.WriteLine("   Đây là hình tròn, không có cạnh");
    }`,
                note: 'Một class cài đặt được nhiều interface cùng lúc: class A : IHinhHoc, ISoSanh, IVeDuoc — đây là cách C# bù cho việc không có đa kế thừa class.',
              },
            },
          ],
        },
    {
      id: 'pattern-matching',
      title: '3. Kiểm tra kiểu và pattern matching với đối tượng',
      blocks: [
        {
          type: 'text',
          text: 'Làm việc với danh sách hỗn hợp thì có lúc cần biết đối tượng thật là loại gì để xử lý riêng. C# có ba công cụ cho việc này, mức độ an toàn khác nhau.',
        },
        {
          type: 'table',
          head: ['Cách viết', 'Thất bại thì sao', 'Nên dùng khi'],
          rows: [
            ['(HinhTron)h', 'Ném InvalidCastException', 'Chắc chắn đúng kiểu'],
            ['h as HinhTron', 'Trả về null', 'Muốn tự kiểm tra null sau đó'],
            ['h is HinhTron ht', 'Trả về false, không gán', 'Cách an toàn nhất — nên dùng'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'Ba cách, và cách nên chọn',
            code: `IHinhHoc h = new HinhChuNhat(4, 6);

// 1. Ép thẳng — sai kiểu là văng lỗi lúc chạy
// var t1 = (HinhTron)h;

// 2. as — sai kiểu thì được null, phải tự kiểm tra
HinhTron t2 = h as HinhTron;
if (t2 != null) Console.WriteLine("Là hình tròn");

// 3. is kèm biến — vừa kiểm tra vừa gán, gọn và an toàn nhất
if (h is HinhChuNhat cn)
    Console.WriteLine($"Chữ nhật {cn.TinhDienTich()}");`,
          },
        },
        {
          type: 'code',
          sample: {
            title: 'switch theo kiểu — thay cho chuỗi if lồng nhau',
            code: `string MoTaHinh(IHinhHoc h) => h switch
{
    HinhTron t      => $"Hình tròn, diện tích {t.TinhDienTich():F2}",
    HinhChuNhat cn  => $"Hình chữ nhật, diện tích {cn.TinhDienTich():F2}",
    TamGiac tg      => $"Tam giác, diện tích {tg.TinhDienTich():F2}",
    null            => "Chưa có hình",
    _               => "Hình chưa hỗ trợ"
};`,
            note: 'Đây là switch expression của buổi 4 dùng với mẫu kiểu — cùng một cú pháp, giờ khớp theo class thay vì theo giá trị.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Luồng xử lý một danh sách hỗn hợp',
            steps: [
              { kind: 'process', text: 'Duyệt từng phần tử trong List<IHinhHoc>' },
              { kind: 'process', text: 'Gọi TinhDienTich() — đa hình lo phần chung' },
              {
                kind: 'decision',
                text: 'Có cần xử lý riêng theo loại không?',
                branches: [
                  { label: 'Không', steps: [{ kind: 'note', text: 'Xong — đa hình là đủ' }] },
                  { label: 'Có', steps: [{ kind: 'process', text: 'Dùng is hoặc switch theo kiểu' }] },
                ],
              },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Kiểm tra kiểu nhiều là dấu hiệu thiết kế chưa tốt',
          text: 'Phải viết một chuỗi if (x is A) … else if (x is B) … thì thường nghĩa là hành vi đó nên nằm ngay trong từng class dưới dạng phương thức được override. Buổi 15 sẽ gọi tên vấn đề này là vi phạm nguyên tắc Open/Closed.',
        },
      ],
    },
  ],

  exercises: [

    {
      id: 'b13-1', level: 'Cơ bản', title: 'Danh sách hỗn hợp',
      requirement: 'Cho một List<DongVat> chứa nhiều loài khác nhau. Trả về mảng tiếng kêu của từng con, dùng đúng một vòng lặp và không kiểm tra kiểu.',
      signature: 'string[] TatCaTiengKeu(List<DongVat> ds)',
      constraints: ['Không được dùng if theo loại con vật'],
      examples: [
        { input: 'ds = [Cho, Meo, Bo]', output: '["Gâu gâu", "Meo meo", "Ò ó o"]' },
        { input: 'ds = []', output: '[]' },
      ],
    },
    {
      id: 'b13-2', level: 'Cơ bản', title: 'Interface hình học',
      requirement: 'Thiết kế interface IHinhHoc gồm TinhChuVi, TinhDienTich, MoTa. Cài đặt cho HinhTron, HinhChuNhat, TamGiac rồi trả về bảng tổng hợp cho một danh sách hình.',
      signature: 'interface IHinhHoc { double TinhChuVi(); double TinhDienTich(); string MoTa(); }',
      constraints: ['Mỗi lớp phải cài đặt đủ cả ba thành phần'],
      examples: [
        { input: 'HinhTron(5)', output: '"Hình tròn bán kính 5: chu vi 31.42, diện tích 78.54"' },
        { input: 'HinhChuNhat(4, 6)', output: '"Hình chữ nhật 4 x 6: chu vi 20, diện tích 24"' },
      ],
    },
    {
      id: 'b13-3', level: 'Cơ bản', title: 'Toán tử is và as',
      requirement: 'Duyệt một List<IHinhHoc>. Với hình tròn thì thêm dòng "không có cạnh", với các hình khác thì in số cạnh. Dùng is kèm biến thay vì ép kiểu trực tiếp.',
      signature: 'string[] MoTaChiTiet(List<IHinhHoc> ds)',
      constraints: ['Không được dùng phép ép kiểu (Type)obj'],
      examples: [
        { input: 'ds = [HinhTron(5), HinhChuNhat(4,6)]', output: '["Hình tròn — không có cạnh", "Hình chữ nhật — 4 cạnh"]' },
      ],
    },
    {
      id: 'b13-4', level: 'Trung bình', title: 'Một class nhiều interface',
      requirement: 'Thiết kế interface IBayDuoc và IBoiDuoc. Class Vit cài đặt cả hai, ChimSe chỉ cài IBayDuoc, Ca chỉ cài IBoiDuoc. Trả về danh sách tên các con vật bay được trong một danh sách hỗn hợp.',
      signature: 'string[] NhungConBayDuoc(List<object> ds)',
      constraints: ['Một class được cài đặt nhiều interface cùng lúc'],
      examples: [
        { input: 'ds = [Vit, ChimSe, Ca]', output: '["Vịt", "Chim sẻ"]' },
      ],
    },
    {
      id: 'b13-5', level: 'Trung bình', title: 'Interface ISoSanh',
      requirement: 'Thiết kế interface ISoSanh với phương thức SoSanh trả về -1, 0 hoặc 1. Cho SanPham cài đặt để so theo giá, rồi tự viết hàm sắp xếp danh sách theo interface đó.',
      signature: 'interface ISoSanh { int SoSanh(object khac); }',
      constraints: ['Không dùng Sort có sẵn, tự cài thuật toán sắp xếp nổi bọt'],
      examples: [
        { input: 'ds = [SP(500k), SP(100k), SP(250k)]', output: '[100k, 250k, 500k]' },
      ],
    },
    {
      id: 'b13-6', level: 'Trung bình', title: 'Interface làm kiểu tham số',
      requirement: 'Viết hàm nhận vào danh sách IHinhHoc bất kỳ và trả về tổng diện tích. Thêm loại hình mới sau này không được sửa hàm này.',
      signature: 'double TongDienTich(List<IHinhHoc> ds)',
      constraints: ['Hàm không được biết tên bất kỳ class cụ thể nào'],
      examples: [
        { input: 'ds = [HinhChuNhat(4,6), HinhChuNhat(2,3)]', output: '30' },
        { input: 'ds = []', output: '0' },
      ],
    },
    {
      id: 'b13-7', level: 'Trung bình', title: 'switch theo kiểu đối tượng',
      requirement: 'Cho một IHinhHoc. Trả về chuỗi mô tả tương ứng bằng switch expression khớp theo kiểu, xử lý cả trường hợp null và kiểu chưa hỗ trợ.',
      signature: 'string MoTaHinh(IHinhHoc? h)',
      constraints: ['Phải dùng switch expression, không dùng chuỗi if else'],
      examples: [
        { input: 'h = HinhTron(5)', output: '"Hình tròn, diện tích 78.54"' },
        { input: 'h = null', output: '"Chưa có hình"' },
      ],
    },
    {
      id: 'b13-8', level: 'Nâng cao', title: 'Máy tính tiền đa hình',
      requirement: 'Thiết kế interface IGiamGia với ba bản cài đặt: giảm theo phần trăm, giảm số tiền cố định, mua 2 tặng 1. Đơn hàng nhận một IGiamGia và trả về số tiền phải trả.',
      signature: 'decimal TinhTien(List<decimal> giaSanPham, IGiamGia giamGia)',
      constraints: ['Thêm kiểu giảm giá mới không được sửa lớp đơn hàng'],
      examples: [
        { input: 'Đơn 500.000, GiamPhanTram(10)', output: '450000' },
        { input: 'Đơn [100k, 100k, 100k], Mua2Tang1()', output: '200000', explain: 'Sản phẩm rẻ nhất trong mỗi nhóm ba được miễn phí.' },
      ],
    },
    {
      id: 'b13-9', level: 'Nâng cao', title: 'Hệ thống thông báo',
      requirement: 'Thiết kế interface IThongBao với ba bản: email, SMS, push. Lớp NotificationService nhận danh sách kênh và gửi qua tất cả bằng một vòng lặp, trả về số kênh đã gửi thành công.',
      signature: 'int GuiTatCa(List<IThongBao> kenh, string noiDung)',
      constraints: ['Thêm kênh mới không được sửa NotificationService'],
      examples: [
        { input: 'kenh = [Email, Sms, Push], noiDung = "Xin chào"', output: '3' },
        { input: 'kenh = []', output: '0' },
      ],
    },
    {
      id: 'b13-10', level: 'Nâng cao', title: 'Quản lý nhân viên đa hình đầy đủ',
      requirement: 'Xây chương trình quản lý ba loại nhân viên với cách tính lương riêng: thêm (chọn loại), tìm theo tên không dấu, đổi tên theo mã, xoá, hiển thị danh sách kèm lương, thoát. Dùng đa hình để tính lương.',
      signature: 'List<NhanVien> danhSach',
      constraints: ['Không được dùng if theo loại nhân viên khi tính lương'],
      examples: [
        { input: 'Thêm 3 loại nhân viên rồi chọn hiển thị', output: 'Bảng danh sách kèm lương từng người và tổng quỹ lương' },
      ],
      hint: 'List<NhanVien> chứa được cả ba loại nhờ đa hình.',
    },
  ],
}

export default buoi13
