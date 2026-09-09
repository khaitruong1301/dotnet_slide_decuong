import type { Buoi } from './types'

const buoi02: Buoi = {
  id: 2,
  slug: 'bien-kieu-du-lieu-toan-tu',
  title: 'Biến, kiểu dữ liệu & toán tử',
  subtitle: 'Chọn đúng kiểu dữ liệu, tính toán chính xác và chuyển kiểu an toàn',
  duration: '3 giờ',
  keywords: ['int', 'double', 'decimal', 'Convert', 'TryParse', 'ép kiểu', '??'],
  goals: [
    'Khai báo biến đúng quy tắc và đặt tên theo chuẩn camelCase',
    'Chọn được kiểu dữ liệu phù hợp cho từng tình huống (tiền tệ, điểm số, cờ đúng/sai)',
    'Dùng thành thạo toán tử số học, toán tử gán rút gọn',
    'Chuyển kiểu bằng ép kiểu, Convert, Parse/TryParse và biết khi nào dùng cái nào',
  ],

  sections: [
    {
      id: 'bien',
      title: '1. Biến — vùng nhớ có tên',
      blocks: [
        {
          type: 'text',
          text: 'Biến là một ô nhớ được đặt tên để lưu dữ liệu tạm thời trong lúc chương trình chạy. Khai báo biến là nói cho máy biết: ô nhớ này chứa kiểu gì, tên là gì, giá trị ban đầu ra sao.',
        },
        {
          type: 'code',
          sample: {
            title: 'Cú pháp khai báo',
            code: `[kiểu dữ liệu] [tên biến] = [giá trị];

int soLuong = 10;
double donGia = 25000.5;
string tenSanPham = "Bàn phím cơ";
bool conHang = true;`,
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'boxes',
            caption: 'Mỗi biến là một ô nhớ mang tên riêng, chứa đúng một giá trị tại một thời điểm',
            items: [
              { label: 'soLuong', value: '10', note: 'int — 4 byte' },
              { label: 'donGia', value: '25000.5', note: 'double — 8 byte' },
              { label: 'tenSanPham', value: '"Bàn phím cơ"', note: 'string' },
              { label: 'conHang', value: 'true', note: 'bool' },
            ],
          },
        },
        {
          type: 'table',
          head: ['Quy tắc', 'Đúng', 'Sai'],
          rows: [
            ['Bắt đầu bằng chữ hoặc _', 'soLuong, _temp', '2soLuong'],
            ['Không khoảng trắng', 'giaTri', 'gia tri'],
            ['Không dấu tiếng Việt', 'donGia', 'đơnGiá'],
            ['Phân biệt hoa thường', 'age ≠ Age', '—'],
            ['Đặt tên có nghĩa, camelCase', 'tongTien', 'a, x1'],
          ],
        },
      ],
    },

    {
      id: 'kieu-du-lieu',
      title: '2. Kiểu dữ liệu — chọn đúng ngay từ đầu',
      blocks: [
        {
          type: 'table',
          head: ['Kiểu', 'Dùng cho', 'Lưu ý'],
          rows: [
            ['int', 'Số nguyên: số lượng, tuổi, năm', 'Khoảng −2,1 tỷ đến 2,1 tỷ'],
            ['long', 'Số nguyên rất lớn: id, timestamp', '64-bit'],
            ['double', 'Số thực: điểm số, chiều cao', 'Chính xác ~15 chữ số'],
            ['float', 'Số thực nhẹ, ít dùng', 'Phải thêm hậu tố f: 1.5f'],
            ['decimal', 'Tiền tệ', 'Chính xác nhất — luôn dùng cho tiền, hậu tố m'],
            ['bool', 'Đúng / sai, hợp lệ / không', 'Chỉ có true hoặc false'],
            ['char', 'Một ký tự', "Dùng nháy đơn: 'A'"],
            ['string', 'Chuỗi ký tự: tên, email', 'Dùng nháy kép: "abc"'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Tiền tệ dùng decimal, không dùng double',
          text: 'double lưu số thực dưới dạng nhị phân nên bị sai số làm tròn: 0.1 + 0.2 không bằng đúng 0.3. Với tiền bạc, sai số này tích luỹ thành lỗi thật.',
        },
        {
          type: 'code',
          sample: {
            title: 'Nullable — cho phép "chưa có giá trị"',
            code: `int? diemThi = null;      // dấu ? cho phép biến kiểu số nhận null
Console.WriteLine(diemThi.HasValue);      // False

diemThi = 8;
Console.WriteLine(diemThi.Value);         // 8`,
            note: 'null nghĩa là chưa có giá trị — khác hoàn toàn với số 0.',
          },
        },
      ],
    },

    {
      id: 'toan-tu',
      title: '3. Toán tử',
      blocks: [
        {
          type: 'table',
          head: ['Toán tử', 'Ý nghĩa', 'Ví dụ'],
          rows: [
            ['+ − * ', 'Cộng, trừ, nhân', '5 * 3 → 15'],
            ['/', 'Chia', '7 / 2 → 3 (số nguyên!) · 7.0 / 2 → 3.5'],
            ['%', 'Chia lấy dư', '7 % 2 → 1'],
            ['+= −= *= /= %=', 'Gán rút gọn', 'x += 5 tương đương x = x + 5'],
            ['++ −−', 'Tăng / giảm 1 đơn vị', 'i++'],
            ['??', 'Lấy vế trái nếu khác null', 'ten ?? "Khách"'],
            ['??=', 'Chỉ gán khi biến đang null', 'ten ??= "Khách"'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Bẫy chia số nguyên',
          text: 'int / int luôn cho ra int, phần thập phân bị cắt bỏ. 9 / 5 cho 1 chứ không phải 1.8. Muốn đúng, hãy để ít nhất một vế là số thực: 9.0 / 5.',
        },
        {
          type: 'text',
          text: 'Khi trộn nhiều kiểu số trong một biểu thức, C# nâng tất cả về kiểu "lớn nhất" theo thứ tự int < long < float < double. Riêng dấu + giữa chuỗi và số thì không phải phép cộng mà là phép nối chuỗi.',
        },
        {
          type: 'code',
          sample: {
            title: 'Cùng dấu + nhưng hai ý nghĩa',
            code: `int a = 1 + 1;              // 2      — phép cộng
string b = "1" + 1;         // "11"   — nối chuỗi
double c = 9 / 5;           // 1      — chia số nguyên rồi mới gán
double d = 9.0 / 5;         // 1.8    — đúng`,
          },
        },
      ],
    },

    {
      id: 'ep-kieu',
      title: '4. Chuyển đổi kiểu dữ liệu',
      blocks: [
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Bốn cách chuyển kiểu và tình huống dùng',
            columns: [
              { title: 'Ngầm định', tone: 'good', items: ['Kiểu nhỏ → kiểu lớn', 'Tự động, an toàn', 'int i = 5; double d = i;'] },
              { title: 'Tường minh (cast)', tone: 'plain', items: ['Kiểu lớn → kiểu nhỏ', 'Có thể mất dữ liệu', 'int i = (int)3.9; // 3'] },
              { title: 'Convert / Parse', tone: 'plain', items: ['string → số', 'Ném lỗi nếu chuỗi sai', 'Convert.ToInt32("12")'] },
              { title: 'TryParse', tone: 'good', items: ['string → số, an toàn', 'Trả về true/false, không crash', 'Dùng khi đọc input người dùng'] },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'TryParse — cách đọc input an toàn',
            code: `Console.Write("Nhập tuổi: ");
string nhap = Console.ReadLine();

if (int.TryParse(nhap, out int tuoi))
{
    Console.WriteLine($"Bạn {tuoi} tuổi.");
}
else
{
    Console.WriteLine("Dữ liệu không hợp lệ.");
}`,
            note: 'Convert.ToInt32("abc") làm chương trình văng lỗi. TryParse chỉ trả về false — chương trình vẫn chạy tiếp.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Luồng đọc và kiểm tra dữ liệu người dùng nhập',
            steps: [
              { kind: 'start', text: 'Bắt đầu' },
              { kind: 'io', text: 'Đọc chuỗi từ bàn phím' },
              {
                kind: 'decision',
                text: 'TryParse thành công?',
                branches: [
                  { label: 'Đúng', steps: [{ kind: 'process', text: 'Dùng giá trị số để tính toán' }] },
                  { label: 'Sai', steps: [{ kind: 'io', text: 'Báo "dữ liệu không hợp lệ"' }] },
                ],
              },
              { kind: 'end', text: 'Kết thúc' },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Toán tử is và as',
            code: `object giaTri = "Cybersoft";

if (giaTri is string s)          // is: kiểm tra kiểu, gán luôn vào s
    Console.WriteLine(s.Length);

string t = giaTri as string;     // as: ép kiểu an toàn, thất bại trả null
Console.WriteLine(t ?? "không phải chuỗi");`,
          },
        },
      ],
    },
  ],


  exercises: [
    { id: 'b2-1', level: 'Cơ bản', title: 'Số tuần và ngày lẻ', requirement: 'Nhập số ngày, tính xem được bao nhiêu tuần và còn dư mấy ngày.', io: { input: '10', output: '1 tuần 3 ngày' }, hint: 'Kết hợp / và %.' },
    { id: 'b2-2', level: 'Cơ bản', title: 'Tổng đơn hàng sau giảm giá', requirement: 'Nhập giá trị đơn hàng và phần trăm giảm giá, tính số tiền giảm và tổng phải thanh toán.', io: { input: '1000000 / 15', output: 'Giảm 150000, thanh toán 850000' }, hint: 'Dùng decimal cho tiền.' },
    { id: 'b2-3', level: 'Cơ bản', title: 'Đổi phút sang giờ và phút', requirement: 'Nhập số phút, chuyển thành giờ và phút lẻ.', io: { input: '130', output: '2 giờ 10 phút' } },
    { id: 'b2-4', level: 'Cơ bản', title: 'Tính tiền sau thuế VAT', requirement: 'Nhập số tiền gốc và tỷ lệ VAT, in ra tổng tiền sau thuế.', io: { input: '500000 / 10', output: '550000' } },
    { id: 'b2-5', level: 'Cơ bản', title: 'Đổi USD sang VND', requirement: 'Nhập số tiền USD và tỷ giá, in ra số tiền tương ứng bằng VND.', io: { input: '100 / 25400', output: '2540000' } },
    { id: 'b2-6', level: 'Cơ bản', title: 'Số dư sau khi rút tiền', requirement: 'Nhập số dư hiện tại và số tiền muốn rút, in ra số dư còn lại (chưa cần kiểm tra âm).', io: { input: '5000000 / 1200000', output: '3800000' } },
    { id: 'b2-7', level: 'Cơ bản', title: 'Tốc độ trung bình', requirement: 'Nhập quãng đường (km) và thời gian (giờ), tính tốc độ trung bình km/h.', io: { input: '120 / 2.5', output: '48 km/h' } },
    { id: 'b2-8', level: 'Cơ bản', title: 'Tỷ lệ phần trăm', requirement: 'Nhập một số và một tổng số, tính tỷ lệ phần trăm của số đó trong tổng.', io: { input: '30 / 200', output: '15%' }, hint: 'Nhớ ép về double trước khi chia.' },
    { id: 'b2-9', level: 'Cơ bản', title: 'Đổi km/h sang m/s', requirement: 'Nhập vận tốc km/h, đổi sang m/s theo công thức m/s = km/h ÷ 3.6.', io: { input: '72', output: '20' } },
    { id: 'b2-10', level: 'Trung bình', title: 'Lượng calo tiêu thụ', requirement: 'Nhập số phút tập và loại hình tập (chạy, đạp xe, bơi). Tính calo tiêu thụ dựa trên hệ số giả định cho từng loại hình.', io: { input: '30 / chạy', output: '≈ 300 kcal' }, hint: 'Khai báo hằng số hệ số calo cho mỗi loại hình.' },
    { id: 'b2-11', level: 'Trung bình', title: 'Đọc input an toàn', requirement: 'Viết lại bài "tổng điểm ba môn" nhưng dùng TryParse: nếu người dùng nhập sai định dạng thì báo lỗi thay vì để chương trình văng exception.', hint: 'double.TryParse(...)' },
  ],
}

export default buoi02
