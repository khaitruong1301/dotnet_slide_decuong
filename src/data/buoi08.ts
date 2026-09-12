import type { Buoi } from './types'
import { BAI_TAP_COLLECTION } from './buoi08-baitap'

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
      id: 'bien-va-o-nho',
      title: '2. Collection nằm ở đâu trong bộ nhớ',
      blocks: [
        {
          type: 'text',
          text: 'List, Dictionary, HashSet và mảng đều là kiểu tham chiếu. Biến bạn khai báo không chứa dữ liệu, nó chỉ chứa địa chỉ của vùng nhớ thật. Nắm chỗ này thì về sau khỏi ngạc nhiên khi truyền list vào hàm rồi list gốc bị đổi theo.',
        },
        {
          type: 'table',
          head: ['Biến', 'Địa chỉ', 'Giá trị thật'],
          rows: [
            ['int a', '(không có)', '10 — nằm thẳng trên stack'],
            ['List<int> lst', '0x100', '[10, 20, 30] — nằm trên heap'],
            ['List<int> lst2 = lst', '0x100', 'cùng địa chỉ, cùng một vùng nhớ'],
            ['Dictionary<string,int> d', '0x200', '{toan: 8} — nằm trên heap'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'Hai biến, một vùng nhớ',
            code: `List<int> lst = new List<int> { 10, 20, 30 };
List<int> lst2 = lst;          // KHÔNG sao chép dữ liệu, chỉ sao chép địa chỉ

lst2.Add(40);                  // thêm qua lst2
Console.WriteLine(lst.Count);  // 4 — lst cũng thấy!

List<int> banSao = new List<int>(lst);  // muốn bản riêng thì phải tạo mới
banSao.Add(50);
Console.WriteLine(lst.Count);  // vẫn 4 — lần này không ảnh hưởng`,
            note: 'Truyền list vào hàm cũng là truyền địa chỉ — hàm sửa list là bên ngoài thấy ngay.',
            trace: [
              { line: 1, vars: { lst: '→ 0x100' }, refs: { lst: '0x100' }, heap: { '0x100': '[10, 20, 30]' }, note: 'new cấp một vùng nhớ trên heap, biến lst giữ địa chỉ của nó.' },
              { line: 2, vars: { lst: '→ 0x100', lst2: '→ 0x100' }, refs: { lst: '0x100', lst2: '0x100' }, heap: { '0x100': '[10, 20, 30]' }, note: 'Phép gán chỉ chép ĐỊA CHỈ. Không có vùng nhớ thứ hai nào được tạo ra — để ý nhãn đỏ.' },
              { line: 4, vars: { lst: '→ 0x100', lst2: '→ 0x100' }, refs: { lst: '0x100', lst2: '0x100' }, heap: { '0x100': '[10, 20, 30, 40]' }, focus: { '0x100': [3] }, note: 'Thêm qua lst2 là thêm thẳng vào ô 0x100.' },
              { line: 5, vars: { lst: '→ 0x100', lst2: '→ 0x100' }, refs: { lst: '0x100', lst2: '0x100' }, heap: { '0x100': '[10, 20, 30, 40]' }, output: ['4'], note: 'lst cũng thành 4 phần tử vì nó vốn trỏ về đúng chỗ đó.' },
              { line: 7, vars: { lst: '→ 0x100', lst2: '→ 0x100', banSao: '→ 0x110' }, refs: { lst: '0x100', lst2: '0x100', banSao: '0x110' }, heap: { '0x100': '[10, 20, 30, 40]', '0x110': '[10, 20, 30, 40]' }, note: 'new List<int>(lst) mới thật sự tạo vùng nhớ THỨ HAI và chép nội dung sang.' },
              { line: 8, vars: { lst: '→ 0x100', banSao: '→ 0x110' }, refs: { lst: '0x100', lst2: '0x100', banSao: '0x110' }, heap: { '0x100': '[10, 20, 30, 40]', '0x110': '[10, 20, 30, 40, 50]' }, focus: { '0x110': [4] }, note: 'Thêm 50 vào bản sao — ô 0x100 không hề hấn gì.' },
              { line: 9, vars: { lst: '→ 0x100', banSao: '→ 0x110' }, refs: { lst: '0x100', lst2: '0x100', banSao: '0x110' }, heap: { '0x100': '[10, 20, 30, 40]', '0x110': '[10, 20, 30, 40, 50]' }, output: ['4', '4'], note: 'Đây là cách duy nhất để có một bản độc lập thật sự.' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Bản sao nông',
          text: 'new List<int>(lst) chép được các số vì int là kiểu giá trị. Nhưng với List<SanPham> thì nó chỉ chép địa chỉ của từng sản phẩm — sửa một sản phẩm qua bản sao là bản gốc cũng đổi theo. Muốn độc lập hoàn toàn thì phải tự tạo lại từng đối tượng.',
        },
      ],
    },

    {
      id: 'list',
      title: '3. List — CRUD đầy đủ',
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
          
            trace: [

              { line: 1, vars: { numbers: '→ 0x100' }, refs: { numbers: '0x100' },
                heap: { '0x100': '[10, 20, 30, 40]' },
                note: 'List là kiểu tham chiếu: biến numbers nằm trên stack chỉ giữ địa chỉ, dữ liệu thật nằm trên heap.' },
              { line: 3, vars: { numbers: '→ 0x100' }, refs: { numbers: '0x100' },
                heap: { '0x100': '[10, 20, 30, 40, 50]' }, focus: { '0x100': [4] },
                note: 'Add gắn 50 vào cuối, nhận chỉ số 4. Các phần tử cũ giữ nguyên chỗ.' },
              { line: 4, vars: { numbers: '→ 0x100' }, refs: { numbers: '0x100' },
                heap: { '0x100': '[10, 20, 30, 40, 50, 60, 70]' }, focus: { '0x100': [5, 6] },
                note: 'AddRange nối thêm nhiều phần tử một lượt, vẫn ở cuối nên chỉ số cũ không đổi.' },
              { line: 5, vars: { numbers: '→ 0x100' }, refs: { numbers: '0x100' },
                heap: { '0x100': '[10, 99, 20, 30, 40, 50, 60, 70]' }, focus: { '0x100': [1] },
                note: 'Insert chèn 99 vào chỗ số 1. Đây là chỗ khác hẳn Add: MỌI phần tử từ vị trí 1 trở đi bị đẩy lùi một bậc — 20 từ chỉ số 1 sang 2, 30 từ 2 sang 3, và cứ thế.' },
            ],},
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
          
            trace: [

              { line: 1, vars: { lstName: '[A, B, C, D, E]' }, output: ['5'] },
              { line: 2, vars: { lstName: '[A, B, C, D, E]' }, output: ['5', 'A'], focus: { lstName: [0] } },
              { line: 3, vars: { lstName: '[A, B, C, D, E]' }, output: ['5', 'A', 'E'], focus: { lstName: [4] }, note: 'Cú pháp ^1 nghĩa là đếm ngược từ cuối — gọn hơn lstName[lstName.Count - 1].' },
              { line: 4, vars: { lstName: '[A, B, C, D, E]' }, output: ['5', 'A', 'E', 'A, B, C, D, E'] },
              { line: 7, vars: { lstName: '[A, B, C, D, E]', name: '"A"' }, output: ['5', 'A', 'E', 'A, B, C, D, E', 'A'], focus: { lstName: [0] }, note: 'foreach không cho biết chỉ số, chỉ đưa lần lượt từng phần tử.' },
              { line: 7, vars: { lstName: '[A, B, C, D, E]', name: '"E"' }, output: ['5', 'A', 'E', 'A, B, C, D, E', 'A', '…', 'E'], focus: { lstName: [4] } },
              { line: 10, vars: { lstName: '[A, B, C, D, E]', i: '0' }, output: ['…', '0: A'], focus: { lstName: [0] }, note: 'Cần biết chỉ số thì phải dùng for.' },
              { line: 10, vars: { lstName: '[A, B, C, D, E]', i: '4' }, output: ['…', '0: A', '1: B', '2: C', '3: D', '4: E'], focus: { lstName: [4] } },
            ],},
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
          
            trace: [

              { line: 1, vars: { so: '[20, 81, 97, 63, 72, 11]' } },
              { line: 3, vars: { so: '[20, 81, 97, 63, 72, 11]', coSoLon: 'true' }, focus: { so: [2] }, note: 'Exists duyệt tới khi gặp phần tử đầu tiên thoả rồi dừng — 97 > 90 nên trả về true ngay, không cần xét 63, 72, 11.' },
              { line: 4, vars: { so: '[20, 81, 97, 63, 72, 11]', coSoLon: 'true', soDauTien: '81' }, focus: { so: [1] }, note: 'Find trả về chính PHẦN TỬ đầu tiên thoả, không phải chỉ số. Không tìm thấy thì trả về 0 với int.' },
              { line: 5, vars: { so: '[20, 81, 97, 63, 72, 11]', coSoLon: 'true', soDauTien: '81', tatCa: '[81, 97, 63, 72]' }, focus: { so: [1, 2, 3, 4] }, note: 'FindAll duyệt hết mảng, gom mọi phần tử thoả vào một List mới. List gốc không đổi.' },
              { line: 6, vars: { so: '[20, 81, 97, 63, 72, 11]', coSoLon: 'true', soDauTien: '81', tatCa: '[81, 97, 63, 72]', coChua: 'true' }, focus: { so: [0] }, note: 'Contains so bằng giá trị, không nhận lambda. Trên List nó duyệt lần lượt nên chậm hơn Contains của HashSet.' },
            ],},
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
          
            trace: [

              { line: 1, vars: { lstName: '[X, B, C, D, E]', numbers: '[10, 20, 30, 40]' }, focus: { lstName: [0] },
                note: 'Gán theo chỉ số chỉ thay giá trị tại chỗ, không ai bị dịch chuyển.' },
              { line: 3, vars: { lstName: '[X, B, C, D, E]', numbers: '[20, 30, 40]' }, focus: { numbers: [0] },
                note: 'Remove nhận GIÁ TRỊ 10. Xoá xong, mọi phần tử phía sau dồn lên một bậc: 20 từ chỉ số 1 về 0.' },
              { line: 4, vars: { lstName: '[X, B, C, D, E]', numbers: '[30, 40]' }, focus: { numbers: [0] },
                note: 'RemoveAt nhận CHỈ SỐ. Vị trí 0 lúc này đang là 20 chứ không còn là 10 — đây là bẫy hay gặp khi xoá liên tiếp.' },
              { line: 5, vars: { lstName: '[X, B, C, D, E]', numbers: '[]' },
                note: 'RemoveAll quét cả list, xoá mọi phần tử >= 20. Cả 30 và 40 đều bay.' },
              { line: 6, vars: { lstName: '[X, B, C, D, E]', numbers: '[]' },
                note: 'Clear xoá sạch phần tử nhưng đối tượng list vẫn còn — khác với gán numbers = null là bỏ luôn cả list.' },
            ],},
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
      id: 'linq',
      title: '4. LINQ — truy vấn trên mọi collection',
      blocks: [
        {
          type: 'text',
          text: 'List có sẵn Find, FindAll, Exists — nhưng chỉ List mới có, và cũng chỉ làm được vài việc. LINQ là bộ hàm dùng chung cho MỌI collection: List, Dictionary, HashSet, mảng, thậm chí kết quả truy vấn database. Viết một lần, dùng khắp nơi.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Nhớ thêm using',
          text: 'LINQ nằm trong System.Linq. Từ .NET 6 các project mới đã tự thêm sẵn dòng using này nên thường không phải gõ. Thiếu nó thì trình biên dịch báo "không tìm thấy phương thức Where".',
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'LINQ là một dây chuyền: dữ liệu chảy qua từng khâu, mỗi khâu trả ra một tập mới',
            items: [
              { label: 'Nguồn — List<SanPham>', text: 'Toàn bộ 100 sản phẩm trong kho' },
              { label: 'Where — lọc', text: 'Giữ lại sản phẩm còn hàng, còn 60 món' },
              { label: 'OrderBy — sắp xếp', text: 'Xếp theo giá tăng dần' },
              { label: 'Select — chiếu', text: 'Chỉ lấy ra tên, bỏ các thông tin khác' },
              { label: 'Take — cắt', text: 'Lấy 10 món đầu' },
              { label: 'ToList — chốt', text: 'Chạy thật và đổ ra một List mới' },
            ],
          },
        },
        {
          type: 'table',
          head: ['Nhóm', 'Hàm', 'Làm gì'],
          rows: [
            ['Lọc', 'Where(x => …)', 'Giữ lại phần tử thoả điều kiện'],
            ['Chiếu', 'Select(x => …)', 'Biến đổi từng phần tử thành thứ khác'],
            ['Chiếu', 'SelectMany(x => …)', 'Trải phẳng danh sách lồng trong danh sách'],
            ['Sắp xếp', 'OrderBy / OrderByDescending', 'Sắp theo một khoá'],
            ['Sắp xếp', 'ThenBy / ThenByDescending', 'Tiêu chí phụ khi khoá chính bằng nhau'],
            ['Tổng hợp', 'Sum / Average / Max / Min / Count', 'Trả về một con số duy nhất'],
            ['Kiểm tra', 'Any(x => …) / All(x => …)', 'Có phần tử nào thoả / mọi phần tử đều thoả'],
            ['Lấy một', 'First / FirstOrDefault / Last / Single', 'Lấy đúng một phần tử'],
            ['Phân trang', 'Take(n) / Skip(n)', 'Lấy n phần tử đầu / bỏ n phần tử đầu'],
            ['Tập hợp', 'Distinct / Union / Intersect / Except', 'Loại trùng và các phép toán tập hợp'],
            ['Nhóm', 'GroupBy(x => …)', 'Gom phần tử theo khoá'],
            ['Chốt', 'ToList / ToArray / ToDictionary', 'Chạy thật và đổ ra collection mới'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'Ghép chuỗi Where → OrderBy → Select',
            code: `List<int> so = new List<int> { 20, 81, 97, 63, 72, 11 };

var ketQua = so.Where(x => x > 50)        // lọc: giữ số lớn hơn 50
                .OrderBy(x => x)          // sắp xếp tăng dần
                .Select(x => x * 2)       // nhân đôi từng số
                .ToList();                // chốt lại thành List

Console.WriteLine(string.Join(", ", ketQua));`,
            note: 'Mỗi khâu trả ra một tập mới, List gốc không hề bị đụng tới.',
            trace: [
              { line: 1, vars: { so: '[20, 81, 97, 63, 72, 11]' }, note: 'List gốc 6 phần tử.' },
              { line: 3, vars: { so: '[20, 81, 97, 63, 72, 11]', 'sau Where': '[81, 97, 63, 72]' }, focus: { so: [1, 2, 3, 4] }, note: 'Where giữ lại 4 số lớn hơn 50. Số 20 và 11 bị loại.' },
              { line: 4, vars: { so: '[20, 81, 97, 63, 72, 11]', 'sau OrderBy': '[63, 72, 81, 97]' }, note: 'Sắp xếp tăng dần. Chú ý: OrderBy tạo tập MỚI chứ không sắp xếp tại chỗ như List.Sort().' },
              { line: 5, vars: { so: '[20, 81, 97, 63, 72, 11]', 'sau Select': '[126, 144, 162, 194]' }, note: 'Select biến đổi TỪNG phần tử. Số lượng phần tử không đổi, chỉ giá trị đổi.' },
              { line: 6, vars: { so: '[20, 81, 97, 63, 72, 11]', ketQua: '[126, 144, 162, 194]' }, note: 'ToList chốt lại. Tới lúc này dây chuyền mới thật sự chạy — xem phần hoãn thực thi bên dưới.' },
              { line: 8, vars: { so: '[20, 81, 97, 63, 72, 11]', ketQua: '[126, 144, 162, 194]' }, output: ['126, 144, 162, 194'], note: 'List gốc vẫn nguyên vẹn 6 phần tử ban đầu.' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Nhóm hàm tổng hợp — trả về một con số',
            code: `List<int> so = new List<int> { 20, 81, 97, 63, 72, 11 };

int tong      = so.Sum();
double trungBinh = so.Average();
int lonNhat   = so.Max();
int nhoNhat   = so.Min();
int demLon    = so.Count(x => x > 50);       // đếm có điều kiện
int tongLon   = so.Where(x => x > 50).Sum(); // lọc rồi mới cộng`,
            note: 'Các hàm này chạy NGAY lập tức vì phải duyệt hết mới ra được kết quả.',
            trace: [
              { line: 3, vars: { so: '[20, 81, 97, 63, 72, 11]', tong: '344' }, note: 'Sum cộng hết mọi phần tử — thay cho cả một vòng foreach.' },
              { line: 4, vars: { so: '[20, 81, 97, 63, 72, 11]', tong: '344', trungBinh: '57.33' }, note: 'Average tự trả về double nên không dính bẫy chia số nguyên.' },
              { line: 5, vars: { tong: '344', trungBinh: '57.33', lonNhat: '97' }, focus: { so: [2] } },
              { line: 6, vars: { tong: '344', trungBinh: '57.33', lonNhat: '97', nhoNhat: '11' }, focus: { so: [5] } },
              { line: 7, vars: { lonNhat: '97', nhoNhat: '11', demLon: '4' }, focus: { so: [1, 2, 3, 4] }, note: 'Count nhận được cả điều kiện — gọn hơn Where(...).Count().' },
              { line: 8, vars: { demLon: '4', tongLon: '313' }, focus: { so: [1, 2, 3, 4] }, note: 'Lọc trước rồi cộng: 81 + 97 + 63 + 72 = 313. Ghép hai hàm là ra ngay thứ mình cần.' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Kiểm tra và lấy một phần tử',
            code: `List<int> so = new List<int> { 20, 81, 97, 63 };

bool coSoLon = so.Any(x => x > 90);      // True
bool deuDuong = so.All(x => x > 0);      // True

int dauTien = so.First(x => x > 50);     // 81
int khongCo = so.FirstOrDefault(x => x > 999);   // 0 — không ném lỗi
// int loi  = so.First(x => x > 999);    // 💥 InvalidOperationException`,
            note: 'Khi không chắc có kết quả, luôn dùng FirstOrDefault thay cho First.',
            trace: [
              { line: 3, vars: { so: '[20, 81, 97, 63]', coSoLon: 'true' }, focus: { so: [2] }, note: 'Any dừng NGAY khi gặp phần tử đầu tiên thoả — không cần duyệt hết.' },
              { line: 4, vars: { so: '[20, 81, 97, 63]', coSoLon: 'true', deuDuong: 'true' }, note: 'All thì ngược lại: dừng ngay khi gặp phần tử đầu tiên KHÔNG thoả.' },
              { line: 6, vars: { so: '[20, 81, 97, 63]', dauTien: '81' }, focus: { so: [1] }, note: 'First lấy phần tử đầu tiên thoả điều kiện.' },
              { line: 7, vars: { so: '[20, 81, 97, 63]', dauTien: '81', khongCo: '0' }, note: 'Không có số nào lớn hơn 999. FirstOrDefault trả về giá trị mặc định của kiểu: 0 với int, null với string và class.' },
              { line: 8, vars: { dauTien: '81', khongCo: '0' }, note: 'Dòng này nếu bỏ comment sẽ VĂNG LỖI lúc chạy. Đây là bẫy hay gặp nhất khi mới dùng LINQ: First đòi phải có kết quả, không có là ném InvalidOperationException.' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Hoãn thực thi — LINQ không chạy ngay khi bạn viết',
          text: 'Where, Select, OrderBy chỉ MÔ TẢ việc cần làm chứ chưa làm. Chúng chỉ thật sự chạy khi bạn duyệt kết quả bằng foreach hoặc gọi ToList, ToArray, Count, Sum. Đó là lý do sửa dữ liệu nguồn sau khi viết truy vấn vẫn ảnh hưởng tới kết quả.',
        },
        {
          type: 'code',
          sample: {
            title: 'Thấy rõ chuyện hoãn thực thi',
            code: `List<int> so = new List<int> { 1, 2, 3 };

var truyVan = so.Where(x => x > 1);   // mới chỉ MÔ TẢ, chưa chạy

so.Add(10);                            // sửa nguồn SAU khi viết truy vấn

foreach (int x in truyVan)             // tới đây mới thật sự chạy
    Console.Write(x + " ");            // 2 3 10  — có cả số 10!

var chot = so.Where(x => x > 1).ToList();  // ToList chạy ngay, chốt kết quả
so.Add(20);
Console.WriteLine(chot.Count);         // 3 — không có số 20`,
            note: 'Muốn kết quả đứng yên thì gọi ToList ngay, đừng để truy vấn lơ lửng.',
            trace: [
              { line: 1, vars: { so: '[1, 2, 3]' } },
              { line: 3, vars: { so: '[1, 2, 3]', truyVan: 'chưa chạy' }, note: 'Dòng này KHÔNG duyệt phần tử nào cả. Nó chỉ ghi lại "sẽ lọc x > 1 trên biến so".' },
              { line: 5, vars: { so: '[1, 2, 3, 10]', truyVan: 'chưa chạy' }, focus: { so: [3] }, note: 'Thêm 10 vào nguồn. Truy vấn vẫn chưa chạy nên nó chưa biết gì.' },
              { line: 7, vars: { so: '[1, 2, 3, 10]', truyVan: 'đang chạy' }, note: 'foreach kích hoạt truy vấn. Lúc này nó mới nhìn vào so — và so giờ đã có 4 phần tử.' },
              { line: 8, vars: { so: '[1, 2, 3, 10]', x: '2' }, output: ['2 '], focus: { so: [1] } },
              { line: 8, vars: { so: '[1, 2, 3, 10]', x: '3' }, output: ['2 3 '], focus: { so: [2] } },
              { line: 8, vars: { so: '[1, 2, 3, 10]', x: '10' }, output: ['2 3 10 '], focus: { so: [3] }, note: 'Số 10 lọt vào kết quả dù lúc viết truy vấn nó chưa tồn tại — đây chính là hoãn thực thi.' },
              { line: 10, vars: { so: '[1, 2, 3, 10]', chot: '[2, 3, 10]' }, output: ['2 3 10 '], note: 'ToList chạy NGAY và sao chép kết quả ra một List riêng.' },
              { line: 11, vars: { so: '[1, 2, 3, 10, 20]', chot: '[2, 3, 10]' }, output: ['2 3 10 '], focus: { so: [4] }, note: 'Thêm 20 vào nguồn.' },
              { line: 12, vars: { so: '[1, 2, 3, 10, 20]', chot: '[2, 3, 10]' }, output: ['2 3 10 ', '3'], note: 'chot vẫn là 3 phần tử — nó đã được chốt từ trước, không còn dính líu gì tới so nữa.' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'GroupBy — gom nhóm rồi thống kê',
            code: `var donHang = new List<(string khach, decimal tien)>
{
    ("An", 100), ("Bình", 250), ("An", 300), ("Cường", 50), ("Bình", 120)
};

var thongKe = donHang.GroupBy(d => d.khach)
                     .Select(g => new { Khach = g.Key, Tong = g.Sum(d => d.tien) })
                     .OrderByDescending(x => x.Tong)
                     .ToList();

foreach (var x in thongKe)
    Console.WriteLine($"{x.Khach}: {x.Tong}");`,
            note: 'Bốn dòng LINQ thay cho cả một Dictionary đếm thủ công và vòng lặp sắp xếp.',
            trace: [
              { line: 4, vars: { donHang: '[An-100, Bình-250, An-300, Cường-50, Bình-120]' }, note: '5 đơn hàng của 3 khách.' },
              { line: 6, vars: { 'sau GroupBy': '{An: [100, 300], Bình: [250, 120], Cường: [50]}' }, note: 'GroupBy gom các đơn cùng khách vào một nhóm. Mỗi nhóm có Key là tên khách và bên trong là danh sách đơn.' },
              { line: 7, vars: { 'sau Select': '[An-400, Bình-370, Cường-50]' }, note: 'Với mỗi nhóm, g.Sum cộng tiền trong nhóm đó. new { } tạo một kiểu nặc danh gồm hai trường.' },
              { line: 8, vars: { 'sau OrderByDescending': '[An-400, Bình-370, Cường-50]' }, note: 'Sắp giảm dần theo tổng tiền.' },
              { line: 9, vars: { thongKe: '[An-400, Bình-370, Cường-50]' }, note: 'Chốt thành List.' },
              { line: 13, vars: { thongKe: '[An-400, Bình-370, Cường-50]' }, output: ['An: 400', 'Bình: 370', 'Cường: 50'], note: 'Viết tay bằng Dictionary và vòng lặp thì mất khoảng 15 dòng, LINQ gói lại còn 4.' },
            ],
          },
        },
        {
          type: 'table',
          head: ['Muốn làm gì', 'Cách của List', 'Cách LINQ', 'Nên dùng'],
          rows: [
            ['Tìm một phần tử', 'Find(x => …)', 'FirstOrDefault(x => …)', 'LINQ — dùng được cho mọi collection'],
            ['Tìm tất cả', 'FindAll(x => …)', 'Where(x => …).ToList()', 'Tuỳ, kết quả như nhau'],
            ['Kiểm tra tồn tại', 'Exists(x => …)', 'Any(x => …)', 'LINQ'],
            ['Sắp xếp', 'Sort() — sửa tại chỗ', 'OrderBy() — trả tập mới', 'OrderBy khi không muốn đụng bản gốc'],
            ['Xoá theo điều kiện', 'RemoveAll(x => …)', 'không có', 'RemoveAll — LINQ không sửa dữ liệu'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'LINQ chỉ đọc, không sửa',
          text: 'Mọi hàm LINQ đều trả về tập MỚI, không bao giờ đụng vào collection gốc. Muốn thêm hay xoá thật thì vẫn phải dùng Add, Remove, RemoveAll của List.',
        },
      ],
    },
    {
      id: 'dictionary',
      title: '5. Dictionary — tra cứu theo khoá',
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
          
            trace: [

              { line: 5, vars: { data: '{toan: 8, ly: 7}' }, note: 'Dictionary lưu theo cặp khoá-giá trị, khoá do ta tự đặt chứ không phải chỉ số tăng dần.' },
              { line: 7, vars: { data: '{toan: 8, ly: 7, hoa: 9}' }, note: 'Khoá "hoa" chưa có nên phép gán tạo cặp mới. Nếu khoá đã tồn tại thì dòng này ghi đè giá trị cũ.' },
              { line: 8, vars: { data: '{toan: 8, ly: 7, hoa: 9}' }, output: ['8'], note: 'Đọc theo khoá gần như tức thì, không phải duyệt như List.' },
              { line: 10, vars: { data: '{toan: 8, ly: 7, hoa: 9}' }, output: ['8'], note: 'ContainsKey("van") trả về false nên bỏ qua dòng in. Đọc thẳng data["van"] ở đây sẽ văng KeyNotFoundException.' },
              { line: 13, vars: { data: '{toan: 8, ly: 7, hoa: 9}', diemLy: '7' }, output: ['8'], note: 'TryGetValue vừa kiểm tra vừa lấy giá trị ra — chỉ tra cứu một lần thay vì hai.' },
              { line: 14, vars: { data: '{toan: 8, ly: 7, hoa: 9}', diemLy: '7' }, output: ['8', '7'] },
              { line: 17, vars: { data: '{toan: 8, ly: 7, hoa: 9}', item: 'toan = 8' }, output: ['8', '7', 'toan = 8'] },
              { line: 17, vars: { data: '{toan: 8, ly: 7, hoa: 9}', item: 'hoa = 9' }, output: ['8', '7', 'toan = 8', 'ly = 7', 'hoa = 9'] },
              { line: 19, vars: { data: '{toan: 8, hoa: 9}' }, output: ['8', '7', 'toan = 8', 'ly = 7', 'hoa = 9'], note: 'Xoá theo khoá. Khác List: các cặp còn lại không bị dịch chỉ số vì Dictionary vốn không có chỉ số.' },
            ],},
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
      title: '6. HashSet và Array',
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
          
            trace: [

              { line: 1, vars: { set: '[1, 2, 3]' } },
              { line: 3, vars: { set: '[1, 2, 3]', 'kết quả Add': 'false' }, note: 'Số 3 đã có sẵn nên Add từ chối và trả về false. Tập hợp không đổi — đây chính là cách loại trùng chỉ bằng một dòng.' },
              { line: 4, vars: { set: '[1, 2, 3]', 'kết quả Add': 'false' }, output: ['3'], note: 'Vẫn là 3 phần tử chứ không phải 4.' },
              { line: 5, vars: { set: '[1, 2, 3]' }, output: ['3', 'True'], note: 'Contains trên HashSet gần như tức thì, còn Contains trên List phải duyệt lần lượt.' },
              { line: 8, vars: { set: '[1, 2, 3]', co: '[1, 2, 2, 3, 3, 3]' }, output: ['3', 'True'], note: 'List gốc có 6 phần tử, trong đó 2 lặp hai lần và 3 lặp ba lần.' },
              { line: 9, vars: { set: '[1, 2, 3]', co: '[1, 2, 2, 3, 3, 3]', khongTrung: '[1, 2, 3]' }, output: ['3', 'True'], note: 'Đổ List vào HashSet rồi đổ ngược ra: mọi bản trùng tự biến mất.' },
            ],},
        },
        {
          type: 'code',
          sample: {
            title: 'Array — kích thước cố định',
            code: `string[] names = new string[5] { "A", "B", "C", "D", "E" };

Console.WriteLine(names.Length);   // 5 — dùng Length, không phải Count
names[0] = "X";                    // sửa được

// Không có Add hay Remove — bộ nhớ đã cấp phát cố định`,
          
            trace: [

              { line: 1, vars: { names: '→ 0x500' }, refs: { names: '0x500' }, heap: { '0x500': '[A, B, C, D, E]' }, note: 'Mảng cấp phát đúng 5 ô ngay lúc tạo, không co giãn được.' },
              { line: 3, vars: { names: '→ 0x500' }, refs: { names: '0x500' }, heap: { '0x500': '[A, B, C, D, E]' }, output: ['5'], note: 'Mảng dùng Length, còn List và HashSet dùng Count — chỗ này hay gõ nhầm.' },
              { line: 4, vars: { names: '→ 0x500' }, refs: { names: '0x500' }, heap: { '0x500': '[X, B, C, D, E]' }, focus: { '0x500': [0] }, output: ['5'], note: 'Sửa giá trị một ô thì được, nhưng không có Add hay Remove vì số ô đã khoá cứng từ lúc cấp phát.' },
            ],},
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
          
            trace: [

              { line: 1, vars: { array: '[1, 2, 2, 3]', list: '[1, 2, 2, 3]' }, note: 'ToList tạo một List MỚI, mảng gốc vẫn còn nguyên.' },
              { line: 2, vars: { array: '[1, 2, 2, 3]', list: '[1, 2, 2, 3]', array2: '[1, 2, 2, 3]' }, note: 'Và ngược lại — mỗi lần chuyển là một bản sao độc lập.' },
              { line: 3, vars: { list: '[1, 2, 2, 3]', set2: '[1, 2, 3]' }, note: 'Đổ vào HashSet là phần tử trùng tự rụng: hai số 2 còn lại một.' },
              { line: 4, vars: { list: '[1, 2, 2, 3]', set2: '[1, 2, 3]', back: '[1, 2, 3]' }, note: 'Đi vòng List → HashSet → List chính là mẹo loại trùng chỉ bằng một dòng.' },
              { line: 7, vars: { data: '{toan: 8, ly: 7}', pairs: '[toan=8, ly=7]' }, note: 'Dictionary chuyển thành List các cặp KeyValuePair, lúc đó mới có chỉ số để sắp xếp.' },
            ],},
        },
      ],
    },

    {
      id: 'thuat-toan',
      title: '7. Chọn đúng cấu trúc để tối ưu thuật toán',
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
          
            trace: [
              { line: 1, vars: { nums: '[2, 7, 11, 15]', target: '9' } },
              { line: 6, vars: { nums: '[2, 7, 11, 15]', target: '9', daGap: '{}' }, note: 'Dictionary rỗng, sẽ dùng để nhớ những số đã đi qua.' },
              { line: 8, vars: { nums: '[2, 7, 11, 15]', target: '9', daGap: '{}', i: '0' } },
              { line: 10, vars: { nums: '[2, 7, 11, 15]', target: '9', daGap: '{}', i: '0', can: '7' }, note: 'Đang đứng ở số 2, cần thêm 9 − 2 = 7 nữa mới đủ target.' },
              { line: 11, vars: { nums: '[2, 7, 11, 15]', target: '9', daGap: '{}', i: '0', can: '7' }, note: 'daGap chưa có số 7 nào — chưa tìm thấy cặp.' },
              { line: 16, vars: { nums: '[2, 7, 11, 15]', target: '9', daGap: '{2: 0}', i: '0', can: '7' }, note: 'Ghi nhớ: giá trị 2 nằm ở chỉ số 0.' },
              { line: 8, vars: { nums: '[2, 7, 11, 15]', target: '9', daGap: '{2: 0}', i: '1' } },
              { line: 10, vars: { nums: '[2, 7, 11, 15]', target: '9', daGap: '{2: 0}', i: '1', can: '2' }, note: 'Đang đứng ở số 7, cần thêm 9 − 7 = 2.' },
              { line: 11, vars: { nums: '[2, 7, 11, 15]', target: '9', daGap: '{2: 0}', i: '1', can: '2' }, note: 'daGap CÓ số 2! Vậy là tìm được cặp.' },
              { line: 13, vars: { nums: '[2, 7, 11, 15]', target: '9', daGap: '{2: 0}', i: '1', can: '2' }, output: ['[0, 1]'], note: 'Chỉ duyệt một lượt là xong, thay vì hai vòng lặp lồng nhau n × n.' },
            ],},
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
          
            trace: [
              { line: 1, vars: { prices: '[7, 1, 5, 3, 6, 4]' } },
              { line: 3, vars: { prices: '[7, 1, 5, 3, 6, 4]', giaThapNhat: '∞', laiCaoNhat: '0' } },
              { line: 6, vars: { prices: '[7, 1, 5, 3, 6, 4]', giaThapNhat: '7', laiCaoNhat: '0', gia: '7' }, note: 'Ngày 1 giá 7 — rẻ nhất tới giờ, ghi nhớ làm điểm mua.' },
              { line: 8, vars: { prices: '[7, 1, 5, 3, 6, 4]', giaThapNhat: '1', laiCaoNhat: '0', gia: '1' }, note: 'Ngày 2 giá 1 còn rẻ hơn — dời điểm mua xuống đây.' },
              { line: 9, vars: { prices: '[7, 1, 5, 3, 6, 4]', giaThapNhat: '1', laiCaoNhat: '4', gia: '5' }, note: 'Ngày 3 giá 5, bán được lãi 5 − 1 = 4.' },
              { line: 9, vars: { prices: '[7, 1, 5, 3, 6, 4]', giaThapNhat: '1', laiCaoNhat: '4', gia: '3' }, note: 'Ngày 4 lãi chỉ 2, nhỏ hơn 4 nên giữ nguyên kỷ lục.' },
              { line: 9, vars: { prices: '[7, 1, 5, 3, 6, 4]', giaThapNhat: '1', laiCaoNhat: '5', gia: '6' }, note: 'Ngày 5 giá 6, lãi 5 — kỷ lục mới.' },
              { line: 9, vars: { prices: '[7, 1, 5, 3, 6, 4]', giaThapNhat: '1', laiCaoNhat: '5', gia: '4' }, note: 'Ngày 6 lãi 3, không hơn được.' },
              { line: 11, vars: { prices: '[7, 1, 5, 3, 6, 4]', giaThapNhat: '1', laiCaoNhat: '5' }, output: ['5'], note: 'Mua ngày 2 giá 1, bán ngày 5 giá 6. Chỉ một lượt duyệt, không cần thử mọi cặp ngày.' },
            ],},
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
          
            trace: [

              { line: 2, vars: { nums: '[100, 4, 200, 1, 3, 2]', set: '[100, 4, 200, 1, 3, 2]' }, note: 'Đưa vào HashSet để hỏi "số này có tồn tại không" gần như tức thì.' },
              { line: 5, vars: { set: '[100, 4, 200, 1, 3, 2]', x: '100', daiNhat: '0' }, focus: { set: [0] } },
              { line: 7, vars: { set: '[100, 4, 200, 1, 3, 2]', x: '100', daiNhat: '0' }, focus: { set: [0] }, note: 'set không chứa 99 nên 100 LÀ đầu một chuỗi — không bỏ qua.' },
              { line: 10, vars: { set: '[100, 4, 200, 1, 3, 2]', x: '100', hienTai: '100', dai: '1', daiNhat: '1' }, note: 'Không có 101 nên chuỗi dừng ở độ dài 1.' },
              { line: 7, vars: { set: '[100, 4, 200, 1, 3, 2]', x: '4', daiNhat: '1' }, focus: { set: [1] }, note: 'Tới số 4: set CÓ chứa 3 nên 4 không phải đầu chuỗi — continue, bỏ qua ngay.' },
              { line: 7, vars: { set: '[100, 4, 200, 1, 3, 2]', x: '1', daiNhat: '1' }, focus: { set: [3] }, note: 'Tới số 1: không có 0 nên đây là đầu chuỗi thật.' },
              { line: 10, vars: { set: '[100, 4, 200, 1, 3, 2]', x: '1', hienTai: '2', dai: '2' }, focus: { set: [5] }, note: 'Có 2 — đi tiếp.' },
              { line: 10, vars: { set: '[100, 4, 200, 1, 3, 2]', x: '1', hienTai: '3', dai: '3' }, focus: { set: [4] }, note: 'Có 3 — đi tiếp.' },
              { line: 10, vars: { set: '[100, 4, 200, 1, 3, 2]', x: '1', hienTai: '4', dai: '4' }, focus: { set: [1] }, note: 'Có 4 — đi tiếp. Không có 5 nên dừng.' },
              { line: 11, vars: { set: '[100, 4, 200, 1, 3, 2]', x: '1', dai: '4', daiNhat: '4' }, note: 'Kỷ lục mới.' },
              { line: 13, vars: { daiNhat: '4' }, output: ['4'], note: 'Nhờ mẹo bỏ qua số không phải đầu chuỗi, mỗi số chỉ bị chạm đúng một lần — cả thuật toán chạy trong O(n) chứ không phải O(n²).' },
            ],},
        },
      ],
    },

    {
      id: 'var-object-dynamic',
      title: '8. var, object và dynamic',
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
          
            trace: [

              { line: 1, vars: { a: '10 (kiểu int)' }, note: 'var không phải là "kiểu động" — trình biên dịch nhìn giá trị 10 rồi chốt luôn a là int. Dòng 2 nếu bỏ comment sẽ lỗi ngay lúc build.' },
              { line: 4, vars: { a: '10 (kiểu int)', b: '10 (kiểu object)' }, note: 'object chứa được mọi thứ, nhưng lúc lấy ra thì C# chỉ biết nó là object.' },
              { line: 6, vars: { a: '10 (kiểu int)', b: '10 (kiểu object)' }, output: ['15'], note: 'Phải ép (int)b thì mới cộng được — dòng 5 nếu bỏ comment sẽ lỗi biên dịch.' },
              { line: 8, vars: { a: '10', b: '10', c: '10 (kiểu dynamic)' }, output: ['15'], note: 'dynamic hoãn mọi kiểm tra kiểu tới lúc chạy.' },
              { line: 9, vars: { c: '10 (kiểu dynamic)' }, output: ['15', '15'], note: 'Cộng được mà không cần ép kiểu.' },
              { line: 10, vars: { c: '"abc" (kiểu dynamic)' }, output: ['15', '15'], note: 'Cùng một biến giờ đổi hẳn sang chuỗi — var không làm được điều này.' },
              { line: 11, vars: { c: '"abc" (kiểu dynamic)' }, output: ['15', '15', 'abc5'], note: 'Trình biên dịch im lặng cho qua, phép + trở thành nối chuỗi. Bug kiểu này chỉ lộ ra khi chạy — đó là lý do nên hạn chế dynamic.' },
            ],},
        },
      ],
    },
  ],


  exercises: BAI_TAP_COLLECTION,
}

export default buoi08
