import type { Buoi } from './types'

const buoi36: Buoi = {
  id: 36,
  slug: 'truy-van-du-lieu-dml-dql',
  title: 'Truy vấn dữ liệu: DML & DQL',
  subtitle: 'Thêm, sửa, xoá dữ liệu an toàn; lọc, sắp xếp, phân trang, gom nhóm, JOIN và truy vấn lồng trên CSDL cửa hàng',
  duration: '3 giờ',
  keywords: ['INSERT / UPDATE / DELETE', 'WHERE', 'OFFSET FETCH', 'GROUP BY / HAVING', 'JOIN', 'UNION', 'Subquery'],
  goals: [
    'Viết INSERT nhiều dòng, UPDATE và DELETE có WHERE, cập nhật từ bảng khác',
    'Lọc, sắp xếp, giới hạn và phân trang kết quả với WHERE, ORDER BY, TOP, OFFSET FETCH',
    'Gom nhóm bằng GROUP BY với hàm tổng hợp, phân biệt WHERE và HAVING',
    'Chọn đúng loại JOIN, phép tập hợp hoặc subquery cho từng câu hỏi nghiệp vụ và hiểu thứ tự thực thi của SELECT',
  ],

  sections: [
    {
      id: 'dml',
      title: '1. DML — thêm, sửa, xoá dữ liệu',
      blocks: [
        {
          type: 'text',
          text: 'DML (Data Manipulation Language) chỉ thay đổi nội dung các dòng, không đụng cấu trúc bảng. Ba lệnh chính là INSERT, UPDATE, DELETE; SELECT thuộc nhóm DQL nhưng cũng không đổi cấu trúc nên thường được học chung. Ví dụ dùng bảng Employees của slide và các bảng cửa hàng ở buổi 35.',
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'INSERT một dòng và nhiều dòng',
            code: `-- Một dòng: liệt kê cột, không đưa cột IDENTITY vào
INSERT INTO Employees (FullName, Age, Salary, DepartmentID)
VALUES (N'Nguyễn Văn A', 30, 15000, 2);

-- Nhiều dòng trong một lệnh
INSERT INTO Employees (FullName, Age, Salary, DepartmentID)
VALUES
    (N'Trần Thị B', 28, 12000, 1),
    (N'Lê Văn C',   35, 18000, 3);

-- Lấy id vừa sinh ra
INSERT INTO KHACH_HANG (ten, email, sdt)
VALUES (N'Phạm Thị D', 'ptd@example.com', '0909000111');
SELECT SCOPE_IDENTITY() AS id_moi;`,
            note: 'Luôn ghi danh sách cột: bảng thêm cột sau này thì INSERT không ghi cột sẽ hỏng. Chuỗi có dấu thêm tiền tố N, không có thì thành dấu hỏi.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'UPDATE và DELETE',
            code: `-- Cập nhật một dòng (theo khoá chính)
UPDATE Employees SET Salary = 20000 WHERE EmployeeID = 1;

-- Cập nhật nhiều dòng
UPDATE Employees SET Salary = Salary * 1.1   -- tăng 10% lương
WHERE DepartmentID = 2;

-- Cập nhật từ bảng khác
UPDATE E1
SET Salary = E2.Salary
FROM Employees E1
INNER JOIN EmployeesBackup E2 ON E1.EmployeeID = E2.EmployeeID;

DELETE FROM Employees WHERE EmployeeID = 2;   -- một dòng
DELETE FROM Employees WHERE Age < 22;         -- nhiều dòng
DELETE FROM Employees;                        -- toàn bộ bảng!`,
            note: 'Khi UPDATE … FROM có JOIN, viết UPDATE E1 (bí danh) cho rõ bảng nào bị sửa. DELETE rollback được trong transaction, TRUNCATE thì không kích hoạt CASCADE.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Thói quen trước khi chạy UPDATE / DELETE',
            steps: [
              { kind: 'start', text: 'Cần sửa / xoá dữ liệu' },
              { kind: 'process', text: 'Viết SELECT * với đúng WHERE định dùng' },
              { kind: 'decision', text: 'Số dòng trả về đúng như mong đợi?', branches: [
                { label: 'Không', steps: [{ kind: 'process', text: 'Sửa lại WHERE' }] },
                { label: 'Có', steps: [{ kind: 'process', text: 'BEGIN TRANSACTION; đổi SELECT thành UPDATE / DELETE' }] },
              ] },
              { kind: 'decision', text: '(n rows affected) khớp?', branches: [
                { label: 'Có', steps: [{ kind: 'process', text: 'COMMIT' }] },
                { label: 'Không', steps: [{ kind: 'process', text: 'ROLLBACK' }] },
              ] },
              { kind: 'end', text: 'Dữ liệu an toàn' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Quên WHERE là sửa / xoá cả bảng',
          text: 'Bôi đen trong Azure Data Studio rồi bấm Run chỉ chạy phần bôi đen. Bôi thiếu dòng WHERE thì UPDATE Employees SET Salary = 20000 sẽ chạy cho mọi nhân viên. Luôn bọc trong BEGIN TRANSACTION khi thao tác trên dữ liệu thật.',
        },
      ],
    },
    {
      id: 'select-loc',
      title: '2. SELECT — chọn cột, lọc, sắp xếp, phân trang',
      blocks: [
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Chọn cột và lọc bằng WHERE',
            code: `SELECT * FROM Employees;                         -- tất cả cột (chỉ để xem nhanh)
SELECT EmployeeID AS ID, FullName AS Name, Salary AS Monthly_Salary
FROM Employees;                                   -- đặt bí danh cột

SELECT * FROM SAN_PHAM
WHERE gia >= 5000000 AND danh_muc_id = 3;         -- nhiều điều kiện

SELECT * FROM SAN_PHAM
WHERE danh_muc_id IN (1, 3, 5);                   -- thuộc một tập

SELECT * FROM SAN_PHAM
WHERE gia BETWEEN 5000000 AND 15000000;           -- gồm cả hai đầu

SELECT * FROM SAN_PHAM WHERE ten LIKE N'Tivi%';   -- bắt đầu bằng Tivi
SELECT * FROM SAN_PHAM WHERE ten LIKE N'%LG%';    -- chứa LG
SELECT * FROM KHACH_HANG WHERE sdt LIKE '09_______'; -- 09 + đúng 8 ký tự`,
            note: 'WHERE giống if trong C#. So sánh với NULL phải dùng IS NULL / IS NOT NULL — WHERE email = NULL không bao giờ đúng.',
          },
        },
        {
          type: 'table',
          head: ['Ký tự LIKE', 'Ý nghĩa', 'Ví dụ khớp'],
          rows: [
            ['%', 'Không hoặc nhiều ký tự bất kỳ', "N'%Samsung%' khớp Tivi Samsung 55"],
            ['_', 'Đúng một ký tự', "'TV0_' khớp TV01, TV09, không khớp TV10"],
            ['[abc]', 'Một ký tự trong tập', "'[TM]%' bắt đầu bằng T hoặc M"],
            ['[^a]', 'Một ký tự không thuộc tập', "'[^T]%' không bắt đầu bằng T"],
          ],
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'ORDER BY, TOP và phân trang OFFSET FETCH',
            code: `SELECT ten, gia FROM SAN_PHAM
ORDER BY gia DESC, ten ASC;              -- giá giảm dần, cùng giá thì theo tên

SELECT TOP 5 ten, gia FROM SAN_PHAM
ORDER BY gia DESC;                       -- 5 sản phẩm đắt nhất

SELECT TOP 10 PERCENT ten, gia FROM SAN_PHAM
ORDER BY gia DESC;                       -- 10% số dòng

DECLARE @trang INT = 2, @kichThuoc INT = 10;
SELECT id, ten, gia FROM SAN_PHAM
ORDER BY id
OFFSET (@trang - 1) * @kichThuoc ROWS    -- bỏ qua 10 dòng đầu
FETCH NEXT @kichThuoc ROWS ONLY;         -- lấy 10 dòng tiếp`,
            note: 'OFFSET FETCH bắt buộc có ORDER BY. Đây chính là Skip / Take của LINQ mà Entity Framework sẽ dịch ra ở buổi sau.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'strip',
            caption: 'OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY — trang 2',
            name: 'SAN_PHAM sắp theo id',
            items: ['1', '…', '10', '11', '12', '…', '20', '21', '…'],
            highlight: [3, 4, 5, 6],
          },
        },
      ],
    },
    {
      id: 'group-by',
      title: '3. GROUP BY, HAVING và thứ tự thực thi',
      blocks: [
        {
          type: 'text',
          text: 'GROUP BY gom các dòng có cùng giá trị thành một nhóm, rồi hàm tổng hợp (COUNT, SUM, AVG, MIN, MAX) tính một con số cho mỗi nhóm. WHERE lọc từng dòng trước khi gom; HAVING lọc các nhóm sau khi gom.',
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Doanh thu theo khách hàng',
            code: `SELECT d.khach_hang_id,
       COUNT(*)          AS so_don,
       SUM(d.tong_tien)  AS tong_chi,
       AVG(d.tong_tien)  AS trung_binh_don
FROM DON_HANG d
WHERE d.ngay_dat >= '2026-01-01'          -- lọc DÒNG: chỉ đơn năm 2026
GROUP BY d.khach_hang_id
HAVING SUM(d.tong_tien) > 20000000        -- lọc NHÓM: khách chi trên 20 triệu
ORDER BY tong_chi DESC;

-- Trả kết quả dạng JSON cho API
SELECT id, ten, gia FROM SAN_PHAM
WHERE gia > 10000000
FOR JSON PATH;`,
            note: 'Trong SELECT có GROUP BY, mọi cột không nằm trong hàm tổng hợp phải có mặt trong GROUP BY. ORDER BY dùng được bí danh tong_chi vì nó chạy sau SELECT; HAVING thì không.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Thứ tự SQL Server thực thi logic một câu SELECT (khác thứ tự viết)',
            items: [
              { label: '1. FROM / JOIN', text: 'Lấy các bảng, ghép dòng theo điều kiện ON' },
              { label: '2. WHERE', text: 'Bỏ các dòng không thoả — chưa có bí danh cột' },
              { label: '3. GROUP BY', text: 'Gom dòng thành nhóm' },
              { label: '4. HAVING', text: 'Bỏ các nhóm không thoả' },
              { label: '5. SELECT', text: 'Tính cột, đặt bí danh AS' },
              { label: '6. ORDER BY', text: 'Sắp xếp — dùng được bí danh' },
              { label: '7. TOP / OFFSET', text: 'Cắt số dòng trả về' },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'WHERE so với HAVING',
            columns: [
              { title: 'WHERE', tone: 'plain', items: ['Lọc từng dòng', 'Chạy trước GROUP BY', 'Không dùng được SUM, COUNT'] },
              { title: 'HAVING', tone: 'plain', items: ['Lọc từng nhóm', 'Chạy sau GROUP BY', 'Dùng hàm tổng hợp: HAVING COUNT(*) >= 3'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Lỗi "Invalid column name" với bí danh',
          text: 'SELECT gia * 1.1 AS gia_moi FROM SAN_PHAM WHERE gia_moi > 10000000 báo lỗi vì WHERE chạy trước SELECT, lúc đó gia_moi chưa tồn tại. Viết lại WHERE gia * 1.1 > 10000000.',
        },
      ],
    },
    {
      id: 'join',
      title: '4. JOIN và phép tập hợp',
      blocks: [
        {
          type: 'text',
          text: 'Dữ liệu đã được tách thành nhiều bảng ở buổi 35, nên muốn hiện "đơn hàng kèm tên khách" phải ghép lại bằng JOIN theo cặp khoá ngoại – khoá chính. INNER JOIN dùng nhiều nhất vì chỉ trả về dòng khớp ở cả hai bảng.',
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'INNER JOIN và LEFT JOIN',
            code: `-- Đơn hàng kèm tên khách
SELECT d.id, k.ten, d.ngay_dat, d.tong_tien
FROM DON_HANG d
INNER JOIN KHACH_HANG k ON d.khach_hang_id = k.id;

-- Chi tiết đơn kèm tên sản phẩm (ba bảng)
SELECT d.id AS ma_don, s.ten, c.so_luong, c.gia_ban,
       c.so_luong * c.gia_ban AS thanh_tien
FROM DON_HANG d
JOIN CHI_TIET_DON_HANG c ON c.don_hang_id = d.id
JOIN SAN_PHAM s          ON s.id = c.san_pham_id;

-- Mọi khách, kể cả chưa mua lần nào
SELECT k.ten, COUNT(d.id) AS so_don
FROM KHACH_HANG k
LEFT JOIN DON_HANG d ON d.khach_hang_id = k.id
GROUP BY k.id, k.ten;`,
            note: 'Ở LEFT JOIN đếm COUNT(d.id) chứ không COUNT(*): khách chưa có đơn vẫn có một dòng với d.id NULL, COUNT(*) sẽ đếm thành 1.',
          },
        },
        {
          type: 'table',
          head: ['Loại JOIN', 'Trả về', 'Khi nào dùng'],
          rows: [
            ['INNER JOIN', 'Chỉ dòng khớp ở cả hai bảng', 'Đơn hàng kèm tên khách, chi tiết kèm tên sản phẩm'],
            ['LEFT JOIN', 'Mọi dòng bảng trái, bảng phải NULL nếu không khớp', 'Mọi khách kèm số đơn, kể cả 0 đơn'],
            ['RIGHT JOIN', 'Mọi dòng bảng phải', 'Ít dùng — đảo bảng rồi dùng LEFT cho dễ đọc'],
            ['FULL JOIN', 'Mọi dòng cả hai bảng', 'Đối soát hai danh sách, tìm chỗ lệch'],
            ['CROSS JOIN', 'Mọi tổ hợp (tích Descartes)', 'Sinh bảng giá: mọi sản phẩm × mọi chi nhánh'],
            ['Self JOIN', 'Bảng ghép với chính nó', 'Nhân viên kèm tên người quản lý'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Chọn loại JOIN',
            steps: [
              { kind: 'start', text: 'Cần ghép bảng A và B' },
              { kind: 'decision', text: 'Có cần giữ dòng A không khớp với B?', branches: [
                { label: 'Không', steps: [{ kind: 'decision', text: 'Có cần giữ dòng B không khớp?', branches: [
                  { label: 'Không', steps: [{ kind: 'io', text: 'INNER JOIN' }] },
                  { label: 'Có', steps: [{ kind: 'io', text: 'B LEFT JOIN A' }] },
                ] }] },
                { label: 'Có', steps: [{ kind: 'decision', text: 'Giữ cả dòng B không khớp?', branches: [
                  { label: 'Không', steps: [{ kind: 'io', text: 'A LEFT JOIN B' }] },
                  { label: 'Có', steps: [{ kind: 'io', text: 'FULL JOIN' }] },
                ] }] },
              ] },
              { kind: 'end', text: 'Kiểm tra số dòng kết quả' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'UNION, INTERSECT, EXCEPT',
            code: `-- Danh bạ gửi khuyến mãi: khách hàng và nhân viên
SELECT email FROM KHACH_HANG
UNION                    -- gộp, bỏ trùng (UNION ALL: giữ trùng, nhanh hơn)
SELECT email FROM NHAN_VIEN;

-- Sản phẩm vừa bán tháng 9 vừa bán tháng 10
SELECT san_pham_id FROM CHI_TIET_DON_HANG c JOIN DON_HANG d ON d.id = c.don_hang_id
WHERE MONTH(d.ngay_dat) = 9
INTERSECT
SELECT san_pham_id FROM CHI_TIET_DON_HANG c JOIN DON_HANG d ON d.id = c.don_hang_id
WHERE MONTH(d.ngay_dat) = 10;

-- Sản phẩm chưa từng bán
SELECT id FROM SAN_PHAM
EXCEPT
SELECT san_pham_id FROM CHI_TIET_DON_HANG;`,
            note: 'Hai vế phải cùng số cột và kiểu tương thích. JOIN ghép theo chiều ngang (thêm cột), phép tập hợp ghép theo chiều dọc (thêm dòng).',
          },
        },
      ],
    },
    {
      id: 'subquery',
      title: '5. Subquery — truy vấn lồng',
      blocks: [
        {
          type: 'text',
          text: 'Subquery là câu SELECT nằm bên trong một câu lệnh khác (SELECT, INSERT, UPDATE, DELETE). Truy vấn bên trong chạy để trả về một giá trị hoặc một tập con, truy vấn chính dùng kết quả đó. Có bốn loại.',
        },
        {
          type: 'tabs',
          items: [
            {
              label: 'Scalar',
              hint: 'Trả về đúng một giá trị',
              blocks: [
                {
                  type: 'code',
                  sample: {
                    lang: 'sql',
                    title: 'Sản phẩm đắt hơn giá trung bình',
                    code: `SELECT ten, gia,
       gia - (SELECT AVG(gia) FROM SAN_PHAM) AS chenh_lech
FROM SAN_PHAM
WHERE gia > (SELECT AVG(gia) FROM SAN_PHAM);`,
                    note: 'Subquery scalar trả về nhiều hơn một dòng sẽ báo lỗi "Subquery returned more than 1 value".',
                  },
                },
              ],
            },
            {
              label: 'Multi-row',
              hint: 'Trả về nhiều dòng, dùng IN / ANY / ALL',
              blocks: [
                {
                  type: 'code',
                  sample: {
                    lang: 'sql',
                    title: 'Khách đã từng mua tivi',
                    code: `SELECT ten FROM KHACH_HANG
WHERE id IN (
    SELECT d.khach_hang_id
    FROM DON_HANG d
    JOIN CHI_TIET_DON_HANG c ON c.don_hang_id = d.id
    JOIN SAN_PHAM s ON s.id = c.san_pham_id
    WHERE s.ten LIKE N'Tivi%'
);`,
                    note: 'NOT IN với subquery có giá trị NULL sẽ trả về rỗng — dùng NOT EXISTS an toàn hơn.',
                  },
                },
              ],
            },
            {
              label: 'Correlated',
              hint: 'Phụ thuộc từng dòng của truy vấn ngoài',
              blocks: [
                {
                  type: 'code',
                  sample: {
                    lang: 'sql',
                    title: 'Sản phẩm đắt nhất trong từng danh mục',
                    code: `SELECT s.danh_muc_id, s.ten, s.gia
FROM SAN_PHAM s
WHERE s.gia = (
    SELECT MAX(s2.gia)
    FROM SAN_PHAM s2
    WHERE s2.danh_muc_id = s.danh_muc_id   -- tham chiếu dòng ngoài
);`,
                    note: 'Truy vấn trong chạy lại cho mỗi dòng của s — chậm với bảng lớn nếu không có index trên danh_muc_id.',
                  },
                },
              ],
            },
            {
              label: 'EXISTS',
              hint: 'Chỉ kiểm tra có hay không',
              blocks: [
                {
                  type: 'code',
                  sample: {
                    lang: 'sql',
                    title: 'Khách chưa đặt đơn nào',
                    code: `SELECT k.ten FROM KHACH_HANG k
WHERE NOT EXISTS (
    SELECT 1 FROM DON_HANG d WHERE d.khach_hang_id = k.id
);`,
                    note: 'EXISTS dừng ngay khi tìm thấy dòng đầu tiên, nên SELECT 1 hay SELECT * bên trong đều như nhau.',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Correlated subquery chạy lại với từng dòng ngoài',
            actors: ['Truy vấn ngoài (s)', 'Subquery (s2)'],
            steps: [
              { from: 0, to: 1, text: 'Dòng Tivi Sony, danh_muc_id = 1' },
              { from: 1, to: 0, text: 'MAX(gia) danh mục 1 = 25 triệu', dashed: true },
              { from: 0, to: 0, text: '15 triệu ≠ 25 triệu → loại' },
              { from: 0, to: 1, text: 'Dòng Tivi LG OLED, danh_muc_id = 1' },
              { from: 1, to: 0, text: '25 triệu', dashed: true },
              { from: 0, to: 0, text: 'Bằng nhau → giữ' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'JOIN hay subquery?',
          text: 'Khi được, hãy dùng JOIN — bộ tối ưu của SQL Server xử lý tốt hơn, nhất là với dữ liệu lớn. Subquery hữu ích khi điều kiện đặc biệt: so với MAX / AVG của cả bảng, kiểm tra tồn tại bằng EXISTS / NOT EXISTS, hay lọc theo kết quả một nhóm.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b36-1', level: 'Cơ bản', title: 'Đổ dữ liệu mẫu SalesDB',
      requirement: 'Cho database SalesDB đã tạo ở buổi 35 (Customers, Products, Orders, OrderDetails). Thêm dữ liệu mẫu bằng INSERT nhiều dòng trong một lệnh.',
      tasks: [
        'Thêm 3–5 khách hàng: Nguyễn Văn A (Hà Nội), Trần Thị B (Hồ Chí Minh), Lê Văn C (Đà Nẵng)…',
        'Thêm 4–5 sản phẩm: Laptop Dell XPS 15 (35.000.000, tồn 10), iPhone 14 Pro Max (29.000.000, tồn 20), Chuột Logitech MX Master 3, Bàn phím cơ Keychron K2…',
        'Thêm 3 đơn hàng cho ba khách đầu',
        'Thêm sản phẩm vào từng đơn trong OrderDetails',
      ],
      signature: 'INSERT INTO … (cột…) VALUES (…), (…), (…);',
      examples: [
        { input: "INSERT Customers … VALUES ('Nguyễn Văn A', …)", output: 'Tên hiện "Nguy?n V?n A"', explain: 'Thiếu tiền tố N trước chuỗi Unicode; viết N\'Nguyễn Văn A\'.' },
        { input: 'INSERT OrderDetails với OrderID = 9 chưa có', output: 'Lỗi FOREIGN KEY constraint' },
      ],
    },
    {
      id: 'b36-2', level: 'Cơ bản', title: 'Lọc và sắp xếp sản phẩm',
      requirement: 'Cho bảng Products của SalesDB. Viết từng truy vấn theo yêu cầu.',
      tasks: [
        'Lấy danh sách tất cả khách hàng',
        'Lấy sản phẩm có giá trên 5 triệu, sắp giá giảm dần',
        'Lấy sản phẩm giá từ 2 đến 30 triệu',
        'Lấy sản phẩm có tên chứa "Pro"',
        'Lấy 3 sản phẩm tồn kho ít nhất',
      ],
      signature: 'SELECT … WHERE … BETWEEN / LIKE … ORDER BY … TOP',
      examples: [
        { input: 'Giá trên 5 triệu', output: 'Laptop Dell XPS 15, iPhone 14 Pro Max' },
        { input: 'BETWEEN 2000000 AND 30000000', output: 'iPhone 14 Pro Max, Chuột Logitech MX Master 3', explain: 'BETWEEN gồm cả hai đầu; Bàn phím 1.800.000 nằm ngoài.' },
      ],
    },
    {
      id: 'b36-3', level: 'Trung bình', title: 'Bảy truy vấn SalesDB',
      requirement: 'Cho SalesDB đã có dữ liệu mẫu ở bài 1. Xây dựng các truy vấn trả lời từng câu hỏi nghiệp vụ.',
      tasks: [
        'Hiển thị đơn hàng kèm tên khách hàng, ngày đặt, tổng tiền',
        'Hiển thị chi tiết đơn hàng kèm tên sản phẩm, số lượng, giá',
        'Tính tổng tiền mỗi khách hàng đã chi tiêu',
        'Tính tổng số lượng sản phẩm đã bán ra',
        'Lấy khách hàng chi tiêu nhiều nhất',
      ],
      signature: 'JOIN · GROUP BY · SUM · ORDER BY · TOP 1',
      examples: [
        { input: 'Tổng chi mỗi khách', output: 'Nguyễn Văn A 63.000.000 · Trần Thị B 29.000.000 · Lê Văn C 1.800.000' },
        { input: 'Tổng số lượng đã bán', output: '4', explain: 'SUM(Quantity) trên OrderDetails: 1 + 1 + 1 + 1.' },
        { input: 'Khách chi nhiều nhất', output: 'Nguyễn Văn A', explain: 'Nếu hai khách bằng nhau, TOP 1 chỉ lấy một; dùng TOP 1 WITH TIES để lấy cả hai.' },
      ],
      visual: {
        kind: 'flow',
        caption: 'Truy vấn "khách chi tiêu nhiều nhất"',
        steps: [
          { kind: 'start', text: 'FROM Customers c JOIN Orders o ON o.CustomerID = c.CustomerID' },
          { kind: 'process', text: 'GROUP BY c.CustomerID, c.Name' },
          { kind: 'process', text: 'SELECT c.Name, SUM(o.TotalAmount) AS TongChi' },
          { kind: 'process', text: 'ORDER BY TongChi DESC' },
          { kind: 'end', text: 'TOP 1 WITH TIES' },
        ],
      },
    },
    {
      id: 'b36-4', level: 'Trung bình', title: 'Phân trang danh sách sản phẩm',
      requirement: 'Cho bảng SAN_PHAM có 47 dòng. Xây dựng truy vấn phân trang nhận @trang và @kichThuoc, sắp theo giá tăng dần, cùng giá thì theo id; kèm một truy vấn trả về tổng số trang.',
      signature: 'ORDER BY gia, id OFFSET (@trang - 1) * @kichThuoc ROWS FETCH NEXT @kichThuoc ROWS ONLY',
      constraints: ['1 ≤ @kichThuoc ≤ 50', '@trang vượt quá số trang thì trả về rỗng, không lỗi'],
      examples: [
        { input: '@trang = 5, @kichThuoc = 10', output: '7 dòng (dòng 41 → 47)' },
        { input: 'Tổng số trang với @kichThuoc = 10', output: '5', explain: 'CEILING(47 / 10.0) = 5; viết 47 / 10 sẽ ra 4 do chia số nguyên.' },
        { input: 'ORDER BY gia (không có id)', output: 'Một sản phẩm có thể xuất hiện ở hai trang', explain: 'Cùng giá thì thứ tự không xác định giữa các lần chạy.' },
      ],
    },
    {
      id: 'b36-5', level: 'Trung bình', title: 'Báo cáo theo danh mục',
      requirement: 'Cho các bảng DANH_MUC, SAN_PHAM, CHI_TIET_DON_HANG. Xây dựng báo cáo mỗi danh mục: số sản phẩm, giá trung bình, doanh thu (so_luong × gia_ban). Chỉ hiện danh mục có doanh thu trên 50 triệu, sắp doanh thu giảm dần, và xuất thêm một bản dạng JSON.',
      signature: 'LEFT JOIN · GROUP BY · HAVING · FOR JSON PATH',
      examples: [
        { input: 'Danh mục Máy ảnh chưa bán', output: 'Không hiện', explain: 'Doanh thu NULL không thoả HAVING > 50 triệu; muốn hiện 0 dùng ISNULL(SUM(…), 0) và bỏ HAVING.' },
        { input: 'Đặt điều kiện doanh thu vào WHERE', output: 'Lỗi: An aggregate may not appear in the WHERE clause' },
      ],
    },
    {
      id: 'b36-6', level: 'Nâng cao', title: 'Mở rộng SalesDB',
      requirement: 'Cho SalesDB ở các bài trên. Bổ sung nghiệp vụ nhân viên và trạng thái đơn hàng.',
      tasks: [
        'Thêm bảng Employees(EmployeeID, Name, Role, Phone) và cột EmployeeID vào Orders',
        'Thêm cột Status vào Orders với CHECK nằm trong (Chờ duyệt, Đã duyệt, Đang giao, Hoàn thành), mặc định Chờ duyệt',
        'Truy vấn tất cả đơn có trạng thái Đang giao kèm tên nhân viên xử lý',
        'Cập nhật Stock trong Products sau khi có đơn mới (UPDATE … FROM … JOIN OrderDetails)',
        'Cập nhật TotalAmount của mọi đơn bằng tổng Quantity × Price trong OrderDetails',
      ],
      signature: 'ALTER TABLE · UPDATE p SET Stock = p.Stock - od.Quantity FROM Products p JOIN OrderDetails od …',
      examples: [
        { input: 'Đơn 1 có 1 Laptop Dell', output: 'Stock Laptop Dell từ 10 còn 9' },
        { input: 'Một đơn có 2 dòng cùng ProductID', output: 'Stock chỉ trừ một lần', explain: 'UPDATE … FROM với nhiều dòng khớp chỉ áp một dòng; phải GROUP BY ProductID trong subquery rồi mới trừ SUM(Quantity).' },
      ],
      hint: 'Bọc phần trừ kho trong BEGIN TRANSACTION … COMMIT để có thể ROLLBACK khi kho âm.',
      visual: {
        kind: 'seq',
        caption: 'Đặt đơn mới và trừ kho',
        actors: ['Ứng dụng', 'Orders', 'OrderDetails', 'Products'],
        steps: [
          { from: 0, to: 1, text: 'INSERT đơn, Status = Chờ duyệt' },
          { from: 1, to: 0, text: 'SCOPE_IDENTITY() = 4', dashed: true },
          { from: 0, to: 2, text: 'INSERT các dòng chi tiết OrderID = 4' },
          { from: 0, to: 3, text: 'UPDATE Stock -= SUM(Quantity) theo ProductID' },
          { from: 0, to: 1, text: 'UPDATE TotalAmount = SUM(Quantity × Price)' },
        ],
      },
    },
    {
      id: 'b36-7', level: 'Nâng cao', title: 'Một câu hỏi, ba cách viết',
      requirement: 'Cho SalesDB. Tìm các khách hàng chưa từng đặt đơn nào, viết bằng ba cách: LEFT JOIN … IS NULL, NOT IN (subquery), NOT EXISTS. Sau đó chèn một đơn có CustomerID NULL (nếu cột cho phép) và so sánh kết quả ba cách.',
      signature: 'LEFT JOIN … WHERE o.OrderID IS NULL · NOT IN · NOT EXISTS',
      examples: [
        { input: 'Dữ liệu bình thường', output: 'Ba cách cùng ra khách 4, 5' },
        { input: 'Orders có một dòng CustomerID NULL', output: 'NOT IN trả về rỗng, hai cách kia vẫn đúng', explain: 'x NOT IN (1, 2, NULL) tương đương x <> 1 AND x <> 2 AND x <> NULL; so sánh với NULL là UNKNOWN nên cả điều kiện không bao giờ đúng.' },
      ],
      hint: 'Ưu tiên NOT EXISTS hoặc LEFT JOIN cho câu hỏi "không có".',
      visual: {
        kind: 'compare',
        caption: 'Ba cách tìm khách chưa mua',
        columns: [
          { title: 'LEFT JOIN … IS NULL', tone: 'good', items: ['Dễ đọc', 'Đúng khi có NULL'] },
          { title: 'NOT IN', tone: 'bad', items: ['Ngắn', 'Sai khi subquery có NULL'] },
          { title: 'NOT EXISTS', tone: 'good', items: ['Dừng sớm', 'Đúng khi có NULL'] },
        ],
      },
    },
    {
      id: 'b36-8', level: 'Nâng cao', title: 'Báo cáo bán chạy và tồn đọng',
      requirement: 'Cho CSDL cửa hàng điện máy (KHACH_HANG, DON_HANG, CHI_TIET_DON_HANG, SAN_PHAM, DANH_MUC). Xây dựng các truy vấn cho trang tổng quan của quản lý.',
      tasks: [
        'Top 3 sản phẩm bán chạy nhất theo số lượng trong tháng 10/2026, có TIES',
        'Sản phẩm chưa từng bán (dùng EXCEPT)',
        'Sản phẩm đắt nhất trong từng danh mục (correlated subquery)',
        'Khách mua trên 3 đơn và tổng chi trên mức trung bình của mọi khách (HAVING + scalar subquery)',
        'Danh sách email gửi khuyến mãi: khách hàng UNION nhân viên, không trùng',
      ],
      signature: 'TOP 3 WITH TIES · EXCEPT · WHERE gia = (SELECT MAX…) · HAVING SUM(…) > (SELECT AVG…) · UNION',
      constraints: ['Mỗi truy vấn kèm một câu giải thích thứ tự thực thi FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY'],
      examples: [
        { input: 'Hai sản phẩm cùng đứng thứ 3', output: 'Kết quả có 4 dòng', explain: 'WITH TIES giữ mọi dòng bằng giá trị dòng cuối.' },
        { input: 'Tổng chi trung bình của khách', output: 'SELECT AVG(tong) FROM (SELECT SUM(tong_tien) AS tong FROM DON_HANG GROUP BY khach_hang_id) t', explain: 'Không lồng AVG(SUM(…)) trực tiếp được; phải tính tổng từng khách ở bảng tạm rồi lấy trung bình.' },
      ],
      hint: 'Viết từng phần, chạy kiểm tra số dòng, rồi mới ghép. Subquery trong FROM bắt buộc có bí danh.',
      dense: true,
      visual: {
        kind: 'timeline',
        caption: 'Thứ tự thực thi một truy vấn báo cáo',
        items: [
          { label: 'FROM / JOIN', text: 'DON_HANG d JOIN CHI_TIET_DON_HANG c' },
          { label: 'WHERE', text: 'ngay_dat trong tháng 10/2026' },
          { label: 'GROUP BY', text: 'c.san_pham_id' },
          { label: 'SELECT', text: 'san_pham_id, SUM(so_luong) AS da_ban' },
          { label: 'ORDER BY', text: 'da_ban DESC' },
          { label: 'TOP', text: '3 WITH TIES' },
        ],
      },
    },
  ],
}

export default buoi36
