import type { Buoi } from './types'

const buoi29: Buoi = {
  id: 29,
  slug: 'blazor-xac-thuc-phan-quyen-jwt',
  title: 'Xác thực & phân quyền trong Blazor với JWT',
  subtitle: 'Đăng nhập qua API nhận JWT, cho Blazor biết ai đang dùng, ẩn hiện giao diện theo vai trò và gắn token vào mọi request',
  duration: '3 giờ',
  keywords: ['JWT', 'AuthenticationStateProvider', 'CascadingAuthenticationState', 'AuthorizeView', '[Authorize]', 'DelegatingHandler', 'returnUrl'],
  goals: [
    'Đọc được cấu trúc JWT và các claim sub, role, exp',
    'Viết AuthenticationStateProvider đọc claims từ token lưu ở localStorage',
    'Ẩn hiện giao diện bằng AuthorizeView và chặn trang bằng [Authorize]',
    'Gắn Bearer token tự động vào HttpClient, đăng xuất và quay lại returnUrl',
  ],

  sections: [
    {
      id: 'jwt',
      title: '1. JWT là gì và luồng đăng nhập',
      blocks: [
        {
          type: 'text',
          text: 'API phía máy chủ (đã làm ở phần ASP.NET Core Web API với gói Microsoft.AspNetCore.Authentication.JwtBearer) kiểm tra tên đăng nhập, mật khẩu (BCrypt) rồi trả về một JWT. Blazor giữ token này và gửi kèm mỗi request trong header Authorization: Bearer <token>. Máy chủ không cần nhớ phiên — chữ ký trên token chứng minh nó do chính máy chủ cấp.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'strip',
            caption: 'Một JWT gồm ba phần Base64Url ngăn bởi dấu chấm',
            name: 'token',
            items: ['header {"alg":"HS256","typ":"JWT"}', '.', 'payload {"sub":"15","role":"Admin","exp":1792252800}', '.', 'signature HMACSHA256(header.payload, secretKey)'],
            highlight: [2],
          },
        },
        {
          type: 'table',
          head: ['Claim', 'Ý nghĩa', 'Ví dụ'],
          rows: [
            ['sub', 'Định danh người dùng', '"15"'],
            ['unique_name / name', 'Tên đăng nhập', '"khai"'],
            ['role', 'Vai trò, có thể là mảng', '"Admin" hoặc ["Admin","NhanVien"]'],
            ['exp', 'Hết hạn, giây Unix', '1792252800'],
            ['iss / aud', 'Ai cấp / cấp cho ai', 'Khớp Issuer, Audience trong appsettings'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Payload KHÔNG được mã hoá',
          text: 'Base64Url chỉ là mã hoá ký tự, ai cũng giải được (dán vào jwt.io là đọc). Chữ ký chỉ chống SỬA, không chống ĐỌC. Không bao giờ để mật khẩu, số CMND trong payload.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Đăng nhập rồi gọi API cần quyền',
            actors: ['Trang DangNhap', 'AuthService', 'Web API', 'localStorage'],
            steps: [
              { from: 0, to: 1, text: 'DangNhapAsync("khai", "123456")' },
              { from: 1, to: 2, text: 'POST /api/auth/login' },
              { from: 2, to: 2, text: 'Tìm user, BCrypt.Verify, tạo JWT' },
              { from: 2, to: 1, text: '200 { accessToken }', dashed: true },
              { from: 1, to: 3, text: 'setItem("accessToken", …)' },
              { from: 1, to: 0, text: 'Báo đổi trạng thái → menu hiện "Xin chào khai"', dashed: true },
              { from: 0, to: 2, text: 'GET /api/don-hang + Authorization: Bearer …' },
              { from: 2, to: 0, text: '200 danh sách đơn', dashed: true },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Cài gói phía Blazor (slide trang 139)',
            code: `dotnet add package Microsoft.AspNetCore.Components.Authorization --version 9.0.0
dotnet add package System.IdentityModel.Tokens.Jwt`,
            note: 'Gói thứ nhất cho AuthorizeView, CascadingAuthenticationState, AuthenticationStateProvider. Gói thứ hai để đọc claims trong token (JwtSecurityTokenHandler.ReadJwtToken) mà không cần tự giải Base64.',
          },
        },
      ],
    },
    {
      id: 'auth-provider',
      title: '2. AuthenticationStateProvider tự viết',
      blocks: [
        {
          type: 'text',
          text: 'Blazor không biết JWT là gì. Nó chỉ hỏi một câu: "người dùng hiện tại là ai?" — câu trả lời là một ClaimsPrincipal do AuthenticationStateProvider cung cấp. Ta viết lớp con đọc token từ localStorage, kiểm tra hạn, rồi dựng ClaimsPrincipal từ các claim trong payload.',
        },
        {
          type: 'code',
          sample: {
            title: 'Auth/JwtAuthStateProvider.cs',
            code: `using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Components.Authorization;

public class JwtAuthStateProvider(LocalStorageService storage) : AuthenticationStateProvider
{
    static readonly AuthenticationState KhachVangLai = new(new ClaimsPrincipal(new ClaimsIdentity()));

    public override async Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        string? token = await storage.DocAsync<string>("accessToken");
        if (string.IsNullOrEmpty(token)) return KhachVangLai;

        var jwt = new JwtSecurityTokenHandler().ReadJwtToken(token);
        if (jwt.ValidTo < DateTime.UtcNow)
        {
            await storage.XoaAsync("accessToken");   // hết hạn → coi như chưa đăng nhập
            return KhachVangLai;
        }

        var identity = new ClaimsIdentity(jwt.Claims, "jwt", "unique_name", "role");
        return new AuthenticationState(new ClaimsPrincipal(identity));
    }

    public void BaoDaDoi() => NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
}`,
            note: 'Tham số thứ hai "jwt" là authenticationType — thiếu nó thì IsAuthenticated luôn false dù có claims. Hai tham số sau chỉ ra claim nào là tên (User.Identity.Name) và claim nào là vai trò (IsInRole, Roles="Admin").',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Program.cs (Blazor WebAssembly)',
            code: `builder.Services.AddScoped<LocalStorageService>();
builder.Services.AddScoped<JwtAuthStateProvider>();
builder.Services.AddScoped<AuthenticationStateProvider>(sp => sp.GetRequiredService<JwtAuthStateProvider>());
builder.Services.AddAuthorizationCore();
builder.Services.AddCascadingAuthenticationState();   // .NET 8+, thay cho bọc thẻ trong App.razor
builder.Services.AddScoped<AuthService>();`,
            note: 'Đăng ký hai lần cùng một instance: Blazor lấy theo kiểu AuthenticationStateProvider, còn AuthService cần kiểu cụ thể JwtAuthStateProvider để gọi BaoDaDoi().',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'GetAuthenticationStateAsync quyết định người dùng là ai',
            steps: [
              { kind: 'start', text: 'Blazor cần biết trạng thái đăng nhập' },
              { kind: 'io', text: 'Đọc "accessToken" từ localStorage' },
              {
                kind: 'decision',
                text: 'Có token?',
                branches: [
                  { label: 'Không', steps: [{ kind: 'end', text: 'ClaimsPrincipal rỗng (khách)' }] },
                  {
                    label: 'Có',
                    steps: [
                      { kind: 'process', text: 'ReadJwtToken → claims, ValidTo' },
                      {
                        kind: 'decision',
                        text: 'ValidTo < UtcNow?',
                        branches: [
                          { label: 'Hết hạn', steps: [{ kind: 'io', text: 'Xoá token' }, { kind: 'end', text: 'Khách' }] },
                          { label: 'Còn hạn', steps: [{ kind: 'end', text: 'ClaimsIdentity(claims, "jwt")' }] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Phía client chỉ ĐỌC token, không XÁC MINH',
          text: 'ReadJwtToken không kiểm tra chữ ký (client không có secret key). Người dùng sửa token để tự gán role Admin thì menu Admin có hiện ra — nhưng API sẽ trả 401 vì chữ ký sai. Phân quyền trên Blazor là để giao diện dễ dùng; bảo mật thật nằm ở [Authorize] phía API.',
        },
      ],
    },
    {
      id: 'authorize-view',
      title: '3. AuthorizeView và [Authorize]',
      blocks: [
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Layout/NavMenu.razor — menu theo vai trò',
            code: `<AuthorizeView>
    <Authorized>
        <span>Xin chào @context.User.Identity?.Name</span>
        <button class="btn btn-link" @onclick="DangXuat">Đăng xuất</button>
    </Authorized>
    <NotAuthorized>
        <a href="dang-nhap">Đăng nhập</a>
    </NotAuthorized>
</AuthorizeView>

<NavLink href="san-pham">Sản phẩm</NavLink>

<AuthorizeView Roles="Admin,NhanVien">
    <NavLink href="don-hang">Quản lý đơn hàng</NavLink>
</AuthorizeView>

<AuthorizeView Roles="Admin">
    <NavLink href="nguoi-dung">Người dùng</NavLink>
</AuthorizeView>`,
            note: 'Roles="Admin,NhanVien" nghĩa là có MỘT trong hai vai trò. Biến context bên trong là AuthenticationState — context.User là ClaimsPrincipal.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Chặn cả trang và App.razor',
            code: `@* Pages/QuanLyDonHang.razor *@
@page "/don-hang"
@attribute [Authorize(Roles = "Admin,NhanVien")]

@* App.razor (WebAssembly) — AuthorizeRouteView thay cho RouteView *@
<Router AppAssembly="typeof(App).Assembly">
    <Found Context="routeData">
        <AuthorizeRouteView RouteData="routeData" DefaultLayout="typeof(MainLayout)">
            <NotAuthorized>
                @if (context.User.Identity?.IsAuthenticated != true)
                {
                    <ChuyenDenDangNhap />
                }
                else
                {
                    <p class="alert alert-danger">Bạn không có quyền xem trang này.</p>
                }
            </NotAuthorized>
        </AuthorizeRouteView>
    </Found>
</Router>`,
            note: '[Authorize] trên trang chỉ có tác dụng khi router là AuthorizeRouteView. Phân biệt hai ca: chưa đăng nhập (đưa sang trang đăng nhập) và đã đăng nhập nhưng thiếu vai trò (báo không có quyền) — gộp làm một là lỗi UX hay gặp.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Trạng thái đăng nhập chảy xuống cây component',
            root: {
              label: 'App.razor',
              note: 'AddCascadingAuthenticationState',
              highlight: true,
              children: [
                {
                  label: 'AuthorizeRouteView',
                  note: 'kiểm [Authorize] của trang',
                  children: [
                    {
                      label: 'MainLayout',
                      children: [
                        { label: 'NavMenu', note: '<AuthorizeView Roles="Admin">' },
                        { label: 'QuanLyDonHang.razor', note: '[Authorize(Roles = "Admin,NhanVien")]' },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          type: 'table',
          head: ['Công cụ', 'Đặt ở đâu', 'Tác dụng'],
          rows: [
            ['<AuthorizeView>', 'Trong markup', 'Ẩn hiện một khối giao diện'],
            ['@attribute [Authorize]', 'Đầu trang có @page', 'Chặn cả trang, router hiện NotAuthorized'],
            ['[CascadingParameter] Task<AuthenticationState>', 'Trong @code', 'Kiểm tra quyền bằng code, ví dụ trước khi lưu'],
            ['[Authorize] trên controller API', 'Máy chủ', 'Bảo mật thật — client sửa gì cũng không qua'],
          ],
        },
      ],
    },
    {
      id: 'http-handler',
      title: '4. Gắn Bearer token vào HttpClient',
      blocks: [
        {
          type: 'text',
          text: 'Không muốn mỗi chỗ gọi API lại tự thêm header Authorization. DelegatingHandler là một "trạm" nằm giữa HttpClient và mạng: mọi request đi qua đều được gắn token, mọi phản hồi 401 đều được bắt ở một chỗ.',
        },
        {
          type: 'code',
          sample: {
            title: 'Auth/JwtHandler.cs',
            code: `using System.Net;
using System.Net.Http.Headers;

public class JwtHandler(LocalStorageService storage, JwtAuthStateProvider auth) : DelegatingHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken ct)
    {
        string? token = await storage.DocAsync<string>("accessToken");
        if (!string.IsNullOrEmpty(token))
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

        var response = await base.SendAsync(request, ct);

        if (response.StatusCode == HttpStatusCode.Unauthorized)
        {
            await storage.XoaAsync("accessToken");   // token hết hạn hoặc bị thu hồi
            auth.BaoDaDoi();
        }
        return response;
    }
}`,
            note: 'Gặp 401 thì xoá token và báo đổi trạng thái — AuthorizeView tự chuyển sang NotAuthorized, người dùng thấy nút Đăng nhập thay vì trang lỗi khó hiểu.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Program.cs — gắn handler vào HttpClient có tên',
            code: `// dotnet add package Microsoft.Extensions.Http
builder.Services.AddTransient<JwtHandler>();
builder.Services.AddHttpClient("Api", c => c.BaseAddress = new Uri("https://localhost:7001/"))
    .AddHttpMessageHandler<JwtHandler>();
builder.Services.AddScoped(sp => sp.GetRequiredService<IHttpClientFactory>().CreateClient("Api"));`,
            note: 'Handler đăng ký Transient. Từ đây mọi @inject HttpClient Http đều đi qua JwtHandler.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Một request đi qua JwtHandler',
            steps: [
              { kind: 'start', text: 'Http.GetFromJsonAsync("api/don-hang")' },
              { kind: 'io', text: 'Đọc accessToken' },
              { kind: 'process', text: 'Gắn Authorization: Bearer <token>' },
              { kind: 'io', text: 'Gửi lên API' },
              {
                kind: 'decision',
                text: 'Mã phản hồi?',
                branches: [
                  { label: '200', steps: [{ kind: 'end', text: 'Trả dữ liệu cho component' }] },
                  { label: '401', steps: [{ kind: 'process', text: 'Xoá token, BaoDaDoi()' }, { kind: 'end', text: 'Giao diện về trạng thái khách' }] },
                  { label: '403', steps: [{ kind: 'end', text: 'Đăng nhập rồi nhưng thiếu quyền — báo lỗi, KHÔNG xoá token' }] },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: 'login-logout',
      title: '5. AuthService: đăng nhập, đăng xuất, returnUrl',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'Auth/AuthService.cs',
            code: `public record DangNhapRequest(string TenDangNhap, string MatKhau);
public record DangNhapResponse(string AccessToken);

public class AuthService(HttpClient http, LocalStorageService storage, JwtAuthStateProvider auth)
{
    public async Task<string?> DangNhapAsync(DangNhapRequest req)
    {
        var res = await http.PostAsJsonAsync("api/auth/login", req);
        if (!res.IsSuccessStatusCode) return "Sai tên đăng nhập hoặc mật khẩu";

        var data = await res.Content.ReadFromJsonAsync<DangNhapResponse>();
        await storage.LuuAsync("accessToken", data!.AccessToken);
        auth.BaoDaDoi();
        return null;   // null = thành công
    }

    public async Task DangXuatAsync()
    {
        await storage.XoaAsync("accessToken");
        auth.BaoDaDoi();
    }
}`,
            note: 'Gọi auth.BaoDaDoi() sau khi lưu/xoá token — thiếu dòng này thì menu vẫn hiện "Đăng nhập" cho tới khi F5.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Pages/DangNhap.razor và ChuyenDenDangNhap.razor',
            code: `@page "/dang-nhap"
@inject AuthService Auth
@inject NavigationManager Nav

<EditForm Model="form" OnValidSubmit="XuLyAsync">
    <InputText @bind-Value="form.TenDangNhap" class="form-control" />
    <InputText @bind-Value="form.MatKhau" type="password" class="form-control" />
    <p class="text-danger">@loi</p>
    <button class="btn btn-primary">Đăng nhập</button>
</EditForm>

@code {
    [SupplyParameterFromQuery] public string? ReturnUrl { get; set; }
    FormDangNhap form = new();
    string? loi;

    async Task XuLyAsync()
    {
        loi = await Auth.DangNhapAsync(new(form.TenDangNhap, form.MatKhau));
        if (loi is null)
        {
            bool hopLe = !string.IsNullOrEmpty(ReturnUrl) && ReturnUrl.StartsWith("/") && !ReturnUrl.StartsWith("//");
            Nav.NavigateTo(hopLe ? ReturnUrl! : "/");
        }
    }
}

@* ChuyenDenDangNhap.razor *@
@inject NavigationManager Nav
@code {
    protected override void OnInitialized() =>
        Nav.NavigateTo("dang-nhap?returnUrl=" + Uri.EscapeDataString(new Uri(Nav.Uri).PathAndQuery));
}`,
            note: 'Chỉ nhận returnUrl bắt đầu bằng một dấu / — chặn kẻ xấu gửi link dang-nhap?returnUrl=https://trang-gia.com để đưa người dùng sang trang lừa đảo sau khi đăng nhập (open redirect).',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Khách mở thẳng /don-hang/15',
            items: [
              { label: '1', text: 'AuthorizeRouteView: chưa đăng nhập → ChuyenDenDangNhap' },
              { label: '2', text: 'URL: /dang-nhap?returnUrl=%2Fdon-hang%2F15' },
              { label: '3', text: 'Nhập đúng → lưu token, BaoDaDoi()' },
              { label: '4', text: 'NavigateTo("/don-hang/15") — về đúng trang định xem' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Đăng xuất phía client chỉ là xoá token',
          text: 'Token đã cấp vẫn hợp lệ tới exp nếu ai đó sao chép được. Vì thế access token nên ngắn (15–30 phút) kèm refresh token lưu CSDL (slide trang 147) để máy chủ thu hồi được khi cần.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b29-1', level: 'Cơ bản', title: 'Giải mã một JWT',
      requirement: 'Cho một chuỗi JWT do API cửa hàng cấp. Xây dựng trang /xem-token có ô dán token, bấm Đọc thì hiện bảng claim (type, value) và thời điểm hết hạn theo giờ Việt Nam.',
      signature: 'new JwtSecurityTokenHandler().ReadJwtToken(token)',
      examples: [
        { input: 'Token có exp = 1792252800', output: 'Hết hạn: 17/10/2026 07:00 (UTC+7)' },
        { input: 'Chuỗi "abc"', output: 'Thông báo "Token không đúng định dạng"', explain: 'ReadJwtToken ném ArgumentException — bọc try/catch.' },
      ],
    },
    {
      id: 'b29-2', level: 'Cơ bản', title: 'Menu theo vai trò',
      requirement: 'Cho ba vai trò Admin, NhanVien, KhachHang. Xây dựng NavMenu: ai cũng thấy Sản phẩm; NhanVien và Admin thấy Quản lý đơn hàng; chỉ Admin thấy Người dùng; khách chưa đăng nhập thấy nút Đăng nhập.',
      signature: '<AuthorizeView Roles="…"> <Authorized> <NotAuthorized>',
      examples: [
        { input: 'Đăng nhập NhanVien', output: 'Sản phẩm, Quản lý đơn hàng, "Xin chào …", Đăng xuất' },
        { input: 'Chưa đăng nhập', output: 'Sản phẩm, Đăng nhập' },
      ],
    },
    {
      id: 'b29-3', level: 'Trung bình', title: 'AuthenticationStateProvider từ localStorage',
      requirement: 'Cho API /api/auth/login trả về accessToken. Xây dựng JwtAuthStateProvider và AuthService để F5 vẫn giữ trạng thái đăng nhập, token hết hạn thì tự về trạng thái khách.',
      tasks: [
        'GetAuthenticationStateAsync đọc token, kiểm tra exp, dựng ClaimsPrincipal',
        'DangNhapAsync lưu token và gọi NotifyAuthenticationStateChanged',
        'DangXuatAsync xoá token và báo đổi',
        'Đăng ký DI đúng để cùng một instance được dùng ở cả hai kiểu',
      ],
      signature: 'Task<AuthenticationState> GetAuthenticationStateAsync() · Task<string?> DangNhapAsync(DangNhapRequest req)',
      examples: [
        { input: 'Đăng nhập rồi F5', output: 'Menu vẫn hiện "Xin chào khai"' },
        { input: 'Sửa exp trong token thành thời điểm đã qua rồi F5', output: 'Về trạng thái khách, localStorage không còn accessToken' },
        { input: 'Đăng nhập xong menu không đổi tới khi F5', output: 'Lỗi', explain: 'Quên gọi NotifyAuthenticationStateChanged sau khi lưu token.' },
      ],
      visual: {
        kind: 'seq',
        actors: ['DangNhap.razor', 'AuthService', 'JwtAuthStateProvider', 'AuthorizeView'],
        steps: [
          { from: 0, to: 1, text: 'DangNhapAsync' },
          { from: 1, to: 1, text: 'POST login, lưu token' },
          { from: 1, to: 2, text: 'BaoDaDoi()' },
          { from: 2, to: 3, text: 'AuthenticationStateChanged' },
          { from: 3, to: 3, text: 'Render nhánh Authorized' },
        ],
      },
    },
    {
      id: 'b29-4', level: 'Trung bình', title: 'Trang cần quyền và returnUrl',
      requirement: 'Cho trang /don-hang/{id:int} chỉ NhanVien, Admin xem được. Xây dựng luồng: khách mở link thì sang /dang-nhap?returnUrl=…, đăng nhập xong về đúng trang; KhachHang đã đăng nhập mở link thì thấy "Bạn không có quyền".',
      signature: '@attribute [Authorize(Roles = "Admin,NhanVien")] · AuthorizeRouteView',
      constraints: ['returnUrl phải bắt đầu bằng "/" và không phải "//"', 'Không có returnUrl thì về trang chủ'],
      examples: [
        { input: 'Khách mở /don-hang/15, đăng nhập NhanVien', output: 'Hiện chi tiết đơn 15' },
        { input: '/dang-nhap?returnUrl=https://trang-gia.com', output: 'Đăng nhập xong về "/"', explain: 'Chặn open redirect.' },
      ],
      visual: {
        kind: 'flow',
        steps: [
          { kind: 'start', text: 'Mở /don-hang/15' },
          {
            kind: 'decision',
            text: 'Đã đăng nhập?',
            branches: [
              { label: 'Chưa', steps: [{ kind: 'process', text: 'Sang /dang-nhap?returnUrl=%2Fdon-hang%2F15' }] },
              {
                label: 'Rồi',
                steps: [{
                  kind: 'decision', text: 'Có role Admin/NhanVien?',
                  branches: [
                    { label: 'Có', steps: [{ kind: 'end', text: 'Hiện trang' }] },
                    { label: 'Không', steps: [{ kind: 'end', text: 'Không có quyền' }] },
                  ],
                }],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'b29-5', level: 'Trung bình', title: 'DelegatingHandler gắn token',
      requirement: 'Cho các service SanPhamService, DonHangService đang tự thêm header Authorization. Xây dựng JwtHandler gắn token cho mọi request, xử lý 401 ở một chỗ và bỏ code lặp ở các service.',
      signature: 'class JwtHandler : DelegatingHandler · AddHttpMessageHandler<JwtHandler>()',
      examples: [
        { input: 'Gọi GET api/don-hang khi đã đăng nhập', output: 'Tab Network thấy header Authorization: Bearer eyJ…' },
        { input: 'Token bị thu hồi phía máy chủ, gọi API', output: '401 → token bị xoá, menu về Đăng nhập' },
        { input: 'Đăng nhập KhachHang gọi API xoá sản phẩm', output: '403 → báo "Không có quyền", vẫn đăng nhập', explain: '403 khác 401: không được xoá token.' },
      ],
    },
    {
      id: 'b29-6', level: 'Nâng cao', title: 'Kiểm tra quyền trong code trước khi lưu',
      requirement: 'Cho trang sửa đơn hàng. Xây dựng quy tắc: NhanVien chỉ được sửa đơn trạng thái "Mới" và do chính mình tạo (so claim sub với DonHang.NhanVienId); Admin sửa được mọi đơn. Nút Lưu ẩn nếu không đủ quyền và hàm LuuAsync cũng kiểm tra lại.',
      signature: '[CascadingParameter] Task<AuthenticationState> AuthState · bool DuocSua(ClaimsPrincipal user, DonHang don)',
      examples: [
        { input: 'NhanVien sub=7 mở đơn NhanVienId=7, trạng thái Mới', output: 'Hiện nút Lưu' },
        { input: 'NhanVien sub=7 mở đơn NhanVienId=9', output: 'Không có nút Lưu, hiện "Chỉ xem"' },
      ],
      hint: 'user.FindFirst("sub")?.Value hoặc ClaimTypes.NameIdentifier tuỳ cách API đặt claim — in hết user.Claims ra để kiểm tra trước.',
    },
    {
      id: 'b29-7', level: 'Nâng cao', title: 'Tự đăng xuất khi token hết hạn',
      requirement: 'Cho access token sống 30 phút. Xây dựng cơ chế: còn 2 phút thì hiện thông báo "Phiên sắp hết hạn", hết hạn thì tự đăng xuất và chuyển sang trang đăng nhập kèm returnUrl trang đang xem, không cần đợi gọi API mới biết.',
      tasks: [
        'Đọc exp khi đăng nhập hoặc khi app khởi động',
        'Dùng System.Threading.Timer hoặc PeriodicTimer kiểm tra mỗi 30 giây',
        'Hiện thông báo khi còn dưới 2 phút',
        'Hết hạn: DangXuatAsync rồi NavigateTo trang đăng nhập',
      ],
      signature: 'class PhienService : IDisposable',
      examples: [
        { input: 'Token còn 90 giây', output: 'Thanh vàng "Phiên sắp hết hạn"' },
        { input: 'Đóng tab rồi mở lại sau 1 giờ', output: 'Vào thẳng trạng thái khách', explain: 'GetAuthenticationStateAsync đã kiểm tra ValidTo khi khởi động.' },
      ],
    },
    {
      id: 'b29-8', level: 'Nâng cao', title: 'Đăng nhập kèm clientId thiết bị',
      requirement: 'Cho bài tập điểm cộng ở slide trang 148. Xây dựng phía Blazor: gửi clientId (buổi 28) cùng tên đăng nhập; API lưu refresh token theo clientId; trang "Thiết bị của tôi" liệt kê các clientId đang đăng nhập và cho thu hồi từng thiết bị.',
      tasks: [
        'DangNhapRequest thêm ClientId; JwtHandler gửi header X-Client-Id',
        'Trang /thiet-bi gọi GET api/auth/thiet-bi hiện tên thiết bị, IP, ngày tạo',
        'Nút Thu hồi gọi DELETE api/auth/thiet-bi/{clientId}',
        'Thiết bị hiện tại đánh dấu "Máy này" và không cho thu hồi',
      ],
      signature: 'record DangNhapRequest(string TenDangNhap, string MatKhau, string ClientId)',
      examples: [
        { input: 'Đăng nhập trên Chrome và Edge rồi mở /thiet-bi', output: 'Hai dòng, dòng Chrome có nhãn "Máy này"' },
        { input: 'Ở Chrome thu hồi Edge, Edge gọi API tiếp', output: 'Edge nhận 401 và về trang đăng nhập' },
      ],
      dense: true,
      visual: {
        kind: 'seq',
        actors: ['Chrome', 'API', 'Edge'],
        steps: [
          { from: 0, to: 1, text: 'DELETE thiet-bi/{clientId Edge}' },
          { from: 1, to: 1, text: 'Đánh dấu refresh token Edge deleted = 1' },
          { from: 2, to: 1, text: 'POST refresh-token' },
          { from: 1, to: 2, text: '401 — đăng nhập lại', dashed: true },
        ],
      },
    },
  ],
}

export default buoi29
