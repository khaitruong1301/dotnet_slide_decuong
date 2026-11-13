import type { InterviewSet } from '../types'

const blazor: InterviewSet = {
  slug: 'blazor',
  title: 'Phỏng vấn: Blazor',
  subtitle: 'Component, binding, sự kiện, vòng đời, DI, routing, HttpClient, JS interop, xác thực, SignalR, triển khai',
  from: 20,
  to: 31,
  questions: [
    // ───────────────────────────── Cơ bản ─────────────────────────────
    {
      id: 'pv-bz-01',
      level: 'Cơ bản',
      question: 'Blazor Server và Blazor WebAssembly khác nhau thế nào? Khi nào chọn cái nào?',
      short: 'Blazor Server chạy C# trên máy chủ, trình duyệt chỉ nhận phần DOM thay đổi qua kết nối SignalR; Blazor WebAssembly tải runtime .NET về và chạy C# ngay trong trình duyệt. Server hợp ứng dụng nội bộ cần mở nhanh, truy cập thẳng CSDL; WebAssembly hợp ứng dụng nhiều thao tác, cần chạy offline, không muốn tốn tài nguyên máy chủ. Từ .NET 8, Blazor Web App cho chọn render mode theo từng trang.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Ba mô hình — khoá học dùng Blazor Server kết hợp Web API',
            columns: [
              { title: 'Blazor Server', tone: 'good', items: ['C# chạy trên máy chủ', 'UI cập nhật qua SignalR (circuit)', 'Mở trang nhanh, gọi thẳng service/CSDL', 'Cần kết nối liên tục, mỗi tab tốn RAM máy chủ'] },
              { title: 'Blazor WebAssembly', tone: 'plain', items: ['C# chạy trong trình duyệt', 'Lần đầu tải runtime vài MB', 'Chạy offline, máy chủ chỉ phục vụ file tĩnh', 'Mọi dữ liệu phải qua Web API'] },
              { title: 'Blazor Web App (.NET 8+)', tone: 'plain', items: ['Chọn @rendermode từng trang', 'Static SSR · InteractiveServer', 'InteractiveWebAssembly · InteractiveAuto', 'Linh hoạt nhưng nhiều khái niệm hơn'] },
            ],
          },
        },
        {
          type: 'table',
          head: ['Tiêu chí', 'Blazor Server', 'Blazor WebAssembly'],
          rows: [
            ['Lần tải đầu', 'Nhanh: HTML render sẵn + một file JS nhỏ', 'Chậm hơn: tải runtime .NET và các DLL'],
            ['Mỗi thao tác', 'Đi vòng qua mạng tới máy chủ (có độ trễ)', 'Xử lý ngay trên máy người dùng'],
            ['Truy cập dữ liệu', 'Inject service, gọi CSDL trực tiếp', 'Bắt buộc gọi Web API, có thể gặp CORS'],
            ['Khi mất mạng', 'Hiện "Attempting to reconnect", không bấm được', 'Vẫn chạy, chỉ lỗi khi gọi API'],
            ['Bí mật trong code', 'Nằm trên máy chủ, an toàn', 'DLL tải về máy khách, dịch ngược được'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Trả lời theo tiêu chí, đừng chỉ liệt kê',
          text: 'Nêu các yếu tố quyết định: số người dùng đồng thời (Server tốn RAM theo circuit), độ trễ mạng, nhu cầu offline, có cần SEO không (Static SSR), có bí mật phải giữ trên máy chủ không. Rồi kết luận bằng ví dụ: trang giới thiệu dùng Static SSR, trang quản trị nội bộ dùng InteractiveServer.',
        },
      ],
      followUps: [
        'Render mode InteractiveAuto hoạt động ra sao?',
        'Vì sao không được để connection string hay API key trong project Blazor WebAssembly?',
        'Blazor Server chịu được bao nhiêu người dùng đồng thời, phụ thuộc vào gì?',
      ],
      buoi: [20, 25],
    },
    {
      id: 'pv-bz-02',
      level: 'Cơ bản',
      question: 'Component trong Blazor là gì? Một file .razor gồm những phần nào?',
      short: 'Component là một class C# được sinh từ file .razor: phần markup HTML trộn C# theo cú pháp Razor và khối @code chứa trạng thái, hàm xử lý sự kiện. Có @page thì nó là một trang được router định tuyến; không có thì là component con, dùng như một thẻ <TenComponent />.',
      answer: [
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Pages/GioHang.razor — đủ các phần của một component',
            code: `@page "/gio-hang"                        @* có @page → là một trang *@
@using DienMay.Models

<h3>Giỏ hàng (@dong.Count món)</h3>

@if (dong.Count == 0)
{
    <p>Giỏ trống.</p>
}
else
{
    @foreach (var d in dong)
    {
        <DongGioHang Dong="d" />            @* component con dùng như thẻ HTML *@
    }
}
<button class="btn btn-danger" @onclick="XoaHet">Xoá hết</button>

@code {
    List<ChiTietDonHang> dong = new();

    void XoaHet() => dong.Clear();          // đổi dữ liệu → Blazor tự render lại
}`,
            note: 'File .razor được biên dịch thành partial class kế thừa ComponentBase. Muốn tách C# ra riêng thì tạo GioHang.razor.cs (code-behind) với public partial class GioHang.',
          },
        },
        {
          type: 'table',
          head: ['Cú pháp', 'Ý nghĩa'],
          rows: [
            ['@page "/url"', 'Đăng ký route cho router'],
            ['@bien, @(a + b)', 'In giá trị C# ra HTML (tự mã hoá HTML)'],
            ['@if / @foreach', 'Render có điều kiện, lặp danh sách'],
            ['@onclick="Ham" / @onclick="() => Xoa(sp)"', 'Gắn sự kiện; lambda khi cần truyền tham số'],
            ['@inject, @using, @implements', 'Nhận service, nhập namespace, cài interface (IDisposable)'],
            ['@code { }', 'Field, property, [Parameter], phương thức vòng đời'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Mô hình tư duy: giao diện là hàm của trạng thái',
            steps: [
              { kind: 'start', text: 'Trạng thái trong @code (dong, tuKhoa…)' },
              { kind: 'process', text: 'BuildRenderTree dựng cây render từ markup' },
              { kind: 'io', text: 'Trình duyệt hiện HTML' },
              { kind: 'process', text: 'Người dùng bấm → handler đổi trạng thái' },
              { kind: 'process', text: 'Render lại, so khác biệt với cây cũ (diff)' },
              { kind: 'end', text: 'Chỉ vá phần DOM thay đổi' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Ba lỗi ngày đầu',
          text: 'Tên component phải viết hoa chữ đầu (chữ thường bị coi là thẻ HTML). Namespace của thư mục chứa component phải có trong _Imports.razor, nếu không thẻ <DongGioHang> chỉ là thẻ lạ, không render gì. Viết @onclick="Xoa(sp)" là gọi hàm ngay khi render — phải là @onclick="() => Xoa(sp)".',
        },
      ],
      followUps: [
        'Code-behind (.razor.cs) khác khối @code thế nào?',
        '@onclick="Ham" khác @onclick="() => Ham()" ra sao?',
      ],
      buoi: [20, 21],
    },
    {
      id: 'pv-bz-03',
      level: 'Cơ bản',
      question: '@bind hoạt động thế nào? @bind:event và @bind:after dùng khi nào?',
      short: '@bind là đường tắt cho cặp value + onchange: biến đổi thì ô nhập đổi, người dùng sửa ô thì biến được gán, có tự chuyển kiểu (int, decimal, DateTime, bool, enum). Mặc định gán khi rời ô; @bind:event="oninput" để gán theo từng phím; @bind:after (.NET 7+) chạy thêm một hàm sau khi biến đã nhận giá trị mới.',
      answer: [
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Các dạng @bind hay gặp',
            code: `@* 1. Mặc định: gán khi rời ô (sự kiện onchange) *@
<input class="form-control" @bind="kh.HoTen" />

@* 2. Gán theo từng phím — ô tìm kiếm, đếm ký tự *@
<input class="form-control" @bind="tuKhoa" @bind:event="oninput" />

@* 3. Gán xong thì lọc lại danh sách *@
<input class="form-control" @bind="tuKhoa" @bind:event="oninput" @bind:after="LocAsync" />

@* 4. Định dạng ngày *@
<input class="form-control" @bind="kh.NgaySinh" @bind:format="dd/MM/yyyy" />

@* 5. Input component trong EditForm dùng @bind-Value *@
<InputText class="form-control" @bind-Value="kh.Email" />`,
            note: 'Gõ chữ vào ô gắn với biến int: parse thất bại, biến giữ giá trị cũ và ô quay về giá trị cũ.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Ô tìm kiếm @bind:event="oninput" @bind:after="LocAsync" trên Blazor Server',
            actors: ['Ô input (trình duyệt)', 'Component (máy chủ)'],
            steps: [
              { from: 0, to: 1, text: 'Gõ "t" → oninput, value = "t"' },
              { from: 1, to: 1, text: 'tuKhoa = "t"' },
              { from: 1, to: 1, text: '@bind:after → LocAsync()' },
              { from: 1, to: 0, text: 'diff: danh sách đã lọc', dashed: true },
              { from: 0, to: 1, text: 'Gõ "i" → lặp lại cả vòng' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Không dùng @bind cùng @onchange trên một ô',
          text: '@bind đã chiếm sự kiện onchange, thêm @onchange là lỗi biên dịch "attribute onchange is used two or more times". Cần làm thêm việc sau khi giá trị đổi thì dùng @bind:after. Trên Blazor Server, oninput gửi một thông điệp qua mạng cho mỗi phím — ô tìm kiếm gọi API nên chờ người dùng ngừng gõ (debounce) rồi mới gọi.',
        },
      ],
      followUps: [
        'Làm sao để component tự viết hỗ trợ @bind-Value?',
        'Vì sao Input component dùng @bind-Value chứ không phải @bind?',
      ],
      buoi: [22],
    },
    {
      id: 'pv-bz-04',
      level: 'Cơ bản',
      question: 'Kiểm tra dữ liệu form trong Blazor làm thế nào?',
      short: 'Dùng EditForm với Model là một class gắn DataAnnotations ([Required], [StringLength], [Range], [EmailAddress]…), thêm <DataAnnotationsValidator /> và hiện lỗi bằng ValidationMessage / ValidationSummary. OnValidSubmit chỉ chạy khi mọi luật đạt; luật so sánh nhiều trường viết bằng IValidatableObject.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Models/KhachHang.cs — luật nằm trên property',
            code: `using System.ComponentModel.DataAnnotations;

public class KhachHang
{
    [Required(ErrorMessage = "Họ tên không được trống")]
    [StringLength(50, MinimumLength = 2, ErrorMessage = "Họ tên từ 2 đến 50 ký tự")]
    public string HoTen { get; set; } = "";

    [Required, EmailAddress(ErrorMessage = "Email không đúng định dạng")]
    public string Email { get; set; } = "";

    [Range(1900, 2026, ErrorMessage = "Năm sinh từ 1900 đến 2026")]
    public int NamSinh { get; set; } = 2000;
}`,
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'DangKy.razor — EditForm',
            code: `<EditForm Model="kh" OnValidSubmit="LuuAsync">
    <DataAnnotationsValidator />
    <ValidationSummary class="alert alert-danger" />

    <InputText class="form-control" @bind-Value="kh.HoTen" />
    <ValidationMessage For="@(() => kh.HoTen)" />

    <InputText class="form-control" @bind-Value="kh.Email" />
    <ValidationMessage For="@(() => kh.Email)" />

    <InputNumber class="form-control" @bind-Value="kh.NamSinh" />
    <ValidationMessage For="@(() => kh.NamSinh)" />

    <button type="submit" class="btn btn-primary">Đăng ký</button>
</EditForm>

@code {
    KhachHang kh = new();
    async Task LuuAsync() { /* chỉ chạy khi hợp lệ */ }
}`,
            note: 'Input component (InputText, InputNumber, InputSelect…) nối với hệ thống validation và tự thêm class valid / invalid / modified lên ô.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Bấm submit trong EditForm',
            steps: [
              { kind: 'start', text: 'submit' },
              { kind: 'process', text: 'DataAnnotationsValidator duyệt mọi attribute trên Model' },
              { kind: 'decision', text: 'Có lỗi ?', branches: [
                { label: 'Có', steps: [{ kind: 'io', text: 'ValidationMessage dưới từng ô, ô thêm class invalid' }, { kind: 'process', text: 'OnInvalidSubmit (nếu có)' }] },
                { label: 'Không', steps: [{ kind: 'process', text: 'OnValidSubmit → LuuAsync' }] },
              ] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Validate trên Blazor chưa phải là đủ',
          text: 'Kiểm tra trên form chỉ để người dùng sửa sai nhanh. Web API nhận dữ liệu phải kiểm tra lại — [ApiController] tự trả 400 khi DataAnnotations sai — vì request có thể gửi thẳng bằng Postman. Ngoài ra không dùng OnSubmit cùng lúc với OnValidSubmit/OnInvalidSubmit; dùng OnSubmit thì tự gọi editContext.Validate().',
        },
      ],
      followUps: [
        'Luật "ngày giao phải sau ngày đặt" viết ở đâu?',
        'EditContext dùng khi nào thay cho Model?',
      ],
      buoi: [22],
    },
    {
      id: 'pv-bz-05',
      level: 'Cơ bản',
      question: 'Routing trong Blazor: khai báo tham số trên URL, ràng buộc kiểu và đọc query string thế nào?',
      short: '@page "/don-hang/{id:int}" khai báo route có tham số; giá trị được gán vào property [Parameter] cùng tên (không phân biệt hoa thường). Ràng buộc {id:int}, {id:guid}… chỉ để khớp route. Query string đọc bằng [SupplyParameterFromQuery]; chuyển trang bằng code dùng NavigationManager.NavigateTo, menu dùng NavLink để tự tô mục đang mở.',
      answer: [
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Tham số route, query string và NavigationManager',
            code: `@* ---- ChiTietDonHang.razor ---- *@
@page "/don-hang/{id:int}"
@inject NavigationManager Nav

<h3>Đơn #@Id</h3>
<button class="btn btn-link" @onclick="VeDanhSach">← Danh sách</button>

@code {
    [Parameter] public int Id { get; set; }        // khớp {id}

    void VeDanhSach() => Nav.NavigateTo("don-hang?trang=1");
}

@* ---- DanhSachSanPham.razor: /san-pham?nhom=dien-lanh&trang=2 ---- *@
@page "/san-pham"

@code {
    [SupplyParameterFromQuery] public string? Nhom { get; set; }
    [SupplyParameterFromQuery(Name = "trang")] public int Trang { get; set; } = 1;
}`,
            note: 'Đường dẫn không có / ở đầu là tương đối với BaseUri — an toàn khi ứng dụng deploy dưới thư mục con. Đổi bộ lọc thì đổi URL (Nav.GetUriWithQueryParameter) chứ không gán biến: F5 và gửi link vẫn giữ đúng kết quả.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'map',
            caption: 'Router so URL với từng mẫu @page',
            name: 'URL → component',
            pairs: [
              { key: '/san-pham', value: 'DanhSachSanPham.razor' },
              { key: '/san-pham?nhom=dien-lanh', value: 'DanhSachSanPham.razor, Nhom = "dien-lanh"' },
              { key: '/don-hang/15', value: 'ChiTietDonHang.razor, Id = 15' },
              { key: '/don-hang/abc', value: 'không khớp {id:int} → NotFound' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Ràng buộc chỉ để khớp route, không để kiểm tra nghiệp vụ',
          text: '{id:int} chặn được "abc" nhưng vẫn nhận -5 hay 999999. Sau khi khớp vẫn phải kiểm tra đơn có tồn tại không và hiện thông báo rõ ràng.',
        },
      ],
      followUps: [
        'Đang ở /don-hang/15 bấm sang /don-hang/16 mà trang không đổi — vì sao?',
        'NavigateTo với forceLoad: true và replace: true khác gì mặc định?',
        'Vì sao nên để bộ lọc trên query string thay vì biến trong @code?',
      ],
      buoi: [24],
    },

    // ──────────────────────────── Trung bình ────────────────────────────
    {
      id: 'pv-bz-06',
      level: 'Trung bình',
      question: 'Circuit trong Blazor Server là gì? Mất kết nối thì chuyện gì xảy ra?',
      short: 'Circuit là phiên làm việc của một tab trình duyệt trên máy chủ: một kết nối SignalR cùng toàn bộ trạng thái component và service Scoped của tab đó, nằm trong RAM máy chủ. Mất kết nối thì giao diện hiện lớp "Attempting to reconnect"; nối lại kịp trong thời gian máy chủ còn giữ circuit (mặc định 3 phút) thì trạng thái còn nguyên, quá hạn hoặc F5 thì là circuit mới và trạng thái cũ mất.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Vòng đời một circuit',
            actors: ['Trình duyệt', 'Máy chủ (circuit)'],
            steps: [
              { from: 0, to: 1, text: 'Mở tab → kết nối SignalR' },
              { from: 1, to: 1, text: 'Tạo circuit: component + service Scoped' },
              { from: 0, to: 1, text: 'Sự kiện @onclick' },
              { from: 1, to: 0, text: 'Chỉ gửi phần DOM khác đi', dashed: true },
              { from: 0, to: 0, text: 'Mất mạng → "Attempting to reconnect"' },
              { from: 1, to: 1, text: 'Giữ circuit đã ngắt (mặc định 3 phút)' },
              { from: 0, to: 1, text: 'Nối lại kịp → dùng tiếp circuit cũ' },
              { from: 1, to: 0, text: 'Quá hạn → bị huỷ, phải tải lại trang', dashed: true },
            ],
          },
        },
        {
          type: 'table',
          head: ['Tình huống', 'Circuit', 'Trạng thái'],
          rows: [
            ['Mở thêm tab thứ hai', 'Circuit mới', 'Giỏ hàng riêng, trống'],
            ['Bấm F5', 'Circuit cũ bỏ, tạo circuit mới', 'Mất biến @code và service Scoped'],
            ['Mạng chập chờn vài giây', 'Nối lại circuit cũ', 'Còn nguyên'],
            ['Mất mạng quá thời gian giữ', 'Máy chủ huỷ circuit', 'Mất, người dùng phải tải lại'],
            ['Exception chưa bắt trong handler', 'Circuit hỏng', 'Người dùng phải F5'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'Program.cs (.NET 8) — cấu hình circuit',
            code: `builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents(o =>
    {
        o.DisconnectedCircuitRetentionPeriod = TimeSpan.FromMinutes(3); // giữ circuit đã ngắt bao lâu
        o.DisconnectedCircuitMaxRetained = 100;                         // tối đa bao nhiêu circuit chờ
        o.DetailedErrors = builder.Environment.IsDevelopment();
    });`,
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Điểm cộng khi trả lời',
          text: 'Thứ phải sống qua F5 thì lưu ra ngoài circuit: localStorage / ProtectedLocalStorage hoặc CSDL. Vì mỗi circuit nằm trong RAM của một máy chủ cụ thể, chạy nhiều instance phải bật sticky session và WebSocket ở host / proxy.',
        },
      ],
      followUps: [
        'Vì sao Blazor Server chạy nhiều máy chủ cần sticky session?',
        'Làm sao giữ giỏ hàng qua F5?',
        'Exception chưa bắt ảnh hưởng gì tới circuit?',
      ],
      buoi: [20, 26],
    },
    {
      id: 'pv-bz-07',
      level: 'Trung bình',
      question: 'Khi nào phải gọi StateHasChanged? Vì sao có lúc phải bọc trong InvokeAsync?',
      short: 'Blazor tự render lại sau handler sự kiện UI, sau EventCallback và sau các phương thức vòng đời. Chỉ khi trạng thái đổi từ nơi Blazor không theo dõi — Timer, event của service, callback SignalR, tác vụ nền — mới phải gọi StateHasChanged. Các callback đó chạy trên luồng khác nên phải dùng InvokeAsync(StateHasChanged) để đưa về dispatcher của component, nếu không sẽ lỗi "The current thread is not associated with the Dispatcher".',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Có cần gọi StateHasChanged không?',
            steps: [
              { kind: 'start', text: 'Trạng thái vừa đổi' },
              { kind: 'decision', text: 'Đổi trong handler UI (@onclick…), EventCallback hay lifecycle method?', branches: [
                { label: 'Đúng', steps: [{ kind: 'io', text: 'Không cần — Blazor tự render' }] },
                { label: 'Sai', steps: [
                  { kind: 'decision', text: 'Đang ở luồng khác (Timer, event service, SignalR)?', branches: [
                    { label: 'Đúng', steps: [{ kind: 'io', text: 'await InvokeAsync(StateHasChanged)' }] },
                    { label: 'Sai', steps: [{ kind: 'io', text: 'StateHasChanged()' }] },
                  ] },
                ] },
              ] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Đồng hồ chạy bằng Timer — ca kinh điển',
            code: `@page "/dong-ho"
@implements IDisposable

<h3>@gio.ToString("HH:mm:ss")</h3>

@code {
    DateTime gio = DateTime.Now;
    System.Threading.Timer? timer;

    protected override void OnInitialized() =>
        timer = new System.Threading.Timer(_ =>
        {
            gio = DateTime.Now;
            InvokeAsync(StateHasChanged);   // callback ở thread pool → đưa về dispatcher
        }, null, 0, 1000);

    public void Dispose() => timer?.Dispose();
}`,
            note: 'Bỏ InvokeAsync(StateHasChanged) thì gio vẫn đổi mỗi giây nhưng màn hình đứng im. Quên Dispose thì timer chạy mãi trên máy chủ sau khi rời trang.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Handler async render mấy lần?',
          text: 'Handler trả Task: Blazor render một lần khi gặp await đầu tiên chưa xong (để hiện "Đang tải…") và một lần khi handler kết thúc. Muốn cập nhật giữa chừng, ví dụ thanh tiến độ qua nhiều bước, thì tự gọi StateHasChanged giữa các bước.',
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Gọi bừa không làm nhanh hơn',
          text: 'Mỗi lần gọi là một lần render và diff. Đặc biệt không gọi StateHasChanged vô điều kiện trong OnAfterRender: render → OnAfterRender → StateHasChanged → render… vòng lặp vô hạn, CPU 100%.',
        },
      ],
      followUps: [
        'StateHasChanged có render ngay lập tức không?',
        'ShouldRender dùng để làm gì?',
      ],
      buoi: [21, 25, 26],
    },
    {
      id: 'pv-bz-08',
      level: 'Trung bình',
      question: '@key dùng để làm gì? Không có @key thì lỗi gì xảy ra?',
      short: 'Sau mỗi lần render, Blazor so cây mới với cây cũ (diff) và mặc định ghép phần tử theo vị trí. @key cho nó ghép theo một khoá ổn định như mã sản phẩm, nên khi chèn, xoá, sắp xếp danh sách thì đúng phần tử / component tương ứng được giữ lại cùng trạng thái của nó.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Xoá TV01 ở đầu danh sách [TV01, TL01, NC01]',
            columns: [
              { title: 'Không @key — ghép theo vị trí', tone: 'bad', items: ['Ô [0] bị "sửa nội dung" thành TL01, ô [1] thành NC01', 'Ô cuối bị gỡ', 'Trạng thái con (ô đang gõ, checkbox) nhảy sang thẻ khác', 'Nhiều thao tác DOM hơn cần thiết'] },
              { title: '@key="sp.Ma" — ghép theo khoá', tone: 'good', items: ['Blazor biết TV01 biến mất', 'Chỉ gỡ đúng thẻ TV01', 'Thẻ TL01, NC01 giữ nguyên DOM và trạng thái', 'Sắp xếp lại chỉ là di chuyển phần tử'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Gắn @key khi lặp',
            code: `@foreach (var sp in danhSach)
{
    <TheSanPham @key="sp.Ma" SanPham="sp" OnXoa="Xoa" />
}

@* Ép tạo lại component khi Id đổi *@
<ChiTietDonHang @key="Id" Id="Id" />`,
            note: 'Dòng thứ hai: đổi Id thì component cũ bị huỷ (Dispose), component mới chạy lại từ OnInitialized — một cách nhanh để "reset" toàn bộ trạng thái.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Khoá phải duy nhất và ổn định',
          text: 'Dùng Id / mã từ dữ liệu. Không dùng chỉ số vòng lặp (xoá phần tử đầu thì mọi chỉ số dịch đi, như không có @key) và không dùng Guid.NewGuid() (mỗi lần render một khoá mới → tạo lại toàn bộ). Hai phần tử anh em trùng khoá thì Blazor ném exception.',
        },
      ],
      followUps: [
        'Dùng chỉ số vòng lặp làm @key có ổn không?',
        'Diff của Blazor gửi gì xuống trình duyệt?',
      ],
      buoi: [21],
    },
    {
      id: 'pv-bz-09',
      level: 'Trung bình',
      question: 'Truyền dữ liệu giữa các component có những cách nào? Chọn cách nào khi nào?',
      short: 'Cha → con dùng [Parameter]; con → cha dùng EventCallback; hai chiều dùng cặp Value / ValueChanged với @bind-Value; truyền markup dùng RenderFragment; một giá trị cho cả nhánh sâu dùng CascadingValue; các component không quan hệ cha con (icon giỏ trên menu và trang sản phẩm) dùng service Scoped làm state container. @ref chỉ dùng khi thật cần gọi phương thức của con.',
      answer: [
        {
          type: 'table',
          head: ['Cách', 'Hướng', 'Ví dụ', 'Lưu ý'],
          rows: [
            ['[Parameter]', 'Cha → con', '<TheSanPham SanPham="sp" />', 'Con không gán lại tham số'],
            ['EventCallback<T>', 'Con → cha', 'OnThem="ThemVaoGio"', 'Tự render lại cha'],
            ['@bind-Value', 'Hai chiều', '<ChonSoLuong @bind-Value="d.SoLuong" />', 'Cặp Value + ValueChanged'],
            ['RenderFragment / ChildContent', 'Cha → con (markup)', 'Hộp thoại bọc nội dung', 'RenderFragment<T> cho mẫu từng hàng'],
            ['CascadingValue', 'Tổ tiên → mọi con cháu', 'Người dùng hiện tại, theme', 'Tầng giữa không cần khai báo'],
            ['Service Scoped + event OnChange', 'Bất kỳ ↔ bất kỳ', 'Giỏ hàng, icon trên menu', 'Huỷ đăng ký trong Dispose'],
            ['@ref', 'Cha gọi phương thức con', 'hopThoai.HoiAsync()', 'Chỉ có giá trị sau lần render đầu'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Một trang thật dùng nhiều cách cùng lúc',
            root: {
              label: 'MainLayout', note: 'CascadingValue NguoiDung', highlight: true,
              children: [
                { label: 'NavMenu', children: [
                  { label: 'IconGioHang', note: 'nghe GioHangService.OnChange' },
                ] },
                { label: 'Trang SanPham', note: 'giữ danhSach', children: [
                  { label: 'TheSanPham', note: '[Parameter] SanPham ↓ · OnThem ↑' },
                  { label: 'HopThoai', note: 'ChildContent: RenderFragment' },
                ] },
                { label: 'GioHangService', note: 'Scoped — trang và icon cùng inject', highlight: true },
              ],
            },
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'RenderFragment — component khung nhận markup',
            code: `@* ---- TheCoTieuDe.razor ---- *@
<div class="card">
    <div class="card-header">@TieuDe</div>
    <div class="card-body">@ChildContent</div>
</div>

@code {
    [Parameter] public string TieuDe { get; set; } = "";
    [Parameter] public RenderFragment? ChildContent { get; set; }
}

@* ---- Dùng: nội dung giữa thẻ mở và thẻ đóng rơi vào ChildContent ---- *@
<TheCoTieuDe TieuDe="Thông tin giao hàng">
    <p>Giao trong 2 giờ nội thành.</p>
</TheCoTieuDe>`,
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Quy tắc chọn',
          text: 'Dữ liệu đi xuống, sự kiện đi lên. Phải truyền qua quá 2–3 tầng thì dùng CascadingValue. Nhiều trang cùng dùng và đổi thường xuyên thì đưa vào service. Tránh dùng @ref để đẩy dữ liệu — đó là đi ngược luồng dữ liệu.',
        },
      ],
      followUps: [
        'CascadingValue đổi giá trị thì con cháu có render lại không? IsFixed dùng khi nào?',
        'Vì sao không nên gán lại [Parameter] bên trong component con?',
      ],
      buoi: [23, 26],
    },
    {
      id: 'pv-bz-10',
      level: 'Trung bình',
      question: 'EventCallback khác Action (delegate thường) thế nào khi con báo sự kiện lên cha?',
      short: 'Cả hai đều gọi được hàm của cha, nhưng EventCallback chạy xong sẽ tự gọi StateHasChanged trên component sở hữu hàm (cha), nhận cả hàm sync lẫn async và là struct không bao giờ null. Dùng Action thì hàm của cha chạy nhưng chỉ component con render lại — phần giao diện của cha đứng im cho tới lần render sau.',
      answer: [
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Con khai báo EventCallback<SanPham>, cha truyền hàm vào',
            code: `@* ---- TheSanPham.razor (con) ---- *@
<button class="btn btn-primary" @onclick="BamThem">Thêm vào giỏ</button>

@code {
    [Parameter] public SanPham SanPham { get; set; } = default!;
    [Parameter] public EventCallback<SanPham> OnThem { get; set; }
    // [Parameter] public Action<SanPham>? OnThem { get; set; }   // cha sẽ KHÔNG tự render

    Task BamThem() => OnThem.InvokeAsync(SanPham);
}

@* ---- Trang cha ---- *@
<p>Giỏ: @gio.Count món</p>
<TheSanPham SanPham="sp" OnThem="ThemVaoGio" />

@code {
    List<SanPham> gio = new();
    void ThemVaoGio(SanPham sp) => gio.Add(sp);   // viết async Task cũng được
}`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Bấm "Thêm vào giỏ" ở thẻ TL01',
            actors: ['TheSanPham (con)', 'Trang cha'],
            steps: [
              { from: 0, to: 0, text: '@onclick → BamThem()' },
              { from: 0, to: 1, text: 'OnThem.InvokeAsync(TL01)' },
              { from: 1, to: 1, text: 'ThemVaoGio: gio.Add' },
              { from: 1, to: 1, text: 'EventCallback → cha render: "Giỏ: 1 món"' },
              { from: 1, to: 0, text: 'Tham số con không đổi → con không render lại', dashed: true },
            ],
          },
        },
        {
          type: 'table',
          head: ['Tiêu chí', 'EventCallback<T>', 'Action<T>'],
          rows: [
            ['Tự render component cha', 'Có', 'Không'],
            ['Hàm async', 'Được await, lỗi do Blazor xử lý', 'Thành async void, lỗi bị nuốt hoặc làm sập'],
            ['Khi cha không truyền', 'Struct rỗng, InvokeAsync vẫn an toàn (HasDelegate = false)', 'null — phải ?.Invoke'],
            ['Nên dùng', 'Mặc định cho mọi sự kiện con → cha', 'Chỉ khi cố ý không muốn cha render'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Hỗ trợ @bind-Value cho component tự viết',
          text: 'Khai báo [Parameter] int Value và [Parameter] EventCallback<int> ValueChanged. Con muốn đổi giá trị thì gọi ValueChanged.InvokeAsync(giaTriMoi) chứ không tự gán Value — cha sẽ viết được <ChonSoLuong @bind-Value="dong.SoLuong" />.',
        },
      ],
      followUps: [
        'EventCallback và EventCallback<T> khác nhau gì?',
        'Vì sao con gọi ValueChanged chứ không tự gán Value = x?',
      ],
      buoi: [23],
    },
    {
      id: 'pv-bz-11',
      level: 'Trung bình',
      question: 'OnInitialized khác OnParametersSet thế nào? Vì sao trang chi tiết không đổi khi bấm từ /don-hang/15 sang /don-hang/16?',
      short: 'OnInitialized(Async) chạy đúng một lần khi đối tượng component được tạo; OnParametersSet(Async) chạy ngay sau đó và mỗi lần tham số được gán lại. Chuyển giữa hai URL cùng một @page, Blazor dùng lại component cũ và chỉ gán Id mới — code tải dữ liệu đặt trong OnInitialized không chạy lại nên trang vẫn hiện đơn 15.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Đang ở /don-hang/15, bấm link sang /don-hang/16',
            steps: [
              { kind: 'start', text: 'Router: vẫn là ChiTietDonHang → DÙNG LẠI đối tượng' },
              { kind: 'process', text: 'SetParametersAsync: Id = 16' },
              { kind: 'note', text: 'OnInitializedAsync KHÔNG chạy lại' },
              { kind: 'process', text: 'OnParametersSetAsync chạy' },
              { kind: 'decision', text: 'Code tải đơn đặt ở đâu?', branches: [
                { label: 'OnInitialized', steps: [{ kind: 'end', text: 'Vẫn hiện đơn 15 — lỗi' }] },
                { label: 'OnParametersSet', steps: [{ kind: 'end', text: 'Tải đơn 16, hiện đúng' }] },
              ] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Pages/ChiTietDonHang.razor — tải lại khi Id đổi',
            code: `@page "/don-hang/{id:int}"
@inject KhoDonHang Kho

@if (don is null) { <p>Đang tải đơn @Id…</p> }
else { <h3>Đơn #@don.Id — @don.KhachHang.HoTen</h3> }

@code {
    [Parameter] public int Id { get; set; }
    DonHang? don;
    int idDaTai;

    protected override async Task OnParametersSetAsync()
    {
        if (Id == idDaTai) return;      // tham số không đổi thì không gọi lại
        idDaTai = Id;
        don = null;                     // hiện "đang tải" thay vì đơn cũ
        don = await Kho.LayTheoIdAsync(Id);
    }
}`,
          },
        },
        {
          type: 'table',
          head: ['Phương thức', 'Số lần', 'Dùng để'],
          rows: [
            ['OnInitialized(Async)', '1 lần / đối tượng', 'Dữ liệu không phụ thuộc tham số, đăng ký sự kiện'],
            ['OnParametersSet(Async)', 'Sau khởi tạo và mỗi lần cha / router gán tham số', 'Tải theo Id route, tính giá trị dẫn xuất'],
            ['OnAfterRender(Async)', 'Sau mỗi lần render', 'Gọi JS, focus — chỉ trong firstRender'],
            ['Dispose / DisposeAsync', '1 lần khi bị gỡ', 'Huỷ đăng ký sự kiện, dừng Timer'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'OnParametersSet chạy cả khi tham số "không đổi"',
          text: 'Cha render lại là con nhận lại tham số; với tham số kiểu object, Blazor không biết bên trong có đổi không nên luôn coi là có thể đã đổi. Vì vậy phải so với giá trị đã tải (idDaTai) để không gọi API trùng.',
        },
      ],
      followUps: [
        'Override cả OnInitialized và OnInitializedAsync thì chạy theo thứ tự nào?',
        'Khi nào component con render lại dù tham số không đổi?',
      ],
      buoi: [24, 25],
    },
    {
      id: 'pv-bz-12',
      level: 'Trung bình',
      question: 'Singleton, Scoped, Transient trong Blazor Server sống bao lâu? Service giỏ hàng nên đăng ký kiểu gì?',
      short: 'Trên Blazor Server, Singleton là một đối tượng dùng chung cho mọi người dùng của máy chủ; Scoped sống theo circuit — cả phiên của một tab, không phải một request như MVC / Web API; Transient tạo mới mỗi lần inject. Giỏ hàng, người dùng đăng nhập, state container phải là Scoped; đăng ký Singleton thì người này thấy giỏ của người kia.',
      answer: [
        {
          type: 'table',
          head: ['Vòng đời', 'Blazor Server', 'Blazor WebAssembly', 'Dùng cho'],
          rows: [
            ['AddSingleton', 'Một đối tượng cho TẤT CẢ người dùng', 'Một đối tượng cho tab đó', 'Cấu hình, cache danh mục chỉ đọc'],
            ['AddScoped', 'Một đối tượng cho mỗi circuit (mỗi tab)', 'Giống Singleton', 'Giỏ hàng, người dùng, state container'],
            ['AddTransient', 'Mỗi lần inject một đối tượng mới', 'Như Server', 'Lớp tính toán không giữ trạng thái'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Ai thấy đối tượng nào — hai người mua trên Blazor Server',
            root: {
              label: 'Máy chủ',
              children: [
                { label: 'KhoSanPhamBoNho', note: 'Singleton — An và Bình dùng chung', highlight: true },
                { label: 'Circuit của An (tab 1)', children: [
                  { label: 'GioHangService #A', note: 'Scoped' },
                  { label: 'TrangSanPham → TinhPhi #1', note: 'Transient' },
                  { label: 'TrangThanhToan → TinhPhi #2', note: 'Transient, đối tượng khác' },
                ] },
                { label: 'Circuit của Bình', children: [
                  { label: 'GioHangService #B', note: 'Scoped, tách biệt với An' },
                ] },
              ],
            },
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Lỗi chỉ lộ khi có hai người dùng',
          text: 'Giỏ hàng Singleton: tự test một mình thấy đúng, lên production thì An thêm tivi, Bình mở trang cũng thấy tivi. Ngoài ra service Singleton không được inject service Scoped — Development báo "Cannot consume scoped service from singleton".',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'DbContext trong Blazor Server',
          text: 'Scoped sống cả circuit nên một DbContext Scoped bị dùng suốt phiên, theo dõi ngày càng nhiều entity và có thể bị hai thao tác chạy song song (DbContext không an toàn đa luồng). Cách chuẩn: AddDbContextFactory và tạo context ngắn hạn bằng using cho mỗi thao tác.',
        },
      ],
      followUps: [
        'Scoped trong Blazor WebAssembly khác gì Singleton?',
        'Vì sao DbContext trong Blazor Server nên dùng IDbContextFactory?',
        'F5 thì service Scoped còn giữ dữ liệu không?',
      ],
      buoi: [26],
    },
    {
      id: 'pv-bz-13',
      level: 'Trung bình',
      question: 'Gọi JavaScript interop trong OnInitialized được không?',
      short: 'Không nên. Khi có prerender, lượt chạy đầu ở máy chủ chưa có trình duyệt nào để gọi nên IJSRuntime ném InvalidOperationException "JavaScript interop calls cannot be issued at this time"; kể cả không prerender thì DOM cũng chưa render, ElementReference chưa có giá trị. Chỗ đúng là OnAfterRenderAsync, bọc trong if (firstRender) cho việc chỉ làm một lần.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Vòng đời và chỗ được gọi JS',
            steps: [
              { kind: 'start', text: 'Component được tạo' },
              { kind: 'process', text: 'OnInitialized(Async) — CHƯA có DOM, có thể đang prerender' },
              { kind: 'process', text: 'OnParametersSet(Async)' },
              { kind: 'process', text: 'Render HTML ra trình duyệt' },
              { kind: 'process', text: 'OnAfterRenderAsync(firstRender) — không bao giờ chạy khi prerender' },
              { kind: 'decision', text: 'firstRender?', branches: [
                { label: 'Có', steps: [{ kind: 'io', text: 'Gọi JS: localStorage, focus, khởi tạo thư viện' }] },
                { label: 'Không', steps: [{ kind: 'note', text: 'Bỏ qua — tránh gọi lặp' }] },
              ] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Đặt JS interop đúng chỗ',
            code: `@inject IJSRuntime JS
@implements IAsyncDisposable

<input @ref="oTimKiem" class="form-control" placeholder="Tìm sản phẩm..." />
<p>Giỏ đã lưu: @soMon món</p>

@code {
    ElementReference oTimKiem;
    IJSObjectReference? module;
    int soMon;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (!firstRender) return;                     // việc chỉ làm một lần

        await oTimKiem.FocusAsync();                  // DOM đã có, @ref đã gán
        module = await JS.InvokeAsync<IJSObjectReference>("import", "./js/tienich.js");

        string? json = await JS.InvokeAsync<string?>("localStorage.getItem", "gioHang");
        soMon = json is null ? 0 : JsonSerializer.Deserialize<List<DongGio>>(json)!.Count;
        StateHasChanged();                            // dữ liệu có SAU render → báo render lại
    }

    public async ValueTask DisposeAsync()
    {
        try { if (module is not null) await module.DisposeAsync(); }
        catch (JSDisconnectedException) { }           // circuit đã đóng (Blazor Server)
    }
}`,
          },
        },
        {
          type: 'table',
          head: ['API', 'Dùng khi'],
          rows: [
            ['JS.InvokeVoidAsync("alert", …)', 'Gọi hàm JS không cần kết quả'],
            ['JS.InvokeAsync<bool>("confirm", …)', 'Cần giá trị trả về (tuần tự hoá JSON)'],
            ['IJSObjectReference (import module)', 'Hàm JS trong file .js riêng, không làm bẩn window'],
            ['DotNetObjectReference + [JSInvokable]', 'JavaScript gọi ngược vào C#'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Hai bẫy đi kèm',
          text: 'Gán dữ liệu trong OnAfterRender thì phải tự gọi StateHasChanged, và chỉ trong nhánh firstRender (hoặc một cờ) — gọi vô điều kiện là vòng lặp render vô hạn. Lần render đầu luôn chạy trước khi đọc được localStorage, nên hiện "Đang tải…" thay vì "0 món" để người dùng không tưởng giỏ bị mất.',
        },
      ],
      followUps: [
        'Gọi ngược C# từ JavaScript làm thế nào? Quên Dispose DotNetObjectReference thì sao?',
        'Vì sao nên import module JS thay vì gắn hàm vào window?',
      ],
      buoi: [25, 28],
    },
    {
      id: 'pv-bz-14',
      level: 'Trung bình',
      question: 'Blazor gọi Web API thế nào cho đúng? Vì sao không new HttpClient() trong component?',
      short: 'Đăng ký qua IHttpClientFactory — gọn nhất là typed client AddHttpClient<ProductApiService>(c => c.BaseAddress = …) — rồi inject service vào component. new HttpClient() mỗi lần gọi để lại socket chờ đóng, tải nặng là cạn cổng; factory tái sử dụng handler và xoay vòng định kỳ để cập nhật DNS. Component phải xử lý đủ ba trạng thái đang tải / lỗi / rỗng và bắt exception.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Program.cs và typed client',
            code: `// Program.cs — BaseUrl đọc từ appsettings.json, kết thúc bằng dấu /
builder.Services.AddHttpClient<ProductApiService>(c =>
{
    c.BaseAddress = new Uri(builder.Configuration["ApiSettings:BaseUrl"]!);
    c.Timeout = TimeSpan.FromSeconds(15);
});

// Services/ProductApiService.cs — HttpClient đã cấu hình được inject vào constructor
public class ProductApiService(HttpClient http)
{
    public async Task<List<SanPham>> LayTatCaAsync() =>
        await http.GetFromJsonAsync<List<SanPham>>("api/ProductApi/getall") ?? new();

    public async Task<SanPham?> LayTheoIdAsync(int id)
    {
        var res = await http.GetAsync($"api/ProductApi/get/{id}");
        if (res.StatusCode == HttpStatusCode.NotFound) return null;
        res.EnsureSuccessStatusCode();
        return await res.Content.ReadFromJsonAsync<SanPham>();
    }
}`,
            note: 'Đường dẫn gọi KHÔNG bắt đầu bằng / ("api/…"), BaseAddress PHẢI kết thúc bằng /. AddHttpClient<T> đăng ký luôn ProductApiService dạng Transient.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Ba cách lấy HttpClient',
            columns: [
              { title: 'new HttpClient() mỗi lần', tone: 'bad', items: ['Cạn socket khi tải nặng', 'BaseAddress rải khắp nơi', 'Không thay được khi test'] },
              { title: 'Named client', tone: 'plain', items: ['AddHttpClient("Api", c => …)', 'factory.CreateClient("Api")', 'Hợp khi gọi nhiều API khác nhau'] },
              { title: 'Typed client', tone: 'good', items: ['AddHttpClient<ProductApiService>()', 'HttpClient vào constructor', 'Gom mọi URL vào một class'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Bắt lỗi trong component',
          text: 'Trên Blazor Server, exception không bắt trong OnInitializedAsync hay handler @onclick làm hỏng cả circuit — người dùng phải F5. Mọi lời gọi API bọc try/catch, biến mã lỗi HTTP thành thông báo dễ hiểu.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'CORS chỉ gặp ở WebAssembly',
          text: 'Blazor WebAssembly gọi API từ trình duyệt nên API phải AddCors và UseCors cho nguồn của Blazor. Blazor Server gọi API từ máy chủ (server-to-server) nên không bị CORS.',
        },
      ],
      followUps: [
        'Typed client và named client khác nhau gì?',
        'Gắn JWT vào mọi request thế nào cho gọn (DelegatingHandler)?',
        'Vì sao trang danh sách gọi getall hai lần mỗi khi mở?',
      ],
      buoi: [27],
    },
    {
      id: 'pv-bz-15',
      level: 'Trung bình',
      question: 'Triển khai ứng dụng Blazor lên máy chủ gồm những bước nào, hay lỗi ở đâu?',
      short: 'Dùng dotnet publish -c Release để ra thư mục publish (không upload mã nguồn hay bin/Debug), cấu hình theo môi trường bằng ASPNETCORE_ENVIRONMENT và appsettings.{Môi trường}.json, mật khẩu để ở biến môi trường của host. Riêng Blazor Server còn cần host bật WebSocket, và bật sticky session khi chạy nhiều instance vì mỗi circuit chỉ sống trên một máy.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Từ máy lập trình lên Internet',
            items: [
              { label: 'Build', text: 'dotnet build — bin/Debug, chỉ để chạy thử' },
              { label: 'Publish', text: 'dotnet publish -c Release -o ./publish — bản tối ưu, đủ để chạy' },
              { label: 'Cấu hình', text: 'ASPNETCORE_ENVIRONMENT=Production, appsettings.Production.json' },
              { label: 'Host', text: 'Somee (upload zip), Azure App Service (CI/CD từ GitHub), Docker' },
              { label: 'Kiểm tra', text: 'Mở domain, xem log, thử các trang chính' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Chạy thử bản publish trước khi upload',
            code: `dotnet publish -c Release -o ./publish
cd publish
ASPNETCORE_ENVIRONMENT=Production dotnet CuaHangDienMay.dll`,
            note: 'Máy chủ chỉ cần ASP.NET Core Runtime, không cần SDK hay mã nguồn.',
          },
        },
        {
          type: 'table',
          head: ['Triệu chứng', 'Nguyên nhân hay gặp', 'Cách xử lý'],
          rows: [
            ['Trang trắng / lỗi 500.30', 'Sai phiên bản .NET trên host; zip có thêm lớp thư mục nên web.config không ở gốc', 'Chọn đúng runtime; nén các file BÊN TRONG publish'],
            ['Local chạy, lên server sai chuỗi kết nối', 'appsettings.production.json sai hoa thường (Linux phân biệt)', 'Đúng tên appsettings.Production.json hoặc dùng biến môi trường'],
            ['Tưởng đang Development', 'launchSettings.json không được publish; không đặt biến thì mặc định Production', 'Đặt ASPNETCORE_ENVIRONMENT trên host'],
            ['Blazor Server reconnect liên tục', 'Host / proxy chưa bật WebSocket; nhiều instance không sticky session', 'Bật Web sockets và ARR affinity (Azure), header Upgrade ở Nginx'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Xem log thay vì đoán',
          text: 'Azure: App Service → Log stream. Docker: docker logs <container>. Lỗi khởi động (thiếu cấu hình, sai chuỗi kết nối) hiện rõ trong log, còn trình duyệt chỉ thấy 500.',
        },
      ],
      followUps: [
        'appsettings.json, appsettings.Production.json và biến môi trường ghi đè nhau theo thứ tự nào?',
        'Dockerfile multi-stage cho .NET 8 gồm những stage nào, vì sao?',
      ],
      buoi: [31],
    },

    // ───────────────────────────── Nâng cao ─────────────────────────────
    {
      id: 'pv-bz-16',
      level: 'Nâng cao',
      question: 'Vì sao OnInitializedAsync chạy hai lần và API bị gọi hai lần? Xử lý thế nào?',
      short: 'Với render mode tương tác, .NET 8 bật prerender mặc định: lượt 1 máy chủ tạo component, chạy OnInitializedAsync, trả HTML tĩnh để trang hiện ngay; lượt 2 khi circuit (hoặc WebAssembly) sẵn sàng thì tạo một đối tượng component MỚI và chạy lại toàn bộ vòng đời. Xử lý: giữ prerender và chuyển dữ liệu lượt 1 sang lượt 2 bằng PersistentComponentState, hoặc tắt prerender cho trang không cần SEO.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Prerender: vì sao OnInitializedAsync chạy hai lần',
            steps: [
              { kind: 'start', text: 'Trình duyệt GET /san-pham' },
              { kind: 'process', text: 'Lượt 1 — máy chủ tạo component, chạy OnInitializedAsync, render HTML tĩnh' },
              { kind: 'io', text: 'Trả HTML: thấy trang ngay, chưa bấm được' },
              { kind: 'process', text: 'blazor.web.js mở circuit SignalR' },
              { kind: 'process', text: 'Lượt 2 — tạo đối tượng MỚI, chạy OnInitializedAsync lần nữa' },
              { kind: 'decision', text: 'Có lưu trạng thái từ lượt 1?', branches: [
                { label: 'Không', steps: [{ kind: 'note', text: 'Gọi API / CSDL hai lần, trang có thể nháy' }] },
                { label: 'Có', steps: [{ kind: 'note', text: 'Lượt 2 đọc lại, không gọi lại' }] },
              ] },
              { kind: 'end', text: 'Trang tương tác được' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'PersistentComponentState — lượt 1 nhúng dữ liệu vào HTML, lượt 2 đọc lại',
            code: `@page "/san-pham"
@rendermode InteractiveServer
@implements IDisposable
@inject PersistentComponentState TrangThai
@inject ProductApiService Api

@code {
    List<SanPham>? danhSach;
    PersistingComponentStateSubscription dangKy;

    protected override async Task OnInitializedAsync()
    {
        dangKy = TrangThai.RegisterOnPersisting(() =>
        {
            TrangThai.PersistAsJson("ds-san-pham", danhSach);
            return Task.CompletedTask;
        });

        if (TrangThai.TryTakeFromJson<List<SanPham>>("ds-san-pham", out var daCo))
            danhSach = daCo;                          // lượt 2: không gọi API
        else
            danhSach = await Api.LayTatCaAsync();     // lượt 1 (prerender)
    }

    public void Dispose() => dangKy.Dispose();
}`,
          },
        },
        {
          type: 'table',
          head: ['Cách', 'Ưu', 'Nhược'],
          rows: [
            ['Giữ nguyên', 'Trang hiện ngay, tốt cho SEO', 'Gọi API / CSDL hai lần, có thể nháy'],
            ['PersistentComponentState', 'Hiện ngay và chỉ gọi một lần', 'Thêm code; dữ liệu nằm trong HTML nên đừng để dữ liệu nhạy cảm hay quá lớn'],
            ['@rendermode @(new InteractiveServerRenderMode(prerender: false))', 'Vòng đời chỉ chạy một lần, đơn giản', 'Trang trống tới khi circuit kết nối, không SEO'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Những hệ quả khác của prerender',
          text: 'Lượt 1 không có trình duyệt: gọi IJSRuntime (kể cả đọc localStorage) sẽ ném exception. Service Scoped ở lượt 1 thuộc scope của HTTP request, khác scope của circuit ở lượt 2 — dữ liệu nạp vào service lúc prerender không tự sang lượt tương tác.',
        },
      ],
      followUps: [
        'Làm sao biết code đang chạy ở lượt prerender hay lượt tương tác?',
        'Static SSR khác InteractiveServer có prerender thế nào?',
      ],
      buoi: [25, 27],
    },
    {
      id: 'pv-bz-17',
      level: 'Nâng cao',
      question: 'Icon giỏ hàng trên menu không cập nhật khi trang sản phẩm thêm hàng. Sửa thế nào, và vì sao phải Dispose?',
      short: 'Hai component không quan hệ cha con nên dùng state container: service Scoped giữ giỏ và phát event OnChange mỗi khi đổi; icon đăng ký nghe trong OnInitialized, gọi InvokeAsync(StateHasChanged) và huỷ đăng ký trong Dispose. Quên -= thì service (sống cả circuit) giữ tham chiếu tới component đã bị gỡ: rò bộ nhớ và handler vẫn chạy trên component đã chết.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Services/GioHangService.cs — đăng ký AddScoped',
            code: `public class GioHangService
{
    private readonly List<ChiTietDonHang> dong = new();

    public IReadOnlyList<ChiTietDonHang> Dong => dong;     // ngoài không Add trực tiếp được
    public int TongSoLuong => dong.Sum(d => d.SoLuong);

    public event Action? OnChange;

    public void Them(SanPham sp, int soLuong = 1)
    {
        var co = dong.FirstOrDefault(d => d.MaSanPham == sp.Ma);
        if (co is null) dong.Add(new ChiTietDonHang { MaSanPham = sp.Ma, DonGia = sp.Gia, SoLuong = soLuong });
        else co.SoLuong += soLuong;
        OnChange?.Invoke();                                 // báo mọi component đang nghe
    }
}`,
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Shared/IconGioHang.razor — nghe OnChange',
            code: `@inject GioHangService GioHang
@implements IDisposable

<a href="gio-hang" class="btn btn-outline-light">
    Giỏ hàng <span class="badge bg-danger">@GioHang.TongSoLuong</span>
</a>

@code {
    protected override void OnInitialized() => GioHang.OnChange += CapNhat;

    private void CapNhat() => InvokeAsync(StateHasChanged);   // event có thể phát từ luồng khác

    public void Dispose() => GioHang.OnChange -= CapNhat;      // bắt buộc
}`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Bấm "Thêm vào giỏ" ở trang sản phẩm',
            actors: ['TrangSanPham', 'GioHangService', 'IconGioHang', 'Trình duyệt'],
            steps: [
              { from: 0, to: 1, text: 'Them(tivi)' },
              { from: 1, to: 1, text: 'dong.Add' },
              { from: 1, to: 2, text: 'OnChange?.Invoke()' },
              { from: 2, to: 2, text: 'InvokeAsync(StateHasChanged)' },
              { from: 2, to: 3, text: 'Badge 0 → 1', dashed: true },
              { from: 0, to: 3, text: 'TrangSanPham tự render sau @onclick', dashed: true },
            ],
          },
        },
        {
          type: 'table',
          head: ['Nguồn rò rỉ', 'Hậu quả', 'Dọn trong Dispose'],
          rows: [
            ['event của service (+=)', 'Service giữ component đã gỡ', 'OnChange -= CapNhat'],
            ['System.Threading.Timer', 'Timer chạy mãi trên máy chủ', 'timer.Dispose()'],
            ['DotNetObjectReference, addEventListener', 'JS vẫn gọi vào component đã huỷ', 'Gỡ listener, objRef.Dispose()'],
            ['HubConnection SignalR', 'Kết nối cũ còn mở, nhận trùng thông báo', 'await ketNoi.DisposeAsync()'],
            ['Tác vụ dài (polling, tải file)', 'Chạy tiếp sau khi rời trang', 'cts.Cancel() trên CancellationTokenSource'],
          ],
        },
      ],
      followUps: [
        'Component chứa nút @onclick có cần nghe OnChange không?',
        'IAsyncDisposable dùng khi nào thay cho IDisposable?',
        'Nếu GioHangService lỡ đăng ký Singleton thì hậu quả kép là gì?',
      ],
      buoi: [21, 26, 28],
    },
    {
      id: 'pv-bz-18',
      level: 'Nâng cao',
      question: 'Blazor biết người dùng đã đăng nhập bằng JWT như thế nào? Lưu JWT ở đâu, rủi ro gì?',
      short: 'Blazor chỉ hỏi AuthenticationStateProvider "người dùng hiện tại là ai"; ta viết lớp con đọc token, kiểm hạn, dựng ClaimsPrincipal từ claims và gọi NotifyAuthenticationStateChanged khi đăng nhập / đăng xuất để AuthorizeView và [Authorize] cập nhật. localStorage tiện, giữ qua F5 nhưng mọi script trên trang — kể cả script XSS — đọc được; nên access token ngắn hạn kèm refresh token, và bảo mật thật nằm ở [Authorize] phía API.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Đăng nhập rồi gọi API cần quyền',
            actors: ['Trang DangNhap', 'AuthService', 'Web API', 'localStorage'],
            steps: [
              { from: 0, to: 1, text: 'DangNhapAsync("khai", "123456")' },
              { from: 1, to: 2, text: 'POST /api/auth/login' },
              { from: 2, to: 2, text: 'BCrypt.Verify, tạo JWT có ký' },
              { from: 2, to: 1, text: '200 { accessToken }', dashed: true },
              { from: 1, to: 3, text: 'setItem("accessToken", …)' },
              { from: 1, to: 0, text: 'NotifyAuthenticationStateChanged → menu đổi', dashed: true },
              { from: 0, to: 2, text: 'GET /api/don-hang + Authorization: Bearer …' },
              { from: 2, to: 0, text: '200 — hoặc 401 nếu chữ ký sai / hết hạn', dashed: true },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Auth/JwtAuthStateProvider.cs',
            code: `public class JwtAuthStateProvider(LocalStorageService storage) : AuthenticationStateProvider
{
    static readonly AuthenticationState Khach = new(new ClaimsPrincipal(new ClaimsIdentity()));

    public override async Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        string? token = await storage.DocAsync<string>("accessToken");
        if (string.IsNullOrEmpty(token)) return Khach;

        var jwt = new JwtSecurityTokenHandler().ReadJwtToken(token);   // chỉ ĐỌC, không kiểm chữ ký
        if (jwt.ValidTo < DateTime.UtcNow) return Khach;

        var identity = new ClaimsIdentity(jwt.Claims, "jwt", "unique_name", "role");
        return new AuthenticationState(new ClaimsPrincipal(identity));
    }

    public void BaoDaDoi() => NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
}`,
            note: 'Thiếu "jwt" (authenticationType) thì IsAuthenticated luôn false dù có claims. Hai tham số sau chỉ claim nào là tên (Identity.Name) và claim nào là vai trò (IsInRole, Roles="Admin").',
          },
        },
        {
          type: 'table',
          head: ['Nơi lưu', 'Ưu', 'Rủi ro'],
          rows: [
            ['Biến trong service (bộ nhớ)', 'Script khác khó lấy', 'F5 là mất, phải đăng nhập lại'],
            ['localStorage', 'Giữ qua F5 và mọi tab', 'XSS đọc được; còn mãi tới khi xoá'],
            ['sessionStorage', 'Mất khi đóng tab', 'Vẫn bị XSS đọc'],
            ['Cookie HttpOnly + Secure + SameSite', 'JavaScript không đọc được', 'Phải chống CSRF; cấu hình cùng miền / CORS credentials'],
            ['ProtectedLocalStorage (Blazor Server)', 'Mã hoá bằng Data Protection, không sửa tay được', 'Chỉ có ở Server, cần JS nên không dùng được khi prerender'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Ẩn menu không phải là bảo mật',
          text: 'ReadJwtToken không kiểm chữ ký (client không có secret key): người dùng sửa token tự gán role Admin thì AuthorizeView có hiện menu Admin, nhưng API trả 401 vì chữ ký sai. Đăng xuất phía client chỉ là xoá token — token đã lộ vẫn dùng được tới exp, nên access token để 15–30 phút kèm refresh token lưu CSDL để máy chủ thu hồi được.',
        },
      ],
      followUps: [
        'AuthorizeView khác @attribute [Authorize] thế nào? Cần AuthorizeRouteView để làm gì?',
        'Gắn Bearer token vào mọi request bằng DelegatingHandler ra sao?',
        'Gặp 401 và 403 thì giao diện nên xử lý khác nhau thế nào?',
      ],
      buoi: [28, 29],
    },
    {
      id: 'pv-bz-19',
      level: 'Nâng cao',
      question: 'Làm trang quản trị nhận đơn hàng mới theo thời gian thực bằng SignalR: thiết kế thế nào, có những bẫy gì?',
      short: 'Máy chủ có Hub (MapHub<DonHangHub>("/hubs/don-hang")); controller lưu đơn xong dùng IHubContext gửi tới nhóm "QuanTri". Trang Blazor tạo HubConnection trong OnAfterRenderAsync(firstRender), đăng ký On("DonHangMoi") trước StartAsync, cập nhật giao diện bằng InvokeAsync(StateHasChanged) và DisposeAsync khi rời trang. Bẫy chính: token phải đi qua query string access_token, kết nối lại có ConnectionId mới nên phải vào nhóm lại, và tin gửi lúc mất kết nối không được gửi bù.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Khách đặt hàng, hai trang quản trị cùng nhận thông báo',
            actors: ['Khách (web)', 'API DonHang', 'DonHangHub', 'Admin A', 'Admin B'],
            steps: [
              { from: 3, to: 2, text: 'Kết nối /hubs/don-hang (giữ mở)' },
              { from: 4, to: 2, text: 'Kết nối /hubs/don-hang (giữ mở)' },
              { from: 0, to: 1, text: 'POST /api/don-hang' },
              { from: 1, to: 1, text: 'SaveChangesAsync → DonHang #16' },
              { from: 1, to: 2, text: 'Clients.Group("QuanTri").SendAsync("DonHangMoi", …)' },
              { from: 2, to: 3, text: 'DonHangMoi { Id: 16 }' },
              { from: 2, to: 4, text: 'DonHangMoi { Id: 16 }' },
              { from: 1, to: 0, text: '201 Created', dashed: true },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Pages/QuanTri/DonHangRealtime.razor',
            code: `@page "/quan-tri/don-hang"
@attribute [Authorize(Roles = "Admin,NhanVien")]
@using Microsoft.AspNetCore.SignalR.Client
@implements IAsyncDisposable
@inject LocalStorageService Storage

@foreach (var d in donMoi)
{
    <div class="alert alert-success">Đơn #@d.Id — @d.TenKhach — @d.TongTien.ToString("N0") đ</div>
}

@code {
    HubConnection? ketNoi;
    List<ThongBaoDonHang> donMoi = new();

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (!firstRender) return;
        ketNoi = new HubConnectionBuilder()
            .WithUrl("https://localhost:7001/hubs/don-hang", o =>
                o.AccessTokenProvider = () => Storage.DocAsync<string>("accessToken"))
            .WithAutomaticReconnect()                         // thử lại sau 0, 2, 10, 30 giây
            .Build();

        ketNoi.On<ThongBaoDonHang>("DonHangMoi", async tb =>   // đăng ký TRƯỚC StartAsync
        {
            donMoi.Insert(0, tb);
            await InvokeAsync(StateHasChanged);              // callback chạy ngoài dispatcher
        });
        ketNoi.Reconnected += _ => TaiDonBiSotAsync();       // tin lúc mất mạng không được gửi bù

        await ketNoi.StartAsync();
    }

    Task TaiDonBiSotAsync() => Task.CompletedTask;          // gọi API lấy đơn sau mốc cuối đã nhận

    public async ValueTask DisposeAsync()
    {
        if (ketNoi is not null) await ketNoi.DisposeAsync();
    }
}`,
          },
        },
        {
          type: 'table',
          head: ['Bẫy', 'Triệu chứng', 'Cách xử lý'],
          rows: [
            ['Không đọc access_token ở server', '[Authorize] trên Hub luôn 401 (WebSocket không gửi được header)', 'JwtBearerEvents.OnMessageReceived gán ctx.Token khi path bắt đầu /hubs'],
            ['Vào nhóm một lần từ client', 'Sau khi kết nối lại không nhận tin', 'AddToGroupAsync trong OnConnectedAsync của Hub'],
            ['Gửi trước SaveChangesAsync', 'Quản trị thấy đơn không tồn tại', 'Lưu thành công rồi mới SendAsync'],
            ['Thiếu InvokeAsync(StateHasChanged)', 'Có dữ liệu nhưng màn hình đứng im', 'Bọc mọi cập nhật UI trong InvokeAsync'],
            ['Quên DisposeAsync', 'Rời trang vẫn còn kết nối, quay lại nhận trùng', '@implements IAsyncDisposable'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Blazor Server đã có SignalR, sao còn Hub riêng?',
          text: 'Kết nối của circuit là kênh nội bộ để đồng bộ giao diện của một tab, không gửi được tới "mọi quản trị viên". Hub riêng cho phép API hay service khác đẩy tin tới đúng nhóm / đúng người dùng, và dùng được cho cả Blazor WebAssembly hay ứng dụng di động.',
        },
      ],
      followUps: [
        'Clients.User và Clients.Group khác nhau gì?',
        'Chạy SignalR trên nhiều máy chủ cần thêm gì (backplane Redis, Azure SignalR)?',
        'Polling khác SignalR thế nào về chi phí và độ trễ?',
      ],
      buoi: [21, 30],
    },
    {
      id: 'pv-bz-20',
      level: 'Nâng cao',
      question: 'Upload ảnh với InputFile: xử lý thế nào cho an toàn? Blazor Server và WebAssembly khác gì?',
      short: 'InputFile trả IBrowserFile (Name, Size, ContentType, OpenReadStream). OpenReadStream mặc định chỉ cho đọc 500 KB nên phải truyền maxAllowedSize; kiểm tra ContentType và Size trong code vì accept chỉ lọc hộp thoại; xem trước bằng RequestImageFileAsync để thu nhỏ ngay trong trình duyệt. WebAssembly gửi file lên API bằng multipart/form-data, API phải kiểm tra lại và tự đặt tên file; Blazor Server ghi thẳng được trên máy chủ nhưng từng byte đi qua circuit SignalR nên phải giới hạn dung lượng.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Kiểm tra ảnh trước khi gửi',
            steps: [
              { kind: 'start', text: 'OnChange — nhận IBrowserFile' },
              { kind: 'decision', text: 'ContentType là ảnh cho phép?', branches: [
                { label: 'Không', steps: [{ kind: 'end', text: 'Báo "Chỉ nhận JPG, PNG, WEBP"' }] },
                { label: 'Có', steps: [{ kind: 'decision', text: 'Size ≤ 2 MB?', branches: [
                  { label: 'Không', steps: [{ kind: 'end', text: 'Báo vượt dung lượng' }] },
                  { label: 'Có', steps: [{ kind: 'process', text: 'RequestImageFileAsync → base64 → <img>' }] },
                ] }] },
              ] },
              { kind: 'end', text: 'Bấm Lưu → gửi multipart lên API, API kiểm tra lại' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Components/UploadAnhSanPham.razor',
            code: `<InputFile OnChange="ChonFileAsync" accept=".jpg,.jpeg,.png,.webp" />
<p class="text-danger">@loi</p>
@if (anhXemTruoc is not null) { <img src="@anhXemTruoc" style="max-width:240px" alt="Xem trước" /> }

@code {
    const long ToiDa = 2 * 1024 * 1024;   // 2 MB
    static readonly string[] KieuChoPhep = ["image/jpeg", "image/png", "image/webp"];
    string? anhXemTruoc, loi;

    async Task ChonFileAsync(InputFileChangeEventArgs e)
    {
        var file = e.File;
        loi = null; anhXemTruoc = null;
        if (!KieuChoPhep.Contains(file.ContentType)) { loi = "Chỉ nhận JPG, PNG, WEBP"; return; }
        if (file.Size > ToiDa) { loi = $"Ảnh {file.Size / 1024} KB vượt quá 2 MB"; return; }

        var anhNho = await file.RequestImageFileAsync("image/jpeg", 400, 400);   // thu nhỏ trong trình duyệt
        using var ms = new MemoryStream();
        await anhNho.OpenReadStream(ToiDa).CopyToAsync(ms);   // không truyền ToiDa → giới hạn 500 KB
        anhXemTruoc = "data:image/jpeg;base64," + Convert.ToBase64String(ms.ToArray());
    }
}`,
          },
        },
        {
          type: 'table',
          head: ['Lớp kiểm tra', 'Ở đâu', 'Vì sao'],
          rows: [
            ['accept=".jpg,.png…"', 'Thẻ InputFile', 'Chỉ lọc hộp thoại, chọn "All files" là qua'],
            ['ContentType + Size', 'Component Blazor', 'Báo lỗi ngay, không gửi file sai'],
            ['OpenReadStream(maxAllowedSize)', 'Component', 'Quá giới hạn ném IOException thay vì đọc cả file khổng lồ'],
            ['Kiểm tra lại đuôi, dung lượng, nội dung', 'API', 'Request có thể gửi thẳng bằng Postman; ContentType do client tự khai'],
            ['Tên file = Guid + đuôi', 'API khi lưu wwwroot/uploads', 'Tránh ghi đè và tên chứa ../ (path traversal)'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Blazor Server: file đi qua circuit',
          text: 'Ở Blazor Server code chạy trên máy chủ nên có thể stream thẳng file.OpenReadStream(ToiDa) vào FileStream, không cần API. Nhưng dữ liệu đi qua kết nối SignalR của circuit — file lớn làm chậm cả giao diện của tab đó, và đọc nguyên file vào MemoryStream nhân với nhiều người dùng sẽ ăn RAM máy chủ.',
        },
      ],
      followUps: [
        'Chọn nhiều file cùng lúc thì dùng gì (multiple, GetMultipleFiles)?',
        'Gửi file từ Blazor lên API bằng MultipartFormDataContent thế nào?',
      ],
      buoi: [22, 30],
    },
  ],
}

export default blazor
