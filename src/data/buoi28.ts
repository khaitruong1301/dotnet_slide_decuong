import type { Buoi } from './types'

const buoi28: Buoi = {
  id: 28,
  slug: 'blazor-javascript-interop-va-luu-tru-trinh-duyet',
  title: 'JavaScript Interop & lưu trữ phía trình duyệt',
  subtitle: 'Gọi JavaScript từ C#, gọi ngược C# từ JavaScript, và giữ dữ liệu trên máy người dùng qua localStorage',
  duration: '3 giờ',
  keywords: ['IJSRuntime', 'InvokeAsync', 'OnAfterRenderAsync', 'IJSObjectReference', 'DotNetObjectReference', 'JSInvokable', 'localStorage'],
  goals: [
    'Gọi hàm JavaScript từ component bằng IJSRuntime đúng thời điểm (sau lần render đầu)',
    'Tách JS thành module trong wwwroot và nạp bằng IJSObjectReference',
    'Cho JavaScript gọi ngược phương thức C# qua DotNetObjectReference và [JSInvokable]',
    'Lưu clientId, giỏ hàng vào localStorage để giữ dữ liệu qua F5',
  ],

  sections: [
    {
      id: 'ijsruntime',
      title: '1. IJSRuntime — gọi JavaScript từ C#',
      blocks: [
        {
          type: 'text',
          text: 'Blazor viết giao diện bằng C#, nhưng một số việc chỉ trình duyệt làm được: alert, confirm, focus vào ô nhập, copy vào clipboard, đọc localStorage, vẽ biểu đồ bằng thư viện JS. Cầu nối là dịch vụ IJSRuntime được inject sẵn: InvokeVoidAsync khi không cần kết quả, InvokeAsync<T> khi cần giá trị trả về.',
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Pages/XoaSanPham.razor — hỏi xác nhận trước khi xoá',
            code: `@inject IJSRuntime JS

<button class="btn btn-danger" @onclick="XoaAsync">Xoá @sanPham.Ten</button>

@code {
    SanPham sanPham = new() { Ma = "TV01", Ten = "Tivi Samsung 55 inch" };

    async Task XoaAsync()
    {
        // window.confirm trả về true/false → InvokeAsync<bool>
        bool dongY = await JS.InvokeAsync<bool>("confirm", $"Xoá {sanPham.Ten}?");
        if (!dongY) return;

        await SanPhamService.XoaAsync(sanPham.Ma);
        await JS.InvokeVoidAsync("alert", "Đã xoá!");   // không cần kết quả
    }
}`,
            note: 'Tham số đầu là tên hàm tính từ window: "confirm" nghĩa là window.confirm, "localStorage.setItem" nghĩa là window.localStorage.setItem. Mọi lời gọi đều bất đồng bộ — luôn await.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Một lời gọi InvokeAsync<bool>("confirm", …)',
            actors: ['Component C#', 'IJSRuntime', 'Trình duyệt (JS)'],
            steps: [
              { from: 0, to: 1, text: 'InvokeAsync<bool>("confirm", "Xoá Tivi?")' },
              { from: 1, to: 2, text: 'Tuần tự hoá tham số thành JSON, gọi window.confirm' },
              { from: 2, to: 2, text: 'Người dùng bấm OK' },
              { from: 2, to: 1, text: 'true (JSON)', dashed: true },
              { from: 1, to: 0, text: 'Giải tuần tự → bool dongY = true', dashed: true },
            ],
          },
        },
        {
          type: 'text',
          text: 'Câu hỏi quan trọng nhất: gọi JS lúc nào? Trong OnInitialized, phần tử HTML chưa có trên trang; với Blazor Server có prerender, lúc đó thậm chí chưa có kết nối tới trình duyệt. Chỗ an toàn là OnAfterRenderAsync(firstRender) — DOM đã có và JS đã sẵn sàng.',
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Focus vào ô tìm kiếm khi trang vừa mở',
            code: `@inject IJSRuntime JS

<input @ref="oTimKiem" class="form-control" placeholder="Tìm sản phẩm..." />

@code {
    ElementReference oTimKiem;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await oTimKiem.FocusAsync();   // Blazor có sẵn, bên dưới cũng là JS interop
        }
    }
}`,
            note: 'Thiếu if (firstRender) thì mỗi lần component render lại (gõ phím, bấm nút) đều focus lại — người dùng không thể bấm sang ô khác. Đặt việc chỉ làm một lần trong nhánh firstRender.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Vòng đời và chỗ được gọi JS',
            steps: [
              { kind: 'start', text: 'Component được tạo' },
              { kind: 'process', text: 'OnInitialized(Async) — CHƯA có DOM, không gọi JS' },
              { kind: 'process', text: 'OnParametersSet(Async)' },
              { kind: 'process', text: 'Render HTML ra trình duyệt' },
              { kind: 'process', text: 'OnAfterRenderAsync(firstRender)' },
              {
                kind: 'decision',
                text: 'firstRender == true?',
                branches: [
                  { label: 'Có', steps: [{ kind: 'io', text: 'Gọi JS: đọc localStorage, focus, khởi tạo thư viện' }] },
                  { label: 'Không', steps: [{ kind: 'process', text: 'Bỏ qua — tránh gọi lặp' }] },
                ],
              },
              { kind: 'end', text: 'Đổi state → StateHasChanged → render lại' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'InvalidOperationException: JavaScript interop calls cannot be issued at this time',
          text: 'Lỗi kinh điển khi gọi JS trong OnInitializedAsync ở Blazor Server/Web App có prerender: lúc máy chủ dựng HTML sẵn, chưa có trình duyệt nào để gọi. Chuyển lời gọi vào OnAfterRenderAsync(firstRender), rồi gọi StateHasChanged() nếu có dữ liệu mới cần hiện.',
        },
      ],
    },
    {
      id: 'js-module',
      title: '2. File .js trong wwwroot và module IJSObjectReference',
      blocks: [
        {
          type: 'text',
          text: 'Hàm JS tự viết nên đặt trong wwwroot. Cách cũ: thêm thẻ <script> vào index.html / App.razor và gắn hàm vào window. Cách nên dùng: viết thành ES module (export function), component tự import khi cần — không làm bẩn window, chỉ tải khi dùng.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Vị trí file JS trong dự án',
            root: {
              label: 'CuaHangDienMay.Client',
              children: [
                {
                  label: 'wwwroot',
                  children: [
                    { label: 'index.html', note: 'cách cũ: <script src="js/tienich.js">' },
                    {
                      label: 'js',
                      children: [
                        { label: 'tienich.js', note: 'module: export function', highlight: true },
                        { label: 'luutru.js', note: 'bọc localStorage', highlight: true },
                      ],
                    },
                  ],
                },
                { label: 'Pages', children: [{ label: 'GioHang.razor', note: 'import("./js/luutru.js")' }] },
                { label: 'Program.cs' },
              ],
            },
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'js',
            title: 'wwwroot/js/tienich.js',
            code: `export function copyVaoClipboard(noiDung) {
    return navigator.clipboard.writeText(noiDung);
}

export function cuonLenDau() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

export function kichThuocManHinh() {
    return { rong: window.innerWidth, cao: window.innerHeight };
}`,
            note: 'Hàm trả về object JS thì bên C# nhận bằng một class/record có property cùng tên (không phân biệt hoa thường): record KichThuoc(int Rong, int Cao).',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Import module và dọn dẹp khi rời trang',
            code: `@implements IAsyncDisposable
@inject IJSRuntime JS

<button @onclick="CopyMaDon">Copy mã đơn DH0015</button>

@code {
    IJSObjectReference? module;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
            module = await JS.InvokeAsync<IJSObjectReference>("import", "./js/tienich.js");
    }

    async Task CopyMaDon()
    {
        if (module is not null)
            await module.InvokeVoidAsync("copyVaoClipboard", "DH0015");
    }

    public async ValueTask DisposeAsync()
    {
        if (module is not null) await module.DisposeAsync();
    }
}`,
            note: 'Đường dẫn "./js/tienich.js" tính từ gốc wwwroot. Module là tài nguyên phía JS nên phải DisposeAsync khi component bị huỷ — quên thì mỗi lần vào trang lại giữ thêm một tham chiếu.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Hàm toàn cục hay module?',
            columns: [
              { title: 'window.tenHam + <script>', tone: 'bad', items: ['Tải ngay khi mở app dù không dùng', 'Dễ trùng tên giữa các file', 'Gọi JS.InvokeVoidAsync("tenHam")'] },
              { title: 'ES module + import', tone: 'good', items: ['Tải khi component cần', 'Phạm vi riêng, không trùng tên', 'Gọi module.InvokeVoidAsync("tenHam")'] },
            ],
          },
        },
      ],
    },
    {
      id: 'js-goi-net',
      title: '3. Gọi ngược .NET từ JavaScript',
      blocks: [
        {
          type: 'text',
          text: 'Có lúc JS là bên khởi xướng: trình duyệt đổi kích thước, mất mạng, thư viện bản đồ báo người dùng chọn chi nhánh. Ta đánh dấu phương thức C# bằng [JSInvokable], bọc component bằng DotNetObjectReference.Create(this) rồi đưa tham chiếu đó cho JS. JS gọi lại bằng invokeMethodAsync.',
        },
        {
          type: 'code',
          sample: {
            lang: 'js',
            title: 'wwwroot/js/mang.js — báo cho C# khi mất/có mạng',
            code: `let thamChieu = null;

function baoOnline()  { thamChieu.invokeMethodAsync("CapNhatMang", true); }
function baoOffline() { thamChieu.invokeMethodAsync("CapNhatMang", false); }

export function theoDoiMang(dotNetRef) {
    thamChieu = dotNetRef;
    window.addEventListener("online", baoOnline);
    window.addEventListener("offline", baoOffline);
    return navigator.onLine;
}

export function boTheoDoi() {
    window.removeEventListener("online", baoOnline);
    window.removeEventListener("offline", baoOffline);
    thamChieu = null;
}`,
            note: 'Tên truyền vào invokeMethodAsync phải trùng đúng tên phương thức C# (phân biệt hoa thường).',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Components/TrangThaiMang.razor',
            code: `@implements IAsyncDisposable
@inject IJSRuntime JS

@if (!coMang) { <div class="alert alert-warning">Mất kết nối mạng — đơn hàng chưa gửi được</div> }

@code {
    bool coMang = true;
    IJSObjectReference? module;
    DotNetObjectReference<TrangThaiMang>? thamChieu;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (!firstRender) return;
        thamChieu = DotNetObjectReference.Create(this);
        module = await JS.InvokeAsync<IJSObjectReference>("import", "./js/mang.js");
        coMang = await module.InvokeAsync<bool>("theoDoiMang", thamChieu);
        StateHasChanged();
    }

    [JSInvokable]
    public void CapNhatMang(bool online)
    {
        coMang = online;
        StateHasChanged();   // JS gọi vào → Blazor không tự biết để render lại
    }

    public async ValueTask DisposeAsync()
    {
        if (module is not null) { await module.InvokeVoidAsync("boTheoDoi"); await module.DisposeAsync(); }
        thamChieu?.Dispose();
    }
}`,
            note: 'Phương thức [JSInvokable] phải public. Sự kiện đến từ JS không đi qua cơ chế sự kiện của Blazor nên phải tự gọi StateHasChanged(). Ở Blazor Server, nếu phương thức chạy ngoài luồng UI thì dùng InvokeAsync(StateHasChanged).',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Hai chiều: C# đăng ký, JS báo ngược',
            actors: ['TrangThaiMang (C#)', 'mang.js', 'Trình duyệt'],
            steps: [
              { from: 0, to: 1, text: 'theoDoiMang(DotNetObjectReference)' },
              { from: 1, to: 2, text: 'addEventListener("offline")' },
              { from: 1, to: 0, text: 'navigator.onLine = true', dashed: true },
              { from: 2, to: 1, text: 'Sự kiện offline (rút dây mạng)' },
              { from: 1, to: 0, text: 'invokeMethodAsync("CapNhatMang", false)' },
              { from: 0, to: 0, text: 'coMang = false → StateHasChanged → hiện cảnh báo' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Rò rỉ bộ nhớ vì quên Dispose',
          text: 'DotNetObjectReference giữ component sống trong bộ nhớ chừng nào JS còn giữ nó. Rời trang mà không bỏ addEventListener và Dispose tham chiếu thì component cũ vẫn bị gọi — thậm chí ném lỗi vì đã bị huỷ. Luôn @implements IAsyncDisposable.',
        },
      ],
    },
    {
      id: 'local-storage',
      title: '4. localStorage, sessionStorage và clientId',
      blocks: [
        {
          type: 'table',
          head: ['Nơi lưu', 'Sống bao lâu', 'Phạm vi', 'Dùng cho'],
          rows: [
            ['Biến trong component', 'Đến khi rời trang', 'Một component', 'State tạm của form'],
            ['Service Scoped / Singleton (WASM)', 'Đến khi F5', 'Cả app trong một tab', 'Giỏ hàng trong phiên'],
            ['sessionStorage', 'Đến khi đóng tab', 'Một tab', 'Bước đang làm của form nhiều bước'],
            ['localStorage', 'Đến khi xoá thủ công', 'Mọi tab cùng tên miền', 'clientId, giỏ hàng, giao diện sáng/tối'],
            ['ProtectedLocalStorage (Server)', 'Như localStorage', 'Mọi tab', 'Dữ liệu được mã hoá bằng Data Protection'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'Services/LocalStorageService.cs — bọc localStorage cho dễ dùng',
            code: `using System.Text.Json;
using Microsoft.JSInterop;

public class LocalStorageService(IJSRuntime js)
{
    public async Task LuuAsync<T>(string khoa, T giaTri)
    {
        string json = JsonSerializer.Serialize(giaTri);
        await js.InvokeVoidAsync("localStorage.setItem", khoa, json);
    }

    public async Task<T?> DocAsync<T>(string khoa)
    {
        string? json = await js.InvokeAsync<string?>("localStorage.getItem", khoa);
        return json is null ? default : JsonSerializer.Deserialize<T>(json);
    }

    public ValueTask XoaAsync(string khoa) =>
        js.InvokeVoidAsync("localStorage.removeItem", khoa);
}

// Program.cs
// builder.Services.AddScoped<LocalStorageService>();`,
            note: 'localStorage chỉ lưu chuỗi. Object phải Serialize thành JSON khi lưu và Deserialize khi đọc. getItem trả về null khi chưa có khoá — kiểu nhận phải là string?.',
          },
        },
        {
          type: 'text',
          text: 'Slide trang 148 hướng dẫn tạo clientId lưu ở localStorage: mỗi trình duyệt có một mã định danh riêng, sinh một lần và dùng mãi. Máy chủ dùng clientId này để ghi refresh token theo thiết bị, thu hồi token của thiết bị khác khi người dùng đăng nhập ở máy mới.',
        },
        {
          type: 'code',
          sample: {
            title: 'Services/ClientIdService.cs',
            code: `public class ClientIdService(LocalStorageService storage)
{
    const string Khoa = "clientId";
    string? clientId;   // nhớ trong bộ nhớ, khỏi gọi JS nhiều lần

    public async Task<string> LayClientIdAsync()
    {
        if (clientId is not null) return clientId;

        clientId = await storage.DocAsync<string>(Khoa);
        if (string.IsNullOrEmpty(clientId))
        {
            clientId = Guid.NewGuid().ToString();
            await storage.LuuAsync(Khoa, clientId);
        }
        return clientId;
    }
}`,
            note: 'Gọi LayClientIdAsync trong OnAfterRenderAsync(firstRender) của MainLayout hoặc trước khi gọi API đăng nhập rồi gửi kèm header X-Client-Id.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Lấy clientId của trình duyệt',
            steps: [
              { kind: 'start', text: 'LayClientIdAsync()' },
              {
                kind: 'decision',
                text: 'Đã có trong biến clientId?',
                branches: [
                  { label: 'Có', steps: [{ kind: 'end', text: 'Trả về ngay' }] },
                  {
                    label: 'Chưa',
                    steps: [
                      { kind: 'io', text: 'localStorage.getItem("clientId")' },
                      {
                        kind: 'decision',
                        text: 'Rỗng / null?',
                        branches: [
                          { label: 'Có', steps: [{ kind: 'process', text: 'Guid.NewGuid()' }, { kind: 'io', text: 'localStorage.setItem("clientId", …)' }] },
                          { label: 'Không', steps: [{ kind: 'process', text: 'Dùng giá trị đã lưu' }] },
                        ],
                      },
                    ],
                  },
                ],
              },
              { kind: 'end', text: 'Trả về clientId (giữ nguyên qua F5, đóng mở trình duyệt)' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'localStorage không phải két sắt',
          text: 'Mọi script chạy trên trang (kể cả script bị chèn qua lỗ hổng XSS) đều đọc được localStorage. Không lưu mật khẩu, số thẻ. ProtectedLocalStorage của Blazor Server mã hoá nội dung nên người dùng không sửa tay được, nhưng nó chỉ có ở Server, không có ở WebAssembly.',
        },
      ],
    },
    {
      id: 'gio-hang-f5',
      title: '5. Giỏ hàng giữ qua F5',
      blocks: [
        {
          type: 'text',
          text: 'Buổi trước giỏ hàng là service Scoped: chuyển trang vẫn còn nhưng F5 là mất, vì F5 tải lại toàn bộ ứng dụng. Ghép service đó với LocalStorageService: mỗi lần giỏ đổi thì ghi xuống, lúc ứng dụng khởi động thì đọc lên.',
        },
        {
          type: 'code',
          sample: {
            title: 'Services/GioHangService.cs',
            code: `public record DongGio(string MaSanPham, string Ten, decimal Gia, int SoLuong);

public class GioHangService(LocalStorageService storage)
{
    const string Khoa = "gioHang";
    public List<DongGio> Dong { get; private set; } = new();
    public bool DaNap { get; private set; }
    public event Action? DaThayDoi;

    public decimal TongTien => Dong.Sum(d => d.Gia * d.SoLuong);

    public async Task NapAsync()
    {
        if (DaNap) return;
        Dong = await storage.DocAsync<List<DongGio>>(Khoa) ?? new();
        DaNap = true;
        DaThayDoi?.Invoke();
    }

    public async Task ThemAsync(SanPham sp)
    {
        int i = Dong.FindIndex(d => d.MaSanPham == sp.Ma);
        if (i >= 0) Dong[i] = Dong[i] with { SoLuong = Dong[i].SoLuong + 1 };
        else Dong.Add(new DongGio(sp.Ma, sp.Ten, sp.Gia, 1));
        await storage.LuuAsync(Khoa, Dong);
        DaThayDoi?.Invoke();
    }
}`,
            note: 'DaNap tránh ghi đè: nếu người dùng bấm Thêm trước khi nạp xong, danh sách rỗng sẽ được ghi đè lên giỏ cũ trong localStorage. Ở bài tập, hãy chặn nút Thêm khi DaNap = false.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Layout/MainLayout.razor — nạp giỏ một lần',
            code: `@inherits LayoutComponentBase
@implements IDisposable
@inject GioHangService GioHang

<header>Giỏ hàng: @GioHang.Dong.Sum(d => d.SoLuong) món — @GioHang.TongTien.ToString("N0") đ</header>
<main>@Body</main>

@code {
    protected override void OnInitialized() => GioHang.DaThayDoi += StateHasChanged;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender) await GioHang.NapAsync();
    }

    public void Dispose() => GioHang.DaThayDoi -= StateHasChanged;
}`,
            note: 'Đăng ký sự kiện trong OnInitialized là được (không gọi JS), còn đọc localStorage phải đợi OnAfterRenderAsync.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Bấm F5 khi giỏ có 2 món',
            steps: [
              { kind: 'start', text: 'F5 — ứng dụng tải lại, GioHangService mới, Dong rỗng' },
              { kind: 'process', text: 'MainLayout render lần đầu: "Giỏ hàng: 0 món"' },
              { kind: 'io', text: 'OnAfterRenderAsync → localStorage.getItem("gioHang")' },
              { kind: 'process', text: 'Deserialize → 2 dòng, DaNap = true' },
              { kind: 'process', text: 'DaThayDoi → StateHasChanged' },
              { kind: 'end', text: 'Header hiện "Giỏ hàng: 2 món"' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Chớp "0 món" trong tích tắc',
          text: 'Lần render đầu luôn chạy trước khi đọc được localStorage, nên header có thể nháy "0 món". Hiện "Đang tải…" khi DaNap = false thay vì số 0 để người dùng không tưởng giỏ bị mất.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b28-1', level: 'Cơ bản', title: 'Xác nhận trước khi xoá',
      requirement: 'Cho trang danh sách sản phẩm có nút Xoá ở mỗi dòng. Xây dựng thao tác xoá có hỏi xác nhận bằng window.confirm; chọn Huỷ thì không làm gì, chọn OK thì xoá khỏi danh sách và hiện alert "Đã xoá <tên>".',
      signature: 'await JS.InvokeAsync<bool>("confirm", thongDiep)',
      examples: [
        { input: 'Bấm Xoá dòng Tivi, chọn Huỷ', output: 'Danh sách giữ nguyên 5 sản phẩm' },
        { input: 'Bấm Xoá dòng Tivi, chọn OK', output: 'Còn 4 sản phẩm, alert "Đã xoá Tivi Samsung 55 inch"' },
      ],
    },
    {
      id: 'b28-2', level: 'Cơ bản', title: 'Chế độ sáng/tối nhớ qua F5',
      requirement: 'Cho một nút chuyển giao diện sáng/tối. Xây dựng tính năng lưu lựa chọn vào localStorage với khoá "giaoDien" và áp lại khi mở trang.',
      signature: 'localStorage.setItem("giaoDien", "toi") · đọc trong OnAfterRenderAsync(firstRender)',
      constraints: ['Chưa từng chọn thì mặc định "sang"', 'Không gọi JS trong OnInitialized'],
      examples: [
        { input: 'Chọn Tối, bấm F5', output: 'Trang vẫn ở giao diện tối' },
        { input: 'Mở trang lần đầu (localStorage trống)', output: 'Giao diện sáng', explain: 'getItem trả null → dùng mặc định.' },
      ],
    },
    {
      id: 'b28-3', level: 'Trung bình', title: 'Module tiện ích copy mã đơn',
      requirement: 'Cho trang chi tiết đơn hàng hiện mã đơn. Xây dựng module wwwroot/js/tienich.js và nút Copy mã đơn: bấm thì copy vào clipboard, nút đổi chữ thành "Đã copy" trong 2 giây rồi trở lại.',
      tasks: [
        'Viết module export function copyVaoClipboard(noiDung)',
        'Import module bằng IJSObjectReference trong OnAfterRenderAsync(firstRender)',
        'Đổi chữ nút "Đã copy", sau 2 giây (Task.Delay) đổi lại và StateHasChanged',
        'DisposeAsync module khi rời trang',
      ],
      signature: 'IJSObjectReference module · module.InvokeVoidAsync("copyVaoClipboard", maDon)',
      examples: [
        { input: 'Bấm Copy ở đơn DH0015 rồi dán vào Notepad', output: 'DH0015' },
        { input: 'Rời trang trong lúc nút đang "Đã copy"', output: 'Không lỗi', explain: 'Kiểm tra cờ đã huỷ trước khi StateHasChanged sau Task.Delay.' },
      ],
    },
    {
      id: 'b28-4', level: 'Trung bình', title: 'clientId cho mỗi trình duyệt',
      requirement: 'Cho ứng dụng cửa hàng cần định danh trình duyệt để gửi kèm khi đăng nhập (slide trang 148). Xây dựng ClientIdService sinh Guid một lần, lưu localStorage, và hiện clientId ở chân trang.',
      signature: 'Task<string> LayClientIdAsync()',
      constraints: ['Gọi nhiều lần trong một phiên chỉ đọc localStorage tối đa một lần', 'Đăng ký service Scoped'],
      examples: [
        { input: 'Mở trang, F5 ba lần', output: 'Chân trang hiện cùng một Guid' },
        { input: 'Mở bằng cửa sổ ẩn danh', output: 'Guid khác', explain: 'Ẩn danh có localStorage riêng, đóng cửa sổ là xoá.' },
      ],
      visual: {
        kind: 'flow',
        steps: [
          { kind: 'start', text: 'LayClientIdAsync()' },
          { kind: 'io', text: 'Đọc localStorage "clientId"' },
          {
            kind: 'decision',
            text: 'Có giá trị?',
            branches: [
              { label: 'Có', steps: [{ kind: 'process', text: 'Dùng lại' }] },
              { label: 'Không', steps: [{ kind: 'process', text: 'Guid.NewGuid()' }, { kind: 'io', text: 'setItem' }] },
            ],
          },
          { kind: 'end', text: 'Trả clientId' },
        ],
      },
    },
    {
      id: 'b28-5', level: 'Trung bình', title: 'Giỏ hàng giữ qua F5',
      requirement: 'Cho GioHangService đang lưu trong bộ nhớ. Xây dựng phiên bản lưu localStorage để giữ giỏ qua F5 và qua việc đóng mở trình duyệt.',
      tasks: [
        'Thêm sản phẩm (cộng dồn số lượng nếu đã có)',
        'Đổi số lượng, số lượng về 0 thì bỏ dòng',
        'Xoá cả giỏ (removeItem)',
        'Header hiện "Đang tải…" khi chưa nạp xong, sau đó hiện số món và tổng tiền',
      ],
      signature: 'Task ThemAsync(SanPham sp) · Task DoiSoLuongAsync(string ma, int soLuong) · Task XoaHetAsync()',
      examples: [
        { input: 'Thêm Tivi 2 lần, Tủ lạnh 1 lần, F5', output: 'Giỏ: Tivi x2, Tủ lạnh x1' },
        { input: 'Đổi số lượng Tủ lạnh về 0', output: 'Giỏ chỉ còn Tivi x2, localStorage cập nhật' },
      ],
      visual: {
        kind: 'seq',
        actors: ['Trang sản phẩm', 'GioHangService', 'localStorage'],
        steps: [
          { from: 0, to: 1, text: 'ThemAsync(Tivi)' },
          { from: 1, to: 1, text: 'Dong.Add / cộng số lượng' },
          { from: 1, to: 2, text: 'setItem("gioHang", JSON)' },
          { from: 1, to: 0, text: 'DaThayDoi → render lại header', dashed: true },
        ],
      },
    },
    {
      id: 'b28-6', level: 'Nâng cao', title: 'Đồng bộ giỏ giữa các tab',
      requirement: 'Cho người dùng mở hai tab cửa hàng. Xây dựng cơ chế: thêm sản phẩm ở tab A thì header tab B cập nhật ngay mà không cần F5, dựa vào sự kiện "storage" của trình duyệt và [JSInvokable].',
      signature: 'export function theoDoiStorage(dotNetRef, khoa) · [JSInvokable] Task GioDoiTuTabKhac()',
      constraints: ['Sự kiện storage chỉ bắn ở các tab KHÁC tab vừa ghi', 'Bỏ đăng ký listener và Dispose DotNetObjectReference khi huỷ'],
      examples: [
        { input: 'Tab A thêm Máy giặt', output: 'Tab B: header tăng 1 món trong chưa tới 1 giây' },
        { input: 'Tab A thêm Máy giặt — quan sát tab A', output: 'Không nhận sự kiện storage', explain: 'Tab A đã tự cập nhật qua DaThayDoi; trình duyệt không bắn storage cho chính tab ghi.' },
      ],
      hint: 'Trong JS: window.addEventListener("storage", e => { if (e.key === khoa) dotNetRef.invokeMethodAsync("GioDoiTuTabKhac"); }). Bên C# đặt DaNap = false rồi NapAsync lại.',
      visual: {
        kind: 'seq',
        actors: ['Tab A', 'localStorage', 'Tab B (JS)', 'Tab B (C#)'],
        steps: [
          { from: 0, to: 1, text: 'setItem("gioHang")' },
          { from: 1, to: 2, text: 'sự kiện storage (key = gioHang)' },
          { from: 2, to: 3, text: 'invokeMethodAsync("GioDoiTuTabKhac")' },
          { from: 3, to: 1, text: 'getItem → nạp lại' },
          { from: 3, to: 3, text: 'StateHasChanged' },
        ],
      },
      dense: true,
    },
    {
      id: 'b28-7', level: 'Nâng cao', title: 'Biểu đồ doanh thu bằng thư viện JS',
      requirement: 'Cho dữ liệu doanh thu 12 tháng lấy từ API. Xây dựng component BieuDoDoanhThu vẽ bằng Chart.js qua module JS; khi người dùng bấm vào một cột, JS gọi ngược C# để hiện danh sách đơn của tháng đó bên dưới.',
      tasks: [
        'Module bieudo.js: veBieuDo(canvasId, nhan, giaTri, dotNetRef) và huyBieuDo()',
        'C# truyền ElementReference hoặc id của <canvas> sau lần render đầu',
        '[JSInvokable] ChonThang(int thang) nạp đơn của tháng',
        'Đổi năm thì cập nhật dữ liệu biểu đồ thay vì tạo mới chồng lên',
      ],
      signature: 'Task VeAsync(int nam) · [JSInvokable] Task ChonThang(int thang)',
      examples: [
        { input: 'Bấm cột tháng 10', output: 'Bảng bên dưới: các đơn tháng 10/2026' },
        { input: 'Đổi năm 2025 → 2026 ba lần', output: 'Chỉ một biểu đồ', explain: 'Gọi destroy() biểu đồ cũ trước khi vẽ mới, nếu không Chart.js báo "Canvas is already in use".' },
      ],
      hint: 'Chart.js có options.onClick(evt, phanTu) — phanTu[0].index là chỉ số cột (0 = tháng 1).',
    },
    {
      id: 'b28-8', level: 'Nâng cao', title: 'Form nhiều bước không mất dữ liệu',
      requirement: 'Cho form đặt hàng 3 bước (thông tin khách, địa chỉ giao, xác nhận). Xây dựng cơ chế lưu nháp vào sessionStorage sau mỗi lần đổi bước, F5 quay lại đúng bước và đủ dữ liệu; đặt hàng xong thì xoá nháp.',
      signature: 'record NhapDonHang(int Buoc, KhachHang Khach, string DiaChi)',
      constraints: ['Dùng sessionStorage: đóng tab là bỏ nháp', 'Nháp có trường NgayTao; quá 30 phút thì bỏ'],
      examples: [
        { input: 'Đang ở bước 2, đã nhập tên và địa chỉ, F5', output: 'Mở lại bước 2 với tên và địa chỉ cũ' },
        { input: 'Mở tab mới cùng URL', output: 'Form trống ở bước 1', explain: 'sessionStorage riêng cho từng tab.' },
      ],
      hint: 'Viết LocalStorageService nhận tên kho ("localStorage" hoặc "sessionStorage") để dùng chung code.',
    },
  ],
}

export default buoi28
