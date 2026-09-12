import type { Exercise } from './types'
import { coBan } from './baitap-collection/coban'
import { trungBinh } from './baitap-collection/trungbinh'
import { nangCao } from './baitap-collection/nangcao'

/**
 * Bộ bài tập collection, viết theo lối LeetCode: đề bài · chữ ký hàm ·
 * ràng buộc · test case mẫu. Tách theo cấp độ cho dễ tìm và dễ bổ sung.
 */
export const BAI_TAP_COLLECTION: Exercise[] = [...coBan, ...trungBinh, ...nangCao]
