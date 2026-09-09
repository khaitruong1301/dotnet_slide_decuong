---
name: decuong-dotnet
description: Soạn và chỉnh sửa nội dung đề cương khoá C# / ASP.NET Core trên trang web này — thêm buổi học, thêm phần lý thuyết, thêm bài tập, thêm sơ đồ minh hoạ. Dùng khi được yêu cầu sửa nội dung bài học, bổ sung bài tập, đổi thứ tự buổi, hoặc thêm hình minh hoạ cho một khái niệm.
---

# Soạn nội dung đề cương C# .NET

Trang web này là một **site tài liệu** (không phải slide): menu trái là đề cương 8 buổi,
bấm vào một buổi sẽ mở trang nội dung đầy đủ kèm bài tập ở cuối.

## Nội dung nằm ở đâu

Toàn bộ nội dung là **dữ liệu TypeScript**, không phải markdown và không phải JSX:

```
src/data/types.ts     Định nghĩa kiểu — đọc file này trước khi sửa bất cứ gì
src/data/buoi01.ts    Một file cho mỗi buổi (buoi01 → buoi08)
src/data/index.ts     Gom 8 buổi lại, tính các con số thống kê
```

Giao diện đọc dữ liệu đó và tự render — **không sửa component khi chỉ muốn đổi nội dung**.

## Cấu trúc một buổi

```ts
const buoi0X: Buoi = {
  id, slug, title, subtitle, duration,
  goals: [],        // "Sau buổi này bạn sẽ..." — 3-5 mục, mỗi mục là một năng lực đo được
  keywords: [],     // từ khoá kỹ thuật, hiện dưới dạng chip
  sections: [],     // phần lý thuyết — xem bên dưới
  exercises: [],    // bài tập về nhà
}
```

`slug` là đường dẫn URL (`/buoi/<slug>`). Đổi slug là đổi link — chỉ đổi khi thật cần.

## Các khối nội dung dùng trong `sections[].blocks`

| type | Dùng khi |
|---|---|
| `text` | Đoạn văn giải thích. Viết thành câu hoàn chỉnh, không viết gạch đầu dòng cụt. |
| `list` | Liệt kê ngang hàng. `ordered: true` cho quy trình có thứ tự. |
| `code` | Ví dụ C#. Luôn kèm `title`, thêm `note` để chỉ ra cái bẫy hoặc điểm mấu chốt. |
| `table` | So sánh nhiều cột. Cột đầu tiên tự động hiển thị dạng monospace. |
| `callout` | `info` = ghi nhớ, `warn` = cái bẫy hay sai, `tip` = mẹo thực chiến. |
| `visual` | Sơ đồ minh hoạ — xem phần dưới. |

## Sơ đồ minh hoạ (`visual`)

Đây là điểm mạnh của trang. Có 9 loại dựng sẵn, mô tả bằng dữ liệu, render bằng
`src/components/Visual.tsx`:

| kind | Vẽ ra cái gì | Hợp với |
|---|---|---|
| `flow` | Lưu đồ thuật toán, có nhánh rẽ lồng nhau | if/else, switch, luồng kiểm tra input |
| `ipo` | Ba khối Input → Process → Output | Phân rã đề bài |
| `boxes` | Các ô nhớ có tên | Biến và giá trị |
| `strip` | Dãy ô có chỉ số `[0] [1] [2]` | Mảng, List, chuỗi ký tự |
| `map` | Khoá → giá trị, có mũi tên | Dictionary |
| `loop` | 4 bước của vòng lặp + mũi tên quay lại | while, for |
| `func` | Tham số → hộp hàm → giá trị trả về | Hàm |
| `timeline` | Các bước đánh số theo chiều dọc | Quy trình, thứ tự chạy |
| `compare` | 2–4 cột đối chiếu, tô màu `good` / `bad` / `plain` | So sánh hai cách làm |

`flow` hỗ trợ nhánh lồng nhau — dùng cho chuỗi `else if`:

```ts
{ kind: 'decision', text: 'dtb ≥ 8.0 ?', branches: [
    { label: 'Đúng', steps: [{ kind: 'io', text: 'Giỏi' }] },
    { label: 'Sai',  steps: [{ kind: 'decision', text: 'dtb ≥ 6.5 ?', branches: [...] }] },
]}
```

Các `kind` của node: `start` `end` `io` `process` `decision` `note`.

## Bài tập

```ts
{ id: 'b3-4', level: 'Trung bình', title, requirement,
  io: { input: '...', output: '...' },   // tuỳ chọn, nhưng nên có
  hint: '...' }                          // tuỳ chọn
```

`level` chỉ nhận đúng ba giá trị: `'Cơ bản'` | `'Trung bình'` | `'Nâng cao'`.
Trong một buổi, xếp bài tập từ dễ đến khó. `id` theo quy ước `b<số buổi>-<số thứ tự>`.

## Quy ước viết nội dung

Nội dung hiện tại được viết lại từ slide gốc theo mấy nguyên tắc sau — giữ nguyên
để cả trang đọc thống nhất:

- **Bỏ phần giới thiệu, vào thẳng tiêu đề chính.** Không có slide "lời nói đầu".
- **Diễn đạt ngắn.** Một ý một câu. Không lặp lại cùng một ý ở hai chỗ.
- **Mỗi khái niệm trừu tượng phải có một hình.** Vòng lặp, chỉ số mảng, luồng rẽ
  nhánh, cặp khoá-giá trị — đều phải kèm `visual`, không giải thích chay.
- **Ví dụ code phải chạy được thật**, đặt tên biến tiếng Việt không dấu theo camelCase
  đúng như quy ước dạy trong buổi 2.
- **Chỉ ra cái bẫy.** Chia số nguyên `9/5`, `=` với `==`, chuỗi bất biến, đọc khoá
  không tồn tại trong Dictionary — dùng `callout` tone `warn`.

## Theme sáng / tối

Màu chạy qua biến CSS trong `src/index.css`. Quy ước:

- `text-ink/65`, `bg-ink/5`, `border-ink/10` — `--ink` tự lật giữa trắng và gần-đen
  theo theme, nên **không bao giờ viết `text-white/65` hay `bg-white/5` nữa**.
- `bg-page` (nền trang), `bg-panel` (nền menu, thẻ nổi).
- `brand` / `accent` / `mint` / `amber` / `rose` đều đã có biến riêng cho từng theme.
- Ngoại lệ giữ nguyên `text-white`: chữ nằm trên nền brand đặc (logo, badge số buổi,
  nút gradient) — nền đó không đổi theo theme.
- `src/components/CodeBlock.tsx` cố ý giữ nền tối ở cả hai theme, nên bên trong nó
  vẫn dùng `white/` bình thường. Đừng sed nhầm file này.

## Xuất slide PDF

Nút *Xuất slide PDF* gọi `window.print()`; định dạng nằm trong khối `@media print`
ở cuối `src/index.css`. Khi thêm khối giao diện mới:

- Thêm class `no-print` cho những thứ không nên in (điều hướng, nút bấm, mục lục).
- Thêm class `print-page` cho khối muốn bắt đầu ở một trang mới.

## Sau khi sửa

```bash
npm run dev      # xem tại http://localhost:5173
npm run build    # bắt buộc chạy trước khi commit — tsc sẽ báo lỗi kiểu dữ liệu
```

`npm run build` chạy `tsc -b` trước, nên sai tên trường hoặc sai `kind` của sơ đồ
sẽ lộ ra ngay ở bước này chứ không phải lúc chạy.

## Thêm một buổi mới

1. Tạo `src/data/buoi09.ts` theo đúng khuôn của các file có sẵn.
2. Import và thêm vào mảng `BUOI_LIST` trong `src/data/index.ts`.
3. Không cần đụng vào sidebar hay router — cả hai tự sinh từ `BUOI_LIST`.
