import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { HashService } from 'libs/common/hash/hash.service';

@Injectable()
export class HashPipe implements PipeTransform {
  constructor(private readonly hashService: HashService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    value.password = await this.hashService.hash(value.password);
    return value;
  }
}
