import { ValueTransformer } from "typeorm";
import { UtilsProvider } from "../../providers/UtilsProvider";

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
