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

    {
      id: 'b3-1', level: 'Cơ bản', title: 'Kiểm tra số chẵn lẻ',
      requirement: 'Cho một số nguyên n. Trả về true nếu n là số chẵn, ngược lại trả về false.',
      signature: 'bool LaSoChan(int n)',
      constraints: ['-1_000_000 <= n <= 1_000_000'],
      examples: [
        { input: 'n = 7', output: 'false' },
        { input: 'n = 0', output: 'true', explain: '0 chia hết cho 2 nên là số chẵn.' },
        { input: 'n = -4', output: 'true' },
      ],
    },
    {
      id: 'b3-2', level: 'Cơ bản', title: 'Số âm, dương hay bằng 0',
      requirement: 'Cho một số nguyên n. Trả về "Số dương" nếu n > 0, "Số âm" nếu n < 0, và "Bằng 0" nếu n = 0.',
      signature: 'string PhanLoaiSo(int n)',
      constraints: ['-1_000_000 <= n <= 1_000_000'],
      examples: [
        { input: 'n = -5', output: '"Số âm"' },
        { input: 'n = 0', output: '"Bằng 0"' },
      ],
    },
    {
      id: 'b3-3', level: 'Cơ bản', title: 'Phân loại theo tuổi',
      requirement: 'Cho tuổi của một người. Trả về "Trẻ em" nếu dưới 18, "Người lớn" nếu từ 18 đến 60, "Người cao tuổi" nếu trên 60.',
      signature: 'string PhanLoaiTuoi(int tuoi)',
      constraints: ['0 <= tuoi <= 150'],
      examples: [
        { input: 'tuoi = 25', output: '"Người lớn"' },
        { input: 'tuoi = 60', output: '"Người lớn"', explain: 'Mốc 60 vẫn thuộc nhóm người lớn — chú ý dấu bằng.' },
        { input: 'tuoi = 61', output: '"Người cao tuổi"' },
      ],
    },
    {
      id: 'b3-4', level: 'Cơ bản', title: 'Tìm số lớn nhất trong ba số',
      requirement: 'Cho ba số nguyên a, b, c. Trả về số lớn nhất trong ba số đó. Không dùng Math.Max.',
      signature: 'int LonNhat(int a, int b, int c)',
      constraints: ['-1_000_000 <= a, b, c <= 1_000_000'],
      examples: [
        { input: 'a = 3, b = 9, c = 5', output: '9' },
        { input: 'a = 7, b = 7, c = 2', output: '7' },
      ],
    },
    {
      id: 'b3-5', level: 'Trung bình', title: 'Lương tăng ca',
      requirement: 'Cho lương mỗi giờ và số giờ làm trong tuần. 40 giờ đầu tính lương bình thường, mỗi giờ vượt quá 40 được tính hệ số 1.5. Trả về tổng lương.',
      signature: 'decimal TinhLuong(decimal luongGio, int soGioLam)',
      constraints: ['0 < luongGio <= 1_000_000', '0 <= soGioLam <= 168'],
      examples: [
        { input: 'luongGio = 50000, soGioLam = 45', output: '2375000', explain: '40 × 50000 = 2.000.000, cộng 5 × 50000 × 1.5 = 375.000.' },
        { input: 'luongGio = 50000, soGioLam = 40', output: '2000000', explain: 'Đúng 40 giờ thì chưa có tăng ca.' },
      ],
    },
    {
      id: 'b3-6', level: 'Trung bình', title: 'Xếp loại học lực',
      requirement: 'Cho điểm ba môn Toán, Lý, Hoá. Tính điểm trung bình rồi trả về xếp loại: "Giỏi" nếu ĐTB >= 8, "Khá" nếu >= 6.5, "Trung bình" nếu >= 5, còn lại "Yếu". Nếu có điểm nằm ngoài khoảng 0–10 thì trả về "Dữ liệu không hợp lệ".',
      signature: 'string XepLoai(double toan, double ly, double hoa)',
      constraints: ['Điểm là số thực bất kỳ, phải tự kiểm tra khoảng hợp lệ'],
      examples: [
        { input: 'toan = 8, ly = 7.5, hoa = 9', output: '"Giỏi"', explain: 'ĐTB = 8.17.' },
        { input: 'toan = 5, ly = 5, hoa = 5', output: '"Trung bình"' },
        { input: 'toan = 11, ly = 5, hoa = 5', output: '"Dữ liệu không hợp lệ"' },
      ],
    },
    {
      id: 'b3-7', level: 'Trung bình', title: 'Tiền điện bậc thang',
      requirement: 'Cho số kWh tiêu thụ trong tháng. 50 kWh đầu giá 1.678đ/kWh, 50 kWh tiếp theo giá 1.734đ/kWh, phần vượt quá 100 kWh giá 2.014đ/kWh. Trả về số tiền phải trả.',
      signature: 'decimal TinhTienDien(int soKwh)',
      constraints: ['0 <= soKwh <= 10000'],
      examples: [
        { input: 'soKwh = 120', output: '211000', explain: '50×1678 + 50×1734 + 20×2014 = 83900 + 86700 + 40280 = 210880, làm tròn 211000.' },
        { input: 'soKwh = 30', output: '50340', explain: 'Chưa vượt bậc một nên chỉ nhân đơn giá đầu tiên.' },
      ],
      hint: 'Mỗi bậc chỉ tính phần vượt qua bậc trước, không nhân toàn bộ số kWh với một giá.',
    },
    {
      id: 'b3-8', level: 'Trung bình', title: 'Thuế thu nhập cá nhân',
      requirement: 'Cho thu nhập tháng. Thu nhập tới 5 triệu được miễn thuế, tới 10 triệu chịu thuế 10%, trên 10 triệu chịu thuế 20% trên toàn bộ thu nhập. Trả về số thuế phải nộp.',
      signature: 'decimal TinhThue(decimal thuNhap)',
      constraints: ['0 <= thuNhap <= 1_000_000_000'],
      examples: [
        { input: 'thuNhap = 12000000', output: '2400000' },
        { input: 'thuNhap = 5000000', output: '0' },
      ],
    },
    {
      id: 'b3-9', level: 'Trung bình', title: 'Tính tiền taxi',
      requirement: 'Cho số km đã đi. Km đầu tiên giá 10.000đ, từ km thứ 2 đến km thứ 5 giá 8.000đ/km, từ km thứ 6 trở đi giá 6.000đ/km. Trả về tổng tiền.',
      signature: 'int TinhTienTaxi(int soKm)',
      constraints: ['0 < soKm <= 1000'],
      examples: [
        { input: 'soKm = 7', output: '54000', explain: '10000 + 4×8000 + 2×6000 = 10000 + 32000 + 12000.' },
        { input: 'soKm = 1', output: '10000' },
      ],
    },
    {
      id: 'b3-10', level: 'Nâng cao', title: 'Phân loại tam giác',
      requirement: 'Cho ba cạnh a, b, c. Trả về "Không phải tam giác" nếu không tạo thành tam giác, ngược lại trả về "Tam giác đều", "Tam giác cân" hoặc "Tam giác thường".',
      signature: 'string PhanLoaiTamGiac(double a, double b, double c)',
      constraints: ['0 < a, b, c <= 1000', 'Điều kiện tồn tại: tổng hai cạnh bất kỳ lớn hơn cạnh còn lại'],
      examples: [
        { input: 'a = 3, b = 4, c = 5', output: '"Tam giác thường"' },
        { input: 'a = 2, b = 2, c = 2', output: '"Tam giác đều"' },
        { input: 'a = 1, b = 2, c = 5', output: '"Không phải tam giác"', explain: '1 + 2 = 3 < 5 nên không tồn tại tam giác.' },
      ],
    },
    {
      id: 'b3-11', level: 'Nâng cao', title: 'Năm nhuận',
      requirement: 'Cho một năm. Trả về true nếu là năm nhuận. Năm nhuận là năm chia hết cho 4 nhưng không chia hết cho 100, hoặc chia hết cho 400.',
      signature: 'bool LaNamNhuan(int nam)',
      constraints: ['1 <= nam <= 9999'],
      examples: [
        { input: 'nam = 2024', output: 'true' },
        { input: 'nam = 1900', output: 'false', explain: 'Chia hết cho 100 mà không chia hết cho 400.' },
        { input: 'nam = 2000', output: 'true', explain: 'Chia hết cho 400 nên vẫn là năm nhuận.' },
      ],
    },
  ],
}

export default buoi03
