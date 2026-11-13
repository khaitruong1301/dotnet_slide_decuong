import type { InterviewSet } from '../types'

const htmlcss: InterviewSet = {
  slug: 'html-css',
  title: 'Phỏng vấn: HTML & CSS',
  subtitle: 'HTML5 ngữ nghĩa, form, CSS selector, box model, Flexbox, Grid, responsive, Bootstrap',
  from: 17,
  to: 19,
  questions: [
    // ───────────────────────────── Cơ bản ─────────────────────────────
    {
      id: 'pv-hc-01',
      level: 'Cơ bản',
      question: 'Gõ địa chỉ vào trình duyệt, chuyện gì xảy ra cho tới khi trang hiện lên màn hình?',
      short: 'Trình duyệt gửi yêu cầu HTTP, nhận về file HTML rồi phân tích thành cây DOM; gặp link CSS, ảnh, script thì xin thêm từng file. Khi có đủ DOM và CSS, trình duyệt tính bố cục rồi vẽ lên màn hình.',
      answer: [
        {
          type: 'text',
          text: 'HTML luôn về đầu tiên. Trình duyệt đọc từ trên xuống, mỗi thẻ thành một nút trong cây DOM, chữ giữa các thẻ thành nút #text. Tài nguyên khác (style.css, logo.png, app.js) chỉ được xin khi trình duyệt đọc tới thẻ tham chiếu chúng.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'Một lần tải trang — HTML về trước, tài nguyên khác được xin thêm sau',
            actors: ['Trình duyệt', 'Máy chủ web'],
            steps: [
              { from: 0, to: 1, text: 'GET /index.html' },
              { from: 1, to: 0, text: '200 OK + nội dung HTML', dashed: true },
              { from: 0, to: 0, text: 'Phân tích HTML → dựng cây DOM' },
              { from: 0, to: 1, text: 'GET style.css, logo.png, app.js' },
              { from: 1, to: 0, text: 'Trả về từng file', dashed: true },
              { from: 0, to: 0, text: 'DOM + CSS → tính bố cục → vẽ' },
            ],
          },
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'DOM: cây phần tử dựng từ HTML',
            'CSSOM: các quy tắc dựng từ file CSS',
            'Render tree: ghép DOM với CSS, bỏ phần tử display: none',
            'Layout: tính vị trí và kích thước từng hộp',
            'Paint: tô màu từng điểm ảnh lên màn hình',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'DOM không phải mã nguồn',
          text: 'DevTools → Elements hiện cây DOM thật, không phải chữ bạn viết. Viết sai như <p><div>…</div></p> thì trình duyệt tự đóng p sớm và cây DOM khác mã nguồn — so hai bên là cách nhanh nhất tìm lỗi lồng thẻ.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Script chặn việc dựng trang',
          text: 'Gặp thẻ <script> thường, trình duyệt dừng phân tích HTML để tải và chạy script xong mới đi tiếp. Vì vậy script hay được đặt cuối body hoặc thêm thuộc tính defer.',
        },
      ],
      followUps: [
        'DOM khác mã nguồn HTML (View Source) ở điểm nào?',
        'Vì sao nên đặt thẻ script cuối body hoặc thêm defer?',
      ],
      buoi: [17],
    },
    {
      id: 'pv-hc-02',
      level: 'Cơ bản',
      question: 'Thẻ ngữ nghĩa (semantic) trong HTML5 là gì? Dùng chúng thay cho div có lợi gì?',
      short: 'Là các thẻ có tên nói lên vai trò của vùng nội dung: header, nav, main, section, article, aside, footer. Trình duyệt vẽ chúng y như div, nhưng máy đọc màn hình, công cụ tìm kiếm và người đọc code hiểu ngay cấu trúc trang.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'Bố cục trang cửa hàng bằng thẻ ngữ nghĩa — mỗi vùng một thẻ, không div vô danh',
            root: {
              label: 'body',
              children: [
                { label: 'header', note: 'logo + tên cửa hàng', children: [{ label: 'nav', note: 'menu điều hướng' }] },
                {
                  label: 'main', highlight: true, note: 'đúng một trên trang',
                  children: [
                    { label: 'section#noi-bat', note: 'Sản phẩm nổi bật', children: [{ label: 'article', note: 'một sản phẩm' }, { label: 'article', note: 'một sản phẩm' }] },
                    { label: 'aside', note: 'bộ lọc giá, thương hiệu' },
                  ],
                },
                { label: 'footer', note: 'địa chỉ, hotline, bản quyền' },
              ],
            },
          },
        },
        {
          type: 'table',
          head: ['Thẻ', 'Dùng cho'],
          rows: [
            ['header / footer', 'Phần đầu (logo, menu) / phần chân (liên hệ, bản quyền)'],
            ['nav', 'Nhóm liên kết điều hướng chính'],
            ['main', 'Nội dung chính, mỗi trang đúng một'],
            ['section', 'Một nhóm nội dung có tiêu đề riêng'],
            ['article', 'Một đơn vị độc lập: bài viết, sản phẩm, bình luận'],
            ['aside', 'Nội dung phụ: bộ lọc, bài liên quan'],
            ['div / span', 'Không thẻ nào ở trên hợp — chỉ để gom cho CSS'],
          ],
        },
        {
          type: 'list',
          items: [
            'Truy cập: máy đọc màn hình cho người khiếm thị nhảy thẳng tới nav, main',
            'SEO: công cụ tìm kiếm biết đâu là nội dung chính của trang',
            'Bảo trì: đọc code thấy ngay vai trò từng vùng thay vì một rừng div',
            'Cùng tinh thần: img luôn có alt, h1→h6 theo cấp bậc đề mục chứ không theo cỡ chữ, table chỉ cho dữ liệu dạng bảng, không dùng để chia bố cục',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'section hay article?',
          text: 'Tự hỏi: cắt khối này đặt sang trang khác có còn nghĩa không? Còn → article (sản phẩm, bài viết, bình luận). Chỉ là một nhóm có tiêu đề của trang này → section. Không có vai trò gì, chỉ để gom cho CSS → div.',
        },
      ],
      followUps: [
        'section khác article và div thế nào?',
        'Vì sao thẻ img bắt buộc có alt?',
        'Có nên dùng table để chia bố cục trang không?',
      ],
      buoi: [17],
    },
    {
      id: 'pv-hc-03',
      level: 'Cơ bản',
      question: 'Phần tử block, inline và inline-block khác nhau thế nào? display: none khác visibility: hidden ra sao?',
      short: 'block chiếm trọn một hàng và nhận width/height; inline nằm xen trong dòng chữ, bỏ qua width/height; inline-block nằm trong dòng nhưng nhận kích thước. display: none gỡ phần tử khỏi bố cục, còn visibility: hidden chỉ làm vô hình, chỗ vẫn giữ.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Ba kiểu hiển thị cơ bản',
            columns: [
              { title: 'block', tone: 'plain', items: ['div, p, h1, section, ul', 'Xuống dòng trước và sau', 'Mặc định rộng hết hộp cha', 'Nhận width, height, margin bốn phía'] },
              { title: 'inline', tone: 'plain', items: ['span, a, strong, em', 'Nằm xen trong dòng chữ', 'Bỏ qua width, height', 'margin/padding dọc không đẩy dòng'] },
              { title: 'inline-block', tone: 'good', items: ['button, input', 'Nằm trong dòng như inline', 'Nhưng nhận width, height như block', 'Hợp cho nút, huy hiệu'] },
            ],
          },
        },
        {
          type: 'table',
          head: ['Cách ẩn', 'Còn chiếm chỗ', 'Bấm được', 'Máy đọc màn hình'],
          rows: [
            ['display: none', 'Không', 'Không', 'Bỏ qua'],
            ['visibility: hidden', 'Có — để lại khoảng trống', 'Không', 'Bỏ qua'],
            ['opacity: 0', 'Có', 'Có — vẫn nhận click', 'Vẫn đọc'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Khe hở bí ẩn dưới ảnh',
          text: 'img mặc định là inline nên đứng trên đường chân chữ, chừa vài px cho phần đuôi chữ như g, y. Sửa bằng display: block (hoặc vertical-align: middle). Mọi trường hợp display: none, phần tử vẫn nằm trong DOM — chỉ là không được vẽ.',
        },
      ],
      followUps: [
        'Vì sao đặt width cho thẻ a hoặc span không có tác dụng?',
        'Ẩn bằng display: none thì phần tử còn trong DOM không?',
      ],
      buoi: [17, 18],
    },
    {
      id: 'pv-hc-04',
      level: 'Cơ bản',
      question: 'id và class khác nhau thế nào? Khi viết CSS nên chọn cái nào?',
      short: 'id là định danh duy nhất trên trang, mỗi phần tử có tối đa một id; class dùng lại cho nhiều phần tử và một phần tử mang được nhiều class. Viết CSS nên dùng class; id dành cho liên kết neo, label for và JavaScript/Blazor tìm đúng một phần tử.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'id và class',
            columns: [
              { title: 'id', tone: 'plain', items: ['Duy nhất trên trang', 'Một phần tử một id', 'Selector #noi-bat — ưu tiên (1, 0, 0)', 'Dùng cho: href="#noi-bat", label for, tìm một phần tử'] },
              { title: 'class', tone: 'good', items: ['Dùng lại bao nhiêu lần cũng được', 'Một phần tử nhiều class: class="san-pham giam-gia"', 'Selector .san-pham — ưu tiên (0, 1, 0)', 'Dùng cho: mọi kiểu dáng CSS'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'html',
            title: 'Mỗi thứ đúng việc của nó',
            code: `<section id="noi-bat">
  <article class="san-pham">…</article>
  <article class="san-pham giam-gia">…</article>
</section>

<!-- id làm đích cho liên kết neo -->
<a href="#noi-bat">Xem sản phẩm nổi bật</a>

<!-- id để label trỏ vào ô nhập -->
<label for="email">Email</label>
<input id="email" name="email" type="email">`,
            note: 'Mọi thẻ sản phẩm cùng kiểu nên cùng class; thêm sản phẩm thứ tư chỉ cần chép thêm một article, CSS không phải sửa.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Trùng id không báo lỗi',
          text: 'Hai phần tử cùng id thì trình duyệt vẫn vẽ bình thường, nhưng neo #, label for và getElementById chỉ tìm thấy phần tử đầu tiên — lỗi rất khó thấy. Dùng id trong CSS còn làm độ ưu tiên tăng vọt, sau này muốn đè phải viết selector nặng hơn.',
        },
      ],
      followUps: [
        'Một phần tử mang nhiều class thì viết thế nào, selector .a.b chọn gì?',
        'Vì sao dùng id trong CSS khiến stylesheet khó bảo trì?',
      ],
      buoi: [17, 18],
    },
    {
      id: 'pv-hc-05',
      level: 'Cơ bản',
      question: 'Trong form, name, id và label dùng để làm gì? Validation phía client (required, type, pattern) có đủ không?',
      short: 'name là tên trường gửi về máy chủ; id để label for trỏ vào, bấm chữ là con trỏ nhảy vào ô. Validation của trình duyệt chỉ giúp người dùng đỡ nhập sai — không đủ, vì ai cũng bỏ qua được; máy chủ bắt buộc kiểm tra lại.',
      answer: [
        {
          type: 'code',
          sample: {
            lang: 'html',
            title: 'Form đăng ký với validation có sẵn của trình duyệt',
            code: `<form action="/dang-ky" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>

  <label for="sdt">Số điện thoại</label>
  <input id="sdt" name="sdt" type="tel"
         pattern="0[0-9]{9}" title="10 số, bắt đầu bằng 0">

  <button type="submit">Đăng ký</button>
</form>`,
            note: 'Bấm Đăng ký, trình duyệt gửi email=an%40mail.com&sdt=0901234567 — chỉ ô có name mới được gửi. Bên C#, name khớp với tên property của model nhận dữ liệu.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Hai lớp kiểm tra — lớp trình duyệt bỏ qua được, lớp máy chủ thì không',
            steps: [
              { kind: 'start', text: 'Bấm Đăng ký' },
              { kind: 'decision', text: 'Trình duyệt: required, type, pattern hợp lệ ?', branches: [
                { label: 'Sai', steps: [{ kind: 'io', text: 'Báo lỗi ngay tại ô, không gửi' }] },
                { label: 'Đúng', steps: [
                  { kind: 'process', text: 'Gửi POST name=value' },
                  { kind: 'decision', text: 'Máy chủ kiểm tra lại toàn bộ ?', branches: [
                    { label: 'Sai', steps: [{ kind: 'io', text: 'Trả 400 kèm thông báo lỗi' }] },
                    { label: 'Đúng', steps: [{ kind: 'io', text: 'Lưu dữ liệu' }] },
                  ] },
                ] },
              ] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Vì sao client validation không đủ',
          text: 'Người dùng xoá required bằng DevTools, gửi request thẳng bằng Postman hay curl không qua form, hoặc dùng trình duyệt không hỗ trợ. Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo vệ dữ liệu.',
        },
      ],
      followUps: [
        'Ô input thiếu name thì khi submit chuyện gì xảy ra?',
        'Vì sao các radio trong một nhóm phải cùng name?',
        'Bọc input bên trong label thay vì dùng for có được không?',
      ],
      buoi: [17],
    },
    {
      id: 'pv-hc-06',
      level: 'Cơ bản',
      question: 'Trong file .razor, ký hiệu @ dùng để làm gì?',
      short: '@ đánh dấu chỗ chuyển từ HTML sang C#: @bien in giá trị, @(biểu thức) cho biểu thức phức tạp, @foreach/@if để lặp và rẽ nhánh mà thân vẫn là HTML, @code { } chứa field và phương thức. Kết quả cuối cùng vẫn là HTML thuần gửi tới trình duyệt.',
      answer: [
        {
          type: 'code',
          sample: {
            lang: 'razor',
            title: 'DanhSach.razor — HTML quen thuộc, chỉ thêm @',
            code: `@page "/danh-sach"

<p>Có <strong>@danhSach.Count</strong> sản phẩm</p>

<ul>
  @foreach (var sp in danhSach)
  {
    <li class="@(sp.Gia > 10_000_000 ? "dat" : "")">
      @sp.Ten — @sp.Gia.ToString("N0") đ
    </li>
  }
</ul>

@if (danhSach.Count == 0)
{
  <p>Chưa có sản phẩm nào.</p>
}

@code {
  record SanPham(string Ten, decimal Gia);

  List<SanPham> danhSach = new()
  {
    new("Tivi Samsung 55 inch", 12_000_000),
    new("Nồi cơm Sharp", 650_000),
  };
}`,
            note: '@foreach chạy hai lượt sinh hai thẻ li; trình duyệt nhận về HTML y như viết tay.',
          },
        },
        {
          type: 'table',
          head: ['Ký hiệu', 'Ý nghĩa', 'Ví dụ'],
          rows: [
            ['@bien', 'In giá trị ra HTML', '@sp.Ten · @DateTime.Now.Year'],
            ['@(biểu thức)', 'Biểu thức có toán tử, ba ngôi, hoặc dính liền chữ', '@(sp.Gia * 1.1m)'],
            ['@if / @foreach / @for', 'Rẽ nhánh, lặp — thân là HTML', '@foreach (var x in ds) { <li>@x</li> }'],
            ['@code { }', 'Khai báo field, property, phương thức', 'List<SanPham> danhSach'],
            ['@page "/url"', 'Trang mở ở đường dẫn nào', '@page "/bang-gia"'],
            ['@* … *@', 'Chú thích Razor, không gửi về trình duyệt', 'khác <!-- --> vẫn gửi'],
            ['@@', 'In ký tự @ thật', 'lienhe@@cybersoft.edu.vn'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'An toàn mặc định',
          text: '@sp.Ten được mã hoá HTML trước khi in: tên sản phẩm có chứa <script> sẽ hiện ra thành chữ chứ không chạy. Razor chống tấn công XSS mà bạn không phải làm gì thêm.',
        },
      ],
      followUps: [
        'Khi nào phải viết @( ) thay vì @ trơn?',
        'Chú thích @* *@ khác <!-- --> thế nào?',
      ],
      buoi: [19],
    },

    // ─────────────────────────── Trung bình ───────────────────────────
    {
      id: 'pv-hc-07',
      level: 'Trung bình',
      question: 'Box model là gì? Vì sao gần như dự án nào cũng đặt box-sizing: border-box?',
      short: 'Mỗi phần tử là một hộp bốn lớp từ trong ra: content, padding, border, margin. Mặc định (content-box) width chỉ tính phần content nên padding và border cộng thêm ra ngoài; border-box cho width gồm cả padding và border — đặt 300px là thấy đúng 300px.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'boxes',
            caption: 'Bốn lớp từ trong ra ngoài của một thẻ sản phẩm',
            items: [
              { label: 'content', value: 'chữ, ảnh', note: 'phần width/height chỉ tới khi content-box' },
              { label: 'padding', value: '16px', note: 'đệm trong, cùng màu nền hộp' },
              { label: 'border', value: '2px', note: 'viền' },
              { label: 'margin', value: '12px', note: 'khoảng trống ngoài, trong suốt' },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Cùng width: 300px; padding: 16px; border: 2px',
            columns: [
              { title: 'content-box (mặc định)', tone: 'bad', items: ['width chỉ là content', 'Nhìn thấy 300 + 16×2 + 2×2 = 336px', 'Đặt 300 mà ra 336, phải cộng nhẩm'] },
              { title: 'border-box (nên dùng)', tone: 'good', items: ['width gồm content + padding + border', 'Nhìn thấy đúng 300px', 'Content tự co còn 264px'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'Dòng đầu tiên của mọi file CSS',
            code: `*, *::before, *::after {
  box-sizing: border-box;
}

.san-pham {
  width: 300px;
  padding: 16px;
  border: 2px solid #e5e7eb;
  margin: 12px;
}`,
            note: 'Với border-box, thêm padding cho thẻ không làm vỡ lưới; width: 100% kèm padding cũng không tràn hộp cha.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'margin không bao giờ nằm trong width',
          text: 'Kể cả border-box, margin vẫn cộng thêm bên ngoài. Hai thẻ 300px có margin 12px đứng cạnh nhau chiếm 12 + 300 + 12 + 12 + 300 + 12 = 648px theo chiều ngang (margin ngang không gộp).',
        },
      ],
      followUps: [
        'width: 100% kèm padding: 20px với content-box thì chuyện gì xảy ra?',
        'padding: 10px 20px 5px nghĩa là gì?',
      ],
      buoi: [18],
    },
    {
      id: 'pv-hc-08',
      level: 'Trung bình',
      question: 'Hai quy tắc CSS cùng trỏ một phần tử thì quy tắc nào thắng? Specificity tính thế nào?',
      short: 'Xét lần lượt: !important, rồi inline style, rồi specificity đếm theo bộ ba (id, class/attribute/pseudo-class, thẻ) so từ trái sang phải; bằng nhau thì quy tắc viết sau thắng. Thuộc tính không quy tắc nào đặt thì có thể được kế thừa từ cha (chủ yếu thuộc tính về chữ).',
      answer: [
        {
          type: 'table',
          head: ['Selector', '(id, class, thẻ)', 'Ghi chú'],
          rows: [
            ['p', '(0, 0, 1)', ''],
            ['.gia', '(0, 1, 0)', ''],
            ['input[type="email"]', '(0, 1, 1)', '[thuộc tính] tính như class'],
            ['nav a:hover', '(0, 1, 2)', ':hover tính như class'],
            ['#tv01 .gia', '(1, 1, 0)', ''],
            ['*, >, +, khoảng trắng', 'không cộng', 'Bộ kết hợp không có điểm'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Cùng trỏ vào một h3 bên trong article.san-pham#tv01 — ai thắng?',
            columns: [
              { title: 'h3', tone: 'plain', items: ['(0, 0, 1)'] },
              { title: '.san-pham h3', tone: 'plain', items: ['(0, 1, 1)'] },
              { title: '#tv01 h3', tone: 'good', items: ['(1, 0, 1) — thắng'] },
              { title: 'style="…"', tone: 'bad', items: ['Inline đè tất cả', 'Chỉ thua !important'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'Đoán màu giá tiền',
            code: `/* HTML: <article class="san-pham"><p class="gia">12.000.000 đ</p></article> */

.san-pham .gia { color: green; }  /* (0, 2, 0) */
article p.gia  { color: blue; }   /* (0, 1, 2) */
.gia           { color: red; }    /* (0, 1, 0) — viết sau nhưng yếu hơn */

/* Kết quả: xanh lá. Cột class 2 > 1 là xong, không cần xét cột thẻ */`,
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Không phải số thập phân',
          text: '(0, 1, 0) không phải 10: mười một class (0, 11, 0) vẫn thua một id (1, 0, 0). Đừng dùng !important để thắng — lần sau muốn đè lại phải thêm một !important nữa. Viết selector cụ thể hơn một chút hoặc đặt quy tắc xuống dưới.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Kế thừa',
          text: 'color, font-family, font-size, line-height tự truyền từ cha xuống con; margin, padding, border, width, background thì không. Giá trị kế thừa luôn thua bất kỳ quy tắc nào trỏ thẳng vào phần tử, dù selector chỉ là tên thẻ.',
        },
      ],
      followUps: [
        'Đặt color ở body mà thẻ a không đổi màu, vì sao?',
        'Quy tắc nằm trong @media có độ ưu tiên cao hơn quy tắc bên ngoài không?',
      ],
      buoi: [18],
    },
    {
      id: 'pv-hc-09',
      level: 'Trung bình',
      question: 'Các giá trị của position khác nhau thế nào? position: absolute căn theo cái gì?',
      short: 'static theo luồng bình thường; relative giữ chỗ trong luồng nhưng dịch được bằng top/left; absolute rút khỏi luồng và căn theo tổ tiên gần nhất có position khác static (không có thì theo khung trang ban đầu); fixed căn theo cửa sổ; sticky đi theo luồng tới ngưỡng top rồi dính lại.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'position quyết định hộp đặt ở đâu so với luồng bình thường',
            columns: [
              { title: 'static (mặc định)', tone: 'plain', items: ['Theo luồng', 'top/left, z-index không tác dụng'] },
              { title: 'relative', tone: 'plain', items: ['Theo luồng rồi dịch đi', 'Chỗ cũ vẫn giữ', 'Làm mốc cho con absolute'] },
              { title: 'absolute', tone: 'plain', items: ['Rút khỏi luồng, không giữ chỗ', 'Căn theo tổ tiên có position ≠ static', 'Nhãn "Giảm 10%" góc thẻ'] },
              { title: 'fixed / sticky', tone: 'plain', items: ['fixed: dính theo cửa sổ', 'sticky: theo luồng tới ngưỡng top rồi dính', 'Header nổi khi cuộn'] },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'tree',
            caption: 'span.nhan đi ngược lên cây, gặp tổ tiên đầu tiên có position ≠ static thì lấy làm mốc',
            root: {
              label: 'body', note: 'static',
              children: [
                {
                  label: 'main', note: 'static — bỏ qua',
                  children: [
                    {
                      label: 'article.san-pham', note: 'position: relative ← mốc', highlight: true,
                      children: [
                        { label: 'img' },
                        { label: 'span.nhan', note: 'absolute; top: 12px; right: 12px' },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'Nhãn dán góc thẻ và header dính',
            code: `.san-pham {
  position: relative;      /* làm mốc, bản thân không dịch đi đâu */
}

.san-pham .nhan {
  position: absolute;
  top: 12px;
  right: 12px;
}

header {
  position: sticky;
  top: 0;                  /* thiếu top thì sticky không dính */
  z-index: 10;             /* nổi trên nội dung cuộn qua */
  background: #fff;
}`,
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Hai lỗi kinh điển',
          text: 'Quên position: relative ở thẻ cha → nhãn bay lên góc trang. Đặt z-index cho phần tử position: static → không có tác dụng (trừ khi nó là con của flex/grid); muốn nổi lên phải đặt position trước.',
        },
      ],
      followUps: [
        'sticky không dính — bạn kiểm tra những gì?',
        'z-index: 9999 mà vẫn bị phần tử khác che, vì sao?',
      ],
      buoi: [18],
    },
    {
      id: 'pv-hc-10',
      level: 'Trung bình',
      question: 'Căn giữa một khối theo cả chiều ngang lẫn chiều dọc bằng những cách nào?',
      short: 'Gọn nhất: hộp cha display: flex; justify-content: center; align-items: center (hoặc display: grid; place-items: center). Hộp cha phải có chiều cao, thường là min-height: 100vh. Chỉ cần căn ngang một khối có bề rộng thì margin: 0 auto.',
      answer: [
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'Bốn cách, dùng đúng hoàn cảnh',
            code: `/* 1. Flexbox — phổ biến nhất */
.trang-dang-nhap {
  min-height: 100vh;
  display: flex;
  justify-content: center;   /* trục chính: ngang */
  align-items: center;       /* trục phụ: dọc */
}

/* 2. Grid — ngắn nhất */
.trang-dang-nhap {
  min-height: 100vh;
  display: grid;
  place-items: center;
}

/* 3. absolute + transform — khi khối nằm đè lên nội dung khác */
.hop-thoai {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 4. Chỉ căn ngang một khối có bề rộng */
.container {
  max-width: 1200px;
  margin: 0 auto;
}`,
            note: 'Cách 3: top/left 50% đưa góc trên trái của hộp vào tâm; translate(-50%, -50%) kéo lùi đúng nửa kích thước của chính hộp.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Chọn cách nào',
            columns: [
              { title: 'Flex / Grid', tone: 'good', items: ['Cả hai chiều', 'Không cần biết kích thước con', 'Mặc định nên dùng'] },
              { title: 'absolute + transform', tone: 'plain', items: ['Cả hai chiều', 'Rút khỏi luồng', 'Hộp thoại, lớp phủ'] },
              { title: 'margin: 0 auto', tone: 'plain', items: ['Chỉ chiều ngang', 'Khối phải có width/max-width', 'Container của trang'] },
              { title: 'text-align: center', tone: 'bad', items: ['Chỉ căn chữ, phần tử inline bên trong', 'Không căn được một khối div'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Căn dọc "không ăn"',
          text: 'Hộp cha cao bằng nội dung thì không còn chỗ trống để căn. Đặt min-height: 100vh — dùng min-height chứ không phải height, để nội dung dài hơn màn hình vẫn cuộn được, không bị cắt.',
        },
      ],
      followUps: [
        'Vì sao top: 50%; left: 50% chưa đủ mà phải thêm transform?',
        'margin: auto có căn giữa theo chiều dọc được không?',
      ],
      buoi: [18],
    },
    {
      id: 'pv-hc-11',
      level: 'Trung bình',
      question: 'px, rem, em và % khác nhau thế nào? Khi nào dùng cái nào?',
      short: 'px cố định; rem là bội của cỡ chữ thẻ gốc html (mặc định 16px); em là bội cỡ chữ của chính phần tử (riêng thuộc tính font-size thì theo cha) nên lồng nhau sẽ nhân dồn; % tính theo hộp cha. Thường dùng rem cho chữ và khoảng cách, px cho viền, % hoặc fr cho bề rộng cột.',
      answer: [
        {
          type: 'table',
          head: ['Đơn vị', 'Tính theo', 'Dùng cho'],
          rows: [
            ['px', 'Cố định', 'Viền, bo góc, bóng'],
            ['rem', 'font-size của thẻ html', 'Cỡ chữ, padding, margin'],
            ['em', 'font-size của phần tử hiện tại', 'Đệm tỉ lệ với chữ bên trong (nút)'],
            ['%', 'Hộp cha', 'Bề rộng cột, ảnh'],
            ['vw / vh', 'Bề rộng / cao cửa sổ', 'Khung toàn màn hình: min-height: 100vh'],
          ],
        },
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'em nhân dồn, rem thì không',
            code: `html { font-size: 16px; }

.menu { font-size: 1.2em; }
/* .menu ngoài:            16 × 1.2   = 19.2px
   .menu lồng bên trong:   19.2 × 1.2 = 23.04px — em nhân dồn theo cha */

.the { font-size: 1.2rem; }
/* luôn 19.2px dù lồng bao nhiêu tầng */

.nut {
  font-size: 0.875rem;     /* 14px */
  padding: 0.5em 1em;      /* 7px 14px — tự to lên khi chữ của nút to lên */
  border: 1px solid;       /* viền mảnh, px là hợp */
}`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'boxes',
            caption: 'Giá trị tính ra (gốc 16px, hộp cha rộng 600px)',
            items: [
              { label: '1.5rem', value: '24px', note: 'ở đâu cũng vậy' },
              { label: '1.5em, chữ phần tử 20px', value: '30px', note: 'theo phần tử' },
              { label: 'width: 50%', value: '300px', note: 'theo bề rộng cha' },
              { label: 'padding: 10%', value: '60px mọi phía', note: '% của padding/margin luôn theo bề rộng cha, kể cả trên dưới' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'rem tốt cho người dùng',
          text: 'Người dùng tăng cỡ chữ mặc định của trình duyệt lên 20px thì mọi thứ viết bằng rem to theo; viết bằng px thì đứng yên. Đó là lý do cỡ chữ nên dùng rem.',
        },
      ],
      followUps: [
        'em trong font-size khác em trong padding thế nào?',
        'padding-top: 10% tính theo chiều cao hay bề rộng của cha?',
      ],
      buoi: [18],
    },
    {
      id: 'pv-hc-12',
      level: 'Trung bình',
      question: 'Mobile-first là gì? Viết media query thế nào và vì sao phải có meta viewport?',
      short: 'Mobile-first là viết CSS mặc định cho điện thoại, rồi dùng @media (min-width: …) thêm dần cho tablet và desktop; mỗi mốc chỉ ghi đè cái khác đi. Thiếu meta viewport, điện thoại giả vờ rộng khoảng 980px và thu nhỏ cả trang, media query không còn đúng.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Mỗi mốc chỉ viết thêm cái khác đi, cái cũ vẫn giữ',
            items: [
              { label: '0–767px', text: 'Mặc định: 1 cột, menu dọc, bộ lọc ẩn' },
              { label: '≥ 768px', text: '@media (min-width: 768px): 2 cột, menu ngang' },
              { label: '≥ 1024px', text: '@media (min-width: 1024px): bộ lọc hiện, 3 cột, tối đa 1200px căn giữa' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'Ba mốc màn hình theo mobile-first',
            code: `/* Mặc định: điện thoại */
.danh-sach { display: grid; grid-template-columns: 1fr; gap: 12px; }
aside { display: none; }

/* Tablet */
@media (min-width: 768px) {
  .danh-sach { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
  aside { display: block; }
  .danh-sach { grid-template-columns: repeat(3, 1fr); }
}`,
            note: 'Mốc lớn phải viết sau mốc nhỏ: specificity bằng nhau nên quy tắc sau thắng. Đảo thứ tự là khối 768 đè ngược khối 1024.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Hai hướng viết responsive',
            columns: [
              { title: 'Mobile-first', tone: 'good', items: ['Mặc định là bố cục đơn giản nhất', '@media (min-width) thêm dần', 'Ít quy tắc phải huỷ'] },
              { title: 'Desktop-first', tone: 'plain', items: ['Mặc định là bố cục nhiều cột', '@media (max-width) gỡ dần', 'Phải huỷ sidebar, cột, khoảng cách lớn'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Thiếu meta viewport thì media query vô dụng',
          text: 'Không có <meta name="viewport" content="width=device-width, initial-scale=1"> điện thoại coi trang rộng khoảng 980px rồi thu nhỏ, nên (min-width: 768px) luôn đúng và chữ bé tí. Đây là lỗi số một khi "trên điện thoại trông như desktop thu nhỏ".',
        },
      ],
      followUps: [
        'Nên chọn mốc theo thiết bị cụ thể hay theo nội dung?',
        'min-width và max-width trong media query khác nhau thế nào?',
      ],
      buoi: [19],
    },
    {
      id: 'pv-hc-13',
      level: 'Trung bình',
      question: 'Hệ lưới 12 cột của Bootstrap hoạt động thế nào? Đọc giúp class "col-12 col-md-6 col-lg-4".',
      short: 'Mỗi .row chia 12 phần, mỗi .col-* chiếm bao nhiêu phần; hậu tố sm/md/lg/xl/xxl nghĩa là "từ mốc đó trở lên" — mobile-first viết bằng class. col-12 col-md-6 col-lg-4: điện thoại 1 thẻ một hàng, từ 768px 2 thẻ, từ 992px 3 thẻ.',
      answer: [
        {
          type: 'text',
          text: 'Cấu trúc luôn ba tầng: container (giới hạn bề rộng, căn giữa) → row (một hàng dựng bằng Flexbox, cho phép xuống hàng) → col (cột). Tổng số phần trong một row vượt 12 thì các cột thừa tự xuống hàng mới.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'strip',
            caption: 'Từ lg trở lên: col-lg-4 chiếm 4/12 nên 3 thẻ vừa một hàng',
            name: '.row (12 phần)',
            items: ['col-lg-4 (1–4)', 'col-lg-4 (5–8)', 'col-lg-4 (9–12)'],
          },
        },
        {
          type: 'table',
          head: ['Mốc', 'Bề rộng', 'col-12 col-md-6 col-lg-4'],
          rows: [
            ['(không hậu tố)', '< 576px', 'col-12 → 12/12 → 1 thẻ'],
            ['sm', '≥ 576px', 'vẫn col-12 → 1 thẻ'],
            ['md', '≥ 768px', 'col-md-6 → 6/12 → 2 thẻ'],
            ['lg', '≥ 992px', 'col-lg-4 → 4/12 → 3 thẻ'],
            ['xl / xxl', '≥ 1200 / 1400px', 'vẫn col-lg-4 → 3 thẻ'],
          ],
        },
        {
          type: 'code',
          sample: {
            lang: 'html',
            title: 'Lưới thẻ sản phẩm chỉ bằng class',
            code: `<div class="container">
  <div class="row g-3">
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100">…</div>
    </div>
    <!-- lặp lại col cho các sản phẩm khác -->
  </div>
</div>`,
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Class chỉ là CSS bạn đã biết',
          text: 'd-flex = display: flex, mt-auto = margin-top: auto, h-100 = height: 100%, g-3 = khoảng cách giữa các cột. Hiểu Flexbox và media query thì đọc tên class là đoán được CSS phía sau.',
        },
      ],
      followUps: [
        'Tổng các col trong một row vượt 12 thì sao?',
        'Khi nào nên tự viết CSS thay vì dùng Bootstrap?',
      ],
      buoi: [19],
    },

    // ──────────────────────────── Nâng cao ────────────────────────────
    {
      id: 'pv-hc-14',
      level: 'Nâng cao',
      question: 'Margin collapse (margin gộp) là gì? Khi nào xảy ra và cách tránh?',
      short: 'Margin dọc của các hộp khối chạm nhau trong luồng bình thường không cộng lại mà gộp thành margin lớn hơn: 20px và 12px ra khoảng cách 20px. Nó cũng xảy ra giữa cha và con đầu/cuối khi cha không có border, padding. Margin ngang và con của flex/grid không bao giờ gộp.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Hộp A margin-bottom: 20px, hộp B ngay dưới margin-top: 12px',
            columns: [
              { title: 'Tưởng là', tone: 'bad', items: ['20 + 12', 'Khoảng cách 32px'] },
              { title: 'Thực tế', tone: 'good', items: ['Hai margin dọc chạm nhau → lấy cái lớn hơn', 'Khoảng cách 20px'] },
            ],
          },
        },
        {
          type: 'table',
          head: ['Trường hợp', 'Có gộp?'],
          rows: [
            ['Hai khối anh em xếp dọc', 'Có — lấy giá trị lớn hơn'],
            ['Cha và con đầu tiên, cha không border/padding', 'Có — margin-top của con "lọt" ra ngoài cha'],
            ['Một âm một dương', 'Cộng lại: 20px và −8px ra 12px'],
            ['Margin trái/phải', 'Không'],
            ['Con của display: flex / grid', 'Không'],
            ['float, position: absolute, inline-block', 'Không'],
          ],
        },
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'Lỗi cha–con và ba cách sửa',
            code: `/* Lỗi: muốn h2 cách mép trên thẻ 24px,
   nhưng khoảng trống lại nằm NGOÀI .the và đẩy cả thẻ xuống */
.the    { background: #fff; }
.the h2 { margin-top: 24px; }

/* Cách 1: cho cha padding (hoặc border) để ngăn hai margin chạm nhau */
.the { padding: 16px; }

/* Cách 2: tạo ngữ cảnh định dạng khối mới */
.the { display: flow-root; }

/* Cách 3: giao khoảng cách cho gap, bỏ margin dọc ở con */
.the { display: flex; flex-direction: column; gap: 12px; }
.the > * { margin: 0; }`,
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Quy ước một chiều',
          text: 'Chỉ đặt margin-bottom (hoặc chỉ margin-top) cho các khối xếp dọc, hoặc để hộp cha lo khoảng cách bằng gap. Khi không còn hai margin chạm nhau thì cũng không còn gì để gộp.',
        },
      ],
      followUps: [
        'Vì sao margin-top của h1 đầu tiên lại đẩy cả nền body xuống?',
        'display: flow-root làm gì?',
      ],
      buoi: [18],
    },
    {
      id: 'pv-hc-15',
      level: 'Nâng cao',
      question: 'Flexbox và Grid khác nhau thế nào? Khi nào dùng cái nào?',
      short: 'Flexbox xếp theo một chiều (hàng hoặc cột), kích thước do nội dung quyết định — hợp cho menu, hàng nút, căn giữa, bên trong một thẻ. Grid chia hàng và cột cùng lúc, hộp cha vẽ khung rồi đặt con vào ô — hợp cho khung trang và lưới thẻ thẳng cột. Thực tế dùng cả hai lồng nhau.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Một chiều hay hai chiều',
            columns: [
              { title: 'Flexbox', tone: 'plain', items: ['Một chiều: row hoặc column', 'Nội dung quyết định kích thước', 'Hàng cuối thiếu thẻ thì thẻ giãn hoặc lệch cột', 'Menu, header, căn giữa, nút sát đáy thẻ'] },
              { title: 'Grid', tone: 'good', items: ['Hai chiều: hàng và cột cùng lúc', 'Cha vẽ khung, con đặt vào ô', 'Cột luôn thẳng hàng giữa các hàng', 'Khung trang, lưới sản phẩm, dashboard'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'Grid lo bên ngoài, Flexbox lo bên trong',
            code: `/* Grid: lưới thẻ tự co số cột, không cần media query */
.danh-sach {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

/* Flexbox: bên trong mỗi thẻ, xếp dọc và đẩy nút xuống đáy */
.san-pham {
  display: flex;
  flex-direction: column;
}
.san-pham button { margin-top: auto; }`,
            note: 'auto-fill: nhét được bao nhiêu cột rộng tối thiểu 260px thì nhét; 1fr chia đều phần dư. Khung 1280px ra 4 cột (4×260 + 3×16 = 1088), 820px ra 3 cột, điện thoại 1 cột.',
          },
        },
        {
          type: 'table',
          head: ['Tình huống', 'Dùng', 'Vì sao'],
          rows: [
            ['Menu ngang, hàng nút, căn giữa một khối', 'Flexbox', 'Một chiều, nội dung quyết định kích thước'],
            ['Lưới thẻ tự co số cột', 'Grid auto-fill', 'Một dòng CSS, cột thẳng hàng'],
            ['Khung trang có header, sidebar, footer', 'Grid template-areas', 'Hai chiều, vùng đặt tên đọc được'],
            ['Bên trong một thẻ sản phẩm', 'Flexbox column', 'Đẩy nút xuống đáy bằng margin-top: auto'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Câu trả lời ăn điểm',
          text: 'Đừng nói "Grid thay Flexbox". Hãy nói: Grid quyết định thẻ nằm ô nào, Flexbox quyết định các thứ bên trong thẻ nằm đâu — hai công cụ bổ sung cho nhau, và Bootstrap row cũng chính là Flexbox.',
        },
      ],
      followUps: [
        'auto-fill khác auto-fit thế nào?',
        'Làm lưới thẻ bằng Flexbox flex-wrap gặp vấn đề gì ở hàng cuối?',
      ],
      buoi: [18, 19],
    },
    {
      id: 'pv-hc-16',
      level: 'Nâng cao',
      question: 'Trục chính, trục phụ trong Flexbox là gì? flex: 1 nghĩa là gì, và làm sao để nút "Thêm vào giỏ" của mọi thẻ nằm cùng một đường đáy?',
      short: 'Trục chính theo flex-direction (row là ngang, column là dọc); justify-content căn theo trục chính, align-items theo trục phụ — đổi direction là hai thuộc tính đổi vai. flex: 1 là viết tắt của flex-grow: 1, flex-shrink: 1, flex-basis: 0%, tức chia đều chỗ trống. Nút sát đáy: thẻ là flex column, nút đặt margin-top: auto.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Đổi flex-direction là đổi vai hai thuộc tính căn',
            columns: [
              { title: 'flex-direction: row', tone: 'plain', items: ['Trục chính: ngang →', 'justify-content: căn ngang', 'align-items: căn dọc'] },
              { title: 'flex-direction: column', tone: 'plain', items: ['Trục chính: dọc ↓', 'justify-content: căn dọc', 'align-items: căn ngang'] },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'boxes',
            caption: 'Thuộc tính rút gọn flex: grow · shrink · basis',
            items: [
              { label: 'flex: 1', value: '1 1 0%', note: 'chia đều toàn bộ chỗ trống' },
              { label: 'flex: auto', value: '1 1 auto', note: 'giữ kích thước nội dung, chia phần dư' },
              { label: 'flex: 0 0 300px', value: 'không giãn, không co', note: 'cố định 300px' },
              { label: 'flex: none', value: '0 0 auto', note: 'đúng kích thước nội dung' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'Hai tầng Flexbox: hàng thẻ và bên trong từng thẻ',
            code: `/* Hàng thẻ: các thẻ cùng hàng cao bằng nhau nhờ align-items: stretch (mặc định) */
.danh-sach {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

/* Mỗi thẻ lại là một flex container theo cột */
.san-pham {
  flex: 0 0 280px;
  display: flex;
  flex-direction: column;
}

/* margin-top: auto nuốt hết chỗ trống phía trên → nút dính đáy */
.san-pham .nut-mua {
  margin-top: auto;
}

/* Cùng mẹo theo chiều ngang: đẩy nút Đăng nhập sang hết bên phải header */
header .dang-nhap { margin-left: auto; }`,
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Con flex không chịu co',
          text: 'Mặc định con của flex có min-width: auto — không co nhỏ hơn nội dung. Một chuỗi dài không có khoảng trắng hoặc một bảng rộng sẽ làm tràn khung dù đã đặt flex: 1. Thêm min-width: 0 cho con đó.',
        },
      ],
      followUps: [
        'flex: 1 khác width: 100% thế nào?',
        'align-items: stretch không có tác dụng trong trường hợp nào?',
      ],
      buoi: [18],
    },
    {
      id: 'pv-hc-17',
      level: 'Nâng cao',
      question: 'Thiết kế khung trang quản trị: header, sidebar, nội dung, footer; điện thoại xếp một cột, từ 768px sidebar sang trái. Bạn làm thế nào mà không đổi HTML?',
      short: 'Dùng CSS Grid với grid-template-areas: mỗi vùng gắn grid-area theo tên; mặc định (mobile-first) bản vẽ một cột, trong @media (min-width: 768px) chỉ đổi bản vẽ areas và grid-template-columns. HTML giữ nguyên các thẻ ngữ nghĩa header, aside, main, footer.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Hai bản vẽ areas cho cùng một HTML',
            columns: [
              { title: 'Điện thoại (mặc định)', tone: 'plain', items: ['"header"', '"aside"', '"main"', '"footer"', 'columns: 1fr'] },
              { title: '≥ 768px', tone: 'good', items: ['"header header"', '"aside  main"', '"footer footer"', 'columns: 240px 1fr'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'Khung trang mobile-first bằng grid-template-areas',
            code: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr auto;
  grid-template-areas:
    "header"
    "aside"
    "main"
    "footer";
}

header { grid-area: header; }
aside  { grid-area: aside; }
main   { grid-area: main; }
footer { grid-area: footer; }

@media (min-width: 768px) {
  body {
    grid-template-columns: 240px 1fr;
    grid-template-rows: 64px 1fr 48px;
    grid-template-areas:
      "header header"
      "aside  main"
      "footer footer";
  }
}`,
            note: 'Hàng giữa 1fr cùng min-height: 100vh giữ footer luôn ở đáy dù nội dung ngắn. Đổi bố cục sau này chỉ sửa mấy dòng chữ trong grid-template-areas.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Thứ tự nhìn thấy khác thứ tự HTML',
          text: 'Grid (và order của Flexbox) chỉ đổi vị trí hiển thị; phím Tab và máy đọc màn hình vẫn đi theo thứ tự trong HTML. Sắp thứ tự HTML hợp lý trước, CSS chỉ lo vị trí.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Muốn ẩn hẳn sidebar trên điện thoại',
          text: 'Bỏ "aside" khỏi bản vẽ mặc định, rút grid-template-rows còn auto 1fr auto và đặt aside { display: none }; trong media query bật lại display: block. Phần tử display: none không chiếm ô nào trong lưới.',
        },
      ],
      followUps: [
        'Vì sao không chia khung trang bằng table hoặc float như ngày trước?',
        'Lưới có vùng trong grid-template-areas mà không phần tử nào gắn vào thì sao?',
      ],
      buoi: [19, 17],
    },
  ],
}

export default htmlcss
