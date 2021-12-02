import { Injectable } from '@nestjs/common';
import { includes } from 'lodash';

@Injectable()
export class ValidatorService {
	public isImage(mimeType: string): boolean {
		const imageMimeTypes = ['image/jpeg', 'image/png'];

		return includes(imageMimeTypes, mimeType);
	}
}
