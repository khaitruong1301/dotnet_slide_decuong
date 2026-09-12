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

    {
      id: 'b2-1', level: 'Cơ bản', title: 'Số tuần và ngày lẻ',
      requirement: 'Cho tổng số ngày. Trả về chuỗi cho biết bằng bao nhiêu tuần và dư mấy ngày.',
      signature: 'string DoiSangTuan(int soNgay)',
      constraints: ['0 <= soNgay <= 100000'],
      examples: [
        { input: 'soNgay = 10', output: '"1 tuần 3 ngày"' },
        { input: 'soNgay = 7', output: '"1 tuần 0 ngày"' },
      ],
    },
    {
      id: 'b2-2', level: 'Cơ bản', title: 'Tổng đơn hàng sau giảm giá',
      requirement: 'Cho giá trị đơn hàng và phần trăm giảm giá. Trả về số tiền phải thanh toán sau khi giảm.',
      signature: 'decimal TinhSauGiam(decimal giaTri, double phanTramGiam)',
      constraints: ['0 <= giaTri <= 1_000_000_000', '0 <= phanTramGiam <= 100', 'Dùng decimal cho tiền tệ'],
      examples: [
        { input: 'giaTri = 1000000, phanTramGiam = 15', output: '850000', explain: 'Giảm 150.000, còn phải trả 850.000.' },
        { input: 'giaTri = 250000, phanTramGiam = 0', output: '250000' },
      ],
    },
    {
      id: 'b2-3', level: 'Cơ bản', title: 'Tính tiền sau thuế VAT',
      requirement: 'Cho số tiền gốc và tỷ lệ thuế VAT theo phần trăm. Trả về tổng tiền sau khi cộng thuế.',
      signature: 'decimal TinhSauVat(decimal tienGoc, double vat)',
      constraints: ['0 <= tienGoc <= 1_000_000_000', '0 <= vat <= 100'],
      examples: [
        { input: 'tienGoc = 500000, vat = 10', output: '550000' },
        { input: 'tienGoc = 1200000, vat = 8', output: '1296000' },
      ],
    },
    {
      id: 'b2-4', level: 'Cơ bản', title: 'Đổi USD sang VND',
      requirement: 'Cho số tiền tính bằng USD và tỷ giá quy đổi. Trả về số tiền tương ứng bằng VND.',
      signature: 'decimal DoiSangVnd(decimal usd, decimal tyGia)',
      constraints: ['0 <= usd <= 1_000_000', '1000 <= tyGia <= 100000'],
      examples: [
        { input: 'usd = 100, tyGia = 25400', output: '2540000' },
        { input: 'usd = 0, tyGia = 25400', output: '0' },
      ],
    },
    {
      id: 'b2-5', level: 'Cơ bản', title: 'Số dư sau khi rút tiền',
      requirement: 'Cho số dư hiện tại và số tiền muốn rút. Trả về số dư còn lại, chưa cần kiểm tra rút quá số dư.',
      signature: 'decimal SoDuConLai(decimal soDu, decimal soTienRut)',
      constraints: ['0 <= soDu <= 1_000_000_000', '0 <= soTienRut <= 1_000_000_000'],
      examples: [
        { input: 'soDu = 5000000, soTienRut = 1200000', output: '3800000' },
        { input: 'soDu = 100000, soTienRut = 150000', output: '-50000', explain: 'Bài này chưa chặn âm — buổi 3 sẽ bổ sung điều kiện.' },
      ],
    },
    {
      id: 'b2-6', level: 'Cơ bản', title: 'Tốc độ trung bình',
      requirement: 'Cho quãng đường đã đi (km) và thời gian đã đi (giờ). Trả về tốc độ trung bình theo km/h, làm tròn 2 chữ số thập phân.',
      signature: 'double TocDoTrungBinh(double quangDuong, double thoiGian)',
      constraints: ['0 <= quangDuong <= 100000', '0 < thoiGian <= 1000'],
      examples: [
        { input: 'quangDuong = 120, thoiGian = 2.5', output: '48' },
        { input: 'quangDuong = 100, thoiGian = 3', output: '33.33' },
      ],
    },
    {
      id: 'b2-7', level: 'Cơ bản', title: 'Tỷ lệ phần trăm',
      requirement: 'Cho một số và một tổng số. Trả về tỷ lệ phần trăm của số đó trong tổng, làm tròn 2 chữ số thập phân.',
      signature: 'double TinhPhanTram(int so, int tongSo)',
      constraints: ['0 <= so <= tongSo', '0 < tongSo <= 1_000_000'],
      examples: [
        { input: 'so = 30, tongSo = 200', output: '15' },
        { input: 'so = 1, tongSo = 3', output: '33.33', explain: 'Phải ép về double trước khi chia, không thì 1 / 3 ra 0.' },
      ],
    },
    {
      id: 'b2-8', level: 'Cơ bản', title: 'Đổi km/h sang m/s',
      requirement: 'Cho vận tốc tính bằng km/h. Trả về vận tốc tương ứng theo m/s, biết m/s = km/h ÷ 3.6.',
      signature: 'double DoiSangMoiGiay(double kmh)',
      constraints: ['0 <= kmh <= 100000'],
      examples: [
        { input: 'kmh = 72', output: '20' },
        { input: 'kmh = 100', output: '27.78' },
      ],
    },
    {
      id: 'b2-9', level: 'Trung bình', title: 'Lượng calo tiêu thụ',
      requirement: 'Cho số phút tập và loại hình tập ("chay", "dapxe", "boi"). Mỗi loại có hệ số calo mỗi phút lần lượt là 10, 8 và 12. Trả về lượng calo tiêu thụ.',
      signature: 'int TinhCalo(int soPhut, string loaiHinh)',
      constraints: ['0 <= soPhut <= 600', 'loaiHinh là một trong ba giá trị đã nêu'],
      examples: [
        { input: 'soPhut = 30, loaiHinh = "chay"', output: '300' },
        { input: 'soPhut = 45, loaiHinh = "boi"', output: '540' },
      ],
      hint: 'Khai báo hệ số dưới dạng hằng số để đọc code dễ hơn số ma thuật.',
    },
    {
      id: 'b2-10', level: 'Trung bình', title: 'Đọc số an toàn',
      requirement: 'Cho một chuỗi người dùng nhập. Nếu chuỗi là số nguyên hợp lệ thì trả về chính số đó, ngược lại trả về -1 thay vì để chương trình văng lỗi.',
      signature: 'int DocSoAnToan(string nhap)',
      constraints: ['nhap có thể là chuỗi rỗng hoặc chứa ký tự bất kỳ'],
      examples: [
        { input: 'nhap = "42"', output: '42' },
        { input: 'nhap = "abc"', output: '-1' },
        { input: 'nhap = ""', output: '-1' },
      ],
      hint: 'int.TryParse trả về false thay vì ném exception như Convert.ToInt32.',
    },
    {
      id: 'b2-11', level: 'Trung bình', title: 'Làm tròn tiền về nghìn',
      requirement: 'Cho một số tiền. Trả về số tiền đã làm tròn lên bội số gần nhất của 1000.',
      signature: 'decimal LamTronNghin(decimal tien)',
      constraints: ['0 <= tien <= 1_000_000_000'],
      examples: [
        { input: 'tien = 12345', output: '13000' },
        { input: 'tien = 12000', output: '12000', explain: 'Đã là bội của 1000 thì giữ nguyên.' },
      ],
    },
    {
      id: 'b2-12', level: 'Nâng cao', title: 'Đổi tiền ra mệnh giá',
      requirement: 'Cho một số tiền và các mệnh giá 500000, 200000, 100000, 50000, 20000, 10000. Trả về số tờ mỗi loại sao cho dùng ít tờ nhất, xếp theo thứ tự mệnh giá giảm dần.',
      signature: 'int[] DoiMenhGia(int soTien)',
      constraints: ['0 <= soTien <= 100_000_000', 'soTien chia hết cho 10000'],
      examples: [
        { input: 'soTien = 780000', output: '[1, 1, 0, 1, 1, 1]', explain: '500k + 200k + 50k + 20k + 10k = 780k.' },
        { input: 'soTien = 100000', output: '[0, 0, 1, 0, 0, 0]' },
      ],
      hint: 'Duyệt mệnh giá từ lớn xuống nhỏ, mỗi bước lấy phần nguyên rồi giữ lại phần dư.',
    },
  ],
}

export default buoi02
