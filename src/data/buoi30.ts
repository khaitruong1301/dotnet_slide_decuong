import type { Buoi } from './types'

const buoi30: Buoi = {
  id: 30,
  slug: 'blazor-realtime-signalr-va-upload-file',
  title: 'Realtime với SignalR & upload file',
  subtitle: 'Máy chủ chủ động đẩy thông báo đơn hàng mới tới trang quản trị, và upload ảnh sản phẩm có xem trước',
  duration: '3 giờ',
  keywords: ['SignalR', 'Hub', 'HubConnectionBuilder', 'Groups', 'InputFile', 'IBrowserFile', 'multipart/form-data'],
  goals: [
    'Tạo Hub phía server và gửi thông điệp tới mọi client, một nhóm hoặc một người',
    'Kết nối Hub từ Blazor bằng HubConnectionBuilder, nhận sự kiện và cập nhật giao diện',
    'Upload ảnh sản phẩm bằng InputFile với giới hạn dung lượng, kiểu file và xem trước',
    'Gửi file lên Web API dạng multipart và lưu vào wwwroot/uploads',
  ],

  sections: [
    {
      id: 'vi-sao-signalr',
      title: '1. Vì sao cần SignalR',
      blocks: [
        {
          type: 'text',
          text: 'HTTP là hỏi – đáp: client hỏi thì server mới trả lời. Trang quản trị muốn biết có đơn hàng mới thì phải hỏi liên tục mỗi vài giây (polling) — tốn request, vẫn chậm. SignalR giữ một kết nối hai chiều (ưu tiên WebSocket) để server CHỦ ĐỘNG đẩy thông điệp xuống ngay khi có sự kiện.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Polling và SignalR',
            columns: [
              { title: 'Polling mỗi 5 giây', tone: 'bad', items: ['720 request/giờ mỗi trình duyệt dù không có đơn', 'Đơn mới hiện trễ tới 5 giây', 'Server bận trả lời "không có gì mới"'] },
              { title: 'SignalR', tone: 'good', items: ['Một kết nối giữ suốt phiên', 'Đơn mới hiện ngay lập tức', 'Chỉ truyền dữ liệu khi có sự kiện'] },
            ],
          },
        },
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
              { from: 1, to: 1, text: 'Lưu CSDL → DonHang #16' },
              { from: 1, to: 2, text: 'Clients.Group("QuanTri").SendAsync("DonHangMoi", …)' },
              { from: 2, to: 3, text: 'DonHangMoi { Id: 16, TongTien: 18.990.000 }' },
              { from: 2, to: 4, text: 'DonHangMoi { Id: 16, TongTien: 18.990.000 }' },
              { from: 1, to: 0, text: '201 Created', dashed: true },
            ],
          },
        },
        {
          type: 'table',
          head: ['Thành phần', 'Ở đâu', 'Gói / lệnh'],
          rows: [
            ['Hub', 'Server ASP.NET Core', 'Có sẵn, builder.Services.AddSignalR()'],
            ['IHubContext<THub>', 'Server, trong controller/service', 'Gửi từ ngoài Hub'],
            ['HubConnection', 'Blazor client', 'Microsoft.AspNetCore.SignalR.Client'],
            ['Group', 'Server', 'Groups.AddToGroupAsync(connectionId, "QuanTri")'],
          ],
        },
      ],
    },
    {
      id: 'hub-server',
      title: '2. Hub phía server',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'Hubs/DonHangHub.cs',
            code: `using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

public record ThongBaoDonHang(int Id, string TenKhach, decimal TongTien, DateTime NgayDat);

[Authorize]
public class DonHangHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        if (Context.User!.IsInRole("Admin") || Context.User.IsInRole("NhanVien"))
            await Groups.AddToGroupAsync(Context.ConnectionId, "QuanTri");

        // mỗi khách vào nhóm riêng để nhận cập nhật trạng thái đơn của mình
        string? maKhach = Context.User.FindFirst("sub")?.Value;
        if (maKhach is not null)
            await Groups.AddToGroupAsync(Context.ConnectionId, "khach-" + maKhach);

        await base.OnConnectedAsync();
    }

    // client gọi được: hubConnection.InvokeAsync("TheoDoiDon", 16)
    public Task TheoDoiDon(int maDon) =>
        Groups.AddToGroupAsync(Context.ConnectionId, "don-" + maDon);
}`,
            note: 'Nhóm không cần tạo trước, AddToGroupAsync lần đầu là có. Khi kết nối ngắt, SignalR tự gỡ khỏi mọi nhóm — nhưng kết nối lại thì có ConnectionId mới, phải vào nhóm lại (vì thế làm trong OnConnectedAsync).',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Program.cs và DonHangController — gửi từ ngoài Hub',
            code: `// Program.cs
builder.Services.AddSignalR();
// ... app.UseAuthentication(); app.UseAuthorization();
app.MapHub<DonHangHub>("/hubs/don-hang");

// Controllers/DonHangController.cs
[ApiController, Route("api/don-hang")]
public class DonHangController(AppDbContext db, IHubContext<DonHangHub> hub) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Tao(TaoDonHangDto dto)
    {
        var don = new DonHang { KhachHangId = dto.KhachHangId, NgayDat = DateTime.Now };
        // ... thêm ChiTietDonHang, tính TongTien
        db.DonHang.Add(don);
        await db.SaveChangesAsync();

        var tb = new ThongBaoDonHang(don.Id, dto.TenKhach, don.TongTien, don.NgayDat);
        await hub.Clients.Group("QuanTri").SendAsync("DonHangMoi", tb);

        return CreatedAtAction(nameof(Tao), new { id = don.Id }, don.Id);
    }
}`,
            note: 'Gửi SAU SaveChangesAsync: nếu lưu thất bại mà đã thông báo, quản trị sẽ thấy một đơn không tồn tại. Tên sự kiện "DonHangMoi" là chuỗi — phía client phải On đúng tên.',
          },
        },
        {
          type: 'table',
          head: ['Gửi tới', 'Cú pháp', 'Ví dụ dùng'],
          rows: [
            ['Mọi kết nối', 'Clients.All.SendAsync(...)', 'Thông báo bảo trì hệ thống'],
            ['Người gọi', 'Clients.Caller.SendAsync(...)', 'Trả kết quả riêng cho người vừa gọi Hub'],
            ['Trừ người gọi', 'Clients.Others.SendAsync(...)', 'Ai đó đang sửa đơn này'],
            ['Một nhóm', 'Clients.Group("QuanTri")', 'Đơn hàng mới cho quản trị'],
            ['Một người dùng', 'Clients.User(userId)', 'Đơn của bạn đã giao — mọi tab của người đó'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'WebSocket không gửi được header Authorization',
          text: 'Trình duyệt không cho đặt header khi mở WebSocket, nên SignalR gửi token qua query string ?access_token=. Server phải đọc nó trong JwtBearerEvents.OnMessageReceived khi đường dẫn bắt đầu bằng /hubs — quên bước này thì [Authorize] trên Hub luôn trả 401.',
        },
        {
          type: 'code',
          sample: {
            title: 'Program.cs — đọc token cho Hub',
            code: `options.Events = new JwtBearerEvents
{
    OnMessageReceived = ctx =>
    {
        var token = ctx.Request.Query["access_token"];
        if (!string.IsNullOrEmpty(token) && ctx.HttpContext.Request.Path.StartsWithSegments("/hubs"))
            ctx.Token = token;
        return Task.CompletedTask;
    }
};`,
            note: 'Đặt trong AddJwtBearer(options => …) đã cấu hình ở phần Web API.',
          },
        },
      ],
    },
    {
      id: 'hub-client',
      title: '3. Kết nối Hub từ Blazor',
      blocks: [
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

<p>Kết nối: @(ketNoi?.State.ToString() ?? "chưa")</p>
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
            .WithAutomaticReconnect()
            .Build();

        ketNoi.On<ThongBaoDonHang>("DonHangMoi", async tb =>
        {
            donMoi.Insert(0, tb);
            await InvokeAsync(StateHasChanged);
        });
        ketNoi.Reconnected += _ => InvokeAsync(StateHasChanged);
        await ketNoi.StartAsync();
        StateHasChanged();
    }

    public async ValueTask DisposeAsync()
    {
        if (ketNoi is not null) await ketNoi.DisposeAsync();
    }
}`,
            note: 'Callback của On chạy ngoài luồng render của Blazor nên phải InvokeAsync(StateHasChanged). AccessTokenProvider được gọi mỗi lần kết nối/kết nối lại — luôn lấy token mới nhất. Rời trang phải DisposeAsync, không thì kết nối cũ vẫn mở và nhận thông báo.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Vòng đời một HubConnection',
            steps: [
              { kind: 'start', text: 'Build() — trạng thái Disconnected' },
              { kind: 'process', text: 'On("DonHangMoi", …) — đăng ký TRƯỚC StartAsync' },
              { kind: 'io', text: 'StartAsync() → Connecting → Connected' },
              {
                kind: 'decision',
                text: 'Mất mạng?',
                branches: [
                  {
                    label: 'Có',
                    steps: [
                      { kind: 'process', text: 'Reconnecting — thử lại sau 0, 2, 10, 30 giây' },
                      {
                        kind: 'decision',
                        text: 'Kết nối lại được?',
                        branches: [
                          { label: 'Được', steps: [{ kind: 'process', text: 'Connected, ConnectionId mới, OnConnectedAsync vào nhóm lại' }] },
                          { label: 'Không', steps: [{ kind: 'process', text: 'Closed — hiện nút "Kết nối lại"' }] },
                        ],
                      },
                    ],
                  },
                  { label: 'Không', steps: [{ kind: 'process', text: 'Nhận sự kiện, cập nhật giao diện' }] },
                ],
              },
              { kind: 'end', text: 'Rời trang → DisposeAsync()' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Đơn đến khi đang mất kết nối thì sao?',
          text: 'SignalR không lưu thông điệp cho client vắng mặt. Trong sự kiện Reconnected, gọi lại API lấy danh sách đơn mới từ thời điểm cuối cùng đã nhận để không sót đơn.',
        },
      ],
    },
    {
      id: 'upload',
      title: '4. Upload ảnh sản phẩm với InputFile',
      blocks: [
        {
          type: 'text',
          text: 'InputFile là component có sẵn của Blazor bọc thẻ <input type="file">. Khi người dùng chọn file, sự kiện OnChange trả về IBrowserFile gồm Name, Size, ContentType và OpenReadStream(maxAllowedSize). Mặc định OpenReadStream chỉ cho đọc 500 KB — ảnh lớn hơn ném IOException nếu không nới giới hạn.',
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Components/UploadAnhSanPham.razor — chọn và xem trước',
            code: `<InputFile OnChange="ChonFileAsync" accept=".jpg,.jpeg,.png,.webp" />
<p class="text-danger">@loi</p>
@if (anhXemTruoc is not null)
{
    <img src="@anhXemTruoc" style="max-width:240px" alt="Xem trước" />
}

@code {
    const long ToiDa = 2 * 1024 * 1024;   // 2 MB
    static readonly string[] KieuChoPhep = ["image/jpeg", "image/png", "image/webp"];
    [Parameter] public EventCallback<IBrowserFile> DaChonAnh { get; set; }
    string? anhXemTruoc, loi;

    async Task ChonFileAsync(InputFileChangeEventArgs e)
    {
        var file = e.File;
        loi = null; anhXemTruoc = null;
        if (!KieuChoPhep.Contains(file.ContentType)) { loi = "Chỉ nhận JPG, PNG, WEBP"; return; }
        if (file.Size > ToiDa) { loi = $"Ảnh {file.Size / 1024} KB vượt quá 2 MB"; return; }

        var anhNho = await file.RequestImageFileAsync("image/jpeg", 400, 400);
        using var ms = new MemoryStream();
        await anhNho.OpenReadStream(ToiDa).CopyToAsync(ms);
        anhXemTruoc = "data:image/jpeg;base64," + Convert.ToBase64String(ms.ToArray());

        await DaChonAnh.InvokeAsync(file);
    }
}`,
            note: 'RequestImageFileAsync thu ảnh về tối đa 400x400 ngay trong trình duyệt — chuỗi base64 xem trước nhỏ gọn, không phải đọc nguyên ảnh 2 MB vào bộ nhớ. accept chỉ lọc hộp thoại chọn file, người dùng vẫn chọn "All files" được — phải kiểm tra lại trong code.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Kiểm tra ảnh trước khi gửi',
            steps: [
              { kind: 'start', text: 'OnChange — nhận IBrowserFile' },
              {
                kind: 'decision',
                text: 'ContentType là ảnh cho phép?',
                branches: [
                  { label: 'Không', steps: [{ kind: 'end', text: 'Báo "Chỉ nhận JPG, PNG, WEBP"' }] },
                  {
                    label: 'Có',
                    steps: [{
                      kind: 'decision',
                      text: 'Size ≤ 2 MB?',
                      branches: [
                        { label: 'Không', steps: [{ kind: 'end', text: 'Báo vượt dung lượng' }] },
                        { label: 'Có', steps: [{ kind: 'process', text: 'RequestImageFileAsync → base64 → <img>' }] },
                      ],
                    }],
                  },
                ],
              },
              { kind: 'end', text: 'Bấm Lưu → gửi multipart lên API' },
            ],
          },
        },
      ],
    },
    {
      id: 'upload-api',
      title: '5. Gửi file lên API và lưu wwwroot/uploads',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'Phía Blazor — SanPhamService.UploadAnhAsync',
            code: `public async Task<string?> UploadAnhAsync(string maSanPham, IBrowserFile file)
{
    using var noiDung = new MultipartFormDataContent();
    var luong = new StreamContent(file.OpenReadStream(2 * 1024 * 1024));
    luong.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
    noiDung.Add(luong, "anh", file.Name);   // "anh" trùng tên tham số IFormFile phía API

    var res = await http.PostAsync($"api/san-pham/{maSanPham}/anh", noiDung);
    if (!res.IsSuccessStatusCode) return null;
    return await res.Content.ReadAsStringAsync();   // đường dẫn ảnh, ví dụ /uploads/TV01-ab12.jpg
}`,
            note: 'Tên phần "anh" phải trùng tên tham số IFormFile anh ở API, sai tên thì API nhận null. Không tự đặt header Content-Type cho cả request — MultipartFormDataContent tự sinh boundary.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Phía API — SanPhamController.UploadAnh',
            code: `[HttpPost("{ma}/anh"), Authorize(Roles = "Admin")]
[RequestSizeLimit(2 * 1024 * 1024)]
public async Task<IActionResult> UploadAnh(string ma, IFormFile anh, IWebHostEnvironment env)
{
    var sp = await db.SanPham.FindAsync(ma);
    if (sp is null) return NotFound();

    string duoi = Path.GetExtension(anh.FileName).ToLowerInvariant();
    if (duoi is not (".jpg" or ".jpeg" or ".png" or ".webp")) return BadRequest("Sai định dạng");

    string tenFile = $"{ma}-{Guid.NewGuid():N}{duoi}";            // không dùng tên gốc
    string thuMuc = Path.Combine(env.WebRootPath, "uploads");
    Directory.CreateDirectory(thuMuc);

    using (var fs = System.IO.File.Create(Path.Combine(thuMuc, tenFile)))
        await anh.CopyToAsync(fs);

    sp.HinhAnh = "/uploads/" + tenFile;
    await db.SaveChangesAsync();
    return Ok(sp.HinhAnh);
}`,
            note: 'Không lưu bằng anh.FileName: tên "../../appsettings.json" có thể ghi đè file hệ thống, hai người upload cùng "anh.jpg" sẽ đè nhau. Sinh tên mới bằng Guid và chỉ lưu đường dẫn vào CSDL. Cần app.UseStaticFiles() để /uploads/... truy cập được.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'File ảnh nằm ở đâu, CSDL lưu gì',
            root: {
              label: 'CuaHangDienMay.Api',
              children: [
                {
                  label: 'wwwroot',
                  children: [{
                    label: 'uploads',
                    highlight: true,
                    children: [
                      { label: 'TV01-3f9a1c….jpg', note: 'file thật trên đĩa' },
                      { label: 'TL01-b72e04….png' },
                    ],
                  }],
                },
                { label: 'Bảng SanPham', note: 'HinhAnh = "/uploads/TV01-3f9a1c….jpg"' },
              ],
            },
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Blazor Server thì sao?',
          text: 'Ở Blazor Server code chạy ngay trên máy chủ nên có thể ghi thẳng file.OpenReadStream(ToiDa).CopyToAsync(fileStream) vào wwwroot/uploads, không cần API. Dữ liệu vẫn đi qua kết nối SignalR của circuit — file lớn sẽ chậm, nên giữ giới hạn dung lượng.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b30-1', level: 'Cơ bản', title: 'Thông báo bảo trì cho mọi người',
      requirement: 'Cho Hub ThongBaoHub. Xây dựng API POST /api/thong-bao (Admin) nhận một chuỗi và gửi tới mọi client; mọi trang Blazor hiện thanh thông báo ở đầu MainLayout.',
      signature: 'hub.Clients.All.SendAsync("ThongBao", noiDung) · ketNoi.On<string>("ThongBao", …)',
      examples: [
        { input: 'Admin gửi "Bảo trì lúc 22h"', output: 'Ba tab đang mở đều hiện thanh "Bảo trì lúc 22h"' },
        { input: 'Thanh không hiện dù console có log nhận', output: 'Lỗi', explain: 'Quên InvokeAsync(StateHasChanged) trong callback.' },
      ],
    },
    {
      id: 'b30-2', level: 'Cơ bản', title: 'Chọn và xem trước ảnh',
      requirement: 'Cho trang thêm sản phẩm. Xây dựng ô chọn ảnh bằng InputFile: chỉ nhận JPG/PNG, tối đa 1 MB, hiện ảnh xem trước 300x300 và tên, dung lượng file (KB).',
      signature: 'InputFileChangeEventArgs e · e.File.RequestImageFileAsync',
      examples: [
        { input: 'Chọn tivi.png 640 KB', output: 'Xem trước + "tivi.png — 640 KB"' },
        { input: 'Chọn huongdan.pdf', output: '"Chỉ nhận JPG, PNG"', explain: 'Người dùng chọn All files để vượt accept — code vẫn chặn.' },
      ],
    },
    {
      id: 'b30-3', level: 'Trung bình', title: 'Thông báo đơn hàng mới cho quản trị',
      requirement: 'Cho API đặt hàng và Hub DonHangHub. Xây dựng trang /quan-tri/don-hang nhận đơn mới realtime: chỉ Admin, NhanVien nhận; có số đếm "Đơn mới chưa xem" trên menu.',
      tasks: [
        'OnConnectedAsync thêm Admin/NhanVien vào nhóm "QuanTri"',
        'DonHangController gửi DonHangMoi tới nhóm sau SaveChangesAsync',
        'Trang quản trị chèn đơn mới lên đầu danh sách, tô nền xanh 5 giây',
        'NavMenu hiện badge số đơn chưa xem, mở trang thì về 0',
      ],
      signature: 'Groups.AddToGroupAsync(Context.ConnectionId, "QuanTri") · Clients.Group("QuanTri")',
      examples: [
        { input: 'Khách đặt đơn, Admin và KhachHang khác đang mở web', output: 'Chỉ Admin thấy thông báo' },
        { input: 'Hub có [Authorize] nhưng client luôn bị 401', output: 'Lỗi cấu hình', explain: 'Thiếu OnMessageReceived đọc access_token từ query string.' },
      ],
      visual: {
        kind: 'seq',
        actors: ['Khách', 'API', 'Hub', 'Admin', 'Khách khác'],
        steps: [
          { from: 0, to: 1, text: 'POST /api/don-hang' },
          { from: 1, to: 2, text: 'Group("QuanTri").SendAsync' },
          { from: 2, to: 3, text: 'DonHangMoi' },
          { from: 1, to: 0, text: '201', dashed: true },
        ],
      },
    },
    {
      id: 'b30-4', level: 'Trung bình', title: 'Theo dõi trạng thái đơn của khách',
      requirement: 'Cho trang /don-hang/{id} của khách. Xây dựng cập nhật realtime: nhân viên đổi trạng thái đơn (Mới → Đang giao → Đã giao) thì trang của khách đổi ngay, chỉ khách đang xem đơn đó nhận.',
      signature: 'Hub: Task TheoDoiDon(int maDon) · Clients.Group("don-" + maDon).SendAsync("TrangThaiDoi", maDon, trangThai)',
      constraints: ['Khách gọi TheoDoiDon sau StartAsync và cả trong Reconnected', 'Rời trang gọi BoTheoDoiDon (RemoveFromGroupAsync)'],
      examples: [
        { input: 'NV đổi đơn 16 sang Đang giao', output: 'Trang /don-hang/16 của khách đổi nhãn, trang /don-hang/17 không đổi' },
        { input: 'Khách mất mạng 20 giây rồi có lại, NV đổi trạng thái', output: 'Vẫn nhận', explain: 'ConnectionId mới — phải gọi TheoDoiDon lại trong Reconnected.' },
      ],
      visual: {
        kind: 'flow',
        steps: [
          { kind: 'start', text: 'Mở /don-hang/16' },
          { kind: 'io', text: 'StartAsync, InvokeAsync("TheoDoiDon", 16)' },
          { kind: 'process', text: 'Chờ "TrangThaiDoi"' },
          {
            kind: 'decision',
            text: 'Reconnected?',
            branches: [
              { label: 'Có', steps: [{ kind: 'io', text: 'Gọi TheoDoiDon(16) lại' }] },
              { label: 'Không', steps: [{ kind: 'process', text: 'Cập nhật nhãn khi có sự kiện' }] },
            ],
          },
          { kind: 'end', text: 'Rời trang: BoTheoDoiDon, DisposeAsync' },
        ],
      },
    },
    {
      id: 'b30-5', level: 'Trung bình', title: 'Upload ảnh sản phẩm lên API',
      requirement: 'Cho trang sửa sản phẩm. Xây dựng chức năng đổi ảnh: chọn, xem trước, bấm Lưu thì gửi multipart lên API, API lưu vào wwwroot/uploads với tên mới và cập nhật cột HinhAnh, xoá file ảnh cũ.',
      signature: 'Task<string?> UploadAnhAsync(string maSanPham, IBrowserFile file) · IActionResult UploadAnh(string ma, IFormFile anh)',
      constraints: ['Tối đa 2 MB, chỉ .jpg .jpeg .png .webp, kiểm tra ở cả client và API', 'Tên file: {ma}-{Guid:N}{duoi}'],
      examples: [
        { input: 'Đổi ảnh TV01 từ tv-cu.jpg sang tv-moi.png', output: 'HinhAnh = "/uploads/TV01-….png", file cũ bị xoá' },
        { input: 'Dùng Postman gửi file 5 MB thẳng vào API', output: '413 Payload Too Large', explain: 'RequestSizeLimit chặn phía máy chủ — không tin vào kiểm tra phía client.' },
      ],
    },
    {
      id: 'b30-6', level: 'Nâng cao', title: 'Nhiều ảnh với thanh tiến trình',
      requirement: 'Cho sản phẩm có tối đa 5 ảnh. Xây dựng ô chọn nhiều file, hiện lưới xem trước có nút bỏ từng ảnh, upload lần lượt và hiện phần trăm tiến trình của từng ảnh.',
      tasks: [
        'InputFile multiple, e.GetMultipleFiles(5) — chọn quá 5 thì báo lỗi',
        'Lưới xem trước, nút X bỏ ảnh khỏi danh sách chờ',
        'Đọc stream theo khối 64 KB, cộng dồn số byte để tính phần trăm',
        'Ảnh lỗi không làm dừng các ảnh còn lại',
      ],
      signature: 'IReadOnlyList<IBrowserFile> GetMultipleFiles(int maximumFileCount)',
      examples: [
        { input: 'Chọn 7 ảnh', output: '"Tối đa 5 ảnh"', explain: 'GetMultipleFiles(5) ném InvalidOperationException khi vượt — bắt và báo lỗi.' },
        { input: 'Chọn 3 ảnh, ảnh 2 quá dung lượng', output: 'Ảnh 1 và 3 lên 100%, ảnh 2 báo lỗi đỏ' },
      ],
      hint: 'Tự viết vòng lặp ReadAsync vào buffer, sau mỗi khối cập nhật phanTram và StateHasChanged; hoặc bọc stream trong một ProgressStream.',
    },
    {
      id: 'b30-7', level: 'Nâng cao', title: 'Ai đang xem sản phẩm này',
      requirement: 'Cho trang chi tiết sản phẩm. Xây dựng dòng "Có N người đang xem sản phẩm này" cập nhật realtime khi người khác vào hoặc rời trang.',
      signature: 'Hub: Task VaoTrang(string maSp) · Task RoiTrang(string maSp) · Clients.Group("sp-" + maSp).SendAsync("SoNguoiXem", n)',
      constraints: ['Đếm bằng ConcurrentDictionary<string, HashSet<string>> (maSp → connectionId), khoá khi sửa HashSet', 'Đóng tab đột ngột cũng phải giảm — xử lý trong OnDisconnectedAsync'],
      examples: [
        { input: 'Tab A và B mở TV01', output: 'Cả hai hiện "2 người đang xem"' },
        { input: 'Đóng hẳn tab B', output: 'Tab A về "1 người đang xem"', explain: 'Không kịp gọi RoiTrang — OnDisconnectedAsync dọn connectionId.' },
      ],
      dense: true,
      visual: {
        kind: 'seq',
        actors: ['Tab A', 'Hub', 'Tab B'],
        steps: [
          { from: 0, to: 1, text: 'VaoTrang("TV01")' },
          { from: 1, to: 0, text: 'SoNguoiXem 1', dashed: true },
          { from: 2, to: 1, text: 'VaoTrang("TV01")' },
          { from: 1, to: 0, text: 'SoNguoiXem 2', dashed: true },
          { from: 1, to: 2, text: 'SoNguoiXem 2', dashed: true },
          { from: 2, to: 1, text: 'ngắt kết nối' },
          { from: 1, to: 0, text: 'SoNguoiXem 1', dashed: true },
        ],
      },
    },
    {
      id: 'b30-8', level: 'Nâng cao', title: 'Đăng nhập một thiết bị bằng SignalR',
      requirement: 'Cho bài tập điểm cộng slide trang 148 và clientId (buổi 28). Xây dựng cơ chế: người dùng đăng nhập ở thiết bị mới thì thiết bị cũ nhận thông điệp "BiDangXuat" qua SignalR, hiện "Tài khoản đã đăng nhập nơi khác" và tự đăng xuất.',
      tasks: [
        'Client kết nối Hub kèm clientId (query string hoặc gọi DangKyThietBi sau StartAsync)',
        'Hub lưu ánh xạ userId + clientId → connectionId',
        'API login: thu hồi refresh token của clientId khác, gửi "BiDangXuat" tới connection của các thiết bị đó',
        'Client nhận BiDangXuat: xoá token, BaoDaDoi, chuyển về trang đăng nhập',
      ],
      signature: 'Task DangKyThietBi(string clientId) · Clients.Client(connectionId).SendAsync("BiDangXuat")',
      examples: [
        { input: 'Đăng nhập Chrome, rồi đăng nhập cùng tài khoản trên Edge', output: 'Chrome hiện thông báo và về /dang-nhap trong vài giây' },
        { input: 'Chrome đang offline lúc Edge đăng nhập', output: 'Chrome online lại, gọi API nhận 401', explain: 'Thông điệp SignalR bị lỡ nhưng refresh token đã bị thu hồi — lớp bảo vệ thứ hai.' },
      ],
      hint: 'Clients.User(userId) gửi tới mọi thiết bị của người dùng — ở đây cần trừ thiết bị mới, nên lưu connectionId theo clientId và dùng Clients.Clients(danhSachConnectionId).',
    },
  ],
}

export default buoi30
