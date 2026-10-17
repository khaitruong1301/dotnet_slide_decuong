import type { Buoi } from './types'

const buoi24: Buoi = {
  id: 24,
  slug: 'blazor-routing-va-dieu-huong',
  title: 'Routing & điều hướng',
  subtitle: 'URL là một phần của giao diện: trang chi tiết theo id, bộ lọc trên query string, chuyển trang bằng code',
  duration: '3 giờ',
  keywords: ['@page', 'route parameter', 'route constraint', 'SupplyParameterFromQuery', 'NavigationManager', 'NavLink'],
  goals: [
    'Khai báo route có tham số và ràng buộc kiểu',
    'Đọc tham số từ query string để giữ bộ lọc, trang hiện tại trên URL',
    'Chuyển trang bằng NavigationManager và NavLink',
    'Xử lý trang không tồn tại và dữ liệu không tìm thấy',
  ],

  sections: [
    {
      id: 'route-param',
      title: '1. Tham số trên đường dẫn',
      blocks: [
        {
          type: 'text',
          text: 'Trang chi tiết sản phẩm không thể viết một file cho mỗi sản phẩm. Ta khai báo một route có chỗ trống {ma}; phần URL rơi vào chỗ trống được gán vào property [Parameter] cùng tên.',
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Pages/ChiTietSanPham.razor',
            code: `@page "/san-pham/{ma}"
@page "/sp/{ma}"                     @* một component có thể có nhiều route *@

@if (sp is null)
{
    <div class="alert alert-warning">Không tìm thấy sản phẩm "@Ma".</div>
    <a href="san-pham">← Về danh sách</a>
}
else
{
    <h1>@sp.Ten</h1>
    <p class="fs-4 text-danger">@sp.Gia.ToString("N0") đ</p>
}

@code {
    [Parameter] public string Ma { get; set; } = "";
    SanPham? sp;

    // Chạy mỗi khi tham số đổi — kể cả khi chuyển từ /san-pham/TV01 sang /san-pham/TL01
    protected override void OnParametersSet()
    {
        sp = KhoDuLieu.DanhSach.FirstOrDefault(x => x.Ma.Equals(Ma, StringComparison.OrdinalIgnoreCase));
    }
}`,
            note: 'Dùng OnParametersSet chứ không phải OnInitialized: khi đang ở trang chi tiết mà bấm sang sản phẩm khác, Blazor dùng lại component cũ, OnInitialized không chạy lại — trang sẽ hiện sản phẩm cũ. Buổi 25 nói kỹ.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'map',
            caption: 'Router so URL với từng mẫu @page',
            name: 'URL → component',
            pairs: [
              { key: '/', value: 'Index.razor' },
              { key: '/san-pham', value: 'SanPham.razor' },
              { key: '/san-pham/TV01', value: 'ChiTietSanPham.razor, Ma = "TV01"' },
              { key: '/don-hang/15', value: 'ChiTietDonHang.razor, Id = 15 (int)' },
              { key: '/don-hang/abc', value: 'không khớp {id:int} → NotFound' },
            ],
          },
        },
        {
          type: 'table',
          head: ['Ràng buộc', 'Ví dụ', 'Khớp'],
          rows: [
            ['{id:int}', '/don-hang/{id:int}', '15 khớp, abc không'],
            ['{id:guid}', '/hoa-don/{id:guid}', 'Chuỗi Guid'],
            ['{ngay:datetime}', '/bao-cao/{ngay:datetime}', '2026-10-17'],
            ['{gia:decimal}', '/loc/{gia:decimal}', '1500000'],
            ['{trang:int?}', '/tin/{trang:int?}', 'Tham số tuỳ chọn, property phải là int?'],
            ['{*duongDan}', '/tai-lieu/{*duongDan}', 'Nuốt cả phần còn lại: a/b/c'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Ràng buộc chỉ để khớp route, không để kiểm tra nghiệp vụ',
          text: '{id:int} chặn được "abc" nhưng vẫn nhận -5 và 999999. Sau khi khớp, vẫn phải kiểm tra id có tồn tại không và hiện thông báo rõ ràng.',
        },
      ],
    },
    {
      id: 'query-string',
      title: '2. Query string — bộ lọc nằm trên URL',
      blocks: [
        {
          type: 'text',
          text: 'Bộ lọc, từ khoá tìm kiếm, trang hiện tại nên nằm trên URL dạng /san-pham?nhom=dien-lanh&trang=2. Người dùng bấm F5 không mất bộ lọc, gửi link cho người khác thấy đúng kết quả, nút Back của trình duyệt hoạt động đúng.',
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Đọc query string bằng SupplyParameterFromQuery',
            code: `@page "/san-pham"
@inject NavigationManager Nav

<select class="form-select w-auto" value="@Nhom" @onchange="DoiNhom">
    <option value="">Tất cả</option>
    <option value="dien-tu">Điện tử</option>
    <option value="dien-lanh">Điện lạnh</option>
</select>

@foreach (var sp in KetQua) { <TheSanPham SanPham="sp" /> }

<button class="btn btn-link" disabled="@(Trang <= 1)" @onclick="() => DenTrang(Trang - 1)">Trước</button>
<span>Trang @Trang</span>
<button class="btn btn-link" @onclick="() => DenTrang(Trang + 1)">Sau</button>

@code {
    [SupplyParameterFromQuery] public string? Nhom { get; set; }
    [SupplyParameterFromQuery(Name = "trang")] public int Trang { get; set; } = 1;

    IEnumerable<SanPham> KetQua => KhoDuLieu.DanhSach
        .Where(s => string.IsNullOrEmpty(Nhom) || s.Nhom == Nhom)
        .Skip((Math.Max(Trang, 1) - 1) * 6).Take(6);

    void DoiNhom(ChangeEventArgs e) =>
        Nav.NavigateTo(Nav.GetUriWithQueryParameters(new Dictionary<string, object?>
        {
            ["nhom"] = e.Value?.ToString(),
            ["trang"] = 1,
        }));

    void DenTrang(int t) => Nav.NavigateTo(Nav.GetUriWithQueryParameter("trang", t));
}`,
            note: 'Không đổi biến Nhom trực tiếp — đổi URL. URL đổi thì Blazor gán lại tham số query và render. Một nguồn sự thật duy nhất: URL.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Chọn "Điện lạnh" trong select',
            steps: [
              { kind: 'start', text: '@onchange → DoiNhom("dien-lanh")' },
              { kind: 'process', text: 'GetUriWithQueryParameters → /san-pham?nhom=dien-lanh&trang=1' },
              { kind: 'process', text: 'Nav.NavigateTo(url) — không tải lại trang' },
              { kind: 'process', text: 'Router: cùng component → gán Nhom, Trang mới' },
              { kind: 'process', text: 'OnParametersSet → render KetQua' },
              { kind: 'end', text: 'Thanh địa chỉ và lịch sử trình duyệt có URL mới' },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Đặt trạng thái lọc ở đâu?',
            columns: [
              { title: 'Biến trong @code', tone: 'bad', items: ['F5 là mất', 'Không gửi link được', 'Back không quay lại bộ lọc trước'] },
              { title: 'Query string', tone: 'good', items: ['F5 giữ nguyên', 'Chia sẻ link đúng kết quả', 'Back / Forward hoạt động'] },
            ],
          },
        },
      ],
    },
    {
      id: 'navigation',
      title: '3. Điều hướng: NavLink và NavigationManager',
      blocks: [
        {
          type: 'table',
          head: ['Cách', 'Khi nào', 'Ví dụ'],
          rows: [
            ['<a href="san-pham/TV01">', 'Liên kết thường trong nội dung', 'Bấm vào tên sản phẩm'],
            ['<NavLink href="san-pham">', 'Menu cần tô mục đang mở', 'Match="NavLinkMatch.All" cho trang chủ'],
            ['Nav.NavigateTo("don-hang/15")', 'Chuyển sau khi xử lý xong', 'Lưu đơn thành công → sang trang chi tiết'],
            ['Nav.NavigateTo(url, forceLoad: true)', 'Tải lại toàn trang từ máy chủ', 'Sau đăng xuất, trang ngoài Blazor'],
            ['Nav.NavigateTo(url, replace: true)', 'Không thêm vào lịch sử', 'Chuyển hướng tự động, Back không quay về trang trung gian'],
            ['Nav.Uri / Nav.BaseUri', 'Đọc URL hiện tại', 'Tạo link chia sẻ'],
          ],
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Lưu xong thì chuyển trang',
            code: `@inject NavigationManager Nav

<EditForm Model="don" OnValidSubmit="LuuAsync"> … </EditForm>

@code {
    DonHang don = new();

    async Task LuuAsync()
    {
        int id = await DonHangService.TaoAsync(don);   // buổi 26–27
        Nav.NavigateTo($"don-hang/{id}");
    }
}`,
            note: 'Đường dẫn không có / ở đầu là tương đối với BaseUri (gốc ứng dụng) — an toàn khi ứng dụng deploy dưới một thư mục con. Có / ở đầu là tuyệt đối từ tên miền.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'NavLink trong menu — tự thêm class active',
            code: `<NavLink class="nav-link" href="" Match="NavLinkMatch.All">Trang chủ</NavLink>
<NavLink class="nav-link" href="san-pham">Sản phẩm</NavLink>
<NavLink class="nav-link" href="don-hang">Đơn hàng</NavLink>`,
            note: 'Mặc định NavLinkMatch.Prefix: /san-pham/TV01 vẫn làm mục "Sản phẩm" sáng. Trang chủ href="" phải dùng All, nếu không mọi URL đều bắt đầu bằng "" và trang chủ luôn sáng.',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Chặn rời trang khi form đang sửa dở',
          text: 'Component <NavigationLock OnBeforeInternalNavigation="HoiTruocKhiRoi" ConfirmExternalNavigation="true" /> (.NET 7+) cho phép hỏi "Bạn có thay đổi chưa lưu, rời trang?" và gọi context.PreventNavigation() nếu người dùng chọn ở lại.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b24-1', level: 'Cơ bản', title: 'Trang chi tiết theo mã',
      requirement: 'Tạo /san-pham/{ma} hiện tên, giá, nhóm của sản phẩm trong danh sách tĩnh. Mã không tồn tại thì hiện cảnh báo và link về danh sách. Trên trang danh sách, tên mỗi sản phẩm là link sang trang chi tiết.',
      signature: '@page "/san-pham/{ma}" · [Parameter] string Ma',
      examples: [
        { input: '/san-pham/tl01', output: 'Trang Tủ lạnh LG', explain: 'So sánh không phân biệt hoa thường.' },
        { input: '/san-pham/XX99', output: 'Cảnh báo "Không tìm thấy sản phẩm XX99"' },
      ],
    },
    {
      id: 'b24-2', level: 'Cơ bản', title: 'Ràng buộc kiểu',
      requirement: 'Tạo /don-hang/{id:int}. Thử các URL: /don-hang/5, /don-hang/abc, /don-hang/-3, /don-hang/99999. Ghi lại cái nào vào trang, cái nào vào NotFound, và thêm kiểm tra để id ≤ 0 hiện "Mã đơn không hợp lệ".',
      signature: '@page "/don-hang/{id:int}" · [Parameter] int Id',
      examples: [
        { input: '/don-hang/abc', output: 'Khối NotFound của App.razor' },
        { input: '/don-hang/-3', output: 'Vào trang (khớp int), hiện "Mã đơn không hợp lệ"' },
      ],
    },
    {
      id: 'b24-3', level: 'Cơ bản', title: 'Menu có mục đang mở',
      requirement: 'Sửa NavMenu: Trang chủ, Sản phẩm, Đơn hàng, Khách hàng bằng NavLink. Khi ở /san-pham/TV01 mục Sản phẩm sáng; khi ở trang chủ chỉ mục Trang chủ sáng.',
      signature: 'NavLink + Match="NavLinkMatch.All" cho trang chủ',
      examples: [
        { input: 'Mở /khach-hang', output: 'Chỉ mục Khách hàng có class active' },
      ],
    },
    {
      id: 'b24-4', level: 'Trung bình', title: 'Bộ lọc trên query string',
      requirement: 'Trang /san-pham đọc ?nhom=…&gia-max=…&q=… bằng SupplyParameterFromQuery. Select nhóm, ô giá tối đa và ô tìm kiếm khi đổi đều cập nhật URL (không đổi biến trực tiếp). F5 giữ nguyên bộ lọc; nút Back quay lại bộ lọc trước.',
      signature: 'GetUriWithQueryParameters + NavigateTo',
      constraints: ['Giá trị rỗng thì bỏ tham số khỏi URL (truyền null)', 'Ô tìm kiếm cập nhật URL khi Enter hoặc rời ô, không phải từng phím'],
      examples: [
        { input: 'Chọn Điện lạnh, nhập giá tối đa 10000000', output: 'URL: /san-pham?nhom=dien-lanh&gia-max=10000000' },
        { input: 'Bấm Back', output: 'URL về /san-pham?nhom=dien-lanh, ô giá trống' },
      ],
    },
    {
      id: 'b24-5', level: 'Trung bình', title: 'Phân trang bằng URL',
      requirement: 'Danh sách 30 khách hàng, 8 khách mỗi trang, trang lấy từ ?trang=. Thanh phân trang hiện số trang 1…n, trang hiện tại tô đậm, nút Trước/Sau. ?trang=99 hoặc ?trang=0 thì tự chuyển về trang hợp lệ gần nhất bằng replace: true.',
      signature: '[SupplyParameterFromQuery(Name = "trang")] int Trang · NavigateTo(url, replace: true)',
      examples: [
        { input: '/khach-hang?trang=99', output: 'Tự chuyển /khach-hang?trang=4; Back không quay về trang=99', explain: 'replace: true thay mục lịch sử hiện tại.' },
      ],
    },
    {
      id: 'b24-6', level: 'Trung bình', title: 'Chuyển giữa các sản phẩm liền kề',
      requirement: 'Trang chi tiết có nút "Sản phẩm trước" và "Sản phẩm sau" theo thứ tự danh sách. Bấm thì URL đổi và nội dung đổi. Kiểm chứng: nếu tìm sản phẩm trong OnInitialized thay vì OnParametersSet thì chuyện gì xảy ra?',
      signature: 'NavigateTo($"san-pham/{ke.Ma}") · OnParametersSet',
      examples: [
        { input: 'Ở TV01 bấm Sau (dùng OnInitialized)', output: 'URL thành /san-pham/TL01 nhưng trang vẫn hiện Tivi', explain: 'Cùng component, Blazor không tạo lại nên OnInitialized không chạy lại.' },
        { input: 'Đổi sang OnParametersSet', output: 'Trang hiện Tủ lạnh đúng' },
      ],
    },
    {
      id: 'b24-7', level: 'Nâng cao', title: 'Cảnh báo rời trang khi chưa lưu',
      requirement: 'Trang sửa sản phẩm /san-pham/{ma}/sua có EditForm. Nếu đã sửa ít nhất một ô mà chưa lưu, bấm link trong menu thì hiện hộp thoại "Rời trang và bỏ thay đổi?"; chọn Ở lại thì không chuyển. Đóng tab cũng được trình duyệt hỏi. Lưu xong thì chuyển về trang chi tiết không hỏi.',
      signature: '<NavigationLock OnBeforeInternalNavigation ConfirmExternalNavigation="@daSua" />',
      constraints: ['Dùng EditContext.IsModified() để biết đã sửa', 'Sau khi lưu đặt cờ để NavigationLock cho qua'],
      examples: [
        { input: 'Sửa tên, bấm menu Đơn hàng, chọn Ở lại', output: 'Vẫn ở trang sửa, dữ liệu còn nguyên' },
        { input: 'Sửa tên, bấm Lưu', output: 'Chuyển sang /san-pham/TV01 ngay' },
      ],
    },
    {
      id: 'b24-8', level: 'Nâng cao', title: 'Thiết kế bản đồ URL cho ứng dụng',
      requirement: 'Thiết kế toàn bộ URL cho ứng dụng cửa hàng: danh sách, chi tiết, thêm, sửa sản phẩm; danh sách đơn có lọc theo trạng thái và khoảng ngày; chi tiết đơn; hồ sơ khách; trang đăng nhập có returnUrl. Viết bảng URL → component → tham số route / query, kèm ràng buộc kiểu.',
      signature: 'Bảng ≥ 10 dòng',
      examples: [
        { input: 'Danh sách đơn đã giao trong tháng 10', output: '/don-hang?trang-thai=da-giao&tu=2026-10-01&den=2026-10-31 → DanhSachDonHang.razor (query: TrangThai, Tu, Den)' },
        { input: 'Đăng nhập rồi quay lại trang đang xem', output: '/dang-nhap?returnUrl=%2Fdon-hang%2F15 → DangNhap.razor (query: ReturnUrl)' },
      ],
      hint: 'Danh từ số nhiều cho danh sách, thêm /{ma} cho chi tiết, /them và /{ma}/sua cho form. Thứ lọc được, chia sẻ được thì để trên query string.',
    },
  ],
}

export default buoi24
