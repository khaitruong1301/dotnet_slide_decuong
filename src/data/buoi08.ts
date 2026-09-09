import type { Buoi } from './types'

const buoi08: Buoi = {
  id: 8,
  slug: 'collection-va-kieu-dong',
  title: 'Collection & kiểu dữ liệu động',
  subtitle: 'List, Dictionary, HashSet, Array — và chọn đúng cấu trúc cho từng bài toán',
  duration: '3 giờ',
  keywords: ['List', 'Dictionary', 'HashSet', 'Array', 'var', 'dynamic', 'object'],
  goals: [
    'Thao tác CRUD thành thạo trên List',
    'Dùng Dictionary để tra cứu nhanh theo khoá',
    'Dùng HashSet để loại trùng và kiểm tra tồn tại',
    'Chọn đúng cấu trúc dữ liệu để giảm độ phức tạp của thuật toán',
    'Phân biệt var, object và dynamic',
  ],

  sections: [
    {
      id: 'tong-quan',
      title: '1. Vì sao cần collection',
      blocks: [
        {
          type: 'text',
          text: 'Lưu một sinh viên thì dùng biến. Lưu 500 sinh viên thì không thể khai báo 500 biến. Collection là các kiểu dữ liệu cho phép gom nhiều giá trị vào một biến duy nhất — danh sách người dùng, giỏ hàng, bảng xếp hạng, menu game.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Bốn kiểu tập hợp thường dùng nhất',
            columns: [
              { title: 'List<T>', tone: 'good', items: ['Danh sách có thứ tự', 'Truy cập theo chỉ số', 'Thêm / xoá thoải mái', 'Mặc định nên dùng cái này'] },
              { title: 'Dictionary<K,V>', tone: 'good', items: ['Cặp khoá — giá trị', 'Tra cứu cực nhanh theo khoá', 'Khoá không được trùng'] },
              { title: 'HashSet<T>', tone: 'plain', items: ['Không thứ tự', 'Không cho phép trùng lặp', 'Kiểm tra tồn tại rất nhanh'] },
              { title: 'Array', tone: 'plain', items: ['Kích thước cố định', 'Nhanh, tốn ít bộ nhớ', 'Không thêm / xoá được'] },
            ],
          },
        },
      ],
    },

    {
      id: 'list',
      title: '2. List — CRUD đầy đủ',
      blocks: [
        {
          type: 'visual',
          visual: {
            kind: 'strip',
            caption: 'Chỉ số chạy từ 0 đến Count − 1. Chỉ số ngược ^1 là phần tử cuối cùng.',
            name: 'List<string> lstName = new List<string> { "A", "B", "C", "D", "E" };',
            items: ['A', 'B', 'C', 'D', 'E'],
            highlight: [0, 4],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Create — thêm phần tử',
            code: `List<int> numbers = new List<int> { 10, 20, 30, 40 };

numbers.Add(50);                          // thêm vào cuối
numbers.AddRange(new int[] { 60, 70 });   // thêm nhiều phần tử
numbers.Insert(1, 99);                    // chèn vào vị trí 1`,
            note: 'Insert làm dịch chuyển vị trí của mọi phần tử phía sau.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Read — đọc và duyệt',
            code: `Console.WriteLine(lstName.Count);            // 5 — số phần tử
Console.WriteLine(lstName[0]);              // "A"
Console.WriteLine(lstName[^1]);             // "E" — đếm từ cuối
Console.WriteLine(string.Join(", ", lstName));

foreach (string name in lstName)            // duyệt bằng foreach
    Console.WriteLine(name);

for (int i = 0; i < lstName.Count; i++)     // duyệt bằng for
    Console.WriteLine($"{i}: {lstName[i]}");`,
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Tìm kiếm bằng lambda',
            code: `List<int> so = new List<int> { 20, 81, 97, 63, 72, 11 };

bool coSoLon   = so.Exists(x => x > 90);      // True
int  soDauTien = so.Find(x => x > 50);        // 81
List<int> tatCa = so.FindAll(x => x > 50);    // [81, 97, 63, 72]
bool coChua    = so.Contains(20);             // True`,
            note: 'x => x > 50 chính là lambda đã học ở buổi 7 — một hàm điều kiện truyền vào.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Update và Delete',
            code: `lstName[0] = "X";                 // cập nhật theo chỉ số

numbers.Remove(10);              // xoá phần tử có giá trị 10
numbers.RemoveAt(0);             // xoá phần tử ở vị trí 0
numbers.RemoveAll(x => x >= 20); // xoá mọi phần tử thoả điều kiện
numbers.Clear();                 // xoá sạch, list vẫn tồn tại`,
            note: 'Sau khi xoá, chỉ số các phần tử phía sau đều thay đổi. Đừng vừa duyệt vừa xoá bằng for xuôi.',
          },
        },
        {
          type: 'table',
          head: ['Phương thức', 'Tác dụng'],
          rows: [
            ['.Sort()', 'Sắp xếp tăng dần'],
            ['.Reverse()', 'Đảo ngược thứ tự'],
            ['.ToArray()', 'Chuyển thành mảng'],
            ['.IndexOf(x)', 'Vị trí xuất hiện đầu tiên, không có thì −1'],
            ['.Count', 'Số phần tử hiện tại'],
          ],
        },
      ],
    },

    {
      id: 'dictionary',
      title: '3. Dictionary — tra cứu theo khoá',
      blocks: [
        {
          type: 'visual',
          visual: {
            kind: 'map',
            caption: 'Khoá do bạn tự đặt, không phải chỉ số tăng dần như List',
            name: 'Dictionary<string, object> data',
            pairs: [
              { key: '"id"', value: '"01"' },
              { key: '"name"', value: '"Tấn Khải"' },
              { key: '"age"', value: '50' },
              { key: '"job_title"', value: '"Developer"' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Khởi tạo và thao tác',
            code: `var data = new Dictionary<string, int>
{
    { "toan", 8 },
    { "ly", 7 },
};

data["hoa"] = 9;                    // thêm hoặc cập nhật
Console.WriteLine(data["toan"]);    // 8

if (data.ContainsKey("van"))        // kiểm tra trước khi đọc
    Console.WriteLine(data["van"]);

if (data.TryGetValue("ly", out int diemLy))   // cách an toàn hơn
    Console.WriteLine(diemLy);

foreach (var item in data)
    Console.WriteLine($"{item.Key} = {item.Value}");

data.Remove("ly");`,
            note: 'Đọc một khoá không tồn tại sẽ văng KeyNotFoundException — luôn dùng ContainsKey hoặc TryGetValue.',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Vì sao Dictionary nhanh hơn List',
          text: 'Tìm một phần tử trong List phải duyệt lần lượt — n phần tử thì tệ nhất là n lượt. Dictionary tính thẳng ra vị trí từ khoá, gần như chỉ một bước bất kể dữ liệu lớn cỡ nào.',
        },
      ],
    },

    {
      id: 'hashset-array',
      title: '4. HashSet và Array',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'HashSet — tập hợp không trùng lặp',
            code: `HashSet<int> set = new HashSet<int> { 1, 2, 3 };

set.Add(3);                     // False — đã có, không thêm nữa
Console.WriteLine(set.Count);   // 3
Console.WriteLine(set.Contains(2));  // True — kiểm tra rất nhanh

// Ứng dụng phổ biến: loại trùng khỏi một List
List<int> co = new List<int> { 1, 2, 2, 3, 3, 3 };
List<int> khongTrung = new HashSet<int>(co).ToList();   // [1, 2, 3]`,
            note: 'HashSet không có chỉ số nên không truy cập bằng set[0] được.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Array — kích thước cố định',
            code: `string[] names = new string[5] { "A", "B", "C", "D", "E" };

Console.WriteLine(names.Length);   // 5 — dùng Length, không phải Count
names[0] = "X";                    // sửa được

// Không có Add hay Remove — bộ nhớ đã cấp phát cố định`,
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Chuyển đổi qua lại',
            code: `List<int> list = array.ToList();
int[] array2   = list.ToArray();
HashSet<int> set2 = new HashSet<int>(list);
List<int> back = set2.ToList();

// Dictionary -> List các cặp khoá giá trị
List<KeyValuePair<string, int>> pairs = data.ToList();`,
          },
        },
      ],
    },

    {
      id: 'thuat-toan',
      title: '5. Chọn đúng cấu trúc để tối ưu thuật toán',
      blocks: [
        {
          type: 'text',
          text: 'Đây là phần quan trọng nhất buổi học. Cùng một bài toán, đổi cấu trúc dữ liệu có thể rút thời gian chạy từ hàng giây xuống mili giây.',
        },
        {
          type: 'code',
          sample: {
            title: 'Two Sum — tìm hai số có tổng bằng target',
            code: `int[] nums = { 2, 7, 11, 15 };
int target = 9;

// Cách chậm: hai vòng lặp lồng nhau, n x n lượt
// Cách nhanh: dùng Dictionary, duyệt đúng một lượt
var daGap = new Dictionary<int, int>();      // giá trị -> chỉ số

for (int i = 0; i < nums.Length; i++)
{
    int can = target - nums[i];
    if (daGap.ContainsKey(can))
    {
        Console.WriteLine($"[{daGap[can]}, {i}]");   // [0, 1]
        break;
    }
    daGap[nums[i]] = i;
}`,
            note: 'Mẹo: thay vì đi tìm cặp, hãy ghi nhớ những gì đã đi qua rồi hỏi "số bù còn thiếu đã gặp chưa".',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Best Time to Buy and Sell Stock',
            code: `int[] prices = { 7, 1, 5, 3, 6, 4 };

int giaThapNhat = int.MaxValue;
int laiCaoNhat  = 0;

foreach (int gia in prices)
{
    if (gia < giaThapNhat) giaThapNhat = gia;             // ngày mua tốt nhất tới giờ
    else laiCaoNhat = Math.Max(laiCaoNhat, gia - giaThapNhat);
}
Console.WriteLine(laiCaoNhat);   // 5 (mua giá 1, bán giá 6)`,
            note: 'Chỉ cần một lượt duyệt: vừa đi vừa ghi nhớ giá thấp nhất đã gặp.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Longest Consecutive — chuỗi liên tục dài nhất',
            code: `int[] nums = { 100, 4, 200, 1, 3, 2 };
var set = new HashSet<int>(nums);
int daiNhat = 0;

foreach (int x in set)
{
    if (set.Contains(x - 1)) continue;   // không phải đầu chuỗi thì bỏ qua

    int hienTai = x, dai = 1;
    while (set.Contains(hienTai + 1)) { hienTai++; dai++; }
    daiNhat = Math.Max(daiNhat, dai);
}
Console.WriteLine(daiNhat);   // 4 — chuỗi [1, 2, 3, 4]`,
            note: 'HashSet cho phép hỏi "số này có tồn tại không" gần như tức thì — chính là chìa khoá của lời giải.',
          },
        },
      ],
    },

    {
      id: 'var-object-dynamic',
      title: '6. var, object và dynamic',
      blocks: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Ba từ khoá dễ nhầm — khác nhau ở thời điểm xác định kiểu',
            columns: [
              { title: 'var', tone: 'good', items: ['Kiểu xác định lúc BIÊN DỊCH', 'Trình biên dịch tự suy ra từ giá trị', 'An toàn kiểu, không đổi được sau đó', 'Phải gán giá trị ngay khi khai báo'] },
              { title: 'object', tone: 'plain', items: ['Kiểu gốc của mọi thứ trong C#', 'Chứa được mọi giá trị', 'Phải ép kiểu khi lấy ra dùng', 'Có chi phí boxing / unboxing'] },
              { title: 'dynamic', tone: 'bad', items: ['Kiểu xác định lúc CHẠY', 'Không cần ép kiểu', 'Không kiểm tra lúc biên dịch', 'Lỗi chỉ lộ ra khi chạy — hạn chế dùng'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Thấy sự khác biệt qua code',
            code: `var a = 10;             // trình biên dịch biết a là int
// a = "abc";           // LỖI ngay khi biên dịch

object b = 10;
// Console.WriteLine(b + 5);        // LỖI — object không cộng được
Console.WriteLine((int)b + 5);      // phải ép kiểu: 15

dynamic c = 10;
Console.WriteLine(c + 5);           // 15 — chạy được
c = "abc";
Console.WriteLine(c + 5);           // "abc5" — không báo lỗi biên dịch`,
            note: 'var là bạn thân hằng ngày. object dùng khi cần chứa nhiều kiểu. dynamic chỉ dùng khi thật sự cần.',
          },
        },
      ],
    },
  ],


  exercises: [
    { id: 'b8-1', level: 'Cơ bản', title: 'Thống kê danh sách số', requirement: 'Với lstNumber = [20, 81, 97, 63, 72, 11, 20, 15, 33, 15, 41, 20]: tính tổng các số lớn hơn 50, đếm số phần tử lớn hơn 30, tìm số lớn nhất, tính trung bình cộng các số lẻ, in các số chẵn.', hint: 'Dùng foreach kết hợp if, hoặc Find/FindAll với lambda.' },
    { id: 'b8-2', level: 'Cơ bản', title: 'Tìm và đếm trong danh sách', requirement: 'Cũng với lstNumber trên: tìm vị trí đầu tiên của số 20, đếm số lượng phần tử bằng 15, đếm các số chia hết cho 5, tạo danh sách mới chỉ chứa các số nhỏ hơn 50.', hint: 'IndexOf, FindAll, RemoveAll.' },
    { id: 'b8-3', level: 'Cơ bản', title: 'Xử lý danh sách chuỗi', requirement: 'Với lstStrings = ["apple","banana","orange","kiwi","mango","pineapple","grape","melon"]: in các chuỗi dài hơn 5 ký tự, tìm chuỗi dài nhất, in các chuỗi chứa chữ a, tìm chuỗi bắt đầu bằng m.' },
    { id: 'b8-4', level: 'Trung bình', title: 'Sắp xếp và biến đổi danh sách', requirement: 'Sắp xếp lstStrings theo bảng chữ cái, chuyển tất cả thành chữ in hoa, thay chuỗi "banana" bằng "pear", tìm chuỗi dài thứ hai.', hint: 'Sort, vòng lặp cập nhật theo chỉ số, IndexOf.' },
    { id: 'b8-5', level: 'Trung bình', title: 'Loại trùng bằng HashSet', requirement: 'Nhập một danh sách số có phần tử trùng, dùng HashSet để loại trùng rồi in ra danh sách kết quả.', io: { input: '1 2 2 3 3 3', output: '1 2 3' } },
    { id: 'b8-6', level: 'Trung bình', title: 'Danh bạ bằng Dictionary', requirement: 'Xây dựng danh bạ Dictionary<string, string> ánh xạ tên → số điện thoại. Cho phép thêm, tra cứu theo tên, xoá và liệt kê toàn bộ.', hint: 'Luôn dùng TryGetValue khi tra cứu.' },
    { id: 'b8-7', level: 'Trung bình', title: 'Đếm tần suất từ', requirement: 'Nhập một đoạn văn, đếm số lần xuất hiện của mỗi từ và in ra theo thứ tự giảm dần.', io: { input: 'a b a c b a', output: 'a: 3, b: 2, c: 1' } },
    { id: 'b8-8', level: 'Nâng cao', title: 'Two Sum', requirement: 'Cho mảng nums và giá trị target, tìm chỉ số của hai phần tử có tổng bằng target. Giải bằng Dictionary chỉ với một lượt duyệt.', io: { input: 'nums = [2,7,11,15], target = 9', output: '[0, 1]' } },
    { id: 'b8-9', level: 'Nâng cao', title: 'Best Time to Buy and Sell Stock', requirement: 'Cho mảng prices là giá cổ phiếu theo ngày. Mua một lần, bán một lần, tìm khoản lãi lớn nhất có thể.', io: { input: 'prices = [7,1,5,3,6,4]', output: '5' } },
    { id: 'b8-10', level: 'Nâng cao', title: 'Longest Consecutive Sequence', requirement: 'Cho mảng số nguyên, tìm độ dài chuỗi số liên tiếp dài nhất (các số không cần nằm cạnh nhau trong mảng).', io: { input: 'nums = [100,4,200,1,3,2]', output: '4' }, hint: 'HashSet + chỉ bắt đầu đếm từ phần tử không có số liền trước.' },
    { id: 'b8-11', level: 'Nâng cao', title: 'Quản lý sản phẩm — bài tổng hợp', requirement: 'Dùng List kết hợp menu do…while: thêm, xem, tìm theo tên, xoá theo tên, thoát. Mỗi chức năng là một hàm riêng, có kiểm tra dữ liệu nhập.', hint: 'Bài này ôn lại toàn bộ 8 buổi.' },
  ],
}

export default buoi08
