import type { Buoi } from './types'

/**
 * Buổi ôn tập OOP. Một bài tập lớn duy nhất — viết trọn chương trình console quản lý
 * sản phẩm cho cửa hàng điện máy. Phần lý thuyết phân rã đề bài, vẽ sơ đồ lớp và lộ
 * trình 6 bước; phần gợi ý của bài liệt kê rõ class, thuộc tính, phương thức để người
 * học biết chính xác phải viết cái gì.
 */
const buoi16: Buoi = {
  id: 16,
  slug: 'on-tap-oop-cua-hang-dien-may',
  title: 'Ôn tập OOP — Cửa hàng điện máy',
  subtitle: 'Một bài lớn viết trọn chương trình console: class, kế thừa, đa hình, List và lưu file JSON',
  duration: '3 giờ',
  keywords: ['class', 'property', 'constructor', 'inheritance', 'override', 'polymorphism', 'List<T>', 'JSON'],
  goals: [
    'Đọc một đề bài nghiệp vụ thật và tự chỉ ra được class, thuộc tính, phương thức cần có',
    'Viết class có constructor và property kiểm tra dữ liệu',
    'Dùng kế thừa và override để mỗi nhóm hàng tính giá bán theo cách riêng',
    'Quản lý danh sách đối tượng bằng List<T>, gọi phương thức qua lớp cha (đa hình)',
    'Lưu và đọc lại danh sách đối tượng từ file JSON',
  ],

  sections: [
    {
      id: 'de-bai-chung',
      title: '1. Bài toán ôn tập: quản lý sản phẩm cửa hàng điện máy',
      blocks: [
        {
          type: 'text',
          text: 'Một cửa hàng điện máy bán ba nhóm hàng: điện tử (tivi, laptop), điện lạnh (tủ lạnh, máy lạnh) và gia dụng (nồi cơm, máy xay). Mỗi sản phẩm có mã, tên, giá nhập và số lượng tồn. Giá bán không nhập tay mà tính từ giá nhập theo quy tắc riêng của từng nhóm. Nhân viên cần thêm hàng mới, tìm hàng theo tên, cập nhật giá nhập và số lượng, bán hàng (trừ tồn kho, in tiền), xoá hàng ngừng kinh doanh, xem tổng giá trị tồn kho, và lưu dữ liệu để hôm sau mở lên dùng tiếp.',
        },
        {
          type: 'text',
          text: 'So với bài quản lý nhân viên, đề này vẫn đủ quy mô một chương trình thật nhưng cấu trúc lớp rõ hơn: phần chung là bốn thuộc tính, mỗi nhóm hàng chỉ thêm đúng một thông số kỹ thuật và một công thức giá bán.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'ipo',
            caption: 'Phân rã đề bài thành ba khối',
            input: ['Mã, tên sản phẩm', 'Giá nhập, số lượng tồn', 'Nhóm hàng + một thông số riêng', 'Mã và số lượng khi bán'],
            process: ['Tạo đối tượng đúng nhóm', 'Thêm vào danh sách', 'Tính giá bán theo nhóm (đa hình)', 'Trừ tồn kho khi bán, cộng tồn kho'],
            output: ['Danh sách hàng kèm giá bán', 'Tiền mỗi lần bán', 'Tổng giá trị tồn kho', 'File dien-may.json'],
          },
        },
        {
          type: 'table',
          head: ['Nhóm hàng (class)', 'Thông số riêng', 'Giá bán', 'Bảo hành'],
          rows: [
            ['DienTu', 'KichCoInch : int', 'GiaNhap × 1,2', '12 tháng'],
            ['DienLanh', 'CongSuatW : int', 'GiaNhap × 1,15 + 300.000 đ phí lắp đặt', '24 tháng'],
            ['GiaDung', 'ThangBaoHanh : int', 'GiaNhap × 1,3', 'Theo thông số riêng'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Cách đọc đề để tìm class',
          text: 'Danh từ trong đề bài thường là class hoặc thuộc tính: sản phẩm, mã, tên, giá nhập, số lượng, cửa hàng. Động từ là phương thức: tính giá bán, thêm, tìm, cập nhật, bán, xoá, hiển thị, lưu. Danh từ nào "là một loại của" danh từ khác thì là lớp con: tủ lạnh là một sản phẩm thuộc nhóm điện lạnh.',
        },
      ],
    },
    {
      id: 'so-do-lop',
      title: '2. Sơ đồ lớp mục tiêu',
      blocks: [
        {
          type: 'visual',
          visual: {
            kind: 'uml',
            caption: 'Ba nhóm hàng kế thừa SanPham, mỗi nhóm thêm một thông số và ghi đè TinhGiaBan()',
            relation: 'inherit',
            parent: {
              name: 'SanPham',
              stereotype: 'abstract',
              attrs: ['+ Ma : string', '+ Ten : string', '+ GiaNhap : decimal', '+ SoLuong : int'],
              methods: ['+ TinhGiaBan() : decimal  (abstract)', '+ ThangBaoHanh() : int  (virtual, 12)', '+ MoTa() : string'],
            },
            children: [
              { name: 'DienTu', attrs: ['+ KichCoInch : int'], methods: ['+ TinhGiaBan() : GiaNhap × 1,2'] },
              { name: 'DienLanh', attrs: ['+ CongSuatW : int'], methods: ['+ TinhGiaBan() : GiaNhap × 1,15 + 300.000', '+ ThangBaoHanh() : 24'] },
              { name: 'GiaDung', attrs: ['+ ThangBaoHanh : int'], methods: ['+ TinhGiaBan() : GiaNhap × 1,3', '+ ThangBaoHanh() : thông số riêng'] },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'uml',
            caption: 'CuaHang là lớp quản lý, giữ danh sách private và cung cấp các thao tác nghiệp vụ',
            children: [
              {
                name: 'CuaHang',
                attrs: ['− danhSach : List<SanPham>'],
                methods: ['+ Them(SanPham sp) : bool', '+ Tim(string ma) : SanPham?', '+ TimTheoTen(string tuKhoa) : List<SanPham>', '+ CapNhat(string ma, decimal giaNhap, int soLuong) : bool', '+ Ban(string ma, int soLuong) : decimal?', '+ Xoa(string ma) : bool', '+ HienThi()', '+ TongTonKho() : decimal', '+ LuuFile() / DocFile()'],
              },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Luồng bán hàng — chỗ đa hình phát huy tác dụng',
            steps: [
              { kind: 'start', text: 'Nhập mã và số lượng cần bán' },
              { kind: 'process', text: 'sp = cuaHang.Tim(ma)' },
              { kind: 'decision', text: 'sp == null ?', branches: [
                { label: 'Đúng', steps: [{ kind: 'io', text: 'In "Không tìm thấy sản phẩm"' }] },
                { label: 'Sai', steps: [
                  { kind: 'decision', text: 'sp.SoLuong < số lượng bán ?', branches: [
                    { label: 'Đúng', steps: [{ kind: 'io', text: 'In "Không đủ hàng, còn N"' }] },
                    { label: 'Sai', steps: [
                      { kind: 'process', text: 'tien = soLuongBan × sp.TinhGiaBan()  — C# tự chọn đúng công thức theo nhóm hàng' },
                      { kind: 'process', text: 'sp.SoLuong -= soLuongBan' },
                      { kind: 'io', text: 'In tên hàng, số lượng, tiền' },
                    ] },
                  ] },
                ] },
              ] },
              { kind: 'end', text: 'Về menu' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Bẫy hay gặp',
          text: 'Nếu trong CuaHang viết if (sp is DienLanh) … else if (sp is GiaDung) … để tính giá thì đã bỏ mất đa hình. Chỉ cần gọi sp.TinhGiaBan() — phiên bản nào chạy do đối tượng thật quyết định, không phải do kiểu của biến. Bẫy thứ hai: giá bán là kết quả tính toán, không được lưu thành thuộc tính, vì đổi giá nhập là giá bán phải đổi theo.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Lộ trình viết bài lớn — mỗi bước chạy được rồi mới sang bước kế',
            items: [
              { label: 'Class gốc', text: 'Class SanPham: 4 property (GiaNhap, SoLuong kiểm tra ≥ 0), constructor, MoTa(). Tạo 2 đối tượng in thử.' },
              { label: 'Kế thừa', text: 'SanPham thành abstract với TinhGiaBan(); viết DienTu, DienLanh, GiaDung override theo bảng giá.' },
              { label: 'Quản lý', text: 'CuaHang với List<SanPham>: Them, Tim, TimTheoTen, CapNhat, Ban, Xoa, HienThi.' },
              { label: 'Đa hình', text: 'TongTonKho() chỉ foreach cộng sp.SoLuong × sp.TinhGiaBan() — kiểm tra đa hình chạy đúng.' },
              { label: 'JSON', text: 'SanPhamDto + LuuFile / DocFile bằng System.Text.Json, dựng lại đúng lớp con theo Loai.' },
              { label: 'Menu', text: 'Main: vòng lặp menu, mỗi mục một hàm static, try/catch quanh phần nhập liệu.' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Bí quyết không bị rối',
          text: 'Chỉ hỏi "nhóm hàng là gì" ở ranh giới với bên ngoài: lúc tạo đối tượng từ dữ liệu nhập (TaoSanPham trong Main), lúc đổ ra file (LuuFile) và lúc đọc file (DocFile). Bên trong CuaHang, mọi chỗ khác chỉ làm việc với kiểu SanPham. Mục 3 hướng dẫn chi tiết từng chức năng.',
        },
      ],
    },
    {
      id: 'huong-dan-chuc-nang',
      title: '3. Hướng dẫn từng chức năng',
      blocks: [
        {
          type: 'text',
          text: 'Tám chức năng của đề bài, mỗi tab một chức năng: luồng xử lý, đoạn code mẫu và cái bẫy hay gặp. Code viết cho class CuaHang trừ khi ghi khác. Đọc xong tab nào thì viết ngay chức năng đó, chạy thử rồi mới sang tab kế.',
        },
        {
          type: 'tabs',
          items: [
            {
              label: 'Thêm sản phẩm',
              hint: 'bool Them(SanPham sp)',
              blocks: [
                {
                  type: 'text',
                  text: 'Thêm là chức năng duy nhất trong Main phải hỏi người dùng "nhóm hàng nào" — vì phải new đúng lớp con. Gom việc đó vào một hàm TaoSanPham. Phần kiểm tra trùng mã nằm trong CuaHang.Them, không nằm ở Main.',
                },
                {
                  type: 'visual',
                  visual: {
                    kind: 'flow',
                    caption: 'Luồng thêm sản phẩm — Main nhập liệu, CuaHang quyết định nhận hay từ chối',
                    steps: [
                      { kind: 'start', text: 'Chọn nhóm 1 / 2 / 3' },
                      { kind: 'io', text: 'Nhập mã, tên, giá nhập, số lượng (phần chung)' },
                      { kind: 'io', text: 'Nhập thông số riêng theo nhóm: inch / W / tháng BH' },
                      { kind: 'process', text: 'sp = TaoSanPham(nhom, …)  — switch để new DienTu / DienLanh / GiaDung' },
                      { kind: 'decision', text: 'cuaHang.Them(sp) trả về true ?', branches: [
                        { label: 'Đúng', steps: [{ kind: 'io', text: 'In "Đã thêm " + sp.Ten' }] },
                        { label: 'Sai', steps: [{ kind: 'io', text: 'In "Mã đã tồn tại"' }] },
                      ] },
                      { kind: 'end', text: 'Về menu' },
                    ],
                  },
                },
                {
                  type: 'code',
                  sample: {
                    title: 'TaoSanPham trong Main và Them trong CuaHang',
                    code: `// Program.cs — chỗ duy nhất trong Main hỏi "nhóm hàng là gì"
static SanPham TaoSanPham(int nhom, string ma, string ten, decimal giaNhap, int soLuong)
{
    Console.Write(nhom == 1 ? "Kích cỡ (inch): " : nhom == 2 ? "Công suất (W): " : "Bảo hành (tháng): ");
    int thongSo = int.Parse(Console.ReadLine()!);

    return nhom switch
    {
        1 => new DienTu(ma, ten, giaNhap, soLuong, thongSo),
        2 => new DienLanh(ma, ten, giaNhap, soLuong, thongSo),
        3 => new GiaDung(ma, ten, giaNhap, soLuong, thongSo),
        _ => throw new ArgumentException("Nhóm hàng phải là 1, 2 hoặc 3"),
    };
}

// CuaHang.cs — kiểm tra trùng mã rồi mới nhận
public bool Them(SanPham sp)
{
    if (Tim(sp.Ma) != null) return false;
    danhSach.Add(sp);
    return true;
}`,
                    note: 'Constructor của lớp con nhận đủ 5 tham số và gọi base(ma, ten, giaNhap, soLuong). Giá nhập âm sẽ bị property ném ArgumentException ngay tại đây — Main bọc try/catch để báo lỗi rồi hỏi lại.',
                  },
                },
                {
                  type: 'callout',
                  tone: 'tip',
                  title: 'Kiểu trả về của TaoSanPham là SanPham',
                  text: 'Dù new ra DienTu hay GiaDung, hàm trả về kiểu lớp cha. Từ đây trở đi không ai cần biết nó thuộc nhóm nào nữa — mọi thứ đi qua SanPham.',
                },
              ],
            },
            {
              label: 'Tính giá bán (đa hình)',
              hint: 'abstract decimal TinhGiaBan()',
              blocks: [
                {
                  type: 'text',
                  text: 'Lớp cha khai báo TinhGiaBan() là abstract — không có thân hàm, chỉ là lời hứa "lớp con nào cũng phải có". Mỗi lớp con override một công thức. Khi gọi qua biến kiểu SanPham, C# nhìn vào đối tượng thật trên heap để chọn đúng phiên bản.',
                },
                {
                  type: 'code',
                  sample: {
                    title: 'Ba công thức, ba lớp — và một vòng foreach không cần biết nhóm hàng',
                    code: `List<SanPham> ds = new List<SanPham>();
ds.Add(new DienTu("TV01", "Tivi Samsung", 10000000, 5, 55));
ds.Add(new DienLanh("TL01", "Tủ lạnh LG", 8000000, 3, 150));
ds.Add(new GiaDung("NC01", "Nồi cơm Sharp", 500000, 20, 6));
foreach (SanPham sp in ds)
{
    decimal gia = sp.TinhGiaBan();
    Console.WriteLine($"{sp.Ma}: {gia:N0}");
}`,
                    note: 'Biến sp luôn có kiểu SanPham, nhưng bản TinhGiaBan() được chạy đổi theo từng phần tử. Đó là đa hình lúc chạy (runtime polymorphism).',
                    trace: [
                      { line: 1, vars: { ds: '→ 0x100' }, refs: { ds: '0x100' }, heap: { '0x100': 'List<SanPham> [ ]' }, note: 'Danh sách khai báo kiểu SanPham nên nhận được mọi lớp con.' },
                      { line: 2, vars: { ds: '→ 0x100' }, refs: { ds: '0x100' }, heap: { '0x100': '[→0x200]', '0x200': 'DienTu { Ma: "TV01", GiaNhap: 10.000.000 }' } },
                      { line: 3, vars: { ds: '→ 0x100' }, refs: { ds: '0x100' }, heap: { '0x100': '[→0x200, →0x210]', '0x200': 'DienTu { Ma: "TV01", GiaNhap: 10.000.000 }', '0x210': 'DienLanh { Ma: "TL01", GiaNhap: 8.000.000 }' } },
                      { line: 4, vars: { ds: '→ 0x100' }, refs: { ds: '0x100' }, heap: { '0x100': '[→0x200, →0x210, →0x220]', '0x200': 'DienTu { Ma: "TV01", GiaNhap: 10.000.000 }', '0x210': 'DienLanh { Ma: "TL01", GiaNhap: 8.000.000 }', '0x220': 'GiaDung { Ma: "NC01", GiaNhap: 500.000 }' }, note: 'Ba đối tượng ba lớp khác nhau nằm chung một List.' },
                      { line: 5, vars: { ds: '→ 0x100', sp: '→ 0x200' }, refs: { ds: '0x100', sp: '0x200' }, heap: { '0x100': '[→0x200, →0x210, →0x220]', '0x200': 'DienTu { Ma: "TV01", GiaNhap: 10.000.000 }', '0x210': 'DienLanh { Ma: "TL01", GiaNhap: 8.000.000 }', '0x220': 'GiaDung { Ma: "NC01", GiaNhap: 500.000 }' }, focus: { '0x100': [0] }, note: 'sp khai báo kiểu SanPham nhưng đang trỏ tới một DienTu thật.' },
                      { line: 7, vars: { ds: '→ 0x100', sp: '→ 0x200', gia: '12.000.000' }, refs: { ds: '0x100', sp: '0x200' }, heap: { '0x100': '[→0x200, →0x210, →0x220]', '0x200': 'DienTu { Ma: "TV01", GiaNhap: 10.000.000 }', '0x210': 'DienLanh { Ma: "TL01", GiaNhap: 8.000.000 }', '0x220': 'GiaDung { Ma: "NC01", GiaNhap: 500.000 }' }, focus: { '0x100': [0] }, note: 'C# nhìn đối tượng thật là DienTu nên chạy bản của DienTu: 10.000.000 × 1,2.' },
                      { line: 8, vars: { ds: '→ 0x100', sp: '→ 0x200', gia: '12.000.000' }, refs: { ds: '0x100', sp: '0x200' }, heap: { '0x100': '[→0x200, →0x210, →0x220]', '0x200': 'DienTu { Ma: "TV01", GiaNhap: 10.000.000 }', '0x210': 'DienLanh { Ma: "TL01", GiaNhap: 8.000.000 }', '0x220': 'GiaDung { Ma: "NC01", GiaNhap: 500.000 }' }, output: ['TV01: 12.000.000'] },
                      { line: 5, vars: { ds: '→ 0x100', sp: '→ 0x210' }, refs: { ds: '0x100', sp: '0x210' }, heap: { '0x100': '[→0x200, →0x210, →0x220]', '0x200': 'DienTu { Ma: "TV01", GiaNhap: 10.000.000 }', '0x210': 'DienLanh { Ma: "TL01", GiaNhap: 8.000.000 }', '0x220': 'GiaDung { Ma: "NC01", GiaNhap: 500.000 }' }, focus: { '0x100': [1] }, output: ['TV01: 12.000.000'], note: 'Cùng biến sp, giờ trỏ sang DienLanh.' },
                      { line: 7, vars: { ds: '→ 0x100', sp: '→ 0x210', gia: '9.500.000' }, refs: { ds: '0x100', sp: '0x210' }, heap: { '0x100': '[→0x200, →0x210, →0x220]', '0x200': 'DienTu { Ma: "TV01", GiaNhap: 10.000.000 }', '0x210': 'DienLanh { Ma: "TL01", GiaNhap: 8.000.000 }', '0x220': 'GiaDung { Ma: "NC01", GiaNhap: 500.000 }' }, focus: { '0x100': [1] }, output: ['TV01: 12.000.000'], note: 'Bản của DienLanh: 8.000.000 × 1,15 + 300.000. Không có if nào trong vòng lặp.' },
                      { line: 8, vars: { ds: '→ 0x100', sp: '→ 0x210', gia: '9.500.000' }, refs: { ds: '0x100', sp: '0x210' }, heap: { '0x100': '[→0x200, →0x210, →0x220]', '0x200': 'DienTu { Ma: "TV01", GiaNhap: 10.000.000 }', '0x210': 'DienLanh { Ma: "TL01", GiaNhap: 8.000.000 }', '0x220': 'GiaDung { Ma: "NC01", GiaNhap: 500.000 }' }, output: ['TV01: 12.000.000', 'TL01: 9.500.000'] },
                      { line: 7, vars: { ds: '→ 0x100', sp: '→ 0x220', gia: '650.000' }, refs: { ds: '0x100', sp: '0x220' }, heap: { '0x100': '[→0x200, →0x210, →0x220]', '0x200': 'DienTu { Ma: "TV01", GiaNhap: 10.000.000 }', '0x210': 'DienLanh { Ma: "TL01", GiaNhap: 8.000.000 }', '0x220': 'GiaDung { Ma: "NC01", GiaNhap: 500.000 }' }, focus: { '0x100': [2] }, output: ['TV01: 12.000.000', 'TL01: 9.500.000'], note: 'Bản của GiaDung: 500.000 × 1,3.' },
                      { line: 8, vars: { ds: '→ 0x100', sp: '→ 0x220', gia: '650.000' }, refs: { ds: '0x100', sp: '0x220' }, heap: { '0x100': '[→0x200, →0x210, →0x220]', '0x200': 'DienTu { Ma: "TV01", GiaNhap: 10.000.000 }', '0x210': 'DienLanh { Ma: "TL01", GiaNhap: 8.000.000 }', '0x220': 'GiaDung { Ma: "NC01", GiaNhap: 500.000 }' }, output: ['TV01: 12.000.000', 'TL01: 9.500.000', 'NC01: 650.000'], note: 'Ba dòng in ra bởi ba công thức khác nhau, cùng một câu gọi sp.TinhGiaBan().' },
                    ],
                  },
                },
                {
                  type: 'code',
                  sample: {
                    title: 'Khai báo abstract ở lớp cha và override ở lớp con',
                    code: `abstract class SanPham
{
    // ... 4 property, constructor ...
    public abstract decimal TinhGiaBan();          // không có thân hàm
    public virtual int ThangBaoHanh() => 12;        // có mặc định, lớp con được đổi
}

class DienLanh : SanPham
{
    public int CongSuatW { get; set; }

    public DienLanh(string ma, string ten, decimal giaNhap, int soLuong, int congSuatW)
        : base(ma, ten, giaNhap, soLuong)
    {
        CongSuatW = congSuatW;
    }

    public override decimal TinhGiaBan() => GiaNhap * 1.15m + 300_000;
    public override int ThangBaoHanh() => 24;
}`,
                    note: 'abstract bắt buộc lớp con phải override; virtual thì tuỳ — DienTu không override ThangBaoHanh() nên dùng 12 của lớp cha. Hậu tố m ở 1.15m để hằng số là decimal, không phải double.',
                  },
                },
                {
                  type: 'callout',
                  tone: 'warn',
                  title: 'Quên override thì sao?',
                  text: 'Lớp con kế thừa abstract class mà thiếu override TinhGiaBan() sẽ không biên dịch được — trình biên dịch nhắc ngay. Còn nếu viết TinhGiaBan() ở lớp con mà quên chữ override, C# coi đó là hàm mới che hàm cha, gọi qua biến SanPham sẽ không chạy vào — bẫy này chỉ lộ lúc chạy.',
                },
              ],
            },
            {
              label: 'Tìm sản phẩm',
              hint: 'SanPham? Tim(string ma)  ·  List<SanPham> TimTheoTen(string tuKhoa)',
              blocks: [
                {
                  type: 'text',
                  text: 'Hai kiểu tìm khác nhau về kết quả: theo mã thì tối đa một sản phẩm nên trả về SanPham? (có thể null); theo tên thì khớp một phần và có thể nhiều kết quả nên trả về List. Cả hai đều so sánh không phân biệt hoa thường bằng StringComparison.OrdinalIgnoreCase.',
                },
                {
                  type: 'visual',
                  visual: {
                    kind: 'strip',
                    caption: 'TimTheoTen("tủ") — duyệt từng phần tử, giữ lại phần tử có tên chứa từ khoá',
                    name: 'danhSach',
                    items: ['TV01 · Tivi Samsung', 'TL01 · Tủ lạnh LG', 'NC01 · Nồi cơm Sharp', 'ML01 · Tủ đông Aqua'],
                    highlight: [1, 3],
                  },
                },
                {
                  type: 'code',
                  sample: {
                    title: 'Tim và TimTheoTen bằng LINQ',
                    code: `public SanPham? Tim(string ma)
    => danhSach.FirstOrDefault(sp => sp.Ma.Equals(ma, StringComparison.OrdinalIgnoreCase));

public List<SanPham> TimTheoTen(string tuKhoa)
    => danhSach.Where(sp => sp.Ten.Contains(tuKhoa, StringComparison.OrdinalIgnoreCase))
               .ToList();`,
                    note: 'FirstOrDefault trả về null khi không có phần tử nào khớp — đúng ý nghĩa của dấu ? trong SanPham?. Where luôn trả về danh sách, rỗng nếu không khớp, không bao giờ null.',
                  },
                },
                {
                  type: 'callout',
                  tone: 'info',
                  title: 'Tim là viên gạch của các chức năng khác',
                  text: 'Them kiểm tra trùng, CapNhat, Ban, Xoa đều gọi Tim trước rồi mới làm việc. Viết Tim đúng một lần, các chức năng kia chỉ còn vài dòng.',
                },
              ],
            },
            {
              label: 'Cập nhật',
              hint: 'bool CapNhat(string ma, decimal giaNhap, int soLuong)',
              blocks: [
                {
                  type: 'text',
                  text: 'Cập nhật không tạo đối tượng mới, chỉ gán lại property của đối tượng đã có. Vì gán qua property nên phần kiểm tra số âm trong set tự chạy — CuaHang không cần kiểm tra lại.',
                },
                {
                  type: 'visual',
                  visual: {
                    kind: 'flow',
                    caption: 'Luồng CapNhat — kiểm tra hợp lệ nằm trong property, không nằm trong CuaHang',
                    steps: [
                      { kind: 'start', text: 'CapNhat(ma, giaNhap, soLuong)' },
                      { kind: 'process', text: 'sp = Tim(ma)' },
                      { kind: 'decision', text: 'sp == null ?', branches: [
                        { label: 'Đúng', steps: [{ kind: 'io', text: 'return false' }] },
                        { label: 'Sai', steps: [
                          { kind: 'process', text: 'sp.GiaNhap = giaNhap  → set kiểm tra ≥ 0, âm thì ném ArgumentException' },
                          { kind: 'process', text: 'sp.SoLuong = soLuong' },
                          { kind: 'io', text: 'return true' },
                        ] },
                      ] },
                    ],
                  },
                },
                {
                  type: 'code',
                  sample: {
                    title: 'Property có kiểm tra và hàm CapNhat',
                    code: `// SanPham.cs — property đầy đủ với field private phía sau
private decimal giaNhap;
public decimal GiaNhap
{
    get => giaNhap;
    set
    {
        if (value < 0) throw new ArgumentException("Giá nhập không được âm");
        giaNhap = value;
    }
}

// CuaHang.cs
public bool CapNhat(string ma, decimal giaNhap, int soLuong)
{
    SanPham? sp = Tim(ma);
    if (sp == null) return false;
    sp.GiaNhap = giaNhap;     // ném lỗi nếu âm — Main bắt bằng try/catch
    sp.SoLuong = soLuong;
    return true;
}`,
                    note: 'Giá bán tự đổi theo vì TinhGiaBan() tính từ GiaNhap mỗi lần gọi. Nếu lưu giá bán thành thuộc tính thì ở đây phải nhớ tính lại — dễ quên.',
                  },
                },
                {
                  type: 'callout',
                  tone: 'warn',
                  title: 'Gán một nửa rồi lỗi',
                  text: 'Nếu GiaNhap hợp lệ nhưng SoLuong âm, dòng gán GiaNhap đã chạy xong rồi mới ném lỗi — đối tượng bị đổi một nửa. Muốn chặt chẽ, kiểm tra cả hai giá trị trước khi gán, hoặc gán SoLuong trước rồi mới gán GiaNhap.',
                },
              ],
            },
            {
              label: 'Bán hàng',
              hint: 'decimal? Ban(string ma, int soLuong)',
              blocks: [
                {
                  type: 'text',
                  text: 'Bán là chức năng nghiệp vụ duy nhất có hai điều kiện từ chối: không có hàng và không đủ tồn. Hai lý do khác nhau nên báo khác nhau: không có hàng trả về null, không đủ tồn ném InvalidOperationException kèm số còn lại. Tiền tính bằng sp.TinhGiaBan() — đa hình lo phần công thức.',
                },
                {
                  type: 'visual',
                  visual: {
                    kind: 'boxes',
                    caption: 'Ban("TL01", 2) — số liệu trước và sau khi bán',
                    items: [
                      { label: 'sp.SoLuong trước', value: '3' },
                      { label: 'soLuong bán', value: '2' },
                      { label: 'sp.TinhGiaBan()', value: '9.500.000', note: 'DienLanh: 8tr × 1,15 + 300k' },
                      { label: 'tien trả về', value: '19.000.000', note: '2 × 9.500.000' },
                      { label: 'sp.SoLuong sau', value: '1' },
                    ],
                  },
                },
                {
                  type: 'code',
                  sample: {
                    title: 'Ban trong CuaHang và cách Main dùng',
                    code: `// CuaHang.cs
public decimal? Ban(string ma, int soLuong)
{
    SanPham? sp = Tim(ma);
    if (sp == null) return null;
    if (sp.SoLuong < soLuong)
        throw new InvalidOperationException($"Không đủ hàng, còn {sp.SoLuong}");

    sp.SoLuong -= soLuong;
    return soLuong * sp.TinhGiaBan();
}

// Program.cs
try
{
    decimal? tien = cuaHang.Ban(ma, soLuong);
    if (tien == null) Console.WriteLine("Không tìm thấy sản phẩm");
    else Console.WriteLine($"Bán {soLuong} × {tien / soLuong:N0} = {tien:N0} đ");
}
catch (InvalidOperationException ex)
{
    Console.WriteLine(ex.Message);
}`,
                    note: 'Lưu đồ đầy đủ của luồng bán hàng nằm ở mục 2. Số lượng bán ≤ 0 cũng nên từ chối — property SoLuong không chặn được vì ở đây là phép trừ.',
                  },
                },
                {
                  type: 'callout',
                  tone: 'tip',
                  title: 'Vì sao không trả về 0 khi không đủ hàng',
                  text: 'Trả về 0 thì Main không phân biệt được "bán 0 đồng" với "từ chối bán". Ném ngoại lệ mang theo thông điệp rõ ràng và buộc Main phải xử lý, không bỏ qua được.',
                },
              ],
            },
            {
              label: 'Xoá',
              hint: 'bool Xoa(string ma)',
              blocks: [
                {
                  type: 'text',
                  text: 'Xoá là tìm rồi Remove. Trả về bool để Main biết có xoá được không. Sau khi xoá, các phần tử phía sau dồn lên một vị trí — chỉ số cũ không còn đúng.',
                },
                {
                  type: 'visual',
                  visual: {
                    kind: 'strip',
                    caption: 'Xoa("TL01") — phần tử [1] bị gỡ, NC01 dồn lên thành [1]',
                    name: 'danhSach (trước)',
                    items: ['TV01', 'TL01 ✕', 'NC01', 'ML01'],
                    highlight: [1],
                  },
                },
                {
                  type: 'code',
                  sample: {
                    title: 'Hai cách viết Xoa',
                    code: `// Cách 1: tìm rồi gỡ đúng đối tượng đó
public bool Xoa(string ma)
{
    SanPham? sp = Tim(ma);
    if (sp == null) return false;
    danhSach.Remove(sp);
    return true;
}

// Cách 2: một dòng — RemoveAll trả về số phần tử đã gỡ
public bool Xoa(string ma)
    => danhSach.RemoveAll(sp => sp.Ma.Equals(ma, StringComparison.OrdinalIgnoreCase)) > 0;`,
                    note: 'Remove(sp) so sánh tham chiếu — gỡ đúng đối tượng Tim vừa trả về. Hai cách cho cùng kết quả vì mã không trùng.',
                  },
                },
                {
                  type: 'callout',
                  tone: 'warn',
                  title: 'Không Remove bên trong foreach',
                  text: 'Đang foreach danhSach mà gọi danhSach.Remove sẽ ném InvalidOperationException "Collection was modified". Dùng Tim rồi Remove ở ngoài vòng lặp, hoặc RemoveAll.',
                },
              ],
            },
            {
              label: 'Hiển thị & tồn kho',
              hint: 'void HienThi()  ·  decimal TongTonKho()',
              blocks: [
                {
                  type: 'text',
                  text: 'Hiển thị in mỗi sản phẩm một dòng, cột thẳng hàng nhờ chỉ định độ rộng trong chuỗi nội suy. Tổng tồn kho là tổng SoLuong × TinhGiaBan() — lại đa hình, lại không có if.',
                },
                {
                  type: 'table',
                  head: ['Cú pháp', 'Ý nghĩa', 'Ví dụ'],
                  rows: [
                    ['{sp.Ten,-18}', 'Căn trái, chiếm 18 ô', '"Tivi Samsung      "'],
                    ['{sp.SoLuong,5}', 'Căn phải, chiếm 5 ô', '"    5"'],
                    ['{gia:N0}', 'Phân cách hàng nghìn, 0 chữ số lẻ', '"12.000.000"'],
                    ['{gia,15:N0}', 'Kết hợp: căn phải 15 ô và định dạng N0', '"     12.000.000"'],
                  ],
                },
                {
                  type: 'code',
                  sample: {
                    title: 'HienThi và TongTonKho',
                    code: `public void HienThi()
{
    if (danhSach.Count == 0) { Console.WriteLine("Kho trống"); return; }

    Console.WriteLine($"{"Mã",-6}{"Tên",-18}{"Nhóm",-10}{"Tồn",5}{"Giá bán",15}{"BH",5}");
    foreach (SanPham sp in danhSach)
        Console.WriteLine($"{sp.Ma,-6}{sp.Ten,-18}{sp.GetType().Name,-10}{sp.SoLuong,5}{sp.TinhGiaBan(),15:N0}{sp.ThangBaoHanh(),4}t");

    Console.WriteLine($"Tổng tồn kho: {TongTonKho():N0} đ");
}

public decimal TongTonKho()
{
    decimal tong = 0;
    foreach (SanPham sp in danhSach)
        tong += sp.SoLuong * sp.TinhGiaBan();
    return tong;
}`,
                    note: 'sp.GetType().Name trả về tên lớp thật (DienTu, DienLanh, GiaDung) dù biến khai báo là SanPham. Muốn in "Điện tử" tiếng Việt thì thêm một phương thức virtual TenNhom() và override ở từng lớp con — vẫn là đa hình.',
                  },
                },
                {
                  type: 'callout',
                  tone: 'tip',
                  title: 'Dấu phân cách hàng nghìn',
                  text: 'N0 in ra "12.000.000" hay "12,000,000" tuỳ culture của máy. Muốn cố định kiểu Việt Nam thì đặt CultureInfo.CurrentCulture = new CultureInfo("vi-VN") ở đầu Main.',
                },
              ],
            },
            {
              label: 'Lưu / đọc JSON đa hình',
              hint: 'void LuuFile()  ·  void DocFile()',
              blocks: [
                {
                  type: 'text',
                  text: 'Đây là chỗ khó nhất của bài. JSON chỉ là chữ — nó không biết một bản ghi là DienTu hay GiaDung. Serialize thẳng List<SanPham> thì System.Text.Json chỉ ghi các property của kiểu khai báo (SanPham), thông số riêng mất sạch; còn Deserialize về List<SanPham> thì thất bại vì SanPham là abstract, không new được.',
                },
                {
                  type: 'visual',
                  visual: {
                    kind: 'compare',
                    caption: 'Ba cách ghi danh sách đa hình ra JSON',
                    columns: [
                      { title: 'Serialize thẳng List<SanPham>', tone: 'bad', items: ['Chỉ ghi Ma, Ten, GiaNhap, SoLuong', 'Mất KichCoInch / CongSuatW / ThangBaoHanh', 'Đọc lại: NotSupportedException vì SanPham abstract', 'Không dùng được'] },
                      { title: 'Cách 1 — lớp trung gian SanPhamDto', tone: 'good', items: ['Thêm trường Loai = tên lớp', 'Gom thông số riêng vào một trường ThongSo', 'Đọc lên: switch theo Loai để new đúng lớp con', 'Chạy mọi phiên bản .NET, tự kiểm soát hoàn toàn'] },
                      { title: 'Cách 2 — [JsonPolymorphic] (.NET 7+)', tone: 'good', items: ['Gắn attribute lên SanPham, khai báo từng lớp con', 'Thư viện tự ghi trường phân biệt và tự new đúng lớp', 'Không cần DTO, code ngắn nhất', 'Trường phân biệt phải đứng đầu bản ghi khi đọc'] },
                    ],
                  },
                },
                {
                  type: 'visual',
                  visual: {
                    kind: 'map',
                    caption: 'Một bản ghi trong dien-may.json — trường Loai là chìa khoá để dựng lại đúng lớp',
                    name: 'bản ghi TL01',
                    pairs: [
                      { key: '"Loai"', value: '"DienLanh"   ← quyết định new lớp nào' },
                      { key: '"Ma"', value: '"TL01"' },
                      { key: '"Ten"', value: '"Tủ lạnh LG"' },
                      { key: '"GiaNhap"', value: '8000000' },
                      { key: '"SoLuong"', value: '3' },
                      { key: '"ThongSo"', value: '150   ← với DienLanh nghĩa là CongSuatW' },
                    ],
                  },
                },
                {
                  type: 'code',
                  sample: {
                    title: 'Cách 1 — SanPhamDto, LuuFile và DocFile',
                    code: `using System.Text.Json;

// Lớp trung gian chỉ để ghi/đọc file — toàn property công khai, không logic
class SanPhamDto
{
    public string Loai { get; set; } = "";
    public string Ma { get; set; } = "";
    public string Ten { get; set; } = "";
    public decimal GiaNhap { get; set; }
    public int SoLuong { get; set; }
    public int ThongSo { get; set; }   // KichCoInch / CongSuatW / ThangBaoHanh tuỳ Loai
}

// CuaHang.cs
public void LuuFile(string duongDan = "dien-may.json")
{
    List<SanPhamDto> dtos = new List<SanPhamDto>();
    foreach (SanPham sp in danhSach)
    {
        dtos.Add(new SanPhamDto
        {
            Loai = sp.GetType().Name,
            Ma = sp.Ma, Ten = sp.Ten, GiaNhap = sp.GiaNhap, SoLuong = sp.SoLuong,
            ThongSo = sp switch
            {
                DienTu dt => dt.KichCoInch,
                DienLanh dl => dl.CongSuatW,
                GiaDung gd => gd.ThangBaoHanh,
                _ => 0,
            },
        });
    }
    var options = new JsonSerializerOptions { WriteIndented = true };
    File.WriteAllText(duongDan, JsonSerializer.Serialize(dtos, options));
}

public void DocFile(string duongDan = "dien-may.json")
{
    if (!File.Exists(duongDan)) return;             // lần chạy đầu chưa có file

    string json = File.ReadAllText(duongDan);
    List<SanPhamDto> dtos = JsonSerializer.Deserialize<List<SanPhamDto>>(json) ?? new();

    danhSach.Clear();
    foreach (SanPhamDto d in dtos)
    {
        SanPham sp = d.Loai switch
        {
            "DienTu"   => new DienTu(d.Ma, d.Ten, d.GiaNhap, d.SoLuong, d.ThongSo),
            "DienLanh" => new DienLanh(d.Ma, d.Ten, d.GiaNhap, d.SoLuong, d.ThongSo),
            "GiaDung"  => new GiaDung(d.Ma, d.Ten, d.GiaNhap, d.SoLuong, d.ThongSo),
            _ => throw new InvalidDataException($"Không biết nhóm hàng: {d.Loai}"),
        };
        danhSach.Add(sp);
    }
}`,
                    note: 'Hai switch ở đây là hai chỗ còn lại được hỏi "nhóm hàng là gì" — vì đang đứng ở ranh giới giữa đối tượng trong bộ nhớ và chữ trong file. Bên trong CuaHang, mọi chỗ khác chỉ dùng SanPham.',
                  },
                },
                {
                  type: 'visual',
                  visual: {
                    kind: 'flow',
                    caption: 'DocFile — từ chữ trong file về lại đúng đối tượng',
                    steps: [
                      { kind: 'start', text: 'DocFile("dien-may.json")' },
                      { kind: 'decision', text: 'File.Exists ?', branches: [
                        { label: 'Sai', steps: [{ kind: 'end', text: 'return — danh sách trống' }] },
                        { label: 'Đúng', steps: [
                          { kind: 'process', text: 'json = File.ReadAllText(...)' },
                          { kind: 'process', text: 'dtos = Deserialize<List<SanPhamDto>>(json)' },
                          { kind: 'process', text: 'Với mỗi dto: switch (dto.Loai) → new DienTu / DienLanh / GiaDung' },
                          { kind: 'process', text: 'danhSach.Add(sp)' },
                        ] },
                      ] },
                      { kind: 'end', text: 'Danh sách đã có đúng lớp con, TinhGiaBan() chạy đúng như trước khi lưu' },
                    ],
                  },
                },
                {
                  type: 'code',
                  sample: {
                    title: 'Cách 2 — để System.Text.Json tự lo bằng [JsonPolymorphic] (.NET 7 trở lên)',
                    code: `using System.Text.Json;
using System.Text.Json.Serialization;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "Loai")]
[JsonDerivedType(typeof(DienTu),   "DienTu")]
[JsonDerivedType(typeof(DienLanh), "DienLanh")]
[JsonDerivedType(typeof(GiaDung),  "GiaDung")]
abstract class SanPham
{
    // ... như cũ, các property phải public và có set ...
}

// Ghi: thư viện tự thêm "Loai" vào đầu mỗi bản ghi và ghi đủ property của lớp con
File.WriteAllText("dien-may.json",
    JsonSerializer.Serialize(danhSach, new JsonSerializerOptions { WriteIndented = true }));

// Đọc: trả về List<SanPham> mà từng phần tử là đúng DienTu / DienLanh / GiaDung
danhSach = JsonSerializer.Deserialize<List<SanPham>>(File.ReadAllText("dien-may.json")) ?? new();`,
                    note: 'Để đọc được, mỗi lớp con cần constructor mà tên tham số khớp tên property (ma ↔ Ma, kichCoInch ↔ KichCoInch) hoặc một constructor không tham số. File tự sinh luôn đặt "Loai" đứng đầu; nếu sửa tay mà đẩy nó xuống dưới thì đọc sẽ lỗi (trước .NET 9).',
                  },
                },
                {
                  type: 'callout',
                  tone: 'info',
                  title: 'Nên làm cách nào trong bài này?',
                  text: 'Làm cách 1 trước — tự viết switch giúp hiểu vì sao JSON cần trường phân biệt loại. Xong rồi thử đổi sang cách 2 để thấy thư viện đang làm y hệt việc đó thay mình. Cả hai đều cho cùng kết quả ở ví dụ 3 của đề: mở lại chương trình, NC01 vẫn là GiaDung, bảo hành vẫn 6 tháng.',
                },
                {
                  type: 'callout',
                  tone: 'warn',
                  title: 'Lỗi hay gặp khi đọc file',
                  text: 'NotSupportedException "Deserialization of types without a parameterless constructor…" là do lớp không có constructor phù hợp. JsonException "The JSON value could not be converted" thường do file cũ ghi bằng cấu trúc khác — xoá file dien-may.json rồi chạy lại.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b16-m001', level: 'Trung bình', title: 'Quản lý khách hàng thân thiết', dense: true,
      requirement: 'Cửa hàng điện máy muốn lưu khách hàng thân thiết. Mỗi khách là một người (họ tên, số điện thoại, năm sinh) và có thêm mã khách và điểm tích luỹ. Xây dựng chương trình console với các chức năng: (1) thêm khách, từ chối nếu trùng mã hoặc trùng số điện thoại; (2) xoá khách theo mã; (3) tìm khách theo số điện thoại hoặc theo từ khoá trong họ tên, không phân biệt hoa thường; (4) hiển thị danh sách gồm mã, họ tên, tuổi, số điện thoại, điểm. Dùng kế thừa để KhachHang dùng lại phần "người" thay vì khai báo lại.',
      signature: 'class Nguoi { HoTen, SoDienThoai, NamSinh; int Tuoi(); }\nclass KhachHang : Nguoi { MaKH, DiemTichLuy; string MoTa(); }\nclass DanhSachKhach { Them, Xoa, TimTheoSdt, TimTheoTen, HienThi }',
      constraints: [
        'Không override, không virtual, không abstract — kế thừa chỉ để dùng lại thuộc tính và Tuoi()',
        'Constructor của KhachHang gọi base(hoTen, soDienThoai, namSinh) · NamSinh sau năm hiện tại và điểm âm bị từ chối trong property',
        'Không lưu file · Main chỉ nhập xuất và gọi DanhSachKhach; lỗi nhập liệu phải được bắt',
      ],
      examples: [
        { input: 'Thêm KH01 "Nguyễn Văn An" 0901234567 1990 điểm 120; thêm KH02 "Trần Thị Bích" 0912345678 2001 điểm 0; hiển thị', output: 'KH01 · Nguyễn Văn An · 36 tuổi · 0901234567 · 120 điểm\nKH02 · Trần Thị Bích · 25 tuổi · 0912345678 · 0 điểm', explain: 'Tuổi = năm hiện tại (2026) − năm sinh, tính trong Nguoi và KhachHang dùng lại.' },
        { input: 'Thêm KH03 "Lê Văn Cường" 0901234567 1985 điểm 50', output: 'Từ chối: số điện thoại đã có (KH01)', explain: 'Trùng số điện thoại dù mã khác vẫn từ chối.' },
        { input: 'Tìm theo tên "văn"; xoá KH01; tìm SĐT 0901234567', output: 'KH01 · Nguyễn Văn An · 36 tuổi\nĐã xoá KH01\nKhông tìm thấy', explain: 'Tìm tên khớp một phần, không phân biệt hoa thường. Sau khi xoá, số điện thoại đó không còn.' },
      ],
      hint: 'Cần 3 class. Nguoi: 3 property HoTen, SoDienThoai, NamSinh (set kiểm tra ≤ năm hiện tại), constructor 3 tham số, Tuoi() = DateTime.Now.Year − NamSinh. KhachHang : Nguoi: thêm MaKH và DiemTichLuy (set kiểm tra ≥ 0), constructor 5 tham số gọi base(...), MoTa() ghép mã, HoTen, Tuoi(), SoDienThoai, điểm. DanhSachKhach: field private List<KhachHang>; Them(kh) → bool, Xoa(maKH) → bool, TimTheoSdt(sdt) → KhachHang?, TimTheoTen(tuKhoa) → List<KhachHang>, HienThi(). Bên trong KhachHang gọi thẳng HoTen, Tuoi() như của mình — đó là cái kế thừa cho.',
      visual: {
        kind: 'uml',
        caption: 'KhachHang kế thừa Nguoi để dùng lại ba thuộc tính và Tuoi(), chỉ thêm phần riêng của khách',
        relation: 'inherit',
        parent: { name: 'Nguoi', attrs: ['+ HoTen : string', '+ SoDienThoai : string', '+ NamSinh : int'], methods: ['+ Tuoi() : int'] },
        children: [
          { name: 'KhachHang', attrs: ['+ MaKH : string', '+ DiemTichLuy : int'], methods: ['+ MoTa() : string'] },
        ],
      },
    },
    {
      id: 'b16-h001', level: 'Nâng cao', title: 'Chương trình quản lý sản phẩm cửa hàng điện máy', dense: true,
      requirement: 'Xây dựng chương trình console quản lý sản phẩm cửa hàng điện máy với các chức năng: (1) thêm sản phẩm thuộc ba nhóm điện tử, điện lạnh, gia dụng, mỗi nhóm có một thông số riêng; (2) tính giá bán từ giá nhập theo quy tắc riêng của nhóm bằng đa hình; (3) tìm theo mã hoặc từ khoá trong tên, không phân biệt hoa thường; (4) cập nhật giá nhập và số lượng theo mã; (5) bán hàng: kiểm tra tồn, trừ kho, in tiền; (6) xoá theo mã; (7) hiển thị danh sách kèm giá bán, bảo hành và tổng giá trị tồn kho; (8) lưu ra file JSON và tự đọc lại khi khởi động.',
      signature: 'abstract class SanPham { Ma, Ten, GiaNhap, SoLuong; abstract decimal TinhGiaBan(); virtual int ThangBaoHanh(); }\nclass DienTu : SanPham { KichCoInch }   class DienLanh : SanPham { CongSuatW }   class GiaDung : SanPham { ThangBaoHanh }\nclass CuaHang { Them, Tim, TimTheoTen, CapNhat, Ban, Xoa, HienThi, TongTonKho, LuuFile, DocFile }',
      constraints: [
        'Điện tử: giá nhập × 1,2 · Điện lạnh: × 1,15 + 300.000 đ lắp đặt, BH 24 tháng · Gia dụng: × 1,3, BH theo thông số riêng',
        'Mã không trùng; GiaNhap, SoLuong âm bị từ chối trong property · Không if / switch theo nhóm khi tính giá, tồn kho',
        'Bán quá tồn thì từ chối · Main chỉ nhập xuất, gọi CuaHang; lỗi nhập liệu phải được bắt, chương trình không dừng',
      ],
      examples: [
        { input: 'Thêm TV01 Tivi Samsung (điện tử 55 inch, nhập 10tr, tồn 5), TL01 Tủ lạnh LG (điện lạnh 150 W, nhập 8tr, tồn 3), NC01 Nồi cơm Sharp (gia dụng BH 6 tháng, nhập 500k, tồn 20); hiển thị', output: 'TV01 · Tivi Samsung · Điện tử · tồn 5 · 12.000.000 đ · BH 12t\nTL01 · Tủ lạnh LG · Điện lạnh · tồn 3 · 9.500.000 đ · BH 24t\nNC01 · Nồi cơm Sharp · Gia dụng · tồn 20 · 650.000 đ · BH 6t\nTổng tồn kho: 101.500.000 đ', explain: 'Tủ lạnh: 8tr × 1,15 + 300k. Tồn kho = 5 × 12tr + 3 × 9,5tr + 20 × 650k.' },
        { input: 'Tìm theo tên "tủ"; bán TL01 số lượng 2; bán TL01 số lượng 2 lần nữa', output: 'TL01 · Tủ lạnh LG · Điện lạnh · tồn 3\nBán 2 × 9.500.000 = 19.000.000 đ. Còn 1.\nKhông đủ hàng, còn 1', explain: 'Tìm khớp một phần tên, không phân biệt hoa thường. Lần bán thứ hai bị từ chối vì tồn còn 1.' },
        { input: 'Cập nhật NC01 giá nhập 600k, tồn 10; thoát rồi mở lại; hiển thị NC01', output: 'NC01 · Nồi cơm Sharp · Gia dụng · tồn 10 · 780.000 đ · BH 6t', explain: 'Giá bán tính lại: 600k × 1,3. JSON dựng lại đúng lớp GiaDung nên BH vẫn 6 tháng.' },
      ],
      hint: 'Cần đúng 6 class. SanPham (abstract): 4 property Ma, Ten, GiaNhap, SoLuong (set kiểm tra ≥ 0), constructor 4 tham số, abstract TinhGiaBan(), virtual ThangBaoHanh() trả 12, MoTa(). DienTu thêm KichCoInch; DienLanh thêm CongSuatW, override ThangBaoHanh() = 24; GiaDung thêm ThangBaoHanh và override trả về nó. Mỗi lớp con: constructor gọi base(...) + override TinhGiaBan(). CuaHang: field private List<SanPham>; Them(sp) → bool, Tim(ma) → SanPham?, TimTheoTen(tuKhoa) → List<SanPham>, CapNhat(ma, giaNhap, soLuong) → bool, Ban(ma, soLuong) → decimal?, Xoa(ma) → bool, HienThi(), TongTonKho() → decimal (foreach cộng SoLuong × TinhGiaBan()), LuuFile(), DocFile(). SanPhamDto: Loai, Ma, Ten, GiaNhap, SoLuong, ThongSo — chỉ để ghi JSON; đọc lên switch theo Loai để new đúng lớp con.',
      visual: {
        kind: 'uml',
        caption: 'Mỗi nhóm thêm một thông số và ghi đè TinhGiaBan(); CuaHang giữ List<SanPham>',
        relation: 'inherit',
        parent: { name: 'SanPham', stereotype: 'abstract', attrs: ['+ Ma, Ten, GiaNhap, SoLuong'], methods: ['+ TinhGiaBan() : decimal  (abstract)', '+ ThangBaoHanh() : int  (virtual)'] },
        children: [
          { name: 'DienTu', attrs: ['+ KichCoInch'], methods: ['+ TinhGiaBan()'] },
          { name: 'DienLanh', attrs: ['+ CongSuatW'], methods: ['+ TinhGiaBan()', '+ ThangBaoHanh()'] },
          { name: 'GiaDung', attrs: ['+ ThangBaoHanh'], methods: ['+ TinhGiaBan()', '+ ThangBaoHanh()'] },
        ],
      },
    },
  ],
}

export default buoi16
