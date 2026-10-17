import type { Buoi } from './types'

const buoi17: Buoi = {
  id: 17,
  slug: 'html5-cau-truc-trang-web',
  title: 'HTML5 — Cấu trúc trang web',
  subtitle: 'Trang web là một cây thẻ lồng nhau; học cách đặt đúng thẻ vào đúng chỗ trước khi trang trí',
  duration: '3 giờ',
  keywords: ['HTML5', 'DOM', 'semantic', 'form', 'table', 'attribute', 'VS Code Live Server'],
  goals: [
    'Giải thích được trình duyệt biến file HTML thành cây DOM như thế nào',
    'Viết được bộ khung trang chuẩn HTML5 và các thẻ ngữ nghĩa header, nav, main, section, footer',
    'Dùng đúng thẻ cho văn bản, liên kết, hình ảnh, danh sách, bảng',
    'Dựng được form đăng ký với các loại input, label, validation có sẵn của trình duyệt',
  ],

  sections: [
    {
      id: 'web-hoat-dong',
      title: '1. Trang web hoạt động ra sao',
      blocks: [
        {
          type: 'text',
          text: 'Gõ một địa chỉ vào trình duyệt là gửi một yêu cầu HTTP tới máy chủ. Máy chủ trả về một file văn bản thuần HTML. Trình duyệt đọc file đó, dựng thành cây các phần tử gọi là DOM, rồi vẽ cây ấy lên màn hình. CSS quyết định vẽ đẹp xấu ra sao, JavaScript (hoặc Blazor) quyết định trang phản ứng thế nào khi người dùng bấm.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Một lần tải trang — HTML là thứ đầu tiên về, các tài nguyên khác được xin thêm sau',
            actors: ['Trình duyệt', 'Máy chủ web'],
            steps: [
              { from: 0, to: 1, text: 'GET /index.html' },
              { from: 1, to: 0, text: '200 OK + nội dung HTML', dashed: true },
              { from: 0, to: 0, text: 'Phân tích HTML → dựng cây DOM' },
              { from: 0, to: 1, text: 'GET style.css, logo.png (thấy trong HTML)' },
              { from: 1, to: 0, text: 'Trả về từng file', dashed: true },
              { from: 0, to: 0, text: 'Áp CSS, vẽ lên màn hình' },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Ba lớp của một trang web — buổi này chỉ lo lớp đầu tiên',
            columns: [
              { title: 'HTML — cấu trúc', tone: 'good', items: ['Có những gì trên trang', 'Tiêu đề, đoạn văn, ảnh, form', 'Thẻ lồng nhau thành cây'] },
              { title: 'CSS — hình thức', tone: 'plain', items: ['Màu, cỡ chữ, khoảng cách', 'Bố cục cột, lưới', 'Buổi 18–19'] },
              { title: 'C# / Blazor — hành vi', tone: 'plain', items: ['Bấm nút thì làm gì', 'Lấy dữ liệu từ API', 'Buổi 20 trở đi'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Công cụ',
          text: 'VS Code + extension Live Server: bấm chuột phải vào file HTML chọn "Open with Live Server", sửa file là trình duyệt tự tải lại. Bấm F12 mở DevTools, tab Elements cho xem cây DOM thật mà trình duyệt đã dựng.',
        },
      ],
    },
    {
      id: 'cay-dom',
      title: '2. Thẻ, thuộc tính và cây DOM',
      blocks: [
        {
          type: 'text',
          text: 'Một phần tử HTML gồm thẻ mở, nội dung và thẻ đóng. Thuộc tính nằm trong thẻ mở dạng tên="giá trị". Phần tử có thể chứa phần tử khác, nên toàn bộ trang là một cái cây có gốc là html.',
        },
        {
          type: 'code',
          sample: {
            lang: 'html',
            title: 'Bộ khung chuẩn HTML5 — gõ ! rồi Tab trong VS Code để sinh ra',
            code: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cửa hàng điện máy</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Cửa hàng điện máy Cybersoft</h1>
  <p>Chuyên <strong>tivi</strong>, tủ lạnh và máy giặt chính hãng.</p>
  <img src="images/tivi.jpg" alt="Tivi Samsung 55 inch" width="300">
  <a href="san-pham.html">Xem tất cả sản phẩm</a>
</body>
</html>`,
            note: 'head là phần trình duyệt đọc nhưng không vẽ: bảng mã, tiêu đề tab, link CSS. body mới là phần hiện lên. meta viewport bắt buộc để trang hiển thị đúng trên điện thoại.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Cây DOM mà trình duyệt dựng từ đoạn HTML trên — mỗi thẻ là một nút, chữ bên trong cũng là nút',
            root: {
              label: 'html', note: 'lang="vi"',
              children: [
                { label: 'head', children: [{ label: 'meta', note: 'charset' }, { label: 'meta', note: 'viewport' }, { label: 'title', note: '"Cửa hàng điện máy"' }, { label: 'link', note: 'style.css' }] },
                {
                  label: 'body', highlight: true,
                  children: [
                    { label: 'h1', note: '"Cửa hàng điện máy Cybersoft"' },
                    { label: 'p', children: [{ label: '#text', note: '"Chuyên "' }, { label: 'strong', note: '"tivi"' }, { label: '#text', note: '", tủ lạnh…"' }] },
                    { label: 'img', note: 'src, alt, width' },
                    { label: 'a', note: 'href="san-pham.html"' },
                  ],
                },
              ],
            },
          },
        },
        {
          type: 'table',
          head: ['Thành phần', 'Ví dụ', 'Ghi chú'],
          rows: [
            ['Thẻ mở / đóng', '<p> … </p>', 'Tên thẻ viết thường'],
            ['Thẻ rỗng', '<img>, <br>, <input>, <meta>', 'Không có thẻ đóng, không chứa nội dung'],
            ['Thuộc tính', 'src="a.jpg" alt="Mô tả"', 'Luôn trong thẻ mở, giá trị trong ngoặc kép'],
            ['Thuộc tính boolean', '<input disabled>', 'Có mặt là bật, không cần giá trị'],
            ['Chú thích', '<!-- ghi chú -->', 'Không hiện lên trang, vẫn tải về'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Hai lỗi lồng thẻ hay gặp',
          text: 'Đóng thẻ sai thứ tự: <p><strong>tivi</p></strong> — thẻ mở sau phải đóng trước. Đặt thẻ khối trong thẻ dòng: <a><div>…</div></a> được, nhưng <p><div>…</div></p> thì trình duyệt tự đóng p sớm và cây DOM khác với ý bạn. Kiểm tra bằng tab Elements.',
        },
      ],
    },
    {
      id: 'the-ngu-nghia',
      title: '3. Thẻ ngữ nghĩa — bố cục một trang',
      blocks: [
        {
          type: 'text',
          text: 'Trước HTML5 người ta chia trang bằng hàng chục div vô danh. HTML5 thêm các thẻ có tên nói lên vai trò: header, nav, main, section, article, aside, footer. Trình duyệt vẽ chúng y như div, nhưng máy đọc màn hình, công cụ tìm kiếm và chính bạn đọc code sẽ hiểu trang ngay.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Bố cục trang cửa hàng bằng thẻ ngữ nghĩa — mỗi vùng một thẻ, không div vô danh',
            root: {
              label: 'body',
              children: [
                { label: 'header', note: 'logo + tên cửa hàng', children: [{ label: 'nav', note: 'menu: Trang chủ · Sản phẩm · Liên hệ' }] },
                {
                  label: 'main', highlight: true,
                  children: [
                    { label: 'section#noi-bat', note: 'Sản phẩm nổi bật', children: [{ label: 'article', note: 'thẻ 1 sản phẩm' }, { label: 'article', note: 'thẻ 1 sản phẩm' }] },
                    { label: 'section#khuyen-mai', note: 'Khuyến mãi tháng này' },
                    { label: 'aside', note: 'Bộ lọc giá, thương hiệu' },
                  ],
                },
                { label: 'footer', note: 'địa chỉ, hotline, bản quyền' },
              ],
            },
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'html',
            title: 'Khung trang bằng thẻ ngữ nghĩa',
            code: `<body>
  <header>
    <img src="logo.png" alt="Cybersoft" height="40">
    <nav>
      <a href="index.html">Trang chủ</a>
      <a href="san-pham.html">Sản phẩm</a>
      <a href="lien-he.html">Liên hệ</a>
    </nav>
  </header>

  <main>
    <section id="noi-bat">
      <h2>Sản phẩm nổi bật</h2>
      <article class="san-pham">
        <img src="images/tivi.jpg" alt="Tivi Samsung 55 inch">
        <h3>Tivi Samsung 55 inch</h3>
        <p class="gia">12.000.000 đ</p>
        <a href="chi-tiet.html?id=TV01">Xem chi tiết</a>
      </article>
    </section>
  </main>

  <footer>
    <p>© 2026 Cybersoft · Hotline 0901 234 567</p>
  </footer>
</body>`,
            note: 'id là duy nhất trên trang, dùng để nhảy tới (#noi-bat) và để CSS/JS tìm đúng một phần tử. class dùng lại được cho nhiều phần tử cùng kiểu — mọi thẻ sản phẩm đều mang class="san-pham".',
          },
        },
        {
          type: 'table',
          head: ['Thẻ', 'Dùng cho', 'Mỗi trang có'],
          rows: [
            ['header', 'Phần đầu: logo, tên trang, menu', 'Thường 1, có thể 1 trong mỗi article'],
            ['nav', 'Nhóm liên kết điều hướng chính', '1–2'],
            ['main', 'Nội dung chính, duy nhất của trang', 'Đúng 1'],
            ['section', 'Một nhóm nội dung có tiêu đề riêng', 'Nhiều'],
            ['article', 'Một đơn vị độc lập: bài viết, sản phẩm, bình luận', 'Nhiều'],
            ['aside', 'Nội dung phụ: bộ lọc, quảng cáo, bài liên quan', '0–1'],
            ['footer', 'Chân trang: liên hệ, bản quyền', '1'],
            ['div / span', 'Khi không thẻ nào ở trên hợp — chỉ để gom cho CSS', 'Tuỳ'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Khối và dòng',
          text: 'Thẻ khối (div, p, h1, section, ul…) chiếm trọn một hàng, xuống dòng trước và sau. Thẻ dòng (span, a, strong, em, img…) nằm xen trong dòng chữ. Phân biệt này quyết định cách CSS bố cục ở buổi sau.',
        },
      ],
    },
    {
      id: 'van-ban-lien-ket-hinh',
      title: '4. Văn bản, liên kết, hình ảnh, danh sách, bảng',
      blocks: [
        {
          type: 'code',
          sample: {
            lang: 'html',
            title: 'Các thẻ nội dung hay dùng',
            code: `<h1>Tiêu đề cấp 1 — mỗi trang chỉ một</h1>
<h2>Tiêu đề cấp 2</h2>
<p>Đoạn văn có <strong>chữ quan trọng</strong>, <em>chữ nhấn</em> và <br> xuống dòng.</p>

<!-- Liên kết: tương đối, tuyệt đối, mở tab mới, nhảy trong trang -->
<a href="san-pham.html">Trang khác cùng web</a>
<a href="https://cybersoft.edu.vn" target="_blank" rel="noopener">Web ngoài</a>
<a href="#lien-he">Nhảy tới mục Liên hệ</a>
<a href="tel:0901234567">Gọi hotline</a>

<!-- Hình ảnh: alt bắt buộc, width/height giữ chỗ chống nhảy layout -->
<img src="images/tu-lanh.jpg" alt="Tủ lạnh LG 350 lít" width="300" height="200">

<!-- Danh sách không thứ tự, có thứ tự -->
<ul>
  <li>Điện tử</li>
  <li>Điện lạnh</li>
</ul>
<ol>
  <li>Chọn sản phẩm</li>
  <li>Thêm vào giỏ</li>
  <li>Thanh toán</li>
</ol>`,
            note: 'alt là chữ hiện khi ảnh hỏng và là thứ máy đọc màn hình đọc cho người khiếm thị. Thẻ h1→h6 là cấp bậc đề mục, không phải cỡ chữ — cỡ chữ để CSS lo.',
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'html',
            title: 'Bảng dữ liệu — chỉ dùng cho dữ liệu dạng bảng, không dùng để bố cục',
            code: `<table>
  <caption>Bảng giá tháng 10</caption>
  <thead>
    <tr>
      <th>Mã</th>
      <th>Tên sản phẩm</th>
      <th>Giá bán</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TV01</td>
      <td>Tivi Samsung 55 inch</td>
      <td>12.000.000 đ</td>
    </tr>
    <tr>
      <td>TL01</td>
      <td>Tủ lạnh LG</td>
      <td>9.500.000 đ</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">Tổng</td>
      <td>21.500.000 đ</td>
    </tr>
  </tfoot>
</table>`,
            note: 'tr là hàng, th là ô tiêu đề, td là ô dữ liệu. colspan gộp ô theo chiều ngang, rowspan theo chiều dọc. Đây đúng là bảng mà sau này Blazor sẽ render từ List<SanPham> bằng @foreach.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'strip',
            caption: 'Một hàng tr trong tbody là dãy các ô td theo thứ tự cột — giống một phần tử trong List<SanPham>',
            name: 'tr (TV01)',
            items: ['td: TV01', 'td: Tivi Samsung 55 inch', 'td: 12.000.000 đ'],
          },
        },
      ],
    },
    {
      id: 'form',
      title: '5. Form — thu thập dữ liệu người dùng',
      blocks: [
        {
          type: 'text',
          text: 'Form là cầu nối giữa người dùng và chương trình: mỗi ô nhập là một input có name, bấm nút submit thì trình duyệt gom các cặp name=value gửi đi. Sau này trong Blazor, EditForm và @bind làm đúng việc này nhưng không tải lại trang.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'ipo',
            caption: 'Form đăng ký khách hàng nhìn theo IPO',
            input: ['Họ tên (text)', 'Email (email)', 'Số điện thoại (tel)', 'Năm sinh (number)', 'Đồng ý điều khoản (checkbox)'],
            process: ['Trình duyệt kiểm tra required, type, min/max', 'Gom name=value', 'Gửi POST tới action'],
            output: ['Yêu cầu HTTP có dữ liệu form', 'Hoặc thông báo lỗi ngay tại ô sai'],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'html',
            title: 'Form đăng ký khách hàng thân thiết',
            code: `<form action="/dang-ky" method="post">
  <div>
    <label for="hoTen">Họ tên</label>
    <input id="hoTen" name="hoTen" type="text" required minlength="2" placeholder="Nguyễn Văn An">
  </div>

  <div>
    <label for="email">Email</label>
    <input id="email" name="email" type="email" required>
  </div>

  <div>
    <label for="sdt">Số điện thoại</label>
    <input id="sdt" name="sdt" type="tel" pattern="0[0-9]{9}" title="10 số, bắt đầu bằng 0">
  </div>

  <div>
    <label for="namSinh">Năm sinh</label>
    <input id="namSinh" name="namSinh" type="number" min="1900" max="2026">
  </div>

  <div>
    <label for="hang">Hạng thẻ</label>
    <select id="hang" name="hang">
      <option value="thuong">Thường</option>
      <option value="vang">Vàng</option>
      <option value="bachkim">Bạch kim</option>
    </select>
  </div>

  <div>
    <input id="dongY" name="dongY" type="checkbox" required>
    <label for="dongY">Tôi đồng ý điều khoản</label>
  </div>

  <button type="submit">Đăng ký</button>
  <button type="reset">Nhập lại</button>
</form>`,
            note: 'label for="…" trỏ tới id của input: bấm vào chữ là con trỏ nhảy vào ô. name là tên trường gửi về máy chủ — chính là tên property của ViewModel bên C#. required, type, pattern, min/max là validation miễn phí của trình duyệt.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Chuyện gì xảy ra khi bấm Đăng ký',
            steps: [
              { kind: 'start', text: 'Bấm nút submit' },
              { kind: 'decision', text: 'Mọi ô hợp lệ (required, type, pattern) ?', branches: [
                { label: 'Sai', steps: [{ kind: 'io', text: 'Trình duyệt tô đỏ ô sai, hiện thông báo, KHÔNG gửi' }] },
                { label: 'Đúng', steps: [
                  { kind: 'process', text: 'Gom hoTen=…&email=…&sdt=… ' },
                  { kind: 'process', text: 'Gửi POST /dang-ky' },
                  { kind: 'io', text: 'Máy chủ xử lý, trả trang kết quả' },
                ] },
              ] },
            ],
          },
        },
        {
          type: 'table',
          head: ['type', 'Hiện ra', 'Trình duyệt tự kiểm tra'],
          rows: [
            ['text', 'Ô chữ một dòng', 'minlength, maxlength, pattern'],
            ['email', 'Ô chữ, bàn phím có @ trên điện thoại', 'Phải có dạng a@b'],
            ['password', 'Ô chữ che dấu chấm', 'như text'],
            ['number', 'Ô số có mũi tên', 'min, max, step'],
            ['tel', 'Bàn phím số trên điện thoại', 'pattern'],
            ['date', 'Lịch chọn ngày', 'min, max'],
            ['checkbox', 'Ô tick, chọn nhiều', 'required'],
            ['radio', 'Nút tròn, cùng name chọn một', 'required'],
            ['file', 'Nút chọn file', 'accept=".jpg,.png"'],
            ['textarea (thẻ riêng)', 'Ô nhiều dòng', 'minlength, maxlength'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Validation của trình duyệt không thay thế kiểm tra ở máy chủ',
          text: 'Ai cũng tắt được bằng DevTools hoặc gửi request thẳng không qua form. Trình duyệt kiểm tra là để người dùng đỡ gõ sai; máy chủ (Web API, buổi 32 trở đi) vẫn phải kiểm tra lại toàn bộ.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b17-1', level: 'Cơ bản', title: 'Bộ khung trang và đề mục',
      requirement: 'Cho yêu cầu: một trang giới thiệu cửa hàng có tiêu đề tab "Điện máy Cybersoft", một tiêu đề lớn, một đoạn giới thiệu có một cụm in đậm, và một ảnh logo. Viết file index.html đầy đủ khung HTML5.',
      signature: 'index.html — <!DOCTYPE html>, <html lang="vi">, <head>, <body>',
      constraints: ['Có đủ meta charset và meta viewport', 'Đúng một h1', 'img phải có alt'],
      examples: [
        { input: 'Mở bằng Live Server', output: 'Tab trình duyệt ghi "Điện máy Cybersoft", trang hiện h1, đoạn văn và logo' },
        { input: 'Đổi tên file ảnh sai', output: 'Vị trí ảnh hiện chữ alt thay vì ô trống', explain: 'Đó là lý do alt bắt buộc.' },
      ],
      visual: {
        kind: 'tree',
        caption: 'Cây DOM đích',
        root: { label: 'html', children: [{ label: 'head', children: [{ label: 'meta ×2' }, { label: 'title' }] }, { label: 'body', children: [{ label: 'h1' }, { label: 'p', children: [{ label: 'strong' }] }, { label: 'img' }] }] },
      },
    },
    {
      id: 'b17-2', level: 'Cơ bản', title: 'Vẽ cây DOM từ HTML',
      requirement: 'Cho đoạn HTML: <ul><li>Điện tử</li><li>Điện <em>lạnh</em></li></ul>. Vẽ cây DOM tương ứng (các nút phần tử và nút văn bản) và cho biết nút em có bao nhiêu tổ tiên.',
      signature: 'Trả lời bằng sơ đồ cây + một số',
      examples: [
        { input: '<ul><li>Điện tử</li><li>Điện <em>lạnh</em></li></ul>', output: 'ul → li → #text "Điện tử"; ul → li → #text "Điện ", em → #text "lạnh". em có 2 tổ tiên: li và ul', explain: 'Chữ "Điện " trước em là một nút văn bản riêng, ngang hàng với em.' },
      ],
      hint: 'Mỗi lần gặp thẻ mở là đi xuống một tầng, gặp thẻ đóng là đi lên. Chữ nằm giữa hai thẻ là nút #text.',
    },
    {
      id: 'b17-3', level: 'Cơ bản', title: 'Menu điều hướng',
      requirement: 'Dựng thẻ header chứa logo và nav có 4 liên kết: Trang chủ (index.html), Sản phẩm (san-pham.html), Khuyến mãi (nhảy tới mục id="khuyen-mai" trên cùng trang), Facebook (mở tab mới tới một địa chỉ ngoài).',
      signature: '<header><img …><nav><a …>×4</nav></header>',
      constraints: ['Liên kết ngoài phải có target="_blank" và rel="noopener"', 'Liên kết nhảy trong trang dùng href="#khuyen-mai" và trang phải có phần tử mang id đó'],
      examples: [
        { input: 'Bấm "Khuyến mãi"', output: 'Trang cuộn tới mục khuyến mãi, địa chỉ có thêm #khuyen-mai' },
        { input: 'Bấm "Facebook"', output: 'Mở tab mới, tab cũ giữ nguyên' },
      ],
    },
    {
      id: 'b17-4', level: 'Trung bình', title: 'Trang danh sách sản phẩm bằng thẻ ngữ nghĩa',
      requirement: 'Dựng trang san-pham.html theo bố cục: header có nav; main có một section "Sản phẩm nổi bật" chứa 3 article, mỗi article gồm ảnh, h3 tên, p giá, a "Xem chi tiết"; một aside "Bộ lọc" chứa ul 3 thương hiệu; footer có hotline. Không dùng div.',
      signature: 'san-pham.html',
      constraints: ['Chỉ dùng header, nav, main, section, article, aside, footer, h1–h3, p, img, a, ul, li', 'Mỗi article có class="san-pham"', 'Đúng một main, đúng một h1'],
      examples: [
        { input: 'DevTools → Elements', output: 'body có 3 con: header, main, footer; main có 2 con: section, aside; section có h2 và 3 article' },
        { input: 'Thêm sản phẩm thứ 4', output: 'Chỉ chép thêm một article, không sửa chỗ khác', explain: 'Đó là mục tiêu của class="san-pham": cùng kiểu thì cùng class.' },
      ],
      visual: {
        kind: 'tree',
        caption: 'Bố cục đích',
        root: { label: 'body', children: [{ label: 'header', children: [{ label: 'nav' }] }, { label: 'main', highlight: true, children: [{ label: 'section', children: [{ label: 'h2' }, { label: 'article.san-pham ×3' }] }, { label: 'aside', children: [{ label: 'ul > li ×3' }] }] }, { label: 'footer' }] },
      },
    },
    {
      id: 'b17-5', level: 'Trung bình', title: 'Bảng giá có gộp ô',
      requirement: 'Dựng bảng gồm caption, thead (Mã, Tên, Nhóm, Giá), tbody 4 sản phẩm trong đó 2 sản phẩm cùng nhóm "Điện lạnh" phải gộp ô nhóm bằng rowspan, và tfoot một hàng "Tổng" gộp 3 ô đầu bằng colspan rồi ô cuối ghi tổng giá.',
      signature: '<table><caption/><thead/><tbody/><tfoot/></table>',
      constraints: ['Ô tiêu đề dùng th, ô dữ liệu dùng td', 'Số ô mỗi hàng sau khi tính rowspan/colspan phải khớp 4 cột'],
      examples: [
        { input: 'TV01 Điện tử 12tr; TL01 Điện lạnh 9,5tr; ML01 Điện lạnh 8tr; NC01 Gia dụng 650k', output: 'Hàng TL01 có ô "Điện lạnh" rowspan="2"; hàng ML01 chỉ còn 3 ô; tfoot: <td colspan="3">Tổng</td><td>30.150.000 đ</td>' },
      ],
      hint: 'Hàng bị gộp vào thì bỏ hẳn ô đó đi, không để ô trống. Đếm ô từng hàng trước khi viết.',
    },
    {
      id: 'b17-6', level: 'Trung bình', title: 'Form đăng ký khách hàng',
      requirement: 'Dựng form đăng ký gồm: họ tên (bắt buộc, tối thiểu 2 ký tự), email (bắt buộc, đúng dạng), số điện thoại (10 số bắt đầu bằng 0), năm sinh (1900–2026), hạng thẻ (select 3 lựa chọn), giới tính (radio Nam/Nữ), ô ghi chú nhiều dòng, checkbox đồng ý điều khoản (bắt buộc), nút Đăng ký và Nhập lại. Mọi ô phải có label bấm vào được.',
      signature: '<form method="post" action="/dang-ky"> … </form>',
      constraints: ['Mỗi input có id và name; label dùng for trỏ đúng id', 'Validation chỉ bằng thuộc tính HTML: required, type, minlength, pattern, min, max', 'Radio cùng name="gioiTinh"'],
      examples: [
        { input: 'Bỏ trống họ tên, bấm Đăng ký', output: 'Trình duyệt báo "Please fill out this field" tại ô họ tên, không gửi' },
        { input: 'Nhập sdt "123"', output: 'Báo lỗi theo title của pattern' },
        { input: 'Nhập đủ, bấm Đăng ký', output: 'Trình duyệt gửi POST /dang-ky với hoTen=…&email=…&gioiTinh=nam&…', explain: 'Xem được trong DevTools → Network → Payload.' },
      ],
      visual: {
        kind: 'flow',
        caption: 'Luồng submit',
        steps: [
          { kind: 'start', text: 'Bấm Đăng ký' },
          { kind: 'decision', text: 'Có ô nào vi phạm required / type / pattern ?', branches: [
            { label: 'Có', steps: [{ kind: 'io', text: 'Tô đỏ ô đầu tiên sai, dừng' }] },
            { label: 'Không', steps: [{ kind: 'process', text: 'POST /dang-ky với name=value' }] },
          ] },
        ],
      },
    },
    {
      id: 'b17-7', level: 'Nâng cao', title: 'Trang chi tiết sản phẩm hoàn chỉnh',
      requirement: 'Dựng trang chi-tiet.html cho một sản phẩm: header + nav dùng chung; main gồm article có ảnh lớn, h1 tên, p giá, bảng thông số kỹ thuật (3 hàng), section "Đánh giá" chứa 2 article bình luận (mỗi bình luận có header tên người và time ngày), và một form gửi bình luận (tên, nội dung textarea, điểm 1–5 bằng input number, nút Gửi); footer. Kiểm tra bằng trình xác thực validator.w3.org không còn lỗi.',
      signature: 'chi-tiet.html',
      constraints: ['Chỉ một h1, các đề mục còn lại giảm dần không nhảy cấp', 'time có thuộc tính datetime="2026-10-17"', 'Form có label đầy đủ, điểm bắt buộc trong 1–5'],
      examples: [
        { input: 'Dán nội dung vào validator.w3.org', output: 'Document checking completed. No errors or warnings to show.' },
        { input: 'Thu nhỏ cửa sổ bằng điện thoại', output: 'Chữ không bị thu bé li ti', explain: 'Nhờ meta viewport.' },
      ],
      hint: 'Mỗi bình luận là một article vì nó độc lập, bên trong có header riêng chứa tên và time. Bảng thông số là table hai cột th/td, không phải danh sách.',
    },
    {
      id: 'b17-8', level: 'Nâng cao', title: 'Đọc hiểu và sửa HTML lỗi',
      requirement: 'Cho đoạn HTML có 6 lỗi: thẻ đóng sai thứ tự, p chứa div, img thiếu alt, hai phần tử trùng id, label không trỏ tới input, input thiếu name. Chỉ ra từng lỗi, giải thích hậu quả, và viết lại bản đúng.',
      signature: 'Danh sách 6 lỗi + đoạn HTML đã sửa',
      examples: [
        { input: '<p>Giá <div>12tr</div></p>', output: 'Lỗi: p không chứa được khối. Trình duyệt tự đóng p trước div, sinh thêm một p rỗng sau. Sửa: đổi div thành span hoặc tách ra ngoài p.' },
        { input: '<label>Email</label><input type="email">', output: 'Lỗi: label không gắn với input, bấm chữ không focus. Sửa: thêm id cho input và for cho label, hoặc bọc input trong label.' },
      ],
      hint: 'Dán đoạn lỗi vào trình duyệt rồi xem tab Elements: cây DOM thật khác với chữ bạn viết ở chỗ nào thì chỗ đó có lỗi.',
    },
  ],
}

export default buoi17
