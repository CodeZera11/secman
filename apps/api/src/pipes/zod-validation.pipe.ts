import { ZodSchema } from 'zod';
import { ProtectedEndPointBaseSchema } from '@repo/types';
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ZodValidationPipe implements PipeTransform {
  constructor(
    private schema: ZodSchema,
    private options?: {
      protected?: boolean;
    },
  ) {}

  transform(value: any) {
    const isProtected = this.options?.protected || false;
    if (isProtected) {
      const authSchema = this.schema.and(ProtectedEndPointBaseSchema);
      this.schema = authSchema;
    }
    const parsedValue = this.schema.safeParse(value);

    if (!parsedValue.success) {
      throw new BadRequestException(parsedValue.error.format());
    }

    return parsedValue.data;
  }
}
