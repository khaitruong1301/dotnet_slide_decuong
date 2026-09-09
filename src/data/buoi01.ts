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
          },
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
    { id: 'b1-1', level: 'Cơ bản', title: 'Thông tin cá nhân', requirement: 'Nhập họ tên, email, số điện thoại và hiển thị lại thông tin tương ứng.', io: { input: 'Nguyễn Văn A / a@gmail.com / 0901234567', output: 'Họ tên: Nguyễn Văn A — Email: a@gmail.com — SĐT: 0901234567' } },
    { id: 'b1-2', level: 'Cơ bản', title: 'Tổng điểm ba môn', requirement: 'Nhập điểm Toán, Lý, Hoá và in ra tổng điểm của ba môn.', io: { input: '8 7 9', output: 'Tổng điểm: 24' } },
    { id: 'b1-3', level: 'Cơ bản', title: 'Đổi độ C sang độ F', requirement: 'Nhập nhiệt độ độ C, chuyển sang độ F theo công thức F = C × 9/5 + 32.', io: { input: '25', output: '77' }, hint: 'Ép về double trước khi chia để không mất phần thập phân.' },
    { id: 'b1-4', level: 'Cơ bản', title: 'Chu vi và diện tích hình tròn', requirement: 'Nhập bán kính, tính chu vi P = 2πr và diện tích A = πr².', io: { input: '2', output: 'P = 12.57 ; A = 12.57' }, hint: 'Math.PI' },
    { id: 'b1-5', level: 'Cơ bản', title: 'Chỉ số BMI', requirement: 'Nhập cân nặng (kg) và chiều cao (m), tính BMI = cân nặng / (chiều cao)².', io: { input: '60 1.7', output: 'BMI = 20.76' } },
    { id: 'b1-6', level: 'Trung bình', title: 'Đổi phút sang giờ và phút', requirement: 'Nhập số phút, đổi sang dạng giờ và phút lẻ.', io: { input: '130', output: '2 giờ 10 phút' }, hint: 'Dùng phép chia lấy nguyên / và chia lấy dư %.' },
  ],
}

export default buoi01
