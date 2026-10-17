import type { Buoi } from './types'

const buoi31: Buoi = {
  id: 31,
  slug: 'trien-khai-ung-dung-blazor',
  title: 'Triển khai ứng dụng Blazor',
  subtitle: 'Từ máy lập trình lên Internet: build, publish, cấu hình môi trường, Somee, Azure App Service và Docker',
  duration: '3 giờ',
  keywords: ['dotnet publish', 'ASPNETCORE_ENVIRONMENT', 'appsettings.Production.json', 'Somee', 'Azure App Service', 'Dockerfile', 'UseUrls'],
  goals: [
    'Phân biệt build và publish, đọc được thư mục publish',
    'Tách cấu hình theo môi trường Development / Production',
    'Đưa ứng dụng Blazor lên Somee và Azure App Service có CI/CD từ GitHub',
    'Đóng gói ứng dụng bằng Dockerfile multi-stage và chạy container cổng 80',
  ],

  sections: [
    {
      id: 'build-publish',
      title: '1. Deploy là gì — build khác publish thế nào',
      blocks: [
        {
          type: 'text',
          text: 'Deploy .NET là quá trình đưa ứng dụng đang chạy trên máy lập trình lên môi trường thực tế để người dùng truy cập. Quá trình gồm ba bước: Build (biên dịch mã nguồn thành DLL), Publish (gom DLL, thư viện, file tĩnh thành một thư mục sẵn sàng chạy) và Host (chọn nơi chạy: IIS trên Windows, Nginx/Apache trên Linux, hoặc dịch vụ cloud như Azure, AWS).',
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Ba bước đưa cửa hàng điện máy lên mạng',
            items: [
              { label: 'Build', text: 'dotnet build — biên dịch ra bin/Debug/net8.0, chỉ để chạy thử trên máy' },
              { label: 'Publish', text: 'dotnet publish -c Release -o ./publish — bản tối ưu, đủ mọi thứ cần để chạy' },
              { label: 'Cấu hình', text: 'ASPNETCORE_ENVIRONMENT=Production, appsettings.Production.json' },
              { label: 'Host', text: 'Somee (upload zip), Azure App Service (GitHub CI/CD) hoặc Docker container' },
              { label: 'Kiểm tra', text: 'Mở domain, xem log, thử các trang /san-pham, /don-hang' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Build và publish từ terminal',
            code: `# Biên dịch để kiểm tra lỗi (cấu hình Debug)
dotnet build

# Xuất bản bản Release vào thư mục ./publish
dotnet publish -c Release -o ./publish

# Chạy thử bản publish ngay trên máy
cd publish
dotnet CuaHangDienMay.dll`,
            note: 'Bản publish chạy bằng dotnet TenDuAn.dll, không cần mã nguồn và không cần SDK — máy chủ chỉ cần ASP.NET Core Runtime. Luôn chạy thử bản publish trên máy trước khi upload.',
          },
        },
        {
          type: 'table',
          head: ['', 'dotnet build', 'dotnet publish -c Release'],
          rows: [
            ['Mục đích', 'Kiểm tra biên dịch, chạy khi lập trình', 'Tạo gói để đưa lên máy chủ'],
            ['Thư mục ra', 'bin/Debug/net8.0', './publish (do -o chỉ định)'],
            ['Tối ưu', 'Không, có thông tin debug', 'Có, mã được tối ưu'],
            ['wwwroot', 'Đọc thẳng từ thư mục dự án', 'Được chép vào publish/wwwroot'],
            ['Chạy bằng', 'dotnet run / dotnet watch', 'dotnet CuaHangDienMay.dll'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Bên trong thư mục publish',
            root: {
              label: 'publish/',
              children: [
                { label: 'CuaHangDienMay.dll', note: 'mã của ta, file khởi chạy', highlight: true },
                { label: 'CuaHangDienMay.deps.json', note: 'danh sách thư viện phụ thuộc' },
                { label: 'CuaHangDienMay.runtimeconfig.json', note: 'yêu cầu runtime net8.0' },
                { label: 'appsettings.json', note: 'cấu hình chung' },
                { label: 'appsettings.Production.json', note: 'ghi đè khi chạy Production', highlight: true },
                { label: 'web.config', note: 'dành cho IIS / Somee' },
                { label: 'Microsoft.EntityFrameworkCore.dll …', note: 'các gói NuGet' },
                { label: 'wwwroot/', note: 'css, js, hình ảnh', children: [{ label: 'css/' }, { label: '_framework/', note: 'chỉ có ở Blazor WebAssembly' }] },
              ],
            },
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Upload nhầm thư mục bin/Debug',
          text: 'Lỗi hay gặp nhất: nén thư mục dự án hoặc bin/Debug rồi upload. Máy chủ cần đúng nội dung thư mục publish — nén các file BÊN TRONG publish, không nén cả mã nguồn.',
        },
      ],
    },
    {
      id: 'moi-truong',
      title: '2. Cấu hình theo môi trường',
      blocks: [
        {
          type: 'text',
          text: 'Cùng một bản publish chạy ở nhiều nơi: máy lập trình dùng SQL Server cục bộ, máy chủ thật dùng database trên cloud. ASP.NET Core đọc biến môi trường ASPNETCORE_ENVIRONMENT để biết đang chạy ở đâu, rồi nạp appsettings.json trước và appsettings.{Môi trường}.json sau — file sau ghi đè khoá trùng tên.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Ứng dụng khởi động nạp cấu hình',
            steps: [
              { kind: 'start', text: 'dotnet CuaHangDienMay.dll' },
              { kind: 'process', text: 'Đọc appsettings.json' },
              { kind: 'decision', text: 'ASPNETCORE_ENVIRONMENT = ?', branches: [
                { label: 'Development', steps: [{ kind: 'process', text: 'Ghi đè bằng appsettings.Development.json' }] },
                { label: 'Production / không đặt', steps: [{ kind: 'process', text: 'Ghi đè bằng appsettings.Production.json' }] },
              ] },
              { kind: 'process', text: 'Ghi đè tiếp bằng biến môi trường của máy chủ' },
              { kind: 'end', text: 'builder.Configuration sẵn sàng' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'json',
            title: 'appsettings.Production.json',
            code: `{
  "ConnectionStrings": {
    "CuaHangDb": "Server=tcp:cuahang.database.windows.net;Database=CuaHang;User Id=appuser;Password=***;"
  },
  "Logging": {
    "LogLevel": { "Default": "Warning" }
  },
  "ApiGoc": "https://api.cuahangdienmay.vn/"
}`,
            note: 'Chỉ ghi những khoá KHÁC với appsettings.json. Mật khẩu thật không nên commit lên GitHub — đặt trong Configuration của Azure hoặc biến môi trường.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Program.cs — hành vi khác nhau theo môi trường',
            code: `var builder = WebApplication.CreateBuilder(args);
string chuoiKetNoi = builder.Configuration.GetConnectionString("CuaHangDb")!;

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");   // trang lỗi thân thiện
    app.UseHsts();
}

Console.WriteLine($"Môi trường: {app.Environment.EnvironmentName}");`,
            note: 'Không đặt ASPNETCORE_ENVIRONMENT thì mặc định là Production. launchSettings.json chỉ dùng khi chạy dotnet run trên máy — nó không được publish.',
          },
        },
        {
          type: 'table',
          head: ['Nơi chạy', 'Cách đặt ASPNETCORE_ENVIRONMENT'],
          rows: [
            ['Máy lập trình', 'Properties/launchSettings.json (đã có sẵn Development)'],
            ['Terminal macOS/Linux', 'export ASPNETCORE_ENVIRONMENT=Production'],
            ['Azure App Service', 'Settings → Environment variables → thêm khoá'],
            ['Docker', 'ENV ASPNETCORE_ENVIRONMENT=Production hoặc docker run -e'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Tên file phải khớp tuyệt đối',
          text: 'Máy chủ Linux phân biệt hoa thường: appsettings.production.json sẽ KHÔNG được nạp khi môi trường là Production. Giữ đúng appsettings.Production.json.',
        },
      ],
    },
    {
      id: 'somee-azure',
      title: '3. Deploy lên Somee và Azure App Service',
      blocks: [
        {
          type: 'text',
          text: 'Somee là hosting miễn phí hỗ trợ ASP.NET và .NET Core, quản lý file qua giao diện web — hợp để nộp bài, demo nhanh. Azure App Service là dịch vụ của Microsoft, kết nối GitHub để mỗi lần push code là máy chủ tự build và cập nhật (CI/CD).',
        },
        {
          type: 'tabs',
          items: [
            {
              label: 'Somee — 4 bước',
              hint: 'Upload zip thư mục publish',
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'Vào somee.com đăng ký một tài khoản.',
                    'Vào Control panel, thêm gói 0 đồng (free) vào giỏ hàng và hoàn tất.',
                    'Dashboard → Websites → Create website: chọn phiên bản .NET khớp dự án, đặt tên miền con (vd cuahangdienmay.somee.com).',
                    'Vào website vừa tạo → File manager → Upload zip: nén các file trong thư mục publish, upload, đợi khoảng 5 phút rồi mở domain.',
                  ],
                },
                {
                  type: 'callout',
                  tone: 'warn',
                  title: 'Trang trắng hoặc lỗi 500.30',
                  text: 'Thường do chọn sai phiên bản .NET khi tạo website, hoặc zip có thêm một lớp thư mục publish/ bên ngoài nên web.config không nằm ở gốc. Mở zip ra kiểm tra: web.config phải ở cấp đầu tiên.',
                },
              ],
            },
            {
              label: 'Azure — Portal + GitHub',
              hint: 'App Service tự build khi push',
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'Tạo tài khoản Azure, đăng ký gói dùng thử 200$ miễn phí.',
                    'Tạo Subscription (ví dụ đặt tên First Deploy).',
                    'Trong subscription tạo Resource group (ví dụ webappblazor_group).',
                    'Tạo App Service (ví dụ CybersoftWeb): chọn subscription, resource group, Runtime stack .NET 8, hệ điều hành, khu vực đặt máy chủ.',
                    'Vào App Service → Deployment Center → Source: GitHub, chọn repo và nhánh main.',
                    'Azure tự sinh file workflow GitHub Actions; mỗi lần push lên main, code trên máy chủ được cập nhật theo.',
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'CI/CD: push code là máy chủ tự cập nhật',
            actors: ['Lập trình viên', 'GitHub', 'GitHub Actions', 'Azure App Service'],
            steps: [
              { from: 0, to: 1, text: 'git push origin main' },
              { from: 1, to: 2, text: 'kích hoạt workflow' },
              { from: 2, to: 2, text: 'dotnet build + dotnet publish' },
              { from: 2, to: 3, text: 'đẩy gói publish lên' },
              { from: 3, to: 3, text: 'khởi động lại ứng dụng' },
              { from: 3, to: 0, text: 'https://cybersoftweb.azurewebsites.net chạy bản mới', dashed: true },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Chọn nơi deploy',
            columns: [
              { title: 'Somee', tone: 'plain', items: ['Miễn phí, nhanh', 'Upload zip thủ công', 'Có quảng cáo, giới hạn tài nguyên', 'Hợp nộp bài, demo'] },
              { title: 'Azure App Service', tone: 'good', items: ['CI/CD từ GitHub', 'Biến môi trường, log, scale', 'Tính phí sau gói dùng thử', 'Hợp dự án thật'] },
              { title: 'Docker', tone: 'good', items: ['Chạy giống hệt trên mọi máy', 'Deploy lên VPS bất kỳ', 'Phải học thêm Docker', 'Xu hướng chung hiện nay'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Xem log khi lỗi',
          text: 'Trên Azure: App Service → Log stream để xem lỗi lúc khởi động (sai chuỗi kết nối, thiếu file cấu hình). Đừng đoán mò khi chỉ thấy trang lỗi 500.',
        },
      ],
    },
    {
      id: 'docker',
      title: '4. Đóng gói bằng Docker',
      blocks: [
        {
          type: 'text',
          text: 'Dự án .NET truyền thống deploy lên IIS trên Windows Server. Xu hướng hiện nay là chạy trong Docker container: môi trường giống nhau trên mọi hệ điều hành, cập nhật và bảo trì dễ. Dockerfile multi-stage dùng image SDK (nặng) để build, rồi chỉ chép kết quả publish sang image runtime (nhẹ).',
        },
        {
          type: 'code',
          sample: {
            lang: 'dockerfile',
            title: 'Dockerfile multi-stage cho .NET 8',
            code: `# Giai đoạn 1: build bằng image SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY *.csproj ./
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app/publish

# Giai đoạn 2: chạy bằng image runtime nhẹ
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 80
ENTRYPOINT ["dotnet", "CuaHangDienMay.dll"]`,
            note: 'COPY csproj và restore TRƯỚC khi copy toàn bộ code: Docker cache lớp restore, lần sau sửa code không phải tải lại NuGet. Image cuối không chứa SDK hay mã nguồn.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'docker build chạy hai giai đoạn',
            steps: [
              { kind: 'start', text: 'docker build -t web_api_base .' },
              { kind: 'process', text: 'Stage build: image sdk:8.0, restore, publish → /app/publish' },
              { kind: 'process', text: 'Stage final: image aspnet:8.0, COPY --from=build' },
              { kind: 'note', text: 'Stage build bị bỏ, không nằm trong image cuối' },
              { kind: 'process', text: 'docker run -d -p 4321:80 …' },
              { kind: 'decision', text: 'Ứng dụng nghe cổng 80?', branches: [
                { label: 'Có', steps: [{ kind: 'end', text: 'Mở http://localhost:4321 chạy được' }] },
                { label: 'Không (.NET 8 mặc định 8080)', steps: [{ kind: 'io', text: 'Trình duyệt báo không kết nối được' }] },
              ] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Program.cs — cấu hình cổng lắng nghe khi chạy trong container',
            code: `var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://*:80");

// … AddRazorComponents, AddDbContext …

var app = builder.Build();
// Cách khác tương đương: app.Urls.Add("http://*:80");
app.Run();`,
            note: 'Từ .NET 8 image aspnet mặc định nghe cổng 8080. Dockerfile EXPOSE 80 và docker run -p 4321:80 thì ứng dụng phải nghe đúng 80, nên slide gốc thêm UseUrls("http://*:80").',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Build image và chạy container',
            code: `docker build -t web_api_base .
docker run -d -p 4321:80 --name web_api_deploy4321 web_api_base

docker ps                       # xem container đang chạy
docker logs web_api_deploy4321  # xem log khi lỗi
docker rm -f web_api_deploy4321 # xoá để chạy lại bản mới`,
            note: '-p 4321:80 nghĩa là cổng 4321 của máy thật nối vào cổng 80 trong container. Tên container trùng sẽ báo lỗi khi run lần hai — xoá container cũ trước.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Nhiều container: docker compose',
          text: 'Khi có cả web, API và SQL Server, khai báo tất cả trong docker-compose.yml rồi chạy docker compose up --build. Ứng dụng gọi API trong mạng compose qua tên service (http://api:80) chứ không phải localhost — HttpClient cần cấu hình lại địa chỉ gốc.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b31-1', level: 'Cơ bản', title: 'Publish và chạy thử trên máy',
      requirement: 'Cho dự án Blazor cửa hàng điện máy đã hoàn chỉnh. Xuất bản bản Release vào thư mục ./publish, chạy bản publish bằng lệnh dotnet và liệt kê vai trò của 5 file trong thư mục publish.',
      signature: 'dotnet publish -c Release -o ./publish · dotnet CuaHangDienMay.dll',
      examples: [
        { input: 'cd publish && dotnet CuaHangDienMay.dll', output: 'Now listening on: http://localhost:5000', explain: 'Bản publish không đọc launchSettings.json nên cổng là mặc định 5000, không phải cổng lúc dotnet run.' },
      ],
    },
    {
      id: 'b31-2', level: 'Cơ bản', title: 'Tách cấu hình Production',
      requirement: 'Cho appsettings.json có khoá "TenCuaHang": "Điện máy (DEV)". Tạo appsettings.Production.json ghi đè thành "Điện máy Xanh". Trang chủ hiển thị TenCuaHang đọc từ IConfiguration.',
      signature: '@inject IConfiguration Config · Config["TenCuaHang"]',
      examples: [
        { input: 'dotnet run (Development)', output: 'Điện máy (DEV)' },
        { input: 'ASPNETCORE_ENVIRONMENT=Production dotnet run', output: 'Điện máy Xanh' },
      ],
    },
    {
      id: 'b31-3', level: 'Trung bình', title: 'Deploy lên Somee',
      requirement: 'Cho bản publish của bài 1. Đưa ứng dụng lên Somee theo 4 bước và nộp đường link chạy được.',
      tasks: [
        'Tạo tài khoản và gói free trên somee.com',
        'Tạo website đúng phiên bản .NET 8',
        'Nén các file bên trong thư mục publish (web.config ở gốc zip) và upload',
        'Mở domain, chụp màn hình trang /san-pham',
      ],
      constraints: ['File zip không chứa thư mục bin/, obj/ hay mã nguồn .cs'],
      examples: [
        { input: 'Zip có cấu trúc publish/web.config', output: 'Lỗi 500 hoặc trang thư mục rỗng', explain: 'web.config không nằm ở gốc nên IIS không biết khởi chạy ứng dụng.' },
        { input: 'Zip có web.config ở gốc', output: 'https://cuahang.somee.com hiện trang chủ' },
      ],
      visual: {
        kind: 'flow',
        steps: [
          { kind: 'start', text: 'dotnet publish -c Release -o ./publish' },
          { kind: 'process', text: 'Nén các file trong publish' },
          { kind: 'process', text: 'File manager → Upload zip' },
          { kind: 'decision', text: 'web.config ở gốc?', branches: [
            { label: 'Có', steps: [{ kind: 'end', text: 'Trang chạy sau ~5 phút' }] },
            { label: 'Không', steps: [{ kind: 'io', text: 'Lỗi 500 — nén lại' }] },
          ] },
        ],
      },
    },
    {
      id: 'b31-4', level: 'Trung bình', title: 'Azure App Service với GitHub',
      requirement: 'Cho repo GitHub chứa dự án cửa hàng. Tạo App Service trên Azure và cấu hình Deployment Center lấy code từ nhánh main.',
      tasks: [
        'Tạo Subscription, Resource group, App Service .NET 8',
        'Kết nối Deployment Center với GitHub, nhánh main',
        'Thêm biến môi trường ASPNETCORE_ENVIRONMENT=Production và TenCuaHang trên Azure',
        'Sửa tiêu đề trang chủ, push lên main và kiểm chứng trang trên Azure tự cập nhật',
      ],
      examples: [
        { input: 'git push origin main', output: 'Tab Actions trên GitHub có workflow chạy, vài phút sau trang Azure đổi tiêu đề' },
        { input: 'Biến môi trường TenCuaHang trên Azure = "Điện máy Azure"', output: 'Trang chủ hiện "Điện máy Azure"', explain: 'Biến môi trường được nạp sau appsettings nên ghi đè giá trị trong file.' },
      ],
      visual: {
        kind: 'seq',
        actors: ['Bạn', 'GitHub', 'Azure'],
        steps: [
          { from: 0, to: 1, text: 'push main' },
          { from: 1, to: 1, text: 'Actions: build, publish' },
          { from: 1, to: 2, text: 'deploy gói publish' },
          { from: 2, to: 0, text: 'trang đã cập nhật', dashed: true },
        ],
      },
    },
    {
      id: 'b31-5', level: 'Trung bình', title: 'Trang lỗi theo môi trường',
      requirement: 'Cho một trang /loi-thu ném InvalidOperationException. Cấu hình để ở Development hiện chi tiết lỗi, ở Production hiện trang /Error thân thiện "Hệ thống đang bận, vui lòng thử lại" và ghi log mức Warning trở lên.',
      signature: 'if (!app.Environment.IsDevelopment()) app.UseExceptionHandler("/Error")',
      examples: [
        { input: 'Development, mở /loi-thu', output: 'Trang lỗi chi tiết có stack trace' },
        { input: 'Production, mở /loi-thu', output: 'Trang /Error, không lộ stack trace', explain: 'Lộ stack trace ở Production là lỗ hổng bảo mật: kẻ tấn công thấy tên class, đường dẫn file.' },
      ],
    },
    {
      id: 'b31-6', level: 'Nâng cao', title: 'Dockerfile multi-stage',
      requirement: 'Viết Dockerfile multi-stage cho dự án cửa hàng điện máy, build image cua_hang_web và chạy container cổng máy 4321.',
      tasks: [
        'Stage build dùng sdk:8.0, restore trước rồi publish',
        'Stage final dùng aspnet:8.0, chỉ chép kết quả publish',
        'Ứng dụng nghe cổng 80 bằng UseUrls',
        'docker run -d -p 4321:80 và mở http://localhost:4321',
        'So sánh kích thước image khi dùng sdk:8.0 làm image cuối (docker images)',
      ],
      examples: [
        { input: 'Bỏ UseUrls, chạy -p 4321:80', output: 'Trình duyệt không kết nối được', explain: '.NET 8 mặc định nghe 8080 trong container, cổng 80 không có ai nghe.' },
        { input: 'Có UseUrls("http://*:80")', output: 'Trang chủ hiện bình thường' },
      ],
      hint: 'Xem docker logs tên_container: dòng "Now listening on" cho biết ứng dụng đang nghe cổng nào.',
      visual: {
        kind: 'flow',
        steps: [
          { kind: 'start', text: 'FROM sdk:8.0 AS build' },
          { kind: 'process', text: 'COPY csproj → restore → COPY . → publish' },
          { kind: 'process', text: 'FROM aspnet:8.0 → COPY --from=build' },
          { kind: 'process', text: 'docker build -t cua_hang_web .' },
          { kind: 'end', text: 'docker run -d -p 4321:80 cua_hang_web' },
        ],
      },
    },
    {
      id: 'b31-7', level: 'Nâng cao', title: 'Docker compose: web + SQL Server',
      requirement: 'Cho ứng dụng Blazor dùng EF Core với SQL Server. Viết docker-compose.yml gồm service web (build từ Dockerfile bài 6) và service db (image mcr.microsoft.com/mssql/server:2022-latest), chuỗi kết nối truyền qua biến môi trường.',
      tasks: [
        'Service db đặt SA_PASSWORD và ACCEPT_EULA=Y',
        'Service web có depends_on: db và biến ConnectionStrings__CuaHangDb',
        'Chuỗi kết nối dùng Server=db, không dùng localhost',
        'Chạy docker compose up --build, mở trang danh sách sản phẩm',
      ],
      examples: [
        { input: 'Chuỗi kết nối Server=localhost', output: 'Lỗi không kết nối được SQL Server', explain: 'Trong container web, localhost là chính container web chứ không phải container db.' },
        { input: 'Server=db;…;TrustServerCertificate=True', output: 'Trang /san-pham đọc dữ liệu được' },
      ],
      hint: 'Biến môi trường dạng ConnectionStrings__CuaHangDb (hai dấu gạch dưới) ghi đè khoá ConnectionStrings:CuaHangDb trong appsettings.',
    },
    {
      id: 'b31-8', level: 'Nâng cao', title: 'Checklist trước khi deploy',
      requirement: 'Xây dựng bảng kiểm tra trước khi deploy cho cửa hàng điện máy gồm ít nhất 10 mục, mỗi mục ghi: kiểm tra gì, làm thế nào, hậu quả nếu bỏ qua. Áp dụng bảng cho bản deploy Azure ở bài 4 và ghi kết quả.',
      signature: 'Bảng ≥ 10 dòng × 3 cột',
      examples: [
        { input: 'Mục: chuỗi kết nối Production', output: 'Kiểm tra: không nằm trong repo · Cách: đặt trên Azure Environment variables · Bỏ qua: lộ mật khẩu database trên GitHub' },
        { input: 'Mục: phiên bản .NET máy chủ', output: 'Kiểm tra: khớp TargetFramework net8.0 · Bỏ qua: lỗi 500.31 không tìm thấy runtime' },
      ],
      hint: 'Nghĩ theo ba nhóm: cấu hình (môi trường, bí mật), gói publish (Release, file tĩnh), vận hành (log, trang lỗi, HTTPS).',
    },
  ],
}

export default buoi31
