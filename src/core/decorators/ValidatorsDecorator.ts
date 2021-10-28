import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

/**
 * 유효한 비밀번호인지 체크한다.
 * @param validationOptions 검증옵션
 */
export function IsPassword(
    validationOptions?: ValidationOptions,
): PropertyDecorator {
    return (object: any, propertyName: string) => {
        registerDecorator({
            propertyName,
            name: "isPassword",
            target: object.constructor,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: string, args: ValidationArguments) {
                    return /^[a-zA-Z0-9!@#$%^&*]*$/.test(value);
                },
            },
        });
    };
}
