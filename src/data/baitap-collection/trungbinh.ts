import type { Exercise } from '../types'

/** Bài tập collection mức Trung bình. Đề viết theo lối LeetCode. */
export const trungBinh: Exercise[] = [
  { id: 'b8-m001', level: 'Trung bình', title: 'Loại phần tử trùng lặp',
    requirement: 'Cho một mảng số nguyên nums. Trả về mảng đã loại bỏ phần tử trùng, giữ nguyên thứ tự xuất hiện đầu tiên của mỗi giá trị.',
    signature: 'int[] LoaiTrung(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [1, 2, 2, 3, 3, 3, 1]', output: '[1, 2, 3]' },
      { input: 'nums = [5, 5, 5]', output: '[5]' },
    ],
    hint: 'HashSet để nhớ đã gặp, List để giữ thứ tự.' },

  { id: 'b8-m002', level: 'Trung bình', title: 'Đếm tần suất phần tử',
    requirement: 'Cho một mảng số nguyên nums. Trả về Dictionary ánh xạ mỗi giá trị sang số lần nó xuất hiện.',
    signature: 'Dictionary<int, int> DemTanSuat(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 15, 20, 33, 15, 20]', output: '{20: 3, 15: 2, 33: 1}' },
      { input: 'nums = []', output: '{}' },
    ] },

  { id: 'b8-m003', level: 'Trung bình', title: 'Phần tử xuất hiện nhiều nhất',
    requirement: 'Cho một mảng số nguyên nums. Trả về phần tử xuất hiện nhiều lần nhất. Nếu hoà thì trả về phần tử gặp trước trong mảng.',
    signature: 'int XuatHienNhieuNhat(int[] nums)',
    constraints: ['1 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 15, 20, 33, 15, 20]', output: '20', explain: '20 xuất hiện 3 lần.' },
      { input: 'nums = [1, 2, 2, 1]', output: '1', explain: 'Cùng 2 lần, nhưng 1 gặp trước.' },
    ] },

  { id: 'b8-m004', level: 'Trung bình', title: 'Phần tử chỉ xuất hiện một lần',
    requirement: 'Cho một mảng số nguyên nums. Trả về mảng các phần tử xuất hiện đúng một lần, theo thứ tự xuất hiện trong mảng gốc.',
    signature: 'int[] ChiMotLan(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [4, 3, 4, 5, 3, 7]', output: '[5, 7]' },
      { input: 'nums = [1, 1]', output: '[]' },
    ] },

  { id: 'b8-m005', level: 'Trung bình', title: 'Hợp hai danh sách',
    requirement: 'Cho hai mảng số nguyên a và b. Trả về mảng chứa tất cả giá trị xuất hiện ở ít nhất một trong hai mảng, không trùng lặp, theo thứ tự gặp đầu tiên.',
    signature: 'int[] Hop(int[] a, int[] b)',
    constraints: ['0 <= a.Length, b.Length <= 100000'],
    examples: [
      { input: 'a = [1, 2, 3], b = [3, 4, 5]', output: '[1, 2, 3, 4, 5]' },
      { input: 'a = [], b = [1, 1]', output: '[1]' },
    ] },

  { id: 'b8-m006', level: 'Trung bình', title: 'Giao hai danh sách',
    requirement: 'Cho hai mảng số nguyên a và b. Trả về mảng các giá trị có mặt ở cả hai mảng, không trùng lặp.',
    signature: 'int[] Giao(int[] a, int[] b)',
    constraints: ['0 <= a.Length, b.Length <= 100000', 'Lời giải nên chạy trong O(n + m)'],
    examples: [
      { input: 'a = [1, 2, 3, 4], b = [3, 4, 5]', output: '[3, 4]' },
      { input: 'a = [1], b = [2]', output: '[]' },
    ],
    hint: 'Đưa mảng thứ hai vào HashSet để kiểm tra tồn tại gần như tức thì.' },

  { id: 'b8-m007', level: 'Trung bình', title: 'Hiệu hai danh sách',
    requirement: 'Cho hai mảng số nguyên a và b. Trả về mảng các giá trị có trong a nhưng không có trong b, không trùng lặp.',
    signature: 'int[] Hieu(int[] a, int[] b)',
    constraints: ['0 <= a.Length, b.Length <= 100000'],
    examples: [
      { input: 'a = [1, 2, 3, 4], b = [3, 4]', output: '[1, 2]' },
      { input: 'a = [1, 1, 2], b = [1]', output: '[2]' },
    ] },

  { id: 'b8-m008', level: 'Trung bình', title: 'Tách chẵn lẻ',
    requirement: 'Cho một mảng số nguyên nums. Trả về cặp gồm mảng các số chẵn và mảng các số lẻ, mỗi mảng giữ nguyên thứ tự ban đầu.',
    signature: '(int[] chan, int[] le) TachChanLe(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [1, 2, 3, 4, 5, 6]', output: '([2, 4, 6], [1, 3, 5])' },
      { input: 'nums = [2, 4]', output: '([2, 4], [])' },
    ] },

  { id: 'b8-m009', level: 'Trung bình', title: 'Sắp xếp chuỗi theo độ dài',
    requirement: 'Cho một mảng chuỗi. Trả về mảng đã sắp theo độ dài tăng dần; các chuỗi cùng độ dài thì xếp theo thứ tự bảng chữ cái.',
    signature: 'string[] SapTheoDoDai(string[] arr)',
    constraints: ['0 <= arr.Length <= 10000'],
    examples: [
      { input: 'arr = ["apple","banana","kiwi","mango","grape"]', output: '["kiwi", "apple", "grape", "mango", "banana"]' },
      { input: 'arr = ["bb", "aa"]', output: '["aa", "bb"]' },
    ] },

  { id: 'b8-m010', level: 'Trung bình', title: 'Phần tử lớn thứ hai',
    requirement: 'Cho một mảng số nguyên nums. Trả về giá trị lớn thứ hai, tính theo giá trị khác nhau. Không tồn tại thì trả về int.MinValue.',
    signature: 'int LonThuHai(int[] nums)',
    constraints: ['0 <= nums.Length <= 100000'],
    examples: [
      { input: 'nums = [20, 97, 81, 97, 63]', output: '81', explain: 'Hai giá trị 97 chỉ tính một lần.' },
      { input: 'nums = [5, 5, 5]', output: 'int.MinValue', explain: 'Chỉ có một giá trị khác nhau nên không có hạng nhì.' },
    ] },

  { id: 'b8-m011', level: 'Trung bình', title: 'Xoay mảng sang phải k bước',
    requirement: 'Cho một mảng số nguyên nums và số nguyên không âm k. Trả về mảng sau khi xoay sang phải k bước.',
    signature: 'int[] Xoay(int[] nums, int k)',
    constraints: ['0 <= nums.Length <= 100000', '0 <= k <= 1_000_000_000'],
    examples: [
      { input: 'nums = [1, 2, 3, 4, 5], k = 2', output: '[4, 5, 1, 2, 3]' },
      { input: 'nums = [1, 2, 3], k = 3', output: '[1, 2, 3]', explain: 'k bằng đúng độ dài thì mảng trở về như cũ — nhớ lấy k % n.' },
    ],
    hint: 'Chỉ số mới của phần tử i là (i + k) % n.' },

  { id: 'b8-m012', level: 'Trung bình', title: 'Trộn xen kẽ hai mảng',
    requirement: 'Cho hai mảng số nguyên a và b. Trả về mảng lấy xen kẽ từng phần tử của hai mảng; mảng nào dài hơn thì phần dư nối vào cuối.',
    signature: 'int[] TronXenKe(int[] a, int[] b)',
    constraints: ['0 <= a.Length, b.Length <= 100000'],
    examples: [
      { input: 'a = [1, 2, 3], b = [7, 8, 9, 10, 11]', output: '[1, 7, 2, 8, 3, 9, 10, 11]' },
      { input: 'a = [], b = [1, 2]', output: '[1, 2]' },
    ] },

  { id: 'b8-m013', level: 'Trung bình', title: 'Hai mảng là hoán vị của nhau',
    requirement: 'Cho hai mảng số nguyên a và b. Trả về true nếu chúng chứa cùng các giá trị với cùng số lần xuất hiện, bất kể thứ tự.',
    signature: 'bool LaHoanVi(int[] a, int[] b)',
    constraints: ['0 <= a.Length, b.Length <= 100000'],
    examples: [
      { input: 'a = [1, 2, 2, 3], b = [3, 2, 1, 2]', output: 'true' },
      { input: 'a = [1, 2], b = [1, 2, 2]', output: 'false' },
    ],
    hint: 'Đếm tần suất bằng Dictionary rồi so hai bảng đếm.' },

  { id: 'b8-m014', level: 'Trung bình', title: 'Đếm tần suất ký tự',
    requirement: 'Cho một chuỗi s. Trả về Dictionary ánh xạ mỗi ký tự sang số lần xuất hiện, bỏ qua khoảng trắng và không phân biệt hoa thường.',
    signature: 'Dictionary<char, int> DemKyTu(string s)',
    constraints: ['0 <= s.Length <= 100000'],
    examples: [
      { input: 's = "Hello World"', output: "{'h':1, 'e':1, 'l':3, 'o':2, 'w':1, 'r':1, 'd':1}" },
      { input: 's = "   "', output: '{}' },
    ] },

  { id: 'b8-m015', level: 'Trung bình', title: 'Đếm tần suất từ',
    requirement: 'Cho một đoạn văn s. Trả về danh sách các cặp (từ, số lần) sắp xếp theo số lần giảm dần; số lần bằng nhau thì xếp theo bảng chữ cái.',
    signature: 'List<KeyValuePair<string, int>> DemTu(string s)',
    constraints: ['0 <= s.Length <= 100000', 'Các từ cách nhau bằng khoảng trắng'],
    examples: [
      { input: 's = "a b a c b a"', output: '[("a", 3), ("b", 2), ("c", 1)]' },
      { input: 's = ""', output: '[]' },
    ] },

  { id: 'b8-m016', level: 'Trung bình', title: 'Nhóm từ theo chữ cái đầu',
    requirement: 'Cho một mảng chuỗi. Trả về Dictionary ánh xạ chữ cái đầu sang danh sách các từ bắt đầu bằng chữ cái đó.',
    signature: 'Dictionary<char, List<string>> NhomTheoChuDau(string[] arr)',
    constraints: ['0 <= arr.Length <= 10000', 'Mọi chuỗi đều khác rỗng'],
    examples: [
      { input: 'arr = ["mango", "melon", "kiwi"]', output: "{'m': [\"mango\", \"melon\"], 'k': [\"kiwi\"]}" },
      { input: 'arr = []', output: '{}' },
    ],
    hint: 'Chưa có khoá thì tạo List rỗng trước khi Add.' },

  { id: 'b8-m017', level: 'Trung bình', title: 'Gộp số lượng giỏ hàng',
    requirement: 'Cho một mảng tên sản phẩm, có thể lặp lại. Trả về Dictionary ánh xạ tên sản phẩm sang tổng số lượng.',
    signature: 'Dictionary<string, int> GopGioHang(string[] sanPham)',
    constraints: ['0 <= sanPham.Length <= 100000'],
    examples: [
      { input: 'sanPham = ["ao", "quan", "ao"]', output: '{"ao": 2, "quan": 1}' },
      { input: 'sanPham = []', output: '{}' },
    ] },

  { id: 'b8-m018', level: 'Trung bình', title: 'Điểm trung bình từng sinh viên',
    requirement: 'Cho một Dictionary ánh xạ tên sinh viên sang danh sách điểm. Trả về Dictionary ánh xạ tên sang điểm trung bình làm tròn 2 chữ số.',
    signature: 'Dictionary<string, double> TinhTrungBinh(Dictionary<string, List<double>> bangDiem)',
    constraints: ['Mỗi sinh viên có ít nhất một điểm'],
    examples: [
      { input: 'bangDiem = {"An": [8, 9], "Binh": [5, 6, 7]}', output: '{"An": 8.5, "Binh": 6}' },
    ] },

  { id: 'b8-m019', level: 'Trung bình', title: 'Thống kê xếp loại',
    requirement: 'Cho một mảng điểm số từ 0 đến 10. Trả về Dictionary đếm số bài theo xếp loại: Giỏi (>= 8), Khá (>= 6.5), Trung bình (>= 5), Yếu (còn lại).',
    signature: 'Dictionary<string, int> ThongKeXepLoai(double[] diem)',
    constraints: ['0 <= diem.Length <= 100000', '0 <= diem[i] <= 10'],
    examples: [
      { input: 'diem = [9, 7, 5, 4, 8.5, 6]', output: '{"Giỏi": 2, "Khá": 1, "Trung bình": 2, "Yếu": 1}' },
    ] },

  { id: 'b8-m020', level: 'Trung bình', title: 'Đảo ngược Dictionary',
    requirement: 'Cho một Dictionary<string, string> đảm bảo các value đôi một khác nhau. Trả về Dictionary mới với key và value đổi chỗ cho nhau.',
    signature: 'Dictionary<string, string> DaoNguocDict(Dictionary<string, string> dict)',
    constraints: ['Các value đôi một khác nhau'],
    examples: [
      { input: 'dict = {"VN": "Việt Nam", "JP": "Nhật Bản"}', output: '{"Việt Nam": "VN", "Nhật Bản": "JP"}' },
      { input: 'dict = {}', output: '{}' },
    ] },

  { id: 'b8-m021', level: 'Trung bình', title: "Prefix Sum — tổng đoạn",
    requirement: "Cho một mảng nums và nhiều truy vấn (l, r). Với mỗi truy vấn trả về tổng các phần tử từ chỉ số l đến r. Phải trả lời mỗi truy vấn trong O(1).",
    signature: "long[] TongDoan(int[] nums, int[][] truyVan)",
    constraints: ["1 <= nums.Length <= 100000", "1 <= số truy vấn <= 100000", "0 <= l <= r < nums.Length"],
    examples: [
      { input: "nums = [1, 2, 3, 4], truyVan = [[0,1],[1,3]]", output: "[3, 9]", explain: "1+2 = 3 và 2+3+4 = 9." },
      { input: "nums = [5], truyVan = [[0,0]]", output: "[5]" },
    ],
    hint: "Dựng mảng tổng tiền tố một lần rồi mỗi truy vấn chỉ là một phép trừ.", },

  { id: 'b8-m022', level: 'Trung bình', title: "Dời số 0 về cuối giữ thứ tự",
    requirement: "Cho một mảng nums. Trả về mảng mới với các số khác 0 giữ nguyên thứ tự, các số 0 dồn về cuối.",
    signature: "int[] DonSoKhong(int[] nums)",
    constraints: ["0 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [0, 1, 0, 3, 12]", output: "[1, 3, 12, 0, 0]" },
      { input: "nums = [0, 0]", output: "[0, 0]" },
    ], },

  { id: 'b8-m023', level: 'Trung bình', title: "Tìm kiếm nhị phân",
    requirement: "Cho một mảng đã sắp xếp tăng dần và giá trị target. Trả về chỉ số của target, không có thì trả về -1. Lời giải phải chạy trong O(log n).",
    signature: "int TimNhiPhan(int[] nums, int target)",
    constraints: ["0 <= nums.Length <= 100000", "nums đã sắp xếp tăng dần"],
    examples: [
      { input: "nums = [1, 3, 5, 7, 9], target = 7", output: "3" },
      { input: "nums = [1, 3], target = 2", output: "-1" },
    ],
    hint: "Dùng trai + (phai - trai) / 2 thay vì (trai + phai) / 2 để tránh tràn số.", },

  { id: 'b8-m024', level: 'Trung bình', title: "Vị trí chèn giữ thứ tự",
    requirement: "Cho một mảng đã sắp xếp và giá trị target. Trả về chỉ số nơi target đang nằm, hoặc chỉ số nên chèn vào để mảng vẫn sắp xếp.",
    signature: "int ViTriChen(int[] nums, int target)",
    constraints: ["0 <= nums.Length <= 100000", "nums đã sắp xếp tăng dần"],
    examples: [
      { input: "nums = [1, 3, 5, 6], target = 5", output: "2" },
      { input: "nums = [1, 3, 5, 6], target = 2", output: "1" },
      { input: "nums = [1, 3], target = 7", output: "2" },
    ], },

  { id: 'b8-m025', level: 'Trung bình', title: "Gộp hai mảng đã sắp xếp",
    requirement: "Cho hai mảng đã sắp xếp tăng dần. Trả về một mảng chứa toàn bộ phần tử của cả hai, vẫn sắp xếp tăng dần. Không được gộp rồi sort lại.",
    signature: "int[] GopDaSapXep(int[] a, int[] b)",
    constraints: ["0 <= a.Length, b.Length <= 100000", "Lời giải phải chạy trong O(n + m)"],
    examples: [
      { input: "a = [1, 3, 5], b = [2, 4]", output: "[1, 2, 3, 4, 5]" },
      { input: "a = [], b = [1]", output: "[1]" },
    ],
    hint: "Hai con trỏ chạy song song, mỗi bước lấy phần tử nhỏ hơn.", },

  { id: 'b8-m026', level: 'Trung bình', title: "Loại trùng khỏi mảng đã sắp xếp",
    requirement: "Cho một mảng đã sắp xếp tăng dần. Trả về mảng đã bỏ phần tử trùng, không dùng HashSet.",
    signature: "int[] LoaiTrungDaSap(int[] nums)",
    constraints: ["0 <= nums.Length <= 100000", "nums đã sắp xếp tăng dần", "Bộ nhớ phụ O(1) ngoài mảng kết quả"],
    examples: [
      { input: "nums = [1, 1, 2, 3, 3, 3]", output: "[1, 2, 3]" },
      { input: "nums = [1]", output: "[1]" },
    ],
    hint: "Mảng đã sắp thì phần tử trùng luôn nằm cạnh nhau.", },

  { id: 'b8-m027', level: 'Trung bình', title: "Tổng mảng con lớn nhất",
    requirement: "Cho một mảng số nguyên nums. Trả về tổng lớn nhất của một mảng con liên tiếp không rỗng.",
    signature: "int TongMangConLonNhat(int[] nums)",
    constraints: ["1 <= nums.Length <= 100000", "-10000 <= nums[i] <= 10000"],
    examples: [
      { input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]", output: "6", explain: "Mảng con [4, -1, 2, 1] có tổng 6." },
      { input: "nums = [-3, -1, -2]", output: "-1", explain: "Toàn số âm thì lấy phần tử lớn nhất." },
    ],
    hint: "Thuật toán Kadane: mỗi bước chọn giữa nối tiếp mảng con cũ hay bắt đầu lại.", },

  { id: 'b8-m028', level: 'Trung bình', title: "Tích mảng con lớn nhất",
    requirement: "Cho một mảng số nguyên nums. Trả về tích lớn nhất của một mảng con liên tiếp không rỗng.",
    signature: "int TichMangConLonNhat(int[] nums)",
    constraints: ["1 <= nums.Length <= 20000", "Kết quả nằm trong phạm vi int"],
    examples: [
      { input: "nums = [2, 3, -2, 4]", output: "6", explain: "Mảng con [2, 3] cho tích 6." },
      { input: "nums = [-2, 0, -1]", output: "0" },
    ],
    hint: "Phải giữ cả tích lớn nhất lẫn tích nhỏ nhất, vì nhân thêm một số âm sẽ đảo vai trò.", },

  { id: 'b8-m029', level: 'Trung bình', title: "Cửa sổ trượt kích thước k",
    requirement: "Cho một mảng nums và số nguyên k. Trả về tổng lớn nhất của một đoạn liên tiếp gồm đúng k phần tử.",
    signature: "long TongCuaSoLonNhat(int[] nums, int k)",
    constraints: ["1 <= k <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [2, 1, 5, 1, 3, 2], k = 3", output: "9", explain: "Đoạn [5, 1, 3] có tổng 9." },
      { input: "nums = [1, 2], k = 2", output: "3" },
    ],
    hint: "Trượt cửa sổ: cộng phần tử mới, trừ phần tử vừa ra khỏi cửa sổ.", },

  { id: 'b8-m030', level: 'Trung bình', title: "Trung bình trượt lớn nhất",
    requirement: "Cho một mảng nums và số nguyên k. Trả về trung bình cộng lớn nhất của một đoạn liên tiếp k phần tử, làm tròn 5 chữ số.",
    signature: "double TrungBinhTruotLonNhat(int[] nums, int k)",
    constraints: ["1 <= k <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [1, 12, -5, -6, 50, 3], k = 4", output: "12.75", explain: "Đoạn [12, -5, -6, 50] có trung bình 12.75." },
    ], },

  { id: 'b8-m031', level: 'Trung bình', title: "Hai số có tổng gần target nhất",
    requirement: "Cho một mảng nums và giá trị target. Trả về tổng của hai phần tử khác chỉ số có giá trị gần target nhất.",
    signature: "int TongGanNhat(int[] nums, int target)",
    constraints: ["2 <= nums.Length <= 10000"],
    examples: [
      { input: "nums = [1, 3, 5, 8], target = 9", output: "9", explain: "1 + 8 = 9 đúng bằng target." },
      { input: "nums = [1, 2], target = 10", output: "3" },
    ],
    hint: "Sắp xếp rồi dùng hai con trỏ.", },

  { id: 'b8-m032', level: 'Trung bình', title: "Đếm cặp có tổng bằng k",
    requirement: "Cho một mảng nums và số k. Trả về số cặp chỉ số (i, j) với i < j sao cho nums[i] + nums[j] = k.",
    signature: "int DemCap(int[] nums, int k)",
    constraints: ["0 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [1, 5, 7, -1], k = 6", output: "2", explain: "Hai cặp (1,5) và (7,-1)." },
      { input: "nums = [1, 1, 1], k = 2", output: "3", explain: "Ba cặp chỉ số khác nhau đều cho tổng 2." },
    ],
    hint: "Dictionary đếm tần suất, chú ý trường hợp hai phần tử bằng nhau.", },

  { id: 'b8-m033', level: 'Trung bình', title: "Phần tử xuất hiện quá n/3 lần",
    requirement: "Cho một mảng nums. Trả về tất cả phần tử xuất hiện nhiều hơn n/3 lần, theo thứ tự tăng dần.",
    signature: "int[] QuaMotPhanBa(int[] nums)",
    constraints: ["1 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [3, 2, 3]", output: "[3]" },
      { input: "nums = [1, 1, 1, 3, 3, 2, 2, 2]", output: "[1, 2]" },
    ], },

  { id: 'b8-m034', level: 'Trung bình', title: "Số lần xuất hiện của mỗi độ dài chuỗi",
    requirement: "Cho một mảng chuỗi. Trả về Dictionary ánh xạ độ dài sang số lượng chuỗi có độ dài đó.",
    signature: "Dictionary<int, int> DemTheoDoDai(string[] arr)",
    constraints: ["0 <= arr.Length <= 10000"],
    examples: [
      { input: "arr = [\"a\", \"bb\", \"cc\", \"ddd\"]", output: "{1: 1, 2: 2, 3: 1}" },
      { input: "arr = []", output: "{}" },
    ], },

  { id: 'b8-m035', level: 'Trung bình', title: "Nhóm số theo số dư",
    requirement: "Cho một mảng nums và số nguyên dương k. Trả về Dictionary ánh xạ số dư khi chia k sang danh sách các phần tử có số dư đó.",
    signature: "Dictionary<int, List<int>> NhomTheoSoDu(int[] nums, int k)",
    constraints: ["0 <= nums.Length <= 100000", "k > 0", "Mọi phần tử không âm"],
    examples: [
      { input: "nums = [1, 2, 3, 4, 5], k = 2", output: "{1: [1, 3, 5], 0: [2, 4]}" },
    ], },

  { id: 'b8-m036', level: 'Trung bình', title: "Sắp xếp theo tần suất",
    requirement: "Cho một mảng nums. Trả về mảng đã sắp theo số lần xuất hiện giảm dần; cùng số lần thì giá trị nhỏ đứng trước.",
    signature: "int[] SapTheoTanSuat(int[] nums)",
    constraints: ["0 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [1, 1, 2, 2, 2, 3]", output: "[2, 2, 2, 1, 1, 3]" },
      { input: "nums = [2, 3, 1]", output: "[1, 2, 3]", explain: "Mỗi số một lần nên xếp theo giá trị tăng dần." },
    ], },

  { id: 'b8-m037', level: 'Trung bình', title: "Sắp xếp chuỗi theo ký tự",
    requirement: "Cho một chuỗi s. Trả về chuỗi có các ký tự sắp xếp tăng dần.",
    signature: "string SapKyTu(string s)",
    constraints: ["0 <= s.Length <= 100000"],
    examples: [
      { input: "s = \"banana\"", output: "\"aaabnn\"" },
      { input: "s = \"\"", output: "\"\"" },
    ], },

  { id: 'b8-m038', level: 'Trung bình', title: "Ký tự không lặp đầu tiên",
    requirement: "Cho một chuỗi s. Trả về chỉ số của ký tự đầu tiên chỉ xuất hiện một lần, không có thì trả về -1.",
    signature: "int KyTuKhongLap(string s)",
    constraints: ["0 <= s.Length <= 100000"],
    examples: [
      { input: "s = \"leetcode\"", output: "0" },
      { input: "s = \"aabb\"", output: "-1" },
    ],
    hint: "Duyệt hai lượt: một lượt đếm, một lượt tìm.", },

  { id: 'b8-m039', level: 'Trung bình', title: "Hai chuỗi khác nhau một ký tự",
    requirement: "Cho hai chuỗi s và t. Trả về true nếu có thể biến s thành t bằng đúng một thao tác: thêm, xoá hoặc thay một ký tự.",
    signature: "bool KhacMotKyTu(string s, string t)",
    constraints: ["0 <= s.Length, t.Length <= 100000"],
    examples: [
      { input: "s = \"ab\", t = \"acb\"", output: "true", explain: "Thêm một ký tự c." },
      { input: "s = \"ab\", t = \"ab\"", output: "false", explain: "Giống hệt nhau nên không phải một thao tác." },
    ], },

  { id: 'b8-m040', level: 'Trung bình', title: "Đếm chuỗi con xuất hiện",
    requirement: "Cho hai chuỗi s và sub. Trả về số lần sub xuất hiện trong s, các lần xuất hiện được phép chồng lấn.",
    signature: "int DemChuoiCon(string s, string sub)",
    constraints: ["1 <= sub.Length <= s.Length <= 100000"],
    examples: [
      { input: "s = \"aaaa\", sub = \"aa\"", output: "3", explain: "Ba vị trí bắt đầu 0, 1, 2." },
      { input: "s = \"abc\", sub = \"d\"", output: "0" },
    ], },

  { id: 'b8-m041', level: 'Trung bình', title: "Dictionary lồng nhau — bảng điểm lớp",
    requirement: "Cho một Dictionary ánh xạ tên lớp sang Dictionary tên học sinh và điểm. Trả về Dictionary ánh xạ tên lớp sang điểm trung bình của lớp.",
    signature: "Dictionary<string, double> DiemTungLop(Dictionary<string, Dictionary<string, double>> truong)",
    constraints: ["Mỗi lớp có ít nhất một học sinh"],
    examples: [
      { input: "truong = {\"A\": {\"An\": 8, \"Binh\": 6}}", output: "{\"A\": 7}" },
    ], },

  { id: 'b8-m042', level: 'Trung bình', title: "Đếm anagram trong danh sách",
    requirement: "Cho một mảng chuỗi và một chuỗi mẫu. Trả về số chuỗi trong mảng là hoán vị ký tự của chuỗi mẫu.",
    signature: "int DemAnagram(string[] arr, string mau)",
    constraints: ["0 <= arr.Length <= 10000"],
    examples: [
      { input: "arr = [\"eat\", \"tea\", \"tan\"], mau = \"ate\"", output: "2" },
      { input: "arr = [\"abc\"], mau = \"abd\"", output: "0" },
    ], },

  { id: 'b8-m043', level: 'Trung bình', title: "Tìm số còn thiếu",
    requirement: "Cho một mảng chứa n số khác nhau lấy từ 0 đến n. Trả về số duy nhất bị thiếu.",
    signature: "int SoConThieu(int[] nums)",
    constraints: ["1 <= nums.Length <= 100000", "Các phần tử đôi một khác nhau"],
    examples: [
      { input: "nums = [3, 0, 1]", output: "2" },
      { input: "nums = [0]", output: "1" },
    ],
    hint: "Tổng 0..n trừ đi tổng mảng.", },

  { id: 'b8-m044', level: 'Trung bình', title: "Số xuất hiện lẻ lần",
    requirement: "Cho một mảng trong đó mọi giá trị xuất hiện chẵn lần trừ đúng một giá trị. Trả về giá trị đó, dùng bộ nhớ O(1).",
    signature: "int SoLeLan(int[] nums)",
    constraints: ["1 <= nums.Length <= 100000", "Bộ nhớ phụ O(1)"],
    examples: [
      { input: "nums = [2, 2, 1]", output: "1" },
      { input: "nums = [4, 1, 2, 1, 2]", output: "4" },
    ],
    hint: "Phép XOR: a ^ a = 0 và a ^ 0 = a.", },

  { id: 'b8-m045', level: 'Trung bình', title: "Giao nhiều mảng",
    requirement: "Cho một danh sách các mảng số nguyên. Trả về mảng các giá trị xuất hiện ở TẤT CẢ các mảng, sắp xếp tăng dần.",
    signature: "int[] GiaoNhieuMang(List<int[]> mang)",
    constraints: ["1 <= số mảng <= 1000", "Tổng số phần tử <= 100000"],
    examples: [
      { input: "mang = [[1,2,3],[2,3,4],[3,2]]", output: "[2, 3]" },
      { input: "mang = [[1],[2]]", output: "[]" },
    ], },

  { id: 'b8-m046', level: 'Trung bình', title: "Kiểm tra mảng sắp xếp",
    requirement: "Cho một mảng nums. Trả về true nếu mảng đã sắp xếp tăng dần hoặc giảm dần.",
    signature: "bool DaSapXep(int[] nums)",
    constraints: ["0 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [1, 2, 2, 3]", output: "true" },
      { input: "nums = [3, 2, 1]", output: "true" },
      { input: "nums = [1, 3, 2]", output: "false" },
    ], },

  { id: 'b8-m047', level: 'Trung bình', title: "Phần tử đỉnh",
    requirement: "Cho một mảng nums mà hai phần tử kề nhau luôn khác giá trị. Trả về chỉ số của một phần tử lớn hơn cả hai phần tử kề nó.",
    signature: "int TimDinh(int[] nums)",
    constraints: ["1 <= nums.Length <= 100000", "Phần tử ngoài biên coi như âm vô cùng"],
    examples: [
      { input: "nums = [1, 2, 3, 1]", output: "2" },
      { input: "nums = [1, 2, 1, 3, 5, 6, 4]", output: "1 hoặc 5", explain: "Có nhiều đỉnh thì trả về chỉ số nào cũng được." },
    ], },

  { id: 'b8-m048', level: 'Trung bình', title: "Xoay ma trận 90 độ",
    requirement: "Cho một ma trận vuông. Trả về ma trận sau khi xoay 90 độ theo chiều kim đồng hồ.",
    signature: "int[,] XoayMaTran(int[,] m)",
    constraints: ["Ma trận vuông tối đa 1000 x 1000"],
    examples: [
      { input: "m = [[1,2],[3,4]]", output: "[[3,1],[4,2]]" },
    ],
    hint: "Chuyển vị rồi đảo từng dòng.", },

  { id: 'b8-m049', level: 'Trung bình', title: "Duyệt ma trận xoắn ốc",
    requirement: "Cho một ma trận. Trả về mảng các phần tử theo thứ tự duyệt xoắn ốc từ ngoài vào trong.",
    signature: "int[] DuyetXoanOc(int[,] m)",
    constraints: ["1 <= số dòng, số cột <= 100"],
    examples: [
      { input: "m = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" },
    ],
    hint: "Giữ bốn biên trên, dưới, trái, phải rồi thu hẹp dần.", },

  { id: 'b8-m050', level: 'Trung bình', title: "Tổng từng dòng ma trận",
    requirement: "Cho một ma trận. Trả về mảng tổng của từng dòng.",
    signature: "long[] TongTungDong(int[,] m)",
    constraints: ["1 <= số dòng, số cột <= 1000"],
    examples: [
      { input: "m = [[1,2],[3,4]]", output: "[3, 7]" },
    ], },

  { id: 'b8-m051', level: 'Trung bình', title: "Ngăn xếp kiểm tra ngoặc",
    requirement: "Cho một chuỗi chỉ gồm các ký tự ngoặc (, ), [, ], {, }. Trả về true nếu chuỗi ngoặc hợp lệ.",
    signature: "bool NgoacHopLe(string s)",
    constraints: ["0 <= s.Length <= 100000"],
    examples: [
      { input: "s = \"()[]{}\"", output: "true" },
      { input: "s = \"(]\"", output: "false" },
      { input: "s = \"([)]\"", output: "false", explain: "Đóng sai thứ tự lồng nhau." },
    ],
    hint: "Gặp ngoặc mở thì đẩy vào ngăn xếp, gặp ngoặc đóng thì lấy ra so.", },

  { id: 'b8-m052', level: 'Trung bình', title: "Hàng đợi mô phỏng in tài liệu",
    requirement: "Cho một danh sách tên tài liệu đưa vào hàng đợi. Trả về thứ tự chúng được in ra theo nguyên tắc vào trước ra trước.",
    signature: "string[] ThuTuIn(string[] taiLieu)",
    constraints: ["0 <= taiLieu.Length <= 100000"],
    examples: [
      { input: "taiLieu = [\"a\", \"b\", \"c\"]", output: "[\"a\", \"b\", \"c\"]" },
    ],
    hint: "Queue<T> có Enqueue và Dequeue.", },

  { id: 'b8-m053', level: 'Trung bình', title: "Số lớn nhất trong mỗi cửa sổ",
    requirement: "Cho một mảng nums và số nguyên k. Trả về mảng giá trị lớn nhất của từng cửa sổ k phần tử liên tiếp.",
    signature: "int[] MaxCuaSo(int[] nums, int k)",
    constraints: ["1 <= k <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ], },

  { id: 'b8-m054', level: 'Trung bình', title: "Đếm đảo ngược đơn giản",
    requirement: "Cho một mảng nums. Trả về số cặp chỉ số (i, j) với i < j và nums[i] > nums[j].",
    signature: "long DemCapNghich(int[] nums)",
    constraints: ["1 <= nums.Length <= 2000"],
    examples: [
      { input: "nums = [2, 1, 3]", output: "1", explain: "Chỉ có cặp (2, 1)." },
      { input: "nums = [1, 2, 3]", output: "0" },
    ], },

  { id: 'b8-m055', level: 'Trung bình', title: "Danh sách liên kết bằng List",
    requirement: "Cho một List<int> và một vị trí. Xoá phần tử tại vị trí đó rồi trả về danh sách, vị trí không hợp lệ thì giữ nguyên.",
    signature: "List<int> XoaAnToan(List<int> lst, int viTri)",
    constraints: ["0 <= lst.Count <= 100000"],
    examples: [
      { input: "lst = [1,2,3], viTri = 1", output: "[1, 3]" },
      { input: "lst = [1,2,3], viTri = 9", output: "[1, 2, 3]" },
    ], },

  { id: 'b8-m056', level: 'Trung bình', title: "Gộp Dictionary",
    requirement: "Cho hai Dictionary<string, int>. Trả về Dictionary gộp, khoá trùng thì cộng giá trị lại.",
    signature: "Dictionary<string, int> GopDict(Dictionary<string, int> a, Dictionary<string, int> b)",
    constraints: ["0 <= a.Count, b.Count <= 100000"],
    examples: [
      { input: "a = {\"x\": 1, \"y\": 2}, b = {\"y\": 3, \"z\": 4}", output: "{\"x\": 1, \"y\": 5, \"z\": 4}" },
    ], },

  { id: 'b8-m057', level: 'Trung bình', title: "Lọc Dictionary theo giá trị",
    requirement: "Cho một Dictionary<string, int> và một mốc. Trả về Dictionary chỉ giữ các cặp có giá trị lớn hơn mốc.",
    signature: "Dictionary<string, int> LocDict(Dictionary<string, int> dict, int moc)",
    constraints: ["0 <= dict.Count <= 100000"],
    examples: [
      { input: "dict = {\"a\": 5, \"b\": 10}, moc = 7", output: "{\"b\": 10}" },
      { input: "dict = {\"a\": 1}, moc = 100", output: "{}" },
    ], },

  { id: 'b8-m058', level: 'Trung bình', title: "Top N theo giá trị",
    requirement: "Cho một Dictionary<string, int> và số nguyên n. Trả về n khoá có giá trị lớn nhất, sắp xếp giảm dần theo giá trị.",
    signature: "string[] TopN(Dictionary<string, int> dict, int n)",
    constraints: ["0 <= dict.Count <= 100000", "0 <= n <= dict.Count"],
    examples: [
      { input: "dict = {\"a\": 5, \"b\": 9, \"c\": 1}, n = 2", output: "[\"b\", \"a\"]" },
    ], },

  { id: 'b8-m059', level: 'Trung bình', title: "Chuyển Dictionary thành chuỗi truy vấn",
    requirement: "Cho một Dictionary<string, string>. Trả về chuỗi dạng \"key1=value1&key2=value2\" theo thứ tự duyệt.",
    signature: "string ThanhQueryString(Dictionary<string, string> dict)",
    constraints: ["0 <= dict.Count <= 10000"],
    examples: [
      { input: "dict = {\"page\": \"1\", \"size\": \"20\"}", output: "\"page=1&size=20\"" },
      { input: "dict = {}", output: "\"\"" },
    ], },

  { id: 'b8-m060', level: 'Trung bình', title: "Phân tích chuỗi truy vấn",
    requirement: "Cho một chuỗi dạng \"key1=value1&key2=value2\". Trả về Dictionary tương ứng. Chuỗi rỗng trả về Dictionary rỗng.",
    signature: "Dictionary<string, string> PhanTichQueryString(string s)",
    constraints: ["0 <= s.Length <= 100000"],
    examples: [
      { input: "s = \"page=1&size=20\"", output: "{\"page\": \"1\", \"size\": \"20\"}" },
      { input: "s = \"\"", output: "{}" },
    ],
    hint: "Split theo & rồi split tiếp theo =, nhớ giới hạn số phần khi tách.", },

  { id: 'b8-m061', level: 'Trung bình', title: "Chuỗi con chung dài nhất của hai chuỗi",
    requirement: "Cho hai chuỗi a và b. Trả về độ dài chuỗi con LIÊN TIẾP dài nhất xuất hiện ở cả hai.",
    signature: "int ChuoiConChung(string a, string b)",
    constraints: ["0 <= a.Length, b.Length <= 1000"],
    examples: [
      { input: "a = \"abcdef\", b = \"zabcy\"", output: "3", explain: "Chuỗi con chung là \"abc\"." },
      { input: "a = \"abc\", b = \"xyz\"", output: "0" },
    ], },

  { id: 'b8-m062', level: 'Trung bình', title: "Kiểm tra chuỗi con",
    requirement: "Cho hai chuỗi s và t. Trả về true nếu t là dãy con của s, tức xoá bớt vài ký tự của s là ra t mà không đổi thứ tự.",
    signature: "bool LaDayCon(string s, string t)",
    constraints: ["0 <= t.Length <= s.Length <= 100000"],
    examples: [
      { input: "s = \"abcde\", t = \"ace\"", output: "true" },
      { input: "s = \"abc\", t = \"cba\"", output: "false" },
    ],
    hint: "Hai con trỏ chạy song song, chỉ tiến con trỏ của t khi khớp.", },

  { id: 'b8-m063', level: 'Trung bình', title: "Rút gọn đường dẫn",
    requirement: "Cho một đường dẫn kiểu Unix dạng chuỗi. Trả về đường dẫn đã rút gọn: bỏ dấu chấm, xử lý hai chấm là lùi một cấp, gộp dấu gạch chéo liên tiếp.",
    signature: "string RutGonDuongDan(string path)",
    constraints: ["1 <= path.Length <= 3000", "path luôn bắt đầu bằng /"],
    examples: [
      { input: "path = \"/a/./b/../c/\"", output: "\"/a/c\"" },
      { input: "path = \"/../\"", output: "\"/\"", explain: "Đã ở gốc thì không lùi được nữa." },
    ],
    hint: "Ngăn xếp: gặp .. thì pop, gặp tên thư mục thì push.", },

  { id: 'b8-m064', level: 'Trung bình', title: "Đếm đảo chữ trong câu",
    requirement: "Cho một câu. Trả về câu với thứ tự các từ đảo ngược, mỗi từ giữ nguyên, giữa các từ đúng một khoảng trắng.",
    signature: "string DaoThuTuTu(string s)",
    constraints: ["0 <= s.Length <= 100000"],
    examples: [
      { input: "s = \"  the sky  is blue \"", output: "\"blue is sky the\"" },
      { input: "s = \"a\"", output: "\"a\"" },
    ], },

  { id: 'b8-m065', level: 'Trung bình', title: "Viết hoa chữ cái đầu mỗi từ",
    requirement: "Cho một câu. Trả về câu với chữ cái đầu mỗi từ viết hoa, các chữ còn lại viết thường.",
    signature: "string VietHoaDauTu(string s)",
    constraints: ["0 <= s.Length <= 100000"],
    examples: [
      { input: "s = \"hello WORLD\"", output: "\"Hello World\"" },
      { input: "s = \"\"", output: "\"\"" },
    ], },

  { id: 'b8-m066', level: 'Trung bình', title: "Số La Mã sang số nguyên",
    requirement: "Cho một chuỗi số La Mã. Trả về giá trị số nguyên tương ứng.",
    signature: "int LaMaSangSo(string s)",
    constraints: ["1 <= s.Length <= 15", "s là số La Mã hợp lệ trong khoảng 1 đến 3999"],
    examples: [
      { input: "s = \"III\"", output: "3" },
      { input: "s = \"MCMXCIV\"", output: "1994", explain: "M=1000, CM=900, XC=90, IV=4." },
    ],
    hint: "Ký tự nhỏ đứng trước ký tự lớn thì trừ, ngược lại thì cộng.", },

  { id: 'b8-m067', level: 'Trung bình', title: "Số nguyên sang số La Mã",
    requirement: "Cho một số nguyên từ 1 đến 3999. Trả về chuỗi số La Mã tương ứng.",
    signature: "string SoSangLaMa(int n)",
    constraints: ["1 <= n <= 3999"],
    examples: [
      { input: "n = 58", output: "\"LVIII\"" },
      { input: "n = 1994", output: "\"MCMXCIV\"" },
    ],
    hint: "Duyệt bảng giá trị từ lớn xuống nhỏ, mỗi bước lấy phần nguyên.", },

  { id: 'b8-m068', level: 'Trung bình', title: "Cộng hai số lớn dạng chuỗi",
    requirement: "Cho hai số nguyên không âm biểu diễn bằng chuỗi. Trả về tổng dạng chuỗi. Không được chuyển sang kiểu số.",
    signature: "string CongChuoiSo(string a, string b)",
    constraints: ["1 <= a.Length, b.Length <= 10000", "Không dùng BigInteger hay chuyển sang int"],
    examples: [
      { input: "a = \"123\", b = \"456\"", output: "\"579\"" },
      { input: "a = \"999\", b = \"1\"", output: "\"1000\"" },
    ],
    hint: "Cộng từ phải sang trái và nhớ biến nhớ.", },

  { id: 'b8-m069', level: 'Trung bình', title: "Nhân hai số lớn dạng chuỗi",
    requirement: "Cho hai số nguyên không âm dạng chuỗi. Trả về tích dạng chuỗi, không chuyển sang kiểu số.",
    signature: "string NhanChuoiSo(string a, string b)",
    constraints: ["1 <= a.Length, b.Length <= 200"],
    examples: [
      { input: "a = \"123\", b = \"456\"", output: "\"56088\"" },
      { input: "a = \"0\", b = \"999\"", output: "\"0\"" },
    ], },

  { id: 'b8-m070', level: 'Trung bình', title: "Dãy con tăng dài nhất",
    requirement: "Cho một mảng nums. Trả về độ dài dãy con tăng nghiêm ngặt dài nhất. Các phần tử không cần liên tiếp.",
    signature: "int DaySonTangDaiNhat(int[] nums)",
    constraints: ["1 <= nums.Length <= 2500"],
    examples: [
      { input: "nums = [10, 9, 2, 5, 3, 7, 101, 18]", output: "4", explain: "Dãy con [2, 3, 7, 101]." },
      { input: "nums = [7, 7, 7]", output: "1" },
    ], },

  { id: 'b8-m071', level: 'Trung bình', title: "Leo cầu thang",
    requirement: "Mỗi lần được bước 1 hoặc 2 bậc. Cho số bậc n, trả về số cách khác nhau để leo hết cầu thang.",
    signature: "long LeoCauThang(int n)",
    constraints: ["1 <= n <= 60"],
    examples: [
      { input: "n = 3", output: "3", explain: "Ba cách: 1+1+1, 1+2, 2+1." },
      { input: "n = 1", output: "1" },
    ],
    hint: "Đây chính là dãy Fibonacci.", },

  { id: 'b8-m072', level: 'Trung bình', title: "Đổi tiền ít tờ nhất",
    requirement: "Cho một mảng mệnh giá và số tiền cần đổi. Trả về số tờ ít nhất để đủ số tiền, không đổi được thì trả về -1.",
    signature: "int DoiTienItNhat(int[] menhGia, int soTien)",
    constraints: ["1 <= menhGia.Length <= 12", "0 <= soTien <= 10000"],
    examples: [
      { input: "menhGia = [1, 5, 11], soTien = 15", output: "3", explain: "Dùng 5 + 5 + 5, tham lam lấy 11 trước sẽ ra 5 tờ." },
      { input: "menhGia = [2], soTien = 3", output: "-1" },
    ],
    hint: "Tham lam không đúng trong mọi trường hợp, cần quy hoạch động.", },

  { id: 'b8-m073', level: 'Trung bình', title: "Cắt thanh gỗ",
    requirement: "Cho chiều dài thanh gỗ và mảng các độ dài cắt được. Trả về số cách cắt hết thanh gỗ, thứ tự cắt khác nhau tính là cách khác nhau.",
    signature: "long SoCachCat(int chieuDai, int[] cacDoDai)",
    constraints: ["1 <= chieuDai <= 1000"],
    examples: [
      { input: "chieuDai = 4, cacDoDai = [1, 2]", output: "5" },
      { input: "chieuDai = 1, cacDoDai = [2]", output: "0" },
    ], },

  { id: 'b8-m074', level: 'Trung bình', title: "Balo đơn giản",
    requirement: "Cho mảng trọng lượng, mảng giá trị và sức chứa. Trả về tổng giá trị lớn nhất có thể mang, mỗi món lấy tối đa một lần.",
    signature: "int Balo(int[] trongLuong, int[] giaTri, int sucChua)",
    constraints: ["1 <= số món <= 100", "1 <= sucChua <= 1000"],
    examples: [
      { input: "trongLuong = [1, 3, 4], giaTri = [15, 20, 30], sucChua = 4", output: "35", explain: "Lấy món 1 và món 2." },
    ], },

  { id: 'b8-m075', level: 'Trung bình', title: "Kiểm tra chia đôi mảng",
    requirement: "Cho một mảng nums. Trả về true nếu có thể chia thành hai nhóm có tổng bằng nhau.",
    signature: "bool ChiaDoiDuoc(int[] nums)",
    constraints: ["1 <= nums.Length <= 200", "1 <= nums[i] <= 100"],
    examples: [
      { input: "nums = [1, 5, 11, 5]", output: "true", explain: "Chia thành [1, 5, 5] và [11]." },
      { input: "nums = [1, 2, 3, 5]", output: "false" },
    ], },

  { id: 'b8-m076', level: 'Trung bình', title: "Sắp xếp nổi bọt có đếm",
    requirement: "Cho một mảng nums. Sắp xếp tăng dần bằng thuật toán nổi bọt và trả về số lần hoán đổi đã thực hiện.",
    signature: "int SapNoiBot(int[] nums)",
    constraints: ["0 <= nums.Length <= 2000"],
    examples: [
      { input: "nums = [3, 1, 2]", output: "2" },
      { input: "nums = [1, 2, 3]", output: "0" },
    ], },

  { id: 'b8-m077', level: 'Trung bình', title: "Sắp xếp chọn",
    requirement: "Cho một mảng nums. Sắp xếp tăng dần bằng thuật toán chọn trực tiếp và trả về mảng kết quả.",
    signature: "int[] SapChon(int[] nums)",
    constraints: ["0 <= nums.Length <= 2000", "Không dùng Sort có sẵn"],
    examples: [
      { input: "nums = [64, 25, 12]", output: "[12, 25, 64]" },
    ], },

  { id: 'b8-m078', level: 'Trung bình', title: "Sắp xếp chèn",
    requirement: "Cho một mảng nums. Sắp xếp tăng dần bằng thuật toán chèn trực tiếp.",
    signature: "int[] SapChen(int[] nums)",
    constraints: ["0 <= nums.Length <= 2000", "Không dùng Sort có sẵn"],
    examples: [
      { input: "nums = [5, 2, 4, 6]", output: "[2, 4, 5, 6]" },
    ], },

  { id: 'b8-m079', level: 'Trung bình', title: "Sắp xếp trộn",
    requirement: "Cho một mảng nums. Sắp xếp tăng dần bằng thuật toán sắp xếp trộn, chạy trong O(n log n).",
    signature: "int[] SapTron(int[] nums)",
    constraints: ["0 <= nums.Length <= 100000", "Độ phức tạp O(n log n)"],
    examples: [
      { input: "nums = [5, 2, 4, 6, 1]", output: "[1, 2, 4, 5, 6]" },
    ],
    hint: "Chia đôi, sắp xếp từng nửa rồi trộn hai mảng đã sắp.", },

  { id: 'b8-m080', level: 'Trung bình', title: "Sắp xếp nhanh",
    requirement: "Cho một mảng nums. Sắp xếp tăng dần bằng thuật toán sắp xếp nhanh.",
    signature: "int[] SapNhanh(int[] nums)",
    constraints: ["0 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [10, 7, 8, 9, 1, 5]", output: "[1, 5, 7, 8, 9, 10]" },
    ],
    hint: "Chọn chốt, phân hoạch rồi đệ quy hai bên.", },

  { id: 'b8-m081', level: 'Trung bình', title: "Tìm k phần tử nhỏ nhất",
    requirement: "Cho một mảng nums và số nguyên k. Trả về k phần tử nhỏ nhất, sắp xếp tăng dần.",
    signature: "int[] KNhoNhat(int[] nums, int k)",
    constraints: ["0 <= k <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [7, 10, 4, 3, 20, 15], k = 3", output: "[3, 4, 7]" },
      { input: "nums = [1], k = 0", output: "[]" },
    ], },

  { id: 'b8-m082', level: 'Trung bình', title: "Phần tử lớn thứ k",
    requirement: "Cho một mảng nums và số nguyên k. Trả về phần tử lớn thứ k tính theo thứ tự sắp xếp, kể cả giá trị trùng nhau.",
    signature: "int LonThuK(int[] nums, int k)",
    constraints: ["1 <= k <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [3, 2, 1, 5, 6, 4], k = 2", output: "5" },
      { input: "nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4", output: "4" },
    ], },

  { id: 'b8-m083', level: 'Trung bình', title: "Trung vị của mảng",
    requirement: "Cho một mảng nums. Trả về trung vị: phần tử giữa nếu số lượng lẻ, trung bình hai phần tử giữa nếu chẵn.",
    signature: "double TrungVi(int[] nums)",
    constraints: ["1 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [3, 1, 2]", output: "2" },
      { input: "nums = [4, 1, 2, 3]", output: "2.5" },
    ], },

  { id: 'b8-m084', level: 'Trung bình', title: "Mode — giá trị phổ biến nhất",
    requirement: "Cho một mảng nums. Trả về tất cả giá trị xuất hiện nhiều nhất, sắp xếp tăng dần.",
    signature: "int[] Mode(int[] nums)",
    constraints: ["1 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [1, 2, 2, 3, 3]", output: "[2, 3]", explain: "Cả 2 và 3 đều xuất hiện 2 lần." },
      { input: "nums = [5]", output: "[5]" },
    ], },

  { id: 'b8-m085', level: 'Trung bình', title: "Khoảng cách hai lần xuất hiện gần nhất",
    requirement: "Cho một mảng nums và giá trị target. Trả về khoảng cách nhỏ nhất giữa hai chỉ số có giá trị target, xuất hiện dưới hai lần thì trả về -1.",
    signature: "int KhoangCachGanNhat(int[] nums, int target)",
    constraints: ["0 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [1, 5, 3, 5, 9, 5], target = 5", output: "2" },
      { input: "nums = [1, 2], target = 1", output: "-1" },
    ], },

  { id: 'b8-m086', level: 'Trung bình', title: "Dãy con có tổng bằng k",
    requirement: "Cho một mảng nums và số k. Trả về độ dài dãy con LIÊN TIẾP dài nhất có tổng bằng k, không có thì trả về 0.",
    signature: "int DayConTongK(int[] nums, int k)",
    constraints: ["1 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [1, -1, 5, -2, 3], k = 3", output: "4", explain: "Dãy [1, -1, 5, -2] có tổng 3." },
      { input: "nums = [1, 2], k = 9", output: "0" },
    ],
    hint: "Dictionary lưu tổng tiền tố gặp lần đầu tiên ở chỉ số nào.", },

  { id: 'b8-m087', level: 'Trung bình', title: "Cân bằng hai bên",
    requirement: "Cho một mảng nums. Trả về chỉ số mà tổng bên trái bằng tổng bên phải, không có thì trả về -1.",
    signature: "int ChiSoCanBang(int[] nums)",
    constraints: ["0 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [1, 7, 3, 6, 5, 6]", output: "3", explain: "Trái là 1+7+3 = 11, phải là 5+6 = 11." },
      { input: "nums = [1, 2, 3]", output: "-1" },
    ], },

  { id: 'b8-m088', level: 'Trung bình', title: "Đếm đảo bit",
    requirement: "Cho một số nguyên không âm n. Trả về mảng gồm số bit 1 của mỗi số từ 0 đến n.",
    signature: "int[] DemBit(int n)",
    constraints: ["0 <= n <= 100000"],
    examples: [
      { input: "n = 5", output: "[0, 1, 1, 2, 1, 2]" },
      { input: "n = 0", output: "[0]" },
    ], },

  { id: 'b8-m089', level: 'Trung bình', title: "Kiểm tra luỹ thừa của 2",
    requirement: "Cho một số nguyên n. Trả về true nếu n là luỹ thừa của 2.",
    signature: "bool LaLuyThua2(int n)",
    constraints: ["-1000000 <= n <= 1000000"],
    examples: [
      { input: "n = 16", output: "true" },
      { input: "n = 0", output: "false" },
      { input: "n = 6", output: "false" },
    ],
    hint: "Số luỹ thừa của 2 có đúng một bit 1: n > 0 và (n & (n - 1)) == 0.", },

  { id: 'b8-m090', level: 'Trung bình', title: "Lịch sử thao tác hoàn tác",
    requirement: "Cho một mảng thao tác gồm chuỗi \"push x\" hoặc \"undo\". Trả về danh sách còn lại sau khi thực hiện tuần tự.",
    signature: "List<int> LichSuThaoTac(string[] thaoTac)",
    constraints: ["0 <= thaoTac.Length <= 100000", "undo trên danh sách rỗng thì bỏ qua"],
    examples: [
      { input: "thaoTac = [\"push 1\", \"push 2\", \"undo\"]", output: "[1]" },
      { input: "thaoTac = [\"undo\"]", output: "[]" },
    ], },

  { id: 'b8-m091', level: 'Trung bình', title: "Gộp khoảng thời gian rảnh",
    requirement: "Cho danh sách khoảng thời gian bận dạng [batDau, ketThuc] và một khoảng làm việc. Trả về các khoảng rảnh trong khoảng làm việc đó.",
    signature: "int[][] ThoiGianRanh(int[][] ban, int batDau, int ketThuc)",
    constraints: ["0 <= ban.Length <= 10000"],
    examples: [
      { input: "ban = [[2,4],[6,8]], batDau = 0, ketThuc = 10", output: "[[0,2],[4,6],[8,10]]" },
    ], },

  { id: 'b8-m092', level: 'Trung bình', title: "Xếp lịch phòng họp",
    requirement: "Cho danh sách các cuộc họp dạng [batDau, ketThuc]. Trả về true nếu một người có thể dự hết mà không trùng giờ.",
    signature: "bool DuDuocHet(int[][] hop)",
    constraints: ["0 <= hop.Length <= 10000"],
    examples: [
      { input: "hop = [[0,30],[5,10],[15,20]]", output: "false", explain: "Cuộc [0,30] trùng với [5,10]." },
      { input: "hop = [[7,10],[2,4]]", output: "true" },
    ],
    hint: "Sắp xếp theo giờ bắt đầu rồi so với giờ kết thúc của cuộc trước.", },

  { id: 'b8-m093', level: 'Trung bình', title: "Số phòng họp tối thiểu",
    requirement: "Cho danh sách cuộc họp. Trả về số phòng ít nhất cần để tổ chức hết mọi cuộc họp.",
    signature: "int SoPhongToiThieu(int[][] hop)",
    constraints: ["0 <= hop.Length <= 10000"],
    examples: [
      { input: "hop = [[0,30],[5,10],[15,20]]", output: "2" },
      { input: "hop = [[7,10],[2,4]]", output: "1" },
    ], },

  { id: 'b8-m094', level: 'Trung bình', title: "Đếm đảo ngược chuỗi nhị phân",
    requirement: "Cho một chuỗi nhị phân. Trả về số lần ký tự đổi từ 0 sang 1 hoặc ngược lại khi đọc từ trái sang phải.",
    signature: "int DemDoiBit(string s)",
    constraints: ["1 <= s.Length <= 100000", "s chỉ gồm '0' và '1'"],
    examples: [
      { input: "s = \"0011\"", output: "1" },
      { input: "s = \"0101\"", output: "3" },
    ], },

  { id: 'b8-m095', level: 'Trung bình', title: "Chuỗi con dài nhất có k ký tự khác nhau",
    requirement: "Cho một chuỗi s và số nguyên k. Trả về độ dài chuỗi con liên tiếp dài nhất có tối đa k ký tự khác nhau.",
    signature: "int ChuoiConKKyTu(string s, int k)",
    constraints: ["0 <= s.Length <= 100000", "0 <= k <= 26"],
    examples: [
      { input: "s = \"eceba\", k = 2", output: "3", explain: "Chuỗi con \"ece\"." },
      { input: "s = \"aa\", k = 1", output: "2" },
    ],
    hint: "Cửa sổ trượt kết hợp Dictionary đếm ký tự trong cửa sổ.", },

  { id: 'b8-m096', level: 'Trung bình', title: "Ghép cặp tổng nhỏ nhất",
    requirement: "Cho hai mảng a và b cùng độ dài. Ghép mỗi phần tử của a với một phần tử của b sao cho tổng các tích là nhỏ nhất. Trả về tổng đó.",
    signature: "long TongTichNhoNhat(int[] a, int[] b)",
    constraints: ["1 <= a.Length = b.Length <= 100000"],
    examples: [
      { input: "a = [3, 1, 2], b = [2, 4, 6]", output: "20", explain: "Sắp a tăng, b giảm: 1×6 + 2×4 + 3×2." },
    ],
    hint: "Sắp một mảng tăng dần, mảng kia giảm dần.", },

  { id: 'b8-m097', level: 'Trung bình', title: "Phân trang danh sách",
    requirement: "Cho một mảng, kích thước trang và số trang. Trả về mảng phần tử của trang đó, trang vượt giới hạn trả về mảng rỗng.",
    signature: "int[] LayTrang(int[] nums, int kichThuoc, int soTrang)",
    constraints: ["1 <= kichThuoc <= 1000", "1 <= soTrang"],
    examples: [
      { input: "nums = [1,2,3,4,5], kichThuoc = 2, soTrang = 2", output: "[3, 4]" },
      { input: "nums = [1,2], kichThuoc = 5, soTrang = 2", output: "[]" },
    ], },

  { id: 'b8-m098', level: 'Trung bình', title: "Nhóm theo khoảng giá",
    requirement: "Cho một mảng giá sản phẩm. Trả về Dictionary đếm số sản phẩm theo khoảng: dưới 100k, 100k đến 500k, trên 500k.",
    signature: "Dictionary<string, int> NhomTheoGia(decimal[] gia)",
    constraints: ["0 <= gia.Length <= 100000"],
    examples: [
      { input: "gia = [50000, 200000, 900000]", output: "{\"Dưới 100k\": 1, \"100k-500k\": 1, \"Trên 500k\": 1}" },
    ], },

  { id: 'b8-m099', level: 'Trung bình', title: "Lọc và sắp xếp kết hợp",
    requirement: "Cho một mảng chuỗi. Trả về mảng chỉ giữ chuỗi dài hơn 3 ký tự, chuyển thành chữ hoa và sắp xếp theo bảng chữ cái.",
    signature: "string[] LocVaSap(string[] arr)",
    constraints: ["0 <= arr.Length <= 10000"],
    examples: [
      { input: "arr = [\"kiwi\", \"ab\", \"mango\"]", output: "[\"KIWI\", \"MANGO\"]" },
      { input: "arr = [\"ab\"]", output: "[]" },
    ], },

  { id: 'b8-m100', level: 'Trung bình', title: "Thống kê điểm danh",
    requirement: "Cho một mảng bản ghi dạng \"ten:trangThai\" với trạng thái là \"co\" hoặc \"vang\". Trả về Dictionary ánh xạ tên sang số buổi có mặt.",
    signature: "Dictionary<string, int> ThongKeDiemDanh(string[] banGhi)",
    constraints: ["0 <= banGhi.Length <= 100000"],
    examples: [
      { input: "banGhi = [\"An:co\", \"Binh:vang\", \"An:co\"]", output: "{\"An\": 2, \"Binh\": 0}" },
    ], },

  { id: 'b8-m101', level: 'Trung bình', title: "LINQ — lọc và biến đổi",
    requirement: "Cho một mảng số nguyên nums. Dùng LINQ trả về mảng các số chẵn đã được nhân đôi, sắp xếp tăng dần.",
    signature: "int[] ChanNhanDoi(int[] nums)",
    constraints: ["0 <= nums.Length <= 100000", "Bắt buộc dùng Where, Select, OrderBy"],
    examples: [
      { input: "nums = [5, 2, 8, 1, 4]", output: "[4, 8, 16]", explain: "Lọc còn [2, 8, 4], nhân đôi thành [4, 16, 8], sắp xếp ra [4, 8, 16]." },
      { input: "nums = [1, 3]", output: "[]" },
    ],
    hint: "Ghép chuỗi .Where(...).OrderBy(...).Select(...).ToArray()", },

  { id: 'b8-m102', level: 'Trung bình', title: "LINQ — nhóm hàm tổng hợp",
    requirement: "Cho một mảng điểm số. Trả về chuỗi thống kê dạng \"Tổng: x, TB: y, Cao nhất: z, Thấp nhất: t\" với TB làm tròn 2 chữ số. Mảng rỗng trả về \"Không có dữ liệu\".",
    signature: "string ThongKe(double[] diem)",
    constraints: ["0 <= diem.Length <= 100000", "Dùng Sum, Average, Max, Min"],
    examples: [
      { input: "diem = [8, 6, 10, 7]", output: "\"Tổng: 31, TB: 7.75, Cao nhất: 10, Thấp nhất: 6\"" },
      { input: "diem = []", output: "\"Không có dữ liệu\"", explain: "Gọi Average trên mảng rỗng sẽ ném InvalidOperationException — phải chặn trước." },
    ], },

  { id: 'b8-m103', level: 'Trung bình', title: "LINQ — Any và All",
    requirement: "Cho một mảng số nguyên. Trả về true nếu mảng có ít nhất một số âm VÀ mọi số đều nhỏ hơn 1000.",
    signature: "bool KiemTra(int[] nums)",
    constraints: ["0 <= nums.Length <= 100000", "Dùng Any và All"],
    examples: [
      { input: "nums = [-5, 100, 999]", output: "true" },
      { input: "nums = [1, 2, 3]", output: "false", explain: "Không có số âm nào." },
      { input: "nums = []", output: "false", explain: "Mảng rỗng thì Any luôn false còn All luôn true." },
    ], },

  { id: 'b8-m104', level: 'Trung bình', title: "LINQ — First và FirstOrDefault",
    requirement: "Cho một mảng chuỗi và một ký tự đầu. Trả về chuỗi đầu tiên bắt đầu bằng ký tự đó, không có thì trả về chuỗi rỗng. Không được để chương trình ném exception.",
    signature: "string TimDauTien(string[] arr, char kyTu)",
    constraints: ["0 <= arr.Length <= 10000"],
    examples: [
      { input: "arr = [\"apple\",\"banana\",\"mango\"], kyTu = 'm'", output: "\"mango\"" },
      { input: "arr = [\"apple\"], kyTu = 'z'", output: "\"\"", explain: "Dùng First ở đây sẽ văng InvalidOperationException." },
    ],
    hint: "FirstOrDefault trả về null với string — nhớ đổi thành chuỗi rỗng.", },

  { id: 'b8-m105', level: 'Trung bình', title: "LINQ — phân trang",
    requirement: "Cho một mảng, kích thước trang và số trang (đánh số từ 1). Dùng Skip và Take trả về các phần tử của trang đó.",
    signature: "int[] LayTrang(int[] nums, int kichThuoc, int soTrang)",
    constraints: ["1 <= kichThuoc <= 1000", "1 <= soTrang"],
    examples: [
      { input: "nums = [1,2,3,4,5,6,7], kichThuoc = 3, soTrang = 2", output: "[4, 5, 6]" },
      { input: "nums = [1,2], kichThuoc = 5, soTrang = 3", output: "[]", explain: "Vượt quá số trang thì Skip trả về tập rỗng chứ không lỗi." },
    ],
    hint: "Skip((soTrang - 1) * kichThuoc).Take(kichThuoc)", },

  { id: 'b8-m106', level: 'Trung bình', title: "LINQ — GroupBy thống kê",
    requirement: "Cho một mảng bản ghi dạng \"ten:diem\". Trả về danh sách cặp (tên, điểm trung bình) sắp xếp theo điểm giảm dần.",
    signature: "List<(string, double)> DiemTrungBinh(string[] banGhi)",
    constraints: ["0 <= banGhi.Length <= 100000"],
    examples: [
      { input: "banGhi = [\"An:8\", \"Binh:6\", \"An:10\"]", output: "[(\"An\", 9), (\"Binh\", 6)]" },
    ],
    hint: "GroupBy theo tên rồi Select với g.Average().", },

  { id: 'b8-m107', level: 'Trung bình', title: "LINQ — Distinct và phép toán tập hợp",
    requirement: "Cho hai mảng số nguyên. Trả về ba mảng: hợp, giao và hiệu của chúng, mỗi mảng đã loại trùng và sắp xếp tăng dần.",
    signature: "(int[] hop, int[] giao, int[] hieu) PhepToanTapHop(int[] a, int[] b)",
    constraints: ["0 <= a.Length, b.Length <= 100000", "Dùng Union, Intersect, Except"],
    examples: [
      { input: "a = [1,2,2,3], b = [3,4]", output: "([1,2,3,4], [3], [1,2])" },
    ], },

  { id: 'b8-m108', level: 'Trung bình', title: "LINQ — sắp xếp nhiều tiêu chí",
    requirement: "Cho một mảng bản ghi dạng \"ten:tuoi\". Sắp xếp theo tuổi tăng dần, cùng tuổi thì theo tên A-Z. Trả về mảng tên đã sắp.",
    signature: "string[] SapXep(string[] banGhi)",
    constraints: ["0 <= banGhi.Length <= 10000"],
    examples: [
      { input: "banGhi = [\"Cuong:20\", \"An:25\", \"Binh:20\"]", output: "[\"Binh\", \"Cuong\", \"An\"]", explain: "Bình và Cường cùng 20 tuổi nên xếp theo tên." },
    ],
    hint: "OrderBy(...).ThenBy(...)", },

  { id: 'b8-m109', level: 'Trung bình', title: "LINQ — SelectMany trải phẳng",
    requirement: "Cho một danh sách các lớp, mỗi lớp là một mảng tên học sinh. Trả về mảng gồm tất cả học sinh của mọi lớp, loại trùng và sắp xếp.",
    signature: "string[] TatCaHocSinh(List<string[]> cacLop)",
    constraints: ["0 <= số lớp <= 1000"],
    examples: [
      { input: "cacLop = [[\"An\",\"Binh\"], [\"Binh\",\"Cuong\"]]", output: "[\"An\", \"Binh\", \"Cuong\"]" },
    ],
    hint: "SelectMany trải danh sách lồng trong danh sách thành một danh sách phẳng.", },

  { id: 'b8-m110', level: 'Trung bình', title: "LINQ — hoãn thực thi",
    requirement: "Tạo một List, viết truy vấn Where nhưng CHƯA gọi ToList. Thêm phần tử vào List rồi mới duyệt truy vấn. Trả về số phần tử duyệt được và giải thích vì sao khác với lúc gọi ToList ngay.",
    signature: "int DemSauKhiThem()",
    constraints: ["Phải chỉ ra được sự khác biệt giữa hai cách"],
    examples: [
      { input: "List [1,2,3], truy vấn x > 1, thêm 10 rồi duyệt", output: "3", explain: "Kết quả là [2, 3, 10] — số 10 lọt vào dù lúc viết truy vấn nó chưa tồn tại." },
      { input: "Cùng dữ liệu nhưng gọi ToList trước khi thêm", output: "2", explain: "Kết quả đã chốt là [2, 3], thêm gì sau đó cũng không ảnh hưởng." },
    ],
    hint: "Where chỉ mô tả việc cần làm, ToList mới thật sự chạy.", },
]
