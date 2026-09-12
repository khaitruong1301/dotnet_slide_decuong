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

    {
      id: 'b7-1', level: 'Cơ bản', title: 'Diện tích hình chữ nhật',
      requirement: 'Cho chiều dài và chiều rộng. Trả về diện tích hình chữ nhật.',
      signature: 'double TinhDienTich(double dai, double rong)',
      constraints: ['0 < dai, rong <= 10000'],
      examples: [
        { input: 'dai = 5, rong = 3', output: '15' },
        { input: 'dai = 2.5, rong = 4', output: '10' },
      ],
    },
    {
      id: 'b7-2', level: 'Cơ bản', title: 'Hàm kiểm tra số nguyên tố',
      requirement: 'Viết hàm trả về true nếu n là số nguyên tố. Hàm này sẽ được dùng lại ở các bài sau nên phải tách riêng, không viết lẫn vào Main.',
      signature: 'static bool LaSoNguyenTo(int n)',
      constraints: ['-1000 <= n <= 1_000_000'],
      examples: [
        { input: 'n = 7', output: 'true' },
        { input: 'n = 1', output: 'false' },
      ],
    },
    {
      id: 'b7-3', level: 'Cơ bản', title: 'Hàm tính giai thừa',
      requirement: 'Viết hàm trả về n giai thừa, xử lý được cả trường hợp n = 0.',
      signature: 'static long GiaiThua(int n)',
      constraints: ['0 <= n <= 20'],
      examples: [
        { input: 'n = 5', output: '120' },
        { input: 'n = 0', output: '1' },
      ],
    },
    {
      id: 'b7-4', level: 'Cơ bản', title: 'Hàm đảo chuỗi',
      requirement: 'Viết hàm trả về chuỗi đảo ngược của s.',
      signature: 'static string DaoChuoi(string s)',
      constraints: ['0 <= s.Length <= 10000'],
      examples: [
        { input: 's = "Cybersoft"', output: '"tfosrebyC"' },
        { input: 's = "ab"', output: '"ba"' },
      ],
    },
    {
      id: 'b7-5', level: 'Trung bình', title: 'Hàm nhập có kiểm tra',
      requirement: 'Viết hàm hiển thị lời nhắc kèm tên môn học, bắt người dùng nhập lại tới khi được một số thực trong khoảng 0–10, rồi trả về giá trị đó.',
      signature: 'static double NhapDiem(string monHoc)',
      constraints: ['Không được ném exception khi người dùng gõ chữ'],
      examples: [
        { input: 'monHoc = "Toán", người dùng gõ: abc rồi 8.5', output: '8.5' },
      ],
      hint: 'do…while kết hợp double.TryParse.',
    },
    {
      id: 'b7-6', level: 'Trung bình', title: 'Tách hàm cho bài xếp loại',
      requirement: 'Refactor bài xếp loại học lực của buổi 3 thành ba hàm: NhapDiem, TinhTrungBinh, XepLoai. Main chỉ còn phần điều phối, không chứa logic tính toán.',
      signature: 'static string XepLoai(double dtb)',
      constraints: ['Main tối đa 6 dòng'],
      examples: [
        { input: 'dtb = 8.17', output: '"Giỏi"' },
        { input: 'dtb = 4.9', output: '"Yếu"' },
      ],
    },
    {
      id: 'b7-7', level: 'Trung bình', title: 'Hàm tìm từ dài nhất',
      requirement: 'Viết hàm trả về từ dài nhất trong chuỗi s. Nhiều từ cùng độ dài thì lấy từ đầu tiên.',
      signature: 'static string TuDaiNhat(string s)',
      constraints: ['0 <= s.Length <= 10000'],
      examples: [
        { input: 's = "I love programming"', output: '"programming"' },
        { input: 's = ""', output: '""' },
      ],
    },
    {
      id: 'b7-8', level: 'Trung bình', title: 'Hàm làm sạch chuỗi',
      requirement: 'Viết hàm trả về chuỗi chỉ còn chữ cái, chữ số và khoảng trắng.',
      signature: 'static string LamSach(string s)',
      constraints: ['0 <= s.Length <= 10000'],
      examples: [
        { input: 's = "he@llo! worl#d"', output: '"hello world"' },
        { input: 's = "!!!"', output: '""' },
      ],
    },
    {
      id: 'b7-9', level: 'Nâng cao', title: 'Hàm nhận lambda làm tham số',
      requirement: 'Viết hàm nhận một mảng số và một phép biến đổi, trả về mảng mới sau khi áp dụng phép biến đổi cho từng phần tử. Không sửa mảng gốc.',
      signature: 'static int[] XuLyMang(int[] mang, Func<int, int> bienDoi)',
      constraints: ['0 <= mang.Length <= 100000'],
      examples: [
        { input: 'mang = [1, 2, 3], bienDoi = x => x * 2', output: '[2, 4, 6]' },
        { input: 'mang = [1, 2, 3], bienDoi = x => x * x', output: '[1, 4, 9]' },
      ],
    },
    {
      id: 'b7-10', level: 'Nâng cao', title: 'Hàm lọc theo điều kiện',
      requirement: 'Viết hàm nhận một mảng số và một điều kiện, trả về mảng chỉ gồm các phần tử thoả điều kiện, giữ nguyên thứ tự.',
      signature: 'static int[] Loc(int[] mang, Func<int, bool> dieuKien)',
      constraints: ['0 <= mang.Length <= 100000'],
      examples: [
        { input: 'mang = [1, 2, 3, 4, 5, 6], dieuKien = x => x % 2 == 0', output: '[2, 4, 6]' },
        { input: 'mang = [1, 3, 5], dieuKien = x => x > 10', output: '[]' },
      ],
      hint: 'Đây chính là cách LINQ Where hoạt động bên trong.',
    },
    {
      id: 'b7-11', level: 'Nâng cao', title: 'Hàm callback báo tiến độ',
      requirement: 'Viết hàm chạy một công việc n bước, sau mỗi bước gọi callback báo phần trăm hoàn thành. Trả về tổng số lần callback được gọi.',
      signature: 'static int ChayCongViec(int soBuoc, Action<int> baoTienDo)',
      constraints: ['1 <= soBuoc <= 1000'],
      examples: [
        { input: 'soBuoc = 4, baoTienDo = p => Console.WriteLine($"{p}%")', output: '4', explain: 'In lần lượt 25%, 50%, 75%, 100%.' },
      ],
      hint: 'Action dùng cho callback không cần trả về giá trị.',
    },
  ],
}

export default buoi07
