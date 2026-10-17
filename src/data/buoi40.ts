import type { Buoi } from './types'

const buoi40: Buoi = {
  id: 40,
  slug: 'request-pipeline-middleware-jwt',
  title: 'Request pipeline, Middleware & bảo mật JWT',
  subtitle: 'Một request đi qua những tầng nào, tự viết middleware, đăng nhập bằng BCrypt + JWT, phân quyền theo role và refresh token',
  duration: '3 giờ',
  keywords: ['HttpContext', 'Middleware', 'UseExceptionHandler', 'CORS', 'IMiddleware', 'JwtBearer', 'Authorize'],
  goals: [
    'Mô tả vòng đời một request từ middleware tới action, filter và response',
    'Sắp đúng thứ tự middleware có sẵn và tự viết middleware bằng IMiddleware',
    'Xây API đăng nhập: băm mật khẩu bằng BCrypt, sinh JWT có claims, bảo vệ API bằng [Authorize]',
    'Phân quyền theo role và cấp lại access token bằng refresh token',
  ],

  sections: [
    {
      id: 'life-cycle',
      title: '1. Vòng đời một request',
      blocks: [
        {
          type: 'text',
          text: 'Mỗi request tới server được ASP.NET Core gói vào một đối tượng HttpContext. Đối tượng này chạy qua chuỗi middleware như qua các trạm kiểm soát; tới cuối chuỗi thì routing chọn controller/action, model binding đổ dữ liệu vào tham số, filter chạy trước và sau action, rồi kết quả đi ngược lại qua các middleware để về client.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'GET /api/san-pham/5 đi qua pipeline',
            steps: [
              { kind: 'start', text: 'Request tới Kestrel → tạo HttpContext' },
              { kind: 'process', text: 'Middleware: ExceptionHandler → CORS → StaticFiles → Routing → Authentication → Authorization' },
              { kind: 'decision', text: 'Có endpoint khớp URL?', branches: [
                { label: 'Không', steps: [{ kind: 'end', text: '404 Not Found' }] },
                { label: 'Có', steps: [
                  { kind: 'process', text: 'Model Binding: id = 5 từ route' },
                  { kind: 'process', text: 'Action Filters — OnActionExecuting' },
                  { kind: 'process', text: 'Thực thi action SanPhamController.GetById(5)' },
                  { kind: 'process', text: 'Result Filters → định dạng JSON' },
                ] },
              ] },
              { kind: 'end', text: 'Response đi ngược qua middleware về client' },
            ],
          },
        },
        {
          type: 'table',
          head: ['Thành phần HttpContext', 'Chứa gì', 'Ví dụ'],
          rows: [
            ['context.Request', 'Method, Path, Query, Headers, Body', 'context.Request.Headers["Authorization"]'],
            ['context.Response', 'StatusCode, Headers, Body', 'context.Response.StatusCode = 403'],
            ['context.User', 'ClaimsPrincipal sau khi xác thực', 'context.User.Identity?.Name'],
            ['context.Connection', 'IP, port của client', 'context.Connection.RemoteIpAddress'],
            ['context.Items', 'Dữ liệu tạm sống trong một request', 'context.Items["batDau"] = DateTime.Now'],
            ['context.RequestServices', 'Lấy service từ DI', 'GetRequiredService<AppDbContext>()'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Mô hình củ hành',
          text: 'Middleware nào đứng trước thì gặp request trước và gặp response sau cùng. Vì vậy ExceptionHandler phải đứng đầu: nó bao lấy mọi tầng phía sau nên bắt được lỗi ở bất cứ đâu.',
        },
      ],
    },
    {
      id: 'middleware-co-san',
      title: '2. Middleware có sẵn và thứ tự',
      blocks: [
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Thứ tự khai báo trong Program.cs',
            items: [
              { label: 'UseExceptionHandler', text: 'Bắt mọi ngoại lệ phía sau, trả JSON lỗi thống nhất' },
              { label: 'UseCors', text: 'Trả header Access-Control-Allow-* cho trình duyệt' },
              { label: 'UseStaticFiles', text: 'Phục vụ file trong wwwroot, gặp file thì dừng luôn' },
              { label: 'UseRouting', text: 'Chọn endpoint phù hợp với URL' },
              { label: 'UseAuthentication', text: 'Đọc token → gán context.User ("Bạn là ai?")' },
              { label: 'UseAuthorization', text: 'Xét [Authorize], role ("Bạn được làm gì?")' },
              { label: 'MapControllers', text: 'Endpoint: chạy action' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'UseExceptionHandler trả JSON thay vì trang lỗi',
            code: `using System.Net;
using Microsoft.AspNetCore.Diagnostics;

app.UseExceptionHandler(appBuilder =>
{
    appBuilder.Run(async context =>
    {
        var exceptionFeature = context.Features.Get<IExceptionHandlerFeature>();
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var errorResponse = new
        {
            message = exceptionFeature?.Error.Message ?? "Lỗi không xác định!"
        };
        await context.Response.WriteAsJsonAsync(errorResponse);
    });
});`,
            note: 'Trên production không trả stack trace ra ngoài — chỉ thông điệp gọn, còn chi tiết ghi vào log. Controller không cần try/catch khắp nơi nữa.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'CORS nhiều policy, áp riêng cho controller',
            code: `builder.Services.AddCors(options =>
{
    options.AddPolicy("ChoPhepBlazor", p => p
        .WithOrigins("https://localhost:7001", "https://dienmay.vn")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());

    options.AddPolicy("ChiDoc", p => p
        .AllowAnyOrigin()
        .WithMethods("GET"));
});

var app = builder.Build();
app.UseCors("ChoPhepBlazor");      // policy mặc định cho toàn app

// Controller công khai dùng policy khác
[EnableCors("ChiDoc")]
[ApiController, Route("api/[controller]")]
public class BangGiaController : ControllerBase { /* ... */ }`,
            note: 'AllowAnyOrigin() không đi chung với AllowCredentials() — trình duyệt từ chối và .NET báo lỗi lúc chạy. Muốn gửi cookie/token thì phải liệt kê origin cụ thể.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Preflight CORS khi Blazor gọi POST sang API khác origin',
            actors: ['Trình duyệt', 'API :5001'],
            steps: [
              { from: 0, to: 1, text: 'OPTIONS /api/don-hang · Origin, Access-Control-Request-Method: POST' },
              { from: 1, to: 0, text: '204 · Access-Control-Allow-Origin, Allow-Methods, Allow-Headers', dashed: true },
              { from: 0, to: 1, text: 'POST /api/don-hang (request thật)' },
              { from: 1, to: 0, text: '201 Created', dashed: true },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Static files từ thư mục tự chọn',
            code: `using Microsoft.Extensions.FileProviders;

app.UseStaticFiles();   // wwwroot mặc định

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "AnhSanPham")),
    RequestPath = "/anh"
});
// AnhSanPham/tivi-samsung.jpg  →  https://localhost:5001/anh/tivi-samsung.jpg`,
            note: 'Thư mục AnhSanPham phải tồn tại khi chạy, nếu không PhysicalFileProvider ném lỗi ngay lúc khởi động.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Sai thứ tự là lỗi im lặng',
          text: 'Đặt UseAuthorization trước UseAuthentication thì context.User luôn rỗng → mọi API [Authorize] trả 401 dù token đúng. Đặt UseCors sau MapControllers thì header CORS không được thêm.',
        },
      ],
    },
    {
      id: 'tu-viet-middleware',
      title: '3. Tự viết middleware: chặn IP',
      blocks: [
        {
          type: 'text',
          text: 'Middleware là một hàm nhận HttpContext và RequestDelegate next. Gọi await next(context) là cho request đi tiếp; không gọi là chặn lại và tự trả response. Cách gọn nhất là cài đặt interface IMiddleware rồi đăng ký vào DI.',
        },
        {
          type: 'code',
          sample: {
            title: 'Middlewares/BlockIpMiddleware.cs',
            code: `public class BlockIpMiddleware : IMiddleware
{
    private readonly HashSet<string> danhSachChan;

    public BlockIpMiddleware(IConfiguration config)
    {
        danhSachChan = config.GetSection("BlockedIps").Get<string[]>()?.ToHashSet()
                       ?? new HashSet<string>();
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        string ip = context.Connection.RemoteIpAddress?.ToString() ?? "";

        if (danhSachChan.Contains(ip))
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsJsonAsync(new { message = $"IP {ip} bị chặn" });
            return;                 // KHÔNG gọi next → request dừng tại đây
        }

        await next(context);        // cho đi tiếp
    }
}

// Program.cs
builder.Services.AddTransient<BlockIpMiddleware>();
app.UseMiddleware<BlockIpMiddleware>();`,
            note: 'Middleware dùng IMiddleware bắt buộc phải AddTransient/AddScoped vào DI, nếu quên thì UseMiddleware báo "No service for type BlockIpMiddleware".',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Luồng xử lý trong BlockIpMiddleware',
            steps: [
              { kind: 'start', text: 'InvokeAsync(context, next)' },
              { kind: 'process', text: 'ip = context.Connection.RemoteIpAddress' },
              { kind: 'decision', text: 'ip thuộc BlockedIps?', branches: [
                { label: 'Có', steps: [{ kind: 'io', text: '403 + JSON "IP bị chặn"' }, { kind: 'end', text: 'return — không gọi next' }] },
                { label: 'Không', steps: [{ kind: 'process', text: 'await next(context)' }, { kind: 'end', text: 'Các middleware sau xử lý tiếp' }] },
              ] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'UseRouting và UseEndpoints',
          text: 'UseRouting() phân tích URL và chọn endpoint; UseEndpoints()/MapControllers() chạy endpoint đã chọn. Middleware đặt giữa hai lệnh này đọc được context.GetEndpoint() — ví dụ biết action có [Authorize] hay không. Từ .NET 6, app.MapControllers() tự ngầm gọi UseEndpoints.',
        },
      ],
    },
    {
      id: 'jwt',
      title: '4. Đăng nhập BCrypt + JWT và phân quyền',
      blocks: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Hai câu hỏi khác nhau',
            columns: [
              { title: 'Authentication', tone: 'plain', items: ['"Bạn là ai?"', 'Kiểm tra token / mật khẩu', 'Sai → 401 Unauthorized', 'UseAuthentication()'] },
              { title: 'Authorization', tone: 'plain', items: ['"Bạn được làm gì?"', 'Kiểm tra role, policy', 'Không đủ quyền → 403 Forbidden', 'UseAuthorization() + [Authorize(Roles = "Admin")]'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Cài gói',
            code: `dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 9.0.0
dotnet add package BCrypt.Net-Next`,
            note: 'BCrypt tự sinh muối (salt) 22 ký tự và lưu chung trong chuỗi băm 60 ký tự dạng $2a$11$<muối><băm>.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Băm khi đăng ký, Verify khi đăng nhập',
            code: `string matKhauBam = BCrypt.Net.BCrypt.HashPassword("123456");
// $2a$11$Qx... (mỗi lần chạy ra chuỗi khác vì muối ngẫu nhiên)

bool dung = BCrypt.Net.BCrypt.Verify("123456", matKhauBam);   // true
bool sai  = BCrypt.Net.BCrypt.Verify("654321", matKhauBam);   // false`,
            note: 'Không bao giờ so sánh matKhauBam == HashPassword(nhap): hai lần băm cùng mật khẩu cho hai chuỗi khác nhau. Luôn dùng Verify — nó lấy muối từ chuỗi đã lưu để băm lại rồi so.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'json',
            title: 'appsettings.json',
            code: `{
  "Jwt": {
    "Key": "chuoi-bi-mat-dai-it-nhat-32-ky-tu-cua-dien-may",
    "Issuer": "DienMayApi",
    "Audience": "DienMayClient",
    "ExpireMinutes": 30
  }
}`,
            note: 'Key HMAC-SHA256 phải ≥ 32 ký tự (256 bit), ngắn hơn thì tạo token ném IDX10720. Production đặt Key trong biến môi trường, không commit lên git.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Services/JwtService.cs — GenerateToken',
            code: `using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public class JwtService(IConfiguration config)
{
    public string GenerateToken(User user, IEnumerable<string> roles)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.Email, user.Email),
        };
        claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
        var token = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"],
            audience: config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(int.Parse(config["Jwt:ExpireMinutes"]!)),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}`,
            note: 'Payload JWT chỉ được mã hoá Base64, ai cũng đọc được — không bỏ mật khẩu hay số thẻ vào claims. Chữ ký chỉ đảm bảo không ai sửa được nội dung.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Program.cs — AddAuthentication JwtBearer',
            code: `builder.Services.AddScoped<JwtService>();
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
            ClockSkew = TimeSpan.Zero
        };
    });
builder.Services.AddAuthorization();

var app = builder.Build();
app.UseRouting();
app.UseAuthentication();   // trước
app.UseAuthorization();    // sau
app.MapControllers();`,
            note: 'ClockSkew mặc định 5 phút: token hết hạn vẫn dùng được thêm 5 phút. Đặt TimeSpan.Zero để test hết hạn cho đúng.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Controllers/AuthController.cs — API login',
            code: `public class UserLogin
{
    public string? UserName { get; set; } = "";
    public string? Password { get; set; } = "";
}

[ApiController, Route("api/[controller]")]
public class AuthController(AppDbContext db, JwtService jwt) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLogin model)
    {
        var user = await db.Users
            .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.UserName == model.UserName);

        if (user is null || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
            return Unauthorized(new { message = "Sai tài khoản hoặc mật khẩu" });

        var roles = user.UserRoles.Select(ur => ur.Role.Name);
        return Ok(new { accessToken = jwt.GenerateToken(user, roles) });
    }
}`,
            note: 'Sai tên đăng nhập hay sai mật khẩu đều trả cùng một thông điệp — không cho kẻ tấn công biết tài khoản nào tồn tại.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Đăng nhập rồi gọi API được bảo vệ',
            actors: ['Client', 'AuthController', 'DB', 'JwtBearer middleware', 'DonHangController'],
            steps: [
              { from: 0, to: 1, text: 'POST /api/auth/login {userName, password}' },
              { from: 1, to: 2, text: 'Tìm user + roles' },
              { from: 2, to: 1, text: 'User có PasswordHash', dashed: true },
              { from: 1, to: 1, text: 'BCrypt.Verify → GenerateToken' },
              { from: 1, to: 0, text: '200 { accessToken }', dashed: true },
              { from: 0, to: 3, text: 'GET /api/don-hang · Authorization: Bearer <token>' },
              { from: 3, to: 4, text: 'Chữ ký, hạn hợp lệ → context.User có claims' },
              { from: 4, to: 0, text: '200 danh sách đơn của user', dashed: true },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: '[Authorize] và đọc claims trong action',
            code: `[Authorize]
[ApiController, Route("api/don-hang")]
public class DonHangController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> CuaToi()
    {
        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var ds = await db.DonHangs.Where(d => d.KhachHangId == userId).ToListAsync();
        return Ok(ds);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Xoa(int id) { /* ... */ return NoContent(); }

    [AllowAnonymous]
    [HttpGet("trang-thai")]
    public IActionResult TrangThai() => Ok("API đang chạy");
}`,
            note: 'Roles = "Admin,Manager" nghĩa là MỘT trong hai. Muốn bắt buộc có CẢ HAI thì đặt hai thuộc tính [Authorize(Roles = "Admin")] [Authorize(Roles = "Manager")] chồng nhau.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Bảng users, roles, user_roles',
            code: `CREATE TABLE users (
    id            BIGINT IDENTITY PRIMARY KEY,
    user_name     NVARCHAR(50)  NOT NULL UNIQUE,
    email         NVARCHAR(100) NOT NULL UNIQUE,
    password_hash NVARCHAR(100) NOT NULL
);
CREATE TABLE roles (
    id   INT IDENTITY PRIMARY KEY,
    name NVARCHAR(50) NOT NULL UNIQUE      -- Admin, NhanVien, KhachHang
);
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL REFERENCES users(id),
    role_id INT    NOT NULL REFERENCES roles(id),
    PRIMARY KEY (user_id, role_id)
);`,
            note: 'Quan hệ nhiều-nhiều: một user nhiều role, một role nhiều user. Hệ thống lớn có thể thêm group và group_roles để gán quyền theo nhóm.',
          },
        },
        {
          type: 'table',
          head: ['Tình huống', 'Mã trả về', 'Nguyên nhân thường gặp'],
          rows: [
            ['Không gửi header Authorization', '401', 'Quên chữ "Bearer " phía trước token'],
            ['Token hết hạn', '401', 'Header WWW-Authenticate: Bearer error="invalid_token"'],
            ['Token đúng nhưng thiếu role', '403', 'Claim role không khớp chữ hoa/thường "admin" ≠ "Admin"'],
            ['Token đúng, API [AllowAnonymous]', '200', 'Bỏ qua kiểm tra'],
          ],
        },
      ],
    },
    {
      id: 'refresh-token',
      title: '5. Refresh token',
      blocks: [
        {
          type: 'text',
          text: 'Access token nên sống ngắn (15–30 phút) để nếu lộ thì thiệt hại ít. Để người dùng không phải đăng nhập lại liên tục, server cấp kèm một refresh token sống dài (7–30 ngày), lưu trong database và có thể thu hồi.',
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Bảng refresh_tokens',
            code: `CREATE TABLE refresh_tokens (
    id          BIGINT IDENTITY PRIMARY KEY,
    token       VARCHAR(255) NOT NULL UNIQUE,
    user_id     BIGINT NOT NULL REFERENCES users(id),
    client_id   VARCHAR(255),          -- định danh ứng dụng
    device_id   VARCHAR(255),          -- định danh thiết bị
    device_name NVARCHAR(100),         -- "iPhone 14"
    device_type VARCHAR(50),           -- mobile, desktop
    device_os   VARCHAR(50),           -- iOS 17, Windows 11
    ip_address  VARCHAR(45),
    expires_at  DATETIME,
    created_at  DATETIME DEFAULT GETDATE(),
    deleted     TINYINT DEFAULT 0
);`,
            note: 'Lưu thông tin thiết bị để hiện "Bạn đang đăng nhập trên 3 thiết bị" và cho phép thu hồi từng thiết bị. deleted = 1 là token đã bị thu hồi.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'POST /api/auth/refresh-token',
            steps: [
              { kind: 'start', text: 'Client gửi { accessToken cũ, refreshToken }' },
              { kind: 'process', text: 'Đọc claims từ access token cũ với ValidateLifetime = false' },
              { kind: 'process', text: 'Tìm refresh_tokens theo token' },
              { kind: 'decision', text: 'Tồn tại, deleted = 0, expires_at > now, đúng user?', branches: [
                { label: 'Không', steps: [{ kind: 'end', text: '401 — yêu cầu đăng nhập lại' }] },
                { label: 'Có', steps: [
                  { kind: 'process', text: 'Đánh dấu token cũ deleted = 1, sinh refresh token mới' },
                  { kind: 'end', text: '200 { accessToken mới, refreshToken mới }' },
                ] },
              ] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Sinh refresh token và đọc token đã hết hạn',
            code: `public string GenerateRefreshToken() =>
    Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));

public ClaimsPrincipal? DocTokenHetHan(string accessToken)
{
    var thamSo = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = false,          // chấp nhận token đã hết hạn
        ValidateIssuerSigningKey = true,   // nhưng chữ ký vẫn phải đúng
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!))
    };
    try
    {
        return new JwtSecurityTokenHandler().ValidateToken(accessToken, thamSo, out _);
    }
    catch (SecurityTokenException) { return null; }
}`,
            note: 'ValidateLifetime = false chỉ dùng trong endpoint refresh. Tuyệt đối không tắt nó trong cấu hình AddJwtBearer.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Xoay vòng refresh token',
          text: 'Mỗi lần refresh phải huỷ token cũ và cấp token mới. Nếu một refresh token đã huỷ lại được gửi lên, rất có thể nó đã bị đánh cắp — nên thu hồi toàn bộ token của user đó.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b40-1', level: 'Cơ bản', title: 'Middleware đo thời gian xử lý',
      requirement: 'Cho một Web API cửa hàng điện máy. Xây dựng middleware ThoiGianMiddleware (cài đặt IMiddleware) đo thời gian xử lý mỗi request bằng Stopwatch và ghi vào header phản hồi X-Thoi-Gian-Ms, đồng thời in ra console dạng "GET /api/san-pham 200 - 12ms".',
      signature: 'class ThoiGianMiddleware : IMiddleware · Task InvokeAsync(HttpContext context, RequestDelegate next)',
      constraints: ['Header phải được thêm trước khi body bắt đầu ghi — dùng context.Response.OnStarting', 'Đăng ký AddTransient và UseMiddleware'],
      examples: [
        { input: 'GET /api/san-pham', output: 'Header X-Thoi-Gian-Ms: 12; console: GET /api/san-pham 200 - 12ms' },
        { input: 'GET /api/khong-ton-tai', output: 'console: GET /api/khong-ton-tai 404 - 1ms', explain: 'Middleware vẫn chạy với mọi request, kể cả 404.' },
      ],
    },
    {
      id: 'b40-2', level: 'Cơ bản', title: 'Lỗi trả JSON thống nhất',
      requirement: 'Cho SanPhamController có action GET /api/san-pham/loi cố ý ném InvalidOperationException("Hết hàng"). Cấu hình UseExceptionHandler để mọi lỗi trả JSON { message, path, thoiGian } với mã 500; riêng KeyNotFoundException trả 404.',
      signature: 'app.UseExceptionHandler(appBuilder => appBuilder.Run(async context => { ... }))',
      examples: [
        { input: 'GET /api/san-pham/loi', output: '500 {"message":"Hết hàng","path":"/api/san-pham/loi","thoiGian":"..."}' },
        { input: 'GET /api/san-pham/999 (ném KeyNotFoundException)', output: '404 {"message":"Không tìm thấy sản phẩm 999",...}' },
      ],
    },
    {
      id: 'b40-3', level: 'Trung bình', title: 'Chặn IP và giới hạn tần suất',
      requirement: 'Mở rộng BlockIpMiddleware: ngoài danh sách IP cấm trong appsettings, một IP gửi quá N request trong 60 giây thì bị trả 429 Too Many Requests kèm header Retry-After.',
      tasks: [
        'Đọc BlockedIps và GioiHanMoiPhut từ appsettings.json',
        'IP trong BlockedIps → 403 JSON',
        'Đếm request theo IP trong cửa sổ 60 giây (ConcurrentDictionary)',
        'Vượt giới hạn → 429, header Retry-After = số giây còn lại',
      ],
      signature: 'class BlockIpMiddleware : IMiddleware',
      constraints: ['Middleware phải đăng ký Singleton để bộ đếm sống qua nhiều request', 'An toàn đa luồng'],
      examples: [
        { input: 'GioiHanMoiPhut = 5; IP 127.0.0.1 gửi request thứ 6 trong 20 giây', output: '429, Retry-After: 40' },
        { input: 'IP 10.0.0.9 có trong BlockedIps', output: '403 {"message":"IP 10.0.0.9 bị chặn"}', explain: 'Kiểm tra danh sách cấm trước, không tính vào bộ đếm.' },
      ],
      visual: {
        kind: 'flow',
        steps: [
          { kind: 'start', text: 'Request tới' },
          { kind: 'decision', text: 'IP bị cấm?', branches: [
            { label: 'Có', steps: [{ kind: 'end', text: '403' }] },
            { label: 'Không', steps: [
              { kind: 'process', text: 'Tăng bộ đếm của IP (reset nếu quá 60s)' },
              { kind: 'decision', text: 'Đếm > giới hạn?', branches: [
                { label: 'Có', steps: [{ kind: 'end', text: '429 + Retry-After' }] },
                { label: 'Không', steps: [{ kind: 'end', text: 'await next(context)' }] },
              ] },
            ] },
          ] },
        ],
      },
    },
    {
      id: 'b40-4', level: 'Trung bình', title: 'API đăng ký và đăng nhập',
      requirement: 'Cho bảng users như phần lý thuyết. Xây dựng AuthController với hai API đăng ký và đăng nhập; mật khẩu lưu bằng BCrypt, đăng nhập thành công trả JWT chứa Id, UserName, Email và các role.',
      tasks: [
        'POST /api/auth/register: kiểm tra trùng user_name/email, băm mật khẩu, gán role KhachHang',
        'POST /api/auth/login: Verify mật khẩu, trả { accessToken, hetHan }',
        'GET /api/auth/me có [Authorize]: trả lại claims đọc từ token',
      ],
      signature: 'Task<IActionResult> Register(DangKyDto dto) · Task<IActionResult> Login(UserLogin model)',
      constraints: ['Mật khẩu ≥ 6 ký tự', 'Sai user hoặc sai mật khẩu đều trả cùng thông điệp 401'],
      examples: [
        { input: 'register {userName:"an", email:"an@dm.vn", password:"123456"} lần 2', output: '409 {"message":"Tên đăng nhập đã tồn tại"}' },
        { input: 'login {userName:"an", password:"sai"}', output: '401 {"message":"Sai tài khoản hoặc mật khẩu"}' },
        { input: 'GET /api/auth/me với token của an', output: '200 {"id":1,"userName":"an","roles":["KhachHang"]}' },
      ],
      visual: {
        kind: 'seq',
        actors: ['Client', 'AuthController', 'DB'],
        steps: [
          { from: 0, to: 1, text: 'POST register' },
          { from: 1, to: 2, text: 'INSERT users (password_hash = BCrypt)' },
          { from: 0, to: 1, text: 'POST login' },
          { from: 1, to: 2, text: 'SELECT user + roles' },
          { from: 1, to: 0, text: '{ accessToken }', dashed: true },
        ],
      },
    },
    {
      id: 'b40-5', level: 'Trung bình', title: 'Phân quyền ba vai trò',
      requirement: 'Cho ba role Admin, NhanVien, KhachHang. Gắn [Authorize] cho SanPhamController và DonHangController sao cho đúng bảng quyền bên dưới; viết kịch bản kiểm thử bằng file .http gửi request với ba token khác nhau.',
      tasks: [
        'GET /api/san-pham: ai cũng xem được (kể cả chưa đăng nhập)',
        'POST, PUT /api/san-pham: Admin hoặc NhanVien',
        'DELETE /api/san-pham/{id}: chỉ Admin',
        'GET /api/don-hang: KhachHang chỉ thấy đơn của mình, NhanVien/Admin thấy tất cả',
      ],
      signature: '[Authorize(Roles = "Admin,NhanVien")] · User.IsInRole("KhachHang")',
      examples: [
        { input: 'DELETE /api/san-pham/3 với token NhanVien', output: '403 Forbidden' },
        { input: 'DELETE /api/san-pham/3 không có token', output: '401 Unauthorized', explain: 'Chưa xác thực là 401, đã xác thực mà thiếu quyền mới là 403.' },
      ],
    },
    {
      id: 'b40-6', level: 'Nâng cao', title: 'Refresh token xoay vòng',
      requirement: 'Bổ sung refresh token cho API đăng nhập ở bài 4. Access token sống 1 phút để dễ test, refresh token sống 7 ngày lưu trong bảng refresh_tokens kèm ip_address và device_name lấy từ header User-Agent.',
      tasks: [
        'Login trả thêm refreshToken và lưu vào DB',
        'POST /api/auth/refresh-token theo đúng 5 bước: nhận, xác thực, cấp mới, từ chối, trả về',
        'Mỗi lần refresh huỷ token cũ (deleted = 1) và cấp token mới',
        'Gửi lại refresh token đã huỷ → thu hồi toàn bộ token của user, trả 401',
      ],
      signature: 'Task<IActionResult> RefreshToken(RefreshDto dto) · ClaimsPrincipal? DocTokenHetHan(string accessToken)',
      constraints: ['Refresh token sinh bằng RandomNumberGenerator, không dùng Guid', 'ClockSkew = TimeSpan.Zero'],
      examples: [
        { input: 'Sau 2 phút gọi GET /api/auth/me bằng access token cũ', output: '401 invalid_token' },
        { input: 'POST refresh-token với refresh token hợp lệ', output: '200 { accessToken mới, refreshToken mới }' },
        { input: 'Gửi lại refresh token vừa dùng', output: '401 và mọi refresh token của user bị deleted = 1', explain: 'Token đã xoay vòng mà còn được dùng là dấu hiệu bị đánh cắp.' },
      ],
      hint: 'Tách JwtService thành ba hàm GenerateToken, GenerateRefreshToken, DocTokenHetHan. Endpoint refresh lấy userId từ claims của access token cũ rồi so với user_id của refresh token.',
    },
    {
      id: 'b40-7', level: 'Nâng cao', title: 'Thu hồi token bởi Admin',
      requirement: 'Cho hệ thống đã có refresh token. Xây dựng API cho Admin xem các phiên đăng nhập của một user và thu hồi chủ động; access token của phiên bị thu hồi cũng phải bị chặn ngay, không chờ hết hạn.',
      tasks: [
        'GET /api/admin/users/{id}/phien: danh sách refresh token còn hiệu lực kèm thiết bị, IP',
        'DELETE /api/admin/phien/{tokenId}: đánh dấu deleted = 1',
        'Thêm claim "sid" (id phiên) vào access token',
        'Middleware sau UseAuthentication kiểm tra sid còn hiệu lực không, không thì 401',
      ],
      signature: '[Authorize(Roles = "Admin")] · class KiemTraPhienMiddleware : IMiddleware',
      constraints: ['Middleware phải đứng sau UseAuthentication và trước UseAuthorization', 'Cache danh sách sid bị thu hồi để không truy vấn DB mỗi request'],
      examples: [
        { input: 'Admin thu hồi phiên iPhone của user an, an gọi API bằng access token trên iPhone', output: '401 {"message":"Phiên đã bị thu hồi"}' },
        { input: 'an gọi API bằng token trên máy tính', output: '200', explain: 'Chỉ phiên bị thu hồi bị chặn.' },
      ],
      visual: {
        kind: 'flow',
        steps: [
          { kind: 'start', text: 'Request có Bearer token' },
          { kind: 'process', text: 'UseAuthentication → context.User' },
          { kind: 'process', text: 'Đọc claim sid' },
          { kind: 'decision', text: 'sid bị thu hồi?', branches: [
            { label: 'Có', steps: [{ kind: 'end', text: '401 Phiên đã bị thu hồi' }] },
            { label: 'Không', steps: [{ kind: 'end', text: 'next → UseAuthorization' }] },
          ] },
        ],
      },
      hint: 'Liên kết access token với refresh token bằng một id phiên chung (sid). Khi thu hồi, xoá cache để middleware đọc lại.',
    },
    {
      id: 'b40-8', level: 'Nâng cao', title: 'Một thiết bị một phiên',
      requirement: 'Cho bảng refresh_tokens có client_id và device_id. Thiết kế chính sách: mỗi tài khoản KhachHang chỉ được đăng nhập trên tối đa 2 thiết bị; đăng nhập thiết bị thứ 3 thì phiên cũ nhất bị thu hồi. Admin không giới hạn.',
      tasks: [
        'Client (Blazor) sinh device_id một lần, lưu localStorage, gửi qua header X-Device-Id',
        'Login: đếm phiên còn hiệu lực theo user, vượt 2 thì thu hồi phiên có created_at nhỏ nhất',
        'Đăng nhập lại cùng device_id thì thay phiên cũ chứ không tạo phiên mới',
        'Trả danh sách thiết bị đang đăng nhập trong GET /api/auth/thiet-bi',
      ],
      signature: 'Task<IActionResult> Login(UserLogin model, [FromHeader(Name = "X-Device-Id")] string deviceId)',
      examples: [
        { input: 'an đã đăng nhập Laptop (08:00), iPhone (09:00); đăng nhập iPad lúc 10:00', output: 'Phiên Laptop bị thu hồi; còn iPhone, iPad' },
        { input: 'an đăng nhập lại trên iPhone', output: 'Vẫn 2 phiên: iPhone (mới), iPad', explain: 'Cùng device_id nên thay thế, không tính là thiết bị mới.' },
      ],
      hint: 'Toàn bộ thao tác đếm, thu hồi, thêm mới đặt trong một transaction để hai lần đăng nhập đồng thời không vượt giới hạn.',
    },
  ],
}

export default buoi40
