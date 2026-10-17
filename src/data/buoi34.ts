import type { Buoi } from './types'

const buoi34: Buoi = {
  id: 34,
  slug: 'docker-va-tong-quan-csdl',
  title: 'Docker & tổng quan cơ sở dữ liệu',
  subtitle: 'Đóng gói ứng dụng vào container, chạy SQL Server bằng một lệnh, và hiểu bảng – cột – dòng – khoá trước khi viết SQL',
  duration: '3 giờ',
  keywords: ['Docker image', 'container', 'Dockerfile', 'port mapping', 'SQL Server', 'Primary Key', 'Foreign Key'],
  goals: [
    'Phân biệt image, container, Dockerfile, Docker Hub và giải thích vì sao container nhẹ hơn máy ảo',
    'Dùng thành thạo các lệnh docker ps, run -d -p, stop, start, rm, images, rmi, build, pull, cp',
    'Triển khai một trang HTML tĩnh lên nginx bằng hai cách: thủ công và Dockerfile',
    'Cài SQL Server / Azure SQL Edge bằng Docker, kết nối bằng Azure Data Studio và nắm các khái niệm bảng, khoá, kiểu dữ liệu',
  ],

  sections: [
    {
      id: 'docker-la-gi',
      title: '1. Docker là gì — image, container và máy ảo',
      blocks: [
        {
          type: 'text',
          text: 'Docker là nền tảng mã nguồn mở để đóng gói, triển khai và chạy ứng dụng trong các container. Hãy tưởng tượng một chiếc vali: ta xếp vào đó ứng dụng cùng mọi thứ nó cần (thư viện, runtime, cấu hình). Mang vali đến máy Windows, Mac, Linux hay server trên cloud, mọi thứ bên trong vẫn chạy đúng như lúc đóng gói — không còn câu "máy em chạy được mà".',
        },
        {
          type: 'table',
          head: ['Khái niệm', 'Là gì', 'So sánh dễ nhớ'],
          rows: [
            ['Image', 'Bản đóng gói chỉ đọc: hệ điều hành tối giản + mã ứng dụng + phụ thuộc', 'Như class (prototype) trong C#'],
            ['Container', 'Một phiên bản đang chạy được tạo ra từ image', 'Như object: new từ class, tạo bao nhiêu cũng được'],
            ['Dockerfile', 'File văn bản liệt kê các bước dựng image', 'Như công thức nấu ăn'],
            ['Docker Hub', 'Kho image công khai để tải về (pull) và đẩy lên (push)', 'Như npmjs, CH Play, App Store'],
            ['Docker Engine', 'Dịch vụ nền (daemon) tạo, chạy, dừng, xoá container', 'Như CLR chạy chương trình .NET'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Gõ docker run nginx — chuyện gì xảy ra',
            actors: ['Người dùng', 'Docker CLI', 'Docker Daemon', 'Docker Hub'],
            steps: [
              { from: 0, to: 1, text: 'docker run -d -p 8080:80 nginx' },
              { from: 1, to: 2, text: 'Gửi yêu cầu qua API' },
              { from: 2, to: 2, text: 'Tìm image nginx trên máy' },
              { from: 2, to: 3, text: 'Chưa có → pull nginx:latest' },
              { from: 3, to: 2, text: 'Trả về các lớp (layer) của image', dashed: true },
              { from: 2, to: 2, text: 'Tạo container + nối cổng 8080 → 80' },
              { from: 2, to: 0, text: 'In ra container id', dashed: true },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Container so với máy ảo',
            columns: [
              { title: 'Máy ảo (VM)', tone: 'plain', items: ['Mỗi máy ảo có hệ điều hành riêng đầy đủ', 'Nặng hàng GB, khởi động tính bằng phút', 'Cách ly hoàn toàn, hợp với ứng dụng cần OS riêng'] },
              { title: 'Container', tone: 'good', items: ['Dùng chung nhân (kernel) của máy chủ', 'Nhẹ vài chục MB, khởi động tính bằng giây', 'Một máy chạy được hàng chục container cùng lúc'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Image : container = class : object',
          text: 'Xoá container không làm mất image; từ một image nginx có thể tạo ra nginx1, nginx2, nginx3 chạy ở ba cổng khác nhau. Ngược lại, image đang được container dùng thì docker rmi sẽ báo lỗi cho tới khi xoá hết container của nó.',
        },
      ],
    },
    {
      id: 'lenh-docker',
      title: '2. Cài đặt và các lệnh Docker thường dùng',
      blocks: [
        {
          type: 'text',
          text: 'Tải Docker Desktop tại docker.com/get-started. Trên Windows, Docker chạy nhờ WSL 2 (Windows Subsystem for Linux) nên hay gặp lỗi khi máy chưa bật ảo hoá. Lưu đồ dưới đây là thứ tự xử lý theo slide.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Docker Desktop trên Windows báo lỗi WSL',
            steps: [
              { kind: 'start', text: 'Mở Docker Desktop → báo lỗi WSL / Virtualization' },
              { kind: 'decision', text: 'BIOS đã bật Intel VT-x / AMD-V?', branches: [
                { label: 'Chưa', steps: [{ kind: 'process', text: 'Khởi động lại, vào BIOS (F2/F10/F12/Del), bật Virtualization Technology' }] },
                { label: 'Rồi', steps: [{ kind: 'process', text: 'CMD quyền Administrator: dism.exe bật VirtualMachinePlatform và Microsoft-Windows-Subsystem-Linux' }] },
              ] },
              { kind: 'process', text: 'Khởi động lại máy → wsl --update → wsl --set-default-version 2' },
              { kind: 'decision', text: 'Còn lỗi mạng / docker-desktop hỏng?', branches: [
                { label: 'Có', steps: [{ kind: 'process', text: 'wsl --shutdown, wsl --unregister docker-desktop và docker-desktop-data, mở lại Docker' }] },
                { label: 'Không', steps: [{ kind: 'note', text: 'Xong' }] },
              ] },
              { kind: 'end', text: 'docker --version in ra phiên bản' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Sửa lỗi WSL trên Windows (CMD quyền Administrator)',
            code: `dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
:: khởi động lại máy rồi chạy tiếp
wsl --update
wsl --version
wsl --set-default-version 2
wsl --list --verbose
:: nếu Docker vẫn lỗi mạng
wsl --shutdown
wsl --unregister docker-desktop
wsl --unregister docker-desktop-data`,
            note: 'wsl --unregister xoá distro của Docker Desktop, mọi container và image trong đó cũng mất. Chỉ dùng khi đã thử các bước trên mà vẫn lỗi.',
          },
        },
        {
          type: 'table',
          head: ['Lệnh', 'Tác dụng', 'Ví dụ'],
          rows: [
            ['docker ps -a', 'Liệt kê container (cả đang dừng)', 'Bỏ -a chỉ thấy container đang chạy'],
            ['docker run -d -p 8080:80 --name web nginx', 'Tạo và chạy container chế độ nền', '-d: detach, -p: công khai:bên trong'],
            ['docker stop / start web', 'Dừng / chạy lại container', 'Dùng tên hoặc vài ký tự đầu của id'],
            ['docker rm web', 'Xoá container (phải dừng trước)', 'docker rm -f web để vừa dừng vừa xoá'],
            ['docker images', 'Liệt kê image trên máy', 'Cột REPOSITORY, TAG, IMAGE ID'],
            ['docker rmi nginx:latest', 'Xoá image', 'Lỗi nếu còn container dùng image đó'],
            ['docker build . -t my-nginx', 'Dựng image từ Dockerfile ở thư mục hiện tại', 'Dấu chấm là thư mục ngữ cảnh'],
            ['docker tag my-nginx khai/my-nginx:1.0', 'Đặt thêm tên cho image', 'Cần trước khi push'],
            ['docker pull / push name:tag', 'Tải về / đẩy lên Docker Hub', 'docker pull nginx:stable-alpine3.20-perl'],
            ['docker cp file ee90:/duong/dan', 'Chép file từ máy vào container', 'ee90 là 4 ký tự đầu container id'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'map',
            caption: 'Port mapping: cổng công khai (máy thật) → cổng riêng (trong container)',
            name: 'docker run -p public:private',
            pairs: [
              { key: '8080:80', value: 'NGINX — mở http://localhost:8080' },
              { key: '1234:1433', value: 'SQL SERVER — kết nối localhost,1234' },
              { key: '9999:3306', value: 'MYSQL1' },
              { key: '8888:3306', value: 'MYSQL2 — cùng image MySQL, khác cổng ngoài' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Hai container không thể dùng chung cổng ngoài',
          text: 'MYSQL1 và MYSQL2 đều lắng nghe 3306 bên trong — không sao, mỗi container có mạng riêng. Nhưng cổng bên trái (trên máy thật) phải khác nhau. Chạy -p 8080:80 lần thứ hai sẽ báo "port is already allocated".',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Lệnh terminal nên thuộc',
          text: 'rm -rf thu_muc xoá thư mục kèm file bên trong mà không hỏi lại — gõ nhầm đường dẫn là mất thật. An toàn hơn trên Mac: mv thu_muc ~/.Trash/ để chuyển vào thùng rác.',
        },
      ],
    },
    {
      id: 'deploy-nginx',
      title: '3. Triển khai web tĩnh lên nginx — hai cách',
      blocks: [
        {
          type: 'text',
          text: 'Kịch bản: có thư mục webabc chứa index.html của cửa hàng điện máy. nginx là web server, vai trò giống Live Server nhưng chạy trong container. Cách 1 làm tay từng bước để hiểu; cách 2 viết Dockerfile để tự động hoá và chia sẻ cho người khác.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Cách 1 — thủ công qua Docker CLI',
            steps: [
              { kind: 'start', text: 'Có sẵn webabc/index.html' },
              { kind: 'process', text: 'B1: docker pull nginx:stable-alpine3.20-perl' },
              { kind: 'process', text: 'B2: docker run -d -p 8989:80 --name web-dienmay <4 số đầu image id>' },
              { kind: 'process', text: 'B3: docker cp .../webabc/index.html <container id>:/usr/share/nginx/html' },
              { kind: 'decision', text: 'Mở localhost:8989 thấy trang mới?', branches: [
                { label: 'Không', steps: [{ kind: 'process', text: 'docker ps kiểm tra container đang chạy, đúng cổng, đúng thư mục html' }] },
                { label: 'Có', steps: [{ kind: 'note', text: 'Mỗi lần sửa file phải docker cp lại' }] },
              ] },
              { kind: 'end', text: 'Trang chạy trong container' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Cách 1 — các lệnh',
            code: `docker pull nginx:stable-alpine3.20-perl
docker images                        # lấy IMAGE ID, ví dụ 5a1b…
docker run -d -p 8989:80 --name web-dienmay 5a1b
docker ps                            # lấy CONTAINER ID, ví dụ ee90…
docker cp /Users/khai/Desktop/webabc/index.html ee90:/usr/share/nginx/html
# mở trình duyệt: http://localhost:8989`,
            note: '/usr/share/nginx/html là thư mục nginx phục vụ file tĩnh. Mỗi image có cấu trúc thư mục riêng — đọc trang mô tả image trên Docker Hub để biết chép vào đâu.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'dockerfile',
            title: 'Cách 2 — Dockerfile đặt cạnh index.html',
            code: `# Sử dụng image Nginx chính thức
FROM nginx:latest
# Đặt thư mục làm việc
WORKDIR /usr/share/nginx/html
# Sao chép index.html vào thư mục hiện tại (đã đặt bởi WORKDIR)
COPY index.html .
# Mở cổng 80
EXPOSE 80
# Chạy Nginx ở chế độ foreground
CMD ["nginx", "-g", "daemon off;"]`,
            note: 'daemon off giữ nginx chạy ở tiến trình chính. Nếu nginx chạy nền, tiến trình chính kết thúc và container tự dừng ngay sau khi start.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Cách 2 — build image rồi run container',
            code: `cd /Users/khai/Desktop/webabc
docker build -t my-nginx .
docker run -d -p 8080:80 --name my-nginx-container my-nginx`,
            note: 'Sửa index.html thì build lại image và tạo container mới. Image này có thể push lên Docker Hub để máy khác pull về chạy y hệt.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'dockerfile',
            title: 'Đóng gói web .NET — build hai giai đoạn',
            code: `# Stage 1: build bằng SDK (nặng)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
COPY *.csproj ./
RUN dotnet restore
COPY . ./
RUN dotnet publish -c Release -o /app/publish

# Stage 2: chỉ chép kết quả sang runtime (nhẹ)
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "web_demo.dll"]`,
            note: 'Chép csproj và restore trước, mã nguồn sau: khi chỉ sửa code mà không đổi gói NuGet, Docker dùng lại lớp restore đã cache nên build nhanh hơn nhiều.',
          },
        },
      ],
    },
    {
      id: 'tong-quan-csdl',
      title: '4. Cơ sở dữ liệu và các khái niệm nền',
      blocks: [
        {
          type: 'text',
          text: 'Cơ sở dữ liệu (CSDL) là hệ thống thông tin có cấu trúc, lưu trên thiết bị lưu trữ, cho nhiều người dùng và nhiều chương trình khai thác cùng lúc. So với lưu file txt/json như các buổi trước, CSDL giảm trùng lặp, đảm bảo nhất quán và toàn vẹn, và chia sẻ được: server đặt ở Việt Nam, nhân viên ở Mỹ có tài khoản vẫn đăng nhập đọc được. Phần mềm quản lý CSDL gọi là hệ quản trị CSDL (DBMS).',
        },
        {
          type: 'table',
          head: ['Hệ quản trị', 'Loại', 'Ghi chú'],
          rows: [
            ['SQL Server', 'Quan hệ', 'Của Microsoft, đi cặp với .NET — khoá học dùng cái này'],
            ['Azure SQL Edge', 'Quan hệ', 'Cùng lõi với SQL Server, chạy được trên Mac chip Apple Silicon'],
            ['MySQL / PostgreSQL', 'Quan hệ', 'Mã nguồn mở, phổ biến với PHP, Node'],
            ['Oracle', 'Quan hệ', 'Doanh nghiệp lớn, ngân hàng'],
            ['SQLite', 'Quan hệ', 'Một file duy nhất, dùng cho app di động, demo'],
            ['MongoDB', 'NoSQL (document)', 'Lưu document dạng JSON'],
            ['Redis', 'NoSQL (key-value)', 'Trong bộ nhớ, dùng làm cache'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Cấu trúc một CSDL cửa hàng điện máy',
            root: {
              label: 'Database: DienMayDB',
              children: [
                { label: 'Table SAN_PHAM', note: '≈ class SanPham', highlight: true, children: [
                  { label: 'Cột id INT', note: 'Primary Key' },
                  { label: 'Cột ten NVARCHAR(255)', note: '≈ property Ten' },
                  { label: 'Cột gia DECIMAL(18,2)', note: 'Constraint CHECK gia >= 0' },
                  { label: 'Dòng (1, Tivi Sony 55", 15000000)', note: '≈ một object' },
                ] },
                { label: 'Table DON_HANG', children: [
                  { label: 'Cột khach_hang_id INT', note: 'Foreign Key → KHACH_HANG.id' },
                ] },
                { label: 'Index IX_SAN_PHAM_ten', note: 'Tìm theo tên nhanh hơn' },
              ],
            },
          },
        },
        {
          type: 'table',
          head: ['Khái niệm', 'Nghĩa', 'Bên C# tương ứng'],
          rows: [
            ['Table (bảng)', 'Tập dữ liệu cùng loại xếp theo hàng và cột', 'class SanPham'],
            ['Column / Field (cột, trường)', 'Một thuộc tính: ten, gia, email', 'property Ten, Gia'],
            ['Row / Record (dòng, bản ghi)', 'Một mục dữ liệu cụ thể', 'một object new SanPham {…}'],
            ['Data Type', 'Loại dữ liệu cột được phép chứa', 'int, string, decimal, DateTime'],
            ['Primary Key (khoá chính)', 'Cột định danh duy nhất, không trùng, không NULL', 'Ma / Id'],
            ['Foreign Key (khoá ngoại)', 'Cột trỏ tới khoá chính của bảng khác', 'DonHang.MaKhachHang'],
            ['Index (chỉ mục)', 'Cấu trúc giúp tìm nhanh, như mục lục sách', 'Dictionary tra theo khoá'],
            ['Constraint (ràng buộc)', 'Luật dữ liệu: NOT NULL, UNIQUE, CHECK, DEFAULT', 'Kiểm tra trong setter'],
            ['Schema (lược đồ)', 'Nhóm logic các bảng, mặc định dbo', 'namespace'],
            ['Query (truy vấn)', 'Câu lệnh SQL đọc / ghi dữ liệu', 'LINQ trên List'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Bảng nào cũng phải có khoá chính',
          text: 'Không có khoá chính, hai dòng "Tivi Sony 55 inch, 15.000.000" giống hệt nhau thì không cách nào sửa hay xoá riêng một dòng. Entity Framework (buổi sau) cũng từ chối làm việc với bảng không có khoá.',
        },
      ],
    },
    {
      id: 'cai-sql-server',
      title: '5. Cài SQL Server bằng Docker và bảng kiểu dữ liệu',
      blocks: [
        {
          type: 'text',
          text: 'Thay vì cài SQL Server vài GB vào máy, ta chạy nó trong container. Windows và Mac chip Intel dùng image SQL Server; Mac chip Apple Silicon (M1, M2…) dùng Azure SQL Edge — cùng lõi nên cú pháp T-SQL gần như giống hệt. Sau đó dùng Azure Data Studio (Mac/Windows) hoặc SSMS (chỉ Windows) để kết nối.',
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Chạy SQL Server / Azure SQL Edge trong container',
            code: `# Windows hoặc Mac Intel
docker run -d --name sqlserver \\
  -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Cyber@12345" \\
  -p 1234:1433 mcr.microsoft.com/mssql/server:2019-latest

# Mac Apple Silicon
docker run -d --name sqledge \\
  -e "ACCEPT_EULA=1" -e "MSSQL_SA_PASSWORD=Cyber@12345" \\
  -p 1234:1433 mcr.microsoft.com/azure-sql-edge

docker ps          # STATUS phải là Up, không phải Exited`,
            note: 'Mật khẩu sa phải mạnh (≥ 8 ký tự, có hoa, thường, số, ký tự đặc biệt). Mật khẩu yếu thì container khởi động rồi tắt ngay — docker logs sqlserver sẽ thấy lý do.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Kết nối Azure Data Studio vào SQL Server trong container',
            steps: [
              { kind: 'start', text: 'docker run ... -p 1234:1433' },
              { kind: 'decision', text: 'docker ps thấy STATUS Up?', branches: [
                { label: 'Exited', steps: [{ kind: 'process', text: 'docker logs <tên> → thường do mật khẩu yếu, xoá container và chạy lại' }] },
                { label: 'Up', steps: [{ kind: 'process', text: 'Azure Data Studio → New Connection' }] },
              ] },
              { kind: 'io', text: 'Server: localhost,1234 · User: sa · Password: Cyber@12345' },
              { kind: 'process', text: 'Bật Trust server certificate' },
              { kind: 'end', text: 'Thấy cây Databases: master, model, msdb, tempdb' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Server viết bằng dấu phẩy, không phải dấu hai chấm',
          text: 'SQL Server ghi cổng theo dạng localhost,1234. Gõ localhost:1234 sẽ báo không tìm thấy server. Chuỗi kết nối trong appsettings.json sau này cũng viết Server=localhost,1234.',
        },
        {
          type: 'table',
          head: ['Kiểu SQL Server', 'Lưu gì', 'Kiểu C# tương ứng'],
          rows: [
            ['INT / BIGINT', 'Số nguyên 4 / 8 byte', 'int / long'],
            ['BIT', '0 hoặc 1', 'bool'],
            ['DECIMAL(18,2)', 'Số thực chính xác: 18 chữ số, 2 sau dấu phẩy', 'decimal — dùng cho tiền'],
            ['FLOAT', 'Số thực gần đúng', 'double'],
            ['VARCHAR(n)', 'Chuỗi không dấu, 1 byte/ký tự', 'string (mã, email)'],
            ['NVARCHAR(n)', 'Chuỗi Unicode, có dấu tiếng Việt', 'string (tên, địa chỉ)'],
            ['NVARCHAR(MAX)', 'Chuỗi rất dài, tới 2GB', 'string (mô tả, JSON)'],
            ['DATE / DATETIME2', 'Ngày / ngày giờ', 'DateOnly / DateTime'],
            ['UNIQUEIDENTIFIER', 'Guid', 'Guid'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Tên tiếng Việt thành dấu hỏi',
          text: 'Cột VARCHAR lưu "Nguyễn Văn A" thành "Nguy?n V?n A". Cột có tiếng Việt phải là NVARCHAR, và chuỗi khi chèn nên có tiền tố N: N\'Nguyễn Văn A\'.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b34-1', level: 'Cơ bản', title: 'Thao tác thư mục bằng terminal',
      requirement: 'Cho cây thư mục Data gồm Backup (old_data/data1.txt, archive), Projects (project1/code/main.py, project1/resources/readme.md, project2/docs/guide.txt, project2/assets/image1.jpg), Reports (daily/log.txt, weekly/summary.txt, logs). Viết các lệnh terminal thực hiện từng yêu cầu bên dưới, mỗi yêu cầu một dòng lệnh.',
      tasks: [
        'Di chuyển vào thư mục Data',
        'Tạo thư mục monthly trong Reports',
        'Xoá thư mục archive trong Backup',
        'Sao chép data1.txt từ old_data vào archive (tạo lại archive trước)',
        'Di chuyển thư mục code từ project1 sang project2',
        'Hiển thị nội dung log.txt trong daily',
        'Tìm tất cả tệp .jpg trong project2/assets',
      ],
      signature: 'cd · mkdir · rm -rf · cp · mv · cat · find',
      examples: [
        { input: 'Tạo monthly', output: 'mkdir Reports/monthly' },
        { input: 'Tìm .jpg', output: 'find Projects/project2/assets -name "*.jpg"' },
      ],
      visual: {
        kind: 'tree',
        caption: 'Thư mục Data ban đầu',
        root: {
          label: 'Data/',
          children: [
            { label: 'Backup/', children: [{ label: 'old_data/', children: [{ label: 'data1.txt' }] }, { label: 'archive/', note: 'xoá', highlight: true }] },
            { label: 'Projects/', children: [
              { label: 'project1/', children: [{ label: 'code/', note: 'chuyển sang project2', highlight: true }, { label: 'resources/readme.md' }] },
              { label: 'project2/', children: [{ label: 'docs/guide.txt' }, { label: 'assets/image1.jpg' }] },
            ] },
            { label: 'Reports/', children: [{ label: 'daily/log.txt' }, { label: 'weekly/summary.txt' }, { label: 'logs/' }] },
          ],
        },
      },
    },
    {
      id: 'b34-2', level: 'Cơ bản', title: 'Vòng đời một container nginx',
      requirement: 'Cho image nginx:latest. Viết chuỗi lệnh: tải image, tạo container tên web1 ở cổng 8081, kiểm tra đang chạy, dừng, chạy lại, rồi xoá container và xoá image. Ghi lại kết quả docker ps -a sau mỗi bước.',
      signature: 'pull → run → ps → stop → start → rm → rmi',
      examples: [
        { input: 'docker stop web1 rồi docker ps', output: 'Không thấy web1', explain: 'docker ps chỉ hiện container đang chạy; dùng docker ps -a mới thấy web1 trạng thái Exited.' },
        { input: 'docker rmi nginx khi web1 chưa xoá', output: 'Lỗi: image is being used by stopped container' },
      ],
    },
    {
      id: 'b34-3', level: 'Trung bình', title: 'Echo, printf, heredoc và chuyển hướng',
      requirement: 'Tiếp tục với thư mục Data ở bài 1. Xây dựng các tệp sau chỉ bằng lệnh terminal, không mở trình soạn thảo.',
      tasks: [
        'Dùng echo ghi hai dòng "Báo cáo hàng tuần" và "Ngày cập nhật: 2024-10-27" vào weekly/weekly_report.txt',
        'Dùng printf ghi "Tổng kết dự án" và "Thời gian: 3 tháng" (mỗi ý một dòng) vào project2/project_summary.txt',
        'Dùng heredoc tạo project1/overview.txt có 3 dòng mô tả dự án',
        'Chuyển kết quả ls -l của Reports vào logs/directory_list.txt',
        'Tìm các tệp lớn hơn 1MB trong Projects và các tệp .md trong project1/resources',
      ],
      signature: 'echo … > · echo … >> · printf "%s\\n" · cat <<EOF · ls -l > · find -size +1M',
      constraints: ['Dòng thứ hai của echo phải nối thêm (>>), không ghi đè'],
      examples: [
        { input: 'echo "A" > f.txt; echo "B" > f.txt; cat f.txt', output: 'B', explain: 'Dấu > ghi đè cả file; muốn giữ dòng A phải dùng >>.' },
        { input: 'printf "%s\\n" "Tổng kết dự án" "Thời gian: 3 tháng"', output: 'Hai dòng riêng biệt' },
      ],
    },
    {
      id: 'b34-4', level: 'Trung bình', title: 'Ba container từ một image',
      requirement: 'Cho image mysql:8. Tạo hai container mysql1 và mysql2 cùng chạy, cổng ngoài lần lượt 9999 và 8888, cổng trong 3306, mật khẩu root đặt qua biến môi trường MYSQL_ROOT_PASSWORD. Sau đó thử tạo container thứ ba mysql3 cũng dùng cổng 9999 và giải thích lỗi.',
      signature: 'docker run -d -p public:3306 -e MYSQL_ROOT_PASSWORD=… --name … mysql:8',
      examples: [
        { input: 'Tạo mysql3 với -p 9999:3306', output: 'Bind for 0.0.0.0:9999 failed: port is already allocated', explain: 'Cổng trong 3306 trùng không sao; cổng ngoài 9999 trên máy thật đã bị mysql1 giữ.' },
        { input: 'docker images', output: 'Chỉ một dòng mysql:8 dù có hai container' },
      ],
      visual: {
        kind: 'map',
        caption: 'Cổng máy thật → container',
        name: 'Docker Engine',
        pairs: [
          { key: '9999', value: 'mysql1:3306' },
          { key: '8888', value: 'mysql2:3306' },
          { key: '9999 (lần 2)', value: 'mysql3 → lỗi trùng cổng' },
        ],
      },
    },
    {
      id: 'b34-5', level: 'Trung bình', title: 'Đưa trang cửa hàng lên nginx bằng Dockerfile',
      requirement: 'Cho thư mục cua-hang gồm index.html, css/style.css và img/logo.png. Xây dựng Dockerfile chép cả thư mục vào nginx, build thành image cua-hang:1.0 và chạy ở cổng 8080. Sau đó sửa tiêu đề trang, build image cua-hang:1.1 và chạy song song ở cổng 8081 để so sánh hai phiên bản.',
      signature: 'FROM nginx:latest · COPY . /usr/share/nginx/html',
      constraints: ['Không dùng docker cp', 'Ảnh và CSS phải hiện đúng (đường dẫn tương đối)'],
      examples: [
        { input: 'http://localhost:8080', output: 'Trang tiêu đề cũ' },
        { input: 'http://localhost:8081', output: 'Trang tiêu đề mới', explain: 'Hai image khác tag, hai container độc lập.' },
      ],
      visual: {
        kind: 'flow',
        caption: 'Từ mã nguồn đến container',
        steps: [
          { kind: 'start', text: 'cua-hang/ + Dockerfile' },
          { kind: 'process', text: 'docker build -t cua-hang:1.0 .' },
          { kind: 'process', text: 'docker run -d -p 8080:80 --name ch10 cua-hang:1.0' },
          { kind: 'process', text: 'Sửa index.html → docker build -t cua-hang:1.1 .' },
          { kind: 'process', text: 'docker run -d -p 8081:80 --name ch11 cua-hang:1.1' },
          { kind: 'end', text: 'Hai phiên bản chạy song song' },
        ],
      },
    },
    {
      id: 'b34-6', level: 'Nâng cao', title: 'Dựng SQL Server và tạo CSDL đầu tiên',
      requirement: 'Xây dựng môi trường CSDL cho cửa hàng điện máy chạy hoàn toàn trong Docker và kiểm chứng bằng Azure Data Studio.',
      tasks: [
        'Chạy SQL Server (hoặc Azure SQL Edge nếu dùng Mac Apple Silicon) ở cổng 1234, tên container sql-dienmay',
        'Kết nối bằng Azure Data Studio với tài khoản sa',
        'Tạo database DienMayDB và một bảng SAN_PHAM(id, ten, gia) bằng giao diện',
        'Dừng container, chạy lại, kiểm tra dữ liệu còn không',
        'Xoá container, tạo lại, kiểm tra dữ liệu còn không — giải thích và sửa bằng volume -v sqldata:/var/opt/mssql',
      ],
      signature: 'docker run … -p 1234:1433 -v sqldata:/var/opt/mssql …',
      examples: [
        { input: 'docker stop rồi docker start', output: 'DienMayDB vẫn còn', explain: 'Dừng container không xoá lớp ghi của nó.' },
        { input: 'docker rm rồi docker run lại không có -v', output: 'DienMayDB biến mất', explain: 'Dữ liệu nằm trong lớp ghi của container cũ đã bị xoá; volume tách dữ liệu ra khỏi vòng đời container.' },
      ],
      hint: 'Volume là ổ đĩa do Docker quản lý, sống độc lập với container. Kiểm tra bằng docker volume ls.',
      visual: {
        kind: 'seq',
        caption: 'Volume giữ dữ liệu qua các lần tạo container',
        actors: ['Container cũ', 'Volume sqldata', 'Container mới'],
        steps: [
          { from: 0, to: 1, text: 'Ghi DienMayDB.mdf' },
          { from: 0, to: 0, text: 'docker rm → container mất' },
          { from: 2, to: 1, text: 'docker run -v sqldata:… gắn lại' },
          { from: 1, to: 2, text: 'DienMayDB vẫn còn', dashed: true },
        ],
      },
    },
    {
      id: 'b34-7', level: 'Nâng cao', title: 'Đóng gói web .NET bằng Docker',
      requirement: 'Cho project ASP.NET Core tên web_demo (dotnet new webapp). Xây dựng Dockerfile hai giai đoạn (sdk để build, aspnet để chạy), build image web-demo và chạy ở cổng 5050. So sánh kích thước image khi dùng một giai đoạn sdk và hai giai đoạn.',
      signature: 'FROM …sdk:8.0 AS build → FROM …aspnet:8.0 · COPY --from=build',
      constraints: ['Ứng dụng lắng nghe cổng 8080 trong container (mặc định .NET 8) — chọn -p cho đúng', 'Thêm .dockerignore loại bỏ bin/ và obj/'],
      examples: [
        { input: 'docker run -d -p 5050:80 web-demo', output: 'localhost:5050 không phản hồi', explain: '.NET 8 mặc định nghe 8080 chứ không phải 80; sửa thành -p 5050:8080 hoặc đặt ASPNETCORE_HTTP_PORTS=80.' },
        { input: 'docker images', output: 'Một giai đoạn ≈ 800MB, hai giai đoạn ≈ 220MB' },
      ],
      hint: 'Thứ tự COPY *.csproj → restore → COPY . giúp tận dụng cache khi build lại.',
    },
    {
      id: 'b34-8', level: 'Nâng cao', title: 'Ánh xạ class C# sang bảng',
      requirement: 'Cho các class SanPham(Ma, Ten, Gia, SoLuongTon, NgayNhap), KhachHang(Ma, HoTen, Email, SoDienThoai), DonHang(Ma, MaKhachHang, NgayDat, TongTien). Lập bảng ánh xạ từng property sang cột SQL Server: tên cột, kiểu dữ liệu, có phải khoá chính / khoá ngoại không, ràng buộc (NOT NULL, UNIQUE, CHECK, DEFAULT). Giải thích lựa chọn kiểu cho tiền, tên tiếng Việt và email.',
      signature: 'Bảng: Property C# | Cột | Kiểu SQL | Khoá | Ràng buộc',
      constraints: ['Tiền không dùng FLOAT', 'Email không trùng', 'NgayDat mặc định là ngày hiện tại'],
      examples: [
        { input: 'decimal Gia', output: 'gia DECIMAL(18,2) NOT NULL CHECK (gia >= 0)' },
        { input: 'string Email', output: 'email VARCHAR(255) NOT NULL UNIQUE', explain: 'Email không có dấu nên VARCHAR đủ; HoTen có dấu phải NVARCHAR.' },
      ],
      hint: 'Khoá ngoại ma_khach_hang trong DON_HANG phải cùng kiểu với khoá chính của KHACH_HANG.',
    },
  ],
}

export default buoi34
