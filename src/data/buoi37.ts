import type { Buoi } from './types'

const buoi37: Buoi = {
  id: 37,
  slug: 'sql-transaction-stored-procedure-function-view',
  title: 'Transaction, Stored Procedure, Function & View',
  subtitle: 'Gói nhiều lệnh thành một giao dịch an toàn, đóng gói nghiệp vụ trong database và viết T-SQL có điều kiện, vòng lặp, SQL động',
  duration: '3 giờ',
  keywords: ['BEGIN TRAN / COMMIT / ROLLBACK', 'SAVE TRANSACTION', 'GRANT / REVOKE', 'Stored Procedure', 'Scalar & Table-Valued Function', 'VIEW', 'sp_executesql'],
  goals: [
    'Viết transaction có TRY/CATCH để một nhóm lệnh hoặc thành công hết, hoặc không có gì thay đổi',
    'Tạo và gọi Stored Procedure có tham số input/output, phân biệt khi nào dùng Function',
    'Tạo VIEW để che bớt độ phức tạp của JOIN và giới hạn dữ liệu người dùng được thấy',
    'Dùng IF, WHILE, CASE, CURSOR, OPENJSON và sp_executesql có tham số mà không mở cửa cho SQL injection',
  ],

  sections: [
    {
      id: 'transaction',
      title: '1. TCL — Transaction: tất cả hoặc không gì cả',
      blocks: [
        {
          type: 'text',
          text: 'Nhóm lệnh TCL (Transaction Control Language) gồm BEGIN TRANSACTION, COMMIT, ROLLBACK và SAVE TRANSACTION. Một transaction gom nhiều câu lệnh thành một đơn vị: hoặc tất cả được ghi vào database (COMMIT), hoặc tất cả bị huỷ như chưa từng chạy (ROLLBACK). Ví dụ kinh điển của slide là chuyển tiền giữa hai tài khoản.',
        },
        {
          type: 'table',
          head: ['Nhóm', 'Chức năng', 'Lệnh tiêu biểu'],
          rows: [
            ['TCL (Transaction Control Language)', 'Kiểm soát giao dịch, đảm bảo toàn vẹn dữ liệu', 'BEGIN TRANSACTION, COMMIT, ROLLBACK, SAVE TRANSACTION'],
            ['DCL (Data Control Language)', 'Quản lý quyền truy cập và bảo mật', 'GRANT, REVOKE, DENY'],
          ],
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Không có transaction — rủi ro mất tiền',
            code: `-- Trừ tiền từ tài khoản 5001
UPDATE accounts SET balance = balance - 1000 WHERE account_id = '5001';

-- *** LỖI XẢY RA Ở ĐÂY (mất kết nối, hệ thống sập) ***

-- Cộng tiền vào tài khoản 5002 (LỆNH NÀY KHÔNG CHẠY)
UPDATE accounts SET balance = balance + 1000 WHERE account_id = '5002';`,
            note: 'Mỗi UPDATE tự commit ngay khi chạy xong (autocommit). Lệnh đầu đã ghi vĩnh viễn, lệnh sau không chạy: 5001 mất 1000 mà 5002 không nhận được gì.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Chuyển tiền với BEGIN TRAN + TRY/CATCH',
            code: `BEGIN TRANSACTION;
BEGIN TRY
    UPDATE dbo.accounts SET balance = balance - 1000 WHERE account_id = '5003';
    WAITFOR DELAY '00:00:05';  -- giả lập rủi ro: lỗi ở đây sẽ nhảy vào CATCH
    UPDATE dbo.accounts SET balance = balance + 1000 WHERE account_id = '5002';
    COMMIT;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK;
    PRINT N'Lỗi: ' + ERROR_MESSAGE();
END CATCH;`,
            note: 'Trong 5 giây WAITFOR, thử ngắt kết nối hoặc chạy lệnh gây lỗi: CATCH chạy ROLLBACK, số dư 5003 trở lại như cũ. @@TRANCOUNT > 0 kiểm tra còn transaction đang mở trước khi rollback để tránh lỗi "no corresponding BEGIN TRANSACTION".',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Vòng đời một transaction chuyển tiền',
            steps: [
              { kind: 'start', text: 'BEGIN TRANSACTION' },
              { kind: 'process', text: 'UPDATE trừ tiền 5003 (chưa ghi vĩnh viễn)' },
              { kind: 'process', text: 'UPDATE cộng tiền 5002' },
              {
                kind: 'decision', text: 'Có lỗi giữa chừng?', branches: [
                  { label: 'Không', steps: [{ kind: 'process', text: 'COMMIT' }, { kind: 'end', text: 'Cả hai thay đổi được lưu' }] },
                  { label: 'Có', steps: [{ kind: 'process', text: 'Nhảy vào CATCH → ROLLBACK' }, { kind: 'end', text: 'Dữ liệu trở về như trước BEGIN' }] },
                ],
              },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'SAVE TRANSACTION — rollback một phần',
            code: `BEGIN TRANSACTION;
BEGIN TRY
    SAVE TRANSACTION SavePoint1;           -- điểm lưu trước khi cập nhật
    UPDATE dbo.accounts SET balance = balance - 1000 WHERE account_id = '5003';
    SAVE TRANSACTION SavePoint2;           -- điểm lưu sau khi trừ tiền
    WAITFOR DELAY '00:00:05';
    UPDATE dbo.accounts SET balance = balance + 1000 WHERE account_id = '5002';
    COMMIT;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
    BEGIN
        ROLLBACK TRANSACTION SavePoint1;   -- chỉ huỷ phần sau SavePoint1
        COMMIT;                             -- vẫn phải đóng transaction
    END
    PRINT N'Lỗi: ' + ERROR_MESSAGE();
END CATCH;`,
            note: 'ROLLBACK về savepoint KHÔNG kết thúc transaction: @@TRANCOUNT vẫn là 1. Phải COMMIT hoặc ROLLBACK toàn bộ sau đó, nếu không bảng bị khoá đến khi đóng kết nối.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Savepoint là các mốc có thể quay về bên trong một transaction',
            items: [
              { label: 'BEGIN', text: '@@TRANCOUNT = 1' },
              { label: 'SavePoint1', text: 'Chưa thay đổi gì' },
              { label: 'UPDATE 5003', text: 'balance - 1000' },
              { label: 'SavePoint2', text: 'Đã trừ tiền' },
              { label: 'UPDATE 5002', text: 'Lỗi → ROLLBACK TRANSACTION SavePoint1' },
              { label: 'COMMIT', text: 'Đóng transaction, @@TRANCOUNT = 0' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Quên COMMIT là khoá bảng',
          text: 'Chạy BEGIN TRANSACTION trong cửa sổ truy vấn rồi quên COMMIT: các dòng đã UPDATE bị khoá, người khác SELECT sẽ treo. Luôn kiểm tra SELECT @@TRANCOUNT trước khi đóng cửa sổ.',
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'DCL — cấp và thu hồi quyền',
            code: `-- Tạo login cho ứng dụng và user trong database
CREATE LOGIN app_cuahang WITH PASSWORD = 'MatKhau@123';
USE CuaHangDienMay;
CREATE USER app_cuahang FOR LOGIN app_cuahang;

GRANT SELECT, INSERT, UPDATE ON dbo.DonHang TO app_cuahang;
GRANT SELECT ON dbo.SanPham TO app_cuahang;
GRANT EXECUTE ON dbo.sp_TaoDonHang TO app_cuahang;

REVOKE UPDATE ON dbo.DonHang FROM app_cuahang;   -- thu hồi quyền sửa
DENY DELETE ON dbo.KhachHang TO app_cuahang;     -- cấm hẳn, kể cả qua role`,
            note: 'Chuỗi kết nối của ứng dụng không nên dùng tài khoản sa. Cấp đúng quyền cần thiết (least privilege) và chỉ cấp EXECUTE trên procedure thay vì quyền trực tiếp trên bảng.',
          },
        },
      ],
    },
    {
      id: 'stored-procedure',
      title: '2. Stored Procedure — đóng gói nghiệp vụ trong database',
      blocks: [
        {
          type: 'text',
          text: 'Stored Procedure (SP) là tập câu lệnh T-SQL được đặt tên và lưu trong database để gọi lại. SP chứa được DML (SELECT, INSERT, UPDATE, DELETE), DDL, transaction, gọi SP khác; có tham số đầu vào (INPUT), đầu ra (OUTPUT) hoặc cả hai. Thực thi bằng EXEC.',
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'SP thêm, sửa, xoá sản phẩm',
            code: `CREATE PROCEDURE sp_ThemSanPham
    @Ten NVARCHAR(200), @Gia DECIMAL(18,2), @TonKho INT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO SanPham (Ten, Gia, TonKho) VALUES (@Ten, @Gia, @TonKho);
    SELECT SCOPE_IDENTITY() AS MaMoi;      -- trả mã vừa tạo qua SELECT
END;
GO
CREATE PROCEDURE sp_SuaGia @Ma INT, @GiaMoi DECIMAL(18,2)
AS
    UPDATE SanPham SET Gia = @GiaMoi WHERE Ma = @Ma;
GO
CREATE PROCEDURE sp_XoaSanPham @Ma INT
AS
    DELETE FROM SanPham WHERE Ma = @Ma;
GO
EXEC sp_ThemSanPham N'Tivi Samsung 55 inch', 12500000, 10;
EXEC sp_SuaGia @Ma = 1, @GiaMoi = 11900000;   -- truyền theo tên, rõ ràng hơn`,
            note: 'SET NOCOUNT ON tắt thông báo "(1 row affected)" — giảm lưu lượng và tránh làm rối ứng dụng đọc kết quả. Truyền tham số theo tên (@Ma = 1) an toàn hơn theo vị trí khi SP có nhiều tham số.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Tham số OUTPUT',
            code: `CREATE PROCEDURE sp_ThongKeDonHang
    @MaKhachHang INT,                    -- input
    @SoDon INT OUTPUT,                   -- output
    @TongTien DECIMAL(18,2) OUTPUT       -- output
AS
BEGIN
    SET NOCOUNT ON;
    SELECT @SoDon = COUNT(*), @TongTien = ISNULL(SUM(TongTien), 0)
    FROM DonHang
    WHERE MaKhachHang = @MaKhachHang;
END;
GO
DECLARE @so INT, @tong DECIMAL(18,2);
EXEC sp_ThongKeDonHang @MaKhachHang = 1, @SoDon = @so OUTPUT, @TongTien = @tong OUTPUT;
SELECT @so AS SoDon, @tong AS TongTien;`,
            note: 'Từ khoá OUTPUT phải có ở CẢ HAI nơi: khi khai báo và khi EXEC. Quên ở EXEC thì biến @so vẫn NULL mà không báo lỗi. Thực tế ít dùng OUTPUT; thường trả kết quả bằng SELECT vì ứng dụng/EF đọc dễ hơn.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'func',
            caption: 'sp_ThongKeDonHang nhìn như một hàm nhiều giá trị trả về',
            name: 'sp_ThongKeDonHang',
            params: ['@MaKhachHang INT (input)'],
            body: 'COUNT(*), SUM(TongTien) trên DonHang của khách',
            returns: '@SoDon OUTPUT, @TongTien OUTPUT',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'sp_TaoDonHang: kiểm tra tồn kho rồi ghi đơn trong một transaction',
            steps: [
              { kind: 'io', text: 'EXEC sp_TaoDonHang @MaKH, @MaSP, @SoLuong' },
              {
                kind: 'decision', text: 'TonKho >= @SoLuong ?', branches: [
                  { label: 'Không', steps: [{ kind: 'end', text: 'THROW 50001, N\'Không đủ hàng\'' }] },
                  {
                    label: 'Có', steps: [
                      { kind: 'process', text: 'BEGIN TRAN' },
                      { kind: 'process', text: 'INSERT DonHang, INSERT ChiTietDonHang' },
                      { kind: 'process', text: 'UPDATE SanPham SET TonKho -= @SoLuong' },
                      { kind: 'end', text: 'COMMIT, SELECT mã đơn mới' },
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'CREATE OR ALTER',
          text: 'Từ SQL Server 2016 SP1 có CREATE OR ALTER PROCEDURE: chạy lại script nhiều lần không bị lỗi "already exists", không cần DROP trước.',
        },
      ],
    },
    {
      id: 'function-view',
      title: '3. Function và View',
      blocks: [
        {
          type: 'text',
          text: 'Function là đoạn T-SQL bắt buộc trả về giá trị và được gọi BÊN TRONG câu SELECT, WHERE, FROM. Có ba loại: Scalar Function (trả một giá trị), Table-Valued Function (trả bảng — inline hoặc multi-statement) và System Function có sẵn như GETDATE(), LEN(), UPPER().',
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Scalar function: CalculateTax',
            code: `CREATE FUNCTION CalculateTax (@Price DECIMAL(10,2))
RETURNS DECIMAL(10,2)
AS
BEGIN
    RETURN @Price * 0.10;   -- Thuế 10%
END;
GO
-- Gọi hàm trong SELECT, phải có tên schema dbo.
SELECT ProductName, Price, dbo.CalculateTax(Price) AS Tax
FROM dbo.Products;`,
            note: 'Gọi scalar function bắt buộc kèm schema: dbo.CalculateTax(...). Viết CalculateTax(...) sẽ lỗi "is not a recognized built-in function name".',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'Inline TVF và Multi-statement TVF',
            code: `-- 1. Inline: chỉ một câu SELECT, tối ưu như view có tham số
CREATE FUNCTION fn_SanPhamTheoNhom (@Nhom NVARCHAR(50))
RETURNS TABLE
AS RETURN (
    SELECT Ma, Ten, Gia FROM SanPham WHERE Nhom = @Nhom
);
GO
SELECT * FROM dbo.fn_SanPhamTheoNhom(N'Điện lạnh') WHERE Gia < 10000000;
GO
-- 2. Multi-statement: khai báo bảng trả về, xử lý nhiều bước
CREATE FUNCTION fn_XepHangKhach (@Nam INT)
RETURNS @KetQua TABLE (MaKH INT, TongChi DECIMAL(18,2), Hang NVARCHAR(10))
AS
BEGIN
    INSERT INTO @KetQua (MaKH, TongChi)
    SELECT MaKhachHang, SUM(TongTien) FROM DonHang
    WHERE YEAR(NgayDat) = @Nam GROUP BY MaKhachHang;

    UPDATE @KetQua SET Hang = CASE WHEN TongChi >= 50000000 THEN N'VIP' ELSE N'Thường' END;
    RETURN;
END;`,
            note: 'Inline TVF nhanh hơn vì SQL Server gộp câu SELECT vào truy vấn ngoài như một view. Multi-statement TVF linh hoạt hơn nhưng optimizer coi nó như hộp đen, ước lượng số dòng sai và có thể chậm với dữ liệu lớn.',
          },
        },
        {
          type: 'table',
          head: ['Tiêu chí', 'Stored Procedure', 'Function'],
          rows: [
            ['Kiểu trả về', 'Không bắt buộc (có thể OUTPUT hoặc SELECT)', 'Bắt buộc: một giá trị hoặc một bảng'],
            ['Cách gọi', 'EXEC độc lập hoặc từ ứng dụng', 'Trong SELECT, WHERE, FROM, JOIN'],
            ['Thay đổi dữ liệu', 'INSERT, UPDATE, DELETE được', 'Không được sửa bảng thật'],
            ['Transaction, TRY/CATCH', 'Có', 'Không'],
            ['Gọi trong SELECT', 'Không', 'Có'],
            ['Hiệu suất', 'Tốt cho tác vụ phức tạp, dữ liệu lớn', 'Scalar gọi từng dòng có thể chậm'],
            ['Ví dụ', 'Tạo đơn, chuyển tiền, xoá hàng loạt', 'Tính thuế, lọc ra bảng con'],
          ],
        },
        {
          type: 'text',
          text: 'VIEW là bảng ảo: chỉ lưu câu SELECT, không lưu dữ liệu. Mỗi lần truy vấn view, SQL Server chạy lại câu SELECT trên bảng nguồn nên luôn thấy dữ liệu mới nhất.',
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'View đơn hàng kèm tên khách',
            code: `CREATE VIEW vw_DonHangKhachHang AS
SELECT d.Ma AS MaDon, k.HoTen, k.SoDienThoai, d.NgayDat, d.TongTien, d.TrangThai
FROM DonHang d
JOIN KhachHang k ON k.Ma = d.MaKhachHang;
GO
-- Dùng như một bảng
SELECT * FROM vw_DonHangKhachHang
WHERE TrangThai = N'Đang giao'
ORDER BY NgayDat DESC;

-- Nhân viên chăm sóc chỉ được xem view, không xem bảng KhachHang gốc
GRANT SELECT ON vw_DonHangKhachHang TO nv_cskh;`,
            note: 'View không nhận ORDER BY bên trong (trừ khi kèm TOP). Sắp xếp ở câu truy vấn ngoài view.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Đặc điểm của VIEW',
            columns: [
              { title: 'Ưu điểm', tone: 'good', items: ['Bảo mật: chỉ lộ cột, dòng cần thiết', 'Tiện lợi: giấu JOIN phức tạp', 'Bảo trì: bảng gốc đổi dữ liệu, view tự thấy'] },
              { title: 'Hạn chế', tone: 'bad', items: ['Không UPDATE được khi có nhiều bảng, GROUP BY, HAVING', 'Không có tham số (dùng inline TVF)', 'View lồng view phức tạp dễ chậm'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Chọn gì?',
          text: 'Cần đọc dữ liệu cố định → VIEW. Đọc có tham số → inline TVF. Tính một giá trị dùng trong SELECT → scalar function. Có ghi dữ liệu hoặc nhiều bước, transaction → Stored Procedure.',
        },
      ],
    },
    {
      id: 'control-flow',
      title: '4. Điều khiển luồng: IF, WHILE, CASE, CURSOR, OPENJSON',
      blocks: [
        {
          type: 'text',
          text: 'T-SQL có đủ lệnh điều khiển như C#: IF...ELSE, WHILE (kèm BREAK, CONTINUE), BEGIN...END để gom khối, CASE trong biểu thức, TRY...CATCH, RETURN. Các lệnh này kết hợp với SELECT để viết logic trong SP.',
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'IF...ELSE và CASE',
            code: `DECLARE @MaSP INT = 3, @TonKho INT;
SELECT @TonKho = TonKho FROM SanPham WHERE Ma = @MaSP;

IF @TonKho IS NULL
    PRINT N'Không tìm thấy sản phẩm';
ELSE IF @TonKho = 0
BEGIN
    PRINT N'Hết hàng';
    UPDATE SanPham SET TrangThai = N'Ngừng bán' WHERE Ma = @MaSP;
END
ELSE
    PRINT N'Còn ' + CAST(@TonKho AS NVARCHAR(10)) + N' sản phẩm';

-- CASE là biểu thức, dùng ngay trong SELECT
SELECT Ten, Gia,
       CASE WHEN Gia >= 20000000 THEN N'Cao cấp'
            WHEN Gia >= 5000000  THEN N'Tầm trung'
            ELSE N'Phổ thông' END AS PhanKhuc
FROM SanPham;`,
            note: 'IF chỉ ăn MỘT lệnh ngay sau nó. Hai lệnh trở lên phải bọc BEGIN...END, nếu không lệnh thứ hai luôn chạy dù điều kiện sai — giống if không ngoặc nhọn trong C#.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'WHILE và biến bảng',
            code: `DECLARE @i INT = 1;
WHILE @i <= 10
BEGIN
    IF @i % 2 = 0 BEGIN SET @i += 1; CONTINUE; END
    PRINT @i;                -- in 1 3 5 7 9
    SET @i += 1;
END;

-- Biến bảng: bảng tạm sống trong batch, dùng với INSERT INTO SELECT
DECLARE @SapHet TABLE (Ma INT, Ten NVARCHAR(200), TonKho INT);

INSERT INTO @SapHet (Ma, Ten, TonKho)
SELECT Ma, Ten, TonKho FROM SanPham WHERE TonKho < 5;

SELECT * FROM @SapHet;`,
            note: 'Nhánh CONTINUE phải tự tăng @i trước, nếu không vòng lặp đứng yên ở @i = 2 mãi mãi. Biến bảng @SapHet tự biến mất khi batch (hoặc SP) chạy xong.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'loop',
            caption: 'WHILE trong T-SQL',
            init: 'DECLARE @i INT = 1',
            cond: '@i <= 10',
            body: 'PRINT @i (bỏ qua số chẵn bằng CONTINUE)',
            step: 'SET @i += 1',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'OPENJSON — đọc JSON thành bảng, CROSS APPLY cho JSON lồng',
            code: `DECLARE @json NVARCHAR(MAX) = N'[
  {"ma":"TV01","ten":"Tivi Sony","gia":15000000},
  {"ma":"TL01","ten":"Tủ lạnh LG","gia":9800000}
]';
SELECT * FROM OPENJSON(@json)
WITH (Ma VARCHAR(10) '$.ma', Ten NVARCHAR(200) '$.ten', Gia DECIMAL(18,2) '$.gia');

-- Cột ThongTinThem lưu JSON mảng địa chỉ trong bảng KhachHang
SELECT k.Ma, k.HoTen, dc.DiaChi, dc.Phone
FROM KhachHang k
CROSS APPLY OPENJSON(k.ThongTinThem)
     WITH (DiaChi NVARCHAR(200) '$.address', Phone VARCHAR(20) '$.phone') dc;`,
            note: 'CROSS APPLY chạy OPENJSON cho TỪNG dòng của KhachHang và nối kết quả lại: một khách có 2 địa chỉ thành 2 dòng. Khách có ThongTinThem NULL bị loại; muốn giữ thì dùng OUTER APPLY.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'CURSOR — duyệt từng dòng',
            code: `DECLARE @Ma INT, @Ten NVARCHAR(200);
DECLARE cur CURSOR FOR
    SELECT Ma, Ten FROM SanPham WHERE TonKho = 0;

OPEN cur;
FETCH NEXT FROM cur INTO @Ma, @Ten;        -- lấy dòng đầu tiên
WHILE @@FETCH_STATUS = 0
BEGIN
    PRINT N'Cần nhập thêm: ' + @Ten;
    FETCH NEXT FROM cur INTO @Ma, @Ten;    -- trỏ đến dòng tiếp theo
END;
CLOSE cur;
DEALLOCATE cur;`,
            note: 'SQL không có đối tượng như C#; cursor là con trỏ gắn vào một câu SELECT. Quên FETCH trong thân vòng lặp là lặp vô hạn. Cursor chậm — nếu làm được bằng một câu UPDATE/INSERT SELECT theo tập hợp thì đừng dùng cursor.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Vòng đời của CURSOR',
            steps: [
              { kind: 'start', text: 'DECLARE cur CURSOR FOR SELECT ...' },
              { kind: 'process', text: 'OPEN cur' },
              { kind: 'process', text: 'FETCH NEXT → dòng đầu tiên' },
              {
                kind: 'decision', text: '@@FETCH_STATUS = 0 ?', branches: [
                  { label: 'Đúng', steps: [{ kind: 'process', text: 'Xử lý dòng hiện tại' }, { kind: 'process', text: 'FETCH NEXT → quay lại kiểm tra' }] },
                  { label: 'Sai', steps: [{ kind: 'end', text: 'CLOSE cur; DEALLOCATE cur' }] },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: 'dynamic-sql',
      title: '5. SQL động với sp_executesql',
      blocks: [
        {
          type: 'text',
          text: 'Đôi khi câu SQL chỉ biết lúc chạy: tên bảng, danh sách cột, điều kiện lọc do người dùng chọn. Ta ghép thành chuỗi rồi thực thi bằng sp_executesql. Cú pháp: EXEC sp_executesql @SQLString, @ParameterDefinition, @Param1 = value1, ...',
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'sp_executesql có tham số',
            code: `DECLARE @SQLString NVARCHAR(MAX);
DECLARE @ParameterDefinition NVARCHAR(MAX);
DECLARE @MinAge INT = 25;

-- Xây dựng truy vấn động: @Age là tham số, KHÔNG ghép giá trị vào chuỗi
SET @SQLString = N'SELECT * FROM Customers WHERE Age >= @Age';
-- Khai báo tham số
SET @ParameterDefinition = N'@Age INT';
-- Thực thi với tham số
EXEC sp_executesql @SQLString, @ParameterDefinition, @Age = @MinAge;`,
            note: '@SQLString và @ParameterDefinition phải là NVARCHAR (có N). Giá trị đi riêng qua tham số nên SQL Server không bao giờ hiểu nó là mã lệnh — đó là cách chặn SQL injection.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Ghép chuỗi hay truyền tham số?',
            columns: [
              {
                title: 'Ghép giá trị vào chuỗi', tone: 'bad', items: [
                  'N\'... WHERE HoTen = N\'\'\' + @ten + \'\'\'\'',
                  '@ten = "x\'; DROP TABLE KhachHang; --"',
                  'Câu lệnh bị đổi nghĩa: xoá bảng',
                  'Mỗi giá trị khác nhau sinh một execution plan mới',
                ],
              },
              {
                title: 'Tham số sp_executesql', tone: 'good', items: [
                  'N\'... WHERE HoTen = @Ten\'',
                  'Giá trị chỉ là dữ liệu, không thành lệnh',
                  'Tái sử dụng execution plan',
                  'Tên bảng/cột vẫn phải QUOTENAME vì không tham số hoá được',
                ],
              },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'sql',
            title: 'SP tìm kiếm động an toàn',
            code: `CREATE OR ALTER PROCEDURE sp_TimSanPham
    @TuKhoa NVARCHAR(100) = NULL,
    @GiaMax DECIMAL(18,2) = NULL,
    @SapXep NVARCHAR(20) = N'Gia'
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @sql NVARCHAR(MAX) = N'SELECT Ma, Ten, Gia FROM SanPham WHERE 1 = 1';

    IF @TuKhoa IS NOT NULL SET @sql += N' AND Ten LIKE N''%'' + @TuKhoa + N''%''';
    IF @GiaMax IS NOT NULL SET @sql += N' AND Gia <= @GiaMax';

    -- Tên cột không truyền tham số được: chỉ cho phép danh sách trắng
    IF @SapXep NOT IN (N'Gia', N'Ten') SET @SapXep = N'Gia';
    SET @sql += N' ORDER BY ' + QUOTENAME(@SapXep);

    EXEC sp_executesql @sql,
         N'@TuKhoa NVARCHAR(100), @GiaMax DECIMAL(18,2)',
         @TuKhoa = @TuKhoa, @GiaMax = @GiaMax;
END;`,
            note: 'Trong chuỗi, hai dấu nháy đơn liền nhau là một dấu nháy. @TuKhoa nằm NGUYÊN TÊN trong chuỗi, không ghép giá trị. Cột sắp xếp kiểm tra bằng danh sách trắng rồi QUOTENAME.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Các SP động trong slide gốc nhận @WhereCondition dạng chuỗi',
          text: 'InsertDynamicData_JSON, UpdateDynamicData_JSON, DeleteDynamicData_JSON, SelectDynamicData_JSON ghép thẳng @WhereCondition vào câu lệnh. Rất tiện khi demo nhưng nếu @WhereCondition đến từ người dùng thì "1=1" xoá sạch bảng. Chỉ dùng nội bộ; với dữ liệu người dùng phải tham số hoá như sp_TimSanPham.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Ứng dụng gọi SP động',
            actors: ['API C#', 'sp_TimSanPham', 'sp_executesql', 'Bảng SanPham'],
            steps: [
              { from: 0, to: 1, text: 'EXEC @TuKhoa = N\'tivi\', @GiaMax = 20000000' },
              { from: 1, to: 1, text: 'Ghép khung câu SQL, kiểm tra @SapXep' },
              { from: 1, to: 2, text: '@sql + định nghĩa tham số + giá trị' },
              { from: 2, to: 3, text: 'SELECT ... WHERE Ten LIKE @TuKhoa AND Gia <= @GiaMax' },
              { from: 3, to: 0, text: 'Tập kết quả', dashed: true },
            ],
          },
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b37-1', level: 'Cơ bản', title: 'Chuyển tiền an toàn',
      requirement: 'Cho bảng accounts(account_id VARCHAR(10) PK, balance DECIMAL(18,2) CHECK (balance >= 0)). Xây dựng đoạn script chuyển @SoTien từ @TuTK sang @DenTK trong transaction có TRY/CATCH. Lỗi (kể cả vi phạm CHECK) thì rollback và in thông báo.',
      signature: 'DECLARE @TuTK, @DenTK, @SoTien; BEGIN TRAN ... COMMIT / ROLLBACK',
      constraints: ['@SoTien > 0', 'Phải kiểm tra @@TRANCOUNT trước khi ROLLBACK'],
      examples: [
        { input: '5001 có 3000, chuyển 1000 sang 5002', output: '5001 = 2000, 5002 tăng 1000' },
        { input: '5001 có 500, chuyển 1000', output: 'In "Lỗi: ...CHECK constraint...", hai số dư giữ nguyên', explain: 'UPDATE đầu vi phạm CHECK nên nhảy CATCH trước khi cộng tiền.' },
      ],
    },
    {
      id: 'b37-2', level: 'Cơ bản', title: 'Hàm tính thuế và view sản phẩm',
      requirement: 'Cho bảng SanPham(Ma, Ten, Gia, Nhom). Xây dựng scalar function dbo.fn_GiaSauThue(@Gia, @ThueSuat) và view vw_SanPhamCoThue gồm Ma, Ten, Gia, GiaSauThue (thuế 10%).',
      signature: 'CREATE FUNCTION dbo.fn_GiaSauThue (@Gia DECIMAL(18,2), @ThueSuat DECIMAL(5,2)) RETURNS DECIMAL(18,2)',
      examples: [
        { input: 'SELECT dbo.fn_GiaSauThue(10000000, 0.1)', output: '11000000.00' },
        { input: 'SELECT fn_GiaSauThue(10000000, 0.1)', output: 'Lỗi "is not a recognized built-in function name"', explain: 'Scalar function do người dùng tạo phải gọi kèm schema dbo.' },
      ],
    },
    {
      id: 'b37-3', level: 'Trung bình', title: 'HospitalDB — tạo bảng và VIEW',
      requirement: 'Cho cơ sở dữ liệu HospitalDB gồm Patients, Doctors, Appointments, Medications, Prescriptions (dữ liệu mẫu theo slide trang 93). Xây dựng script tạo bảng có khoá chính, khoá ngoại và hai view báo cáo.',
      tasks: [
        'Tạo 5 bảng với PK IDENTITY, FK Appointments → Patients/Doctors, Prescriptions → Appointments/Medications',
        'Thêm dữ liệu mẫu: 5 bệnh nhân, 5 bác sĩ, 5 lịch khám, 5 thuốc, 5 đơn thuốc',
        'View vw_PatientAppointments(AppointmentID, PatientName, DoctorName, Date, Status)',
        'View vw_TopDoctors(DoctorName, Specialty, TotalAppointments) — top 3 bác sĩ nhiều lịch khám nhất',
        'Truy vấn thuốc tồn kho dưới 10 và đếm số lịch khám mỗi bác sĩ',
      ],
      signature: 'CREATE VIEW vw_PatientAppointments AS SELECT ...; CREATE VIEW vw_TopDoctors AS SELECT TOP 3 ...',
      constraints: ['Status chỉ nhận "Chờ khám", "Đã khám", "Đã huỷ" (CHECK)', 'vw_TopDoctors dùng TOP 3 kèm ORDER BY bên trong view'],
      examples: [
        { input: 'SELECT * FROM vw_PatientAppointments WHERE Status = N\'Chờ khám\'', output: '3 dòng: lịch 1, 3, 5 kèm tên bệnh nhân và bác sĩ' },
        { input: 'SELECT * FROM vw_TopDoctors', output: '3 dòng, mỗi bác sĩ TotalAppointments = 1', explain: 'Dữ liệu mẫu mỗi bác sĩ một lịch nên thứ tự giữa các bác sĩ bằng nhau là không xác định; thêm lịch khám để thấy rõ.' },
      ],
      visual: {
        kind: 'tree',
        caption: 'Quan hệ các bảng HospitalDB',
        root: {
          label: 'Appointments', highlight: true, note: 'bảng trung tâm',
          children: [
            { label: 'Patients', note: 'PatientID FK' },
            { label: 'Doctors', note: 'DoctorID FK' },
            { label: 'Prescriptions', note: 'AppointmentID FK', children: [{ label: 'Medications', note: 'MedicationID FK' }] },
          ],
        },
      },
    },
    {
      id: 'b37-4', level: 'Trung bình', title: 'HospitalDB — Stored Procedure',
      requirement: 'Trên HospitalDB của bài 3, xây dựng ba stored procedure phục vụ ứng dụng phòng khám. Nộp kèm script EXEC có sẵn tham số.',
      tasks: [
        'sp_GetPatientHistory(@PatientID): lịch sử khám (ngày, bác sĩ, chuyên khoa, trạng thái, ghi chú) mới nhất trước',
        'sp_UpdateAppointmentStatus(@AppointmentID, @NewStatus): cập nhật trạng thái; lịch không tồn tại thì THROW',
        'sp_AddPrescription(@AppointmentID, @MedicationID, @Quantity, @Dosage): thêm đơn thuốc và trừ Stock trong một transaction',
      ],
      signature: 'CREATE OR ALTER PROCEDURE sp_AddPrescription @AppointmentID INT, @MedicationID INT, @Quantity INT, @Dosage NVARCHAR(200)',
      constraints: ['Quantity > 0', 'Không đủ Stock thì không thêm đơn và Stock giữ nguyên'],
      examples: [
        { input: 'EXEC sp_UpdateAppointmentStatus 1, N\'Đã khám\'', output: 'Lịch 1 chuyển "Đã khám"' },
        { input: 'EXEC sp_AddPrescription 1, 5, 50, N\'Uống 1 viên\'', output: 'Lỗi "Không đủ thuốc", Diazepam vẫn Stock = 20', explain: 'Kiểm tra tồn kho trước INSERT, hoặc INSERT + UPDATE trong TRY rồi ROLLBACK khi CHECK Stock >= 0 vi phạm.' },
      ],
      hint: 'Dùng THROW 50001, N\'Không đủ thuốc\', 1 để ném lỗi có mã riêng; ứng dụng C# bắt SqlException.Number == 50001.',
      visual: {
        kind: 'flow',
        caption: 'sp_AddPrescription',
        steps: [
          { kind: 'io', text: '@AppointmentID, @MedicationID, @Quantity, @Dosage' },
          {
            kind: 'decision', text: 'Lịch khám và thuốc tồn tại?', branches: [
              { label: 'Không', steps: [{ kind: 'end', text: 'THROW 50002' }] },
              {
                label: 'Có', steps: [{
                  kind: 'decision', text: 'Stock >= @Quantity ?', branches: [
                    { label: 'Không', steps: [{ kind: 'end', text: 'THROW 50001' }] },
                    { label: 'Có', steps: [{ kind: 'process', text: 'BEGIN TRAN → INSERT Prescriptions → UPDATE Stock' }, { kind: 'end', text: 'COMMIT' }] },
                  ],
                }],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'b37-5', level: 'Trung bình', title: 'Đọc đơn hàng từ JSON',
      requirement: 'Ứng dụng gửi lên một chuỗi JSON đơn hàng gồm mã khách và mảng sản phẩm. Xây dựng SP sp_TaoDonTuJson nhận @json, dùng OPENJSON đọc thông tin, INSERT INTO SELECT vào ChiTietDonHang và tính TongTien theo giá hiện tại trong SanPham.',
      signature: 'CREATE PROCEDURE sp_TaoDonTuJson @json NVARCHAR(MAX)',
      constraints: ['JSON không hợp lệ (ISJSON = 0) thì THROW', 'Toàn bộ ghi trong một transaction', 'Trả về MaDon mới bằng SELECT'],
      examples: [
        { input: '{"maKhachHang":1,"items":[{"maSP":1,"soLuong":2},{"maSP":3,"soLuong":1}]}', output: 'MaDon = 4; ChiTietDonHang thêm 2 dòng; TongTien = 2×Gia(1) + Gia(3)' },
        { input: '{"maKhachHang":1,"items":[{"maSP":999,"soLuong":1}]}', output: 'Lỗi, không tạo đơn', explain: 'JOIN với SanPham ra 0 dòng: phải so số dòng chèn được với số phần tử JSON và rollback nếu lệch.' },
      ],
      hint: 'OPENJSON(@json, \'$.items\') WITH (MaSP INT \'$.maSP\', SoLuong INT \'$.soLuong\') rồi JOIN SanPham để lấy giá.',
    },
    {
      id: 'b37-6', level: 'Nâng cao', title: 'Tìm kiếm động chống SQL injection',
      requirement: 'Cho bảng KhachHang(Ma, HoTen, Email, ThanhPho, NgayTao). Xây dựng SP sp_TimKhachHang lọc tuỳ chọn theo họ tên (LIKE), thành phố, khoảng ngày tạo, sắp xếp theo cột người dùng chọn và phân trang OFFSET/FETCH. Mọi giá trị đi qua tham số sp_executesql.',
      signature: 'sp_TimKhachHang @HoTen, @ThanhPho, @TuNgay, @DenNgay, @SapXep, @Trang, @KichThuoc',
      constraints: ['@SapXep chỉ nhận HoTen, NgayTao, ThanhPho; giá trị khác về NgayTao', '@KichThuoc tối đa 100', 'Tham số NULL thì không thêm điều kiện đó'],
      examples: [
        { input: '@HoTen = N\'Nguyễn\', @Trang = 1, @KichThuoc = 10', output: '10 khách đầu có họ tên chứa "Nguyễn", mới nhất trước' },
        { input: '@HoTen = N\'x\'\'; DROP TABLE KhachHang; --\'', output: '0 dòng, bảng vẫn còn', explain: 'Chuỗi tấn công chỉ là giá trị của @HoTen, SQL Server tìm khách có tên đúng như thế.' },
        { input: '@SapXep = N\'Ma; DELETE KhachHang\'', output: 'Sắp theo NgayTao', explain: 'Không nằm trong danh sách trắng nên bị thay bằng giá trị mặc định.' },
      ],
      hint: 'PRINT @sql trước khi EXEC để kiểm tra câu lệnh sinh ra không chứa giá trị nào của người dùng.',
      visual: {
        kind: 'flow',
        caption: 'Dựng câu SQL động',
        steps: [
          { kind: 'process', text: '@sql = N\'SELECT ... FROM KhachHang WHERE 1 = 1\'' },
          { kind: 'decision', text: '@HoTen IS NOT NULL ?', branches: [{ label: 'Có', steps: [{ kind: 'process', text: '+= N\' AND HoTen LIKE @HoTenLike\'' }] }, { label: 'Không', steps: [{ kind: 'note', text: 'bỏ qua' }] }] },
          { kind: 'process', text: 'Tương tự cho @ThanhPho, @TuNgay, @DenNgay' },
          { kind: 'process', text: 'Kiểm tra @SapXep trong danh sách trắng → QUOTENAME' },
          { kind: 'process', text: '+= OFFSET @BoQua ROWS FETCH NEXT @KichThuoc ROWS ONLY' },
          { kind: 'end', text: 'EXEC sp_executesql @sql, @dinhNghia, ...' },
        ],
      },
    },
    {
      id: 'b37-7', level: 'Nâng cao', title: 'Đặt hàng nhiều sản phẩm với savepoint',
      requirement: 'Xây dựng SP sp_DatHangNhieuSP nhận danh sách sản phẩm (JSON). Duyệt từng sản phẩm bằng CURSOR: đủ hàng thì thêm chi tiết và trừ kho; thiếu hàng thì ROLLBACK về savepoint của riêng sản phẩm đó và ghi vào bảng kết quả. Cuối cùng COMMIT phần thành công và trả về danh sách sản phẩm bị bỏ.',
      signature: 'CREATE PROCEDURE sp_DatHangNhieuSP @MaKhachHang INT, @json NVARCHAR(MAX)',
      constraints: ['Mỗi sản phẩm một SAVE TRANSACTION riêng', 'Không sản phẩm nào thành công thì ROLLBACK toàn bộ, không tạo đơn rỗng', 'Nhớ CLOSE và DEALLOCATE cursor ở cả nhánh lỗi'],
      examples: [
        { input: 'SP1 x2 (tồn 10), SP2 x5 (tồn 1), SP3 x1 (tồn 3)', output: 'Đơn có SP1, SP3; trả về bảng [SP2, "Thiếu 4"]' },
        { input: 'SP2 x5 (tồn 1)', output: 'Không tạo đơn, @@TRANCOUNT = 0', explain: 'Mọi sản phẩm đều bị bỏ nên rollback cả transaction.' },
      ],
      hint: 'Lưu kết quả bỏ qua vào biến bảng DECLARE @BiBo TABLE(MaSP INT, LyDo NVARCHAR(100)) — biến bảng không bị ROLLBACK ảnh hưởng.',
    },
    {
      id: 'b37-8', level: 'Nâng cao', title: 'Phân quyền cho ứng dụng cửa hàng',
      requirement: 'Thiết kế phân quyền cho database CuaHangDienMay với ba tài khoản: app_web (API bán hàng), nv_kho (nhân viên kho), bao_cao (kế toán). Viết script tạo login/user, role và GRANT/DENY sao cho mỗi tài khoản chỉ làm được đúng việc của mình.',
      tasks: [
        'app_web: chỉ EXECUTE các SP sp_TaoDonHang, sp_TimSanPham; không SELECT trực tiếp bảng',
        'nv_kho: SELECT, UPDATE cột TonKho của SanPham; không xem KhachHang',
        'bao_cao: chỉ SELECT trên các view báo cáo vw_DoanhThuThang, vw_DonHangKhachHang',
        'Viết script kiểm thử bằng EXECUTE AS USER để chứng minh từng quyền',
      ],
      signature: 'CREATE ROLE ...; GRANT ... TO role; ALTER ROLE ... ADD MEMBER ...',
      examples: [
        { input: 'EXECUTE AS USER = \'app_web\'; SELECT * FROM KhachHang;', output: 'Lỗi "The SELECT permission was denied"' },
        { input: 'EXECUTE AS USER = \'app_web\'; EXEC sp_TimSanPham N\'tivi\';', output: 'Trả danh sách tivi', explain: 'Ownership chaining: SP và bảng cùng chủ dbo nên quyền EXECUTE đủ để SP đọc bảng.' },
      ],
      hint: 'Sau mỗi lần thử nhớ REVERT; để quay về tài khoản của mình.',
    },
  ],
}

export default buoi37
