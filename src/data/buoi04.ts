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

    {
      id: 'b4-1', level: 'Cơ bản', title: 'Tên ngày trong tuần',
      requirement: 'Cho một số nguyên thu từ 1 đến 7, với 1 là Sunday. Trả về tên ngày trong tuần tương ứng, số ngoài khoảng trả về "Invalid".',
      signature: 'string TenThu(int thu)',
      constraints: ['-100 <= thu <= 100'],
      examples: [
        { input: 'thu = 3', output: '"Tuesday"' },
        { input: 'thu = 7', output: '"Saturday"' },
        { input: 'thu = 9', output: '"Invalid"' },
      ],
    },
    {
      id: 'b4-2', level: 'Cơ bản', title: 'Xếp loại điểm chữ',
      requirement: 'Cho điểm số từ 0 đến 100. Trả về ký tự xếp loại: A (90–100), B (80–89), C (70–79), D (60–69), F (dưới 60). Dùng switch expression.',
      signature: "char XepLoaiChu(int diem)",
      constraints: ['0 <= diem <= 100'],
      examples: [
        { input: 'diem = 85', output: "'B'" },
        { input: 'diem = 90', output: "'A'", explain: 'Mốc 90 thuộc về A — mẫu phải viết >= 90 trước >= 80.' },
        { input: 'diem = 59', output: "'F'" },
      ],
    },
    {
      id: 'b4-3', level: 'Cơ bản', title: 'Mùa trong năm',
      requirement: 'Cho số tháng từ 1 đến 12. Trả về mùa tương ứng: tháng 12, 1, 2 là "Đông"; 3, 4, 5 là "Xuân"; 6, 7, 8 là "Hạ"; 9, 10, 11 là "Thu".',
      signature: 'string TenMua(int thang)',
      constraints: ['1 <= thang <= 12'],
      examples: [
        { input: 'thang = 7', output: '"Hạ"' },
        { input: 'thang = 12', output: '"Đông"', explain: 'Tháng 12 gộp chung nhóm với tháng 1 và 2.' },
      ],
      hint: 'Gộp nhiều case cùng một kết quả, hoặc dùng mẫu khoảng trong switch expression.',
    },
    {
      id: 'b4-4', level: 'Cơ bản', title: 'Nguyên âm hay phụ âm',
      requirement: 'Cho một ký tự chữ cái tiếng Anh. Trả về "Nguyên âm" nếu là a, e, i, o, u (không phân biệt hoa thường), ngược lại trả về "Phụ âm".',
      signature: 'string LoaiKyTu(char c)',
      constraints: ["c là chữ cái từ 'a' đến 'z' hoặc 'A' đến 'Z'"],
      examples: [
        { input: "c = 'e'", output: '"Nguyên âm"' },
        { input: "c = 'K'", output: '"Phụ âm"' },
      ],
    },
    {
      id: 'b4-5', level: 'Trung bình', title: 'Tiện ích hạng vé xem phim',
      requirement: 'Cho hạng vé "Standard", "Premium" hoặc "VIP". Trả về mô tả tiện ích tương ứng. Hạng không hợp lệ trả về "Không có hạng vé này".',
      signature: 'string TienIchVe(string hangVe)',
      constraints: ['So sánh không phân biệt hoa thường'],
      examples: [
        { input: 'hangVe = "VIP"', output: '"Ghế hạng sang, đồ uống và bỏng ngô miễn phí"' },
        { input: 'hangVe = "standard"', output: '"Ghế ngồi thường, không có đồ uống"' },
      ],
    },
    {
      id: 'b4-6', level: 'Trung bình', title: 'Tiện ích loại vé máy bay',
      requirement: 'Cho loại vé "Economy", "Business" hoặc "First Class". Trả về tiện ích tương ứng: ghế thường, ghế rộng, ghế sang trọng.',
      signature: 'string TienIchVeMayBay(string loaiVe)',
      constraints: ['loaiVe là một trong ba giá trị nêu trên'],
      examples: [
        { input: 'loaiVe = "Business"', output: '"Ghế rộng"' },
        { input: 'loaiVe = "First Class"', output: '"Ghế sang trọng"' },
      ],
    },
    {
      id: 'b4-7', level: 'Trung bình', title: 'Máy tính bỏ túi',
      requirement: 'Cho hai số a, b và một ký tự phép toán trong các phép + − * /. Trả về kết quả phép tính. Nếu chia cho 0 thì trả về double.NaN.',
      signature: 'double TinhToan(double a, double b, char phepToan)',
      constraints: ["phepToan thuộc { '+', '-', '*', '/' }", 'Phép chia cho 0 phải được xử lý riêng'],
      examples: [
        { input: "a = 10, b = 4, phepToan = '*'", output: '40' },
        { input: "a = 10, b = 0, phepToan = '/'", output: 'NaN', explain: 'Không ném exception, trả về NaN để nơi gọi tự quyết định.' },
      ],
      hint: 'Kết hợp switch expression với mẫu when để bắt trường hợp mẫu số bằng 0.',
    },
    {
      id: 'b4-8', level: 'Trung bình', title: 'Số ngày trong tháng',
      requirement: 'Cho số tháng và số năm. Trả về số ngày của tháng đó, có tính năm nhuận cho tháng 2.',
      signature: 'int SoNgayTrongThang(int thang, int nam)',
      constraints: ['1 <= thang <= 12', '1 <= nam <= 9999'],
      examples: [
        { input: 'thang = 2, nam = 2024', output: '29', explain: '2024 là năm nhuận.' },
        { input: 'thang = 2, nam = 2023', output: '28' },
        { input: 'thang = 4, nam = 2024', output: '30' },
      ],
    },
    {
      id: 'b4-9', level: 'Nâng cao', title: 'Rút gọn chuỗi if bằng ternary',
      requirement: 'Cho một số nguyên n. Trả về "fizz" nếu chia hết cho 3, "buzz" nếu chia hết cho 5, "fizzbuzz" nếu chia hết cho cả hai, ngược lại trả về chính n dạng chuỗi. Viết thân hàm trong đúng một biểu thức.',
      signature: 'string FizzBuzz(int n)',
      constraints: ['1 <= n <= 1_000_000'],
      examples: [
        { input: 'n = 15', output: '"fizzbuzz"' },
        { input: 'n = 9', output: '"fizz"' },
        { input: 'n = 7', output: '"7"' },
      ],
      hint: 'switch expression với mẫu when đọc dễ hơn ternary lồng ba tầng.',
    },
    {
      id: 'b4-10', level: 'Nâng cao', title: 'Giá trị mặc định khi null',
      requirement: 'Cho tên người dùng có thể null hoặc rỗng. Trả về chính tên đó nếu có nội dung, ngược lại trả về "Khách".',
      signature: 'string TenHienThi(string? ten)',
      constraints: ['ten có thể là null, chuỗi rỗng hoặc chuỗi toàn khoảng trắng'],
      examples: [
        { input: 'ten = "An"', output: '"An"' },
        { input: 'ten = null', output: '"Khách"' },
        { input: 'ten = "   "', output: '"Khách"', explain: '?? chỉ bắt null, còn chuỗi toàn khoảng trắng phải dùng thêm IsNullOrWhiteSpace.' },
      ],
    },
    {
      id: 'b4-11', level: 'Nâng cao', title: 'Menu điều hướng',
      requirement: 'Cho lựa chọn menu từ 0 đến 3. Trả về tên chức năng: 1 "Thêm", 2 "Sửa", 3 "Xoá", 0 "Thoát", khác trả về "Lựa chọn không hợp lệ".',
      signature: 'string XuLyMenu(int chon)',
      constraints: ['-100 <= chon <= 100'],
      examples: [
        { input: 'chon = 2', output: '"Sửa"' },
        { input: 'chon = 5', output: '"Lựa chọn không hợp lệ"' },
      ],
      hint: 'Buổi 5 sẽ bọc hàm này trong vòng lặp do…while để làm menu chạy liên tục.',
    },
  ],
}

export default buoi04
