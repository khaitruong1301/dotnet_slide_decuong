import type { Exercise } from './types'

/**
 * Bộ bài tập collection — 20 bài mỗi cấp độ, viết theo lối LeetCode:
 * đề bài · chữ ký hàm · ràng buộc · test case mẫu.
 * Tách riêng khỏi buoi08.ts cho dễ tìm và dễ bổ sung.
 */

const coBan: Exercise[] = [
  { id: 'b8-e01', level: 'Cơ bản', title: 'In danh sách thành chuỗi',
    requirement: 'Cho một mảng số nguyên nums. Trả về chuỗi gồm các phần tử cách nhau bằng dấu phẩy và một khoảng trắng.',
    signature: 'string InDanhSach(int[] nums)',
    constraints: ['0 <= nums.Length <= 1000'],
    examples: [
      { input: 'nums = [20, 81, 97]', output: '"20, 81, 97"' },
      { input: 'nums = []', output: '""' },
    ],
    hint: 'string.Join(", ", nums)' },

  { id: 'b8-e02', level: 'Cơ bản', title: 'Đếm số phần tử',
    requirement: 'Cho một List<int>. Trả về số lượng phần tử hiện có trong danh sách.',
    signature: 'int DemPhanTu(List<int> lst)',
    constraints: ['0 <= lst.Count <= 100000'],
    examples: [
      { input: 'lst = [10, 20, 30]', output: '3' },
      { input: 'lst = []', output: '0' },
    ],
    hint: 'List dùng .Count, mảng dùng .Length — đừng nhầm hai cái.' },

  { id: 'b8-e03', level: 'Cơ bản', title: 'Thêm phần tử vào cuối',
    requirement: 'Cho một List<int> và một mảng các giá trị cần thêm. Thêm tất cả giá trị đó vào cuối danh sách rồi trả về danh sách kết quả.',
    signature: 'List<int> ThemVaoCuoi(List<int> lst, int[] themVao)',
    constraints: ['0 <= lst.Count, themVao.Length <= 100000'],
    examples: [
      { input: 'lst = [10, 20, 30], themVao = [40, 50]', output: '[10, 20, 30, 40, 50]' },
      { input: 'lst = [], themVao = [1]', output: '[1]' },
    ],
    hint: 'Add cho một phần tử, AddRange cho nhiều phần tử.' },

  { id: 'b8-e04', level: 'Cơ bản', title: 'Chèn phần tử vào vị trí',
    requirement: 'Cho một List<string>, một vị trí viTri và một giá trị. Chèn giá trị vào đúng vị trí đó và trả về danh sách sau khi chèn.',
    signature: 'List<string> ChenVaoViTri(List<string> lst, int viTri, string giaTri)',
    constraints: ['0 <= viTri <= lst.Count'],
    examples: [
      { input: 'lst = ["A", "B", "C"], viTri = 1, giaTri = "X"', output: '["A", "X", "B", "C"]', explain: 'Mọi phần tử từ vị trí 1 trở đi bị đẩy lùi một bậc.' },
      { input: 'lst = ["A"], viTri = 0, giaTri = "Z"', output: '["Z", "A"]' },
    ] },

  { id: 'b8-e05', level: 'Cơ bản', title: 'Xoá theo giá trị và theo vị trí',
    requirement: 'Cho một List<int>, một giá trị cần xoá và một vị trí cần xoá. Xoá lần lượt phần tử mang giá trị đó (chỉ lần xuất hiện đầu tiên), rồi xoá phần tử tại vị trí đã cho trên danh sách vừa thu được.',
    signature: 'List<int> XoaHaiKieu(List<int> lst, int giaTri, int viTri)',
    constraints: ['Đảm bảo viTri hợp lệ sau lần xoá thứ nhất'],
    examples: [
      { input: 'lst = [20, 81, 97, 63], giaTri = 97, viTri = 0', output: '[81, 63]', explain: 'Xoá 97 được [20, 81, 63], rồi xoá vị trí 0 được [81, 63].' },
    ],
    hint: 'Remove nhận GIÁ TRỊ, RemoveAt nhận CHỈ SỐ.' },

  { id: 'b8-e06', level: 'Cơ bản', title: 'Đổi phần tử đầu và cuối',
    requirement: 'Cho một List<string> và hai giá trị mới. Thay phần tử đầu tiên bằng giá trị thứ nhất, phần tử cuối cùng bằng giá trị thứ hai.',
    signature: 'List<string> DoiDauCuoi(List<string> lst, string dau, string cuoi)',
    constraints: ['lst.Count >= 1'],
    examples: [
      { input: 'lst = ["A", "B", "C", "D", "E"], dau = "X", cuoi = "Z"', output: '["X", "B", "C", "D", "Z"]' },
      { input: 'lst = ["A"], dau = "X", cuoi = "Z"', output: '["Z"]', explain: 'Danh sách một phần tử thì đầu cũng là cuối, phép gán sau thắng.' },
    ],
    hint: 'Phần tử cuối: lst[lst.Count - 1] hoặc lst[^1].' },

  { id: 'b8-e07', level: 'Cơ bản', title: 'Tổng danh sách',
    requirement: 'Cho một mảng số nguyên nums. Trả về tổng tất cả phần tử.',
    signature: 'long TinhTong(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000', '-10000 <= nums[i] <= 10000'],
    examples: [
      { input: 'nums = [20, 81, 97, 63, 72, 11, 20, 15, 33, 15, 41, 20]', output: '488' },
      { input: 'nums = []', output: '0' },
    ] },

  { id: 'b8-e08', level: 'Cơ bản', title: 'Trung bình cộng',
    requirement: 'Cho một mảng số nguyên nums. Trả về trung bình cộng của các phần tử, làm tròn 2 chữ số thập phân. Mảng rỗng trả về 0.',
    signature: 'double TrungBinh(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [10, 20, 30, 40]', output: '25' },
      { input: 'nums = [1, 2]', output: '1.5', explain: 'Phải ép về double trước khi chia, không thì 3 / 2 ra 1.' },
    ] },

  { id: 'b8-e09', level: 'Cơ bản', title: 'Lớn nhất và nhỏ nhất',
    requirement: 'Cho một mảng số nguyên nums không rỗng. Trả về cặp (lớn nhất, nhỏ nhất). Không dùng Max và Min có sẵn.',
    signature: '(int max, int min) TimMaxMin(int[] nums)',
    constraints: ['1 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 81, 97, 63, 11]', output: '(97, 11)' },
      { input: 'nums = [5]', output: '(5, 5)' },
    ] },

  { id: 'b8-e10', level: 'Cơ bản', title: 'Đếm phần tử lớn hơn mốc',
    requirement: 'Cho một mảng số nguyên nums và một giá trị moc. Trả về số lượng phần tử lớn hơn moc.',
    signature: 'int DemLonHon(int[] nums, int moc)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 81, 97, 63, 72, 11, 20, 15, 33, 15, 41, 20], moc = 30', output: '5', explain: 'Các số 81, 97, 63, 72, 41.' },
      { input: 'nums = [1, 2], moc = 10', output: '0' },
    ] },

  { id: 'b8-e11', level: 'Cơ bản', title: 'Tổng các số thoả điều kiện',
    requirement: 'Cho một mảng số nguyên nums và giá trị moc. Trả về tổng các phần tử lớn hơn moc.',
    signature: 'long TongLonHon(int[] nums, int moc)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 81, 97, 63, 72, 11], moc = 50', output: '313', explain: '81 + 97 + 63 + 72 = 313.' },
      { input: 'nums = [1, 2, 3], moc = 100', output: '0' },
    ] },

  { id: 'b8-e12', level: 'Cơ bản', title: 'Lọc số chẵn',
    requirement: 'Cho một mảng số nguyên nums. Trả về mảng chỉ gồm các số chẵn, giữ nguyên thứ tự xuất hiện.',
    signature: 'int[] LocSoChan(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 81, 97, 72, 11, 20]', output: '[20, 72, 20]' },
      { input: 'nums = [1, 3, 5]', output: '[]' },
    ] },

  { id: 'b8-e13', level: 'Cơ bản', title: 'Tìm vị trí phần tử',
    requirement: 'Cho một mảng số nguyên nums và giá trị target. Trả về chỉ số xuất hiện đầu tiên của target, không tìm thấy trả về -1.',
    signature: 'int TimViTri(int[] nums, int target)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 81, 97, 15, 15], target = 15', output: '3' },
      { input: 'nums = [1, 2, 3], target = 9', output: '-1' },
    ] },

  { id: 'b8-e14', level: 'Cơ bản', title: 'Sắp xếp tăng và giảm',
    requirement: 'Cho một mảng số nguyên nums. Trả về cặp gồm mảng đã sắp xếp tăng dần và mảng đã sắp xếp giảm dần. Không được làm thay đổi mảng gốc.',
    signature: '(int[] tang, int[] giam) SapXepHaiChieu(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [3, 1, 4, 1, 5]', output: '([1, 1, 3, 4, 5], [5, 4, 3, 1, 1])' },
    ],
    hint: 'Sao chép sang List mới trước khi Sort, nếu không mảng gốc bị đổi theo.' },

  { id: 'b8-e15', level: 'Cơ bản', title: 'Đảo ngược danh sách',
    requirement: 'Cho một mảng chuỗi. Trả về mảng mới với thứ tự đảo ngược. Tự cài bằng vòng lặp, không dùng Reverse.',
    signature: 'string[] DaoNguoc(string[] arr)',
    constraints: ['0 <= arr.Length <= 100000'],
    examples: [
      { input: 'arr = ["A", "B", "C", "D"]', output: '["D", "C", "B", "A"]' },
      { input: 'arr = []', output: '[]' },
    ] },

  { id: 'b8-e16', level: 'Cơ bản', title: 'Lọc sang danh sách mới',
    requirement: 'Cho một mảng số nguyên nums và giá trị moc. Trả về List mới chỉ chứa các phần tử nhỏ hơn moc.',
    signature: 'List<int> LocNhoHon(int[] nums, int moc)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 81, 97, 63, 11, 15], moc = 50', output: '[20, 11, 15]' },
      { input: 'nums = [90, 95], moc = 50', output: '[]' },
    ] },

  { id: 'b8-e17', level: 'Cơ bản', title: 'Lọc chuỗi theo độ dài',
    requirement: 'Cho một mảng chuỗi và độ dài tối thiểu. Trả về mảng các chuỗi dài hơn độ dài đó.',
    signature: 'string[] LocTheoDoDai(string[] arr, int doDai)',
    constraints: ['0 <= arr.Length <= 10000'],
    examples: [
      { input: 'arr = ["apple","banana","kiwi","mango"], doDai = 5', output: '["banana"]' },
      { input: 'arr = ["kiwi"], doDai = 10', output: '[]' },
    ] },

  { id: 'b8-e18', level: 'Cơ bản', title: 'Dictionary cơ bản',
    requirement: 'Cho một Dictionary<string, int> lưu điểm các môn và tên một môn. Trả về điểm của môn đó, không có môn thì trả về -1.',
    signature: 'int LayDiem(Dictionary<string, int> diem, string mon)',
    constraints: ['0 <= diem.Count <= 100000'],
    examples: [
      { input: 'diem = {"toan": 8, "ly": 7}, mon = "toan"', output: '8' },
      { input: 'diem = {"toan": 8}, mon = "van"', output: '-1', explain: 'Đọc thẳng diem["van"] sẽ ném KeyNotFoundException.' },
    ],
    hint: 'TryGetValue an toàn hơn ContainsKey rồi đọc lại lần nữa.' },

  { id: 'b8-e19', level: 'Cơ bản', title: 'Duyệt Dictionary',
    requirement: 'Cho một Dictionary<string, string>. Trả về mảng chuỗi, mỗi phần tử có dạng "key = value", theo đúng thứ tự duyệt.',
    signature: 'string[] LietKe(Dictionary<string, string> dict)',
    constraints: ['0 <= dict.Count <= 10000'],
    examples: [
      { input: 'dict = {"VN": "Việt Nam", "JP": "Nhật Bản"}', output: '["VN = Việt Nam", "JP = Nhật Bản"]' },
    ],
    hint: 'foreach (var item in dict) rồi dùng item.Key và item.Value.' },

  { id: 'b8-e20', level: 'Cơ bản', title: 'Chuyển đổi giữa các collection',
    requirement: 'Cho một mảng số nguyên có phần tử trùng. Trả về số phần tử khác nhau bằng cách đưa qua HashSet.',
    signature: 'int DemKhacNhau(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [1, 2, 2, 3, 3, 3]', output: '3' },
      { input: 'nums = []', output: '0' },
    ],
    hint: 'Array dùng .Length, còn List và HashSet dùng .Count.' },
]

const trungBinh: Exercise[] = [
  { id: 'b8-e21', level: 'Trung bình', title: 'Loại phần tử trùng lặp',
    requirement: 'Cho một mảng số nguyên nums. Trả về mảng đã loại bỏ phần tử trùng, giữ nguyên thứ tự xuất hiện đầu tiên của mỗi giá trị.',
    signature: 'int[] LoaiTrung(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [1, 2, 2, 3, 3, 3, 1]', output: '[1, 2, 3]' },
      { input: 'nums = [5, 5, 5]', output: '[5]' },
    ],
    hint: 'HashSet để nhớ đã gặp, List để giữ thứ tự.' },

  { id: 'b8-e22', level: 'Trung bình', title: 'Đếm tần suất phần tử',
    requirement: 'Cho một mảng số nguyên nums. Trả về Dictionary ánh xạ mỗi giá trị sang số lần nó xuất hiện.',
    signature: 'Dictionary<int, int> DemTanSuat(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 15, 20, 33, 15, 20]', output: '{20: 3, 15: 2, 33: 1}' },
      { input: 'nums = []', output: '{}' },
    ] },

  { id: 'b8-e23', level: 'Trung bình', title: 'Phần tử xuất hiện nhiều nhất',
    requirement: 'Cho một mảng số nguyên nums. Trả về phần tử xuất hiện nhiều lần nhất. Nếu hoà thì trả về phần tử gặp trước trong mảng.',
    signature: 'int XuatHienNhieuNhat(int[] nums)',
    constraints: ['1 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 15, 20, 33, 15, 20]', output: '20', explain: '20 xuất hiện 3 lần.' },
      { input: 'nums = [1, 2, 2, 1]', output: '1', explain: 'Cùng 2 lần, nhưng 1 gặp trước.' },
    ] },

  { id: 'b8-e24', level: 'Trung bình', title: 'Phần tử chỉ xuất hiện một lần',
    requirement: 'Cho một mảng số nguyên nums. Trả về mảng các phần tử xuất hiện đúng một lần, theo thứ tự xuất hiện trong mảng gốc.',
    signature: 'int[] ChiMotLan(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [4, 3, 4, 5, 3, 7]', output: '[5, 7]' },
      { input: 'nums = [1, 1]', output: '[]' },
    ] },

  { id: 'b8-e25', level: 'Trung bình', title: 'Hợp hai danh sách',
    requirement: 'Cho hai mảng số nguyên a và b. Trả về mảng chứa tất cả giá trị xuất hiện ở ít nhất một trong hai mảng, không trùng lặp, theo thứ tự gặp đầu tiên.',
    signature: 'int[] Hop(int[] a, int[] b)',
    constraints: ['0 <= a.Length, b.Length <= 100000'],
    examples: [
      { input: 'a = [1, 2, 3], b = [3, 4, 5]', output: '[1, 2, 3, 4, 5]' },
      { input: 'a = [], b = [1, 1]', output: '[1]' },
    ] },

  { id: 'b8-e26', level: 'Trung bình', title: 'Giao hai danh sách',
    requirement: 'Cho hai mảng số nguyên a và b. Trả về mảng các giá trị có mặt ở cả hai mảng, không trùng lặp.',
    signature: 'int[] Giao(int[] a, int[] b)',
    constraints: ['0 <= a.Length, b.Length <= 100000', 'Lời giải nên chạy trong O(n + m)'],
    examples: [
      { input: 'a = [1, 2, 3, 4], b = [3, 4, 5]', output: '[3, 4]' },
      { input: 'a = [1], b = [2]', output: '[]' },
    ],
    hint: 'Đưa mảng thứ hai vào HashSet để kiểm tra tồn tại gần như tức thì.' },

  { id: 'b8-e27', level: 'Trung bình', title: 'Hiệu hai danh sách',
    requirement: 'Cho hai mảng số nguyên a và b. Trả về mảng các giá trị có trong a nhưng không có trong b, không trùng lặp.',
    signature: 'int[] Hieu(int[] a, int[] b)',
    constraints: ['0 <= a.Length, b.Length <= 100000'],
    examples: [
      { input: 'a = [1, 2, 3, 4], b = [3, 4]', output: '[1, 2]' },
      { input: 'a = [1, 1, 2], b = [1]', output: '[2]' },
    ] },

  { id: 'b8-e28', level: 'Trung bình', title: 'Tách chẵn lẻ',
    requirement: 'Cho một mảng số nguyên nums. Trả về cặp gồm mảng các số chẵn và mảng các số lẻ, mỗi mảng giữ nguyên thứ tự ban đầu.',
    signature: '(int[] chan, int[] le) TachChanLe(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [1, 2, 3, 4, 5, 6]', output: '([2, 4, 6], [1, 3, 5])' },
      { input: 'nums = [2, 4]', output: '([2, 4], [])' },
    ] },

  { id: 'b8-e29', level: 'Trung bình', title: 'Sắp xếp chuỗi theo độ dài',
    requirement: 'Cho một mảng chuỗi. Trả về mảng đã sắp theo độ dài tăng dần; các chuỗi cùng độ dài thì xếp theo thứ tự bảng chữ cái.',
    signature: 'string[] SapTheoDoDai(string[] arr)',
    constraints: ['0 <= arr.Length <= 10000'],
    examples: [
      { input: 'arr = ["apple","banana","kiwi","mango","grape"]', output: '["kiwi", "apple", "grape", "mango", "banana"]' },
      { input: 'arr = ["bb", "aa"]', output: '["aa", "bb"]' },
    ] },

  { id: 'b8-e30', level: 'Trung bình', title: 'Phần tử lớn thứ hai',
    requirement: 'Cho một mảng số nguyên nums. Trả về giá trị lớn thứ hai, tính theo giá trị khác nhau. Không tồn tại thì trả về int.MinValue.',
    signature: 'int LonThuHai(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 97, 81, 97, 63]', output: '81', explain: 'Hai giá trị 97 chỉ tính một lần.' },
      { input: 'nums = [5, 5, 5]', output: 'int.MinValue', explain: 'Chỉ có một giá trị khác nhau nên không có hạng nhì.' },
    ] },

  { id: 'b8-e31', level: 'Trung bình', title: 'Xoay mảng sang phải k bước',
    requirement: 'Cho một mảng số nguyên nums và số nguyên không âm k. Trả về mảng sau khi xoay sang phải k bước.',
    signature: 'int[] Xoay(int[] nums, int k)',
    constraints: ['0 <= nums.Length <= 100000', '0 <= k <= 1_000_000_000'],
    examples: [
      { input: 'nums = [1, 2, 3, 4, 5], k = 2', output: '[4, 5, 1, 2, 3]' },
      { input: 'nums = [1, 2, 3], k = 3', output: '[1, 2, 3]', explain: 'k bằng đúng độ dài thì mảng trở về như cũ — nhớ lấy k % n.' },
    ],
    hint: 'Chỉ số mới của phần tử i là (i + k) % n.' },

  { id: 'b8-e32', level: 'Trung bình', title: 'Trộn xen kẽ hai mảng',
    requirement: 'Cho hai mảng số nguyên a và b. Trả về mảng lấy xen kẽ từng phần tử của hai mảng; mảng nào dài hơn thì phần dư nối vào cuối.',
    signature: 'int[] TronXenKe(int[] a, int[] b)',
    constraints: ['0 <= a.Length, b.Length <= 100000'],
    examples: [
      { input: 'a = [1, 2, 3], b = [7, 8, 9, 10, 11]', output: '[1, 7, 2, 8, 3, 9, 10, 11]' },
      { input: 'a = [], b = [1, 2]', output: '[1, 2]' },
    ] },

  { id: 'b8-e33', level: 'Trung bình', title: 'Hai mảng là hoán vị của nhau',
    requirement: 'Cho hai mảng số nguyên a và b. Trả về true nếu chúng chứa cùng các giá trị với cùng số lần xuất hiện, bất kể thứ tự.',
    signature: 'bool LaHoanVi(int[] a, int[] b)',
    constraints: ['0 <= a.Length, b.Length <= 100000'],
    examples: [
      { input: 'a = [1, 2, 2, 3], b = [3, 2, 1, 2]', output: 'true' },
      { input: 'a = [1, 2], b = [1, 2, 2]', output: 'false' },
    ],
    hint: 'Đếm tần suất bằng Dictionary rồi so hai bảng đếm.' },

  { id: 'b8-e34', level: 'Trung bình', title: 'Đếm tần suất ký tự',
    requirement: 'Cho một chuỗi s. Trả về Dictionary ánh xạ mỗi ký tự sang số lần xuất hiện, bỏ qua khoảng trắng và không phân biệt hoa thường.',
    signature: 'Dictionary<char, int> DemKyTu(string s)',
    constraints: ['0 <= s.Length <= 100000'],
    examples: [
      { input: 's = "Hello World"', output: "{'h':1, 'e':1, 'l':3, 'o':2, 'w':1, 'r':1, 'd':1}" },
      { input: 's = "   "', output: '{}' },
    ] },

  { id: 'b8-e35', level: 'Trung bình', title: 'Đếm tần suất từ',
    requirement: 'Cho một đoạn văn s. Trả về danh sách các cặp (từ, số lần) sắp xếp theo số lần giảm dần; số lần bằng nhau thì xếp theo bảng chữ cái.',
    signature: 'List<KeyValuePair<string, int>> DemTu(string s)',
    constraints: ['0 <= s.Length <= 100000', 'Các từ cách nhau bằng khoảng trắng'],
    examples: [
      { input: 's = "a b a c b a"', output: '[("a", 3), ("b", 2), ("c", 1)]' },
      { input: 's = ""', output: '[]' },
    ] },

  { id: 'b8-e36', level: 'Trung bình', title: 'Nhóm từ theo chữ cái đầu',
    requirement: 'Cho một mảng chuỗi. Trả về Dictionary ánh xạ chữ cái đầu sang danh sách các từ bắt đầu bằng chữ cái đó.',
    signature: 'Dictionary<char, List<string>> NhomTheoChuDau(string[] arr)',
    constraints: ['0 <= arr.Length <= 10000', 'Mọi chuỗi đều khác rỗng'],
    examples: [
      { input: 'arr = ["mango", "melon", "kiwi"]', output: "{'m': [\"mango\", \"melon\"], 'k': [\"kiwi\"]}" },
      { input: 'arr = []', output: '{}' },
    ],
    hint: 'Chưa có khoá thì tạo List rỗng trước khi Add.' },

  { id: 'b8-e37', level: 'Trung bình', title: 'Gộp số lượng giỏ hàng',
    requirement: 'Cho một mảng tên sản phẩm, có thể lặp lại. Trả về Dictionary ánh xạ tên sản phẩm sang tổng số lượng.',
    signature: 'Dictionary<string, int> GopGioHang(string[] sanPham)',
    constraints: ['0 <= sanPham.Length <= 100000'],
    examples: [
      { input: 'sanPham = ["ao", "quan", "ao"]', output: '{"ao": 2, "quan": 1}' },
      { input: 'sanPham = []', output: '{}' },
    ] },

  { id: 'b8-e38', level: 'Trung bình', title: 'Điểm trung bình từng sinh viên',
    requirement: 'Cho một Dictionary ánh xạ tên sinh viên sang danh sách điểm. Trả về Dictionary ánh xạ tên sang điểm trung bình làm tròn 2 chữ số.',
    signature: 'Dictionary<string, double> TinhTrungBinh(Dictionary<string, List<double>> bangDiem)',
    constraints: ['Mỗi sinh viên có ít nhất một điểm'],
    examples: [
      { input: 'bangDiem = {"An": [8, 9], "Binh": [5, 6, 7]}', output: '{"An": 8.5, "Binh": 6}' },
    ] },

  { id: 'b8-e39', level: 'Trung bình', title: 'Thống kê xếp loại',
    requirement: 'Cho một mảng điểm số từ 0 đến 10. Trả về Dictionary đếm số bài theo xếp loại: Giỏi (>= 8), Khá (>= 6.5), Trung bình (>= 5), Yếu (còn lại).',
    signature: 'Dictionary<string, int> ThongKeXepLoai(double[] diem)',
    constraints: ['0 <= diem.Length <= 100000', '0 <= diem[i] <= 10'],
    examples: [
      { input: 'diem = [9, 7, 5, 4, 8.5, 6]', output: '{"Giỏi": 2, "Khá": 1, "Trung bình": 2, "Yếu": 1}' },
    ] },

  { id: 'b8-e40', level: 'Trung bình', title: 'Đảo ngược Dictionary',
    requirement: 'Cho một Dictionary<string, string> đảm bảo các value đôi một khác nhau. Trả về Dictionary mới với key và value đổi chỗ cho nhau.',
    signature: 'Dictionary<string, string> DaoNguocDict(Dictionary<string, string> dict)',
    constraints: ['Các value đôi một khác nhau'],
    examples: [
      { input: 'dict = {"VN": "Việt Nam", "JP": "Nhật Bản"}', output: '{"Việt Nam": "VN", "Nhật Bản": "JP"}' },
      { input: 'dict = {}', output: '{}' },
    ] },
]

const nangCao: Exercise[] = [
  { id: 'b8-e41', level: 'Nâng cao', title: "Two Sum",
    requirement: "Cho một mảng số nguyên nums và một số target. Trả về chỉ số của hai phần tử có tổng bằng target. Đề bảo đảm có đúng một đáp án và không dùng lại cùng một phần tử hai lần.",
    signature: "int[] TwoSum(int[] nums, int target)",
    constraints: ["2 <= nums.Length <= 10000", "-1_000_000 <= nums[i], target <= 1_000_000", "Lời giải nên chạy trong O(n)"],
    examples: [
      { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", explain: "nums[0] + nums[1] = 2 + 7 = 9." },
      { input: "nums = [3, 2, 4], target = 6", output: "[1, 2]" },
    ],
    hint: "Ghi nhớ giá trị đã đi qua, mỗi bước hỏi \"số bù target − nums[i] đã gặp chưa\".",
    visual: { kind: 'flow', caption: 'Ghi nhớ số đã đi qua, mỗi bước hỏi số bù đã gặp chưa', steps: [
    { kind: 'start', text: 'daGap = Dictionary rỗng' },
    { kind: 'process', text: 'Duyệt i từ 0 đến n−1' },
    { kind: 'decision', text: 'daGap chứa (target − nums[i])?', branches: [
      { label: 'Có', steps: [{ kind: 'end', text: 'Trả về [daGap[bù], i]' }] },
      { label: 'Chưa', steps: [{ kind: 'process', text: 'daGap[nums[i]] = i, sang i kế tiếp' }] } ] } ] }, },

  { id: 'b8-e42', level: 'Nâng cao', title: "Best Time to Buy and Sell Stock",
    requirement: "Cho mảng prices với prices[i] là giá cổ phiếu ngày thứ i. Chọn một ngày mua và một ngày bán SAU ngày mua sao cho lãi lớn nhất. Trả về khoản lãi đó, không có cơ hội lãi thì trả về 0.",
    signature: "int MaxProfit(int[] prices)",
    constraints: ["1 <= prices.Length <= 100000", "0 <= prices[i] <= 10000", "Chỉ được duyệt mảng một lượt"],
    examples: [
      { input: "prices = [7, 1, 5, 3, 6, 4]", output: "5", explain: "Mua ngày 2 giá 1, bán ngày 5 giá 6." },
      { input: "prices = [7, 6, 4, 3, 1]", output: "0", explain: "Giá giảm liên tục nên không có giao dịch nào có lãi." },
    ],
    hint: "Vừa duyệt vừa nhớ giá thấp nhất đã gặp.",
    visual: { kind: 'flow', caption: 'Một lượt duyệt: vừa đi vừa nhớ giá thấp nhất', steps: [
    { kind: 'start', text: 'giaThapNhat = ∞ · laiCaoNhat = 0' },
    { kind: 'process', text: 'Duyệt từng giá trong prices' },
    { kind: 'decision', text: 'gia < giaThapNhat?', branches: [
      { label: 'Đúng', steps: [{ kind: 'process', text: 'giaThapNhat = gia' }] },
      { label: 'Sai', steps: [{ kind: 'process', text: 'laiCaoNhat = max(laiCaoNhat, gia − giaThapNhat)' }] } ] },
    { kind: 'end', text: 'In laiCaoNhat' } ] }, },

  { id: 'b8-e43', level: 'Nâng cao', title: "Longest Consecutive Sequence",
    requirement: "Cho một mảng số nguyên nums. Trả về độ dài của dãy số liên tiếp dài nhất. Các số không cần nằm cạnh nhau trong mảng.",
    signature: "int LongestConsecutive(int[] nums)",
    constraints: ["0 <= nums.Length <= 100000", "Lời giải nên chạy trong O(n)"],
    examples: [
      { input: "nums = [100, 4, 200, 1, 3, 2]", output: "4", explain: "Dãy liên tiếp dài nhất là [1, 2, 3, 4]." },
      { input: "nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]", output: "9" },
    ],
    hint: "HashSet, và chỉ bắt đầu đếm từ phần tử không có số liền trước.",
    visual: { kind: 'flow', caption: 'Chỉ đếm từ đầu chuỗi nên mỗi số được duyệt đúng một lần', steps: [
    { kind: 'start', text: 'Đưa toàn bộ nums vào HashSet' },
    { kind: 'process', text: 'Duyệt từng x trong set' },
    { kind: 'decision', text: 'set có chứa x − 1?', branches: [
      { label: 'Có', steps: [{ kind: 'note', text: 'x không phải đầu chuỗi — bỏ qua' }] },
      { label: 'Không', steps: [{ kind: 'process', text: 'Đếm tiến x+1, x+2… còn trong set' }, { kind: 'process', text: 'Cập nhật daiNhat' }] } ] },
    { kind: 'end', text: 'In daiNhat' } ] }, },

  { id: 'b8-e44', level: 'Nâng cao', title: "Contains Duplicate",
    requirement: "Cho một mảng số nguyên nums. Trả về true nếu có bất kỳ giá trị nào xuất hiện từ hai lần trở lên.",
    signature: "bool ContainsDuplicate(int[] nums)",
    constraints: ["1 <= nums.Length <= 100000", "Chỉ được duyệt mảng một lượt"],
    examples: [
      { input: "nums = [1, 2, 3, 1]", output: "true" },
      { input: "nums = [1, 2, 3, 4]", output: "false" },
    ],
    hint: "HashSet.Add trả về false ngay khi gặp phần tử đã có.",
    visual: { kind: 'flow', caption: 'HashSet.Add trả về false ngay khi gặp phần tử đã có', steps: [
    { kind: 'start', text: 'set = HashSet rỗng' },
    { kind: 'process', text: 'Duyệt từng phần tử x' },
    { kind: 'decision', text: 'set.Add(x) trả về false?', branches: [
      { label: 'Đúng', steps: [{ kind: 'end', text: 'Có trùng — trả về true' }] },
      { label: 'Sai', steps: [{ kind: 'process', text: 'Sang phần tử kế tiếp' }] } ] },
    { kind: 'end', text: 'Hết mảng — trả về false' } ] }, },

  { id: 'b8-e45', level: 'Nâng cao', title: "Valid Anagram",
    requirement: "Cho hai chuỗi s và t. Trả về true nếu t là một hoán vị ký tự của s.",
    signature: "bool IsAnagram(string s, string t)",
    constraints: ["1 <= s.Length, t.Length <= 50000", "Chuỗi chỉ gồm chữ thường tiếng Anh"],
    examples: [
      { input: "s = \"anagram\", t = \"nagaram\"", output: "true" },
      { input: "s = \"rat\", t = \"car\"", output: "false" },
    ],
    hint: "Khác độ dài thì loại ngay. Còn lại thì đếm tần suất ký tự rồi so hai bảng đếm.",
    visual: { kind: 'flow', caption: 'So bảng đếm ký tự của hai chuỗi', steps: [
    { kind: 'decision', text: 'Hai chuỗi khác độ dài?', branches: [
      { label: 'Đúng', steps: [{ kind: 'end', text: 'false' }] },
      { label: 'Sai', steps: [{ kind: 'process', text: 'Đếm tần suất ký tự chuỗi A' }, { kind: 'process', text: 'Duyệt B, trừ dần bảng đếm' }] } ] },
    { kind: 'decision', text: 'Mọi ô đếm đều về 0?', branches: [
      { label: 'Đúng', steps: [{ kind: 'end', text: 'true' }] },
      { label: 'Sai', steps: [{ kind: 'end', text: 'false' }] } ] } ] }, },

  { id: 'b8-e46', level: 'Nâng cao', title: "Group Anagrams",
    requirement: "Cho một mảng chuỗi. Gom các chuỗi là hoán vị ký tự của nhau vào cùng một nhóm. Trả về danh sách các nhóm, thứ tự nhóm không quan trọng.",
    signature: "List<List<string>> GroupAnagrams(string[] strs)",
    constraints: ["1 <= strs.Length <= 10000", "0 <= strs[i].Length <= 100", "Chuỗi chỉ gồm chữ thường tiếng Anh"],
    examples: [
      { input: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", output: "[[\"eat\",\"tea\",\"ate\"], [\"tan\",\"nat\"], [\"bat\"]]" },
      { input: "strs = [\"\"]", output: "[[\"\"]]" },
    ],
    hint: "Dùng chuỗi đã sắp xếp ký tự làm khoá của Dictionary.",
    visual: { kind: 'flow', caption: 'Chuỗi đã sắp xếp ký tự làm khoá gom nhóm', steps: [
    { kind: 'start', text: 'nhom = Dictionary<string, List<string>>' },
    { kind: 'process', text: 'Với mỗi từ: sắp xếp ký tự để ra khoá' },
    { kind: 'decision', text: 'Khoá đã có trong nhom?', branches: [
      { label: 'Có', steps: [{ kind: 'process', text: 'Thêm từ vào nhóm sẵn có' }] },
      { label: 'Chưa', steps: [{ kind: 'process', text: 'Tạo nhóm mới cho khoá' }] } ] },
    { kind: 'end', text: 'Trả về các nhóm' } ] }, },

  { id: 'b8-e47', level: 'Nâng cao', title: "Top K Frequent Elements",
    requirement: "Cho một mảng số nguyên nums và số nguyên k. Trả về k phần tử xuất hiện nhiều lần nhất, thứ tự không quan trọng.",
    signature: "int[] TopKFrequent(int[] nums, int k)",
    constraints: ["1 <= nums.Length <= 100000", "1 <= k <= số giá trị khác nhau trong nums"],
    examples: [
      { input: "nums = [1, 1, 1, 2, 2, 3], k = 2", output: "[1, 2]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ],
    hint: "Dictionary đếm tần suất rồi sắp xếp theo số lần giảm dần.",
    visual: { kind: 'flow', steps: [
    { kind: 'start', text: 'Đếm tần suất bằng Dictionary' },
    { kind: 'process', text: 'Sắp xếp các cặp theo số lần giảm dần' },
    { kind: 'process', text: 'Lấy k khoá đầu tiên' },
    { kind: 'end', text: 'Trả về danh sách k phần tử' } ] }, },

  { id: 'b8-e48', level: 'Nâng cao', title: "Majority Element",
    requirement: "Cho một mảng số nguyên nums có một phần tử xuất hiện nhiều hơn n/2 lần. Trả về phần tử đó. Thử giải bằng bộ nhớ O(1), không dùng Dictionary.",
    signature: "int MajorityElement(int[] nums)",
    constraints: ["1 <= nums.Length <= 100000", "Đề bảo đảm phần tử đa số luôn tồn tại"],
    examples: [
      { input: "nums = [3, 2, 3]", output: "3" },
      { input: "nums = [2, 2, 1, 1, 1, 2, 2]", output: "2" },
    ],
    hint: "Thuật toán Boyer–Moore: giữ một ứng viên và một bộ đếm.",
    visual: { kind: 'flow', caption: 'Boyer–Moore: chỉ cần một ứng viên và một bộ đếm', steps: [
    { kind: 'start', text: 'ungVien = null · dem = 0' },
    { kind: 'decision', text: 'dem == 0?', branches: [
      { label: 'Đúng', steps: [{ kind: 'process', text: 'ungVien = x, dem = 1' }] },
      { label: 'Sai', steps: [{ kind: 'process', text: 'x == ungVien ? dem++ : dem−−' }] } ] },
    { kind: 'end', text: 'ungVien là phần tử đa số' } ] }, },

  { id: 'b8-e49', level: 'Nâng cao', title: "Move Zeroes",
    requirement: "Cho một mảng số nguyên nums. Dồn tất cả số 0 về cuối mảng, giữ nguyên thứ tự tương đối của các số khác 0. Sửa trực tiếp trên mảng, không tạo mảng mới.",
    signature: "void MoveZeroes(int[] nums)",
    constraints: ["1 <= nums.Length <= 100000", "Không được cấp phát mảng phụ"],
    examples: [
      { input: "nums = [0, 1, 0, 3, 12]", output: "[1, 3, 12, 0, 0]" },
      { input: "nums = [0]", output: "[0]" },
    ],
    hint: "Hai con trỏ: một chạy duyệt, một đánh dấu vị trí ghi kế tiếp.",
    visual: { kind: 'flow', caption: 'Hai con trỏ: một duyệt, một đánh dấu vị trí ghi', steps: [
    { kind: 'start', text: 'viTriGhi = 0' },
    { kind: 'process', text: 'Duyệt i qua toàn mảng' },
    { kind: 'decision', text: 'nums[i] khác 0?', branches: [
      { label: 'Đúng', steps: [{ kind: 'process', text: 'nums[viTriGhi++] = nums[i]' }] },
      { label: 'Sai', steps: [{ kind: 'note', text: 'Bỏ qua số 0' }] } ] },
    { kind: 'end', text: 'Điền 0 vào phần đuôi còn lại' } ] }, },

  { id: 'b8-e50', level: 'Nâng cao', title: "Product of Array Except Self",
    requirement: "Cho một mảng số nguyên nums. Trả về mảng answer với answer[i] là tích của tất cả phần tử trừ nums[i]. Không được dùng phép chia.",
    signature: "int[] ProductExceptSelf(int[] nums)",
    constraints: ["2 <= nums.Length <= 100000", "Kết quả đảm bảo nằm trong phạm vi int", "Không dùng phép chia, chạy trong O(n)"],
    examples: [
      { input: "nums = [1, 2, 3, 4]", output: "[24, 12, 8, 6]" },
      { input: "nums = [-1, 1, 0, -3, 3]", output: "[0, 0, 9, 0, 0]" },
    ],
    hint: "Một lượt xuôi tính tích tiền tố, một lượt ngược nhân thêm tích hậu tố.",
    visual: { kind: 'flow', caption: 'Hai lượt duyệt, không dùng phép chia', steps: [
    { kind: 'start', text: 'kq[i] = 1 với mọi i' },
    { kind: 'process', text: 'Lượt xuôi: kq[i] = tích mọi phần tử bên trái' },
    { kind: 'process', text: 'Lượt ngược: nhân thêm tích mọi phần tử bên phải' },
    { kind: 'end', text: 'Trả về kq' } ] }, },

  { id: 'b8-e51', level: 'Nâng cao', title: "Two Sum II — mảng đã sắp xếp",
    requirement: "Cho một mảng số nguyên đã sắp xếp tăng dần và số target. Trả về chỉ số của hai phần tử có tổng bằng target. Chỉ được dùng bộ nhớ O(1).",
    signature: "int[] TwoSumSorted(int[] nums, int target)",
    constraints: ["2 <= nums.Length <= 100000", "nums đã sắp xếp tăng dần", "Bộ nhớ phụ O(1)"],
    examples: [
      { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]" },
      { input: "nums = [2, 3, 4], target = 6", output: "[0, 2]" },
    ],
    hint: "Hai con trỏ trái phải tiến vào giữa tuỳ tổng lớn hay nhỏ hơn target.",
    visual: { kind: 'flow', caption: 'Mảng đã sắp xếp nên chỉ cần dịch con trỏ', steps: [
    { kind: 'start', text: 'trai = 0 · phai = n − 1' },
    { kind: 'decision', text: 'So tổng nums[trai] + nums[phai] với target', branches: [
      { label: 'Bằng', steps: [{ kind: 'end', text: 'Trả về [trai, phai]' }] },
      { label: 'Nhỏ hơn', steps: [{ kind: 'process', text: 'trai++' }] },
      { label: 'Lớn hơn', steps: [{ kind: 'process', text: 'phai−−' }] } ] } ] }, },

  { id: 'b8-e52', level: 'Nâng cao', title: "3Sum",
    requirement: "Cho một mảng số nguyên nums. Trả về tất cả bộ ba phần tử khác chỉ số có tổng bằng 0. Không được có bộ ba trùng nhau trong kết quả.",
    signature: "List<List<int>> ThreeSum(int[] nums)",
    constraints: ["3 <= nums.Length <= 3000", "-100000 <= nums[i] <= 100000"],
    examples: [
      { input: "nums = [-1, 0, 1, 2, -1, -4]", output: "[[-1, -1, 2], [-1, 0, 1]]" },
      { input: "nums = [0, 1, 1]", output: "[]", explain: "Không có bộ ba nào tổng bằng 0." },
    ],
    hint: "Sắp xếp trước, cố định một số rồi dùng hai con trỏ cho phần còn lại.",
    visual: { kind: 'flow', caption: 'Cố định một số, phần còn lại quy về Two Sum hai con trỏ', steps: [
    { kind: 'start', text: 'Sắp xếp mảng tăng dần' },
    { kind: 'process', text: 'Cố định nums[i], bỏ qua giá trị trùng i' },
    { kind: 'process', text: 'Hai con trỏ tìm cặp có tổng = −nums[i]' },
    { kind: 'end', text: 'Gom các bộ ba tìm được' } ] }, },

  { id: 'b8-e53', level: 'Nâng cao', title: "Longest Substring Without Repeating Characters",
    requirement: "Cho một chuỗi s. Trả về độ dài chuỗi con liên tiếp dài nhất không chứa ký tự lặp lại.",
    signature: "int LengthOfLongestSubstring(string s)",
    constraints: ["0 <= s.Length <= 50000", "s gồm chữ cái, chữ số, ký hiệu và khoảng trắng"],
    examples: [
      { input: "s = \"abcabcbb\"", output: "3", explain: "Chuỗi con dài nhất là \"abc\"." },
      { input: "s = \"bbbbb\"", output: "1" },
      { input: "s = \"pwwkew\"", output: "3", explain: "Là \"wke\"; \"pwke\" không tính vì không liên tiếp." },
    ],
    hint: "Cửa sổ trượt kết hợp Dictionary lưu vị trí gần nhất của mỗi ký tự.",
    visual: { kind: 'flow', caption: 'Cửa sổ trượt: gặp ký tự lặp thì kéo mép trái lên', steps: [
    { kind: 'start', text: 'trai = 0 · viTriCuoi = Dictionary rỗng' },
    { kind: 'process', text: 'Cho phai chạy hết chuỗi' },
    { kind: 'decision', text: 'Ký tự đã xuất hiện trong cửa sổ?', branches: [
      { label: 'Có', steps: [{ kind: 'process', text: 'trai = viTriCuoi[c] + 1' }] },
      { label: 'Không', steps: [{ kind: 'process', text: 'Cập nhật độ dài lớn nhất' }] } ] },
    { kind: 'end', text: 'In độ dài lớn nhất' } ] }, },

  { id: 'b8-e54', level: 'Nâng cao', title: "Subarray Sum Equals K",
    requirement: "Cho một mảng số nguyên nums và số nguyên k. Trả về số lượng mảng con liên tiếp có tổng bằng k.",
    signature: "int SubarraySum(int[] nums, int k)",
    constraints: ["1 <= nums.Length <= 20000", "-1000 <= nums[i] <= 1000", "Lời giải nên chạy trong O(n)"],
    examples: [
      { input: "nums = [1, 1, 1], k = 2", output: "2", explain: "Hai mảng con [1,1] ở vị trí 0-1 và 1-2." },
      { input: "nums = [1, 2, 3], k = 3", output: "2" },
    ],
    hint: "Dictionary đếm tần suất tổng tiền tố đã gặp, mỗi bước cộng thêm dem[tong − k].",
    visual: { kind: 'flow', caption: 'Tổng tiền tố: đếm số lần đã gặp tổng (hiện tại − k)', steps: [
    { kind: 'start', text: 'tong = 0 · dem[0] = 1' },
    { kind: 'process', text: 'Duyệt từng phần tử, cộng dồn vào tong' },
    { kind: 'process', text: 'ketQua += dem[tong − k]' },
    { kind: 'process', text: 'dem[tong]++' },
    { kind: 'end', text: 'In ketQua' } ] }, },

  { id: 'b8-e55', level: 'Nâng cao', title: "Find All Duplicates",
    requirement: "Cho một mảng nums gồm n số trong khoảng từ 1 đến n, mỗi số xuất hiện một hoặc hai lần. Trả về mảng tất cả số xuất hiện đúng hai lần.",
    signature: "int[] FindDuplicates(int[] nums)",
    constraints: ["1 <= nums.Length <= 100000", "1 <= nums[i] <= nums.Length"],
    examples: [
      { input: "nums = [4, 3, 2, 7, 8, 2, 3, 1]", output: "[2, 3]" },
      { input: "nums = [1, 1, 2]", output: "[1]" },
    ],
    visual: { kind: 'flow', steps: [
    { kind: 'start', text: 'daGap = HashSet rỗng' },
    { kind: 'decision', text: 'x đã có trong daGap?', branches: [
      { label: 'Có', steps: [{ kind: 'process', text: 'Ghi x vào kết quả' }] },
      { label: 'Chưa', steps: [{ kind: 'process', text: 'daGap.Add(x)' }] } ] },
    { kind: 'end', text: 'Trả về danh sách trùng' } ] }, },

  { id: 'b8-e56', level: 'Nâng cao', title: "First Missing Positive",
    requirement: "Cho một mảng số nguyên nums. Trả về số nguyên dương nhỏ nhất không xuất hiện trong mảng.",
    signature: "int FirstMissingPositive(int[] nums)",
    constraints: ["1 <= nums.Length <= 100000", "-1_000_000 <= nums[i] <= 1_000_000"],
    examples: [
      { input: "nums = [3, 4, -1, 1]", output: "2" },
      { input: "nums = [1, 2, 3]", output: "4", explain: "Mảng đã có đủ 1, 2, 3 nên đáp án là số tiếp theo." },
      { input: "nums = [7, 8, 9]", output: "1" },
    ],
    hint: "Đưa vào HashSet rồi dò từ 1 đi lên.",
    visual: { kind: 'flow', steps: [
    { kind: 'start', text: 'Đưa toàn bộ mảng vào HashSet' },
    { kind: 'process', text: 'Thử lần lượt i = 1, 2, 3…' },
    { kind: 'decision', text: 'set có chứa i?', branches: [
      { label: 'Có', steps: [{ kind: 'process', text: 'Tăng i, thử tiếp' }] },
      { label: 'Không', steps: [{ kind: 'end', text: 'i là đáp án' }] } ] } ] }, },

  { id: 'b8-e57', level: 'Nâng cao', title: "Merge Intervals",
    requirement: "Cho một danh sách các khoảng [dau, cuoi]. Gộp mọi khoảng chồng lấn lên nhau và trả về danh sách các khoảng không còn chồng lấn.",
    signature: "int[][] Merge(int[][] intervals)",
    constraints: ["1 <= intervals.Length <= 10000", "0 <= dau <= cuoi <= 1_000_000"],
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explain: "[1,3] và [2,6] chồng nhau nên gộp thành [1,6]." },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]", explain: "Chạm nhau ở điểm 4 cũng tính là chồng." },
    ],
    hint: "Sắp xếp theo điểm đầu rồi gộp lần lượt.",
    visual: { kind: 'flow', caption: 'Sắp xếp theo điểm đầu rồi gộp lần lượt', steps: [
    { kind: 'start', text: 'Sắp xếp các khoảng theo điểm đầu' },
    { kind: 'decision', text: 'Đầu khoảng mới ≤ cuối khoảng trước?', branches: [
      { label: 'Đúng', steps: [{ kind: 'process', text: 'Nới cuối khoảng trước ra' }] },
      { label: 'Sai', steps: [{ kind: 'process', text: 'Mở một khoảng mới' }] } ] },
    { kind: 'end', text: 'Trả về danh sách đã gộp' } ] }, },

  { id: 'b8-e58', level: 'Nâng cao', title: "Isomorphic Strings",
    requirement: "Cho hai chuỗi s và t. Trả về true nếu có thể thay thế từng ký tự của s thành ký tự của t một cách nhất quán: mỗi ký tự ánh xạ tới đúng một ký tự và không có hai ký tự khác nhau cùng ánh xạ về một.",
    signature: "bool IsIsomorphic(string s, string t)",
    constraints: ["1 <= s.Length <= 50000", "s.Length bằng t.Length"],
    examples: [
      { input: "s = \"egg\", t = \"add\"", output: "true", explain: "e → a và g → d." },
      { input: "s = \"foo\", t = \"bar\"", output: "false", explain: "o phải ánh xạ tới cả a lẫn r." },
      { input: "s = \"paper\", t = \"title\"", output: "true" },
    ],
    hint: "Cần hai Dictionary ánh xạ hai chiều, một chiều là chưa đủ.",
    visual: { kind: 'flow', caption: 'Hai Dictionary để ánh xạ đúng một-một', steps: [
    { kind: 'process', text: 'Duyệt song song từng cặp ký tự (a, b)' },
    { kind: 'decision', text: 'a hoặc b đã ánh xạ tới ký tự khác?', branches: [
      { label: 'Đúng', steps: [{ kind: 'end', text: 'false' }] },
      { label: 'Sai', steps: [{ kind: 'process', text: 'Ghi nhận a → b và b → a' }] } ] },
    { kind: 'end', text: 'Hết chuỗi — trả về true' } ] }, },

  { id: 'b8-e59', level: 'Nâng cao', title: "LRU Cache",
    requirement: "Thiết kế một bộ nhớ đệm sức chứa N cặp khoá-giá trị. Get trả về giá trị của khoá hoặc -1 nếu không có. Put ghi giá trị vào, nếu đầy thì loại bỏ khoá lâu chưa dùng nhất. Cả hai thao tác phải chạy trong O(1).",
    signature: "class LruCache { int Get(int key); void Put(int key, int value); }",
    constraints: ["1 <= N <= 10000", "Get và Put đều phải là O(1)"],
    examples: [
      { input: "N = 2; Put(1,1); Put(2,2); Get(1); Put(3,3); Get(2)", output: "1 rồi -1", explain: "Put(3,3) làm đầy nên khoá 2 lâu chưa dùng nhất bị loại." },
    ],
    hint: "Dictionary để tra cứu nhanh, LinkedList để giữ thứ tự sử dụng.",
    visual: { kind: 'flow', caption: 'Dictionary tra cứu nhanh, LinkedList giữ thứ tự dùng', steps: [
    { kind: 'process', text: 'Get / Put một khoá' },
    { kind: 'decision', text: 'Khoá đã có?', branches: [
      { label: 'Có', steps: [{ kind: 'process', text: 'Đẩy khoá lên đầu danh sách' }] },
      { label: 'Chưa', steps: [{ kind: 'process', text: 'Thêm vào đầu danh sách' }, { kind: 'decision', text: 'Vượt sức chứa N?', branches: [ { label: 'Có', steps: [{ kind: 'process', text: 'Loại bỏ phần tử cuối' }] }, { label: 'Không', steps: [{ kind: 'note', text: 'Giữ nguyên' }] } ] }] } ] } ] }, },

  { id: 'b8-e60', level: 'Nâng cao', title: "Quản lý sản phẩm — bài tổng hợp",
    requirement: "Xây dựng chương trình console quản lý danh sách sản phẩm bằng List, có menu lặp: thêm, xem danh sách, tìm theo tên, sửa giá, xoá theo tên, sắp xếp theo giá, thống kê tổng tồn kho, thoát. Mỗi chức năng tách thành một hàm riêng và có kiểm tra dữ liệu nhập.",
    signature: "void ChayChuongTrinh()",
    constraints: ["Không được để chương trình văng exception khi người dùng gõ sai", "Mỗi chức năng là một hàm riêng"],
    examples: [
      { input: "Chọn 1, nhập \"Bàn phím\" giá 500000, rồi chọn 2", output: "Danh sách:\\n1. Bàn phím — 500.000 đ" },
    ],
    hint: "Bài này ôn lại toàn bộ tám buổi đầu: vòng lặp, rẽ nhánh, hàm và collection.",
    visual: { kind: 'flow', caption: 'Menu lặp cho tới khi người dùng chọn thoát', steps: [
    { kind: 'start', text: 'Khởi tạo List sản phẩm' },
    { kind: 'io', text: 'Hiện menu, đọc lựa chọn' },
    { kind: 'decision', text: 'Lựa chọn là gì?', branches: [
      { label: '1-2', steps: [{ kind: 'process', text: 'Thêm / xem danh sách' }] },
      { label: '3-5', steps: [{ kind: 'process', text: 'Tìm / sửa / xoá theo tên' }] },
      { label: '0', steps: [{ kind: 'end', text: 'Thoát chương trình' }] } ] } ] }, },
]

export const BAI_TAP_COLLECTION: Exercise[] = [...coBan, ...trungBinh, ...nangCao]
