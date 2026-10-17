import type { Buoi } from './types'

const buoi26: Buoi = {
  id: 26,
  slug: 'blazor-dependency-injection-va-service',
  title: 'Dependency Injection & Service trong Blazor',
  subtitle: 'Tách logic khỏi giao diện: một service giỏ hàng dùng chung cho nhiều trang, vòng đời đúng, giao diện tự cập nhật khi dữ liệu đổi',
  duration: '3 giờ',
  keywords: ['@inject', 'AddScoped', 'AddSingleton', 'AddTransient', 'circuit', 'state container', 'OnChange'],
  goals: [
    'Đăng ký service trong Program.cs và nhận vào component bằng @inject',
    'Chọn đúng Singleton / Scoped / Transient, hiểu scoped trong Blazor Server sống theo circuit',
    'Xây dựng service giỏ hàng dùng chung nhiều trang với sự kiện OnChange',
    'Lập trình theo interface để thay implementation mà không sửa component (DIP buổi 15)',
  ],

  sections: [
    {
      id: 'vi-sao-di',
      title: '1. Vì sao cần service và DI',
      blocks: [
        {
          type: 'text',
          text: 'Ở các buổi trước, danh sách sản phẩm nằm ngay trong @code của trang. Khi trang Giỏ hàng, trang Thanh toán và icon giỏ trên thanh menu cùng cần dữ liệu đó, chép code ra ba nơi sẽ lệch nhau ngay. Ta gom dữ liệu và nghiệp vụ vào một class service, đăng ký với DI container một lần, rồi mọi component xin service đó bằng @inject.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Logic nằm trong component và nằm trong service',
            columns: [
              { title: 'Logic trong @code từng trang', tone: 'bad', items: ['Mỗi trang một bản List<SanPham>', 'Thêm vào giỏ ở trang chi tiết, icon menu không biết', 'Đổi nguồn dữ liệu phải sửa mọi trang', 'Không test được nếu không chạy giao diện'] },
              { title: 'Service đăng ký DI', tone: 'good', items: ['Một đối tượng dùng chung', 'Đổi ở đâu, mọi nơi thấy', 'Đổi implementation trong Program.cs', 'Test service bằng unit test thường'] },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'DI container cấp service cho component',
            steps: [
              { kind: 'start', text: 'Program.cs: builder.Services.AddScoped<IGioHangService, GioHangService>()' },
              { kind: 'process', text: 'Router tạo component TrangGioHang' },
              { kind: 'process', text: 'Gặp @inject IGioHangService GioHang' },
              { kind: 'decision', text: 'Trong scope này đã có đối tượng?', branches: [
                { label: 'Có', steps: [{ kind: 'process', text: 'Trả lại đúng đối tượng đó' }] },
                { label: 'Chưa', steps: [{ kind: 'process', text: 'new GioHangService(...) — tự inject cả các phụ thuộc của nó' }] },
              ] },
              { kind: 'process', text: 'Gán vào property GioHang, rồi mới chạy OnInitialized' },
              { kind: 'end', text: 'Component dùng GioHang.Them(...)' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Program.cs — đăng ký service',
            code: `var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

// interface → implementation
builder.Services.AddSingleton<IKhoSanPham, KhoSanPhamBoNho>();
builder.Services.AddScoped<IGioHangService, GioHangService>();
builder.Services.AddTransient<ITinhPhiVanChuyen, TinhPhiTheoKhoiLuong>();

var app = builder.Build();
app.MapRazorComponents<App>().AddInteractiveServerRenderMode();
app.Run();`,
            note: 'Đăng ký phải nằm trước builder.Build(). Quên đăng ký thì khi mở trang gặp lỗi "Cannot provide a value for property GioHang… There is no registered service of type IGioHangService".',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Nhận service bằng @inject',
            code: `@page "/san-pham"
@inject IKhoSanPham Kho
@inject IGioHangService GioHang

@foreach (var sp in Kho.LayTatCa())
{
    <div class="d-flex justify-content-between border-bottom py-2">
        <span>@sp.Ten — @sp.Gia.ToString("N0") đ</span>
        <button class="btn btn-sm btn-success" @onclick="() => GioHang.Them(sp)">Thêm vào giỏ</button>
    </div>
}`,
            note: 'Trong file .razor.cs (code-behind) thì viết [Inject] public IKhoSanPham Kho { get; set; } = default!; — tác dụng như @inject. Service không có trong constructor của component vì component do framework tạo.',
          },
        },
      ],
    },
    {
      id: 'vong-doi',
      title: '2. Singleton, Scoped, Transient trong Blazor',
      blocks: [
        {
          type: 'text',
          text: 'Trong ASP.NET Core MVC/Web API, Scoped nghĩa là "một đối tượng cho mỗi HTTP request". Blazor Server khác: sau khi kết nối, mọi thao tác của một tab trình duyệt chạy trên một circuit SignalR kéo dài, nên Scoped sống suốt circuit — tức là cả phiên làm việc của tab đó.',
        },
        {
          type: 'table',
          head: ['Vòng đời', 'Blazor Server', 'Blazor WebAssembly', 'Dùng cho'],
          rows: [
            ['AddSingleton', 'Một đối tượng cho TẤT CẢ người dùng', 'Một đối tượng cho tab đó', 'Cấu hình, cache danh mục chỉ đọc'],
            ['AddScoped', 'Một đối tượng cho mỗi circuit (mỗi tab)', 'Giống Singleton (một tab)', 'Giỏ hàng, người dùng đăng nhập, state container'],
            ['AddTransient', 'Mỗi lần inject một đối tượng mới', 'Như Server', 'Class tính toán nhẹ, không giữ trạng thái'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Ai thấy đối tượng nào — Blazor Server, hai người mua',
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
          title: 'Giỏ hàng đăng ký Singleton là lỗi nghiêm trọng',
          text: 'Trên Blazor Server, Singleton là một đối tượng cho cả máy chủ: An thêm tivi, Bình mở trang cũng thấy tivi trong giỏ của mình. Lỗi này không lộ khi tự test một mình — chỉ lộ khi có hai người dùng. Dữ liệu riêng từng người luôn là Scoped.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Mở tab mới, F5 là circuit mới',
          text: 'F5 hoặc mở tab thứ hai tạo circuit mới, nghĩa là GioHangService Scoped mới và giỏ trống. Muốn giỏ còn sau F5 phải lưu ra ngoài: localStorage (ProtectedLocalStorage) hoặc CSDL theo tài khoản.',
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Singleton không được phụ thuộc Scoped',
          text: 'Inject IGioHangService (Scoped) vào constructor một service Singleton sẽ bị lỗi "Cannot consume scoped service from singleton" khi chạy Development. Quy tắc: service sống lâu không được giữ service sống ngắn hơn.',
        },
      ],
    },
    {
      id: 'state-container',
      title: '3. Service giỏ hàng dùng chung và sự kiện OnChange',
      blocks: [
        {
          type: 'text',
          text: 'Trang Sản phẩm gọi GioHang.Them(sp). Icon giỏ hàng trên NavMenu là một component khác, nó không tự biết dữ liệu đã đổi để render lại. Giải pháp là mẫu state container: service phát sự kiện OnChange mỗi khi dữ liệu đổi, component nào quan tâm thì đăng ký nghe và gọi StateHasChanged.',
        },
        {
          type: 'code',
          sample: {
            title: 'Services/GioHangService.cs',
            code: `public class GioHangService : IGioHangService
{
    private readonly List<ChiTietDonHang> dong = new();

    public IReadOnlyList<ChiTietDonHang> Dong => dong;
    public int TongSoLuong => dong.Sum(d => d.SoLuong);
    public decimal TongTien => dong.Sum(d => d.SoLuong * d.DonGia);

    public event Action? OnChange;

    public void Them(SanPham sp, int soLuong = 1)
    {
        var co = dong.FirstOrDefault(d => d.MaSanPham == sp.Ma);
        if (co is null)
            dong.Add(new ChiTietDonHang { MaSanPham = sp.Ma, TenSanPham = sp.Ten, DonGia = sp.Gia, SoLuong = soLuong });
        else
            co.SoLuong += soLuong;
        BaoThayDoi();
    }

    public void Xoa(string maSanPham)
    {
        dong.RemoveAll(d => d.MaSanPham == maSanPham);
        BaoThayDoi();
    }

    private void BaoThayDoi() => OnChange?.Invoke();
}`,
            note: 'Danh sách để private, ra ngoài chỉ là IReadOnlyList: component không thể dong.Add trực tiếp mà bỏ qua BaoThayDoi. Mọi thay đổi đều đi qua phương thức của service.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Shared/IconGioHang.razor — nghe OnChange',
            code: `@inject IGioHangService GioHang
@implements IDisposable

<a href="gio-hang" class="btn btn-outline-light">
    Giỏ hàng <span class="badge bg-danger">@GioHang.TongSoLuong</span>
</a>

@code {
    protected override void OnInitialized() => GioHang.OnChange += CapNhat;

    private void CapNhat() => InvokeAsync(StateHasChanged);

    public void Dispose() => GioHang.OnChange -= CapNhat;
}`,
            note: 'Ba điểm bắt buộc: đăng ký trong OnInitialized, gọi InvokeAsync(StateHasChanged) vì sự kiện có thể phát từ thread khác, và huỷ đăng ký trong Dispose. Quên -= thì service Scoped giữ tham chiếu tới component đã chết — rò bộ nhớ và lỗi khi render.',
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
              { from: 1, to: 1, text: 'dong.Add, BaoThayDoi()' },
              { from: 1, to: 2, text: 'OnChange?.Invoke()' },
              { from: 2, to: 2, text: 'InvokeAsync(StateHasChanged)' },
              { from: 2, to: 3, text: 'Badge 0 → 1', dashed: true },
              { from: 0, to: 3, text: 'TrangSanPham tự render sau sự kiện @onclick', dashed: true },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Component gọi @onclick không cần nghe OnChange',
          text: 'Sau mỗi sự kiện @onclick, Blazor tự render component chứa nút đó. Chỉ các component KHÁC — icon trên menu, tổng tiền ở sidebar — mới cần đăng ký OnChange.',
        },
      ],
    },
    {
      id: 'interface',
      title: '4. Interface để thay implementation',
      blocks: [
        {
          type: 'text',
          text: 'Buổi 15 đã học nguyên lý DIP: module cấp cao không phụ thuộc chi tiết, cả hai phụ thuộc abstraction. Trong Blazor, component là module cấp cao; nó chỉ biết IKhoSanPham. Hôm nay kho lưu trong bộ nhớ, buổi 27 đổi sang gọi Web API, buổi EF Core đổi sang CSDL — component không sửa một dòng.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'uml',
            caption: 'Một interface, ba cách lưu sản phẩm',
            relation: 'implement',
            parent: {
              name: 'IKhoSanPham',
              stereotype: 'interface',
              methods: ['Task<List<SanPham>> LayTatCaAsync()', 'Task<SanPham?> LayTheoMaAsync(string ma)', 'Task ThemAsync(SanPham sp)', 'Task XoaAsync(string ma)'],
            },
            children: [
              { name: 'KhoSanPhamBoNho', attrs: ['- List<SanPham> ds'] },
              { name: 'KhoSanPhamApi', attrs: ['- HttpClient http'], methods: ['buổi 27'] },
              { name: 'KhoSanPhamEf', attrs: ['- AppDbContext db'], methods: ['buổi EF Core'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Services/KhoSanPhamBoNho.cs',
            code: `public interface IKhoSanPham
{
    Task<List<SanPham>> LayTatCaAsync();
    Task<SanPham?> LayTheoMaAsync(string ma);
    Task ThemAsync(SanPham sp);
    Task XoaAsync(string ma);
}

public class KhoSanPhamBoNho : IKhoSanPham
{
    private readonly List<SanPham> ds = new()
    {
        new SanPham { Ma = "TV01", Ten = "Tivi Samsung 55 inch", Gia = 12990000 },
        new SanPham { Ma = "TL01", Ten = "Tủ lạnh LG 315L", Gia = 9490000 },
    };

    public Task<List<SanPham>> LayTatCaAsync() => Task.FromResult(ds.ToList());

    public Task<SanPham?> LayTheoMaAsync(string ma) =>
        Task.FromResult(ds.FirstOrDefault(s => s.Ma == ma));

    public Task ThemAsync(SanPham sp) { ds.Add(sp); return Task.CompletedTask; }

    public Task XoaAsync(string ma) { ds.RemoveAll(s => s.Ma == ma); return Task.CompletedTask; }
}`,
            note: 'Interface khai báo Task ngay từ đầu dù bản bộ nhớ không cần await — để bản gọi API sau này lắp vào khớp chữ ký. Task.FromResult bọc giá trị có sẵn thành Task.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Đổi implementation chỉ ở một dòng',
            code: `// Program.cs
#if DEBUG
builder.Services.AddSingleton<IKhoSanPham, KhoSanPhamBoNho>();
#else
builder.Services.AddScoped<IKhoSanPham, KhoSanPhamApi>();
#endif`,
            note: 'Component vẫn @inject IKhoSanPham Kho. Lưu ý vòng đời cũng đổi theo implementation: kho bộ nhớ dùng chung thì Singleton, kho có HttpClient / DbContext thì Scoped.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Kho bộ nhớ Singleton phải an toàn đa luồng',
          text: 'Trên Blazor Server nhiều circuit gọi KhoSanPhamBoNho cùng lúc. List<T> không an toàn khi vừa đọc vừa ghi từ nhiều thread — bọc ghi bằng lock hoặc dùng ConcurrentDictionary nếu kho Singleton có thao tác thêm/xoá.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b26-1', level: 'Cơ bản', title: 'Chuyển danh sách sản phẩm vào service',
      requirement: 'Cho trang /san-pham đang giữ List<SanPham> trong @code. Xây dựng interface IKhoSanPham và class KhoSanPhamBoNho, đăng ký trong Program.cs, rồi sửa trang để lấy dữ liệu qua @inject. Thêm trang /tim-kiem dùng cùng service.',
      signature: 'interface IKhoSanPham { Task<List<SanPham>> LayTatCaAsync(); }',
      examples: [
        { input: 'Mở /san-pham và /tim-kiem', output: 'Hai trang hiện cùng danh sách từ một nguồn' },
        { input: 'Bỏ dòng AddSingleton', output: 'Lỗi "There is no registered service of type IKhoSanPham"' },
      ],
    },
    {
      id: 'b26-2', level: 'Cơ bản', title: 'Quan sát ba vòng đời',
      requirement: 'Cho ba service DemSingleton, DemScoped, DemTransient, mỗi service có property Guid Ma = Guid.NewGuid() và int SoLan. Đăng ký đúng tên vòng đời. Trang /vong-doi inject cả ba hai lần (component cha và một component con) và hiện 4 ký tự đầu của Ma.',
      signature: 'AddSingleton<DemSingleton>() · AddScoped<DemScoped>() · AddTransient<DemTransient>()',
      examples: [
        { input: 'Mở trang ở tab 1', output: 'Singleton cha = con; Scoped cha = con; Transient cha ≠ con' },
        { input: 'Mở tab 2', output: 'Singleton giống tab 1; Scoped khác tab 1', explain: 'Mỗi tab là một circuit nên có Scoped riêng.' },
      ],
    },
    {
      id: 'b26-3', level: 'Trung bình', title: 'Giỏ hàng dùng chung nhiều trang',
      requirement: 'Xây dựng GioHangService (Scoped) và các trang sử dụng nó: trang sản phẩm có nút thêm, trang giỏ hàng có bảng chi tiết, icon giỏ trên menu luôn hiện tổng số lượng.',
      tasks: [
        'Them(SanPham sp, int soLuong): sản phẩm đã có thì cộng dồn số lượng',
        'CapNhatSoLuong(string ma, int soLuong): soLuong <= 0 thì xoá dòng',
        'Xoa(string ma) và XoaHet()',
        'TongSoLuong, TongTien tính từ danh sách',
        'Sự kiện OnChange phát sau mọi thay đổi; IconGioHang nghe và huỷ nghe đúng cách',
      ],
      signature: 'public event Action? OnChange · IReadOnlyList<ChiTietDonHang> Dong',
      constraints: ['Danh sách dòng không được lộ ra dạng List có thể sửa', 'soLuong thêm vào phải > 0, ngược lại ném ArgumentException'],
      examples: [
        { input: 'Thêm TV01 x1, thêm TV01 x2', output: 'Giỏ 1 dòng TV01 số lượng 3, icon hiện 3' },
        { input: 'CapNhatSoLuong("TV01", 0)', output: 'Giỏ rỗng, icon hiện 0', explain: 'Số lượng 0 coi như xoá dòng.' },
      ],
      visual: {
        kind: 'uml',
        caption: 'Service giỏ hàng',
        relation: 'implement',
        parent: { name: 'IGioHangService', stereotype: 'interface', methods: ['Them(sp, soLuong)', 'CapNhatSoLuong(ma, soLuong)', 'Xoa(ma)', 'XoaHet()', 'event OnChange'] },
        children: [
          { name: 'GioHangService', attrs: ['- List<ChiTietDonHang> dong', '+ TongSoLuong', '+ TongTien'], methods: ['- BaoThayDoi()'] },
        ],
      },
    },
    {
      id: 'b26-4', level: 'Trung bình', title: 'Lỗi giỏ hàng Singleton',
      requirement: 'Cho GioHangService đã chạy đúng ở bài 3. Đổi đăng ký sang AddSingleton, mở hai trình duyệt khác nhau (hoặc một tab ẩn danh) và tái hiện lỗi. Ghi lại hiện tượng, giải thích bằng sơ đồ circuit và sửa lại.',
      signature: 'AddSingleton → AddScoped',
      visual: {
        kind: 'flow',
        caption: 'Bình mở /gio-hang khi giỏ đăng ký Singleton',
        steps: [
          { kind: 'start', text: 'Circuit của Bình cần IGioHangService' },
          { kind: 'decision', text: 'Vòng đời đăng ký?', branches: [
            { label: 'Singleton', steps: [{ kind: 'io', text: 'Trả đối tượng duy nhất của máy chủ → thấy Tivi của An' }] },
            { label: 'Scoped', steps: [{ kind: 'io', text: 'Tạo đối tượng mới cho circuit của Bình → giỏ trống' }] },
          ] },
          { kind: 'end', text: 'Kết luận: dữ liệu riêng từng người phải Scoped' },
        ],
      },

      examples: [
        { input: 'Singleton: trình duyệt A thêm Tivi', output: 'Trình duyệt B mở /gio-hang thấy Tivi', explain: 'Cả máy chủ chỉ có một đối tượng GioHangService.' },
        { input: 'Scoped: làm lại như trên', output: 'Giỏ của B trống' },
      ],
    },
    {
      id: 'b26-5', level: 'Trung bình', title: 'Phí vận chuyển thay được',
      requirement: 'Cho interface ITinhPhiVanChuyen { decimal Tinh(decimal tongTien, string tinhThanh); }. Xây dựng hai implementation và cho trang thanh toán hiện phí ship qua @inject, đổi cách tính chỉ bằng sửa Program.cs.',
      tasks: [
        'PhiCoDinh: 30.000 đ mọi đơn, đơn từ 5.000.000 đ miễn phí',
        'PhiTheoVung: nội thành Hồ Chí Minh/Hà Nội 20.000 đ, tỉnh khác 50.000 đ, đơn từ 10.000.000 đ miễn phí',
        'Trang thanh toán hiện tạm tính, phí ship, tổng cộng',
      ],
      signature: 'AddTransient<ITinhPhiVanChuyen, PhiTheoVung>()',
      examples: [
        { input: 'PhiCoDinh, tổng 4.990.000', output: 'Phí 30.000, tổng cộng 5.020.000' },
        { input: 'PhiTheoVung, tổng 12.000.000, Đà Nẵng', output: 'Phí 0', explain: 'Vượt mốc miễn phí nên không xét vùng.' },
      ],
    },
    {
      id: 'b26-6', level: 'Nâng cao', title: 'State container bộ lọc dùng chung',
      requirement: 'Cho trang danh sách sản phẩm có sidebar bộ lọc (nhóm, khoảng giá) là một component riêng, và component BangSanPham hiện kết quả. Xây dựng BoLocState (Scoped) làm cầu nối: sidebar ghi, bảng nghe và lọc lại.',
      tasks: [
        'BoLocState có Nhom, GiaMin, GiaMax và phương thức DatBoLoc(...) phát OnChange',
        'SidebarBoLoc gọi DatBoLoc khi người dùng đổi lựa chọn',
        'BangSanPham và DemKetQua (hiện "12 sản phẩm") cùng nghe OnChange',
        'Nút Xoá bộ lọc đưa về mặc định',
        'Mọi component nghe đều huỷ đăng ký trong Dispose',
      ],
      signature: 'public class BoLocState { public event Action? OnChange; public void DatBoLoc(string? nhom, decimal? min, decimal? max) }',
      examples: [
        { input: 'Chọn nhóm Điện lạnh', output: 'Bảng còn 4 sản phẩm, DemKetQua hiện "4 sản phẩm"' },
        { input: 'Sang trang khác rồi quay lại', output: 'Bộ lọc vẫn là Điện lạnh', explain: 'BoLocState Scoped sống theo circuit, không mất khi đổi trang trong cùng tab.' },
      ],
      visual: {
        kind: 'seq',
        caption: 'Một nguồn trạng thái, nhiều nơi hiển thị',
        actors: ['SidebarBoLoc', 'BoLocState', 'BangSanPham', 'DemKetQua'],
        steps: [
          { from: 0, to: 1, text: 'DatBoLoc("dien-lanh", null, null)' },
          { from: 1, to: 2, text: 'OnChange' },
          { from: 1, to: 3, text: 'OnChange' },
          { from: 2, to: 2, text: 'Lọc lại, StateHasChanged' },
          { from: 3, to: 3, text: 'Đếm lại, StateHasChanged' },
        ],
      },
      hint: 'So sánh với cách truyền Parameter + EventCallback qua component cha: khi hai component không có quan hệ cha con trực tiếp, state container gọn hơn.',
    },
    {
      id: 'b26-7', level: 'Nâng cao', title: 'Thông báo toàn ứng dụng',
      requirement: 'Xây dựng ThongBaoService để bất kỳ trang nào cũng hiện được thông báo dạng toast góc màn hình ("Đã thêm Tivi vào giỏ"), tự tắt sau 3 giây. Component HopThongBao đặt một lần trong MainLayout.',
      tasks: [
        'ThongBaoService.Hien(string noiDung, LoaiThongBao loai) với loai: ThanhCong, Loi, CanhBao',
        'Danh sách thông báo đang hiện, mỗi cái có Id riêng; tối đa 3 cái, quá thì bỏ cái cũ nhất',
        'Tự gỡ sau 3 giây bằng Task.Delay, không chặn giao diện',
        'GioHangService gọi ThongBaoService khi thêm sản phẩm (inject qua constructor)',
      ],
      signature: 'public GioHangService(IThongBaoService thongBao)',
      constraints: ['Cả hai service cùng Scoped', 'Cập nhật giao diện qua InvokeAsync vì Task.Delay hoàn tất ở thread khác'],
      examples: [
        { input: 'Bấm thêm 4 sản phẩm liên tiếp', output: 'Hiện 3 toast mới nhất, toast đầu bị bỏ' },
        { input: 'Đăng ký ThongBaoService Singleton', output: 'Người dùng khác cũng thấy toast của mình', explain: 'Cùng lỗi giỏ hàng Singleton; ngoài ra Scoped inject vào Singleton sẽ báo lỗi.' },
      ],
    },
    {
      id: 'b26-8', level: 'Nâng cao', title: 'Unit test service không cần giao diện',
      requirement: 'Cho GioHangService và ITinhPhiVanChuyen. Xây dựng project xUnit kiểm tra nghiệp vụ giỏ hàng mà không chạy Blazor, chứng minh lợi ích của việc tách logic ra service.',
      tasks: [
        'Test cộng dồn số lượng khi thêm trùng mã',
        'Test OnChange được phát đúng 1 lần mỗi thao tác (đếm bằng biến cục bộ)',
        'Test CapNhatSoLuong về 0 thì xoá dòng',
        'Viết class PhiGiaLap : ITinhPhiVanChuyen trả số cố định để test tổng thanh toán',
      ],
      signature: '[Fact] public void Them_TrungMa_CongDonSoLuong()',
      examples: [
        { input: 'Them(tv,1); Them(tv,2)', output: 'Assert.Single(gio.Dong); Assert.Equal(3, gio.TongSoLuong)' },
        { input: 'gio.OnChange += () => dem++; gio.Xoa("XX")', output: 'dem == 1', explain: 'Tuỳ thiết kế: xoá mã không có vẫn báo, hoặc không báo — test phải ghi rõ quyết định.' },
      ],
      hint: 'Test gọi new GioHangService() trực tiếp; không có DI container, không có component. Nếu service khó new được trong test thì đó là dấu hiệu nó phụ thuộc chi tiết.',
    },
  ],
}

export default buoi26
