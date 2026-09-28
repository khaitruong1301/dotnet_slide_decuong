import type { Buoi, TabItem } from './types'

/**
 * Buổi ôn tập OOP. Một bài tập lớn duy nhất — viết trọn chương trình console quản lý
 * sản phẩm cho cửa hàng điện máy. Phần lý thuyết phân rã đề bài, vẽ sơ đồ lớp và lộ
 * trình 6 bước; phần gợi ý của bài liệt kê rõ class, thuộc tính, phương thức để người
 * học biết chính xác phải viết cái gì.
 */
/** Hướng dẫn 8 chức năng của bài lớn — gắn vào guide của bài, mỗi tab một chức năng. */
const HUONG_DAN_DIEN_MAY: TabItem[] = [
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
}`,
          note: 'switch theo kiểu thật (sp switch { DienTu dt => … }) để lấy thông số riêng — một trong ba chỗ được hỏi "nhóm hàng là gì", vì đang đứng ở ranh giới giữa đối tượng và chữ trong file.',
        },
      },
      {
        type: 'code',
        sample: {
          title: 'Cách 1 — DocFile dựng lại đúng lớp con theo Loai',
          code: `public void DocFile(string duongDan = "dien-may.json")
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
                      note: 'Sau dòng new, sp là một DienTu / DienLanh / GiaDung thật trên heap — đa hình quay lại đầy đủ. Bên trong CuaHang, mọi chỗ khác chỉ dùng SanPham.',
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
]

/** Hướng dẫn bài khách hàng thân thiết — tab đầu là sơ đồ lớp, sau đó mỗi tab một yêu cầu. */
const HUONG_DAN_KHACH_HANG: TabItem[] = [
  {
    label: 'Sơ đồ lớp',
    hint: 'Nguoi ← KhachHang ← KhachHangVip · KhachHang : ITichDiem',
    blocks: [
      {
        type: 'text',
        text: 'Đọc đề có ba tầng: "mỗi khách là một người" → KhachHang kế thừa Nguoi; "khách VIP là khách hàng được ưu đãi hơn" → KhachHangVip kế thừa KhachHang và chỉ đổi hai cách tính; "mọi khách đều tích điểm và giảm giá" → gom hai việc đó thành interface ITichDiem để phần mua hàng chỉ cần nhìn khách qua interface.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'uml',
          caption: 'Kế thừa hai tầng: KhachHang dùng lại Nguoi, KhachHangVip dùng lại KhachHang và ghi đè ba phương thức',
          relation: 'inherit',
          parent: { name: 'Nguoi', attrs: ['+ HoTen : string', '+ SoDienThoai : string', '+ NamSinh : int'], methods: ['+ Tuoi() : int', '+ MoTa() : string  (virtual)'] },
          children: [{ name: 'KhachHang', attrs: ['+ MaKH : string', '+ DiemTichLuy : int'], methods: ['+ TyLeGiamGia() : 0,05  (virtual)', '+ CongDiem(tienMua)  (virtual)', '+ MoTa()  override'] }],
        },
      },
      {
        type: 'visual',
        visual: {
          kind: 'uml',
          caption: 'KhachHang cam kết ITichDiem; KhachHangVip ghi đè để giảm 10% và nhân đôi điểm',
          relation: 'implement',
          parent: { name: 'ITichDiem', stereotype: 'interface', methods: ['+ TyLeGiamGia() : decimal', '+ CongDiem(decimal tienMua) : void'] },
          children: [
            { name: 'KhachHang', methods: ['+ TyLeGiamGia() : 0,05', '+ CongDiem(): 1 điểm / 10.000 đ'] },
            { name: 'KhachHangVip : KhachHang', attrs: ['+ HangThe : string'], methods: ['+ TyLeGiamGia() : 0,10  override', '+ CongDiem(): × 2  override', '+ MoTa() + " · VIP hạng"  override'] },
          ],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'Interface ITichDiem và class Nguoi',
          code: `// Lời hứa: ai tích điểm được thì phải có hai việc này
interface ITichDiem
{
    decimal TyLeGiamGia();            // 0.05m nghĩa là giảm 5%
    void CongDiem(decimal tienMua);
}

class Nguoi
{
    public string HoTen { get; set; }
    public string SoDienThoai { get; set; }

    private int namSinh;
    public int NamSinh
    {
        get => namSinh;
        set
        {
            if (value > DateTime.Now.Year) throw new ArgumentException("Năm sinh không hợp lệ");
            namSinh = value;
        }
    }

    public Nguoi(string hoTen, string soDienThoai, int namSinh)
    {
        HoTen = hoTen;
        SoDienThoai = soDienThoai;
        NamSinh = namSinh;
    }

    public int Tuoi() => DateTime.Now.Year - NamSinh;

    // virtual: lớp con được phép viết lại
    public virtual string MoTa() => $"{HoTen} · {Tuoi()} tuổi · {SoDienThoai}";
}`,
          note: 'Interface chỉ có chữ ký, không có thân hàm, không có field. Nguoi không cài ITichDiem — không phải người nào cũng tích điểm, chỉ khách hàng mới tích.',
        },
      },
      {
        type: 'code',
        sample: {
          title: 'KhachHang kế thừa Nguoi và cài ITichDiem',
          code: `class KhachHang : Nguoi, ITichDiem       // kế thừa 1 class, cài 1 interface
{
    public string MaKH { get; set; }

    private int diemTichLuy;
    public int DiemTichLuy
    {
        get => diemTichLuy;
        set
        {
            if (value < 0) throw new ArgumentException("Điểm không được âm");
            diemTichLuy = value;
        }
    }

    public KhachHang(string maKH, string hoTen, string soDienThoai, int namSinh, int diem)
        : base(hoTen, soDienThoai, namSinh)
    {
        MaKH = maKH;
        DiemTichLuy = diem;
    }

    // Cài interface, đồng thời để virtual cho KhachHangVip ghi đè
    public virtual decimal TyLeGiamGia() => 0.05m;
    public virtual void CongDiem(decimal tienMua) => DiemTichLuy += (int)(tienMua / 10_000);

    public override string MoTa() => $"{MaKH} · {base.MoTa()} · {DiemTichLuy} điểm";
}`,
          note: 'base.MoTa() gọi bản của Nguoi rồi nối thêm phần của khách — không chép lại chuỗi. Một phương thức vừa cài interface vừa virtual là hợp lệ.',
        },
      },
      {
        type: 'code',
        sample: {
          title: 'KhachHangVip — chỉ viết phần khác đi',
          code: `class KhachHangVip : KhachHang
{
    public string HangThe { get; set; }           // "Vàng" hoặc "Bạch kim"

    public KhachHangVip(string maKH, string hoTen, string soDienThoai, int namSinh, int diem, string hangThe)
        : base(maKH, hoTen, soDienThoai, namSinh, diem)
    {
        HangThe = hangThe;
    }

    public override decimal TyLeGiamGia() => 0.10m;                                    // giảm 10%
    public override void CongDiem(decimal tienMua) => DiemTichLuy += (int)(tienMua / 10_000) * 2;   // nhân đôi điểm
    public override string MoTa() => $"{base.MoTa()} · VIP {HangThe}";
}`,
          note: 'Ba override, không có gì khác — thêm, xoá, tìm đều dùng lại nguyên của KhachHang. Đó là lý do kế thừa thêm một tầng thay vì chép class.',
        },
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Interface khác abstract class chỗ nào',
        text: 'Một class chỉ kế thừa được một class cha nhưng cài được nhiều interface. Interface không giữ dữ liệu, chỉ là danh sách việc phải làm được. Dùng interface khi nhiều loại đối tượng không cùng họ hàng vẫn cần cùng một khả năng — ví dụ sau này thẻ quà tặng cũng tích điểm dù không phải là người.',
      },
    ],
  },
  {
    label: 'Thêm khách',
    hint: 'bool Them(KhachHang kh)',
    blocks: [
      {
        type: 'text',
        text: 'Main hỏi khách thường hay VIP để new đúng lớp — đây là chỗ duy nhất trong chương trình cần biết loại khách. Them nhận tham số kiểu KhachHang nên nhận được cả KhachHangVip. Hai điều kiện từ chối: trùng mã và trùng số điện thoại.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'flow',
          caption: 'Luồng thêm khách — Main tạo đúng lớp, DanhSachKhach kiểm tra rồi mới nhận',
          steps: [
            { kind: 'io', text: 'Nhập mã, họ tên, SĐT, năm sinh, điểm' },
            { kind: 'decision', text: 'Khách VIP ?', branches: [
              { label: 'Đúng', steps: [{ kind: 'io', text: 'Nhập hạng thẻ' }, { kind: 'process', text: 'kh = new KhachHangVip(…, hangThe)' }] },
              { label: 'Sai', steps: [{ kind: 'process', text: 'kh = new KhachHang(…)' }] },
            ] },
            { kind: 'decision', text: 'ds.Them(kh) ?', branches: [
              { label: 'true', steps: [{ kind: 'io', text: 'In "Đã thêm " + kh.HoTen' }] },
              { label: 'false', steps: [{ kind: 'io', text: 'In "Trùng mã hoặc số điện thoại"' }] },
            ] },
          ],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'TaoKhach trong Main và Them trong DanhSachKhach',
          code: `// Program.cs
static KhachHang TaoKhach(bool vip, string ma, string ten, string sdt, int namSinh, int diem)
{
    if (!vip) return new KhachHang(ma, ten, sdt, namSinh, diem);

    Console.Write("Hạng thẻ (Vàng / Bạch kim): ");
    string hang = Console.ReadLine() ?? "Vàng";
    return new KhachHangVip(ma, ten, sdt, namSinh, diem, hang);
}

// DanhSachKhach.cs
private readonly List<KhachHang> danhSach = new List<KhachHang>();

public bool Them(KhachHang kh)
{
    bool trungMa = danhSach.Any(k => k.MaKH.Equals(kh.MaKH, StringComparison.OrdinalIgnoreCase));
    if (trungMa) return false;
    if (TimTheoSdt(kh.SoDienThoai) != null) return false;

    danhSach.Add(kh);
    return true;
}`,
          note: 'Kiểu trả về của TaoKhach là KhachHang dù có thể new KhachHangVip — từ đây trở đi mọi nơi chỉ thấy KhachHang.',
        },
      },
    ],
  },
  {
    label: 'Xoá theo mã',
    hint: 'bool Xoa(string maKH)',
    blocks: [
      {
        type: 'text',
        text: 'Tìm đối tượng theo mã rồi Remove. Trả về false nếu không có để Main báo "Không tìm thấy". Khách thường hay VIP xoá như nhau — không cần biết loại.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'strip',
          caption: 'Xoa("KH01") — gỡ phần tử [0], KH02 dồn lên thành [0]',
          name: 'danhSach (trước khi xoá)',
          items: ['KH01 · An ✕', 'KH02 · Bích (VIP)', 'KH03 · Cường'],
          highlight: [0],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'Xoa bằng RemoveAll',
          code: `public bool Xoa(string maKH)
{
    int soXoa = danhSach.RemoveAll(k => k.MaKH.Equals(maKH, StringComparison.OrdinalIgnoreCase));
    return soXoa > 0;
}`,
          note: 'RemoveAll trả về số phần tử đã gỡ — 0 nghĩa là không có mã đó. Đừng foreach rồi Remove bên trong: List sẽ ném InvalidOperationException.',
        },
      },
    ],
  },
  {
    label: 'Tìm khách',
    hint: 'KhachHang? TimTheoSdt(string sdt) · List<KhachHang> TimTheoTen(string tuKhoa)',
    blocks: [
      {
        type: 'text',
        text: 'Số điện thoại là duy nhất nên tìm theo SĐT trả về một khách hoặc null. Tên thì nhiều người trùng và người dùng thường gõ một phần, nên tìm theo tên trả về List và dùng Contains không phân biệt hoa thường.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'strip',
          caption: 'TimTheoTen("văn") — giữ lại mọi phần tử có tên chứa từ khoá',
          name: 'danhSach',
          items: ['KH01 · Nguyễn Văn An', 'KH02 · Trần Thị Bích', 'KH03 · Lê Văn Cường'],
          highlight: [0, 2],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'Hai hàm tìm',
          code: `public KhachHang? Tim(string maKH)
    => danhSach.FirstOrDefault(k => k.MaKH.Equals(maKH, StringComparison.OrdinalIgnoreCase));

public KhachHang? TimTheoSdt(string sdt)
    => danhSach.FirstOrDefault(k => k.SoDienThoai == sdt.Trim());

public List<KhachHang> TimTheoTen(string tuKhoa)
    => danhSach.Where(k => k.HoTen.Contains(tuKhoa, StringComparison.OrdinalIgnoreCase))
               .ToList();`,
          note: 'Kết quả List rỗng thì Main in "Không tìm thấy", không được in danh sách trống. Tim theo mã dùng cho Xoa và MuaHang.',
        },
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Contains có dấu và không dấu',
        text: 'Contains với OrdinalIgnoreCase chỉ bỏ qua hoa thường, không bỏ dấu tiếng Việt: gõ "van" sẽ không khớp "Văn". Đề bài chỉ yêu cầu không phân biệt hoa thường nên như vậy là đủ.',
      },
    ],
  },
  {
    label: 'Mua hàng & tích điểm',
    hint: 'decimal? MuaHang(string maKH, decimal tienMua)',
    blocks: [
      {
        type: 'text',
        text: 'Đây là chỗ interface và override phát huy tác dụng. MuaHang tìm khách, rồi nhìn khách qua ITichDiem để hỏi tỷ lệ giảm và cộng điểm. Khách thường hay VIP đều đi qua đúng hai câu lệnh đó — bản nào chạy do đối tượng thật quyết định.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'flow',
          caption: 'Luồng MuaHang — không có if theo loại khách',
          steps: [
            { kind: 'start', text: 'MuaHang(maKH, tienMua)' },
            { kind: 'process', text: 'kh = Tim(maKH)' },
            { kind: 'decision', text: 'kh == null ?', branches: [
              { label: 'Đúng', steps: [{ kind: 'io', text: 'return null' }] },
              { label: 'Sai', steps: [
                { kind: 'process', text: 'ITichDiem td = kh' },
                { kind: 'process', text: 'phaiTra = tienMua × (1 − td.TyLeGiamGia())  — 5% hay 10% do lớp thật' },
                { kind: 'process', text: 'td.CongDiem(tienMua)  — ×1 hay ×2 do lớp thật' },
                { kind: 'io', text: 'return phaiTra' },
              ] },
            ] },
          ],
        },
      },
      {
        type: 'visual',
        visual: {
          kind: 'compare',
          caption: 'Cùng mua 2.000.000 đ — hai kết quả khác nhau từ cùng một đoạn code MuaHang',
          columns: [
            { title: 'KH01 An — KhachHang', tone: 'plain', items: ['TyLeGiamGia() → 0,05', 'Phải trả 2.000.000 × 0,95 = 1.900.000 đ', 'CongDiem: +200 điểm', '120 → 320 điểm'] },
            { title: 'KH02 Bích — KhachHangVip', tone: 'good', items: ['TyLeGiamGia() → 0,10 (override)', 'Phải trả 2.000.000 × 0,90 = 1.800.000 đ', 'CongDiem: +200 × 2 = +400 điểm (override)', '0 → 400 điểm'] },
          ],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'MuaHang trong DanhSachKhach',
          code: `public decimal? MuaHang(string maKH, decimal tienMua)
{
    if (tienMua <= 0) throw new ArgumentException("Số tiền phải dương");

    KhachHang? kh = Tim(maKH);
    if (kh == null) return null;

    ITichDiem td = kh;                                  // nhìn khách qua interface
    decimal phaiTra = tienMua * (1 - td.TyLeGiamGia());  // KhachHang: 5%, KhachHangVip: 10%
    td.CongDiem(tienMua);                                // KhachHang: ×1, KhachHangVip: ×2
    return phaiTra;
}`,
          note: 'Dòng ITichDiem td = kh chỉ để nhấn mạnh: phần mua hàng không cần biết gì ngoài hai việc trong interface. Viết kh.TyLeGiamGia() trực tiếp cũng cho cùng kết quả.',
        },
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Bẫy: quên virtual ở KhachHang',
        text: 'Nếu TyLeGiamGia() ở KhachHang không có virtual mà KhachHangVip vẫn viết TyLeGiamGia(), C# báo cảnh báo "hides inherited member" và khi gọi qua biến KhachHang sẽ chạy bản 5% — khách VIP mất ưu đãi mà không có lỗi nào. Luôn đi cặp: virtual ở cha, override ở con.',
      },
    ],
  },
  {
    label: 'Hiển thị',
    hint: 'void HienThi()',
    blocks: [
      {
        type: 'text',
        text: 'Mỗi khách một dòng bằng MoTa(). Vì MoTa() được override ở cả KhachHang lẫn KhachHangVip, cùng một vòng foreach in ra hai kiểu dòng khác nhau: khách VIP tự có thêm " · VIP Vàng" ở cuối.',
      },
      {
        type: 'code',
        sample: {
          title: 'MoTa() gọi chuỗi ba tầng',
          code: `List<KhachHang> ds = new List<KhachHang>();
ds.Add(new KhachHang("KH01", "Nguyễn Văn An", "0901234567", 1990, 120));
ds.Add(new KhachHangVip("KH02", "Trần Thị Bích", "0912345678", 2001, 0, "Vàng"));
foreach (KhachHang kh in ds)
{
    string dong = kh.MoTa();
    Console.WriteLine(dong);
}`,
          note: 'KhachHangVip.MoTa() → base là KhachHang.MoTa() → base là Nguoi.MoTa(). Ba tầng nối nhau, mỗi tầng chỉ thêm phần của mình.',
          trace: [
            { line: 1, vars: { ds: '→ 0x100' }, refs: { ds: '0x100' }, heap: { '0x100': 'List<KhachHang> [ ]' } },
            { line: 2, vars: { ds: '→ 0x100' }, refs: { ds: '0x100' }, heap: { '0x100': '[→0x200]', '0x200': 'KhachHang { MaKH: "KH01", Diem: 120 }' } },
            { line: 3, vars: { ds: '→ 0x100' }, refs: { ds: '0x100' }, heap: { '0x100': '[→0x200, →0x210]', '0x200': 'KhachHang { MaKH: "KH01", Diem: 120 }', '0x210': 'KhachHangVip { MaKH: "KH02", Diem: 0, HangThe: "Vàng" }' }, note: 'Hai đối tượng hai lớp khác nhau cùng nằm trong List<KhachHang>.' },
            { line: 4, vars: { ds: '→ 0x100', kh: '→ 0x200' }, refs: { ds: '0x100', kh: '0x200' }, heap: { '0x100': '[→0x200, →0x210]', '0x200': 'KhachHang { MaKH: "KH01", Diem: 120 }', '0x210': 'KhachHangVip { MaKH: "KH02", Diem: 0, HangThe: "Vàng" }' }, focus: { '0x100': [0] } },
            { line: 6, vars: { ds: '→ 0x100', kh: '→ 0x200', dong: '"KH01 · Nguyễn Văn An · 36 tuổi · 0901234567 · 120 điểm"' }, refs: { ds: '0x100', kh: '0x200' }, heap: { '0x100': '[→0x200, →0x210]', '0x200': 'KhachHang { MaKH: "KH01", Diem: 120 }', '0x210': 'KhachHangVip { MaKH: "KH02", Diem: 0, HangThe: "Vàng" }' }, focus: { '0x100': [0] }, note: 'KhachHang.MoTa(): lấy base.MoTa() của Nguoi rồi thêm mã và điểm.' },
            { line: 7, vars: { ds: '→ 0x100', kh: '→ 0x200', dong: '"KH01 · Nguyễn Văn An · 36 tuổi · 0901234567 · 120 điểm"' }, refs: { ds: '0x100', kh: '0x200' }, heap: { '0x100': '[→0x200, →0x210]', '0x200': 'KhachHang { MaKH: "KH01", Diem: 120 }', '0x210': 'KhachHangVip { MaKH: "KH02", Diem: 0, HangThe: "Vàng" }' }, output: ['KH01 · Nguyễn Văn An · 36 tuổi · 0901234567 · 120 điểm'] },
            { line: 4, vars: { ds: '→ 0x100', kh: '→ 0x210' }, refs: { ds: '0x100', kh: '0x210' }, heap: { '0x100': '[→0x200, →0x210]', '0x200': 'KhachHang { MaKH: "KH01", Diem: 120 }', '0x210': 'KhachHangVip { MaKH: "KH02", Diem: 0, HangThe: "Vàng" }' }, focus: { '0x100': [1] }, output: ['KH01 · Nguyễn Văn An · 36 tuổi · 0901234567 · 120 điểm'], note: 'kh vẫn khai báo KhachHang nhưng giờ trỏ tới KhachHangVip.' },
            { line: 6, vars: { ds: '→ 0x100', kh: '→ 0x210', dong: '"KH02 · Trần Thị Bích · 25 tuổi · 0912345678 · 0 điểm · VIP Vàng"' }, refs: { ds: '0x100', kh: '0x210' }, heap: { '0x100': '[→0x200, →0x210]', '0x200': 'KhachHang { MaKH: "KH01", Diem: 120 }', '0x210': 'KhachHangVip { MaKH: "KH02", Diem: 0, HangThe: "Vàng" }' }, focus: { '0x100': [1] }, output: ['KH01 · Nguyễn Văn An · 36 tuổi · 0901234567 · 120 điểm'], note: 'KhachHangVip.MoTa() → base (KhachHang) → base (Nguoi), rồi nối " · VIP Vàng".' },
            { line: 7, vars: { ds: '→ 0x100', kh: '→ 0x210', dong: '"KH02 · Trần Thị Bích · 25 tuổi · 0912345678 · 0 điểm · VIP Vàng"' }, refs: { ds: '0x100', kh: '0x210' }, heap: { '0x100': '[→0x200, →0x210]', '0x200': 'KhachHang { MaKH: "KH01", Diem: 120 }', '0x210': 'KhachHangVip { MaKH: "KH02", Diem: 0, HangThe: "Vàng" }' }, output: ['KH01 · Nguyễn Văn An · 36 tuổi · 0901234567 · 120 điểm', 'KH02 · Trần Thị Bích · 25 tuổi · 0912345678 · 0 điểm · VIP Vàng'], note: 'Cùng câu lệnh kh.MoTa(), hai dòng khác nhau.' },
          ],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'HienThi và vòng lặp menu trong Main',
          code: `// DanhSachKhach.cs
public void HienThi()
{
    if (danhSach.Count == 0) { Console.WriteLine("Chưa có khách"); return; }
    foreach (KhachHang kh in danhSach)
        Console.WriteLine(kh.MoTa());
}

// Program.cs
DanhSachKhach ds = new DanhSachKhach();
while (true)
{
    Console.WriteLine("1 Thêm  2 Xoá  3 Tìm SĐT  4 Tìm tên  5 Mua hàng  6 Hiển thị  0 Thoát");
    string chon = Console.ReadLine() ?? "";
    if (chon == "0") break;
    try
    {
        switch (chon)
        {
            case "1": ThemKhach(ds); break;
            case "2": XoaKhach(ds); break;
            case "3": TimSdt(ds); break;
            case "4": TimTen(ds); break;
            case "5": MuaHang(ds); break;
            case "6": ds.HienThi(); break;
            default: Console.WriteLine("Chọn 0–6"); break;
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine("Lỗi: " + ex.Message);
    }
}`,
          note: 'try/catch bọc cả switch nên int.Parse sai định dạng, năm sinh vượt năm hiện tại, điểm âm, số tiền âm đều được báo một chỗ mà chương trình không dừng.',
        },
      },
    ],
  },
]

/** Hướng dẫn bài nhân viên cửa hàng — cùng dạng với bài khách hàng. */
const HUONG_DAN_NHAN_VIEN: TabItem[] = [
  {
    label: 'Sơ đồ lớp',
    hint: 'Nguoi ← NhanVien · DanhSachNhanVien',
    blocks: [
      {
        type: 'text',
        text: 'Nhân viên cũng là một người: họ tên, số điện thoại, năm sinh đặt ở Nguoi. Nếu bạn đã làm bài khách hàng thì dùng lại nguyên class Nguoi — đó chính là lợi ích của kế thừa. NhanVien thêm mã, chức vụ và lương tháng; tiền thưởng tính từ lương bằng một phương thức thường, không override.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'uml',
          caption: 'Một class Nguoi có thể làm cha cho cả KhachHang lẫn NhanVien',
          relation: 'inherit',
          parent: { name: 'Nguoi', attrs: ['+ HoTen : string', '+ SoDienThoai : string', '+ NamSinh : int'], methods: ['+ Tuoi() : int'] },
          children: [
            { name: 'NhanVien', attrs: ['+ MaNV : string', '+ ChucVu : string', '+ LuongThang : decimal'], methods: ['+ TienThuong() : decimal', '+ MoTa() : string'] },
            { name: 'KhachHang', attrs: ['+ MaKH : string', '+ DiemTichLuy : int'], methods: ['+ MoTa() : string'] },
          ],
        },
      },
      {
        type: 'visual',
        visual: {
          kind: 'uml',
          caption: 'Lớp quản lý giữ List<NhanVien>',
          children: [{ name: 'DanhSachNhanVien', attrs: ['− danhSach : List<NhanVien>'], methods: ['+ Them(NhanVien nv) : bool', '+ Xoa(string maNV) : bool', '+ Tim(string maNV) : NhanVien?', '+ TimTheoChucVu(string chucVu) : List<NhanVien>', '+ HienThi()', '+ TongLuong() : decimal'] }],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'Class NhanVien kế thừa Nguoi',
          code: `class NhanVien : Nguoi
{
    public string MaNV { get; set; }
    public string ChucVu { get; set; }

    private decimal luongThang;
    public decimal LuongThang
    {
        get => luongThang;
        set
        {
            if (value < 0) throw new ArgumentException("Lương không được âm");
            luongThang = value;
        }
    }

    public NhanVien(string maNV, string hoTen, string soDienThoai, int namSinh, string chucVu, decimal luongThang)
        : base(hoTen, soDienThoai, namSinh)
    {
        MaNV = maNV;
        ChucVu = chucVu;
        LuongThang = luongThang;
    }

    public decimal TienThuong() => LuongThang * 0.1m;     // 10% lương, giống nhau cho mọi chức vụ

    public string MoTa() => $"{MaNV} · {HoTen} · {Tuoi()} tuổi · {ChucVu} · {LuongThang:N0} đ · thưởng {TienThuong():N0} đ";
}`,
          note: 'TienThuong() giống nhau cho mọi nhân viên nên là phương thức thường. Muốn "quản lý thưởng 20%" thì làm như KhachHangVip ở bài khách hàng: thêm lớp con và override — bài này cố tình chưa tới đó.',
        },
      },
    ],
  },
  {
    label: 'Thêm nhân viên',
    hint: 'bool Them(NhanVien nv)',
    blocks: [
      {
        type: 'text',
        text: 'Chỉ một điều kiện từ chối: trùng mã. Main nhập đủ 6 giá trị, new NhanVien rồi giao cho Them. Lương âm hoặc năm sinh sai bị property chặn ngay lúc new.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'flow',
          caption: 'Luồng thêm nhân viên từ Main tới danh sách',
          steps: [
            { kind: 'start', text: 'Chọn 1 — Thêm' },
            { kind: 'io', text: 'Nhập mã, họ tên, SĐT, năm sinh, chức vụ, lương' },
            { kind: 'process', text: 'nv = new NhanVien(...)  — property kiểm tra, sai thì ném lỗi' },
            { kind: 'decision', text: 'ds.Them(nv) ?', branches: [
              { label: 'true', steps: [{ kind: 'io', text: 'In "Đã thêm " + nv.HoTen' }] },
              { label: 'false', steps: [{ kind: 'io', text: 'In "Mã nhân viên đã tồn tại"' }] },
            ] },
          ],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'Them',
          code: `public bool Them(NhanVien nv)
{
    if (Tim(nv.MaNV) != null) return false;
    danhSach.Add(nv);
    return true;
}`,
          note: 'Viết Tim trước rồi Them chỉ còn ba dòng. Cùng một khuôn với bài khách hàng.',
        },
      },
    ],
  },
  {
    label: 'Xoá theo mã',
    hint: 'bool Xoa(string maNV)',
    blocks: [
      {
        type: 'text',
        text: 'Giống bài khách hàng: tìm rồi Remove, hoặc RemoveAll một dòng. Trả về bool cho Main biết kết quả.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'strip',
          caption: 'Xoa("NV02") — gỡ phần tử [1], phần tử sau dồn lên',
          name: 'danhSach (trước khi xoá)',
          items: ['NV01 · An · Quản lý', 'NV02 · Bích · Thu ngân ✕', 'NV03 · Cường · Kho'],
          highlight: [1],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'Xoa',
          code: `public bool Xoa(string maNV)
{
    NhanVien? nv = Tim(maNV);
    if (nv == null) return false;
    danhSach.Remove(nv);
    return true;
}`,
        },
      },
    ],
  },
  {
    label: 'Tìm nhân viên',
    hint: 'NhanVien? Tim(string maNV) · List<NhanVien> TimTheoChucVu(string chucVu)',
    blocks: [
      {
        type: 'text',
        text: 'Tìm theo mã trả về một người hoặc null. Tìm theo chức vụ trả về nhiều người — so sánh cả chuỗi không phân biệt hoa thường, vì "thu ngân" và "Thu ngân" là một.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'strip',
          caption: 'TimTheoChucVu("thu ngân") — giữ lại các nhân viên cùng chức vụ',
          name: 'danhSach',
          items: ['NV01 · Quản lý', 'NV02 · Thu ngân', 'NV03 · Kho', 'NV04 · Thu ngân'],
          highlight: [1, 3],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'Tim và TimTheoChucVu',
          code: `public NhanVien? Tim(string maNV)
    => danhSach.FirstOrDefault(nv => nv.MaNV.Equals(maNV, StringComparison.OrdinalIgnoreCase));

public List<NhanVien> TimTheoChucVu(string chucVu)
    => danhSach.Where(nv => nv.ChucVu.Equals(chucVu.Trim(), StringComparison.OrdinalIgnoreCase))
               .ToList();`,
          note: 'Equals so cả chuỗi, Contains so một phần. Chức vụ là danh mục cố định nên dùng Equals; tên người thì dùng Contains như bài khách hàng.',
        },
      },
    ],
  },
  {
    label: 'Hiển thị & tổng lương',
    hint: 'void HienThi() · decimal TongLuong()',
    blocks: [
      {
        type: 'text',
        text: 'Hiển thị in MoTa() của từng người rồi in tổng lương tháng. Tổng lương là một vòng foreach cộng dồn — không có gì khác nhau giữa các nhân viên nên không cần đa hình.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'loop',
          caption: 'TongLuong() — cộng dồn qua từng phần tử',
          init: 'decimal tong = 0; lấy phần tử đầu',
          cond: 'còn phần tử ?',
          body: 'tong += nv.LuongThang',
          step: 'sang phần tử kế',
        },
      },
      {
        type: 'code',
        sample: {
          title: 'HienThi và TongLuong',
          code: `public void HienThi()
{
    if (danhSach.Count == 0) { Console.WriteLine("Chưa có nhân viên"); return; }
    foreach (NhanVien nv in danhSach)
        Console.WriteLine(nv.MoTa());
    Console.WriteLine($"Tổng lương tháng: {TongLuong():N0} đ");
}

public decimal TongLuong()
{
    decimal tong = 0;
    foreach (NhanVien nv in danhSach)
        tong += nv.LuongThang;
    return tong;
}`,
          note: 'Có thể viết TongLuong một dòng bằng LINQ: danhSach.Sum(nv => nv.LuongThang). Cả hai cách tương đương.',
        },
      },
    ],
  },
]

/** Hướng dẫn bài đơn giao hàng — bài dễ: kế thừa một tầng, override nhẹ, JSON bằng attribute có sẵn. */
const HUONG_DAN_DON_HANG: TabItem[] = [
  {
    label: 'Sơ đồ lớp',
    hint: 'DonHang ← DonGiaoNhanh · QuanLyDon',
    blocks: [
      {
        type: 'text',
        text: 'Đơn giao nhanh cũng là một đơn hàng, chỉ khác phí giao và cách mô tả. Vậy DonGiaoNhanh kế thừa DonHang, override đúng hai phương thức, còn lại dùng nguyên. QuanLyDon giữ List<DonHang> nên chứa được cả hai loại.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'uml',
          caption: 'Override nhẹ: lớp con chỉ đổi phí giao và thêm chữ vào mô tả',
          relation: 'inherit',
          parent: { name: 'DonHang', attrs: ['+ MaDon : string', '+ TenKhach : string', '+ DiaChi : string', '+ TienHang : decimal'], methods: ['+ PhiGiao() : 30.000  (virtual)', '+ TongThanhToan() : TienHang + PhiGiao()', '+ MoTa() : string  (virtual)'] },
          children: [{ name: 'DonGiaoNhanh', methods: ['+ PhiGiao() : 60.000  override', '+ MoTa() : base + " · GIAO NHANH"  override'] }],
        },
      },
      {
        type: 'visual',
        visual: {
          kind: 'uml',
          caption: 'QuanLyDon — thêm, xoá, sửa, tìm, hiển thị, lưu / đọc file',
          children: [{ name: 'QuanLyDon', attrs: ['− danhSach : List<DonHang>'], methods: ['+ Them(DonHang d) : bool', '+ Xoa(string maDon) : bool', '+ SuaDiaChi(string maDon, string diaChiMoi) : bool', '+ TimTheoKhach(string tuKhoa) : List<DonHang>', '+ HienThi()', '+ TongPhiGiao() : decimal', '+ LuuFile() / DocFile()'] }],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'Class DonHang — lớp cha',
          code: `class DonHang
{
    public string MaDon { get; set; } = "";
    public string TenKhach { get; set; } = "";
    public string DiaChi { get; set; } = "";

    private decimal tienHang;
    public decimal TienHang
    {
        get => tienHang;
        set
        {
            if (value < 0) throw new ArgumentException("Tiền hàng không được âm");
            tienHang = value;
        }
    }

    public DonHang() { }                     // constructor rỗng: cần cho JSON đọc lại
    public DonHang(string maDon, string tenKhach, string diaChi, decimal tienHang)
    {
        MaDon = maDon;
        TenKhach = tenKhach;
        DiaChi = diaChi;
        TienHang = tienHang;
    }

    public virtual decimal PhiGiao() => 30_000;
    public decimal TongThanhToan() => TienHang + PhiGiao();
    public virtual string MoTa()
        => $"{MaDon} · {TenKhach} · {DiaChi} · hàng {TienHang:N0} + phí {PhiGiao():N0} = {TongThanhToan():N0} đ";
}`,
          note: 'TongThanhToan() viết một lần ở lớp cha nhưng gọi PhiGiao() là bản của lớp thật — đơn nhanh tự ra 60.000 mà không cần viết lại TongThanhToan.',
        },
      },
      {
        type: 'code',
        sample: {
          title: 'Class DonGiaoNhanh — chỉ hai override',
          code: `class DonGiaoNhanh : DonHang
{
    public DonGiaoNhanh() { }
    public DonGiaoNhanh(string maDon, string tenKhach, string diaChi, decimal tienHang)
        : base(maDon, tenKhach, diaChi, tienHang) { }

    public override decimal PhiGiao() => 60_000;
    public override string MoTa() => base.MoTa() + " · GIAO NHANH";
}`,
          note: 'base.MoTa() lấy nguyên dòng của lớp cha rồi nối thêm — không chép lại chuỗi định dạng.',
        },
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Vì sao có constructor rỗng',
        text: 'System.Text.Json tạo đối tượng bằng constructor không tham số rồi gán từng property. Không có nó thì DocFile ném NotSupportedException. Constructor 4 tham số vẫn giữ để Main tạo đơn cho gọn.',
      },
    ],
  },
  {
    label: 'Thêm đơn',
    hint: 'bool Them(DonHang d)',
    blocks: [
      {
        type: 'text',
        text: 'Main hỏi "giao nhanh không" để new đúng lớp, rồi giao cho Them. Them chỉ kiểm tra trùng mã.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'flow',
          caption: 'Luồng thêm đơn',
          steps: [
            { kind: 'io', text: 'Nhập mã đơn, tên khách, địa chỉ, tiền hàng' },
            { kind: 'decision', text: 'Giao nhanh ?', branches: [
              { label: 'Đúng', steps: [{ kind: 'process', text: 'd = new DonGiaoNhanh(…)' }] },
              { label: 'Sai', steps: [{ kind: 'process', text: 'd = new DonHang(…)' }] },
            ] },
            { kind: 'decision', text: 'ql.Them(d) ?', branches: [
              { label: 'true', steps: [{ kind: 'io', text: 'In "Đã thêm " + d.MaDon' }] },
              { label: 'false', steps: [{ kind: 'io', text: 'In "Mã đơn đã tồn tại"' }] },
            ] },
          ],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'Them và Tim',
          code: `private List<DonHang> danhSach = new List<DonHang>();

public DonHang? Tim(string maDon)
    => danhSach.FirstOrDefault(d => d.MaDon.Equals(maDon, StringComparison.OrdinalIgnoreCase));

public bool Them(DonHang d)
{
    if (Tim(d.MaDon) != null) return false;
    danhSach.Add(d);
    return true;
}`,
        },
      },
    ],
  },
  {
    label: 'Xoá đơn',
    hint: 'bool Xoa(string maDon)',
    blocks: [
      {
        type: 'text',
        text: 'Tìm theo mã rồi Remove. Đơn thường hay đơn nhanh xoá như nhau.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'strip',
          caption: 'Xoa("DH02") — gỡ phần tử [1]',
          name: 'danhSach (trước khi xoá)',
          items: ['DH01 · An', 'DH02 · Bích (nhanh) ✕', 'DH03 · Cường'],
          highlight: [1],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'Xoa',
          code: `public bool Xoa(string maDon)
{
    DonHang? d = Tim(maDon);
    if (d == null) return false;
    danhSach.Remove(d);
    return true;
}`,
        },
      },
    ],
  },
  {
    label: 'Sửa địa chỉ',
    hint: 'bool SuaDiaChi(string maDon, string diaChiMoi)',
    blocks: [
      {
        type: 'text',
        text: 'Sửa không tạo đối tượng mới, chỉ gán lại property của đơn đã có. Địa chỉ mới rỗng thì từ chối.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'boxes',
          caption: 'SuaDiaChi("DH01", "34 Hai Bà Trưng") — chỉ một ô đổi, các ô khác giữ nguyên',
          items: [
            { label: 'MaDon', value: '"DH01"' },
            { label: 'TenKhach', value: '"Nguyễn Văn An"' },
            { label: 'DiaChi', value: '"34 Hai Bà Trưng"', note: 'trước: "12 Lê Lợi"' },
            { label: 'TienHang', value: '1.500.000' },
          ],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'SuaDiaChi',
          code: `public bool SuaDiaChi(string maDon, string diaChiMoi)
{
    if (string.IsNullOrWhiteSpace(diaChiMoi)) throw new ArgumentException("Địa chỉ không được rỗng");
    DonHang? d = Tim(maDon);
    if (d == null) return false;
    d.DiaChi = diaChiMoi.Trim();
    return true;
}`,
          note: 'Hai lý do thất bại báo hai cách: không có đơn thì return false, dữ liệu sai thì ném lỗi để Main bắt.',
        },
      },
    ],
  },
  {
    label: 'Tìm theo khách',
    hint: 'List<DonHang> TimTheoKhach(string tuKhoa)',
    blocks: [
      {
        type: 'text',
        text: 'Một khách có thể có nhiều đơn nên trả về List. Khớp một phần tên, không phân biệt hoa thường.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'strip',
          caption: 'TimTheoKhach("an") — giữ lại các đơn có tên khách chứa từ khoá',
          name: 'danhSach',
          items: ['DH01 · Nguyễn Văn An', 'DH02 · Trần Thị Bích', 'DH03 · Phạm Anh'],
          highlight: [0, 2],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'TimTheoKhach',
          code: `public List<DonHang> TimTheoKhach(string tuKhoa)
    => danhSach.Where(d => d.TenKhach.Contains(tuKhoa, StringComparison.OrdinalIgnoreCase))
               .ToList();`,
          note: 'Kết quả rỗng thì Main in "Không có đơn nào", không in danh sách trống.',
        },
      },
    ],
  },
  {
    label: 'Hiển thị & tổng phí',
    hint: 'void HienThi() · decimal TongPhiGiao()',
    blocks: [
      {
        type: 'text',
        text: 'Mỗi đơn một dòng bằng MoTa(). Đơn nhanh tự có đuôi "GIAO NHANH" và phí 60.000 nhờ override — HienThi không cần biết loại đơn. Tổng phí giao cộng PhiGiao() của từng đơn.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'compare',
          caption: 'Cùng một dòng Console.WriteLine(d.MoTa()) — hai kết quả',
          columns: [
            { title: 'DH01 — DonHang', tone: 'plain', items: ['PhiGiao() → 30.000', 'TongThanhToan() → 1.530.000', 'MoTa() không có đuôi'] },
            { title: 'DH02 — DonGiaoNhanh', tone: 'good', items: ['PhiGiao() → 60.000 (override)', 'TongThanhToan() → 2.060.000 — không viết lại', 'MoTa() + " · GIAO NHANH" (override)'] },
          ],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'HienThi và TongPhiGiao',
          code: `public void HienThi()
{
    if (danhSach.Count == 0) { Console.WriteLine("Chưa có đơn"); return; }
    foreach (DonHang d in danhSach)
        Console.WriteLine(d.MoTa());
    Console.WriteLine($"Tổng phí giao: {TongPhiGiao():N0} đ");
}

public decimal TongPhiGiao()
{
    decimal tong = 0;
    foreach (DonHang d in danhSach) tong += d.PhiGiao();
    return tong;
}`,
        },
      },
    ],
  },
  {
    label: 'Lưu / đọc JSON',
    hint: 'void LuuFile() · void DocFile()',
    blocks: [
      {
        type: 'text',
        text: 'Danh sách có hai loại đơn nên JSON phải ghi kèm loại — nếu không, đọc lại mọi đơn đều thành DonHang thường. Bài này dùng cách ngắn nhất: gắn hai attribute lên DonHang, System.Text.Json (.NET 7 trở lên) tự ghi trường "Loai" và tự new đúng lớp khi đọc.',
      },
      {
        type: 'visual',
        visual: {
          kind: 'map',
          caption: 'Một bản ghi đơn nhanh trong don-hang.json — "Loai" do thư viện tự ghi ở đầu',
          name: 'bản ghi DH02',
          pairs: [
            { key: '"Loai"', value: '"Nhanh"   ← đọc lên sẽ new DonGiaoNhanh' },
            { key: '"MaDon"', value: '"DH02"' },
            { key: '"TenKhach"', value: '"Trần Thị Bích"' },
            { key: '"DiaChi"', value: '"5 Trần Phú"' },
            { key: '"TienHang"', value: '2000000' },
          ],
        },
      },
      {
        type: 'code',
        sample: {
          title: 'Hai attribute trên DonHang, rồi LuuFile / DocFile',
          code: `using System.Text.Json;
using System.Text.Json.Serialization;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "Loai")]
[JsonDerivedType(typeof(DonHang), "Thuong")]
[JsonDerivedType(typeof(DonGiaoNhanh), "Nhanh")]
class DonHang { /* như tab Sơ đồ lớp */ }

// QuanLyDon.cs
public void LuuFile(string duongDan = "don-hang.json")
{
    var options = new JsonSerializerOptions { WriteIndented = true };
    File.WriteAllText(duongDan, JsonSerializer.Serialize(danhSach, options));
}

public void DocFile(string duongDan = "don-hang.json")
{
    if (!File.Exists(duongDan)) return;                       // lần chạy đầu chưa có file
    string json = File.ReadAllText(duongDan);
    danhSach = JsonSerializer.Deserialize<List<DonHang>>(json) ?? new List<DonHang>();
}`,
          note: 'Serialize nhận List<DonHang> nhưng nhờ attribute, phần tử nào là DonGiaoNhanh được ghi "Loai": "Nhanh" và đọc lại đúng lớp. PhiGiao() sau khi đọc vẫn ra 60.000.',
        },
      },
      {
        type: 'visual',
        visual: {
          kind: 'timeline',
          caption: 'Vòng đời dữ liệu trong một phiên chạy',
          items: [
            { label: 'Khởi động', text: 'ql.DocFile() — có file thì nạp, không có thì danh sách trống' },
            { label: 'Làm việc', text: 'Thêm / xoá / sửa / tìm trên List trong bộ nhớ' },
            { label: 'Thoát', text: 'ql.LuuFile() — ghi đè toàn bộ danh sách ra don-hang.json' },
          ],
        },
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Hai lỗi hay gặp',
        text: 'NotSupportedException khi đọc: thiếu constructor rỗng ở DonHang hoặc DonGiaoNhanh. JsonException "metadata property must be first": trường "Loai" không đứng đầu bản ghi — xảy ra khi sửa file bằng tay; file do chương trình ghi thì luôn đúng.',
      },
    ],
  },
]

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
          text: 'Chỉ hỏi "nhóm hàng là gì" ở ranh giới với bên ngoài: lúc tạo đối tượng từ dữ liệu nhập (TaoSanPham trong Main), lúc đổ ra file (LuuFile) và lúc đọc file (DocFile). Bên trong CuaHang, mọi chỗ khác chỉ làm việc với kiểu SanPham. Hướng dẫn chi tiết từng chức năng nằm ngay dưới mỗi bài ở tab Bài tập.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b16-c001', level: 'Cơ bản', title: 'Quản lý đơn giao hàng', dense: true,
      guide: HUONG_DAN_DON_HANG,
      demo: 'don-hang',
      requirement: 'Cửa hàng điện máy giao hàng tận nơi. Mỗi đơn có mã đơn, tên khách, địa chỉ, tiền hàng; phí giao mặc định 30.000 đ. Đơn giao nhanh là một đơn hàng có phí giao 60.000 đ và dòng mô tả có thêm chữ "GIAO NHANH". Tổng thanh toán = tiền hàng + phí giao. Xây dựng chương trình console với các chức năng sau:',
      tasks: [
        'Thêm đơn thường hoặc đơn giao nhanh, từ chối nếu trùng mã',
        'Xoá đơn theo mã',
        'Sửa địa chỉ giao theo mã đơn',
        'Tìm đơn theo từ khoá trong tên khách, không phân biệt hoa thường',
        'Hiển thị danh sách kèm phí giao, tổng thanh toán từng đơn và tổng phí giao của cửa hàng',
        'Lưu danh sách ra file JSON khi thoát và tự đọc lại khi khởi động — đơn nhanh đọc lên vẫn là đơn nhanh',
      ],
      signature: 'class DonHang { MaDon, TenKhach, DiaChi, TienHang; virtual decimal PhiGiao(); decimal TongThanhToan(); virtual string MoTa(); }\nclass DonGiaoNhanh : DonHang { override PhiGiao(); override MoTa(); }\nclass QuanLyDon { Them, Xoa, SuaDiaChi, TimTheoKhach, HienThi, TongPhiGiao, LuuFile, DocFile }',
      constraints: [
        'DonGiaoNhanh chỉ override PhiGiao() và MoTa(), không khai báo lại thuộc tính · TongThanhToan() chỉ viết ở lớp cha',
        'Tiền hàng âm bị từ chối trong property · Mỗi class có constructor rỗng để JSON đọc lại',
        'Dùng [JsonPolymorphic] + [JsonDerivedType] của System.Text.Json để file ghi kèm loại đơn · Main chỉ nhập xuất, lỗi nhập liệu phải được bắt',
      ],
      examples: [
        { input: 'Thêm DH01 "Nguyễn Văn An" "12 Lê Lợi" 1.500.000 (thường); DH02 "Trần Thị Bích" "5 Trần Phú" 2.000.000 (nhanh); hiển thị', output: 'DH01 · Nguyễn Văn An · 12 Lê Lợi · hàng 1.500.000 + phí 30.000 = 1.530.000 đ\nDH02 · Trần Thị Bích · 5 Trần Phú · hàng 2.000.000 + phí 60.000 = 2.060.000 đ · GIAO NHANH\nTổng phí giao: 90.000 đ', explain: 'Cùng gọi MoTa() và TongThanhToan(), đơn nhanh ra phí 60.000 nhờ override PhiGiao().' },
        { input: 'Sửa địa chỉ DH01 thành "34 Hai Bà Trưng"; tìm khách "an"; xoá DH03', output: 'Đã sửa địa chỉ\nDH01 · Nguyễn Văn An · 34 Hai Bà Trưng · …\nKhông tìm thấy đơn', explain: 'Tìm khớp một phần tên; DH03 không có nên xoá thất bại.' },
        { input: 'Thoát; mở lại chương trình; hiển thị', output: 'DH01 · … · phí 30.000 …\nDH02 · … · phí 60.000 … · GIAO NHANH', explain: 'File JSON có trường "Loai": "Nhanh" nên DH02 được dựng lại đúng lớp DonGiaoNhanh.' },
      ],
      hint: 'Cần 3 class. DonHang: 4 property MaDon, TenKhach, DiaChi, TienHang (set kiểm tra ≥ 0), constructor rỗng + constructor 4 tham số, virtual PhiGiao() = 30.000, TongThanhToan() = TienHang + PhiGiao(), virtual MoTa(). DonGiaoNhanh : DonHang: constructor rỗng + constructor gọi base(...), override PhiGiao() = 60.000, override MoTa() = base.MoTa() + " · GIAO NHANH". QuanLyDon: field private List<DonHang>; Tim(ma), Them(d) → bool, Xoa(ma) → bool, SuaDiaChi(ma, diaChi) → bool, TimTheoKhach(tuKhoa) → List<DonHang>, HienThi(), TongPhiGiao() → decimal, LuuFile() = JsonSerializer.Serialize(danhSach), DocFile() = Deserialize<List<DonHang>>. Gắn [JsonPolymorphic(TypeDiscriminatorPropertyName = "Loai")], [JsonDerivedType(typeof(DonHang), "Thuong")], [JsonDerivedType(typeof(DonGiaoNhanh), "Nhanh")] lên DonHang.',
      visual: {
        kind: 'uml',
        caption: 'Kế thừa một tầng, override nhẹ hai phương thức; TongThanhToan() dùng chung',
        relation: 'inherit',
        parent: { name: 'DonHang', attrs: ['+ MaDon, TenKhach, DiaChi', '+ TienHang : decimal'], methods: ['+ PhiGiao() : 30.000  virtual', '+ TongThanhToan()', '+ MoTa()  virtual'] },
        children: [{ name: 'DonGiaoNhanh', methods: ['+ PhiGiao() : 60.000  override', '+ MoTa() + " · GIAO NHANH"  override'] }],
      },
    },
    {
      id: 'b16-m001', level: 'Trung bình', title: 'Quản lý khách hàng thân thiết', dense: true,
      guide: HUONG_DAN_KHACH_HANG,
      demo: 'khach-hang',
      requirement: 'Cửa hàng điện máy lưu khách hàng thân thiết. Mỗi khách là một người (họ tên, số điện thoại, năm sinh) và có thêm mã khách, điểm tích luỹ. Khách thường được giảm 5% và tích 1 điểm cho mỗi 10.000 đ mua hàng; khách VIP có thêm hạng thẻ, được giảm 10% và tích điểm gấp đôi. Xây dựng chương trình console với các chức năng sau:',
      tasks: [
        'Thêm khách thường hoặc VIP, từ chối nếu trùng mã hoặc trùng số điện thoại',
        'Xoá khách theo mã',
        'Tìm theo số điện thoại hoặc từ khoá trong họ tên, không phân biệt hoa thường',
        'Mua hàng: nhập mã và số tiền, in số tiền phải trả sau giảm và cộng điểm theo loại khách',
        'Hiển thị danh sách, dòng của khách VIP có thêm hạng thẻ',
      ],
      signature: 'interface ITichDiem { decimal TyLeGiamGia(); void CongDiem(decimal tienMua); }\nclass Nguoi { HoTen, SoDienThoai, NamSinh; int Tuoi(); virtual string MoTa(); }\nclass KhachHang : Nguoi, ITichDiem { MaKH, DiemTichLuy; virtual TyLeGiamGia, CongDiem; override MoTa }\nclass KhachHangVip : KhachHang { HangThe; override TyLeGiamGia, CongDiem, MoTa }   class DanhSachKhach { Them, Xoa, TimTheoSdt, TimTheoTen, MuaHang, HienThi }',
      constraints: [
        'Kế thừa hai tầng Nguoi ← KhachHang ← KhachHangVip; KhachHang cài ITichDiem; KhachHangVip chỉ được override, không khai báo lại thuộc tính của cha',
        'MuaHang không dùng if / is theo loại khách — chỉ gọi TyLeGiamGia() và CongDiem() qua kiểu KhachHang hoặc ITichDiem',
        'Năm sinh sau năm hiện tại, điểm âm, số tiền mua ≤ 0 bị từ chối · Không lưu file · Main chỉ nhập xuất và gọi DanhSachKhach, lỗi nhập liệu phải được bắt',
      ],
      examples: [
        { input: 'Thêm KH01 "Nguyễn Văn An" 0901234567 1990 điểm 120 (thường); KH02 "Trần Thị Bích" 0912345678 2001 điểm 0 VIP hạng Vàng; hiển thị', output: 'KH01 · Nguyễn Văn An · 36 tuổi · 0901234567 · 120 điểm\nKH02 · Trần Thị Bích · 25 tuổi · 0912345678 · 0 điểm · VIP Vàng', explain: 'Cùng gọi MoTa() nhưng dòng VIP có thêm hạng thẻ nhờ override.' },
        { input: 'KH01 mua 2.000.000; KH02 mua 2.000.000; hiển thị', output: 'KH01 trả 1.900.000 đ, +200 điểm\nKH02 trả 1.800.000 đ, +400 điểm\nKH01 · … · 320 điểm\nKH02 · … · 400 điểm · VIP Vàng', explain: 'Thường: giảm 5%, 1 điểm / 10.000 đ. VIP: giảm 10%, điểm nhân đôi.' },
        { input: 'Thêm KH03 "Lê Văn Cường" 0901234567 1985; tìm tên "văn"; xoá KH01; mua hàng KH01 500.000', output: 'Từ chối: trùng số điện thoại (KH01)\nKH01 · Nguyễn Văn An · 36 tuổi …\nĐã xoá KH01\nKhông tìm thấy khách', explain: 'Tìm tên khớp một phần, không phân biệt hoa thường; sau khi xoá, mua hàng theo mã đó bị từ chối.' },
      ],
      hint: 'Cần 1 interface và 4 class. ITichDiem: TyLeGiamGia() → decimal, CongDiem(decimal). Nguoi: HoTen, SoDienThoai, NamSinh (set kiểm tra ≤ năm hiện tại), constructor 3 tham số, Tuoi(), virtual MoTa(). KhachHang : Nguoi, ITichDiem: MaKH, DiemTichLuy (≥ 0), constructor 5 tham số gọi base(...), virtual TyLeGiamGia() = 0,05m, virtual CongDiem() cộng tienMua / 10.000, override MoTa() = MaKH + base.MoTa() + điểm. KhachHangVip : KhachHang: HangThe, constructor 6 tham số gọi base(...), override TyLeGiamGia() = 0,10m, override CongDiem() nhân đôi, override MoTa() = base.MoTa() + " · VIP " + HangThe. DanhSachKhach: field private List<KhachHang>; Them(kh) → bool, Xoa(maKH) → bool, Tim(maKH) → KhachHang?, TimTheoSdt(sdt) → KhachHang?, TimTheoTen(tuKhoa) → List<KhachHang>, MuaHang(maKH, tienMua) → decimal? (phải trả; gọi TyLeGiamGia rồi CongDiem), HienThi().',
      visual: {
        kind: 'uml',
        caption: 'KhachHang kế thừa Nguoi và cài ITichDiem; KhachHangVip kế thừa KhachHang, override ba phương thức',
        relation: 'inherit',
        parent: { name: 'KhachHang : Nguoi, ITichDiem', attrs: ['+ MaKH, DiemTichLuy', '(từ Nguoi: HoTen, SoDienThoai, NamSinh)'], methods: ['+ TyLeGiamGia() : 0,05  virtual', '+ CongDiem(tienMua)  virtual', '+ MoTa()  override'] },
        children: [{ name: 'KhachHangVip', attrs: ['+ HangThe : string'], methods: ['+ TyLeGiamGia() : 0,10  override', '+ CongDiem(): × 2  override', '+ MoTa() + " · VIP hạng"  override'] }],
      },
    },
    {
      id: 'b16-m002', level: 'Trung bình', title: 'Quản lý nhân viên cửa hàng', dense: true,
      guide: HUONG_DAN_NHAN_VIEN,
      requirement: 'Cửa hàng điện máy cần quản lý nhân viên. Mỗi nhân viên là một người (họ tên, số điện thoại, năm sinh) và có thêm mã nhân viên, chức vụ, lương tháng; tiền thưởng bằng 10% lương, giống nhau cho mọi người. Xây dựng chương trình console với các chức năng sau (dùng lại class Nguoi của bài khách hàng nếu đã có):',
      tasks: [
        'Thêm nhân viên, từ chối nếu trùng mã',
        'Xoá theo mã',
        'Tìm theo mã hoặc theo chức vụ, không phân biệt hoa thường',
        'Hiển thị danh sách gồm mã, họ tên, tuổi, chức vụ, lương, thưởng và tổng lương tháng của cửa hàng',
      ],
      signature: 'class Nguoi { HoTen, SoDienThoai, NamSinh; int Tuoi(); }\nclass NhanVien : Nguoi { MaNV, ChucVu, LuongThang; decimal TienThuong(); string MoTa(); }\nclass DanhSachNhanVien { Them, Xoa, Tim, TimTheoChucVu, HienThi, TongLuong }',
      constraints: [
        'Không override, không virtual, không abstract — TienThuong() là phương thức thường vì mọi chức vụ tính như nhau',
        'Constructor của NhanVien gọi base(hoTen, soDienThoai, namSinh) · Lương âm và năm sinh sau năm hiện tại bị từ chối trong property',
        'Không lưu file · Main chỉ nhập xuất và gọi DanhSachNhanVien; lỗi nhập liệu phải được bắt',
      ],
      examples: [
        { input: 'Thêm NV01 "Phạm Văn An" 0901111222 1988 "Quản lý" 15.000.000; NV02 "Lê Thị Bích" 0903333444 2000 "Thu ngân" 8.000.000; hiển thị', output: 'NV01 · Phạm Văn An · 38 tuổi · Quản lý · 15.000.000 đ · thưởng 1.500.000 đ\nNV02 · Lê Thị Bích · 26 tuổi · Thu ngân · 8.000.000 đ · thưởng 800.000 đ\nTổng lương tháng: 23.000.000 đ', explain: 'Thưởng = 10% lương. Tổng lương chỉ cộng lương, không cộng thưởng.' },
        { input: 'Thêm NV01 "Trần Văn Cường" 0905555666 1995 "Kho" 7.000.000', output: 'Từ chối: mã NV01 đã tồn tại' },
        { input: 'Tìm chức vụ "thu ngân"; xoá NV02; tìm mã NV02', output: 'NV02 · Lê Thị Bích · 26 tuổi · Thu ngân · 8.000.000 đ · thưởng 800.000 đ\nĐã xoá NV02\nKhông tìm thấy', explain: 'Chức vụ so cả chuỗi không phân biệt hoa thường.' },
      ],
      hint: 'Cần 3 class. Nguoi giữ nguyên như bài khách hàng. NhanVien : Nguoi: thêm MaNV, ChucVu, LuongThang (set kiểm tra ≥ 0), constructor 6 tham số gọi base(...), TienThuong() = LuongThang × 0,1, MoTa(). DanhSachNhanVien: field private List<NhanVien>; Them(nv) → bool, Xoa(maNV) → bool, Tim(maNV) → NhanVien?, TimTheoChucVu(chucVu) → List<NhanVien>, HienThi(), TongLuong() → decimal.',
      visual: {
        kind: 'uml',
        caption: 'Cùng một class Nguoi làm cha cho NhanVien — kế thừa để dùng lại, không có override',
        relation: 'inherit',
        parent: { name: 'Nguoi', attrs: ['+ HoTen : string', '+ SoDienThoai : string', '+ NamSinh : int'], methods: ['+ Tuoi() : int'] },
        children: [{ name: 'NhanVien', attrs: ['+ MaNV : string', '+ ChucVu : string', '+ LuongThang : decimal'], methods: ['+ TienThuong() : decimal', '+ MoTa() : string'] }],
      },
    },
    {
      id: 'b16-h001', level: 'Nâng cao', title: 'Chương trình quản lý sản phẩm cửa hàng điện máy', dense: true,
      guide: HUONG_DAN_DIEN_MAY,
      requirement: 'Xây dựng chương trình console quản lý sản phẩm cửa hàng điện máy với các chức năng sau:',
      tasks: [
        'Thêm sản phẩm thuộc ba nhóm điện tử, điện lạnh, gia dụng, mỗi nhóm có một thông số riêng',
        'Tính giá bán từ giá nhập theo quy tắc riêng của nhóm bằng đa hình',
        'Tìm theo mã hoặc từ khoá trong tên, không phân biệt hoa thường',
        'Cập nhật giá nhập và số lượng theo mã',
        'Bán hàng: kiểm tra tồn, trừ kho, in tiền',
        'Xoá theo mã',
        'Hiển thị danh sách kèm giá bán, bảo hành và tổng giá trị tồn kho',
        'Lưu ra file JSON và tự đọc lại khi khởi động',
      ],
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
