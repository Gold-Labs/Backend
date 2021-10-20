import { HttpException } from '@nestjs/common';
import { BaseEntity } from 'typeorm';

export function nullCheck<T>(entitiy: T | undefined | null) {
  if (!entitiy) {
    throw new HttpException('no Entity', 404);
  }
  return entitiy;
}
