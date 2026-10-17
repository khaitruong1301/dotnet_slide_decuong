import type { Buoi } from './types'

const buoi21: Buoi = {
  id: 21,
  slug: 'blazor-cu-phap-razor-component-su-kien',
  title: 'Cú pháp Razor, Component & xử lý sự kiện',
  subtitle: 'Dữ liệu trong @code quyết định HTML hiện ra; sự kiện đổi dữ liệu, Blazor tự vẽ lại',
  duration: '3 giờ',
  keywords: ['@code', '@onclick', 'EventArgs', 'StateHasChanged', 'render', 'lambda', '@key'],
  goals: [
    'Viết component có trạng thái trong @code và render có điều kiện, có lặp',
    'Gắn sự kiện @onclick, @oninput, @onchange và đọc tham số sự kiện',
    'Giải thích chu trình: sự kiện → đổi trạng thái → render lại → diff → vá DOM',
    'Dùng @key khi render danh sách để Blazor không nhầm phần tử',
  ],

  sections: [
    {
      id: 'trang-thai-va-render',
      title: '1. Trạng thái và render — mô hình tư duy của Blazor',
      blocks: [
        {
          type: 'text',
          text: 'Trong web truyền thống bạn tìm phần tử rồi sửa chữ của nó. Trong Blazor bạn không bao giờ sửa DOM: bạn đổi biến trong @code, Blazor render lại component thành cây mới, so với cây cũ và chỉ vá chỗ khác. Giao diện luôn là một hàm của trạng thái.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'loop',
            caption: 'Chu trình sống của một component tương tác',
            init: 'Render lần đầu từ trạng thái ban đầu',
            cond: 'Có sự kiện (click, input, timer, dữ liệu về) ?',
            body: 'Handler chạy, đổi biến trong @code',
            step: 'Blazor render lại → diff → vá DOM',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Counter.razor — đọc lại với mô hình trên',
            code: `@page "/counter"

<h1>Đếm</h1>
<p>Giá trị hiện tại: @currentCount</p>

<button class="btn btn-primary" @onclick="TangLen">Bấm tôi</button>

@code {
    private int currentCount = 0;

    private void TangLen()
    {
        currentCount++;        // chỉ đổi biến — không đụng tới <p>
    }
}`,
            note: 'Sau khi handler của một sự kiện UI chạy xong, Blazor tự gọi render lại. Bạn không cần (và không nên) gọi StateHasChanged() ở đây. Khi nào cần sẽ nói ở mục 4.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Hai cách nghĩ về giao diện',
            columns: [
              { title: 'JavaScript kiểu cũ', tone: 'bad', items: ['document.getElementById("so").innerText = ++n', 'Tự tìm, tự sửa từng chỗ', 'Quên một chỗ là giao diện lệch dữ liệu'] },
              { title: 'Blazor', tone: 'good', items: ['currentCount++', 'Markup mô tả giao diện từ biến', 'Framework tìm chỗ khác và vá'] },
            ],
          },
        },
      ],
    },
    {
      id: 'dieu-kien-lap',
      title: '2. Render có điều kiện và lặp danh sách',
      blocks: [
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Danh sách sản phẩm từ List<SanPham> — @foreach, @if, @key',
            code: `@page "/san-pham"

<h1>Sản phẩm (@danhSach.Count)</h1>

@if (dangTai)
{
    <p><em>Đang tải…</em></p>
}
else if (danhSach.Count == 0)
{
    <div class="alert alert-info">Chưa có sản phẩm nào.</div>
}
else
{
    <div class="row g-3">
        @foreach (var sp in danhSach)
        {
            <div class="col-12 col-md-6 col-lg-4" @key="sp.Ma">
                <div class="card h-100 @(sp.Ton == 0 ? "opacity-50" : "")">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">@sp.Ten</h5>
                        <p class="text-danger fw-bold">@sp.Gia.ToString("N0") đ</p>
                        @if (sp.Ton == 0)
                        {
                            <span class="badge bg-secondary mb-2">Hết hàng</span>
                        }
                        <button class="btn btn-primary mt-auto" disabled="@(sp.Ton == 0)">Thêm vào giỏ</button>
                    </div>
                </div>
            </div>
        }
    </div>
}

@code {
    record SanPham(string Ma, string Ten, decimal Gia, int Ton);

    bool dangTai = false;
    List<SanPham> danhSach = new()
    {
        new("TV01", "Tivi Samsung 55 inch", 12_000_000, 5),
        new("TL01", "Tủ lạnh LG", 9_500_000, 0),
        new("NC01", "Nồi cơm Sharp", 650_000, 20),
    };
}`,
            note: 'disabled="@(bool)" là cách Blazor xử lý thuộc tính boolean: true thì sinh disabled, false thì bỏ hẳn thuộc tính. @key="sp.Ma" gắn danh tính cho từng phần tử — xem callout.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Ba trạng thái của một trang danh sách — luôn xử lý đủ cả ba',
            steps: [
              { kind: 'start', text: 'Component render' },
              { kind: 'decision', text: 'dangTai ?', branches: [
                { label: 'Đúng', steps: [{ kind: 'io', text: 'Hiện "Đang tải…"' }] },
                { label: 'Sai', steps: [
                  { kind: 'decision', text: 'danhSach rỗng ?', branches: [
                    { label: 'Đúng', steps: [{ kind: 'io', text: 'Hiện alert trống' }] },
                    { label: 'Sai', steps: [{ kind: 'io', text: '@foreach → N card' }] },
                  ] },
                ] },
              ] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Vì sao cần @key khi lặp',
          text: 'Không có @key, Blazor so phần tử theo vị trí: xoá sản phẩm đầu thì nó nghĩ phần tử 1 đổi nội dung thành phần tử 2, kéo theo trạng thái con (ô nhập đang gõ dở, animation) nhảy nhầm thẻ. Với @key theo mã duy nhất, Blazor biết thẻ nào biến mất và chỉ gỡ đúng thẻ đó.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'strip',
            caption: 'Xoá TV01 — có @key: gỡ đúng ô [0]; không @key: ô [0] bị "đổi nội dung" thành TL01, ô [2] bị gỡ',
            name: 'danhSach',
            items: ['TV01', 'TL01', 'NC01'],
            highlight: [0],
          },
        },
      ],
    },
    {
      id: 'su-kien',
      title: '3. Xử lý sự kiện',
      blocks: [
        {
          type: 'text',
          text: 'Sự kiện gắn bằng @on + tên sự kiện DOM: @onclick, @oninput, @onchange, @onkeydown, @onsubmit, @onmouseover… Giá trị là tên phương thức, hoặc một lambda khi cần truyền thêm tham số. Handler có thể đồng bộ hoặc async Task.',
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Giỏ hàng — bốn kiểu handler hay gặp',
            code: `<h3>Giỏ hàng (@gio.Count món)</h3>

@foreach (var sp in danhSach)
{
    <div class="d-flex align-items-center gap-2 mb-2" @key="sp.Ma">
        <span class="flex-grow-1">@sp.Ten</span>

        @* 1. Lambda truyền tham số *@
        <button class="btn btn-sm btn-outline-primary" @onclick="() => Them(sp)">Thêm</button>

        @* 2. Lambda có cả tham số và EventArgs *@
        <button class="btn btn-sm btn-outline-danger" @onclick="e => Xoa(sp, e)">Xoá</button>
    </div>
}

@* 3. Đọc giá trị ô nhập ngay khi gõ *@
<input class="form-control" placeholder="Tìm nhanh…" @oninput="TimKiem" />
<p class="text-muted">Đang tìm: @tuKhoa</p>

@* 4. Handler async *@
<button class="btn btn-success" @onclick="ThanhToanAsync" disabled="@dangXuLy">
    @(dangXuLy ? "Đang xử lý…" : "Thanh toán")
</button>

@code {
    List<SanPham> gio = new();
    string tuKhoa = "";
    bool dangXuLy;

    void Them(SanPham sp) => gio.Add(sp);

    void Xoa(SanPham sp, MouseEventArgs e)
    {
        // e.ShiftKey, e.ClientX… — thông tin của sự kiện chuột
        gio.Remove(sp);
    }

    void TimKiem(ChangeEventArgs e) => tuKhoa = e.Value?.ToString() ?? "";

    async Task ThanhToanAsync()
    {
        dangXuLy = true;
        await Task.Delay(1500);          // giả lập gọi API — buổi 27 gọi thật
        gio.Clear();
        dangXuLy = false;
    }
}`,
            note: 'Handler async: Blazor render một lần ngay khi gặp await đầu tiên (nên nút kịp hiện "Đang xử lý…") và render lần nữa khi Task xong. Đừng dùng async void — ngoại lệ sẽ không bắt được.',
          },
        },
        {
          type: 'table',
          head: ['Sự kiện', 'EventArgs', 'Khi nào bắn', 'Hay dùng cho'],
          rows: [
            ['@onclick', 'MouseEventArgs', 'Bấm chuột', 'Nút, thẻ, dòng bảng'],
            ['@oninput', 'ChangeEventArgs', 'Mỗi phím gõ', 'Tìm kiếm tức thời'],
            ['@onchange', 'ChangeEventArgs', 'Rời ô hoặc Enter', 'Select, checkbox, ô nhập ít đổi'],
            ['@onkeydown', 'KeyboardEventArgs', 'Nhấn phím', 'Enter để gửi, Esc để đóng'],
            ['@onsubmit', 'EventArgs', 'Submit form', 'Thường thay bằng EditForm — buổi 22'],
            ['@onmouseover / out', 'MouseEventArgs', 'Rê chuột', 'Tooltip, preview'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Bấm "Thanh toán" — hai lần render vì handler async',
            actors: ['Trình duyệt', 'Component (máy chủ)'],
            steps: [
              { from: 0, to: 1, text: 'click Thanh toán' },
              { from: 1, to: 1, text: 'dangXuLy = true; gặp await' },
              { from: 1, to: 0, text: 'render #1: nút disabled "Đang xử lý…"', dashed: true },
              { from: 1, to: 1, text: '…1,5 giây sau: gio.Clear(); dangXuLy = false' },
              { from: 1, to: 0, text: 'render #2: giỏ trống, nút bật lại', dashed: true },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Chặn hành vi mặc định và nổi bọt',
          text: '@onsubmit:preventDefault để form không tải lại trang; @onclick:stopPropagation để bấm nút trong thẻ không kích hoạt @onclick của thẻ cha. Viết dạng thuộc tính riêng: <form @onsubmit="Gui" @onsubmit:preventDefault>.',
        },
      ],
    },
    {
      id: 'statehaschanged',
      title: '4. Khi nào phải gọi StateHasChanged',
      blocks: [
        {
          type: 'text',
          text: 'Blazor tự render lại sau sự kiện UI và sau mỗi await trong handler. Nó không biết khi trạng thái đổi từ nơi khác: timer, sự kiện của service, callback từ luồng khác, SignalR đẩy xuống. Lúc đó bạn báo cho nó bằng StateHasChanged(), và nếu đang ở luồng khác thì bọc trong InvokeAsync.',
        },
        {
          type: 'code',
          sample: {
            title: 'Đồng hồ chạy bằng Timer — ví dụ kinh điển cần StateHasChanged',
            code: `@page "/dong-ho"
@implements IDisposable

<h3>@gio.ToString("HH:mm:ss")</h3>

@code {
    DateTime gio = DateTime.Now;
    System.Threading.Timer? timer;

    protected override void OnInitialized()
    {
        timer = new System.Threading.Timer(_ =>
        {
            gio = DateTime.Now;
            // Callback chạy trên thread pool, không phải luồng render của Blazor
            InvokeAsync(StateHasChanged);
        }, null, 0, 1000);
    }

    public void Dispose() => timer?.Dispose();
}`,
            note: 'Bỏ InvokeAsync(StateHasChanged) thì gio vẫn đổi mỗi giây nhưng màn hình đứng im. @implements IDisposable và Dispose() để timer dừng khi rời trang — không thì nó chạy mãi trên máy chủ (buổi 25 nói về vòng đời).',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Có cần gọi StateHasChanged không?',
            steps: [
              { kind: 'start', text: 'Trạng thái vừa đổi' },
              { kind: 'decision', text: 'Đổi trong handler sự kiện UI (@onclick…) hay trong lifecycle method ?', branches: [
                { label: 'Đúng', steps: [{ kind: 'io', text: 'Không cần — Blazor tự render' }] },
                { label: 'Sai', steps: [
                  { kind: 'decision', text: 'Đang ở luồng khác (Timer, event của service, Task.Run) ?', branches: [
                    { label: 'Đúng', steps: [{ kind: 'io', text: 'await InvokeAsync(StateHasChanged)' }] },
                    { label: 'Sai', steps: [{ kind: 'io', text: 'StateHasChanged()' }] },
                  ] },
                ] },
              ] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Gọi StateHasChanged bừa không làm nhanh hơn',
          text: 'Mỗi lần gọi là một lần render và diff. Gọi trong vòng lặp hay sau mỗi dòng gán là tự làm chậm trang. Chỉ gọi khi Blazor không thể tự biết trạng thái đã đổi.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b21-1', level: 'Cơ bản', title: 'Đếm có giới hạn',
      requirement: 'Sửa Counter: thêm nút Giảm và nút Đặt lại. Giá trị không được âm và không quá 10; khi chạm biên nút tương ứng bị disabled. Hiện dòng "Đã chạm giới hạn" khi bằng 0 hoặc 10.',
      signature: '@onclick ×3, disabled="@(…)", @if',
      examples: [
        { input: 'Bấm Giảm khi đang 0', output: 'Không xảy ra gì vì nút đã disabled' },
        { input: 'Bấm Tăng 10 lần từ 0', output: 'Hiện 10, nút Tăng disabled, dòng cảnh báo hiện' },
      ],
    },
    {
      id: 'b21-2', level: 'Cơ bản', title: 'Ba trạng thái của danh sách',
      requirement: 'Trang /san-pham có nút "Giả lập tải": bấm vào thì dangTai = true, sau 2 giây (Task.Delay) nạp 3 sản phẩm và dangTai = false. Có nút "Xoá hết" làm danh sách rỗng. Render đủ ba trạng thái: đang tải, rỗng, có dữ liệu.',
      signature: 'async Task TaiAsync() · @if / else if / else',
      examples: [
        { input: 'Bấm Giả lập tải', output: 'Hiện "Đang tải…" 2 giây rồi 3 card', explain: 'Render sau await đầu tiên hiện chữ đang tải; render khi Task xong hiện card.' },
        { input: 'Bấm Xoá hết', output: 'Alert "Chưa có sản phẩm nào"' },
      ],
    },
    {
      id: 'b21-3', level: 'Cơ bản', title: 'Tìm kiếm tức thời',
      requirement: 'Trên danh sách 6 sản phẩm, thêm ô nhập dùng @oninput; mỗi phím gõ lọc danh sách theo tên không phân biệt hoa thường và hiện số kết quả. Ô trống thì hiện tất cả.',
      signature: 'string tuKhoa; IEnumerable<SanPham> KetQua => danhSach.Where(…)',
      examples: [
        { input: 'Gõ "tủ"', output: 'Chỉ còn Tủ lạnh LG và Tủ đông Aqua, dòng "2 kết quả"' },
        { input: 'Xoá hết chữ', output: '6 sản phẩm' },
      ],
      hint: 'Đừng lọc rồi gán vào danhSach — sẽ mất dữ liệu gốc. Viết một property tính toán KetQua từ danhSach và tuKhoa; markup @foreach qua KetQua.',
    },
    {
      id: 'b21-4', level: 'Trung bình', title: 'Giỏ hàng với số lượng',
      requirement: 'Trang có danh sách sản phẩm (nút Thêm) và bảng giỏ hàng bên dưới: mỗi dòng tên, số lượng, nút + và −, thành tiền; dòng cuối tổng tiền. Thêm sản phẩm đã có thì tăng số lượng thay vì thêm dòng; số lượng về 0 thì xoá dòng.',
      signature: 'class DongGio { SanPham Sp; int SoLuong; } · List<DongGio> gio',
      constraints: ['Dùng @key cho dòng giỏ', 'Tổng tiền tính bằng LINQ Sum trong markup hoặc property, không lưu biến riêng'],
      examples: [
        { input: 'Thêm TV01 hai lần, thêm NC01 một lần', output: 'Giỏ 2 dòng: Tivi ×2 = 24.000.000; Nồi cơm ×1 = 650.000; Tổng 24.650.000' },
        { input: 'Bấm − ở Nồi cơm', output: 'Dòng Nồi cơm biến mất, tổng 24.000.000' },
      ],
    },
    {
      id: 'b21-5', level: 'Trung bình', title: 'Chọn dòng và phím tắt',
      requirement: 'Bảng sản phẩm: bấm vào một hàng thì hàng đó tô sáng (class table-active) và panel bên phải hiện chi tiết; bấm lại thì bỏ chọn. Nhấn phím Esc ở bất kỳ đâu trong bảng thì bỏ chọn; nhấn Delete thì xoá sản phẩm đang chọn (hỏi xác nhận bằng một dòng chữ và nút).',
      signature: '@onclick trên <tr>, @onkeydown trên <table tabindex="0">, SanPham? dangChon',
      constraints: ['Nút "Xoá" trong hàng phải có @onclick:stopPropagation để không đổi dòng chọn', 'Không dùng JavaScript'],
      examples: [
        { input: 'Bấm hàng TL01', output: 'Hàng sáng, panel hiện Tủ lạnh LG' },
        { input: 'Nhấn Esc', output: 'Bỏ chọn, panel ẩn' },
        { input: 'Bấm nút Xoá trong hàng NC01 khi đang chọn TL01', output: 'Hỏi xác nhận xoá NC01, dòng chọn vẫn là TL01', explain: 'Nhờ stopPropagation.' },
      ],
    },
    {
      id: 'b21-6', level: 'Trung bình', title: 'Thí nghiệm @key',
      requirement: 'Dựng danh sách 4 ô input, mỗi ô trong một @foreach có nút Xoá dòng. Gõ chữ vào ô thứ 2 rồi xoá dòng thứ 1, quan sát chữ nằm ở đâu — làm hai lần, có @key và không @key. Ghi lại và giải thích.',
      signature: 'Hai phiên bản markup + nhận xét',
      examples: [
        { input: 'Không @key, gõ "abc" vào ô 2, xoá dòng 1', output: 'Chữ "abc" nhảy lên ô đầu tiên (nay là dòng 2 cũ) hoặc biến mất', explain: 'Blazor so theo vị trí: nó cho rằng dòng 0 đổi nội dung, dòng 3 bị gỡ, và DOM input giữ nguyên giá trị người gõ.' },
        { input: 'Có @key, lặp lại', output: 'Chữ "abc" vẫn ở đúng dòng của nó' },
      ],
    },
    {
      id: 'b21-7', level: 'Nâng cao', title: 'Đếm ngược và tự lưu',
      requirement: 'Trang flash sale: hiện đồng hồ đếm ngược từ 10:00 mỗi giây bằng Timer; hết giờ thì mọi nút "Mua" disabled và hiện "Đã kết thúc". Có nút Tạm dừng / Tiếp tục. Rời trang phải dừng Timer. Giải thích vì sao cần InvokeAsync(StateHasChanged) ở đây mà không cần ở nút Tạm dừng.',
      signature: '@implements IDisposable · System.Threading.Timer · InvokeAsync(StateHasChanged)',
      constraints: ['Không dùng Task.Delay trong vòng while', 'Dispose phải huỷ Timer'],
      examples: [
        { input: 'Mở trang', output: 'Đồng hồ chạy 09:59, 09:58…' },
        { input: 'Bỏ InvokeAsync(StateHasChanged)', output: 'Số đứng im dù Timer vẫn chạy (đặt breakpoint thấy biến đổi)', explain: 'Callback Timer không phải sự kiện UI nên Blazor không tự render.' },
        { input: 'Bấm Tạm dừng', output: 'Dừng ngay, không cần StateHasChanged vì là @onclick' },
      ],
    },
    {
      id: 'b21-8', level: 'Nâng cao', title: 'Bảng có sắp xếp và phân trang',
      requirement: 'Bảng 25 sản phẩm: bấm tiêu đề cột để sắp xếp tăng/giảm (hiện mũi tên), chọn số dòng mỗi trang (5/10/20) bằng select @onchange, nút Trước/Sau, dòng "Trang x/y". Đổi sắp xếp hoặc kích thước trang thì về trang 1.',
      signature: 'string cotSapXep; bool tangDan; int trang = 1; int kichThuoc = 10; IEnumerable<SanPham> TrangHienTai => …',
      constraints: ['Sắp xếp và phân trang bằng LINQ trong một property tính toán', 'Không lưu danh sách đã sắp xếp vào biến riêng'],
      examples: [
        { input: 'Bấm "Giá" hai lần', output: 'Lần 1 tăng dần, lần 2 giảm dần, mũi tên đổi chiều, về trang 1' },
        { input: 'Chọn 20 dòng/trang', output: 'Trang 1/2, nút Sau bật, nút Trước disabled' },
      ],
      hint: 'TrangHienTai = danhSach.OrderBy(theo cột).Skip((trang − 1) × kichThuoc).Take(kichThuoc). Số trang = Math.Ceiling(Count / (double)kichThuoc). Mọi thứ suy ra từ bốn biến trạng thái; markup chỉ đọc.',
    },
  ],
}

export default buoi21
