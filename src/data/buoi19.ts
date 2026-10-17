import type { Buoi } from './types'

const buoi19: Buoi = {
  id: 19,
  slug: 'css-grid-responsive-bootstrap-razor',
  title: 'CSS Grid, Responsive, Bootstrap & làm quen cú pháp Razor',
  subtitle: 'Bố cục hai chiều, một trang chạy đẹp trên mọi màn hình, và cách HTML trộn với C#',
  duration: '3 giờ',
  keywords: ['CSS Grid', 'media query', 'mobile-first', 'Bootstrap 5', 'Razor', '@foreach', 'Blazor'],
  goals: [
    'Chia bố cục trang bằng CSS Grid với grid-template-columns và grid-area',
    'Viết media query theo tư duy mobile-first để trang tự đổi bố cục theo bề rộng',
    'Dùng hệ lưới 12 cột và các component sẵn của Bootstrap 5 để dựng trang nhanh',
    'Đọc hiểu một file .razor: HTML xen C# bằng ký hiệu @, lặp danh sách bằng @foreach',
  ],

  sections: [
    {
      id: 'grid',
      title: '1. CSS Grid — bố cục hai chiều',
      blocks: [
        {
          type: 'text',
          text: 'Flexbox xếp theo một chiều: hàng hoặc cột. Grid chia hộp cha thành lưới hàng và cột cùng lúc rồi đặt từng con vào ô. Bố cục cả trang (header, sidebar, nội dung, footer) và lưới sản phẩm tự co số cột là việc của Grid.',
        },
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'Lưới sản phẩm tự co số cột — một dòng thay cho mọi media query',
            code: `.danh-sach {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}`,
            note: 'auto-fill: nhét được bao nhiêu cột rộng tối thiểu 260px thì nhét; 1fr: chia đều phần dư. Màn 1200px ra 4 cột, 800px ra 3 cột, điện thoại ra 1 cột — không cần viết điều kiện nào.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Cùng một CSS, ba bề rộng màn hình',
            columns: [
              { title: 'Điện thoại 390px', tone: 'plain', items: ['1 cột', '(390 − 32 lề) / 260 = 1'] },
              { title: 'Tablet 820px', tone: 'plain', items: ['3 cột', 'Mỗi cột ≈ 252 + phần dư'] },
              { title: 'Laptop 1280px', tone: 'good', items: ['4 cột', '4 × 260 + 3 × 16 = 1088 ≤ 1280'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'Bố cục cả trang bằng grid-template-areas — đặt tên vùng rồi xếp bằng chữ',
            code: `body {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 240px 1fr;        /* sidebar 240px, nội dung phần còn lại */
  grid-template-rows: 64px 1fr 56px;       /* header, giữa, footer */
  grid-template-areas:
    "header header"
    "aside  main"
    "footer footer";
}

header { grid-area: header; }
aside  { grid-area: aside; }
main   { grid-area: main; }
footer { grid-area: footer; }`,
            note: 'Đọc grid-template-areas như bản vẽ: hàng 1 header chiếm hai cột, hàng 2 aside trái main phải, hàng 3 footer chiếm hai cột. Đổi bố cục chỉ cần đổi mấy chữ này, không đụng HTML.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Lưới 2 cột × 3 hàng và vùng nào chiếm ô nào',
            root: {
              label: 'body (grid 240px 1fr / 64px 1fr 56px)',
              children: [
                { label: 'hàng 1', children: [{ label: 'header', note: 'chiếm cả 2 cột', highlight: true }] },
                { label: 'hàng 2', children: [{ label: 'aside', note: 'cột 1, 240px' }, { label: 'main', note: 'cột 2, 1fr', highlight: true }] },
                { label: 'hàng 3', children: [{ label: 'footer', note: 'chiếm cả 2 cột' }] },
              ],
            },
          },
        },
        {
          type: 'table',
          head: ['Khi nào', 'Dùng', 'Vì sao'],
          rows: [
            ['Menu ngang, hàng nút, căn giữa một khối', 'Flexbox', 'Một chiều, nội dung quyết định kích thước'],
            ['Lưới thẻ tự co số cột', 'Grid auto-fill', 'Một dòng CSS, không media query'],
            ['Khung trang có sidebar, header, footer', 'Grid areas', 'Hai chiều, vùng đặt tên đọc được'],
            ['Bên trong một thẻ sản phẩm', 'Flexbox column', 'Đẩy nút xuống đáy bằng margin-top: auto'],
          ],
        },
      ],
    },
    {
      id: 'responsive',
      title: '2. Responsive — media query theo mobile-first',
      blocks: [
        {
          type: 'text',
          text: 'Responsive là cùng một HTML nhưng CSS đổi theo bề rộng màn hình. Mobile-first nghĩa là viết CSS mặc định cho điện thoại (một cột, chữ to, nút to), rồi dùng media query min-width mở rộng dần lên tablet và desktop. Làm ngược lại (desktop trước rồi thu nhỏ) thường phải "gỡ" nhiều quy tắc hơn.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Mobile-first: mỗi mốc chỉ viết thêm cái khác đi, cái cũ vẫn giữ',
            items: [
              { label: '0–767px', text: 'Mặc định: 1 cột, menu xếp dọc, ảnh 100%' },
              { label: '≥ 768px', text: '@media (min-width: 768px): 2 cột, menu ngang' },
              { label: '≥ 1024px', text: '@media (min-width: 1024px): sidebar hiện, 3–4 cột, bề rộng tối đa 1200px căn giữa' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'Trang cửa hàng ba mốc màn hình',
            code: `/* ---- Mặc định: điện thoại ---- */
.container { padding: 0 16px; }
nav { display: flex; flex-direction: column; gap: 8px; }
.danh-sach { display: grid; grid-template-columns: 1fr; gap: 12px; }
aside { display: none; }                     /* bộ lọc ẩn trên điện thoại */

/* ---- Tablet ---- */
@media (min-width: 768px) {
  nav { flex-direction: row; gap: 24px; }
  .danh-sach { grid-template-columns: repeat(2, 1fr); }
}

/* ---- Desktop ---- */
@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
  .noi-dung { display: grid; grid-template-columns: 240px 1fr; gap: 24px; }
  aside { display: block; }
  .danh-sach { grid-template-columns: repeat(3, 1fr); }
}`,
            note: 'Media query chỉ ghi đè những thuộc tính khác đi. Thứ tự viết quan trọng: mốc lớn nằm sau mốc nhỏ vì specificity bằng nhau, cái sau thắng.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Trình duyệt áp CSS theo bề rộng hiện tại',
            steps: [
              { kind: 'start', text: 'Đo bề rộng cửa sổ (viewport)' },
              { kind: 'process', text: 'Áp toàn bộ CSS mặc định' },
              { kind: 'decision', text: 'rộng ≥ 768px ?', branches: [
                { label: 'Đúng', steps: [
                  { kind: 'process', text: 'Áp thêm khối @media 768' },
                  { kind: 'decision', text: 'rộng ≥ 1024px ?', branches: [
                    { label: 'Đúng', steps: [{ kind: 'process', text: 'Áp thêm khối @media 1024' }] },
                    { label: 'Sai', steps: [{ kind: 'note', text: 'Dừng ở bố cục tablet' }] },
                  ] },
                ] },
                { label: 'Sai', steps: [{ kind: 'note', text: 'Giữ bố cục điện thoại' }] },
              ] },
              { kind: 'end', text: 'Xoay máy / kéo cửa sổ → đo lại từ đầu' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Thiếu meta viewport thì media query vô dụng',
          text: 'Không có <meta name="viewport" content="width=device-width, initial-scale=1"> điện thoại sẽ giả vờ rộng 980px rồi thu nhỏ cả trang, media query (min-width: 768px) luôn đúng. Đây là lỗi số một khi "trang trên điện thoại chữ bé tí".',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Kiểm tra',
          text: 'DevTools → biểu tượng điện thoại (Ctrl+Shift+M) để giả lập iPhone, iPad; kéo thanh bề rộng để thấy đúng lúc nào bố cục nhảy. Ảnh dùng max-width: 100%; height: auto để không tràn ra ngoài cột hẹp.',
        },
      ],
    },
    {
      id: 'bootstrap',
      title: '3. Bootstrap 5 — dựng nhanh bằng class có sẵn',
      blocks: [
        {
          type: 'text',
          text: 'Bootstrap là một file CSS viết sẵn hàng trăm class tiện ích và component. Thay vì viết CSS cho nút, thẻ, lưới, bạn gắn class. Template Blazor mặc định đã kèm Bootstrap, nên học nó là học luôn giao diện mặc định của Blazor.',
        },
        {
          type: 'code',
          sample: {
            lang: 'html',
            title: 'Nối Bootstrap qua CDN và dựng lưới 12 cột',
            code: `<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#">Điện máy Cybersoft</a>
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link active" href="#">Trang chủ</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Sản phẩm</a></li>
      </ul>
    </div>
  </nav>

  <main class="container my-4">
    <div class="row g-3">
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100">
          <img src="images/tivi.jpg" class="card-img-top" alt="Tivi Samsung">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Tivi Samsung 55 inch</h5>
            <p class="text-danger fw-bold mb-3">12.000.000 đ</p>
            <button class="btn btn-primary mt-auto">Thêm vào giỏ</button>
          </div>
        </div>
      </div>
      <!-- lặp lại col cho các sản phẩm khác -->
    </div>
  </main>
</body>`,
            note: 'col-12 col-md-6 col-lg-4: điện thoại chiếm 12/12 (1 cột), từ md (≥768) chiếm 6/12 (2 cột), từ lg (≥992) chiếm 4/12 (3 cột). Đây chính là mobile-first viết bằng class.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'strip',
            caption: 'Một .row chia 12 phần; col-lg-4 chiếm 4 phần nên 3 thẻ vừa một hàng trên desktop',
            name: '.row (12 cột)',
            items: ['col-lg-4 (1–4)', 'col-lg-4 (5–8)', 'col-lg-4 (9–12)'],
          },
        },
        {
          type: 'table',
          head: ['Nhóm class', 'Ví dụ', 'Tương đương CSS tự viết'],
          rows: [
            ['Lưới', 'container, row, col-md-6', 'display: grid / flex + media query'],
            ['Khoảng cách', 'm-3, mt-2, p-4, px-3, g-3', 'margin: 1rem; padding-inline: 1rem; gap'],
            ['Flex', 'd-flex, justify-content-between, align-items-center', 'display: flex; justify-content; align-items'],
            ['Chữ', 'fw-bold, text-danger, text-center, fs-4', 'font-weight; color; text-align; font-size'],
            ['Component', 'btn btn-primary, card, navbar, badge, alert, modal', 'Hàng chục dòng CSS mỗi cái'],
            ['Form', 'form-control, form-label, form-select, is-invalid', 'Viền, bo, focus, trạng thái lỗi'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Tự viết CSS hay dùng Bootstrap?',
            columns: [
              { title: 'CSS tự viết', tone: 'plain', items: ['Giao diện đúng ý, nhẹ', 'Mất thời gian, phải biết Flex/Grid', 'Hợp sản phẩm có thiết kế riêng'] },
              { title: 'Bootstrap', tone: 'good', items: ['Nhanh, nhất quán, responsive sẵn', 'Trông "giống Bootstrap" nếu không tuỳ biến', 'Hợp trang quản trị, demo, Blazor mặc định'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Mốc màn hình của Bootstrap',
          text: 'sm ≥ 576 · md ≥ 768 · lg ≥ 992 · xl ≥ 1200 · xxl ≥ 1400. Class không có hậu tố áp cho mọi cỡ; class có hậu tố áp từ mốc đó trở lên. Đọc "col-md-6" là "từ md trở lên chiếm 6 cột".',
        },
      ],
    },
    {
      id: 'razor',
      title: '4. Làm quen cú pháp Razor — HTML gặp C#',
      blocks: [
        {
          type: 'text',
          text: 'Blazor viết giao diện trong file .razor: phần lớn là HTML y như ba buổi vừa rồi, nhưng bất cứ chỗ nào cần dữ liệu hay logic thì chèn C# bằng ký hiệu @. Danh sách sản phẩm cứng trong HTML sẽ thành một @foreach chạy qua List<SanPham>.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Cùng một bảng giá — viết tay và viết bằng Razor',
            columns: [
              { title: 'HTML tĩnh', tone: 'plain', items: ['3 sản phẩm = 3 lần chép <tr>', 'Thêm sản phẩm phải sửa HTML', 'Dữ liệu và giao diện dính nhau'] },
              { title: 'Razor', tone: 'good', items: ['Một <tr> trong @foreach', 'Dữ liệu từ List<SanPham>, API, database', 'Đổi dữ liệu, giao diện tự theo'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'BangGia.razor — HTML quen thuộc, chỉ thêm @',
            code: `@page "/bang-gia"

<h1>Bảng giá tháng @DateTime.Now.Month</h1>

<p>Cửa hàng có <strong>@danhSach.Count</strong> sản phẩm.</p>

<table class="table table-striped">
  <thead>
    <tr><th>Mã</th><th>Tên</th><th>Giá bán</th></tr>
  </thead>
  <tbody>
    @foreach (var sp in danhSach)
    {
      <tr class="@(sp.Gia > 10_000_000 ? "table-warning" : "")">
        <td>@sp.Ma</td>
        <td>@sp.Ten</td>
        <td>@sp.Gia.ToString("N0") đ</td>
      </tr>
    }
  </tbody>
</table>

@if (danhSach.Count == 0)
{
  <div class="alert alert-info">Chưa có sản phẩm nào.</div>
}

@code {
  record SanPham(string Ma, string Ten, decimal Gia);

  List<SanPham> danhSach = new()
  {
    new("TV01", "Tivi Samsung 55 inch", 12_000_000),
    new("TL01", "Tủ lạnh LG", 9_500_000),
    new("NC01", "Nồi cơm Sharp", 650_000),
  };
}`,
            note: '@tenBien in giá trị; @foreach, @if là C# bình thường, bên trong lại viết HTML; @code { } là chỗ khai báo biến và hàm — chính là class C# đứng sau trang. Dữ liệu ở đây cứng, buổi 27 sẽ lấy từ Web API.',
          },
        },
        {
          type: 'table',
          head: ['Ký hiệu', 'Ý nghĩa', 'Ví dụ'],
          rows: [
            ['@bien', 'In giá trị biểu thức ra HTML (đã mã hoá an toàn)', '@sp.Ten · @DateTime.Now.Year'],
            ['@(biểu thức)', 'Biểu thức phức tạp cần ngoặc', '@(sp.Gia * 1.1m) · @(a > b ? "x" : "y")'],
            ['@if / @else / @foreach / @for / @switch', 'Rẽ nhánh và lặp, thân là HTML', '@foreach (var x in ds) { <li>@x</li> }'],
            ['@code { }', 'Khai báo field, property, phương thức C#', 'List<SanPham> danhSach'],
            ['@page "/duong-dan"', 'Trang này mở ở URL nào', '@page "/bang-gia"'],
            ['@* chú thích *@', 'Chú thích Razor, không gửi về trình duyệt', 'khác <!-- --> vẫn gửi'],
            ['@@', 'In ký tự @ thật', 'email@@cybersoft.edu.vn'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Razor sinh HTML như thế nào khi trang hiển thị',
            steps: [
              { kind: 'start', text: 'Trình duyệt mở /bang-gia' },
              { kind: 'process', text: 'Blazor chạy phần @code: tạo danhSach (3 phần tử)' },
              { kind: 'process', text: 'Đi qua markup từ trên xuống, gặp @ thì tính giá trị C#' },
              { kind: 'process', text: '@foreach chạy 3 lượt → sinh 3 <tr>' },
              { kind: 'decision', text: 'danhSach.Count == 0 ?', branches: [
                { label: 'Đúng', steps: [{ kind: 'io', text: 'Sinh thêm div.alert' }] },
                { label: 'Sai', steps: [{ kind: 'note', text: 'Bỏ qua khối @if' }] },
              ] },
              { kind: 'end', text: 'HTML hoàn chỉnh gửi tới trình duyệt — y như HTML viết tay' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Mọi thứ ba buổi vừa học đều dùng lại nguyên vẹn',
          text: 'Thẻ ngữ nghĩa, form, bảng, class Bootstrap, CSS Grid — Razor không thay thế gì cả, chỉ cho phép HTML sinh ra từ dữ liệu. Buổi 20 bắt đầu tạo dự án Blazor và viết file .razor đầu tiên.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b19-1', level: 'Cơ bản', title: 'Số cột của lưới auto-fill',
      requirement: 'Cho .danh-sach { display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px } nằm trong container rộng W. Tính số cột khi W = 360, 900, 1280. Công thức: số cột n lớn nhất sao cho n×280 + (n−1)×20 ≤ W.',
      signature: 'Ba con số',
      examples: [
        { input: 'W = 900', output: '3 cột', explain: '3×280 + 2×20 = 880 ≤ 900; 4 cột cần 1180.' },
        { input: 'W = 360', output: '1 cột', explain: 'Không đủ cho 2 cột (580), 1fr nên cột giãn đầy 360.' },
        { input: 'W = 1280', output: '4 cột (1180 ≤ 1280)' },
      ],
    },
    {
      id: 'b19-2', level: 'Cơ bản', title: 'Đọc class Bootstrap',
      requirement: 'Cho <div class="col-12 col-sm-6 col-lg-3">. Cho biết một hàng có bao nhiêu thẻ ở các bề rộng 400px, 700px, 1000px. Giải thích từng class.',
      signature: 'Ba con số + giải thích',
      examples: [
        { input: '400px', output: '1 thẻ', explain: 'Dưới sm (576): chỉ col-12 có hiệu lực, chiếm 12/12.' },
        { input: '700px', output: '2 thẻ', explain: 'Từ sm: col-sm-6 chiếm 6/12. Chưa tới lg (992).' },
        { input: '1000px', output: '4 thẻ (col-lg-3)' },
      ],
    },
    {
      id: 'b19-3', level: 'Cơ bản', title: 'Đổi HTML tĩnh sang Razor',
      requirement: 'Cho một ul có 4 li tên thương hiệu viết tay. Viết lại thành một đoạn Razor: khai báo List<string> trong @code và sinh li bằng @foreach. Nếu danh sách rỗng, hiện "Chưa có thương hiệu".',
      signature: '@foreach (var t in thuongHieu) { <li>@t</li> } · @if (thuongHieu.Count == 0) { … }',
      examples: [
        { input: 'thuongHieu = ["Samsung", "LG", "Sharp", "Panasonic"]', output: '<ul><li>Samsung</li><li>LG</li><li>Sharp</li><li>Panasonic</li></ul>' },
        { input: 'thuongHieu = []', output: '<ul></ul> và <p>Chưa có thương hiệu</p>' },
      ],
    },
    {
      id: 'b19-4', level: 'Trung bình', title: 'Khung trang bằng grid-template-areas',
      requirement: 'Dựng bố cục trang quản trị: header cao 64px chiếm hết bề ngang; sidebar 240px bên trái; main phần còn lại; footer 48px chiếm hết bề ngang. Trên điện thoại (dưới 768px) sidebar nằm trên main thành một cột. Chỉ đổi grid-template-areas và grid-template-columns trong media query, không đổi HTML.',
      signature: 'body { display:grid; grid-template-areas } @media (min-width:768px) { … }',
      constraints: ['Mobile-first: mặc định một cột, media query mở rộng', 'Mỗi vùng gắn grid-area theo tên', 'min-height: 100vh để footer luôn ở đáy'],
      examples: [
        { input: 'Cửa sổ 1200px', output: 'header | aside main | footer — hai cột 240px và phần còn lại' },
        { input: 'Cửa sổ 390px', output: 'header, aside, main, footer xếp dọc một cột', explain: 'grid-template-areas thành "header" "aside" "main" "footer", columns thành 1fr.' },
      ],
      visual: {
        kind: 'compare',
        caption: 'Hai bản vẽ areas',
        columns: [
          { title: 'Điện thoại (mặc định)', tone: 'plain', items: ['"header"', '"aside"', '"main"', '"footer"', 'columns: 1fr'] },
          { title: '≥ 768px', tone: 'good', items: ['"header header"', '"aside  main"', '"footer footer"', 'columns: 240px 1fr'] },
        ],
      },
    },
    {
      id: 'b19-5', level: 'Trung bình', title: 'Trang sản phẩm responsive ba mốc',
      requirement: 'Làm trang san-pham.html của buổi 18 chạy đẹp ở ba mốc: điện thoại một cột, menu dọc, bộ lọc ẩn; tablet hai cột; desktop ba cột và bộ lọc hiện bên trái rộng 240px, nội dung tối đa 1200px căn giữa. Viết mobile-first, chỉ dùng min-width.',
      signature: 'Mặc định + @media (min-width: 768px) + @media (min-width: 1024px)',
      constraints: ['Có meta viewport', 'Không dùng max-width trong media query', 'Ảnh không tràn cột: max-width: 100%'],
      examples: [
        { input: 'DevTools giả lập iPhone 12', output: '1 cột, menu dọc, không thấy bộ lọc' },
        { input: 'Kéo rộng qua 768px', output: 'Nhảy sang 2 cột, menu ngang' },
        { input: 'Kéo rộng qua 1024px', output: 'Bộ lọc hiện bên trái, 3 cột, hai bên có lề khi quá 1200px' },
      ],
    },
    {
      id: 'b19-6', level: 'Trung bình', title: 'Dựng lại trang bằng Bootstrap',
      requirement: 'Dựng lại trang sản phẩm chỉ bằng class Bootstrap 5 qua CDN, không viết CSS riêng: navbar có brand và 3 link căn phải; lưới card 1/2/3 cột theo mốc; mỗi card có ảnh, tiêu đề, giá đỏ đậm, badge "Mới" và nút primary sát đáy; footer text-center text-muted.',
      signature: 'container, row g-3, col-12 col-md-6 col-lg-4, card h-100, d-flex flex-column, mt-auto',
      constraints: ['Không có thẻ <style> và không có file CSS riêng', 'Nút sát đáy bằng mt-auto trong card-body d-flex flex-column'],
      examples: [
        { input: 'Cửa sổ 1100px', output: '3 card một hàng, cao bằng nhau nhờ h-100' },
        { input: 'Cửa sổ 600px', output: '1 card một hàng, navbar vẫn một dòng' },
      ],
      hint: 'Mỗi class Bootstrap tương ứng một quy tắc CSS bạn đã viết tay ở buổi 18: d-flex = display:flex, mt-auto = margin-top:auto, h-100 = height:100%. Đọc tên class là đoán được.',
    },
    {
      id: 'b19-7', level: 'Nâng cao', title: 'Trang bảng giá Razor có lọc',
      requirement: 'Viết trang BangGia.razor: @code chứa List<SanPham> 6 phần tử với Ma, Ten, Nhom, Gia; render bảng Bootstrap bằng @foreach; hàng nào Gia > 10 triệu thì thêm class table-warning; dưới bảng in tổng giá bằng @danhSach.Sum(...); trên bảng in số lượng mỗi nhóm bằng @foreach qua GroupBy. Nếu danh sách rỗng hiện alert.',
      signature: '@page "/bang-gia" + markup + @code { record SanPham(…); List<SanPham> danhSach; }',
      constraints: ['Chỉ dùng cú pháp Razor đã học: @, @(), @foreach, @if, @code', 'Không dùng sự kiện hay @bind — buổi 21–22'],
      examples: [
        { input: '6 sản phẩm: 2 điện tử, 3 điện lạnh, 1 gia dụng', output: 'Dòng "Điện tử: 2 · Điện lạnh: 3 · Gia dụng: 1" phía trên; bảng 6 hàng; hàng tivi 12tr và tủ lạnh 11tr có nền vàng; dưới bảng "Tổng: 45.150.000 đ"' },
        { input: 'danhSach rỗng', output: 'Chỉ còn h1 và alert "Chưa có sản phẩm nào", không có bảng', explain: 'Bọc cả bảng trong @if (danhSach.Count > 0) … else … .' },
      ],
      hint: 'GroupBy trả về các nhóm có Key và Count(): @foreach (var g in danhSach.GroupBy(s => s.Nhom)) { <span>@g.Key: @g.Count()</span> }. Biểu thức có dấu chấm và ngoặc nên bọc @( ) khi đứng cạnh chữ.',
    },
    {
      id: 'b19-8', level: 'Nâng cao', title: 'Phân tích responsive của một trang thật',
      requirement: 'Mở một trang thương mại điện tử thật (Tiki, Thế Giới Di Động…) bằng DevTools ở chế độ thiết bị. Kéo bề rộng từ 320 tới 1440px, ghi lại ít nhất 3 mốc bố cục nhảy (bề rộng, cái gì thay đổi), đoán kỹ thuật dùng (Flex, Grid, display:none) bằng tab Elements và Styles, rồi vẽ lại sơ đồ areas cho từng mốc.',
      signature: 'Bảng mốc + 3 sơ đồ areas + ảnh chụp',
      examples: [
        { input: 'Thế Giới Di Động, kéo qua ~1024px', output: 'Menu hamburger biến thành thanh danh mục ngang; lưới sản phẩm 2 → 4 cột; sidebar lọc xuất hiện. Kỹ thuật: display:none đổi display:block cho sidebar, grid-template-columns đổi số cột.' },
      ],
      hint: 'Tab Styles hiện các khối @media đang có hiệu lực ở bề rộng hiện tại; kéo cửa sổ và xem khối nào bật tắt là biết mốc.',
    },
  ],
}

export default buoi19
