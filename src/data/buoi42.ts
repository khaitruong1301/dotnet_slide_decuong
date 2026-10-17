import type { Buoi } from './types'

const buoi42: Buoi = {
  id: 42,
  slug: 'repository-pattern-microservice-do-an',
  title: 'Repository Pattern, Microservice & đồ án cuối khoá',
  subtitle: 'Tách tầng truy cập dữ liệu bằng Repository + Unit of Work, chia hệ thống thành nhiều service giao tiếp qua Kafka và YARP',
  duration: '3 giờ',
  keywords: ['Repository', 'Unit of Work', 'IRepository<T>', '.NET Aspire', 'Kafka', 'YARP', 'docker compose'],
  goals: [
    'Tổ chức ba tầng Controller → Service → Repository/UnitOfWork và đăng ký DI đúng vòng đời',
    'Viết Generic Repository và Generic Service với Expression<Func<T,bool>> để giảm lặp code',
    'Dựng một solution microservice với Aspire AppHost, giao tiếp bất đồng bộ bằng Kafka, cổng vào bằng YARP',
    'Chọn đề tài và nắm tiêu chí chấm đồ án cuối khoá',
  ],

  sections: [
    {
      id: 'vi-sao-repository',
      title: '1. Vì sao cần Repository Pattern',
      blocks: [
        {
          type: 'text',
          text: 'Từ đầu khoá controller gọi thẳng DbContext: vừa nhận request, vừa viết LINQ, vừa xử lý nghiệp vụ. Ứng dụng lớn lên thì controller phình to, logic trùng lặp, khó viết unit test. Repository Pattern tách logic truy xuất dữ liệu ra một lớp riêng; Service chứa nghiệp vụ; Controller chỉ nhận và trả.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Mỗi tầng một trách nhiệm',
            root: {
              label: 'SanPhamController',
              note: 'nhận request / trả response',
              children: [
                {
                  label: 'ISanPhamService → SanPhamService',
                  note: 'nghiệp vụ: kiểm tra giá, tồn kho',
                  highlight: true,
                  children: [
                    {
                      label: 'IUnitOfWork → UnitOfWork',
                      note: 'SaveChangesAsync = commit',
                      children: [
                        { label: 'IProductRepository → ProductRepository', note: 'CRUD bảng Product' },
                        { label: 'IOrderRepository → OrderRepository', note: 'CRUD bảng Order' },
                        { label: 'AppDbContext', note: 'EF Core' },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          type: 'table',
          head: ['Nguyên lý SOLID', 'Thể hiện ở đâu'],
          rows: [
            ['SRP — một trách nhiệm', 'Repository chỉ truy xuất dữ liệu, Service chỉ nghiệp vụ, Controller chỉ HTTP'],
            ['DIP — phụ thuộc abstraction', 'ProductService nhận IProductRepository chứ không phải ProductRepository → test thì mock được'],
            ['ISP — tách nhỏ interface', 'Bảng chỉ đọc (log, tỉnh thành) không bị ép cài Add/Update/Delete; chia IReadRepository<T> và IWriteRepository<T>'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Trước và sau',
            columns: [
              { title: 'Controller gọi DbContext', tone: 'bad', items: ['LINQ lặp lại ở nhiều controller', 'Đổi EF sang Dapper phải sửa khắp nơi', 'Unit test cần DB thật', 'SaveChanges rải rác, khó gom transaction'] },
              { title: 'Repository + UoW + Service', tone: 'good', items: ['Truy vấn viết một chỗ', 'Đổi ORM chỉ sửa repository', 'Mock interface để test', 'Một SaveChangesAsync cho cả nghiệp vụ'] },
            ],
          },
        },
      ],
    },
    {
      id: 'trien-khai-repo',
      title: '2. Triển khai Repository, Unit of Work, Service',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'Bước 1 — Repositories/ProductRepository.cs',
            code: `public interface IProductRepository
{
    Task<List<Product>> GetAllAsync();
    Task<Product?> GetByIdAsync(int id);
    Task AddAsync(Product product);
    void Update(Product product);
    void Delete(Product product);
}

public class ProductRepository(AppDbContext context) : IProductRepository
{
    public Task<List<Product>> GetAllAsync() =>
        context.Products.AsNoTracking().ToListAsync();

    public Task<Product?> GetByIdAsync(int id) =>
        context.Products.FirstOrDefaultAsync(p => p.Id == id);

    public async Task AddAsync(Product product) => await context.Products.AddAsync(product);
    public void Update(Product product) => context.Products.Update(product);
    public void Delete(Product product) => context.Products.Remove(product);
}`,
            note: 'Repository KHÔNG gọi SaveChanges. Đặt đơn hàng phải thêm Order rồi thêm OrderDetail; nếu mỗi repository tự lưu thì bước hai lỗi để lại đơn hàng rỗng trong DB.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Bước 2 — UnitOfWork.cs',
            code: `public interface IUnitOfWork : IAsyncDisposable
{
    IProductRepository Products { get; }
    IOrderRepository Orders { get; }
    Task<int> SaveChangesAsync();
}

public class UnitOfWork(AppDbContext context,
                        IProductRepository products,
                        IOrderRepository orders) : IUnitOfWork
{
    public IProductRepository Products { get; } = products;
    public IOrderRepository Orders { get; } = orders;

    public Task<int> SaveChangesAsync() => context.SaveChangesAsync();   // ~ commit

    public ValueTask DisposeAsync() => context.DisposeAsync();
}`,
            note: 'UnitOfWork và các repository nhận CÙNG một AppDbContext (Scoped) nên mọi thay đổi được gom lại, SaveChangesAsync ghi tất cả trong một transaction.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Bước 3 — Services/ProductService.cs',
            code: `public interface IProductService
{
    Task<List<Product>> LayTatCaAsync();
    Task<Product> TaoAsync(Product product);
    Task<bool> DatHangAsync(int productId, int soLuong, int customerId);
}

public class ProductService(IUnitOfWork uow) : IProductService
{
    public Task<List<Product>> LayTatCaAsync() => uow.Products.GetAllAsync();

    public async Task<Product> TaoAsync(Product product)
    {
        if (product.Price <= 0) throw new ArgumentException("Giá phải lớn hơn 0");
        await uow.Products.AddAsync(product);
        await uow.SaveChangesAsync();
        return product;
    }

    public async Task<bool> DatHangAsync(int productId, int soLuong, int customerId)
    {
        var sp = await uow.Products.GetByIdAsync(productId);
        if (sp is null || sp.Stock < soLuong) return false;

        sp.Stock -= soLuong;                                       // bảng Product
        var don = new Order { CustomerId = customerId, CreatedAt = DateTime.Now };
        don.Details.Add(new OrderDetail { ProductId = productId, Quantity = soLuong, Price = sp.Price });
        await uow.Orders.AddAsync(don);                            // bảng Order + OrderDetail

        await uow.SaveChangesAsync();                              // ghi tất cả hoặc không gì cả
        return true;
    }
}`,
            note: 'DatHangAsync đụng ba bảng nhưng chỉ một lần SaveChangesAsync. Lỗi ở bất kỳ đâu trước đó thì không bảng nào bị đổi.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Bước 4 — Controller và Program.cs',
            code: `[ApiController, Route("api/products")]
public class ProductController(IProductService service) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await service.LayTatCaAsync());

    [HttpPost]
    public async Task<IActionResult> Create(Product product) =>
        Ok(await service.TaoAsync(product));
}

// Program.cs — cả ba tầng đều Scoped
builder.Services.AddDbContext<AppDbContext>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IProductService, ProductService>();`,
            note: 'Đăng ký Repository là Singleton trong khi DbContext là Scoped sẽ báo "Cannot consume scoped service from singleton". Ba tầng cùng Scoped để dùng chung một DbContext trong một request.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'POST /api/products/dat-hang đi qua các tầng',
            actors: ['Controller', 'ProductService', 'UnitOfWork', 'Repositories', 'SQL Server'],
            steps: [
              { from: 0, to: 1, text: 'DatHangAsync(5, 2, 7)' },
              { from: 1, to: 3, text: 'Products.GetByIdAsync(5)' },
              { from: 3, to: 4, text: 'SELECT Product' },
              { from: 1, to: 1, text: 'Kiểm tra tồn kho, trừ Stock' },
              { from: 1, to: 3, text: 'Orders.AddAsync(don) — chỉ đánh dấu Added' },
              { from: 1, to: 2, text: 'SaveChangesAsync()' },
              { from: 2, to: 4, text: 'BEGIN TRAN · UPDATE · INSERT · INSERT · COMMIT' },
              { from: 1, to: 0, text: 'true', dashed: true },
            ],
          },
        },
      ],
    },
    {
      id: 'generic',
      title: '3. Generic Repository & Generic Service',
      blocks: [
        {
          type: 'text',
          text: 'Product, Customer, Category… đều cần GetAll, GetById, Add, Update, Delete, tìm theo điều kiện. Viết một lần cho kiểu T bất kỳ, repository cụ thể chỉ thêm truy vấn riêng.',
        },
        {
          type: 'code',
          sample: {
            title: 'Repositories/Repository.cs',
            code: `using System.Linq.Expressions;

public interface IRepository<T> where T : class
{
    Task<List<T>> GetAllAsync();
    Task<T?> GetByIdAsync(object id);
    Task<T?> SingleOrDefaultAsync(Expression<Func<T, bool>> dieuKien);
    Task<List<T>> WhereAsync(Expression<Func<T, bool>> dieuKien);
    Task AddAsync(T entity);
    void Update(T entity);
    void Remove(T entity);
}

public class Repository<T>(AppDbContext context) : IRepository<T> where T : class
{
    protected readonly DbSet<T> dbSet = context.Set<T>();

    public Task<List<T>> GetAllAsync() => dbSet.ToListAsync();
    public async Task<T?> GetByIdAsync(object id) => await dbSet.FindAsync(id);
    public Task<T?> SingleOrDefaultAsync(Expression<Func<T, bool>> dieuKien) =>
        dbSet.SingleOrDefaultAsync(dieuKien);
    public Task<List<T>> WhereAsync(Expression<Func<T, bool>> dieuKien) =>
        dbSet.Where(dieuKien).ToListAsync();
    public async Task AddAsync(T entity) => await dbSet.AddAsync(entity);
    public void Update(T entity) => dbSet.Update(entity);
    public void Remove(T entity) => dbSet.Remove(entity);
}`,
            note: 'Phải là Expression<Func<T,bool>> chứ không phải Func<T,bool>. Func làm EF tải CẢ BẢNG về RAM rồi mới lọc; Expression được dịch thành WHERE trong SQL.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Generic service và repository riêng kế thừa',
            code: `public interface IServiceBase<T> where T : class
{
    Task<List<T>> GetAllAsync();
    Task<List<T>> FindAsync(Expression<Func<T, bool>> dieuKien);
    Task AddAsync(T entity);
}

public class ServiceBase<T>(IRepository<T> repo, IUnitOfWork uow) : IServiceBase<T> where T : class
{
    public Task<List<T>> GetAllAsync() => repo.GetAllAsync();
    public Task<List<T>> FindAsync(Expression<Func<T, bool>> dieuKien) => repo.WhereAsync(dieuKien);
    public async Task AddAsync(T entity) { await repo.AddAsync(entity); await uow.SaveChangesAsync(); }
}

// Repository riêng chỉ thêm truy vấn đặc thù
public class ProductRepository(AppDbContext context) : Repository<Product>(context), IProductRepository
{
    public Task<List<Product>> SapHetHangAsync(int nguong) =>
        dbSet.Where(p => p.Stock < nguong).OrderBy(p => p.Stock).ToListAsync();
}

// Program.cs: đăng ký kiểu generic mở
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped(typeof(IServiceBase<>), typeof(ServiceBase<>));

// Dùng: var tiviRe = await service.FindAsync(p => p.Name.Contains("Tivi") && p.Price < 10_000_000);`,
            note: 'typeof(IRepository<>) không có kiểu bên trong là "generic mở": DI tự tạo Repository<Customer> khi có lớp xin IRepository<Customer>.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'uml',
            caption: 'Repository generic và repository cụ thể',
            parent: { name: 'Repository<T>', attrs: ['# dbSet: DbSet<T>'], methods: ['GetAllAsync()', 'GetByIdAsync(id)', 'WhereAsync(dieuKien)', 'AddAsync(entity)', 'Update(entity)', 'Remove(entity)'] },
            children: [
              { name: 'ProductRepository', methods: ['SapHetHangAsync(nguong)'] },
              { name: 'CustomerRepository', methods: ['TimTheoSdtAsync(sdt)'] },
              { name: 'OrderRepository', methods: ['DonTrongThangAsync(thang)'] },
            ],
            relation: 'inherit',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Repository trả IQueryable — rò rỉ trừu tượng',
          text: 'Trả IQueryable<T> ra ngoài thì Service lại tự viết LINQ, Include tuỳ ý — repository mất ý nghĩa và lỗi truy vấn chỉ lộ ra lúc chạy. Repository nên trả List<T> hoặc T đã thực thi xong.',
        },
      ],
    },
    {
      id: 'microservice',
      title: '4. Microservice với Aspire, Kafka, YARP',
      blocks: [
        {
          type: 'text',
          text: 'Microservice chia một hệ thống lớn thành nhiều service nhỏ, mỗi service một chức năng, một database riêng, triển khai và mở rộng độc lập. Hệ thống cửa hàng được tách thành IdentityService (đăng nhập, JWT), ProductService (sản phẩm, tồn kho), OrderService (đơn hàng), PaymentService (thanh toán) và một Blazor web làm giao diện.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Kiến trúc hệ thống thương mại điện tử',
            root: {
              label: 'Blazor web (BlazorWebApp)',
              children: [
                {
                  label: 'API Gateway (YARP)',
                  note: 'một cổng vào duy nhất, kiểm tra JWT',
                  highlight: true,
                  children: [
                    { label: '/identity/* → IdentityService', note: 'IdentityDb' },
                    { label: '/product/* → ProductService', note: 'ProductDb · consumer Kafka' },
                    { label: '/order/* → OrderService', note: 'OrderDb · producer Kafka' },
                    { label: '/payment/* → PaymentService', note: 'PaymentDb · consumer Kafka' },
                  ],
                },
                { label: 'Kafka broker :9092', note: 'topic order-created' },
                { label: 'Aspire AppHost', note: 'khởi động và theo dõi tất cả' },
              ],
            },
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'bash',
            title: 'Tạo solution và các project',
            code: `dotnet new sln -n EcommerceMicroservices
dotnet new webapi -n IdentityService
dotnet new webapi -n OrderService
dotnet new webapi -n PaymentService
dotnet new webapi -n ProductService
dotnet new blazorserver -n BlazorWebApp

dotnet sln add IdentityService/IdentityService.csproj
dotnet sln add OrderService/OrderService.csproj
dotnet sln add PaymentService/PaymentService.csproj
dotnet sln add ProductService/ProductService.csproj
dotnet sln add BlazorWebApp/BlazorWebApp.csproj

# Aspire
dotnet workload install aspire
dotnet new aspire-apphost -n AppHost
dotnet sln add AppHost/AppHost.csproj
dotnet add AppHost/AppHost.csproj reference ProductService/ProductService.csproj
dotnet add AppHost/AppHost.csproj reference OrderService/OrderService.csproj
# ... tương tự cho IdentityService, PaymentService, BlazorWebApp`,
            note: 'Mỗi service vẫn dùng EF Core như bình thường (scaffold từ DB riêng của nó) và tự có Repository/Service bên trong.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'AppHost/Program.cs',
            code: `var builder = DistributedApplication.CreateBuilder(args);

var identity = builder.AddProject<Projects.IdentityService>("identityservice");
var product  = builder.AddProject<Projects.ProductService>("productservice");
var order    = builder.AddProject<Projects.OrderService>("orderservice");
var payment  = builder.AddProject<Projects.PaymentService>("paymentservice");

builder.AddProject<Projects.BlazorWebApp>("blazorwebapp")
       .WithReference(identity)
       .WithReference(product)
       .WithReference(order)
       .WithReference(payment);

builder.Build().Run();`,
            note: 'WithReference cho Blazor biết địa chỉ service qua service discovery: HttpClient gọi "http://productservice" thay vì cứng localhost:5123. Chạy AppHost là bật cả 5 project và mở dashboard theo dõi log, trace.',
          },
        },
        {
          type: 'table',
          head: ['Thành phần Kafka', 'Vai trò'],
          rows: [
            ['Broker', 'Máy chủ Kafka lưu và chuyển message (cổng 9092)'],
            ['Topic', 'Kênh theo chủ đề, ví dụ order-created'],
            ['Partition', 'Topic chia nhiều phần để xử lý song song'],
            ['Producer', 'Service gửi message (OrderService)'],
            ['Consumer', 'Service nhận message (ProductService, PaymentService)'],
            ['Consumer Group', 'Các consumer cùng GroupId chia nhau partition; khác group thì mỗi group nhận đủ'],
            ['KRaft / ZooKeeper', 'Quản lý metadata của cluster; Kafka mới dùng KRaft'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Kịch bản đặt hàng — trừ tồn kho bất đồng bộ',
            actors: ['Blazor', 'OrderService', 'Kafka', 'ProductService', 'PaymentService'],
            steps: [
              { from: 0, to: 1, text: 'POST /order (token từ IdentityService)' },
              { from: 1, to: 1, text: 'Lưu đơn vào OrderDb' },
              { from: 1, to: 2, text: 'Produce order-created {donId, items}' },
              { from: 1, to: 0, text: '201 Đơn đang xử lý', dashed: true },
              { from: 2, to: 3, text: 'Consume → trừ Stock trong ProductDb' },
              { from: 2, to: 4, text: 'Consume → tạo hoá đơn thanh toán' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'OrderService — producer (Confluent.Kafka)',
            code: `using Confluent.Kafka;
using System.Text.Json;

public class KafkaProducer
{
    private readonly IProducer<Null, string> producer =
        new ProducerBuilder<Null, string>(new ProducerConfig { BootstrapServers = "localhost:9092" }).Build();

    public Task GuiDonHangAsync(DonHangMessage don) =>
        producer.ProduceAsync("order-created",
            new Message<Null, string> { Value = JsonSerializer.Serialize(don) });
}

public record DonHangMessage(int DonId, List<DongHang> Items);
public record DongHang(int SanPhamId, int SoLuong);`,
            note: 'Đăng ký KafkaProducer là Singleton: tạo IProducer tốn kém và nó an toàn đa luồng.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'ProductService — consumer chạy nền',
            code: `public class TruTonKhoConsumer(IServiceScopeFactory scopeFactory) : BackgroundService
{
    protected override Task ExecuteAsync(CancellationToken stoppingToken) => Task.Run(async () =>
    {
        var config = new ConsumerConfig
        {
            BootstrapServers = "localhost:9092",
            GroupId = "product-service",
            AutoOffsetReset = AutoOffsetReset.Earliest
        };
        using var consumer = new ConsumerBuilder<Ignore, string>(config).Build();
        consumer.Subscribe("order-created");

        while (!stoppingToken.IsCancellationRequested)
        {
            var kq = consumer.Consume(stoppingToken);
            var don = JsonSerializer.Deserialize<DonHangMessage>(kq.Message.Value)!;

            using var scope = scopeFactory.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<ProductDbContext>();
            foreach (var item in don.Items)
                await db.Products.Where(p => p.Id == item.SanPhamId)
                    .ExecuteUpdateAsync(s => s.SetProperty(p => p.Stock, p => p.Stock - item.SoLuong));
        }
    }, stoppingToken);
}
// Program.cs: builder.Services.AddHostedService<TruTonKhoConsumer>();`,
            note: 'BackgroundService là Singleton, không inject trực tiếp DbContext (Scoped) được — phải tạo scope mỗi message.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'json',
            title: 'Gateway/appsettings.json — YARP',
            code: `{
  "ReverseProxy": {
    "Routes": {
      "product-route": {
        "ClusterId": "product-cluster",
        "Match": { "Path": "/product/{**catch-all}" },
        "Transforms": [ { "PathRemovePrefix": "/product" } ]
      },
      "order-route": {
        "ClusterId": "order-cluster",
        "AuthorizationPolicy": "default",
        "Match": { "Path": "/order/{**catch-all}" },
        "Transforms": [ { "PathRemovePrefix": "/order" } ]
      }
    },
    "Clusters": {
      "product-cluster": { "Destinations": { "d1": { "Address": "http://localhost:5101/" } } },
      "order-cluster":   { "Destinations": { "d1": { "Address": "http://localhost:5102/" } } }
    }
  }
}`,
            note: 'PathRemovePrefix bỏ "/product" trước khi chuyển: client gọi /product/api/products → service nhận /api/products. Program.cs: builder.Services.AddReverseProxy().LoadFromConfig(builder.Configuration.GetSection("ReverseProxy")); app.MapReverseProxy();',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'yaml',
            title: 'docker-compose.yml (rút gọn)',
            code: `services:
  kafka:
    image: bitnami/kafka:3.7
    ports: ["9092:9092"]
    environment:
      - KAFKA_CFG_NODE_ID=0
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@kafka:9093
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
  productservice:
    build: ./ProductService
    environment:
      - Kafka__BootstrapServers=kafka:9092
    depends_on: [kafka]
  orderservice:
    build: ./OrderService
    depends_on: [kafka]
  gateway:
    build: ./Gateway
    ports: ["8080:80"]
    depends_on: [productservice, orderservice]`,
            note: 'Trong mạng compose các container gọi nhau bằng tên service (kafka:9092, http://productservice), không phải localhost. Chạy: docker compose up --build -d.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Microservice không miễn phí',
          text: 'Mỗi service một DB nghĩa là không JOIN được giữa các DB, dữ liệu chỉ nhất quán "sau một lúc", phải lo message trùng, message mất, service chết. Ứng dụng nhỏ nên bắt đầu bằng một khối (monolith) có Repository/Service rõ ràng, tách dần khi cần.',
        },
      ],
    },
    {
      id: 'do-an',
      title: '5. Đồ án cuối khoá',
      blocks: [
        {
          type: 'table',
          head: ['Đề tài', 'Chức năng cốt lõi', 'Kỹ thuật nên dùng'],
          rows: [
            ['Clone Netflix', 'Danh mục phim, xem trailer, gói thành viên, danh sách yêu thích, lịch sử xem', 'JWT + role, Output Cache, Redis cho phim hot'],
            ['Sàn giao dịch ngoại hối (Forex)', 'Bảng giá thời gian thực, đặt lệnh mua/bán, ví, lịch sử lệnh', 'SignalR, Kafka cho lệnh, transaction UoW'],
            ['Logistics giao hàng', 'Tạo vận đơn, phân tài xế, theo dõi trạng thái, đối soát', 'Repository generic, background service, bản đồ'],
            ['Phòng khám', 'Đặt lịch, hồ sơ bệnh án, kê đơn, hoá đơn', 'Phân quyền Bác sĩ / Lễ tân / Bệnh nhân, báo cáo'],
            ['Tự đề xuất', 'Một bài toán thực tế (cửa hàng điện máy, thư viện…)', 'Duyệt đề với giảng viên trước khi làm'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Lộ trình làm đồ án',
            items: [
              { label: 'Tuần 1', text: 'Chốt đề, vẽ ERD, danh sách API, phác thảo giao diện' },
              { label: 'Tuần 2', text: 'Dựng DB, Repository/UoW/Service, API CRUD, JWT' },
              { label: 'Tuần 3', text: 'Giao diện Blazor, nghiệp vụ chính, phân quyền' },
              { label: 'Tuần 4', text: 'Cache, xử lý lỗi, Docker, deploy, slide bảo vệ' },
            ],
          },
        },
        {
          type: 'table',
          head: ['Tiêu chí', 'Trọng số', 'Đạt khi'],
          rows: [
            ['Chức năng nghiệp vụ', '30%', 'Chạy trọn luồng chính, không lỗi khi demo'],
            ['Kiến trúc & code', '25%', 'Tách Controller/Service/Repository, DI đúng, đặt tên rõ'],
            ['CSDL', '15%', 'ERD chuẩn hoá, khoá ngoại, migration'],
            ['Bảo mật', '10%', 'BCrypt, JWT, phân quyền theo role'],
            ['Hiệu năng & triển khai', '10%', 'Có cache hợp lý, chạy được bằng Docker'],
            ['Trình bày', '10%', 'Slide, demo, trả lời câu hỏi'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Demo trước, mở rộng sau',
          text: 'Ưu tiên một luồng chính chạy mượt từ đầu đến cuối (đăng ký → đăng nhập → đặt hàng → xem đơn) hơn là mười chức năng dở dang. Microservice là điểm cộng, không bắt buộc.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b42-1', level: 'Cơ bản', title: 'Repository cho KhachHang',
      requirement: 'Cho bảng KhachHang (Id, HoTen, SoDienThoai, Email). Xây dựng IKhachHangRepository và KhachHangRepository với các thao tác CRUD và tìm theo số điện thoại; đăng ký DI và gọi thử từ một controller qua service.',
      signature: 'Task<KhachHang?> TimTheoSdtAsync(string sdt)',
      constraints: ['Repository không gọi SaveChanges', 'Tất cả đăng ký AddScoped'],
      examples: [
        { input: 'TimTheoSdtAsync("0901234567")', output: 'KhachHang { HoTen = "Nguyễn An" }' },
        { input: 'TimTheoSdtAsync("000")', output: 'null → controller trả 404' },
      ],
    },
    {
      id: 'b42-2', level: 'Cơ bản', title: 'Controller chỉ dùng service',
      requirement: 'Cho một SanPhamController đang gọi trực tiếp AppDbContext trong 5 action. Tái cấu trúc thành Controller → ISanPhamService → IUnitOfWork → ISanPhamRepository mà API không đổi hành vi.',
      signature: 'SanPhamController(ISanPhamService service)',
      examples: [
        { input: 'GET /api/san-pham trước và sau tái cấu trúc', output: 'JSON giống hệt' },
        { input: 'Tìm "AppDbContext" trong thư mục Controllers', output: 'Không còn kết quả nào' },
      ],
    },
    {
      id: 'b42-3', level: 'Trung bình', title: 'Đặt hàng trong một Unit of Work',
      requirement: 'Cho bảng SanPham, DonHang, ChiTietDonHang. Xây dựng DonHangService.DatHangAsync nhận khách hàng và danh sách dòng hàng; kiểm tra tồn kho, trừ kho, tạo đơn và chi tiết, tính tổng tiền, tất cả trong một lần SaveChangesAsync.',
      tasks: [
        'Kiểm tra mọi sản phẩm tồn tại và đủ hàng; thiếu một sản phẩm thì không tạo gì',
        'Trừ tồn kho từng sản phẩm',
        'Tạo DonHang và ChiTietDonHang với giá tại thời điểm đặt',
        'Gọi uow.SaveChangesAsync() đúng một lần',
      ],
      signature: 'Task<KetQuaDatHang> DatHangAsync(int khachHangId, List<DongHangDto> dongs)',
      constraints: ['1 ≤ dongs.Count ≤ 50', 'soLuong ≥ 1'],
      examples: [
        { input: 'Tivi tồn 5, đặt Tivi x2 + Tủ lạnh x1 (tồn 3)', output: 'ThanhCong = true, tồn còn Tivi 3, Tủ lạnh 2' },
        { input: 'Tivi tồn 5, đặt Tivi x2 + Tủ lạnh x9 (tồn 3)', output: 'ThanhCong = false, "Tủ lạnh chỉ còn 3"; tồn Tivi vẫn 5', explain: 'Chưa gọi SaveChangesAsync nên thay đổi trên Tivi bị bỏ.' },
      ],
      visual: {
        kind: 'flow',
        steps: [
          { kind: 'start', text: 'DatHangAsync(khachHangId, dongs)' },
          { kind: 'process', text: 'Lấy các sản phẩm theo id' },
          { kind: 'decision', text: 'Đủ hàng tất cả?', branches: [
            { label: 'Không', steps: [{ kind: 'end', text: 'Trả lỗi, không SaveChanges' }] },
            { label: 'Có', steps: [
              { kind: 'process', text: 'Trừ kho, tạo DonHang + ChiTiet' },
              { kind: 'process', text: 'uow.SaveChangesAsync()' },
              { kind: 'end', text: 'Trả mã đơn, tổng tiền' },
            ] },
          ] },
        ],
      },
    },
    {
      id: 'b42-4', level: 'Trung bình', title: 'Generic Repository có phân trang',
      requirement: 'Cho IRepository<T> như phần lý thuyết. Bổ sung phương thức phân trang có lọc và sắp xếp, dùng chung cho SanPham, KhachHang, DonHang.',
      tasks: [
        'GetPagedAsync(dieuKien, sapXep, trang, kichThuoc) trả { Items, TongSo, TongTrang }',
        'Lọc và sắp xếp phải chạy trong SQL (Expression), không trên RAM',
        'Đăng ký generic mở typeof(IRepository<>)',
        'API GET /api/san-pham?trang=2&giaMax=10000000 dùng phương thức này',
      ],
      signature: 'Task<PagedResult<T>> GetPagedAsync(Expression<Func<T,bool>>? dieuKien, Expression<Func<T,object>> sapXep, int trang, int kichThuoc)',
      constraints: ['trang ≥ 1, 1 ≤ kichThuoc ≤ 100'],
      examples: [
        { input: '23 sản phẩm, trang = 3, kichThuoc = 10', output: 'Items 3 phần tử, TongSo 23, TongTrang 3' },
        { input: 'trang = 5, kichThuoc = 10 với 23 sản phẩm', output: 'Items rỗng, TongTrang 3', explain: 'Vượt trang không lỗi, chỉ trả rỗng.' },
      ],
      visual: {
        kind: 'uml',
        parent: { name: 'IRepository<T>', stereotype: 'interface', methods: ['GetAllAsync()', 'WhereAsync(dieuKien)', 'GetPagedAsync(dieuKien, sapXep, trang, kichThuoc)'] },
        children: [
          { name: 'Repository<SanPham>' },
          { name: 'Repository<KhachHang>' },
          { name: 'Repository<DonHang>' },
        ],
        relation: 'implement',
      },
    },
    {
      id: 'b42-5', level: 'Trung bình', title: 'Unit test service bằng mock',
      requirement: 'Cho ProductService phụ thuộc IUnitOfWork. Viết unit test bằng xUnit + Moq cho TaoAsync và DatHangAsync mà không cần database.',
      tasks: [
        'TaoAsync với Price ≤ 0 ném ArgumentException, không gọi SaveChangesAsync',
        'TaoAsync hợp lệ gọi AddAsync và SaveChangesAsync đúng một lần',
        'DatHangAsync khi tồn kho thiếu trả false',
        'DatHangAsync hợp lệ trừ đúng Stock',
      ],
      signature: 'Mock<IUnitOfWork> · Mock<IProductRepository> · Verify(x => x.SaveChangesAsync(), Times.Once)',
      examples: [
        { input: 'TaoAsync(new Product { Price = 0 })', output: 'ArgumentException; SaveChangesAsync Times.Never' },
        { input: 'Stock 5, DatHangAsync(id, 3, 1)', output: 'true, sp.Stock == 2' },
      ],
    },
    {
      id: 'b42-6', level: 'Nâng cao', title: 'Tách ProductService và OrderService qua Kafka',
      requirement: 'Cho solution EcommerceMicroservices. Khi OrderService tạo đơn thành công thì gửi message order-created; ProductService nhận và trừ tồn kho; nếu không đủ hàng thì ProductService gửi order-rejected để OrderService chuyển đơn sang trạng thái Huy.',
      tasks: [
        'Chạy Kafka bằng docker compose, tạo topic order-created và order-rejected',
        'OrderService: lưu đơn trạng thái ChoXuLy rồi produce order-created',
        'ProductService: BackgroundService consume, trừ kho hoặc produce order-rejected',
        'OrderService: consume order-rejected, cập nhật trạng thái Huy',
        'Theo dõi message trên giao diện quản lý Kafka',
      ],
      signature: 'IProducer<Null,string> · IConsumer<Ignore,string> · BackgroundService',
      constraints: ['Hai service dùng hai database khác nhau', 'Consumer xử lý trùng message không trừ kho hai lần (lưu donId đã xử lý)'],
      examples: [
        { input: 'Đặt 2 Tivi, tồn 5', output: 'Đơn ChoXuLy → ProductDb tồn 3' },
        { input: 'Đặt 9 Tivi, tồn 3', output: 'ProductService gửi order-rejected → đơn chuyển Huy, tồn vẫn 3' },
        { input: 'Cùng message order-created bị gửi lại', output: 'Tồn không đổi', explain: 'Kafka đảm bảo "ít nhất một lần" nên consumer phải idempotent.' },
      ],
      visual: {
        kind: 'seq',
        actors: ['OrderService', 'Kafka', 'ProductService'],
        steps: [
          { from: 0, to: 1, text: 'order-created {donId: 15}' },
          { from: 1, to: 2, text: 'consume' },
          { from: 2, to: 2, text: 'Thiếu hàng?' },
          { from: 2, to: 1, text: 'order-rejected {donId: 15}', dashed: true },
          { from: 1, to: 0, text: 'consume → TrangThai = Huy', dashed: true },
        ],
      },
      dense: true,
    },
    {
      id: 'b42-7', level: 'Nâng cao', title: 'API Gateway YARP kiểm tra JWT',
      requirement: 'Cho bốn service Identity, Product, Order, Payment. Dựng project Gateway bằng YARP làm cổng vào duy nhất; Gateway xác thực JWT một lần, route theo tiền tố đường dẫn và chặn đường dẫn nội bộ.',
      tasks: [
        'Route /identity, /product, /order, /payment tới đúng cluster, bỏ tiền tố bằng PathRemovePrefix',
        '/product cho phép không đăng nhập; /order, /payment bắt buộc JWT (AuthorizationPolicy)',
        'Chặn mọi đường dẫn /*/internal/* trả 404',
        'Product có 2 destination, cấu hình LoadBalancingPolicy RoundRobin',
      ],
      signature: 'builder.Services.AddReverseProxy().LoadFromConfig(...) · app.MapReverseProxy()',
      examples: [
        { input: 'GET http://gateway/product/api/products', output: 'ProductService nhận GET /api/products → 200' },
        { input: 'GET http://gateway/order/api/orders không token', output: '401 ngay tại Gateway', explain: 'Request không tới được OrderService.' },
      ],
    },
    {
      id: 'b42-8', level: 'Nâng cao', title: 'Đề cương đồ án cuối khoá',
      requirement: 'Chọn một đề tài trong danh sách (hoặc tự đề xuất). Lập tài liệu đề cương đồ án đủ để giảng viên duyệt.',
      tasks: [
        'Mô tả bài toán, đối tượng người dùng, 3 vai trò trở lên',
        'ERD tối thiểu 8 bảng có khoá ngoại',
        'Danh sách ≥ 20 API (method, URL, role, mô tả)',
        'Sơ đồ kiến trúc: tầng Controller/Service/Repository hoặc các microservice',
        'Kế hoạch 4 tuần và tiêu chí tự đánh giá theo bảng chấm',
      ],
      signature: 'Tài liệu 5–8 trang + ERD + bảng API',
      examples: [
        { input: 'Đề tài Phòng khám', output: 'Vai trò Admin, BacSi, LeTan, BenhNhan; bảng LichHen, HoSo, DonThuoc, ...; API POST /api/lich-hen (BenhNhan), ...' },
        { input: 'Đề tài tự chọn: Cửa hàng điện máy', output: 'Kế thừa SanPham, KhachHang, DonHang, ChiTietDonHang; thêm KhuyenMai, BaoHanh, KhoHang' },
      ],
      hint: 'Viết luồng chính trước (người dùng làm gì từ đầu đến cuối), rồi mới suy ra bảng và API.',
    },
  ],
}

export default buoi42
