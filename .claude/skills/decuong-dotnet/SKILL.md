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
| `uml` | Sơ đồ lớp: hộp ba ngăn (tên · thuộc tính · phương thức), có mũi tên kế thừa | OOP — kế thừa, interface, abstract |

`flow` hỗ trợ nhánh lồng nhau — dùng cho chuỗi `else if`:

```ts
{ kind: 'decision', text: 'dtb ≥ 8.0 ?', branches: [
    { label: 'Đúng', steps: [{ kind: 'io', text: 'Giỏi' }] },
    { label: 'Sai',  steps: [{ kind: 'decision', text: 'dtb ≥ 6.5 ?', branches: [...] }] },
]}
```

Các `kind` của node: `start` `end` `io` `process` `decision` `note`.

`uml` nhận `parent` (lớp cha hoặc interface) và `children` (các lớp con xếp thành hàng),
`relation` là `'inherit'` hay `'implement'`. Đặt `stereotype: 'interface'` hoặc
`'abstract'` để hộp đổi sang viền đứt màu xanh. Bỏ `parent` thì chỉ vẽ một hàng hộp
rời — dùng khi mô tả class độc lập.

## Bài tập

Đề bài viết theo **lối LeetCode**, không viết kiểu câu mệnh lệnh "hãy viết chương trình…":

```ts
{
  id: 'b8-e41', level: 'Nâng cao', title: 'Two Sum',
  requirement: 'Cho một mảng số nguyên nums và một số target. Trả về chỉ số của hai phần tử…',
  signature: 'int[] TwoSum(int[] nums, int target)',
  constraints: ['2 <= nums.Length <= 10000', 'Lời giải nên chạy trong O(n)'],
  examples: [
    { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explain: 'nums[0] + nums[1] = 9.' },
    { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]' },
  ],
  hint: '…',
}
```

| Trường | Bắt buộc | Ghi chú |
|---|---|---|
| `requirement` | Có | Mô tả bài toán ở thể trần thuật: "Cho… Trả về…" |
| `signature` | Nên có | Chữ ký hàm hoặc API của class cần cài đặt |
| `constraints` | Nên có | Giới hạn kích thước, miền giá trị, yêu cầu độ phức tạp |
| `examples` | Có | Ít nhất 2 test case từ mức Trung bình trở lên; `explain` cho ca dễ hiểu nhầm |
| `hint` | Tuỳ | Gợi ý hướng đi, không giải hộ |

Ưu tiên thêm một ca biên vào `examples`: mảng rỗng, giá trị trùng mốc điều kiện,
trường hợp không có đáp án.

`level` chỉ nhận đúng ba giá trị: `'Cơ bản'` | `'Trung bình'` | `'Nâng cao'`.
`id` theo quy ước `b<số buổi>-<số thứ tự>`.

Trang bài học **tự nhóm bài tập theo cấp độ** và đánh số lại trong từng nhóm, nên
không cần tự sắp xếp thứ tự dễ-khó trong mảng.

Nút *Bốc đề 10 bài* lấy ngẫu nhiên theo tỷ lệ 2 Cơ bản · 6 Trung bình · 2 Nâng cao.
Buổi nào không đủ bài ở một mức thì phần thiếu được bù bằng bài bất kỳ còn lại, và
buổi có dưới 10 bài thì chọn hết.

Buổi 8 có 250 bài nên tách hẳn ra thư mục `src/data/baitap-collection/` gồm ba file
`coban.ts` (50), `trungbinh.ts` (100), `nangcao.ts` (100); `buoi08-baitap.ts` chỉ còn
việc gộp chúng lại. Buổi nào vượt khoảng 20 bài thì nên tách file tương tự.

**Quy ước id:** `b<số buổi>-<chữ cái cấp độ><số thứ tự 3 chữ số>` — `c` cho Cơ bản,
`m` cho Trung bình, `h` cho Nâng cao. Ví dụ `b8-c001`, `b8-m042`, `b8-h100`. Tiền tố
khác nhau theo cấp độ để id không đụng nhau khi bổ sung bài vào từng file riêng.

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

## Tab và xuất PDF

Trang buổi học chia tab *Lý thuyết* / *Bài tập*, trong Bài tập có tab con theo cấp độ.
Panel bị ẩn **vẫn nằm trong DOM**, ẩn bằng `data-open="false"` chứ không dùng thuộc
tính `hidden`.

Lý do: preflight của Tailwind đặt `[hidden] { display: none !important }` trong
`@layer base`. Với khai báo `!important`, thứ tự cascade layer bị đảo — layer đứng
trước thắng phần CSS không nằm trong layer — nên rule ghi đè lúc in sẽ không ăn.
Dùng `data-open` thì không phải đánh nhau bằng `!important`.

Hai nút tải PDF gọi `printAs(mode)`, hàm này gắn cờ `data-print` lên thẻ `<html>`:

| Cờ | Kết quả |
|---|---|
| `data-print="full"` | Mở hết panel đang ẩn — in đủ lý thuyết và cả 3 cấp độ bài tập |
| `data-print="tab"` | Giữ nguyên trạng thái tab, thêm ẩn khối `.print-full-only` |
| `data-print="selected"` | Ẩn hết `[data-main]`, chỉ in `[data-print-deck]` — bộ slide các bài tập đã tick chọn |

Khi thêm khối giao diện mới, gắn class cho đúng:

- `no-print` — không bao giờ in (điều hướng, nút bấm, mục lục, dòng hướng dẫn thao tác).
- `print-full-only` — chỉ có ở bản PDF đầy đủ, không có ở bản PDF một tab.
- `print-page` — bắt đầu ở một trang mới khi in.

Toàn bộ định dạng bản in nằm trong khối `@media print` ở cuối `src/index.css`.

## Slide bài tập

`src/components/ExerciseSlide.tsx` dựng một trang cho mỗi bài tập: tiêu đề · mô tả ·
hình minh hoạ · Input/Output · gợi ý.

Hình lấy từ trường `visual` của bài tập (kiểu `Visual`, dùng được cả 9 loại sơ đồ).
Không khai báo `visual` mà có `io` thì slide **tự dựng sơ đồ IPO** — khi đó hai ô
Input/Output bên dưới được bỏ đi cho khỏi lặp nội dung.

Bố cục slide: huy hiệu **Bài N** (đánh số 1→n theo thứ tự các bài đã chọn) · tiêu đề
cỡ lớn màu cam `--cyber-500` · logo Cybersoft chìm ở nền, opacity 3%.

Logo chìm phải nằm trong khung `.slide-watermark` có `inset: 0` và `overflow: hidden`.
Để ảnh `position: absolute` trần thì phần tràn ra ngoài slide sẽ cộng vào chiều cao
tài liệu và đẻ ra một trang in trắng ở cuối.

Chân trang *"Được biên soạn bởi Trương Tấn Khải — cybersoft.edu.vn"* nằm ở `App.tsx`,
dùng `position: fixed` nên tự lặp trên mọi trang in, ở cả ba chế độ in.

Ngắt trang dùng `break-before` chứ không dùng `break-after` — `break-after` trên phần
tử cuối cũng sinh thêm một trang trắng.

Slide in ra phải có **đủ nội dung như trên web**: đề bài, chữ ký hàm, lưu đồ, các test
case Input/Output kèm giải thích, ràng buộc và gợi ý. Bài nào có lưu đồ thì các ví dụ tự
xếp thành 2–3 cột cho vừa trang.

Mỗi slide phải gọn trong đúng một trang A4 ngang. Sơ đồ dùng đơn vị `em` nên co giãn
theo `font-size` của khối `.slide-figure`; nếu thêm bài có lưu đồ dài mà bị tràn trang,
hạ `font-size` của `.slide-figure` trong `@media print` xuống là vừa.

## Sau khi sửa

```bash
npm run dev      # xem tại http://localhost:5173
npm run build    # bắt buộc chạy trước khi commit — tsc sẽ báo lỗi kiểu dữ liệu
```

`npm run build` chạy `tsc -b` trước, nên sai tên trường hoặc sai `kind` của sơ đồ
sẽ lộ ra ngay ở bước này chứ không phải lúc chạy.

## Thêm một buổi mới

1. Tạo `src/data/buoi16.ts` theo đúng khuôn của các file có sẵn.
2. Import và thêm vào mảng `BUOI_LIST` trong `src/data/index.ts`.
3. Không cần đụng vào sidebar hay router — cả hai tự sinh từ `BUOI_LIST`.
