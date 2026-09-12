import type { Buoi } from './types'

const buoi01: Buoi = {
  id: 1,
  slug: 'moi-truong-va-tu-duy-lap-trinh',
  title: 'Môi trường & tư duy lập trình',
  subtitle: 'Dựng được project console đầu tiên và nắm mô hình Input → Process → Output',
  duration: '3 giờ',
  keywords: ['dotnet CLI', 'Console App', 'IPO', 'ReadLine', 'WriteLine'],
  goals: [
    'Cài .NET SDK, tạo và chạy được một Console App bằng dòng lệnh',
    'Đọc hiểu cấu trúc thư mục của một project .NET',
    'Dùng thành thạo Console.ReadLine() và Console.WriteLine()',
    'Phân rã một đề bài theo mô hình IPO trước khi viết code',
  ],

  sections: [
    {
      id: 'cai-dat',
      title: '1. Cài đặt và khởi tạo dự án',
      blocks: [
        {
          type: 'text',
          text: 'Chỉ cần hai thứ để bắt đầu: .NET SDK (bộ biên dịch + CLI) và một trình soạn thảo. Buổi đầu dùng VS Code để nhìn rõ từng file trong project, các buổi sau có thể chuyển sang Rider cho nhanh.',
        },
        {
          type: 'table',
          head: ['Thành phần', 'Vai trò', 'Link'],
          rows: [
            ['.NET SDK', 'Biên dịch, chạy, đóng gói — bắt buộc', 'dotnet.microsoft.com/download'],
            ['VS Code + C# Dev Kit', 'Soạn thảo, gợi ý code, debug', 'code.visualstudio.com'],
            ['Rider', 'IDE đầy đủ, dùng khi dự án lớn dần', 'jetbrains.com/rider'],
          ],
        },
        {
          type: 'code',
          sample: {
            title: 'Terminal',
            lang: 'bash',
            code: `dotnet --version          # kiểm tra SDK đã cài chưa
dotnet new console -n HelloApp   # tạo project console tên HelloApp
cd HelloApp
dotnet run                # biên dịch và chạy`,
            note: 'Ba lệnh này lặp lại ở mọi buổi học — nhớ để dùng, không cần học thuộc.',
          },
        },
        {
          type: 'visual',
          visual: {
            kind: 'timeline',
            caption: 'Từ lệnh gõ vào terminal đến kết quả in ra màn hình',
            items: [
              { label: 'dotnet new console', text: 'Sinh ra Program.cs và file .csproj mô tả project' },
              { label: 'Viết code trong Program.cs', text: 'Đây là nơi chương trình bắt đầu chạy' },
              { label: 'dotnet build', text: 'Biên dịch C# thành IL, báo lỗi cú pháp nếu có' },
              { label: 'dotnet run', text: 'Build rồi chạy luôn — lệnh dùng hằng ngày' },
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Chạy đúng project',
          text: 'Luôn chạy dotnet run tại thư mục chứa file .csproj. Đứng sai thư mục sẽ gặp lỗi MSB1003 vì CLI không tìm thấy project để build.',
        },
        {
          type: 'code',
          sample: {
            title: 'Đóng gói bản chạy độc lập',
            lang: 'bash',
            code: `dotnet publish -c Release -r win-x64 --self-contained   # Windows
dotnet publish -c Release -r osx-x64 --self-contained   # macOS`,
            note: 'self-contained: gói luôn runtime vào bản build, máy đích không cần cài .NET.',
          },
        },
      ],
    },

    {
      id: 'cau-truc',
      title: '2. Chương trình đầu tiên',
      blocks: [
        {
          type: 'code',
          sample: {
            title: 'Program.cs',
            code: `// Mỗi câu lệnh kết thúc bằng dấu chấm phẩy
Console.WriteLine("Xin chào Cybersoft!");`,
            note: 'Từ .NET 6, Program.cs dùng top-level statements: không cần khai báo class Program hay hàm Main.',
          },
        },
        {
          type: 'table',
          head: ['Lệnh', 'Khác nhau ở đâu'],
          rows: [
            ['Console.Write("A")', 'In ra rồi giữ nguyên con trỏ trên cùng dòng'],
            ['Console.WriteLine("A")', 'In ra rồi xuống dòng'],
            ['Console.ReadLine()', 'Dừng chờ người dùng gõ, trả về một chuỗi (string)'],
          ],
        },
      ],
    },

    {
      id: 'nhap-xuat',
      title: '3. Nhập – xuất dữ liệu',
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: 'Quy tắc quan trọng nhất buổi này',
          text: 'Console.ReadLine() luôn trả về string, kể cả khi người dùng gõ số. Muốn tính toán thì phải chuyển kiểu — đây là lỗi kinh điển của người mới.',
        },
        {
          type: 'code',
          sample: {
            title: 'Nhập – tính – xuất',
            code: `Console.Write("Nhập họ tên: ");
string hoTen = Console.ReadLine();

Console.Write("Nhập năm sinh: ");
int namSinh = Convert.ToInt32(Console.ReadLine());   // string -> int

int tuoi = 2026 - namSinh;
Console.WriteLine($"Chào {hoTen}, bạn {tuoi} tuổi.");`,
            note: 'Dấu $ trước chuỗi bật chế độ nội suy: giá trị trong {} được ghép thẳng vào chuỗi.',
          
            trace: [
              { line: 1, vars: {}, output: ['Nhập họ tên: '], note: 'Write in lời nhắc nhưng không xuống dòng, con trỏ vẫn nằm cùng dòng.' },
              { line: 2, vars: { hoTen: '"Trần Bình"' }, output: ['Nhập họ tên: Trần Bình'], note: 'ReadLine dừng chờ người dùng gõ rồi trả về một chuỗi.' },
              { line: 4, vars: { hoTen: '"Trần Bình"' }, output: ['Nhập họ tên: Trần Bình', 'Nhập năm sinh: '] },
              { line: 5, vars: { hoTen: '"Trần Bình"', namSinh: '2004' }, output: ['Nhập họ tên: Trần Bình', 'Nhập năm sinh: 2004'], note: 'Người dùng gõ "2004" là chuỗi, Convert.ToInt32 mới đổi nó thành số 2004.' },
              { line: 7, vars: { hoTen: '"Trần Bình"', namSinh: '2004', tuoi: '22' }, output: ['Nhập họ tên: Trần Bình', 'Nhập năm sinh: 2004'], note: '2026 − 2004 = 22. Phép trừ này chỉ chạy được vì namSinh đã là kiểu số.' },
              { line: 8, vars: { hoTen: '"Trần Bình"', namSinh: '2004', tuoi: '22' }, output: ['Nhập họ tên: Trần Bình', 'Nhập năm sinh: 2004', 'Chào Trần Bình, bạn 22 tuổi.'], note: 'Dấu $ cho phép nhét thẳng giá trị biến vào giữa chuỗi.' },
            ],},
        },
        {
          type: 'visual',
          visual: {
            kind: 'flow',
            caption: 'Luồng chạy của chương trình tính tuổi ở trên',
            steps: [
              { kind: 'start', text: 'Bắt đầu' },
              { kind: 'io', text: 'Nhập họ tên, năm sinh' },
              { kind: 'process', text: 'tuoi = 2026 − namSinh' },
              { kind: 'io', text: 'In ra lời chào kèm tuổi' },
              { kind: 'end', text: 'Kết thúc' },
            ],
          },
        },
      ],
    },

    {
      id: 'ipo',
      title: '4. Tư duy IPO — quy trình giải một bài toán',
      blocks: [
        {
          type: 'text',
          text: 'Trước khi gõ dòng code nào, hãy trả lời ba câu hỏi: chương trình cần gì để chạy, phải làm gì với dữ liệu đó, và phải trả ra cái gì. Ba câu trả lời đó chính là Input – Process – Output.',
        },
        {
          type: 'visual',
          visual: {
            kind: 'ipo',
            caption: 'Áp dụng cho bài "tính chỉ số BMI"',
            input: ['Cân nặng (kg)', 'Chiều cao (m)', 'Người dùng nhập vào'],
            process: ['bmi = canNang / (chieuCao × chieuCao)', 'Làm tròn 2 chữ số'],
            output: ['In chỉ số BMI ra màn hình'],
          },
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Input: giá trị cố định sẵn (hằng số), giá trị đề bài cho, hoặc giá trị người dùng nhập.',
            'Process: công thức, câu điều kiện, vòng lặp — hoặc kết hợp nhiều thứ.',
            'Output: giá trị cần trả về hoặc nội dung hiển thị ra màn hình.',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Thói quen nên có ngay từ buổi 1',
          text: 'Viết IPO ra giấy hoặc comment ở đầu file trước khi code. Bài càng khó thì bước này càng tiết kiệm thời gian.',
        },
      ],
    },
  ],


  exercises: [

    {
      id: 'b1-1', level: 'Cơ bản', title: 'Định dạng thông tin cá nhân',
      requirement: 'Cho họ tên, email và số điện thoại của một người. Trả về chuỗi thông tin đã định dạng, ba trường cách nhau bằng dấu gạch ngang có khoảng trắng hai bên.',
      signature: 'string DinhDangThongTin(string hoTen, string email, string sdt)',
      constraints: ['1 <= hoTen.Length <= 100', 'email chứa đúng một ký tự @', 'sdt gồm 10 chữ số'],
      examples: [
        { input: 'hoTen = "Nguyễn Văn A", email = "a@gmail.com", sdt = "0901234567"', output: '"Nguyễn Văn A - a@gmail.com - 0901234567"' },
        { input: 'hoTen = "Trần Bình", email = "binh@edu.vn", sdt = "0987654321"', output: '"Trần Bình - binh@edu.vn - 0987654321"' },
      ],
    },
    {
      id: 'b1-2', level: 'Cơ bản', title: 'Tổng điểm ba môn',
      requirement: 'Cho điểm ba môn Toán, Lý, Hoá. Trả về tổng điểm của ba môn.',
      signature: 'double TongDiem(double toan, double ly, double hoa)',
      constraints: ['0 <= toan, ly, hoa <= 10'],
      examples: [
        { input: 'toan = 8, ly = 7, hoa = 9', output: '24' },
        { input: 'toan = 5.5, ly = 6, hoa = 7.5', output: '19' },
      ],
    },
    {
      id: 'b1-3', level: 'Cơ bản', title: 'Đổi độ C sang độ F',
      requirement: 'Cho nhiệt độ c tính theo độ C. Trả về nhiệt độ tương ứng theo độ F, biết F = C × 9 / 5 + 32.',
      signature: 'double DoiCSangF(double c)',
      constraints: ['-273.15 <= c <= 1000'],
      examples: [
        { input: 'c = 25', output: '77' },
        { input: 'c = 37', output: '98.6', explain: 'Phải để phép chia là số thực, vì 9 / 5 trong số nguyên cho ra 1.' },
        { input: 'c = -40', output: '-40', explain: 'Đây là điểm duy nhất hai thang đo trùng nhau.' },
      ],
    },
    {
      id: 'b1-4', level: 'Cơ bản', title: 'Chu vi và diện tích hình tròn',
      requirement: 'Cho bán kính r của một hình tròn. Trả về chu vi và diện tích, cả hai làm tròn 2 chữ số thập phân.',
      signature: '(double chuVi, double dienTich) TinhHinhTron(double r)',
      constraints: ['0 < r <= 1000', 'Dùng Math.PI thay vì gõ tay 3.14'],
      examples: [
        { input: 'r = 2', output: '(12.57, 12.57)', explain: 'Trùng số là ngẫu nhiên: chu vi 2πr = 12.566, diện tích πr² = 12.566.' },
        { input: 'r = 5', output: '(31.42, 78.54)' },
      ],
    },
    {
      id: 'b1-5', level: 'Cơ bản', title: 'Chỉ số BMI',
      requirement: 'Cho cân nặng (kg) và chiều cao (m) của một người. Trả về chỉ số BMI làm tròn 2 chữ số thập phân, biết BMI = cân nặng / (chiều cao)².',
      signature: 'double TinhBmi(double canNang, double chieuCao)',
      constraints: ['1 <= canNang <= 300', '0.5 <= chieuCao <= 2.5'],
      examples: [
        { input: 'canNang = 60, chieuCao = 1.7', output: '20.76' },
        { input: 'canNang = 85, chieuCao = 1.8', output: '26.23' },
      ],
    },
    {
      id: 'b1-6', level: 'Trung bình', title: 'Đổi phút sang giờ và phút',
      requirement: 'Cho tổng số phút. Trả về chuỗi mô tả số giờ và số phút lẻ tương ứng theo dạng "H giờ M phút".',
      signature: 'string DoiPhut(int phut)',
      constraints: ['0 <= phut <= 100000'],
      examples: [
        { input: 'phut = 130', output: '"2 giờ 10 phút"', explain: '130 / 60 = 2 dư 10.' },
        { input: 'phut = 59', output: '"0 giờ 59 phút"' },
        { input: 'phut = 120', output: '"2 giờ 0 phút"' },
      ],
      hint: 'Phép / lấy phần nguyên, phép % lấy phần dư.',
    },
    {
      id: 'b1-7', level: 'Trung bình', title: 'Tính tiền gửi xe',
      requirement: 'Một bãi xe tính 5.000đ cho giờ đầu tiên và 3.000đ cho mỗi giờ tiếp theo. Cho số giờ gửi, trả về số tiền phải trả.',
      signature: 'int TinhTienGuiXe(int soGio)',
      constraints: ['1 <= soGio <= 24'],
      examples: [
        { input: 'soGio = 1', output: '5000' },
        { input: 'soGio = 4', output: '14000', explain: '5000 cho giờ đầu, cộng 3 giờ sau × 3000 = 9000.' },
      ],
    },
    {
      id: 'b1-8', level: 'Nâng cao', title: 'Tách giờ phút giây',
      requirement: 'Cho tổng số giây. Trả về chuỗi định dạng "HH:mm:ss", mỗi phần luôn đủ hai chữ số.',
      signature: 'string DinhDangThoiGian(int giay)',
      constraints: ['0 <= giay <= 359999'],
      examples: [
        { input: 'giay = 3661', output: '"01:01:01"' },
        { input: 'giay = 45', output: '"00:00:45"' },
        { input: 'giay = 86399', output: '"23:59:59"' },
      ],
      hint: 'Dùng ToString("D2") để ép đủ hai chữ số.',
    },
  ],
}

export default buoi01
