import type { Buoi } from './types'

const buoi05: Buoi = {
  id: 5,
  slug: 'vong-lap-while-for',
  title: 'Vòng lặp while, do…while & for',
  subtitle: 'Bắt máy làm việc lặp đi lặp lại — và biết cách dừng đúng lúc',
  duration: '3 giờ',
  keywords: ['while', 'do while', 'for', 'break', 'continue', 'biến đếm'],
  goals: [
    'Nhận ra bài toán nào cần vòng lặp',
    'Viết đúng ba thành phần: khởi tạo — điều kiện dừng — bước nhảy',
    'Chọn được while, do…while hay for cho từng tình huống',
    'Dùng break và continue mà không làm rối luồng chạy',
  ],

  sections: [
    {
      id: 'vi-sao',
      title: '1. Vì sao cần vòng lặp',
      blocks: [
        {
          type: 'text',
          text: 'In một dòng 6 lần thì copy-paste được. Nhưng 1.000 lần thì sao? Còn 1.000.000 lần? Vòng lặp cho phép mô tả công việc lặp lại một lần duy nhất, rồi để máy tự chạy bao nhiêu lượt tuỳ điều kiện.',
        },
        {
          type: 'list',
          items: [
            'Đếm ngược thời gian trong game',
            'Cộng vàng mỗi giây cho người chơi',
            'Hiển thị lại menu cho tới khi người dùng chọn Thoát',
            'Duyệt qua từng phần tử trong một danh sách',
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'loop',
            caption: 'Bốn thành phần của mọi vòng lặp — thiếu bước 4 là lặp vô tận',
            init: 'int i = 0',
            cond: 'i < 5',
            body: 'in ra i',
            step: 'i++',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Vòng lặp vô tận',
          text: 'Nếu điều kiện không bao giờ sai (quên tăng biến đếm), chương trình sẽ chạy mãi và treo terminal. Nhấn Ctrl + C để dừng.',
        },
      ],
    },

    {
      id: 'while',
      title: '2. while và do…while',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'while — kiểm tra trước, chạy sau',
            code: `int i = 0;                 // 1. khởi tạo
while (i < 5)              // 2. kiểm tra điều kiện
{
    Console.WriteLine(i);  // 3. thân vòng lặp
    i++;                   // 4. bước nhảy
}
// In ra: 0 1 2 3 4`,
          },
        },
        {
          type: 'code',
          sample: {
            title: 'do…while — chạy trước, kiểm tra sau',
            code: `int chon;
do
{
    Console.WriteLine("1. Thêm  2. Sửa  0. Thoát");
    Console.Write("Chọn: ");
    chon = Convert.ToInt32(Console.ReadLine());
} while (chon != 0);`,
            note: 'do…while luôn chạy ít nhất một lần — đúng chuẩn cho menu, vì phải hiện menu rồi mới hỏi được người dùng.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Khác nhau đúng một chỗ: thời điểm kiểm tra điều kiện',
            columns: [
              { title: 'while', tone: 'plain', items: ['Kiểm tra điều kiện TRƯỚC', 'Có thể chạy 0 lần', 'Dùng khi chưa chắc có phải làm hay không'] },
              { title: 'do…while', tone: 'plain', items: ['Kiểm tra điều kiện SAU', 'Luôn chạy ít nhất 1 lần', 'Dùng cho menu, nhập lại tới khi hợp lệ'] },
            ],
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Luồng chạy của while',
            steps: [
              { kind: 'process', text: 'i = 0' },
              {
                kind: 'decision',
                text: 'i < 5 ?',
                branches: [
                  { label: 'Đúng', steps: [{ kind: 'process', text: 'In i rồi i++' }, { kind: 'note', text: 'quay lại kiểm tra điều kiện' }] },
                  { label: 'Sai', steps: [{ kind: 'end', text: 'Thoát vòng lặp' }] },
                ],
              },
            ],
          },
        },
      ],
    },

    {
      id: 'for',
      title: '3. for — gom ba thành phần vào một dòng',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'for viết gọn hơn while',
            code: `for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
}

// Hoàn toàn tương đương với
int j = 0;
while (j < 5)
{
    Console.WriteLine(j);
    j++;
}`,
            note: 'for gom khởi tạo, điều kiện và bước nhảy lên cùng một dòng — nhìn là biết vòng lặp chạy bao nhiêu lượt.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Duyệt xuôi và duyệt ngược',
            code: `// Duyệt xuôi: 1 → 5
long giaiThua = 1;
for (int i = 1; i <= n; i++) giaiThua *= i;

// Duyệt ngược: 5 → 1
long gt = 1;
for (int i = n; i >= 1; i--) gt *= i;`,
            note: 'Cùng kết quả. Chọn hướng duyệt theo cách bài toán mô tả để code dễ đọc hơn.',
          },
        },
        {
          type: 'table',
          head: ['Chọn vòng lặp nào', 'Khi nào'],
          rows: [
            ['for', 'Biết trước số lần lặp: từ 1 đến n, duyệt danh sách'],
            ['while', 'Chưa biết số lần, dừng theo điều kiện: đọc tới khi hết dữ liệu'],
            ['do…while', 'Phải chạy ít nhất một lần: menu, nhập lại tới khi hợp lệ'],
          ],
        },
      ],
    },

    {
      id: 'break-continue',
      title: '4. break và continue',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'Hai cách can thiệp vào vòng lặp',
            code: `for (int i = 1; i <= 10; i++)
{
    if (i % 2 != 0) continue;   // bỏ qua lượt này, sang lượt kế
    if (i > 8) break;           // thoát hẳn khỏi vòng lặp
    Console.Write(i + " ");
}
// In ra: 2 4 6 8`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            columns: [
              { title: 'continue', tone: 'plain', items: ['Bỏ qua phần còn lại của lượt hiện tại', 'Vòng lặp vẫn tiếp tục', 'Dùng để lọc bỏ trường hợp không quan tâm'] },
              { title: 'break', tone: 'plain', items: ['Thoát hẳn khỏi vòng lặp', 'Các lượt sau không chạy nữa', 'Dùng khi đã tìm thấy kết quả cần'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Ứng dụng: kiểm tra số nguyên tố',
            code: `bool laNguyenTo = n >= 2;
for (int i = 2; i <= Math.Sqrt(n); i++)
{
    if (n % i == 0)
    {
        laNguyenTo = false;
        break;          // tìm được ước số, không cần xét tiếp
    }
}
Console.WriteLine(laNguyenTo ? $"{n} là số nguyên tố" : $"{n} không phải số nguyên tố");`,
            note: 'Chỉ cần xét ước số tới căn bậc hai của n — nhanh hơn hẳn duyệt tới n.',
          },
        },
      ],
    },
  ],


  exercises: [

    {
      id: 'b5-1', level: 'Cơ bản', title: 'Tổng từ 1 đến n',
      requirement: 'Cho số nguyên dương n. Trả về tổng S = 1 + 2 + 3 + … + n.',
      signature: 'long TinhTong(int n)',
      constraints: ['1 <= n <= 100000'],
      examples: [
        { input: 'n = 5', output: '15', explain: '1 + 2 + 3 + 4 + 5 = 15.' },
        { input: 'n = 1', output: '1' },
      ],
    },
    {
      id: 'b5-2', level: 'Cơ bản', title: 'Tổng các số chẵn',
      requirement: 'Cho số nguyên dương n. Trả về tổng của n số chẵn đầu tiên, tức S = 2 + 4 + 6 + … + 2n.',
      signature: 'long TongChan(int n)',
      constraints: ['1 <= n <= 100000'],
      examples: [
        { input: 'n = 5', output: '30', explain: '2 + 4 + 6 + 8 + 10 = 30.' },
        { input: 'n = 3', output: '12' },
      ],
    },
    {
      id: 'b5-3', level: 'Cơ bản', title: 'Giai thừa',
      requirement: 'Cho số nguyên không âm n. Trả về n! = 1 × 2 × … × n, với quy ước 0! = 1.',
      signature: 'long GiaiThua(int n)',
      constraints: ['0 <= n <= 20', 'n > 20 sẽ tràn kiểu long'],
      examples: [
        { input: 'n = 5', output: '120' },
        { input: 'n = 0', output: '1', explain: 'Trường hợp đặc biệt phải xử lý riêng.' },
      ],
    },
    {
      id: 'b5-4', level: 'Cơ bản', title: 'Tổng bình phương',
      requirement: 'Cho số nguyên dương n. Trả về S = 1² + 2² + … + n².',
      signature: 'long TongBinhPhuong(int n)',
      constraints: ['1 <= n <= 10000'],
      examples: [
        { input: 'n = 3', output: '14', explain: '1 + 4 + 9 = 14.' },
        { input: 'n = 1', output: '1' },
      ],
    },
    {
      id: 'b5-5', level: 'Cơ bản', title: 'Đếm ngược',
      requirement: 'Cho số nguyên dương n. Trả về chuỗi các số từ n giảm xuống 1, cách nhau bằng khoảng trắng, kết thúc bằng "Hết giờ!".',
      signature: 'string DemNguoc(int n)',
      constraints: ['1 <= n <= 1000'],
      examples: [
        { input: 'n = 3', output: '"3 2 1 Hết giờ!"' },
        { input: 'n = 1', output: '"1 Hết giờ!"' },
      ],
    },
    {
      id: 'b5-6', level: 'Trung bình', title: 'Kiểm tra số nguyên tố',
      requirement: 'Cho số nguyên n. Trả về true nếu n là số nguyên tố. Số nguyên tố là số lớn hơn 1 và chỉ có đúng hai ước là 1 và chính nó.',
      signature: 'bool LaSoNguyenTo(int n)',
      constraints: ['-1000 <= n <= 1_000_000', 'Lời giải nên chạy trong O(√n)'],
      examples: [
        { input: 'n = 7', output: 'true' },
        { input: 'n = 10', output: 'false', explain: '10 có bốn ước 1, 2, 5, 10.' },
        { input: 'n = 1', output: 'false', explain: '1 chỉ có một ước nên không phải số nguyên tố.' },
      ],
      hint: 'Chỉ cần duyệt tới Math.Sqrt(n) và break ngay khi tìm thấy ước.',
    },
    {
      id: 'b5-7', level: 'Trung bình', title: 'Tổng các chữ số',
      requirement: 'Cho một số nguyên không âm n. Trả về tổng các chữ số của n.',
      signature: 'int TongChuSo(int n)',
      constraints: ['0 <= n <= 2_000_000_000'],
      examples: [
        { input: 'n = 1234', output: '10' },
        { input: 'n = 0', output: '0' },
        { input: 'n = 999', output: '27' },
      ],
      hint: 'while (n > 0) { tong += n % 10; n /= 10; }',
    },
    {
      id: 'b5-8', level: 'Trung bình', title: 'Đảo ngược số',
      requirement: 'Cho một số nguyên không âm n. Trả về số thu được khi đảo ngược thứ tự các chữ số.',
      signature: 'int DaoNguocSo(int n)',
      constraints: ['0 <= n <= 2_000_000_000', 'Kết quả đảm bảo không tràn kiểu int'],
      examples: [
        { input: 'n = 1234', output: '4321' },
        { input: 'n = 1200', output: '21', explain: 'Số 0 ở cuối biến mất sau khi đảo.' },
      ],
    },
    {
      id: 'b5-9', level: 'Trung bình', title: 'Ước chung lớn nhất',
      requirement: 'Cho hai số nguyên dương a và b. Trả về ước chung lớn nhất của chúng bằng thuật toán Euclid.',
      signature: 'int Ucln(int a, int b)',
      constraints: ['1 <= a, b <= 1_000_000'],
      examples: [
        { input: 'a = 12, b = 18', output: '6' },
        { input: 'a = 7, b = 13', output: '1', explain: 'Hai số nguyên tố cùng nhau.' },
      ],
      hint: 'while (b != 0) { var t = b; b = a % b; a = t; } rồi trả về a.',
    },
    {
      id: 'b5-10', level: 'Nâng cao', title: 'Dãy Fibonacci',
      requirement: 'Cho số nguyên dương n. Trả về mảng gồm n số đầu tiên của dãy Fibonacci, bắt đầu bằng 0 và 1.',
      signature: 'long[] Fibonacci(int n)',
      constraints: ['1 <= n <= 90'],
      examples: [
        { input: 'n = 7', output: '[0, 1, 1, 2, 3, 5, 8]' },
        { input: 'n = 1', output: '[0]' },
      ],
    },
    {
      id: 'b5-11', level: 'Nâng cao', title: 'Số hoàn hảo',
      requirement: 'Cho số nguyên dương n. Trả về true nếu n là số hoàn hảo, tức tổng các ước thực sự của n (không kể chính nó) bằng đúng n.',
      signature: 'bool LaSoHoanHao(int n)',
      constraints: ['1 <= n <= 1_000_000'],
      examples: [
        { input: 'n = 6', output: 'true', explain: '1 + 2 + 3 = 6.' },
        { input: 'n = 28', output: 'true' },
        { input: 'n = 12', output: 'false', explain: '1 + 2 + 3 + 4 + 6 = 16, khác 12.' },
      ],
    },
    {
      id: 'b5-12', level: 'Nâng cao', title: 'Nhập lại tới khi hợp lệ',
      requirement: 'Viết chương trình console yêu cầu người dùng nhập điểm trong khoảng 0–10. Nhập sai định dạng hoặc ngoài khoảng thì báo lỗi và bắt nhập lại, cho tới khi hợp lệ thì in ra điểm đã nhận.',
      signature: 'double NhapDiemHopLe()',
      constraints: ['Không được để chương trình văng exception khi người dùng gõ chữ'],
      examples: [
        { input: 'Người dùng gõ: abc, 15, 8.5', output: '8.5', explain: 'Hai lần đầu bị từ chối, lần thứ ba hợp lệ thì dừng.' },
      ],
      hint: 'do…while kết hợp double.TryParse.',
    },
  ],
}

export default buoi05
