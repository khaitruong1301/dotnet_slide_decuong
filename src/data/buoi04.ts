import type { Buoi } from './types'

const buoi04: Buoi = {
  id: 4,
  slug: 'switch-case-va-toan-tu-rut-gon',
  title: 'switch case & toán tử rút gọn',
  subtitle: 'Chọn một trong nhiều trường hợp gọn gàng, viết điều kiện ngắn mà vẫn rõ nghĩa',
  duration: '3 giờ',
  keywords: ['switch case', 'switch expression', 'ternary', '??', 'pattern matching'],
  goals: [
    'Biết khi nào dùng switch thay cho chuỗi else if',
    'Viết switch expression — cú pháp hiện đại của C# 8 trở lên',
    'Dùng pattern matching để so sánh theo khoảng giá trị',
    'Rút gọn if / else bằng toán tử ba ngôi và ?? / ??=',
  ],

  sections: [
    {
      id: 'khi-nao',
      title: '1. Khi nào dùng switch thay cho else if',
      blocks: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Cùng một bài toán, hai cách viết',
            columns: [
              { title: 'Dùng if / else if', tone: 'plain', items: ['Điều kiện phức tạp, nhiều biến', 'So sánh theo khoảng: >= <= &&', 'Dài dòng khi chỉ so sánh bằng'] },
              { title: 'Dùng switch', tone: 'good', items: ['Một biến, nhiều giá trị cố định', 'Menu, mã lệnh, thứ trong tuần', 'Ngắn, dễ đọc, dễ thêm case'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Quy tắc chọn nhanh',
          text: 'Nếu tất cả các nhánh đều hỏi "biến này có bằng giá trị nào đó không" thì dùng switch. Còn nếu có so sánh khoảng hoặc ghép nhiều biến thì dùng if / else if.',
        },
      ],
    },

    {
      id: 'switch-case',
      title: '2. switch case cổ điển',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'Thứ trong tuần',
            code: `Console.Write("Nhập số từ 1 đến 7: ");
int thu = Convert.ToInt32(Console.ReadLine());

switch (thu)
{
    case 1: Console.WriteLine("Sunday");    break;
    case 2: Console.WriteLine("Monday");    break;
    case 3: Console.WriteLine("Tuesday");   break;
    case 4: Console.WriteLine("Wednesday"); break;
    case 5: Console.WriteLine("Thursday");  break;
    case 6: Console.WriteLine("Friday");    break;
    case 7: Console.WriteLine("Saturday");  break;
    default: Console.WriteLine("Không hợp lệ"); break;
}`,
            note: 'Thiếu break là lỗi biên dịch trong C#. default chạy khi không case nào khớp.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'switch so khớp giá trị lần lượt, khớp case nào thì chạy nhánh đó rồi thoát',
            steps: [
              { kind: 'io', text: 'Nhập giá trị thu' },
              {
                kind: 'decision',
                text: 'thu khớp case nào?',
                branches: [
                  { label: 'case 1', steps: [{ kind: 'process', text: 'In "Sunday"' }] },
                  { label: 'case 2..7', steps: [{ kind: 'process', text: 'In tên thứ tương ứng' }] },
                  { label: 'default', steps: [{ kind: 'process', text: 'In "Không hợp lệ"' }] },
                ],
              },
              { kind: 'end', text: 'Thoát khỏi switch' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Gộp nhiều case cùng xử lý',
            code: `switch (thang)
{
    case 12: case 1: case 2:
        Console.WriteLine("Mùa Đông"); break;
    case 3: case 4: case 5:
        Console.WriteLine("Mùa Xuân"); break;
    default:
        Console.WriteLine("Mùa khác"); break;
}`,
          },
        },
      ],
    },

    {
      id: 'switch-expression',
      title: '3. switch expression — cách viết hiện đại',
      blocks: [
        {
          type: 'text',
          text: 'Từ C# 8, switch có thể dùng như một biểu thức trả về giá trị. Không còn case, không còn break, chỉ còn mẫu và kết quả — code ngắn đi khoảng một nửa.',
        },
        {
          type: 'code',
          sample: {
            title: 'So sánh bằng',
            code: `string tenThu = thu switch
{
    1 => "Sunday",
    2 => "Monday",
    3 => "Tuesday",
    4 => "Wednesday",
    5 => "Thursday",
    6 => "Friday",
    7 => "Saturday",
    _ => "Không hợp lệ"      // _ đóng vai trò default
};
Console.WriteLine(tenThu);`,
          },
        },
        {
          type: 'code',
          sample: {
            title: 'So sánh theo khoảng — pattern matching',
            code: `char xepLoai = diem switch
{
    >= 90 and <= 100 => 'A',
    >= 80            => 'B',
    >= 70            => 'C',
    >= 60            => 'D',
    _                => 'F'
};`,
            note: 'Các mẫu được xét từ trên xuống, nên viết mốc cao trước. and / or / not dùng để ghép mẫu.',
          },
        },
        {
          type: 'table',
          head: ['Mẫu', 'Ý nghĩa', 'Ví dụ'],
          rows: [
            ['giá trị', 'Bằng đúng giá trị', '1 => "Sunday"'],
            ['>= <=', 'So sánh khoảng', '>= 80 => \'B\''],
            ['and / or', 'Ghép nhiều mẫu', '>= 90 and <= 100'],
            ['not', 'Phủ định mẫu', 'not null'],
            ['_', 'Mọi trường hợp còn lại', '_ => "Khác"'],
          ],
        },
      ],
    },

    {
      id: 'rut-gon',
      title: '4. Toán tử rút gọn',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'Toán tử ba ngôi — if/else một dòng',
            code: `// điều kiện ? giá trị khi đúng : giá trị khi sai
string ketQua = (so % 2 == 0) ? "Chẵn" : "Lẻ";

// Tương đương với
string ketQua2;
if (so % 2 == 0) ketQua2 = "Chẵn";
else             ketQua2 = "Lẻ";`,
            note: 'Chỉ dùng khi cả hai nhánh đều ngắn. Lồng ba ngôi nhiều tầng là code khó đọc.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Xử lý null gọn gàng',
            code: `string ten = null;

string hienThi = ten ?? "Khách";   // lấy vế trái nếu khác null
ten ??= "Khách";                    // chỉ gán khi ten đang null

int? diem = null;
Console.WriteLine(diem?.ToString() ?? "chưa có điểm");`,
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Ba toán tử null hay đi cùng nhau',
          text: '?? lấy giá trị thay thế, ??= gán giá trị mặc định, và ?. gọi thành viên chỉ khi đối tượng khác null.',
        },
      ],
    },
  ],


  exercises: [
    { id: 'b4-1', level: 'Cơ bản', title: 'Ngày trong tuần', requirement: 'Nhập số nguyên 1–7, in ra tên ngày trong tuần tương ứng (1 = Sunday … 7 = Saturday).', io: { input: '3', output: 'Tuesday' } },
    { id: 'b4-2', level: 'Cơ bản', title: 'Xếp loại điểm chữ', requirement: 'Nhập điểm 0–100, dùng switch để xác định xếp loại A / B / C / D / F.', io: { input: '85', output: 'B' } },
    { id: 'b4-3', level: 'Cơ bản', title: 'Xác định mùa trong năm', requirement: 'Nhập số tháng 1–12, dùng switch expression để in ra mùa Xuân / Hạ / Thu / Đông.', io: { input: '7', output: 'Mùa Hạ' } },
    { id: 'b4-4', level: 'Cơ bản', title: 'Nguyên âm hay phụ âm', requirement: 'Nhập một ký tự, dùng switch expression cho biết đó là nguyên âm (a, e, i, o, u) hay phụ âm.', io: { input: 'e', output: 'Nguyên âm' } },
    { id: 'b4-5', level: 'Trung bình', title: 'Hạng vé xem phim', requirement: 'Nhập hạng vé (Standard / Premium / VIP), in ra tiện ích tương ứng của hạng vé đó.', io: { input: 'VIP', output: 'Ghế hạng sang, đồ uống và bỏng ngô miễn phí' } },
    { id: 'b4-6', level: 'Trung bình', title: 'Loại vé máy bay', requirement: 'Nhập loại vé (Economy / Business / First Class) và in ra tiện ích tương ứng.', io: { input: 'Business', output: 'Ghế rộng' } },
    { id: 'b4-7', level: 'Trung bình', title: 'Máy tính bỏ túi', requirement: 'Nhập hai số và một phép toán (+ − * /). Dùng switch expression để tính, xử lý trường hợp chia cho 0.', io: { input: '10 / 0', output: 'Không thể chia cho 0' }, hint: 'Dùng mẫu when để bắt trường hợp mẫu số bằng 0.' },
    { id: 'b4-8', level: 'Nâng cao', title: 'Menu quản lý sản phẩm', requirement: 'Hiển thị menu 1. Thêm, 2. Sửa, 3. Xoá, 0. Thoát. Dùng switch để điều hướng theo lựa chọn của người dùng.', hint: 'Buổi 5 sẽ bọc menu này trong vòng lặp do…while.' },
  ],
}

export default buoi04
