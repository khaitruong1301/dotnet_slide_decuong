import type { Buoi } from './types'

const buoi07: Buoi = {
  id: 7,
  slug: 'ham-function',
  title: 'Hàm (Function / Method)',
  subtitle: 'Chia nhỏ chương trình thành những khối tái sử dụng được',
  duration: '3 giờ',
  keywords: ['method', 'return', 'void', 'static', 'Func', 'Action', 'callback'],
  goals: [
    'Khai báo và gọi hàm có tham số, có giá trị trả về',
    'Phân biệt hàm có return và hàm void',
    'Tách một chương trình dài thành nhiều hàm nhỏ rõ trách nhiệm',
    'Làm quen với lambda, Func / Action và hàm callback',
  ],

  sections: [
    {
      id: 'vi-sao',
      title: '1. Vì sao cần hàm',
      blocks: [
        {
          type: 'list',
          items: [
            'Tái sử dụng: viết một lần, gọi ở nhiều nơi',
            'Dễ đọc: tên hàm nói rõ đoạn code đó làm gì',
            'Dễ sửa: lỗi nằm ở một chỗ, sửa một chỗ là xong',
            'Dễ chia việc: mỗi người làm một hàm rồi ghép lại',
          ],
        },
        {
          type: 'visual',
          visual: {
            kind: 'func',
            caption: 'Hàm là một hộp đen: đưa dữ liệu vào, nhận kết quả ra',
            name: 'TinhDienTich(dai, rong)',
            params: ['double dai', 'double rong'],
            body: 'Nhân hai cạnh với nhau',
            returns: 'double',
          },
        },
      ],
    },

    {
      id: 'cu-phap',
      title: '2. Cú pháp khai báo và gọi hàm',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'Hàm có giá trị trả về',
            code: `// kiểu_trả_về  TênHàm(tham số)
static double TinhDienTich(double dai, double rong)
{
    return dai * rong;        // return kết thúc hàm và trả kết quả ra
}

// Gọi hàm
double dt = TinhDienTich(5, 3);
Console.WriteLine(dt);        // 15`,
          },
        },
        {
          type: 'table',
          head: ['Thành phần', 'Vai trò', 'Quy ước'],
          rows: [
            ['Kiểu trả về', 'Kết quả hàm đưa ra ngoài', 'void nếu không trả gì'],
            ['Tên hàm', 'Nói rõ hàm làm gì', 'PascalCase, bắt đầu bằng động từ'],
            ['Tham số', 'Dữ liệu đầu vào', 'Không có, một hoặc nhiều'],
            ['return', 'Trả kết quả và thoát hàm', 'Bắt buộc nếu kiểu trả về khác void'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'Hàm void — chỉ làm việc, không trả kết quả',
            code: `/// <summary>In thông tin sản phẩm ra màn hình.</summary>
static void InSanPham(string ten, decimal gia)
{
    Console.WriteLine($"{ten,-20} {gia,10:N0} đ");
}

InSanPham("Bàn phím cơ", 1250000);`,
            note: 'Hàm void dùng khi mục đích là "gây tác động" — in ra màn hình, ghi file, gửi mail.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Vì sao có từ khoá static',
          text: 'static cho phép gọi hàm trực tiếp qua tên lớp mà không cần tạo đối tượng. Ở giai đoạn console app, cứ khai báo static cho mọi hàm là chạy được; phần lập trình hướng đối tượng sẽ giải thích kỹ hơn.',
        },
        {
          type: 'code',
          sample: {
            title: 'Gọi hàm từ file khác',
            code: `// File: MathHelper.cs
public class MathHelper
{
    public static bool LaSoNguyenTo(int n)
    {
        if (n < 2) return false;
        for (int i = 2; i <= Math.Sqrt(n); i++)
            if (n % i == 0) return false;
        return true;
    }
}

// File: Program.cs
Console.WriteLine(MathHelper.LaSoNguyenTo(7));   // True`,
            note: 'Dùng cú pháp TênLớp.TênHàm() để gọi hàm static nằm ở file khác.',
          },
        },
      ],
    },

    {
      id: 'tach-ham',
      title: '3. Tách hàm — từ code dài thành code sạch',
      blocks: [
        {
          type: 'text',
          text: 'Nguyên tắc: mỗi hàm làm đúng một việc và tên hàm phải nói được việc đó. Nếu phải viết comment giải thích một đoạn code, khả năng cao đoạn đó nên trở thành một hàm riêng.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'compare',
            caption: 'Cùng một chương trình quản lý điểm',
            columns: [
              {
                title: 'Trước — tất cả nằm trong Main',
                tone: 'bad',
                items: ['150 dòng liền mạch', 'Sửa phần nhập là sợ vỡ phần tính', 'Không tái sử dụng được gì', 'Rất khó tìm lỗi'],
              },
              {
                title: 'Sau — tách thành hàm',
                tone: 'good',
                items: ['NhapDiem() — chỉ lo nhập và kiểm tra', 'TinhTrungBinh() — chỉ lo tính', 'XepLoai() — chỉ lo phân loại', 'Main chỉ còn 5 dòng điều phối'],
              },
            ],
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Sau khi tách hàm',
            code: `static double NhapDiem(string monHoc)
{
    double diem;
    do
    {
        Console.Write($"Nhập điểm {monHoc} (0-10): ");
    } while (!double.TryParse(Console.ReadLine(), out diem) || diem < 0 || diem > 10);
    return diem;
}

static string XepLoai(double dtb) => dtb switch
{
    >= 8.0 => "Giỏi",
    >= 6.5 => "Khá",
    >= 5.0 => "Trung bình",
    _      => "Yếu"
};

// Main gọn lại còn mấy dòng
double toan = NhapDiem("Toán");
double ly   = NhapDiem("Lý");
double hoa  = NhapDiem("Hoá");
double dtb  = (toan + ly + hoa) / 3;
Console.WriteLine($"ĐTB {dtb:F2} — {XepLoai(dtb)}");`,
            note: 'Hàm một dòng có thể viết bằng => (expression-bodied member) cho gọn.',
          },
        },
      ],
    },

    {
      id: 'lambda',
      title: '4. Lambda, Func / Action và callback',
      blocks: [
        {
          type: 'text',
          text: 'Trong C#, hàm cũng có thể được lưu vào biến và truyền đi như một giá trị. Func dành cho hàm CÓ giá trị trả về, Action dành cho hàm KHÔNG trả về gì.',
        },
        {
          type: 'code',
          sample: {
            title: 'Func và Action',
            code: `// Func<đầu vào 1, đầu vào 2, kiểu trả về>
Func<int, int, int> cong = (a, b) => a + b;
Console.WriteLine(cong(3, 5));           // 8

// Action<đầu vào> — không trả về gì
Action<string> chao = ten => Console.WriteLine($"Xin chào {ten}");
chao("Cybersoft");`,
            note: 'Cú pháp (tham số) => biểu thức gọi là lambda expression — cách viết hàm ẩn danh ngắn gọn.',
          },
        },
        {
          type: 'code',
          sample: {
            title: 'Callback — truyền hàm vào hàm khác',
            code: `static void XuLyDanhSach(int[] so, Action<int> hanhDong)
{
    foreach (int x in so)
        hanhDong(x);            // gọi lại hàm được truyền vào
}

int[] mang = { 1, 2, 3 };
XuLyDanhSach(mang, x => Console.WriteLine(x * 2));   // 2 4 6
XuLyDanhSach(mang, x => Console.WriteLine(x * x));   // 1 4 9`,
            note: 'Cùng một hàm duyệt, thay đổi hành vi bằng cách đổi callback truyền vào.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Luồng gọi callback',
            steps: [
              { kind: 'process', text: 'Gọi XuLyDanhSach(mang, hanhDong)' },
              { kind: 'process', text: 'Hàm duyệt từng phần tử của mảng' },
              { kind: 'process', text: 'Với mỗi phần tử, gọi lại hanhDong(x)' },
              { kind: 'io', text: 'Kết quả do hàm truyền vào quyết định' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Vì sao học callback từ bây giờ',
          text: 'Buổi 8 dùng lambda liên tục với List: Find, FindAll, RemoveAll, Exists đều nhận một hàm điều kiện. Và lập trình bất đồng bộ sau này cũng dựa trên chính ý tưởng này.',
        },
      ],
    },
  ],


  exercises: [
    { id: 'b7-1', level: 'Cơ bản', title: 'Hàm tính diện tích', requirement: 'Viết hàm TinhDienTichHinhChuNhat(dai, rong) trả về diện tích, gọi từ Main.', io: { input: '5, 3', output: '15' } },
    { id: 'b7-2', level: 'Cơ bản', title: 'Hàm kiểm tra số nguyên tố', requirement: 'Viết hàm LaSoNguyenTo(int n) trả về bool, dùng lại cho bài in số nguyên tố trong khoảng.', io: { input: '7', output: 'true' } },
    { id: 'b7-3', level: 'Cơ bản', title: 'Hàm tính giai thừa', requirement: 'Viết hàm GiaiThua(int n) trả về long, xử lý cả trường hợp n = 0.', io: { input: '5', output: '120' } },
    { id: 'b7-4', level: 'Cơ bản', title: 'Hàm đảo chuỗi', requirement: 'Viết hàm DaoChuoi(string s) trả về chuỗi đảo ngược.', io: { input: 'Cybersoft', output: 'tfosrebyC' } },
    { id: 'b7-5', level: 'Trung bình', title: 'Hàm nhập có kiểm tra', requirement: 'Viết hàm NhapDiem(string monHoc) bắt người dùng nhập lại tới khi được số hợp lệ trong khoảng 0–10, rồi trả về giá trị đó.', hint: 'do…while kết hợp double.TryParse.' },
    { id: 'b7-6', level: 'Trung bình', title: 'Refactor bài xếp loại học lực', requirement: 'Tách bài buổi 3 thành NhapDiem, TinhTrungBinh, XepLoai. Main chỉ còn phần điều phối.' },
    { id: 'b7-7', level: 'Trung bình', title: 'Tìm từ dài nhất', requirement: 'Viết hàm TuDaiNhat(string s) trả về từ dài nhất trong chuỗi; nhiều từ dài bằng nhau thì lấy từ đầu tiên.', io: { input: 'I love programming', output: 'programming' } },
    { id: 'b7-8', level: 'Trung bình', title: 'Loại bỏ ký tự đặc biệt', requirement: 'Viết hàm LamSach(string s) trả về chuỗi chỉ còn chữ, số và khoảng trắng.', io: { input: 'he@llo! worl#d', output: 'hello world' } },
    { id: 'b7-9', level: 'Nâng cao', title: 'Từ dài nhất có chứa số', requirement: 'Viết hàm trả về từ dài nhất có chứa ít nhất một chữ số; không có thì trả về chuỗi rỗng.', io: { input: 'abc123 def45 ghi6789', output: 'ghi6789' } },
    { id: 'b7-10', level: 'Nâng cao', title: 'Hàm nhận callback', requirement: 'Viết hàm XuLyMang(int[] mang, Func<int, int> bienDoi) trả về mảng mới sau khi áp dụng phép biến đổi cho từng phần tử. Gọi thử với hai lambda khác nhau.', io: { input: '[1,2,3] với x => x*2', output: '[2,4,6]' } },
  ],
}

export default buoi07
