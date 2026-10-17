import type { Buoi } from './types'

const buoi39: Buoi = {
  id: 39,
  slug: 'ef-core-truy-van-va-api-crud',
  title: 'Truy vấn với EF Core & xây API CRUD hoàn chỉnh',
  subtitle: 'LINQ-to-Entities, raw SQL, gọi Stored Procedure, change tracking và một API sản phẩm đủ thêm, sửa, xoá, phân trang nối với giao diện Blazor',
  duration: '3 giờ',
  keywords: ['LINQ-to-Entities', 'Include', 'AsNoTracking', 'FromSqlRaw', 'SqlParameter', 'SaveChangesAsync', 'CreatedAtAction'],
  goals: [
    'Inject DbContext vào controller và truy vấn bằng LINQ: lọc, chiếu, nạp quan hệ, phân trang',
    'Chạy raw SQL và gọi Stored Procedure có tham số input/output bằng SqlParameter',
    'Hiểu change tracking để thêm, sửa, xoá đúng cách với SaveChangesAsync',
    'Xây API CRUD trả đúng mã trạng thái (200, 201, 204, 404) và gọi được từ Blazor',
  ],

  sections: [
    {
      id: 'hai-cach',
      title: '1. Hai cách truy vấn và inject DbContext',
      blocks: [
        {
          type: 'text',
          text: 'Với EF Core có hai cách làm việc với database. Cách 1: Raw SQL — viết câu SQL trực tiếp, EF chỉ chạy và map kết quả. Cách 2: LINQ-to-Entities — viết truy vấn bằng LINQ trên DbSet, EF dịch sang SQL. Thực tế dùng LINQ cho 90% việc, raw SQL và Stored Procedure cho phần còn lại.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Cùng một việc, hai cách viết',
            columns: [
              { title: 'Raw SQL', tone: 'plain', items: ['dbContext.Database.ExecuteSqlRaw("UPDATE Users SET Age = 30 WHERE Id = 1")', 'Toàn quyền câu SQL, dùng được SP, hàm riêng của SQL Server', 'Sai tên cột chỉ biết lúc chạy'] },
              { title: 'LINQ-to-Entities', tone: 'good', items: ['dbContext.Users.Where(u => u.Id == 1).FirstOrDefault()', 'Kiểm tra kiểu lúc biên dịch, IntelliSense', 'Đổi database (SQL Server → PostgreSQL) không phải viết lại'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Inject DbContext qua constructor',
            code: `[Route("api/[controller]")]
[ApiController]
public class DemoController : ControllerBase
{
    private readonly EbayContext _context;

    public DemoController(EbayContext db)   // DI cấp context theo request
    {
        _context = db;
    }

    [HttpGet("GetAllLinQ")]
    public async Task<ActionResult> GetAllLinQ()
    {
        List<User> users = await _context.Users.ToListAsync();
        return Ok(users);
    }

    [HttpGet("GetAllFromSQLRaw")]
    public async Task<ActionResult> GetAllFromSQLRaw()
    {
        List<User> users = await _context.Users.FromSqlRaw("SELECT * FROM Users").ToListAsync();
        return Ok(users);
    }
}`,
            note: 'Không tự new EbayContext() trong controller. Để DI cấp: context được tạo đầu request và dispose cuối request, kết nối trả về connection pool.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Một request GET đi qua EF Core',
            actors: ['Trình duyệt / Blazor', 'SanPhamController', 'CuaHangContext', 'SQL Server'],
            steps: [
              { from: 0, to: 1, text: 'GET /api/sanpham?trang=1' },
              { from: 1, to: 2, text: '_context.SanPhams.Where(...).Skip().Take()' },
              { from: 2, to: 2, text: 'Dịch cây biểu thức LINQ → T-SQL' },
              { from: 2, to: 3, text: 'SELECT ... OFFSET @p0 ROWS FETCH NEXT @p1 ROWS ONLY' },
              { from: 3, to: 2, text: 'Các dòng dữ liệu', dashed: true },
              { from: 2, to: 1, text: 'List<SanPham>', dashed: true },
              { from: 1, to: 0, text: '200 OK + JSON', dashed: true },
            ],
          },
        },
      ],
    },
    {
      id: 'linq',
      title: '2. LINQ-to-Entities',
      blocks: [
        {
          type: 'text',
          text: 'Truy vấn LINQ trên DbSet là IQueryable: nó chỉ là bản mô tả, chưa chạy. SQL thực sự được gửi đi khi gọi ToListAsync, FirstOrDefaultAsync, CountAsync, AnyAsync hoặc duyệt foreach. Nhờ vậy ta có thể nối thêm điều kiện từng bước rồi mới chạy một lần.',
        },
        {
          type: 'code',
          sample: {
            title: 'Lọc, tìm một, nạp quan hệ',
            code: `// Lọc + sắp xếp
var tivis = await _context.SanPhams
    .Where(s => s.Nhom == "Tivi" && s.Gia <= 20000000)
    .OrderBy(s => s.Gia)
    .ToListAsync();

// Tìm một: không có thì null
SanPham? sp = await _context.SanPhams.FirstOrDefaultAsync(s => s.Id == id);
SanPham? sp2 = await _context.SanPhams.FindAsync(id);   // theo khoá chính, xem cache trước

// Nạp quan hệ: đơn hàng kèm khách và chi tiết + sản phẩm
var don = await _context.DonHangs
    .Include(d => d.KhachHang)
    .Include(d => d.ChiTiets).ThenInclude(c => c.SanPham)
    .FirstOrDefaultAsync(d => d.Id == maDon);

// Đếm, kiểm tra tồn tại — chạy COUNT / EXISTS trên server
int soSapHet = await _context.SanPhams.CountAsync(s => s.TonKho < 5);
bool daCoEmail = await _context.KhachHangs.AnyAsync(k => k.Email == email);`,
            note: 'Thiếu Include thì don.KhachHang là null (khi không bật lazy loading). FindAsync trả ngay object đang được theo dõi trong context mà không hỏi database nếu đã có.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Select projection, AsNoTracking, phân trang',
            code: `public record SanPhamDto(int Id, string Ten, decimal Gia, string TenNhom);

int trang = 2, kichThuoc = 10;
IQueryable<SanPham> q = _context.SanPhams.AsNoTracking();

if (!string.IsNullOrWhiteSpace(tuKhoa))
    q = q.Where(s => s.Ten.Contains(tuKhoa));      // → LIKE N'%' + @tuKhoa + N'%'

int tong = await q.CountAsync();
List<SanPhamDto> ds = await q
    .OrderBy(s => s.Id)                              // phân trang PHẢI có OrderBy
    .Skip((trang - 1) * kichThuoc)
    .Take(kichThuoc)
    .Select(s => new SanPhamDto(s.Id, s.Ten, s.Gia, s.DanhMuc.Ten))
    .ToListAsync();`,
            note: 'Select chỉ lấy đúng 4 cột và tự JOIN DanhMuc mà không cần Include. AsNoTracking bỏ qua change tracking — nhanh hơn và tốn ít bộ nhớ hơn cho truy vấn chỉ đọc.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'IQueryable được dựng dần và chạy một lần',
            steps: [
              { kind: 'start', text: 'q = _context.SanPhams.AsNoTracking()' },
              { kind: 'decision', text: 'Có từ khoá?', branches: [
                { label: 'Có', steps: [{ kind: 'process', text: 'q = q.Where(Ten.Contains(tuKhoa))' }] },
                { label: 'Không', steps: [{ kind: 'note', text: 'giữ nguyên q' }] },
              ] },
              { kind: 'process', text: 'OrderBy → Skip → Take → Select (vẫn chưa chạy)' },
              { kind: 'process', text: 'ToListAsync(): EF dịch toàn bộ thành MỘT câu SQL' },
              { kind: 'end', text: 'List<SanPhamDto>' },
            ],
          },
        },
        {
          type: 'table',
          head: ['LINQ', 'SQL sinh ra', 'Ghi chú'],
          rows: [
            ['Where(s => s.Gia > x)', 'WHERE Gia > @x', 'Tham số hoá tự động'],
            ['Contains(tuKhoa)', 'LIKE N\'%...%\'', 'Có escape ký tự đặc biệt'],
            ['OrderBy / ThenByDescending', 'ORDER BY ..., ... DESC', ''],
            ['Skip(n).Take(m)', 'OFFSET n ROWS FETCH NEXT m ROWS ONLY', 'Cần OrderBy trước'],
            ['Include(d => d.KhachHang)', 'LEFT/INNER JOIN KhachHang', 'Lấy mọi cột của bảng nối'],
            ['GroupBy + Sum', 'GROUP BY ... SUM(...)', 'Chỉ khi Select ra key và aggregate'],
            ['FirstOrDefaultAsync', 'SELECT TOP(1)', ''],
            ['AnyAsync', 'EXISTS (...)', 'Nhanh hơn CountAsync() > 0'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'ToList quá sớm là kéo cả bảng về RAM',
          text: '_context.SanPhams.ToList().Where(s => s.Gia > 1000000) tải TẤT CẢ sản phẩm về rồi mới lọc trong C#. Đặt Where trước ToList để lọc trên SQL Server. Bật LogTo(Console.WriteLine) để xem câu SQL thật.',
        },
      ],
    },
    {
      id: 'raw-sql-sp',
      title: '3. Raw SQL và gọi Stored Procedure',
      blocks: [
        {
          type: 'table',
          head: ['Phương thức', 'Trả về', 'Dùng khi'],
          rows: [
            ['DbSet.FromSqlRaw / FromSql', 'IQueryable<Entity>', 'SELECT trả về đúng các cột của entity'],
            ['Database.SqlQuery<T>', 'IQueryable<T> (kiểu bất kỳ)', 'Kết quả không phải entity, ví dụ DTO thống kê'],
            ['Database.ExecuteSqlRaw / ExecuteSql', 'int số dòng ảnh hưởng', 'UPDATE, DELETE, EXEC SP không trả bảng'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'Gọi SelectDynamicData_JSON (buổi 37) — hai cách truyền tham số',
            code: `// Cách 1: placeholder {0} {1} — EF tự biến thành tham số
[HttpGet("GetAllFromStoreRaw")]
public async Task<ActionResult> GetAllFromStoreRaw()
{
    var result = await _context.Set<User>()
        .FromSqlRaw("EXEC SelectDynamicData_JSON {0}, {1}, {2}, {3}", "Users", "*", null, null)
        .ToListAsync();
    return Ok(result);
}

// Cách 2: SqlParameter đặt tên, chỉ rõ kiểu, truyền NULL bằng DBNull.Value
[HttpGet("GetAllFromStoreRaw2")]
public async Task<ActionResult> GetAllFromStoreRaw2()
{
    var result = await _context.Set<User>()
        .FromSqlRaw("EXEC SelectDynamicData_JSON @TableName, @Columns, @WhereCondition, @OrderBy",
            new SqlParameter("@TableName", "Users"),
            new SqlParameter("@Columns", "*"),
            new SqlParameter("@WhereCondition", SqlDbType.NVarChar) { Value = DBNull.Value },
            new SqlParameter("@OrderBy", SqlDbType.NVarChar) { Value = DBNull.Value })
        .ToListAsync();
    return Ok(result);
}`,
            note: 'Kết quả SP phải có đủ các cột của entity User với đúng tên. Gọi SP thì không nối thêm Where/OrderBy LINQ phía sau được (EF không bọc EXEC vào subquery) — lọc ngay trong tham số SP. EF Core chỉ đọc tập kết quả ĐẦU TIÊN nếu SP có nhiều SELECT.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Tham số OUTPUT và ExecuteSqlRaw',
            code: `using Microsoft.Data.SqlClient;
using System.Data;

var maKh = new SqlParameter("@MaKhachHang", 1);
var soDon = new SqlParameter("@SoDon", SqlDbType.Int) { Direction = ParameterDirection.Output };
var tongTien = new SqlParameter("@TongTien", SqlDbType.Decimal)
{
    Direction = ParameterDirection.Output, Precision = 18, Scale = 2
};

await _context.Database.ExecuteSqlRawAsync(
    "EXEC sp_ThongKeDonHang @MaKhachHang, @SoDon OUTPUT, @TongTien OUTPUT",
    maKh, soDon, tongTien);

return Ok(new { soDon = (int)soDon.Value, tongTien = (decimal)tongTien.Value });`,
            note: 'Phải viết OUTPUT cả trong chuỗi EXEC lẫn Direction = Output, thiếu một trong hai thì Value vẫn là DBNull. Decimal output cần Precision/Scale khớp khai báo SP, nếu không bị làm tròn.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Raw SQL an toàn và không an toàn',
            columns: [
              { title: 'Nguy hiểm', tone: 'bad', items: ['FromSqlRaw("... WHERE Ten = \'" + ten + "\'")', 'FromSqlRaw($"... WHERE Ten = \'{ten}\'")', 'Chuỗi người dùng nhập thành lệnh SQL'] },
              { title: 'An toàn', tone: 'good', items: ['FromSqlRaw("... WHERE Ten = {0}", ten)', 'FromSql($"... WHERE Ten = {ten}") — FormattableString', 'new SqlParameter("@Ten", ten)'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'FromSql và FromSqlRaw',
          text: 'FromSql (EF Core 7+) nhận chuỗi nội suy $"..." và tự biến mỗi {bien} thành tham số — an toàn. FromSqlRaw với chuỗi $"..." thì ghép thẳng giá trị — không an toàn. Hai tên gần giống nhau, đọc kỹ trước khi dùng.',
        },
      ],
    },
    {
      id: 'crud',
      title: '4. Change tracking và API CRUD hoàn chỉnh',
      blocks: [
        {
          type: 'text',
          text: 'DbContext theo dõi trạng thái mọi entity nó nạp hoặc được giao: Added, Modified, Deleted, Unchanged. SaveChangesAsync so trạng thái, sinh các câu INSERT/UPDATE/DELETE tương ứng và chạy chúng trong MỘT transaction.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'map',
            caption: 'Trạng thái entity → câu SQL khi SaveChangesAsync',
            name: 'EntityState',
            pairs: [
              { key: 'Added (Add)', value: 'INSERT, sau đó gán Id vừa sinh vào object' },
              { key: 'Modified (sửa property / Update)', value: 'UPDATE các cột đã đổi' },
              { key: 'Deleted (Remove)', value: 'DELETE' },
              { key: 'Unchanged', value: 'không làm gì' },
              { key: 'Detached (AsNoTracking)', value: 'context không biết tới, không lưu' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'SanPhamController — đọc và thêm',
            code: `[Route("api/[controller]")]
[ApiController]
public class SanPhamController(CuaHangContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<SanPhamDto>>> GetAll(int trang = 1, int kichThuoc = 10)
    {
        var ds = await context.SanPhams.AsNoTracking()
            .OrderBy(s => s.Id).Skip((trang - 1) * kichThuoc).Take(kichThuoc)
            .Select(s => new SanPhamDto(s.Id, s.Ten, s.Gia, s.TonKho))
            .ToListAsync();
        return Ok(ds);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<SanPhamDto>> GetById(int id)
    {
        var sp = await context.SanPhams.FindAsync(id);
        if (sp is null) return NotFound(new { message = $"Không có sản phẩm {id}" });
        return Ok(new SanPhamDto(sp.Id, sp.Ten, sp.Gia, sp.TonKho));
    }

    [HttpPost]
    public async Task<ActionResult<SanPhamDto>> Create(SanPhamTaoDto dto)
    {
        var sp = new SanPham { Ten = dto.Ten, Gia = dto.Gia, TonKho = dto.TonKho };
        context.SanPhams.Add(sp);                 // trạng thái Added
        await context.SaveChangesAsync();         // INSERT, sp.Id được gán
        return CreatedAtAction(nameof(GetById), new { id = sp.Id },
            new SanPhamDto(sp.Id, sp.Ten, sp.Gia, sp.TonKho));
    }`,
            note: 'CreatedAtAction trả 201 Created kèm header Location: /api/SanPham/15 trỏ tới action GetById. Nhận DTO chứ không nhận entity để client không tự gửi Id hay các cột không được phép sửa.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'SanPhamController — sửa và xoá',
            code: `    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, SanPhamTaoDto dto)
    {
        var sp = await context.SanPhams.FindAsync(id);   // nạp → Unchanged
        if (sp is null) return NotFound();

        sp.Ten = dto.Ten;                                // → Modified
        sp.Gia = dto.Gia;
        sp.TonKho = dto.TonKho;
        await context.SaveChangesAsync();                // UPDATE cột đã đổi
        return NoContent();                              // 204
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var sp = await context.SanPhams.FindAsync(id);
        if (sp is null) return NotFound();

        context.SanPhams.Remove(sp);                     // → Deleted
        await context.SaveChangesAsync();
        return NoContent();
    }
}

public record SanPhamDto(int Id, string Ten, decimal Gia, int TonKho);
public record SanPhamTaoDto(string Ten, decimal Gia, int TonKho);`,
            note: 'Không cần gọi context.Update(sp): sp đã được theo dõi nên chỉ việc gán property. Update() đánh dấu MỌI cột là đã đổi và sinh UPDATE toàn bộ cột. EF Core 7+ có ExecuteDeleteAsync / ExecuteUpdateAsync chạy thẳng một câu SQL không cần nạp trước.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'PUT /api/sanpham/{id}',
            steps: [
              { kind: 'io', text: 'PUT /api/sanpham/7 + JSON { ten, gia, tonKho }' },
              { kind: 'process', text: '[ApiController] kiểm tra model, sai → 400 tự động' },
              { kind: 'process', text: 'FindAsync(7)' },
              {
                kind: 'decision', text: 'sp == null ?', branches: [
                  { label: 'Có', steps: [{ kind: 'end', text: '404 Not Found' }] },
                  { label: 'Không', steps: [{ kind: 'process', text: 'Gán property → Modified' }, { kind: 'process', text: 'SaveChangesAsync → UPDATE' }, { kind: 'end', text: '204 No Content' }] },
                ],
              },
            ],
          },
        },
        {
          type: 'table',
          head: ['Endpoint', 'Thành công', 'Lỗi thường gặp'],
          rows: [
            ['GET /api/sanpham', '200 + mảng', ''],
            ['GET /api/sanpham/{id}', '200 + object', '404 không tồn tại'],
            ['POST /api/sanpham', '201 + Location + object', '400 dữ liệu sai'],
            ['PUT /api/sanpham/{id}', '204', '400, 404'],
            ['DELETE /api/sanpham/{id}', '204', '404; 409 nếu còn đơn tham chiếu'],
          ],
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Blazor gọi API (nối buổi 27)',
            code: `@page "/san-pham"
@inject HttpClient Http

@if (ds is null) { <p>Đang tải…</p> }
else
{
    <table class="table">
        @foreach (var sp in ds)
        {
            <tr>
                <td>@sp.Ten</td><td>@sp.Gia.ToString("N0") đ</td>
                <td><button class="btn btn-sm btn-danger" @onclick="() => XoaAsync(sp.Id)">Xoá</button></td>
            </tr>
        }
    </table>
}

@code {
    List<SanPhamDto>? ds;

    protected override async Task OnInitializedAsync() =>
        ds = await Http.GetFromJsonAsync<List<SanPhamDto>>("api/sanpham?trang=1");

    async Task XoaAsync(int id)
    {
        var res = await Http.DeleteAsync($"api/sanpham/{id}");
        if (res.IsSuccessStatusCode) ds!.RemoveAll(x => x.Id == id);
    }
}`,
            note: 'Blazor không chạm DbContext; nó chỉ gọi API qua HttpClient. Xoá thành công thì bỏ khỏi danh sách đang hiển thị, khỏi tải lại cả trang.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Quên await SaveChangesAsync',
          text: 'Gọi Add, Remove hay gán property mà không SaveChangesAsync thì không có gì xuống database, API vẫn trả 201/204 như thể thành công. Kiểm tra lại bằng một GET sau mỗi thao tác ghi.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b39-1', level: 'Cơ bản', title: 'API đọc sản phẩm',
      requirement: 'Cho bảng SanPham đã có trong CuaHangContext. Xây dựng hai endpoint GET danh sách và GET theo id, trả DTO, xử lý không tìm thấy bằng 404.',
      signature: 'GET /api/sanpham · GET /api/sanpham/{id:int}',
      examples: [
        { input: 'GET /api/sanpham/1', output: '200 { "id": 1, "ten": "Tivi Sony 55 inch", "gia": 15000000, "tonKho": 10 }' },
        { input: 'GET /api/sanpham/999', output: '404 { "message": "Không có sản phẩm 999" }' },
      ],
    },
    {
      id: 'b39-2', level: 'Cơ bản', title: 'Ba cách lấy danh sách user',
      requirement: 'Theo slide trang 128, xây dựng DemoController có bốn endpoint lấy danh sách Users: LINQ, FromSqlRaw, gọi SP SelectDynamicData_JSON bằng placeholder và bằng SqlParameter. Bật LogTo để so sánh câu SQL mỗi cách gửi đi.',
      signature: 'GetAllLinQ · GetAllFromSQLRaw · GetAllFromStoreRaw · GetAllFromStoreRaw2',
      examples: [
        { input: 'GET /api/demo/GetAllLinQ', output: 'SELECT [u].[Id], [u].[Username], ... FROM [Users] AS [u]' },
        { input: 'GET /api/demo/GetAllFromStoreRaw', output: 'EXEC SelectDynamicData_JSON @p0, @p1, @p2, @p3', explain: '{0}..{3} được EF đổi thành tham số @p0..@p3, không ghép chuỗi.' },
      ],
    },
    {
      id: 'b39-3', level: 'Trung bình', title: 'API CRUD sản phẩm đầy đủ',
      requirement: 'Theo bài thực hành trang 126, xây dựng SanPhamController với đủ năm chức năng, trả đúng mã trạng thái, dữ liệu vào ra đều là DTO.',
      tasks: [
        'GET /api/sanpham?trang=&kichThuoc=&tuKhoa= — phân trang, tìm theo tên, trả kèm tổng số',
        'GET /api/sanpham/{id} — 404 nếu không có',
        'POST /api/sanpham — 201 CreatedAtAction',
        'PUT /api/sanpham/{id} — 204, 404',
        'DELETE /api/sanpham/{id} — 204, 404',
      ],
      signature: 'public async Task<ActionResult<KetQuaTrang<SanPhamDto>>> GetAll(int trang = 1, int kichThuoc = 10, string? tuKhoa = null)',
      constraints: ['kichThuoc tối đa 50', 'Ten bắt buộc 3–200 ký tự, Gia > 0, TonKho >= 0 ([Required], [Range])', 'Truy vấn đọc dùng AsNoTracking'],
      examples: [
        { input: 'POST { "ten": "Máy giặt Toshiba", "gia": 7500000, "tonKho": 8 }', output: '201, Location: /api/SanPham/11' },
        { input: 'GET /api/sanpham?trang=2&kichThuoc=4&tuKhoa=tivi', output: '{ "tong": 6, "trang": 2, "items": [2 sản phẩm] }', explain: '6 tivi, trang 2 cỡ 4 bỏ 4 cái đầu còn 2.' },
        { input: 'PUT /api/sanpham/5 với gia = -1', output: '400 ValidationProblem', explain: '[ApiController] tự trả 400 khi DTO vi phạm [Range] trước khi vào action.' },
      ],
      visual: {
        kind: 'seq',
        caption: 'POST tạo sản phẩm',
        actors: ['Client', 'SanPhamController', 'CuaHangContext', 'SQL Server'],
        steps: [
          { from: 0, to: 1, text: 'POST /api/sanpham { ten, gia, tonKho }' },
          { from: 1, to: 2, text: 'SanPhams.Add(sp) → Added' },
          { from: 1, to: 2, text: 'SaveChangesAsync()' },
          { from: 2, to: 3, text: 'INSERT ...; SELECT SCOPE_IDENTITY()' },
          { from: 3, to: 2, text: 'Id = 11', dashed: true },
          { from: 1, to: 0, text: '201 Created, Location: /api/SanPham/11', dashed: true },
        ],
      },
    },
    {
      id: 'b39-4', level: 'Trung bình', title: 'Đơn hàng kèm chi tiết',
      requirement: 'Cho các bảng KhachHang, DonHang, ChiTietDonHang, SanPham. Xây dựng API GET /api/donhang/{id} trả đơn kèm tên khách, danh sách dòng (tên sản phẩm, số lượng, đơn giá, thành tiền) và tổng tiền, chỉ bằng MỘT câu SQL.',
      signature: 'GET /api/donhang/{id:int} → DonHangChiTietDto',
      constraints: ['Dùng Select projection, không Include', 'Không bật lazy loading'],
      examples: [
        { input: 'GET /api/donhang/1', output: '{ "ma": 1, "khachHang": "Nguyễn Văn A", "dong": [ { "sanPham": "Laptop Dell XPS 15", "soLuong": 1, "thanhTien": 35000000 }, ... ], "tongTien": 64000000 }' },
        { input: 'Trả thẳng entity DonHang có Include KhachHang và KhachHang.DonHangs', output: 'Lỗi "A possible object cycle was detected"', explain: 'DonHang → KhachHang → DonHangs → DonHang... vòng lặp khi serialize JSON.' },
      ],
      hint: 'Select(d => new DonHangChiTietDto { ..., Dong = d.ChiTiets.Select(c => new DongDto { SanPham = c.SanPham.Ten, ... }).ToList() }) — EF dịch thành JOIN.',
    },
    {
      id: 'b39-5', level: 'Trung bình', title: 'Thống kê qua Stored Procedure',
      requirement: 'Cho SP sp_ThongKeDonHang(@MaKhachHang, @SoDon OUTPUT, @TongTien OUTPUT) và sp_TimSanPham(@TuKhoa, @GiaMax, @SapXep) ở buổi 37. Xây dựng hai endpoint gọi chúng từ EF Core bằng SqlParameter.',
      tasks: [
        'GET /api/khachhang/{id}/thong-ke gọi sp_ThongKeDonHang, đọc hai tham số OUTPUT',
        'GET /api/sanpham/tim?tuKhoa=&giaMax= gọi sp_TimSanPham bằng FromSqlRaw, tham số NULL truyền DBNull.Value',
      ],
      signature: 'ExecuteSqlRawAsync(sql, params SqlParameter[]) · FromSqlRaw(sql, params object[])',
      examples: [
        { input: 'GET /api/khachhang/1/thong-ke', output: '{ "soDon": 1, "tongTien": 63000000 }' },
        { input: 'GET /api/sanpham/tim?tuKhoa=x\';DROP TABLE SanPham;--', output: '200 [] và bảng vẫn còn', explain: 'Giá trị đi qua SqlParameter nên chỉ là dữ liệu.' },
      ],
    },
    {
      id: 'b39-6', level: 'Nâng cao', title: 'Giao diện Blazor quản lý sản phẩm',
      requirement: 'Dùng API ở bài 3, xây dựng giao diện Blazor quản lý sản phẩm theo màn hình mẫu trang 126 và 129. Blazor chỉ gọi API qua HttpClient, không dùng DbContext.',
      tasks: [
        'Trang /san-pham: bảng có phân trang, ô tìm kiếm, trạng thái giữ trên query string',
        'Trang /san-pham/them và /san-pham/{id}/sua dùng chung một form EditForm có validation',
        'Nút Xoá hỏi xác nhận, xoá xong cập nhật bảng không tải lại trang',
        'Hiện thông báo lỗi khi API trả 400 (lỗi từng ô) và 404',
      ],
      signature: 'SanPhamApiClient: GetTrangAsync, GetAsync, TaoAsync, SuaAsync, XoaAsync',
      constraints: ['Gom mọi lời gọi HttpClient vào một service SanPhamApiClient', 'Bật CORS ở API nếu Blazor chạy cổng khác'],
      examples: [
        { input: 'Sửa giá thành -5 rồi Lưu', output: 'Thông báo đỏ dưới ô Giá, không gọi API', explain: 'DataAnnotationsValidator chặn ở client trước.' },
        { input: 'Mở /san-pham/999/sua', output: 'Thông báo "Không tìm thấy sản phẩm" và link về danh sách', explain: 'GetAsync nhận 404 thì trả null, trang hiển thị nhánh không tìm thấy.' },
      ],
      visual: {
        kind: 'tree',
        caption: 'Cấu trúc giải pháp',
        root: {
          label: 'CuaHang.sln',
          children: [
            { label: 'CuaHang.Api', children: [{ label: 'Controllers/SanPhamController.cs' }, { label: 'Data/CuaHangContext.cs' }, { label: 'Dtos/SanPhamDto.cs' }] },
            { label: 'CuaHang.Web (Blazor)', highlight: true, children: [
              { label: 'Services/SanPhamApiClient.cs', note: 'HttpClient' },
              { label: 'Pages/SanPham/DanhSach.razor' },
              { label: 'Pages/SanPham/FormSanPham.razor', note: 'thêm + sửa' },
            ] },
          ],
        },
      },
      dense: true,
    },
    {
      id: 'b39-7', level: 'Nâng cao', title: 'Dựng API từ database có sẵn',
      requirement: 'Theo trang 129, kết nối Azure Data Studio tới server database lớp học (thông tin giảng viên cung cấp), đọc cấu trúc bảng, scaffold model và dựng API + giao diện Blazor cho màn hình được giao.',
      tasks: [
        'Đọc sơ đồ bảng, liệt kê bảng, khoá chính, khoá ngoại liên quan tới màn hình',
        'dotnet ef dbcontext scaffold chỉ các bảng cần (-t), chuỗi kết nối để trong User Secrets',
        'API GET danh sách có lọc + phân trang, GET chi tiết kèm dữ liệu bảng liên quan',
        'Trang Blazor hiển thị đúng bố cục màn hình mẫu',
      ],
      signature: 'dotnet user-secrets set "ConnectionStrings:DefaultConnection" "..."',
      constraints: ['Không commit mật khẩu database lên git', 'Mọi truy vấn đọc dùng AsNoTracking và Select DTO'],
      examples: [
        { input: 'git grep Password', output: 'Không có kết quả trong repo' },
        { input: 'Bảng có 50.000 dòng, gọi API không truyền trang', output: 'Trả trang 1 cỡ mặc định 10', explain: 'Không bao giờ trả toàn bộ bảng.' },
      ],
    },
    {
      id: 'b39-8', level: 'Nâng cao', title: 'Đặt hàng trong một transaction',
      requirement: 'Xây dựng POST /api/donhang nhận mã khách và danh sách { maSanPham, soLuong }. Kiểm tra tồn kho, tạo DonHang và các ChiTietDonHang, trừ TonKho, tính TongTien theo giá hiện tại — tất cả lưu bằng một lần SaveChangesAsync.',
      signature: 'POST /api/donhang { maKhachHang, items: [ { maSanPham, soLuong } ] } → 201 DonHangDto',
      constraints: ['Khách không tồn tại → 404', 'Sản phẩm không tồn tại hoặc thiếu hàng → 400 kèm danh sách sản phẩm lỗi, không ghi gì', 'Một lần SaveChangesAsync (tự là một transaction)'],
      examples: [
        { input: '{ "maKhachHang": 1, "items": [ { "maSanPham": 1, "soLuong": 2 } ] } (tồn 10)', output: '201, TongTien = 2 × Gia, TonKho còn 8' },
        { input: '{ "maKhachHang": 1, "items": [ { "maSanPham": 1, "soLuong": 1 }, { "maSanPham": 2, "soLuong": 99 } ] }', output: '400 { "loi": [ "Tủ lạnh LG 300L chỉ còn 5" ] }, TonKho SP1 không đổi', explain: 'Kiểm tra tất cả trước khi thay đổi; dù có thay đổi trong bộ nhớ, không SaveChanges thì không có gì xuống DB.' },
      ],
      hint: 'Nạp một lần các sản phẩm cần: Where(s => maSps.Contains(s.Id)).ToDictionaryAsync(s => s.Id). Thêm cột RowVersion ([Timestamp]) để chặn hai người cùng mua món cuối cùng.',
      visual: {
        kind: 'flow',
        caption: 'Đặt hàng',
        steps: [
          { kind: 'io', text: 'POST /api/donhang' },
          { kind: 'decision', text: 'Khách tồn tại?', branches: [{ label: 'Không', steps: [{ kind: 'end', text: '404' }] }, { label: 'Có', steps: [{ kind: 'process', text: 'Nạp các SanPham trong items' }] }] },
          { kind: 'decision', text: 'Đủ sản phẩm và tồn kho?', branches: [{ label: 'Không', steps: [{ kind: 'end', text: '400 + danh sách lỗi' }] }, { label: 'Có', steps: [{ kind: 'process', text: 'Add DonHang + ChiTiets, trừ TonKho' }] }] },
          { kind: 'process', text: 'SaveChangesAsync (INSERT + UPDATE trong 1 transaction)' },
          { kind: 'end', text: '201 CreatedAtAction' },
        ],
      },
    },
  ],
}

export default buoi39
