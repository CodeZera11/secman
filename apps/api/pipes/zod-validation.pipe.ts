import { ZodSchema } from 'zod';
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    const parsedValue = this.schema.safeParse(value);

    if (!parsedValue.success) {
      throw new BadRequestException(parsedValue.error.format());
    }

    return parsedValue.data;
  }
}
