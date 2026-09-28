/**
 * Mô phỏng console app trên web. Một "chương trình" là hàm async nhận ConsoleIO:
 * gọi io.write để in, await io.read để chờ người dùng gõ — giống Console.WriteLine
 * và Console.ReadLine trong C#. Component ConsoleDemo cung cấp io và vẽ màn hình.
 */
export interface ConsoleIO {
  write(text?: string): void
  /** In prompt (không xuống dòng) rồi chờ một dòng người dùng gõ. */
  read(prompt?: string): Promise<string>
}

export type ConsoleProgram = (io: ConsoleIO) => Promise<void>

/** Ném ra khi người dùng bấm Chạy lại giữa chừng để chương trình cũ dừng hẳn. */
export class ConsoleStopped extends Error {
  constructor() {
    super('stopped')
  }
}

export const vnd = (n: number) => Math.round(n).toLocaleString('vi-VN') + ' đ'
