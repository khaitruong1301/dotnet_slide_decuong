import type { Buoi } from './types'

const buoi06: Buoi = {
  id: 6,
  slug: 'vong-lap-long-nhau-va-chuoi',
  title: 'Vòng lặp lồng nhau & xử lý chuỗi',
  subtitle: 'Duyệt theo hai chiều, và coi chuỗi như một dãy ký tự có chỉ số',
  duration: '3 giờ',
  keywords: ['nested loop', 'string', 'Substring', 'Split', 'ToCharArray'],
  goals: [
    'Đọc và viết được vòng lặp lồng nhau, hiểu vì sao số lượt là tích hai vòng',
    'Vẽ được bảng cửu chương và các hình bằng ký tự',
    'Truy cập chuỗi theo chỉ số như một mảng ký tự',
    'Dùng thành thạo nhóm hàm xử lý chuỗi hay gặp trong công việc',
  ],

  sections: [
    {
      id: 'long-nhau',
      title: '1. Vòng lặp lồng nhau',
      blocks: [
        {
          type: 'text',
          text: 'Thân của một vòng lặp cũng có thể chứa một vòng lặp khác. Vòng ngoài chạy một lượt thì vòng trong chạy trọn bộ — nên tổng số lượt là tích của hai vòng.',
        },
        {
          type: 'code',
          sample: {
            title: 'Bảng cửu chương từ 2 đến 9',
            code: `for (int i = 2; i <= 9; i++)          // vòng ngoài: bảng số mấy
{
    Console.WriteLine($"--- Bảng {i} ---");
    for (int j = 1; j <= 10; j++)     // vòng trong: nhân với 1..10
    {
        Console.WriteLine($"{i} x {j} = {i * j}");
    }
}`,
            note: 'Vòng ngoài 8 lượt × vòng trong 10 lượt = 80 dòng in ra.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Thứ tự chạy khi i = 2',
            items: [
              { label: 'i = 2, vào vòng ngoài', text: 'In tiêu đề "--- Bảng 2 ---"' },
              { label: 'j chạy từ 1 đến 10', text: 'In 2x1=2, 2x2=4, … , 2x10=20' },
              { label: 'Vòng trong kết thúc', text: 'Quay lại vòng ngoài, i tăng lên 3' },
              { label: 'Lặp lại toàn bộ', text: 'Vòng trong khởi tạo lại j = 1 từ đầu' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Vẽ tam giác sao',
            code: `int n = 5;
for (int i = 1; i <= n; i++)
{
    for (int j = 1; j <= i; j++)   // số sao phụ thuộc dòng hiện tại
        Console.Write("*");
    Console.WriteLine();
}
// *
// **
// ***
// ****
// *****`,
            note: 'Mấu chốt: điều kiện vòng trong phụ thuộc vào biến của vòng ngoài.',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Đặt tên biến đếm cho dễ đọc',
          text: 'Với bài dạng bảng, dùng i cho dòng và j cho cột. Lồng ba tầng trở lên thì nên tách thành hàm — buổi 7 sẽ làm việc này.',
        },
      ],
    },

    {
      id: 'chuoi-la-mang',
      title: '2. Chuỗi là một dãy ký tự có chỉ số',
      blocks: [
        {
          type: 'visual',
          visual: {
            kind: 'strip',
            caption: 'str.Length = 11 · chỉ số chạy từ 0 đến Length − 1',
            name: 'string str = "Hello World";',
            items: ['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd'],
            highlight: [0, 10],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Truy cập và duyệt chuỗi',
            code: `string str = "Hello World";

Console.WriteLine(str.Length);       // 11
Console.WriteLine(str[0]);           // H
Console.WriteLine(str[str.Length-1]);// d

foreach (char c in str)              // duyệt từng ký tự
    Console.Write(c + ".");

for (int i = str.Length - 1; i >= 0; i--)  // duyệt ngược -> đảo chuỗi
    Console.Write(str[i]);`,
            note: 'Truy cập str[11] sẽ văng lỗi IndexOutOfRange — chỉ số cuối cùng luôn là Length − 1.',
          },
        },
      ],
    },

    {
      id: 'ham-chuoi',
      title: '3. Nhóm hàm xử lý chuỗi hay dùng',
      blocks: [
        {
          type: 'table',
          head: ['Hàm', 'Kết quả với str = "Hello World"', 'Dùng để'],
          rows: [
            ['str.Contains("World")', 'True', 'Kiểm tra có chứa chuỗi con'],
            ['str.StartsWith("Hello")', 'True', 'Kiểm tra phần mở đầu'],
            ['str.EndsWith("World")', 'True', 'Kiểm tra phần kết thúc'],
            ['str.IndexOf(\'o\')', '4', 'Vị trí xuất hiện đầu tiên'],
            ['str.LastIndexOf(\'o\')', '7', 'Vị trí xuất hiện cuối cùng'],
            ['str.Substring(0, 5)', '"Hello"', 'Cắt chuỗi con theo vị trí và độ dài'],
            ['str.Replace("World", "C#")', '"Hello C#"', 'Thay thế chuỗi con'],
            ['str.ToUpper() / ToLower()', '"HELLO WORLD"', 'Chuẩn hoá hoa thường'],
            ['str.Trim()', 'bỏ khoảng trắng hai đầu', 'Làm sạch input người dùng'],
            ['str.Split(\' \')', '["Hello", "World"]', 'Tách chuỗi thành mảng'],
            ['string.Join(" ", arr)', '"Hello World"', 'Ghép mảng thành chuỗi'],
            ['string.IsNullOrWhiteSpace(s)', 'True nếu rỗng/toàn khoảng trắng', 'Kiểm tra input trống'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Chuỗi trong C# là bất biến',
          text: 'Mọi hàm xử lý chuỗi đều trả về chuỗi MỚI, không sửa chuỗi gốc. Viết str.ToUpper(); mà không gán lại thì str vẫn y nguyên — phải viết str = str.ToUpper();',
        },
        {
          type: 'code',
          sample: {
            title: 'Chuẩn hoá tên người dùng nhập',
            code: `string nhap = "   nguyỄn   vĂn a  ";

string[] tu = nhap.Trim()
                  .ToLower()
                  .Split(' ', StringSplitOptions.RemoveEmptyEntries);

for (int i = 0; i < tu.Length; i++)
    tu[i] = char.ToUpper(tu[i][0]) + tu[i].Substring(1);

Console.WriteLine(string.Join(" ", tu));   // "Nguyễn Văn A"`,
            note: 'Ghép nhiều hàm chuỗi lại là kỹ thuật dùng hằng ngày khi làm dự án thật.',
          },
        },
      ],
    },

    {
      id: 'ket-hop',
      title: '4. Kết hợp vòng lặp với chuỗi',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'Đếm nguyên âm trong chuỗi',
            code: `string s = Console.ReadLine().ToLower();
int dem = 0;

foreach (char c in s)
{
    if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
        dem++;
}
Console.WriteLine($"Có {dem} nguyên âm");`,
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Kiểm tra chuỗi đối xứng (palindrome)',
            code: `string s = "radar";
bool doiXung = true;

for (int i = 0, j = s.Length - 1; i < j; i++, j--)
{
    if (s[i] != s[j]) { doiXung = false; break; }
}
Console.WriteLine(doiXung ? "Đối xứng" : "Không đối xứng");`,
            note: 'Duyệt xuôi và ngược cùng lúc — chỉ cần chạy nửa chuỗi là đủ kết luận.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'strip',
            caption: 'Hai con trỏ i và j tiến vào giữa, so từng cặp ký tự',
            name: '"radar" — i = 0, j = 4',
            items: ['r', 'a', 'd', 'a', 'r'],
            highlight: [0, 4],
          },
        },
      ],
    },
  ],


  exercises: [
    { id: 'b6-1', level: 'Cơ bản', title: 'In bảng cửu chương', requirement: 'Nhập một số n, in bảng cửu chương của n từ 1 đến 10.', io: { input: '5', output: '5 x 1 = 5 … 5 x 10 = 50' } },
    { id: 'b6-2', level: 'Cơ bản', title: 'Vẽ tam giác sao', requirement: 'Nhập n, in tam giác vuông bằng dấu * với n dòng.', io: { input: '4', output: '*\n**\n***\n****' } },
    { id: 'b6-3', level: 'Trung bình', title: 'Số nguyên tố trong khoảng', requirement: 'Nhập n, tìm và in tất cả số nguyên tố từ 1 đến n.', io: { input: '20', output: '2 3 5 7 11 13 17 19' }, hint: 'Vòng ngoài duyệt số, vòng trong kiểm tra ước số.' },
    { id: 'b6-4', level: 'Cơ bản', title: 'Đảo ngược chuỗi', requirement: 'Nhập một chuỗi, dùng vòng lặp duyệt ngược để tạo chuỗi đảo.', io: { input: 'Cybersoft', output: 'tfosrebyC' } },
    { id: 'b6-5', level: 'Cơ bản', title: 'Đếm nguyên âm', requirement: 'Nhập một chuỗi, đếm số nguyên âm (a, e, i, o, u) trong chuỗi đó.', io: { input: 'Hello World', output: '3' } },
    { id: 'b6-6', level: 'Trung bình', title: 'Kiểm tra chuỗi đối xứng', requirement: 'Nhập một chuỗi, kiểm tra xem đọc xuôi và đọc ngược có giống nhau không.', io: { input: 'radar', output: 'Đối xứng' }, hint: 'Hai con trỏ chạy ngược chiều.' },
    { id: 'b6-7', level: 'Trung bình', title: 'Đếm số từ trong câu', requirement: 'Nhập một câu, đếm xem có bao nhiêu từ (bỏ qua khoảng trắng thừa).', io: { input: '  Tôi   học C#  ', output: '3' }, hint: 'Split với StringSplitOptions.RemoveEmptyEntries.' },
    { id: 'b6-8', level: 'Trung bình', title: 'Tìm từ dài nhất', requirement: 'Nhập một câu, in ra từ dài nhất; nhiều từ dài bằng nhau thì lấy từ đầu tiên.', io: { input: 'I love programming', output: 'programming' } },
    { id: 'b6-9', level: 'Trung bình', title: 'Chuẩn hoá tên', requirement: 'Nhập họ tên có khoảng trắng thừa và hoa thường lộn xộn, chuẩn hoá thành dạng viết hoa chữ đầu mỗi từ.', io: { input: '   nguyỄn   vĂn a  ', output: 'Nguyễn Văn A' } },
    { id: 'b6-10', level: 'Nâng cao', title: 'Loại bỏ ký tự đặc biệt', requirement: 'Nhập chuỗi có lẫn ký tự đặc biệt, trả về chuỗi chỉ còn chữ, số và khoảng trắng.', io: { input: 'he@llo! worl#d', output: 'hello world' }, hint: 'char.IsLetterOrDigit(c) hoặc char.IsWhiteSpace(c).' },
    { id: 'b6-11', level: 'Nâng cao', title: 'Từ dài nhất có chứa số', requirement: 'Cho một chuỗi các từ cách nhau bởi khoảng trắng, trả về từ dài nhất có chứa ít nhất một chữ số. Không có thì trả về chuỗi rỗng.', io: { input: 'abc123 def45 ghi6789', output: 'ghi6789' } },
  ],
}

export default buoi06
