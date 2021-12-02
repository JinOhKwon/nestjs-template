import { AbstractEntity } from './base/abstract-entity';
import { AbstractDto } from './base/dto/abstract-dto';
declare global {
	interface Array<T> {
		toDtos<T extends AbstractDto>(this: Array<AbstractEntity<T>>): Array<T>;
	}
}

Array.prototype.toDtos = function <T extends AbstractDto>(options?: any): Array<T> {
	// tslint:disable-next-line:no-invalid-this
	return this.map((item) => item.toDto(options))
		.compact()
		.value() as Array<T>;
};
