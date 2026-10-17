import type { Buoi } from './types'

const buoi33: Buoi = {
  id: 33,
  slug: 'web-api-tham-so-viewmodel-status-code-async',
  title: 'Web API: tham số, ViewModel, status code & async',
  subtitle: 'API đúng chuẩn: lấy dữ liệu từ route, query, body, header; tách ViewModel khỏi Model; trả đúng mã trạng thái; xử lý bất đồng bộ',
  duration: '3 giờ',
  keywords: ['[FromQuery]', '[FromRoute]', '[FromBody]', 'ViewModel', 'IActionResult', 'status code', 'async Task'],
  goals: [
    'Lấy tham số đúng nguồn bằng [FromRoute], [FromQuery], [FromBody], [FromHeader]',
    'Phân biệt payload, ViewModel và Model; không để lộ dữ liệu nhạy cảm',
    'Trả status code phù hợp từng thao tác bằng IActionResult',
    'Viết action async và chạy song song nhiều tác vụ bằng Task.WhenAll',
  ],

  sections: [
    {
      id: 'tham-so',
      title: '1. Bốn nguồn tham số của một request',
      blocks: [
        {
          type: 'text',
          text: 'Một API lấy danh sách cần biết từ khoá tìm kiếm, API chi tiết cần biết id, API tạo mới cần cả object dữ liệu. Mỗi loại thông tin nằm ở một chỗ khác nhau trong HTTP request, và ASP.NET Core có một attribute để lấy đúng chỗ đó.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'map',
            caption: 'PUT /api/sanpham/TV01?thongBao=true — mỗi phần vào một tham số',
            name: 'Nguồn → tham số',
            pairs: [
              { key: '[FromRoute] /sanpham/{ma}', value: 'ma = "TV01"' },
              { key: '[FromQuery] ?thongBao=true', value: 'thongBao = true' },
              { key: '[FromHeader] X-Ma-Cua-Hang: CH01', value: 'maCuaHang = "CH01"' },
              { key: '[FromBody] { "ten": …, "gia": … }', value: 'sp = SanPhamViewModel' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Models/Category.cs và CategoryController — getAll có keyword',
            code: `public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
}

[Route("api/[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
    private static List<Category> dsDanhMuc = new()
    {
        new() { Id = 1, Name = "Tivi" },
        new() { Id = 2, Name = "Tủ lạnh" },
        new() { Id = 3, Name = "Máy giặt" },
        new() { Id = 4, Name = "Tivi OLED" },
    };

    [HttpGet]   // GET /api/Category?keyword=tivi
    public IActionResult GetAll([FromQuery] string? keyword)
    {
        var ketQua = string.IsNullOrWhiteSpace(keyword)
            ? dsDanhMuc
            : dsDanhMuc.Where(c => c.Name.Contains(keyword, StringComparison.OrdinalIgnoreCase)).ToList();
        return Ok(ketQua);
    }
}`,
            note: 'keyword phải là string? — query param không bắt buộc. Nếu khai báo string (không nullable) thì [ApiController] coi là bắt buộc và trả 400 khi gọi /api/Category không có keyword.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'GET theo id (route param) và đọc header',
            code: `[HttpGet("{id:int}")]   // GET /api/Category/2
public IActionResult GetById([FromRoute] int id)
{
    var dm = dsDanhMuc.FirstOrDefault(c => c.Id == id);
    if (dm is null) return NotFound(new { message = $"Không có danh mục {id}" });
    return Ok(dm);
}

[HttpGet("cua-hang")]   // header X-Ma-Cua-Hang: CH01
public IActionResult TheoCuaHang([FromHeader(Name = "X-Ma-Cua-Hang")] string maCuaHang)
    => Ok($"Danh mục của cửa hàng {maCuaHang}");`,
            note: 'Tên header có dấu gạch ngang không đặt được làm tên biến C#, nên dùng Name = "..." để ánh xạ.',
          },
        },
        {
          type: 'table',
          head: ['Attribute', 'Lấy từ', 'Dùng cho', '[ApiController] tự suy luận khi'],
          rows: [
            ['[FromRoute]', 'Đoạn URL {id}', 'Định danh tài nguyên', 'Tên tham số trùng {tên} trong route'],
            ['[FromQuery]', '?key=value', 'Lọc, tìm kiếm, phân trang, sắp xếp', 'Kiểu đơn giản không có trong route'],
            ['[FromBody]', 'Body JSON', 'Object tạo mới / cập nhật', 'Kiểu phức tạp (class)'],
            ['[FromHeader]', 'Header HTTP', 'Token, mã cửa hàng, ngôn ngữ', 'Không bao giờ — phải ghi rõ'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Chỉ một [FromBody] cho mỗi action',
          text: 'Body chỉ đọc được một lần. Cần gửi cả sản phẩm và danh sách ảnh thì gói chung vào một class ViewModel, không khai báo hai tham số [FromBody].',
        },
      ],
    },
    {
      id: 'viewmodel',
      title: '2. Payload, ViewModel và Model',
      blocks: [
        {
          type: 'text',
          text: 'Model (entity) là class ánh xạ bảng trong database: có Id, PasswordHash, Role, CreatedAt, Deleted… ViewModel là class chỉ gồm những trường client được gửi lên hoặc được nhận về. Payload là JSON thực tế trong body request — nó khớp với ViewModel chứ không phải với Model.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'uml',
            caption: 'Đăng ký tài khoản: client chỉ gửi 5 trường',
            children: [
              { name: 'UserViewModel', stereotype: 'ViewModel', attrs: ['+ Username: string', '+ FullName: string', '+ Password: string', '+ Email: string', '+ Phone: string?'] },
              { name: 'User', stereotype: 'Model', attrs: ['+ Id: int', '+ Username: string', '+ PasswordHash: string', '+ Email: string', '+ Role: string', '+ CreatedAt: DateTime', '+ Deleted: bool'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'POST nhận ViewModel, chuyển sang Model',
            code: `public class UserViewModel
{
    public string Username { get; set; } = null!;
    public string FullName { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Phone { get; set; }
}

[HttpPost]
public IActionResult DangKy([FromBody] UserViewModel vm)
{
    if (dsUser.Any(u => u.Username == vm.Username))
        return Conflict(new { message = "Tên đăng nhập đã tồn tại" });

    var user = new User
    {
        Id = dsUser.Count == 0 ? 1 : dsUser.Max(u => u.Id) + 1,
        Username = vm.Username, FullName = vm.FullName, Email = vm.Email, Phone = vm.Phone,
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(vm.Password),
        Role = "Customer", CreatedAt = DateTime.Now,
    };
    dsUser.Add(user);
    return CreatedAtAction(nameof(GetById), new { id = user.Id },
        new { user.Id, user.Username, user.FullName, user.Email });
}`,
            note: 'Server tự đặt Id, Role, CreatedAt — client không thể gửi "Role": "Admin" để tự nâng quyền. Response cũng không trả PasswordHash. (BCrypt từ gói NuGet BCrypt.Net-Next.)',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Nhận thẳng Model hay qua ViewModel?',
            columns: [
              { title: '[FromBody] User', tone: 'bad', items: ['Swagger đòi nhập cả Id, Role, Deleted', 'Client gửi "role":"Admin" là thành Admin', 'Trả về lộ PasswordHash', 'Đổi bảng là đổi API'] },
              { title: '[FromBody] UserViewModel', tone: 'good', items: ['Payload gọn, đúng nghiệp vụ', 'Trường nhạy cảm do server quyết', 'Response chọn lọc trường', 'Database đổi, API giữ nguyên'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Mỗi nghiệp vụ một ViewModel',
          text: 'Đăng ký cần Password, cập nhật hồ sơ thì không; đổi mật khẩu chỉ cần MatKhauCu, MatKhauMoi. Đừng cố dùng một ViewModel cho mọi thao tác — đặt tên theo việc: DangKyViewModel, CapNhatHoSoViewModel.',
        },
      ],
    },
    {
      id: 'status-code',
      title: '3. HTTP method, status code và IActionResult',
      blocks: [
        {
          type: 'table',
          head: ['Method', 'Ý nghĩa', 'Thành công', 'Lỗi hay gặp'],
          rows: [
            ['GET', 'Lấy dữ liệu, không thay đổi tài nguyên', '200 OK', '404 không tìm thấy'],
            ['POST', 'Tạo tài nguyên mới', '201 Created', '400 dữ liệu sai, 409 trùng'],
            ['PUT', 'Cập nhật toàn bộ tài nguyên', '200 OK hoặc 204 No Content', '400, 404'],
            ['PATCH', 'Cập nhật một phần (vd chỉ email)', '200 OK hoặc 204', '400, 404'],
            ['DELETE', 'Xoá tài nguyên', '204 No Content', '404'],
            ['OPTIONS', 'Hỏi server hỗ trợ method nào (CORS)', '204', '—'],
            ['HEAD', 'Như GET nhưng không có body', '200', '404'],
          ],
        },
        {
          type: 'table',
          head: ['Nhóm', 'Mã', 'Hàm trong ControllerBase', 'Khi nào'],
          rows: [
            ['2xx thành công', '200', 'Ok(data)', 'Trả dữ liệu'],
            ['', '201', 'Created(url, data) / CreatedAtAction(...)', 'Tạo mới xong, kèm header Location'],
            ['', '204', 'NoContent()', 'Xoá / cập nhật xong, không cần trả gì'],
            ['4xx lỗi phía client', '400', 'BadRequest(msg)', 'Dữ liệu sai nghiệp vụ'],
            ['', '401', 'Unauthorized()', 'Chưa đăng nhập / token sai'],
            ['', '403', 'Forbid()', 'Đã đăng nhập nhưng không đủ quyền'],
            ['', '404', 'NotFound(msg)', 'Không có tài nguyên'],
            ['', '409', 'Conflict(msg)', 'Trùng mã, trùng tên đăng nhập'],
            ['5xx lỗi server', '500', 'StatusCode(500, msg)', 'Lỗi ngoài dự kiến'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'PUT và DELETE trả đúng mã',
            code: `[HttpPut("{id:int}")]
public IActionResult CapNhat([FromRoute] int id, [FromBody] Category dm)
{
    if (id != dm.Id) return BadRequest("Id trên URL và trong body không khớp");
    var cu = dsDanhMuc.FirstOrDefault(c => c.Id == id);
    if (cu is null) return NotFound();
    cu.Name = dm.Name;
    return Ok(cu);
}

[HttpDelete("{id:int}")]
public IActionResult Xoa([FromRoute] int id)
{
    int soXoa = dsDanhMuc.RemoveAll(c => c.Id == id);
    return soXoa == 0 ? NotFound() : NoContent();
}`,
            note: 'Trả về object trần (return dm) thì luôn là 200, kể cả khi dm là null (ra 204 rỗng) — client không phân biệt được "không có" với "thành công". IActionResult cho phép chọn mã theo từng nhánh.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Một action PUT quyết định status code',
            steps: [
              { kind: 'start', text: 'PUT /api/Category/3 + body' },
              { kind: 'decision', text: 'Body hợp lệ (validation)?', branches: [
                { label: 'Không', steps: [{ kind: 'end', text: '400 — [ApiController] tự trả, action không chạy' }] },
                { label: 'Có', steps: [
                  { kind: 'decision', text: 'Tìm thấy id 3?', branches: [
                    { label: 'Không', steps: [{ kind: 'end', text: '404 NotFound()' }] },
                    { label: 'Có', steps: [{ kind: 'process', text: 'Cập nhật' }, { kind: 'end', text: '200 Ok(cu)' }] },
                  ] },
                ] },
              ] },
            ],
          },
        },
        {
          type: 'table',
          head: ['Kiểu trả về', 'Ưu điểm', 'Nhược điểm'],
          rows: [
            ['Category', 'Ngắn, Swagger biết kiểu', 'Chỉ trả được 200'],
            ['IActionResult', 'Trả mọi mã', 'Swagger không biết kiểu dữ liệu trả về'],
            ['ActionResult<Category>', 'Vừa trả mọi mã, vừa có kiểu', 'Không dùng được với interface'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Validation tự động trả 400',
          text: 'Đặt [Required], [EmailAddress], [Range(0, 1000000000)] trên ViewModel. Nhờ [ApiController], dữ liệu sai bị chặn trước khi vào action và client nhận 400 kèm JSON errors liệt kê từng trường sai — không cần viết if (!ModelState.IsValid).',
        },
      ],
    },
    {
      id: 'async',
      title: '4. Bất đồng bộ với async / await',
      blocks: [
        {
          type: 'text',
          text: 'Bất đồng bộ (asynchronous) là khi một tác vụ có thể bắt đầu, tiếp tục và hoàn thành mà không cần chờ tác vụ khác kết thúc. Trong API, phần lớn thời gian là chờ database hay dịch vụ khác trả lời; await giải phóng thread trong lúc chờ để phục vụ request khác.',
        },
        {
          type: 'code',
          sample: {
            title: 'Controllers/DataController.cs — chạy hai tác vụ song song',
            code: `[ApiController]
[Route("[controller]")]
public class DataController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        Task<string> task1 = FetchDataAsync("Task 1", 2000);
        Task<string> task2 = FetchDataAsync("Task 2", 3000);

        string[] results = await Task.WhenAll(task1, task2);

        return Ok(new { Result1 = results[0], Result2 = results[1] });
    }

    private async Task<string> FetchDataAsync(string taskName, int delay)
    {
        await Task.Delay(delay); // Giả lập thời gian chờ tải dữ liệu
        return $"{taskName} dữ liệu";
    }
}`,
            note: 'task1 và task2 được khởi động ngay khi gọi hàm, chưa await. Task.WhenAll chờ cả hai — tổng thời gian khoảng 3 giây (tác vụ dài nhất), không phải 5 giây.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Task.WhenAll: hai tác vụ chạy chồng thời gian',
            actors: ['Get()', 'Task 1 (2s)', 'Task 2 (3s)'],
            steps: [
              { from: 0, to: 1, text: 'FetchDataAsync("Task 1", 2000)' },
              { from: 0, to: 2, text: 'FetchDataAsync("Task 2", 3000)' },
              { from: 0, to: 0, text: 'await Task.WhenAll — thread được trả về' },
              { from: 1, to: 0, text: 'giây thứ 2: "Task 1 dữ liệu"', dashed: true },
              { from: 2, to: 0, text: 'giây thứ 3: "Task 2 dữ liệu"', dashed: true },
              { from: 0, to: 0, text: 'return Ok(...) — tổng ~3s' },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Tuần tự hay song song',
            columns: [
              { title: 'await từng cái', tone: 'bad', items: ['var a = await FetchDataAsync("Task 1", 2000);', 'var b = await FetchDataAsync("Task 2", 3000);', 'Tổng 5 giây'] },
              { title: 'Task.WhenAll', tone: 'good', items: ['Khởi động cả hai task trước', 'await Task.WhenAll(task1, task2)', 'Tổng 3 giây'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Không dùng .Result hay .Wait()',
          text: 'task1.Result chặn thread đến khi xong — mất hết lợi ích async và có thể gây treo (deadlock). Đã async thì async đến tận action: async Task<IActionResult>, và đặt hậu tố Async cho tên hàm.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Không chạy song song trên cùng DbContext',
          text: 'Task.WhenAll hợp với gọi nhiều API ngoài hoặc nhiều nguồn độc lập. Hai truy vấn EF Core trên cùng một DbContext chạy song song sẽ ném InvalidOperationException — DbContext không an toàn đa luồng.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b33-1', level: 'Cơ bản', title: 'Danh mục có tìm kiếm',
      requirement: 'Cho model Category (Id, Name) và danh sách static 5 danh mục điện máy. Xây dựng API getAll nhận query param keyword không bắt buộc, tìm không phân biệt hoa thường.',
      signature: '[HttpGet] IActionResult GetAll([FromQuery] string? keyword)',
      examples: [
        { input: 'GET /api/Category?keyword=TIVI', output: '[{"id":1,"name":"Tivi"},{"id":4,"name":"Tivi OLED"}]' },
        { input: 'GET /api/Category', output: 'Cả 5 danh mục', explain: 'keyword là string? nên không bắt buộc; thiếu thì không lọc.' },
      ],
    },
    {
      id: 'b33-2', level: 'Cơ bản', title: 'Chi tiết danh mục với NotFound',
      requirement: 'Cho API danh mục bài 1. Thêm API lấy chi tiết theo id trên route, trả 404 kèm thông báo khi không có.',
      signature: '[HttpGet("{id:int}")] IActionResult GetById([FromRoute] int id)',
      examples: [
        { input: 'GET /api/Category/2', output: '200 {"id":2,"name":"Tủ lạnh"}' },
        { input: 'GET /api/Category/99', output: '404 {"message":"Không có danh mục 99"}' },
      ],
    },
    {
      id: 'b33-3', level: 'Trung bình', title: 'CRUD sản phẩm đúng status code',
      requirement: 'Cho model SanPham (Ma, Ten, Gia, SoLuongTon) và danh sách static. Xây dựng SanPhamController RESTful, mỗi API trả đúng mã trạng thái.',
      tasks: [
        'GET /api/sanpham: 200 danh sách',
        'GET /api/sanpham/{ma}: 200 hoặc 404',
        'POST /api/sanpham: 201 CreatedAtAction, 409 nếu trùng mã',
        'PUT /api/sanpham/{ma}: 200, 400 nếu mã route khác mã body, 404 nếu không có',
        'DELETE /api/sanpham/{ma}: 204 hoặc 404',
      ],
      examples: [
        { input: 'POST /api/sanpham body {"ma":"TV01",…} (TV01 đã có)', output: '409 Conflict' },
        { input: 'POST /api/sanpham body {"ma":"MG05","ten":"Máy giặt Toshiba","gia":7490000,"soLuongTon":3}', output: '201, header Location: /api/sanpham/MG05', explain: 'CreatedAtAction sinh header Location trỏ tới action GetById.' },
      ],
      visual: {
        kind: 'flow',
        steps: [
          { kind: 'start', text: 'POST /api/sanpham' },
          { kind: 'decision', text: 'Dữ liệu hợp lệ?', branches: [
            { label: 'Không', steps: [{ kind: 'end', text: '400' }] },
            { label: 'Có', steps: [
              { kind: 'decision', text: 'Trùng mã?', branches: [
                { label: 'Có', steps: [{ kind: 'end', text: '409' }] },
                { label: 'Không', steps: [{ kind: 'end', text: '201 + Location' }] },
              ] },
            ] },
          ] },
        ],
      },
    },
    {
      id: 'b33-4', level: 'Trung bình', title: 'Đăng ký với ViewModel',
      requirement: 'Cho Model User (Id, Username, FullName, PasswordHash, Email, Role, CreatedAt, Deleted). Xây dựng API đăng ký nhận UserViewModel, server tự sinh Id, Role = "Customer", CreatedAt; response không chứa PasswordHash.',
      signature: '[HttpPost("dang-ky")] IActionResult DangKy([FromBody] UserViewModel vm)',
      constraints: ['Username không trùng (409)', 'Password tối thiểu 6 ký tự, Email đúng định dạng — dùng attribute validation'],
      examples: [
        { input: 'body {"username":"an","fullName":"Nguyễn An","password":"123456","email":"an@gmail.com","role":"Admin"}', output: '201, user có role "Customer"', explain: 'UserViewModel không có Role nên trường "role" trong payload bị bỏ qua.' },
        { input: 'body {"username":"binh","password":"12","email":"abc"}', output: '400 errors: Password, Email, FullName' },
      ],
    },
    {
      id: 'b33-5', level: 'Trung bình', title: 'Cập nhật tồn kho bằng PATCH và header',
      requirement: 'Cho API sản phẩm bài 3. Thêm API PATCH chỉ đổi số lượng tồn, nhận mã từ route, số lượng mới từ query, mã nhân viên từ header X-Ma-Nhan-Vien.',
      signature: '[HttpPatch("{ma}/ton-kho")] IActionResult CapNhatTon([FromRoute] string ma, [FromQuery] int soLuong, [FromHeader(Name = "X-Ma-Nhan-Vien")] string maNv)',
      constraints: ['soLuong < 0 → 400', 'Thiếu header → 400', 'Trả 200 kèm { ma, soLuongTon, nguoiCapNhat }'],
      examples: [
        { input: 'PATCH /api/sanpham/TV01/ton-kho?soLuong=8 · X-Ma-Nhan-Vien: NV02', output: '200 {"ma":"TV01","soLuongTon":8,"nguoiCapNhat":"NV02"}' },
        { input: 'Như trên nhưng không có header', output: '400', explain: 'Tham số [FromHeader] kiểu string không nullable là bắt buộc.' },
      ],
    },
    {
      id: 'b33-6', level: 'Nâng cao', title: 'Đơn hàng: chọn status code cho nghiệp vụ',
      requirement: 'Cho DonHang (Id, MaKhach, TrangThai, DsChiTiet) và ChiTietDonHang (MaSanPham, SoLuong, DonGia). Xây dựng API đặt hàng và huỷ đơn với đầy đủ các nhánh lỗi.',
      tasks: [
        'POST /api/donhang nhận DatHangViewModel { MaKhach, DsDong: [{ MaSanPham, SoLuong }] }',
        'Sản phẩm không tồn tại → 404; tồn kho không đủ → 409 kèm tên sản phẩm thiếu',
        'Thành công: trừ tồn kho, tự lấy DonGia từ sản phẩm, trả 201',
        'DELETE /api/donhang/{id}: đơn đã giao → 409; chưa giao → 204 và hoàn tồn kho',
      ],
      examples: [
        { input: 'Đặt 5 TV01 khi tồn 3', output: '409 {"message":"Tivi Samsung 55 inch chỉ còn 3"}' },
        { input: 'Payload có "donGia": 1', output: 'Đơn giá vẫn lấy từ sản phẩm', explain: 'DonGia không có trong ViewModel — client không được tự định giá.' },
      ],
      hint: 'Kiểm tra toàn bộ dòng trước, chỉ trừ tồn kho khi mọi dòng hợp lệ, tránh trừ dở dang.',
      visual: {
        kind: 'uml',
        children: [
          { name: 'DatHangViewModel', attrs: ['+ MaKhach: string', '+ DsDong: List<DongDatHang>'] },
          { name: 'DonHang', attrs: ['+ Id: int', '+ MaKhach: string', '+ TrangThai: string', '+ DsChiTiet: List<ChiTietDonHang>'] },
          { name: 'ChiTietDonHang', attrs: ['+ MaSanPham: string', '+ SoLuong: int', '+ DonGia: decimal'] },
        ],
      },
      dense: true,
    },
    {
      id: 'b33-7', level: 'Nâng cao', title: 'Bảng điều khiển gộp dữ liệu song song',
      requirement: 'Cho ba hàm giả lập: DemSanPhamAsync (chờ 1s), TongDoanhThuAsync (chờ 2s), DemDonMoiAsync (chờ 1.5s). Xây dựng GET /api/tong-quan trả cả ba số liệu, đo thời gian xử lý bằng Stopwatch và trả kèm trong response.',
      tasks: [
        'Cài bản tuần tự (await từng hàm) và ghi thời gian',
        'Cài bản song song bằng Task.WhenAll và ghi thời gian',
        'Trả JSON { soSanPham, doanhThu, donMoi, thoiGianMs }',
      ],
      examples: [
        { input: 'Bản tuần tự', output: 'thoiGianMs ≈ 4500' },
        { input: 'Bản Task.WhenAll', output: 'thoiGianMs ≈ 2000', explain: 'Thời gian bằng tác vụ dài nhất, không phải tổng.' },
      ],
      hint: 'Ba hàm trả kiểu khác nhau (int, decimal, int): gán từng Task vào biến riêng, await Task.WhenAll(t1, t2, t3) rồi đọc t1.Result — lúc này Result an toàn vì task đã xong.',
      visual: {
        kind: 'seq',
        actors: ['Action', 'Sản phẩm 1s', 'Doanh thu 2s', 'Đơn mới 1.5s'],
        steps: [
          { from: 0, to: 1, text: 'bắt đầu' },
          { from: 0, to: 2, text: 'bắt đầu' },
          { from: 0, to: 3, text: 'bắt đầu' },
          { from: 1, to: 0, text: '1s', dashed: true },
          { from: 3, to: 0, text: '1.5s', dashed: true },
          { from: 2, to: 0, text: '2s — WhenAll xong', dashed: true },
        ],
      },
    },
    {
      id: 'b33-8', level: 'Nâng cao', title: 'Lọc, sắp xếp, phân trang khách hàng',
      requirement: 'Cho danh sách static 50 KhachHang (Ma, Ten, ThanhPho, TongChiTieu). Xây dựng GET /api/khachhang nhận các query param tuỳ chọn và trả kết quả kèm thông tin phân trang.',
      tasks: [
        'keyword: tìm trong Ten',
        'thanhPho: lọc chính xác',
        'sapXep: "ten" hoặc "chi-tieu-giam"',
        'trang (mặc định 1), kichThuoc (mặc định 10, tối đa 50)',
        'Trả { tongSo, trang, kichThuoc, duLieu }',
      ],
      constraints: ['trang < 1 hoặc kichThuoc > 50 → 400', 'Gom các tham số vào class KhachHangQuery nhận bằng [FromQuery]'],
      examples: [
        { input: 'GET /api/khachhang?thanhPho=HCM&sapXep=chi-tieu-giam&trang=2&kichThuoc=5', output: '{"tongSo":18,"trang":2,"kichThuoc":5,"duLieu":[…5 khách…]}' },
        { input: 'GET /api/khachhang?trang=0', output: '400', explain: 'Đặt [Range(1, int.MaxValue)] trên thuộc tính Trang của KhachHangQuery để validation tự chặn.' },
      ],
      hint: 'Thứ tự: lọc → đếm tongSo → sắp xếp → Skip((trang - 1) * kichThuoc).Take(kichThuoc).',
    },
  ],
}

export default buoi33
