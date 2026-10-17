import type { Buoi } from './types'

const buoi27: Buoi = {
  id: 27,
  slug: 'blazor-goi-web-api-httpclient',
  title: 'Gọi Web API bằng HttpClient',
  subtitle: 'Blazor lấy và ghi dữ liệu qua REST API: đăng ký HttpClient đúng cách, đọc JSON, xử lý mã trạng thái, hiện đủ trạng thái đang tải / lỗi / rỗng',
  duration: '3 giờ',
  keywords: ['IHttpClientFactory', 'AddHttpClient', 'GetFromJsonAsync', 'PostAsJsonAsync', 'PutAsJsonAsync', 'DeleteAsync', 'StatusCode'],
  goals: [
    'Đăng ký typed HttpClient với BaseAddress đọc từ appsettings.json',
    'Gọi đủ bốn thao tác CRUD của /api/ProductApi bằng các hàm JSON tiện ích',
    'Đọc mã trạng thái, phân biệt 404 / 400 / 500 / mất mạng và báo lỗi rõ ràng',
    'Bọc HttpClient trong ProductApiService để component không biết chi tiết HTTP',
  ],

  sections: [
    {
      id: 'tong-quan',
      title: '1. Blazor nói chuyện với Web API',
      blocks: [
        {
          type: 'text',
          text: 'Ở phần Web API ta đã có ProductApiController với năm route: getall, get/{id}, create, update/{id}, delete/{id}. Giờ ứng dụng Blazor đóng vai client: gửi request HTTP, nhận JSON, chuyển thành object C# rồi hiển thị. Mọi dữ liệu nằm ở API — Blazor không biết CSDL ở đâu.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Trang danh sách sản phẩm gọi API',
            actors: ['DanhSachSanPham.razor', 'ProductApiService', 'HttpClient', 'ProductApiController'],
            steps: [
              { from: 0, to: 1, text: 'LayTatCaAsync()' },
              { from: 1, to: 2, text: 'GetFromJsonAsync<List<SanPham>>("api/ProductApi/getall")' },
              { from: 2, to: 3, text: 'GET /api/ProductApi/getall' },
              { from: 3, to: 2, text: '200 OK  [ { "ma": "TV01", … } ]', dashed: true },
              { from: 2, to: 1, text: 'Deserialize JSON → List<SanPham>', dashed: true },
              { from: 1, to: 0, text: 'List<SanPham>', dashed: true },
              { from: 0, to: 0, text: 'Gán danhSach, render bảng' },
            ],
          },
        },
        {
          type: 'table',
          head: ['Thao tác', 'HTTP', 'Route (slide trang 15)', 'Hàm HttpClient', 'Thành công'],
          rows: [
            ['Lấy tất cả', 'GET', 'api/ProductApi/getall', 'GetFromJsonAsync<List<SanPham>>', '200 + mảng JSON'],
            ['Lấy theo id', 'GET', 'api/ProductApi/get/{id}', 'GetAsync rồi đọc StatusCode', '200, hoặc 404 nếu không có'],
            ['Tạo mới', 'POST', 'api/ProductApi/create', 'PostAsJsonAsync(url, sp)', '201 Created / 200'],
            ['Cập nhật', 'PUT', 'api/ProductApi/update/{id}', 'PutAsJsonAsync(url, sp)', '204 No Content / 200'],
            ['Xoá', 'DELETE', 'api/ProductApi/delete/{id}', 'DeleteAsync(url)', '204 / 200'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Tên property và JSON',
          text: 'API trả JSON camelCase ("tenSanPham"), class C# dùng PascalCase (TenSanPham). Các hàm GetFromJsonAsync / PostAsJsonAsync dùng JsonSerializerDefaults.Web nên không phân biệt hoa thường — tự khớp. Chỉ khi tên khác hẳn mới cần [JsonPropertyName("...")].',
        },
      ],
    },
    {
      id: 'dang-ky',
      title: '2. Đăng ký HttpClient và BaseAddress',
      blocks: [
        {
          type: 'text',
          text: 'Không new HttpClient() trong component. Mỗi lần new rồi bỏ để lại một socket mở; nhiều request làm cạn cổng mạng. ASP.NET Core có IHttpClientFactory quản lý vòng đời kết nối giúp ta. Cách gọn nhất là typed client: AddHttpClient<ProductApiService>() — factory tự tạo HttpClient đã cấu hình và inject vào constructor service.',
        },
        {
          type: 'code',
          sample: {
            lang: 'json',
            title: 'appsettings.json',
            code: `{
  "ApiSettings": {
    "BaseUrl": "https://localhost:7001/"
  },
  "Logging": { "LogLevel": { "Default": "Information" } }
}`,
            note: 'BaseUrl phải kết thúc bằng dấu /, còn đường dẫn gọi thì KHÔNG bắt đầu bằng / ("api/ProductApi/getall"). Sai một trong hai là đường dẫn ghép bị mất đoạn.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Program.cs — typed client',
            code: `var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents().AddInteractiveServerComponents();

string baseUrl = builder.Configuration["ApiSettings:BaseUrl"]
    ?? throw new InvalidOperationException("Thiếu ApiSettings:BaseUrl");

builder.Services.AddHttpClient<ProductApiService>(client =>
{
    client.BaseAddress = new Uri(baseUrl);
    client.Timeout = TimeSpan.FromSeconds(15);
});

var app = builder.Build();
app.MapRazorComponents<App>().AddInteractiveServerRenderMode();
app.Run();`,
            note: 'AddHttpClient<T> đăng ký luôn ProductApiService với vòng đời Transient — không cần thêm AddScoped. Component chỉ việc @inject ProductApiService Api.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Ba cách lấy HttpClient',
            columns: [
              { title: 'new HttpClient() mỗi lần', tone: 'bad', items: ['Cạn socket khi tải nặng', 'BaseAddress rải khắp nơi', 'Không test được'] },
              { title: 'Named client', tone: 'plain', items: ['AddHttpClient("api", c => …)', 'factory.CreateClient("api")', 'Hợp khi nhiều API khác nhau'] },
              { title: 'Typed client', tone: 'good', items: ['AddHttpClient<ProductApiService>()', 'HttpClient vào constructor', 'Gom mọi URL vào một class'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Lỗi CORS khi API và Blazor WebAssembly khác cổng',
          text: 'Blazor WebAssembly gọi API từ trình duyệt, nên API phải bật CORS cho nguồn của Blazor: builder.Services.AddCors(o => o.AddPolicy("blazor", p => p.WithOrigins("https://localhost:7100").AllowAnyHeader().AllowAnyMethod())) và app.UseCors("blazor"). Blazor Server gọi từ máy chủ nên không gặp CORS.',
        },
      ],
    },
    {
      id: 'service',
      title: '3. ProductApiService — bọc toàn bộ CRUD',
      blocks: [
        {
          type: 'text',
          text: 'Component không nên chứa chuỗi URL hay đọc StatusCode. Ta gom vào ProductApiService: mỗi phương thức ứng với một route của API, trả về kiểu C# dễ dùng, và biến lỗi HTTP thành thông báo có nghĩa.',
        },
        {
          type: 'tabs',
          items: [
            {
              label: 'Đọc',
              hint: 'LayTatCaAsync · LayTheoIdAsync',
              blocks: [
                {
                  type: 'code',
                  sample: {
                    title: 'Services/ProductApiService.cs — phần đọc',
                    code: `using System.Net;
using System.Net.Http.Json;

public class ProductApiService
{
    private readonly HttpClient http;
    public ProductApiService(HttpClient http) => this.http = http;

    public async Task<List<SanPham>> LayTatCaAsync()
    {
        var ds = await http.GetFromJsonAsync<List<SanPham>>("api/ProductApi/getall");
        return ds ?? new List<SanPham>();
    }

    public async Task<SanPham?> LayTheoIdAsync(int id)
    {
        var res = await http.GetAsync($"api/ProductApi/get/{id}");
        if (res.StatusCode == HttpStatusCode.NotFound) return null;
        res.EnsureSuccessStatusCode();
        return await res.Content.ReadFromJsonAsync<SanPham>();
    }
}`,
                    note: 'GetFromJsonAsync ném HttpRequestException với mọi mã không phải 2xx, kể cả 404. Khi 404 là chuyện bình thường (id không tồn tại) thì dùng GetAsync và tự xét StatusCode.',
                  },
                },
              ],
            },
            {
              label: 'Ghi',
              hint: 'TaoAsync · CapNhatAsync · XoaAsync',
              blocks: [
                {
                  type: 'code',
                  sample: {
                    title: 'Services/ProductApiService.cs — phần ghi',
                    code: `public async Task<SanPham> TaoAsync(SanPham sp)
{
    var res = await http.PostAsJsonAsync("api/ProductApi/create", sp);
    await KiemTraAsync(res);
    return (await res.Content.ReadFromJsonAsync<SanPham>())!;
}

public async Task CapNhatAsync(int id, SanPham sp)
{
    var res = await http.PutAsJsonAsync($"api/ProductApi/update/{id}", sp);
    await KiemTraAsync(res);
}

public async Task<bool> XoaAsync(int id)
{
    var res = await http.DeleteAsync($"api/ProductApi/delete/{id}");
    if (res.StatusCode == HttpStatusCode.NotFound) return false;
    await KiemTraAsync(res);
    return true;
}`,
                    note: 'TaoAsync đọc lại body vì API trả sản phẩm kèm Id do máy chủ sinh. Nếu API của bạn trả 204 không có body thì bỏ dòng ReadFromJsonAsync, nếu không sẽ lỗi JSON rỗng.',
                  },
                },
              ],
            },
            {
              label: 'Xử lý lỗi',
              hint: 'KiemTraAsync · ApiException',
              blocks: [
                {
                  type: 'code',
                  sample: {
                    title: 'Biến mã lỗi HTTP thành thông báo',
                    code: `public class ApiException : Exception
{
    public HttpStatusCode MaLoi { get; }
    public ApiException(HttpStatusCode maLoi, string thongDiep) : base(thongDiep) => MaLoi = maLoi;
}

private static async Task KiemTraAsync(HttpResponseMessage res)
{
    if (res.IsSuccessStatusCode) return;

    string chiTiet = await res.Content.ReadAsStringAsync();
    string thongDiep = res.StatusCode switch
    {
        HttpStatusCode.BadRequest => "Dữ liệu không hợp lệ: " + chiTiet,
        HttpStatusCode.NotFound => "Không tìm thấy sản phẩm.",
        HttpStatusCode.Conflict => "Mã sản phẩm đã tồn tại.",
        HttpStatusCode.Unauthorized => "Bạn cần đăng nhập.",
        _ => $"Máy chủ lỗi ({(int)res.StatusCode}). Thử lại sau."
    };
    throw new ApiException(res.StatusCode, thongDiep);
}`,
                    note: 'Component chỉ cần catch ApiException để hiện ex.Message. Lỗi mất mạng / API tắt là HttpRequestException, hết thời gian là TaskCanceledException — hai loại này không có StatusCode.',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Mỗi tầng chỉ biết tầng ngay dưới nó',
            root: {
              label: 'DanhSachSanPham.razor', note: 'chỉ biết ProductApiService, bắt ApiException',
              children: [
                { label: 'ProductApiService', note: 'biết URL, StatusCode, JSON', highlight: true, children: [
                  { label: 'HttpClient', note: 'do IHttpClientFactory cấp, BaseAddress từ appsettings', children: [
                    { label: 'ProductApiController', note: 'GET getall · GET get/{id} · POST create · PUT update/{id} · DELETE delete/{id}' },
                  ] },
                ] },
              ],
            },
          },
        },
        {
          type: 'table',
          head: ['Mã', 'Ý nghĩa', 'Client nên làm'],
          rows: [
            ['200 OK / 201 Created', 'Thành công, có body', 'Đọc JSON'],
            ['204 No Content', 'Thành công, không body', 'Không gọi ReadFromJsonAsync'],
            ['400 Bad Request', 'Dữ liệu gửi lên sai', 'Hiện lỗi cạnh form, giữ dữ liệu người dùng đã nhập'],
            ['404 Not Found', 'Id không tồn tại hoặc sai URL', 'Hiện "không tìm thấy" — kiểm tra lại BaseAddress nếu mọi request đều 404'],
            ['500 Internal Server Error', 'API lỗi', 'Hiện thông báo chung, không lộ chi tiết'],
            ['(không có mã)', 'Mất mạng, API chưa chạy, timeout', 'Bắt HttpRequestException / TaskCanceledException, nút Thử lại'],
          ],
        },
      ],
    },
    {
      id: 'trang-thai',
      title: '4. Trạng thái đang tải, lỗi, rỗng trên giao diện',
      blocks: [
        {
          type: 'text',
          text: 'Gọi mạng luôn có độ trễ và có thể hỏng. Một trang gọi API tử tế phải có đủ bốn trạng thái: đang tải, lỗi (kèm nút thử lại), rỗng, và có dữ liệu. Thiếu trạng thái lỗi thì khi API tắt, trang Blazor Server hiện thanh vàng "An unhandled error has occurred" và circuit chết.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Luồng tải danh sách sản phẩm',
            steps: [
              { kind: 'start', text: 'OnInitializedAsync → TaiAsync()' },
              { kind: 'process', text: 'dangTai = true; loi = null' },
              { kind: 'process', text: 'await Api.LayTatCaAsync()' },
              { kind: 'decision', text: 'Có exception?', branches: [
                { label: 'Có', steps: [{ kind: 'io', text: 'loi = ex.Message → hiện cảnh báo + nút Thử lại' }] },
                { label: 'Không', steps: [{ kind: 'decision', text: 'danhSach.Count == 0 ?', branches: [
                  { label: 'Đúng', steps: [{ kind: 'io', text: '"Chưa có sản phẩm"' }] },
                  { label: 'Sai', steps: [{ kind: 'io', text: 'Hiện bảng' }] },
                ] }] },
              ] },
              { kind: 'end', text: 'finally: dangTai = false' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Pages/DanhSachSanPham.razor — markup',
            code: `@page "/san-pham"
@inject ProductApiService Api

@if (dangTai)
{
    <div class="spinner-border text-primary"></div> <span>Đang tải…</span>
}
else if (loi is not null)
{
    <div class="alert alert-danger">
        @loi <button class="btn btn-sm btn-outline-danger ms-2" @onclick="TaiAsync">Thử lại</button>
    </div>
}
else if (danhSach.Count == 0)
{
    <p>Chưa có sản phẩm. <a href="san-pham/them">Thêm sản phẩm đầu tiên</a></p>
}
else
{
    <table class="table">
        @foreach (var sp in danhSach)
        {
            <tr>
                <td>@sp.Ten</td><td>@sp.Gia.ToString("N0")</td>
                <td><button class="btn btn-sm btn-danger" disabled="@dangXoa" @onclick="() => XoaAsync(sp)">Xoá</button></td>
            </tr>
        }
    </table>
}`,
            note: 'disabled="@dangXoa" chặn người dùng bấm Xoá hai lần liên tiếp khi request đầu chưa về — lần hai sẽ nhận 404.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Pages/DanhSachSanPham.razor — @code',
            code: `@code {
    List<SanPham> danhSach = new();
    bool dangTai, dangXoa;
    string? loi;

    protected override Task OnInitializedAsync() => TaiAsync();

    async Task TaiAsync()
    {
        dangTai = true; loi = null;
        try { danhSach = await Api.LayTatCaAsync(); }
        catch (HttpRequestException) { loi = "Không kết nối được máy chủ API."; }
        catch (TaskCanceledException) { loi = "Máy chủ phản hồi quá lâu."; }
        finally { dangTai = false; }
    }

    async Task XoaAsync(SanPham sp)
    {
        dangXoa = true;
        try
        {
            if (await Api.XoaAsync(sp.Id)) danhSach.Remove(sp);
            else loi = "Sản phẩm đã bị xoá trước đó.";
        }
        catch (ApiException ex) { loi = ex.Message; }
        finally { dangXoa = false; }
    }
}`,
            note: 'Xoá thành công thì bỏ khỏi danhSach tại chỗ thay vì gọi lại getall — đỡ một request và trang không nháy. Thứ tự catch: ApiException kế thừa Exception chứ không kế thừa HttpRequestException nên đặt ở đâu cũng được.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Bắt lỗi trong component, không để exception thoát ra',
          text: 'Trên Blazor Server, exception không bắt trong handler @onclick hay OnInitializedAsync làm hỏng cả circuit — người dùng phải F5. Mọi lời gọi API trong component đều nằm trong try/catch.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Prerender gọi API hai lần',
          text: 'Như buổi 25: InteractiveServer có prerender thì OnInitializedAsync chạy hai lần, tức là gọi getall hai lần. Dữ liệu ít đổi thì dùng PersistentComponentState hoặc tắt prerender cho trang quản trị.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b27-1', level: 'Cơ bản', title: 'Đăng ký client và hiện danh sách',
      requirement: 'Cho API /api/ProductApi/getall đang chạy ở https://localhost:7001. Xây dựng ứng dụng Blazor đọc BaseUrl từ appsettings.json, đăng ký typed client ProductApiService và hiện danh sách sản phẩm dạng bảng.',
      signature: 'builder.Services.AddHttpClient<ProductApiService>(c => c.BaseAddress = new Uri(baseUrl))',
      constraints: ['Không có chuỗi "https://localhost" nào trong code C# hay .razor'],
      examples: [
        { input: 'API trả 3 sản phẩm', output: 'Bảng 3 dòng: tên, giá định dạng N0' },
        { input: 'BaseUrl thiếu dấu / cuối và đường dẫn bắt đầu bằng /', output: 'Vẫn chạy nếu API ở gốc, nhưng hỏng khi API đặt dưới thư mục con', explain: 'Uri ghép đường dẫn tuyệt đối "/api/..." sẽ bỏ phần thư mục của BaseAddress.' },
      ],
    },
    {
      id: 'b27-2', level: 'Cơ bản', title: 'Trạng thái đang tải và lỗi',
      requirement: 'Cho trang danh sách ở bài 1. Bổ sung đủ bốn trạng thái: đang tải (spinner), lỗi kèm nút Thử lại, rỗng, có dữ liệu. Kiểm chứng bằng cách tắt API rồi mở trang, bật API rồi bấm Thử lại.',
      signature: 'bool dangTai · string? loi · async Task TaiAsync()',
      examples: [
        { input: 'Tắt API, mở trang', output: '"Không kết nối được máy chủ API." + nút Thử lại; ứng dụng không hiện thanh lỗi vàng' },
        { input: 'Bật API, bấm Thử lại', output: 'Spinner rồi hiện bảng' },
      ],
    },
    {
      id: 'b27-3', level: 'Trung bình', title: 'ProductApiService đủ năm route',
      requirement: 'Cho ProductApiController có năm route theo slide trang 15. Xây dựng ProductApiService bọc đủ năm route, trả về kiểu C# thuận tiện và biến mã lỗi thành ApiException.',
      tasks: [
        'LayTatCaAsync() → GET api/ProductApi/getall, trả List<SanPham> (không bao giờ null)',
        'LayTheoIdAsync(int id) → GET api/ProductApi/get/{id}, 404 thì trả null',
        'TaoAsync(SanPham sp) → POST api/ProductApi/create, trả sản phẩm có Id',
        'CapNhatAsync(int id, SanPham sp) → PUT api/ProductApi/update/{id}',
        'XoaAsync(int id) → DELETE api/ProductApi/delete/{id}, trả false nếu 404',
        'KiemTraAsync: 400, 409, 500 thành ApiException với thông điệp tiếng Việt',
      ],
      signature: 'public class ProductApiService { public ProductApiService(HttpClient http) }',
      examples: [
        { input: 'LayTheoIdAsync(999)', output: 'null', explain: 'Không ném exception vì không tìm thấy là ca bình thường.' },
        { input: 'TaoAsync với Ten rỗng, API trả 400', output: 'ApiException MaLoi = BadRequest, Message bắt đầu "Dữ liệu không hợp lệ"' },
      ],
      visual: {
        kind: 'uml',
        caption: 'Typed client bọc HttpClient',
        children: [
          { name: 'ProductApiService', attrs: ['- HttpClient http'], methods: ['+ LayTatCaAsync()', '+ LayTheoIdAsync(id)', '+ TaoAsync(sp)', '+ CapNhatAsync(id, sp)', '+ XoaAsync(id)', '- KiemTraAsync(res)'] },
          { name: 'ApiException', stereotype: 'Exception', attrs: ['+ HttpStatusCode MaLoi'] },
        ],
      },
    },
    {
      id: 'b27-4', level: 'Trung bình', title: 'Trang chi tiết và xoá',
      requirement: 'Cho ProductApiService ở bài 3. Xây dựng trang /san-pham/{id:int} hiện chi tiết qua LayTheoIdAsync và nút Xoá có hộp xác nhận. Xoá xong chuyển về /san-pham.',
      tasks: [
        'Id không tồn tại: hiện "Không tìm thấy sản phẩm #id" và link về danh sách',
        'Nút Xoá hỏi xác nhận bằng một khối HTML ẩn/hiện (không dùng JS confirm)',
        'Trong lúc đang xoá: nút bị vô hiệu và hiện "Đang xoá…"',
        'Xoá trả false (đã bị người khác xoá): thông báo và vẫn chuyển về danh sách',
      ],
      signature: '@page "/san-pham/{id:int}" · OnParametersSetAsync',
      examples: [
        { input: '/san-pham/2 → Xoá → Đồng ý', output: 'DELETE api/ProductApi/delete/2 → 204, chuyển /san-pham, sản phẩm biến mất' },
        { input: '/san-pham/999', output: '"Không tìm thấy sản phẩm #999"' },
      ],
    },
    {
      id: 'b27-5', level: 'Trung bình', title: 'Form thêm và sửa dùng chung',
      requirement: 'Xây dựng một component FormSanPham dùng cho cả /san-pham/them (POST create) và /san-pham/{id:int}/sua (PUT update/{id}). Có DataAnnotations như buổi 22; lỗi 400 từ API hiện trên form mà không mất dữ liệu đã nhập.',
      signature: '<FormSanPham SanPham="sp" OnLuu="LuuAsync" /> · EditForm OnValidSubmit',
      constraints: ['Trang sửa tải dữ liệu cũ vào form trước', 'Nút Lưu vô hiệu khi đang gửi', 'Lưu thành công chuyển sang trang chi tiết'],
      examples: [
        { input: 'Thêm "Máy giặt Toshiba", giá 6.490.000', output: 'POST create → 201, chuyển /san-pham/7 (Id do API sinh)' },
        { input: 'Sửa giá thành -1 nhưng client chưa có [Range]', output: 'API trả 400 → hiện "Dữ liệu không hợp lệ: …" trên form, các ô vẫn giữ giá trị', explain: 'Kiểm tra ở client chỉ để tiện; API mới là lớp kiểm tra cuối cùng.' },
      ],
    },
    {
      id: 'b27-6', level: 'Nâng cao', title: 'Trang quản lý sản phẩm CRUD hoàn chỉnh',
      requirement: 'Cho API /api/ProductApi với năm route getall, get/{id}, create, update/{id}, delete/{id}. Xây dựng một trang /quan-ly-san-pham làm toàn bộ CRUD trên một màn hình qua ProductApiService.',
      tasks: [
        'Bảng danh sách có ô tìm theo tên (lọc ở client) và sắp theo giá',
        'Nút Thêm mở form ngay trên trang; lưu xong thêm dòng mới vào bảng không gọi lại getall',
        'Nút Sửa trên mỗi dòng nạp dữ liệu vào form (gọi get/{id} để lấy bản mới nhất)',
        'Nút Xoá có xác nhận; xoá xong bỏ dòng khỏi bảng',
        'Một vùng thông báo chung hiện kết quả thành công / lỗi, tự ẩn sau 3 giây',
        'Đủ trạng thái đang tải, lỗi kết nối kèm Thử lại, rỗng',
      ],
      signature: '@page "/quan-ly-san-pham" · @inject ProductApiService Api',
      constraints: ['Không có HttpClient hay chuỗi URL nào trong file .razor', 'Mọi lời gọi API trong try/catch', 'Không cho bấm hai thao tác ghi cùng lúc'],
      examples: [
        { input: 'Thêm "Lò vi sóng Sharp" 1.990.000', output: 'Bảng thêm một dòng, thông báo "Đã thêm sản phẩm"; Network chỉ có một request POST' },
        { input: 'Sửa sản phẩm đã bị người khác xoá', output: 'get/{id} trả 404 → thông báo "Sản phẩm không còn tồn tại", bỏ dòng khỏi bảng', explain: 'Gọi get/{id} trước khi sửa giúp phát hiện dữ liệu cũ.' },
        { input: 'Tắt API rồi bấm Xoá', output: '"Không kết nối được máy chủ API.", dòng vẫn còn trong bảng' },
      ],
      visual: {
        kind: 'flow',
        caption: 'Bấm Lưu trên form thêm / sửa',
        steps: [
          { kind: 'start', text: 'OnValidSubmit → LuuAsync()' },
          { kind: 'process', text: 'dangGui = true' },
          { kind: 'decision', text: 'dangSua.Id > 0 ?', branches: [
            { label: 'Đúng', steps: [{ kind: 'process', text: 'CapNhatAsync(id, sp) → thay dòng trong bảng' }] },
            { label: 'Sai', steps: [{ kind: 'process', text: 'TaoAsync(sp) → thêm dòng trả về' }] },
          ] },
          { kind: 'decision', text: 'ApiException / HttpRequestException?', branches: [
            { label: 'Có', steps: [{ kind: 'io', text: 'Hiện lỗi, giữ form' }] },
            { label: 'Không', steps: [{ kind: 'io', text: 'Thông báo thành công, đóng form' }] },
          ] },
          { kind: 'end', text: 'finally: dangGui = false' },
        ],
      },
      dense: true,
      hint: 'Tách thành component con: BangSanPham, FormSanPham, HopThongBao. Trang cha giữ danhSach và gọi Api; con chỉ nhận Parameter và báo lên bằng EventCallback.',
    },
    {
      id: 'b27-7', level: 'Nâng cao', title: 'Đổi kho bộ nhớ sang kho API',
      requirement: 'Cho interface IKhoSanPham và KhoSanPhamBoNho ở buổi 26. Xây dựng KhoSanPhamApi : IKhoSanPham dùng HttpClient gọi /api/ProductApi, rồi đổi đăng ký trong Program.cs mà không sửa bất kỳ component nào.',
      tasks: [
        'KhoSanPhamApi cài đủ các phương thức của IKhoSanPham bằng năm route API',
        'Đăng ký AddHttpClient<IKhoSanPham, KhoSanPhamApi>(...)',
        'Giữ được trang giỏ hàng, danh sách, chi tiết của buổi 26 chạy như cũ',
        'Ghi lại các chỗ phải sửa nếu interface cũ không trả Task',
      ],
      signature: 'builder.Services.AddHttpClient<IKhoSanPham, KhoSanPhamApi>(c => c.BaseAddress = …)',
      examples: [
        { input: 'Thêm sản phẩm ở trang quản lý', output: 'Mở tab khác vẫn thấy sản phẩm mới', explain: 'Dữ liệu nằm ở API dùng chung, không còn trong bộ nhớ Singleton của Blazor.' },
        { input: 'git diff sau khi đổi', output: 'Chỉ có KhoSanPhamApi.cs mới và một dòng Program.cs' },
      ],
      hint: 'Đây là DIP ở buổi 15 trong thực tế: component phụ thuộc IKhoSanPham, nên thay chi tiết bên dưới không ảnh hưởng bên trên.',
    },
    {
      id: 'b27-8', level: 'Nâng cao', title: 'Thử lại tự động và huỷ request',
      requirement: 'Cho API thỉnh thoảng trả 503 khi quá tải. Xây dựng LayTatCaAsync có thử lại tối đa 3 lần với thời gian chờ tăng dần, và ô tìm kiếm sản phẩm gọi API theo từ khoá có huỷ request cũ khi người dùng gõ tiếp.',
      tasks: [
        'Thử lại khi 503 hoặc HttpRequestException, chờ 500ms, 1s, 2s; quá 3 lần thì ném lỗi',
        'Không thử lại với 400 và 404',
        'Ô tìm kiếm đợi 300ms sau phím cuối mới gọi api/ProductApi/getall?keyword=…',
        'Mỗi lần gọi mới huỷ CancellationTokenSource của lần trước',
        'Rời trang thì huỷ request đang chạy (IDisposable)',
      ],
      signature: 'Task<List<SanPham>> LayTatCaAsync(string? keyword, CancellationToken ct)',
      examples: [
        { input: 'API trả 503, 503, 200', output: 'Trả danh sách sau khoảng 1,5 giây, người dùng chỉ thấy spinner' },
        { input: 'Gõ "tu" rồi "tu lanh" trong 200ms', output: 'Chỉ một request với keyword=tu lanh được hoàn tất', explain: 'Request "tu" bị huỷ, nếu không kết quả cũ về muộn có thể ghi đè kết quả mới.' },
      ],
      visual: {
        kind: 'flow',
        caption: 'Thử lại có giới hạn',
        steps: [
          { kind: 'start', text: 'lan = 1' },
          { kind: 'process', text: 'Gửi GET' },
          { kind: 'decision', text: 'Thành công?', branches: [
            { label: 'Đúng', steps: [{ kind: 'end', text: 'Trả dữ liệu' }] },
            { label: 'Sai', steps: [{ kind: 'decision', text: 'Lỗi tạm thời và lan < 3 ?', branches: [
              { label: 'Đúng', steps: [{ kind: 'process', text: 'await Task.Delay(500 * 2^(lan-1), ct); lan++ → gửi lại' }] },
              { label: 'Sai', steps: [{ kind: 'io', text: 'Ném ApiException' }] },
            ] }] },
          ] },
        ],
      },
      hint: 'Thực tế dùng gói Microsoft.Extensions.Http.Resilience: AddHttpClient<…>().AddStandardResilienceHandler(). Tự viết vòng lặp một lần để hiểu nó làm gì.',
    },
  ],
}

export default buoi27
