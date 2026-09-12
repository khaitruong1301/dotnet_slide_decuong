# Đề cương C# / ASP.NET Core — 15 buổi

Trang tài liệu học tập: menu trái là đề cương 8 buổi, bấm vào một buổi để mở nội dung
lý thuyết kèm sơ đồ minh hoạ và bài tập về nhà ngay trên web.

Nội dung được biên soạn lại từ bộ slide gốc (`C# ASP.NET CORE LITE`, `C# ASP.NET CORE
COLLECTION`, `C# OOP`, `bài tập collection`) theo hướng: bỏ phần giới thiệu, vào thẳng tiêu đề
chính, diễn đạt ngắn, và bổ sung lưu đồ / sơ đồ trực quan cho mọi khái niệm trừu tượng.

## Lộ trình

| Buổi | Nội dung |
|---|---|
| 1 | Môi trường & tư duy lập trình — dotnet CLI, Console App, mô hình IPO |
| 2 | Biến, kiểu dữ liệu & toán tử — chọn kiểu, ép kiểu, `TryParse` |
| 3 | Cấu trúc rẽ nhánh `if / else` — bool, toán tử logic, lưu đồ thuật toán |
| 4 | `switch case` & toán tử rút gọn — switch expression, pattern matching, `??` |
| 5 | Vòng lặp `while`, `do…while` & `for` — `break`, `continue` |
| 6 | Vòng lặp lồng nhau & xử lý chuỗi |
| 7 | Hàm — tham số, `return`, `void`, `static`, lambda, `Func` / `Action`, callback |
| 8 | Collection & kiểu dữ liệu động — `List`, `Dictionary`, `HashSet`, `Array` |
| 9 | Nhập môn OOP & Class — object, access modifier, class diagram |
| 10 | Constructor & nạp chồng — `this`, object initializer |
| 11 | Property, đóng gói & thành phần tĩnh — `get/set`, `static`, `readonly` |
| 12 | Kế thừa & ghi đè — `base`, `protected`, `virtual/override`, `sealed` |
| 13 | Đa hình & Interface — `is/as`, pattern matching theo kiểu |
| 14 | Abstract class & Generic — ràng buộc `where`, `Activator` |
| 15 | 4 tính chất OOP & SOLID — SRP, OCP, LSP, ISP, DIP và Dependency Injection |

205 bài tập, chia ba mức Cơ bản / Trung bình / Nâng cao. Đề bài viết theo lối LeetCode:
mô tả bài toán, chữ ký hàm cần cài đặt, ràng buộc đầu vào và các test case mẫu kèm giải thích. Riêng buổi 8 (Collection) có
bộ 60 bài — 20 bài mỗi mức — nằm trong `src/data/buoi08-baitap.ts`.

## Truy cập

Trang có cổng nhập token ở đầu. Token hiện tại: `Cybersoft@123`.

Đây là lớp chặn phía trình duyệt để hạn chế người ngoài vào nhầm, **không phải bảo mật
thật** — token nằm trong mã nguồn tải về máy người xem nên ai mở DevTools cũng đọc được.
Muốn bảo vệ thật thì phải kiểm tra ở phía máy chủ.

Đổi token: sửa hằng `TOKEN` trong `src/components/TokenGate.tsx`.

## Giao diện

- **Hai theme sáng / tối**, nút chuyển nằm ở chân menu trái. Lần đầu vào trang sẽ theo
  thiết lập của hệ điều hành, sau đó ghi nhớ lựa chọn trong `localStorage`.
- **Bốc đề ngẫu nhiên**: nút *Bốc đề 10 bài* chọn sẵn một đề theo tỷ lệ 2 Cơ bản ·
  6 Trung bình · 2 Nâng cao, xuất PDF được ngay.
- **Tab thay cho cuộn dài**: mỗi trang buổi học chia hai tab *Lý thuyết* và *Bài tập*;
  trong tab Bài tập lại có tab con theo cấp độ (Cơ bản / Trung bình / Nâng cao / Tất cả).
  Link có hash (`#bai-tap`, `#ten-muc`) tự mở đúng tab rồi mới cuộn tới.
- **Tải PDF, hai kiểu**:
  - *Tải PDF đầy đủ* — toàn bộ lý thuyết và cả 3 cấp độ bài tập, bất kể đang xem tab nào.
  - *Tải PDF tab đang xem* — chỉ đúng phần đang mở (ví dụ chỉ 20 bài Nâng cao), có bìa
    tên buổi, không kèm menu hay khối mục tiêu. Dùng để làm slide đem upload.
  - *Xuất slide N bài* — tick chọn từng bài tập rồi xuất, **mỗi bài một trang** theo bố
    cục slide: huy hiệu *Bài N* · tiêu đề cỡ lớn màu cam · mô tả · hình minh hoạ ·
    Input/Output · gợi ý, kèm logo Cybersoft chìm ở nền.

  Mọi trang in đều có chân trang *"Được biên soạn bởi Trương Tấn Khải — cybersoft.edu.vn"*.

  > Tiêu đề, ngày giờ và địa chỉ trang mà trình duyệt tự thêm vào bản in **không tắt
  > được bằng CSS** — đó là tuỳ chọn của hộp thoại in. Trong hộp thoại in của Chrome,
  > mở *Cài đặt khác* rồi bỏ chọn *Đầu trang và chân trang* (Headers and footers).
  > Chrome ghi nhớ lựa chọn này cho các lần in sau.

  Cả hai mở hộp thoại in của trình duyệt (chọn "Save as PDF"). Bản in định dạng riêng:
  khổ A4 nằm ngang, mỗi phần lý thuyết một trang, luôn ra nền sáng kể cả khi màn hình
  đang ở theme tối. Nhấn Ctrl/Cmd + P trực tiếp thì in theo tab đang xem.

## Hình minh hoạ cho bài tập

20 bài Nâng cao của buổi 8 có lưu đồ thuật toán soạn riêng (trường `visual` trong
`src/data/buoi08-baitap.ts`). Bài nào không khai báo `visual` thì slide **tự dựng sơ đồ
IPO** từ trường `io`, nên slide nào cũng có hình chứ không chỉ toàn chữ.

## Chạy tại máy

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # kiểm tra kiểu dữ liệu + build ra thư mục dist
```

## Sửa nội dung

Toàn bộ nội dung nằm trong `src/data/buoi01.ts` … `buoi08.ts` dưới dạng dữ liệu
TypeScript. Giao diện tự render từ đó — không cần đụng vào component.

Hướng dẫn chi tiết (các loại khối nội dung, 9 loại sơ đồ minh hoạ, quy ước viết)
nằm trong skill `.claude/skills/decuong-dotnet/SKILL.md`.

## Deploy — Vercel

Cách nhẹ nhất, không tốn phút build của GitHub Actions và không lưu artifact:

1. Vào [vercel.com/new](https://vercel.com/new), chọn **Import Git Repository** và
   trỏ tới repo này.
2. Vercel tự nhận framework Vite từ `vercel.json`; giữ nguyên mọi thiết lập mặc định.
3. Bấm **Deploy**.

Từ đó mỗi lần push lên `main` Vercel tự build và deploy production; mỗi Pull Request
được cấp một preview URL riêng.

`.github/workflows/ci.yml` chỉ chạy `npm run build` để chặn code lỗi lọt vào `main`,
không upload artifact nên không tiêu tốn dung lượng lưu trữ.

## Cấu trúc thư mục

```
src/
  data/          Nội dung 8 buổi (types.ts định nghĩa kiểu)
  components/    Sidebar, CodeBlock (highlight C#), Visual (9 loại sơ đồ)
  pages/         Home (đề cương tổng quan), BuoiPage (trang bài học)
```
