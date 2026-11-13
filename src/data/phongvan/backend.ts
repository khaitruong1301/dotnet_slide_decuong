import type { InterviewSet } from '../types'

const backend: InterviewSet = {
  slug: 'sql-efcore-webapi',
  title: 'Phỏng vấn: SQL Server, EF Core & Web API',
  subtitle: 'Thiết kế CSDL, SQL, transaction, EF Core, REST API, middleware, JWT, caching, repository, microservice',
  from: 32,
  to: 42,
  questions: [
    // ───────────────────────────── CƠ BẢN ─────────────────────────────
    {
      id: 'pv-be-01',
      level: 'Cơ bản',
      question: 'RESTful API là gì? Thiết kế các endpoint CRUD cho sản phẩm thế nào?',
      short:
        'REST là bộ nguyên tắc thiết kế API: tài nguyên định danh bằng URL (danh từ), thao tác bằng HTTP method, server không lưu trạng thái phiên (stateless), kết quả trả JSON kèm status code đúng nghĩa. API tuân thủ đầy đủ các nguyên tắc đó gọi là RESTful.',
      answer: [
        {
          type: 'table',
          head: ['Thao tác', 'Method + URL', 'Thành công', 'Lỗi hay gặp'],
          rows: [
            ['Lấy danh sách', 'GET /api/san-pham?trang=1', '200 OK + mảng', '—'],
            ['Lấy một', 'GET /api/san-pham/5', '200 OK + object', '404 Not Found'],
            ['Tạo mới', 'POST /api/san-pham', '201 Created + header Location', '400, 409 trùng mã'],
            ['Cập nhật toàn bộ', 'PUT /api/san-pham/5', '204 No Content hoặc 200', '400, 404'],
            ['Cập nhật một phần', 'PATCH /api/san-pham/5', '204 hoặc 200', '400, 404'],
            ['Xoá', 'DELETE /api/san-pham/5', '204 No Content', '404'],
            ['Tài nguyên con', 'GET /api/khach-hang/7/don-hang', '200 OK', '404 khách không tồn tại'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Động từ trên URL so với RESTful',
            columns: [
              {
                title: 'Kiểu RPC (động từ trên URL)',
                tone: 'bad',
                items: [
                  'GET /api/sanpham/getall',
                  'POST /api/sanpham/create',
                  'POST /api/sanpham/delete/5',
                  'Lỗi cũng trả 200 kèm { "success": false }',
                ],
              },
              {
                title: 'RESTful',
                tone: 'good',
                items: [
                  'GET /api/san-pham',
                  'POST /api/san-pham',
                  'DELETE /api/san-pham/5',
                  'Status code nói lên kết quả: 201, 404, 409…',
                ],
              },
            ],
          },
        },
        {
          type: 'text',
          text: 'Stateless nghĩa là mỗi request tự mang đủ thông tin (token trong header Authorization, tham số trong URL/body); server không nhớ "phiên" của client. Nhờ vậy chạy 3 instance API sau load balancer thì request nào vào server nào cũng xử lý được.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Trả lời ăn điểm',
          text: 'Đừng chỉ nói "URL đẹp". Nêu đủ bốn ý: tài nguyên là danh từ số nhiều, method thể hiện hành động, status code đúng nghĩa, stateless để dễ scale. Thêm một câu: Web API trả dữ liệu JSON chứ không trả giao diện, nên Blazor, app mobile, đối tác đều gọi chung được.',
        },
      ],
      followUps: [
        'Web API khác ASP.NET MVC (trả View) ở điểm nào?',
        'Stateless liên quan gì tới JWT?',
        'Versioning API (v1, v2) làm thế nào để không phá client cũ?',
      ],
      buoi: [32, 33],
    },
    {
      id: 'pv-be-02',
      level: 'Cơ bản',
      question: '[FromRoute], [FromQuery], [FromBody] khác nhau thế nào? Khi nào dùng cái nào?',
      short:
        'Ba attribute chỉ cho model binding biết lấy tham số ở đâu trong request: [FromRoute] từ đoạn URL như {id} — định danh tài nguyên; [FromQuery] từ ?key=value — lọc, tìm, phân trang; [FromBody] từ JSON trong body — object tạo/sửa. Mỗi action có tối đa một [FromBody].',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'map',
            caption: 'PUT /api/san-pham/5?thongBao=true kèm header và body JSON',
            name: 'Nguồn → tham số',
            pairs: [
              { key: '[FromRoute] /san-pham/{id}', value: 'id = 5' },
              { key: '[FromQuery] ?thongBao=true', value: 'thongBao = true' },
              { key: '[FromHeader] X-Ma-Cua-Hang: CH01', value: 'maCuaHang = "CH01"' },
              { key: '[FromBody] { "ten": …, "gia": … }', value: 'dto = SanPhamCapNhatDto' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Controllers/SanPhamController.cs',
            code: `[ApiController]
[Route("api/san-pham")]
public class SanPhamController(CuaHangContext db) : ControllerBase
{
    // GET /api/san-pham?tuKhoa=tivi&trang=2&kichThuoc=10
    [HttpGet]
    public async Task<ActionResult<List<SanPhamDto>>> GetAll(
        [FromQuery] string? tuKhoa, [FromQuery] int trang = 1, [FromQuery] int kichThuoc = 10)
    {
        var q = db.SanPhams.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(tuKhoa))
            q = q.Where(s => s.Ten.Contains(tuKhoa));

        var ds = await q.OrderBy(s => s.Id)
            .Skip((trang - 1) * kichThuoc).Take(kichThuoc)   // → OFFSET ... FETCH NEXT ...
            .Select(s => new SanPhamDto(s.Id, s.Ten, s.Gia))
            .ToListAsync();
        return Ok(ds);
    }

    // PUT /api/san-pham/5   body: { "ten": "Tivi Sony 55", "gia": 15000000 }
    [HttpPut("{id:int}")]
    public async Task<IActionResult> CapNhat([FromRoute] int id, [FromBody] SanPhamCapNhatDto dto)
    {
        var sp = await db.SanPhams.FindAsync(id);
        if (sp is null) return NotFound();
        sp.Ten = dto.Ten;
        sp.Gia = dto.Gia;
        await db.SaveChangesAsync();
        return NoContent();
    }
}`,
            note: 'Có [ApiController] thì không ghi attribute vẫn chạy: kiểu phức tạp (class) tự hiểu là body, tham số trùng tên {id} là route, kiểu đơn giản còn lại là query. Chỉ [FromHeader] luôn phải ghi rõ.',
          },
        },
        {
          type: 'table',
          head: ['Attribute', 'Lấy từ', 'Dùng cho'],
          rows: [
            ['[FromRoute]', 'Đoạn URL {id}', 'Định danh tài nguyên: /san-pham/5'],
            ['[FromQuery]', '?key=value', 'Lọc, tìm kiếm, sắp xếp, phân trang'],
            ['[FromBody]', 'Body JSON', 'Object tạo mới / cập nhật'],
            ['[FromHeader]', 'Header HTTP', 'Mã cửa hàng, ngôn ngữ, idempotency key'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Hai bẫy hay gặp',
          text: 'Body là luồng chỉ đọc được một lần nên không thể có hai [FromBody] — gói sản phẩm và danh sách ảnh vào chung một DTO. Tham số query khai báo string (không có ?) khi bật nullable thì bị coi là bắt buộc, gọi thiếu sẽ nhận 400.',
        },
      ],
      followUps: [
        'Gửi POST có body nhưng thiếu header Content-Type: application/json thì nhận mã gì?',
        'Vì sao không đưa mật khẩu hay token lên query string?',
        'Skip/Take của LINQ dịch sang SQL Server thành câu gì?',
      ],
      buoi: [33, 39],
    },
    {
      id: 'pv-be-03',
      level: 'Cơ bản',
      question: 'Authentication khác Authorization thế nào? Khi nào trả 401, khi nào trả 403?',
      short:
        'Authentication (xác thực) trả lời "Bạn là ai?" — kiểm tra token hoặc mật khẩu, thất bại trả 401 Unauthorized. Authorization (phân quyền) trả lời "Bạn được làm gì?" — đã biết là ai nhưng thiếu role/quyền thì trả 403 Forbidden. Xác thực luôn diễn ra trước phân quyền.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Hai câu hỏi khác nhau',
            columns: [
              { title: 'Authentication', tone: 'plain', items: ['"Bạn là ai?"', 'Kiểm tra JWT / mật khẩu', 'Sai hoặc thiếu → 401 Unauthorized', 'app.UseAuthentication()'] },
              { title: 'Authorization', tone: 'plain', items: ['"Bạn được làm gì?"', 'Kiểm tra role, policy, chủ sở hữu', 'Không đủ quyền → 403 Forbidden', 'app.UseAuthorization() + [Authorize(Roles = "Admin")]'] },
            ],
          },
        },
        {
          type: 'table',
          head: ['Tình huống', 'Mã', 'Vì sao'],
          rows: [
            ['Không gửi header Authorization', '401', 'Chưa xác thực'],
            ['Token sai chữ ký hoặc đã hết hạn', '401', 'Xác thực thất bại → client nên refresh token'],
            ['Token đúng, user là KhachHang gọi API [Authorize(Roles = "Admin")]', '403', 'Biết là ai nhưng thiếu quyền'],
            ['Khách A xem đơn hàng của khách B', '403 hoặc 404', 'Trả 404 để không lộ đơn đó có tồn tại'],
            ['Action có [AllowAnonymous]', '200', 'Bỏ qua kiểm tra'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'Đặt [Authorize] ở controller và action',
            code: `[Authorize]                                   // thiếu / sai token → 401
[ApiController, Route("api/don-hang")]
public class DonHangController(CuaHangContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> CuaToi()
    {
        int khachHangId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(await db.DonHangs.Where(d => d.KhachHangId == khachHangId).ToListAsync());
    }

    [Authorize(Roles = "Admin")]              // đăng nhập rồi nhưng không phải Admin → 403
    [HttpDelete("{id:int}")]
    public IActionResult Xoa(int id) => NoContent();

    [AllowAnonymous]
    [HttpGet("trang-thai")]
    public IActionResult TrangThai() => Ok("API đang chạy");
}`,
            note: 'Trong action tự kiểm tra: Unauthorized() trả 401, Forbid() trả 403. Lấy id người dùng từ claims của token, không nhận khachHangId từ client.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Tên gọi dễ nhầm',
          text: '401 tên là "Unauthorized" nhưng nghĩa thật là "chưa xác thực". Đừng trả 403 cho token hết hạn: client nhìn 403 sẽ hiểu là thiếu quyền và không tự gọi refresh token.',
        },
      ],
      followUps: [
        'Roles = "Admin,Manager" nghĩa là cần cả hai role hay một trong hai?',
        'Policy-based authorization khác role-based thế nào?',
        'Vì sao lấy userId từ claims thay vì nhận từ body?',
      ],
      buoi: [33, 40],
    },
    {
      id: 'pv-be-04',
      level: 'Cơ bản',
      question: 'Khoá chính, khoá ngoại là gì? Cài đặt quan hệ 1-1, 1-N, N-N thế nào?',
      short:
        'Khoá chính (PRIMARY KEY) định danh duy nhất mỗi dòng: không trùng, không NULL. Khoá ngoại (FOREIGN KEY) là cột trỏ tới khoá chính bảng khác, đảm bảo không có đơn hàng "mồ côi". 1-N đặt FK ở bảng phía "nhiều"; 1-1 là FK có thêm UNIQUE; N-N phải tách một bảng trung gian chứa hai FK.',
      answer: [
        {
          type: 'table',
          head: ['Quan hệ', 'Ví dụ cửa hàng', 'Cài đặt'],
          rows: [
            ['1-1', 'Nhân viên – CCCD', 'CCCD.NhanVienId là FK + UNIQUE'],
            ['1-N', 'Khách hàng – Đơn hàng', 'DonHang.KhachHangId là FK, đặt ở bảng "nhiều"'],
            ['N-N', 'Đơn hàng – Sản phẩm', 'Bảng trung gian ChiTietDonHang, khoá chính kép (DonHangId, SanPhamId)'],
            ['Tự liên kết', 'Danh mục cha – con', 'DanhMuc.DanhMucChaId trỏ về chính bảng DanhMuc'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Khoá ngoại nối các bảng cửa hàng điện máy',
            root: {
              label: 'KhachHang',
              note: 'PK Id',
              children: [
                {
                  label: 'DonHang',
                  note: 'FK KhachHangId — 1 khách, N đơn',
                  children: [
                    {
                      label: 'ChiTietDonHang',
                      note: 'PK (DonHangId, SanPhamId) — bảng trung gian',
                      highlight: true,
                      children: [{ label: 'SanPham', note: 'FK SanPhamId — N-N giữa DonHang và SanPham' }],
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Bảng cha trước, bảng con sau',
            code: `CREATE TABLE KhachHang (
    Id    INT IDENTITY(1,1) PRIMARY KEY,
    HoTen NVARCHAR(100) NOT NULL,
    Email VARCHAR(100)  NOT NULL UNIQUE
);
CREATE TABLE SanPham (
    Id     INT IDENTITY(1,1) PRIMARY KEY,
    Ten    NVARCHAR(200) NOT NULL,
    Gia    DECIMAL(18,2) NOT NULL CHECK (Gia >= 0),
    TonKho INT NOT NULL DEFAULT 0
);
CREATE TABLE DonHang (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    KhachHangId INT NOT NULL REFERENCES KhachHang(Id),        -- 1-N
    NgayDat     DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    TongTien    DECIMAL(18,2) NOT NULL DEFAULT 0
);
CREATE TABLE ChiTietDonHang (                                  -- N-N
    DonHangId INT NOT NULL REFERENCES DonHang(Id),
    SanPhamId INT NOT NULL REFERENCES SanPham(Id),
    SoLuong   INT NOT NULL CHECK (SoLuong > 0),
    GiaBan    DECIMAL(18,2) NOT NULL,                          -- giá lúc mua
    PRIMARY KEY (DonHangId, SanPhamId)
);`,
            note: 'GiaBan được lưu lại trong chi tiết đơn vì giá sản phẩm sẽ thay đổi; đơn cũ phải giữ đúng số tiền khách đã trả.',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Nhắc tới chuẩn hoá',
          text: 'Không lưu "1,5,7" (danh sách mã sản phẩm) trong một cột của DonHang — vi phạm 1NF vì mỗi ô phải là một giá trị nguyên tố, và không đặt FK, không JOIN, không đếm được. Chuẩn hoá tới 3NF giúp mỗi dữ kiện nằm một chỗ: tên khách ở KhachHang, đơn chỉ giữ KhachHangId.',
        },
      ],
      followUps: [
        'ON DELETE CASCADE là gì, khi nào nguy hiểm?',
        '1NF, 2NF, 3NF khác nhau ra sao? Khi nào chấp nhận phi chuẩn hoá?',
        'DDL, DML, DQL, TCL, DCL là những nhóm lệnh nào?',
      ],
      buoi: [34, 35],
    },
    {
      id: 'pv-be-05',
      level: 'Cơ bản',
      question: 'INNER JOIN khác LEFT JOIN thế nào?',
      short:
        'INNER JOIN chỉ giữ các dòng khớp điều kiện ON ở cả hai bảng. LEFT JOIN giữ mọi dòng của bảng bên trái, dòng không khớp thì các cột bảng bên phải là NULL. Câu hỏi kiểu "mọi khách, kể cả chưa mua" bắt buộc phải LEFT JOIN.',
      answer: [
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Ba câu hỏi nghiệp vụ, ba cách JOIN',
            code: `-- INNER: chỉ khách ĐÃ có đơn
SELECT k.HoTen, d.Id AS MaDon, d.NgayDat
FROM KhachHang k
INNER JOIN DonHang d ON d.KhachHangId = k.Id;

-- LEFT: mọi khách kèm số đơn, kể cả 0 đơn
SELECT k.HoTen, COUNT(d.Id) AS SoDon
FROM KhachHang k
LEFT JOIN DonHang d ON d.KhachHangId = k.Id
GROUP BY k.Id, k.HoTen;

-- LEFT + IS NULL: khách CHƯA từng đặt đơn
SELECT k.HoTen
FROM KhachHang k
LEFT JOIN DonHang d ON d.KhachHangId = k.Id
WHERE d.Id IS NULL;`,
            note: 'Đếm COUNT(d.Id) chứ không COUNT(*): khách 0 đơn vẫn có một dòng với d.Id là NULL, COUNT(*) sẽ đếm thành 1.',
          },
        },
        {
          type: 'table',
          head: ['Khách', 'Số đơn thật', 'INNER JOIN trả', 'LEFT JOIN trả'],
          rows: [
            ['An', '2', '2 dòng', '2 dòng'],
            ['Bình', '0', 'không có dòng nào', '1 dòng, các cột của DonHang = NULL'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Các loại JOIN thường gặp',
            columns: [
              { title: 'INNER JOIN', tone: 'plain', items: ['Chỉ phần giao', 'Đơn hàng kèm tên khách', 'Dùng nhiều nhất'] },
              { title: 'LEFT JOIN', tone: 'plain', items: ['Toàn bộ bảng trái + phần khớp', 'Mọi khách kèm số đơn', 'RIGHT JOIN: đảo bảng rồi dùng LEFT cho dễ đọc'] },
              { title: 'FULL / CROSS', tone: 'plain', items: ['FULL: giữ cả hai phía, dùng đối soát', 'CROSS: mọi tổ hợp', 'Mọi sản phẩm × mọi chi nhánh'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Lọc bảng phải trong WHERE biến LEFT thành INNER',
          text: `LEFT JOIN DonHang d ON ... WHERE d.NgayDat >= '2026-01-01' làm mất khách không có đơn, vì NULL so sánh với bất cứ gì đều không đúng. Muốn giữ họ, đưa điều kiện vào ON: LEFT JOIN DonHang d ON d.KhachHangId = k.Id AND d.NgayDat >= '2026-01-01'.`,
        },
      ],
      followUps: [
        'Subquery và JOIN, khi nào dùng cái nào?',
        'NOT IN và NOT EXISTS khác nhau thế nào khi subquery có NULL?',
        'UNION khác UNION ALL thế nào?',
      ],
      buoi: [36],
    },
    {
      id: 'pv-be-06',
      level: 'Cơ bản',
      question: 'Docker image khác container thế nào? -p 1234:1433 nghĩa là gì?',
      short:
        'Image là bản đóng gói chỉ đọc gồm hệ điều hành tối giản, runtime và ứng dụng; container là một phiên bản đang chạy được tạo từ image — giống class và object. -p 1234:1433 nối cổng 1234 trên máy thật vào cổng 1433 bên trong container, nên kết nối SQL Server bằng localhost,1234.',
      answer: [
        {
          type: 'table',
          head: ['Khái niệm', 'Là gì', 'Ví von'],
          rows: [
            ['Image', 'Bản đóng gói chỉ đọc, dựng từ nhiều lớp (layer)', 'class'],
            ['Container', 'Tiến trình đang chạy tạo từ image, có hệ thống file và mạng riêng', 'object — new bao nhiêu cũng được'],
            ['Dockerfile', 'Các bước dựng image', 'công thức nấu ăn'],
            ['Registry (Docker Hub, mcr)', 'Kho chứa image để pull / push', 'NuGet của image'],
            ['Volume', 'Vùng lưu dữ liệu sống ngoài vòng đời container', 'ổ cứng gắn ngoài'],
          ],
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Một image SQL Server, vòng đời container',
            code: `docker run -d --name sqlserver \\
  -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Cyber@12345" \\
  -p 1234:1433 -v sqldata:/var/opt/mssql \\
  mcr.microsoft.com/mssql/server:2022-latest

docker ps            # container đang chạy
docker stop sqlserver
docker rm sqlserver  # xoá container — image vẫn còn, dữ liệu vẫn còn trong volume sqldata
docker images        # run lại là có container mới từ cùng image`,
            note: 'Chuỗi kết nối .NET: Server=localhost,1234;Database=DienMayDB;User Id=sa;Password=...;TrustServerCertificate=True — SQL Server ghi cổng sau dấu phẩy, không phải dấu hai chấm.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'map',
            caption: 'Port mapping: cổng máy thật → cổng trong container',
            name: 'docker run -p ngoài:trong',
            pairs: [
              { key: '8080:80', value: 'nginx — mở http://localhost:8080' },
              { key: '1234:1433', value: 'SQL Server — Server=localhost,1234' },
              { key: '1235:1433', value: 'SQL Server thứ hai — cùng cổng trong, khác cổng ngoài' },
              { key: '6379:6379', value: 'Redis cache' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Hai bẫy của người mới',
          text: 'Cổng bên trái (máy thật) không được trùng giữa hai container, nếu không sẽ báo "port is already allocated". Không gắn volume thì docker rm là mất sạch database bên trong container.',
        },
      ],
      followUps: [
        'Container khác máy ảo thế nào?',
        'Dockerfile build hai giai đoạn (multi-stage) cho .NET để làm gì?',
        'Trong docker compose, API gọi SQL Server bằng localhost được không?',
      ],
      buoi: [34],
    },

    // ───────────────────────────── TRUNG BÌNH ─────────────────────────────
    {
      id: 'pv-be-07',
      level: 'Trung bình',
      question: 'PUT khác PATCH thế nào? Method nào idempotent?',
      short:
        'PUT thay thế toàn bộ tài nguyên bằng dữ liệu gửi lên; PATCH chỉ sửa một phần (ví dụ chỉ tồn kho). Idempotent nghĩa là gửi cùng một request nhiều lần, trạng thái server vẫn như gửi một lần: GET, PUT, DELETE là idempotent; POST thì không; PATCH không được đảm bảo, tuỳ cách viết.',
      answer: [
        {
          type: 'table',
          head: ['Method', 'Safe (không đổi dữ liệu)', 'Idempotent', 'Gửi lại lần 2 thì sao'],
          rows: [
            ['GET', 'Có', 'Có', 'Đọc lại, dữ liệu không đổi'],
            ['POST', 'Không', 'Không', 'Tạo thêm một đơn hàng trùng'],
            ['PUT', 'Không', 'Có', 'Gán Gia = 15 triệu lần nữa, kết quả vẫn 15 triệu'],
            ['PATCH', 'Không', 'Không đảm bảo', '"Đặt TonKho = 20" thì có; "Tăng TonKho thêm 5" thì không'],
            ['DELETE', 'Không', 'Có', 'Lần 2 trả 404 nhưng trạng thái server như nhau'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'PUT gửi đủ, PATCH gửi một phần',
            code: `// PUT: client gửi ĐỦ mọi trường — thiếu trường nào, trường đó bị ghi đè giá trị mặc định
[HttpPut("{id:int}")]
public async Task<IActionResult> CapNhat(int id, SanPhamCapNhatDto dto)
{
    var sp = await db.SanPhams.FindAsync(id);
    if (sp is null) return NotFound();
    sp.Ten = dto.Ten;
    sp.Gia = dto.Gia;
    sp.TonKho = dto.TonKho;
    await db.SaveChangesAsync();
    return NoContent();                                   // 204
}

// PATCH: chỉ đổi đúng một trường, viết kiểu "đặt giá trị" để vẫn idempotent
[HttpPatch("{id:int}/ton-kho")]
public async Task<IActionResult> DatTonKho(int id, [FromBody] int tonKhoMoi)
{
    int soDong = await db.SanPhams.Where(s => s.Id == id)
        .ExecuteUpdateAsync(s => s.SetProperty(x => x.TonKho, tonKhoMoi));
    return soDong == 0 ? NotFound() : NoContent();
}`,
            note: 'ExecuteUpdateAsync (EF Core 7+) chạy thẳng một câu UPDATE, không cần nạp entity trước.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Mạng chập chờn, client tự gửi lại request',
            actors: ['Client', 'API', 'SQL Server'],
            steps: [
              { from: 0, to: 1, text: 'POST /api/don-hang (timeout, không nhận được phản hồi)' },
              { from: 1, to: 2, text: 'INSERT DonHang #101' },
              { from: 0, to: 1, text: 'POST /api/don-hang (gửi lại)' },
              { from: 1, to: 2, text: 'INSERT DonHang #102 — đơn trùng!' },
              { from: 0, to: 1, text: 'PUT /api/san-pham/5 { gia: 15tr } (gửi lại)' },
              { from: 1, to: 2, text: 'UPDATE Gia = 15tr — kết quả không đổi' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Trả lời ăn điểm',
          text: 'Idempotent nói về trạng thái server, không nói về response: DELETE lần hai trả 404 vẫn là idempotent. Nêu thêm cách chống trùng cho POST: client gửi header Idempotency-Key (một GUID), server lưu khoá và bỏ qua request trùng khoá.',
        },
      ],
      followUps: [
        'Làm sao để POST tạo đơn hàng không bị tạo trùng khi client gửi lại?',
        'Vì sao POST tạo mới nên trả 201 kèm header Location?',
        'Safe khác idempotent thế nào?',
      ],
      buoi: [33],
    },
    {
      id: 'pv-be-08',
      level: 'Trung bình',
      question: 'WHERE khác HAVING thế nào? SQL Server thực thi một câu SELECT theo thứ tự nào?',
      short:
        'WHERE lọc từng dòng trước khi gom nhóm, không dùng được hàm tổng hợp. HAVING lọc từng nhóm sau GROUP BY, dùng được SUM, COUNT. Thứ tự xử lý logic là FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → OFFSET/TOP, khác thứ tự ta viết.',
      answer: [
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Top 10 khách chi nhiều nhất năm 2026',
            code: `SELECT d.KhachHangId,
       COUNT(*)        AS SoDon,
       SUM(d.TongTien) AS TongChi
FROM DonHang d
WHERE d.NgayDat >= '2026-01-01'           -- lọc DÒNG: chỉ đơn năm 2026
GROUP BY d.KhachHangId
HAVING SUM(d.TongTien) > 20000000         -- lọc NHÓM: khách chi trên 20 triệu
ORDER BY TongChi DESC                     -- dùng được bí danh vì chạy sau SELECT
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;    -- phân trang, bắt buộc có ORDER BY`,
            note: 'Mọi cột trong SELECT không nằm trong hàm tổng hợp phải có mặt trong GROUP BY, nếu không SQL Server báo lỗi.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Thứ tự xử lý logic của SELECT',
            items: [
              { label: '1. FROM / JOIN', text: 'Lấy bảng, ghép dòng theo ON' },
              { label: '2. WHERE', text: 'Bỏ dòng không thoả — chưa có bí danh cột' },
              { label: '3. GROUP BY', text: 'Gom dòng thành nhóm' },
              { label: '4. HAVING', text: 'Bỏ nhóm không thoả' },
              { label: '5. SELECT', text: 'Tính cột, đặt bí danh AS' },
              { label: '6. ORDER BY', text: 'Sắp xếp — dùng được bí danh' },
              { label: '7. OFFSET / TOP', text: 'Cắt số dòng trả về' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Lỗi "Invalid column name"',
          text: 'SELECT Gia * 1.1 AS GiaMoi FROM SanPham WHERE GiaMoi > 10000000 báo lỗi vì WHERE chạy trước SELECT, lúc đó GiaMoi chưa tồn tại. Viết lại WHERE Gia * 1.1 > 10000000. Tương tự, HAVING không dùng được bí danh TongChi.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Mẹo trả lời',
          text: 'Điều kiện không dính tới hàm tổng hợp (như KhachHangId = 7) nên đặt ở WHERE: loại dòng sớm, câu lệnh rõ ý. Kể được thứ tự thực thi là cách giải thích gọn nhất vì sao ORDER BY dùng được bí danh còn WHERE thì không.',
        },
      ],
      followUps: [
        'COUNT(*) khác COUNT(cot) thế nào?',
        'OFFSET FETCH chậm ở trang rất sâu, xử lý ra sao?',
        'Viết truy vấn sản phẩm đắt nhất trong từng danh mục bằng subquery tương quan.',
      ],
      buoi: [36],
    },
    {
      id: 'pv-be-09',
      level: 'Trung bình',
      question: 'Vì sao nên dùng DTO / ViewModel thay vì nhận và trả thẳng entity?',
      short:
        'Entity ánh xạ bảng nên chứa cả cột nhạy cảm (PasswordHash, Role) và navigation hai chiều. DTO chỉ gồm trường client được gửi hoặc được nhận: chặn over-posting (client tự gửi "role": "Admin"), không lộ dữ liệu, tránh lỗi vòng lặp JSON, và đổi database không làm vỡ hợp đồng API.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Nhận thẳng entity hay qua DTO?',
            columns: [
              { title: '[FromBody] KhachHang (entity)', tone: 'bad', items: ['Swagger đòi nhập cả Id, Role, NgayTao', 'Client gửi "role": "Admin" là thành Admin', 'Trả về lộ PasswordHash', 'Đổi cột trong bảng là đổi API'] },
              { title: '[FromBody] DangKyDto', tone: 'good', items: ['Payload gọn, đúng nghiệp vụ', 'Trường nhạy cảm do server quyết', 'Response chọn lọc trường', 'Database đổi, API giữ nguyên'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Request DTO vào, response DTO ra',
            code: `public record DangKyDto(
    [Required] string TenDangNhap,
    [Required, EmailAddress] string Email,
    [Required, MinLength(6)] string MatKhau);

public record KhachHangDto(int Id, string TenDangNhap, string Email);

[HttpPost("dang-ky")]
public async Task<ActionResult<KhachHangDto>> DangKy(DangKyDto dto)
{
    if (await db.KhachHangs.AnyAsync(k => k.Email == dto.Email))
        return Conflict(new { message = "Email đã được dùng" });           // 409

    var kh = new KhachHang
    {
        TenDangNhap = dto.TenDangNhap,
        Email = dto.Email,
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.MatKhau),
        Role = "KhachHang",                    // server quyết, client không gửi được
        NgayTao = DateTime.UtcNow
    };
    db.KhachHangs.Add(kh);
    await db.SaveChangesAsync();

    var kq = new KhachHangDto(kh.Id, kh.TenDangNhap, kh.Email);   // không có PasswordHash
    return CreatedAtAction(nameof(GetById), new { id = kh.Id }, kq);
}`,
            note: 'Nhờ [ApiController], DTO sai [Required]/[EmailAddress] bị chặn trước khi vào action và client nhận 400 kèm danh sách lỗi từng trường.',
          },
        },
        {
          type: 'table',
          head: ['Kiểu trả về', 'Ưu điểm', 'Nhược điểm'],
          rows: [
            ['KhachHangDto', 'Ngắn, Swagger biết kiểu', 'Chỉ trả được 200'],
            ['IActionResult', 'Trả mọi status code', 'Swagger không biết kiểu dữ liệu'],
            ['ActionResult<KhachHangDto>', 'Vừa trả mọi mã, vừa có kiểu', 'Không dùng với kiểu interface'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Lỗi object cycle khi trả entity',
          text: 'DonHang có KhachHang, KhachHang có DonHangs: Include rồi trả thẳng thì System.Text.Json báo "A possible object cycle was detected". Select ra DTO giải quyết luôn, và còn chỉ lấy đúng các cột cần.',
        },
      ],
      followUps: [
        'Over-posting (mass assignment) là gì?',
        'Map entity sang DTO bằng tay hay dùng AutoMapper/Mapster, ưu nhược?',
        'Mỗi nghiệp vụ một DTO hay dùng chung một DTO cho thêm và sửa?',
      ],
      buoi: [33, 38, 39],
    },
    {
      id: 'pv-be-10',
      level: 'Trung bình',
      question: 'Transaction là gì? Giải thích ACID.',
      short:
        'Transaction gom nhiều lệnh thành một đơn vị "tất cả hoặc không gì cả": thành công hết thì COMMIT, lỗi giữa chừng thì ROLLBACK như chưa từng chạy. ACID là bốn tính chất mà transaction đảm bảo: Atomicity, Consistency, Isolation, Durability.',
      answer: [
        {
          type: 'table',
          head: ['Tính chất', 'Nghĩa', 'Ví dụ đặt hàng'],
          rows: [
            ['Atomicity — nguyên tử', 'Tất cả hoặc không gì cả', 'Tạo đơn rồi trừ tồn kho lỗi → đơn cũng bị huỷ'],
            ['Consistency — nhất quán', 'Trước và sau đều thoả mọi ràng buộc', 'CHECK TonKho >= 0, FK hợp lệ'],
            ['Isolation — cô lập', 'Transaction chạy đồng thời không thấy dữ liệu dở dang của nhau', 'Hai khách cùng mua chiếc tivi cuối không cùng trừ được'],
            ['Durability — bền vững', 'Đã COMMIT thì không mất, kể cả mất điện', 'SQL Server ghi transaction log trước khi báo xong'],
          ],
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Đặt hàng trong một transaction',
            code: `BEGIN TRANSACTION;
BEGIN TRY
    INSERT INTO DonHang (KhachHangId, TongTien) VALUES (7, 15000000);
    DECLARE @DonHangId INT = SCOPE_IDENTITY();

    INSERT INTO ChiTietDonHang (DonHangId, SanPhamId, SoLuong, GiaBan)
    VALUES (@DonHangId, 5, 1, 15000000);

    UPDATE SanPham SET TonKho = TonKho - 1
    WHERE Id = 5 AND TonKho >= 1;
    IF @@ROWCOUNT = 0
        THROW 50001, N'Sản phẩm đã hết hàng', 1;

    COMMIT;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK;
    THROW;                         -- ném lại để ứng dụng biết lỗi
END CATCH;`,
            note: 'Điều kiện TonKho >= 1 nằm ngay trong UPDATE nên hai request đồng thời không thể cùng trừ chiếc cuối cùng; request thua nhận @@ROWCOUNT = 0 và rollback.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Vòng đời một transaction',
            steps: [
              { kind: 'start', text: 'BEGIN TRANSACTION' },
              { kind: 'process', text: 'INSERT DonHang, INSERT ChiTietDonHang (chưa ghi vĩnh viễn)' },
              { kind: 'process', text: 'UPDATE SanPham trừ tồn kho' },
              {
                kind: 'decision',
                text: 'Có lỗi giữa chừng?',
                branches: [
                  { label: 'Không', steps: [{ kind: 'process', text: 'COMMIT' }, { kind: 'end', text: 'Cả ba thay đổi được lưu' }] },
                  { label: 'Có', steps: [{ kind: 'process', text: 'CATCH → ROLLBACK' }, { kind: 'end', text: 'Dữ liệu như trước BEGIN' }] },
                ],
              },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Nối sang EF Core',
          text: 'Một lần SaveChangesAsync đã tự chạy trong một transaction. Chỉ khi cần gộp nhiều lần SaveChanges (hoặc SaveChanges + ExecuteSql) mới dùng await using var tx = await db.Database.BeginTransactionAsync(); ... await tx.CommitAsync();',
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Giữ transaction thật ngắn',
          text: 'Transaction mở càng lâu càng giữ khoá lâu, người khác đọc sẽ bị chờ. Không gọi API thanh toán bên ngoài hay chờ người dùng bên trong transaction; quên COMMIT trong cửa sổ truy vấn là khoá bảng.',
        },
      ],
      followUps: [
        'Các isolation level READ COMMITTED, SNAPSHOT, SERIALIZABLE khác nhau thế nào?',
        'Deadlock là gì, phòng tránh ra sao?',
        'SAVE TRANSACTION (savepoint) dùng khi nào?',
      ],
      buoi: [37, 39],
    },
    {
      id: 'pv-be-11',
      level: 'Trung bình',
      question: 'Stored procedure khác function thế nào? View dùng để làm gì?',
      short:
        'Stored procedure gọi bằng EXEC, được INSERT/UPDATE/DELETE, dùng transaction, TRY/CATCH, tham số OUTPUT và không bắt buộc trả về. Function bắt buộc trả về một giá trị hoặc một bảng, gọi được trong SELECT/WHERE/JOIN nhưng không được sửa dữ liệu bảng thật. View là câu SELECT được đặt tên, dùng như bảng ảo để giấu JOIN phức tạp và giới hạn quyền xem.',
      answer: [
        {
          type: 'table',
          head: ['Tiêu chí', 'Stored Procedure', 'Function', 'View'],
          rows: [
            ['Cách gọi', 'EXEC dbo.sp_DatHang ...', 'SELECT dbo.fn_TinhVAT(Gia)', 'SELECT * FROM dbo.vw_...'],
            ['Trả về', 'Tuỳ: nhiều result set, OUTPUT, mã trả về', 'Bắt buộc: một giá trị hoặc một bảng', 'Một tập kết quả'],
            ['Sửa dữ liệu', 'Được', 'Không', 'Hạn chế (chỉ khi dựa trên một bảng)'],
            ['Transaction, TRY/CATCH', 'Có', 'Không', 'Không'],
            ['Tham số', 'IN và OUTPUT', 'Chỉ IN', 'Không — cần tham số thì dùng inline TVF'],
            ['Dùng khi', 'Nghiệp vụ nhiều bước có ghi', 'Tính toán dùng trong truy vấn', 'Báo cáo, giấu JOIN, phân quyền xem'],
          ],
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Một function, một procedure, một view',
            code: `CREATE OR ALTER FUNCTION dbo.fn_TinhVAT (@Gia DECIMAL(18,2))
RETURNS DECIMAL(18,2)
AS
BEGIN
    RETURN @Gia * 0.10;
END;
GO
SELECT Ten, Gia, dbo.fn_TinhVAT(Gia) AS VAT FROM SanPham;   -- gọi trong SELECT
GO
CREATE OR ALTER PROCEDURE dbo.sp_ThongKeKhachHang
    @KhachHangId INT,
    @SoDon   INT OUTPUT,
    @TongChi DECIMAL(18,2) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT @SoDon = COUNT(*), @TongChi = ISNULL(SUM(TongTien), 0)
    FROM DonHang WHERE KhachHangId = @KhachHangId;
END;
GO
DECLARE @n INT, @tong DECIMAL(18,2);
EXEC dbo.sp_ThongKeKhachHang 7, @n OUTPUT, @tong OUTPUT;
GO
CREATE OR ALTER VIEW dbo.vw_DonHangKhachHang AS
SELECT d.Id AS MaDon, k.HoTen, d.NgayDat, d.TongTien
FROM DonHang d
JOIN KhachHang k ON k.Id = d.KhachHangId;
GO
GRANT SELECT ON dbo.vw_DonHangKhachHang TO nv_cskh;   -- xem view, không xem bảng gốc`,
            note: 'Gọi scalar function phải kèm schema dbo., thiếu sẽ báo "is not a recognized built-in function name". View không lưu dữ liệu, mỗi lần truy vấn lại chạy câu SELECT bên trong.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Scalar function trong WHERE trên bảng lớn',
          text: 'WHERE dbo.fn_TinhVAT(Gia) > 1000000 gọi hàm cho từng dòng và bọc cột trong hàm nên SQL Server không dùng được index trên Gia. Viết lại điều kiện trên chính cột: WHERE Gia > 10000000.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Chọn gì?',
          text: 'Đọc dữ liệu cố định → View. Đọc có tham số → inline table-valued function. Tính một giá trị dùng trong SELECT → scalar function. Có ghi dữ liệu, nhiều bước, cần transaction → Stored Procedure.',
        },
      ],
      followUps: [
        'Gọi stored procedure từ EF Core thế nào, lấy tham số OUTPUT ra sao?',
        'Inline TVF khác multi-statement TVF về hiệu năng?',
        'Có nên dồn toàn bộ nghiệp vụ vào stored procedure không?',
      ],
      buoi: [37, 39],
    },
    {
      id: 'pv-be-12',
      level: 'Trung bình',
      question: 'Index là gì? Clustered khác non-clustered thế nào? Khi nào index làm chậm?',
      short:
        'Index là cấu trúc B-tree giúp SQL Server tìm dòng nhanh như mục lục sách thay vì quét cả bảng. Clustered index quyết định thứ tự lưu dữ liệu (mỗi bảng một cái, mặc định là khoá chính); non-clustered là cấu trúc riêng trỏ về dòng (có nhiều cái). Index làm chậm INSERT/UPDATE/DELETE vì phải cập nhật thêm, tốn dung lượng, và vô dụng khi cột bị bọc trong hàm hoặc LIKE bắt đầu bằng %.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Tìm "Tivi Sony 55" qua non-clustered index IX_SanPham_Ten',
            root: {
              label: 'Nút gốc',
              note: 'A … Z',
              children: [
                {
                  label: 'Nút trung gian A … M',
                  children: [
                    { label: 'Lá: Điều hoà Daikin', note: '→ Id 31' },
                    { label: 'Lá: Máy giặt LG', note: '→ Id 12' },
                  ],
                },
                {
                  label: 'Nút trung gian N … Z',
                  children: [
                    { label: 'Lá: Tivi Sony 55', note: '→ Id 5 → đọc dòng ở clustered index (Key Lookup)', highlight: true },
                    { label: 'Lá: Tủ lạnh Samsung', note: '→ Id 9' },
                  ],
                },
              ],
            },
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Tạo index và viết truy vấn dùng được index',
            code: `-- PRIMARY KEY đã tạo clustered index trên Id
CREATE NONCLUSTERED INDEX IX_SanPham_Ten ON SanPham (Ten);

-- Khoá ngoại KHÔNG tự có index trong SQL Server → tự tạo
CREATE NONCLUSTERED INDEX IX_DonHang_KhachHang_NgayDat
ON DonHang (KhachHangId, NgayDat DESC)
INCLUDE (TongTien);                -- index bao phủ: khỏi quay lại bảng lấy TongTien

-- Seek được
SELECT Id, Ten FROM SanPham WHERE Ten LIKE N'Tivi%';
-- Phải scan: % ở đầu, cột bị bọc trong hàm
SELECT Id, Ten FROM SanPham WHERE Ten LIKE N'%Sony%';
SELECT Id FROM DonHang WHERE YEAR(NgayDat) = 2026;
-- Viết lại để seek được
SELECT Id FROM DonHang WHERE NgayDat >= '2026-01-01' AND NgayDat < '2027-01-01';`,
            note: 'Index ghép (KhachHangId, NgayDat) seek được cho WHERE KhachHangId = 7 hoặc KhachHangId = 7 AND NgayDat >= ..., nhưng không seek được khi chỉ lọc NgayDat — thứ tự cột quan trọng.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Đánh index ở đâu',
            columns: [
              { title: 'Nên đánh', tone: 'good', items: ['Cột trong WHERE, JOIN (khoá ngoại), ORDER BY hay dùng', 'Cột có nhiều giá trị khác nhau: Email, SoDienThoai', 'Bảng đọc nhiều, ghi ít'] },
              { title: 'Cẩn thận', tone: 'bad', items: ['Bảng ghi liên tục (log, lịch sử): mỗi INSERT cập nhật mọi index', 'Cột ít giá trị: GioiTinh, cờ true/false', 'Index trùng lặp, không truy vấn nào dùng'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Trả lời ăn điểm',
          text: 'Nói được cách kiểm chứng: bật Execution Plan (Ctrl+M) xem Index Seek hay Index/Table Scan, có Key Lookup không. Nhắc rằng SQL Server không tự đánh index cho khoá ngoại, khác với MySQL.',
        },
      ],
      followUps: [
        'Index Seek, Index Scan, Key Lookup khác nhau thế nào?',
        'Composite index (A, B) có dùng được cho WHERE B = ... không?',
        'Khai báo index trong EF Core Code First thế nào?',
      ],
      buoi: [34, 36],
    },
    {
      id: 'pv-be-13',
      level: 'Trung bình',
      question: 'Code First khác Database First thế nào? Migration hoạt động ra sao?',
      short:
        'Code First: viết entity và DbContext trước, EF Core sinh database bằng migration — class C# là nguồn sự thật, hợp dự án mới. Database First: database có sẵn, lệnh dotnet ef dbcontext scaffold sinh entity và DbContext — hợp hệ thống cũ hoặc khi DBA quản lý schema. Migration là file C# mô tả thay đổi schema (Up/Down), các migration đã áp được ghi vào bảng __EFMigrationsHistory.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Hai hướng làm việc với EF Core',
            columns: [
              { title: 'Code First', tone: 'plain', items: ['Class C# là nguồn sự thật', 'migrations add → database update', 'Lịch sử thay đổi DB nằm trong git', 'Hợp dự án mới'] },
              { title: 'Database First', tone: 'plain', items: ['Database là nguồn sự thật', 'Sửa DB bằng SQL → scaffold lại', 'Không sửa tay file sinh ra', 'Hợp hệ thống có sẵn, DBA quản lý schema'] },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Một vòng thay đổi model trong Code First',
            steps: [
              { kind: 'start', text: 'Thêm property ThuongHieu vào SanPham' },
              { kind: 'process', text: 'dotnet ef migrations add ThemThuongHieu' },
              { kind: 'process', text: 'EF so model hiện tại với ModelSnapshot → sinh Up() / Down()' },
              {
                kind: 'decision',
                text: 'Đọc file migration: đúng ý?',
                branches: [
                  { label: 'Sai', steps: [{ kind: 'process', text: 'dotnet ef migrations remove, sửa model' }] },
                  { label: 'Đúng', steps: [{ kind: 'process', text: 'dotnet ef database update → ALTER TABLE SanPham ADD ThuongHieu' }] },
                ],
              },
              { kind: 'end', text: '__EFMigrationsHistory thêm một dòng' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Các lệnh cần thuộc',
            code: `# Code First
dotnet ef migrations add ThemThuongHieu        # chỉ sinh file C#, chưa đụng DB
dotnet ef database update                      # chạy SQL lên DB
dotnet ef migrations remove                    # gỡ migration CHƯA áp
dotnet ef migrations script --idempotent -o deploy.sql   # script SQL cho production

# Database First
dotnet ef dbcontext scaffold Name=DefaultConnection Microsoft.EntityFrameworkCore.SqlServer -o Models -c CuaHangContext --force`,
            note: 'Các gói Microsoft.EntityFrameworkCore.* phải cùng phiên bản. Name=DefaultConnection đọc chuỗi kết nối từ appsettings.json, không ghi mật khẩu vào code sinh ra.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Bẫy mất dữ liệu',
          text: 'Đổi tên property có thể khiến migration sinh DROP COLUMN + ADD COLUMN — chạy là mất dữ liệu cột cũ. Luôn đọc file migration trước khi update, sửa thành RenameColumn nếu cần. Với Database First, code thêm vào model đặt ở file partial riêng, vì scaffold --force sẽ ghi đè.',
        },
      ],
      followUps: [
        'Đã database update rồi mới thấy migration sai thì làm sao?',
        'Fluent API và Data Annotations, cái nào được ưu tiên?',
        'Áp migration lên production nên dùng database update hay script SQL?',
      ],
      buoi: [38],
    },
    {
      id: 'pv-be-14',
      level: 'Trung bình',
      question: 'Middleware là gì? Vì sao UseAuthentication phải đứng trước UseAuthorization?',
      short:
        'Middleware là một mắt xích trong request pipeline: nhận HttpContext, xử lý, rồi gọi next() để chuyển tiếp hoặc tự trả response để chặn lại. Thứ tự đăng ký chính là thứ tự chạy. UseAuthentication đọc token và gán context.User; UseAuthorization dựa vào context.User để xét [Authorize] — đảo thứ tự thì User luôn rỗng và mọi API bảo vệ đều trả 401.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Thứ tự khai báo trong Program.cs',
            items: [
              { label: 'UseExceptionHandler', text: 'Đứng đầu để bọc và bắt lỗi của mọi tầng sau' },
              { label: 'UseCors', text: 'Trả header Access-Control-Allow-* cho trình duyệt' },
              { label: 'UseStaticFiles', text: 'Gặp file tĩnh thì trả luôn, không đi tiếp' },
              { label: 'UseRouting', text: 'Chọn endpoint khớp URL' },
              { label: 'UseAuthentication', text: '"Bạn là ai?" → gán context.User' },
              { label: 'UseAuthorization', text: '"Bạn được làm gì?" → đọc context.User' },
              { label: 'MapControllers', text: 'Chạy action' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Tự viết middleware đo thời gian',
            code: `public class ThoiGianMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        var sw = Stopwatch.StartNew();
        await next(context);                       // các tầng phía sau chạy
        sw.Stop();                                 // response đang đi ngược ra
        Console.WriteLine($"{context.Request.Method} {context.Request.Path} {context.Response.StatusCode} - {sw.ElapsedMilliseconds}ms");
    }
}

// Program.cs
builder.Services.AddTransient<ThoiGianMiddleware>();   // IMiddleware bắt buộc đăng ký DI
var app = builder.Build();
app.UseExceptionHandler("/loi");
app.UseMiddleware<ThoiGianMiddleware>();
app.UseCors("ChoPhepBlazor");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();`,
            note: 'Mô hình củ hành: middleware đứng trước gặp request trước và gặp response sau cùng. Không gọi next() là request dừng tại đó — cách chặn IP, giới hạn tần suất.',
          },
        },
        {
          type: 'table',
          head: ['', 'Middleware', 'Filter (MVC)'],
          rows: [
            ['Phạm vi', 'Mọi request, kể cả file tĩnh, 404', 'Chỉ quanh action của controller'],
            ['Biết được gì', 'HttpContext', 'Action nào, tham số đã binding, kết quả trả về'],
            ['Ví dụ', 'Log thời gian, chặn IP, CORS, xác thực', 'Kiểm tra tham số, bọc kết quả, bắt lỗi của action'],
            ['Đăng ký', 'app.UseXxx() trong Program.cs', 'options.Filters.Add, [ServiceFilter], attribute'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Sai thứ tự là lỗi im lặng',
          text: 'Không có exception nào báo cả: UseAuthorization trước UseAuthentication thì token đúng vẫn 401; UseCors đặt sau MapControllers thì trình duyệt báo lỗi CORS; UseExceptionHandler đặt cuối thì không bắt được lỗi của các middleware trước nó.',
        },
      ],
      followUps: [
        'Có mấy loại filter, chạy theo thứ tự nào?',
        'CORS là gì, preflight request OPTIONS xảy ra khi nào?',
        'Viết middleware bằng IMiddleware khác cách convention (constructor nhận RequestDelegate) thế nào?',
      ],
      buoi: [40, 41],
    },

    // ───────────────────────────── NÂNG CAO ─────────────────────────────
    {
      id: 'pv-be-15',
      level: 'Nâng cao',
      question: 'N+1 query là gì? Sửa thế nào, và AsNoTracking giúp gì?',
      short:
        'N+1 là khi lấy N bản ghi bằng 1 truy vấn, rồi mỗi bản ghi lại phát thêm 1 truy vấn để nạp dữ liệu liên quan (thường do lazy loading) — tổng N+1 lần đi về database. Sửa bằng eager loading Include/ThenInclude, hoặc tốt hơn là Select ra DTO để EF sinh một câu JOIN. AsNoTracking bỏ change tracking cho truy vấn chỉ đọc nên nhanh và nhẹ bộ nhớ hơn.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Lazy loading: 100 đơn hàng = 101 câu SQL',
            actors: ['Controller', 'EF Core', 'SQL Server'],
            steps: [
              { from: 0, to: 1, text: 'await db.DonHangs.ToListAsync()' },
              { from: 1, to: 2, text: 'SELECT * FROM DonHang — câu 1' },
              { from: 2, to: 1, text: '100 dòng', dashed: true },
              { from: 0, to: 1, text: 'foreach: don.KhachHang.HoTen (đơn 1)' },
              { from: 1, to: 2, text: 'SELECT ... FROM KhachHang WHERE Id = @p — câu 2' },
              { from: 0, to: 1, text: 'don.KhachHang.HoTen (đơn 2)' },
              { from: 1, to: 2, text: 'SELECT ... FROM KhachHang WHERE Id = @p — câu 3' },
              { from: 0, to: 0, text: '… lặp tới đơn 100 → 101 câu' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Từ N+1 về một câu SQL',
            code: `// N+1: bật UseLazyLoadingProxies, navigation là virtual
var dsDon = await db.DonHangs.ToListAsync();                    // 1 câu
foreach (var d in dsDon)
    Console.WriteLine(d.KhachHang.HoTen);                       // +1 câu cho MỖI đơn

// Cách 1: Include — JOIN trong một câu, nạp nguyên entity
var dsDon1 = await db.DonHangs
    .AsNoTracking()                                             // chỉ đọc → khỏi track
    .Include(d => d.KhachHang)
    .Include(d => d.ChiTiets).ThenInclude(c => c.SanPham)
    .AsSplitQuery()                                             // nhiều collection → tách câu
    .ToListAsync();

// Cách 2 (khuyên dùng cho API đọc): Select ra DTO
var dsDon2 = await db.DonHangs
    .Where(d => d.NgayDat >= tuNgay)
    .Select(d => new DonHangDto(
        d.Id,
        d.KhachHang.HoTen,                                      // EF tự JOIN, không cần Include
        d.ChiTiets.Sum(c => c.SoLuong * c.GiaBan)))
    .ToListAsync();`,
            note: 'Select ra DTO chỉ lấy đúng các cột cần và không tạo entity nên vốn không bị track — AsNoTracking có ích khi truy vấn trả về entity để đọc.',
          },
        },
        {
          type: 'table',
          head: ['', 'Mặc định (tracking)', 'AsNoTracking'],
          rows: [
            ['DbContext giữ snapshot', 'Có — để SaveChanges biết cột nào đã đổi', 'Không'],
            ['Sửa property rồi SaveChanges', 'Sinh UPDATE', 'Không lưu gì (entity Detached)'],
            ['Chi phí', 'Tốn RAM và CPU với danh sách lớn', 'Nhanh hơn, nhẹ hơn'],
            ['Dùng cho', 'Đọc để sửa / xoá', 'API GET, báo cáo, danh sách'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'N+1 khó thấy',
          text: 'Lazy loading còn bị kích hoạt khi serializer đọc navigation lúc trả JSON, không chỉ trong foreach. Include nhiều collection trong một câu thì số dòng nhân lên (cartesian explosion) — dùng AsSplitQuery.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Trả lời ăn điểm',
          text: 'Nói được cách phát hiện chứ không chỉ cách sửa: bật optionsBuilder.LogTo(Console.WriteLine) ở môi trường dev để đếm số câu SQL mỗi request, hoặc dùng SQL Server Profiler / Extended Events.',
        },
      ],
      followUps: [
        'Include khác Select projection thế nào về số cột lấy về?',
        'AsSplitQuery dùng khi nào, đánh đổi gì?',
        'FindAsync khác FirstOrDefaultAsync thế nào khi entity đã được track?',
      ],
      buoi: [38, 39],
    },
    {
      id: 'pv-be-16',
      level: 'Nâng cao',
      question: 'SQL injection là gì? Chống thế nào trong SQL Server và EF Core?',
      short:
        'SQL injection xảy ra khi giá trị người dùng nhập được ghép thẳng vào chuỗi SQL, làm câu lệnh bị đổi nghĩa (đọc trộm, xoá bảng). Cách chống gốc là tham số hoá: giá trị đi riêng dưới dạng tham số nên không bao giờ thành mã lệnh — LINQ, FromSql, FromSqlRaw có placeholder, SqlParameter, sp_executesql có tham số. Tên bảng/cột động thì phải whitelist và QUOTENAME.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: `Người dùng nhập ô tìm kiếm: x' OR 1=1 --`,
            columns: [
              {
                title: 'Ghép chuỗi',
                tone: 'bad',
                items: [
                  `"... WHERE Ten = '" + tuKhoa + "'"`,
                  `Thành: WHERE Ten = 'x' OR 1=1 --'`,
                  'Điều kiện luôn đúng → trả mọi dòng',
                  'Mỗi giá trị khác nhau sinh một execution plan mới',
                ],
              },
              {
                title: 'Tham số hoá',
                tone: 'good',
                items: [
                  '"... WHERE Ten = @tuKhoa"',
                  'Giá trị chỉ là dữ liệu, kể cả có dấu nháy',
                  'Tái sử dụng execution plan',
                  'Tên bảng / cột: whitelist + QUOTENAME',
                ],
              },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'EF Core: an toàn và không an toàn',
            code: `// NGUY HIỂM: FromSqlRaw + chuỗi nội suy = ghép chuỗi
var ds1 = await db.SanPhams
    .FromSqlRaw($"SELECT * FROM SanPham WHERE Ten = '{tuKhoa}'")
    .ToListAsync();

// AN TOÀN: FromSql (EF Core 7+) biến mỗi {bien} thành tham số @p0
var ds2 = await db.SanPhams
    .FromSql($"SELECT * FROM SanPham WHERE Ten = {tuKhoa}")
    .ToListAsync();

// AN TOÀN: FromSqlRaw với placeholder hoặc SqlParameter
var ds3 = await db.SanPhams
    .FromSqlRaw("SELECT * FROM SanPham WHERE Ten = {0}", tuKhoa)
    .ToListAsync();
var ds4 = await db.SanPhams
    .FromSqlRaw("EXEC dbo.sp_TimSanPham @TuKhoa", new SqlParameter("@TuKhoa", tuKhoa))
    .ToListAsync();

// Tốt nhất: LINQ — luôn được tham số hoá
var ds5 = await db.SanPhams.Where(s => s.Ten == tuKhoa).ToListAsync();`,
            note: 'FromSql và FromSqlRaw tên gần giống nhau nhưng một cái an toàn với chuỗi $"...", một cái không. Đọc kỹ trước khi dùng.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'SQL động trong stored procedure',
            code: `DECLARE @TuKhoa NVARCHAR(100) = N'Tivi';
DECLARE @SapXep SYSNAME = N'Gia';
DECLARE @sql NVARCHAR(MAX);

-- Giá trị: truyền bằng tham số của sp_executesql
SET @sql = N'SELECT Id, Ten, Gia FROM SanPham WHERE Ten LIKE N''%'' + @TuKhoa + N''%''';
EXEC sp_executesql @sql, N'@TuKhoa NVARCHAR(100)', @TuKhoa = @TuKhoa;

-- Tên cột: không tham số hoá được → whitelist + QUOTENAME
IF @SapXep NOT IN (N'Gia', N'Ten') SET @SapXep = N'Id';
SET @sql = N'SELECT Id, Ten, Gia FROM SanPham ORDER BY ' + QUOTENAME(@SapXep);
EXEC sp_executesql @sql;`,
            note: 'Stored procedure không tự động an toàn: bên trong mà ghép chuỗi rồi EXEC(@sql) thì vẫn dính injection.',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Phòng thủ nhiều lớp',
          text: 'Tham số hoá là lớp chính. Thêm: tài khoản database của ứng dụng không dùng sa, chỉ GRANT đúng quyền cần (least privilege — DCL), và không trả nguyên thông báo lỗi SQL ra client. Bị khai thác thì thiệt hại vẫn bị giới hạn.',
        },
      ],
      followUps: [
        'Stored procedure có tự động chống được SQL injection không?',
        'Vì sao tên bảng, tên cột không truyền được bằng tham số?',
        'Escape dấu nháy đơn bằng Replace có đủ an toàn không?',
      ],
      buoi: [37, 39],
    },
    {
      id: 'pv-be-17',
      level: 'Nâng cao',
      question: 'JWT gồm những gì, lưu ở đâu? Vì sao cần refresh token?',
      short:
        'JWT gồm ba phần header.payload.signature mã hoá Base64Url: header ghi thuật toán, payload chứa claims (id, role, exp), signature là chữ ký HMAC bằng khoá bí mật của server để không ai sửa được nội dung. Payload ai cũng đọc được nên không chứa bí mật. Access token sống ngắn (15–30 phút) để lỡ lộ thì ít hại; refresh token sống dài, lưu trong database, dùng để xin access token mới và thu hồi được.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'boxes',
            caption: 'Ba phần của một JWT, nối nhau bằng dấu chấm',
            items: [
              { label: 'Header', value: '{ "alg": "HS256", "typ": "JWT" }', note: 'thuật toán ký' },
              { label: 'Payload', value: '{ "nameid": "7", "role": "Admin", "exp": 1767225600 }', note: 'claims — chỉ Base64Url, ai cũng giải được' },
              { label: 'Signature', value: 'HMACSHA256(header + "." + payload, Jwt:Key)', note: 'sửa 1 ký tự payload là sai chữ ký → 401' },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Đăng nhập, gọi API, refresh khi hết hạn',
            actors: ['Client', 'AuthController', 'Database', 'API được bảo vệ'],
            steps: [
              { from: 0, to: 1, text: 'POST /api/auth/login { userName, password }' },
              { from: 1, to: 2, text: 'Tìm user, lấy PasswordHash và roles' },
              { from: 1, to: 1, text: 'BCrypt.Verify(password, PasswordHash)' },
              { from: 1, to: 0, text: '200 { accessToken 30 phút, refreshToken 7 ngày }', dashed: true },
              { from: 0, to: 3, text: 'GET /api/don-hang · Authorization: Bearer <accessToken>' },
              { from: 3, to: 0, text: '30 phút sau: 401 invalid_token', dashed: true },
              { from: 0, to: 1, text: 'POST /api/auth/refresh-token { accessToken cũ, refreshToken }' },
              { from: 1, to: 2, text: 'Token còn hạn, chưa thu hồi? → huỷ token cũ, lưu token mới' },
              { from: 1, to: 0, text: '200 { accessToken mới, refreshToken mới }', dashed: true },
            ],
          },
        },
        {
          type: 'table',
          head: ['Client lưu token ở đâu', 'Ưu điểm', 'Nhược điểm'],
          rows: [
            ['Bộ nhớ (biến trong app)', 'Script lạ khó đọc trộm nhất', 'Mất khi tải lại trang → cần refresh token'],
            ['localStorage', 'Đơn giản', 'Bị XSS là script độc đọc được token'],
            ['Cookie HttpOnly + Secure + SameSite', 'JavaScript không đọc được', 'Phải chống CSRF, CORS cần AllowCredentials + origin cụ thể'],
            ['App mobile: SecureStorage / Keychain', 'Hệ điều hành mã hoá', '—'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Mật khẩu băm bằng BCrypt, không MD5 / SHA256',
          text: 'MD5, SHA256 được thiết kế để nhanh: GPU thử hàng tỷ mật khẩu mỗi giây, và cùng mật khẩu ra cùng hash nên tra rainbow table được. BCrypt chậm có chủ đích (work factor) và tự sinh muối ngẫu nhiên lưu ngay trong chuỗi hash — vì vậy hai lần HashPassword cùng mật khẩu ra hai chuỗi khác nhau, phải dùng BCrypt.Verify chứ không so sánh chuỗi.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Trả lời ăn điểm',
          text: 'Nói rõ JWT là được KÝ chứ không được MÃ HOÁ. JWT không thu hồi được trước hạn, nên mới cần access token ngắn + refresh token lưu DB. Mỗi lần refresh phải xoay vòng (huỷ token cũ, cấp token mới); một refresh token đã huỷ bị gửi lại là dấu hiệu bị đánh cắp → thu hồi mọi token của user đó.',
        },
      ],
      followUps: [
        'Làm sao đăng xuất / thu hồi một access token chưa hết hạn?',
        'Vì sao endpoint refresh đọc access token cũ với ValidateLifetime = false nhưng vẫn kiểm chữ ký?',
        'ClockSkew mặc định 5 phút ảnh hưởng gì khi test token hết hạn?',
      ],
      buoi: [40],
    },
    {
      id: 'pv-be-18',
      level: 'Nâng cao',
      question: 'Cache-aside là gì? Khi nào dùng IMemoryCache, Redis hay Output Cache?',
      short:
        'Cache-aside: đọc cache trước, có (hit) thì trả luôn; không có (miss) thì hỏi database rồi ghi vào cache kèm thời gian hết hạn; khi dữ liệu đổi thì xoá khoá cache. IMemoryCache nằm trong RAM của từng tiến trình — hợp một server; Redis là cache phân tán dùng chung cho nhiều instance; Output Cache lưu nguyên response HTTP ở tầng middleware cho API GET công khai.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Cache-aside với Redis cho danh sách sản phẩm nổi bật',
            steps: [
              { kind: 'start', text: 'GET /api/san-pham/noi-bat' },
              {
                kind: 'decision',
                text: 'Redis có khoá dien-may:san-pham:noi-bat?',
                branches: [
                  { label: 'Có (hit)', steps: [{ kind: 'io', text: 'Deserialize JSON, trả ngay — vài ms' }] },
                  {
                    label: 'Không (miss)',
                    steps: [
                      { kind: 'process', text: 'Truy vấn SQL Server' },
                      { kind: 'process', text: 'SetString(khoá, JSON, hết hạn 10 phút)' },
                      { kind: 'io', text: 'Trả dữ liệu' },
                    ],
                  },
                ],
              },
              { kind: 'end', text: 'Sửa giá sản phẩm → ghi DB xong rồi Remove(khoá)' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Services/SanPhamService.cs với IDistributedCache',
            code: `public class SanPhamService(CuaHangContext db, IDistributedCache cache)
{
    const string Khoa = "san-pham:noi-bat";

    public async Task<List<SanPhamDto>> LayNoiBatAsync()
    {
        string? json = await cache.GetStringAsync(Khoa);
        if (json is not null)
            return JsonSerializer.Deserialize<List<SanPhamDto>>(json)!;       // hit

        var ds = await db.SanPhams                                          // miss
            .Where(s => s.NoiBat)
            .Select(s => new SanPhamDto(s.Id, s.Ten, s.Gia))
            .ToListAsync();

        await cache.SetStringAsync(Khoa, JsonSerializer.Serialize(ds),
            new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
            });
        return ds;
    }

    public async Task DoiGiaAsync(int id, decimal gia)
    {
        await db.SanPhams.Where(s => s.Id == id)
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.Gia, gia));
        await cache.RemoveAsync(Khoa);               // ghi DB xong → xoá cache
    }
}

// Program.cs
builder.Services.AddStackExchangeRedisCache(o =>
{
    o.Configuration = "localhost:6379";
    o.InstanceName = "dien-may:";
});`,
            note: 'IDistributedCache chỉ lưu string / byte[] nên phải serialize. Cache DTO thay vì entity để tránh lỗi vòng lặp và không lưu cột thừa.',
          },
        },
        {
          type: 'table',
          head: ['Loại', 'Lưu ở đâu', 'Hợp với', 'Lưu ý'],
          rows: [
            ['IMemoryCache', 'RAM của tiến trình API', 'Một server, dữ liệu ít đổi (danh mục)', 'Nhiều server thì mỗi bản một khác; restart là mất'],
            ['Redis (IDistributedCache)', 'Server Redis riêng', 'Nhiều instance sau load balancer', 'Thêm một chặng mạng, phải serialize'],
            ['Output Cache (.NET 7+)', 'Nguyên response HTTP tại middleware', 'GET công khai: bảng giá, danh mục', 'Mặc định bỏ qua request có Authorization'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Ba lỗi kinh điển',
          text: 'Quên xoá cache khi ghi → người dùng thấy giá cũ tới hết hạn. Cache dữ liệu riêng tư bằng khoá chung → khách B thấy đơn của khách A. Cache stampede: khoá hot vừa hết hạn, hàng trăm request cùng miss và đổ dồn vào database cùng lúc.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Trả lời ăn điểm',
          text: 'Nêu thứ tự "ghi database trước, rồi xoá cache" thay vì cập nhật cache — tránh hai request ghi đè nhau làm cache lệch. Kết hợp absolute expiration (chặn trần tuổi dữ liệu) với sliding expiration (dọn khoá nguội). Cache không bao giờ là nguồn sự thật.',
        },
      ],
      followUps: [
        'Vì sao nên xoá cache thay vì cập nhật cache khi dữ liệu thay đổi?',
        'Absolute expiration khác sliding expiration thế nào?',
        'Vì sao không chạy KEYS * trên Redis production?',
      ],
      buoi: [41],
    },
    {
      id: 'pv-be-19',
      level: 'Nâng cao',
      question: 'Repository Pattern và Unit of Work giải quyết vấn đề gì?',
      short:
        'Repository gom logic truy xuất dữ liệu của một entity sau một interface, để Service chỉ lo nghiệp vụ và Controller chỉ lo HTTP; nhờ phụ thuộc interface nên mock được khi unit test. Unit of Work gom các repository dùng chung một DbContext và một lần SaveChangesAsync, để nghiệp vụ đụng nhiều bảng (tạo đơn + trừ tồn kho) được ghi trong cùng một transaction.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Mỗi tầng một trách nhiệm',
            root: {
              label: 'DonHangController',
              note: 'nhận request / trả response',
              children: [
                {
                  label: 'IDonHangService → DonHangService',
                  note: 'nghiệp vụ: kiểm tra tồn kho, tính tiền',
                  highlight: true,
                  children: [
                    {
                      label: 'IUnitOfWork → UnitOfWork',
                      note: 'SaveChangesAsync = commit',
                      children: [
                        { label: 'ISanPhamRepository → SanPhamRepository', note: 'truy xuất bảng SanPham' },
                        { label: 'IDonHangRepository → DonHangRepository', note: 'truy xuất bảng DonHang' },
                        { label: 'CuaHangContext', note: 'EF Core, Scoped' },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Đặt hàng qua Unit of Work',
            code: `public interface IUnitOfWork
{
    ISanPhamRepository SanPhams { get; }
    IDonHangRepository DonHangs { get; }
    Task<int> SaveChangesAsync();
}

public class DonHangService(IUnitOfWork uow) : IDonHangService
{
    public async Task<bool> DatHangAsync(int khachHangId, int sanPhamId, int soLuong)
    {
        var sp = await uow.SanPhams.GetByIdAsync(sanPhamId);
        if (sp is null || sp.TonKho < soLuong) return false;

        sp.TonKho -= soLuong;                                       // UPDATE SanPham
        var don = new DonHang { KhachHangId = khachHangId, NgayDat = DateTime.UtcNow };
        don.ChiTiets.Add(new ChiTietDonHang { SanPhamId = sanPhamId, SoLuong = soLuong, GiaBan = sp.Gia });
        await uow.DonHangs.AddAsync(don);                           // INSERT DonHang + ChiTiet

        await uow.SaveChangesAsync();                               // một transaction
        return true;
    }
}

// Program.cs — cùng Scoped để dùng chung một DbContext trong một request
builder.Services.AddScoped<ISanPhamRepository, SanPhamRepository>();
builder.Services.AddScoped<IDonHangRepository, DonHangRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IDonHangService, DonHangService>();`,
            note: 'Repository KHÔNG tự gọi SaveChanges. Nếu mỗi repository tự lưu, bước trừ tồn kho lỗi sẽ để lại một đơn hàng rỗng trong database.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Ba thay đổi, một lần ghi',
            actors: ['DonHangService', 'Repositories', 'UnitOfWork', 'SQL Server'],
            steps: [
              { from: 0, to: 1, text: 'SanPhams.GetByIdAsync(5)' },
              { from: 1, to: 3, text: 'SELECT SanPham' },
              { from: 0, to: 0, text: 'Kiểm tra tồn kho, trừ TonKho (Modified)' },
              { from: 0, to: 1, text: 'DonHangs.AddAsync(don) — chỉ đánh dấu Added' },
              { from: 0, to: 2, text: 'SaveChangesAsync()' },
              { from: 2, to: 3, text: 'BEGIN TRAN · UPDATE · INSERT · INSERT · COMMIT' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Lỗi hay gặp',
          text: 'Đăng ký repository là Singleton trong khi DbContext là Scoped → "Cannot consume scoped service from singleton". Repository trả IQueryable ra ngoài → Service lại tự viết LINQ, Include tuỳ ý, repository mất ý nghĩa (rò rỉ trừu tượng).',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Trả lời cân bằng',
          text: 'DbContext bản thân đã là một Unit of Work và DbSet đã giống repository. Với dự án nhỏ chỉ CRUD, bọc thêm generic repository có thể là thừa. Nêu được cả lợi ích (tách tầng, test, gom transaction) lẫn khi nào không cần sẽ ghi điểm hơn là khen một chiều.',
        },
      ],
      followUps: [
        'DbContext đã là Unit of Work rồi, vì sao còn bọc thêm?',
        'Generic Repository<T> có ưu nhược gì?',
        'Unit test DonHangService mà không cần database thật thế nào?',
      ],
      buoi: [42],
    },
    {
      id: 'pv-be-20',
      level: 'Nâng cao',
      question: 'Monolith khác microservice thế nào? API Gateway và Kafka đóng vai trò gì?',
      short:
        'Monolith là một ứng dụng triển khai nguyên khối, dùng chung một database — đơn giản, gọi hàm nội bộ, transaction dễ. Microservice chia hệ thống thành nhiều service nhỏ theo nghiệp vụ, mỗi service một database, deploy và scale độc lập — đổi lại phải lo giao tiếp mạng, nhất quán dữ liệu, giám sát. API Gateway (YARP) là cổng vào duy nhất để định tuyến và kiểm tra JWT; Kafka là message broker để các service trao đổi sự kiện bất đồng bộ.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Hai kiến trúc cho cửa hàng điện máy',
            columns: [
              { title: 'Monolith', tone: 'plain', items: ['Một project, một lần deploy', 'Một database: JOIN và transaction thoải mái', 'Gọi hàm trong cùng tiến trình — nhanh, dễ debug', 'Một chỗ nóng phải scale cả khối', 'Hợp đội nhỏ, sản phẩm mới'] },
              { title: 'Microservice', tone: 'plain', items: ['Identity, Product, Order, Payment tách riêng', 'Mỗi service một database — không JOIN chéo', 'Gọi qua HTTP / message — có độ trễ, có thể lỗi', 'Scale riêng OrderService mùa sale', 'Cần Docker, gateway, log tập trung, giám sát'] },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Đặt hàng: OrderService phát sự kiện, ProductService tự trừ tồn kho',
            actors: ['Blazor web', 'API Gateway (YARP)', 'OrderService', 'Kafka', 'ProductService'],
            steps: [
              { from: 0, to: 1, text: 'POST /order/api/don-hang · Bearer token' },
              { from: 1, to: 2, text: 'JWT hợp lệ → chuyển tiếp' },
              { from: 2, to: 2, text: 'INSERT DonHang vào OrderDb' },
              { from: 2, to: 3, text: 'Produce "order-created" { DonId, Items }' },
              { from: 2, to: 0, text: '201 Created — không chờ ProductService', dashed: true },
              { from: 3, to: 4, text: 'Consume "order-created" (BackgroundService)' },
              { from: 4, to: 4, text: 'UPDATE Products SET Stock = Stock - SoLuong trong ProductDb' },
            ],
          },
        },
        {
          type: 'table',
          head: ['Thành phần', 'Vai trò', 'Trong đồ án'],
          rows: [
            ['API Gateway (YARP)', 'Một địa chỉ duy nhất cho client, định tuyến, kiểm tra JWT, rate limit', 'Gateway: /product/*, /order/*'],
            ['Message broker (Kafka)', 'Lưu sự kiện bền vững, service gửi / nhận bất đồng bộ, giảm phụ thuộc trực tiếp', 'Topic order-created'],
            ['Database per service', 'Mỗi service sở hữu dữ liệu riêng, không đọc DB của service khác', 'OrderDb, ProductDb, IdentityDb'],
            ['Điều phối (Aspire, docker compose)', 'Khởi động, cấp địa chỉ, theo dõi các service', 'AppHost, docker-compose.yml'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Microservice không miễn phí',
          text: 'Dữ liệu chỉ nhất quán "sau một lúc" (eventual consistency); message có thể đến hai lần nên consumer phải idempotent (bỏ qua DonId đã xử lý); không có transaction xuyên service. Ứng dụng nhỏ nên bắt đầu bằng monolith chia module rõ ràng, tách dần khi có lý do thật.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Trả lời ăn điểm',
          text: 'Nêu vấn đề "lưu đơn vào DB thành công nhưng gửi Kafka thất bại" và cách giải bằng Outbox pattern: ghi sự kiện vào bảng Outbox trong cùng transaction với đơn hàng, một tiến trình nền đọc bảng đó và gửi lên Kafka.',
        },
      ],
      followUps: [
        'Outbox pattern giải quyết vấn đề gì?',
        'Gọi đồng bộ qua HTTP và giao tiếp bất đồng bộ qua message, chọn khi nào?',
        'Khi nào KHÔNG nên tách microservice?',
      ],
      buoi: [32, 42],
    },
  ],
}

export default backend
