import { Transform } from 'class-transformer';
import { isUndefined, isArray, trim, isNil, castArray, includes } from 'lodash';

export const toJson = (str?: string, ...args: any) => {
  if (!isUndefined(str)) {
    return str.replace(
      /%s/g,
      JSON.stringify(args, (_, v) => (typeof v === 'bigint' ? v.toString() : v)),
    );
  }
  return JSON.stringify(args, (_, v) => (typeof v === 'bigint' ? v.toString() : v));
};

export const toTrim = (): PropertyDecorator => {
  return Transform((value: string | Array<string> | any) => {
    if (isArray(value)) {
      return value.map((v) => trim(v).replace(/\s\s+/g, ' '));
    }
    return trim(value).replace(/\s\s+/g, ' ');
  });
};

export const toInt = (): PropertyDecorator => {
  return Transform((value: any) => parseInt(value, 10), {
    toClassOnly: true,
  });
};

export const toArray = (): PropertyDecorator => {
  return Transform(
    (value) => {
      if (isNil(value)) {
        return [];
      }
      return castArray(value);
    },
    { toClassOnly: true },
  );
};

export const isImage = (mimeType: string): boolean => {
  const imageMimeTypes = ['image/jpeg', 'image/png'];

  return includes(imageMimeTypes, mimeType);
};
