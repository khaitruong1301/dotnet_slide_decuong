import type { Buoi } from './types'

const buoi35: Buoi = {
  id: 35,
  slug: 'thiet-ke-csdl-va-ddl',
  title: 'Thiết kế CSDL & DDL',
  subtitle: 'Từ đặc tả nghiệp vụ đến ERD, database diagram và script CREATE TABLE có khoá ngoại cho hệ thống bán hàng',
  duration: '3 giờ',
  keywords: ['DDL', 'CREATE TABLE', 'ALTER TABLE', 'ERD', 'Foreign Key', 'ON DELETE CASCADE', 'quan hệ N-N'],
  goals: [
    'Phân biệt 5 nhóm lệnh SQL: DDL, DQL, DML, TCL, DCL',
    'Tạo, chọn, sửa, xoá database và bảng bằng T-SQL đúng quy tắc đặt tên',
    'Nhận diện 7 loại quan hệ giữa các bảng từ một đoạn đặc tả',
    'Chuyển ERD sang database diagram và viết script tạo bảng kèm khoá ngoại, hành động CASCADE / SET NULL / NO ACTION',
  ],

  sections: [
    {
      id: 'nhom-lenh',
      title: '1. Các nhóm lệnh SQL và lệnh tạo database',
      blocks: [
        {
          type: 'text',
          text: 'SQL (và phiên bản mở rộng của Microsoft là T-SQL) chia thành năm nhóm theo việc chúng làm. Buổi này tập trung vào DDL — nhóm định nghĩa cấu trúc: tạo database, tạo bảng, thêm cột, xoá bảng. Buổi sau mới đổ dữ liệu vào và truy vấn.',
        },
        {
          type: 'table',
          head: ['Nhóm', 'Tên đầy đủ', 'Lệnh tiêu biểu', 'Tác động lên'],
          rows: [
            ['DDL', 'Data Definition Language', 'CREATE, ALTER, DROP', 'Cấu trúc: database, bảng, cột, ràng buộc'],
            ['DQL', 'Data Query Language', 'SELECT', 'Đọc dữ liệu, không thay đổi gì'],
            ['DML', 'Data Manipulation Language', 'INSERT, UPDATE, DELETE', 'Nội dung các dòng'],
            ['TCL', 'Transaction Control Language', 'BEGIN TRANSACTION, COMMIT, ROLLBACK', 'Gom nhiều lệnh thành một giao dịch'],
            ['DCL', 'Data Control Language', 'GRANT, REVOKE', 'Quyền truy cập của người dùng'],
          ],
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Tạo database nếu chưa có, rồi chuyển sang dùng nó',
            code: `-- Cách đơn giản
CREATE DATABASE DienMayDB;

-- SQL Server không có CREATE DATABASE IF NOT EXISTS, phải tự kiểm tra
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'cinema_cybersoft')
BEGIN
    CREATE DATABASE cinema_cybersoft;
END
GO

-- Chọn database để các lệnh sau chạy trong nó
USE cinema_cybersoft;
GO`,
            note: 'Quên USE thì bảng sẽ được tạo trong master — lỗi rất hay gặp. Trong Azure Data Studio luôn nhìn ô chọn database phía trên cửa sổ query.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Chạy một script DDL an toàn',
            steps: [
              { kind: 'start', text: 'Mở script tạo CSDL' },
              { kind: 'decision', text: 'Database đã tồn tại? (sys.databases)', branches: [
                { label: 'Chưa', steps: [{ kind: 'process', text: 'CREATE DATABASE' }] },
                { label: 'Có', steps: [{ kind: 'note', text: 'Bỏ qua, không báo lỗi' }] },
              ] },
              { kind: 'process', text: 'USE <tên database>' },
              { kind: 'process', text: 'DROP TABLE IF EXISTS (bảng con trước, bảng cha sau)' },
              { kind: 'process', text: 'CREATE TABLE (bảng cha trước, bảng con sau)' },
              { kind: 'process', text: 'ALTER TABLE ADD CONSTRAINT FOREIGN KEY' },
              { kind: 'end', text: 'Script chạy lại bao nhiêu lần cũng được' },
            ],
          },
        },
      ],
    },
    {
      id: 'create-alter-drop',
      title: '2. CREATE, ALTER, DROP TABLE và quy tắc đặt tên',
      blocks: [
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Ba lệnh DDL với bảng',
            code: `CREATE TABLE Students (
    ID   INT PRIMARY KEY,
    Name NVARCHAR(50),
    Age  INT
);

-- Thêm cột
ALTER TABLE Students ADD Email NVARCHAR(100);
-- Đổi kiểu cột
ALTER TABLE Students ALTER COLUMN Name NVARCHAR(100) NOT NULL;
-- Xoá cột
ALTER TABLE Students DROP COLUMN Age;

-- Xoá bảng (cả cấu trúc lẫn dữ liệu)
DROP TABLE IF EXISTS Students;`,
            note: 'ALTER COLUMN sang NOT NULL sẽ lỗi nếu bảng đang có dòng Name là NULL — phải UPDATE các dòng đó trước. DROP TABLE không hỏi lại và không có thùng rác.',
          },
        },
        {
          type: 'table',
          head: ['Quy tắc', 'Hợp lệ', 'Không hợp lệ / phải bọc []'],
          rows: [
            ['Không bắt đầu bằng số', 'san_pham_2024', '2024_san_pham'],
            ['Có dấu cách phải bọc []', '[ho ten], [db sinh vien]', 'ho ten'],
            ['Được phép có dấu (không khuyến khích)', '[Sản phẩm]', '—'],
            ['Trùng từ khoá phải bọc []', '[order], [table], [date]', 'order'],
            ['Không bắt đầu bằng @ hoặc $', 'gia_ban', '@gia, $gia'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Chọn một kiểu đặt tên và giữ nguyên',
          text: 'Slide dùng snake_case không dấu: KHACH_HANG, khach_hang_id. Dự án .NET hay dùng PascalCase: KhachHang, KhachHangId để khớp property C#. Cả hai đều ổn, miễn là cả database dùng một kiểu và tránh dấu cách, dấu tiếng Việt, từ khoá.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'DROP, TRUNCATE hay DELETE?',
            columns: [
              { title: 'DROP TABLE', tone: 'bad', items: ['DDL', 'Mất cả bảng lẫn dữ liệu', 'Phải CREATE lại mới dùng được'] },
              { title: 'TRUNCATE TABLE', tone: 'plain', items: ['DDL', 'Xoá sạch dữ liệu, giữ cấu trúc', 'Reset IDENTITY về 1, rất nhanh'] },
              { title: 'DELETE FROM', tone: 'good', items: ['DML', 'Xoá theo WHERE, từng dòng', 'Không reset IDENTITY, kích hoạt CASCADE'] },
            ],
          },
        },
      ],
    },
    {
      id: 'bay-quan-he',
      title: '3. Bảy loại quan hệ giữa các bảng',
      blocks: [
        {
          type: 'text',
          text: 'Mỗi quan hệ (relation) trong lược đồ tương ứng một bảng trong CSDL. Việc khó nhất khi thiết kế không phải viết CREATE TABLE mà là đọc đặc tả và nhận ra các bảng nối với nhau theo kiểu nào — kiểu quan hệ quyết định khoá ngoại đặt ở đâu.',
        },
        {
          type: 'table',
          head: ['Quan hệ', 'Ví dụ trong slide', 'Cách cài đặt'],
          rows: [
            ['One-to-One (1-1)', 'Một nhân viên có đúng một CCCD', 'Bảng CCCD có nhan_vien_id UNIQUE (hoặc làm luôn khoá chính)'],
            ['One-to-Many (1-N)', 'Một khách đặt nhiều đơn, mỗi đơn của một khách', 'FK khach_hang_id đặt ở bảng nhiều (DON_HANG)'],
            ['Many-to-Many (N-N)', 'Đơn có nhiều sản phẩm, sản phẩm nằm trong nhiều đơn', 'Bảng trung gian CHI_TIET_DON_HANG, khoá chính kép'],
            ['Self-Referencing', 'Danh mục Laptop thuộc danh mục Điện tử', 'Cột danh_muc_cha_id trỏ về chính bảng DANH_MUC'],
            ['Hierarchical', 'Quản lý → nhân viên trong sơ đồ tổ chức', 'Cây cha-con, thường cài bằng tự liên kết quan_ly_id'],
            ['Composite', 'Vé = Khách hàng + Phim + ghế', 'Bảng kết hợp nhiều FK cùng thông tin riêng (ghế, giá)'],
            ['Temporal', 'Lịch sử lương nhân viên, lịch sử giá', 'Temporal table SYSTEM_VERSIONING hoặc bảng lịch sử có từ_ngày, đến_ngày'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Self-referencing: danh mục cha con trong cùng một bảng',
            root: {
              label: 'Điện tử', note: 'danh_muc_cha_id = NULL',
              children: [
                { label: 'Laptop', note: 'cha = Điện tử', children: [
                  { label: 'Gaming', note: 'cha = Laptop', highlight: true },
                  { label: 'Văn phòng', note: 'cha = Laptop' },
                ] },
                { label: 'Điện thoại', children: [{ label: 'iPhone' }, { label: 'Android' }] },
                { label: 'Máy ảnh' },
              ],
            },
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Tự liên kết và quan hệ 1-1',
            code: `CREATE TABLE DANH_MUC (
    id              INT IDENTITY(1,1) PRIMARY KEY,
    ten             NVARCHAR(100) NOT NULL,
    danh_muc_cha_id INT NULL REFERENCES DANH_MUC(id)   -- trỏ về chính nó
);

CREATE TABLE NHAN_VIEN (
    id      INT IDENTITY(1,1) PRIMARY KEY,
    ho_ten  NVARCHAR(100) NOT NULL,
    quan_ly_id INT NULL REFERENCES NHAN_VIEN(id)       -- phân cấp quản lý
);

CREATE TABLE CCCD (
    so_cccd      VARCHAR(12) PRIMARY KEY,
    nhan_vien_id INT NOT NULL UNIQUE REFERENCES NHAN_VIEN(id),  -- UNIQUE tạo 1-1
    ngay_cap     DATE,
    noi_cap      NVARCHAR(100)
);`,
            note: 'danh_muc_cha_id phải cho phép NULL — danh mục gốc không có cha. Bỏ UNIQUE ở CCCD thì quan hệ thành 1-N, đúng khi muốn lưu lịch sử các CCCD cũ của một nhân viên.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Vì sao tách CCCD ra khỏi NHAN_VIEN?',
          text: 'Chuẩn hoá dữ liệu (đổi CCCD không đụng bảng nhân viên), dễ mở rộng thành 1-N khi cần lưu lịch sử, tách biệt trách nhiệm, và truy vấn danh sách nhân viên nhẹ hơn vì chỉ JOIN sang CCCD khi thật sự cần.',
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Temporal table — SQL Server tự lưu lịch sử mỗi lần UPDATE',
            code: `CREATE TABLE Employee (
    EmployeeID INT PRIMARY KEY,
    Name       NVARCHAR(100),
    Position   NVARCHAR(50),
    Salary     DECIMAL(10,2),
    ValidFrom  DATETIME2 GENERATED ALWAYS AS ROW START NOT NULL,
    ValidTo    DATETIME2 GENERATED ALWAYS AS ROW END NOT NULL,
    PERIOD FOR SYSTEM_TIME (ValidFrom, ValidTo)
)
WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.EmployeeHistory));

INSERT INTO Employee (EmployeeID, Name, Position, Salary)
VALUES (1, N'Nguyễn Văn A', 'Developer', 1500.00);

UPDATE Employee SET Salary = 5000.00 WHERE EmployeeID = 1;

SELECT * FROM EmployeeHistory WHERE EmployeeID = 1;   -- dòng lương 1500 cũ`,
            note: 'Không tự INSERT vào ValidFrom, ValidTo — SQL Server điền. Muốn DROP bảng phải tắt SYSTEM_VERSIONING = OFF trước.',
          },
        },
      ],
    },
    {
      id: 'erd-sang-bang',
      title: '4. Từ đặc tả đến database diagram',
      blocks: [
        {
          type: 'text',
          text: 'Đặc tả: cửa hàng điện máy trực tuyến cần quản lý khách hàng (tên, email, số điện thoại), đơn hàng (ngày đặt, tổng tiền), sản phẩm; mỗi khách đặt nhiều đơn; một đơn chứa nhiều sản phẩm và một sản phẩm có trong nhiều đơn; danh mục có danh mục con; nhân viên có thể quản lý nhân viên khác; nhập hàng từ nhà cung cấp; giá sản phẩm thay đổi theo thời gian và cần lưu lịch sử.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Năm bước thiết kế theo slide',
            items: [
              { label: 'B1', text: 'Xác định các bảng (danh từ trong đặc tả) và khoá chính của mỗi bảng' },
              { label: 'B2', text: 'Xác định quan hệ giữa các bảng trong 7 loại, vẽ ERD' },
              { label: 'B3', text: 'Chuyển ERD sang database diagram: 1-N đặt FK ở bảng nhiều, N-N tách bảng trung gian' },
              { label: 'B4', text: 'Viết script CREATE TABLE với kiểu dữ liệu và ràng buộc' },
              { label: 'B5', text: 'ALTER TABLE ADD CONSTRAINT FOREIGN KEY, chọn hành động ON DELETE / ON UPDATE' },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'B3 — quyết định đặt khoá ngoại ở đâu',
            steps: [
              { kind: 'start', text: 'Hai bảng A và B có quan hệ' },
              { kind: 'decision', text: 'Kiểu quan hệ?', branches: [
                { label: '1-N', steps: [{ kind: 'process', text: 'Thêm cột FK vào bảng phía N, trỏ PK bảng phía 1' }, { kind: 'note', text: 'DON_HANG.khach_hang_id → KHACH_HANG.id' }] },
                { label: 'N-N', steps: [{ kind: 'process', text: 'Tạo bảng mới chứa 2 FK, cặp FK làm khoá chính kép' }, { kind: 'note', text: 'CHI_TIET_DON_HANG(don_hang_id, san_pham_id)' }] },
                { label: '1-1', steps: [{ kind: 'process', text: 'FK ở bảng phụ + UNIQUE' }] },
              ] },
              { kind: 'process', text: 'Kiểu dữ liệu FK = kiểu của PK được tham chiếu' },
              { kind: 'end', text: 'Database diagram' },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'uml',
            caption: 'Database diagram phần bán hàng (PK gạch chân bằng chữ PK, FK ghi chú)',
            children: [
              { name: 'KHACH_HANG', attrs: ['PK id INT', 'ten NVARCHAR(255)', 'email UNIQUE', 'sdt NVARCHAR(20)'] },
              { name: 'DON_HANG', attrs: ['PK id INT', 'FK khach_hang_id', 'ngay_dat DATE', 'tong_tien DECIMAL'] },
              { name: 'CHI_TIET_DON_HANG', attrs: ['PK,FK don_hang_id', 'PK,FK san_pham_id', 'so_luong INT', 'gia_ban DECIMAL'] },
              { name: 'SAN_PHAM', attrs: ['PK id INT', 'ten NVARCHAR(255)', 'gia DECIMAL'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Giá phải lưu lại trong chi tiết đơn',
          text: 'Không lấy giá từ SAN_PHAM khi in hoá đơn cũ: hôm nay tivi giá 15 triệu, tháng sau giảm còn 12 triệu thì hoá đơn tháng trước sẽ in sai. Chi tiết đơn hàng lưu gia_ban tại thời điểm đặt, cũng như DON_HANG lưu ngay_dat.',
        },
      ],
    },
    {
      id: 'script-tao-bang',
      title: '5. Script tạo bảng và ràng buộc khoá ngoại',
      blocks: [
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'B4 — CREATE TABLE (bảng cha trước, bảng con sau)',
            code: `CREATE TABLE KHACH_HANG (
    id    INT IDENTITY(1,1) PRIMARY KEY,
    ten   NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,        -- không được trùng
    sdt   NVARCHAR(20)  NOT NULL
);
CREATE TABLE DON_HANG (
    id            INT IDENTITY(1,1) PRIMARY KEY,
    khach_hang_id INT NOT NULL,
    ngay_dat      DATE NOT NULL DEFAULT GETDATE(),  -- mặc định ngày hiện hành
    tong_tien     DECIMAL(18,2) NOT NULL CHECK (tong_tien >= 0)
);
CREATE TABLE SAN_PHAM (
    id  INT IDENTITY(1,1) PRIMARY KEY,
    ten NVARCHAR(255) NOT NULL,
    gia DECIMAL(18,2) NOT NULL CHECK (gia >= 0)
);
CREATE TABLE CHI_TIET_DON_HANG (
    don_hang_id INT NOT NULL,
    san_pham_id INT NOT NULL,
    so_luong    INT NOT NULL CHECK (so_luong > 0),
    gia_ban     DECIMAL(18,2) NOT NULL,
    PRIMARY KEY (don_hang_id, san_pham_id)      -- khoá chính kép
);`,
            note: 'IDENTITY(1,1): bắt đầu từ 1, mỗi dòng tăng 1, không tự INSERT giá trị id. Khoá chính kép đảm bảo một sản phẩm chỉ xuất hiện một lần trong một đơn — muốn mua 2 cái thì tăng so_luong.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'B5 — thêm khoá ngoại',
            code: `-- Cú pháp
-- ALTER TABLE <bảng> ADD CONSTRAINT <tên ràng buộc>
--   FOREIGN KEY (<cột FK>) REFERENCES <bảng tham chiếu>(<cột PK>)
--   ON DELETE <hành động> ON UPDATE <hành động>

ALTER TABLE DON_HANG
ADD CONSTRAINT FK_DONHANG_KHACHHANG
FOREIGN KEY (khach_hang_id) REFERENCES KHACH_HANG(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE CHI_TIET_DON_HANG
ADD CONSTRAINT FK_CHITIETDONHANG_DONHANG
FOREIGN KEY (don_hang_id) REFERENCES DON_HANG(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE CHI_TIET_DON_HANG
ADD CONSTRAINT FK_CHITIETDONHANG_SANPHAM
FOREIGN KEY (san_pham_id) REFERENCES SAN_PHAM(id)
ON DELETE NO ACTION;`,
            note: 'Ràng buộc sản phẩm để NO ACTION: xoá một sản phẩm đã từng bán sẽ bị chặn, giữ lại lịch sử đơn hàng. Nếu để CASCADE, xoá tivi là mọi dòng chi tiết có tivi biến mất khỏi hoá đơn cũ.',
          },
        },
        {
          type: 'table',
          head: ['Hành động', 'Khi xoá / sửa dòng ở bảng cha', 'Dùng khi'],
          rows: [
            ['CASCADE', 'Xoá / sửa theo các dòng con liên quan', 'Đơn hàng → chi tiết đơn: xoá đơn thì xoá chi tiết'],
            ['SET NULL', 'Đặt cột FK của dòng con thành NULL', 'Xoá nhân viên quản lý → quan_ly_id của cấp dưới thành NULL'],
            ['SET DEFAULT', 'Đặt cột FK về giá trị DEFAULT', 'Xoá danh mục → sản phẩm về danh mục "Khác"'],
            ['NO ACTION (mặc định)', 'Chặn, báo lỗi nếu còn dòng con', 'Sản phẩm đã có trong đơn hàng'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'DELETE FROM KHACH_HANG WHERE id = 1',
            steps: [
              { kind: 'start', text: 'Xoá khách hàng 1' },
              { kind: 'decision', text: 'FK_DONHANG_KHACHHANG là gì?', branches: [
                { label: 'NO ACTION', steps: [{ kind: 'io', text: 'Lỗi: The DELETE statement conflicted with the REFERENCE constraint' }] },
                { label: 'CASCADE', steps: [
                  { kind: 'process', text: 'Xoá mọi DON_HANG của khách 1' },
                  { kind: 'process', text: 'FK_CHITIETDONHANG_DONHANG CASCADE → xoá chi tiết các đơn đó' },
                ] },
              ] },
              { kind: 'end', text: 'Kết thúc' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Lỗi "may cause cycles or multiple cascade paths"',
          text: 'SQL Server không cho hai đường CASCADE cùng đổ về một bảng (ví dụ KHACH_HANG → DON_HANG → CHI_TIET và KHACH_HANG → GIO_HANG → CHI_TIET). Khi gặp lỗi này, đổi một trong các ràng buộc sang NO ACTION.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b35-1', level: 'Cơ bản', title: 'Script tạo database chạy lại được',
      requirement: 'Xây dựng script tạo database DienMayDB chỉ khi chưa tồn tại, chuyển sang dùng nó, sau đó tạo bảng NHA_CUNG_CAP(id, ten, dia_chi, sdt) với id tự tăng. Chạy script hai lần liên tiếp không được báo lỗi.',
      signature: 'IF NOT EXISTS (SELECT name FROM sys.databases …) · USE · DROP TABLE IF EXISTS',
      examples: [
        { input: 'Chạy lần 1', output: 'Commands completed successfully' },
        { input: 'Chạy lần 2', output: 'Commands completed successfully', explain: 'Database đã có nên bỏ qua CREATE; bảng bị DROP IF EXISTS rồi tạo lại.' },
      ],
    },
    {
      id: 'b35-2', level: 'Cơ bản', title: 'Sửa cấu trúc bảng',
      requirement: 'Cho bảng SAN_PHAM(id, ten, gia) đã có dữ liệu. Viết các lệnh ALTER TABLE thực hiện các thay đổi sau theo thứ tự.',
      tasks: [
        'Thêm cột so_luong_ton INT NOT NULL DEFAULT 0',
        'Thêm cột mo_ta NVARCHAR(MAX) cho phép NULL',
        'Đổi kiểu cột ten từ NVARCHAR(255) sang NVARCHAR(300)',
        'Thêm ràng buộc CHECK so_luong_ton >= 0 tên CK_SANPHAM_TON',
        'Xoá cột mo_ta',
      ],
      signature: 'ALTER TABLE … ADD / ALTER COLUMN / ADD CONSTRAINT / DROP COLUMN',
      examples: [
        { input: 'ALTER TABLE SAN_PHAM ADD so_luong_ton INT NOT NULL', output: 'Lỗi khi bảng có dữ liệu', explain: 'Các dòng cũ không có giá trị cho cột NOT NULL mới; phải kèm DEFAULT 0.' },
      ],
    },
    {
      id: 'b35-3', level: 'Trung bình', title: 'Nhận diện quan hệ từ đặc tả',
      requirement: 'Cho đặc tả hệ thống bán hàng ở mục 4 (khách hàng, đơn hàng, sản phẩm, danh mục cha con, nhân viên quản lý nhân viên, nhập hàng từ nhà cung cấp, lịch sử giá). Lập bảng: cặp bảng | loại quan hệ (trong 7 loại) | khoá ngoại đặt ở đâu | có cần bảng trung gian không.',
      signature: 'Bảng ≥ 7 dòng',
      examples: [
        { input: 'KHACH_HANG – DON_HANG', output: '1-N, FK khach_hang_id ở DON_HANG, không cần bảng trung gian' },
        { input: 'PHIEU_NHAP – SAN_PHAM', output: 'N-N, bảng CHI_TIET_PHIEU_NHAP(phieu_nhap_id, san_pham_id, so_luong, gia_nhap)', explain: 'Một phiếu nhập nhiều sản phẩm, một sản phẩm được nhập nhiều lần với giá nhập khác nhau.' },
        { input: 'SAN_PHAM – LICH_SU_GIA', output: 'Temporal (1-N theo thời gian), có tu_ngay, den_ngay' },
      ],
    },
    {
      id: 'b35-4', level: 'Trung bình', title: 'Thiết kế db_QLBanSach',
      requirement: 'Cho ERD nhà sách: Sách thuộc một Thể loại và một Nhà xuất bản; một Sách có nhiều Tác giả, một Tác giả viết nhiều Sách (kèm vai trò: chính / đồng tác giả); Khách hàng lập Hoá đơn; Hoá đơn có nhiều Sách với số lượng và đơn giá. Xây dựng database db_QLBanSach với đầy đủ bảng, khoá chính, khoá ngoại.',
      tasks: [
        'Viết script CREATE DATABASE db_QLBanSach và USE',
        'Tạo các bảng THE_LOAI, NHA_XUAT_BAN, TAC_GIA, SACH, SACH_TAC_GIA, KHACH_HANG, HOA_DON, CHI_TIET_HOA_DON',
        'Thêm khoá ngoại bằng ALTER TABLE ADD CONSTRAINT, đặt tên FK_<BẢNG>_<BẢNG>',
        'Thêm CHECK cho giá, số lượng; UNIQUE cho email khách hàng',
      ],
      signature: 'CREATE TABLE … · PRIMARY KEY (sach_id, tac_gia_id) · ALTER TABLE ADD CONSTRAINT FK_…',
      constraints: ['Bảng cha tạo trước bảng con', 'Kiểu cột FK trùng kiểu PK được tham chiếu'],
      examples: [
        { input: 'INSERT SACH_TAC_GIA (1, 1) hai lần', output: 'Lỗi Violation of PRIMARY KEY constraint', explain: 'Khoá chính kép không cho cùng một cặp sách – tác giả lặp lại.' },
        { input: 'INSERT SACH với the_loai_id = 99 không tồn tại', output: 'Lỗi FOREIGN KEY constraint' },
      ],
      visual: {
        kind: 'uml',
        caption: 'Gợi ý các bảng chính của db_QLBanSach',
        children: [
          { name: 'SACH', attrs: ['PK id', 'ten_sach', 'gia', 'FK the_loai_id', 'FK nxb_id'] },
          { name: 'SACH_TAC_GIA', attrs: ['PK,FK sach_id', 'PK,FK tac_gia_id', 'vai_tro'] },
          { name: 'HOA_DON', attrs: ['PK id', 'FK khach_hang_id', 'ngay_lap'] },
          { name: 'CHI_TIET_HOA_DON', attrs: ['PK,FK hoa_don_id', 'PK,FK sach_id', 'so_luong', 'don_gia'] },
        ],
      },
      dense: true,
    },
    {
      id: 'b35-5', level: 'Trung bình', title: 'Tạo bảng cho SalesDB',
      requirement: 'Xây dựng database SalesDB với bốn bảng: Customers(CustomerID, Name, Email, Phone, Address), Products(ProductID, ProductName, Price, Stock), Orders(OrderID, CustomerID, OrderDate, TotalAmount), OrderDetails(OrderDetailID, OrderID, ProductID, Quantity, Price). Chọn kiểu dữ liệu, ràng buộc và hành động khoá ngoại phù hợp.',
      signature: 'CREATE DATABASE SalesDB · 4 × CREATE TABLE · 3 × FOREIGN KEY',
      constraints: ['OrderDate mặc định GETDATE()', 'Price, TotalAmount ≥ 0; Quantity > 0; Stock ≥ 0', 'Xoá Orders thì xoá OrderDetails; xoá Products đã bán thì bị chặn'],
      examples: [
        { input: 'DELETE FROM Orders WHERE OrderID = 1', output: 'Đơn 1 và mọi OrderDetails của đơn 1 bị xoá', explain: 'FK OrderDetails → Orders là ON DELETE CASCADE.' },
        { input: 'DELETE FROM Products WHERE ProductID = 2 (đã có trong đơn)', output: 'Lỗi REFERENCE constraint', explain: 'FK OrderDetails → Products là NO ACTION.' },
      ],
      visual: {
        kind: 'flow',
        caption: 'Thứ tự tạo bảng SalesDB',
        steps: [
          { kind: 'start', text: 'USE SalesDB' },
          { kind: 'process', text: 'Customers, Products (không phụ thuộc ai)' },
          { kind: 'process', text: 'Orders (FK → Customers)' },
          { kind: 'process', text: 'OrderDetails (FK → Orders CASCADE, FK → Products NO ACTION)' },
          { kind: 'end', text: 'Kiểm tra bằng Database Diagram' },
        ],
      },
    },
    {
      id: 'b35-6', level: 'Nâng cao', title: 'Danh mục nhiều cấp',
      requirement: 'Cho cây danh mục: Điện tử → (Laptop → Gaming, Văn phòng), (Điện thoại → iPhone, Android), Máy ảnh; Điện lạnh → Tủ lạnh, Máy lạnh. Xây dựng bảng DANH_MUC tự liên kết, thêm dữ liệu đúng cây, và bảng SAN_PHAM có danh_muc_id. Viết ràng buộc để không thể xoá danh mục còn danh mục con.',
      signature: 'DANH_MUC(id, ten, danh_muc_cha_id NULL REFERENCES DANH_MUC(id))',
      constraints: ['Danh mục gốc có danh_muc_cha_id NULL', 'Một danh mục không thể là cha của chính nó (CHECK)'],
      examples: [
        { input: 'DELETE DANH_MUC Laptop', output: 'Lỗi REFERENCE constraint', explain: 'Gaming và Văn phòng còn trỏ về Laptop; FK mặc định NO ACTION.' },
        { input: 'UPDATE DANH_MUC SET danh_muc_cha_id = id WHERE ten = N"Máy ảnh"', output: 'Lỗi CHECK constraint', explain: 'CHECK (danh_muc_cha_id <> id).' },
      ],
      hint: 'SQL Server không cho ON DELETE CASCADE trên khoá ngoại tự liên kết (lỗi multiple cascade paths), nên chỉ dùng NO ACTION hoặc xử lý bằng code.',
      visual: {
        kind: 'tree',
        caption: 'Cây danh mục cần lưu',
        root: {
          label: '(gốc)',
          children: [
            { label: 'Điện tử', children: [
              { label: 'Laptop', children: [{ label: 'Gaming' }, { label: 'Văn phòng' }] },
              { label: 'Điện thoại', children: [{ label: 'iPhone' }, { label: 'Android' }] },
              { label: 'Máy ảnh' },
            ] },
            { label: 'Điện lạnh', children: [{ label: 'Tủ lạnh' }, { label: 'Máy lạnh' }] },
          ],
        },
      },
    },
    {
      id: 'b35-7', level: 'Nâng cao', title: 'Đặt vé xem phim — quan hệ kết hợp',
      requirement: 'Cho hệ thống rạp: Khách hàng (Customers), Phim (Movies), Suất chiếu (một phim có nhiều suất ở các phòng), Vé (Tickets) kết hợp khách hàng – suất chiếu – ghế. Xây dựng database cinema_cybersoft sao cho một ghế trong một suất chiếu chỉ bán được một lần.',
      tasks: [
        'Tạo bảng Customers, Movies, Showtimes(id, movie_id, phong, bat_dau)',
        'Tạo bảng Tickets(id, customer_id, showtime_id, ghe, gia) với các khoá ngoại',
        'Thêm ràng buộc UNIQUE (showtime_id, ghe)',
        'Thêm dữ liệu: khách 101 đặt phim Avengers ghế A1 và Inception ghế B2; khách 102 đặt Avengers ghế A2',
      ],
      signature: 'CONSTRAINT UQ_TICKET_GHE UNIQUE (showtime_id, ghe)',
      examples: [
        { input: 'Khách 102 đặt Avengers suất 1 ghế A1', output: 'Lỗi Violation of UNIQUE KEY constraint', explain: 'Ghế A1 của suất đó đã thuộc khách 101.' },
        { input: 'Khách 102 đặt Avengers suất 2 ghế A1', output: 'Thành công', explain: 'Khác suất chiếu nên cặp (showtime_id, ghe) khác.' },
      ],
      hint: 'Vé không chỉ nối hai bảng mà còn mang thông tin riêng (ghế, giá) — đó là điểm khác của quan hệ kết hợp so với bảng trung gian N-N thuần.',
    },
    {
      id: 'b35-8', level: 'Nâng cao', title: 'Lịch sử giá sản phẩm',
      requirement: 'Cửa hàng cần biết giá bán của mỗi sản phẩm tại bất kỳ ngày nào trong quá khứ. Xây dựng hai phương án và so sánh: (A) temporal table SAN_PHAM có SYSTEM_VERSIONING; (B) bảng LICH_SU_GIA(san_pham_id, gia, tu_ngay, den_ngay) do ứng dụng tự ghi.',
      tasks: [
        'Viết script phương án A, UPDATE giá tivi ba lần, truy vấn bảng lịch sử',
        'Viết script phương án B với khoá chính (san_pham_id, tu_ngay) và CHECK den_ngay > tu_ngay',
        'Viết truy vấn lấy giá tivi ngày 2026-05-01 theo từng phương án',
        'Lập bảng so sánh: ai ghi lịch sử, sửa được lịch sử không, khi nào chọn cách nào',
      ],
      signature: 'FOR SYSTEM_TIME AS OF \'2026-05-01\' · WHERE tu_ngay <= @ngay AND (den_ngay IS NULL OR den_ngay > @ngay)',
      examples: [
        { input: 'Phương án A: SELECT gia FROM SAN_PHAM FOR SYSTEM_TIME AS OF "2026-05-01" WHERE id = 1', output: 'Giá có hiệu lực ngày đó' },
        { input: 'Phương án B: giá hiện hành', output: 'Dòng có den_ngay IS NULL', explain: 'Dòng lịch sử đang hiệu lực chưa có ngày kết thúc.' },
      ],
      hint: 'Temporal table ghi tự động và không cho sửa lịch sử; bảng tự quản lý linh hoạt hơn (ví dụ đặt giá khuyến mãi trước cho tương lai).',
    },
  ],
}

export default buoi35
