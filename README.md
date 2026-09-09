# Đề cương C# / ASP.NET Core — 8 buổi

Trang tài liệu học tập: menu trái là đề cương 8 buổi, bấm vào một buổi để mở nội dung
lý thuyết kèm sơ đồ minh hoạ và bài tập về nhà ngay trên web.

Nội dung được biên soạn lại từ bộ slide gốc (`C# ASP.NET CORE LITE`, `C# ASP.NET CORE
COLLECTION`, `bài tập collection`) theo hướng: bỏ phần giới thiệu, vào thẳng tiêu đề
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

76 bài tập, chia ba mức Cơ bản / Trung bình / Nâng cao.

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
