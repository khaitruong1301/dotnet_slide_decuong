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

    {
      id: 'b6-1', level: 'Cơ bản', title: 'Bảng cửu chương',
      requirement: 'Cho số nguyên n. Trả về mảng chuỗi gồm 10 dòng bảng cửu chương của n, dòng thứ i có dạng "n x i = tích".',
      signature: 'string[] BangCuuChuong(int n)',
      constraints: ['1 <= n <= 100'],
      examples: [
        { input: 'n = 5', output: '["5 x 1 = 5", "5 x 2 = 10", …, "5 x 10 = 50"]' },
        { input: 'n = 2', output: '["2 x 1 = 2", "2 x 2 = 4", …, "2 x 10 = 20"]' },
      ],
    },
    {
      id: 'b6-2', level: 'Cơ bản', title: 'Tam giác sao',
      requirement: 'Cho số nguyên dương n. Trả về chuỗi vẽ tam giác vuông bằng dấu *, dòng thứ i có i dấu sao, các dòng cách nhau bằng ký tự xuống dòng.',
      signature: 'string TamGiacSao(int n)',
      constraints: ['1 <= n <= 100'],
      examples: [
        { input: 'n = 4', output: '"*\\n**\\n***\\n****"' },
        { input: 'n = 1', output: '"*"' },
      ],
      hint: 'Điều kiện vòng lặp trong phụ thuộc vào biến của vòng lặp ngoài.',
    },
    {
      id: 'b6-3', level: 'Cơ bản', title: 'Đếm nguyên âm',
      requirement: 'Cho một chuỗi s. Trả về số lượng nguyên âm (a, e, i, o, u) xuất hiện trong chuỗi, không phân biệt hoa thường.',
      signature: 'int DemNguyenAm(string s)',
      constraints: ['0 <= s.Length <= 10000'],
      examples: [
        { input: 's = "Hello World"', output: '3', explain: 'Các nguyên âm là e, o, o.' },
        { input: 's = "xyz"', output: '0' },
      ],
    },
    {
      id: 'b6-4', level: 'Cơ bản', title: 'Đảo ngược chuỗi',
      requirement: 'Cho một chuỗi s. Trả về chuỗi đảo ngược thứ tự các ký tự. Không dùng hàm Reverse có sẵn.',
      signature: 'string DaoChuoi(string s)',
      constraints: ['0 <= s.Length <= 10000'],
      examples: [
        { input: 's = "Cybersoft"', output: '"tfosrebyC"' },
        { input: 's = ""', output: '""' },
      ],
    },
    {
      id: 'b6-5', level: 'Trung bình', title: 'Số nguyên tố trong khoảng',
      requirement: 'Cho số nguyên dương n. Trả về mảng tất cả số nguyên tố nằm trong đoạn từ 2 đến n, theo thứ tự tăng dần.',
      signature: 'int[] SoNguyenToToiN(int n)',
      constraints: ['1 <= n <= 100000'],
      examples: [
        { input: 'n = 20', output: '[2, 3, 5, 7, 11, 13, 17, 19]' },
        { input: 'n = 1', output: '[]', explain: 'Không có số nguyên tố nào nhỏ hơn 2.' },
      ],
      hint: 'Vòng ngoài duyệt số, vòng trong kiểm tra ước — đây chính là vòng lặp lồng nhau.',
    },
    {
      id: 'b6-6', level: 'Trung bình', title: 'Chuỗi đối xứng',
      requirement: 'Cho một chuỗi s. Trả về true nếu đọc xuôi và đọc ngược giống nhau.',
      signature: 'bool LaDoiXung(string s)',
      constraints: ['0 <= s.Length <= 10000', 'Phân biệt hoa thường'],
      examples: [
        { input: 's = "radar"', output: 'true' },
        { input: 's = "abca"', output: 'false' },
        { input: 's = "a"', output: 'true', explain: 'Chuỗi một ký tự luôn đối xứng.' },
      ],
      hint: 'Hai con trỏ chạy ngược chiều, chỉ cần duyệt nửa chuỗi.',
    },
    {
      id: 'b6-7', level: 'Trung bình', title: 'Đếm số từ trong câu',
      requirement: 'Cho một câu s có thể chứa nhiều khoảng trắng thừa ở đầu, cuối và giữa các từ. Trả về số từ thực sự có trong câu.',
      signature: 'int DemTu(string s)',
      constraints: ['0 <= s.Length <= 10000'],
      examples: [
        { input: 's = "  Tôi   học C#  "', output: '3' },
        { input: 's = "   "', output: '0' },
      ],
      hint: 'Split kèm StringSplitOptions.RemoveEmptyEntries.',
    },
    {
      id: 'b6-8', level: 'Trung bình', title: 'Từ dài nhất',
      requirement: 'Cho một câu s gồm các từ cách nhau bởi khoảng trắng. Trả về từ dài nhất. Nếu có nhiều từ cùng độ dài lớn nhất thì trả về từ xuất hiện đầu tiên.',
      signature: 'string TuDaiNhat(string s)',
      constraints: ['0 <= s.Length <= 10000'],
      examples: [
        { input: 's = "I love programming"', output: '"programming"' },
        { input: 's = "abc def ghi"', output: '"abc"', explain: 'Ba từ cùng dài 3, lấy từ đầu tiên.' },
      ],
    },
    {
      id: 'b6-9', level: 'Trung bình', title: 'Chuẩn hoá tên',
      requirement: 'Cho một họ tên có khoảng trắng thừa và chữ hoa thường lộn xộn. Trả về chuỗi đã chuẩn hoá: mỗi từ viết hoa chữ cái đầu, các chữ còn lại viết thường, giữa các từ đúng một khoảng trắng.',
      signature: 'string ChuanHoaTen(string s)',
      constraints: ['0 <= s.Length <= 1000'],
      examples: [
        { input: 's = "   nguyỄn   vĂn a  "', output: '"Nguyễn Văn A"' },
        { input: 's = "TRAN BINH"', output: '"Tran Binh"' },
      ],
    },
    {
      id: 'b6-10', level: 'Nâng cao', title: 'Loại bỏ ký tự đặc biệt',
      requirement: 'Cho một chuỗi s chứa lẫn ký tự đặc biệt. Trả về chuỗi chỉ còn chữ cái, chữ số và khoảng trắng, giữ nguyên thứ tự.',
      signature: 'string LamSach(string s)',
      constraints: ['0 <= s.Length <= 10000'],
      examples: [
        { input: 's = "he@llo! worl#d"', output: '"hello world"' },
        { input: 's = "abc123"', output: '"abc123"' },
      ],
      hint: 'char.IsLetterOrDigit và char.IsWhiteSpace.',
    },
    {
      id: 'b6-11', level: 'Nâng cao', title: 'Từ dài nhất có chứa số',
      requirement: 'Cho một chuỗi s gồm các từ cách nhau bởi khoảng trắng. Trả về từ dài nhất có chứa ít nhất một chữ số. Không có từ nào thoả thì trả về chuỗi rỗng.',
      signature: 'string TuDaiNhatCoSo(string s)',
      constraints: ['0 <= s.Length <= 10000'],
      examples: [
        { input: 's = "abc123 def45 ghi6789"', output: '"ghi6789"' },
        { input: 's = "abc def"', output: '""' },
      ],
    },
    {
      id: 'b6-12', level: 'Nâng cao', title: 'Nén chuỗi',
      requirement: 'Cho một chuỗi s chỉ gồm chữ cái. Nén chuỗi bằng cách thay mỗi nhóm ký tự giống nhau liên tiếp bằng ký tự đó kèm số lần lặp. Nếu chuỗi nén không ngắn hơn chuỗi gốc thì trả về chuỗi gốc.',
      signature: 'string NenChuoi(string s)',
      constraints: ['0 <= s.Length <= 10000'],
      examples: [
        { input: 's = "aaabbc"', output: '"a3b2c1"' },
        { input: 's = "abc"', output: '"abc"', explain: 'Chuỗi nén "a1b1c1" dài hơn nên giữ nguyên bản gốc.' },
      ],
    },
  ],
}

export default buoi06
