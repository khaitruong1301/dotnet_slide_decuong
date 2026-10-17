import type { Buoi } from './types'

const buoi41: Buoi = {
  id: 41,
  slug: 'action-filters-va-caching',
  title: 'Action Filters & Caching',
  subtitle: 'Gom logic dùng chung vào filter, và cache dữ liệu bằng IMemoryCache, Output Cache, Redis',
  duration: '3 giờ',
  keywords: ['IActionFilter', 'ServiceFilter', 'IExceptionFilter', 'IMemoryCache', 'OutputCache', 'IDistributedCache', 'Redis'],
  goals: [
    'Phân biệt 5 loại filter và thứ tự chạy của chúng',
    'Viết filter có DI (ServiceFilter) và filter dạng attribute, đăng ký cho action, controller hoặc toàn cục',
    'Cache dữ liệu bằng IMemoryCache theo mẫu cache-aside, chọn hạn absolute/sliding',
    'Dùng Output Cache cho API GET và Redis làm cache phân tán',
  ],

  sections: [
    {
      id: 'loai-filter',
      title: '1. Năm loại filter và thứ tự chạy',
      blocks: [
        {
          type: 'text',
          text: 'Middleware chạy với mọi request; filter chỉ chạy quanh action MVC và biết được action nào, tham số gì, kết quả ra sao. Filter dùng để gom logic lặp lại: ghi log, kiểm tra quyền, kiểm tra dữ liệu vào, bắt lỗi, sửa kết quả.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Thứ tự filter quanh một action',
            steps: [
              { kind: 'start', text: 'Request đã qua middleware, routing chọn action' },
              { kind: 'process', text: 'Authorization Filter — có quyền không? Không thì dừng' },
              { kind: 'process', text: 'Resource Filter — OnResourceExecuting (cache, log)' },
              { kind: 'process', text: 'Model Binding' },
              { kind: 'process', text: 'Action Filter — OnActionExecuting' },
              { kind: 'decision', text: 'Action ném ngoại lệ?', branches: [
                { label: 'Có', steps: [{ kind: 'process', text: 'Exception Filter — OnException trả lỗi chuẩn' }] },
                { label: 'Không', steps: [{ kind: 'process', text: 'Action Filter — OnActionExecuted' }] },
              ] },
              { kind: 'process', text: 'Result Filter — OnResultExecuting → ghi response → OnResultExecuted' },
              { kind: 'process', text: 'Resource Filter — OnResourceExecuted' },
              { kind: 'end', text: 'Response về middleware' },
            ],
          },
        },
        {
          type: 'table',
          head: ['Loại', 'Interface', 'Chạy lúc', 'Dùng cho'],
          rows: [
            ['Authorization', 'IAuthorizationFilter', 'Đầu tiên', '[Authorize], kiểm tra API key'],
            ['Resource', 'IResourceFilter', 'Trước/sau toàn bộ phần còn lại', 'Cache, ghi log ra file'],
            ['Action', 'IActionFilter', 'Trước/sau action', 'Kiểm tra tham số, đo thời gian'],
            ['Exception', 'IExceptionFilter', 'Khi action ném lỗi', 'Trả JSON lỗi chuẩn'],
            ['Result', 'IResultFilter', 'Trước/sau khi ghi kết quả', 'Thêm header, bọc dữ liệu'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'Filters/LogFileResourceFilter.cs — ghi log ra file',
            code: `public class LogFileResourceFilter : IResourceFilter
{
    private readonly string duongDanLog =
        Path.Combine(Directory.GetCurrentDirectory(), "Logs", "request.log");

    public void OnResourceExecuting(ResourceExecutingContext context)
    {
        Directory.CreateDirectory(Path.GetDirectoryName(duongDanLog)!);
        var req = context.HttpContext.Request;
        File.AppendAllText(duongDanLog,
            $"[{DateTime.Now:HH:mm:ss}] BẮT ĐẦU {req.Method} {req.Path}{req.QueryString}\\n");
    }

    public void OnResourceExecuted(ResourceExecutedContext context)
    {
        File.AppendAllText(duongDanLog,
            $"[{DateTime.Now:HH:mm:ss}] KẾT THÚC {context.HttpContext.Response.StatusCode}\\n");
    }
}`,
            note: 'File.AppendAllText tự tạo file nếu chưa có nhưng không tạo thư mục — phải CreateDirectory trước. Nhiều request đồng thời ghi cùng file có thể đụng nhau; thực tế dùng ILogger/Serilog.',
          },
        },
      ],
    },
    {
      id: 'action-filter',
      title: '2. Action filter có DI và không DI',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'Filter có DI — cần ServiceFilter',
            code: `public class KiemTraSanPhamFilter(AppDbContext db) : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (context.ActionArguments.TryGetValue("id", out var giaTri) && giaTri is int id)
        {
            if (!db.SanPhams.Any(s => s.Id == id))
                context.Result = new NotFoundObjectResult(new { message = $"Không có sản phẩm {id}" });
        }
    }

    public void OnActionExecuted(ActionExecutedContext context) { }
}

// Program.cs
builder.Services.AddScoped<KiemTraSanPhamFilter>();

// Controller
[ServiceFilter(typeof(KiemTraSanPhamFilter))]
[HttpGet("{id:int}")]
public IActionResult GetById(int id) => Ok(db.SanPhams.Find(id));`,
            note: 'Gán context.Result trong OnActionExecuting là "ngắt mạch": action không chạy nữa, kết quả đó trả luôn về client.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Đăng ký toàn cục cho mọi action',
            code: `builder.Services.AddScoped<LogFileResourceFilter>();
builder.Services.AddControllers(options =>
{
    options.Filters.Add<LogFileResourceFilter>();          // toàn app
    options.Filters.Add(new ProducesAttribute("application/json"));
});`,
            note: 'Ba phạm vi: toàn cục (options.Filters), controller (đặt trên class), action (đặt trên method). Cùng loại filter thì toàn cục chạy ngoài cùng, rồi controller, rồi action.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Filter không DI — kế thừa ActionFilterAttribute',
            code: `public class BlockIPAttribute(params string[] danhSachIp) : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        string ip = context.HttpContext.Connection.RemoteIpAddress?.ToString() ?? "";
        if (danhSachIp.Contains(ip))
        {
            context.Result = new ObjectResult(new { message = "IP bị chặn" }) { StatusCode = 403 };
        }
    }
}

// Dùng trực tiếp như attribute, không cần đăng ký DI
[BlockIP("192.168.1.50", "10.0.0.9")]
[HttpPost]
public IActionResult TaoDonHang(DonHang don) => Ok();`,
            note: 'Attribute chỉ nhận hằng số qua constructor nên không inject được DbContext. Cần service thì quay về ServiceFilter hoặc TypeFilter.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Chọn cách viết filter',
            columns: [
              { title: 'IActionFilter + ServiceFilter', tone: 'plain', items: ['Inject được DbContext, ILogger', 'Phải AddScoped vào DI', '[ServiceFilter(typeof(X))]'] },
              { title: 'ActionFilterAttribute', tone: 'plain', items: ['Không có DI', 'Tham số là hằng số', '[TenFilter(...)] dùng ngay'] },
            ],
          },
        },
        {
          type: 'table',
          head: ['Thuộc tính', 'Ý nghĩa', 'Ví dụ'],
          rows: [
            ['Request.Method', 'GET, POST, PUT, DELETE', 'Chỉ log khi khác GET'],
            ['Request.Path / QueryString', 'Đường dẫn và ?a=1', '/api/san-pham?trang=2'],
            ['Request.Headers', 'Header client gửi', 'Headers["User-Agent"]'],
            ['Request.Body', 'Luồng body (đọc một lần)', 'EnableBuffering() để đọc lại'],
            ['Response.StatusCode', 'Mã trạng thái', '200, 404, 500'],
            ['Response.Headers', 'Header trả về', 'Headers["X-Phien-Ban"] = "1.0"'],
            ['Response.ContentType', 'Kiểu nội dung', 'application/json'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'IExceptionFilter và IResultFilter',
            code: `public class LoiChuanFilter(ILogger<LoiChuanFilter> logger) : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        logger.LogError(context.Exception, "Lỗi tại {Path}", context.HttpContext.Request.Path);
        context.Result = new ObjectResult(new { message = context.Exception.Message }) { StatusCode = 500 };
        context.ExceptionHandled = true;     // báo đã xử lý, không ném tiếp
    }
}

public class PhienBanResultFilter : IResultFilter
{
    public void OnResultExecuting(ResultExecutingContext context) =>
        context.HttpContext.Response.Headers["X-Phien-Ban"] = "2026.10";

    public void OnResultExecuted(ResultExecutedContext context) { }
}`,
            note: 'Exception filter chỉ bắt lỗi trong action và filter MVC, không bắt lỗi ở middleware hay khi ghi response. Lưới an toàn cuối cùng vẫn là UseExceptionHandler.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Sửa header ở OnResultExecuted là muộn',
          text: 'Lúc OnResultExecuted chạy, response đã bắt đầu gửi về client; thêm header lúc này ném "Headers are read-only". Thêm header phải ở OnResultExecuting.',
        },
      ],
    },
    {
      id: 'memory-cache',
      title: '3. In-memory cache với IMemoryCache',
      blocks: [
        {
          type: 'text',
          text: 'API lấy 5000 sản phẩm mà mỗi client gọi lại truy vấn DB một lần thì DB quá tải. Cache lưu kết quả lần đầu vào RAM, các lần sau đọc thẳng từ RAM. Mẫu phổ biến nhất là cache-aside: tìm trong cache trước, không có mới hỏi DB rồi cất vào cache.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Cache-aside cho GET /api/san-pham',
            steps: [
              { kind: 'start', text: 'Request lấy danh sách sản phẩm' },
              { kind: 'decision', text: 'cache.TryGetValue("ds_san_pham")?', branches: [
                { label: 'Có (cache hit)', steps: [{ kind: 'io', text: 'Trả dữ liệu từ RAM — vài micro giây' }] },
                { label: 'Không (cache miss)', steps: [
                  { kind: 'process', text: 'Truy vấn DB: SELECT 5000 sản phẩm' },
                  { kind: 'process', text: 'cache.Set(key, ds, options)' },
                  { kind: 'io', text: 'Trả dữ liệu' },
                ] },
              ] },
              { kind: 'end', text: 'Khi thêm/sửa/xoá sản phẩm → cache.Remove(key)' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Controllers/SanPhamController.cs',
            code: `// Program.cs: builder.Services.AddMemoryCache();

[ApiController, Route("api/san-pham")]
public class SanPhamController(AppDbContext db, IMemoryCache cache) : ControllerBase
{
    const string KhoaDs = "ds_san_pham";

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        if (!cache.TryGetValue(KhoaDs, out List<SanPham>? ds))
        {
            ds = await db.SanPhams.AsNoTracking().ToListAsync();
            var tuyChon = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(10))
                .SetSlidingExpiration(TimeSpan.FromMinutes(2))
                .RegisterPostEvictionCallback((key, value, reason, state) =>
                    Console.WriteLine($"Cache {key} bị xoá, lý do: {reason}"));
            cache.Set(KhoaDs, ds, tuyChon);
        }
        return Ok(ds);
    }

    [HttpPost]
    public async Task<IActionResult> Them(SanPham sp)
    {
        db.SanPhams.Add(sp);
        await db.SaveChangesAsync();
        cache.Remove(KhoaDs);              // dữ liệu đổi → bỏ cache cũ
        return CreatedAtAction(nameof(GetAll), sp);
    }
}`,
            note: 'Quên cache.Remove khi ghi là lỗi kinh điển: thêm sản phẩm xong, danh sách vẫn hiện bản cũ tới 10 phút.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Hai kiểu hết hạn',
            columns: [
              { title: 'Absolute 10 phút', tone: 'plain', items: ['Đúng 10 phút sau khi Set là xoá', 'Có truy cập hay không cũng xoá', 'Đảm bảo dữ liệu không cũ quá 10 phút'] },
              { title: 'Sliding 2 phút', tone: 'plain', items: ['2 phút không ai đọc thì xoá', 'Mỗi lần đọc gia hạn thêm 2 phút', 'Dữ liệu hot có thể sống mãi'] },
              { title: 'Kết hợp cả hai', tone: 'good', items: ['Sliding dọn dữ liệu nguội', 'Absolute chặn trần thời gian sống', 'Cấu hình khuyên dùng'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'GetOrCreateAsync gọn hơn',
          text: 'var ds = await cache.GetOrCreateAsync(KhoaDs, async entry => { entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10); return await db.SanPhams.ToListAsync(); }); — gộp TryGetValue và Set trong một lệnh.',
        },
      ],
    },
    {
      id: 'output-cache',
      title: '4. Output Cache (.NET 8)',
      blocks: [
        {
          type: 'text',
          text: 'IMemoryCache cache dữ liệu, còn Output Cache cache nguyên response HTTP ngay tại middleware: request trùng khoá không vào tới action. Hợp với API GET ít thay đổi như danh mục, bảng giá.',
        },
        {
          type: 'code',
          sample: {
            title: 'Cấu hình và dùng [OutputCache]',
            code: `builder.Services.AddOutputCache();
var app = builder.Build();
app.UseOutputCache();          // sau UseCors, UseAuthentication

[HttpGet]
[OutputCache(Duration = 30)]                                  // 30 giây, mọi client chung
public IActionResult DanhMuc() => Ok(db.DanhMucs.ToList());

[HttpGet("{id:int}")]
[OutputCache(Duration = 60, VaryByRouteValueNames = new[] { "id" })]
public IActionResult ChiTiet(int id) => Ok(db.SanPhams.Find(id));

[HttpGet("tim")]
[OutputCache(Duration = 60, VaryByQueryKeys = new[] { "q", "trang" })]
public IActionResult Tim(string q, int trang = 1) => Ok(/* ... */);

[Authorize, HttpGet("cua-toi")]
[OutputCache(Duration = 30, VaryByHeaderNames = new[] { "Authorization" })]
public IActionResult DonCuaToi() => Ok(/* ... */);`,
            note: 'Mặc định Output Cache bỏ qua request có header Authorization và chỉ cache GET/HEAD trả 200. Muốn cache theo từng token phải VaryByHeaderNames "Authorization" và tự viết policy cho phép.',
          },
        },
        {
          type: 'table',
          head: ['Thuộc tính', 'Khoá cache khác nhau theo', 'Ví dụ URL'],
          rows: [
            ['Duration', 'Chỉ thời gian sống (giây)', '/api/danh-muc'],
            ['VaryByRouteValueNames', 'Giá trị route', '/api/san-pham/5 và /6 là hai bản'],
            ['VaryByQueryKeys', 'Tham số query', '?q=tivi&trang=2'],
            ['VaryByHeaderNames', 'Header', 'Authorization, Accept-Language'],
            ['PolicyName', 'Policy đặt tên trong AddOutputCache', 'Tái sử dụng cấu hình'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Cache nhầm dữ liệu riêng tư',
          text: 'Cache API "đơn hàng của tôi" mà quên Vary theo token thì khách B nhận đơn hàng của khách A. Dữ liệu theo người dùng hoặc không cache, hoặc phải có khoá theo user.',
        },
      ],
    },
    {
      id: 'redis',
      title: '5. Redis — cache phân tán',
      blocks: [
        {
          type: 'text',
          text: 'IMemoryCache nằm trong RAM của từng tiến trình: chạy 3 server sau load balancer thì có 3 bản cache lệch nhau, khởi động lại là mất. Redis là CSDL key-value trên RAM chạy riêng, mọi server dùng chung, có thể ghi xuống đĩa.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Ba server API dùng chung một Redis',
            root: {
              label: 'Load balancer',
              children: [
                { label: 'API server 1', children: [{ label: 'Redis :6379', note: 'dien-may:ds_san_pham', highlight: true }] },
                { label: 'API server 2', note: 'đọc cùng khoá' },
                { label: 'API server 3', note: 'đọc cùng khoá' },
                { label: 'SQL Server', note: 'chỉ hỏi khi cache miss' },
              ],
            },
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Chạy Redis bằng Docker và cài gói',
            code: `docker run -d --name redis -p 6379:6379 redis
# có mật khẩu
docker run -d --name redis-server -p 6379:6379 redis redis-server --requirepass matkhau123

dotnet add package Microsoft.Extensions.Caching.StackExchangeRedis
docker exec -it redis redis-cli`,
            note: 'Redis mặc định có 16 database đánh số 0–15; chọn bằng lệnh SELECT 1 hoặc defaultDatabase trong chuỗi kết nối.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'IDistributedCache với Redis',
            code: `builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = "localhost:6379,password=matkhau123";
    options.InstanceName = "dien-may:";
});

public class SanPhamService(AppDbContext db, IDistributedCache cache)
{
    public async Task<List<SanPham>> LayDanhSachAsync()
    {
        string? json = await cache.GetStringAsync("ds_san_pham");
        if (json is not null)
            return JsonSerializer.Deserialize<List<SanPham>>(json)!;

        var ds = await db.SanPhams.AsNoTracking().ToListAsync();
        await cache.SetStringAsync("ds_san_pham", JsonSerializer.Serialize(ds),
            new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10),
                SlidingExpiration = TimeSpan.FromMinutes(2)
            });
        return ds;
    }

    public Task XoaCacheAsync() => cache.RemoveAsync("ds_san_pham");
}`,
            note: 'IDistributedCache chỉ lưu string/byte[], nên object phải serialize thành JSON. Khoá thật trong Redis là "dien-may:ds_san_pham" (có InstanceName phía trước). Entity có quan hệ vòng (SanPham ↔ DanhMuc) làm Serialize lỗi vòng lặp — dùng DTO.',
          },
        },
        {
          type: 'table',
          head: ['Kiểu', 'Lệnh redis-cli', 'Hợp với'],
          rows: [
            ['String', 'SET k v · GET k · EXPIRE k 60 · TTL k · INCR k · DEL k', 'JSON danh sách, bộ đếm lượt xem'],
            ['Hash', 'HSET sp:5 ten "Tivi" · HGET sp:5 ten · HGETALL sp:5 · HDEL', 'Một object nhiều trường'],
            ['List', 'LPUSH/RPUSH k v · LRANGE k 0 -1 · LPOP · LLEN', 'Hàng đợi, 10 sản phẩm vừa xem'],
            ['Chung', 'KEYS * · SCAN 0 · TYPE k', 'Xem khoá đang có'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Redis tắt rồi bật lại, dữ liệu còn không? Còn — nhờ hai cơ chế',
            columns: [
              { title: 'RDB (snapshot)', tone: 'plain', items: ['Chụp toàn bộ dữ liệu theo chu kỳ vào dump.rdb', 'Khởi động nạp lại file', 'Nhanh, file gọn', 'Có thể mất dữ liệu từ lần chụp cuối'] },
              { title: 'AOF (ghi log lệnh)', tone: 'plain', items: ['Ghi mọi lệnh SET, DEL, HSET vào file .aof', 'Khởi động chạy lại các lệnh', 'appendfsync everysec / always / no', 'An toàn hơn, chậm hơn chút'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'KEYS * trên production',
          text: 'KEYS * duyệt toàn bộ khoá và khoá Redis đến khi xong — vài triệu khoá là treo vài giây. Trên server thật dùng SCAN 0 MATCH dien-may:* COUNT 100 để duyệt từng đợt.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b41-1', level: 'Cơ bản', title: 'Filter đo thời gian action',
      requirement: 'Cho SanPhamController. Xây dựng DoThoiGianAttribute kế thừa ActionFilterAttribute: OnActionExecuting khởi động Stopwatch lưu trong HttpContext.Items, OnActionExecuted in ra console tên action và số mili giây.',
      signature: 'class DoThoiGianAttribute : ActionFilterAttribute',
      examples: [
        { input: 'GET /api/san-pham có [DoThoiGian]', output: 'console: SanPham.GetAll chạy 15ms' },
        { input: 'Action không gắn attribute', output: 'Không in gì' },
      ],
    },
    {
      id: 'b41-2', level: 'Cơ bản', title: 'Cache danh mục sản phẩm',
      requirement: 'Cho bảng DanhMuc ít thay đổi. API GET /api/danh-muc dùng IMemoryCache với absolute 30 phút; POST/PUT/DELETE danh mục xoá cache. Thêm header X-Cache: HIT hoặc MISS để kiểm chứng.',
      signature: 'IMemoryCache.TryGetValue · Set · Remove',
      examples: [
        { input: 'Gọi GET lần 1 rồi lần 2', output: 'Lần 1 X-Cache: MISS, lần 2 X-Cache: HIT' },
        { input: 'POST danh mục mới rồi GET', output: 'X-Cache: MISS, danh sách có danh mục mới' },
      ],
    },
    {
      id: 'b41-3', level: 'Trung bình', title: 'Filter kiểm tra tồn kho có DI',
      requirement: 'Cho API POST /api/don-hang nhận DonHangDto gồm danh sách { sanPhamId, soLuong }. Xây dựng KiemTraTonKhoFilter (IActionFilter, inject AppDbContext) chặn request trước khi vào action nếu có sản phẩm không tồn tại hoặc không đủ tồn kho.',
      tasks: [
        'Đọc tham số "dto" từ context.ActionArguments',
        'Sản phẩm không tồn tại → 404 kèm danh sách id sai',
        'Thiếu tồn kho → 409 kèm { sanPhamId, conLai, yeuCau }',
        'Áp dụng bằng [ServiceFilter(typeof(KiemTraTonKhoFilter))]',
      ],
      signature: 'class KiemTraTonKhoFilter(AppDbContext db) : IActionFilter',
      constraints: ['Chỉ một truy vấn DB cho cả danh sách (Where Contains)'],
      examples: [
        { input: '[{sanPhamId:1, soLuong:2}], tồn kho sp 1 = 5', output: 'Vào action, tạo đơn 201' },
        { input: '[{sanPhamId:1, soLuong:9}]', output: '409 [{"sanPhamId":1,"conLai":5,"yeuCau":9}]', explain: 'Filter gán context.Result nên action không chạy.' },
      ],
      visual: {
        kind: 'flow',
        steps: [
          { kind: 'start', text: 'OnActionExecuting' },
          { kind: 'process', text: 'Lấy dto, truy vấn tồn kho các sanPhamId' },
          { kind: 'decision', text: 'Có id không tồn tại?', branches: [
            { label: 'Có', steps: [{ kind: 'end', text: 'context.Result = 404' }] },
            { label: 'Không', steps: [
              { kind: 'decision', text: 'Có sp thiếu hàng?', branches: [
                { label: 'Có', steps: [{ kind: 'end', text: 'context.Result = 409' }] },
                { label: 'Không', steps: [{ kind: 'end', text: 'Cho action chạy' }] },
              ] },
            ] },
          ] },
        ],
      },
    },
    {
      id: 'b41-4', level: 'Trung bình', title: 'Bọc kết quả API thống nhất',
      requirement: 'Cho mọi API trả về dữ liệu thô. Xây dựng BocKetQuaFilter (IResultFilter) đăng ký toàn cục để mọi ObjectResult thành { thanhCong, maLoi, duLieu }, và LoiChuanFilter (IExceptionFilter) để lỗi thành { thanhCong: false, maLoi, thongBao }.',
      tasks: [
        'OnResultExecuting: nếu context.Result là ObjectResult thì bọc Value',
        'Mã 2xx → thanhCong = true; 4xx → false',
        'OnException: ValidationException → 400, KeyNotFoundException → 404, còn lại 500',
        'Đăng ký cả hai bằng options.Filters.Add',
      ],
      signature: 'class BocKetQuaFilter : IResultFilter · class LoiChuanFilter : IExceptionFilter',
      examples: [
        { input: 'GET /api/san-pham/5 trả Ok(sp)', output: '{"thanhCong":true,"maLoi":200,"duLieu":{"id":5,...}}' },
        { input: 'Action ném KeyNotFoundException("Không có đơn 9")', output: '404 {"thanhCong":false,"maLoi":404,"thongBao":"Không có đơn 9"}' },
        { input: 'Action trả NoContent()', output: '204 không body', explain: 'NoContentResult không phải ObjectResult nên filter bỏ qua.' },
      ],
    },
    {
      id: 'b41-5', level: 'Trung bình', title: 'Output Cache cho trang tìm kiếm',
      requirement: 'Cho API GET /api/san-pham/tim?q=&nhom=&trang= và GET /api/san-pham/{id}. Áp Output Cache 60 giây sao cho các bộ tham số khác nhau có bản cache riêng; viết thử nghiệm chứng minh action không chạy lại khi cache hit.',
      signature: '[OutputCache(Duration = 60, VaryByQueryKeys = ..., VaryByRouteValueNames = ...)]',
      constraints: ['Đặt một biến đếm static trong action để in số lần action thực sự chạy'],
      examples: [
        { input: 'Gọi ?q=tivi&trang=1 ba lần trong 60s', output: 'Biến đếm tăng 1 lần' },
        { input: 'Gọi ?q=tivi&trang=2', output: 'Biến đếm tăng thêm 1', explain: 'trang nằm trong VaryByQueryKeys nên là khoá khác.' },
      ],
    },
    {
      id: 'b41-6', level: 'Nâng cao', title: 'Resource filter làm cache',
      requirement: 'Cho các API GET danh sách. Xây dựng CacheResourceFilter (IResourceFilter, inject IMemoryCache) cache response theo Path + QueryString: OnResourceExecuting trả luôn kết quả nếu có cache, OnResourceExecuted cất kết quả vào cache. Gắn bằng attribute [CacheApi(giay: 30)].',
      tasks: [
        'Tạo CacheApiAttribute : Attribute, IFilterFactory để truyền tham số giây mà vẫn có DI',
        'Khoá cache = Method + Path + QueryString',
        'Chỉ cache GET và kết quả ObjectResult mã 200',
        'Thêm header X-Cache HIT/MISS',
      ],
      signature: 'class CacheResourceFilter(IMemoryCache cache, int giay) : IResourceFilter',
      examples: [
        { input: 'GET /api/khach-hang?trang=1 hai lần', output: 'MISS rồi HIT; lần 2 action không chạy' },
        { input: 'POST /api/khach-hang', output: 'Không cache, không header X-Cache' },
      ],
      hint: 'IFilterFactory.CreateInstance(IServiceProvider sp) cho phép lấy IMemoryCache từ sp rồi new CacheResourceFilter(cache, Giay).',
    },
    {
      id: 'b41-7', level: 'Nâng cao', title: 'RedisHelper đa kiểu dữ liệu',
      requirement: 'Cho Redis chạy bằng Docker. Xây dựng RedisHelper dùng StackExchange.Redis (IConnectionMultiplexer) bọc các thao tác string, hash, list để dùng trong cửa hàng.',
      tasks: [
        'SetObjectAsync<T>(key, obj, ttl) / GetObjectAsync<T>(key): JSON string',
        'Lưu giỏ hàng dạng hash gio:{khachHangId} với field = sanPhamId, value = soLuong',
        'Lưu 10 sản phẩm vừa xem dạng list xem:{khachHangId} (LPUSH + LTRIM 0 9)',
        'Tăng lượt xem sản phẩm bằng INCR luot-xem:{id}',
        'Kiểm chứng từng khoá bằng redis-cli (TYPE, HGETALL, LRANGE)',
      ],
      signature: 'class RedisHelper(IConnectionMultiplexer redis)',
      examples: [
        { input: 'ThemVaoGio(7, sp 3, 2) rồi ThemVaoGio(7, sp 3, 1)', output: 'HGETALL gio:7 → 3 → 3', explain: 'Dùng HINCRBY để cộng dồn, không ghi đè.' },
        { input: 'Xem 12 sản phẩm liên tiếp', output: 'LLEN xem:7 = 10, phần tử đầu là sản phẩm xem gần nhất' },
      ],
      visual: {
        kind: 'tree',
        root: {
          label: 'Redis (db 0)',
          children: [
            { label: 'dien-may:ds_san_pham', note: 'string · JSON' },
            { label: 'gio:7', note: 'hash · {3: 3, 8: 1}', highlight: true },
            { label: 'xem:7', note: 'list · [8, 3, 12, ...]' },
            { label: 'luot-xem:3', note: 'string · 152' },
          ],
        },
      },
    },
    {
      id: 'b41-8', level: 'Nâng cao', title: 'Đo hiệu năng ba tầng cache',
      requirement: 'Cho bảng SanPham 5000 dòng. Xây dựng 4 endpoint cùng trả danh sách: không cache, IMemoryCache, Output Cache, Redis. Dùng một script (k6, ab hoặc vòng lặp HttpClient 1000 request) đo thời gian trung bình và lập bảng so sánh, giải thích kết quả.',
      tasks: [
        'GET /api/bench/khong-cache',
        'GET /api/bench/memory',
        'GET /api/bench/output',
        'GET /api/bench/redis',
        'Bảng: endpoint, trung bình ms, p95 ms, số truy vấn DB',
      ],
      signature: 'Bảng kết quả + 3–5 câu nhận xét',
      examples: [
        { input: '1000 request /khong-cache', output: 'Ví dụ: trung bình 85ms, 1000 truy vấn DB' },
        { input: '1000 request /redis', output: 'Ví dụ: trung bình 9ms, 1 truy vấn DB', explain: 'Chậm hơn memory vì phải qua mạng và deserialize JSON, nhưng dùng chung được cho nhiều server.' },
      ],
      hint: 'Chạy ở chế độ Release, bỏ request đầu tiên (khởi động) khỏi số liệu.',
    },
  ],
}

export default buoi41
