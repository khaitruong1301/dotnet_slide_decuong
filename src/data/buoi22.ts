import type { Buoi } from './types'

const buoi22: Buoi = {
  id: 22,
  slug: 'blazor-data-binding-va-form',
  title: 'Data binding & Form với EditForm',
  subtitle: 'Nối ô nhập với biến bằng @bind, kiểm tra dữ liệu bằng DataAnnotations và báo lỗi ngay trên form',
  duration: '3 giờ',
  keywords: ['@bind', '@bind:event', '@bind:after', 'EditForm', 'InputText', 'DataAnnotations', 'ValidationMessage'],
  goals: [
    'Phân biệt binding một chiều (@bien) và hai chiều (@bind), biết @bind thực chất là gì',
    'Dùng EditForm với các Input component và model class để dựng form',
    'Khai báo luật kiểm tra bằng [Required], [Range], [EmailAddress] và hiện lỗi tại chỗ',
    'Xử lý OnValidSubmit, OnInvalidSubmit và đặt lại form sau khi lưu',
  ],

  sections: [
    {
      id: 'bind',
      title: '1. @bind — binding hai chiều',
      blocks: [
        {
          type: 'text',
          text: 'Buổi trước, @tuKhoa trong markup chỉ đi một chiều: biến đổi thì chữ đổi. Muốn gõ vào ô mà biến đổi theo thì phải bắt sự kiện và gán. @bind làm cả hai việc trong một thuộc tính.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: '@bind chỉ là đường tắt cho cặp value + onchange',
            columns: [
              { title: 'Viết tay', tone: 'plain', items: ['<input value="@ten"', '       @onchange="e => ten = e.Value?.ToString()" />', 'Hai chiều, hai thuộc tính'] },
              { title: '@bind', tone: 'good', items: ['<input @bind="ten" />', 'Blazor sinh đúng cặp trên', 'Mặc định cập nhật khi onchange (rời ô)'] },
              { title: '@bind:event', tone: 'good', items: ['<input @bind="ten" @bind:event="oninput" />', 'Cập nhật từng phím gõ', 'Dùng cho tìm kiếm, đếm ký tự'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'Năm cách @bind gặp mỗi ngày',
            code: `@* 1. Chuỗi, cập nhật khi rời ô *@
<input class="form-control" @bind="kh.HoTen" />

@* 2. Chuỗi, cập nhật từng phím *@
<input class="form-control" @bind="tuKhoa" @bind:event="oninput" />
<small>@tuKhoa.Length ký tự</small>

@* 3. Số: Blazor tự chuyển chuỗi ↔ int; gõ chữ thì giữ giá trị cũ *@
<input type="number" class="form-control" @bind="kh.NamSinh" />

@* 4. Checkbox ↔ bool *@
<input type="checkbox" class="form-check-input" @bind="kh.DongY" />

@* 5. Select ↔ string (hoặc enum) *@
<select class="form-select" @bind="kh.HangThe">
    <option value="Thuong">Thường</option>
    <option value="Vang">Vàng</option>
    <option value="BachKim">Bạch kim</option>
</select>

@* Chạy thêm việc sau khi biến đã nhận giá trị mới (.NET 7+) *@
<input @bind="kh.SoDienThoai" @bind:after="KiemTraSdt" />

@code {
    KhachHang kh = new();
    string tuKhoa = "";

    void KiemTraSdt() { /* gọi API kiểm tra trùng… */ }
}`,
            note: 'Với @bind, Blazor tự parse theo kiểu biến: int, decimal, DateTime, bool, enum. Parse thất bại thì biến giữ nguyên và ô nhập quay về giá trị cũ. @bind:format="dd/MM/yyyy" cho DateTime.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Gõ "An" vào ô @bind="kh.HoTen" rồi Tab sang ô khác',
            actors: ['Ô input (trình duyệt)', 'Component (máy chủ)'],
            steps: [
              { from: 0, to: 0, text: 'Gõ A, n — chỉ DOM đổi' },
              { from: 0, to: 1, text: 'Tab → sự kiện onchange, value = "An"' },
              { from: 1, to: 1, text: 'kh.HoTen = "An"; render lại' },
              { from: 1, to: 0, text: 'diff: ô vẫn "An", chỗ khác hiện @kh.HoTen', dashed: true },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Không @bind và @onchange trên cùng một ô',
          text: '@bind đã chiếm onchange rồi; thêm @onchange nữa là lỗi biên dịch "attribute onchange is used two or more times". Cần làm gì sau khi giá trị đổi thì dùng @bind:after, hoặc bỏ @bind và viết tay cặp value + onchange.',
        },
      ],
    },
    {
      id: 'editform',
      title: '2. EditForm và các Input component',
      blocks: [
        {
          type: 'text',
          text: 'Form có nhiều ô thì gom vào một class model, rồi dùng EditForm thay cho form thường. EditForm nhận Model, theo dõi ô nào đã sửa, chạy validation và chỉ gọi OnValidSubmit khi mọi luật đạt. Bên trong dùng các Input component thay cho input thường để chúng nối với hệ thống validation.',
        },
        {
          type: 'code',
          sample: {
            title: 'Models/KhachHang.cs — luật nằm ngay trên property',
            code: `using System.ComponentModel.DataAnnotations;

public class KhachHang
{
    [Required(ErrorMessage = "Họ tên không được trống")]
    [StringLength(50, MinimumLength = 2, ErrorMessage = "Họ tên từ 2 đến 50 ký tự")]
    public string HoTen { get; set; } = "";

    [Required(ErrorMessage = "Email không được trống")]
    [EmailAddress(ErrorMessage = "Email không đúng định dạng")]
    public string Email { get; set; } = "";

    [RegularExpression(@"^0\\d{9}$", ErrorMessage = "Số điện thoại gồm 10 số, bắt đầu bằng 0")]
    public string? SoDienThoai { get; set; }

    [Range(1900, 2026, ErrorMessage = "Năm sinh từ 1900 đến 2026")]
    public int NamSinh { get; set; } = 2000;

    public string HangThe { get; set; } = "Thuong";

    [Range(typeof(bool), "true", "true", ErrorMessage = "Bạn phải đồng ý điều khoản")]
    public bool DongY { get; set; }
}`,
            note: 'Cùng class này dùng được ở Web API phía máy chủ (buổi 33): [ApiController] tự kiểm tra DataAnnotations và trả 400 nếu sai. Viết luật một lần, hai đầu cùng dùng — lợi thế của C# toàn stack.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'DangKy.razor — EditForm đầy đủ',
            code: `@page "/dang-ky"

<h1>Đăng ký khách hàng thân thiết</h1>

<EditForm Model="@kh" OnValidSubmit="LuuAsync" OnInvalidSubmit="BaoLoi">
    <DataAnnotationsValidator />
    <ValidationSummary class="alert alert-danger" />

    <div class="mb-3">
        <label class="form-label" for="hoTen">Họ tên</label>
        <InputText id="hoTen" class="form-control" @bind-Value="kh.HoTen" />
        <ValidationMessage For="@(() => kh.HoTen)" />
    </div>

    <div class="mb-3">
        <label class="form-label" for="email">Email</label>
        <InputText id="email" type="email" class="form-control" @bind-Value="kh.Email" />
        <ValidationMessage For="@(() => kh.Email)" />
    </div>

    <div class="row">
        <div class="col-md-6 mb-3">
            <label class="form-label" for="sdt">Số điện thoại</label>
            <InputText id="sdt" class="form-control" @bind-Value="kh.SoDienThoai" />
            <ValidationMessage For="@(() => kh.SoDienThoai)" />
        </div>
        <div class="col-md-6 mb-3">
            <label class="form-label" for="namSinh">Năm sinh</label>
            <InputNumber id="namSinh" class="form-control" @bind-Value="kh.NamSinh" />
            <ValidationMessage For="@(() => kh.NamSinh)" />
        </div>
    </div>

    <div class="mb-3">
        <label class="form-label" for="hang">Hạng thẻ</label>
        <InputSelect id="hang" class="form-select" @bind-Value="kh.HangThe">
            <option value="Thuong">Thường</option>
            <option value="Vang">Vàng</option>
            <option value="BachKim">Bạch kim</option>
        </InputSelect>
    </div>

    <div class="form-check mb-3">
        <InputCheckbox id="dongY" class="form-check-input" @bind-Value="kh.DongY" />
        <label class="form-check-label" for="dongY">Tôi đồng ý điều khoản</label>
        <ValidationMessage For="@(() => kh.DongY)" />
    </div>

    <button type="submit" class="btn btn-primary" disabled="@dangLuu">
        @(dangLuu ? "Đang lưu…" : "Đăng ký")
    </button>
    <button type="button" class="btn btn-outline-secondary" @onclick="DatLai">Nhập lại</button>
</EditForm>

@if (thongBao is not null)
{
    <div class="alert alert-success mt-3">@thongBao</div>
}

@code {
    KhachHang kh = new();
    bool dangLuu;
    string? thongBao;

    async Task LuuAsync()
    {
        dangLuu = true;
        await Task.Delay(800);                 // buổi 27: PostAsJsonAsync tới API
        thongBao = $"Đã đăng ký {kh.HoTen} ({kh.HangThe})";
        kh = new();                            // đặt lại form
        dangLuu = false;
    }

    void BaoLoi() => thongBao = null;
    void DatLai() { kh = new(); thongBao = null; }
}`,
            note: 'Input component dùng @bind-Value (có -Value) chứ không phải @bind. ValidationMessage For nhận lambda trỏ tới property — nhờ đó chỉ hiện lỗi của đúng ô. Blazor tự thêm class valid/invalid/modified lên ô để CSS tô viền xanh đỏ.',
          },
        },
        {
          type: 'table',
          head: ['Component', 'Thay cho', 'Kiểu dữ liệu'],
          rows: [
            ['InputText', 'input type=text', 'string'],
            ['InputTextArea', 'textarea', 'string'],
            ['InputNumber<T>', 'input type=number', 'int, decimal, double… (và nullable)'],
            ['InputDate<T>', 'input type=date', 'DateTime, DateOnly'],
            ['InputSelect<T>', 'select', 'string, enum, int'],
            ['InputCheckbox', 'input type=checkbox', 'bool'],
            ['InputRadioGroup / InputRadio', 'nhóm radio', 'enum, string'],
            ['InputFile', 'input type=file', 'IBrowserFile'],
          ],
        },
      ],
    },
    {
      id: 'validation-flow',
      title: '3. Luồng kiểm tra dữ liệu',
      blocks: [
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Bấm Đăng ký trong EditForm',
            steps: [
              { kind: 'start', text: 'submit' },
              { kind: 'process', text: 'DataAnnotationsValidator duyệt mọi attribute trên Model' },
              { kind: 'decision', text: 'Có lỗi ?', branches: [
                { label: 'Có', steps: [
                  { kind: 'io', text: 'ValidationSummary liệt kê; ValidationMessage hiện dưới từng ô; ô thêm class invalid' },
                  { kind: 'process', text: 'Gọi OnInvalidSubmit (nếu có)' },
                ] },
                { label: 'Không', steps: [
                  { kind: 'process', text: 'Gọi OnValidSubmit → LuuAsync' },
                  { kind: 'io', text: 'Hiện thông báo, kh = new() làm form trống' },
                ] },
              ] },
            ],
          },
        },
        {
          type: 'text',
          text: 'Validation chạy ở hai thời điểm: khi một ô mất focus (chỉ kiểm tra ô đó, hiện lỗi ngay) và khi submit (kiểm tra tất cả). Mọi kiểm tra chạy trên máy chủ Blazor Server — nhưng vẫn là phía ứng dụng web, Web API nhận dữ liệu phải kiểm tra lại lần nữa.',
        },
        {
          type: 'table',
          head: ['Attribute', 'Luật', 'Ví dụ'],
          rows: [
            ['[Required]', 'Không null, không chuỗi rỗng', 'Họ tên, email'],
            ['[StringLength(max, MinimumLength = n)]', 'Độ dài chuỗi', 'Mật khẩu 6–50'],
            ['[Range(min, max)]', 'Số trong khoảng', 'Năm sinh, số lượng'],
            ['[EmailAddress] / [Phone] / [Url]', 'Định dạng chuẩn', 'Email'],
            ['[RegularExpression(pattern)]', 'Khớp regex', 'Số điện thoại VN, mã sản phẩm'],
            ['[Compare(nameof(MatKhau))]', 'Bằng một property khác', 'Nhập lại mật khẩu'],
            ['[CustomValidation(typeof(X), nameof(X.Kiem))]', 'Hàm tự viết trả ValidationResult', 'Ngày giao sau ngày đặt'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'Luật phụ thuộc hai trường — IValidatableObject',
            code: `public class DonHang : IValidatableObject
{
    [Required] public DateTime NgayDat { get; set; } = DateTime.Today;
    [Required] public DateTime NgayGiao { get; set; } = DateTime.Today.AddDays(1);

    public IEnumerable<ValidationResult> Validate(ValidationContext context)
    {
        if (NgayGiao < NgayDat)
            yield return new ValidationResult(
                "Ngày giao phải sau ngày đặt",
                new[] { nameof(NgayGiao) });     // gắn lỗi vào ô NgayGiao
    }
}`,
            note: 'Attribute chỉ nhìn được một property. Luật so sánh hai trường viết trong Validate; mảng tên property quyết định ValidationMessage nào hiện lỗi.',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'EditContext khi cần kiểm soát sâu hơn',
          text: 'Thay Model bằng EditContext="@ctx" (ctx = new EditContext(kh)) để gọi ctx.Validate() theo ý, bật nút Lưu chỉ khi ctx.IsModified(), hay nghe ctx.OnFieldChanged để tự động lưu nháp. Mức căn bản dùng Model là đủ.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b22-1', level: 'Cơ bản', title: 'Gương chữ',
      requirement: 'Một ô nhập và ba dòng bên dưới: chữ vừa gõ, chữ in hoa, số ký tự. Dòng đầu cập nhật từng phím; làm thêm bản thứ hai cập nhật khi rời ô và giải thích khác nhau ở đâu.',
      signature: '<input @bind="s" @bind:event="oninput" /> · @s.ToUpper() · @s.Length',
      examples: [
        { input: 'Gõ "abc" không rời ô (bản oninput)', output: 'Ba dòng đổi theo từng phím' },
        { input: 'Gõ "abc" không rời ô (bản mặc định)', output: 'Ba dòng chưa đổi; Tab ra mới đổi', explain: '@bind mặc định dùng onchange.' },
      ],
    },
    {
      id: 'b22-2', level: 'Cơ bản', title: 'Máy tính tiền hàng',
      requirement: 'Ba ô: giá (number, decimal), số lượng (number, int), giảm giá % (select 0/5/10). Hiện thành tiền = giá × số lượng × (1 − giảm/100) cập nhật ngay khi đổi bất kỳ ô nào. Gõ chữ vào ô số thì giá trị không đổi.',
      signature: 'decimal gia; int soLuong; int giam; decimal ThanhTien => …',
      examples: [
        { input: 'gia 1.000.000, soLuong 3, giảm 10', output: '2.700.000 đ' },
        { input: 'Gõ "abc" vào ô giá', output: 'Ô quay về giá trị cũ, thành tiền không đổi', explain: 'Parse thất bại, @bind giữ nguyên biến.' },
      ],
    },
    {
      id: 'b22-3', level: 'Cơ bản', title: 'Model có luật',
      requirement: 'Viết class SanPham với DataAnnotations: Ma bắt buộc, đúng mẫu 2 chữ hoa + 2 số (regex); Ten bắt buộc 3–100 ký tự; GiaNhap từ 1.000 đến 1 tỷ; Nhom bắt buộc; MoTa tối đa 500 ký tự không bắt buộc. Mỗi luật có thông báo tiếng Việt.',
      signature: 'public class SanPham { [Required]… }',
      examples: [
        { input: 'Ma = "tv1"', output: 'Lỗi "Mã gồm 2 chữ in hoa và 2 chữ số, ví dụ TV01"' },
        { input: 'GiaNhap = 500', output: 'Lỗi "Giá nhập từ 1.000 đến 1.000.000.000"' },
      ],
    },
    {
      id: 'b22-4', level: 'Trung bình', title: 'Form thêm sản phẩm',
      requirement: 'Dựng EditForm cho model SanPham ở bài 3: InputText cho mã, tên; InputNumber cho giá; InputSelect cho nhóm (Điện tử / Điện lạnh / Gia dụng); InputTextArea cho mô tả kèm bộ đếm ký tự còn lại. Lỗi hiện dưới từng ô và trong ValidationSummary. Submit hợp lệ thì thêm vào List bên dưới và làm trống form.',
      signature: '<EditForm Model OnValidSubmit> + <DataAnnotationsValidator /> + ValidationMessage For',
      constraints: ['Dùng Input component với @bind-Value, không dùng input thường', 'Bộ đếm ký tự cập nhật từng phím: InputTextArea @oninput hoặc @bind-Value:event'],
      examples: [
        { input: 'Bấm Lưu khi form trống', output: 'Summary liệt kê 4 lỗi; viền đỏ ở mã, tên, giá, nhóm; không thêm vào danh sách' },
        { input: 'Nhập đủ, bấm Lưu', output: 'Danh sách thêm 1 dòng, form trống, ô mã focus lại' },
      ],
    },
    {
      id: 'b22-5', level: 'Trung bình', title: 'Nhập lại mật khẩu và điều khoản',
      requirement: 'Form đăng ký tài khoản: tên đăng nhập (4–20 ký tự, chỉ chữ số và gạch dưới), mật khẩu (tối thiểu 8, có chữ và số), nhập lại mật khẩu phải khớp, ngày sinh phải đủ 16 tuổi, checkbox đồng ý bắt buộc. Nút Đăng ký chỉ bật khi đã sửa ít nhất một ô.',
      signature: '[Compare(nameof(MatKhau))] · IValidatableObject cho tuổi · EditContext.IsModified()',
      constraints: ['Luật tuổi viết bằng Validate của IValidatableObject và gắn vào ô ngày sinh', 'Dùng EditContext thay vì Model để biết IsModified'],
      examples: [
        { input: 'Mật khẩu "abc12345", nhập lại "abc12346"', output: 'Lỗi dưới ô nhập lại: "Mật khẩu nhập lại không khớp"' },
        { input: 'Ngày sinh 2015-01-01', output: 'Lỗi dưới ô ngày sinh: "Bạn phải đủ 16 tuổi"' },
      ],
    },
    {
      id: 'b22-6', level: 'Trung bình', title: 'Sửa sản phẩm tại chỗ',
      requirement: 'Bảng sản phẩm có nút Sửa ở mỗi hàng. Bấm Sửa thì hàng đó biến thành các ô nhập (EditForm riêng cho hàng), có nút Lưu và Huỷ. Lưu thì validation chạy; Huỷ thì khôi phục giá trị cũ. Chỉ một hàng được sửa tại một thời điểm.',
      signature: 'SanPham? dangSua; SanPham banSao; @if (sp == dangSua) { <EditForm Model="banSao"> } else { <tr> }',
      constraints: ['Sửa trên bản sao, chỉ chép vào bản gốc khi Lưu hợp lệ', 'Bấm Sửa hàng khác khi đang sửa thì huỷ hàng cũ'],
      examples: [
        { input: 'Sửa TV01, đổi giá thành 0, Lưu', output: 'Lỗi Range dưới ô giá, hàng vẫn ở chế độ sửa' },
        { input: 'Sửa TV01, đổi tên, Huỷ', output: 'Tên cũ hiện lại', explain: 'Nhờ sửa trên bản sao.' },
      ],
      hint: 'Bản sao: banSao = sp with { } nếu SanPham là record, hoặc tự chép từng property. EditForm trong <tr> không hợp lệ HTML — bọc cả bảng trong một EditForm hoặc đổi sang bố cục div.',
    },
    {
      id: 'b22-7', level: 'Nâng cao', title: 'Form nhiều bước',
      requirement: 'Đăng ký đơn hàng ba bước: (1) thông tin khách, (2) địa chỉ giao + ngày giao, (3) xác nhận. Nút Tiếp theo chỉ qua bước khi phần model của bước đó hợp lệ; nút Quay lại giữ nguyên dữ liệu; thanh tiến trình hiện bước hiện tại; bước 3 hiện tóm tắt và nút Đặt hàng.',
      signature: 'class DonHangModel { KhachHang Khach; DiaChiGiao Giao; } · int buoc = 1 · EditContext.Validate()',
      constraints: ['Mỗi bước là một EditForm với Model là object con tương ứng', 'Ngày giao phải sau hôm nay (IValidatableObject hoặc CustomValidation)'],
      examples: [
        { input: 'Bước 1 trống, bấm Tiếp theo', output: 'Lỗi hiện, vẫn ở bước 1' },
        { input: 'Qua bước 2, Quay lại, rồi Tiếp theo', output: 'Dữ liệu bước 1 còn nguyên, không phải nhập lại' },
      ],
    },
    {
      id: 'b22-8', level: 'Nâng cao', title: 'Tự lưu nháp',
      requirement: 'Form mô tả sản phẩm dài: mỗi khi người dùng ngừng gõ 1 giây thì tự lưu nháp (giả lập bằng Task.Delay rồi ghi vào một List<string> lịch sử kèm giờ) và hiện "Đã lưu nháp lúc HH:mm:ss". Gõ liên tục thì không lưu dồn dập. Dùng EditContext.OnFieldChanged hoặc @bind:after.',
      signature: 'CancellationTokenSource? cts; async Task LuuNhapAsync()',
      constraints: ['Huỷ lần lưu đang chờ khi có phím mới (CancellationToken)', 'Không gọi StateHasChanged thừa'],
      examples: [
        { input: 'Gõ 20 ký tự liên tục trong 3 giây rồi dừng', output: 'Chỉ một dòng "Đã lưu nháp" sau khi dừng 1 giây', explain: 'Debounce: mỗi phím huỷ Task.Delay cũ và bắt đầu đếm lại.' },
      ],
      hint: 'Mỗi lần đổi: cts?.Cancel(); cts = new(); try { await Task.Delay(1000, cts.Token); lưu } catch (TaskCanceledException) { }.',
    },
  ],
}

export default buoi22
