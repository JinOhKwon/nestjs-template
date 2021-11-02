import { AbstractEntity } from "./base/abstract-entity";
import { AbstractDto } from "./base/dto/abstract-dto";

declare global {
    interface Array<T> {
        toDtos<B extends AbstractDto>(this: Array<AbstractEntity<B>>): B[];
    }
}

Array.prototype.toDtos = function <B extends AbstractDto>(options?: any): B[] {
    // tslint:disable-next-line:no-invalid-this
    return (this)
        .map(item => item.toDto(options))
        .compact()
        .value() as B[];
};
