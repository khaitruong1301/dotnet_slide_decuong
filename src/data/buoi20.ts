import type { Buoi } from './types'

const buoi20: Buoi = {
  id: 20,
  slug: 'blazor-tong-quan-va-du-an-dau-tien',
  title: 'Blazor — Tổng quan & dự án đầu tiên',
  subtitle: 'Viết giao diện web bằng C# thay cho JavaScript: Blazor chạy ở đâu, dự án gồm gì, trang đầu tiên hiện ra sao',
  duration: '3 giờ',
  keywords: ['Blazor Server', 'Blazor WebAssembly', 'SignalR', 'component', 'App.razor', 'MainLayout', 'dotnet new'],
  goals: [
    'Phân biệt Blazor Server và Blazor WebAssembly, chọn đúng cho bài toán',
    'Tạo, chạy và đọc hiểu từng file trong dự án Blazor mặc định',
    'Giải thích đường đi của một lần bấm nút trong Blazor Server qua SignalR',
    'Viết component đầu tiên và gắn vào layout',
  ],

  sections: [
    {
      id: 'blazor-la-gi',
      title: '1. Blazor là gì và chạy ở đâu',
      blocks: [
        {
          type: 'text',
          text: 'Blazor là framework của .NET để xây giao diện web bằng C# và Razor thay vì JavaScript. Giao diện ghép từ các component: mỗi component là một file .razor gồm HTML và C#. Điểm khác biệt lớn nhất so với web truyền thống là code C# của bạn chạy ở đâu — và có hai câu trả lời.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Hai mô hình hosting — khoá này dùng Blazor Server kết hợp Web API',
            columns: [
              { title: 'Blazor Server', tone: 'good', items: ['C# chạy trên máy chủ', 'Trình duyệt chỉ nhận HTML đã render qua SignalR (WebSocket)', 'Tải trang nhanh, truy cập thẳng database được', 'Cần kết nối liên tục; mỗi người dùng tốn RAM máy chủ'] },
              { title: 'Blazor WebAssembly', tone: 'plain', items: ['C# biên dịch, tải về và chạy trong trình duyệt', 'Lần đầu tải vài MB runtime', 'Chạy offline được, không tốn máy chủ', 'Phải gọi API cho mọi dữ liệu'] },
              { title: 'Blazor Web App (.NET 8+)', tone: 'plain', items: ['Gộp cả hai, chọn render mode từng component', 'Static SSR → Server → WASM', 'Linh hoạt nhưng nhiều khái niệm hơn'] },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Blazor Server: một lần bấm nút đi vòng qua máy chủ rồi chỉ phần thay đổi quay về',
            actors: ['Trình duyệt', 'Máy chủ Blazor'],
            steps: [
              { from: 0, to: 1, text: 'GET / — tải trang lần đầu' },
              { from: 1, to: 0, text: 'HTML render sẵn + blazor.server.js', dashed: true },
              { from: 0, to: 1, text: 'Mở kết nối SignalR (circuit)' },
              { from: 0, to: 1, text: 'Sự kiện: bấm nút "Thêm"' },
              { from: 1, to: 1, text: 'Chạy C# của component, render lại cây' },
              { from: 1, to: 0, text: 'Chỉ gửi phần DOM khác đi (diff)', dashed: true },
              { from: 0, to: 0, text: 'Vá DOM — người dùng thấy số đổi' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Circuit',
          text: 'Mỗi tab trình duyệt mở một circuit: một phiên kết nối SignalR và một bản trạng thái component sống trên máy chủ. Đóng tab là circuit chết, biến trong @code mất theo. Đó là lý do buổi 28 cần localStorage để giữ lại thứ cần nhớ.',
        },
        {
          type: 'table',
          head: ['Tiêu chí', 'Web API + JS (React, Vue)', 'Blazor Server'],
          rows: [
            ['Ngôn ngữ giao diện', 'JavaScript / TypeScript', 'C#'],
            ['Dùng lại code', 'Model viết hai lần (C# và TS)', 'Một class dùng cả hai đầu'],
            ['Lần tải đầu', 'Tải bundle JS', 'HTML sẵn, rất nhanh'],
            ['Khi mất mạng', 'Giao diện vẫn bấm được', 'Hiện "Attempting to reconnect"'],
            ['Phù hợp', 'Web công cộng lớn', 'Ứng dụng nội bộ, quản trị, đội toàn .NET'],
          ],
        },
      ],
    },
    {
      id: 'tao-du-an',
      title: '2. Tạo dự án và chạy',
      blocks: [
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Tạo và chạy dự án Blazor Server',
            code: `dotnet --version                       # cần .NET 8 trở lên
dotnet new blazorserver -o DienMayWeb   # .NET 8: dotnet new blazor -o DienMayWeb --interactivity Server
cd DienMayWeb
dotnet watch                            # chạy + tự tải lại khi sửa file
# mở https://localhost:5001 (cổng in ra ở terminal)`,
            note: 'dotnet watch thay cho dotnet run khi đang phát triển: sửa file .razor, lưu, trình duyệt tự cập nhật. Lần đầu chạy sẽ hỏi tin cậy chứng chỉ HTTPS — chọn Yes.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Cấu trúc dự án Blazor Server mặc định — ba file quan trọng nhất được tô sáng',
            root: {
              label: 'DienMayWeb/',
              children: [
                { label: 'Program.cs', note: 'điểm vào: đăng ký service, middleware, map Blazor hub', highlight: true },
                { label: 'App.razor', note: 'router: URL nào → component nào, layout nào', highlight: true },
                { label: '_Imports.razor', note: 'using chung cho mọi .razor' },
                { label: 'appsettings.json', note: 'cấu hình: connection string, logging' },
                { label: 'Pages/', children: [{ label: '_Host.cshtml', note: 'trang HTML gốc nhúng <component> và blazor.server.js' }, { label: 'Index.razor', note: '@page "/"' }, { label: 'Counter.razor', note: '@page "/counter"' }, { label: 'FetchData.razor' }] },
                { label: 'Shared/', children: [{ label: 'MainLayout.razor', note: 'khung chung: sidebar + @Body', highlight: true }, { label: 'NavMenu.razor', note: 'menu trái' }] },
                { label: 'Data/', note: 'service mẫu WeatherForecastService' },
                { label: 'wwwroot/', children: [{ label: 'css/', note: 'bootstrap, site.css' }, { label: 'favicon.ico' }] },
              ],
            },
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Program.cs — đọc từng dòng',
            code: `var builder = WebApplication.CreateBuilder(args);

// 1. Đăng ký service (Dependency Injection — buổi 15 và 26)
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();
builder.Services.AddSingleton<WeatherForecastService>();

var app = builder.Build();

// 2. Pipeline middleware — thứ tự quan trọng (buổi 40)
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();          // phục vụ wwwroot
app.UseRouting();

// 3. Điểm cuối: hub SignalR của Blazor và trang gốc _Host
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();`,
            note: 'Hai nửa: trước Build() là đăng ký "có những gì" (services), sau Build() là "request đi qua những gì" (middleware). MapFallbackToPage: URL nào không khớp file tĩnh thì đưa cho _Host, và _Host giao cho router Blazor.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'App.razor — bộ định tuyến',
            code: `<Router AppAssembly="@typeof(App).Assembly">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)" />
        <FocusOnNavigate RouteData="@routeData" Selector="h1" />
    </Found>
    <NotFound>
        <PageTitle>Not found</PageTitle>
        <LayoutView Layout="@typeof(MainLayout)">
            <p role="alert">Không có trang nào ở địa chỉ này.</p>
        </LayoutView>
    </NotFound>
</Router>`,
            note: 'Router quét mọi component có @page trong assembly. URL khớp thì render component đó bên trong MainLayout; không khớp thì render khối NotFound. Buổi 24 nói kỹ về routing.',
          },
        },
      ],
    },
    {
      id: 'component-dau-tien',
      title: '3. Component đầu tiên và layout',
      blocks: [
        {
          type: 'text',
          text: 'Mỗi file .razor là một component, cũng là một class C# có tên trùng tên file. Component có @page là một trang mở được bằng URL; không có @page thì chỉ dùng được như một thẻ bên trong component khác.',
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Pages/SanPham.razor — trang đầu tiên tự viết',
            code: `@page "/san-pham"

<PageTitle>Sản phẩm — Điện máy</PageTitle>

<h1>Danh sách sản phẩm</h1>
<p>Hiện có @soLuong sản phẩm. Giờ máy chủ: @DateTime.Now.ToString("HH:mm:ss")</p>

<TheSanPham />
<TheSanPham />

@code {
    int soLuong = 2;
}`,
            note: '<TheSanPham /> là component con: Blazor tìm file TheSanPham.razor cùng namespace (nhờ _Imports.razor). Viết hoa chữ đầu để phân biệt với thẻ HTML thường.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Shared/TheSanPham.razor — component con, chưa có tham số',
            code: `<div class="card" style="width: 18rem">
    <div class="card-body">
        <h5 class="card-title">Tivi Samsung 55 inch</h5>
        <p class="card-text text-danger fw-bold">12.000.000 đ</p>
        <button class="btn btn-primary">Thêm vào giỏ</button>
    </div>
</div>`,
            note: 'Hiện tại hai thẻ in giống hệt nhau vì dữ liệu cứng. Buổi 23 thêm [Parameter] để mỗi thẻ nhận một sản phẩm khác.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Cây component khi mở /san-pham — layout bọc ngoài, trang ở giữa, thẻ con bên trong',
            root: {
              label: 'App (Router)',
              children: [
                {
                  label: 'MainLayout', note: 'sidebar + vùng @Body',
                  children: [
                    { label: 'NavMenu', note: 'menu trái' },
                    { label: 'SanPham', note: '@page "/san-pham" — đổ vào @Body', highlight: true, children: [{ label: 'TheSanPham' }, { label: 'TheSanPham' }] },
                  ],
                },
              ],
            },
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Shared/MainLayout.razor — @Body là chỗ trang hiện tại đổ vào',
            code: `@inherits LayoutComponentBase

<div class="page">
    <div class="sidebar">
        <NavMenu />
    </div>

    <main>
        <div class="top-row px-4">
            <a href="https://cybersoft.edu.vn" target="_blank">Cybersoft</a>
        </div>

        <article class="content px-4">
            @Body
        </article>
    </main>
</div>`,
            note: 'Layout cũng là component, kế thừa LayoutComponentBase để có property Body. Mọi trang dùng chung layout này nhờ DefaultLayout trong App.razor. Thêm liên kết vào NavMenu.razor để menu có mục "Sản phẩm".',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Shared/NavMenu.razor — thêm một mục menu',
            code: `<div class="nav-item px-3">
    <NavLink class="nav-link" href="san-pham">
        <span class="oi oi-list-rich" aria-hidden="true"></span> Sản phẩm
    </NavLink>
</div>`,
            note: 'NavLink là component sẵn của Blazor: giống thẻ a nhưng tự thêm class active khi URL khớp href. Tất cả HTML và Bootstrap ở ba buổi trước dùng nguyên trong đây.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Từ gõ URL tới thấy trang — nối các file lại',
            steps: [
              { kind: 'start', text: 'Trình duyệt mở /san-pham' },
              { kind: 'process', text: 'Program.cs: không phải file tĩnh → MapFallbackToPage("/_Host")' },
              { kind: 'process', text: '_Host.cshtml render <component type="App"> + nhúng blazor.server.js' },
              { kind: 'process', text: 'App.razor: Router tìm component có @page "/san-pham" → SanPham.razor' },
              { kind: 'process', text: 'RouteView đặt SanPham vào @Body của MainLayout' },
              { kind: 'process', text: 'SanPham render, bên trong render 2 TheSanPham' },
              { kind: 'end', text: 'HTML gửi về; blazor.server.js mở SignalR chờ sự kiện' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Ba lỗi ngày đầu',
          text: 'Component không hiện: thiếu @page hoặc gõ sai đường dẫn (phân biệt hoa thường không, nhưng dấu / đầu bắt buộc). Thẻ con báo "not found": tên file khác tên thẻ hoặc thiếu @using namespace trong _Imports. Sửa code mà trình duyệt không đổi: đang chạy dotnet run thay vì dotnet watch, hoặc lỗi biên dịch đang hiện ở terminal.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b20-1', level: 'Cơ bản', title: 'Chọn mô hình hosting',
      requirement: 'Cho 4 tình huống: (a) trang quản trị kho nội bộ 30 người dùng, đội toàn .NET; (b) ứng dụng ghi chú chạy được khi mất mạng; (c) trang bán hàng công cộng cần SEO và tải nhanh; (d) dashboard realtime hiện số đơn mới. Với mỗi tình huống chọn Blazor Server hay WebAssembly và nêu một lý do.',
      signature: 'Bốn lựa chọn + lý do',
      examples: [
        { input: '(a)', output: 'Server — ít người dùng, truy cập database trực tiếp, tải nhanh' },
        { input: '(b)', output: 'WebAssembly — chạy trong trình duyệt, không cần kết nối liên tục' },
        { input: '(d)', output: 'Server — đã có sẵn kênh SignalR đẩy dữ liệu xuống' },
      ],
    },
    {
      id: 'b20-2', level: 'Cơ bản', title: 'Tạo dự án và đọc cấu trúc',
      requirement: 'Tạo dự án DienMayWeb bằng dotnet CLI, chạy bằng dotnet watch, mở Counter và bấm nút. Sau đó mở DevTools → Network → WS, bấm nút lần nữa và mô tả bạn thấy gì. Liệt kê 5 file và vai trò của chúng.',
      signature: 'Ảnh chụp + bảng 5 file',
      examples: [
        { input: 'Bấm nút Counter khi mở tab WS', output: 'Một frame đi lên (sự kiện click) và một frame đi xuống (diff DOM), không có request HTTP mới', explain: 'Đó là circuit SignalR đang làm việc.' },
      ],
    },
    {
      id: 'b20-3', level: 'Cơ bản', title: 'Trang Giới thiệu',
      requirement: 'Thêm trang GioiThieu.razor ở URL /gioi-thieu gồm h1, một đoạn giới thiệu cửa hàng, và dòng "Năm nay là @DateTime.Now.Year". Thêm mục menu "Giới thiệu" vào NavMenu, bấm vào thì mục đó sáng (active).',
      signature: '@page "/gioi-thieu" + NavLink href="gioi-thieu"',
      examples: [
        { input: 'Mở /gioi-thieu', output: 'Trang hiện trong layout, menu "Giới thiệu" có class active' },
        { input: 'Mở /gioithieu (không gạch)', output: 'Khối NotFound của App.razor hiện ra' },
      ],
    },
    {
      id: 'b20-4', level: 'Trung bình', title: 'Component thẻ sản phẩm và trang danh sách',
      requirement: 'Tạo component TheSanPham.razor (chưa có tham số) dựng bằng Bootstrap card. Tạo trang /san-pham hiện tiêu đề, dòng đếm số sản phẩm từ biến trong @code, và lưới Bootstrap row/col chứa 3 TheSanPham. Thêm mục menu.',
      signature: 'Pages/SanPham.razor + Shared/TheSanPham.razor',
      constraints: ['TheSanPham không có @page', 'Dùng col-12 col-md-6 col-lg-4 cho mỗi thẻ'],
      examples: [
        { input: 'Mở /san-pham trên màn hình rộng', output: '3 card một hàng, giống hệt nhau' },
        { input: 'Đổi biến soLuong thành 5 rồi lưu', output: 'dotnet watch tải lại, dòng đếm hiện 5 nhưng vẫn chỉ 3 card', explain: 'Số card do markup quyết định, buổi 21 sẽ sinh bằng @foreach.' },
      ],
      visual: {
        kind: 'tree',
        caption: 'Cây component',
        root: { label: 'MainLayout', children: [{ label: 'NavMenu' }, { label: 'SanPham', highlight: true, children: [{ label: 'TheSanPham ×3' }] }] },
      },
    },
    {
      id: 'b20-5', level: 'Trung bình', title: 'Vẽ sơ đồ tuần tự của Counter',
      requirement: 'Vẽ sơ đồ tuần tự (trình duyệt, máy chủ) cho toàn bộ quá trình: mở /counter lần đầu, bấm nút hai lần, rồi tắt mạng và bấm nút lần ba. Ghi rõ bước nào là HTTP, bước nào là SignalR, và chuyện gì xảy ra ở lần bấm thứ ba.',
      signature: 'Sơ đồ tuần tự + 1 đoạn giải thích',
      examples: [
        { input: 'Lần bấm thứ ba khi mất mạng', output: 'Sự kiện không tới được máy chủ; sau vài giây Blazor hiện lớp phủ "Attempting to reconnect"; có mạng lại thì nối tiếp circuit cũ nếu chưa hết hạn', explain: 'Trạng thái currentCount nằm trên máy chủ, không phải trong trình duyệt.' },
      ],
    },
    {
      id: 'b20-6', level: 'Trung bình', title: 'Layout thứ hai cho trang đăng nhập',
      requirement: 'Tạo Shared/TrangTrongLayout.razor không có sidebar, chỉ căn giữa @Body. Tạo trang /dang-nhap dùng layout này bằng @layout TrangTrongLayout, bên trong đặt form đăng nhập Bootstrap của buổi 18 (chưa cần xử lý).',
      signature: '@inherits LayoutComponentBase + @layout TrangTrongLayout',
      constraints: ['Các trang khác vẫn dùng MainLayout', 'Layout mới phải có @Body'],
      examples: [
        { input: 'Mở /dang-nhap', output: 'Không có sidebar, form nằm giữa màn hình' },
        { input: 'Mở /san-pham', output: 'Vẫn có sidebar như cũ' },
      ],
      hint: '@layout chỉ áp cho component có dòng đó; DefaultLayout trong App.razor là mặc định cho các trang còn lại.',
    },
    {
      id: 'b20-7', level: 'Nâng cao', title: 'Thêm Blazor vào dự án Web API có sẵn',
      requirement: 'Cho một dự án dotnet new webapi. Thêm Blazor Server vào theo 5 bước trong slide: cài package Components.Web, Components.Server; thêm AddServerSideBlazor và MapBlazorHub vào Program.cs; tạo Pages/_Host.cshtml, App.razor, Shared/MainLayout.razor, _Imports.razor; chạy được cả Swagger lẫn trang Blazor.',
      signature: 'dotnet add package … + Program.cs + 4 file razor',
      constraints: ['Swagger vẫn mở ở /swagger', 'MapFallbackToPage phải đặt sau MapControllers'],
      examples: [
        { input: 'Mở /swagger', output: 'Trang Swagger của API' },
        { input: 'Mở /', output: 'Trang Blazor trong MainLayout' },
        { input: 'Mở /api/users/getall', output: 'JSON từ controller, không bị _Host nuốt', explain: 'Fallback chỉ nhận request không khớp route nào khác.' },
      ],
      hint: 'Thứ tự trong Program.cs: app.MapControllers(); app.MapBlazorHub(); app.MapFallbackToPage("/_Host"); — đổi thứ tự là API bị trang Blazor chặn mất. Mã nguồn tham khảo: github.com/khaitruong1301/dotnet_v8_blazor.',
    },
    {
      id: 'b20-8', level: 'Nâng cao', title: 'Đo chi phí circuit',
      requirement: 'Mở 5 tab cùng trang Counter, bấm nút ở từng tab, quan sát giá trị mỗi tab. Giải thích vì sao mỗi tab đếm riêng. Sau đó thêm vào Counter một field static int tongBamToanServer tăng mỗi lần bấm và hiện lên trang — mở 2 tab bấm xen kẽ, mô tả hiện tượng và giải thích static sống ở đâu.',
      signature: 'Quan sát + giải thích',
      examples: [
        { input: '5 tab, mỗi tab bấm 1 lần', output: 'Mỗi tab hiện 1 — 5 circuit, 5 instance Counter riêng' },
        { input: 'Thêm static, tab A bấm 1, tab B bấm 1, tab A bấm 1', output: 'tongBamToanServer ở tab A hiện 3 (chỉ cập nhật khi tab A render lại), tab B hiện 2 cho tới khi nó render lại', explain: 'static thuộc về tiến trình máy chủ, chung cho mọi người dùng — nguy hiểm cho dữ liệu riêng tư. Buổi 26 nói về vòng đời service thay cho static.' },
      ],
    },
  ],
}

export default buoi20
