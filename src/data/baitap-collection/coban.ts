import type { Exercise } from '../types'

/** Bài tập collection mức Cơ bản. Đề viết theo lối LeetCode. */
export const coBan: Exercise[] = [
  { id: 'b8-c001', level: 'Cơ bản', title: 'In danh sách thành chuỗi',
    requirement: 'Cho một mảng số nguyên nums. Trả về chuỗi gồm các phần tử cách nhau bằng dấu phẩy và một khoảng trắng.',
    signature: 'string InDanhSach(int[] nums)',
    constraints: ['0 <= nums.Length <= 1000'],
    examples: [
      { input: 'nums = [20, 81, 97]', output: '"20, 81, 97"' },
      { input: 'nums = []', output: '""' },
    ],
    hint: 'string.Join(", ", nums)' },

  { id: 'b8-c002', level: 'Cơ bản', title: 'Đếm số phần tử',
    requirement: 'Cho một List<int>. Trả về số lượng phần tử hiện có trong danh sách.',
    signature: 'int DemPhanTu(List<int> lst)',
    constraints: ['0 <= lst.Count <= 100000'],
    examples: [
      { input: 'lst = [10, 20, 30]', output: '3' },
      { input: 'lst = []', output: '0' },
    ],
    hint: 'List dùng .Count, mảng dùng .Length — đừng nhầm hai cái.' },

  { id: 'b8-c003', level: 'Cơ bản', title: 'Thêm phần tử vào cuối',
    requirement: 'Cho một List<int> và một mảng các giá trị cần thêm. Thêm tất cả giá trị đó vào cuối danh sách rồi trả về danh sách kết quả.',
    signature: 'List<int> ThemVaoCuoi(List<int> lst, int[] themVao)',
    constraints: ['0 <= lst.Count, themVao.Length <= 100000'],
    examples: [
      { input: 'lst = [10, 20, 30], themVao = [40, 50]', output: '[10, 20, 30, 40, 50]' },
      { input: 'lst = [], themVao = [1]', output: '[1]' },
    ],
    hint: 'Add cho một phần tử, AddRange cho nhiều phần tử.' },

  { id: 'b8-c004', level: 'Cơ bản', title: 'Chèn phần tử vào vị trí',
    requirement: 'Cho một List<string>, một vị trí viTri và một giá trị. Chèn giá trị vào đúng vị trí đó và trả về danh sách sau khi chèn.',
    signature: 'List<string> ChenVaoViTri(List<string> lst, int viTri, string giaTri)',
    constraints: ['0 <= viTri <= lst.Count'],
    examples: [
      { input: 'lst = ["A", "B", "C"], viTri = 1, giaTri = "X"', output: '["A", "X", "B", "C"]', explain: 'Mọi phần tử từ vị trí 1 trở đi bị đẩy lùi một bậc.' },
      { input: 'lst = ["A"], viTri = 0, giaTri = "Z"', output: '["Z", "A"]' },
    ] },

  { id: 'b8-c005', level: 'Cơ bản', title: 'Xoá theo giá trị và theo vị trí',
    requirement: 'Cho một List<int>, một giá trị cần xoá và một vị trí cần xoá. Xoá lần lượt phần tử mang giá trị đó (chỉ lần xuất hiện đầu tiên), rồi xoá phần tử tại vị trí đã cho trên danh sách vừa thu được.',
    signature: 'List<int> XoaHaiKieu(List<int> lst, int giaTri, int viTri)',
    constraints: ['Đảm bảo viTri hợp lệ sau lần xoá thứ nhất'],
    examples: [
      { input: 'lst = [20, 81, 97, 63], giaTri = 97, viTri = 0', output: '[81, 63]', explain: 'Xoá 97 được [20, 81, 63], rồi xoá vị trí 0 được [81, 63].' },
    ],
    hint: 'Remove nhận GIÁ TRỊ, RemoveAt nhận CHỈ SỐ.' },

  { id: 'b8-c006', level: 'Cơ bản', title: 'Đổi phần tử đầu và cuối',
    requirement: 'Cho một List<string> và hai giá trị mới. Thay phần tử đầu tiên bằng giá trị thứ nhất, phần tử cuối cùng bằng giá trị thứ hai.',
    signature: 'List<string> DoiDauCuoi(List<string> lst, string dau, string cuoi)',
    constraints: ['lst.Count >= 1'],
    examples: [
      { input: 'lst = ["A", "B", "C", "D", "E"], dau = "X", cuoi = "Z"', output: '["X", "B", "C", "D", "Z"]' },
      { input: 'lst = ["A"], dau = "X", cuoi = "Z"', output: '["Z"]', explain: 'Danh sách một phần tử thì đầu cũng là cuối, phép gán sau thắng.' },
    ],
    hint: 'Phần tử cuối: lst[lst.Count - 1] hoặc lst[^1].' },

  { id: 'b8-c007', level: 'Cơ bản', title: 'Tổng danh sách',
    requirement: 'Cho một mảng số nguyên nums. Trả về tổng tất cả phần tử.',
    signature: 'long TinhTong(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000', '-10000 <= nums[i] <= 10000'],
    examples: [
      { input: 'nums = [20, 81, 97, 63, 72, 11, 20, 15, 33, 15, 41, 20]', output: '488' },
      { input: 'nums = []', output: '0' },
    ] },

  { id: 'b8-c008', level: 'Cơ bản', title: 'Trung bình cộng',
    requirement: 'Cho một mảng số nguyên nums. Trả về trung bình cộng của các phần tử, làm tròn 2 chữ số thập phân. Mảng rỗng trả về 0.',
    signature: 'double TrungBinh(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [10, 20, 30, 40]', output: '25' },
      { input: 'nums = [1, 2]', output: '1.5', explain: 'Phải ép về double trước khi chia, không thì 3 / 2 ra 1.' },
    ] },

  { id: 'b8-c009', level: 'Cơ bản', title: 'Lớn nhất và nhỏ nhất',
    requirement: 'Cho một mảng số nguyên nums không rỗng. Trả về cặp (lớn nhất, nhỏ nhất). Không dùng Max và Min có sẵn.',
    signature: '(int max, int min) TimMaxMin(int[] nums)',
    constraints: ['1 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 81, 97, 63, 11]', output: '(97, 11)' },
      { input: 'nums = [5]', output: '(5, 5)' },
    ] },

  { id: 'b8-c010', level: 'Cơ bản', title: 'Đếm phần tử lớn hơn mốc',
    requirement: 'Cho một mảng số nguyên nums và một giá trị moc. Trả về số lượng phần tử lớn hơn moc.',
    signature: 'int DemLonHon(int[] nums, int moc)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 81, 97, 63, 72, 11, 20, 15, 33, 15, 41, 20], moc = 30', output: '5', explain: 'Các số 81, 97, 63, 72, 41.' },
      { input: 'nums = [1, 2], moc = 10', output: '0' },
    ] },

  { id: 'b8-c011', level: 'Cơ bản', title: 'Tổng các số thoả điều kiện',
    requirement: 'Cho một mảng số nguyên nums và giá trị moc. Trả về tổng các phần tử lớn hơn moc.',
    signature: 'long TongLonHon(int[] nums, int moc)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 81, 97, 63, 72, 11], moc = 50', output: '313', explain: '81 + 97 + 63 + 72 = 313.' },
      { input: 'nums = [1, 2, 3], moc = 100', output: '0' },
    ] },

  { id: 'b8-c012', level: 'Cơ bản', title: 'Lọc số chẵn',
    requirement: 'Cho một mảng số nguyên nums. Trả về mảng chỉ gồm các số chẵn, giữ nguyên thứ tự xuất hiện.',
    signature: 'int[] LocSoChan(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 81, 97, 72, 11, 20]', output: '[20, 72, 20]' },
      { input: 'nums = [1, 3, 5]', output: '[]' },
    ] },

  { id: 'b8-c013', level: 'Cơ bản', title: 'Tìm vị trí phần tử',
    requirement: 'Cho một mảng số nguyên nums và giá trị target. Trả về chỉ số xuất hiện đầu tiên của target, không tìm thấy trả về -1.',
    signature: 'int TimViTri(int[] nums, int target)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 81, 97, 15, 15], target = 15', output: '3' },
      { input: 'nums = [1, 2, 3], target = 9', output: '-1' },
    ] },

  { id: 'b8-c014', level: 'Cơ bản', title: 'Sắp xếp tăng và giảm',
    requirement: 'Cho một mảng số nguyên nums. Trả về cặp gồm mảng đã sắp xếp tăng dần và mảng đã sắp xếp giảm dần. Không được làm thay đổi mảng gốc.',
    signature: '(int[] tang, int[] giam) SapXepHaiChieu(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [3, 1, 4, 1, 5]', output: '([1, 1, 3, 4, 5], [5, 4, 3, 1, 1])' },
    ],
    hint: 'Sao chép sang List mới trước khi Sort, nếu không mảng gốc bị đổi theo.' },

  { id: 'b8-c015', level: 'Cơ bản', title: 'Đảo ngược danh sách',
    requirement: 'Cho một mảng chuỗi. Trả về mảng mới với thứ tự đảo ngược. Tự cài bằng vòng lặp, không dùng Reverse.',
    signature: 'string[] DaoNguoc(string[] arr)',
    constraints: ['0 <= arr.Length <= 100000'],
    examples: [
      { input: 'arr = ["A", "B", "C", "D"]', output: '["D", "C", "B", "A"]' },
      { input: 'arr = []', output: '[]' },
    ] },

  { id: 'b8-c016', level: 'Cơ bản', title: 'Lọc sang danh sách mới',
    requirement: 'Cho một mảng số nguyên nums và giá trị moc. Trả về List mới chỉ chứa các phần tử nhỏ hơn moc.',
    signature: 'List<int> LocNhoHon(int[] nums, int moc)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 81, 97, 63, 11, 15], moc = 50', output: '[20, 11, 15]' },
      { input: 'nums = [90, 95], moc = 50', output: '[]' },
    ] },

  { id: 'b8-c017', level: 'Cơ bản', title: 'Lọc chuỗi theo độ dài',
    requirement: 'Cho một mảng chuỗi và độ dài tối thiểu. Trả về mảng các chuỗi dài hơn độ dài đó.',
    signature: 'string[] LocTheoDoDai(string[] arr, int doDai)',
    constraints: ['0 <= arr.Length <= 10000'],
    examples: [
      { input: 'arr = ["apple","banana","kiwi","mango"], doDai = 5', output: '["banana"]' },
      { input: 'arr = ["kiwi"], doDai = 10', output: '[]' },
    ] },

  { id: 'b8-c018', level: 'Cơ bản', title: 'Dictionary cơ bản',
    requirement: 'Cho một Dictionary<string, int> lưu điểm các môn và tên một môn. Trả về điểm của môn đó, không có môn thì trả về -1.',
    signature: 'int LayDiem(Dictionary<string, int> diem, string mon)',
    constraints: ['0 <= diem.Count <= 100000'],
    examples: [
      { input: 'diem = {"toan": 8, "ly": 7}, mon = "toan"', output: '8' },
      { input: 'diem = {"toan": 8}, mon = "van"', output: '-1', explain: 'Đọc thẳng diem["van"] sẽ ném KeyNotFoundException.' },
    ],
    hint: 'TryGetValue an toàn hơn ContainsKey rồi đọc lại lần nữa.' },

  { id: 'b8-c019', level: 'Cơ bản', title: 'Duyệt Dictionary',
    requirement: 'Cho một Dictionary<string, string>. Trả về mảng chuỗi, mỗi phần tử có dạng "key = value", theo đúng thứ tự duyệt.',
    signature: 'string[] LietKe(Dictionary<string, string> dict)',
    constraints: ['0 <= dict.Count <= 10000'],
    examples: [
      { input: 'dict = {"VN": "Việt Nam", "JP": "Nhật Bản"}', output: '["VN = Việt Nam", "JP = Nhật Bản"]' },
    ],
    hint: 'foreach (var item in dict) rồi dùng item.Key và item.Value.' },

  { id: 'b8-c020', level: 'Cơ bản', title: 'Chuyển đổi giữa các collection',
    requirement: 'Cho một mảng số nguyên có phần tử trùng. Trả về số phần tử khác nhau bằng cách đưa qua HashSet.',
    signature: 'int DemKhacNhau(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [1, 2, 2, 3, 3, 3]', output: '3' },
      { input: 'nums = []', output: '0' },
    ],
    hint: 'Array dùng .Length, còn List và HashSet dùng .Count.' },

  { id: 'b8-c021', level: 'Cơ bản', title: "Nhân đôi mỗi phần tử",
    requirement: "Cho một mảng số nguyên nums. Trả về mảng mới với mỗi phần tử được nhân đôi.",
    signature: "int[] NhanDoi(int[] nums)",
    constraints: ["0 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [1, 2, 3]", output: "[2, 4, 6]" },
      { input: "nums = []", output: "[]" },
    ], },

  { id: 'b8-c022', level: 'Cơ bản', title: "Đếm số âm",
    requirement: "Cho một mảng số nguyên nums. Trả về số lượng phần tử nhỏ hơn 0.",
    signature: "int DemSoAm(int[] nums)",
    constraints: ["0 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [-3, 0, 5, -1]", output: "2" },
      { input: "nums = [1, 2]", output: "0" },
    ], },

  { id: 'b8-c023', level: 'Cơ bản', title: "Tổng phần tử ở vị trí chẵn",
    requirement: "Cho một mảng số nguyên nums. Trả về tổng các phần tử nằm ở chỉ số chẵn.",
    signature: "long TongViTriChan(int[] nums)",
    constraints: ["0 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [10, 20, 30, 40]", output: "40", explain: "Lấy nums[0] + nums[2] = 10 + 30." },
      { input: "nums = [5]", output: "5" },
    ], },

  { id: 'b8-c024', level: 'Cơ bản', title: "Lấy n phần tử đầu",
    requirement: "Cho một mảng nums và số nguyên n. Trả về mảng gồm n phần tử đầu tiên. Nếu n lớn hơn độ dài mảng thì trả về toàn bộ mảng.",
    signature: "int[] LayDau(int[] nums, int n)",
    constraints: ["0 <= nums.Length <= 100000", "0 <= n <= 100000"],
    examples: [
      { input: "nums = [1, 2, 3, 4, 5], n = 3", output: "[1, 2, 3]" },
      { input: "nums = [1, 2], n = 5", output: "[1, 2]" },
    ], },

  { id: 'b8-c025', level: 'Cơ bản', title: "Lấy n phần tử cuối",
    requirement: "Cho một mảng nums và số nguyên n. Trả về mảng gồm n phần tử cuối cùng, giữ nguyên thứ tự.",
    signature: "int[] LayCuoi(int[] nums, int n)",
    constraints: ["0 <= nums.Length <= 100000", "0 <= n <= 100000"],
    examples: [
      { input: "nums = [1, 2, 3, 4, 5], n = 2", output: "[4, 5]" },
      { input: "nums = [1], n = 3", output: "[1]" },
    ], },

  { id: 'b8-c026', level: 'Cơ bản', title: "Kiểm tra danh sách rỗng",
    requirement: "Cho một List<int>. Trả về true nếu danh sách không có phần tử nào.",
    signature: "bool LaRong(List<int> lst)",
    constraints: ["lst có thể là danh sách rỗng nhưng không null"],
    examples: [
      { input: "lst = []", output: "true" },
      { input: "lst = [0]", output: "false", explain: "Danh sách chứa số 0 vẫn là danh sách có phần tử." },
    ], },

  { id: 'b8-c027', level: 'Cơ bản', title: "Cộng hai mảng cùng độ dài",
    requirement: "Cho hai mảng số nguyên a và b cùng độ dài. Trả về mảng mà mỗi phần tử là tổng hai phần tử tương ứng.",
    signature: "int[] CongMang(int[] a, int[] b)",
    constraints: ["a.Length bằng b.Length", "0 <= a.Length <= 100000"],
    examples: [
      { input: "a = [1, 2, 3], b = [10, 20, 30]", output: "[11, 22, 33]" },
      { input: "a = [], b = []", output: "[]" },
    ], },

  { id: 'b8-c028', level: 'Cơ bản', title: "Vị trí xuất hiện cuối cùng",
    requirement: "Cho một mảng nums và giá trị target. Trả về chỉ số xuất hiện cuối cùng của target, không có thì trả về -1.",
    signature: "int ViTriCuoi(int[] nums, int target)",
    constraints: ["0 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [1, 5, 3, 5, 2], target = 5", output: "3" },
      { input: "nums = [1, 2], target = 9", output: "-1" },
    ], },

  { id: 'b8-c029', level: 'Cơ bản', title: "Đếm số lần xuất hiện",
    requirement: "Cho một mảng nums và giá trị target. Trả về số lần target xuất hiện trong mảng.",
    signature: "int DemXuatHien(int[] nums, int target)",
    constraints: ["0 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [20, 15, 20, 33, 20], target = 20", output: "3" },
      { input: "nums = [1], target = 9", output: "0" },
    ], },

  { id: 'b8-c030', level: 'Cơ bản', title: "Thay thế giá trị",
    requirement: "Cho một mảng nums, giá trị cũ và giá trị mới. Trả về mảng sau khi thay mọi lần xuất hiện của giá trị cũ bằng giá trị mới.",
    signature: "int[] ThayThe(int[] nums, int cu, int moi)",
    constraints: ["0 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [1, 2, 1, 3], cu = 1, moi = 9", output: "[9, 2, 9, 3]" },
      { input: "nums = [5], cu = 1, moi = 9", output: "[5]" },
    ], },

  { id: 'b8-c031', level: 'Cơ bản', title: "Xoá phần tử thoả điều kiện",
    requirement: "Cho một List<int> và một mốc. Xoá mọi phần tử lớn hơn hoặc bằng mốc rồi trả về danh sách còn lại.",
    signature: "List<int> XoaTheoDieuKien(List<int> lst, int moc)",
    constraints: ["0 <= lst.Count <= 100000"],
    examples: [
      { input: "lst = [10, 20, 30, 5], moc = 20", output: "[10, 5]" },
      { input: "lst = [1, 2], moc = 0", output: "[]" },
    ],
    hint: "RemoveAll nhận một biểu thức điều kiện.", },

  { id: 'b8-c032', level: 'Cơ bản', title: "Chèn phần tử vào đầu",
    requirement: "Cho một List<int> và một giá trị. Chèn giá trị vào vị trí đầu tiên rồi trả về danh sách.",
    signature: "List<int> ChenDau(List<int> lst, int giaTri)",
    constraints: ["0 <= lst.Count <= 100000"],
    examples: [
      { input: "lst = [2, 3], giaTri = 1", output: "[1, 2, 3]" },
      { input: "lst = [], giaTri = 1", output: "[1]" },
    ], },

  { id: 'b8-c033', level: 'Cơ bản', title: "Tất cả đều dương",
    requirement: "Cho một mảng số nguyên nums. Trả về true nếu mọi phần tử đều lớn hơn 0. Mảng rỗng coi như thoả.",
    signature: "bool TatCaDuong(int[] nums)",
    constraints: ["0 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [1, 5, 3]", output: "true" },
      { input: "nums = [1, -5]", output: "false" },
      { input: "nums = []", output: "true", explain: "Quy ước mảng rỗng luôn thoả mọi điều kiện." },
    ], },

  { id: 'b8-c034', level: 'Cơ bản', title: "Có phần tử chia hết cho k",
    requirement: "Cho một mảng nums và số nguyên dương k. Trả về true nếu có ít nhất một phần tử chia hết cho k.",
    signature: "bool CoChiaHet(int[] nums, int k)",
    constraints: ["0 <= nums.Length <= 100000", "k > 0"],
    examples: [
      { input: "nums = [7, 9, 12], k = 3", output: "true" },
      { input: "nums = [7, 8], k = 5", output: "false" },
    ], },

  { id: 'b8-c035', level: 'Cơ bản', title: "Nối hai mảng",
    requirement: "Cho hai mảng số nguyên a và b. Trả về mảng gồm toàn bộ a rồi tới toàn bộ b.",
    signature: "int[] NoiMang(int[] a, int[] b)",
    constraints: ["0 <= a.Length, b.Length <= 100000"],
    examples: [
      { input: "a = [1, 2], b = [3, 4]", output: "[1, 2, 3, 4]" },
      { input: "a = [], b = [1]", output: "[1]" },
    ], },

  { id: 'b8-c036', level: 'Cơ bản', title: "Cắt mảng con",
    requirement: "Cho một mảng nums, vị trí bắt đầu và số lượng phần tử cần lấy. Trả về mảng con tương ứng.",
    signature: "int[] CatMangCon(int[] nums, int batDau, int soLuong)",
    constraints: ["0 <= batDau <= nums.Length", "batDau + soLuong <= nums.Length"],
    examples: [
      { input: "nums = [1, 2, 3, 4, 5], batDau = 1, soLuong = 3", output: "[2, 3, 4]" },
      { input: "nums = [1, 2], batDau = 0, soLuong = 0", output: "[]" },
    ], },

  { id: 'b8-c037', level: 'Cơ bản', title: "Đếm chuỗi rỗng",
    requirement: "Cho một mảng chuỗi. Trả về số lượng chuỗi rỗng hoặc chỉ chứa khoảng trắng.",
    signature: "int DemChuoiRong(string[] arr)",
    constraints: ["0 <= arr.Length <= 10000", "Phần tử có thể là null"],
    examples: [
      { input: "arr = [\"a\", \"\", \"  \", \"b\"]", output: "2" },
      { input: "arr = [\"a\"]", output: "0" },
    ],
    hint: "string.IsNullOrWhiteSpace bắt cả null lẫn chuỗi toàn khoảng trắng.", },

  { id: 'b8-c038', level: 'Cơ bản', title: "Đổi mảng số thành mảng chuỗi",
    requirement: "Cho một mảng số nguyên nums. Trả về mảng chuỗi tương ứng.",
    signature: "string[] SangChuoi(int[] nums)",
    constraints: ["0 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [1, 20, 300]", output: "[\"1\", \"20\", \"300\"]" },
      { input: "nums = []", output: "[]" },
    ], },

  { id: 'b8-c039', level: 'Cơ bản', title: "Tổng độ dài các chuỗi",
    requirement: "Cho một mảng chuỗi. Trả về tổng độ dài của tất cả chuỗi.",
    signature: "int TongDoDai(string[] arr)",
    constraints: ["0 <= arr.Length <= 10000"],
    examples: [
      { input: "arr = [\"ab\", \"cde\"]", output: "5" },
      { input: "arr = []", output: "0" },
    ], },

  { id: 'b8-c040', level: 'Cơ bản', title: "Chuỗi dài nhất trong mảng",
    requirement: "Cho một mảng chuỗi. Trả về chuỗi dài nhất; nhiều chuỗi cùng dài thì lấy chuỗi đầu tiên. Mảng rỗng trả về chuỗi rỗng.",
    signature: "string ChuoiDaiNhat(string[] arr)",
    constraints: ["0 <= arr.Length <= 10000"],
    examples: [
      { input: "arr = [\"apple\", \"banana\", \"kiwi\"]", output: "\"banana\"" },
      { input: "arr = [\"ab\", \"cd\"]", output: "\"ab\"", explain: "Cùng dài 2 nên lấy phần tử đầu." },
    ], },

  { id: 'b8-c041', level: 'Cơ bản', title: "Đếm ký tự trong mảng chuỗi",
    requirement: "Cho một mảng chuỗi và một ký tự. Trả về tổng số lần ký tự đó xuất hiện trong tất cả chuỗi.",
    signature: "int DemKyTu(string[] arr, char c)",
    constraints: ["0 <= arr.Length <= 10000"],
    examples: [
      { input: "arr = [\"apple\", \"banana\"], c = 'a'", output: "4" },
      { input: "arr = [\"xyz\"], c = 'a'", output: "0" },
    ], },

  { id: 'b8-c042', level: 'Cơ bản', title: "Đếm số khoá của Dictionary",
    requirement: "Cho một Dictionary<string, int>. Trả về số lượng cặp khoá-giá trị.",
    signature: "int DemKhoa(Dictionary<string, int> dict)",
    constraints: ["0 <= dict.Count <= 100000"],
    examples: [
      { input: "dict = {\"a\": 1, \"b\": 2}", output: "2" },
      { input: "dict = {}", output: "0" },
    ], },

  { id: 'b8-c043', level: 'Cơ bản', title: "Lấy danh sách khoá",
    requirement: "Cho một Dictionary<string, int>. Trả về mảng tất cả khoá theo thứ tự duyệt.",
    signature: "string[] LayKhoa(Dictionary<string, int> dict)",
    constraints: ["0 <= dict.Count <= 100000"],
    examples: [
      { input: "dict = {\"a\": 1, \"b\": 2}", output: "[\"a\", \"b\"]" },
      { input: "dict = {}", output: "[]" },
    ], },

  { id: 'b8-c044', level: 'Cơ bản', title: "Tổng các giá trị trong Dictionary",
    requirement: "Cho một Dictionary<string, int>. Trả về tổng tất cả giá trị.",
    signature: "long TongGiaTri(Dictionary<string, int> dict)",
    constraints: ["0 <= dict.Count <= 100000"],
    examples: [
      { input: "dict = {\"a\": 3, \"b\": 7}", output: "10" },
      { input: "dict = {}", output: "0" },
    ], },

  { id: 'b8-c045', level: 'Cơ bản', title: "Kiểm tra giá trị tồn tại",
    requirement: "Cho một Dictionary<string, int> và một giá trị. Trả về true nếu có khoá nào mang giá trị đó.",
    signature: "bool CoGiaTri(Dictionary<string, int> dict, int giaTri)",
    constraints: ["0 <= dict.Count <= 100000"],
    examples: [
      { input: "dict = {\"a\": 3, \"b\": 7}, giaTri = 7", output: "true" },
      { input: "dict = {\"a\": 3}, giaTri = 9", output: "false" },
    ],
    hint: "ContainsValue duyệt toàn bộ nên chậm hơn ContainsKey.", },

  { id: 'b8-c046', level: 'Cơ bản', title: "Cộng dồn vào Dictionary",
    requirement: "Cho một Dictionary<string, int>, một khoá và một lượng cộng thêm. Nếu khoá đã có thì cộng dồn, chưa có thì tạo mới với đúng lượng đó.",
    signature: "Dictionary<string, int> CongDon(Dictionary<string, int> dict, string khoa, int luong)",
    constraints: ["0 <= dict.Count <= 100000"],
    examples: [
      { input: "dict = {\"ao\": 2}, khoa = \"ao\", luong = 3", output: "{\"ao\": 5}" },
      { input: "dict = {}, khoa = \"quan\", luong = 1", output: "{\"quan\": 1}" },
    ], },

  { id: 'b8-c047', level: 'Cơ bản', title: "Kiểm tra tập con",
    requirement: "Cho hai mảng a và b. Trả về true nếu mọi giá trị trong a đều có mặt trong b.",
    signature: "bool LaTapCon(int[] a, int[] b)",
    constraints: ["0 <= a.Length, b.Length <= 100000"],
    examples: [
      { input: "a = [1, 2], b = [1, 2, 3]", output: "true" },
      { input: "a = [1, 9], b = [1, 2]", output: "false" },
      { input: "a = [], b = [1]", output: "true", explain: "Tập rỗng là tập con của mọi tập." },
    ],
    hint: "HashSet.IsSubsetOf hoặc tự kiểm tra bằng Contains.", },

  { id: 'b8-c048', level: 'Cơ bản', title: "Đếm phần tử chung",
    requirement: "Cho hai mảng a và b. Trả về số lượng giá trị khác nhau xuất hiện ở cả hai mảng.",
    signature: "int DemChung(int[] a, int[] b)",
    constraints: ["0 <= a.Length, b.Length <= 100000"],
    examples: [
      { input: "a = [1, 2, 2, 3], b = [2, 3, 4]", output: "2", explain: "Hai giá trị chung là 2 và 3, giá trị 2 lặp lại chỉ tính một lần." },
      { input: "a = [1], b = [2]", output: "0" },
    ], },

  { id: 'b8-c049', level: 'Cơ bản', title: "Tổng ma trận",
    requirement: "Cho một ma trận số nguyên hai chiều. Trả về tổng tất cả phần tử.",
    signature: "long TongMaTran(int[,] m)",
    constraints: ["0 <= số dòng, số cột <= 1000"],
    examples: [
      { input: "m = [[1, 2], [3, 4]]", output: "10" },
      { input: "m = [[5]]", output: "5" },
    ],
    hint: "m.GetLength(0) là số dòng, m.GetLength(1) là số cột.", },

  { id: 'b8-c050', level: 'Cơ bản', title: "Tổng đường chéo chính",
    requirement: "Cho một ma trận vuông. Trả về tổng các phần tử trên đường chéo chính.",
    signature: "long TongDuongCheo(int[,] m)",
    constraints: ["Ma trận vuông, kích thước tối đa 1000 x 1000"],
    examples: [
      { input: "m = [[1, 2], [3, 4]]", output: "5", explain: "Lấy m[0,0] + m[1,1] = 1 + 4." },
      { input: "m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]", output: "15" },
    ], },
]
