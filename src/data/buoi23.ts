import type { Buoi } from './types'

const buoi23: Buoi = {
  id: 23,
  slug: 'blazor-component-tham-so-eventcallback',
  title: 'Component lồng nhau: Parameter, EventCallback, RenderFragment',
  subtitle: 'Dữ liệu đi xuống bằng tham số, sự kiện đi lên bằng callback — chia trang lớn thành các mảnh nhỏ dùng lại được',
  duration: '3 giờ',
  keywords: ['[Parameter]', 'EventCallback', 'RenderFragment', 'ChildContent', 'CascadingValue', '@ref'],
  goals: [
    'Truyền dữ liệu từ cha xuống con bằng [Parameter]',
    'Báo sự kiện từ con lên cha bằng EventCallback<T>',
    'Viết component khung nhận nội dung HTML bằng RenderFragment',
    'Dùng CascadingValue chia sẻ một giá trị cho cả nhánh cây component',
  ],

  sections: [
    {
      id: 'parameter',
      title: '1. [Parameter] — dữ liệu đi xuống',
      blocks: [
        {
          type: 'text',
          text: 'Buổi 20, hai thẻ TheSanPham in giống hệt nhau vì dữ liệu nằm cứng bên trong. Muốn mỗi thẻ hiện một sản phẩm khác, thẻ phải nhận sản phẩm từ bên ngoài. Property public có [Parameter] trở thành thuộc tính khi dùng thẻ: <TheSanPham SanPham="@sp" />.',
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Shared/TheSanPham.razor — nhận sản phẩm qua tham số',
            code: `<div class="card h-100">
    <div class="card-body d-flex flex-column">
        <h5 class="card-title">@SanPham.Ten</h5>
        <p class="text-danger fw-bold">@SanPham.Gia.ToString("N0") đ</p>
        @if (HienNhanMoi)
        {
            <span class="badge bg-success mb-2">Mới</span>
        }
        <button class="btn btn-primary mt-auto">Thêm vào giỏ</button>
    </div>
</div>

@code {
    [Parameter, EditorRequired] public SanPham SanPham { get; set; } = default!;
    [Parameter] public bool HienNhanMoi { get; set; }
}`,
            note: 'EditorRequired làm trình biên dịch cảnh báo nếu cha quên truyền. Tham số luôn là property public có get; set; — không phải field.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Pages/SanPham.razor — cha lặp danh sách, mỗi thẻ con một sản phẩm',
            code: `<div class="row g-3">
    @foreach (var sp in danhSach)
    {
        <div class="col-12 col-md-6 col-lg-4" @key="sp.Ma">
            <TheSanPham SanPham="sp" HienNhanMoi="@(sp.NgayNhap > DateTime.Today.AddDays(-7))" />
        </div>
    }
</div>`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Dữ liệu chảy một chiều từ trên xuống',
            root: {
              label: 'SanPham.razor', note: 'giữ List<SanPham> danhSach', highlight: true,
              children: [
                { label: 'TheSanPham', note: 'SanPham = TV01' },
                { label: 'TheSanPham', note: 'SanPham = TL01' },
                { label: 'TheSanPham', note: 'SanPham = NC01' },
              ],
            },
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Không gán lại tham số bên trong con',
          text: 'Con đặt SanPham = new(...) thì lần sau cha render lại, giá trị từ cha đè lên và thay đổi của con mất. Tham số là của cha. Con muốn đổi thì báo lên cho cha đổi — đó là EventCallback.',
        },
      ],
    },
    {
      id: 'eventcallback',
      title: '2. EventCallback — sự kiện đi lên',
      blocks: [
        {
          type: 'text',
          text: 'Nút "Thêm vào giỏ" nằm trong thẻ con, nhưng giỏ hàng thuộc về cha. Con không giữ giỏ, con chỉ báo: "người ta vừa bấm thêm sản phẩm này". Cha đăng ký một hàm nhận tin báo đó.',
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Con khai báo EventCallback<SanPham>, cha truyền hàm vào',
            code: `@* ---- TheSanPham.razor (con) ---- *@
<button class="btn btn-primary mt-auto" @onclick="BamThem">Thêm vào giỏ</button>

@code {
    [Parameter] public SanPham SanPham { get; set; } = default!;
    [Parameter] public EventCallback<SanPham> OnThem { get; set; }

    async Task BamThem() => await OnThem.InvokeAsync(SanPham);
}

@* ---- SanPham.razor (cha) ---- *@
<p>Giỏ hàng: @gio.Count món — @gio.Sum(s => s.Gia).ToString("N0") đ</p>

@foreach (var sp in danhSach)
{
    <TheSanPham SanPham="sp" OnThem="ThemVaoGio" />
}

@code {
    List<SanPham> gio = new();
    void ThemVaoGio(SanPham sp) => gio.Add(sp);
}`,
            note: 'InvokeAsync gọi hàm của cha và sau đó Blazor tự render lại cha — dòng "Giỏ hàng" cập nhật mà không cần StateHasChanged. Đó là lý do dùng EventCallback chứ không dùng Action thường.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Bấm "Thêm vào giỏ" ở thẻ TL01',
            actors: ['TheSanPham (TL01)', 'SanPham.razor (cha)'],
            steps: [
              { from: 0, to: 0, text: '@onclick → BamThem()' },
              { from: 0, to: 1, text: 'OnThem.InvokeAsync(TL01)' },
              { from: 1, to: 1, text: 'ThemVaoGio(TL01): gio.Add' },
              { from: 1, to: 1, text: 'Blazor render lại cha' },
              { from: 1, to: 0, text: 'Tham số không đổi → con không render lại', dashed: true },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Quy tắc vàng của component',
            columns: [
              { title: 'Xuống: [Parameter]', tone: 'good', items: ['Cha → con', 'Dữ liệu, cấu hình, cờ bật tắt', 'Con chỉ đọc'] },
              { title: 'Lên: EventCallback', tone: 'good', items: ['Con → cha', '"Có chuyện vừa xảy ra" kèm dữ liệu', 'Cha quyết định đổi trạng thái'] },
              { title: 'Hai chiều: @bind-', tone: 'plain', items: ['Value + ValueChanged', '<OChon @bind-Value="x" />', 'Tham số và callback cùng tên + Changed'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Component hỗ trợ @bind- : cặp Value / ValueChanged',
            code: `@* ---- ChonSoLuong.razor ---- *@
<div class="input-group" style="width: 140px">
    <button class="btn btn-outline-secondary" @onclick="() => Doi(-1)" disabled="@(Value <= 1)">−</button>
    <span class="form-control text-center">@Value</span>
    <button class="btn btn-outline-secondary" @onclick="() => Doi(1)">+</button>
</div>

@code {
    [Parameter] public int Value { get; set; }
    [Parameter] public EventCallback<int> ValueChanged { get; set; }

    Task Doi(int buoc) => ValueChanged.InvokeAsync(Value + buoc);
}

@* ---- Dùng ---- *@
<ChonSoLuong @bind-Value="dong.SoLuong" />`,
            note: 'Đặt tên Xxx và XxxChanged là cha viết được @bind-Xxx. Blazor tự nối: khi con gọi ValueChanged, biến dong.SoLuong của cha được gán.',
          },
        },
      ],
    },
    {
      id: 'renderfragment',
      title: '3. RenderFragment — component khung nhận HTML',
      blocks: [
        {
          type: 'text',
          text: 'Có những component chỉ là cái khung: hộp thoại, thẻ có tiêu đề, bảng có phân trang. Phần bên trong do nơi dùng quyết định. Tham số kiểu RenderFragment nhận một đoạn markup; tham số tên ChildContent nhận nội dung nằm giữa thẻ mở và thẻ đóng.',
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'HopThoai.razor — hộp thoại dùng lại cho mọi chỗ',
            code: `@if (Mo)
{
    <div class="modal d-block" style="background: rgba(0,0,0,.4)">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">@TieuDe</h5>
                    <button class="btn-close" @onclick="Dong"></button>
                </div>
                <div class="modal-body">@ChildContent</div>
                @if (ChanTrang is not null)
                {
                    <div class="modal-footer">@ChanTrang</div>
                }
            </div>
        </div>
    </div>
}

@code {
    [Parameter] public bool Mo { get; set; }
    [Parameter] public EventCallback<bool> MoChanged { get; set; }
    [Parameter] public string TieuDe { get; set; } = "";
    [Parameter] public RenderFragment? ChildContent { get; set; }
    [Parameter] public RenderFragment? ChanTrang { get; set; }

    Task Dong() => MoChanged.InvokeAsync(false);
}

@* ---- Dùng: hỏi xác nhận xoá ---- *@
<HopThoai @bind-Mo="hienXacNhan" TieuDe="Xoá sản phẩm">
    <ChildContent>
        Bạn chắc chắn xoá <strong>@dangXoa?.Ten</strong>?
    </ChildContent>
    <ChanTrang>
        <button class="btn btn-secondary" @onclick="() => hienXacNhan = false">Huỷ</button>
        <button class="btn btn-danger" @onclick="XoaThat">Xoá</button>
    </ChanTrang>
</HopThoai>`,
            note: 'Chỉ có một RenderFragment tên ChildContent thì không cần thẻ <ChildContent>, viết nội dung thẳng giữa <HopThoai>…</HopThoai>. Có nhiều vùng thì đặt tên thẻ theo tên tham số.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'RenderFragment<T> — bảng chung, mỗi nơi tự quyết cách vẽ một hàng',
            code: `@* ---- BangDuLieu.razor ---- *@
@typeparam TItem

<table class="table">
    <thead><tr>@TieuDe</tr></thead>
    <tbody>
        @foreach (var item in Items)
        {
            <tr>@Hang(item)</tr>
        }
    </tbody>
</table>

@code {
    [Parameter] public IEnumerable<TItem> Items { get; set; } = [];
    [Parameter] public RenderFragment? TieuDe { get; set; }
    [Parameter] public RenderFragment<TItem> Hang { get; set; } = default!;
}

@* ---- Dùng ---- *@
<BangDuLieu Items="danhSach" Context="sp">
    <TieuDe><th>Mã</th><th>Tên</th><th>Giá</th></TieuDe>
    <Hang><td>@sp.Ma</td><td>@sp.Ten</td><td>@sp.Gia.ToString("N0")</td></Hang>
</BangDuLieu>`,
            note: '@typeparam biến component thành generic như List<T> ở buổi 14. Context="sp" đặt tên cho tham số của RenderFragment<T> bên trong thẻ con.',
          },
        },
      ],
    },
    {
      id: 'cascading',
      title: '4. CascadingValue và @ref',
      blocks: [
        {
          type: 'text',
          text: 'Truyền một giá trị qua năm tầng component bằng [Parameter] là phải khai báo ở cả năm tầng. CascadingValue đặt giá trị một lần ở tầng trên; mọi con cháu khai báo [CascadingParameter] cùng kiểu là nhận được.',
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Chia sẻ người dùng hiện tại cho cả trang',
            code: `@* MainLayout.razor *@
<CascadingValue Value="nguoiDung">
    @Body
</CascadingValue>

@code {
    NguoiDung nguoiDung = new("Khải", "Admin");
}

@* Bất kỳ component nào bên dưới, sâu bao nhiêu cũng được *@
@if (NguoiDung?.VaiTro == "Admin")
{
    <button class="btn btn-danger">Xoá</button>
}

@code {
    [CascadingParameter] public NguoiDung? NguoiDung { get; set; }
}`,
            note: 'Blazor dùng chính cơ chế này cho đăng nhập: CascadingAuthenticationState (buổi 29). Dữ liệu đổi thường xuyên hay dùng ở nhiều trang thì nên đặt trong service (buổi 26).',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'CascadingValue phủ cả nhánh — không cần truyền qua tầng giữa',
            root: {
              label: 'CascadingValue (nguoiDung)', highlight: true,
              children: [
                { label: 'MainLayout @Body', children: [
                  { label: 'SanPham.razor', note: 'không khai báo gì', children: [
                    { label: 'TheSanPham', note: '[CascadingParameter] NguoiDung', highlight: true },
                  ] },
                ] },
              ],
            },
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: '@ref — giữ tham chiếu tới một component con để gọi phương thức',
            code: `<HopThoaiXacNhan @ref="hopThoai" />
<button class="btn btn-danger" @onclick="Xoa">Xoá</button>

@code {
    HopThoaiXacNhan hopThoai = default!;

    async Task Xoa()
    {
        bool dongY = await hopThoai.HoiAsync("Xoá sản phẩm này?");
        if (dongY) { /* xoá */ }
    }
}`,
            note: '@ref chỉ có giá trị sau lần render đầu tiên (OnAfterRender trở đi). Dùng tiết kiệm: gọi phương thức con là đi ngược luồng dữ liệu, ưu tiên tham số + callback.',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Khi nào tách component',
          text: 'Một đoạn markup lặp lại từ hai chỗ trở lên, hoặc một file .razor vượt khoảng 150 dòng, hoặc một vùng có trạng thái riêng (đang mở, đang sửa) — tách ra. Đặt tên theo vai trò: TheSanPham, BangGioHang, HopThoai.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b23-1', level: 'Cơ bản', title: 'Thẻ khách hàng có tham số',
      requirement: 'Viết TheKhachHang.razor nhận [Parameter] KhachHang (HoTen, Email, Diem) và [Parameter] bool LaVip. Thẻ VIP có viền vàng và chữ "VIP". Trang cha hiện 4 khách bằng @foreach.',
      signature: '[Parameter, EditorRequired] public KhachHang KhachHang { get; set; }',
      examples: [
        { input: '4 khách, khách thứ 2 có Diem ≥ 1000', output: '4 thẻ; thẻ thứ 2 viền vàng có chữ VIP', explain: 'Cha tính LaVip="@(kh.Diem >= 1000)".' },
      ],
    },
    {
      id: 'b23-2', level: 'Cơ bản', title: 'Nút xoá báo lên cha',
      requirement: 'Thêm vào TheKhachHang nút Xoá với EventCallback<KhachHang> OnXoa. Cha nhận và gỡ khách khỏi List. Dòng đếm số khách ở cha cập nhật ngay.',
      signature: '[Parameter] public EventCallback<KhachHang> OnXoa { get; set; }',
      examples: [
        { input: 'Bấm Xoá ở thẻ thứ 3', output: 'Còn 3 thẻ, dòng "3 khách hàng"' },
      ],
      hint: 'Con không có List nên không thể tự xoá. Con chỉ gọi await OnXoa.InvokeAsync(KhachHang).',
    },
    {
      id: 'b23-3', level: 'Cơ bản', title: 'Component Thẻ có khung',
      requirement: 'Viết TheKhung.razor nhận TieuDe (string) và ChildContent (RenderFragment), vẽ card Bootstrap có header. Dùng nó ba lần với ba nội dung khác nhau: một đoạn văn, một bảng, một form.',
      signature: '[Parameter] public RenderFragment? ChildContent { get; set; }',
      examples: [
        { input: '<TheKhung TieuDe="Giới thiệu"><p>…</p></TheKhung>', output: 'Card có header "Giới thiệu", thân là đoạn văn' },
      ],
    },
    {
      id: 'b23-4', level: 'Trung bình', title: 'Ô số lượng hỗ trợ @bind-Value',
      requirement: 'Viết ChonSoLuong.razor có Value, ValueChanged, Min, Max. Nút − disabled khi bằng Min, + disabled khi bằng Max. Dùng trong bảng giỏ hàng: @bind-Value="dong.SoLuong", thành tiền và tổng cập nhật khi bấm.',
      signature: '[Parameter] int Value · [Parameter] EventCallback<int> ValueChanged',
      constraints: ['Con không tự gán Value, chỉ gọi ValueChanged', 'Min mặc định 1, Max mặc định 99'],
      examples: [
        { input: 'Bấm + ba lần ở dòng Tivi (giá 12tr)', output: 'Số lượng 4, thành tiền 48.000.000, tổng giỏ cập nhật' },
        { input: 'Đang 1, bấm −', output: 'Nút đã disabled, không đổi' },
      ],
      visual: {
        kind: 'seq',
        caption: 'Bấm + trong ChonSoLuong',
        actors: ['ChonSoLuong', 'BangGioHang'],
        steps: [
          { from: 0, to: 1, text: 'ValueChanged.InvokeAsync(Value + 1)' },
          { from: 1, to: 1, text: 'dong.SoLuong = 4; render lại' },
          { from: 1, to: 0, text: 'Value = 4 (tham số mới)', dashed: true },
        ],
      },
    },
    {
      id: 'b23-5', level: 'Trung bình', title: 'Hộp thoại xác nhận dùng chung',
      requirement: 'Viết HopThoai.razor với @bind-Mo, TieuDe, ChildContent, ChanTrang. Dùng nó cho hai việc ở trang sản phẩm: xác nhận xoá (nội dung là tên sản phẩm) và xem chi tiết (nội dung là bảng thông số). Bấm nền mờ bên ngoài cũng đóng hộp thoại.',
      signature: 'HopThoai.razor + 2 chỗ dùng',
      constraints: ['Bấm trong modal-content không được đóng: @onclick:stopPropagation', 'Không dùng JavaScript hay thư viện ngoài'],
      examples: [
        { input: 'Bấm Xoá ở TL01', output: 'Hộp thoại "Xoá sản phẩm" hỏi về Tủ lạnh LG, có nút Huỷ và Xoá' },
        { input: 'Bấm vùng mờ bên ngoài', output: 'Hộp thoại đóng, không xoá gì' },
      ],
    },
    {
      id: 'b23-6', level: 'Trung bình', title: 'Bảng generic dùng lại',
      requirement: 'Viết BangDuLieu.razor với @typeparam TItem, tham số Items, TieuDe (RenderFragment), Hang (RenderFragment<TItem>), và ThongBaoTrong (RenderFragment, hiện khi Items rỗng). Dùng cho hai danh sách khác kiểu: sản phẩm và khách hàng.',
      signature: '@typeparam TItem · RenderFragment<TItem> Hang',
      examples: [
        { input: 'Items = danhSachSanPham (3 phần tử)', output: 'Bảng 3 hàng theo mẫu Hang của trang sản phẩm' },
        { input: 'Items rỗng', output: 'Hiện ThongBaoTrong thay vì bảng' },
      ],
    },
    {
      id: 'b23-7', level: 'Nâng cao', title: 'Chủ đề sáng tối bằng CascadingValue',
      requirement: 'Đặt CascadingValue<string> "sang" hoặc "toi" ở MainLayout, có nút đổi trên thanh trên cùng. Ba component ở các tầng khác nhau (TheSanPham, BangDuLieu, HopThoai) nhận [CascadingParameter] và đổi class Bootstrap theo chủ đề. Không truyền qua tầng giữa nào.',
      signature: '<CascadingValue Value="chuDe" Name="ChuDe"> · [CascadingParameter(Name = "ChuDe")]',
      constraints: ['Dùng Name để tránh nhầm với cascading string khác', 'Đổi chủ đề thì mọi component cập nhật ngay'],
      examples: [
        { input: 'Bấm nút đổi chủ đề', output: 'Card, bảng, modal cùng chuyển sang bg-dark text-light' },
      ],
    },
    {
      id: 'b23-8', level: 'Nâng cao', title: 'Tách trang lớn thành component',
      requirement: 'Cho trang QuanLySanPham.razor 300 dòng gồm: ô tìm kiếm, bộ lọc nhóm, bảng có sắp xếp, form thêm/sửa, hộp thoại xoá. Tách thành ít nhất 5 component, vẽ cây component, ghi rõ tham số đi xuống và callback đi lên ở mỗi cạnh. Trạng thái gốc (danh sách, từ khoá, đang sửa) chỉ nằm ở trang cha.',
      signature: 'Cây component + bảng tham số/callback + code',
      examples: [
        { input: 'ONhapTimKiem', output: 'Xuống: TuKhoa · Lên: TuKhoaChanged (@bind-TuKhoa)' },
        { input: 'BangSanPham', output: 'Xuống: Items, CotSapXep · Lên: OnSua(SanPham), OnXoa(SanPham), OnSapXep(string)' },
      ],
      hint: 'Hỏi mỗi mẩu trạng thái: ai cần đọc nó, ai được đổi nó. Nếu hai anh em cùng cần thì đặt ở cha chung gần nhất.',
    },
  ],
}

export default buoi23
