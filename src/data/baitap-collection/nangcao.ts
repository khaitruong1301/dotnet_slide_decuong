import type { Exercise } from '../types'

/** Bài tập collection mức Nâng cao. Đề viết theo lối LeetCode. */
export const nangCao: Exercise[] = [
  { id: 'b8-h001', level: 'Nâng cao', title: "Two Sum",
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

  { id: 'b8-h002', level: 'Nâng cao', title: "Best Time to Buy and Sell Stock",
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

  { id: 'b8-h003', level: 'Nâng cao', title: "Longest Consecutive Sequence",
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

  { id: 'b8-h004', level: 'Nâng cao', title: "Contains Duplicate",
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

  { id: 'b8-h005', level: 'Nâng cao', title: "Valid Anagram",
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

  { id: 'b8-h006', level: 'Nâng cao', title: "Group Anagrams",
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

  { id: 'b8-h007', level: 'Nâng cao', title: "Top K Frequent Elements",
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

  { id: 'b8-h008', level: 'Nâng cao', title: "Majority Element",
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

  { id: 'b8-h009', level: 'Nâng cao', title: "Move Zeroes",
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

  { id: 'b8-h010', level: 'Nâng cao', title: "Product of Array Except Self",
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

  { id: 'b8-h011', level: 'Nâng cao', title: "Two Sum II — mảng đã sắp xếp",
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

  { id: 'b8-h012', level: 'Nâng cao', title: "3Sum",
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

  { id: 'b8-h013', level: 'Nâng cao', title: "Longest Substring Without Repeating Characters",
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

  { id: 'b8-h014', level: 'Nâng cao', title: "Subarray Sum Equals K",
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

  { id: 'b8-h015', level: 'Nâng cao', title: "Find All Duplicates",
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

  { id: 'b8-h016', level: 'Nâng cao', title: "First Missing Positive",
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

  { id: 'b8-h017', level: 'Nâng cao', title: "Merge Intervals",
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

  { id: 'b8-h018', level: 'Nâng cao', title: "Isomorphic Strings",
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

  { id: 'b8-h019', level: 'Nâng cao', title: "LRU Cache",
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

  { id: 'b8-h020', level: 'Nâng cao', title: "Quản lý sản phẩm — bài tổng hợp",
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

  { id: 'b8-h021', level: 'Nâng cao', title: "Trapping Rain Water",
    requirement: "Cho một mảng độ cao các cột. Trả về lượng nước mưa đọng lại giữa các cột sau cơn mưa.",
    signature: "int TrapWater(int[] height)",
    constraints: ["1 <= height.Length <= 20000", "0 <= height[i] <= 100000"],
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" },
    ],
    hint: "Hai con trỏ, mỗi bước lấy bên có độ cao biên nhỏ hơn.", },

  { id: 'b8-h022', level: 'Nâng cao', title: "Container With Most Water",
    requirement: "Cho một mảng độ cao các vách. Chọn hai vách tạo thành thùng chứa được nhiều nước nhất. Trả về lượng nước đó.",
    signature: "int MaxArea(int[] height)",
    constraints: ["2 <= height.Length <= 100000"],
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" },
    ],
    hint: "Hai con trỏ từ hai đầu, dịch bên thấp hơn vào trong.", },

  { id: 'b8-h023', level: 'Nâng cao', title: "Minimum Window Substring",
    requirement: "Cho hai chuỗi s và t. Trả về chuỗi con ngắn nhất của s chứa đủ mọi ký tự của t kể cả số lần lặp. Không có thì trả về chuỗi rỗng.",
    signature: "string MinWindow(string s, string t)",
    constraints: ["1 <= s.Length, t.Length <= 100000"],
    examples: [
      { input: "s = \"ADOBECODEBANC\", t = \"ABC\"", output: "\"BANC\"" },
      { input: "s = \"a\", t = \"aa\"", output: "\"\"" },
    ],
    hint: "Cửa sổ trượt kết hợp bảng đếm ký tự còn thiếu.", },

  { id: 'b8-h024', level: 'Nâng cao', title: "Longest Repeating Character Replacement",
    requirement: "Cho một chuỗi s và số nguyên k. Được phép đổi tối đa k ký tự. Trả về độ dài chuỗi con dài nhất có thể làm cho mọi ký tự giống nhau.",
    signature: "int CharacterReplacement(string s, int k)",
    constraints: ["1 <= s.Length <= 100000", "0 <= k <= s.Length"],
    examples: [
      { input: "s = \"ABAB\", k = 2", output: "4" },
      { input: "s = \"AABABBA\", k = 1", output: "4" },
    ],
    hint: "Cửa sổ hợp lệ khi độ dài trừ số lần xuất hiện của ký tự phổ biến nhất không vượt quá k.", },

  { id: 'b8-h025', level: 'Nâng cao', title: "Permutation in String",
    requirement: "Cho hai chuỗi s1 và s2. Trả về true nếu s2 chứa một hoán vị của s1 dưới dạng chuỗi con liên tiếp.",
    signature: "bool CheckInclusion(string s1, string s2)",
    constraints: ["1 <= s1.Length, s2.Length <= 100000"],
    examples: [
      { input: "s1 = \"ab\", s2 = \"eidbaooo\"", output: "true", explain: "Chuỗi con \"ba\" là hoán vị của \"ab\"." },
      { input: "s1 = \"ab\", s2 = \"eidboaoo\"", output: "false" },
    ], },

  { id: 'b8-h026', level: 'Nâng cao', title: "Find All Anagrams in a String",
    requirement: "Cho hai chuỗi s và p. Trả về mảng các chỉ số bắt đầu của mọi hoán vị của p xuất hiện trong s.",
    signature: "int[] FindAnagrams(string s, string p)",
    constraints: ["1 <= s.Length, p.Length <= 100000"],
    examples: [
      { input: "s = \"cbaebabacd\", p = \"abc\"", output: "[0, 6]" },
      { input: "s = \"abab\", p = \"ab\"", output: "[0, 1, 2]" },
    ], },

  { id: 'b8-h027', level: 'Nâng cao', title: "Longest Palindromic Substring",
    requirement: "Cho một chuỗi s. Trả về chuỗi con đối xứng dài nhất.",
    signature: "string LongestPalindrome(string s)",
    constraints: ["1 <= s.Length <= 1000"],
    examples: [
      { input: "s = \"babad\"", output: "\"bab\" hoặc \"aba\"" },
      { input: "s = \"cbbd\"", output: "\"bb\"" },
    ],
    hint: "Với mỗi vị trí, mở rộng ra hai bên; nhớ xét cả tâm lẻ lẫn tâm chẵn.", },

  { id: 'b8-h028', level: 'Nâng cao', title: "Palindromic Substrings",
    requirement: "Cho một chuỗi s. Trả về số lượng chuỗi con đối xứng, hai chuỗi con khác vị trí tính là khác nhau.",
    signature: "int CountSubstrings(string s)",
    constraints: ["1 <= s.Length <= 1000"],
    examples: [
      { input: "s = \"abc\"", output: "3", explain: "Ba chuỗi con một ký tự." },
      { input: "s = \"aaa\"", output: "6" },
    ], },

  { id: 'b8-h029', level: 'Nâng cao', title: "Valid Palindrome bỏ ký tự đặc biệt",
    requirement: "Cho một chuỗi s. Trả về true nếu s đối xứng khi chỉ xét chữ cái và chữ số, không phân biệt hoa thường.",
    signature: "bool IsPalindrome(string s)",
    constraints: ["1 <= s.Length <= 200000"],
    examples: [
      { input: "s = \"A man, a plan, a canal: Panama\"", output: "true" },
      { input: "s = \"race a car\"", output: "false" },
    ], },

  { id: 'b8-h030', level: 'Nâng cao', title: "Encode and Decode Strings",
    requirement: "Thiết kế hai hàm mã hoá một danh sách chuỗi thành một chuỗi duy nhất và giải mã ngược lại. Chuỗi gốc có thể chứa mọi ký tự kể cả dấu phân cách.",
    signature: "string Encode(List<string> strs) / List<string> Decode(string s)",
    constraints: ["0 <= strs.Count <= 200", "Không được giả định ký tự nào không xuất hiện trong dữ liệu"],
    examples: [
      { input: "strs = [\"lint\", \"co#de\"]", output: "Mã hoá rồi giải mã lại ra đúng [\"lint\", \"co#de\"]", explain: "Ghi độ dài trước mỗi chuỗi để không phụ thuộc ký tự phân cách." },
    ],
    hint: "Định dạng \"độ_dài#nội_dung\" cho từng chuỗi.", },

  { id: 'b8-h031', level: 'Nâng cao', title: "Word Break",
    requirement: "Cho một chuỗi s và danh sách từ điển. Trả về true nếu s có thể tách thành dãy các từ trong từ điển, mỗi từ được dùng nhiều lần.",
    signature: "bool WordBreak(string s, List<string> tuDien)",
    constraints: ["1 <= s.Length <= 300", "1 <= tuDien.Count <= 1000"],
    examples: [
      { input: "s = \"leetcode\", tuDien = [\"leet\", \"code\"]", output: "true" },
      { input: "s = \"catsandog\", tuDien = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]", output: "false" },
    ], },

  { id: 'b8-h032', level: 'Nâng cao', title: "Longest Common Prefix",
    requirement: "Cho một mảng chuỗi. Trả về tiền tố chung dài nhất của mọi chuỗi, không có thì trả về chuỗi rỗng.",
    signature: "string LongestCommonPrefix(string[] strs)",
    constraints: ["1 <= strs.Length <= 200"],
    examples: [
      { input: "strs = [\"flower\",\"flow\",\"flight\"]", output: "\"fl\"" },
      { input: "strs = [\"dog\",\"racecar\"]", output: "\"\"" },
    ], },

  { id: 'b8-h033', level: 'Nâng cao', title: "Valid Sudoku",
    requirement: "Cho một bảng Sudoku 9x9 chưa hoàn chỉnh, ô trống ký hiệu bằng dấu chấm. Trả về true nếu bảng hiện tại hợp lệ theo luật hàng, cột và ô 3x3.",
    signature: "bool IsValidSudoku(char[,] board)",
    constraints: ["Bảng luôn có kích thước 9 x 9"],
    examples: [
      { input: "Bảng có hai số 5 trong cùng một hàng", output: "false" },
      { input: "Bảng chuẩn chưa vi phạm luật nào", output: "true", explain: "Chỉ cần kiểm tra trạng thái hiện tại, không cần giải được." },
    ],
    hint: "Ba mảng HashSet cho hàng, cột và ô 3x3; chỉ số ô là (dong / 3) * 3 + cot / 3.", },

  { id: 'b8-h034', level: 'Nâng cao', title: "Set Matrix Zeroes",
    requirement: "Cho một ma trận. Nếu một ô bằng 0 thì đặt toàn bộ hàng và cột chứa nó về 0. Sửa trực tiếp trên ma trận.",
    signature: "void SetZeroes(int[,] m)",
    constraints: ["1 <= số dòng, số cột <= 200", "Cố gắng dùng bộ nhớ phụ O(1)"],
    examples: [
      { input: "m = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]" },
    ],
    hint: "Dùng chính hàng đầu và cột đầu làm nơi đánh dấu.", },

  { id: 'b8-h035', level: 'Nâng cao', title: "Rotate Image",
    requirement: "Cho một ma trận vuông. Xoay 90 độ theo chiều kim đồng hồ ngay trên ma trận, không tạo ma trận mới.",
    signature: "void Rotate(int[,] m)",
    constraints: ["1 <= n <= 20", "Bộ nhớ phụ O(1)"],
    examples: [
      { input: "m = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" },
    ], },

  { id: 'b8-h036', level: 'Nâng cao', title: "Search in Rotated Sorted Array",
    requirement: "Cho một mảng đã sắp xếp rồi bị xoay tại một vị trí chưa biết, và giá trị target. Trả về chỉ số của target, không có thì trả về -1. Phải chạy trong O(log n).",
    signature: "int SearchRotated(int[] nums, int target)",
    constraints: ["1 <= nums.Length <= 100000", "Các phần tử đôi một khác nhau", "Độ phức tạp O(log n)"],
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
    ],
    hint: "Một nửa luôn còn sắp xếp — xác định nửa đó rồi quyết định đi hướng nào.", },

  { id: 'b8-h037', level: 'Nâng cao', title: "Find Minimum in Rotated Sorted Array",
    requirement: "Cho một mảng đã sắp xếp rồi bị xoay. Trả về phần tử nhỏ nhất, chạy trong O(log n).",
    signature: "int FindMin(int[] nums)",
    constraints: ["1 <= nums.Length <= 100000", "Độ phức tạp O(log n)"],
    examples: [
      { input: "nums = [3,4,5,1,2]", output: "1" },
      { input: "nums = [11,13,15,17]", output: "11", explain: "Mảng chưa bị xoay." },
    ], },

  { id: 'b8-h038', level: 'Nâng cao', title: "Kth Largest Element",
    requirement: "Cho một mảng nums và số nguyên k. Trả về phần tử lớn thứ k mà không sắp xếp toàn bộ mảng.",
    signature: "int FindKthLargest(int[] nums, int k)",
    constraints: ["1 <= k <= nums.Length <= 100000", "Không được gọi Sort trên toàn mảng"],
    examples: [
      { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
      { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4" },
    ],
    hint: "Phân hoạch kiểu Quickselect, hoặc dùng hàng đợi ưu tiên kích thước k.", },

  { id: 'b8-h039', level: 'Nâng cao', title: "Merge k Sorted Arrays",
    requirement: "Cho một danh sách các mảng đã sắp xếp tăng dần. Trả về một mảng duy nhất chứa tất cả phần tử, vẫn sắp xếp.",
    signature: "int[] MergeK(List<int[]> mang)",
    constraints: ["0 <= số mảng <= 10000", "Tổng số phần tử <= 200000"],
    examples: [
      { input: "mang = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
    ],
    hint: "Gộp từng đôi một theo kiểu cây, hoặc dùng hàng đợi ưu tiên.", },

  { id: 'b8-h040', level: 'Nâng cao', title: "Task Scheduler",
    requirement: "Cho một mảng tác vụ và thời gian nghỉ n giữa hai tác vụ cùng loại. Trả về tổng số đơn vị thời gian ít nhất để chạy hết.",
    signature: "int LeastInterval(char[] tasks, int n)",
    constraints: ["1 <= tasks.Length <= 10000", "0 <= n <= 100"],
    examples: [
      { input: "tasks = ['A','A','A','B','B','B'], n = 2", output: "8", explain: "A B nghỉ A B nghỉ A B." },
      { input: "tasks = ['A','A','A'], n = 0", output: "3" },
    ],
    hint: "Tác vụ xuất hiện nhiều nhất quyết định khung thời gian.", },

  { id: 'b8-h041', level: 'Nâng cao', title: "Longest Consecutive Path trong lưới",
    requirement: "Cho một ma trận số nguyên. Trả về độ dài đường đi dài nhất mà giá trị tăng nghiêm ngặt, chỉ được đi lên xuống trái phải.",
    signature: "int LongestIncreasingPath(int[,] m)",
    constraints: ["1 <= số dòng, số cột <= 200"],
    examples: [
      { input: "m = [[9,9,4],[6,6,8],[2,1,1]]", output: "4", explain: "Đường đi 1 → 2 → 6 → 9." },
    ],
    hint: "Duyệt sâu kết hợp ghi nhớ kết quả đã tính cho mỗi ô.", },

  { id: 'b8-h042', level: 'Nâng cao', title: "Number of Islands",
    requirement: "Cho một lưới gồm ký tự đất và nước. Trả về số đảo, đảo là nhóm ô đất nối nhau theo bốn hướng.",
    signature: "int NumIslands(char[,] grid)",
    constraints: ["1 <= số dòng, số cột <= 300"],
    examples: [
      { input: "grid = [['1','1','0'],['0','1','0'],['0','0','1']]", output: "2" },
    ],
    hint: "Duyệt từng ô, gặp đất chưa thăm thì lan ra đánh dấu cả cụm.", },

  { id: 'b8-h043', level: 'Nâng cao', title: "Flood Fill",
    requirement: "Cho một ảnh dạng ma trận màu, một ô xuất phát và màu mới. Tô lại toàn bộ vùng liền kề cùng màu với ô xuất phát.",
    signature: "int[,] FloodFill(int[,] image, int sr, int sc, int mauMoi)",
    constraints: ["1 <= số dòng, số cột <= 100"],
    examples: [
      { input: "image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, mauMoi = 2", output: "[[2,2,2],[2,2,0],[2,0,1]]" },
    ], },

  { id: 'b8-h044', level: 'Nâng cao', title: "Course Schedule",
    requirement: "Cho số môn học và danh sách điều kiện tiên quyết. Trả về true nếu có thể học hết mọi môn, tức đồ thị không có chu trình.",
    signature: "bool CanFinish(int soMon, int[][] dieuKien)",
    constraints: ["1 <= soMon <= 2000", "0 <= dieuKien.Length <= 5000"],
    examples: [
      { input: "soMon = 2, dieuKien = [[1,0]]", output: "true", explain: "Học môn 0 trước rồi môn 1." },
      { input: "soMon = 2, dieuKien = [[1,0],[0,1]]", output: "false", explain: "Hai môn là tiên quyết của nhau." },
    ],
    hint: "Sắp xếp tô pô bằng cách đếm bậc vào.", },

  { id: 'b8-h045', level: 'Nâng cao', title: "Clone Graph bằng Dictionary",
    requirement: "Cho một đồ thị biểu diễn bằng Dictionary ánh xạ đỉnh sang danh sách đỉnh kề. Trả về một bản sao sâu, không dùng chung đối tượng nào với bản gốc.",
    signature: "Dictionary<int, List<int>> CloneGraph(Dictionary<int, List<int>> g)",
    constraints: ["0 <= số đỉnh <= 10000"],
    examples: [
      { input: "g = {1: [2], 2: [1]}", output: "Bản sao có cùng cấu trúc nhưng các List là đối tượng mới" },
    ], },

  { id: 'b8-h046', level: 'Nâng cao', title: "Word Ladder độ dài",
    requirement: "Cho từ đầu, từ cuối và danh sách từ. Mỗi bước chỉ được đổi một ký tự và từ mới phải nằm trong danh sách. Trả về số bước ít nhất, không tới được thì trả về 0.",
    signature: "int LadderLength(string dau, string cuoi, List<string> tuDien)",
    constraints: ["1 <= tuDien.Count <= 5000", "Mọi từ cùng độ dài"],
    examples: [
      { input: "dau = \"hit\", cuoi = \"cog\", tuDien = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]", output: "5" },
      { input: "dau = \"hit\", cuoi = \"cog\", tuDien = [\"hot\",\"dot\",\"dog\"]", output: "0" },
    ],
    hint: "Duyệt theo chiều rộng từ từ đầu.", },

  { id: 'b8-h047', level: 'Nâng cao', title: "Implement Trie",
    requirement: "Thiết kế cây tiền tố hỗ trợ Insert, Search và StartsWith.",
    signature: "class Trie { void Insert(string); bool Search(string); bool StartsWith(string); }",
    constraints: ["1 <= độ dài từ <= 2000", "Chỉ gồm chữ thường tiếng Anh"],
    examples: [
      { input: "Insert(\"apple\"); Search(\"apple\")", output: "true" },
      { input: "Search(\"app\")", output: "false", explain: "Chỉ là tiền tố chứ chưa phải từ hoàn chỉnh." },
      { input: "StartsWith(\"app\")", output: "true" },
    ],
    hint: "Mỗi nút giữ một Dictionary<char, Node> và một cờ đánh dấu kết thúc từ.", },

  { id: 'b8-h048', level: 'Nâng cao', title: "Design Add and Search Words",
    requirement: "Thiết kế cấu trúc hỗ trợ thêm từ và tìm từ, trong đó dấu chấm trong từ khoá tìm kiếm khớp với ký tự bất kỳ.",
    signature: "class WordDictionary { void AddWord(string); bool Search(string); }",
    constraints: ["1 <= độ dài từ <= 25"],
    examples: [
      { input: "AddWord(\"bad\"); Search(\"b..\")", output: "true" },
      { input: "Search(\"b.d.\")", output: "false" },
    ], },

  { id: 'b8-h049', level: 'Nâng cao', title: "LFU Cache",
    requirement: "Thiết kế bộ nhớ đệm loại bỏ phần tử ÍT ĐƯỢC DÙNG NHẤT khi đầy; nếu hoà thì loại phần tử cũ nhất. Get và Put phải chạy trong O(1).",
    signature: "class LfuCache { int Get(int); void Put(int, int); }",
    constraints: ["1 <= sức chứa <= 10000", "Get và Put đều O(1)"],
    examples: [
      { input: "Sức chứa 2; Put(1,1); Put(2,2); Get(1); Put(3,3)", output: "Khoá 2 bị loại", explain: "Khoá 1 vừa được Get nên tần suất cao hơn khoá 2." },
    ],
    hint: "Dictionary tần suất kết hợp Dictionary danh sách theo từng mức tần suất.", },

  { id: 'b8-h050', level: 'Nâng cao', title: "Design Hit Counter",
    requirement: "Thiết kế bộ đếm lượt truy cập, trả về số lượt trong 5 phút gần nhất tính từ một mốc thời gian.",
    signature: "class HitCounter { void Hit(int timestamp); int GetHits(int timestamp); }",
    constraints: ["Timestamp tăng dần", "1 <= timestamp <= 2_000_000_000"],
    examples: [
      { input: "Hit(1); Hit(2); Hit(3); GetHits(4)", output: "3" },
      { input: "Hit(300); GetHits(301)", output: "1", explain: "Các lượt trước đó đã quá 5 phút." },
    ], },

  { id: 'b8-h051', level: 'Nâng cao', title: "Insert Delete GetRandom O(1)",
    requirement: "Thiết kế cấu trúc hỗ trợ Insert, Remove và GetRandom, cả ba đều chạy trong O(1) trung bình.",
    signature: "class RandomSet { bool Insert(int); bool Remove(int); int GetRandom(); }",
    constraints: ["Mọi thao tác O(1) trung bình", "GetRandom chỉ gọi khi tập khác rỗng"],
    examples: [
      { input: "Insert(1); Insert(2); Remove(1); GetRandom()", output: "2" },
    ],
    hint: "List để lấy ngẫu nhiên theo chỉ số, Dictionary ánh xạ giá trị sang chỉ số; xoá thì hoán đổi với phần tử cuối.", },

  { id: 'b8-h052', level: 'Nâng cao', title: "Design Underground System",
    requirement: "Thiết kế hệ thống ghi nhận hành khách vào ga, ra ga và trả về thời gian di chuyển trung bình giữa hai ga.",
    signature: "class Metro { void CheckIn(int id, string ga, int t); void CheckOut(int id, string ga, int t); double GetAverageTime(string dau, string cuoi); }",
    constraints: ["1 <= id <= 1_000_000", "Mỗi hành khách không check-in hai lần liên tiếp"],
    examples: [
      { input: "CheckIn(1,\"A\",3); CheckOut(1,\"B\",8); GetAverageTime(\"A\",\"B\")", output: "5" },
    ], },

  { id: 'b8-h053', level: 'Nâng cao', title: "Time Based Key-Value Store",
    requirement: "Thiết kế kho khoá-giá trị có gắn mốc thời gian. Get trả về giá trị ứng với mốc thời gian lớn nhất không vượt quá mốc yêu cầu.",
    signature: "class TimeMap { void Set(string key, string value, int timestamp); string Get(string key, int timestamp); }",
    constraints: ["Timestamp của mỗi khoá tăng dần", "Không có giá trị phù hợp thì trả về chuỗi rỗng"],
    examples: [
      { input: "Set(\"foo\",\"bar\",1); Get(\"foo\",1)", output: "\"bar\"" },
      { input: "Get(\"foo\",3)", output: "\"bar\"", explain: "Lấy giá trị của mốc gần nhất không vượt quá 3." },
    ],
    hint: "Mỗi khoá giữ một danh sách đã sắp theo thời gian, tìm bằng tìm kiếm nhị phân.", },

  { id: 'b8-h054', level: 'Nâng cao', title: "Logger Rate Limiter",
    requirement: "Thiết kế bộ ghi log chỉ cho phép in một thông điệp tối đa một lần mỗi 10 giây.",
    signature: "class Logger { bool ShouldPrint(int timestamp, string message); }",
    constraints: ["Timestamp tăng dần"],
    examples: [
      { input: "ShouldPrint(1,\"foo\")", output: "true" },
      { input: "ShouldPrint(5,\"foo\")", output: "false" },
      { input: "ShouldPrint(11,\"foo\")", output: "true" },
    ], },

  { id: 'b8-h055', level: 'Nâng cao', title: "Min Stack",
    requirement: "Thiết kế ngăn xếp hỗ trợ Push, Pop, Top và GetMin, tất cả chạy trong O(1).",
    signature: "class MinStack { void Push(int); void Pop(); int Top(); int GetMin(); }",
    constraints: ["GetMin chỉ gọi khi ngăn xếp khác rỗng", "Mọi thao tác O(1)"],
    examples: [
      { input: "Push(-2); Push(0); Push(-3); GetMin()", output: "-3" },
      { input: "Pop(); GetMin()", output: "-2" },
    ],
    hint: "Giữ thêm một ngăn xếp phụ lưu giá trị nhỏ nhất tại từng thời điểm.", },

  { id: 'b8-h056', level: 'Nâng cao', title: "Queue bằng hai Stack",
    requirement: "Thiết kế hàng đợi chỉ dùng hai ngăn xếp, các thao tác có độ phức tạp khấu hao O(1).",
    signature: "class MyQueue { void Push(int); int Pop(); int Peek(); bool Empty(); }",
    constraints: ["Chỉ được dùng thao tác chuẩn của ngăn xếp"],
    examples: [
      { input: "Push(1); Push(2); Peek()", output: "1" },
      { input: "Pop()", output: "1" },
    ],
    hint: "Một ngăn xếp để nhận vào, một để lấy ra; chỉ dồn khi ngăn xếp ra rỗng.", },

  { id: 'b8-h057', level: 'Nâng cao', title: "Stack bằng hai Queue",
    requirement: "Thiết kế ngăn xếp chỉ dùng hàng đợi.",
    signature: "class MyStack { void Push(int); int Pop(); int Top(); bool Empty(); }",
    constraints: ["Chỉ được dùng thao tác chuẩn của hàng đợi"],
    examples: [
      { input: "Push(1); Push(2); Top()", output: "2" },
      { input: "Pop()", output: "2" },
    ], },

  { id: 'b8-h058', level: 'Nâng cao', title: "Daily Temperatures",
    requirement: "Cho mảng nhiệt độ theo ngày. Với mỗi ngày trả về số ngày phải chờ tới ngày ấm hơn, không có thì trả về 0.",
    signature: "int[] DailyTemperatures(int[] temps)",
    constraints: ["1 <= temps.Length <= 100000", "Độ phức tạp O(n)"],
    examples: [
      { input: "temps = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" },
    ],
    hint: "Ngăn xếp giữ các chỉ số chờ ngày ấm hơn.", },

  { id: 'b8-h059', level: 'Nâng cao', title: "Next Greater Element",
    requirement: "Cho một mảng nums. Với mỗi phần tử trả về phần tử lớn hơn đầu tiên nằm bên phải nó, không có thì trả về -1.",
    signature: "int[] NextGreater(int[] nums)",
    constraints: ["1 <= nums.Length <= 100000", "Độ phức tạp O(n)"],
    examples: [
      { input: "nums = [2,1,2,4,3]", output: "[4,2,4,-1,-1]" },
    ], },

  { id: 'b8-h060', level: 'Nâng cao', title: "Largest Rectangle in Histogram",
    requirement: "Cho mảng chiều cao các cột liền nhau rộng 1 đơn vị. Trả về diện tích hình chữ nhật lớn nhất nằm trong biểu đồ.",
    signature: "int LargestRectangle(int[] heights)",
    constraints: ["1 <= heights.Length <= 100000", "Độ phức tạp O(n)"],
    examples: [
      { input: "heights = [2,1,5,6,2,3]", output: "10", explain: "Hình chữ nhật cao 5 rộng 2." },
      { input: "heights = [2,4]", output: "4" },
    ],
    hint: "Ngăn xếp đơn điệu tăng, khi gặp cột thấp hơn thì chốt diện tích của các cột cao hơn.", },

  { id: 'b8-h061', level: 'Nâng cao', title: "4Sum",
    requirement: "Cho một mảng nums và giá trị target. Trả về tất cả bộ bốn phần tử khác chỉ số có tổng bằng target, không lặp bộ giống nhau.",
    signature: "List<List<int>> FourSum(int[] nums, int target)",
    constraints: ["1 <= nums.Length <= 200", "-1_000_000_000 <= nums[i], target <= 1_000_000_000"],
    examples: [
      { input: "nums = [1,0,-1,0,-2,2], target = 0", output: "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]" },
      { input: "nums = [2,2,2,2,2], target = 8", output: "[[2,2,2,2]]" },
    ],
    hint: "Sắp xếp rồi cố định hai số, phần còn lại dùng hai con trỏ.", },

  { id: 'b8-h062', level: 'Nâng cao', title: "3Sum Closest",
    requirement: "Cho một mảng nums và target. Trả về tổng của bộ ba phần tử có giá trị gần target nhất.",
    signature: "int ThreeSumClosest(int[] nums, int target)",
    constraints: ["3 <= nums.Length <= 500"],
    examples: [
      { input: "nums = [-1,2,1,-4], target = 1", output: "2", explain: "Bộ ba (-1, 2, 1) cho tổng 2." },
    ], },

  { id: 'b8-h063', level: 'Nâng cao', title: "Sort Colors",
    requirement: "Cho một mảng chỉ gồm 0, 1, 2. Sắp xếp tại chỗ theo thứ tự tăng dần chỉ với một lượt duyệt và bộ nhớ O(1).",
    signature: "void SortColors(int[] nums)",
    constraints: ["1 <= nums.Length <= 300", "Chỉ một lượt duyệt, bộ nhớ phụ O(1)"],
    examples: [
      { input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]" },
    ],
    hint: "Ba con trỏ theo thuật toán cờ Hà Lan.", },

  { id: 'b8-h064', level: 'Nâng cao', title: "Remove Duplicates from Sorted Array II",
    requirement: "Cho một mảng đã sắp xếp. Xoá tại chỗ sao cho mỗi giá trị xuất hiện tối đa hai lần. Trả về độ dài phần hợp lệ.",
    signature: "int RemoveDuplicates(int[] nums)",
    constraints: ["1 <= nums.Length <= 30000", "Bộ nhớ phụ O(1)"],
    examples: [
      { input: "nums = [1,1,1,2,2,3]", output: "5", explain: "Mảng đầu trở thành [1,1,2,2,3]." },
    ], },

  { id: 'b8-h065', level: 'Nâng cao', title: "Longest Increasing Subsequence O(n log n)",
    requirement: "Cho một mảng nums. Trả về độ dài dãy con tăng nghiêm ngặt dài nhất, lời giải phải chạy trong O(n log n).",
    signature: "int LengthOfLIS(int[] nums)",
    constraints: ["1 <= nums.Length <= 100000", "Độ phức tạp O(n log n)"],
    examples: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4" },
      { input: "nums = [0,1,0,3,2,3]", output: "4" },
    ],
    hint: "Giữ một mảng đuôi nhỏ nhất cho mỗi độ dài, chèn bằng tìm kiếm nhị phân.", },

  { id: 'b8-h066', level: 'Nâng cao', title: "Russian Doll Envelopes",
    requirement: "Cho danh sách phong bì dạng [rộng, cao]. Một phong bì lồng được vào phong bì khác khi cả hai chiều đều nhỏ hơn hẳn. Trả về số phong bì nhiều nhất lồng được vào nhau.",
    signature: "int MaxEnvelopes(int[][] envelopes)",
    constraints: ["1 <= envelopes.Length <= 100000"],
    examples: [
      { input: "envelopes = [[5,4],[6,4],[6,7],[2,3]]", output: "3", explain: "Chuỗi lồng [2,3] → [5,4] → [6,7]." },
    ],
    hint: "Sắp rộng tăng, cao giảm khi rộng bằng nhau, rồi tìm LIS theo chiều cao.", },

  { id: 'b8-h067', level: 'Nâng cao', title: "Coin Change II — đếm số cách",
    requirement: "Cho mảng mệnh giá và số tiền. Trả về số cách đổi, thứ tự khác nhau tính là một cách.",
    signature: "int ChangeWays(int[] coins, int amount)",
    constraints: ["1 <= coins.Length <= 300", "0 <= amount <= 5000"],
    examples: [
      { input: "coins = [1,2,5], amount = 5", output: "4" },
      { input: "coins = [2], amount = 3", output: "0" },
    ],
    hint: "Vòng ngoài duyệt mệnh giá, vòng trong duyệt số tiền — đảo thứ tự sẽ đếm trùng.", },

  { id: 'b8-h068', level: 'Nâng cao', title: "House Robber",
    requirement: "Cho mảng số tiền mỗi nhà. Không được trộm hai nhà liền kề. Trả về số tiền lớn nhất trộm được.",
    signature: "int Rob(int[] nums)",
    constraints: ["1 <= nums.Length <= 100"],
    examples: [
      { input: "nums = [2,7,9,3,1]", output: "12", explain: "Trộm nhà 1, 3 và 5." },
      { input: "nums = [1,2,3,1]", output: "4" },
    ], },

  { id: 'b8-h069', level: 'Nâng cao', title: "House Robber II — dãy nhà vòng tròn",
    requirement: "Giống bài trước nhưng các nhà xếp thành vòng tròn, nhà đầu và nhà cuối là liền kề.",
    signature: "int RobCircle(int[] nums)",
    constraints: ["1 <= nums.Length <= 100"],
    examples: [
      { input: "nums = [2,3,2]", output: "3", explain: "Không được trộm cả nhà đầu lẫn nhà cuối." },
      { input: "nums = [1,2,3,1]", output: "4" },
    ],
    hint: "Chạy bài cũ hai lần: bỏ nhà đầu và bỏ nhà cuối, lấy kết quả lớn hơn.", },

  { id: 'b8-h070', level: 'Nâng cao', title: "Jump Game",
    requirement: "Cho mảng nums với nums[i] là số bước tối đa nhảy được từ vị trí i. Trả về true nếu tới được cuối mảng.",
    signature: "bool CanJump(int[] nums)",
    constraints: ["1 <= nums.Length <= 10000"],
    examples: [
      { input: "nums = [2,3,1,1,4]", output: "true" },
      { input: "nums = [3,2,1,0,4]", output: "false", explain: "Kẹt tại vị trí có giá trị 0." },
    ],
    hint: "Vừa duyệt vừa giữ vị trí xa nhất có thể tới.", },

  { id: 'b8-h071', level: 'Nâng cao', title: "Jump Game II — số bước ít nhất",
    requirement: "Cho mảng nums đảm bảo luôn tới được cuối. Trả về số bước nhảy ít nhất.",
    signature: "int MinJumps(int[] nums)",
    constraints: ["1 <= nums.Length <= 10000"],
    examples: [
      { input: "nums = [2,3,1,1,4]", output: "2" },
      { input: "nums = [1,1,1]", output: "2" },
    ], },

  { id: 'b8-h072', level: 'Nâng cao', title: "Gas Station",
    requirement: "Cho mảng lượng xăng mỗi trạm và mảng chi phí đi tới trạm kế tiếp. Trả về chỉ số trạm xuất phát để đi hết vòng, không có thì trả về -1.",
    signature: "int CanCompleteCircuit(int[] gas, int[] cost)",
    constraints: ["1 <= gas.Length <= 100000"],
    examples: [
      { input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3" },
      { input: "gas = [2,3,4], cost = [3,4,3]", output: "-1" },
    ],
    hint: "Tổng xăng nhỏ hơn tổng chi phí thì chắc chắn vô nghiệm.", },

  { id: 'b8-h073', level: 'Nâng cao', title: "Candy",
    requirement: "Cho mảng điểm của các em xếp hàng. Mỗi em ít nhất một kẹo, em điểm cao hơn phải nhiều kẹo hơn em kề bên. Trả về số kẹo ít nhất.",
    signature: "int Candy(int[] ratings)",
    constraints: ["1 <= ratings.Length <= 20000"],
    examples: [
      { input: "ratings = [1,0,2]", output: "5", explain: "Chia 2, 1, 2." },
      { input: "ratings = [1,2,2]", output: "4" },
    ],
    hint: "Duyệt xuôi rồi duyệt ngược, mỗi lượt xử lý một chiều ràng buộc.", },

  { id: 'b8-h074', level: 'Nâng cao', title: "Product of Consecutive K",
    requirement: "Cho mảng nums và số nguyên k. Trả về tích lớn nhất của k phần tử liên tiếp.",
    signature: "long MaxProductK(int[] nums, int k)",
    constraints: ["1 <= k <= nums.Length <= 100000", "Kết quả nằm trong phạm vi long"],
    examples: [
      { input: "nums = [1,5,2,3,4], k = 2", output: "12", explain: "Đoạn [3, 4]." },
    ], },

  { id: 'b8-h075', level: 'Nâng cao', title: "Sliding Window Median",
    requirement: "Cho mảng nums và số nguyên k. Trả về mảng trung vị của từng cửa sổ k phần tử liên tiếp.",
    signature: "double[] MedianSlidingWindow(int[] nums, int k)",
    constraints: ["1 <= k <= nums.Length <= 10000"],
    examples: [
      { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[1,-1,-1,3,5,6]" },
    ], },

  { id: 'b8-h076', level: 'Nâng cao', title: "Top K Frequent Words",
    requirement: "Cho mảng từ và số nguyên k. Trả về k từ xuất hiện nhiều nhất, cùng tần suất thì xếp theo bảng chữ cái.",
    signature: "string[] TopKWords(string[] words, int k)",
    constraints: ["1 <= words.Length <= 100000"],
    examples: [
      { input: "words = [\"i\",\"love\",\"leetcode\",\"i\",\"love\",\"coding\"], k = 2", output: "[\"i\",\"love\"]" },
      { input: "words = [\"a\",\"b\",\"b\"], k = 1", output: "[\"b\"]" },
    ], },

  { id: 'b8-h077', level: 'Nâng cao', title: "Group Shifted Strings",
    requirement: "Cho mảng chuỗi. Gom các chuỗi có thể dịch chuyển vòng bảng chữ cái thành nhau vào cùng một nhóm.",
    signature: "List<List<string>> GroupShifted(string[] strs)",
    constraints: ["1 <= strs.Length <= 10000"],
    examples: [
      { input: "strs = [\"abc\",\"bcd\",\"acef\",\"xyz\",\"az\",\"ba\",\"a\",\"z\"]", output: "[[\"abc\",\"bcd\",\"xyz\"],[\"acef\"],[\"az\",\"ba\"],[\"a\",\"z\"]]", explain: "\"abc\" dịch lên một bậc thành \"bcd\"." },
    ],
    hint: "Khoá là dãy hiệu giữa các ký tự liên tiếp, tính theo modulo 26.", },

  { id: 'b8-h078', level: 'Nâng cao', title: "Valid Word Abbreviation",
    requirement: "Cho một từ và một dạng viết tắt trong đó số chỉ số ký tự bị lược bỏ. Trả về true nếu viết tắt hợp lệ.",
    signature: "bool ValidAbbreviation(string word, string abbr)",
    constraints: ["1 <= word.Length <= 20", "Số trong abbr không có số 0 đứng đầu"],
    examples: [
      { input: "word = \"internationalization\", abbr = \"i12iz4n\"", output: "true" },
      { input: "word = \"apple\", abbr = \"a2e\"", output: "false" },
    ], },

  { id: 'b8-h079', level: 'Nâng cao', title: "Longest Substring with At Most Two Distinct",
    requirement: "Cho một chuỗi s. Trả về độ dài chuỗi con liên tiếp dài nhất có tối đa hai ký tự khác nhau.",
    signature: "int LengthOfLongestSubstringTwoDistinct(string s)",
    constraints: ["0 <= s.Length <= 100000"],
    examples: [
      { input: "s = \"eceba\"", output: "3", explain: "Chuỗi con \"ece\"." },
      { input: "s = \"ccaabbb\"", output: "5", explain: "Chuỗi con \"aabbb\"." },
    ], },

  { id: 'b8-h080', level: 'Nâng cao', title: "Subarray Product Less Than K",
    requirement: "Cho mảng số nguyên dương nums và số k. Trả về số mảng con liên tiếp có tích nhỏ hơn k.",
    signature: "int NumSubarrayProductLessThanK(int[] nums, int k)",
    constraints: ["1 <= nums.Length <= 30000", "1 <= nums[i] <= 1000"],
    examples: [
      { input: "nums = [10,5,2,6], k = 100", output: "8" },
      { input: "nums = [1,2,3], k = 0", output: "0" },
    ],
    hint: "Cửa sổ trượt, mỗi lần mở rộng cộng thêm độ dài cửa sổ hiện tại.", },

  { id: 'b8-h081', level: 'Nâng cao', title: "Max Consecutive Ones III",
    requirement: "Cho mảng nhị phân nums và số nguyên k. Được phép đổi tối đa k số 0 thành 1. Trả về độ dài dãy 1 liên tiếp dài nhất.",
    signature: "int LongestOnes(int[] nums, int k)",
    constraints: ["1 <= nums.Length <= 100000"],
    examples: [
      { input: "nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2", output: "6" },
    ], },

  { id: 'b8-h082', level: 'Nâng cao', title: "Minimum Size Subarray Sum",
    requirement: "Cho mảng số nguyên dương nums và số target. Trả về độ dài nhỏ nhất của mảng con liên tiếp có tổng lớn hơn hoặc bằng target, không có thì trả về 0.",
    signature: "int MinSubArrayLen(int target, int[] nums)",
    constraints: ["1 <= nums.Length <= 100000"],
    examples: [
      { input: "target = 7, nums = [2,3,1,2,4,3]", output: "2", explain: "Mảng con [4, 3]." },
      { input: "target = 11, nums = [1,1,1]", output: "0" },
    ], },

  { id: 'b8-h083', level: 'Nâng cao', title: "Continuous Subarray Sum chia hết k",
    requirement: "Cho mảng nums và số k. Trả về true nếu tồn tại mảng con liên tiếp độ dài ít nhất 2 có tổng chia hết cho k.",
    signature: "bool CheckSubarraySum(int[] nums, int k)",
    constraints: ["1 <= nums.Length <= 100000", "1 <= k <= 2_000_000_000"],
    examples: [
      { input: "nums = [23,2,4,6,7], k = 6", output: "true", explain: "Mảng con [2, 4] có tổng 6." },
      { input: "nums = [1,0], k = 2", output: "false" },
    ],
    hint: "Hai tổng tiền tố cùng số dư khi chia k thì đoạn giữa chúng chia hết cho k.", },

  { id: 'b8-h084', level: 'Nâng cao', title: "Partition Labels",
    requirement: "Cho một chuỗi s. Chia s thành nhiều đoạn sao cho mỗi ký tự chỉ xuất hiện trong đúng một đoạn, với số đoạn nhiều nhất. Trả về mảng độ dài các đoạn.",
    signature: "int[] PartitionLabels(string s)",
    constraints: ["1 <= s.Length <= 500", "Chỉ gồm chữ thường tiếng Anh"],
    examples: [
      { input: "s = \"ababcbacadefegdehijhklij\"", output: "[9,7,8]" },
    ],
    hint: "Ghi nhớ vị trí cuối cùng của mỗi ký tự rồi mở rộng đoạn khi duyệt.", },

  { id: 'b8-h085', level: 'Nâng cao', title: "Reorganize String",
    requirement: "Cho một chuỗi s. Sắp xếp lại sao cho không có hai ký tự giống nhau kề nhau. Không làm được thì trả về chuỗi rỗng.",
    signature: "string ReorganizeString(string s)",
    constraints: ["1 <= s.Length <= 500"],
    examples: [
      { input: "s = \"aab\"", output: "\"aba\"" },
      { input: "s = \"aaab\"", output: "\"\"", explain: "Ký tự a chiếm quá nửa nên không tách rời được." },
    ],
    hint: "Xếp ký tự phổ biến nhất vào các vị trí chẵn trước.", },

  { id: 'b8-h086', level: 'Nâng cao', title: "Rearrange Array k khoảng cách",
    requirement: "Cho mảng nums và số k. Sắp xếp lại sao cho hai phần tử bằng nhau cách nhau ít nhất k vị trí. Không làm được thì trả về mảng rỗng.",
    signature: "int[] RearrangeK(int[] nums, int k)",
    constraints: ["1 <= nums.Length <= 10000", "0 <= k <= nums.Length"],
    examples: [
      { input: "nums = [1,1,2,2,3], k = 2", output: "[1,2,3,1,2] hoặc phương án hợp lệ khác" },
    ], },

  { id: 'b8-h087', level: 'Nâng cao', title: "First Unique Number trong luồng",
    requirement: "Thiết kế cấu trúc nhận một luồng số, hỗ trợ Add và ShowFirstUnique trả về số đầu tiên chỉ xuất hiện một lần.",
    signature: "class FirstUnique { int ShowFirstUnique(); void Add(int); }",
    constraints: ["1 <= số thao tác <= 50000"],
    examples: [
      { input: "Khởi tạo [2,3,5]; ShowFirstUnique()", output: "2" },
      { input: "Add(5); ShowFirstUnique()", output: "2", explain: "Số 5 đã lặp lại nên bị loại khỏi danh sách duy nhất." },
    ],
    hint: "Hàng đợi giữ thứ tự kết hợp Dictionary đếm số lần.", },

  { id: 'b8-h088', level: 'Nâng cao', title: "Design Browser History",
    requirement: "Thiết kế lịch sử trình duyệt hỗ trợ Visit, Back và Forward.",
    signature: "class BrowserHistory { void Visit(string url); string Back(int steps); string Forward(int steps); }",
    constraints: ["1 <= số thao tác <= 5000", "Visit xoá toàn bộ lịch sử tiến"],
    examples: [
      { input: "Visit(\"a\"); Visit(\"b\"); Back(1)", output: "\"a\"" },
      { input: "Forward(1)", output: "\"b\"" },
    ], },

  { id: 'b8-h089', level: 'Nâng cao', title: "Design Snake Game",
    requirement: "Thiết kế trò rắn săn mồi trên lưới. Mỗi lần Move trả về điểm hiện tại, hoặc -1 nếu rắn chết.",
    signature: "class SnakeGame { int Move(string direction); }",
    constraints: ["1 <= chiều rộng, chiều cao <= 10000"],
    examples: [
      { input: "Lưới 3x2, thức ăn [[1,2],[0,1]]; Move(\"R\")", output: "0" },
      { input: "Move(\"D\")", output: "0" },
    ],
    hint: "HashSet lưu thân rắn để kiểm tra va chạm trong O(1).", },

  { id: 'b8-h090', level: 'Nâng cao', title: "Design Tic-Tac-Toe",
    requirement: "Thiết kế trò cờ ca-rô n x n. Mỗi lần Move trả về người thắng hoặc 0 nếu chưa ai thắng, mỗi lượt phải chạy trong O(1).",
    signature: "class TicTacToe { int Move(int row, int col, int player); }",
    constraints: ["2 <= n <= 100", "Mỗi lượt O(1)"],
    examples: [
      { input: "n = 2; Move(0,0,1); Move(1,1,1)", output: "1", explain: "Người chơi 1 thắng theo đường chéo." },
    ],
    hint: "Giữ tổng dồn cho từng hàng, cột và hai đường chéo thay vì quét lại bàn cờ.", },

  { id: 'b8-h091', level: 'Nâng cao', title: "Meeting Rooms III",
    requirement: "Cho danh sách cuộc họp và số phòng. Trả về chỉ số phòng tổ chức nhiều cuộc họp nhất.",
    signature: "int MostBooked(int soPhong, int[][] hop)",
    constraints: ["1 <= soPhong <= 100", "1 <= hop.Length <= 100000"],
    examples: [
      { input: "soPhong = 2, hop = [[0,10],[1,5],[2,7],[3,4]]", output: "0" },
    ], },

  { id: 'b8-h092', level: 'Nâng cao', title: "Employee Free Time",
    requirement: "Cho lịch bận của nhiều nhân viên. Trả về các khoảng thời gian mà tất cả đều rảnh.",
    signature: "int[][] EmployeeFreeTime(List<int[][]> lich)",
    constraints: ["1 <= số nhân viên <= 100"],
    examples: [
      { input: "lich = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]", output: "[[5,6],[7,9]]" },
    ],
    hint: "Gộp toàn bộ khoảng bận lại rồi lấy các khoảng trống ở giữa.", },

  { id: 'b8-h093', level: 'Nâng cao', title: "Find All Duplicates in Matrix",
    requirement: "Cho một ma trận. Trả về danh sách các giá trị xuất hiện ở nhiều hơn một ô, sắp xếp tăng dần.",
    signature: "int[] DuplicatesInMatrix(int[,] m)",
    constraints: ["1 <= số dòng, số cột <= 1000"],
    examples: [
      { input: "m = [[1,2],[2,3]]", output: "[2]" },
      { input: "m = [[1,2],[3,4]]", output: "[]" },
    ], },

  { id: 'b8-h094', level: 'Nâng cao', title: "Diagonal Traverse",
    requirement: "Cho một ma trận. Trả về mảng các phần tử theo thứ tự duyệt zíc zắc theo đường chéo.",
    signature: "int[] DiagonalTraverse(int[,] m)",
    constraints: ["1 <= số dòng, số cột <= 10000", "Tổng số phần tử <= 100000"],
    examples: [
      { input: "m = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,4,7,5,3,6,8,9]" },
    ], },

  { id: 'b8-h095', level: 'Nâng cao', title: "Word Search trong lưới",
    requirement: "Cho một lưới ký tự và một từ. Trả về true nếu ghép được từ đó bằng các ô kề nhau, mỗi ô dùng tối đa một lần.",
    signature: "bool Exist(char[,] board, string word)",
    constraints: ["1 <= số dòng, số cột <= 6", "1 <= word.Length <= 15"],
    examples: [
      { input: "board = [['A','B'],['C','D']], word = \"ABD\"", output: "true" },
      { input: "board = [['A','B']], word = \"BA\"", output: "true" },
    ],
    hint: "Duyệt sâu có quay lui, nhớ đánh dấu ô đã dùng rồi trả lại sau khi thử xong.", },

  { id: 'b8-h096', level: 'Nâng cao', title: "Combination Sum",
    requirement: "Cho mảng số nguyên dương khác nhau và một target. Trả về mọi tổ hợp có tổng bằng target, mỗi số được dùng nhiều lần.",
    signature: "List<List<int>> CombinationSum(int[] candidates, int target)",
    constraints: ["1 <= candidates.Length <= 30", "1 <= target <= 500"],
    examples: [
      { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]" },
      { input: "candidates = [2], target = 1", output: "[]" },
    ],
    hint: "Quay lui, mỗi nhánh được phép chọn lại chính số hiện tại.", },

  { id: 'b8-h097', level: 'Nâng cao', title: "Subsets",
    requirement: "Cho một mảng các số khác nhau. Trả về tất cả tập con, thứ tự không quan trọng.",
    signature: "List<List<int>> Subsets(int[] nums)",
    constraints: ["1 <= nums.Length <= 10"],
    examples: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
    ], },

  { id: 'b8-h098', level: 'Nâng cao', title: "Permutations",
    requirement: "Cho một mảng các số khác nhau. Trả về tất cả hoán vị của mảng.",
    signature: "List<List<int>> Permutations(int[] nums)",
    constraints: ["1 <= nums.Length <= 6"],
    examples: [
      { input: "nums = [1,2,3]", output: "6 hoán vị: [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]" },
    ], },

  { id: 'b8-h099', level: 'Nâng cao', title: "Generate Parentheses",
    requirement: "Cho số nguyên n. Trả về tất cả chuỗi ngoặc hợp lệ gồm đúng n cặp ngoặc.",
    signature: "List<string> GenerateParenthesis(int n)",
    constraints: ["1 <= n <= 8"],
    examples: [
      { input: "n = 3", output: "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]" },
      { input: "n = 1", output: "[\"()\"]" },
    ],
    hint: "Quay lui, chỉ mở khi còn ngoặc mở và chỉ đóng khi số đóng vẫn ít hơn số mở.", },

  { id: 'b8-h100', level: 'Nâng cao', title: "Bài tổng hợp — hệ thống thống kê đơn hàng",
    requirement: "Cho danh sách đơn hàng dạng \"maKhach|maSanPham|soLuong|donGia\". Trả về báo cáo gồm: tổng doanh thu, khách chi nhiều nhất, sản phẩm bán chạy nhất, và top 3 sản phẩm theo doanh thu.",
    signature: "BaoCao ThongKe(string[] donHang)",
    constraints: ["0 <= donHang.Length <= 100000", "Mọi trường đều hợp lệ"],
    examples: [
      { input: "donHang = [\"K1|S1|2|100\", \"K2|S1|1|100\", \"K1|S2|1|500\"]", output: "Doanh thu 800, khách chi nhiều nhất K1, bán chạy nhất S1, top 3 [S2, S1]" },
    ],
    hint: "Bài này dùng cùng lúc Dictionary, sắp xếp theo nhiều tiêu chí và xử lý chuỗi.", },
]
