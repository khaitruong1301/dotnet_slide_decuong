import type { Buoi } from './types'

const buoi18: Buoi = {
  id: 18,
  slug: 'css3-selector-box-model-flexbox',
  title: 'CSS3 — Selector, Box model & Flexbox',
  subtitle: 'Mỗi phần tử là một cái hộp; CSS chọn hộp nào và chỉnh hộp đó ra sao',
  duration: '3 giờ',
  keywords: ['CSS3', 'selector', 'specificity', 'box model', 'flexbox', 'unit', 'pseudo-class'],
  goals: [
    'Nối CSS vào HTML đúng cách và chọn đúng phần tử bằng selector',
    'Tính được selector nào thắng khi hai quy tắc cùng trỏ một phần tử',
    'Vẽ và chỉnh được bốn lớp của box model: content, padding, border, margin',
    'Dùng Flexbox xếp các thẻ sản phẩm thành hàng, căn giữa, giãn đều',
  ],

  sections: [
    {
      id: 'noi-css',
      title: '1. Ba cách nối CSS và cú pháp quy tắc',
      blocks: [
        {
          type: 'text',
          text: 'Một quy tắc CSS gồm selector chọn phần tử và khối khai báo gồm các cặp thuộc tính: giá trị. Có ba chỗ đặt CSS, nhưng dự án thật chỉ dùng file riêng.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'boxes',
            caption: 'Giải phẫu một quy tắc CSS',
            items: [
              { label: 'selector', value: '.san-pham h3', note: 'chọn h3 nằm trong .san-pham' },
              { label: 'thuộc tính', value: 'color', note: 'cái gì' },
              { label: 'giá trị', value: '#e11d48', note: 'ra sao' },
              { label: 'khai báo', value: 'color: #e11d48;', note: 'cặp thuộc tính: giá trị, kết thúc bằng ;' },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Ba cách nối CSS — dự án dùng cách đầu',
            columns: [
              { title: 'File riêng (external)', tone: 'good', items: ['<link rel="stylesheet" href="style.css"> trong head', 'Dùng chung cho mọi trang', 'Trình duyệt cache được'] },
              { title: 'Trong head (internal)', tone: 'plain', items: ['<style> … </style>', 'Chỉ trang đó dùng', 'Hợp cho demo nhanh'] },
              { title: 'Inline', tone: 'bad', items: ['<p style="color:red">', 'Trộn hình thức vào cấu trúc', 'Khó sửa, độ ưu tiên cao gây rối'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'style.css — khởi đầu của mọi dự án',
            code: `/* Reset nhẹ: mọi hộp tính kích thước theo border-box */
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #1f2937;
  background: #f9fafb;
}

h1 {
  font-size: 2rem;        /* 2 × cỡ chữ gốc = 32px */
  color: #6d28d9;
}

.gia {
  color: #e11d48;
  font-weight: 700;
}`,
            note: 'Luôn mở đầu bằng box-sizing: border-box để width bạn đặt là bề rộng nhìn thấy, không bị padding và border cộng thêm. Lý do ở mục 3.',
          },
        },
      ],
    },
    {
      id: 'selector',
      title: '2. Selector — chọn đúng phần tử',
      blocks: [
        {
          type: 'table',
          head: ['Selector', 'Chọn gì', 'Ví dụ'],
          rows: [
            ['p', 'Mọi thẻ p', 'p { margin: 0 }'],
            ['.san-pham', 'Mọi phần tử có class', '.san-pham { border: 1px solid #ddd }'],
            ['#noi-bat', 'Phần tử có id (duy nhất)', '#noi-bat { background: #fff }'],
            ['.san-pham h3', 'h3 nằm đâu đó bên trong .san-pham', 'con cháu'],
            ['.san-pham > img', 'img là con trực tiếp của .san-pham', 'con ruột'],
            ['h2 + p', 'p đứng ngay sau h2', 'anh em kề'],
            ['a:hover', 'Khi rê chuột lên a', 'pseudo-class'],
            ['li:first-child, li:nth-child(2n)', 'li đầu tiên, li chẵn', 'theo vị trí'],
            ['input[type="email"]', 'input có thuộc tính type=email', 'attribute'],
            ['p::first-line, .gia::before', 'Phần của phần tử / nội dung chèn thêm', 'pseudo-element'],
            ['h1, h2, h3', 'Gom nhiều selector', 'dấu phẩy'],
          ],
        },
        {
          type: 'text',
          text: 'Khi hai quy tắc cùng trỏ một phần tử và cùng đặt một thuộc tính, trình duyệt so độ ưu tiên (specificity). Đếm theo ba cột: số id, số class/attribute/pseudo-class, số thẻ. So từ trái sang phải; bằng nhau thì quy tắc viết sau thắng.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Cùng trỏ vào một h3 bên trong article.san-pham#tv01 — ai thắng?',
            columns: [
              { title: 'h3', tone: 'plain', items: ['id 0 · class 0 · thẻ 1', '(0, 0, 1)'] },
              { title: '.san-pham h3', tone: 'plain', items: ['id 0 · class 1 · thẻ 1', '(0, 1, 1)'] },
              { title: '#tv01 h3', tone: 'good', items: ['id 1 · class 0 · thẻ 1', '(1, 0, 1) — thắng'] },
              { title: 'style="…"', tone: 'bad', items: ['Inline đè tất cả', 'Chỉ thua !important'] },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Trình duyệt quyết định giá trị cuối cùng của một thuộc tính',
            steps: [
              { kind: 'start', text: 'Gom mọi quy tắc trỏ tới phần tử' },
              { kind: 'decision', text: 'Có !important ?', branches: [
                { label: 'Có', steps: [{ kind: 'io', text: 'Quy tắc !important thắng' }] },
                { label: 'Không', steps: [
                  { kind: 'decision', text: 'Có inline style ?', branches: [
                    { label: 'Có', steps: [{ kind: 'io', text: 'Inline thắng' }] },
                    { label: 'Không', steps: [
                      { kind: 'process', text: 'So specificity (id, class, thẻ)' },
                      { kind: 'decision', text: 'Bằng nhau ?', branches: [
                        { label: 'Đúng', steps: [{ kind: 'io', text: 'Quy tắc viết sau thắng' }] },
                        { label: 'Sai', steps: [{ kind: 'io', text: 'Specificity cao hơn thắng' }] },
                      ] },
                    ] },
                  ] },
                ] },
              ] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Đừng dùng !important để thắng',
          text: 'Nó phá vỡ mọi phép so sánh, lần sau muốn đè lại phải thêm một !important nữa. Thay vào đó viết selector cụ thể hơn một chút, hoặc đặt quy tắc muốn thắng xuống dưới. Dấu hiệu CSS đang rối: phải dùng id trong CSS. Ưu tiên class.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Kế thừa',
          text: 'Thuộc tính về chữ (color, font-family, font-size, line-height) tự truyền từ cha xuống con: đặt ở body là cả trang có. Thuộc tính về hộp (margin, padding, border, width, background) không kế thừa, phải đặt từng phần tử.',
        },
      ],
    },
    {
      id: 'box-model',
      title: '3. Box model — mọi phần tử là một cái hộp',
      blocks: [
        {
          type: 'text',
          text: 'Trình duyệt vẽ mỗi phần tử thành bốn lớp lồng nhau từ trong ra: content là chữ hay ảnh, padding là đệm trong, border là viền, margin là khoảng cách tới hộp bên cạnh. Mọi bố cục đều quy về chỉnh bốn lớp này.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'boxes',
            caption: 'Bốn lớp từ trong ra ngoài của article.san-pham { width: 300px; padding: 16px; border: 2px solid; margin: 12px }',
            items: [
              { label: 'content', value: '300 × 180', note: 'ảnh, chữ bên trong' },
              { label: 'padding', value: '16px', note: 'đệm trong, cùng màu nền hộp' },
              { label: 'border', value: '2px solid #ddd', note: 'viền' },
              { label: 'margin', value: '12px', note: 'khoảng trống ngoài, trong suốt' },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Cùng width: 300px — bề rộng nhìn thấy khác nhau tuỳ box-sizing',
            columns: [
              { title: 'content-box (mặc định)', tone: 'bad', items: ['width chỉ là content', 'Nhìn thấy = 300 + 16×2 + 2×2 = 336px', 'Đặt 300 mà ra 336, cộng nhẩm mệt'] },
              { title: 'border-box (nên dùng)', tone: 'good', items: ['width là content + padding + border', 'Nhìn thấy = đúng 300px', 'Content tự co còn 264px'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'Thẻ sản phẩm — chỉnh bốn lớp',
            code: `.san-pham {
  width: 300px;
  padding: 16px;                 /* cả 4 phía */
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.san-pham img {
  display: block;                /* img là inline, chuyển sang block để bỏ khe hở dưới ảnh */
  width: 100%;                   /* theo bề rộng content của hộp cha */
  height: 180px;
  object-fit: cover;             /* cắt ảnh vừa khung, không méo */
  border-radius: 8px;
}

.san-pham h3 {
  margin: 12px 0 4px;            /* trên 12, trái phải 0, dưới 4 */
  font-size: 1.1rem;
}

.gia { margin: 0; }`,
            note: 'Cú pháp rút gọn: 1 giá trị = cả 4 phía; 2 giá trị = trên-dưới trái-phải; 3 giá trị = trên, trái-phải, dưới; 4 giá trị = theo chiều kim đồng hồ trên phải dưới trái.',
          },
        },
        {
          type: 'table',
          head: ['Đơn vị', 'Ý nghĩa', 'Dùng cho'],
          rows: [
            ['px', 'Điểm ảnh CSS, cố định', 'Viền, bo góc, bóng'],
            ['rem', 'Bội của cỡ chữ gốc html (16px)', 'Cỡ chữ, padding, margin — co giãn theo cài đặt người dùng'],
            ['em', 'Bội của cỡ chữ phần tử hiện tại', 'Khoảng cách tỉ lệ với chữ bên trong'],
            ['%', 'Phần trăm của hộp cha', 'Bề rộng cột, ảnh'],
            ['vw / vh', 'Phần trăm bề rộng / cao cửa sổ', 'Banner toàn màn hình'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Margin gộp (margin collapse)',
          text: 'Hai hộp khối xếp dọc, hộp trên margin-bottom 20px và hộp dưới margin-top 12px thì khoảng cách là 20, không phải 32 — margin dọc lấy cái lớn hơn. Margin ngang và margin trong Flexbox/Grid không gộp. Đây là lý do nhiều người thấy "khoảng cách không như mình đặt".',
        },
      ],
    },
    {
      id: 'display-position',
      title: '4. display và position',
      blocks: [
        {
          type: 'table',
          head: ['display', 'Hành vi', 'Phần tử mặc định'],
          rows: [
            ['block', 'Chiếm trọn hàng, nhận width/height', 'div, p, h1, section'],
            ['inline', 'Nằm trong dòng chữ, bỏ qua width/height, margin dọc', 'span, a, strong'],
            ['inline-block', 'Nằm trong dòng nhưng nhận width/height', 'button, input, img (gần giống)'],
            ['flex', 'Hộp cha xếp con theo hàng hoặc cột — mục 5', 'không có, phải đặt'],
            ['grid', 'Hộp cha chia lưới hai chiều — buổi 19', 'không có, phải đặt'],
            ['none', 'Biến mất, không chiếm chỗ', 'khác visibility: hidden vẫn chiếm chỗ'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'position quyết định hộp đặt ở đâu so với luồng bình thường',
            columns: [
              { title: 'static (mặc định)', tone: 'plain', items: ['Theo luồng', 'top/left không có tác dụng'] },
              { title: 'relative', tone: 'plain', items: ['Theo luồng, rồi dịch đi top/left', 'Chỗ cũ vẫn giữ', 'Làm mốc cho con absolute'] },
              { title: 'absolute', tone: 'plain', items: ['Rút khỏi luồng', 'Đặt theo tổ tiên gần nhất có position ≠ static', 'Nhãn "Giảm 10%" góc thẻ'] },
              { title: 'fixed / sticky', tone: 'plain', items: ['fixed: dính theo cửa sổ (header nổi)', 'sticky: theo luồng tới ngưỡng rồi dính'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'Nhãn khuyến mãi dán góc thẻ sản phẩm',
            code: `.san-pham {
  position: relative;            /* làm mốc cho nhãn */
}

.san-pham .nhan {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 10px;
  background: #e11d48;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 999px;
}

header {
  position: sticky;              /* cuộn tới đỉnh thì dính lại */
  top: 0;
  z-index: 10;                   /* nổi trên nội dung cuộn qua */
  background: #fff;
}`,
            note: 'Quên position: relative ở hộp cha là nhãn bay lên góc trang thay vì góc thẻ — lỗi phổ biến nhất của absolute.',
          },
        },
      ],
    },
    {
      id: 'flexbox',
      title: '5. Flexbox — xếp hàng theo một chiều',
      blocks: [
        {
          type: 'text',
          text: 'Đặt display: flex lên hộp cha, mọi con trực tiếp xếp thành một hàng (hoặc cột). Hộp cha quyết định hướng, cách căn, có xuống hàng không; mỗi con quyết định mình co giãn thế nào. Hầu hết bố cục thực tế — menu ngang, hàng thẻ sản phẩm, form một dòng, căn giữa — đều là Flexbox.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'strip',
            caption: 'nav { display: flex; gap: 24px } — các a xếp thành hàng, cách nhau 24px, không cần margin từng cái',
            name: 'nav (flex container)',
            items: ['a Trang chủ', 'a Sản phẩm', 'a Khuyến mãi', 'a Liên hệ'],
          },
        },
        {
          type: 'table',
          head: ['Thuộc tính (đặt ở cha)', 'Giá trị hay dùng', 'Tác dụng'],
          rows: [
            ['flex-direction', 'row (mặc định) · column', 'Xếp ngang hay dọc'],
            ['justify-content', 'flex-start · center · space-between · space-around · flex-end', 'Căn theo trục chính (ngang khi row)'],
            ['align-items', 'stretch (mặc định) · center · flex-start · flex-end', 'Căn theo trục phụ (dọc khi row)'],
            ['gap', '16px · 24px 12px', 'Khoảng cách giữa các con'],
            ['flex-wrap', 'nowrap (mặc định) · wrap', 'Hết chỗ có xuống hàng không'],
          ],
        },
        {
          type: 'table',
          head: ['Thuộc tính (đặt ở con)', 'Ví dụ', 'Tác dụng'],
          rows: [
            ['flex: 1', 'flex: 1', 'Chia đều chỗ trống còn lại'],
            ['flex: 0 0 300px', 'cố định 300px', 'Không co, không giãn'],
            ['align-self', 'center', 'Căn riêng một con khác với align-items'],
            ['order', '-1', 'Đổi thứ tự hiển thị mà không đổi HTML'],
            ['margin-left: auto', '', 'Đẩy con đó sang hết bên phải'],
          ],
        },
        {
          type: 'code',
          sample: {
            lang: 'css',
            title: 'Ba bố cục kinh điển bằng Flexbox',
            code: `/* 1. Header: logo trái, menu phải, căn giữa theo chiều dọc */
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
}
nav { display: flex; gap: 24px; }

/* 2. Hàng thẻ sản phẩm: xuống hàng khi hết chỗ, mỗi thẻ 300px */
.danh-sach {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.danh-sach .san-pham {
  flex: 0 0 300px;
  margin: 0;                     /* đã có gap, bỏ margin từng thẻ */
}

/* 3. Căn giữa tuyệt đối một khối (form đăng nhập) */
.trang-dang-nhap {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}`,
            note: 'Căn giữa cả hai chiều từng là bài toán khó của CSS; với Flexbox chỉ cần ba dòng. Thẻ sản phẩm dùng flex: 0 0 300px thay vì width để trình duyệt hiểu rõ ý "không co giãn".',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Chọn giá trị justify-content thế nào',
            steps: [
              { kind: 'start', text: 'Các con xếp ngang, còn dư chỗ' },
              { kind: 'decision', text: 'Muốn dồn về một phía ?', branches: [
                { label: 'Đúng', steps: [{ kind: 'io', text: 'flex-start / center / flex-end' }] },
                { label: 'Sai', steps: [
                  { kind: 'decision', text: 'Hai đầu sát mép ?', branches: [
                    { label: 'Đúng', steps: [{ kind: 'io', text: 'space-between' }] },
                    { label: 'Sai', steps: [{ kind: 'io', text: 'space-around / space-evenly' }] },
                  ] },
                ] },
              ] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Mẹo gỡ bố cục',
          text: 'Thêm tạm * { outline: 1px solid red } để thấy mọi hộp. Trong DevTools, chọn phần tử có display: flex sẽ hiện nút "flex" bật lớp phủ vẽ trục và khoảng cách — dùng nó thay vì đoán.',
        },
      ],
    },
  ],

  exercises: [
    {
      id: 'b18-1', level: 'Cơ bản', title: 'Tính specificity',
      requirement: 'Cho 5 selector: p · .gia · #tv01 .gia · article p.gia · nav a:hover. Tính bộ ba (id, class, thẻ) của từng cái và sắp xếp từ yếu tới mạnh.',
      signature: 'Bảng 5 dòng + thứ tự',
      examples: [
        { input: 'article p.gia', output: '(0, 1, 2)', explain: 'Một class .gia, hai thẻ article và p.' },
        { input: 'nav a:hover', output: '(0, 1, 2)', explain: 'Pseudo-class :hover đếm như class.' },
        { input: 'Thứ tự', output: 'p (0,0,1) < .gia (0,1,0) < article p.gia (0,1,2) = nav a:hover (0,1,2) < #tv01 .gia (1,1,0)' },
      ],
    },
    {
      id: 'b18-2', level: 'Cơ bản', title: 'Bề rộng nhìn thấy của hộp',
      requirement: 'Cho .hop { width: 240px; padding: 20px; border: 5px solid; margin: 10px }. Tính bề rộng nhìn thấy (gồm border) và khoảng cách giữa hai .hop đặt cạnh nhau theo chiều ngang, trong hai trường hợp box-sizing: content-box và border-box.',
      signature: 'Bốn con số',
      examples: [
        { input: 'content-box', output: 'Nhìn thấy 240 + 20×2 + 5×2 = 290px; cách nhau 10 + 10 = 20px' },
        { input: 'border-box', output: 'Nhìn thấy 240px; content còn 240 − 50 = 190px; cách nhau 20px', explain: 'Margin ngang không gộp nên vẫn cộng.' },
      ],
    },
    {
      id: 'b18-3', level: 'Cơ bản', title: 'Nối CSS và chỉnh chữ',
      requirement: 'Tạo style.css nối vào trang buổi 17: đặt font chữ và màu chữ cho body, màu riêng cho h1, bỏ gạch chân liên kết và đổi màu khi rê chuột, giá sản phẩm màu đỏ đậm. Tất cả bằng selector thẻ và class, không id.',
      signature: 'style.css + <link> trong head',
      constraints: ['Không dùng inline style', 'Mở đầu file bằng reset box-sizing: border-box'],
      examples: [
        { input: 'Rê chuột lên liên kết', output: 'Màu đổi, có gạch chân lại' },
        { input: 'DevTools → Computed của h1', output: 'font-family kế thừa từ body, color là giá trị bạn đặt ở h1' },
      ],
    },
    {
      id: 'b18-4', level: 'Trung bình', title: 'Header dính và menu ngang',
      requirement: 'Dựng header gồm logo bên trái, nav 4 liên kết bên phải, căn giữa theo chiều dọc, cao 64px, dính ở đỉnh khi cuộn và có bóng mờ phía dưới. Liên kết đang ở trang hiện tại (class="active") có gạch chân màu thương hiệu.',
      signature: 'header { display:flex; position:sticky } nav { display:flex; gap }',
      constraints: ['Dùng justify-content: space-between, không dùng float', 'Không margin từng a, dùng gap', 'z-index đủ để nổi trên nội dung'],
      examples: [
        { input: 'Cuộn trang xuống', output: 'Header vẫn ở đỉnh, nội dung chạy phía dưới nó' },
        { input: 'Thu hẹp cửa sổ còn 500px', output: 'Logo và menu vẫn hai đầu, menu có thể chật — buổi 19 xử lý', explain: 'Flexbox giữ bố cục, responsive là việc của media query.' },
      ],
      visual: {
        kind: 'strip',
        caption: 'header là flex container với 2 con, space-between đẩy chúng ra hai đầu',
        name: 'header',
        items: ['img logo', 'nav (flex, gap 24px)'],
      },
    },
    {
      id: 'b18-5', level: 'Trung bình', title: 'Lưới thẻ sản phẩm bằng Flexbox',
      requirement: 'Trang san-pham.html có 8 article.san-pham. Dùng Flexbox xếp thành hàng, mỗi thẻ rộng cố định 280px, cách nhau 16px, tự xuống hàng khi hết chỗ, căn giữa toàn khối. Mỗi thẻ: ảnh 100% rộng cao 160px không méo, tên, giá đỏ, nút "Thêm vào giỏ" nằm sát đáy thẻ dù tên dài ngắn khác nhau.',
      signature: '.danh-sach { display:flex; flex-wrap:wrap; gap } .san-pham { display:flex; flex-direction:column }',
      constraints: ['Nút sát đáy bằng margin-top: auto trên nút, không dùng position', 'Ảnh dùng object-fit: cover', 'Không đặt margin trên .san-pham'],
      examples: [
        { input: 'Cửa sổ 1200px', output: '4 thẻ một hàng (4×280 + 3×16 = 1168), hàng 2 có 4 thẻ' },
        { input: 'Một thẻ tên dài 2 dòng, thẻ khác 1 dòng', output: 'Nút "Thêm vào giỏ" của mọi thẻ cùng một đường ngang', explain: 'Thẻ là flex column; margin-top: auto trên nút nuốt hết chỗ trống phía trên.' },
      ],
      hint: 'Hai tầng Flexbox: .danh-sach xếp các thẻ theo hàng; mỗi .san-pham lại là flex column để đẩy nút xuống đáy. align-items mặc định stretch nên các thẻ cùng hàng cao bằng nhau.',
    },
    {
      id: 'b18-6', level: 'Trung bình', title: 'Nhãn giảm giá và hiệu ứng rê chuột',
      requirement: 'Thêm vào thẻ sản phẩm một span.nhan "Giảm 10%" dán góc trên phải, cách mép 12px. Khi rê chuột lên thẻ, thẻ nâng lên 4px và bóng đậm hơn, chuyển động mượt 0,2 giây.',
      signature: '.san-pham { position:relative; transition } .san-pham:hover { transform } .nhan { position:absolute }',
      constraints: ['Dùng transform: translateY(-4px), không đổi margin', 'transition đặt ở trạng thái thường, không đặt ở :hover'],
      examples: [
        { input: 'Rê chuột vào thẻ', output: 'Thẻ trượt lên mượt, bóng rõ hơn; rời chuột trượt xuống mượt' },
        { input: 'Bỏ position: relative ở .san-pham', output: 'Nhãn bay lên góc phải trang', explain: 'absolute tìm tổ tiên gần nhất có position khác static; không có thì lấy trang.' },
      ],
    },
    {
      id: 'b18-7', level: 'Nâng cao', title: 'Form đăng nhập căn giữa màn hình',
      requirement: 'Dựng trang dang-nhap.html: một khối form 360px nằm giữa màn hình cả ngang lẫn dọc trên nền xám nhạt; bên trong có tiêu đề, hai ô nhập chiếm 100% rộng cao 44px có viền bo, ô đang focus đổi màu viền và bóng; nút đăng nhập full rộng màu thương hiệu, hover tối hơn; dòng "Quên mật khẩu?" căn phải.',
      signature: '.trang { min-height:100vh; display:flex; justify-content:center; align-items:center }',
      constraints: ['Không dùng position để căn giữa', 'Dùng :focus cho ô nhập, outline: none phải kèm viền thay thế rõ ràng', 'Dòng quên mật khẩu căn phải bằng text-align hoặc margin-left: auto'],
      examples: [
        { input: 'Cửa sổ 1440×900', output: 'Khối form ở chính giữa' },
        { input: 'Cửa sổ cao 500px', output: 'Khối form vẫn hiện đủ, trang cuộn được nếu cần', explain: 'min-height chứ không phải height để nội dung dài hơn vẫn không bị cắt.' },
        { input: 'Tab vào ô email', output: 'Viền đổi màu thương hiệu, có bóng mờ cùng màu' },
      ],
    },
    {
      id: 'b18-8', level: 'Nâng cao', title: 'Gỡ lỗi bố cục bằng DevTools',
      requirement: 'Cho một trang CSS có 5 lỗi: khoảng cách giữa hai section không bằng tổng margin; ảnh có khe hở 4px phía dưới; thẻ width 300px nhưng đo được 342px; nhãn absolute bay lên góc trang; menu dọc dù đã display: flex trên li. Dùng DevTools tìm từng nguyên nhân và nêu cách sửa.',
      signature: 'Bảng 5 dòng: hiện tượng → nguyên nhân → sửa',
      examples: [
        { input: 'Ảnh có khe hở dưới', output: 'img là inline, khe hở là chỗ cho phần đuôi chữ. Sửa: display: block hoặc vertical-align: middle.' },
        { input: 'Menu dọc dù đã display: flex', output: 'display: flex đặt nhầm trên li (con) thay vì ul (cha). Sửa: đặt lên ul.' },
        { input: 'Khoảng cách không bằng tổng margin', output: 'Margin dọc gộp, lấy giá trị lớn hơn. Sửa: chỉ đặt margin một phía, hoặc dùng gap trong flex/grid.' },
      ],
      hint: 'Tab Computed hiện giá trị cuối cùng và quy tắc nào thắng; tab Layout vẽ box model với bốn con số. Hai tab này trả lời được 4 trong 5 lỗi.',
    },
  ],
}

export default buoi18
