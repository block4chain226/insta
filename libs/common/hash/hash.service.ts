import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hash(data: string): Promise<string> {
    console.log('🚀 ~ HashService ~ hash ~ data:', data);
    return await bcrypt.hash(data, 10);
  }

  async compare(data: string, reference: string): Promise<boolean> {
    return await bcrypt.compare(data, reference);
  }
}
