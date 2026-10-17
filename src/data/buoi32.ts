import type { Buoi } from './types'

const buoi32: Buoi = {
  id: 32,
  slug: 'web-api-co-ban-aspnet-core',
  title: 'Web API cơ bản với ASP.NET Core',
  subtitle: 'Một backend phục vụ mọi ứng dụng: tạo dự án webapi, controller, route, attribute HTTP và thử bằng Swagger',
  duration: '3 giờ',
  keywords: ['dotnet new webapi', 'ControllerBase', '[ApiController]', '[Route]', '[HttpGet]', 'Swagger', 'RESTful'],
  goals: [
    'Tạo và chạy dự án Web API bằng dotnet CLI, đọc được cấu trúc thư mục',
    'Phân biệt kiến trúc monolithic và microservice, hiểu vai trò của Web API',
    'Viết controller với [ApiController], [Route] và các attribute HTTP',
    'Thử API bằng Swagger và nhận diện các thành phần của một HTTP request',
  ],

  sections: [
    {
      id: 'net-core-cai-dat',
      title: '1. .NET Core, cài đặt và tạo dự án',
      blocks: [
        {
          type: 'text',
          text: '.NET có hai dòng: .NET Framework (cũ, chỉ chạy Windows) và .NET Core — nay gọi gọn là .NET 5, 6, 7, 8. .NET Core là nền tảng mã nguồn mở, đa nền tảng của Microsoft, chạy trên Windows, macOS, Linux, hiệu suất cao, triển khai linh hoạt, tối ưu cho web, dịch vụ và microservices. Khoá học dùng .NET 8.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Hai dòng .NET',
            columns: [
              { title: '.NET Framework', tone: 'bad', items: ['Chỉ Windows', 'Bản cuối 4.8, không phát triển tính năng mới', 'Deploy chủ yếu lên IIS', 'Mã nguồn đóng phần lớn'] },
              { title: '.NET Core / .NET 8', tone: 'good', items: ['Windows, macOS, Linux', 'Ra phiên bản mới mỗi năm', 'Docker, cloud, IIS đều được', 'Mã nguồn mở trên GitHub'] },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Chuẩn bị môi trường',
            items: [
              { label: 'IDE', text: 'Rider (JetBrains) hoặc VS Code + C# Dev Kit' },
              { label: 'SDK', text: 'Cài .NET 8 SDK theo hệ điều hành từ dotnet.microsoft.com' },
              { label: 'Snippet', text: 'Extension .NET Core Snippets (doggy8088) để gõ nhanh controller, property' },
              { label: 'Tạo dự án', text: 'dotnet new webapi -o CuaHangApi' },
              { label: 'Chạy', text: 'dotnet watch — sửa code là tự build lại' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Tạo và chạy dự án Web API',
            code: `dotnet --version                       # kiểm tra đã có SDK 8.x
dotnet new webapi -o CuaHangApi --use-controllers
cd CuaHangApi
dotnet watch`,
            note: 'Từ .NET 8, mẫu webapi mặc định dùng Minimal API; thêm --use-controllers để có thư mục Controllers như slide. dotnet watch tự mở Swagger và reload khi lưu file.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Cấu trúc dự án sau khi tạo',
            root: {
              label: 'CuaHangApi/',
              children: [
                { label: 'bin/', note: 'file đã biên dịch, chia Debug / Release' },
                { label: 'obj/', note: 'file tạm của MSBuild khi biên dịch' },
                { label: 'Properties/', children: [{ label: 'launchSettings.json', note: 'cổng chạy, môi trường Development' }] },
                { label: 'Controllers/', note: 'các API controller', highlight: true },
                { label: 'Models/', note: 'class dữ liệu: SanPham, User… (tự tạo)', highlight: true },
                { label: 'appsettings.json', note: 'cấu hình chung: chuỗi kết nối, logging' },
                { label: 'appsettings.Development.json', note: 'ghi đè khi chạy Development' },
                { label: 'CuaHangApi.csproj', note: 'gói NuGet, TargetFramework' },
                { label: 'CuaHangApi.http', note: 'gửi thử request ngay trong IDE' },
                { label: 'Program.cs', note: 'điểm vào, cấu hình host và middleware', highlight: true },
              ],
            },
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Không commit bin/ và obj/',
          text: 'Hai thư mục này sinh lại mỗi lần build, nặng và khác nhau giữa các máy. Tạo .gitignore bằng dotnet new gitignore trước lần commit đầu tiên.',
        },
      ],
    },
    {
      id: 'kien-truc-web-api',
      title: '2. Kiến trúc và vai trò của Web API',
      blocks: [
        {
          type: 'text',
          text: 'Tiki, Lazada, TikTok đều có cả app điện thoại lẫn website, đặt hàng ở đâu thì đơn cũng nằm chung một chỗ. Lý do: mọi ứng dụng đều gọi chung một Web API (Application Programming Interface) qua Internet. API nhận request HTTP, xử lý, trả về dữ liệu JSON — không trả về giao diện.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Nhiều ứng dụng cùng gọi một API',
            actors: ['Mobile app', 'Web app (Blazor)', 'Web API', 'Database'],
            steps: [
              { from: 0, to: 2, text: 'POST /api/donhang' },
              { from: 2, to: 3, text: 'INSERT DonHang' },
              { from: 2, to: 0, text: '201 Created + JSON', dashed: true },
              { from: 1, to: 2, text: 'GET /api/donhang' },
              { from: 2, to: 3, text: 'SELECT' },
              { from: 2, to: 1, text: '200 OK + danh sách đơn (có đơn vừa đặt từ app)', dashed: true },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Monolithic và Microservices',
            columns: [
              { title: 'Monolithic (đơn khối)', tone: 'plain', items: ['Giao diện và xử lý chung một dự án', 'Ví dụ ASP.NET MVC với trang Razor', 'Deploy một lần cả khối', 'Dễ bắt đầu, khó mở rộng khi lớn'] },
              { title: 'Microservices (vi mô)', tone: 'good', items: ['Nhiều dịch vụ nhỏ độc lập', 'Frontend Blazor gọi backend qua API', 'Điều phối qua API Gateway', 'Mỗi dịch vụ deploy, scale riêng'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Separation of Concerns',
          text: 'Tách frontend và backend: frontend lo hiển thị, backend lo dữ liệu và nghiệp vụ, hai bên nói chuyện qua API. Đổi giao diện không phải sửa backend, thêm app mobile không phải viết lại nghiệp vụ.',
        },
        {
          type: 'text',
          text: 'Web API trong ASP.NET Core theo mẫu MVC nhưng bỏ phần View: Controllers chứa các API, Models chứa class định dạng dữ liệu trao đổi (User.cs, SanPham.cs…), Properties chứa launchSettings.json, wwwroot chứa file tĩnh nếu cần.',
        },
      ],
    },
    {
      id: 'controller-route',
      title: '3. Controller, route và attribute',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'Models/User.cs',
            code: `namespace CuaHangApi.Models;

public class User
{
    public int? id { get; set; }
    public string? name { get; set; }
    public string? email { get; set; }
    public string? phone { get; set; }
}`,
            note: 'Giữ đúng tên thuộc tính như slide gốc. JSON trả về mặc định dùng camelCase, nên dù đặt Id hay id thì client đều nhận "id".',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Controllers/UserController.cs',
            code: `using Microsoft.AspNetCore.Mvc;   // Controller, Route, HttpGet…
using CuaHangApi.Models;

namespace CuaHangApi.Controllers;

[Route("api/users")]     // tiền tố route của cả controller
[ApiController]          // bật các tính năng API: tự trả JSON, tự kiểm tra model
public class UserController : ControllerBase
{
    [Route("getall")]
    [HttpGet]
    public IEnumerable<User> GetAll()
    {
        List<User> lstUser = new List<User>();
        for (int id = 1; id < 6; id++)
        {
            User us = new User();
            us.id = id;
            us.name = $"User {id}";
            us.email = $"user{id}@gmail.com";
            us.phone = $"09090909{id}";
            lstUser.Add(us);
        }
        return lstUser;
    }
}`,
            note: 'URL đầy đủ = route controller + route action: GET /api/users/getall. Kế thừa ControllerBase (không phải Controller) vì API không cần View.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Request GET /api/users/getall đi qua đâu',
            steps: [
              { kind: 'start', text: 'Client gửi GET /api/users/getall' },
              { kind: 'process', text: 'Routing so URL với [Route] của các controller' },
              { kind: 'decision', text: 'Có action khớp URL và method GET?', branches: [
                { label: 'Có', steps: [
                  { kind: 'process', text: 'Tạo UserController, gọi GetAll()' },
                  { kind: 'process', text: 'Serialize List<User> thành JSON' },
                  { kind: 'end', text: '200 OK + [ { "id": 1, … } ]' },
                ] },
                { label: 'Sai URL', steps: [{ kind: 'io', text: '404 Not Found' }] },
                { label: 'Đúng URL, sai method', steps: [{ kind: 'io', text: '405 Method Not Allowed' }] },
              ] },
            ],
          },
        },
        {
          type: 'table',
          head: ['Attribute', 'Tác dụng', 'Ví dụ'],
          rows: [
            ['[ApiController]', 'Bật hành vi API: tự trả 400 khi dữ liệu sai, suy luận nguồn tham số', 'Đặt trên class controller'],
            ['[Route("...")]', 'Định nghĩa URL cho controller hoặc action', '[Route("api/[controller]")]'],
            ['[HttpGet]', 'Xử lý GET — đọc dữ liệu', '[HttpGet("get/{id}")]'],
            ['[HttpPost]', 'Xử lý POST — tạo mới', '[HttpPost("create")]'],
            ['[HttpPut]', 'Xử lý PUT — cập nhật', '[HttpPut("update/{id}")]'],
            ['[HttpDelete]', 'Xử lý DELETE — xoá', '[HttpDelete("delete/{id}")]'],
            ['[FromBody]', 'Lấy dữ liệu từ body JSON', 'Create([FromBody] User u)'],
            ['[FromRoute]', 'Lấy dữ liệu từ đoạn URL', 'Get([FromRoute] int id)'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'Gộp route vào attribute HTTP',
            code: `[Route("api/[controller]")]   // [controller] = "User" (bỏ hậu tố Controller)
[ApiController]
public class UserController : ControllerBase
{
    private static List<User> dsUser = new()
    {
        new User { id = 1, name = "An", email = "an@gmail.com", phone = "0901" },
        new User { id = 2, name = "Bình", email = "binh@gmail.com", phone = "0902" },
    };

    [HttpGet("getall")]              // GET /api/User/getall
    public IEnumerable<User> GetAll() => dsUser;

    [HttpGet("get/{id}")]            // GET /api/User/get/2
    public User? Get([FromRoute] int id) => dsUser.FirstOrDefault(u => u.id == id);
}`,
            note: 'Dữ liệu để trong biến static vì mỗi request ASP.NET Core tạo một controller mới — biến thường sẽ mất sau mỗi request. Buổi sau trả về NotFound thay cho null.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Hai action trùng route',
          text: 'Hai action cùng [HttpGet] mà không có route riêng sẽ ném AmbiguousMatchException khi gọi, và Swagger báo lỗi không tải được tài liệu. Mỗi action phải có cặp (method, URL) duy nhất.',
        },
      ],
    },
    {
      id: 'swagger-rest-http',
      title: '4. Swagger, RESTful và cấu trúc HTTP request',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'Program.cs — bật controller và Swagger',
            code: `var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();            // quét các class có [ApiController]
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();             // sinh tài liệu từ các [Route]

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();                       // giao diện tại /swagger
}

app.UseHttpsRedirection();
app.MapControllers();                         // gắn route của controller
app.Run();`,
            note: 'Quên MapControllers thì mọi URL đều 404 dù controller viết đúng. Swagger căn cứ vào các [Route] / [HttpGet] trong controller để liệt kê API lên trang tài liệu.',
          },
        },
        {
          type: 'text',
          text: 'REST (Representational State Transfer) là bộ nguyên tắc: tài nguyên định danh bằng URL, thao tác bằng phương thức HTTP (GET, POST, PUT, DELETE) tương ứng CRUD. API dùng phần lớn nguyên tắc REST gọi là REST API; tuân thủ đầy đủ thì gọi là RESTful API.',
        },
        {
          type: 'table',
          head: ['Thao tác', 'Kiểu slide (động từ trên URL)', 'Kiểu RESTful'],
          rows: [
            ['Lấy tất cả', 'GET /api/users/getall', 'GET /api/users'],
            ['Lấy một', 'GET /api/users/get/5', 'GET /api/users/5'],
            ['Tạo', 'POST /api/users/create', 'POST /api/users'],
            ['Cập nhật', 'PUT /api/users/update/5', 'PUT /api/users/5'],
            ['Xoá', 'DELETE /api/users/delete/5', 'DELETE /api/users/5'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'boxes',
            caption: 'Năm thành phần của một HTTP request',
            items: [
              { label: 'Request line', value: 'PUT /api/users/update/5 HTTP/1.1', note: 'phương thức, URL, phiên bản' },
              { label: 'Headers', value: 'Content-Type: application/json', note: 'cặp key-value bổ sung' },
              { label: 'Body', value: '{ "name": "An", "email": "an@gmail.com" }', note: 'POST, PUT, PATCH' },
              { label: 'Query', value: '?keyword=tivi&page=2', note: 'lọc, tìm, phân trang' },
              { label: 'Cookies', value: 'session=abc123', note: 'duy trì phiên làm việc' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'CuaHangApi.http — gửi thử ngay trong IDE',
            code: `@host = http://localhost:5000

GET {{host}}/api/users/getall

###
POST {{host}}/api/users/create
Content-Type: application/json

{ "id": 6, "name": "Cường", "email": "cuong@gmail.com", "phone": "0906" }`,
            note: 'Mỗi request cách nhau bằng ###. Header Content-Type: application/json là bắt buộc với POST có body, thiếu sẽ nhận 415 Unsupported Media Type.',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Swagger là công cụ thử, không phải giao diện người dùng',
          text: 'Bấm Try it out → Execute để gửi request, xem status code, header, JSON trả về. Đọc kỹ ô Request URL Swagger sinh ra để hiểu URL thật của từng action.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b32-1', level: 'Cơ bản', title: 'Khởi tạo dự án Web API',
      requirement: 'Tạo dự án CuaHangApi bằng dotnet CLI có thư mục Controllers, chạy bằng dotnet watch và mở trang Swagger. Ghi lại vai trò của bin, obj, Properties, appsettings.json, .csproj, .http và Program.cs.',
      signature: 'dotnet new webapi -o CuaHangApi --use-controllers',
      examples: [
        { input: 'dotnet watch', output: 'Trình duyệt mở http://localhost:xxxx/swagger có API WeatherForecast' },
      ],
    },
    {
      id: 'b32-2', level: 'Cơ bản', title: 'API danh sách user đầu tiên',
      requirement: 'Cho model User (id, name, email, phone). Xây dựng UserController với route api/users và action GetAll sinh 5 user bằng vòng lặp như slide.',
      signature: '[HttpGet("getall")] IEnumerable<User> GetAll()',
      examples: [
        { input: 'GET /api/users/getall', output: '[{"id":1,"name":"User 1","email":"user1@gmail.com","phone":"090909091"}, …5 phần tử]' },
        { input: 'POST /api/users/getall', output: '405 Method Not Allowed', explain: 'URL khớp nhưng action chỉ nhận GET.' },
      ],
    },
    {
      id: 'b32-3', level: 'Trung bình', title: 'CRUD người dùng với List static',
      requirement: 'Cho model User và một danh sách static List<User> khởi tạo sẵn 3 người. Xây dựng UserController đủ 5 API dưới đây, chọn attribute phù hợp cho từng phương thức.',
      tasks: [
        'GET /api/users/getall: lấy tất cả người dùng',
        'GET /api/users/get/{id}: lấy người dùng theo id',
        'POST /api/users/create: tạo mới người dùng từ body JSON',
        'PUT /api/users/update/{id}: cập nhật người dùng theo id',
        'DELETE /api/users/delete/{id}: xoá người dùng theo id',
      ],
      constraints: ['Dữ liệu lưu trong biến private static List<User>', 'id tạo mới = id lớn nhất hiện có + 1'],
      examples: [
        { input: 'POST /api/users/create body {"name":"Dũng","email":"dung@gmail.com","phone":"0904"}', output: 'Trả về user có id = 4' },
        { input: 'DELETE /api/users/delete/2 rồi GET /api/users/getall', output: 'Còn 3 user: id 1, 3, 4', explain: 'Biến static sống suốt vòng đời ứng dụng nên thay đổi được giữ giữa các request (mất khi khởi động lại).' },
      ],
      visual: {
        kind: 'uml',
        children: [
          { name: 'User', attrs: ['+ id: int?', '+ name: string?', '+ email: string?', '+ phone: string?'] },
          { name: 'UserController', stereotype: 'ControllerBase', attrs: ['- static dsUser: List<User>'], methods: ['+ GetAll()', '+ Get(id)', '+ Create(user)', '+ Update(id, user)', '+ Delete(id)'] },
        ],
      },
      dense: true,
    },
    {
      id: 'b32-4', level: 'Trung bình', title: 'API sản phẩm cửa hàng điện máy',
      requirement: 'Cho model SanPham (Ma, Ten, Gia, NhomHang). Xây dựng ProductApiController theo đúng 5 route của slide thực hành, dữ liệu 5 sản phẩm điện máy trong List static.',
      tasks: [
        'GET /api/ProductApi/getall',
        'GET /api/ProductApi/get/{id}',
        'POST /api/ProductApi/create',
        'PUT /api/ProductApi/update/{id}',
        'DELETE /api/ProductApi/delete/{id}',
      ],
      signature: '[Route("api/[controller]")] public class ProductApiController : ControllerBase',
      examples: [
        { input: 'GET /api/ProductApi/get/TV01', output: '{"ma":"TV01","ten":"Tivi Samsung 55 inch","gia":12990000,"nhomHang":"Điện tử"}' },
        { input: 'PUT /api/ProductApi/update/TV01 body {"gia":11990000, …}', output: 'Sản phẩm TV01 có giá mới 11990000' },
      ],
    },
    {
      id: 'b32-5', level: 'Trung bình', title: 'Đọc HTTP request',
      requirement: 'Cho request bên dưới gửi tới API cửa hàng. Xác định 5 thành phần (request line, headers, body, query, cookies) và cho biết action nào trong controller nhận nó.',
      signature: 'PUT /api/ProductApi/update/TL01?thongBao=true HTTP/1.1 · Content-Type: application/json · Cookie: session=x1 · body {"ten":"Tủ lạnh LG","gia":9990000}',
      examples: [
        { input: 'Thành phần query', output: 'thongBao=true' },
        { input: 'Action nhận request', output: '[HttpPut("update/{id}")] Update, id = "TL01"', explain: 'Query string không thuộc route, nên ?thongBao=true không ảnh hưởng việc khớp action.' },
      ],
    },
    {
      id: 'b32-6', level: 'Nâng cao', title: 'Chuyển sang URL RESTful',
      requirement: 'Cho UserController bài 3 dùng URL có động từ. Viết lại toàn bộ thành RESTful: một URL /api/users cho tập hợp, /api/users/{id} cho từng phần tử, phân biệt thao tác bằng phương thức HTTP.',
      constraints: ['Không dùng các chữ getall, get, create, update, delete trên URL', 'Dùng {id:int} để /api/users/abc không khớp'],
      examples: [
        { input: 'GET /api/users/abc', output: '404 Not Found', explain: 'Ràng buộc :int làm route không khớp, khác với 400 khi khớp route nhưng dữ liệu sai.' },
        { input: 'DELETE /api/users/3', output: 'Xoá user id 3' },
      ],
      visual: {
        kind: 'map',
        name: 'Phương thức + URL → action',
        pairs: [
          { key: 'GET /api/users', value: 'GetAll' },
          { key: 'GET /api/users/{id}', value: 'Get' },
          { key: 'POST /api/users', value: 'Create' },
          { key: 'PUT /api/users/{id}', value: 'Update' },
          { key: 'DELETE /api/users/{id}', value: 'Delete' },
        ],
      },
    },
    {
      id: 'b32-7', level: 'Nâng cao', title: 'Gỡ lỗi route',
      requirement: 'Cho controller có lỗi dưới đây. Tìm và sửa để cả hai API chạy được, giải thích vì sao Swagger báo lỗi.',
      signature: '[Route("api/khachhang")] class KhachHangController : ControllerBase { [HttpGet] GetAll() … [HttpGet] TimTheoTen(string ten) … }',
      tasks: [
        'Giải thích lỗi khi mở Swagger',
        'Sửa route để GetAll là GET /api/khachhang và TimTheoTen là GET /api/khachhang/tim?ten=…',
        'Thêm thiếu sót trong Program.cs nếu gọi API bị 404 toàn bộ',
      ],
      examples: [
        { input: 'Mở /swagger trước khi sửa', output: 'Failed to load API definition', explain: 'Hai action cùng GET cùng URL → xung đột, Swagger không sinh được tài liệu.' },
        { input: 'GET /api/khachhang/tim?ten=An sau khi sửa', output: 'Danh sách khách có tên chứa "An"' },
      ],
      hint: 'Kiểm tra AddControllers và MapControllers trong Program.cs.',
    },
    {
      id: 'b32-8', level: 'Nâng cao', title: 'Thiết kế API cho cửa hàng điện máy',
      requirement: 'Thiết kế bảng API cho cửa hàng gồm sản phẩm, khách hàng, đơn hàng và chi tiết đơn hàng: mỗi dòng ghi phương thức, URL RESTful, nguồn dữ liệu đầu vào (route, query, body) và ý nghĩa. Cài đặt controller cho phần đơn hàng với dữ liệu static.',
      tasks: [
        'Bảng ít nhất 14 API',
        'Lọc đơn theo khách và trạng thái bằng query string',
        'Lấy chi tiết của một đơn bằng URL lồng: /api/donhang/{id}/chitiet',
        'Cài đặt DonHangController với GetAll, Get, Create',
      ],
      examples: [
        { input: 'Đơn của khách KH01 đang giao', output: 'GET /api/donhang?maKhach=KH01&trangThai=dang-giao' },
        { input: 'Các dòng của đơn 15', output: 'GET /api/donhang/15/chitiet → List<ChiTietDonHang>' },
      ],
      hint: 'Danh từ số nhiều cho tài nguyên; thứ dùng để lọc thì để trên query, thứ định danh thì để trên route.',
      visual: {
        kind: 'tree',
        root: {
          label: '/api',
          children: [
            { label: 'sanpham', children: [{ label: '{ma}' }] },
            { label: 'khachhang', children: [{ label: '{ma}', children: [{ label: 'donhang', note: 'đơn của một khách' }] }] },
            { label: 'donhang', highlight: true, children: [{ label: '{id}', children: [{ label: 'chitiet' }] }] },
          ],
        },
      },
    },
  ],
}

export default buoi32
