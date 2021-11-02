import { UtilsProvider } from "src/providers/utils.provider";
import { ValueTransformer } from "typeorm";

/**
 * 비밀번호 변환기
 */
export class PasswordTransformer implements ValueTransformer {
    to(value) {
        return UtilsProvider.generateHash(value);
    }
    from(value) {
        return value;
    }
}
