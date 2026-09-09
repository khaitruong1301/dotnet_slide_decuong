import type { Exercise } from './types'

/**
 * Bộ bài tập collection — 20 bài mỗi cấp độ.
 * Tách riêng khỏi buoi08.ts cho dễ tìm và dễ bổ sung.
 */

const LST_NUMBER = '[20, 81, 97, 63, 72, 11, 20, 15, 33, 15, 41, 20]'
const LST_STRING = '["apple","banana","orange","kiwi","mango","pineapple","grape","melon"]'

const coBan: Exercise[] = [
  { id: 'b8-e01', level: 'Cơ bản', title: 'Khởi tạo và in danh sách', requirement: `Tạo List<int> chứa ${LST_NUMBER} rồi in ra màn hình trên một dòng, các số cách nhau bằng dấu phẩy.`, io: { input: '—', output: '20, 81, 97, 63, 72, 11, 20, 15, 33, 15, 41, 20' }, hint: 'string.Join(", ", lst)' },
  { id: 'b8-e02', level: 'Cơ bản', title: 'Đếm số phần tử', requirement: 'Nhập n số từ bàn phím vào một List, sau đó in ra số lượng phần tử đã nhập.', io: { input: '3\n10 20 30', output: 'Danh sách có 3 phần tử' }, hint: 'Thuộc tính .Count, không phải .Length.' },
  { id: 'b8-e03', level: 'Cơ bản', title: 'Thêm phần tử vào cuối', requirement: 'Cho List<int> { 10, 20, 30 }. Thêm số 40 và 50 vào cuối danh sách rồi in kết quả.', io: { input: '—', output: '10 20 30 40 50' }, hint: 'Add cho một phần tử, AddRange cho nhiều phần tử.' },
  { id: 'b8-e04', level: 'Cơ bản', title: 'Chèn phần tử vào giữa', requirement: 'Cho List<string> { "A", "B", "C" }. Chèn "X" vào vị trí 1, in danh sách trước và sau khi chèn để thấy vị trí các phần tử đã dịch chuyển.', io: { input: '—', output: 'Trước: A B C\nSau:   A X B C' } },
  { id: 'b8-e05', level: 'Cơ bản', title: 'Xoá theo giá trị và theo vị trí', requirement: `Cho lstNumber = ${LST_NUMBER}. Xoá số 97 theo giá trị, rồi xoá phần tử ở vị trí 0. In danh sách sau mỗi lần xoá.`, hint: 'Remove(giá trị) khác RemoveAt(chỉ số).' },
  { id: 'b8-e06', level: 'Cơ bản', title: 'Cập nhật phần tử theo chỉ số', requirement: 'Cho List<string> { "A", "B", "C", "D", "E" }. Đổi phần tử đầu tiên thành "X" và phần tử cuối cùng thành "Z".', io: { input: '—', output: 'X B C D Z' }, hint: 'Phần tử cuối: lst[lst.Count - 1] hoặc lst[^1].' },
  { id: 'b8-e07', level: 'Cơ bản', title: 'Tính tổng danh sách', requirement: `Tính tổng tất cả phần tử trong lstNumber = ${LST_NUMBER}.`, io: { input: '—', output: 'Tổng = 488' } },
  { id: 'b8-e08', level: 'Cơ bản', title: 'Tính trung bình cộng', requirement: 'Nhập n số vào List, tính và in ra trung bình cộng làm tròn 2 chữ số thập phân.', io: { input: '4\n10 20 30 40', output: 'Trung bình = 25.00' }, hint: 'Nhớ ép về double trước khi chia cho Count.' },
  { id: 'b8-e09', level: 'Cơ bản', title: 'Tìm số lớn nhất và nhỏ nhất', requirement: `Tìm số lớn nhất và số nhỏ nhất trong lstNumber = ${LST_NUMBER} bằng vòng lặp (không dùng Max/Min có sẵn).`, io: { input: '—', output: 'Lớn nhất 97, nhỏ nhất 11' } },
  { id: 'b8-e10', level: 'Cơ bản', title: 'Đếm phần tử thoả điều kiện', requirement: `Đếm xem trong lstNumber = ${LST_NUMBER} có bao nhiêu số lớn hơn 30.`, io: { input: '—', output: '7 số' } },
  { id: 'b8-e11', level: 'Cơ bản', title: 'Tổng các số lớn hơn 50', requirement: `Tính tổng các số lớn hơn 50 trong lstNumber = ${LST_NUMBER}.`, io: { input: '—', output: '313' } },
  { id: 'b8-e12', level: 'Cơ bản', title: 'In các số chẵn', requirement: `In ra tất cả số chẵn trong lstNumber = ${LST_NUMBER}.`, io: { input: '—', output: '20 72 20 20' } },
  { id: 'b8-e13', level: 'Cơ bản', title: 'Kiểm tra phần tử tồn tại', requirement: 'Nhập một số từ bàn phím, cho biết số đó có trong danh sách hay không và nằm ở vị trí nào.', io: { input: '15', output: 'Có, vị trí đầu tiên là 7' }, hint: 'Contains để kiểm tra, IndexOf để lấy vị trí (không có trả về −1).' },
  { id: 'b8-e14', level: 'Cơ bản', title: 'Sắp xếp tăng dần và giảm dần', requirement: 'Nhập n số vào List, in ra danh sách đã sắp xếp tăng dần, sau đó in tiếp danh sách giảm dần.', io: { input: '5\n3 1 4 1 5', output: 'Tăng: 1 1 3 4 5\nGiảm: 5 4 3 1 1' }, hint: 'Sort() rồi Reverse().' },
  { id: 'b8-e15', level: 'Cơ bản', title: 'Đảo ngược danh sách', requirement: 'Cho List<string> { "A", "B", "C", "D" }, in ra danh sách theo thứ tự ngược lại bằng vòng lặp for duyệt ngược.', io: { input: '—', output: 'D C B A' } },
  { id: 'b8-e16', level: 'Cơ bản', title: 'Lọc sang danh sách mới', requirement: `Từ lstNumber = ${LST_NUMBER}, tạo một List mới chỉ chứa các số nhỏ hơn 50.`, io: { input: '—', output: '20 11 20 15 33 15 41 20' } },
  { id: 'b8-e17', level: 'Cơ bản', title: 'Xử lý danh sách chuỗi', requirement: `Cho lstStrings = ${LST_STRING}. In ra các chuỗi dài hơn 5 ký tự và các chuỗi có chứa chữ cái 'a'.`, io: { input: '—', output: 'Dài hơn 5: banana orange pineapple\nCó chữ a: apple banana orange mango pineapple grape' } },
  { id: 'b8-e18', level: 'Cơ bản', title: 'Dictionary — thêm, đọc, xoá', requirement: 'Tạo Dictionary<string, int> lưu điểm ba môn toan, ly, hoa. In điểm môn Toán, thêm môn van, xoá môn ly rồi in lại toàn bộ.', hint: 'Dùng TryGetValue khi đọc để tránh KeyNotFoundException.' },
  { id: 'b8-e19', level: 'Cơ bản', title: 'Duyệt Dictionary', requirement: 'Tạo Dictionary<string, string> ánh xạ mã quốc gia sang tên nước (VN → Việt Nam, JP → Nhật Bản, KR → Hàn Quốc). Duyệt và in ra từng cặp.', io: { input: '—', output: 'VN = Việt Nam\nJP = Nhật Bản\nKR = Hàn Quốc' }, hint: 'foreach (var item in dict) rồi dùng item.Key và item.Value.' },
  { id: 'b8-e20', level: 'Cơ bản', title: 'HashSet và Array', requirement: 'Tạo HashSet<int> từ mảng { 1, 2, 2, 3, 3, 3 }, in số lượng phần tử. Sau đó chuyển HashSet đó về List và về Array, in cả hai.', io: { input: '—', output: 'HashSet có 3 phần tử: 1 2 3' }, hint: 'Array dùng .Length, List và HashSet dùng .Count.' },
]

const trungBinh: Exercise[] = [
  { id: 'b8-e21', level: 'Trung bình', title: 'Loại phần tử trùng lặp', requirement: 'Nhập một danh sách số có phần tử trùng, tạo danh sách mới không còn phần tử trùng, giữ nguyên thứ tự xuất hiện đầu tiên.', io: { input: '1 2 2 3 3 3 1', output: '1 2 3' }, hint: 'HashSet để nhớ đã gặp, List để giữ thứ tự.' },
  { id: 'b8-e22', level: 'Trung bình', title: 'Đếm tần suất phần tử', requirement: `Với lstNumber = ${LST_NUMBER}, đếm mỗi số xuất hiện bao nhiêu lần và in ra.`, io: { input: '—', output: '20 → 3 lần\n15 → 2 lần\n… (các số còn lại 1 lần)' }, hint: 'Dictionary<int,int>, gặp số nào thì tăng đếm của số đó.' },
  { id: 'b8-e23', level: 'Trung bình', title: 'Phần tử xuất hiện nhiều nhất', requirement: 'Cho một danh sách số, tìm phần tử xuất hiện nhiều lần nhất. Nếu hoà thì lấy phần tử gặp trước.', io: { input: '[20, 15, 20, 33, 15, 20]', output: '20 (3 lần)' } },
  { id: 'b8-e24', level: 'Trung bình', title: 'Phần tử chỉ xuất hiện một lần', requirement: 'Cho một danh sách số, in ra tất cả phần tử chỉ xuất hiện đúng một lần.', io: { input: '[4, 3, 4, 5, 3, 7]', output: '5 7' } },
  { id: 'b8-e25', level: 'Trung bình', title: 'Hợp của hai danh sách', requirement: 'Cho hai danh sách số, tạo danh sách chứa tất cả phần tử của cả hai, không trùng lặp.', io: { input: '[1,2,3] và [3,4,5]', output: '1 2 3 4 5' }, hint: 'HashSet rồi Add lần lượt cả hai danh sách.' },
  { id: 'b8-e26', level: 'Trung bình', title: 'Giao của hai danh sách', requirement: 'Cho hai danh sách số, tìm các phần tử xuất hiện ở cả hai danh sách.', io: { input: '[1,2,3,4] và [3,4,5]', output: '3 4' }, hint: 'Đưa danh sách thứ hai vào HashSet để kiểm tra tồn tại nhanh.' },
  { id: 'b8-e27', level: 'Trung bình', title: 'Hiệu của hai danh sách', requirement: 'Cho hai danh sách A và B, in ra các phần tử có trong A nhưng không có trong B.', io: { input: 'A=[1,2,3,4] B=[3,4]', output: '1 2' } },
  { id: 'b8-e28', level: 'Trung bình', title: 'Tách chẵn lẻ thành hai danh sách', requirement: 'Cho một danh sách số, tách thành hai danh sách riêng chứa số chẵn và số lẻ, in cả hai.', io: { input: '[1,2,3,4,5,6]', output: 'Chẵn: 2 4 6\nLẻ: 1 3 5' } },
  { id: 'b8-e29', level: 'Trung bình', title: 'Sắp xếp chuỗi theo độ dài', requirement: `Cho lstStrings = ${LST_STRING}, sắp xếp theo độ dài chuỗi tăng dần; độ dài bằng nhau thì xếp theo bảng chữ cái.`, io: { input: '—', output: 'kiwi grape melon mango apple orange banana pineapple' } },
  { id: 'b8-e30', level: 'Trung bình', title: 'Tìm phần tử lớn thứ hai', requirement: 'Cho một danh sách số, tìm giá trị lớn thứ hai (các giá trị trùng nhau chỉ tính một lần).', io: { input: '[20, 97, 81, 97, 63]', output: '81' } },
  { id: 'b8-e31', level: 'Trung bình', title: 'Xoay danh sách k bước', requirement: 'Cho một danh sách và số nguyên k, xoay danh sách sang phải k bước.', io: { input: '[1,2,3,4,5], k = 2', output: '4 5 1 2 3' }, hint: 'Chỉ số mới = (i + k) % Count.' },
  { id: 'b8-e32', level: 'Trung bình', title: 'Trộn xen kẽ hai danh sách', requirement: 'Cho hai danh sách, tạo danh sách mới bằng cách lấy xen kẽ từng phần tử. Danh sách nào dài hơn thì phần dư nối vào cuối.', io: { input: '[1,2,3] và [7,8,9,10,11]', output: '1 7 2 8 3 9 10 11' } },
  { id: 'b8-e33', level: 'Trung bình', title: 'Kiểm tra hai danh sách là hoán vị', requirement: 'Cho hai danh sách, kiểm tra xem chúng có cùng các phần tử với cùng số lần xuất hiện hay không (thứ tự không quan trọng).', io: { input: '[1,2,2,3] và [3,2,1,2]', output: 'Là hoán vị của nhau' }, hint: 'Đếm tần suất bằng Dictionary rồi so hai bảng đếm.' },
  { id: 'b8-e34', level: 'Trung bình', title: 'Đếm tần suất ký tự', requirement: 'Nhập một chuỗi, đếm số lần xuất hiện của mỗi ký tự (bỏ qua khoảng trắng, không phân biệt hoa thường).', io: { input: 'Hello World', output: 'l → 3, o → 2, h → 1, e → 1, w → 1, r → 1, d → 1' } },
  { id: 'b8-e35', level: 'Trung bình', title: 'Đếm tần suất từ', requirement: 'Nhập một đoạn văn, đếm số lần xuất hiện của mỗi từ và in ra theo thứ tự giảm dần.', io: { input: 'a b a c b a', output: 'a: 3, b: 2, c: 1' } },
  { id: 'b8-e36', level: 'Trung bình', title: 'Nhóm từ theo chữ cái đầu', requirement: `Cho lstStrings = ${LST_STRING}, nhóm các từ theo chữ cái đầu tiên bằng Dictionary<char, List<string>> rồi in từng nhóm.`, io: { input: '—', output: 'm: mango, melon\np: pineapple\n…' } },
  { id: 'b8-e37', level: 'Trung bình', title: 'Giỏ hàng đơn giản', requirement: 'Dùng Dictionary<string, int> làm giỏ hàng (tên sản phẩm → số lượng). Cho phép thêm sản phẩm (đã có thì cộng dồn số lượng), giảm số lượng, xoá sản phẩm và in tổng số món.', hint: 'ContainsKey trước khi cộng dồn.' },
  { id: 'b8-e38', level: 'Trung bình', title: 'Bảng điểm sinh viên', requirement: 'Dùng Dictionary<string, List<double>> lưu tên sinh viên và danh sách điểm. Cho phép thêm điểm cho một sinh viên, tính điểm trung bình và in bảng tổng hợp.', hint: 'Chưa có khoá thì tạo List rỗng trước khi Add.' },
  { id: 'b8-e39', level: 'Trung bình', title: 'Thống kê xếp loại', requirement: 'Cho một danh sách điểm số (0–10), đếm xem có bao nhiêu bài Giỏi (≥8), Khá (≥6.5), Trung bình (≥5) và Yếu, in ra bảng thống kê.', io: { input: '[9, 7, 5, 4, 8.5, 6]', output: 'Giỏi 2, Khá 1, Trung bình 2, Yếu 1' } },
  { id: 'b8-e40', level: 'Trung bình', title: 'Danh bạ điện thoại', requirement: 'Xây dựng danh bạ Dictionary<string, string> (tên → số điện thoại) với menu: thêm, tra cứu theo tên, sửa, xoá, liệt kê toàn bộ, thoát.', hint: 'do…while bọc ngoài switch, tra cứu bằng TryGetValue.' },
]

const nangCao: Exercise[] = [
  { id: 'b8-e41', level: 'Nâng cao', title: 'Two Sum', requirement: 'Cho mảng nums và giá trị target, tìm chỉ số của hai phần tử có tổng bằng target. Giải bằng Dictionary chỉ với một lượt duyệt.', io: { input: 'nums = [2,7,11,15], target = 9', output: '[0, 1]' }, hint: 'Ghi nhớ giá trị đã đi qua, mỗi bước hỏi "số bù target − nums[i] đã gặp chưa".', visual: { kind: 'flow', caption: 'Ghi nhớ số đã đi qua, mỗi bước hỏi số bù đã gặp chưa', steps: [
    { kind: 'start', text: 'daGap = Dictionary rỗng' },
    { kind: 'process', text: 'Duyệt i từ 0 đến n−1' },
    { kind: 'decision', text: 'daGap chứa (target − nums[i])?', branches: [
      { label: 'Có', steps: [{ kind: 'end', text: 'Trả về [daGap[bù], i]' }] },
      { label: 'Chưa', steps: [{ kind: 'process', text: 'daGap[nums[i]] = i, sang i kế tiếp' }] } ] } ] } },
  { id: 'b8-e42', level: 'Nâng cao', title: 'Best Time to Buy and Sell Stock', requirement: 'Cho mảng prices là giá cổ phiếu theo ngày. Mua một lần, bán một lần sau đó, tìm khoản lãi lớn nhất.', io: { input: 'prices = [7,1,5,3,6,4]', output: '5' }, hint: 'Vừa duyệt vừa nhớ giá thấp nhất đã gặp.', visual: { kind: 'flow', caption: 'Một lượt duyệt: vừa đi vừa nhớ giá thấp nhất', steps: [
    { kind: 'start', text: 'giaThapNhat = ∞ · laiCaoNhat = 0' },
    { kind: 'process', text: 'Duyệt từng giá trong prices' },
    { kind: 'decision', text: 'gia < giaThapNhat?', branches: [
      { label: 'Đúng', steps: [{ kind: 'process', text: 'giaThapNhat = gia' }] },
      { label: 'Sai', steps: [{ kind: 'process', text: 'laiCaoNhat = max(laiCaoNhat, gia − giaThapNhat)' }] } ] },
    { kind: 'end', text: 'In laiCaoNhat' } ] } },
  { id: 'b8-e43', level: 'Nâng cao', title: 'Longest Consecutive Sequence', requirement: 'Cho mảng số nguyên, tìm độ dài chuỗi số liên tiếp dài nhất (các số không cần nằm cạnh nhau trong mảng).', io: { input: 'nums = [100,4,200,1,3,2]', output: '4' }, hint: 'HashSet, chỉ bắt đầu đếm từ phần tử không có số liền trước.', visual: { kind: 'flow', caption: 'Chỉ đếm từ đầu chuỗi nên mỗi số được duyệt đúng một lần', steps: [
    { kind: 'start', text: 'Đưa toàn bộ nums vào HashSet' },
    { kind: 'process', text: 'Duyệt từng x trong set' },
    { kind: 'decision', text: 'set có chứa x − 1?', branches: [
      { label: 'Có', steps: [{ kind: 'note', text: 'x không phải đầu chuỗi — bỏ qua' }] },
      { label: 'Không', steps: [{ kind: 'process', text: 'Đếm tiến x+1, x+2… còn trong set' }, { kind: 'process', text: 'Cập nhật daiNhat' }] } ] },
    { kind: 'end', text: 'In daiNhat' } ] } },
  { id: 'b8-e44', level: 'Nâng cao', title: 'Contains Duplicate', requirement: 'Cho một mảng, kiểm tra có phần tử nào xuất hiện từ hai lần trở lên hay không, chỉ với một lượt duyệt.', io: { input: '[1,2,3,1]', output: 'true' }, hint: 'HashSet.Add trả về false khi phần tử đã tồn tại.', visual: { kind: 'flow', caption: 'HashSet.Add trả về false ngay khi gặp phần tử đã có', steps: [
    { kind: 'start', text: 'set = HashSet rỗng' },
    { kind: 'process', text: 'Duyệt từng phần tử x' },
    { kind: 'decision', text: 'set.Add(x) trả về false?', branches: [
      { label: 'Đúng', steps: [{ kind: 'end', text: 'Có trùng — trả về true' }] },
      { label: 'Sai', steps: [{ kind: 'process', text: 'Sang phần tử kế tiếp' }] } ] },
    { kind: 'end', text: 'Hết mảng — trả về false' } ] } },
  { id: 'b8-e45', level: 'Nâng cao', title: 'Valid Anagram', requirement: 'Cho hai chuỗi, kiểm tra chuỗi này có phải là hoán vị ký tự của chuỗi kia không.', io: { input: '"anagram", "nagaram"', output: 'true' }, hint: 'Đếm tần suất ký tự rồi so hai bảng đếm.', visual: { kind: 'flow', caption: 'So bảng đếm ký tự của hai chuỗi', steps: [
    { kind: 'decision', text: 'Hai chuỗi khác độ dài?', branches: [
      { label: 'Đúng', steps: [{ kind: 'end', text: 'false' }] },
      { label: 'Sai', steps: [{ kind: 'process', text: 'Đếm tần suất ký tự chuỗi A' }, { kind: 'process', text: 'Duyệt B, trừ dần bảng đếm' }] } ] },
    { kind: 'decision', text: 'Mọi ô đếm đều về 0?', branches: [
      { label: 'Đúng', steps: [{ kind: 'end', text: 'true' }] },
      { label: 'Sai', steps: [{ kind: 'end', text: 'false' }] } ] } ] } },
  { id: 'b8-e46', level: 'Nâng cao', title: 'Group Anagrams', requirement: 'Cho một danh sách từ, nhóm các từ là hoán vị ký tự của nhau vào cùng một nhóm.', io: { input: '["eat","tea","tan","ate","nat","bat"]', output: '[[eat,tea,ate], [tan,nat], [bat]]' }, hint: 'Khoá của Dictionary là chuỗi đã sắp xếp ký tự.', visual: { kind: 'flow', caption: 'Chuỗi đã sắp xếp ký tự làm khoá gom nhóm', steps: [
    { kind: 'start', text: 'nhom = Dictionary<string, List<string>>' },
    { kind: 'process', text: 'Với mỗi từ: sắp xếp ký tự để ra khoá' },
    { kind: 'decision', text: 'Khoá đã có trong nhom?', branches: [
      { label: 'Có', steps: [{ kind: 'process', text: 'Thêm từ vào nhóm sẵn có' }] },
      { label: 'Chưa', steps: [{ kind: 'process', text: 'Tạo nhóm mới cho khoá' }] } ] },
    { kind: 'end', text: 'Trả về các nhóm' } ] } },
  { id: 'b8-e47', level: 'Nâng cao', title: 'Top K phần tử phổ biến nhất', requirement: 'Cho một mảng số và số nguyên k, trả về k phần tử xuất hiện nhiều lần nhất.', io: { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1, 2]' }, hint: 'Dictionary đếm tần suất rồi sắp xếp theo Value giảm dần.', visual: { kind: 'flow', steps: [
    { kind: 'start', text: 'Đếm tần suất bằng Dictionary' },
    { kind: 'process', text: 'Sắp xếp các cặp theo số lần giảm dần' },
    { kind: 'process', text: 'Lấy k khoá đầu tiên' },
    { kind: 'end', text: 'Trả về danh sách k phần tử' } ] } },
  { id: 'b8-e48', level: 'Nâng cao', title: 'Majority Element', requirement: 'Cho mảng có một phần tử xuất hiện quá nửa số lần, tìm phần tử đó. Thử giải mà chỉ dùng một biến đếm, không dùng Dictionary.', io: { input: '[2,2,1,1,1,2,2]', output: '2' }, hint: 'Thuật toán Boyer–Moore: giữ một ứng viên và một bộ đếm.', visual: { kind: 'flow', caption: 'Boyer–Moore: chỉ cần một ứng viên và một bộ đếm', steps: [
    { kind: 'start', text: 'ungVien = null · dem = 0' },
    { kind: 'decision', text: 'dem == 0?', branches: [
      { label: 'Đúng', steps: [{ kind: 'process', text: 'ungVien = x, dem = 1' }] },
      { label: 'Sai', steps: [{ kind: 'process', text: 'x == ungVien ? dem++ : dem−−' }] } ] },
    { kind: 'end', text: 'ungVien là phần tử đa số' } ] } },
  { id: 'b8-e49', level: 'Nâng cao', title: 'Move Zeroes', requirement: 'Cho một mảng số, dồn tất cả số 0 về cuối mảng nhưng giữ nguyên thứ tự tương đối của các số khác 0. Không tạo mảng mới.', io: { input: '[0,1,0,3,12]', output: '[1,3,12,0,0]' }, hint: 'Hai con trỏ: một chạy duyệt, một đánh dấu vị trí ghi kế tiếp.', visual: { kind: 'flow', caption: 'Hai con trỏ: một duyệt, một đánh dấu vị trí ghi', steps: [
    { kind: 'start', text: 'viTriGhi = 0' },
    { kind: 'process', text: 'Duyệt i qua toàn mảng' },
    { kind: 'decision', text: 'nums[i] khác 0?', branches: [
      { label: 'Đúng', steps: [{ kind: 'process', text: 'nums[viTriGhi++] = nums[i]' }] },
      { label: 'Sai', steps: [{ kind: 'note', text: 'Bỏ qua số 0' }] } ] },
    { kind: 'end', text: 'Điền 0 vào phần đuôi còn lại' } ] } },
  { id: 'b8-e50', level: 'Nâng cao', title: 'Product of Array Except Self', requirement: 'Cho mảng nums, trả về mảng kết quả mà mỗi phần tử là tích của tất cả phần tử còn lại. Không dùng phép chia.', io: { input: '[1,2,3,4]', output: '[24,12,8,6]' }, hint: 'Một lượt tính tích tiền tố, một lượt ngược tính tích hậu tố.', visual: { kind: 'flow', caption: 'Hai lượt duyệt, không dùng phép chia', steps: [
    { kind: 'start', text: 'kq[i] = 1 với mọi i' },
    { kind: 'process', text: 'Lượt xuôi: kq[i] = tích mọi phần tử bên trái' },
    { kind: 'process', text: 'Lượt ngược: nhân thêm tích mọi phần tử bên phải' },
    { kind: 'end', text: 'Trả về kq' } ] } },
  { id: 'b8-e51', level: 'Nâng cao', title: 'Two Sum II — mảng đã sắp xếp', requirement: 'Cho mảng đã sắp xếp tăng dần và target, tìm hai phần tử có tổng bằng target bằng kỹ thuật hai con trỏ, không dùng Dictionary.', io: { input: '[2,7,11,15], target = 9', output: '[0, 1]' }, hint: 'Con trỏ trái và phải tiến vào giữa tuỳ tổng lớn hay nhỏ hơn target.', visual: { kind: 'flow', caption: 'Mảng đã sắp xếp nên chỉ cần dịch con trỏ', steps: [
    { kind: 'start', text: 'trai = 0 · phai = n − 1' },
    { kind: 'decision', text: 'So tổng nums[trai] + nums[phai] với target', branches: [
      { label: 'Bằng', steps: [{ kind: 'end', text: 'Trả về [trai, phai]' }] },
      { label: 'Nhỏ hơn', steps: [{ kind: 'process', text: 'trai++' }] },
      { label: 'Lớn hơn', steps: [{ kind: 'process', text: 'phai−−' }] } ] } ] } },
  { id: 'b8-e52', level: 'Nâng cao', title: '3Sum', requirement: 'Cho một mảng số, tìm tất cả bộ ba phần tử có tổng bằng 0, không lặp lại bộ ba giống nhau.', io: { input: '[-1,0,1,2,-1,-4]', output: '[[-1,-1,2], [-1,0,1]]' }, hint: 'Sắp xếp trước, cố định một số rồi dùng hai con trỏ cho phần còn lại.', visual: { kind: 'flow', caption: 'Cố định một số, phần còn lại quy về Two Sum hai con trỏ', steps: [
    { kind: 'start', text: 'Sắp xếp mảng tăng dần' },
    { kind: 'process', text: 'Cố định nums[i], bỏ qua giá trị trùng i' },
    { kind: 'process', text: 'Hai con trỏ tìm cặp có tổng = −nums[i]' },
    { kind: 'end', text: 'Gom các bộ ba tìm được' } ] } },
  { id: 'b8-e53', level: 'Nâng cao', title: 'Longest Substring Without Repeating Characters', requirement: 'Cho một chuỗi, tìm độ dài chuỗi con dài nhất không có ký tự lặp lại.', io: { input: '"abcabcbb"', output: '3 (chuỗi "abc")' }, hint: 'Cửa sổ trượt kết hợp Dictionary lưu vị trí gần nhất của mỗi ký tự.', visual: { kind: 'flow', caption: 'Cửa sổ trượt: gặp ký tự lặp thì kéo mép trái lên', steps: [
    { kind: 'start', text: 'trai = 0 · viTriCuoi = Dictionary rỗng' },
    { kind: 'process', text: 'Cho phai chạy hết chuỗi' },
    { kind: 'decision', text: 'Ký tự đã xuất hiện trong cửa sổ?', branches: [
      { label: 'Có', steps: [{ kind: 'process', text: 'trai = viTriCuoi[c] + 1' }] },
      { label: 'Không', steps: [{ kind: 'process', text: 'Cập nhật độ dài lớn nhất' }] } ] },
    { kind: 'end', text: 'In độ dài lớn nhất' } ] } },
  { id: 'b8-e54', level: 'Nâng cao', title: 'Subarray Sum Equals K', requirement: 'Cho mảng số nguyên và giá trị k, đếm số mảng con liên tiếp có tổng bằng k.', io: { input: 'nums = [1,1,1], k = 2', output: '2' }, hint: 'Dictionary đếm tần suất tổng tiền tố đã gặp.', visual: { kind: 'flow', caption: 'Tổng tiền tố: đếm số lần đã gặp tổng (hiện tại − k)', steps: [
    { kind: 'start', text: 'tong = 0 · dem[0] = 1' },
    { kind: 'process', text: 'Duyệt từng phần tử, cộng dồn vào tong' },
    { kind: 'process', text: 'ketQua += dem[tong − k]' },
    { kind: 'process', text: 'dem[tong]++' },
    { kind: 'end', text: 'In ketQua' } ] } },
  { id: 'b8-e55', level: 'Nâng cao', title: 'Find All Duplicates', requirement: 'Cho mảng các số trong khoảng 1..n, tìm tất cả phần tử xuất hiện đúng hai lần.', io: { input: '[4,3,2,7,8,2,3,1]', output: '[2, 3]' }, visual: { kind: 'flow', steps: [
    { kind: 'start', text: 'daGap = HashSet rỗng' },
    { kind: 'decision', text: 'x đã có trong daGap?', branches: [
      { label: 'Có', steps: [{ kind: 'process', text: 'Ghi x vào kết quả' }] },
      { label: 'Chưa', steps: [{ kind: 'process', text: 'daGap.Add(x)' }] } ] },
    { kind: 'end', text: 'Trả về danh sách trùng' } ] } },
  { id: 'b8-e56', level: 'Nâng cao', title: 'First Missing Positive', requirement: 'Cho một mảng số nguyên, tìm số nguyên dương nhỏ nhất không có mặt trong mảng.', io: { input: '[3,4,-1,1]', output: '2' }, hint: 'Đưa vào HashSet rồi dò từ 1 đi lên.', visual: { kind: 'flow', steps: [
    { kind: 'start', text: 'Đưa toàn bộ mảng vào HashSet' },
    { kind: 'process', text: 'Thử lần lượt i = 1, 2, 3…' },
    { kind: 'decision', text: 'set có chứa i?', branches: [
      { label: 'Có', steps: [{ kind: 'process', text: 'Tăng i, thử tiếp' }] },
      { label: 'Không', steps: [{ kind: 'end', text: 'i là đáp án' }] } ] } ] } },
  { id: 'b8-e57', level: 'Nâng cao', title: 'Merge Intervals', requirement: 'Cho danh sách các khoảng [đầu, cuối], gộp các khoảng chồng lấn lên nhau.', io: { input: '[[1,3],[2,6],[8,10]]', output: '[[1,6],[8,10]]' }, hint: 'Sắp xếp theo điểm đầu rồi gộp lần lượt.', visual: { kind: 'flow', caption: 'Sắp xếp theo điểm đầu rồi gộp lần lượt', steps: [
    { kind: 'start', text: 'Sắp xếp các khoảng theo điểm đầu' },
    { kind: 'decision', text: 'Đầu khoảng mới ≤ cuối khoảng trước?', branches: [
      { label: 'Đúng', steps: [{ kind: 'process', text: 'Nới cuối khoảng trước ra' }] },
      { label: 'Sai', steps: [{ kind: 'process', text: 'Mở một khoảng mới' }] } ] },
    { kind: 'end', text: 'Trả về danh sách đã gộp' } ] } },
  { id: 'b8-e58', level: 'Nâng cao', title: 'Isomorphic Strings', requirement: 'Cho hai chuỗi, kiểm tra có thể thay thế từng ký tự của chuỗi này thành ký tự của chuỗi kia một cách nhất quán hay không.', io: { input: '"egg", "add"', output: 'true' }, hint: 'Hai Dictionary ánh xạ hai chiều để tránh hai ký tự cùng ánh xạ về một.', visual: { kind: 'flow', caption: 'Hai Dictionary để ánh xạ đúng một-một', steps: [
    { kind: 'process', text: 'Duyệt song song từng cặp ký tự (a, b)' },
    { kind: 'decision', text: 'a hoặc b đã ánh xạ tới ký tự khác?', branches: [
      { label: 'Đúng', steps: [{ kind: 'end', text: 'false' }] },
      { label: 'Sai', steps: [{ kind: 'process', text: 'Ghi nhận a → b và b → a' }] } ] },
    { kind: 'end', text: 'Hết chuỗi — trả về true' } ] } },
  { id: 'b8-e59', level: 'Nâng cao', title: 'Bộ nhớ đệm LRU đơn giản', requirement: 'Xây dựng lớp lưu tối đa N cặp khoá-giá trị. Khi đầy, phần tử lâu chưa được dùng nhất bị loại bỏ. Hỗ trợ Get và Put.', hint: 'Dictionary để tra cứu nhanh, LinkedList để giữ thứ tự sử dụng.', visual: { kind: 'flow', caption: 'Dictionary tra cứu nhanh, LinkedList giữ thứ tự dùng', steps: [
    { kind: 'process', text: 'Get / Put một khoá' },
    { kind: 'decision', text: 'Khoá đã có?', branches: [
      { label: 'Có', steps: [{ kind: 'process', text: 'Đẩy khoá lên đầu danh sách' }] },
      { label: 'Chưa', steps: [{ kind: 'process', text: 'Thêm vào đầu danh sách' }, { kind: 'decision', text: 'Vượt sức chứa N?', branches: [ { label: 'Có', steps: [{ kind: 'process', text: 'Loại bỏ phần tử cuối' }] }, { label: 'Không', steps: [{ kind: 'note', text: 'Giữ nguyên' }] } ] }] } ] } ] } },
  { id: 'b8-e60', level: 'Nâng cao', title: 'Quản lý sản phẩm — bài tổng hợp', requirement: 'Dùng List kết hợp menu do…while: thêm, xem danh sách, tìm theo tên, sửa giá, xoá theo tên, sắp xếp theo giá, thống kê tổng tồn kho, thoát. Mỗi chức năng là một hàm riêng, có kiểm tra dữ liệu nhập.', hint: 'Bài này ôn lại toàn bộ 8 buổi.', visual: { kind: 'flow', caption: 'Menu lặp cho tới khi người dùng chọn thoát', steps: [
    { kind: 'start', text: 'Khởi tạo List sản phẩm' },
    { kind: 'io', text: 'Hiện menu, đọc lựa chọn' },
    { kind: 'decision', text: 'Lựa chọn là gì?', branches: [
      { label: '1-2', steps: [{ kind: 'process', text: 'Thêm / xem danh sách' }] },
      { label: '3-5', steps: [{ kind: 'process', text: 'Tìm / sửa / xoá theo tên' }] },
      { label: '0', steps: [{ kind: 'end', text: 'Thoát chương trình' }] } ] } ] } },
]

export const BAI_TAP_COLLECTION: Exercise[] = [...coBan, ...trungBinh, ...nangCao]
