import type { InterviewSet } from '../types'

const nentang: InterviewSet = {
  slug: 'nen-tang-csharp',
  title: 'Phỏng vấn: Nền tảng C#',
  subtitle: 'Kiểu dữ liệu, rẽ nhánh, vòng lặp, hàm, collection và LINQ',
  from: 1,
  to: 8,
  questions: [
    // ───────────────────────── Cơ bản ─────────────────────────
    {
      id: 'pv-nt-01',
      level: 'Cơ bản',
      question: 'Khi gõ dotnet run, code C# của bạn được biên dịch và chạy như thế nào?',
      short:
        'dotnet run gọi dotnet build để trình biên dịch Roslyn dịch C# thành mã trung gian IL, đóng trong file .dll. Khi chạy, CLR nạp file đó và trình JIT dịch IL ra mã máy cho đúng CPU rồi mới thực thi.',
      answer: [
        {
          type: 'text',
          text: 'C# không dịch thẳng ra mã máy. Nó đi qua hai chặng: biên dịch lúc build và biên dịch tức thời (JIT) lúc chạy. Nhờ lớp IL ở giữa, cùng một file .dll chạy được trên Windows, macOS, Linux, miễn máy có .NET runtime.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Từ Program.cs tới dòng chữ in trên console',
            steps: [
              { kind: 'start', text: 'Program.cs + HelloApp.csproj' },
              { kind: 'process', text: 'dotnet build: Roslyn biên dịch C# → IL' },
              { kind: 'io', text: 'bin/Debug/net8.0/HelloApp.dll' },
              { kind: 'process', text: 'dotnet run: CLR nạp assembly' },
              { kind: 'process', text: 'JIT dịch IL → mã máy khi hàm được gọi lần đầu' },
              { kind: 'end', text: 'CPU thực thi, in kết quả ra console' },
            ],
          },
        },
        {
          type: 'table',
          head: ['Lệnh', 'Làm gì'],
          rows: [
            ['dotnet new console -n HelloApp', 'Sinh Program.cs và file .csproj mô tả project'],
            ['dotnet build', 'Restore package rồi biên dịch ra .dll, báo lỗi cú pháp nếu có'],
            ['dotnet run', 'Build nếu code đổi rồi chạy luôn — lệnh dùng hằng ngày'],
            ['dotnet publish -c Release', 'Đóng gói bản phát hành, thêm --self-contained để kèm luôn runtime'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Chạy sai thư mục',
          text: 'dotnet run phải đứng ở thư mục chứa file .csproj. Đứng sai chỗ sẽ gặp lỗi MSB1003 vì CLI không tìm thấy project để build.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Mẹo trả lời ăn điểm',
          text: 'Nhắc thêm CLR không chỉ chạy code mà còn quản lý bộ nhớ bằng Garbage Collector. Đó là lý do code C# được gọi là managed code.',
        },
      ],
      followUps: [
        'Garbage Collector làm gì và vì sao C# gọi là managed code?',
        'Bản publish self-contained khác bản framework-dependent thế nào?',
        '.NET Framework khác .NET 8 ở điểm nào?',
      ],
      buoi: [1],
    },

    {
      id: 'pv-nt-02',
      level: 'Cơ bản',
      question: 'Đoạn code sau in ra gì: 7 / 2, 1 + 2 + "3", 0.1 + 0.2 == 0.3? Tiền tệ nên dùng kiểu nào?',
      short:
        '7 / 2 ra 3 vì int chia int là chia nguyên. 1 + 2 + "3" ra "33" vì tính từ trái sang, gặp chuỗi mới chuyển thành nối chuỗi. 0.1 + 0.2 == 0.3 ra False vì double có sai số nhị phân — tiền phải dùng decimal.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Đoán kết quả từng dòng',
            code: `int a = 7, b = 2;

Console.WriteLine(a / b);               // 3
Console.WriteLine(a % b);               // 1
Console.WriteLine((double)a / b);       // 3.5
Console.WriteLine((double)(a / b));     // 3

Console.WriteLine(1 + 2 + "3");         // 33
Console.WriteLine("1" + 2 + 3);         // 123

Console.WriteLine(0.1 + 0.2 == 0.3);    // False
Console.WriteLine(0.1m + 0.2m == 0.3m); // True`,
            note: 'Ép kiểu phải đặt TRƯỚC phép chia. (double)(a / b) đã chia nguyên xong mới ép nên vẫn ra 3.',
          },
        },
        {
          type: 'text',
          text: 'double và float lưu theo hệ nhị phân nên 0.1 không biểu diễn chính xác được, sai số nhỏ cộng dồn lại. decimal lưu theo hệ thập phân, chính xác tới 28–29 chữ số, đổi lại chậm hơn và tốn 16 byte.',
        },
        {
          type: 'table',
          head: ['Kiểu', 'Kích thước', 'Dùng cho'],
          rows: [
            ['int', '4 byte', 'Đếm, chỉ số, số lượng'],
            ['long', '8 byte', 'Id lớn, timestamp'],
            ['double', '8 byte', 'Đo đạc, khoa học, điểm trung bình'],
            ['decimal', '16 byte', 'Tiền, thuế, tỷ giá — hậu tố m: 19.99m'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Chia nguyên cắt về phía 0',
          text: '-7 / 2 cho -3 chứ không phải -4, và -7 % 2 cho -1. Chia int cho 0 ném DivideByZeroException, còn chia double cho 0 lại ra vô cực (Infinity) và chương trình chạy tiếp.',
        },
      ],
      followUps: [
        'Vì sao (double)(a / b) vẫn ra 3?',
        'int.MaxValue + 1 ra bao nhiêu? Từ khoá checked dùng để làm gì?',
        'So sánh hai số double thế nào cho đúng?',
      ],
      buoi: [2],
    },

    {
      id: 'pv-nt-03',
      level: 'Cơ bản',
      question: 'int.Parse, Convert.ToInt32 và int.TryParse khác nhau thế nào? Đọc input người dùng nên dùng cái nào?',
      short:
        'Parse và Convert ném exception khi chuỗi sai định dạng; riêng với null thì Convert.ToInt32 trả 0 còn Parse ném lỗi. TryParse không ném lỗi mà trả true/false và đưa kết quả ra qua out — luôn dùng nó cho dữ liệu người dùng nhập.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Cùng đổi chuỗi sang số, khác nhau ở cách xử lý chuỗi sai',
            columns: [
              { title: 'int.Parse(s)', tone: 'plain', items: ['"12" → 12', '"abc" → FormatException', 'null → ArgumentNullException', 'Dùng khi chắc chắn chuỗi đúng'] },
              { title: 'Convert.ToInt32(s)', tone: 'plain', items: ['"12" → 12', '"abc" → FormatException', 'null → 0', 'Đổi được cả từ double, bool, object'] },
              { title: 'int.TryParse(s, out n)', tone: 'good', items: ['"12" → true, n = 12', '"abc" → false, n = 0', 'null → false, n = 0', 'Không ném lỗi định dạng'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Nhập lại tới khi hợp lệ',
            code: `int tuoi;
do
{
    Console.Write("Nhập tuổi: ");
} while (!int.TryParse(Console.ReadLine(), out tuoi) || tuoi < 0);

Console.WriteLine($"Bạn {tuoi} tuổi.");`,
            note: 'TryParse lo phần định dạng, điều kiện tuoi < 0 lo phần nghiệp vụ. Hai việc khác nhau nên kiểm tra cả hai.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Bẫy dấu thập phân',
          text: 'double.Parse phụ thuộc vùng (culture) của máy. Máy đặt vùng Việt Nam coi dấu phẩy là dấu thập phân, nên "3.5" có thể bị đọc sai thành 35. Dữ liệu từ file hay API thì truyền thêm CultureInfo.InvariantCulture.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Mẹo trả lời ăn điểm',
          text: 'Nói được vì sao không bọc Parse trong try/catch: exception tốn chi phí, còn người dùng gõ sai là chuyện bình thường chứ không phải tình huống bất thường.',
        },
      ],
      followUps: [
        'Từ khoá out trong TryParse nghĩa là gì?',
        'Ép kiểu (int)3.9 khác Convert.ToInt32(3.9) thế nào?',
      ],
      buoi: [2, 5],
    },

    {
      id: 'pv-nt-04',
      level: 'Cơ bản',
      question: '&& khác & thế nào? Vì sao viết s != null && s.Length > 0 thì an toàn?',
      short:
        '&& và || là toán tử ngắn mạch (short-circuit): vế trái đã đủ quyết định kết quả thì bỏ qua vế phải. & và | luôn tính cả hai vế. Nhờ ngắn mạch, khi s là null thì s.Length không bao giờ được gọi nên không văng NullReferenceException.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Cùng điều kiện, khác toán tử',
            code: `string? s = null;

if (s != null && s.Length > 0)    // vế trái false → dừng, không đụng s.Length
    Console.WriteLine("Có chữ");

if (s != null & s.Length > 0)     // vẫn tính vế phải → NullReferenceException
    Console.WriteLine("Có chữ");`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Máy tính s != null && s.Length > 0 như thế nào',
            steps: [
              { kind: 'start', text: 'Xét điều kiện' },
              {
                kind: 'decision',
                text: 's != null?',
                branches: [
                  { label: 'Sai', steps: [{ kind: 'process', text: 'Kết quả là false ngay, bỏ qua vế phải' }] },
                  { label: 'Đúng', steps: [{ kind: 'process', text: 'Mới xét tiếp s.Length > 0' }] },
                ],
              },
              { kind: 'end', text: 'Vào hoặc bỏ qua khối if' },
            ],
          },
        },
        {
          type: 'text',
          text: 'Hệ quả: thứ tự điều kiện rất quan trọng. Đặt điều kiện chặn null, chặn chỉ số vượt mảng lên trước; đặt điều kiện rẻ trước điều kiện tốn công. Với số nguyên, & và | còn là phép toán bit: 6 & 3 = 2.',
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Một dấu = và hai dấu ==',
          text: 'if (a = 5) bị C# chặn ngay lúc biên dịch vì điều kiện phải là bool — khác với C. Nhưng nếu a là bool thì if (a = true) vẫn biên dịch được, chỉ có cảnh báo, và luôn chạy vào nhánh đúng.',
        },
      ],
      followUps: [
        'else if khác viết nhiều if rời nhau thế nào?',
        'Viết lại điều kiện trên bằng toán tử ?. ra sao?',
      ],
      buoi: [3],
    },

    {
      id: 'pv-nt-05',
      level: 'Cơ bản',
      question: 'while, do…while và for khác nhau thế nào? break và continue khác gì nhau?',
      short:
        'while kiểm tra trước nên có thể chạy 0 lần; do…while chạy trước kiểm tra sau nên luôn chạy ít nhất 1 lần; for gom khởi tạo – điều kiện – bước nhảy vào một dòng, hợp khi biết trước số lượt. break thoát hẳn vòng lặp, continue bỏ phần còn lại của lượt hiện tại rồi sang lượt kế.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Chọn vòng lặp theo câu hỏi: biết trước số lượt chưa, có cần chạy ít nhất một lần không',
            columns: [
              { title: 'while', tone: 'plain', items: ['Kiểm tra TRƯỚC', 'Có thể chạy 0 lần', 'Chưa biết số lượt'] },
              { title: 'do…while', tone: 'plain', items: ['Kiểm tra SAU', 'Luôn chạy ít nhất 1 lần', 'Menu, nhập lại tới khi hợp lệ'] },
              { title: 'for', tone: 'good', items: ['Khởi tạo; điều kiện; bước nhảy', 'Biết trước số lượt', 'Duyệt theo chỉ số, duyệt ngược'] },
              { title: 'foreach', tone: 'good', items: ['Duyệt từng phần tử', 'Không cần chỉ số', 'Biến lặp chỉ đọc'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Đoạn code này in ra gì?',
            code: `for (int i = 1; i <= 5; i++)
{
    if (i == 2) continue;   // bỏ qua phần còn lại của lượt i = 2
    if (i == 4) break;      // thoát hẳn khi i = 4
    Console.Write(i + " ");
}
// Kết quả: 1 3`,
            note: 'i = 5 không bao giờ được xét vì break đã thoát vòng lặp ở i = 4.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'break chỉ thoát một tầng',
          text: 'Trong vòng lặp lồng nhau, break chỉ thoát vòng trong cùng. Muốn thoát cả hai tầng thì dùng biến cờ, hoặc tách thành hàm rồi return.',
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'continue trong while',
          text: 'Đặt continue trước lệnh tăng biến đếm trong while là ra vòng lặp vô tận. for không bị vì bước nhảy i++ luôn chạy sau continue.',
        },
      ],
      followUps: [
        'Hai vòng lặp lồng nhau, mỗi vòng n lượt thì độ phức tạp bao nhiêu?',
        'Khi nào bắt buộc dùng for thay cho foreach?',
      ],
      buoi: [5, 6],
    },

    {
      id: 'pv-nt-06',
      level: 'Cơ bản',
      question: 'Array và List<T> khác nhau thế nào? Khi nào dùng cái nào?',
      short:
        'Array có kích thước cố định từ lúc tạo, dùng Length, không thêm xoá được. List<T> tự co giãn, dùng Count, có Add/Insert/Remove — bên trong nó là một mảng, đầy thì cấp mảng mới gấp đôi rồi chép sang. Số phần tử cố định thì dùng mảng, còn lại mặc định dùng List.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'List<T> chính là một mảng được bọc thêm khả năng tự nới',
            columns: [
              { title: 'Array — int[]', tone: 'plain', items: ['Kích thước cố định', 'Thuộc tính Length', 'Không có Add / Remove', 'Gọn nhẹ, nhanh nhất'] },
              { title: 'List<int>', tone: 'good', items: ['Tự co giãn', 'Thuộc tính Count và Capacity', 'Add, Insert, Remove, Find…', 'Lựa chọn mặc định'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'List tự nới mảng bên trong',
            code: `var ds = new List<int>();
Console.WriteLine(ds.Capacity);                  // 0

ds.Add(1);
Console.WriteLine(ds.Capacity);                  // 4

for (int i = 2; i <= 5; i++) ds.Add(i);
Console.WriteLine($"{ds.Count}/{ds.Capacity}");  // 5/8`,
            note: 'Biết trước khoảng bao nhiêu phần tử thì khởi tạo new List<int>(1000) để tránh cấp lại và chép nhiều lần.',
          },
        },
        {
          type: 'table',
          head: ['Thao tác', 'Array', 'List<T>'],
          rows: [
            ['Đọc / ghi theo chỉ số', 'O(1)', 'O(1)'],
            ['Thêm vào cuối', 'Không có', 'O(1) trung bình'],
            ['Chèn / xoá ở giữa', 'Không có', 'O(n) — phải dồn các phần tử phía sau'],
            ['Tìm theo giá trị', 'O(n)', 'O(n)'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Cả hai đều là kiểu tham chiếu',
          text: 'Gán int[] b = a không tạo mảng mới: a và b cùng trỏ một vùng nhớ, sửa b[0] thì a[0] đổi theo. Muốn bản riêng thì dùng a.ToArray() hoặc new List<int>(a).',
        },
      ],
      followUps: [
        'Capacity khác Count thế nào?',
        'Vì sao Insert(0, x) trên List chậm hơn Add(x)?',
      ],
      buoi: [8],
    },

    // ───────────────────────── Trung bình ─────────────────────────
    {
      id: 'pv-nt-07',
      level: 'Trung bình',
      question: 'Value type và reference type khác nhau thế nào? Gán int b = a và List y = x cho kết quả gì?',
      short:
        'Biến value type chứa thẳng giá trị, phép gán chép giá trị nên hai biến độc lập. Biến reference type chỉ chứa địa chỉ tới đối tượng trên heap, phép gán chép địa chỉ nên hai biến cùng trỏ một đối tượng — sửa qua biến này thì biến kia thấy.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Đoạn code này in ra gì?',
            code: `int a = 10;
int b = a;                     // chép giá trị
b = 99;
Console.WriteLine(a);          // 10

var x = new List<int> { 1, 2 };
var y = x;                     // chép địa chỉ
y.Add(3);
Console.WriteLine(x.Count);    // 3

var z = new List<int>(x);      // tạo vùng nhớ mới, chép nội dung sang
z.Add(4);
Console.WriteLine(x.Count);    // 3`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'boxes',
            caption: 'Sau khi chạy xong: x và y giữ cùng một địa chỉ, z có vùng nhớ riêng',
            items: [
              { label: 'a', value: '10', note: 'stack' },
              { label: 'b', value: '99', note: 'stack' },
              { label: 'x', value: '→ 0x100', note: 'stack' },
              { label: 'y', value: '→ 0x100', note: 'stack' },
              { label: 'z', value: '→ 0x200', note: 'stack' },
              { label: '0x100', value: '[1, 2, 3]', note: 'heap' },
              { label: '0x200', value: '[1, 2, 3, 4]', note: 'heap' },
            ],
          },
        },
        {
          type: 'table',
          head: ['', 'Value type', 'Reference type'],
          rows: [
            ['Ví dụ', 'int, double, decimal, bool, char, struct, enum', 'class, string, mảng, List, Dictionary'],
            ['Biến chứa', 'Giá trị thật', 'Địa chỉ của đối tượng'],
            ['Phép gán', 'Chép giá trị', 'Chép địa chỉ'],
            ['Giá trị mặc định', '0, false, …', 'null'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Mẹo trả lời ăn điểm',
          text: '"Value type nằm trên stack" chỉ đúng với biến cục bộ. Một field int bên trong đối tượng class thì nằm trên heap cùng đối tượng đó. Nói được chi tiết này là nhà tuyển dụng biết bạn hiểu thật chứ không học thuộc.',
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'string là ngoại lệ dễ nhầm',
          text: 'string là reference type nhưng bất biến, nên dùng giống value type: gán t = s rồi s += "x" thì s trỏ sang chuỗi mới, t vẫn giữ chuỗi cũ.',
        },
      ],
      followUps: [
        'struct khác class thế nào?',
        'new List<T>(x) là bản sao nông hay sâu?',
      ],
      buoi: [2, 8],
    },

    {
      id: 'pv-nt-08',
      level: 'Trung bình',
      question: 'string trong C# là bất biến nghĩa là gì? Ảnh hưởng hiệu năng ra sao, khi nào dùng StringBuilder?',
      short:
        'Đối tượng string đã tạo thì không sửa được; ToUpper, Replace hay += đều tạo chuỗi mới. Nối chuỗi trong vòng lặp vì thế phải chép lại toàn bộ nội dung mỗi lượt, n lượt tốn cỡ O(n²). StringBuilder ghi vào một bộ đệm co giãn nên nối nhiều lần chỉ tốn O(n).',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Bẫy kinh điển: gọi hàm mà không gán lại',
            code: `string s = "hello";
s.ToUpper();               // tạo "HELLO" rồi vứt đi
Console.WriteLine(s);      // hello

s = s.ToUpper();           // gán lại thì biến mới trỏ sang chuỗi mới
Console.WriteLine(s);      // HELLO`,
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Nối 10.000 lần',
            code: `using System.Text;

string kq = "";
for (int i = 0; i < 10000; i++)
    kq += i;               // mỗi lượt cấp chuỗi mới, chép lại tất cả

var sb = new StringBuilder();
for (int i = 0; i < 10000; i++)
    sb.Append(i);          // ghi tiếp vào bộ đệm
string kq2 = sb.ToString();`,
            note: 'System.Text không nằm trong nhóm using ngầm định của project console, phải tự thêm ở đầu file.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Nối chuỗi trong vòng lặp',
            columns: [
              { title: 'string +=', tone: 'bad', items: ['Mỗi lần nối tạo một chuỗi mới', 'Chép lại toàn bộ nội dung cũ', 'Sinh nhiều rác cho GC dọn', 'Ổn khi chỉ nối vài lần'] },
              { title: 'StringBuilder', tone: 'good', items: ['Một bộ đệm co giãn', 'Append ghi tiếp vào cuối', 'ToString() một lần ở cuối', 'Dùng khi nối trong vòng lặp'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Vì sao lại thiết kế bất biến',
          text: 'Chuỗi không đổi nên chia sẻ an toàn giữa nhiều biến, nhiều luồng, làm khoá Dictionary không sợ bị sửa ngầm. .NET còn gộp các literal giống nhau thành một bản (interning) để tiết kiệm bộ nhớ.',
        },
      ],
      followUps: [
        'Nối vài chuỗi bằng $"..." có cần StringBuilder không?',
        'string.Join và StringBuilder nên chọn cái nào?',
      ],
      buoi: [6],
    },

    {
      id: 'pv-nt-09',
      level: 'Trung bình',
      question: 'So sánh hai string bằng == và Equals có khác nhau không? Nếu biến khai báo kiểu object thì sao?',
      short:
        'Với biến kiểu string, == và Equals đều so nội dung vì string nạp chồng toán tử == và ghi đè Equals. Khác biệt lộ ra khi biến khai báo kiểu object: == lúc đó so địa chỉ, còn Equals vẫn so nội dung vì là phương thức ảo. Ngoài ra a.Equals(b) văng lỗi nếu a là null, còn a == b thì không.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Đoạn code này in ra gì?',
            code: `string a = "hello";
string b = "HELLO".ToLower();                // chuỗi mới tạo lúc chạy

Console.WriteLine(a == b);                   // True
Console.WriteLine(a.Equals(b));              // True
Console.WriteLine((object)a == (object)b);   // False — so địa chỉ
Console.WriteLine(((object)a).Equals(b));    // True — vẫn gọi Equals của string
Console.WriteLine(ReferenceEquals(a, b));    // False

string? c = null;
Console.WriteLine(c == a);                   // False, không lỗi
// c.Equals(a);                              // NullReferenceException`,
          },
        },
        {
          type: 'text',
          text: '== được chọn lúc biên dịch theo kiểu khai báo của biến. Equals là phương thức ảo nên được chọn lúc chạy theo kiểu thật của đối tượng. Với class tự viết chưa ghi đè gì, cả hai đều so địa chỉ.',
        },
        {
          type: 'table',
          head: ['Cách so', 'string', 'class tự viết, chưa ghi đè'],
          rows: [
            ['a == b', 'So nội dung', 'So địa chỉ'],
            ['a.Equals(b)', 'So nội dung', 'So địa chỉ'],
            ['ReferenceEquals(a, b)', 'So địa chỉ', 'So địa chỉ'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'So không phân biệt hoa thường',
          text: 'Dùng string.Equals(a, b, StringComparison.OrdinalIgnoreCase) thay cho a.ToLower() == b.ToLower(). Cách sau tạo thêm hai chuỗi rác và có thể sai với chữ đặc biệt của một số ngôn ngữ như tiếng Thổ Nhĩ Kỳ.',
        },
      ],
      followUps: [
        'Muốn hai đối tượng SinhVien cùng mã được coi là bằng nhau thì làm gì?',
        'string.Compare khác Equals chỗ nào?',
      ],
      buoi: [3, 6],
    },

    {
      id: 'pv-nt-10',
      level: 'Trung bình',
      question: 'ref và out khác nhau thế nào? params dùng để làm gì?',
      short:
        'ref và out đều truyền chính biến chứ không truyền bản sao. ref bắt buộc biến đã có giá trị trước khi truyền, hàm đọc và sửa được; out không cần khởi tạo trước nhưng hàm bắt buộc gán trước khi kết thúc. params cho phép gọi hàm với số đối số tuỳ ý, gom lại thành một mảng.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Ba từ khoá trong một đoạn',
            code: `static void Tang(ref int x) => x++;

static bool Chia(int a, int b, out int thuong)
{
    thuong = 0;                    // out: phải gán trước khi return
    if (b == 0) return false;
    thuong = a / b;
    return true;
}

static int Tong(params int[] so) => so.Sum();

int n = 5;
Tang(ref n);
Console.WriteLine(n);                               // 6

if (Chia(10, 3, out int q)) Console.WriteLine(q);   // 3

Console.WriteLine(Tong(1, 2, 3));                   // 6
Console.WriteLine(Tong());                          // 0`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Ba cách truyền theo tham chiếu',
            columns: [
              { title: 'ref', tone: 'plain', items: ['Hai chiều: vào và ra', 'Phải gán trước khi truyền', 'Hàm không bắt buộc gán', 'Khi hàm cần sửa biến của bên gọi'] },
              { title: 'out', tone: 'good', items: ['Một chiều: chỉ ra', 'Không cần gán trước', 'Hàm bắt buộc gán', 'Trả thêm kết quả: TryParse, TryGetValue'] },
              { title: 'in', tone: 'plain', items: ['Một chiều: chỉ vào', 'Truyền tham chiếu nhưng cấm sửa', 'Tránh chép struct lớn', 'Ít gặp ở mức junior'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Luật của params',
          text: 'params phải là tham số cuối cùng và mỗi hàm chỉ có một. Gọi Tong() không truyền gì thì so là mảng rỗng chứ không phải null.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Mẹo trả lời ăn điểm',
          text: 'Hàm cần trả nhiều giá trị thì code hiện đại hay dùng tuple: (int thuong, int du) Chia(int a, int b). Mẫu Try… với out vẫn là chuẩn khi thao tác có thể thất bại.',
        },
      ],
      followUps: [
        'Truyền một List vào hàm không có ref thì hàm có sửa được list gốc không?',
        'Hàm async có dùng được tham số ref hay out không?',
      ],
      buoi: [2, 7],
    },

    {
      id: 'pv-nt-11',
      level: 'Trung bình',
      question: 'switch statement và switch expression khác nhau thế nào? Pattern matching trong switch dùng ra sao?',
      short:
        'switch statement là câu lệnh: mỗi case chạy một khối code và kết thúc bằng break. switch expression (C# 8+) là biểu thức trả về giá trị, viết mẫu => kết quả, dùng _ thay default. Kết hợp pattern matching thì so được theo khoảng (>= 80), ghép mẫu bằng and / or / not và kiểm tra kiểu.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Cùng bài toán, hai cách viết',
            code: `// switch statement — thực thi lệnh
switch (thu)
{
    case 1:
    case 7:
        Console.WriteLine("Cuối tuần");
        break;
    default:
        Console.WriteLine("Ngày thường");
        break;
}

// switch expression — trả về giá trị
string loai = thu switch
{
    1 or 7        => "Cuối tuần",
    >= 2 and <= 6 => "Ngày thường",
    _             => "Không hợp lệ"
};`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Chọn cách viết theo việc mỗi nhánh phải làm',
            columns: [
              { title: 'switch statement', tone: 'plain', items: ['Là câu lệnh, không trả giá trị', 'case … break', 'Xếp chồng được các case rỗng', 'Hợp khi mỗi nhánh làm nhiều việc'] },
              { title: 'switch expression', tone: 'good', items: ['Là biểu thức, trả về giá trị', 'mẫu => kết quả', '_ là mọi trường hợp còn lại', 'Hợp khi đổi giá trị này ra giá trị kia'] },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Không có fall-through',
          text: 'Khác C và Java, case có code mà thiếu break là lỗi biên dịch, không lặng lẽ rơi xuống case dưới. Chỉ case rỗng mới được xếp chồng như case 1: case 7:.',
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Thứ tự mẫu',
          text: 'Mẫu xét từ trên xuống, khớp mẫu đầu tiên là dừng. Viết >= 60 trước >= 80 thì nhánh 80 không bao giờ tới — trình biên dịch báo lỗi vì mẫu đã bị nhánh trên bao trùm. Thiếu _ mà gặp giá trị không khớp thì lúc chạy văng SwitchExpressionException.',
        },
      ],
      followUps: [
        'Viết switch expression xếp loại học lực theo điểm thế nào?',
        'Type pattern như obj is string s dùng khi nào?',
      ],
      buoi: [4],
    },

    {
      id: 'pv-nt-12',
      level: 'Trung bình',
      question: 'Các toán tử ??, ??= và ?. làm gì? int? khác int thế nào?',
      short:
        'a ?? b lấy a nếu a khác null, ngược lại lấy b. x ??= v chỉ gán khi x đang null. obj?.Prop chỉ truy cập khi obj khác null, còn null thì cả biểu thức ra null thay vì văng lỗi. int? là int cho phép null, dùng khi cần phân biệt "chưa có giá trị" với số 0.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Đoạn code này in ra gì?',
            code: `string? ten = null;
int? diem = null;

Console.WriteLine(ten ?? "Khách");            // Khách
Console.WriteLine(ten?.Length ?? 0);          // 0
Console.WriteLine(diem.HasValue);             // False
Console.WriteLine(diem.GetValueOrDefault());  // 0

ten ??= "An";                                 // ten đang null nên được gán
ten ??= "Bình";                               // ten đã có giá trị, bỏ qua
Console.WriteLine(ten);                       // An`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Máy tính ten?.Length ?? 0 như thế nào',
            steps: [
              { kind: 'start', text: 'Tính ten?.Length ?? 0' },
              {
                kind: 'decision',
                text: 'ten khác null?',
                branches: [
                  { label: 'Đúng', steps: [{ kind: 'process', text: 'Lấy ten.Length' }] },
                  { label: 'Sai', steps: [{ kind: 'process', text: 'ten?.Length ra null → ?? thay bằng 0' }] },
                ],
              },
              { kind: 'end', text: 'Luôn có một số int, không văng NullReferenceException' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Đọc .Value khi đang null',
          text: 'Đọc diem.Value khi diem đang null sẽ ném InvalidOperationException. Kiểm tra HasValue, hoặc dùng GetValueOrDefault() hay ?? trước khi lấy.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'string? là gì',
          text: 'Project .NET 6 trở lên bật sẵn nullable reference types. Viết string? là báo cho trình biên dịch biến có thể null, để nó cảnh báo khi bạn dùng mà chưa kiểm tra. Đây chỉ là cảnh báo lúc biên dịch, không đổi cách chương trình chạy.',
        },
      ],
      followUps: [
        'Toán tử ! đặt sau biến (null-forgiving) dùng khi nào?',
        'Viết lại if (sv != null && sv.Lop != null) bằng ?. thế nào?',
      ],
      buoi: [2, 4],
    },

    {
      id: 'pv-nt-13',
      level: 'Trung bình',
      question: 'Lambda, Func và Action là gì? Callback là gì?',
      short:
        'Lambda là cách viết hàm ẩn danh ngắn gọn: (a, b) => a + b. Func<…, TResult> là kiểu biến chứa hàm có trả về, tham số kiểu cuối cùng là kiểu trả về; Action<…> chứa hàm void. Callback là truyền một hàm vào hàm khác để hàm đó gọi lại đúng lúc cần.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'func',
            caption: 'Func<int, int, int> cong = (a, b) => a + b; — hai int vào, một int ra',
            name: 'cong',
            params: ['int a', 'int b'],
            body: 'a + b',
            returns: 'int',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Truyền hàm vào hàm',
            code: `Func<int, bool> laChan = x => x % 2 == 0;
Action<int> inRa = x => Console.Write(x + " ");

static void Duyet(List<int> ds, Func<int, bool> dieuKien, Action<int> hanhDong)
{
    foreach (int x in ds)
        if (dieuKien(x)) hanhDong(x);    // gọi lại hàm được truyền vào
}

var so = new List<int> { 1, 2, 3, 4, 5, 6 };
Duyet(so, laChan, inRa);                 // 2 4 6
Duyet(so, x => x > 4, inRa);             // 5 6`,
            note: 'Duyet không biết lọc theo tiêu chí nào, cũng không biết làm gì với phần tử — bên gọi quyết định. Đó là tinh thần của callback.',
          },
        },
        {
          type: 'table',
          head: ['Kiểu', 'Ý nghĩa', 'Ví dụ'],
          rows: [
            ['Func<int, int, int>', '2 tham số int, trả về int', '(a, b) => a + b'],
            ['Func<int, bool>', '1 tham số int, trả về bool', 'x => x > 0'],
            ['Action<string>', '1 tham số, không trả về', 's => Console.WriteLine(s)'],
            ['Action', 'Không tham số, không trả về', '() => Console.WriteLine("Hi")'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Nối sang LINQ',
          text: 'so.Where(x => x > 4) chính là truyền một Func<int, bool> vào hàm Where. Hiểu Func là hiểu vì sao LINQ viết được gọn như vậy.',
        },
      ],
      followUps: [
        'Closure là gì? Lambda dùng biến bên ngoài thì biến đó sống tới khi nào?',
        'Predicate<T> khác Func<T, bool> chỗ nào?',
        'delegate là gì?',
      ],
      buoi: [7, 8],
    },

    {
      id: 'pv-nt-14',
      level: 'Trung bình',
      question: 'Vì sao Dictionary tra cứu theo khoá nhanh hơn tìm trong List?',
      short:
        'Dictionary là bảng băm: lấy mã băm (GetHashCode) của khoá để tính thẳng ra ô chứa, nên tra cứu trung bình O(1) bất kể có bao nhiêu phần tử. Tìm trong List phải so lần lượt từng phần tử, O(n). Đổi lại Dictionary tốn bộ nhớ hơn và khoá không được trùng.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'map',
            caption: 'Khoá được băm ra số ô — đi thẳng tới ô đó, không duyệt từ đầu',
            name: 'Dictionary<string, int> diem',
            pairs: [
              { key: '"toan" → băm → ô 3', value: '8' },
              { key: '"ly" → băm → ô 0', value: '7' },
              { key: '"hoa" → băm → ô 5', value: '9' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Thao tác và các lỗi hay gặp',
            code: `var diem = new Dictionary<string, int> { ["toan"] = 8, ["ly"] = 7 };

diem["hoa"] = 9;              // chưa có → thêm
diem["toan"] = 10;            // đã có → ghi đè, không lỗi
// diem.Add("ly", 5);         // ArgumentException: khoá đã tồn tại
// int v = diem["van"];       // KeyNotFoundException

if (diem.TryGetValue("van", out int van))
    Console.WriteLine(van);
else
    Console.WriteLine("Chưa có điểm văn");`,
          },
        },
        {
          type: 'table',
          head: ['Thao tác', 'List<T>', 'Dictionary / HashSet'],
          rows: [
            ['Tìm theo giá trị / theo khoá', 'O(n)', 'O(1) trung bình'],
            ['Thêm', 'O(1) ở cuối', 'O(1) trung bình'],
            ['Xoá theo giá trị / theo khoá', 'O(n)', 'O(1) trung bình'],
            ['Giữ thứ tự, truy cập theo chỉ số', 'Có', 'Không đảm bảo'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'O(1) là trung bình, không phải luôn luôn',
          text: 'Nhiều khoá băm trùng một ô (va chạm) thì phải so tiếp trong ô đó, tệ nhất O(n). Khoá là class tự viết thì phải ghi đè cả GetHashCode lẫn Equals, nếu không hai khoá cùng nội dung vẫn bị coi là khác nhau.',
        },
      ],
      followUps: [
        'HashSet<T> khác Dictionary<K, V> thế nào?',
        'Dùng TryGetValue thay cho ContainsKey rồi đọc d[key] có lợi gì?',
      ],
      buoi: [8],
    },

    {
      id: 'pv-nt-15',
      level: 'Trung bình',
      question: 'First, FirstOrDefault, Single và Any trong LINQ khác nhau thế nào?',
      short:
        'First lấy phần tử khớp đầu tiên, không có thì ném InvalidOperationException. FirstOrDefault không có thì trả giá trị mặc định (0 với int, null với class). Single đòi đúng một phần tử khớp, có từ hai trở lên cũng ném lỗi. Any chỉ trả true/false và dừng ngay khi gặp phần tử khớp đầu tiên.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Đoạn code này in ra gì?',
            code: `var so = new List<int> { 5, 12, 8, 12 };

Console.WriteLine(so.First(x => x > 10));            // 12
Console.WriteLine(so.FirstOrDefault(x => x > 100));  // 0
Console.WriteLine(so.Single(x => x == 5));           // 5
Console.WriteLine(so.Any(x => x > 10));              // True

// so.First(x => x > 100);    // InvalidOperationException: không có phần tử nào
// so.Single(x => x == 12);   // InvalidOperationException: có hai số 12`,
          },
        },
        {
          type: 'table',
          head: ['Hàm', 'Không có phần tử khớp', 'Có đúng 1', 'Có nhiều'],
          rows: [
            ['First', 'Ném lỗi', 'Trả về nó', 'Trả cái đầu tiên'],
            ['FirstOrDefault', 'default (0 / null)', 'Trả về nó', 'Trả cái đầu tiên'],
            ['Single', 'Ném lỗi', 'Trả về nó', 'Ném lỗi'],
            ['SingleOrDefault', 'default (0 / null)', 'Trả về nó', 'Ném lỗi'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'FirstOrDefault trả 0 hoặc null',
          text: 'Với List<int>, 0 có thể là giá trị thật nên không phân biệt được "không tìm thấy". Với List<SanPham> phải kiểm tra null trước khi dùng. Từ .NET 6 có thể truyền giá trị mặc định riêng: FirstOrDefault(x => x > 100, -1).',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Any thay cho Count() > 0',
          text: 'Any dừng ở phần tử khớp đầu tiên, còn Count phải đếm hết. Câu hỏi "có hay không" thì luôn dùng Any.',
        },
      ],
      followUps: [
        'Khi nào cố ý dùng Single thay cho First?',
        'GroupBy trả về gì? Lấy khoá và đếm số phần tử từng nhóm thế nào?',
      ],
      buoi: [8],
    },

    // ───────────────────────── Nâng cao ─────────────────────────
    {
      id: 'pv-nt-16',
      level: 'Nâng cao',
      question: 'Deferred execution (hoãn thực thi) của LINQ là gì? Đoạn code thêm phần tử sau khi viết truy vấn in ra gì?',
      short:
        'Where, Select, OrderBy, GroupBy… chỉ tạo một bản mô tả truy vấn, chưa chạy. Truy vấn chỉ thật sự chạy khi được duyệt bằng foreach hoặc khi gọi ToList, Count, Sum, First… và mỗi lần duyệt là chạy lại từ đầu trên dữ liệu nguồn ở thời điểm đó.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Đoạn code này in ra gì?',
            code: `var so = new List<int> { 1, 2, 3 };
var truyVan = so.Where(x => x > 1);            // mới mô tả, chưa lọc

so.Add(10);                                     // sửa nguồn SAU khi viết truy vấn
Console.WriteLine(string.Join(" ", truyVan));   // 2 3 10

var chot = so.Where(x => x > 1).ToList();       // ToList chạy ngay, chụp kết quả
so.Add(20);
Console.WriteLine(chot.Count);                  // 3
Console.WriteLine(truyVan.Count());             // 4 — chạy lại từ đầu`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'seq',
            caption: 'truyVan không giữ dữ liệu — nó giữ công thức và đọc lại nguồn mỗi lần được duyệt',
            actors: ['Code', 'truyVan (Where)', 'List so'],
            steps: [
              { from: 0, to: 1, text: 'so.Where(x => x > 1): chỉ lưu điều kiện' },
              { from: 0, to: 2, text: 'so.Add(10)' },
              { from: 0, to: 1, text: 'string.Join bắt đầu duyệt truyVan' },
              { from: 1, to: 2, text: 'Lúc này mới đọc 1, 2, 3, 10' },
              { from: 1, to: 0, text: 'Trả về 2, 3, 10', dashed: true },
            ],
          },
        },
        {
          type: 'table',
          head: ['Hoãn — trả về IEnumerable', 'Chạy ngay — trả kết quả'],
          rows: [
            ['Where, Select', 'ToList, ToArray, ToDictionary'],
            ['OrderBy, ThenBy', 'Count, Sum, Average, Max, Min'],
            ['GroupBy, Distinct', 'First, Single, Any, All'],
            ['Take, Skip', 'Vòng foreach duyệt kết quả'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Duyệt nhiều lần là chạy nhiều lần',
          text: 'Mỗi foreach hay Count() trên cùng một truy vấn là lọc lại từ đầu. Với List thì chỉ tốn CPU, sang EF Core thì mỗi lần là một câu SQL gửi xuống database. Cần dùng kết quả nhiều lần thì gọi ToList() một lần rồi tái sử dụng.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Mẹo trả lời ăn điểm',
          text: 'Nói thêm lợi ích của việc hoãn: ghép Where → OrderBy → Take chỉ chạy khi thật cần, và EF Core gom cả chuỗi đó thành đúng một câu SQL.',
        },
      ],
      followUps: [
        'IEnumerable<T> khác List<T> thế nào?',
        'OrderBy cũng hoãn, nhưng khi được duyệt nó phải đọc bao nhiêu phần tử của nguồn?',
      ],
      buoi: [8],
    },

    {
      id: 'pv-nt-17',
      level: 'Nâng cao',
      question: 'Truyền một List vào hàm, trong hàm Add phần tử hoặc gán ds = new List — List bên ngoài thay đổi thế nào?',
      short:
        'C# mặc định truyền theo giá trị, nhưng với kiểu tham chiếu thì giá trị được chép là địa chỉ. Hàm Add qua địa chỉ đó nên List gốc thay đổi. Gán ds = new List chỉ đổi bản sao địa chỉ trong hàm, List gốc không bị ảnh hưởng — muốn đổi luôn biến bên ngoài phải dùng ref.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Đoạn code này in ra gì?',
            code: `static void Them(List<int> ds) => ds.Add(99);

static void GanMoi(List<int> ds)
{
    ds = new List<int> { 0 };   // ds trỏ sang list mới, a không hề biết
    ds.Add(1);
}

static void GanMoiRef(ref List<int> ds) => ds = new List<int> { 0 };

var a = new List<int> { 1, 2 };

Them(a);
Console.WriteLine(a.Count);     // 3
GanMoi(a);
Console.WriteLine(a.Count);     // 3
GanMoiRef(ref a);
Console.WriteLine(a.Count);     // 1`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'boxes',
            caption: 'Bên trong GanMoi, ngay sau dòng ds = new List<int> { 0 }',
            items: [
              { label: 'a (bên gọi)', value: '→ 0x100', note: 'không đổi' },
              { label: 'ds (trong GanMoi)', value: '→ 0x200', note: 'bản sao địa chỉ, vừa bị trỏ đi chỗ khác' },
              { label: '0x100', value: '[1, 2, 99]', note: 'heap — list gốc' },
              { label: '0x200', value: '[0]', note: 'heap — GC dọn sau khi hàm kết thúc' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Không muốn hàm làm bẩn list gốc',
          text: 'Truyền bản sao new List<int>(a), hoặc khai báo tham số là IReadOnlyList<int> để trình biên dịch không cho gọi Add, Remove.',
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Với string thì sao',
          text: 'string cũng là kiểu tham chiếu nhưng bất biến: s += "x" trong hàm tạo chuỗi mới rồi gán vào bản sao địa chỉ, nên chuỗi bên ngoài không đổi — y hệt trường hợp GanMoi.',
        },
      ],
      followUps: [
        'Truyền int[] vào hàm rồi sửa arr[0] thì mảng bên ngoài có đổi không?',
        'Truyền một struct vào hàm rồi sửa field thì bên ngoài có đổi không?',
      ],
      buoi: [7, 8],
    },

    {
      id: 'pv-nt-18',
      level: 'Nâng cao',
      question: 'Cho mảng nums và target, tìm hai chỉ số có tổng bằng target. Cách đơn giản có độ phức tạp bao nhiêu, tối ưu thế nào?',
      short:
        'Thử mọi cặp bằng hai vòng lặp lồng nhau là O(n²). Tối ưu bằng Dictionary lưu giá trị → chỉ số đã gặp: với mỗi số, hỏi "số bù target − x đã gặp chưa". Mỗi lần hỏi O(1) nên cả bài O(n), đổi lại tốn thêm O(n) bộ nhớ.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Từ O(n²) xuống O(n)',
            code: `// Cách 1 — thử mọi cặp: O(n²)
static int[] TwoSumCham(int[] nums, int target)
{
    for (int i = 0; i < nums.Length; i++)
        for (int j = i + 1; j < nums.Length; j++)
            if (nums[i] + nums[j] == target) return new[] { i, j };
    return Array.Empty<int>();
}

// Cách 2 — nhớ những số đã gặp: O(n)
static int[] TwoSumNhanh(int[] nums, int target)
{
    var daGap = new Dictionary<int, int>();       // giá trị → chỉ số
    for (int i = 0; i < nums.Length; i++)
    {
        if (daGap.TryGetValue(target - nums[i], out int j))
            return new[] { j, i };
        daGap[nums[i]] = i;
    }
    return Array.Empty<int>();
}`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'map',
            caption: 'nums = [4, 9, 1, 7, 2], target = 9 — tới i = 4 (số 2) cần 7, tra thấy ngay ở chỉ số 3 → [3, 4]',
            name: 'daGap (giá trị → chỉ số)',
            pairs: [
              { key: '4', value: '0' },
              { key: '9', value: '1' },
              { key: '1', value: '2' },
              { key: '7', value: '3   ← số bù cần tìm' },
            ],
          },
        },
        {
          type: 'table',
          head: ['Thao tác', 'Độ phức tạp'],
          rows: [
            ['Truy cập mảng / List theo chỉ số', 'O(1)'],
            ['List.Contains, IndexOf, tìm tuần tự', 'O(n)'],
            ['Dictionary.ContainsKey, HashSet.Contains', 'O(1) trung bình'],
            ['Hai vòng lặp lồng nhau trên n phần tử', 'O(n²)'],
            ['Sắp xếp: Sort, OrderBy', 'O(n log n)'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Cách trả lời ăn điểm',
          text: 'Nêu cách vét cạn trước để chứng tỏ hiểu đề, nói độ phức tạp của nó, rồi mới tối ưu. Luôn nói rõ đánh đổi: nhanh hơn nhưng tốn thêm bộ nhớ cho Dictionary.',
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Vòng lặp ẩn trong Contains',
          text: 'list.Contains(x) đặt trong vòng for là một vòng lặp ẩn, cả đoạn thành O(n²) mà nhìn không ra. Đổi list sang HashSet là về O(n).',
        },
      ],
      followUps: [
        'Nếu mảng đã sắp xếp thì có cách nào không tốn thêm bộ nhớ?',
        'Tìm dãy số liên tiếp dài nhất trong O(n) thế nào?',
      ],
      buoi: [5, 8],
    },

    {
      id: 'pv-nt-19',
      level: 'Nâng cao',
      question: 'Xoá phần tử khỏi List ngay trong vòng foreach thì chuyện gì xảy ra? Cách xoá đúng là gì?',
      short:
        'Sửa List giữa lúc foreach sẽ ném InvalidOperationException vì List đếm phiên bản và enumerator phát hiện collection đã bị sửa. Dùng for xuôi với RemoveAt thì không lỗi nhưng bỏ sót phần tử do các phần tử sau dồn lên. Cách đúng: RemoveAll, duyệt ngược bằng for, hoặc tạo List mới bằng Where.',
      answer: [
        {
          type: 'code',
          sample: {
            title: 'Hai cách sai',
            code: `var so = new List<int> { 1, 2, 2, 3, 4 };

// Sai 1: InvalidOperationException — Collection was modified
// foreach (int x in so)
//     if (x % 2 == 0) so.Remove(x);

// Sai 2: không lỗi nhưng bỏ sót
for (int i = 0; i < so.Count; i++)
    if (so[i] % 2 == 0) so.RemoveAt(i);

Console.WriteLine(string.Join(" ", so));   // 1 2 3 — số 2 thứ hai còn sót`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'strip',
            caption: 'Xoá so[1] xong, số 2 thứ hai dồn lên chỉ số 1 — nhưng i đã tăng thành 2 nên bỏ qua nó',
            name: 'so sau RemoveAt(1), lượt kế tiếp i = 2',
            items: ['1', '2', '3', '4'],
            highlight: [1],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Ba cách đúng',
            code: `so.RemoveAll(x => x % 2 == 0);                // gọn nhất

for (int i = so.Count - 1; i >= 0; i--)       // duyệt ngược
    if (so[i] % 2 == 0) so.RemoveAt(i);

var le = so.Where(x => x % 2 != 0).ToList();  // tạo list mới, list gốc giữ nguyên`,
            note: 'Duyệt ngược an toàn vì các phần tử bị dồn đều nằm ở phía đã duyệt qua.',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Vì sao RemoveAll tốt hơn',
          text: 'Mỗi lần RemoveAt ở giữa phải dồn cả phần đuôi, xoá k phần tử tốn cỡ O(n·k). RemoveAll dồn một lượt duy nhất nên chỉ O(n).',
        },
      ],
      followUps: [
        'Biến lặp trong foreach có gán lại được không?',
        'Dictionary có xoá phần tử được khi đang foreach không?',
      ],
      buoi: [5, 8],
    },

    {
      id: 'pv-nt-20',
      level: 'Nâng cao',
      question: 'var có phải kiểu động không? Phân biệt var, object, dynamic và giải thích boxing.',
      short:
        'var không phải kiểu động: trình biên dịch suy ra một kiểu cố định từ giá trị gán lúc khai báo. object là kiểu gốc chứa được mọi thứ nhưng phải ép kiểu khi lấy ra. dynamic bỏ qua kiểm tra lúc biên dịch, sai đâu chỉ lộ khi chạy. Gán một value type như int vào object gọi là boxing: .NET bọc giá trị vào một đối tượng mới trên heap.',
      answer: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Ba từ khoá khác nhau ở thời điểm xác định kiểu',
            columns: [
              { title: 'var', tone: 'good', items: ['Kiểu chốt lúc biên dịch', 'Phải gán ngay khi khai báo', 'Gán kiểu khác là lỗi biên dịch', 'Không tốn gì thêm lúc chạy'] },
              { title: 'object', tone: 'plain', items: ['Kiểu gốc của mọi kiểu', 'Chứa được mọi giá trị', 'Phải ép kiểu khi dùng', 'Value type bị boxing'] },
              { title: 'dynamic', tone: 'bad', items: ['Kiểu xét lúc chạy', 'Không cần ép kiểu', 'Gõ sai tên vẫn biên dịch qua', 'Chậm hơn, hạn chế dùng'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Mỗi dòng bị comment gây lỗi gì?',
            code: `var a = 10;                    // a là int, chốt luôn
// a = "abc";                  // lỗi biên dịch: không đổi kiểu được

object o = a;                  // boxing: chép 10 vào một hộp mới trên heap
int b = (int)o;                // unboxing: ép đúng kiểu gốc → 10
// long c = (long)o;           // InvalidCastException: hộp chứa int, không phải long

dynamic d = "abc";
Console.WriteLine(d.Length);   // 3
// d.KhongCo();                // biên dịch qua, chạy thì RuntimeBinderException`,
          },
        },
        {
          type: 'text',
          text: 'Boxing tốn một lần cấp phát trên heap, unboxing tốn một lần kiểm tra kiểu và chép giá trị ra. Vài lần thì không sao, nhưng trong vòng lặp hàng triệu lượt thì sinh rất nhiều rác cho GC dọn.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Vì sao List<int> tốt hơn ArrayList',
          text: 'ArrayList chứa object nên mỗi lần Add một int là một lần boxing, lấy ra phải ép kiểu. List<int> là generic, lưu int trực tiếp — không boxing, sai kiểu bị bắt ngay lúc biên dịch.',
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Câu bẫy',
          text: 'Trả lời "var là kiểu động giống JavaScript" là mất điểm ngay. var chỉ là cách viết tắt, kiểu vẫn tĩnh như khi khai báo tường minh.',
        },
      ],
      followUps: [
        'Khi nào nên dùng var, khi nào nên ghi rõ kiểu?',
        'dynamic thực tế được dùng ở đâu?',
      ],
      buoi: [2, 8],
    },
  ],
}

export default nentang
