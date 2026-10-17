import type { Buoi } from './types'

const buoi38: Buoi = {
  id: 38,
  slug: 'ef-core-code-first-database-first',
  title: 'Entity Framework Core: Code First & Database First',
  subtitle: 'Để ORM ánh xạ class C# với bảng SQL Server: sinh database từ code bằng migration, hoặc sinh code từ database có sẵn bằng scaffold',
  duration: '3 giờ',
  keywords: ['ORM', 'DbContext', 'DbSet', 'Migration', 'Scaffold', 'Navigation property', 'Fluent API'],
  goals: [
    'Giải thích ORM làm gì và chọn được giữa EF Core, Dapper, NHibernate',
    'Dựng Code First trọn 7 bước: model, DbContext, AddDbContext, migration, database update, seed, API getall',
    'Sinh model và DbContext từ database có sẵn bằng dotnet ef dbcontext scaffold',
    'Khai báo quan hệ một-nhiều bằng navigation property và cấu hình bằng Fluent API',
  ],

  sections: [
    {
      id: 'orm',
      title: '1. ORM là gì và vì sao dùng EF Core',
      blocks: [
        {
          type: 'text',
          text: 'ORM (Object-Relational Mapping) là công cụ ánh xạ đối tượng trong mã nguồn (class, property) với bảng và cột trong cơ sở dữ liệu. Thay vì viết INSERT INTO SanPham ..., ta viết context.SanPhams.Add(sp); context.SaveChanges(); ORM sinh câu SQL, mở kết nối, đọc kết quả và đổ ngược vào object.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'map',
            caption: 'ORM ánh xạ thế giới C# sang thế giới SQL',
            name: 'C# → SQL Server',
            pairs: [
              { key: 'class Product', value: 'bảng Products' },
              { key: 'property Price (decimal)', value: 'cột Price decimal(18,2)' },
              { key: 'property Id', value: 'khoá chính IDENTITY' },
              { key: 'Product p = new()', value: 'một dòng (record)' },
              { key: 'ICollection<Product> Products', value: 'quan hệ một-nhiều qua khoá ngoại' },
              { key: 'context.Products.Where(...)', value: 'SELECT ... WHERE ...' },
            ],
          },
        },
        {
          type: 'list',
          items: [
            'Dễ sử dụng: làm việc với dữ liệu như object, không xen chuỗi SQL vào code.',
            'Tăng tốc phát triển: CRUD cơ bản không phải viết SQL thủ công.',
            'Giảm lỗi: kiểu dữ liệu được kiểm tra lúc biên dịch, tham số luôn được truyền an toàn.',
            'Dễ bảo trì: đổi tên property là IDE đổi khắp nơi; cấu trúc DB nằm trong code và được quản lý bằng git.',
            'Quản lý quan hệ: ORM tự nối bảng theo navigation property.',
          ],
        },
        {
          type: 'table',
          head: ['ORM', 'Đặc điểm', 'Phù hợp'],
          rows: [
            ['Entity Framework Core', 'Đầy đủ tính năng: LINQ, change tracking, migration, lazy loading', 'Dự án cần giải pháp toàn diện, phát triển nhanh'],
            ['Dapper', 'Micro-ORM: tự viết SQL, Dapper chỉ map kết quả sang object; rất nhanh, nhẹ', 'Microservice, truy vấn nặng cần kiểm soát SQL'],
            ['NHibernate', 'ORM lâu đời, cấu hình mạnh bằng XML/mapping', 'Dự án lớn nhiều quan hệ phức tạp, hệ thống cũ'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Lộ trình khoá học',
          text: 'Phần này dùng EF Core để làm quen ORM đầy đủ. Phần dự án nâng cao sẽ dùng Dapper cho các truy vấn cần hiệu năng cao.',
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Cài các gói EF Core 9 và công cụ dotnet-ef',
            code: `dotnet add package Microsoft.EntityFrameworkCore --version 9.0.0
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 9.0.0
dotnet add package Microsoft.EntityFrameworkCore.Design --version 9.0.0
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 9.0.0
dotnet add package Microsoft.EntityFrameworkCore.Proxies --version 9.0.0

# Công cụ dòng lệnh, cài một lần cho cả máy
dotnet tool install --global dotnet-ef
dotnet ef --version`,
            note: 'Các gói EF Core phải CÙNG phiên bản (cùng 9.0.0) và khớp với phiên bản .NET của project. Lệch phiên bản là lỗi "Could not load file or assembly" khi chạy migration. Mở file .csproj để kiểm tra các PackageReference.',
          },
        },
        {
          type: 'table',
          head: ['Gói', 'Để làm gì'],
          rows: [
            ['EntityFrameworkCore', 'Lõi: DbContext, DbSet, LINQ, change tracking'],
            ['EntityFrameworkCore.SqlServer', 'Provider cho SQL Server: UseSqlServer, dịch LINQ sang T-SQL'],
            ['EntityFrameworkCore.Design', 'Cần cho dotnet ef migrations và scaffold lúc thiết kế'],
            ['EntityFrameworkCore.Tools', 'Lệnh Add-Migration, Scaffold-DbContext trong Package Manager Console'],
            ['EntityFrameworkCore.Proxies', 'UseLazyLoadingProxies: tự nạp dữ liệu liên quan khi truy cập navigation'],
          ],
        },
      ],
    },
    {
      id: 'code-first',
      title: '2. Code First — viết class trước, sinh database sau',
      blocks: [
        {
          type: 'text',
          text: 'Code First dùng cho dự án xây từ đầu: ta viết model class, EF Core đọc class và sinh bảng bằng migration. Mỗi lần đổi model, tạo một migration mới và cập nhật database — cấu trúc DB luôn đi theo code.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Code First 7 bước',
            items: [
              { label: 'Bước 1', text: 'Tạo model class (Product, User) ứng với các bảng' },
              { label: 'Bước 2', text: 'Tạo ApplicationContext : DbContext với các DbSet' },
              { label: 'Bước 3', text: 'Cài gói EF Core và công cụ dotnet-ef' },
              { label: 'Bước 4', text: 'Program.cs: AddDbContext + connection string trong appsettings.json' },
              { label: 'Bước 5', text: 'dotnet ef migrations add init → dotnet ef database update' },
              { label: 'Bước 6', text: 'Thêm dữ liệu mẫu vào bảng (seed)' },
              { label: 'Bước 7', text: 'Viết API getAllProduct trong ProductController' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Bước 1 — Models/Product.cs và Models/User.cs',
            code: `namespace EbayClone.Models;

public class Product
{
    public int Id { get; set; }                       // tên Id → khoá chính IDENTITY
    public string Name { get; set; } = "";
    public string? Description { get; set; }          // string? → cột cho phép NULL
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public int SellerId { get; set; }                 // khoá ngoại → Users.Id
    public virtual User? Seller { get; set; }         // navigation property
}

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = "";
    public string Email { get; set; } = "";
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}`,
            note: 'EF dùng quy ước (convention): property tên Id hoặc ProductId là khoá chính; SellerId cùng với Seller kiểu User là khoá ngoại. virtual cần cho lazy loading proxy ở phần Database First.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Bước 2 — Data/ApplicationContext.cs',
            code: `using EbayClone.Models;
using Microsoft.EntityFrameworkCore;

namespace EbayClone.Data;

public class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions<ApplicationContext> options)
        : base(options) { }

    public DbSet<Product> Products { get; set; }   // → bảng Products
    public DbSet<User> Users { get; set; }         // → bảng Users
}`,
            note: 'Constructor nhận DbContextOptions để Program.cs truyền chuỗi kết nối vào qua DI. Mỗi DbSet là một bảng; tên property (Products) thành tên bảng.',
          },
        },
        {
          type: 'tabs',
          items: [
            {
              label: 'appsettings.json',
              hint: 'ConnectionStrings:DefaultConnection',
              blocks: [
                {
                  type: 'code',
                  sample: {
                    lang: 'json',
                    title: 'appsettings.json',
                    code: `{
  "ConnectionStrings": {
    "DefaultConnection": "Server=127.0.0.1,1433;Database=eBayCloneDB;User Id=sa;Password=MatKhauCuaBan@123;TrustServerCertificate=True;"
  },
  "Logging": { "LogLevel": { "Default": "Information" } },
  "AllowedHosts": "*"
}`,
                    note: 'TrustServerCertificate=True cần khi SQL Server chạy Docker với chứng chỉ tự ký; thiếu sẽ lỗi "The certificate chain was issued by an authority that is not trusted". Không commit mật khẩu thật lên git — dùng User Secrets.',
                  },
                },
              ],
            },
            {
              label: 'Program.cs',
              hint: 'builder.Services.AddDbContext<ApplicationContext>',
              blocks: [
                {
                  type: 'code',
                  sample: {
                    title: 'Program.cs',
                    code: `using EbayClone.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Đọc connection string từ appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Đăng ký DbContext vào DI, mỗi request một instance (Scoped)
builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();
app.Run();`,
                    note: 'AddDbContext đăng ký DbContext với vòng đời Scoped: mỗi HTTP request có một context riêng, request xong thì dispose. Không bao giờ đăng ký DbContext là Singleton.',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Bước 5 — migration và cập nhật database',
            code: `# Tạo migration đầu tiên (tên init tuỳ đặt)
dotnet ef migrations add init

# Áp migration vào database: tạo DB và bảng nếu chưa có
dotnet ef database update

# Sau này thêm property Brand vào Product:
dotnet ef migrations add AddBrandToProduct
dotnet ef database update

# Lỡ tạo migration sai, CHƯA update database:
dotnet ef migrations remove`,
            note: 'migrations add chỉ sinh file C# trong thư mục Migrations, chưa đụng database. database update mới chạy SQL. Database còn có bảng __EFMigrationsHistory ghi lại các migration đã áp.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Một vòng thay đổi model trong Code First',
            steps: [
              { kind: 'start', text: 'Sửa model: thêm property Brand vào Product' },
              { kind: 'process', text: 'dotnet ef migrations add AddBrandToProduct' },
              { kind: 'process', text: 'EF so model hiện tại với ModelSnapshot → sinh Up()/Down()' },
              {
                kind: 'decision', text: 'File migration đúng ý?', branches: [
                  { label: 'Sai', steps: [{ kind: 'process', text: 'dotnet ef migrations remove, sửa model' }] },
                  { label: 'Đúng', steps: [{ kind: 'process', text: 'dotnet ef database update' }, { kind: 'process', text: 'ALTER TABLE Products ADD Brand ...' }] },
                ],
              },
              { kind: 'end', text: '__EFMigrationsHistory thêm một dòng' },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Cấu trúc thư mục project Code First',
            root: {
              label: 'EbayClone/',
              children: [
                { label: 'Controllers/', children: [{ label: 'ProductController.cs', note: 'Bước 7' }] },
                { label: 'Data/', children: [{ label: 'ApplicationContext.cs', note: 'Bước 2', highlight: true }] },
                { label: 'Migrations/', note: 'sinh bởi dotnet ef', children: [
                  { label: '20261017_init.cs', note: 'Up() / Down()' },
                  { label: 'ApplicationContextModelSnapshot.cs', note: 'ảnh chụp model hiện tại' },
                ] },
                { label: 'Models/', children: [{ label: 'Product.cs', note: 'Bước 1' }, { label: 'User.cs' }] },
                { label: 'appsettings.json', note: 'ConnectionStrings' },
                { label: 'Program.cs', note: 'AddDbContext' },
              ],
            },
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Bước 6, 7 — seed dữ liệu và API getall',
            code: `// Data/ApplicationContext.cs — seed trong OnModelCreating
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<User>().HasData(
        new User { Id = 1, Username = "khai", Email = "khai@cybersoft.edu.vn" });
    modelBuilder.Entity<Product>().HasData(
        new Product { Id = 1, Name = "Tivi Sony 55 inch", Price = 15000000, Stock = 10, SellerId = 1, CreatedAt = new DateTime(2026, 10, 1) },
        new Product { Id = 2, Name = "Tủ lạnh LG 300L", Price = 9800000, Stock = 5, SellerId = 1, CreatedAt = new DateTime(2026, 10, 1) });
}

// Controllers/ProductController.cs
[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly ApplicationContext _context;
    public ProductController(ApplicationContext context) => _context = context;

    [HttpGet("getall")]
    public async Task<ActionResult<List<Product>>> GetAll()
        => Ok(await _context.Products.ToListAsync());
}`,
            note: 'HasData cần Id cố định và giá trị không đổi (không dùng DateTime.Now) — nếu không mỗi lần migrations add EF lại thấy dữ liệu "thay đổi". Sau khi thêm HasData phải tạo migration mới rồi database update.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Trả thẳng entity có navigation hai chiều',
          text: 'Product có Seller, User có Products: nếu Include cả hai rồi trả JSON thì serializer đi vòng Product → Seller → Products → ... và báo lỗi "object cycle detected". Buổi 39 dùng Select ra DTO để tránh.',
        },
      ],
    },
    {
      id: 'database-first',
      title: '3. Database First — có database trước, sinh code sau',
      blocks: [
        {
          type: 'text',
          text: 'Database First dùng cho dự án đã có database (hệ thống cũ cần nâng cấp, chuyển công nghệ sang .NET). Bảng và ràng buộc được tạo trên SQL Server trước như bình thường; lệnh scaffold đọc cấu trúc DB và sinh ra DbContext cùng các model class.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Hai hướng làm việc',
            columns: [
              { title: 'Code First', tone: 'plain', items: ['Class C# là nguồn sự thật', 'migrations add → database update', 'Hợp dự án mới', 'Lịch sử thay đổi DB nằm trong git'] },
              { title: 'Database First', tone: 'plain', items: ['Database là nguồn sự thật', 'Sửa DB bằng SQL → scaffold lại', 'Hợp hệ thống có sẵn, DBA quản lý schema', 'Không sửa tay file sinh ra (sẽ bị ghi đè)'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Scaffold từ database có sẵn',
            code: `# Bước 2: cài gói (thêm Tools và Proxies)
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 9.0.0
dotnet add package Microsoft.EntityFrameworkCore.Proxies --version 9.0.0

# Bước 3: sinh DbContext và model từ database
dotnet ef dbcontext scaffold Name=DefaultConnection Microsoft.EntityFrameworkCore.SqlServer -o Models -c ApplicationContext --force

# Chỉ lấy vài bảng
dotnet ef dbcontext scaffold Name=DefaultConnection Microsoft.EntityFrameworkCore.SqlServer -o Models -c ApplicationContext -t SanPham -t DonHang --force`,
            note: 'Name=DefaultConnection lấy chuỗi kết nối từ appsettings.json thay vì ghi thẳng mật khẩu vào lệnh — EF sẽ không chép chuỗi kết nối vào OnConfiguring. -o là thư mục đích, -c là tên class context, --force ghi đè file cũ khi scaffold lại.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Bước 4, 5 — đăng ký context với lazy loading',
            code: `// Đọc connection string từ appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Kết nối db, bật lazy loading để không phải Include
builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseLazyLoadingProxies()
           .UseSqlServer(connectionString));`,
            note: 'Lazy loading: lần đầu đọc sp.Seller, EF tự chạy thêm một câu SELECT. Tiện nhưng duyệt 100 sản phẩm rồi đọc Seller từng cái là 101 câu truy vấn (lỗi N+1). Navigation phải là virtual để proxy ghi đè được.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Lệnh scaffold làm gì',
            actors: ['dotnet ef', 'appsettings.json', 'SQL Server', 'Thư mục Models'],
            steps: [
              { from: 0, to: 1, text: 'Đọc ConnectionStrings:DefaultConnection' },
              { from: 0, to: 2, text: 'Đọc INFORMATION_SCHEMA: bảng, cột, khoá, FK' },
              { from: 2, to: 0, text: 'Cấu trúc database', dashed: true },
              { from: 0, to: 3, text: 'Sinh SanPham.cs, DonHang.cs, ... (partial class)' },
              { from: 0, to: 3, text: 'Sinh ApplicationContext.cs với OnModelCreating (Fluent API)' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Muốn thêm code vào model sinh ra',
          text: 'Class sinh ra là partial. Viết thêm property tính toán hoặc phương thức ở file khác (SanPham.Extra.cs) cùng namespace — lần scaffold --force sau không xoá mất.',
        },
      ],
    },
    {
      id: 'relationship',
      title: '4. Quan hệ trong model và Fluent API',
      blocks: [
        {
          type: 'text',
          text: 'Quan hệ giữa bảng được biểu diễn bằng navigation property: phía "một" có ICollection của phía "nhiều", phía "nhiều" có khoá ngoại và tham chiếu về phía "một". Với cửa hàng điện máy: một KhachHang có nhiều DonHang, một DonHang có nhiều ChiTietDonHang, mỗi ChiTietDonHang trỏ tới một SanPham.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'uml',
            caption: 'Model cửa hàng điện máy và navigation property',
            children: [
              { name: 'KhachHang', attrs: ['+ Id: int', '+ HoTen: string', '+ Email: string'], methods: ['+ DonHangs: ICollection<DonHang>'] },
              { name: 'DonHang', attrs: ['+ Id: int', '+ NgayDat: DateTime', '+ TongTien: decimal', '+ KhachHangId: int'], methods: ['+ KhachHang: KhachHang', '+ ChiTiets: ICollection<ChiTietDonHang>'] },
              { name: 'ChiTietDonHang', attrs: ['+ Id: int', '+ DonHangId: int', '+ SanPhamId: int', '+ SoLuong: int', '+ DonGia: decimal'], methods: ['+ DonHang: DonHang', '+ SanPham: SanPham'] },
              { name: 'SanPham', attrs: ['+ Id: int', '+ Ten: string', '+ Gia: decimal', '+ TonKho: int'], methods: ['+ ChiTiets: ICollection<ChiTietDonHang>'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Models cho cửa hàng',
            code: `public class KhachHang
{
    public int Id { get; set; }
    public string HoTen { get; set; } = "";
    public string Email { get; set; } = "";
    public virtual ICollection<DonHang> DonHangs { get; set; } = new List<DonHang>();
}

public class DonHang
{
    public int Id { get; set; }
    public DateTime NgayDat { get; set; }
    public decimal TongTien { get; set; }
    public int KhachHangId { get; set; }                       // FK
    public virtual KhachHang KhachHang { get; set; } = null!;
    public virtual ICollection<ChiTietDonHang> ChiTiets { get; set; } = new List<ChiTietDonHang>();
}

public class ChiTietDonHang
{
    public int Id { get; set; }
    public int DonHangId { get; set; }
    public int SanPhamId { get; set; }
    public int SoLuong { get; set; }
    public decimal DonGia { get; set; }
    public virtual DonHang DonHang { get; set; } = null!;
    public virtual SanPham SanPham { get; set; } = null!;
}`,
            note: 'Khởi tạo ICollection bằng new List<>() để không bị NullReferenceException khi gọi kh.DonHangs.Add(...) với object mới tạo. = null! báo cho compiler biết EF sẽ gán giá trị, tránh cảnh báo nullable.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Fluent API trong OnModelCreating',
            code: `protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<SanPham>(e =>
    {
        e.ToTable("SanPham");                          // tên bảng số ít
        e.Property(x => x.Ten).HasMaxLength(200).IsRequired();
        e.Property(x => x.Gia).HasColumnType("decimal(18,2)");
        e.HasIndex(x => x.Ten);
    });

    modelBuilder.Entity<DonHang>(e =>
    {
        e.ToTable("DonHang");
        e.Property(x => x.NgayDat).HasDefaultValueSql("GETDATE()");
        e.HasOne(d => d.KhachHang)                     // mỗi đơn có một khách
         .WithMany(k => k.DonHangs)                    // một khách nhiều đơn
         .HasForeignKey(d => d.KhachHangId)
         .OnDelete(DeleteBehavior.Restrict);           // không xoá dây chuyền
    });

    modelBuilder.Entity<ChiTietDonHang>()
        .HasIndex(c => new { c.DonHangId, c.SanPhamId }).IsUnique();
}`,
            note: 'Không cấu hình decimal thì EF cảnh báo và mặc định decimal(18,2) — tiền VNĐ lớn vẫn vừa, nhưng nên ghi rõ. Mặc định quan hệ bắt buộc là xoá dây chuyền (Cascade): xoá khách là mất hết đơn. Restrict buộc xoá đơn trước.',
          },
        },
        {
          type: 'table',
          head: ['Cấu hình', 'Data Annotation', 'Fluent API'],
          rows: [
            ['Tên bảng', '[Table("SanPham")]', 'e.ToTable("SanPham")'],
            ['Bắt buộc, độ dài', '[Required, MaxLength(200)]', 'e.Property(x => x.Ten).IsRequired().HasMaxLength(200)'],
            ['Kiểu cột', '[Column(TypeName = "decimal(18,2)")]', 'HasColumnType("decimal(18,2)")'],
            ['Khoá chính', '[Key]', 'e.HasKey(x => x.Ma)'],
            ['Khoá ngoại', '[ForeignKey("KhachHang")]', 'HasOne().WithMany().HasForeignKey()'],
            ['Index, Unique', '[Index(nameof(Email), IsUnique = true)]', 'e.HasIndex(x => x.Email).IsUnique()'],
            ['Không ánh xạ', '[NotMapped]', 'e.Ignore(x => x.TenHienThi)'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Thứ tự ưu tiên',
          text: 'Fluent API > Data Annotation > quy ước (convention). Nếu cả hai cùng cấu hình một thứ, Fluent API thắng. Scaffold Database First mặc định sinh Fluent API; thêm --data-annotations để sinh attribute.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b38-1', level: 'Cơ bản', title: 'Bảng ánh xạ class và bảng',
      requirement: 'Cho class SanPham { int Id; string Ten; string? MoTa; decimal Gia; int TonKho; bool DangBan; DateTime NgayNhap; }. Không chạy code, xác định bảng EF Code First sẽ sinh ra: tên cột, kiểu SQL, NULL hay NOT NULL, khoá chính. Sau đó chạy migration để kiểm chứng.',
      signature: 'DbSet<SanPham> SanPhams',
      examples: [
        { input: 'string Ten (nullable bật)', output: 'Ten nvarchar(max) NOT NULL' },
        { input: 'string? MoTa', output: 'MoTa nvarchar(max) NULL', explain: 'Dấu ? trên kiểu tham chiếu quyết định cột có cho NULL hay không khi Nullable bật trong .csproj.' },
      ],
    },
    {
      id: 'b38-2', level: 'Cơ bản', title: 'Code First đầu tiên',
      requirement: 'Xây dựng Web API CuaHangApi theo đủ 7 bước Code First với model SanPham và KhachHang. Database tên CuaHangDienMay, có 3 sản phẩm và 2 khách mẫu bằng HasData. API GET /api/sanpham/getall trả danh sách sản phẩm.',
      tasks: [
        'Tạo Models/SanPham.cs, Models/KhachHang.cs',
        'Tạo Data/CuaHangContext.cs kế thừa DbContext với hai DbSet',
        'Khai báo DefaultConnection trong appsettings.json và AddDbContext trong Program.cs',
        'dotnet ef migrations add init và dotnet ef database update',
        'Seed dữ liệu bằng HasData qua migration thứ hai',
        'SanPhamController với GET getall, thử bằng Swagger',
      ],
      signature: 'GET /api/sanpham/getall → 200 [ { id, ten, gia, tonKho } ]',
      examples: [
        { input: 'GET /api/sanpham/getall', output: '200, mảng 3 sản phẩm' },
        { input: 'Mở SSMS / Azure Data Studio', output: 'Thấy bảng SanPhams, KhachHangs, __EFMigrationsHistory (2 dòng)' },
      ],
    },
    {
      id: 'b38-3', level: 'Trung bình', title: 'Thay đổi model bằng migration',
      requirement: 'Trên project bài 2, lần lượt thực hiện ba thay đổi, mỗi thay đổi một migration riêng, và ghi lại câu SQL tương ứng bằng dotnet ef migrations script.',
      tasks: [
        'Thêm property string? ThuongHieu vào SanPham',
        'Đổi Ten thành bắt buộc, tối đa 200 ký tự bằng Fluent API',
        'Thêm bảng DonHang có khoá ngoại KhachHangId',
        'Quay database về migration trước khi có DonHang bằng dotnet ef database update <TênMigration>',
      ],
      signature: 'dotnet ef migrations add <Ten> · dotnet ef migrations script <Tu> <Den>',
      constraints: ['Không xoá database để làm lại', 'Mỗi migration đặt tên mô tả thay đổi'],
      examples: [
        { input: 'Thêm ThuongHieu', output: 'ALTER TABLE [SanPhams] ADD [ThuongHieu] nvarchar(max) NULL;' },
        { input: 'Đổi Ten thành nvarchar(200) NOT NULL khi đang có dòng Ten = NULL', output: 'database update lỗi', explain: 'Dữ liệu cũ vi phạm ràng buộc mới; phải UPDATE dữ liệu trước hoặc thêm migrationBuilder.Sql(...) trong Up().' },
      ],
      visual: {
        kind: 'timeline',
        caption: 'Lịch sử migration',
        items: [
          { label: 'init', text: 'SanPhams, KhachHangs' },
          { label: 'SeedData', text: 'HasData 3 SP, 2 KH' },
          { label: 'AddThuongHieu', text: 'ALTER TABLE ADD ThuongHieu' },
          { label: 'TenBatBuoc', text: 'ALTER COLUMN Ten nvarchar(200) NOT NULL' },
          { label: 'AddDonHang', text: 'CREATE TABLE DonHangs + FK' },
        ],
      },
    },
    {
      id: 'b38-4', level: 'Trung bình', title: 'Database First từ script có sẵn',
      requirement: 'Cho script SQL tạo database CuaHangDienMay gồm SanPham, KhachHang, DonHang, ChiTietDonHang (khoá ngoại đầy đủ, tạo ở buổi 34–36). Xây dựng project API mới dùng scaffold để sinh model và context, rồi viết API GET /api/donhang/{id} trả đơn kèm tên khách và danh sách sản phẩm.',
      signature: 'dotnet ef dbcontext scaffold Name=DefaultConnection Microsoft.EntityFrameworkCore.SqlServer -o Models -c CuaHangContext --force',
      constraints: ['Chuỗi kết nối chỉ nằm trong appsettings.json', 'Không sửa tay file sinh ra; phần thêm viết vào partial class riêng'],
      examples: [
        { input: 'GET /api/donhang/1', output: '{ id: 1, khachHang: "Nguyễn Văn A", chiTiets: [ { sanPham: "Laptop Dell XPS 15", soLuong: 1 }, ... ] }' },
        { input: 'Thêm cột GhiChu vào DonHang bằng SQL rồi scaffold lại không có --force', output: 'Lỗi "file already exists"', explain: 'Scaffold lại phải có --force để ghi đè.' },
      ],
      visual: {
        kind: 'flow',
        caption: 'Database First',
        steps: [
          { kind: 'start', text: 'Chạy script SQL tạo bảng + FK' },
          { kind: 'process', text: 'Cài Design, SqlServer, Tools, Proxies' },
          { kind: 'process', text: 'dotnet ef dbcontext scaffold ... -o Models -c CuaHangContext' },
          { kind: 'process', text: 'AddDbContext + UseLazyLoadingProxies trong Program.cs' },
          { kind: 'end', text: 'Viết controller dùng CuaHangContext' },
        ],
      },
    },
    {
      id: 'b38-5', level: 'Trung bình', title: 'Fluent API cho cửa hàng',
      requirement: 'Cho bốn model KhachHang, DonHang, ChiTietDonHang, SanPham như sơ đồ UML trong bài. Xây dựng OnModelCreating cấu hình đầy đủ bằng Fluent API, không dùng attribute.',
      tasks: [
        'Tên bảng số ít: SanPham, KhachHang, DonHang, ChiTietDonHang',
        'Email khách hàng bắt buộc, tối đa 150, duy nhất',
        'Tiền dùng decimal(18,2); NgayDat mặc định GETDATE()',
        'Xoá khách có đơn thì bị chặn (Restrict); xoá đơn thì xoá luôn chi tiết (Cascade)',
        'Cặp (DonHangId, SanPhamId) duy nhất',
      ],
      signature: 'protected override void OnModelCreating(ModelBuilder modelBuilder)',
      examples: [
        { input: 'Xoá khách hàng có 2 đơn', output: 'DbUpdateException: REFERENCE constraint' },
        { input: 'Thêm cùng sản phẩm 2 lần vào một đơn', output: 'DbUpdateException: duplicate key', explain: 'Cùng sản phẩm phải tăng SoLuong của dòng cũ thay vì thêm dòng mới.' },
      ],
      visual: {
        kind: 'tree',
        caption: 'Hành vi xoá',
        root: {
          label: 'KhachHang', note: 'Restrict',
          children: [{ label: 'DonHang', highlight: true, note: 'Cascade', children: [{ label: 'ChiTietDonHang', note: 'bị xoá theo đơn' }] }],
        },
      },
    },
    {
      id: 'b38-6', level: 'Nâng cao', title: 'Nhiều-nhiều: sản phẩm và danh mục',
      requirement: 'Một sản phẩm thuộc nhiều danh mục (Tivi, Khuyến mãi, Hàng mới), một danh mục có nhiều sản phẩm. Xây dựng quan hệ nhiều-nhiều theo hai cách và so sánh bảng sinh ra.',
      tasks: [
        'Cách 1: ICollection<DanhMuc> trong SanPham và ICollection<SanPham> trong DanhMuc, để EF tự tạo bảng nối',
        'Cách 2: entity trung gian SanPhamDanhMuc có thêm cột ThuTu và NgayGan',
        'API GET /api/danhmuc/{id}/sanpham trả sản phẩm theo danh mục',
      ],
      signature: 'HasMany(s => s.DanhMucs).WithMany(d => d.SanPhams).UsingEntity<SanPhamDanhMuc>()',
      examples: [
        { input: 'Cách 1, migrations add', output: 'Bảng DanhMucSanPham(DanhMucsId, SanPhamsId) khoá chính kép' },
        { input: 'Cần lưu ngày gắn sản phẩm vào danh mục', output: 'Bắt buộc cách 2', explain: 'Bảng nối tự sinh không có chỗ cho cột dữ liệu riêng.' },
      ],
      hint: 'Với cách 2 vẫn giữ được navigation trực tiếp SanPham.DanhMucs bằng UsingEntity<SanPhamDanhMuc>(...).',
    },
    {
      id: 'b38-7', level: 'Nâng cao', title: 'Lazy loading và lỗi N+1',
      requirement: 'Bật UseLazyLoadingProxies và logging SQL (LogTo(Console.WriteLine)). Viết API trả 20 đơn hàng kèm tên khách theo ba cách và đếm số câu SQL mỗi cách chạy.',
      tasks: [
        'Cách A: lazy loading, duyệt đơn và đọc don.KhachHang.HoTen',
        'Cách B: Include(d => d.KhachHang)',
        'Cách C: Select ra DTO { MaDon, TenKhach, TongTien }',
        'Lập bảng: số câu SQL, số cột lấy về, có lỗi vòng lặp JSON không',
      ],
      signature: 'options.UseLazyLoadingProxies().UseSqlServer(cs).LogTo(Console.WriteLine, LogLevel.Information)',
      examples: [
        { input: 'Cách A với 20 đơn của 20 khách khác nhau', output: '21 câu SELECT', explain: '1 câu lấy đơn + 20 câu lấy từng khách: lỗi N+1.' },
        { input: 'Cách C', output: '1 câu SELECT có JOIN, chỉ 3 cột' },
      ],
      visual: {
        kind: 'compare',
        caption: 'Ba cách nạp dữ liệu liên quan',
        columns: [
          { title: 'Lazy', tone: 'bad', items: ['Code gọn', 'N+1 câu SQL', 'Dễ vòng lặp JSON'] },
          { title: 'Include', tone: 'plain', items: ['1 câu JOIN', 'Lấy mọi cột', 'Vẫn có thể vòng lặp'] },
          { title: 'Select DTO', tone: 'good', items: ['1 câu JOIN', 'Chỉ cột cần', 'Không vòng lặp'] },
        ],
      },
    },
    {
      id: 'b38-8', level: 'Nâng cao', title: 'Seed dữ liệu và tách cấu hình',
      requirement: 'OnModelCreating của cửa hàng đã dài hơn 150 dòng. Xây dựng lại theo hướng mỗi entity một lớp cấu hình IEntityTypeConfiguration<T>, seed 10 sản phẩm, 5 khách, 3 đơn có chi tiết, và nạp tất cả bằng một dòng.',
      tasks: [
        'Tạo thư mục Data/Configurations với SanPhamConfig, KhachHangConfig, DonHangConfig, ChiTietDonHangConfig',
        'Chuyển Fluent API và HasData vào từng lớp',
        'OnModelCreating chỉ còn modelBuilder.ApplyConfigurationsFromAssembly(typeof(CuaHangContext).Assembly)',
        'Tạo migration và chứng minh không có thay đổi schema nào ngoài dữ liệu seed',
      ],
      signature: 'public class SanPhamConfig : IEntityTypeConfiguration<SanPham> { public void Configure(EntityTypeBuilder<SanPham> b) { ... } }',
      examples: [
        { input: 'dotnet ef migrations add TachCauHinh (sau khi chỉ di chuyển code)', output: 'Up() và Down() rỗng', explain: 'Model không đổi, chỉ đổi chỗ đặt cấu hình nên EF không sinh lệnh nào — đây là cách kiểm chứng refactor đúng.' },
        { input: 'Seed DonHang có NgayDat = DateTime.Now', output: 'Mỗi lần migrations add lại sinh UpdateData', explain: 'Giá trị seed phải cố định.' },
      ],
    },
  ],
}

export default buoi38
