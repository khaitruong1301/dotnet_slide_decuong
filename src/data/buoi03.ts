import type { Buoi } from './types'

const buoi03: Buoi = {
  id: 3,
  slug: 'cau-truc-re-nhanh-if-else',
  title: 'Cấu trúc rẽ nhánh if / else',
  subtitle: 'Cho chương trình biết ra quyết định — và vẽ được luồng chạy trước khi code',
  duration: '3 giờ',
  keywords: ['bool', 'so sánh', '&& || !', 'if else', 'flowchart'],
  goals: [
    'Hiểu bool là kết quả của mọi phép so sánh',
    'Dùng đúng toán tử so sánh và toán tử logic && || !',
    'Vẽ lưu đồ thuật toán trước khi viết if / else',
    'Viết được chuỗi if / else if nhiều mức cho bài toán bậc thang',
  ],

  sections: [
    {
      id: 'boolean',
      title: '1. Kiểu bool và phép so sánh',
      blocks: [
        {
          type: 'text',
          text: 'Phép tính số học cho ra một con số. Phép so sánh thì chỉ cho ra một trong hai giá trị: true hoặc false. Đó chính là kiểu bool — nền tảng của mọi quyết định trong chương trình.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Cùng là biểu thức, nhưng kết quả thuộc hai thế giới khác nhau',
            columns: [
              { title: 'Phép số học → số', tone: 'plain', items: ['1 + 1 → 2', '10 % 3 → 1', 'Kết quả là int, double...'] },
              { title: 'Phép so sánh → bool', tone: 'good', items: ['1 == 1 → true', '10 > 3 → true', 'Kết quả chỉ true hoặc false'] },
            ],
          },
        },
        {
          type: 'table',
          head: ['Toán tử', 'Ý nghĩa', 'Ví dụ'],
          rows: [
            ['==', 'Bằng nhau', 'diem == 10 → true/false'],
            ['!=', 'Khác nhau', 'ten != "admin"'],
            ['>  <', 'Lớn hơn, nhỏ hơn', 'tuoi > 18'],
            ['>=  <=', 'Lớn/nhỏ hơn hoặc bằng', 'diem >= 5'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Một dấu = khác hai dấu ==',
          text: 'a = 5 là gán giá trị. a == 5 là hỏi "a có bằng 5 không". Viết nhầm là lỗi phổ biến nhất của người mới.',
        },
      ],
    },

    {
      id: 'logic',
      title: '2. Toán tử logic — ghép nhiều điều kiện',
      blocks: [
        {
          type: 'table',
          head: ['Toán tử', 'Đọc là', 'Đúng khi'],
          rows: [
            ['&&', 'VÀ', 'Cả hai vế cùng đúng'],
            ['||', 'HOẶC', 'Ít nhất một vế đúng'],
            ['!', 'PHỦ ĐỊNH', 'Đảo ngược true ↔ false'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'Ghép điều kiện',
            code: `bool hopLe = diem >= 0 && diem <= 10;        // trong khoảng 0..10
bool duocGiam = laHocSinh || laNguoiCaoTuoi;  // thuộc một trong hai nhóm
bool chuaThanhToan = !daThanhToan;            // đảo ngược`,
            note: '&& và || có "short-circuit": nếu vế trái đã đủ kết luận thì vế phải không được tính.',
          },
        },
      ],
    },

    {
      id: 'flowchart',
      title: '3. Lưu đồ thuật toán — vẽ trước, code sau',
      blocks: [
        {
          type: 'text',
          text: 'Lưu đồ giúp bạn diễn đạt luồng xử lý mà không phụ thuộc ngôn ngữ lập trình. Vẽ xong lưu đồ thì việc chuyển sang C#, Java hay JavaScript chỉ còn là chuyện cú pháp.',
        },
        {
          type: 'table',
          head: ['Hình', 'Ý nghĩa'],
          rows: [
            ['Hình bầu dục', 'Bắt đầu / Kết thúc'],
            ['Hình bình hành', 'Nhập hoặc xuất dữ liệu'],
            ['Hình chữ nhật', 'Bước xử lý, tính toán'],
            ['Hình thoi', 'Điều kiện — rẽ ra hai nhánh đúng / sai'],
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Bài toán điều hoà: nếu nhiệt độ phòng trên 25 độ thì bật máy lạnh',
            steps: [
              { kind: 'start', text: 'Bắt đầu' },
              { kind: 'io', text: 'Nhập nhiệt độ phòng T' },
              {
                kind: 'decision',
                text: 'T > 25 ?',
                branches: [
                  { label: 'Đúng', steps: [{ kind: 'process', text: 'Mở điều hoà' }] },
                  { label: 'Sai', steps: [{ kind: 'process', text: 'Không mở' }] },
                ],
              },
              { kind: 'end', text: 'Kết thúc' },
            ],
          },
        },
      ],
    },

    {
      id: 'if-else',
      title: '4. Cú pháp if / else / else if',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'Ba dạng cơ bản',
            code: `// 1. if — chỉ làm khi đúng
if (t > 25)
    Console.WriteLine("Mở điều hoà");

// 2. if...else — đúng làm việc này, sai làm việc kia
if (so % 2 == 0)
    Console.WriteLine("Số chẵn");
else
    Console.WriteLine("Số lẻ");

// 3. if...else if — kiểm tra lần lượt, gặp đúng thì dừng
if (dtb >= 8.0)      Console.WriteLine("Giỏi");
else if (dtb >= 6.5) Console.WriteLine("Khá");
else if (dtb >= 5.0) Console.WriteLine("Trung bình");
else                 Console.WriteLine("Yếu");`,
            note: 'Nhiều câu lệnh trong một nhánh thì phải bọc trong cặp { }.',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Vì sao else if nhanh hơn nhiều if rời rạc',
          text: 'Chuỗi else if dừng ngay khi gặp điều kiện đúng đầu tiên. Nhiều if độc lập thì điều kiện nào cũng bị kiểm tra, vừa chậm vừa dễ ra kết quả chồng chéo.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Xếp loại học lực — chuỗi else if kiểm tra từ mốc cao xuống thấp',
            steps: [
              { kind: 'io', text: 'Nhập điểm Toán, Lý, Hoá' },
              { kind: 'process', text: 'dtb = (toan + ly + hoa) / 3' },
              {
                kind: 'decision',
                text: 'dtb ≥ 8.0 ?',
                branches: [
                  { label: 'Đúng', steps: [{ kind: 'io', text: 'Giỏi' }] },
                  {
                    label: 'Sai',
                    steps: [
                      {
                        kind: 'decision',
                        text: 'dtb ≥ 6.5 ?',
                        branches: [
                          { label: 'Đúng', steps: [{ kind: 'io', text: 'Khá' }] },
                          { label: 'Sai', steps: [{ kind: 'io', text: 'Trung bình / Yếu' }] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Bài toán bậc thang — tiền điện',
            code: `decimal tien = 0;
if (soKwh <= 50)
{
    tien = soKwh * 1678;
}
else if (soKwh <= 100)
{
    tien = 50 * 1678 + (soKwh - 50) * 1734;
}
else
{
    tien = 50 * 1678 + 50 * 1734 + (soKwh - 100) * 2014;
}
Console.WriteLine($"Tiền điện: {tien:N0} đồng");`,
            note: 'Bậc thang thì mỗi bậc chỉ tính phần vượt qua bậc trước, không nhân toàn bộ số kWh với một giá.',
          },
        },
      ],
    },
  ],


  exercises: [
    { id: 'b3-1', level: 'Cơ bản', title: 'Kiểm tra số chẵn lẻ', requirement: 'Nhập một số nguyên, cho biết số đó chẵn hay lẻ.', io: { input: '7', output: 'Số lẻ' }, hint: 'so % 2 == 0' },
    { id: 'b3-2', level: 'Cơ bản', title: 'Số âm, dương hay bằng 0', requirement: 'Nhập một số nguyên và cho biết nó âm, dương hay bằng 0.', io: { input: '-5', output: 'Số âm' } },
    { id: 'b3-3', level: 'Cơ bản', title: 'Phân loại theo tuổi', requirement: 'Nhập tuổi: dưới 18 là Trẻ em, 18–60 là Người lớn, trên 60 là Người cao tuổi.', io: { input: '25', output: 'Người lớn' } },
    { id: 'b3-4', level: 'Trung bình', title: 'Lương tăng ca', requirement: 'Nhập lương cơ bản theo giờ và số giờ làm việc. Số giờ vượt quá 40 được tính theo tỷ lệ 1.5.', io: { input: '50000 / 45', output: '2375000' } },
    { id: 'b3-5', level: 'Trung bình', title: 'Xếp loại học lực', requirement: 'Nhập điểm Toán, Lý, Hoá (0–10, nhập sai phải báo lỗi). Tính điểm trung bình và xếp loại Giỏi / Khá / Trung bình / Yếu.', io: { input: '8 7.5 9', output: 'ĐTB 8.17 — Giỏi' } },
    { id: 'b3-6', level: 'Trung bình', title: 'Tiền điện bậc thang', requirement: '50 kWh đầu 1.678đ/kWh, 50 kWh tiếp theo 1.734đ/kWh, phần còn lại 2.014đ/kWh.', io: { input: '120', output: '211.400 đồng' } },
    { id: 'b3-7', level: 'Trung bình', title: 'Thuế thu nhập cá nhân', requirement: 'Thu nhập ≤ 5 triệu miễn thuế, ≤ 10 triệu thuế 10%, trên 10 triệu thuế 20%.', io: { input: '12000000', output: 'Thuế: 2400000' } },
    { id: 'b3-8', level: 'Trung bình', title: 'Tính tiền taxi', requirement: 'Km đầu 10.000đ, từ km 2 đến km 5 giá 8.000đ/km, trên 5 km giá 6.000đ/km.', io: { input: '7', output: '54000' } },
    { id: 'b3-9', level: 'Nâng cao', title: 'Kiểm tra tam giác', requirement: 'Nhập ba cạnh a, b, c. Kiểm tra có tạo thành tam giác không; nếu có thì cho biết là tam giác đều, cân hay thường.', io: { input: '3 4 5', output: 'Tam giác thường' }, hint: 'Điều kiện tồn tại: tổng hai cạnh bất kỳ lớn hơn cạnh còn lại.' },
  ],
}

export default buoi03
