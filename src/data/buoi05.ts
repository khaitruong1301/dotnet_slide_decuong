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
    { id: 'b5-1', level: 'Cơ bản', title: 'Tổng từ 1 đến n', requirement: 'Nhập số nguyên dương n, tính tổng S = 1 + 2 + 3 + … + n.', io: { input: 'n = 5', output: 'S = 15' } },
    { id: 'b5-2', level: 'Cơ bản', title: 'Tổng các số chẵn', requirement: 'Nhập n, tính tổng S = 2 + 4 + 6 + … + 2n.', io: { input: 'n = 5', output: 'S = 30' } },
    { id: 'b5-3', level: 'Cơ bản', title: 'Giai thừa của n', requirement: 'Tính n! = 1 × 2 × … × n, với quy ước 0! = 1.', io: { input: 'n = 5', output: '120' }, hint: 'Dùng long để tránh tràn số.' },
    { id: 'b5-4', level: 'Cơ bản', title: 'Tổng bình phương', requirement: 'Tính S = 1² + 2² + … + n².', io: { input: 'n = 3', output: 'S = 14' } },
    { id: 'b5-5', level: 'Trung bình', title: 'Kiểm tra số nguyên tố', requirement: 'Nhập n, cho biết n có phải số nguyên tố không (số nguyên tố chỉ có đúng hai ước số là 1 và chính nó).', io: { input: 'n = 7', output: '7 là số nguyên tố' }, hint: 'Chỉ cần duyệt tới Math.Sqrt(n) và break khi tìm thấy ước.' },
    { id: 'b5-6', level: 'Trung bình', title: 'Đếm ngược', requirement: 'Nhập n, in các số từ n xuống 1 rồi in "Hết giờ!".', io: { input: '3', output: '3 2 1 Hết giờ!' } },
    { id: 'b5-7', level: 'Trung bình', title: 'Nhập lại tới khi hợp lệ', requirement: 'Yêu cầu người dùng nhập điểm trong khoảng 0–10. Nếu nhập sai thì bắt nhập lại cho tới khi đúng.', hint: 'do…while kết hợp double.TryParse.' },
    { id: 'b5-8', level: 'Trung bình', title: 'Menu console', requirement: 'Hiển thị menu 1. Thêm, 2. Xem, 0. Thoát. Lặp lại menu cho tới khi người dùng chọn 0.', hint: 'do…while bọc ngoài switch.' },
    { id: 'b5-9', level: 'Nâng cao', title: 'Tổng các chữ số', requirement: 'Nhập một số nguyên, tính tổng các chữ số của nó.', io: { input: '1234', output: '10' }, hint: 'while (n > 0) { tong += n % 10; n /= 10; }' },
    { id: 'b5-10', level: 'Nâng cao', title: 'Dãy Fibonacci', requirement: 'In n số đầu tiên của dãy Fibonacci: 0, 1, 1, 2, 3, 5, 8, …', io: { input: 'n = 7', output: '0 1 1 2 3 5 8' } },
  ],
}

export default buoi05
