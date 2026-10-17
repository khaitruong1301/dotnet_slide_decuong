import type { Buoi } from './types'

const buoi25: Buoi = {
  id: 25,
  slug: 'blazor-vong-doi-component',
  title: 'Vòng đời component',
  subtitle: 'Component sinh ra, nhận tham số, render, cập nhật và bị huỷ — đặt mỗi việc đúng phương thức để không tải trùng, không rò bộ nhớ',
  duration: '3 giờ',
  keywords: ['OnInitializedAsync', 'OnParametersSet', 'OnAfterRender', 'firstRender', 'ShouldRender', 'IDisposable', 'render mode'],
  goals: [
    'Kể đúng thứ tự các phương thức vòng đời và biết mỗi cái chạy mấy lần',
    'Tải dữ liệu đúng chỗ: OnInitializedAsync cho lần đầu, OnParametersSetAsync khi tham số đổi',
    'Dùng OnAfterRenderAsync(firstRender) cho JS interop và dọn dẹp bằng Dispose / DisposeAsync',
    'Phân biệt bốn render mode của .NET 8 và hiểu vì sao prerender làm code chạy hai lần',
  ],

  sections: [
    {
      id: 'thu-tu',
      title: '1. Thứ tự các phương thức vòng đời',
      blocks: [
        {
          type: 'text',
          text: 'Mỗi component Blazor là một đối tượng C#. Từ lúc được tạo đến lúc bị gỡ khỏi màn hình, framework gọi một chuỗi phương thức ảo mà ta có thể override. Biết thứ tự này là biết nên đặt việc tải dữ liệu, gọi JavaScript, đăng ký sự kiện ở đâu.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Vòng đời một component từ lúc tạo đến lúc huỷ',
            steps: [
              { kind: 'start', text: 'Router / component cha tạo đối tượng, inject service' },
              { kind: 'process', text: 'SetParametersAsync — gán các [Parameter]' },
              { kind: 'decision', text: 'Lần đầu tiên?', branches: [
                { label: 'Đúng', steps: [{ kind: 'process', text: 'OnInitialized / OnInitializedAsync' }] },
                { label: 'Sai', steps: [{ kind: 'note', text: 'Bỏ qua, không khởi tạo lại' }] },
              ] },
              { kind: 'process', text: 'OnParametersSet / OnParametersSetAsync' },
              { kind: 'decision', text: 'ShouldRender() trả true?', branches: [
                { label: 'Đúng', steps: [
                  { kind: 'process', text: 'BuildRenderTree → cập nhật DOM' },
                  { kind: 'process', text: 'OnAfterRender(firstRender) / OnAfterRenderAsync' },
                ] },
                { label: 'Sai', steps: [{ kind: 'note', text: 'Giữ nguyên giao diện cũ' }] },
              ] },
              { kind: 'io', text: 'Sự kiện / tham số đổi / StateHasChanged → quay lại render' },
              { kind: 'end', text: 'Gỡ khỏi màn hình → Dispose / DisposeAsync' },
            ],
          },
        },
        {
          type: 'table',
          head: ['Phương thức', 'Chạy khi', 'Số lần', 'Dùng để'],
          rows: [
            ['SetParametersAsync', 'Cha truyền tham số', 'Mỗi lần cha render', 'Hiếm khi override; phải gọi base'],
            ['OnInitialized(Async)', 'Component vừa tạo', '1 lần / đối tượng', 'Tải dữ liệu ban đầu, đăng ký sự kiện'],
            ['OnParametersSet(Async)', 'Sau khởi tạo và mỗi lần tham số đổi', 'Nhiều lần', 'Tải lại theo Id, tính giá trị dẫn xuất'],
            ['ShouldRender', 'Trước mỗi lần render (trừ lần đầu)', 'Nhiều lần', 'Chặn render thừa'],
            ['OnAfterRender(Async)', 'Sau khi DOM đã cập nhật', 'Nhiều lần', 'Gọi JS, focus ô nhập — chỉ khi firstRender'],
            ['Dispose / DisposeAsync', 'Component bị gỡ', '1 lần', 'Huỷ đăng ký sự kiện, dừng Timer, huỷ token'],
          ],
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Pages/NhatKyVongDoi.razor — in ra thứ tự thật',
            code: `@page "/nhat-ky"
<p>Lần bấm: @dem</p>
<button class="btn btn-primary" @onclick="() => dem++">Bấm</button>

@code {
    int dem;

    protected override void OnInitialized() => Console.WriteLine("1. OnInitialized");

    protected override void OnParametersSet() => Console.WriteLine("2. OnParametersSet");

    protected override bool ShouldRender()
    {
        Console.WriteLine("3. ShouldRender");
        return true;
    }

    protected override void OnAfterRender(bool firstRender) =>
        Console.WriteLine($"4. OnAfterRender firstRender={firstRender}");
}`,
            note: 'Mở trang: 1 → 2 → 4 (firstRender=True). ShouldRender không được gọi ở lần render đầu. Bấm nút: 3 → 4 (firstRender=False) — OnInitialized và OnParametersSet không chạy lại vì không có tham số nào đổi.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Bản Async chạy sau bản đồng bộ',
          text: 'Nếu override cả OnInitialized và OnInitializedAsync, Blazor gọi bản đồng bộ trước rồi mới await bản Async. Thực tế chỉ nên chọn một — thường là bản Async vì gần như mọi việc tải dữ liệu đều bất đồng bộ.',
        },
      ],
    },
    {
      id: 'tai-du-lieu',
      title: '2. Tải dữ liệu đúng chỗ',
      blocks: [
        {
          type: 'text',
          text: 'OnInitializedAsync có một đặc điểm quan trọng: khi gặp await đầu tiên chưa xong, Blazor render ngay một lần với dữ liệu còn null, rồi render lần nữa khi Task hoàn tất. Vì vậy markup luôn phải xử lý trạng thái "đang tải".',
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Một trang danh sách sản phẩm chạy OnInitializedAsync',
            items: [
              { label: 't = 0', text: 'Tạo component, danhSach = null' },
              { label: 'await', text: 'OnInitializedAsync gọi KhoSanPham.LayTatCaAsync(), chưa có kết quả' },
              { label: 'Render 1', text: 'danhSach == null → hiện "Đang tải…"' },
              { label: 't = 800ms', text: 'Task xong, gán danhSach = 12 sản phẩm' },
              { label: 'Render 2', text: 'Blazor tự render lại → hiện bảng' },
              { label: 'After', text: 'OnAfterRenderAsync(firstRender: false) chạy sau render 2' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Pages/DanhSachSanPham.razor — xử lý đủ ba trạng thái',
            code: `@page "/san-pham"
@inject KhoSanPham Kho

@if (danhSach is null)
{
    <p><em>Đang tải…</em></p>
}
else if (danhSach.Count == 0)
{
    <p>Chưa có sản phẩm nào.</p>
}
else
{
    <table class="table">
        @foreach (var sp in danhSach)
        {
            <tr><td>@sp.Ma</td><td>@sp.Ten</td><td>@sp.Gia.ToString("N0")</td></tr>
        }
    </table>
}

@code {
    List<SanPham>? danhSach;

    protected override async Task OnInitializedAsync()
    {
        danhSach = await Kho.LayTatCaAsync();
    }
}`,
            note: 'Không có nhánh danhSach is null thì lần render đầu sẽ NullReferenceException ở @foreach. Khởi tạo danhSach = new() cũng tránh được lỗi nhưng làm mất khả năng phân biệt "đang tải" với "rỗng".',
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
        don = null;                     // hiện "đang tải" cho đơn mới
        don = await Kho.LayTheoIdAsync(Id);
    }
}`,
            note: 'OnParametersSetAsync chạy cả khi cha render lại mà Id vẫn vậy, nên cần so với idDaTai để khỏi gọi trùng. Đặt don = null trước await để giao diện không hiện đơn cũ trong lúc chờ.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Chọn phương thức tải dữ liệu',
            columns: [
              { title: 'OnInitializedAsync', tone: 'good', items: ['Dữ liệu không phụ thuộc tham số', 'Danh sách sản phẩm, danh mục nhóm', 'Chạy đúng 1 lần mỗi đối tượng'] },
              { title: 'OnParametersSetAsync', tone: 'good', items: ['Dữ liệu theo [Parameter] / route', 'Chi tiết đơn theo Id', 'Chạy lại khi tham số đổi — cần so giá trị cũ'] },
              { title: 'OnAfterRenderAsync', tone: 'bad', items: ['Không dùng để tải dữ liệu', 'Gán dữ liệu ở đây phải tự StateHasChanged', 'Dễ thành vòng lặp render vô hạn'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Đừng gọi StateHasChanged trong OnAfterRender mà không có điều kiện',
          text: 'StateHasChanged → render → OnAfterRender → StateHasChanged → … vòng lặp không dừng, CPU 100%. Nếu thật cần, bọc trong if (firstRender) hoặc một cờ chỉ bật một lần.',
        },
      ],
    },
    {
      id: 'after-render-dispose',
      title: '3. OnAfterRender, ShouldRender và dọn dẹp',
      blocks: [
        {
          type: 'text',
          text: 'Chỉ sau khi render xong, phần tử HTML mới thật sự tồn tại trong trình duyệt. Mọi thao tác cần DOM — gọi thư viện JS, focus ô nhập, đọc kích thước — phải nằm trong OnAfterRenderAsync và hầu như luôn chỉ khi firstRender là true.',
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Focus ô tìm kiếm khi trang vừa mở',
            code: `@page "/tim-kiem"

<input @ref="oTimKiem" class="form-control" placeholder="Tìm sản phẩm…" />

@code {
    ElementReference oTimKiem;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await oTimKiem.FocusAsync();
        }
    }
}`,
            note: 'Trong OnInitialized, oTimKiem chưa gắn với phần tử nào — gọi FocusAsync sẽ lỗi. Không có if (firstRender) thì mỗi lần gõ phím (mỗi render) ô lại bị focus lại.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Đồng hồ khuyến mãi — Timer phải được huỷ',
            code: `@page "/flash-sale"
@implements IDisposable

<h4>Flash sale còn @conLai.ToString(@"hh\\:mm\\:ss")</h4>

@code {
    TimeSpan conLai = TimeSpan.FromHours(2);
    System.Threading.Timer? dongHo;

    protected override void OnInitialized()
    {
        dongHo = new System.Threading.Timer(_ =>
        {
            conLai -= TimeSpan.FromSeconds(1);
            InvokeAsync(StateHasChanged);   // Timer chạy ở thread khác
        }, null, 1000, 1000);
    }

    public void Dispose() => dongHo?.Dispose();
}`,
            note: 'Thiếu Dispose: rời trang rồi Timer vẫn chạy mãi, giữ component trong bộ nhớ, mỗi lần quay lại trang lại thêm một Timer. Timer gọi từ thread ngoài nên phải InvokeAsync(StateHasChanged).',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Trang flash sale từ lúc mở đến lúc rời',
            items: [
              { label: 'OnInitialized', text: 'Tạo Timer 1 giây' },
              { label: 'Render 1', text: 'Hiện 02:00:00' },
              { label: 'OnAfterRender(true)', text: 'DOM đã có — được gọi JS nếu cần' },
              { label: 'Mỗi giây', text: 'Tick → InvokeAsync(StateHasChanged) → render → OnAfterRender(false)' },
              { label: 'Rời trang', text: 'Router gỡ component → Dispose() huỷ Timer' },
            ],
          },
        },
        {
          type: 'table',
          head: ['Đã đăng ký gì', 'Phải dọn trong Dispose'],
          rows: [
            ['Timer, PeriodicTimer', 'dongHo.Dispose()'],
            ['Sự kiện service: GioHang.OnChange += CapNhat', 'GioHang.OnChange -= CapNhat'],
            ['CancellationTokenSource cho request dài', 'cts.Cancel(); cts.Dispose()'],
            ['IJSObjectReference (module JS)', 'await module.DisposeAsync() — dùng IAsyncDisposable'],
            ['NavigationManager.LocationChanged', 'Nav.LocationChanged -= XuLy'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'ShouldRender — chặn render khi không có gì đổi',
            code: `// BangGiaLon.razor.cs — bảng 2.000 dòng, cha render lại rất thường xuyên
public partial class BangGiaLon
{
    [Parameter] public List<SanPham> DanhSach { get; set; } = new();
    int phienBanDaVe = -1;
    [Parameter] public int PhienBan { get; set; }   // cha tăng khi dữ liệu thật sự đổi

    protected override bool ShouldRender()
    {
        if (PhienBan == phienBanDaVe) return false;
        phienBanDaVe = PhienBan;
        return true;
    }
}`,
            note: 'ShouldRender chỉ là tối ưu: trả false là bỏ qua lần render đó, giao diện có thể hiện dữ liệu cũ. Chỉ dùng khi đo thấy chậm, và lần render đầu tiên luôn diễn ra bất kể giá trị trả về.',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'IAsyncDisposable khi việc dọn dẹp là bất đồng bộ',
          text: 'Viết @implements IAsyncDisposable và public async ValueTask DisposeAsync() { if (module is not null) await module.DisposeAsync(); }. Blazor gọi DisposeAsync khi gỡ component; không cần cài cả hai interface.',
        },
      ],
    },
    {
      id: 'render-mode',
      title: '4. Render mode .NET 8 và prerender chạy hai lần',
      blocks: [
        {
          type: 'text',
          text: 'Từ .NET 8, một ứng dụng Blazor Web App chọn render mode cho từng trang hoặc từng component bằng @rendermode. Mỗi mode quyết định code C# chạy ở đâu và sự kiện @onclick có hoạt động hay không.',
        },
        {
          type: 'table',
          head: ['Render mode', 'Code chạy ở', 'Tương tác', 'Hợp với'],
          rows: [
            ['Static SSR (mặc định)', 'Máy chủ, render xong là trả HTML', 'Không có @onclick, chỉ form submit', 'Trang giới thiệu, chi tiết sản phẩm cần SEO'],
            ['InteractiveServer', 'Máy chủ, giữ kết nối SignalR (circuit)', 'Có, mỗi thao tác đi qua mạng', 'Trang quản trị nội bộ'],
            ['InteractiveWebAssembly', 'Trình duyệt, tải runtime .NET', 'Có, không cần mạng sau khi tải', 'Ứng dụng nhiều thao tác, chạy offline'],
            ['InteractiveAuto', 'Lần đầu Server, lần sau WebAssembly', 'Có', 'Muốn mở nhanh lại đỡ tải máy chủ'],
          ],
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Chọn render mode cho một trang',
            code: `@page "/gio-hang"
@rendermode InteractiveServer

@* hoặc tắt prerender để vòng đời chỉ chạy 1 lần *@
@* @rendermode @(new InteractiveServerRenderMode(prerender: false)) *@`,
            note: 'Program.cs phải đăng ký AddInteractiveServerComponents() và MapRazorComponents<App>().AddInteractiveServerRenderMode() thì mode này mới dùng được.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Prerender: vì sao OnInitializedAsync chạy hai lần',
            steps: [
              { kind: 'start', text: 'Trình duyệt GET /gio-hang' },
              { kind: 'process', text: 'Lượt 1 — máy chủ tạo component, chạy OnInitializedAsync, render HTML tĩnh' },
              { kind: 'io', text: 'Trả HTML: người dùng thấy trang ngay, chưa bấm được' },
              { kind: 'process', text: 'blazor.web.js mở circuit SignalR' },
              { kind: 'process', text: 'Lượt 2 — tạo đối tượng component MỚI, chạy OnInitializedAsync lần nữa' },
              { kind: 'decision', text: 'Có lưu trạng thái từ lượt 1?', branches: [
                { label: 'Không', steps: [{ kind: 'note', text: 'Gọi CSDL / API hai lần, trang có thể nháy' }] },
                { label: 'Có', steps: [{ kind: 'note', text: 'PersistentComponentState: lượt 2 đọc lại, không gọi lại' }] },
              ] },
              { kind: 'end', text: 'Trang tương tác được' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Không gọi JS trong OnInitialized khi có prerender',
          text: 'Ở lượt prerender chưa có trình duyệt nào để chạy JavaScript — IJSRuntime ném InvalidOperationException. Đó là thêm một lý do mọi JS interop phải nằm trong OnAfterRenderAsync, phương thức không bao giờ chạy trong lượt prerender.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Phát hiện đang ở lượt nào',
          text: 'Từ .NET 9 có RendererInfo.IsInteractive: false nghĩa là đang prerender hoặc Static SSR — có thể ẩn nút bấm hoặc hiện "Đang kết nối…" cho đến khi lượt tương tác bắt đầu.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b25-1', level: 'Cơ bản', title: 'Nhật ký vòng đời',
      requirement: 'Cho trang /nhat-ky có một bộ đếm và nút Bấm. Override OnInitialized, OnParametersSet, ShouldRender, OnAfterRender và Dispose, mỗi phương thức ghi một dòng vào List<string> nhatKy và hiện danh sách đó dưới nút. Rời trang sang trang khác thì in "Dispose" ra Console.',
      signature: '@implements IDisposable · List<string> nhatKy',
      examples: [
        { input: 'Mở trang', output: 'OnInitialized, OnParametersSet, OnAfterRender(True)' },
        { input: 'Bấm nút một lần', output: 'Thêm: ShouldRender, OnAfterRender(False)', explain: 'Dòng OnAfterRender ghi sau render nên chỉ hiện ở lần render kế tiếp.' },
      ],
    },
    {
      id: 'b25-2', level: 'Cơ bản', title: 'Ba trạng thái tải',
      requirement: 'Cho service KhoSanPham có LayTatCaAsync() giả lập trễ 1 giây bằng Task.Delay. Xây dựng trang /san-pham tải danh sách trong OnInitializedAsync và hiện đúng ba trạng thái: đang tải, rỗng, có dữ liệu.',
      signature: 'Task<List<SanPham>> LayTatCaAsync()',
      constraints: ['Biến danh sách khai báo List<SanPham>? và khởi tạo null'],
      examples: [
        { input: 'Mở trang', output: '"Đang tải…" trong 1 giây rồi hiện bảng 5 sản phẩm' },
        { input: 'Kho trả list rỗng', output: '"Chưa có sản phẩm nào."' },
      ],
    },
    {
      id: 'b25-3', level: 'Trung bình', title: 'Chi tiết đơn đổi theo Id',
      requirement: 'Cho trang /don-hang/{id:int} có nút "Đơn trước" và "Đơn sau" điều hướng sang id ± 1. Dữ liệu đơn tải từ KhoDonHang.LayTheoIdAsync (trễ 500ms). Xây dựng trang sao cho mỗi lần đổi Id đều hiện đúng đơn mới, có trạng thái đang tải, và không gọi kho khi Id không đổi.',
      signature: 'protected override async Task OnParametersSetAsync()',
      visual: {
        kind: 'flow',
        caption: 'OnParametersSetAsync của trang chi tiết đơn',
        steps: [
          { kind: 'start', text: 'Id mới từ route' },
          { kind: 'decision', text: 'Id == idDaTai ?', branches: [
            { label: 'Đúng', steps: [{ kind: 'end', text: 'Bỏ qua, không gọi kho' }] },
            { label: 'Sai', steps: [
              { kind: 'process', text: 'idDaTai = Id; don = null (hiện đang tải)' },
              { kind: 'process', text: 'don = await Kho.LayTheoIdAsync(Id)' },
              { kind: 'io', text: 'don null → "Không tìm thấy", ngược lại hiện đơn' },
            ] },
          ] },
        ],
      },

      constraints: ['Đếm số lần gọi kho bằng một biến static và hiện ra màn hình', 'Id không tồn tại thì hiện "Không tìm thấy đơn #id"'],
      examples: [
        { input: 'Ở /don-hang/3 bấm Đơn sau', output: 'URL /don-hang/4, hiện "Đang tải đơn 4…" rồi đơn #4; số lần gọi tăng 1' },
        { input: 'Tải bằng OnInitializedAsync thay vì OnParametersSetAsync', output: 'URL đổi nhưng vẫn hiện đơn #3', explain: 'Cùng component được dùng lại, OnInitializedAsync không chạy lần hai.' },
      ],
    },
    {
      id: 'b25-4', level: 'Trung bình', title: 'Đồng hồ flash sale',
      requirement: 'Xây dựng component DongHoKhuyenMai nhận [Parameter] DateTime KetThuc, đếm ngược từng giây đến KetThuc, hết giờ thì hiện "Đã kết thúc" và dừng Timer. Component phải huỷ Timer khi bị gỡ.',
      signature: '<DongHoKhuyenMai KetThuc="@moc" /> · @implements IDisposable',
      constraints: ['Cập nhật giao diện bằng InvokeAsync(StateHasChanged)', 'Đặt hai đồng hồ trên cùng trang vẫn chạy độc lập'],
      examples: [
        { input: 'KetThuc = bây giờ + 5 giây', output: '00:00:05 … 00:00:01 rồi "Đã kết thúc"' },
        { input: 'Rời trang khi còn 1 giờ', output: 'Console không còn log tick nào', explain: 'Dispose đã huỷ Timer; thiếu Dispose thì tick vẫn chạy ngầm.' },
      ],
      visual: {
        kind: 'flow',
        caption: 'Vòng đời của đồng hồ đếm ngược',
        steps: [
          { kind: 'start', text: 'OnInitialized: tạo Timer 1 giây' },
          { kind: 'process', text: 'Tick: conLai = KetThuc - DateTime.Now' },
          { kind: 'decision', text: 'conLai <= 0 ?', branches: [
            { label: 'Đúng', steps: [{ kind: 'process', text: 'Hiện "Đã kết thúc", dừng Timer' }] },
            { label: 'Sai', steps: [{ kind: 'process', text: 'InvokeAsync(StateHasChanged)' }] },
          ] },
          { kind: 'end', text: 'Dispose: dongHo?.Dispose()' },
        ],
      },
    },
    {
      id: 'b25-5', level: 'Trung bình', title: 'Focus và chọn sẵn ô số lượng',
      requirement: 'Cho trang thêm vào giỏ có ô số lượng. Khi trang vừa mở, ô số lượng phải được focus và bôi đen sẵn giá trị 1 để người dùng gõ đè. Gõ số lượng không được làm ô bị focus lại.',
      signature: 'ElementReference oSoLuong · OnAfterRenderAsync(bool firstRender)',
      constraints: ['Bôi đen bằng JS: element.select() gọi qua IJSRuntime.InvokeVoidAsync', 'Không gọi JS trong OnInitialized'],
      examples: [
        { input: 'Mở trang', output: 'Con trỏ ở ô số lượng, chữ 1 được bôi đen' },
        { input: 'Bỏ điều kiện if (firstRender)', output: 'Mỗi lần gõ, ô bị bôi đen lại', explain: 'Mỗi lần gõ có @bind sinh một lần render, OnAfterRenderAsync chạy lại.' },
      ],
    },
    {
      id: 'b25-6', level: 'Nâng cao', title: 'Đo prerender chạy hai lần',
      requirement: 'Cho trang /bang-gia dùng @rendermode InteractiveServer, trong OnInitializedAsync gọi KhoSanPham.LayTatCaAsync và tăng một biến đếm static mỗi lần gọi. Chứng minh có hai lần gọi khi F5, rồi sửa để chỉ còn một lần gọi kho mà trang vẫn hiện dữ liệu ngay trong HTML đầu tiên.',
      tasks: [
        'Ghi log số lần gọi kho mỗi khi F5 trang',
        'Cách 1: tắt prerender bằng new InteractiveServerRenderMode(prerender: false) và ghi nhận khác biệt khi xem nguồn trang',
        'Cách 2: giữ prerender, dùng PersistentComponentState để lượt 2 đọc lại dữ liệu lượt 1',
        'Viết bảng so sánh hai cách: số lần gọi kho, HTML đầu tiên có dữ liệu không, thời gian thấy nội dung',
      ],
      signature: '[Inject] PersistentComponentState TrangThai · RegisterOnPersisting · TryTakeFromJson<List<SanPham>>',
      examples: [
        { input: 'F5 khi chưa sửa', output: 'Số lần gọi kho tăng 2' },
        { input: 'F5 với PersistentComponentState', output: 'Số lần gọi kho tăng 1, View Source vẫn thấy bảng giá', explain: 'Dữ liệu lượt 1 được nhúng vào HTML, lượt 2 lấy ra thay vì gọi kho.' },
      ],
      visual: {
        kind: 'seq',
        caption: 'Prerender có lưu trạng thái',
        actors: ['Trình duyệt', 'Máy chủ (prerender)', 'Circuit', 'KhoSanPham'],
        steps: [
          { from: 0, to: 1, text: 'GET /bang-gia' },
          { from: 1, to: 3, text: 'LayTatCaAsync() — lần 1' },
          { from: 3, to: 1, text: '12 sản phẩm', dashed: true },
          { from: 1, to: 0, text: 'HTML + dữ liệu đã lưu', dashed: true },
          { from: 0, to: 2, text: 'Mở SignalR, tạo component mới' },
          { from: 2, to: 0, text: 'TryTakeFromJson có dữ liệu → render, không gọi kho' },
        ],
      },
      hint: 'Trong OnInitializedAsync: nếu TryTakeFromJson được thì dùng luôn, ngược lại mới gọi kho. Đăng ký RegisterOnPersisting để lưu danh sách, và nhớ Dispose subscription trả về.',
    },
    {
      id: 'b25-7', level: 'Nâng cao', title: 'Huỷ request khi rời trang',
      requirement: 'Cho trang /bao-cao gọi KhoDonHang.TongHopAsync(CancellationToken) mất 5 giây. Nếu người dùng rời trang trước khi xong, request phải bị huỷ và không có lỗi nào hiện ra. Nếu người dùng đổi tháng (tham số route) giữa chừng, request cũ bị huỷ và request mới bắt đầu.',
      tasks: [
        'Tạo CancellationTokenSource mới mỗi lần OnParametersSetAsync chạy với tháng mới, huỷ cái cũ',
        'Bắt OperationCanceledException và bỏ qua yên lặng',
        'Cài IDisposable: Cancel và Dispose token đang dùng',
        'Ghi log "Huỷ tháng X" để kiểm chứng',
      ],
      signature: '@page "/bao-cao/{thang:int}" · Task<BaoCao> TongHopAsync(int thang, CancellationToken ct)',
      examples: [
        { input: 'Mở /bao-cao/9, sau 2 giây bấm sang trang chủ', output: 'Log "Huỷ tháng 9", không có exception' },
        { input: 'Mở /bao-cao/9, sau 1 giây chuyển /bao-cao/10', output: 'Log "Huỷ tháng 9", 5 giây sau hiện báo cáo tháng 10', explain: 'Nếu không huỷ, kết quả tháng 9 về muộn có thể ghi đè kết quả tháng 10.' },
      ],
      hint: 'Giữ một trường CancellationTokenSource? cts. Trước khi gọi mới: cts?.Cancel(); cts = new(). Sau await, chỉ gán kết quả nếu token chưa bị huỷ.',
    },
    {
      id: 'b25-8', level: 'Nâng cao', title: 'Chọn render mode cho cả cửa hàng',
      requirement: 'Cho ứng dụng cửa hàng điện máy có các trang: trang chủ, danh sách sản phẩm (cần SEO), chi tiết sản phẩm, giỏ hàng, thanh toán, trang quản trị kho, trang so sánh sản phẩm kéo thả. Xây dựng bảng chọn render mode cho từng trang kèm lý do, và cấu hình Program.cs, App.razor tương ứng.',
      tasks: [
        'Bảng: trang → render mode → có prerender không → lý do',
        'Program.cs đăng ký đủ các mode đã dùng',
        'Chỉ ra trang nào có nút cần tương tác mà nếu để Static SSR sẽ không bấm được',
        'Nêu trang nào sẽ chịu ảnh hưởng gọi dữ liệu hai lần và cách xử lý',
      ],
      signature: 'AddRazorComponents().AddInteractiveServerComponents().AddInteractiveWebAssemblyComponents()',
      examples: [
        { input: 'Danh sách sản phẩm', output: 'Static SSR — cần SEO, chỉ có link và form lọc GET' },
        { input: 'Giỏ hàng', output: 'InteractiveServer — nút +/- số lượng, dữ liệu nhạy cảm ở máy chủ', explain: 'Để Static SSR thì @onclick không chạy, nút bấm không phản hồi.' },
      ],
      hint: 'Mode chọn trên component cha áp cho cả cây con; một component con WebAssembly phải nằm trong project .Client.',
    },
  ],
}

export default buoi25
